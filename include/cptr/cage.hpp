// SPDX-License-Identifier: MIT
// A cage is a reserved, size-aligned region of address space. Anything
// allocated inside it can be referred to by a 32-bit offset from its base.
#pragma once

#include <array>
#include <atomic>
#include <bit>
#include <cassert>
#include <cstddef>
#include <cstdint>
#include <cstring>
#include <map>
#include <memory_resource>
#include <new>
#include <thread>
#include <vector>

#include "cptr/platform.hpp"

// Under AddressSanitizer, freed and not yet handed out cage memory is
// poisoned, so use-after-free through a compressed pointer is reported.
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

struct lock_guard {
  spin_lock& lock;
  explicit lock_guard(spin_lock& l) : lock(l) { lock.lock(); }
  ~lock_guard() { lock.unlock(); }
  lock_guard(const lock_guard&) = delete;
  lock_guard& operator=(const lock_guard&) = delete;
};

// Size classes: multiples of 8 up to 128, multiples of 16 up to 256, then
// four classes per power of two up to 32 KiB. Larger requests get whole
// spans. Blocks have no header, so a 24-byte node really costs 24 bytes.
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
static_assert(kClassSizes.back() == kMaxSmall && kMaxSmall % 4096 == 0);

}  // namespace detail

// A cage of 2^SizeLog2 bytes. Compressed pointers are 32-bit offsets shifted
// right by Shift, so a cage can be up to 2^(32 + Shift) bytes as long as all
// compressed pointers are aligned to 2^Shift.
//
// Tag makes each cage a distinct type with its own static base address, so
// decompression is a load of a global and an add. Define one cage type per
// heap you want to compress, for example:
//
//   struct my_heap : cptr::cage<my_heap> {};
template <class Tag, unsigned SizeLog2 = 32, unsigned Shift = 0>
class cage {
  static_assert(sizeof(void*) == 8, "cages need a 64-bit address space");
  static_assert(SizeLog2 >= 24, "a cage must be at least 16 MiB");
  static_assert(SizeLog2 <= 32 + Shift,
                "compressed offsets must fit in 32 bits");
  static_assert(Shift <= 4, "shift is limited to 16-byte granularity");

 public:
  using tag = Tag;
  static constexpr std::size_t size = std::size_t(1) << SizeLog2;
  static constexpr unsigned shift = Shift;
  // Every compressible pointer must be aligned to this.
  static constexpr std::size_t granularity = std::size_t(1) << Shift;
  // The first span is never handed out, so offset zero stays nullptr.
  static constexpr std::size_t span_size = 64 * 1024;
  static constexpr std::size_t span_count = size / span_size;

  // Reserve the cage. Called lazily by allocate(); call it early to fail
  // fast. Returns false if the address space could not be reserved.
  static bool init() noexcept {
    if (ready_.load(std::memory_order_acquire)) {
      return true;
    }
    state_type* st;
    try {
      st = &state();
    } catch (...) {
      return false;
    }
    detail::lock_guard g(st->lock);
    if (ready_.load(std::memory_order_relaxed)) {
      return true;
    }
    void* p = detail::reserve_aligned(size, size);
    if (!p) {
      return false;
    }
    st->bump = span_size;
    st->commit_end = span_size;
    base_ = reinterpret_cast<std::uintptr_t>(p);
    ready_.store(true, std::memory_order_release);
    return true;
  }

  // Zero until init() succeeds. Any thread that obtained a pointer into the
  // cage is ordered after init(), so reading the base needs no atomics.
  static std::uintptr_t base() noexcept { return base_; }

  static bool contains(const void* p) noexcept {
    return base_ != 0 && reinterpret_cast<std::uintptr_t>(p) - base_ < size;
  }

  static std::uint32_t compress(const void* p) noexcept {
    if (!p) {
      return 0;
    }
    CPTR_ASSERT(contains(p), "pointer is outside the cage");
    std::uintptr_t offset = reinterpret_cast<std::uintptr_t>(p) - base_;
    CPTR_ASSERT((offset & (granularity - 1)) == 0,
                "pointer is not aligned to the cage granularity");
    return static_cast<std::uint32_t>(offset >> Shift);
  }

  // Zero maps back to nullptr. Compilers turn this into a conditional move,
  // which keeps the null check off the critical path of a pointer chase.
  static void* decompress(std::uint32_t bits) noexcept {
    std::uintptr_t full = base_ + (std::uintptr_t(bits) << Shift);
    return reinterpret_cast<void*>(bits ? full : std::uintptr_t(0));
  }

  static void* decompress_nonnull(std::uint32_t bits) noexcept {
    return reinterpret_cast<void*>(base_ + (std::uintptr_t(bits) << Shift));
  }

  // Allocate memory inside the cage. Throws std::bad_alloc when the cage is
  // full or cannot be reserved.
  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (void* p = try_allocate(bytes, align)) {
      return p;
    }
    throw std::bad_alloc();
  }

  // As allocate(), but returns nullptr on failure.
  static void* try_allocate(std::size_t bytes,
                            std::size_t align = alignof(
                                std::max_align_t)) noexcept {
    CPTR_ASSERT(std::has_single_bit(align), "alignment must be a power of two");
    if (!init()) {
      return nullptr;
    }
    if (bytes == 0) {
      bytes = 1;
    }
    if (align < granularity) {
      align = granularity;
    }
    detail::lock_guard g(state().lock);
    int cls = size_class(bytes, align);
    if (cls >= 0) {
      return allocate_small(cls);
    }
    return allocate_large(bytes, align);
  }

  // Free memory from allocate(). The size is not needed: the span table
  // records how every span is used.
  static void deallocate(void* p) noexcept {
    if (!p) {
      return;
    }
    CPTR_ASSERT(contains(p), "pointer was not allocated from this cage");
    state_type& st = state();
    detail::lock_guard g(st.lock);
    std::size_t offset = reinterpret_cast<std::uintptr_t>(p) - base_;
    std::uint32_t span = static_cast<std::uint32_t>(offset / span_size);
    std::uint8_t cls = st.span_class[span];
    if (cls < detail::kClassSizes.size()) {
      std::memcpy(p, &st.free_lists[cls], sizeof(std::uint32_t));
      st.free_lists[cls] = static_cast<std::uint32_t>(offset >> Shift);
      st.allocated -= detail::kClassSizes[cls];
      CPTR_POISON(p, detail::kClassSizes[cls]);
      return;
    }
    CPTR_ASSERT(cls == kLargeSpan && offset % span_size == 0,
                "pointer is not the start of a live allocation");
    free_large(span);
  }

  static void deallocate(void* p, std::size_t, std::size_t = 0) noexcept {
    deallocate(p);
  }

  // Bytes handed out and not yet freed, rounded up to the size class.
  static std::size_t allocated_bytes() noexcept {
    if (!ready_.load(std::memory_order_acquire)) {
      return 0;
    }
    detail::lock_guard g(state().lock);
    return state().allocated;
  }

  // Bytes of the cage backed by committed memory.
  static std::size_t committed_bytes() noexcept {
    if (!ready_.load(std::memory_order_acquire)) {
      return 0;
    }
    detail::lock_guard g(state().lock);
    return state().committed;
  }

  // A std::pmr::memory_resource that allocates from this cage.
  static std::pmr::memory_resource* resource() noexcept {
    // Never destroyed, so containers with static storage duration can still
    // free into it during program exit.
    static resource_type* r = new resource_type;
    return r;
  }

 private:
  static constexpr std::uint8_t kUnusedSpan = 0xFF;  // above the bump pointer
  static constexpr std::uint8_t kLargeSpan = 0xFE;
  static constexpr std::uint8_t kFreeSpan = 0xFD;  // in a decommitted run
  static constexpr std::size_t kCommitStep = 1024 * 1024;

  struct state_type {
    detail::spin_lock lock;
    std::size_t bump = 0;        // next unused offset
    std::size_t commit_end = 0;  // end of the committed bump region
    std::size_t committed = 0;   // bytes currently committed
    std::size_t allocated = 0;
    // Free lists hold compressed offsets, linked through the blocks.
    std::array<std::uint32_t, detail::kClassSizes.size()> free_lists{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_cursor{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_end{};
    std::vector<std::uint8_t> span_class =
        std::vector<std::uint8_t>(span_count, kUnusedSpan);
    // For a large allocation or a free run: its length in spans, stored at
    // its first and last span so that neighbours can be merged.
    std::vector<std::uint32_t> run_length =
        std::vector<std::uint32_t>(span_count, 0);
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

  // Never destroyed, for the same reason as resource().
  static state_type& state() {
    static state_type* s = new state_type;
    return *s;
  }

  static int size_class(std::size_t bytes, std::size_t align) noexcept {
    if (bytes <= 128 && align <= 8) {
      return static_cast<int>((bytes + 7) / 8 - 1);
    }
    if (bytes <= 256 && align <= 16) {
      if (bytes <= 128) {
        return static_cast<int>((bytes + 15) / 16 * 2 - 1);
      }
      return static_cast<int>(16 + (bytes - 129) / 16);
    }
    if (bytes > detail::kMaxSmall || align > 4096) {
      return -1;
    }
    // The largest class is a multiple of every alignment up to 4096, so
    // this always stops.
    std::size_t i = 0;
    while (detail::kClassSizes[i] < bytes || detail::kClassSizes[i] % align) {
      i++;
    }
    return static_cast<int>(i);
  }

  static void set_run(std::uint32_t first, std::uint32_t count,
                      std::uint8_t kind) noexcept {
    state_type& st = state();
    std::memset(&st.span_class[first], kind, count);
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

  // Record a free run. If the index cannot grow, the run is leaked: its
  // memory is already decommitted, only the address space is lost.
  static void remember_free_run(std::uint32_t first,
                                std::uint32_t count) noexcept {
    set_run(first, count, kFreeSpan);
    try {
      state().free_runs.emplace(count, first);
    } catch (...) {
    }
  }

  // Take |count| spans, reusing a free run if one is big enough, and commit
  // them. Returns 0 on failure.
  static std::uint32_t take_spans(std::uint32_t count) noexcept {
    state_type& st = state();
    auto run = st.free_runs.lower_bound(count);
    if (run != st.free_runs.end()) {
      std::uint32_t first = run->second;
      std::uint32_t have = run->first;
      void* p = reinterpret_cast<void*>(base_ + std::uintptr_t(first) *
                                                    span_size);
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
    if (st.bump + bytes > size) {
      return 0;
    }
    std::size_t start = st.bump;
    std::size_t needed = start + bytes;
    if (needed > st.commit_end) {
      std::size_t grow = needed - st.commit_end;
      grow = (grow + kCommitStep - 1) / kCommitStep * kCommitStep;
      if (st.commit_end + grow > size) {
        grow = size - st.commit_end;
      }
      if (!detail::commit(reinterpret_cast<void*>(base_ + st.commit_end),
                          grow)) {
        return 0;
      }
      st.committed += grow;
      st.commit_end += grow;
    }
    st.bump = needed;
    return static_cast<std::uint32_t>(start / span_size);
  }

  static void* allocate_small(int cls) noexcept {
    state_type& st = state();
    std::uint32_t& head = st.free_lists[cls];
    std::uint32_t block_size = detail::kClassSizes[cls];
    if (head) {
      void* p = decompress_nonnull(head);
      CPTR_UNPOISON(p, block_size);
      std::memcpy(&head, p, sizeof(head));
      st.allocated += block_size;
      return p;
    }
    if (st.slab_cursor[cls] + block_size > st.slab_end[cls]) {
      // One slab is a whole number of spans holding at least 16 blocks.
      std::uint32_t spans = static_cast<std::uint32_t>(
          (std::size_t(block_size) * 16 + span_size - 1) / span_size);
      std::uint32_t first = take_spans(spans);
      if (!first) {
        return nullptr;
      }
      std::memset(&st.span_class[first], cls, spans);
      st.slab_cursor[cls] = std::size_t(first) * span_size;
      st.slab_end[cls] = st.slab_cursor[cls] + std::size_t(spans) * span_size;
      CPTR_POISON(reinterpret_cast<void*>(base_ + st.slab_cursor[cls]),
                  std::size_t(spans) * span_size);
    }
    void* p = reinterpret_cast<void*>(base_ + st.slab_cursor[cls]);
    CPTR_UNPOISON(p, block_size);
    st.slab_cursor[cls] += block_size;
    st.allocated += block_size;
    return p;
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
    return reinterpret_cast<void*>(base_ + std::uintptr_t(first) * span_size);
  }

  static void free_large(std::uint32_t first) noexcept {
    state_type& st = state();
    std::uint32_t count = st.run_length[first];
    st.allocated -= std::size_t(count) * span_size;
    st.committed -= std::size_t(count) * span_size;
    detail::decommit(
        reinterpret_cast<void*>(base_ + std::uintptr_t(first) * span_size),
        std::size_t(count) * span_size);
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

  inline static std::uintptr_t base_ = 0;
  inline static std::atomic<bool> ready_{false};
};

// The default cage: 4 GiB, byte granularity.
struct default_cage : cage<default_cage> {};

}  // namespace cptr
