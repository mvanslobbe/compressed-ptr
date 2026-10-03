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

// Two compressed pointers in 8 bytes, e.g. a tree node's children or a list
// node's links.
template <class A, class B = A, class Cage = default_cage>
class ptr_pair {
 public:
  ptr_pair() noexcept = default;
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

// A compressed pointer and a 32-bit payload in 8 bytes, e.g. a node pointer
// and a count, hash or flags.
template <class T, class Cage = default_cage>
class ptr_with_payload {
 public:
  ptr_with_payload() noexcept = default;
  ptr_with_payload(T* p, std::uint32_t payload) noexcept
      : bits_(std::uint64_t(Cage::compress(p)) |
              std::uint64_t(payload) << 32) {}

  T* get() const noexcept {
    return static_cast<T*>(Cage::decompress(std::uint32_t(bits_)));
  }
  std::uint32_t payload() const noexcept {
    return std::uint32_t(bits_ >> 32);
  }
  void set(T* p) noexcept {
    bits_ = (bits_ & ~std::uint64_t(UINT32_MAX)) | Cage::compress(p);
  }
  void set_payload(std::uint32_t v) noexcept {
    bits_ = (bits_ & UINT32_MAX) | std::uint64_t(v) << 32;
  }

 private:
  std::uint64_t bits_ = 0;
};

// A compressed pointer with TagBits small tag bits stored in its alignment
// bits, all in 4 bytes. T must be aligned to 2^(TagBits + Cage::shift).
template <class T, unsigned TagBits, class Cage = default_cage>
class tagged_ptr {
  static_assert(TagBits >= 1 && TagBits <= 4);
  static constexpr std::uint32_t kTagMask = (1u << TagBits) - 1;

 public:
  tagged_ptr() noexcept = default;
  tagged_ptr(T* p, std::uint32_t tag) noexcept { set(p, tag); }

  T* get() const noexcept {
    std::uint32_t bits = bits_ & ~kTagMask;
    return static_cast<T*>(Cage::decompress(bits));
  }
  std::uint32_t tag() const noexcept { return bits_ & kTagMask; }
  void set(T* p, std::uint32_t tag) noexcept {
    assert(tag <= kTagMask);
    std::uint32_t bits = Cage::compress(p);
    assert((bits & kTagMask) == 0 && "pointer is not aligned enough for tags");
    bits_ = bits | tag;
  }

 private:
  std::uint32_t bits_ = 0;
};

// A compressed pointer that can be updated atomically.
template <class T, class Cage = default_cage>
class atomic_ptr {
 public:
  atomic_ptr() noexcept = default;
  explicit atomic_ptr(T* p) noexcept : bits_(Cage::compress(p)) {}

  T* load(std::memory_order order = std::memory_order_seq_cst) const noexcept {
    return static_cast<T*>(Cage::decompress(bits_.load(order)));
  }
  void store(T* p,
             std::memory_order order = std::memory_order_seq_cst) noexcept {
    bits_.store(Cage::compress(p), order);
  }
  T* exchange(T* p,
              std::memory_order order = std::memory_order_seq_cst) noexcept {
    return static_cast<T*>(
        Cage::decompress(bits_.exchange(Cage::compress(p), order)));
  }
  bool compare_exchange_weak(
      T*& expected, T* desired,
      std::memory_order order = std::memory_order_seq_cst) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_weak(e, Cage::compress(desired), order);
    expected = static_cast<T*>(Cage::decompress(e));
    return ok;
  }
  bool compare_exchange_strong(
      T*& expected, T* desired,
      std::memory_order order = std::memory_order_seq_cst) noexcept {
    std::uint32_t e = Cage::compress(expected);
    bool ok = bits_.compare_exchange_strong(e, Cage::compress(desired), order);
    expected = static_cast<T*>(Cage::decompress(e));
    return ok;
  }

 private:
  std::atomic<std::uint32_t> bits_{0};
};

static_assert(sizeof(ptr_pair<int>) == 8);
static_assert(sizeof(ptr_with_payload<int>) == 8);
static_assert(sizeof(tagged_ptr<int, 2>) == 4);
static_assert(sizeof(atomic_ptr<int>) == 4);

}  // namespace cptr
