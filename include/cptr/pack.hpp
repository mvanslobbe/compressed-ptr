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
#include <type_traits>

#include "cptr/ptr.hpp"

namespace cptr {

namespace detail {
/// Cage::decompress, but constant-evaluable for null: the check runs only in
/// constant evaluation, so the run-time code is the cage's.
template <class T, class Cage>
constexpr T* decompress_as(std::uint32_t bits) noexcept {
  if (std::is_constant_evaluated() && !bits) {
    return nullptr;
  }
  return static_cast<T*>(Cage::decompress(bits));
}
}  // namespace detail

/// Two compressed pointers in 8 bytes, e.g. a tree node's children or a list
/// node's links.
template <class A, class B = A, class Cage = default_cage>
class ptr_pair {
 public:
  /// Two null pointers.
  constexpr ptr_pair() noexcept = default;
  /// Compresses `a` and `b`, which must each be null or point into the cage.
  ptr_pair(A* a, B* b) noexcept
      : bits_(std::uint64_t(Cage::compress(a)) |
              std::uint64_t(Cage::compress(b)) << 32) {}

  /// The first pointer, or `nullptr`. Constant-evaluable when null.
  constexpr A* first() const noexcept {
    return detail::decompress_as<A, Cage>(std::uint32_t(bits_));
  }
  /// The second pointer, or `nullptr`. Constant-evaluable when null.
  constexpr B* second() const noexcept {
    return detail::decompress_as<B, Cage>(std::uint32_t(bits_ >> 32));
  }
  /// Replaces the first pointer (null or in the cage), keeping the second.
  void set_first(A* a) noexcept {
    bits_ = (bits_ & ~std::uint64_t(UINT32_MAX)) | Cage::compress(a);
  }
  /// Replaces the second pointer (null or in the cage), keeping the first.
  void set_second(B* b) noexcept {
    bits_ = (bits_ & UINT32_MAX) | std::uint64_t(Cage::compress(b)) << 32;
  }

  /// Both pointers equal.
  friend constexpr bool operator==(const ptr_pair&,
                                   const ptr_pair&) noexcept = default;

 private:
  std::uint64_t bits_ = 0;
};

/// A compressed pointer and a 32-bit payload in 8 bytes, e.g. a node pointer
/// and a count, hash or flags.
template <class T, class Cage = default_cage>
class ptr_with_payload {
 public:
  /// Null, with payload 0.
  constexpr ptr_with_payload() noexcept = default;
  /// Compresses `p`, which must be null or point into the cage.
  ptr_with_payload(T* p, std::uint32_t payload) noexcept
      : bits_(std::uint64_t(Cage::compress(p)) | std::uint64_t(payload) << 32) {
  }

  /// The pointer, or `nullptr`. Constant-evaluable when null.
  constexpr T* get() const noexcept {
    return detail::decompress_as<T, Cage>(std::uint32_t(bits_));
  }
  /// The payload.
  constexpr std::uint32_t payload() const noexcept {
    return std::uint32_t(bits_ >> 32);
  }
  /// Replaces the pointer (null or in the cage), keeping the payload.
  void set(T* p) noexcept {
    bits_ = (bits_ & ~std::uint64_t(UINT32_MAX)) | Cage::compress(p);
  }
  /// Replaces the payload, keeping the pointer.
  constexpr void set_payload(std::uint32_t v) noexcept {
    bits_ = (bits_ & UINT32_MAX) | std::uint64_t(v) << 32;
  }

  /// Same pointer and same payload.
  friend constexpr bool operator==(const ptr_with_payload&,
                                   const ptr_with_payload&) noexcept = default;

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
  /// Null, with tag 0.
  constexpr tagged_ptr() noexcept = default;
  /// As set(p, tag).
  tagged_ptr(T* p, std::uint32_t tag) noexcept { set(p, tag); }

  /// The pointer without the tag, or `nullptr`. Constant-evaluable when
  /// null.
  constexpr T* get() const noexcept {
    return detail::decompress_as<T, Cage>(bits_ & ~kTagMask);
  }
  /// The tag, below 2^TagBits.
  constexpr std::uint32_t tag() const noexcept { return bits_ & kTagMask; }
  /// Replaces both. `p` must be null or point into the cage, aligned to
  /// 2^(TagBits + Cage::shift), and `tag` must fit in TagBits bits (both
  /// checked by assertions in debug builds).
  void set(T* p, std::uint32_t tag) noexcept {
    CPTR_ASSERT(tag <= kTagMask, "tag does not fit in the tag bits");
    std::uint32_t bits = Cage::compress(p);
    CPTR_ASSERT((bits & kTagMask) == 0,
                "pointer is not aligned enough for tags");
    bits_ = bits | tag;
  }

  /// Same pointer and same tag.
  friend constexpr bool operator==(tagged_ptr, tagged_ptr) noexcept = default;

 private:
  std::uint32_t bits_ = 0;
};

/// A compressed pointer that can be updated atomically.
///
/// It offers the parts of the std::atomic<T*> interface that apply to it
/// (no arithmetic). Every pointer passed in must be null or point into the
/// cage.
template <class T, class Cage = default_cage>
class atomic_ptr {
 public:
  /// True when the 32-bit offset is always updated without a lock.
  static constexpr bool is_always_lock_free =
      std::atomic<std::uint32_t>::is_always_lock_free;

  /// Null. Constant-initialised, so a global atomic_ptr can be constinit.
  constexpr atomic_ptr() noexcept = default;
  /// Holds `p`.
  explicit atomic_ptr(T* p) noexcept : bits_(Cage::compress(p)) {}
  atomic_ptr(const atomic_ptr&) = delete;
  atomic_ptr& operator=(const atomic_ptr&) = delete;

  /// Whether this object's operations are lock-free.
  constexpr bool is_lock_free() const noexcept {
    // Not bits_.is_lock_free(): clang emits a call to libatomic for it.
    return is_always_lock_free;
  }

  /// The current pointer.
  T* load(std::memory_order order = std::memory_order_seq_cst) const noexcept {
    return unpack(bits_.load(order));
  }
  /// load().
  operator T*() const noexcept { return load(); }
  /// Replaces the pointer with `p`.
  void store(T* p,
             std::memory_order order = std::memory_order_seq_cst) noexcept {
    bits_.store(Cage::compress(p), order);
  }
  /// store(p), returning `p` like std::atomic<T*>::operator=.
  // NOLINTNEXTLINE(misc-unconventional-assign-operator)
  T* operator=(T* p) noexcept {
    store(p);
    return p;
  }
  /// Replaces the pointer with `p` and returns the previous one, in one
  /// atomic step.
  T* exchange(T* p,
              std::memory_order order = std::memory_order_seq_cst) noexcept {
    return unpack(bits_.exchange(Cage::compress(p), order));
  }

  /// If the pointer equals `expected`, replaces it with `desired` and
  /// returns true; otherwise loads it into `expected` and returns false. As
  /// std::atomic, the weak form may fail spuriously, so call it in a loop.
  /// The comparison is on the compressed offsets, which is the same as on
  /// the addresses.
  bool compare_exchange_weak(T*& expected, T* desired,
                             std::memory_order success,
                             std::memory_order failure) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_weak(e, Cage::compress(desired), success,
                                          failure);
    expected = unpack(e);
    return ok;
  }
  /// compare_exchange_weak() with one order, from which the failure order
  /// is derived as std::atomic does.
  bool compare_exchange_weak(
      T*& expected, T* desired,
      std::memory_order order = std::memory_order_seq_cst) noexcept {
    return compare_exchange_weak(expected, desired, order,
                                 failure_order(order));
  }
  /// As compare_exchange_weak(), but fails only if the pointer differs
  /// from `expected`.
  bool compare_exchange_strong(T*& expected, T* desired,
                               std::memory_order success,
                               std::memory_order failure) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_strong(e, Cage::compress(desired), success,
                                            failure);
    expected = unpack(e);
    return ok;
  }
  /// compare_exchange_strong() with one order, from which the failure order
  /// is derived as std::atomic does.
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
  /// Wakes one thread blocked in wait() on this object, if any.
  void notify_one() noexcept { bits_.notify_one(); }
  /// Wakes all threads blocked in wait() on this object.
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
