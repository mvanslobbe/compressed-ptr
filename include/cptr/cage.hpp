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
#include <unordered_map>
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
    if (base_) {
      return true;
    }
    detail::lock_guard g(state().lock);
    if (base_) {
      return true;
    }
    void* p = detail::reserve_aligned(size, size);
    if (!p) {
      return false;
    }
    state().bump = span_size;
    state().commit_end = span_size;
    base_ = reinterpret_cast<std::uintptr_t>(p);
    return true;
  }

  static std::uintptr_t base() noexcept { return base_; }

  static bool contains(const void* p) noexcept {
    return reinterpret_cast<std::uintptr_t>(p) - base_ < size;
  }

  static std::uint32_t compress(const void* p) noexcept {
    if (!p) {
      return 0;
    }
    assert(contains(p) && "pointer is outside the cage");
    std::uintptr_t offset = reinterpret_cast<std::uintptr_t>(p) - base_;
    assert((offset & (granularity - 1)) == 0 &&
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

  static void* try_allocate(std::size_t bytes,
                            std::size_t align = alignof(
                                std::max_align_t)) noexcept {
    if (!base_ && !init()) {
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
    assert(contains(p));
    detail::lock_guard g(state().lock);
    std::size_t offset = reinterpret_cast<std::uintptr_t>(p) - base_;
    std::uint32_t span = static_cast<std::uint32_t>(offset / span_size);
    std::uint8_t cls = state().span_class[span];
    if (cls < detail::kClassSizes.size()) {
      auto& free_list = state().free_lists[cls];
      std::memcpy(p, &free_list, sizeof(free_list));
      free_list = static_cast<std::uint32_t>(offset >> Shift);
      state().allocated -= detail::kClassSizes[cls];
      CPTR_POISON(p, detail::kClassSizes[cls]);
      return;
    }
    assert(cls == kLargeSpan);
    free_large(span);
  }

  static void deallocate(void* p, std::size_t, std::size_t = 0) noexcept {
    deallocate(p);
  }

  // Bytes handed out and not yet freed, rounded up to the size class.
  static std::size_t allocated_bytes() noexcept { return state().allocated; }
  // Bytes of the cage backed by committed memory.
  static std::size_t committed_bytes() noexcept { return state().committed; }

  static std::pmr::memory_resource* resource() noexcept {
    static resource_type r;
    return &r;
  }

 private:
  static constexpr std::uint8_t kFreeSpan = 0xFF;
  static constexpr std::uint8_t kLargeSpan = 0xFE;
  static constexpr std::size_t kCommitStep = 1024 * 1024;

  struct state_type {
    detail::spin_lock lock;
    std::size_t bump = 0;        // next unused offset
    std::size_t commit_end = 0;  // end of the committed bump region
    std::size_t committed = 0;  // bytes currently committed
    std::size_t allocated = 0;
    // Free lists hold compressed offsets, linked through the blocks.
    std::array<std::uint32_t, detail::kClassSizes.size()> free_lists{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_cursor{};
    std::array<std::size_t, detail::kClassSizes.size()> slab_end{};
    std::vector<std::uint8_t> span_class =
        std::vector<std::uint8_t>(span_count, kFreeSpan);
    std::unordered_map<std::uint32_t, std::uint32_t> large_spans;
    std::multimap<std::uint32_t, std::uint32_t> free_runs;  // count -> first
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

  static state_type& state() noexcept {
    static state_type s;
    return s;
  }

  static int size_class(std::size_t bytes, std::size_t align) noexcept {
    if (bytes <= 128 && align <= 8) {
      return static_cast<int>((bytes + 7) / 8 - 1);
    }
    if (bytes > detail::kMaxSmall || align > 4096) {
      return -1;
    }
    for (std::size_t i = 0; i < detail::kClassSizes.size(); i++) {
      std::uint32_t s = detail::kClassSizes[i];
      if (s >= bytes && s % align == 0) {
        return static_cast<int>(i);
      }
    }
    return -1;
  }

  // Take |count| fresh spans from the bump region, committing as needed.
  static std::uint32_t take_spans(std::uint32_t count) noexcept {
    auto& s = state();
    auto run = s.free_runs.lower_bound(count);
    if (run != s.free_runs.end()) {
      std::uint32_t first = run->second;
      std::uint32_t have = run->first;
      s.free_runs.erase(run);
      if (have > count) {
        s.free_runs.emplace(have - count, first + count);
      }
      void* p = reinterpret_cast<void*>(base_ + std::uintptr_t(first) *
                                                    span_size);
      if (!detail::commit(p, std::size_t(count) * span_size)) {
        return 0;
      }
      s.committed += std::size_t(count) * span_size;
      return first;
    }
    std::size_t bytes = std::size_t(count) * span_size;
    if (s.bump + bytes > size) {
      return 0;
    }
    std::size_t start = s.bump;
    std::size_t needed = start + bytes;
    std::size_t committed_end = s.commit_end;
    if (needed > committed_end) {
      std::size_t grow = needed - committed_end;
      grow = (grow + kCommitStep - 1) / kCommitStep * kCommitStep;
      if (committed_end + grow > size) {
        grow = size - committed_end;
      }
      if (!detail::commit(reinterpret_cast<void*>(base_ + committed_end),
                          grow)) {
        return 0;
      }
      s.committed += grow;
      s.commit_end += grow;
    }
    s.bump = needed;
    return static_cast<std::uint32_t>(start / span_size);
  }

  static void* allocate_small(int cls) noexcept {
    auto& s = state();
    std::uint32_t& head = s.free_lists[cls];
    std::uint32_t block_size = detail::kClassSizes[cls];
    if (head) {
      void* p = decompress_nonnull(head);
      CPTR_UNPOISON(p, block_size);
      std::memcpy(&head, p, sizeof(head));
      s.allocated += block_size;
      return p;
    }
    if (s.slab_cursor[cls] + block_size > s.slab_end[cls]) {
      // One slab is a whole number of spans holding at least 16 blocks.
      std::uint32_t spans = static_cast<std::uint32_t>(
          (std::size_t(block_size) * 16 + span_size - 1) / span_size);
      std::uint32_t first = take_spans(spans);
      if (!first) {
        return nullptr;
      }
      for (std::uint32_t i = 0; i < spans; i++) {
        s.span_class[first + i] = static_cast<std::uint8_t>(cls);
      }
      s.slab_cursor[cls] = std::size_t(first) * span_size;
      s.slab_end[cls] = s.slab_cursor[cls] + std::size_t(spans) * span_size;
      CPTR_POISON(reinterpret_cast<void*>(base_ + s.slab_cursor[cls]),
                  std::size_t(spans) * span_size);
    }
    void* p = reinterpret_cast<void*>(base_ + s.slab_cursor[cls]);
    CPTR_UNPOISON(p, block_size);
    s.slab_cursor[cls] += block_size;
    s.allocated += block_size;
    return p;
  }

  static void* allocate_large(std::size_t bytes, std::size_t align) noexcept {
    if (align > span_size || bytes > size) {
      return nullptr;
    }
    auto& s = state();
    std::uint32_t spans =
        static_cast<std::uint32_t>((bytes + span_size - 1) / span_size);
    std::uint32_t first = take_spans(spans);
    if (!first) {
      return nullptr;
    }
    s.span_class[first] = kLargeSpan;
    s.large_spans[first] = spans;
    s.allocated += std::size_t(spans) * span_size;
    return reinterpret_cast<void*>(base_ + std::uintptr_t(first) * span_size);
  }

  static void free_large(std::uint32_t first) noexcept {
    auto& s = state();
    auto it = s.large_spans.find(first);
    assert(it != s.large_spans.end());
    std::uint32_t spans = it->second;
    s.large_spans.erase(it);
    s.span_class[first] = kFreeSpan;
    s.allocated -= std::size_t(spans) * span_size;
    s.committed -= std::size_t(spans) * span_size;
    detail::decommit(
        reinterpret_cast<void*>(base_ + std::uintptr_t(first) * span_size),
        std::size_t(spans) * span_size);
    s.free_runs.emplace(spans, first);
  }

  inline static std::uintptr_t base_ = 0;
};

// The default cage: 4 GiB, byte granularity.
struct default_cage : cage<default_cage> {};

}  // namespace cptr
