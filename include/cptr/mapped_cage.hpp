// SPDX-License-Identifier: MIT
// A cage backed by a file. Compressed pointers are offsets from the cage's
// base, so a structure built in the file is still valid when the file is
// mapped again later, by another process, at another address.
#pragma once

#if defined(_WIN32)
#  error "cptr/mapped_cage.hpp needs POSIX mmap"
#endif

#include <fcntl.h>
#include <sys/file.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>

#include <algorithm>
#include <atomic>
#include <bit>
#include <cerrno>
#include <chrono>
#include <cstddef>
#include <cstdint>
#include <cstring>
#include <new>
#include <thread>

#include "cptr/cage.hpp"
#include "cptr/platform.hpp"

namespace cptr {

/// A cage of 2^SizeLog2 bytes whose memory is the file opened with open().
/// It has the interface the containers and cptr::ptr need, plus a root
/// pointer stored in the file to find the data again after reopening.
///
///   struct store_tag {};
///   using store = cptr::mapped_cage<store_tag>;
///   store::open("data.cage");
///   auto* r = store::root<my_root>();  // nullptr in a new file
///
/// The file is created sparse at the full cage size; only pages written to
/// take disk space. Everything that must survive reopening has to live in
/// the cage and point into it with cptr::ptr: a cptr::list or
/// cptr::ordered_map of trivially copyable values qualifies, a std::string
/// does not.
///
/// The allocator's state is in the file too, behind a spin lock in the
/// file, so several processes may open, create and allocate in the same file
/// at once (see open()). The containers themselves are not synchronised. A
/// process that dies while holding the spin lock leaves the file locked, and
/// one that dies part way through an allocation can leave the allocator
/// state inconsistent; open() rejects state that is out of range, not every
/// inconsistency. Freed small blocks are kept per size class;
/// freed large runs are kept in one list, first fit, without coalescing.
template <class Tag, unsigned SizeLog2 = 32>
class CPTR_VISIBLE mapped_cage {
  static_assert(sizeof(void*) == 8, "cages need a 64-bit address space");
  static_assert(SizeLog2 >= 24 && SizeLog2 <= 32,
                "a mapped cage is 16 MiB to 4 GiB");

 public:
  using tag = Tag;
  static constexpr std::size_t size = std::size_t(1) << SizeLog2;
  static constexpr unsigned shift = 0;
  static constexpr std::size_t granularity = 1;
  static constexpr std::size_t span_size = 64 * 1024;
  static constexpr std::size_t span_count = size / span_size;
  /// The last span is never handed out, so one past the end of any block
  /// compresses; see cage::usable_end.
  static constexpr std::size_t usable_end = size - span_size;

  /// Map the file at `path` as the cage, creating it if it does not exist.
  /// Fails if a file is already open, if the file is not a cage of this
  /// size, if its allocator state is out of range (a corrupt file), or if
  /// address space or the file cannot be had.
  ///
  /// Several processes may open, and create, the same file at once: open()
  /// holds an flock() on the file while it checks, creates and formats it,
  /// so exactly one of them formats a new file and the others wait for it.
  /// open() fails if the file system does not support flock(). A file whose
  /// creator failed after making it full size is removed again (or truncated
  /// to empty, if it existed before), so a later open() can create it.
  ///
  /// The checks look at the header, the span table and every free list, so
  /// open() takes time in proportion to the number of free blocks. Tag is
  /// not recorded in the file: any mapped_cage of the same SizeLog2 opens it.
  static bool open(const char* path) noexcept {
    if (base() != 0) {
      return false;
    }
    void* p = detail::reserve_aligned(size, size);
    if (!p) {
      return false;
    }
    if (!map_file(path, p)) {
      munmap(p, size);
      return false;
    }
    base_ = detail::base_address(reinterpret_cast<std::uintptr_t>(p));
    return true;
  }

  /// Write the file's changed pages back and unmap it. Pointers into the
  /// cage are invalid afterwards.
  static void close() noexcept {
    if (base() == 0) {
      return;
    }
    void* p = reinterpret_cast<void*>(base());
    msync(p, size, MS_SYNC);
    munmap(p, size);
    base_ = detail::base_address(0);
  }

  /// Write changed pages back to the file without unmapping it.
  static bool flush() noexcept {
    return base() != 0 &&
           msync(reinterpret_cast<void*>(base()), size, MS_SYNC) == 0;
  }

  static bool is_open() noexcept { return base() != 0; }

  /// Zero while no file is open.
  static std::uintptr_t base() noexcept { return std::uintptr_t(base_); }

  /// Where the file was mapped the last time before this open(), or 0 for a
  /// new file.
  static std::uintptr_t previous_base() noexcept { return previous_base_; }

  /// The object the file's user designated with set_root(), or nullptr,
  /// also while no file is open.
  template <class T>
  static T* root() noexcept {
    return base() ? static_cast<T*>(decompress(hdr()->root.load())) : nullptr;
  }
  /// Designate the object root() returns. Does nothing while no file is
  /// open.
  static void set_root(const void* p) noexcept {
    if (base()) {
      hdr()->root.store(compress(p));
    }
  }

  static bool contains(const void* p) noexcept {
    return base() != 0 && reinterpret_cast<std::uintptr_t>(p) - base() < size;
  }

  /// A mask, as the mapping is aligned to the cage size; see
  /// cage::compress().
  static constexpr std::uint32_t compress(const void* p) noexcept {
    if (std::is_constant_evaluated()) {
      return detail::compress_constant(p);
    }
    CPTR_CHECK(!p || contains(p), "pointer is outside the cage");
    return static_cast<std::uint32_t>(reinterpret_cast<std::uintptr_t>(p) &
                                      (size - 1));
  }

  /// See cage::decompress().
  static constexpr void* decompress(std::uint32_t bits) noexcept {
    if (std::is_constant_evaluated()) {
      return detail::decompress_constant(bits);
    }
    CPTR_ASSERT(bits == 0 || base() != 0, "the mapped cage is not open");
    std::uintptr_t full = base() + bits;
    return reinterpret_cast<void*>(bits ? full : std::uintptr_t(0));
  }

  static void* decompress_nonnull(std::uint32_t bits) noexcept {
    CPTR_ASSERT(base() != 0, "the mapped cage is not open");
    return reinterpret_cast<void*>(base() + bits);
  }

  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (void* p = try_allocate(bytes, align)) {
      return p;
    }
    throw std::bad_alloc();
  }

  /// Returns nullptr when the cage is full, no file is open, or `align` is
  /// above 64 KiB (the span size).
  static void* try_allocate(std::size_t bytes, std::size_t align = alignof(
                                                   std::max_align_t)) noexcept {
    CPTR_ASSERT(std::has_single_bit(align), "alignment must be a power of two");
    if (base() == 0 || align > span_size) {
      return nullptr;
    }
    header* h = hdr();
    guard g(h->lock);
    int cls = size_class(std::max<std::size_t>(bytes, 1), align);
    if (cls < 0) {
      return allocate_large(h, bytes);
    }
    std::uint32_t block = detail::kClassSizes[cls];
    std::uint32_t off = h->free_head[cls];
    if (off) {
      h->free_head[cls] = *static_cast<std::uint32_t*>(at(off));
    } else {
      if (h->slab_end[cls] - h->slab_cursor[cls] < block) {
        std::uint32_t spans = slab_spans(block);
        std::uint32_t first = take_spans(h, spans);
        if (!first) {
          return nullptr;
        }
        for (std::uint32_t i = 0; i < spans; i++) {
          table()[first + i] = std::uint32_t(cls) + 1;
        }
        h->slab_cursor[cls] = first * std::uint32_t(span_size);
        h->slab_end[cls] = h->slab_cursor[cls] + spans * span_size;
      }
      off = h->slab_cursor[cls];
      h->slab_cursor[cls] += block;
    }
    h->allocated += block;
    return at(off);
  }

  static void deallocate(void* p) noexcept {
    if (!p) {
      return;
    }
    CPTR_CHECK(contains(p), "freeing a pointer from outside the cage");
    header* h = hdr();
    guard g(h->lock);
    std::uint32_t off = compress(p);
    std::uint32_t entry = table()[off / span_size];
    if (entry & kLarge) {
      std::uint32_t spans = entry & ~kLarge;
      table()[off / span_size] = 0;
      h->allocated -= std::uint64_t(spans) * span_size;
      free_run(h, std::uint32_t(off / span_size), spans);
      return;
    }
    CPTR_CHECK(entry != 0, "freeing a pointer that was not allocated");
    int cls = int(entry) - 1;
    *static_cast<std::uint32_t*>(p) = h->free_head[cls];
    h->free_head[cls] = off;
    h->allocated -= detail::kClassSizes[cls];
  }
  static void deallocate(void* p, std::size_t, std::size_t = 0) noexcept {
    deallocate(p);
  }

  /// Bytes handed out and not yet freed, rounded up to the size class.
  static std::size_t allocated_bytes() noexcept {
    return base() ? std::size_t(hdr()->allocated) : 0;
  }

 private:
  static constexpr std::uint64_t kMagic = 0x3170616d72747063;  // "cptrmap1"
  static constexpr std::uint32_t kVersion = 1;
  static constexpr std::uint32_t kLarge = 0x80000000u;
  static constexpr std::size_t kClasses = detail::kClassSizes.size();
  /// One 32-bit entry per span: 0 if free or inside a large run, the size
  /// class + 1 for a slab span, or kLarge | length at the start of a large
  /// run. It follows the header span.
  static constexpr std::size_t kTableSpans =
      (span_count * 4 + span_size - 1) / span_size;
  static constexpr std::uint32_t kFirstSpan = 1 + kTableSpans;

  /// The file's first span. Offset 0 is never handed out, so its use here
  /// costs nothing.
  struct header {
    std::uint64_t magic;
    std::uint32_t version;
    std::uint32_t size_log2;
    std::atomic<std::uint32_t> lock;
    std::atomic<std::uint32_t> root;
    std::uint64_t base;       // where the file was last mapped
    std::uint64_t allocated;  // bytes handed out and not freed
    std::uint32_t next_span;  // first span never used
    std::uint32_t free_runs;  // first freed large run, as a span index
    std::uint32_t free_head[kClasses];
    std::uint32_t slab_cursor[kClasses];
    std::uint32_t slab_end[kClasses];
  };
  static_assert(sizeof(header) <= span_size);
  static_assert(std::atomic<std::uint32_t>::is_always_lock_free,
                "the lock must work between processes");

  /// At the start of a freed large run.
  struct free_run_header {
    std::uint32_t spans;
    std::uint32_t next;  // span index, 0 = end
  };

  struct guard {
    std::atomic<std::uint32_t>& lock;
    explicit guard(std::atomic<std::uint32_t>& l) : lock(l) {
      while (lock.exchange(1, std::memory_order_acquire)) {
        while (lock.load(std::memory_order_relaxed)) {
          std::this_thread::yield();
        }
      }
    }
    ~guard() { lock.store(0, std::memory_order_release); }
    guard(const guard&) = delete;
    guard& operator=(const guard&) = delete;
  };

  /// Write a new header. The magic number goes last, so a creator that dies
  /// half way leaves a file that open() rejects rather than a half-formatted
  /// one.
  static void format(header* h) noexcept {
    ::new (h) header{};
    h->version = kVersion;
    h->size_log2 = SizeLog2;
    h->next_span = kFirstSpan;
    std::atomic_ref<std::uint64_t>(h->magic).store(kMagic,
                                                   std::memory_order_release);
  }

  /// Open or create the file and map it at `p`, holding an flock() on it
  /// throughout so that concurrent creators do not both format it.
  static bool map_file(const char* path, void* p) noexcept {
    // A creator that fails removes the file; whoever opened it meanwhile
    // finds it unlinked once they have the lock, and starts again.
    for (int attempt = 0; attempt < 64; attempt++) {
      bool created = true;
      int fd = ::open(path, O_RDWR | O_CREAT | O_EXCL | O_CLOEXEC, 0644);
      if (fd < 0 && errno == EEXIST) {
        created = false;
        fd = ::open(path, O_RDWR | O_CLOEXEC);
      }
      if (fd < 0) {
        if (errno == ENOENT) {
          continue;  // removed between the two opens
        }
        return false;
      }
      int r;
      do {
        r = flock(fd, LOCK_EX);
      } while (r != 0 && errno == EINTR);
      struct stat st;
      if (r != 0 || fstat(fd, &st) != 0) {
        ::close(fd);
        return false;
      }
      if (st.st_nlink == 0) {
        ::close(fd);
        continue;
      }
      bool ok = map_locked(fd, st, p);
      if (!ok && created) {
        // Do not leave a full-size file without a header behind. The path
        // is removed while the lock is held, so nobody can have formatted
        // the file in the meantime.
        ::unlink(path);
      } else if (!ok && st.st_size == 0) {
        (void)!ftruncate(fd, 0);
      }
      ::close(fd);  // releases the lock
      return ok;
    }
    return false;
  }

  /// With the file locked: give a new (empty) file its full size and a
  /// header, map it, and check what it holds.
  static bool map_locked(int fd, const struct stat& st, void* p) noexcept {
    bool fresh = st.st_size == 0;
    if (!fresh && std::uint64_t(st.st_size) != size) {
      return false;
    }
    if ((fresh && ftruncate(fd, off_t(size)) != 0) ||
        mmap(p, size, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_FIXED, fd, 0) !=
            p) {
      return false;
    }
    auto* h = static_cast<header*>(p);
    if (fresh) {
      format(h);
    }
    if (h->magic != kMagic || h->version != kVersion ||
        h->size_log2 != SizeLog2) {
      return false;
    }
    // Processes that already have the file open allocate under the header's
    // spin lock, not the flock, so the allocator state is checked under the
    // spin lock too; otherwise a half-made allocation looks like a corrupt
    // file. A lock still held after a second, by a process that died
    // holding it, fails the open.
    if (!lock_for_a_second(h->lock)) {
      return false;
    }
    bool ok = valid(h);
    if (ok) {
      previous_base_ = h->base;
      h->base = reinterpret_cast<std::uintptr_t>(p);
    }
    h->lock.store(0, std::memory_order_release);
    return ok;
  }

  static bool lock_for_a_second(std::atomic<std::uint32_t>& lock) noexcept {
    auto deadline = std::chrono::steady_clock::now() + std::chrono::seconds(1);
    while (lock.exchange(1, std::memory_order_acquire)) {
      while (lock.load(std::memory_order_relaxed)) {
        if (std::chrono::steady_clock::now() > deadline) {
          return false;
        }
        std::this_thread::yield();
      }
    }
    return true;
  }

  /// Whether the allocator state in a mapped file is in range, so that
  /// using it cannot write outside the mapping or over the header and span
  /// table. Not a full consistency check: blocks can still be handed out
  /// twice if the lists of a corrupt file overlap.
  static bool valid(const header* h) noexcept {
    if (h->magic != kMagic || h->version != kVersion ||
        h->size_log2 != SizeLog2) {
      return false;
    }
    std::uint32_t next = h->next_span;
    if (next < kFirstSpan || next > span_count - 1) {
      return false;
    }
    const std::uint64_t lo = std::uint64_t(kFirstSpan) * span_size;
    const std::uint64_t hi = std::uint64_t(next) * span_size;
    if (h->allocated > hi || h->root.load() >= usable_end) {
      return false;
    }
    const auto* tab = reinterpret_cast<const std::uint32_t*>(
        reinterpret_cast<std::uintptr_t>(h) + span_size);
    std::uint32_t class_spans[kClasses] = {};
    for (std::uint32_t i = 0; i < span_count; i++) {
      std::uint32_t e = tab[i];
      if (e != 0 && e <= kClasses) {
        class_spans[e - 1]++;
      }
      bool ok = e == 0 ||
                (i >= kFirstSpan && i < next &&
                 ((e & kLarge) ? (e & ~kLarge) != 0 && (e & ~kLarge) <= next - i
                               : e <= kClasses));
      if (!ok) {
        return false;
      }
    }
    // The large free runs: inside the used spans, finite.
    std::uint32_t run = h->free_runs;
    for (std::uint32_t steps = 0; run != 0; steps++) {
      if (steps >= span_count || run < kFirstSpan || run >= next) {
        return false;
      }
      const auto* r = reinterpret_cast<const free_run_header*>(
          reinterpret_cast<std::uintptr_t>(h) + std::uint64_t(run) * span_size);
      if (r->spans == 0 || r->spans > next - run) {
        return false;
      }
      run = r->next;
    }
    for (std::size_t c = 0; c < kClasses; c++) {
      std::uint32_t block = detail::kClassSizes[c];
      // The current slab's unused tail: empty, or inside a slab of this
      // class.
      std::uint64_t cur = h->slab_cursor[c], end = h->slab_end[c];
      if (cur > end || end > hi ||
          (cur < end && (cur < lo || tab[cur / span_size] != c + 1 ||
                         tab[(end - 1) / span_size] != c + 1))) {
        return false;
      }
      // The free list: blocks in slabs of this class, and no longer than
      // those slabs could hold.
      std::uint64_t limit = std::uint64_t(class_spans[c]) * span_size / block;
      std::uint32_t off = h->free_head[c];
      for (std::uint64_t steps = 0; off != 0; steps++) {
        if (steps >= limit || off < lo || off + std::uint64_t(block) > hi ||
            off % alignof(std::uint32_t) != 0 ||
            tab[off / span_size] != c + 1) {
          return false;
        }
        off = *reinterpret_cast<const std::uint32_t*>(
            reinterpret_cast<std::uintptr_t>(h) + off);
      }
    }
    return true;
  }

  static header* hdr() noexcept { return reinterpret_cast<header*>(base()); }
  static std::uint32_t* table() noexcept {
    return reinterpret_cast<std::uint32_t*>(base() + span_size);
  }
  static void* at(std::uint64_t off) noexcept {
    return reinterpret_cast<void*>(base() + off);
  }

  /// The smallest class that fits `bytes` and is a multiple of `align`, or
  /// -1 for a large allocation.
  static constexpr int size_class(std::size_t bytes,
                                  std::size_t align) noexcept {
    if (bytes > detail::kMaxSmall || align > detail::kMaxSmall) {
      return -1;
    }
    return detail::size_class(bytes, align);
  }

  /// Enough spans for at least 8 blocks.
  static constexpr std::uint32_t slab_spans(std::uint32_t block) noexcept {
    return std::uint32_t((std::size_t(block) * 8 + span_size - 1) / span_size);
  }

  /// Returns the first of `count` fresh spans, or 0 if the cage is full.
  static std::uint32_t take_spans(header* h, std::uint32_t count) noexcept {
    // First fit from the freed large runs.
    std::uint32_t* link = &h->free_runs;
    while (std::uint32_t first = *link) {
      auto* run = static_cast<free_run_header*>(at(first * span_size));
      if (run->spans >= count) {
        std::uint32_t rest = run->spans - count;
        if (rest == 0) {
          *link = run->next;
        } else {
          auto* tail = static_cast<free_run_header*>(
              at((first + count) * std::uint64_t(span_size)));
          *tail = {rest, run->next};
          *link = first + count;
        }
        return first;
      }
      link = &run->next;
    }
    if (std::uint64_t(h->next_span) + count > span_count - 1) {
      return 0;
    }
    std::uint32_t first = h->next_span;
    h->next_span += count;
    return first;
  }

  static void free_run(header* h, std::uint32_t first,
                       std::uint32_t spans) noexcept {
    *static_cast<free_run_header*>(at(first * std::uint64_t(span_size))) = {
        spans, h->free_runs};
    h->free_runs = first;
  }

  static void* allocate_large(header* h, std::size_t bytes) noexcept {
    if (bytes > usable_end) {
      return nullptr;
    }
    auto spans = std::uint32_t((bytes + span_size - 1) / span_size);
    std::uint32_t first = take_spans(h, spans);
    if (!first) {
      return nullptr;
    }
    table()[first] = kLarge | spans;
    h->allocated += std::uint64_t(spans) * span_size;
    return at(first * std::uint64_t(span_size));
  }

  inline static detail::base_address base_{};
  static inline std::uintptr_t previous_base_ = 0;
};

}  // namespace cptr
