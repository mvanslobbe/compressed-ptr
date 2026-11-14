// SPDX-License-Identifier: MIT
// An allocator whose pointer type is cptr::ptr, for containers that take
// their internal pointer types from std::allocator_traits (fancy pointers).
#pragma once

#include <cstddef>
#include <new>
#include <utility>

#include "cptr/ptr.hpp"

namespace cptr {

/// An allocator whose `pointer` type is cptr::ptr, so that containers that
/// take their link type from the allocator get 4-byte links.
///
/// plf::list is one such container. Its nodes link to a sentinel inside the
/// list object, so the list object must be in the cage as well.
///
/// @code
/// using list = plf::list<int, cptr::fancy_allocator<int>>;
/// cptr::ptr<list> l = cptr::make<list>();  // the list object in the cage
/// l->push_back(1);
/// cptr::destroy(l);
/// @endcode
template <class T, class Cage = default_cage>
class fancy_allocator {
 public:
  /// The element type.
  using value_type = T;
  /// A compressed pointer to an element.
  using pointer = ptr<T, Cage>;
  /// A compressed pointer to a const element.
  using const_pointer = ptr<const T, Cage>;
  /// A compressed `void*`.
  using void_pointer = ptr<void, Cage>;
  /// A compressed `const void*`.
  using const_void_pointer = ptr<const void, Cage>;
  /// The type of element counts.
  using size_type = std::size_t;
  /// The type of pointer differences.
  using difference_type = std::ptrdiff_t;
  /// The same allocator for another element type.
  template <class U>
  struct rebind {
    /// The rebound allocator.
    using other = fancy_allocator<U, Cage>;
  };

  /// Stateless: all fancy_allocators for one cage are interchangeable.
  constexpr fancy_allocator() noexcept = default;
  /// From a fancy_allocator for another element type in the same cage.
  template <class U>
  constexpr fancy_allocator(const fancy_allocator<U, Cage>&) noexcept {}

  /// Memory for `n` T in the cage, uninitialised. Throws
  /// std::bad_array_new_length if `n` exceeds max_size(), and std::bad_alloc
  /// when the cage is full.
  pointer allocate(std::size_t n) {
    if (n > max_size()) {
      throw std::bad_array_new_length();
    }
    return pointer(static_cast<T*>(Cage::allocate(n * sizeof(T), alignof(T))));
  }
  /// Frees memory from allocate(); the elements must already be destroyed.
  void deallocate(pointer p, std::size_t) noexcept {
    Cage::deallocate(p.get());
  }
  /// The most T that one allocation could hold: no more than fit in the
  /// cage.
  constexpr size_type max_size() const noexcept {
    return Cage::size / sizeof(T);
  }

  /// std::allocator_traits::construct takes a raw pointer; containers written
  /// for fancy pointers pass the allocator's pointer type instead.
  template <class U, class... Args>
  void construct(U* p, Args&&... args) {
    ::new (static_cast<void*>(p)) U(std::forward<Args>(args)...);
  }
  /// As above, at a compressed pointer.
  template <class U, class... Args>
  void construct(ptr<U, Cage> p, Args&&... args) {
    construct(p.get(), std::forward<Args>(args)...);
  }
  /// Destroys the object at `p` without freeing its memory.
  template <class U>
  void destroy(U* p) noexcept {
    p->~U();
  }
  /// As above, at a compressed pointer.
  template <class U>
  void destroy(ptr<U, Cage> p) noexcept {
    p->~U();
  }

  /// Always true: memory from one fancy_allocator for a cage can be freed by
  /// any other for the same cage.
  template <class U>
  friend constexpr bool operator==(const fancy_allocator&,
                                   const fancy_allocator<U, Cage>&) noexcept {
    return true;
  }
};

}  // namespace cptr
