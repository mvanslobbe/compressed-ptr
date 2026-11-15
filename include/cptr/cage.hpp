// SPDX-License-Identifier: MIT
// A cage is a reserved, size-aligned region of address space. Anything
// allocated inside it can be referred to by a 32-bit offset from its base.
#pragma once

#include <algorithm>
#include <array>
#include <atomic>
#include <bit>
#include <cassert>
#include <chrono>
#include <cstddef>
#include <cstdint>
#include <cstring>
#include <deque>
#include <map>
#include <memory_resource>
#include <new>
#include <thread>
#include <type_traits>
#include <vector>

#include "cptr/platform.hpp"

// Under AddressSanitizer, freed and not yet handed out cage memory is
// poisoned, and so is the rest of a block past the bytes asked for, so
// use-after-free through a compressed pointer and overflows into the
// rounding of a size class or span are reported.
#if defined(__SANITIZE_ADDRESS__)
#  define CPTR_ASAN 1
#elif defined(__has_feature)
#  if __has_feature(address_sanitizer)
#    define CPTR_ASAN 1
#  endif
#endif
#ifdef CPTR_ASAN
#  include <sanitizer/asan_interface.h>
#  define CPTR_POISON(p, n) ASAN_POISON_MEMORY_REGION((p), (n))
#  define CPTR_UNPOISON(p, n) ASAN_UNPOISON_MEMORY_REGION((p), (n))
#else
#  define CPTR_POISON(p, n) ((void)(p), (void)(n))
#  define CPTR_UNPOISON(p, n) ((void)(p), (void)(n))
#endif

namespace cptr {

namespace detail {

class spin_lock {
  std::atomic<bool> locked_{false};

 public:
  void lock() noexcept {
    while (locked_.exchange(true, std::memory_order_acquire)) {
      while (locked_.load(std::memory_order_relaxed)) {
        std::this_thread::yield();
      }
    }
  }
  void unlock() noexcept { locked_.store(false, std::memory_order_release); }
};

template <class Lock>
struct lock_guard {
  Lock& lock;
  explicit lock_guard(Lock& l) : lock(l) { lock.lock(); }
  ~lock_guard() { lock.unlock(); }
  lock_guard(const lock_guard&) = delete;
  lock_guard& operator=(const lock_guard&) = delete;
};

/// Size classes: multiples of 8 up to 128, multiples of 16 up to 256, then
/// four classes per power of two up to 32 KiB. Larger requests get whole
/// spans. Blocks have no header, so a 24-byte node really costs 24 bytes.
inline constexpr std::size_t kMaxSmall = 32 * 1024;

constexpr std::size_t class_count() {
  std::size_t n = 16 + 8;  // 8..128, 144..256
  for (std::size_t p = 256; p < kMaxSmall; p *= 2) {
    n += 4;
  }
  return n;
}

constexpr std::array<std::uint32_t, class_count()> make_class_sizes() {
  std::array<std::uint32_t, class_count()> sizes{};
  std::size_t i = 0;
  for (std::uint32_t s = 8; s <= 128; s += 8) {
    sizes[i++] = s;
  }
  for (std::uint32_t s = 144; s <= 256; s += 16) {
    sizes[i++] = s;
  }
  for (std::uint32_t p = 256; p < kMaxSmall; p *= 2) {
    for (std::uint32_t q = 1; q <= 4; q++) {
      sizes[i++] = p + q * (p / 4);
    }
  }
  return sizes;
}

inline constexpr auto kClassSizes = make_class_sizes();

/// A cage's base address. An enum rather than a std::uintptr_t, so that
/// type-based alias analysis knows stores through a std::uintptr_t* or
/// std::size_t* cannot change it, and compilers keep it in a register
/// across such stores, as in a loop that follows pointers and counts.
enum class base_address : std::uintptr_t {};

// Not constexpr: reaching it in a constant expression fails to compile.
inline void nonnull_pointer_in_constant_expression() noexcept {}

constexpr std::uint32_t compress_constant(const void* p) noexcept {
  if (p) {
    nonnull_pointer_in_constant_expression();
  }
  return 0;
}

constexpr void* decompress_constant(std::uint32_t bits) noexcept {
  if (bits) {
    nonnull_pointer_in_constant_expression();
  }
  return nullptr;
}
static_assert(kClassSizes.back() == kMaxSmall && kMaxSmall % 4096 == 0);

/// The smallest class of at least `bytes` (1 to kMaxSmall) whose size is a
/// multiple of `align` (a power of two up to kMaxSmall). Above 256 bytes
/// there are four classes per power of two p, p + p/4 ... 2p, so the class
/// follows from the top three bits of bytes - 1, and as they are multiples
/// of p/4 >= 64, only alignments above 64 need a short search from there.
constexpr int size_class(std::size_t bytes, std::size_t align) noexcept {
  // No class smaller than this can be a multiple of align. Up to 256 the
  // class of r is itself a multiple of align.
  std::size_t r = (bytes + align - 1) & ~(align - 1);
  if (r <= 128) {
    return static_cast<int>((r + 7) / 8 - 1);
  }
  if (r <= 256) {
    return static_cast<int>(16 + (r - 129) / 16);
  }
  std::size_t b = r - 1;
  auto e = static_cast<unsigned>(std::bit_width(b)) - 1;  // 2^e < r <= 2^(e+1)
  std::size_t i = 24 + (e - 8) * 4 + ((b >> (e - 2)) & 3);
  if (align > 64) {
    // kMaxSmall is a multiple of every alignment allowed, so this stops.
    while (kClassSizes[i] & (align - 1)) {
      i++;
    }
  }
  return static_cast<int>(i);
}

}  // namespace detail

/// A cage of 2^SizeLog2 bytes. Compressed pointers are 32-bit offsets shifted
/// right by Shift, so a cage can be up to 2^(32 + Shift) bytes as long as all
/// compressed pointers are aligned to 2^Shift.
///
/// Tag makes each cage a distinct type with its own static base address, so
/// decompression is a load of a global and an add. Define one cage type per
/// heap you want to compress, for example:
///
///   struct my_heap : cptr::cage<my_heap> {};
template <class Tag, unsigned SizeLog2 = 32, unsigned Shift = 0>
class CPTR_VISIBLE cage {
  static_assert(sizeof(void*) == 8, "cages need a 64-bit address space");
  static_assert(SizeLog2 >= 24, "a cage must be at least 16 MiB");
  static_assert(SizeLog2 <= 32 + Shift,
                "compressed offsets must fit in 32 bits");
  static_assert(Shift <= 4, "shift is limited to 16-byte granularity");

 public:
  using tag = Tag;
  static constexpr std::size_t size = std::size_t(1) << SizeLog2;
  static constexpr unsigned shift = Shift;
  /// Every compressible pointer must be aligned to this.
  static constexpr std::size_t granularity = std::size_t(1) << Shift;
  /// The first span is never handed out, so offset zero stays nullptr. The
  /// last is not either, so that one past the end of any block is inside the
  /// cage and compresses; for a 4 GiB cage the end itself would wrap to 0.
  static constexpr std::size_t span_size = 64 * 1024;
  static constexpr std::size_t span_count = size / span_size;
  static constexpr std::size_t usable_end = size - span_size;

  /// Reserve the cage. Called lazily by allocate(); call it early to fail
  /// fast. Returns false if the address space could not be reserved.
  static bool init() noexcept {
    if (ready_.load(std::memory_order_acquire)) {
      return true;
    }
    state_type* st;
    CPTR_TRY { st = &state(); }
    CPTR_CATCH_ALL { return false; }
    {
      detail::lock_guard g(st->lock);
      if (ready_.load(std::memory_order_relaxed)) {
        return true;
      }
      void* p = detail::reserve_aligned(size, size);
      if (!p) {
        return false;
      }
#if !defined(_WIN32)
      // Hold the lock across fork(), so that the child never starts with it
      // taken by a thread that does not exist there. Registered once, by the
      // thread that reserves the cage, and before any other thread can see
      // the cage ready and take the lock.
      if (pthread_atfork(&lock_for_fork, &unlock_after_fork,
                         &unlock_after_fork) != 0) {
        detail::release(p, size);
        return false;
      }
#endif
      st->bump = span_size;
      st->commit_end = span_size;
      base_ = detail::base_address(reinterpret_cast<std::uintptr_t>(p));
      span_table_ = st->span_class.raw;
      ready_.store(true, std::memory_order_release);
    }
    return true;
  }

  /// Zero until init() succeeds. Any thread that obtained a pointer into the
  /// cage is ordered after init(), so reading the base needs no atomics.
  static std::uintptr_t base() noexcept { return std::uintptr_t(base_); }

  static bool contains(const void* p) noexcept {
    return base() != 0 && reinterpret_cast<std::uintptr_t>(p) - base() < size;
  }

  /// The cage is aligned to its own size, so a pointer's offset is its low
  /// SizeLog2 bits: compressing is a mask and a shift, and nullptr maps to
  /// 0 with no branch. A pointer from outside the cage is caught only by
  /// CPTR_CHECK. In a constant expression only nullptr can be compressed.
  static constexpr std::uint32_t compress(const void* p) noexcept {
    if (std::is_constant_evaluated()) {
      return detail::compress_constant(p);
    }
    CPTR_CHECK(!p || contains(p), "pointer is outside the cage");
    std::uintptr_t offset = reinterpret_cast<std::uintptr_t>(p) & (size - 1);
    CPTR_CHECK((offset & (granularity - 1)) == 0,
               "pointer is not aligned to the cage granularity");
    return static_cast<std::uint32_t>(offset >> Shift);
  }

  /// Zero maps back to nullptr. Clang turns the null check into a
  /// conditional move; GCC into a branch, which is cheap while it predicts
  /// well, as it does when most pointers are not null. In a constant
  /// expression only 0 can be decompressed.
  static constexpr void* decompress(std::uint32_t bits) noexcept {
    if (std::is_constant_evaluated()) {
      return detail::decompress_constant(bits);
    }
    CPTR_ASSERT(bits == 0 || base() != 0, kUninitialised);
    std::uintptr_t full = base() + (std::uintptr_t(bits) << Shift);
    return reinterpret_cast<void*>(bits ? full : std::uintptr_t(0));
  }

  static void* decompress_nonnull(std::uint32_t bits) noexcept {
    CPTR_ASSERT(base() != 0, kUninitialised);
    return reinterpret_cast<void*>(base() + (std::uintptr_t(bits) << Shift));
  }

  /// Allocate memory inside the cage. Throws std::bad_alloc when the cage is
  /// full or cannot be reserved.
  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (void* p = try_allocate(bytes, align)) {
      return p;
    }
    CPTR_THROW(std::bad_alloc(),
               "out of memory: the cage is full or cannot be reserved");
  }

  /// As allocate(), but returns nullptr on failure.
  ///
  /// The common case, a small block from this thread's cache, is kept small
  /// enough for compilers to inline; everything else is out of line.
  static void* try_allocate(std::size_t bytes, std::size_t align = alignof(
                                                   std::max_align_t)) noexcept {
    CPTR_ASSERT(std::has_single_bit(align), "alignment must be a power of two");
    // A thread has a cache only once the cage is initialised. Up to 64-byte
    // alignment the size class is closed-form.
    thread_cache* tc = tls_.cache;
    if (tc && bytes - 1 < detail::kMaxSmall && align <= 64) [[likely]] {
      int cls =
          detail::size_class(bytes, align < granularity ? granularity : align);
      std::uint32_t& n = tc->count[cls];
      if (n != 0) [[likely]] {
        return pop_cached(*tc, cls, n, bytes);
      }
    }
    return try_allocate_slow(bytes, align);
  }

  /// Free memory from allocate(). The size is not needed: the span table
  /// records how every span is used.
  ///
  /// As with try_allocate(), the common case, a small block going back to
  /// this thread's cache, is inline and the rest out of line.
  static void deallocate(void* p) noexcept {
    if (!p) {
      return;
    }
    CPTR_CHECK(contains(p), "pointer was not allocated from this cage");
    std::size_t offset = reinterpret_cast<std::uintptr_t>(p) - base();
    // A live block's span entry does not change, so it can be read without
    // the lock.
    std::uint8_t cls = span_table_[offset / span_size] ^ kUnusedSpan;
    thread_cache* tc = tls_.cache;
    if (tc && cls < detail::kClassSizes.size() &&
        tc->count[cls] != cache_capacity(cls)) [[likely]] {
      push_cached(*tc, cls, p, offset);
      return;
    }
    deallocate_slow(p, offset, cls);
  }

  static void deallocate(void* p, std::size_t, std::size_t = 0) noexcept {
    deallocate(p);
  }

  /// Bytes handed out and not yet freed, rounded up to the size class.
  /// While other threads allocate and free, this is a snapshot that can be
  /// off by the blocks they move meanwhile.
  static std::size_t allocated_bytes() noexcept {
    if (!ready_.load(std::memory_order_acquire)) {
      return 0;
    }
    state_type& st = state();
    detail::lock_guard g(st.lock);
    // Each thread's cache count is read at a slightly different moment, so
    // a block moving from one cache to another can be counted twice.
    std::size_t cached = 0;
    for (thread_cache* c = st.caches; c; c = c->next) {
      cached += c->cached.load(std::memory_order_relaxed);
    }
    return cached < st.allocated ? st.allocated - cached : 0;
  }

  /// Bytes of the cage backed by committed memory.
  static std::size_t committed_bytes() noexcept {
    if (!ready_.load(std::memory_order_acquire)) {
      return 0;
    }
    detail::lock_guard g(state().lock);
    return state().committed;
  }

  /// Return the memory the allocator keeps for reuse to the OS: this
  /// thread's cached blocks go back to their slabs, and every slab with no
  /// live block is released, including the slab each size class is
  /// currently carving blocks from, as is the committed but unused end of
  /// the bump region. Blocks cached by other threads count as live; they go
  /// back when those threads exit. Without trim(), a slab that becomes
  /// empty is kept for reuse until it has been empty for a quarter of a
  /// second (checked whenever a slab becomes empty) or more than 64 MiB of
  /// empty slabs are kept.
  static void trim() noexcept {
    if (!ready_.load(std::memory_order_acquire)) {
      return;
    }
    if (thread_cache* tc = cache()) {
      for (std::size_t cls = 0; cls < detail::kClassSizes.size(); cls++) {
        flush(*tc, int(cls), tc->count[cls]);
      }
    }
    state_type& st = state();
    detail::lock_guard g(st.lock);
    purge_empty_slabs(INT64_MAX);
    for (std::size_t cls = 0; cls < detail::kClassSizes.size(); cls++) {
      std::uint32_t slab = st.current[cls];
      if (slab && st.slabs[slab].live == 0) {
        std::uint32_t spans = slab_spans(detail::kClassSizes[cls]);
        st.current[cls] = 0;
        st.slab_cursor[cls] = st.slab_end[cls] = 0;
        st.committed -= std::size_t(spans) * span_size;
        release_run(slab, spans, true);
      }
    }
    if (st.commit_end > st.bump) {
      detail::decommit(reinterpret_cast<void*>(base() + st.bump),
                       st.commit_end - st.bump);
      st.committed -= st.commit_end - st.bump;
      st.commit_end = st.bump;
    }
  }

  /// A std::pmr::memory_resource that allocates from this cage. It is never
  /// destroyed, so containers with static storage duration can still free
  /// into it during program exit, after the thread caches are gone: such
  /// frees go straight to the slabs.
  static std::pmr::memory_resource* resource() noexcept {
    // Out of memory this early is fatal anyway.
    // NOLINTNEXTLINE(bugprone-unhandled-exception-at-new)
    static resource_type* r = new resource_type;
    return r;
  }

 private:
  static constexpr std::uint8_t kUnusedSpan = 0xFF;  // above the bump pointer
  static constexpr std::uint8_t kLargeSpan = 0xFE;
  static constexpr std::uint8_t kFreeSpan = 0xFD;  // in a decommitted run
  static constexpr std::size_t kCommitStep = 1024 * 1024;
  static constexpr std::uint32_t kRecent = 32;
  /// Empty slabs stay committed for reuse until they have been empty this
  /// long, or until more than kRetainMax bytes of them are kept.
  static constexpr std::int64_t kRetainMs = 250;
  static constexpr std::size_t kRetainMax = 64 * 1024 * 1024;
  static constexpr std::uint8_t kEmptySlab = 0xFC;

  /// Bookkeeping for small-block slabs, one entry per span. `start` is set
  /// for every span of a slab; the other fields only at its first span.
  struct slab_meta {
    std::uint32_t start;
    std::uint32_t live;       // blocks handed out
    std::uint32_t free_head;  // compressed offset of a free block, 0 = none
    std::uint32_t next;       // in the class's partial list, 0 = end
    std::uint32_t prev;
    std::uint32_t in_partial;
  };

  /// A table with an entry per span, zero-filled by the OS and only backed
  /// by memory where it is touched. The three tables cost 29 bytes of address
  /// space per span (1.8 MiB for a 4 GiB cage, 29 MiB for a 64 GiB one), but
  /// only the pages that cover the spans in use become resident.
  template <class T>
  static T* new_span_table() {
    std::size_t bytes = span_count * sizeof(T);
    bytes = (bytes + 65535) / 65536 * 65536;
    void* p = detail::reserve_aligned(bytes, 65536);
    if (!p || !detail::commit(p, bytes)) {
      CPTR_THROW(std::bad_alloc(),
                 "out of memory: the cage is full or cannot be reserved");
    }
    return static_cast<T*>(p);
  }

  /// How each span is used: a size class, or one of the k...Span values.
  /// Stored inverted, so that the OS's zero fill reads as kUnusedSpan.
  struct span_kinds {
    std::uint8_t* raw = new_span_table<std::uint8_t>();
    std::uint8_t operator[](std::size_t i) const noexcept {
      return raw[i] ^ kUnusedSpan;
    }
    void fill(std::size_t first, std::size_t count,
              std::uint8_t kind) noexcept {
      std::memset(raw + first, kind ^ kUnusedSpan, count);
    }
  };

  struct thread_cache;

  struct state_type {
    detail::spin_lock lock;
    std::size_t bump = 0;        // next unused offset
    std::size_t commit_end = 0;  // end of the committed bump region
    std::size_t committed = 0;   // bytes currently committed
    std::size_t allocated = 0;
    /// Per size class: the slab blocks are taken from, the unused tail of
    /// that slab, and a list of other slabs that have free blocks.
    std::array<std::uint32_t, detail::kClassSizes.size()> current{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_cursor{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_end{};
    std::array<std::uint32_t, detail::kClassSizes.size()> partial{};
    /// Every thread's cache, for allocated_bytes().
    thread_cache* caches = nullptr;
    slab_meta* slabs = new_span_table<slab_meta>();
    struct empty_slab {
      std::uint32_t first, count;
      std::int64_t since_ms;
    };
    std::deque<empty_slab> empty;  // oldest first
    std::size_t empty_bytes = 0;
    span_kinds span_class;
    /// For a large allocation or a free run: its length in spans, stored at
    /// its first and last span so that neighbours can be merged.
    std::uint32_t* run_length = new_span_table<std::uint32_t>();
    std::multimap<std::uint32_t, std::uint32_t> free_runs;  // length -> first
  };

  class resource_type final : public std::pmr::memory_resource {
    void* do_allocate(std::size_t bytes, std::size_t align) override {
      return cage::allocate(bytes, align);
    }
    void do_deallocate(void* p, std::size_t, std::size_t) override {
      cage::deallocate(p);
    }
    bool do_is_equal(const memory_resource& other) const noexcept override {
      return this == &other;
    }
  };

  /// Never destroyed, for the same reason as resource().
  static state_type& state() {
    static state_type* s = new state_type;
    return *s;
  }

  /// Freed small blocks, per thread and size class, so that most
  /// allocations and frees take no lock. Blocks here count as live in their
  /// slabs. A thread's cache goes back to the slabs when the thread exits.
  struct thread_cache {
    std::array<std::uint32_t, detail::kClassSizes.size()> count{};
    std::array<std::array<std::uint32_t, kRecent>, detail::kClassSizes.size()>
        blocks;
    /// Bytes in `blocks`. Only the owning thread writes it.
    std::atomic<std::size_t> cached{0};
    thread_cache* next = nullptr;
    thread_cache* prev = nullptr;

    thread_cache() noexcept {
      tls_.cache = this;
      state_type& st = state();
      detail::lock_guard g(st.lock);
      next = st.caches;
      if (next) {
        next->prev = this;
      }
      st.caches = this;
    }
    ~thread_cache() {
      for (std::size_t cls = 0; cls < count.size(); cls++) {
        flush(*this, int(cls), count[cls]);
      }
      // From here on this thread allocates and frees without a cache.
      tls_.cache = nullptr;
      tls_.gone = true;
      state_type& st = state();
      detail::lock_guard g(st.lock);
      if (prev) {
        prev->next = next;
      } else {
        st.caches = next;
      }
      if (next) {
        next->prev = prev;
      }
    }
    thread_cache(const thread_cache&) = delete;
    thread_cache& operator=(const thread_cache&) = delete;
  };

  /// This thread's cache, or nullptr once it has been destroyed:
  /// thread_local objects destroyed after it, and objects with static
  /// storage duration in the main thread, still allocate and free, and do so
  /// straight from the slabs. The slot is trivially destructible, so it
  /// outlives every thread_local destructor, and reading it needs no guard.
  struct tls_slot {
    thread_cache* cache;
    bool gone;
  };
  inline static thread_local constinit tls_slot tls_{nullptr, false};

  static thread_cache* cache() noexcept {
    if (thread_cache* c = tls_.cache) [[likely]] {
      return c;
    }
    return first_cache();
  }

  CPTR_NOINLINE static thread_cache* first_cache() noexcept {
    if (tls_.gone) {
      return nullptr;
    }
    thread_local thread_cache c;
    return &c;
  }

  CPTR_NOINLINE static void* allocate_uncached(int cls,
                                               std::size_t bytes) noexcept {
    detail::lock_guard g(state().lock);
    void* p = allocate_from_slab(cls);
    if (p) {
      state().allocated += detail::kClassSizes[cls];
      CPTR_POISON(p, detail::kClassSizes[cls]);
      CPTR_UNPOISON(p, bytes);
    }
    return p;
  }

  CPTR_NOINLINE static void free_uncached(void* p, int cls) noexcept {
    detail::lock_guard g(state().lock);
    CPTR_POISON(p, detail::kClassSizes[cls]);
    return_to_slab(p, cls);
    state().allocated -= detail::kClassSizes[cls];
  }

  static void* pop_cached(thread_cache& tc, int cls, std::uint32_t& n,
                          std::size_t bytes) noexcept {
    std::uint32_t block_size = detail::kClassSizes[cls];
    void* p = decompress_nonnull(tc.blocks[cls][--n]);
    // Only the bytes asked for, so that overflows into the rest of the
    // block are reported too.
    CPTR_UNPOISON(p, bytes);
    tc.cached.store(tc.cached.load(std::memory_order_relaxed) - block_size,
                    std::memory_order_relaxed);
    return p;
  }

  static void push_cached(thread_cache& tc, int cls, void* p,
                          std::size_t offset) noexcept {
    std::uint32_t block_size = detail::kClassSizes[cls];
    CPTR_POISON(p, block_size);
    tc.blocks[cls][tc.count[cls]++] =
        static_cast<std::uint32_t>(offset >> Shift);
    tc.cached.store(tc.cached.load(std::memory_order_relaxed) + block_size,
                    std::memory_order_relaxed);
  }

  CPTR_NOINLINE static void* try_allocate_slow(std::size_t bytes,
                                               std::size_t align) noexcept {
    if (!init()) {
      return nullptr;
    }
    if (bytes == 0) {
      bytes = 1;
    }
    if (align < granularity) {
      align = granularity;
    }
    int cls = size_class(bytes, align);
    if (cls >= 0) {
      // Small blocks come from this thread's cache, which is refilled from
      // the slabs a batch at a time.
      thread_cache* tcp = cache();
      if (!tcp) [[unlikely]] {
        return allocate_uncached(cls, bytes);
      }
      thread_cache& tc = *tcp;
      std::uint32_t& n = tc.count[cls];
      if (n == 0 && !refill(tc, cls)) {
        return nullptr;
      }
      return pop_cached(tc, cls, n, bytes);
    }
    return allocate_large_locked(bytes, align);
  }

  CPTR_NOINLINE static void deallocate_slow(void* p, std::size_t offset,
                                            std::uint8_t cls) noexcept {
    state_type& st = state();
    if (cls < detail::kClassSizes.size()) {
      thread_cache* tcp = cache();
      if (!tcp) [[unlikely]] {
        free_uncached(p, cls);
        return;
      }
      thread_cache& tc = *tcp;
      if (tc.count[cls] == cache_capacity(cls)) {
        flush(tc, cls, cache_capacity(cls) / 2);
      }
      push_cached(tc, cls, p, offset);
      return;
    }
    detail::lock_guard g(st.lock);
    CPTR_ASSERT(cls == kLargeSpan && offset % span_size == 0,
                "pointer is not the start of a live allocation");
    free_large(static_cast<std::uint32_t>(offset / span_size));
  }

  /// Blocks a thread keeps per class: up to kRecent, and up to 32 KiB of
  /// them, but at least 4 (so up to 128 KiB for the largest classes).
  static constexpr std::uint32_t cache_capacity(int cls) noexcept {
    std::uint32_t n = 32768 / detail::kClassSizes[cls];
    return n < 4 ? 4 : n > kRecent ? kRecent : n;
  }

  /// Fill half of this thread's cache for `cls` from the slabs.
  static bool refill(thread_cache& tc, int cls) noexcept {
    state_type& st = state();
    std::uint32_t block_size = detail::kClassSizes[cls];
    std::uint32_t want = cache_capacity(cls) / 2;
    std::uint32_t& n = tc.count[cls];
    detail::lock_guard g(st.lock);
    // Take a run from the current slab's unused tail in one go.
    std::uint32_t slab = st.current[cls];
    if (slab && !st.slabs[slab].free_head) {
      std::size_t room = (st.slab_end[cls] - st.slab_cursor[cls]) / block_size;
      std::uint32_t take =
          static_cast<std::uint32_t>(room < want - n ? room : want - n);
      std::uint32_t bits =
          static_cast<std::uint32_t>(st.slab_cursor[cls] >> Shift);
      for (std::uint32_t i = 0; i < take; i++) {
        tc.blocks[cls][n++] = bits + i * (block_size >> Shift);
      }
      st.slab_cursor[cls] += std::size_t(take) * block_size;
      st.slabs[slab].live += take;
    }
    while (n < want) {
      void* p = allocate_from_slab(cls);
      if (!p) {
        break;
      }
      CPTR_POISON(p, block_size);
      tc.blocks[cls][n++] = compress(p);
    }
    // The cache pops from the end; hand out a fresh slab's blocks in address
    // order, so that consecutive allocations are adjacent going forwards.
    std::reverse(tc.blocks[cls].begin(), tc.blocks[cls].begin() + n);
    st.allocated += std::size_t(n) * block_size;
    tc.cached.store(
        tc.cached.load(std::memory_order_relaxed) + std::size_t(n) * block_size,
        std::memory_order_relaxed);
    return n > 0;
  }

  /// Return the oldest `k` blocks of this thread's cache for `cls` to their
  /// slabs.
  static void flush(thread_cache& tc, int cls, std::uint32_t k) noexcept {
    if (k == 0) {
      return;
    }
    state_type& st = state();
    std::uint32_t block_size = detail::kClassSizes[cls];
    auto& blocks = tc.blocks[cls];
    {
      detail::lock_guard g(st.lock);
      for (std::uint32_t i = 0; i < k; i++) {
        return_to_slab(decompress_nonnull(blocks[i]), cls);
      }
      // Both counts change under the lock, so allocated_bytes() never sees
      // one without the other.
      st.allocated -= std::size_t(k) * block_size;
      tc.cached.store(tc.cached.load(std::memory_order_relaxed) -
                          std::size_t(k) * block_size,
                      std::memory_order_relaxed);
    }
    std::uint32_t& n = tc.count[cls];
    std::memmove(blocks.data(), blocks.data() + k, sizeof(blocks[0]) * (n - k));
    n -= k;
  }

#if !defined(_WIN32)
  static void lock_for_fork() noexcept { state().lock.lock(); }
  static void unlock_after_fork() noexcept { state().lock.unlock(); }
#endif

  /// The size class for a request, or -1 for a large one: above kMaxSmall
  /// bytes, or aligned to more than 4096 (large runs are 64 KiB aligned).
  static constexpr int size_class(std::size_t bytes,
                                  std::size_t align) noexcept {
    if (bytes > detail::kMaxSmall || align > 4096) {
      return -1;
    }
    return detail::size_class(bytes, align);
  }

  static void set_run(std::uint32_t first, std::uint32_t count,
                      std::uint8_t kind) noexcept {
    state_type& st = state();
    st.span_class.fill(first, count, kind);
    st.run_length[first] = count;
    st.run_length[first + count - 1] = count;
  }

  static void forget_free_run(std::uint32_t first,
                              std::uint32_t count) noexcept {
    auto& runs = state().free_runs;
    auto [lo, hi] = runs.equal_range(count);
    for (auto it = lo; it != hi; ++it) {
      if (it->second == first) {
        runs.erase(it);
        return;
      }
    }
  }

  /// Record a free run. If the index cannot grow, the run is leaked: its
  /// memory is already decommitted, only the address space is lost.
  static void remember_free_run(std::uint32_t first,
                                std::uint32_t count) noexcept {
    set_run(first, count, kFreeSpan);
    CPTR_TRY { state().free_runs.emplace(count, first); }
    CPTR_CATCH_ALL {  // NOLINT(bugprone-empty-catch): leaking is the plan
    }
  }

  /// Take `count` spans, reusing a free run if one is big enough, and commit
  /// them. Returns 0 on failure.
  static std::uint32_t take_spans(std::uint32_t count) noexcept {
    std::uint32_t first = take_spans_once(count);
    if (!first && state().empty_bytes) {
      // The cage may be full of parked empty slabs: purge all of them.
      purge_empty_slabs(INT64_MAX);
      first = take_spans_once(count);
    }
    return first;
  }

  /// A parked empty slab of `count` spans, most recently emptied first, as
  /// its memory is still resident. Returns 0 if there is none.
  static std::uint32_t reuse_empty_slab(std::uint32_t count) noexcept {
    auto& empty = state().empty;
    for (auto it = empty.rbegin(); it != empty.rend(); ++it) {
      if (it->count == count) {
        std::uint32_t first = it->first;
        empty.erase(std::next(it).base());
        state().empty_bytes -= std::size_t(count) * span_size;
        return first;
      }
    }
    return 0;
  }

  /// Keep an empty slab committed for reuse, then purge slabs that have been
  /// empty too long or exceed the retention limit.
  static void park_empty_slab(std::uint32_t first,
                              std::uint32_t count) noexcept {
    state_type& st = state();
    st.span_class.fill(first, count, kEmptySlab);
    std::int64_t now = now_ms();
    CPTR_TRY {
      st.empty.push_back({first, count, now});
      st.empty_bytes += std::size_t(count) * span_size;
    }
    CPTR_CATCH_ALL {
      st.committed -= std::size_t(count) * span_size;
      release_run(first, count, true);
    }
    purge_empty_slabs(now - kRetainMs);
  }

  /// Purge parked slabs emptied before `before_ms`, and the oldest beyond
  /// kRetainMax. purge_empty_slabs(INT64_MAX) purges all of them.
  static void purge_empty_slabs(std::int64_t before_ms) noexcept {
    state_type& st = state();
    while (!st.empty.empty() && (st.empty.front().since_ms < before_ms ||
                                 st.empty_bytes > kRetainMax)) {
      auto e = st.empty.front();
      st.empty.pop_front();
      st.empty_bytes -= std::size_t(e.count) * span_size;
      st.committed -= std::size_t(e.count) * span_size;
      release_run(e.first, e.count, true);
    }
  }

  static std::int64_t now_ms() noexcept {
    return std::chrono::duration_cast<std::chrono::milliseconds>(
               std::chrono::steady_clock::now().time_since_epoch())
        .count();
  }

  static std::uint32_t take_spans_once(std::uint32_t count) noexcept {
    state_type& st = state();
    auto run = st.free_runs.lower_bound(count);
    if (run != st.free_runs.end()) {
      std::uint32_t first = run->second;
      std::uint32_t have = run->first;
      void* p =
          reinterpret_cast<void*>(base() + std::uintptr_t(first) * span_size);
      if (!detail::commit(p, std::size_t(count) * span_size)) {
        return 0;
      }
      st.free_runs.erase(run);
      if (have > count) {
        remember_free_run(first + count, have - count);
      }
      st.committed += std::size_t(count) * span_size;
      return first;
    }
    std::size_t bytes = std::size_t(count) * span_size;
    if (st.bump + bytes > usable_end) {
      return 0;
    }
    std::size_t start = st.bump;
    std::size_t needed = start + bytes;
    if (needed > st.commit_end) {
      std::size_t grow = needed - st.commit_end;
      grow = (grow + kCommitStep - 1) / kCommitStep * kCommitStep;
      if (st.commit_end + grow > usable_end) {
        grow = usable_end - st.commit_end;
      }
      if (!detail::commit(reinterpret_cast<void*>(base() + st.commit_end),
                          grow)) {
        return 0;
      }
      st.committed += grow;
      st.commit_end += grow;
    }
    st.bump = needed;
    return static_cast<std::uint32_t>(start / span_size);
  }

  /// Spans per slab: a whole number holding at least 16 blocks.
  static constexpr std::uint32_t slab_spans(std::uint32_t block_size) noexcept {
    return static_cast<std::uint32_t>(
        (std::size_t(block_size) * 16 + span_size - 1) / span_size);
  }

  static void unlink_partial(int cls, std::uint32_t slab) noexcept {
    state_type& st = state();
    slab_meta& m = st.slabs[slab];
    if (m.prev) {
      st.slabs[m.prev].next = m.next;
    } else {
      st.partial[cls] = m.next;
    }
    if (m.next) {
      st.slabs[m.next].prev = m.prev;
    }
    m.next = m.prev = m.in_partial = 0;
  }

  static void* allocate_from_slab(int cls) noexcept {
    state_type& st = state();
    std::uint32_t block_size = detail::kClassSizes[cls];
    std::uint32_t slab = st.current[cls];
    if (slab) {
      slab_meta& m = st.slabs[slab];
      if (m.free_head) {
        return pop_free(m, block_size);
      }
      if (st.slab_cursor[cls] + block_size <= st.slab_end[cls]) {
        void* p = reinterpret_cast<void*>(base() + st.slab_cursor[cls]);
        CPTR_UNPOISON(p, block_size);
        st.slab_cursor[cls] += block_size;
        m.live++;
        return p;
      }
    }
    // The current slab is full: continue in a slab with free blocks, or
    // start a new one.
    if (std::uint32_t next = st.partial[cls]) {
      unlink_partial(cls, next);
      st.current[cls] = next;
      st.slab_cursor[cls] = st.slab_end[cls] = 0;
      return pop_free(st.slabs[next], block_size);
    }
    std::uint32_t spans = slab_spans(block_size);
    std::uint32_t first = reuse_empty_slab(spans);
    if (!first) {
      first = take_spans(spans);
    }
    if (!first) {
      return nullptr;
    }
    st.span_class.fill(first, spans, std::uint8_t(cls));
    for (std::uint32_t i = 0; i < spans; i++) {
      st.slabs[first + i].start = first;
    }
    st.slabs[first] = slab_meta{first, 0, 0, 0, 0, 0};
    st.current[cls] = first;
    st.slab_cursor[cls] = std::size_t(first) * span_size;
    st.slab_end[cls] = st.slab_cursor[cls] + std::size_t(spans) * span_size;
    CPTR_POISON(reinterpret_cast<void*>(base() + st.slab_cursor[cls]),
                std::size_t(spans) * span_size);
    return allocate_from_slab(cls);
  }

  static void* pop_free(slab_meta& m, std::uint32_t block_size) noexcept {
    void* p = decompress_nonnull(m.free_head);
    CPTR_UNPOISON(p, block_size);
    std::memcpy(&m.free_head, p, sizeof(m.free_head));
    m.live++;
    return p;
  }

  /// Put a block back on its slab's free list. A slab that is not the
  /// current one joins the partial list, or, once all its blocks are free,
  /// is decommitted and its spans returned.
  static void return_to_slab(void* p, int cls) noexcept {
    state_type& st = state();
    std::uint32_t block_size = detail::kClassSizes[cls];
    std::size_t offset = reinterpret_cast<std::uintptr_t>(p) - base();
    std::uint32_t slab =
        st.slabs[static_cast<std::uint32_t>(offset / span_size)].start;
    slab_meta& m = st.slabs[slab];
    CPTR_UNPOISON(p, sizeof(m.free_head));
    std::memcpy(p, &m.free_head, sizeof(m.free_head));
    CPTR_POISON(p, sizeof(m.free_head));
    m.free_head = static_cast<std::uint32_t>(offset >> Shift);
    m.live--;
    if (slab == st.current[cls]) {
      return;
    }
    if (m.live == 0) {
      if (m.in_partial) {
        unlink_partial(cls, slab);
      }
      park_empty_slab(slab, slab_spans(block_size));
      return;
    }
    if (!m.in_partial) {
      m.in_partial = 1;
      m.prev = 0;
      m.next = st.partial[cls];
      if (m.next) {
        st.slabs[m.next].prev = slab;
      }
      st.partial[cls] = slab;
    }
  }

  /// Out of line, so that try_allocate() stays small enough to inline.
  CPTR_NOINLINE static void* allocate_large_locked(std::size_t bytes,
                                                   std::size_t align) noexcept {
    detail::lock_guard g(state().lock);
    return allocate_large(bytes, align);
  }

  static void* allocate_large(std::size_t bytes, std::size_t align) noexcept {
    if (align > span_size || bytes > size - span_size) {
      return nullptr;
    }
    std::uint32_t spans =
        static_cast<std::uint32_t>((bytes + span_size - 1) / span_size);
    std::uint32_t first = take_spans(spans);
    if (!first) {
      return nullptr;
    }
    set_run(first, spans, kLargeSpan);
    state().allocated += std::size_t(spans) * span_size;
    void* p =
        reinterpret_cast<void*>(base() + std::uintptr_t(first) * span_size);
    // The spans may have held a slab whose free blocks were poisoned; only
    // the bytes asked for are usable.
    CPTR_POISON(p, std::size_t(spans) * span_size);
    CPTR_UNPOISON(p, bytes);
    return p;
  }

  static void free_large(std::uint32_t first) noexcept {
    state_type& st = state();
    std::uint32_t count = st.run_length[first];
    st.allocated -= std::size_t(count) * span_size;
    st.committed -= std::size_t(count) * span_size;
    release_run(first, count);
  }

  /// Decommit `count` spans from `first` and record them as a free run,
  /// merged with free neighbours.
  /// `purge` releases the pages but keeps the mapping, which is cheaper for
  /// slabs; large runs are decommitted, so stray accesses fault.
  static void release_run(std::uint32_t first, std::uint32_t count,
                          bool purge = false) noexcept {
    state_type& st = state();
    void* p =
        reinterpret_cast<void*>(base() + std::uintptr_t(first) * span_size);
    if (purge) {
      detail::purge(p, std::size_t(count) * span_size);
    } else {
      detail::decommit(p, std::size_t(count) * span_size);
    }
    // Merge with free neighbours, so that a later large allocation can use
    // the combined run.
    if (first > 1 && st.span_class[first - 1] == kFreeSpan) {
      std::uint32_t left = st.run_length[first - 1];
      forget_free_run(first - left, left);
      first -= left;
      count += left;
    }
    std::uint32_t after = first + count;
    if (after < span_count && st.span_class[after] == kFreeSpan) {
      std::uint32_t right = st.run_length[after];
      forget_free_run(after, right);
      count += right;
    }
    remember_free_run(first, count);
  }

  static constexpr const char* kUninitialised =
      "decompressing in a cage that was never initialised in this module; "
      "is this a separate copy of the cage, such as in another Windows DLL?";

  inline static detail::base_address base_{};
  inline static std::atomic<bool> ready_{false};
  /// state().span_class's table, set before ready_ like base_ and read
  /// without atomics for the same reason.
  inline static const std::uint8_t* span_table_ = nullptr;
};

/// The default cage: 4 GiB, byte granularity.
struct CPTR_VISIBLE default_cage : cage<default_cage> {};

}  // namespace cptr
