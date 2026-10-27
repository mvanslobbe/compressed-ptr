// SPDX-License-Identifier: MIT
// An allocator whose pointer type is cptr::ptr, for containers that take
// their internal pointer types from std::allocator_traits (fancy pointers).
#pragma once

#include <cstddef>
#include <new>
#include <utility>

#include "cptr/ptr.hpp"

namespace cptr {

template <class T, class Cage = default_cage>
class fancy_allocator {
 public:
  using value_type = T;
  using pointer = ptr<T, Cage>;
  using const_pointer = ptr<const T, Cage>;
  using void_pointer = ptr<void, Cage>;
  using const_void_pointer = ptr<const void, Cage>;
  using size_type = std::size_t;
  using difference_type = std::ptrdiff_t;
  template <class U>
  struct rebind {
    using other = fancy_allocator<U, Cage>;
  };

  fancy_allocator() noexcept = default;
  template <class U>
  fancy_allocator(const fancy_allocator<U, Cage>&) noexcept {}

  pointer allocate(std::size_t n) {
    if (n > std::size_t(-1) / sizeof(T)) {
      throw std::bad_array_new_length();
    }
    return pointer(static_cast<T*>(Cage::allocate(n * sizeof(T), alignof(T))));
  }
  void deallocate(pointer p, std::size_t) noexcept {
    Cage::deallocate(p.get());
  }

  // std::allocator_traits::construct takes a raw pointer; containers written
  // for fancy pointers pass the allocator's pointer type instead.
  template <class U, class... Args>
  void construct(U* p, Args&&... args) {
    ::new (static_cast<void*>(p)) U(std::forward<Args>(args)...);
  }
  template <class U, class... Args>
  void construct(ptr<U, Cage> p, Args&&... args) {
    construct(p.get(), std::forward<Args>(args)...);
  }
  template <class U>
  void destroy(U* p) noexcept {
    p->~U();
  }
  template <class U>
  void destroy(ptr<U, Cage> p) noexcept {
    p->~U();
  }

  template <class U>
  friend bool operator==(const fancy_allocator&,
                         const fancy_allocator<U, Cage>&) noexcept {
    return true;
  }
};

}  // namespace cptr
