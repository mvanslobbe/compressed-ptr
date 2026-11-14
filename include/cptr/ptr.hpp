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
  /// The iterator and std::pointer_traits types below let ptr serve as an
  /// allocator's pointer type, which must be a random access iterator.
  using difference_type = std::ptrdiff_t;
  /// The same kind of pointer to a `U`, for std::pointer_traits.
  template <class U>
  using rebind = basic_ptr<U, Cage, Strict>;
  /// The pointee type without cv-qualifiers, as for an iterator.
  using value_type = std::remove_cv_t<T>;
  using pointer = T*;
  using reference = std::add_lvalue_reference_t<T>;
  using iterator_category = std::random_access_iterator_tag;

  constexpr basic_ptr() noexcept = default;
  constexpr basic_ptr(std::nullptr_t) noexcept {}
  /// Accepts a literal 0 or NULL, which older code uses for null pointers.
  template <class I>
    requires std::is_integral_v<I>
  constexpr basic_ptr([[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero converts to a pointer");
  }
  explicit(Strict) basic_ptr(T* p) noexcept : bits_(Cage::compress(p)) {}
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

  basic_ptr& operator=(T* p) noexcept
    requires(!Strict)
  {
    bits_ = Cage::compress(p);
    return *this;
  }
  constexpr basic_ptr& operator=(std::nullptr_t) noexcept {
    bits_ = 0;
    return *this;
  }
  template <class I>
    requires std::is_integral_v<I>
  constexpr basic_ptr& operator=([[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero converts to a pointer");
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

  friend constexpr bool operator==(basic_ptr a, basic_ptr b) noexcept {
    return a.bits_ == b.bits_;
  }
  friend constexpr bool operator==(basic_ptr a, std::nullptr_t) noexcept {
    return !a.bits_;
  }
  friend bool operator==(basic_ptr a, T* b) noexcept { return a.get() == b; }
  template <class I>
    requires std::is_integral_v<I>
  friend constexpr bool operator==(basic_ptr a,
                                   [[maybe_unused]] I zero) noexcept {
    CPTR_ASSERT(zero == 0, "only zero compares as a pointer");
    return !a.bits_;
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
