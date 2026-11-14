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

/// compressed-ptr: 4-byte pointers and containers for 64-bit C++20.
///
/// Objects live in a *cage*, a reserved region of up to 4 GiB (or 64 GiB
/// with a shift). A pointer into the cage is stored as a 32-bit offset, which
/// halves the size of every link. Start here:
///
/// @li Containers: @ref list, @ref forward_list, @ref ordered_map and
///     @ref unordered_map, the std interfaces with 4-byte links.
/// @li Your own nodes: allocate with @ref make, point with @ref ptr (or
///     @ref nonnull_ptr), pack two pointers with @ref ptr_pair, free with
///     @ref destroy.
/// @li Other containers: @ref allocator puts their elements in the cage;
///     @ref fancy_allocator gives containers that support fancy pointers
///     4-byte links.
/// @li Cages: @ref default_cage, your own @ref cage, @ref user_cage with your
///     own allocator, or @ref mapped_cage to keep data in a file.
///
/// The one rule: only compress pointers to objects allocated in the cage.
/// Debug builds assert it.
///
/// @code
/// #include "cptr/all.hpp"
///
/// struct node {
///   cptr::ptr_pair<node> children;  // two 4-byte pointers
///   int key;
/// };
///
/// int main() {
///   cptr::list<int> l{1, 2, 3};             // like std::list, half the memory
///   cptr::ptr<node> n = cptr::make<node>();  // a node in the cage
///   n->key = l.back();
///   cptr::destroy(n);
/// }
/// @endcode
///
/// Guide, benchmarks and examples: https://mvanslobbe.github.io/compressed-ptr/
namespace cptr {

namespace detail {
struct null_literal_tag;
/// The parameter type that accepts a literal `0` or `NULL` and nothing else
/// of integer type: only a null pointer constant converts to a pointer to
/// member, and no one can name a member of an incomplete struct.
using null_literal = int null_literal_tag::*;
}  // namespace detail

/// A nullable pointer to a T inside `Cage`, stored in 4 bytes. Use it as
/// ptr<T> or strict_ptr<T>, declared below.
///
/// ptr converts implicitly from and to T*, so it can replace a raw pointer
/// member with few other changes. strict_ptr (Strict = true) only converts to
/// T* implicitly: compressing a T* takes an explicit constructor call, so a
/// pointer from outside the cage cannot slip in unnoticed, and mixing it with
/// T* in ?: is not ambiguous. Constructing either from a pointer outside the
/// cage is a bug (checked by assertions in debug builds, or always with
/// CPTR_CHECKED).
template <class T, class Cage, bool Strict>
class basic_ptr {
 public:
  /// The type pointed to.
  using element_type = T;
  /// The cage the pointer is compressed against.
  using cage_type = Cage;
  /// The signed distance between two pointers, in elements. Together with
  /// the iterator types below, it lets ptr serve as an allocator's pointer
  /// type, which must be a random access iterator.
  using difference_type = std::ptrdiff_t;
  /// The same kind of pointer to a `U`, for std::pointer_traits.
  template <class U>
  using rebind = basic_ptr<U, Cage, Strict>;
  /// The pointee type without cv-qualifiers, as for an iterator.
  using value_type = std::remove_cv_t<T>;
  /// The raw pointer type, as for an iterator.
  using pointer = T*;
  /// The type `operator*` returns, as for an iterator.
  using reference = std::add_lvalue_reference_t<T>;
  /// ptr is a random access iterator for code that reads
  /// std::iterator_traits...
  using iterator_category = std::random_access_iterator_tag;
  /// ...and a contiguous iterator for the C++20 iterator concepts, so that
  /// algorithms such as std::copy over a range of ptr lower to memmove.
  using iterator_concept = std::contiguous_iterator_tag;

  /// Null.
  constexpr basic_ptr() noexcept = default;
  /// Null.
  template <class N>
    requires std::is_null_pointer_v<N>
  constexpr basic_ptr(N) noexcept {}
  /// Null, from a literal `0` or `NULL`, which older code and some fancy
  /// pointer users (plf::list) write for null pointers. Like a raw pointer,
  /// it accepts only a null pointer constant: an integer variable, a
  /// non-zero literal or a `bool` does not convert.
  constexpr basic_ptr(detail::null_literal) noexcept {}
  /// Compresses `p`, which must be null or point into the cage. Implicit
  /// for ptr, explicit for strict_ptr. A template on `U` only so that a
  /// literal `0` picks the constructor above instead of being ambiguous; it
  /// takes any `U*` that converts implicitly to `T*`.
  template <class U>
    requires std::is_convertible_v<U*, T*>
  explicit(Strict) basic_ptr(U* p) noexcept
      : bits_(Cage::compress(static_cast<T*>(p))) {}
  /// Converts from a pointer to `U` where `U*` converts implicitly to `T*`:
  /// adding cv-qualifiers, to `void`, or derived to base. Only the
  /// derived-to-base case at a non-zero offset decompresses; the others copy
  /// the offset.
  template <class U, bool S>
    requires std::is_convertible_v<U*, T*>
  constexpr basic_ptr(const basic_ptr<U, Cage, S>& other) noexcept
      : bits_(same_address_v<U>
                  ? other.bits()
                  : Cage::compress(static_cast<T*>(other.get()))) {}
  /// Explicit casts that static_cast allows, such as base to derived or
  /// void* to T*.
  template <class U>
    requires(!std::is_convertible_v<U*, T*> &&
             requires(U* u) { static_cast<T*>(u); })
  explicit basic_ptr(U* p) noexcept
      : bits_(Cage::compress(static_cast<T*>(p))) {}
  template <class U, bool S>
    requires(!std::is_convertible_v<U*, T*> &&
             requires(U* u) { static_cast<T*>(u); })
  explicit basic_ptr(const basic_ptr<U, Cage, S>& other) noexcept
      : basic_ptr(static_cast<T*>(other.get())) {}

  /// Compresses `p`, which must be null or point into the cage. Not for
  /// strict_ptr, which needs an explicit `s = strict_ptr<T>(p)`. A literal
  /// `0` or `NULL` lands here too, and stays constant-evaluable.
  constexpr basic_ptr& operator=(T* p) noexcept
    requires(!Strict)
  {
    bits_ = p ? Cage::compress(p) : 0;
    return *this;
  }
  /// Null. A template, so that a literal `0` picks the `T*` overload above
  /// (or, for strict_ptr, the null-literal constructor) instead of being
  /// ambiguous.
  template <class N>
    requires std::is_null_pointer_v<N>
  constexpr basic_ptr& operator=(N) noexcept {
    bits_ = 0;
    return *this;
  }

  /// The raw pointer, or `nullptr`: one add and a conditional move.
  T* get() const noexcept { return static_cast<T*>(Cage::decompress(bits_)); }
  /// Converts implicitly to the raw pointer, so a `ptr` can be passed
  /// wherever a `T*` is expected.
  operator T*() const noexcept { return get(); }
  /// Member access. Dereferencing null is undefined, so this skips the null
  /// check and costs a single add.
  T* operator->() const noexcept {
    return static_cast<T*>(Cage::decompress_nonnull(bits_));
  }
  /// The object pointed to. Like `operator->`, it skips the null check.
  template <class U = T>
    requires(!std::is_void_v<U>)
  U& operator*() const noexcept {
    return *static_cast<U*>(Cage::decompress_nonnull(bits_));
  }
  /// True unless null.
  constexpr explicit operator bool() const noexcept { return bits_ != 0; }

  /// Element `i` counting from this one, as for a raw pointer.
  ///
  /// Pointer arithmetic (`[]`, `+`, `-`, `+=`, `-=`, `++`, `--`) lets ptr
  /// serve as an allocator's pointer type for containers that index into
  /// blocks of elements. It works on the compressed offset directly, so it
  /// costs the same as raw pointer arithmetic, but a loop over an array does
  /// not vectorise: convert to `T*` with get() for hot loops. In a shifted
  /// cage, `sizeof(T)` must be a multiple of the granularity.
  template <class U = T>
    requires(!std::is_void_v<U>)
  U& operator[](std::ptrdiff_t i) const noexcept {
    return *(*this + i);
  }
  /// Advance by `n` elements.
  constexpr basic_ptr& operator+=(std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    bits_ += static_cast<std::uint32_t>(n * step());
    return *this;
  }
  /// Go back by `n` elements.
  constexpr basic_ptr& operator-=(std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    bits_ -= static_cast<std::uint32_t>(n * step());
    return *this;
  }
  /// Advance by one element.
  constexpr basic_ptr& operator++() noexcept
    requires(!std::is_void_v<T>)
  {
    return *this += 1;
  }
  /// Go back by one element.
  constexpr basic_ptr& operator--() noexcept
    requires(!std::is_void_v<T>)
  {
    return *this -= 1;
  }
  constexpr basic_ptr operator++(int) noexcept
    requires(!std::is_void_v<T>)
  {
    basic_ptr old = *this;
    ++*this;
    return old;
  }
  constexpr basic_ptr operator--(int) noexcept
    requires(!std::is_void_v<T>)
  {
    basic_ptr old = *this;
    --*this;
    return old;
  }
  /// The pointer `n` elements further on.
  friend constexpr basic_ptr operator+(basic_ptr p, std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    return p += n;
  }
  friend constexpr basic_ptr operator+(std::ptrdiff_t n, basic_ptr p) noexcept
    requires(!std::is_void_v<T>)
  {
    return p += n;
  }
  friend constexpr basic_ptr operator-(basic_ptr p, std::ptrdiff_t n) noexcept
    requires(!std::is_void_v<T>)
  {
    return p -= n;
  }
  /// The number of elements between two pointers into the same array.
  friend constexpr std::ptrdiff_t operator-(basic_ptr a, basic_ptr b) noexcept
    requires(!std::is_void_v<T>)
  {
    return (std::int64_t(a.bits_) - std::int64_t(b.bits_)) / step();
  }

  /// For std::pointer_traits, so ptr can serve as an allocator's pointer type.
  template <class U = T>
    requires(!std::is_void_v<U>)
  static basic_ptr pointer_to(U& r) noexcept {
    return basic_ptr(std::addressof(r));
  }

  /// The compressed representation, e.g. for packing it with other data.
  constexpr std::uint32_t bits() const noexcept { return bits_; }
  static constexpr basic_ptr from_bits(std::uint32_t bits) noexcept {
    basic_ptr p;
    p.bits_ = bits;
    return p;
  }

  /// Same address. Compares the offsets, without touching the cage base.
  friend constexpr bool operator==(basic_ptr a, basic_ptr b) noexcept {
    return a.bits_ == b.bits_;
  }
  /// True if null. A template, as are the overloads below, so that only
  /// one of them takes a literal `0`.
  template <class N>
    requires std::is_null_pointer_v<N>
  friend constexpr bool operator==(basic_ptr a, N) noexcept {
    return !a.bits_;
  }
  /// True if null, for a literal `0` or `NULL`. Any other integer does not
  /// compile.
  friend constexpr bool operator==(basic_ptr a, detail::null_literal) noexcept {
    return !a.bits_;
  }
  /// Same address as the raw pointer `b`, as `get() == b`. Takes any `U*`
  /// that converts implicitly to `T*`.
  template <class U>
    requires std::is_convertible_v<U*, T*>
  friend constexpr bool operator==(basic_ptr a, U* b) noexcept {
    if (!b) {
      return !a.bits_;
    }
    return a.get() == static_cast<T*>(b);
  }
  /// All pointers share the cage base, so offsets order like addresses.
  friend constexpr std::strong_ordering operator<=>(basic_ptr a,
                                                    basic_ptr b) noexcept {
    return a.bits_ <=> b.bits_;
  }

 private:
  /// Converting a U* to T* keeps the address when only cv-qualifiers differ
  /// or T is void, so the offset can be copied as is. Base classes may sit at
  /// an offset, so those go through a raw pointer.
  template <class U>
  static constexpr bool same_address_v =
      std::is_void_v<T> ||
      std::is_same_v<std::remove_cv_t<U>, std::remove_cv_t<T>>;

  /// One element, in compressed units.
  static constexpr std::ptrdiff_t step() noexcept {
    static_assert(sizeof(T) % Cage::granularity == 0,
                  "pointer arithmetic in a shifted cage needs sizeof(T) to "
                  "be a multiple of the cage granularity");
    return std::ptrdiff_t(sizeof(T) >> Cage::shift);
  }

  std::uint32_t bits_ = 0;
};

/// The usual compressed pointer: converts implicitly from and to T*.
template <class T, class Cage = default_cage>
using ptr = basic_ptr<T, Cage, false>;

/// Compressing a T* needs an explicit strict_ptr<T>(p).
template <class T, class Cage = default_cage>
using strict_ptr = basic_ptr<T, Cage, true>;

/// Like ptr, but never null, which makes decompression a single add.
template <class T, class Cage = default_cage>
class nonnull_ptr {
 public:
  using element_type = T;
  using cage_type = Cage;

  /// Compress `p`, which must be in the cage and must not be null.
  nonnull_ptr(T* p) noexcept : bits_(Cage::compress(p)) {
    CPTR_CHECK(p, "nonnull_ptr must not be null");
  }
  nonnull_ptr(std::nullptr_t) = delete;

  /// The raw pointer: a single add, with no null check.
  T* get() const noexcept {
    return static_cast<T*>(Cage::decompress_nonnull(bits_));
  }
  /// Converts implicitly to the raw pointer.
  operator T*() const noexcept { return get(); }
  /// Member access.
  T* operator->() const noexcept { return get(); }
  /// The object pointed to.
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

/// Allocate and construct a T inside the cage.
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

/// Destroy and free an object created by make().
template <class T, class Cage, bool Strict>
void destroy(basic_ptr<T, Cage, Strict> p) noexcept {
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

/// std::pointer_traits for basic_ptr. The primary template would work but
/// has no to_address(), and std::to_address then falls back to `operator->`,
/// which skips the null check: std::to_address of a null ptr would return the
/// cage base instead of nullptr.
template <class T, class Cage, bool Strict>
struct std::pointer_traits<cptr::basic_ptr<T, Cage, Strict>> {
  /// The compressed pointer type.
  using pointer = cptr::basic_ptr<T, Cage, Strict>;
  /// The type pointed to.
  using element_type = T;
  /// The signed distance between two pointers, in elements.
  using difference_type = std::ptrdiff_t;
  /// The same kind of pointer to a `U`.
  template <class U>
  using rebind = cptr::basic_ptr<U, Cage, Strict>;

  /// A pointer to `r`, which must be in the cage.
  template <class U = T>
    requires(!std::is_void_v<U>)
  static pointer pointer_to(U& r) noexcept {
    return pointer::pointer_to(r);
  }
  /// The raw pointer, or `nullptr` for a null `p`; what std::to_address
  /// returns.
  static constexpr T* to_address(pointer p) noexcept { return p.get(); }
};

template <class T, class Cage, bool Strict>
struct std::hash<cptr::basic_ptr<T, Cage, Strict>> {
  std::size_t operator()(cptr::basic_ptr<T, Cage, Strict> p) const noexcept {
    return std::hash<std::uint32_t>()(p.bits());
  }
};

template <class T, class Cage>
struct std::hash<cptr::nonnull_ptr<T, Cage>> {
  std::size_t operator()(cptr::nonnull_ptr<T, Cage> p) const noexcept {
    return std::hash<std::uint32_t>()(p.bits());
  }
};
