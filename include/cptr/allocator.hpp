// SPDX-License-Identifier: MIT
// A standard allocator that places objects inside a cage, so that any
// std container's elements can be referred to by cptr::ptr.
#pragma once

#include <cstddef>
#include <new>

#include "cptr/cage.hpp"

namespace cptr {

template <class T, class Cage = default_cage>
class allocator {
 public:
  using value_type = T;
  using cage_type = Cage;
  template <class U>
  struct rebind {
    using other = allocator<U, Cage>;
  };

  allocator() noexcept = default;
  template <class U>
  allocator(const allocator<U, Cage>&) noexcept {}

  T* allocate(std::size_t n) {
    if (n > std::size_t(-1) / sizeof(T)) {
      throw std::bad_array_new_length();
    }
    return static_cast<T*>(Cage::allocate(n * sizeof(T), alignof(T)));
  }
  void deallocate(T* p, std::size_t) noexcept { Cage::deallocate(p); }

  template <class U>
  friend bool operator==(const allocator&, const allocator<U, Cage>&) noexcept {
    return true;
  }
};

}  // namespace cptr
