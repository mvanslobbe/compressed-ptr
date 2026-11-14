// SPDX-License-Identifier: MIT
// Packing helpers: put compressed pointers and small values together in one
// machine word. These are where most of the memory saving comes from in
// practice, because a lone 4-byte field next to an 8-byte one is padded back
// to 8 bytes.
#pragma once

#include <atomic>
#include <bit>
#include <cassert>
#include <cstdint>

#include "cptr/ptr.hpp"

namespace cptr {

/// Two compressed pointers in 8 bytes, e.g. a tree node's children or a list
/// node's links.
template <class A, class B = A, class Cage = default_cage>
class ptr_pair {
 public:
  constexpr ptr_pair() noexcept = default;
  ptr_pair(A* a, B* b) noexcept
      : bits_(std::uint64_t(Cage::compress(a)) |
              std::uint64_t(Cage::compress(b)) << 32) {}

  A* first() const noexcept {
    return static_cast<A*>(Cage::decompress(std::uint32_t(bits_)));
  }
  B* second() const noexcept {
    return static_cast<B*>(Cage::decompress(std::uint32_t(bits_ >> 32)));
  }
  void set_first(A* a) noexcept {
    bits_ = (bits_ & ~std::uint64_t(UINT32_MAX)) | Cage::compress(a);
  }
  void set_second(B* b) noexcept {
    bits_ = (bits_ & UINT32_MAX) | std::uint64_t(Cage::compress(b)) << 32;
  }

 private:
  std::uint64_t bits_ = 0;
};

/// A compressed pointer and a 32-bit payload in 8 bytes, e.g. a node pointer
/// and a count, hash or flags.
template <class T, class Cage = default_cage>
class ptr_with_payload {
 public:
  constexpr ptr_with_payload() noexcept = default;
  ptr_with_payload(T* p, std::uint32_t payload) noexcept
      : bits_(std::uint64_t(Cage::compress(p)) | std::uint64_t(payload) << 32) {
  }

  T* get() const noexcept {
    return static_cast<T*>(Cage::decompress(std::uint32_t(bits_)));
  }
  constexpr std::uint32_t payload() const noexcept {
    return std::uint32_t(bits_ >> 32);
  }
  void set(T* p) noexcept {
    bits_ = (bits_ & ~std::uint64_t(UINT32_MAX)) | Cage::compress(p);
  }
  constexpr void set_payload(std::uint32_t v) noexcept {
    bits_ = (bits_ & UINT32_MAX) | std::uint64_t(v) << 32;
  }

 private:
  std::uint64_t bits_ = 0;
};

/// A compressed pointer with TagBits small tag bits stored in its alignment
/// bits, all in 4 bytes. T must be aligned to 2^(TagBits + Cage::shift).
template <class T, unsigned TagBits, class Cage = default_cage>
class tagged_ptr {
  static_assert(TagBits >= 1 && TagBits <= 4);
  static constexpr std::uint32_t kTagMask = (1u << TagBits) - 1;

 public:
  constexpr tagged_ptr() noexcept = default;
  tagged_ptr(T* p, std::uint32_t tag) noexcept { set(p, tag); }

  T* get() const noexcept {
    std::uint32_t bits = bits_ & ~kTagMask;
    return static_cast<T*>(Cage::decompress(bits));
  }
  constexpr std::uint32_t tag() const noexcept { return bits_ & kTagMask; }
  void set(T* p, std::uint32_t tag) noexcept {
    CPTR_ASSERT(tag <= kTagMask, "tag does not fit in the tag bits");
    std::uint32_t bits = Cage::compress(p);
    CPTR_ASSERT((bits & kTagMask) == 0,
                "pointer is not aligned enough for tags");
    bits_ = bits | tag;
  }

 private:
  std::uint32_t bits_ = 0;
};

/// A compressed pointer that can be updated atomically.
template <class T, class Cage = default_cage>
class atomic_ptr {
 public:
  static constexpr bool is_always_lock_free =
      std::atomic<std::uint32_t>::is_always_lock_free;

  constexpr atomic_ptr() noexcept = default;
  explicit atomic_ptr(T* p) noexcept : bits_(Cage::compress(p)) {}
  atomic_ptr(const atomic_ptr&) = delete;
  atomic_ptr& operator=(const atomic_ptr&) = delete;

  /// Not bits_.is_lock_free(): clang emits a call to libatomic for it.
  constexpr bool is_lock_free() const noexcept { return is_always_lock_free; }

  T* load(std::memory_order order = std::memory_order_seq_cst) const noexcept {
    return unpack(bits_.load(order));
  }
  operator T*() const noexcept { return load(); }
  void store(T* p,
             std::memory_order order = std::memory_order_seq_cst) noexcept {
    bits_.store(Cage::compress(p), order);
  }
  // Returns the value, like std::atomic<T*>::operator=.
  // NOLINTNEXTLINE(misc-unconventional-assign-operator)
  T* operator=(T* p) noexcept {
    store(p);
    return p;
  }
  T* exchange(T* p,
              std::memory_order order = std::memory_order_seq_cst) noexcept {
    return unpack(bits_.exchange(Cage::compress(p), order));
  }

  bool compare_exchange_weak(T*& expected, T* desired,
                             std::memory_order success,
                             std::memory_order failure) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_weak(e, Cage::compress(desired), success,
                                          failure);
    expected = unpack(e);
    return ok;
  }
  bool compare_exchange_weak(
      T*& expected, T* desired,
      std::memory_order order = std::memory_order_seq_cst) noexcept {
    return compare_exchange_weak(expected, desired, order,
                                 failure_order(order));
  }
  bool compare_exchange_strong(T*& expected, T* desired,
                               std::memory_order success,
                               std::memory_order failure) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_strong(e, Cage::compress(desired), success,
                                            failure);
    expected = unpack(e);
    return ok;
  }
  bool compare_exchange_strong(
      T*& expected, T* desired,
      std::memory_order order = std::memory_order_seq_cst) noexcept {
    return compare_exchange_strong(expected, desired, order,
                                   failure_order(order));
  }

  /// Blocks until the value is no longer `old` (and a notify call wakes it).
  void wait(T* old, std::memory_order order =
                        std::memory_order_seq_cst) const noexcept {
    bits_.wait(Cage::compress(old), order);
  }
  void notify_one() noexcept { bits_.notify_one(); }
  void notify_all() noexcept { bits_.notify_all(); }

 private:
  static T* unpack(std::uint32_t bits) noexcept {
    return static_cast<T*>(Cage::decompress(bits));
  }
  /// The failure order std::atomic derives from a single order.
  static constexpr std::memory_order failure_order(
      std::memory_order order) noexcept {
    if (order == std::memory_order_acq_rel) {
      return std::memory_order_acquire;
    }
    if (order == std::memory_order_release) {
      return std::memory_order_relaxed;
    }
    return order;
  }

  std::atomic<std::uint32_t> bits_{0};
};

static_assert(sizeof(ptr_pair<int>) == 8);
static_assert(sizeof(ptr_with_payload<int>) == 8);
static_assert(sizeof(tagged_ptr<int, 2>) == 4);
static_assert(sizeof(atomic_ptr<int>) == 4);

}  // namespace cptr
