// SPDX-License-Identifier: MIT
// A standard allocator that places objects inside a cage, so that any
// std container's elements can be referred to by cptr::ptr.
#pragma once

#include <cstddef>
#include <new>

#include "cptr/cage.hpp"

namespace cptr {

/// A standard allocator that places objects in the cage, so that any std
/// container's elements can be pointed to with a 4-byte cptr::ptr.
///
/// The container's own links stay 8 bytes; for 4-byte links use the
/// cptr containers, or @ref fancy_allocator with a container that supports
/// fancy pointers.
///
/// @code
/// std::vector<node, cptr::allocator<node>> nodes(1000);
/// cptr::ptr<node> first = &nodes[0];  // the elements are in the cage
/// @endcode
template <class T, class Cage = default_cage>
class allocator {
 public:
  /// The element type.
  using value_type = T;
  /// The cage the elements are allocated in.
  using cage_type = Cage;
  /// The same allocator for another element type.
  template <class U>
  struct rebind {
    /// The rebound allocator.
    using other = allocator<U, Cage>;
  };

  /// Stateless: all allocators for one cage are interchangeable.
  constexpr allocator() noexcept = default;
  /// From an allocator for another element type in the same cage.
  template <class U>
  constexpr allocator(const allocator<U, Cage>&) noexcept {}

  /// Memory for `n` T in the cage, uninitialised. Throws
  /// std::bad_array_new_length if `n` exceeds max_size(), and std::bad_alloc
  /// when the cage is full.
  T* allocate(std::size_t n) {
    if (n > max_size()) {
      CPTR_THROW(std::bad_array_new_length(), "array length too large");
    }
    return static_cast<T*>(Cage::allocate(n * sizeof(T), alignof(T)));
  }
  /// Frees memory from allocate(); the elements must already be destroyed.
  void deallocate(T* p, std::size_t) noexcept {
    Cage::deallocate(static_cast<void*>(p));
  }
  /// The most T that one allocation could hold: no more than fit in the
  /// cage.
  constexpr std::size_t max_size() const noexcept {
    return Cage::size / sizeof(T);
  }

  /// Always true: memory from one allocator for a cage can be freed by any
  /// other for the same cage.
  template <class U>
  friend constexpr bool operator==(const allocator&,
                                   const allocator<U, Cage>&) noexcept {
    return true;
  }
};

}  // namespace cptr
