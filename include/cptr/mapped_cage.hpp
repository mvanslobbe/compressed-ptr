// SPDX-License-Identifier: MIT
// A cage backed by a file. Compressed pointers are offsets from the cage's
// base, so a structure built in the file is still valid when the file is
// mapped again later, by another process, at another address.
#pragma once

#if defined(_WIN32)
#  error "cptr/mapped_cage.hpp needs POSIX mmap"
#endif

#include <fcntl.h>
#include <sys/mman.h>
#include <sys/stat.h>
#include <unistd.h>

#include <algorithm>
#include <atomic>
#include <bit>
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
/// The allocator's state is in the file too, behind a lock in the file, so
/// several processes may allocate in the same file at once. The containers
/// themselves are not synchronised. A process that dies while holding the
/// lock leaves the file locked. Freed small blocks are kept per size class;
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

  /// Map the file at |path| as the cage, creating it if it does not exist.
  /// Fails if a file is already open, if the file is not a cage of this
  /// size, or if address space or the file cannot be had.
  static bool open(const char* path) noexcept {
    if (base_ != 0) {
      return false;
    }
    void* p = detail::reserve_aligned(size, size);
    if (!p) {
      return false;
    }
    int fd = ::open(path, O_RDWR | O_CREAT | O_CLOEXEC, 0644);
    struct stat st;
    bool ok = fd >= 0 && fstat(fd, &st) == 0;
    bool fresh = ok && st.st_size == 0;
    ok = ok && (fresh ? ftruncate(fd, off_t(size)) == 0
                      : std::size_t(st.st_size) == size);
    ok = ok && mmap(p, size, PROT_READ | PROT_WRITE, MAP_SHARED | MAP_FIXED, fd,
                    0) == p;
    if (fd >= 0) {
      ::close(fd);
    }
    auto* h = static_cast<header*>(p);
    if (ok && fresh) {
      format(h);
    }
    if (!ok || h->magic != kMagic || h->version != kVersion ||
        h->size_log2 != SizeLog2) {
      munmap(p, size);
      return false;
    }
    previous_base_ = h->base;
    h->base = reinterpret_cast<std::uintptr_t>(p);
    base_ = reinterpret_cast<std::uintptr_t>(p);
    return true;
  }

  /// Write the file's changed pages back and unmap it. Pointers into the
  /// cage are invalid afterwards.
  static void close() noexcept {
    if (base_ == 0) {
      return;
    }
    void* p = reinterpret_cast<void*>(base_);
    msync(p, size, MS_SYNC);
    munmap(p, size);
    base_ = 0;
  }

  /// Write changed pages back to the file without unmapping it.
  static bool flush() noexcept {
    return base_ != 0 &&
           msync(reinterpret_cast<void*>(base_), size, MS_SYNC) == 0;
  }

  static bool is_open() noexcept { return base_ != 0; }

  /// Zero while no file is open.
  static std::uintptr_t base() noexcept { return base_; }

  /// Where the file was mapped the last time before this open(), or 0 for a
  /// new file.
  static std::uintptr_t previous_base() noexcept { return previous_base_; }

  /// The object the file's user designated with set_root(), or nullptr.
  template <class T>
  static T* root() noexcept {
    return static_cast<T*>(decompress(hdr()->root.load()));
  }
  static void set_root(const void* p) noexcept {
    hdr()->root.store(compress(p));
  }

  static bool contains(const void* p) noexcept {
    return base_ != 0 && reinterpret_cast<std::uintptr_t>(p) - base_ < size;
  }

  static std::uint32_t compress(const void* p) noexcept {
    if (!p) {
      return 0;
    }
    CPTR_CHECK(contains(p), "pointer is outside the cage");
    return static_cast<std::uint32_t>(reinterpret_cast<std::uintptr_t>(p) -
                                      base_);
  }

  static void* decompress(std::uint32_t bits) noexcept {
    CPTR_ASSERT(bits == 0 || base_ != 0, "the mapped cage is not open");
    std::uintptr_t full = base_ + bits;
    return reinterpret_cast<void*>(bits ? full : std::uintptr_t(0));
  }

  static void* decompress_nonnull(std::uint32_t bits) noexcept {
    CPTR_ASSERT(base_ != 0, "the mapped cage is not open");
    return reinterpret_cast<void*>(base_ + bits);
  }

  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (void* p = try_allocate(bytes, align)) {
      return p;
    }
    throw std::bad_alloc();
  }

  /// Returns nullptr when the cage is full or no file is open.
  static void* try_allocate(std::size_t bytes, std::size_t align = alignof(
                                                   std::max_align_t)) noexcept {
    CPTR_ASSERT(std::has_single_bit(align), "alignment must be a power of two");
    if (base_ == 0) {
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
    return base_ ? std::size_t(hdr()->allocated) : 0;
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

  static void format(header* h) noexcept {
    ::new (h) header{};
    h->magic = kMagic;
    h->version = kVersion;
    h->size_log2 = SizeLog2;
    h->next_span = kFirstSpan;
  }

  static header* hdr() noexcept { return reinterpret_cast<header*>(base_); }
  static std::uint32_t* table() noexcept {
    return reinterpret_cast<std::uint32_t*>(base_ + span_size);
  }
  static void* at(std::uint64_t off) noexcept {
    return reinterpret_cast<void*>(base_ + off);
  }

  /// The smallest class that fits |bytes| and is a multiple of |align|, or
  /// -1 for a large allocation.
  static int size_class(std::size_t bytes, std::size_t align) noexcept {
    for (std::size_t i = 0; i < kClasses; i++) {
      std::uint32_t s = detail::kClassSizes[i];
      if (s >= bytes && s % align == 0) {
        return int(i);
      }
    }
    return -1;
  }

  /// Enough spans for at least 8 blocks.
  static std::uint32_t slab_spans(std::uint32_t block) noexcept {
    return std::uint32_t((std::size_t(block) * 8 + span_size - 1) / span_size);
  }

  /// Returns the first of |count| fresh spans, or 0 if the cage is full.
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

  static inline std::uintptr_t base_ = 0;
  static inline std::uintptr_t previous_base_ = 0;
};

}  // namespace cptr
