// SPDX-License-Identifier: MIT
// 32-bit compressed pointers into a cage.
#pragma once

#include <compare>
#include <cstddef>
#include <cstdint>
#include <functional>
#include <iterator>
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
  // An allocator's pointer type must be a random access iterator.
  using value_type = std::remove_cv_t<T>;
  using pointer = T*;
  using reference = std::add_lvalue_reference_t<T>;
  using iterator_category = std::random_access_iterator_tag;

  constexpr ptr() noexcept = default;
  constexpr ptr(std::nullptr_t) noexcept {}
  // Accepts a literal 0 or NULL, which older code uses for null pointers.
  template <class I>
    requires std::is_integral_v<I>
  ptr([[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero converts to a pointer");
  }
  ptr(T* p) noexcept : bits_(Cage::compress(p)) {}
  template <class U>
    requires std::is_convertible_v<U*, T*>
  ptr(const ptr<U, Cage>& other) noexcept
      : bits_(Cage::compress(static_cast<T*>(other.get()))) {}
  // Explicit casts that static_cast allows, such as base to derived or
  // void* to T*.
  template <class U>
    requires(!std::is_convertible_v<U*, T*> &&
             requires(U* u) { static_cast<T*>(u); })
  explicit ptr(U* p) noexcept : bits_(Cage::compress(static_cast<T*>(p))) {}
  template <class U>
    requires(!std::is_convertible_v<U*, T*> &&
             requires(U* u) { static_cast<T*>(u); })
  explicit ptr(const ptr<U, Cage>& other) noexcept
      : ptr(static_cast<T*>(other.get())) {}

  ptr& operator=(T* p) noexcept {
    bits_ = Cage::compress(p);
    return *this;
  }
  ptr& operator=(std::nullptr_t) noexcept {
    bits_ = 0;
    return *this;
  }
  template <class I>
    requires std::is_integral_v<I>
  ptr& operator=([[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero converts to a pointer");
    bits_ = 0;
    return *this;
  }

  T* get() const noexcept { return static_cast<T*>(Cage::decompress(bits_)); }
  operator T*() const noexcept { return get(); }
  // Dereferencing null is undefined, so these skip the null check.
  T* operator->() const noexcept {
    return static_cast<T*>(Cage::decompress_nonnull(bits_));
  }
  template <class U = T>
    requires(!std::is_void_v<U>)
  U& operator*() const noexcept {
    return *static_cast<U*>(Cage::decompress_nonnull(bits_));
  }
  explicit operator bool() const noexcept { return bits_ != 0; }

  // Pointer arithmetic, so ptr can serve as an allocator's pointer type for
  // containers that index into blocks of elements. It works on the
  // compressed offset directly, so it is as cheap as raw pointer arithmetic.
  // In a shifted cage, sizeof(T) must be a multiple of the granularity.
  template <class U = T>
    requires(!std::is_void_v<U>)
  U& operator[](std::ptrdiff_t i) const noexcept {
    return *(*this + i);
  }
  ptr& operator+=(std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    bits_ += static_cast<std::uint32_t>(n * step());
    return *this;
  }
  ptr& operator-=(std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    bits_ -= static_cast<std::uint32_t>(n * step());
    return *this;
  }
  ptr& operator++() noexcept
    requires(!std::is_void_v<T>)
  {
    return *this += 1;
  }
  ptr& operator--() noexcept
    requires(!std::is_void_v<T>)
  {
    return *this -= 1;
  }
  ptr operator++(int) noexcept
    requires(!std::is_void_v<T>)
  {
    ptr old = *this;
    ++*this;
    return old;
  }
  ptr operator--(int) noexcept
    requires(!std::is_void_v<T>)
  {
    ptr old = *this;
    --*this;
    return old;
  }
  friend ptr operator+(ptr p, std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    return p += n;
  }
  friend ptr operator+(std::ptrdiff_t n, ptr p) noexcept
    requires(!std::is_void_v<T>)
  {
    return p += n;
  }
  friend ptr operator-(ptr p, std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    return p -= n;
  }
  friend std::ptrdiff_t operator-(ptr a, ptr b) noexcept
    requires(!std::is_void_v<T>)
  {
    return (std::int64_t(a.bits_) - std::int64_t(b.bits_)) / step();
  }

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
  template <class I>
    requires std::is_integral_v<I>
  friend bool operator==(ptr a, [[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero compares as a pointer");
    return !a.bits_;
  }
  // All pointers share the cage base, so offsets order like addresses.
  friend std::strong_ordering operator<=>(ptr a, ptr b) noexcept {
    return a.bits_ <=> b.bits_;
  }

 private:
  // One element, in compressed units.
  static constexpr std::ptrdiff_t step() noexcept {
    static_assert(sizeof(T) % Cage::granularity == 0,
                  "pointer arithmetic in a shifted cage needs sizeof(T) to "
                  "be a multiple of the cage granularity");
    return std::ptrdiff_t(sizeof(T) >> Cage::shift);
  }

  std::uint32_t bits_ = 0;
};

// Like ptr, but never null, which makes decompression a single add.
template <class T, class Cage = default_cage>
class nonnull_ptr {
 public:
  using element_type = T;
  using cage_type = Cage;

  nonnull_ptr(T* p) noexcept : bits_(Cage::compress(p)) {
    CPTR_ASSERT(p, "nonnull_ptr must not be null");
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
    // With multiple inheritance a base pointer can point into the middle of
    // the block, so free the most-derived object's address.
    void* block = raw;
    if constexpr (std::is_polymorphic_v<T>) {
      block = dynamic_cast<void*>(raw);
    }
    raw->~T();
    Cage::deallocate(block);
  }
}

}  // namespace cptr

template <class T, class Cage>
struct std::hash<cptr::ptr<T, Cage>> {
  std::size_t operator()(cptr::ptr<T, Cage> p) const noexcept {
    return std::hash<std::uint32_t>()(p.bits());
  }
};

template <class T, class Cage>
struct std::hash<cptr::nonnull_ptr<T, Cage>> {
  std::size_t operator()(cptr::nonnull_ptr<T, Cage> p) const noexcept {
    return std::hash<std::uint32_t>()(p.bits());
  }
};
