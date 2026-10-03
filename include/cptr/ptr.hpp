// SPDX-License-Identifier: MIT
// 32-bit compressed pointers into a cage.
#pragma once

#include <compare>
#include <cstddef>
#include <cstdint>
#include <functional>
#include <memory>
#include <type_traits>
#include <utility>

#include "cptr/cage.hpp"

namespace cptr {

// A nullable pointer to a T inside |Cage|, stored in 4 bytes.
//
// It converts implicitly from and to T*, so it can replace a raw pointer
// member with few other changes. Constructing one from a pointer outside the
// cage is a bug (checked by assertions in debug builds).
template <class T, class Cage = default_cage>
class ptr {
 public:
  using element_type = T;
  using cage_type = Cage;
  using difference_type = std::ptrdiff_t;
  template <class U>
  using rebind = ptr<U, Cage>;

  constexpr ptr() noexcept = default;
  constexpr ptr(std::nullptr_t) noexcept {}
  ptr(T* p) noexcept : bits_(Cage::compress(p)) {}
  template <class U>
    requires std::is_convertible_v<U*, T*>
  ptr(const ptr<U, Cage>& other) noexcept
      : bits_(Cage::compress(static_cast<T*>(other.get()))) {}

  ptr& operator=(T* p) noexcept {
    bits_ = Cage::compress(p);
    return *this;
  }
  ptr& operator=(std::nullptr_t) noexcept {
    bits_ = 0;
    return *this;
  }

  T* get() const noexcept { return static_cast<T*>(Cage::decompress(bits_)); }
  operator T*() const noexcept { return get(); }
  T* operator->() const noexcept { return get(); }
  template <class U = T>
    requires(!std::is_void_v<U>)
  U& operator*() const noexcept {
    return *get();
  }
  explicit operator bool() const noexcept { return bits_ != 0; }

  // For std::pointer_traits, so ptr can serve as an allocator's pointer type.
  template <class U = T>
    requires(!std::is_void_v<U>)
  static ptr pointer_to(U& r) noexcept {
    return ptr(std::addressof(r));
  }

  // The compressed representation, e.g. for packing it with other data.
  std::uint32_t bits() const noexcept { return bits_; }
  static ptr from_bits(std::uint32_t bits) noexcept {
    ptr p;
    p.bits_ = bits;
    return p;
  }

  friend bool operator==(ptr a, ptr b) noexcept { return a.bits_ == b.bits_; }
  friend bool operator==(ptr a, std::nullptr_t) noexcept { return !a.bits_; }
  friend bool operator==(ptr a, T* b) noexcept { return a.get() == b; }
  // All pointers share the cage base, so offsets order like addresses.
  friend std::strong_ordering operator<=>(ptr a, ptr b) noexcept {
    return a.bits_ <=> b.bits_;
  }

 private:
  std::uint32_t bits_ = 0;
};

// Like ptr, but never null, which makes decompression a single add.
template <class T, class Cage = default_cage>
class nonnull_ptr {
 public:
  using element_type = T;
  using cage_type = Cage;

  nonnull_ptr(T* p) noexcept : bits_(Cage::compress(p)) {
    assert(p && "nonnull_ptr must not be null");
  }
  nonnull_ptr(std::nullptr_t) = delete;

  T* get() const noexcept {
    return static_cast<T*>(Cage::decompress_nonnull(bits_));
  }
  operator T*() const noexcept { return get(); }
  T* operator->() const noexcept { return get(); }
  T& operator*() const noexcept { return *get(); }

  std::uint32_t bits() const noexcept { return bits_; }

  friend bool operator==(nonnull_ptr a, nonnull_ptr b) noexcept {
    return a.bits_ == b.bits_;
  }
  friend std::strong_ordering operator<=>(nonnull_ptr a,
                                          nonnull_ptr b) noexcept {
    return a.bits_ <=> b.bits_;
  }

 private:
  std::uint32_t bits_;
};

static_assert(sizeof(ptr<int>) == 4);
static_assert(sizeof(nonnull_ptr<int>) == 4);
static_assert(std::is_trivially_copyable_v<ptr<int>>);

// Allocate and construct a T inside the cage.
template <class T, class Cage = default_cage, class... Args>
ptr<T, Cage> make(Args&&... args) {
  void* mem = Cage::allocate(sizeof(T), alignof(T));
  try {
    return ptr<T, Cage>(::new (mem) T(std::forward<Args>(args)...));
  } catch (...) {
    Cage::deallocate(mem);
    throw;
  }
}

// Destroy and free an object created by make().
template <class T, class Cage>
void destroy(ptr<T, Cage> p) noexcept {
  if (T* raw = p.get()) {
    raw->~T();
    Cage::deallocate(raw);
  }
}

}  // namespace cptr

template <class T, class Cage>
struct std::hash<cptr::ptr<T, Cage>> {
  std::size_t operator()(cptr::ptr<T, Cage> p) const noexcept {
    return std::hash<std::uint32_t>()(p.bits());
  }
};
