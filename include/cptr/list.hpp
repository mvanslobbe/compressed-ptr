// SPDX-License-Identifier: MIT
// A doubly linked list whose links are 32-bit compressed pointers.
#pragma once

#include <cstddef>
#include <iterator>
#include <new>
#include <utility>

#include "cptr/link.hpp"

namespace cptr {

template <class T, class Cage = default_cage, bool Compressed = true>
class list {
  struct node {
    link<node, Cage, Compressed> prev;
    link<node, Cage, Compressed> next;
    T value;
  };

 public:
  using value_type = T;
  using size_type = std::size_t;
  using reference = T&;
  using const_reference = const T&;

  template <bool Const>
  class basic_iterator {
   public:
    using iterator_category = std::bidirectional_iterator_tag;
    using value_type = T;
    using difference_type = std::ptrdiff_t;
    using pointer = std::conditional_t<Const, const T*, T*>;
    using reference = std::conditional_t<Const, const T&, T&>;

    basic_iterator() noexcept = default;
    template <bool C = Const>
      requires C
    basic_iterator(const basic_iterator<false>& other) noexcept
        : node_(other.node_), owner_(other.owner_) {}

    reference operator*() const noexcept { return node_->value; }
    pointer operator->() const noexcept { return &node_->value; }
    basic_iterator& operator++() noexcept {
      node_ = node_->next;
      return *this;
    }
    basic_iterator operator++(int) noexcept {
      basic_iterator old = *this;
      ++*this;
      return old;
    }
    basic_iterator& operator--() noexcept {
      node_ = node_ ? static_cast<node*>(node_->prev) : owner_->tail_;
      return *this;
    }
    basic_iterator operator--(int) noexcept {
      basic_iterator old = *this;
      --*this;
      return old;
    }
    friend bool operator==(basic_iterator a, basic_iterator b) noexcept {
      return a.node_ == b.node_;
    }

   private:
    friend class list;
    friend class basic_iterator<!Const>;
    basic_iterator(node* n, const list* owner) noexcept
        : node_(n), owner_(owner) {}
    node* node_ = nullptr;
    const list* owner_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;

  list() noexcept = default;
  list(const list& other) : list() {
    for (const T& v : other) {
      push_back(v);
    }
  }
  list(list&& other) noexcept
      : head_(std::exchange(other.head_, nullptr)),
        tail_(std::exchange(other.tail_, nullptr)),
        size_(std::exchange(other.size_, 0)) {}
  list& operator=(list other) noexcept {
    swap(other);
    return *this;
  }
  ~list() { clear(); }

  void swap(list& other) noexcept {
    std::swap(head_, other.head_);
    std::swap(tail_, other.tail_);
    std::swap(size_, other.size_);
  }

  iterator begin() noexcept { return {head_, this}; }
  iterator end() noexcept { return {nullptr, this}; }
  const_iterator begin() const noexcept { return {head_, this}; }
  const_iterator end() const noexcept { return {nullptr, this}; }

  bool empty() const noexcept { return size_ == 0; }
  size_type size() const noexcept { return size_; }
  T& front() noexcept { return head_->value; }
  T& back() noexcept { return tail_->value; }

  template <class... Args>
  iterator emplace(const_iterator pos, Args&&... args) {
    node* n = new_node(std::forward<Args>(args)...);
    node* next = pos.node_;
    node* prev = next ? static_cast<node*>(next->prev) : tail_;
    n->prev = prev;
    n->next = next;
    if (prev) {
      prev->next = n;
    } else {
      head_ = n;
    }
    if (next) {
      next->prev = n;
    } else {
      tail_ = n;
    }
    size_++;
    return {n, this};
  }
  template <class... Args>
  T& emplace_back(Args&&... args) {
    return *emplace(end(), std::forward<Args>(args)...);
  }
  template <class... Args>
  T& emplace_front(Args&&... args) {
    return *emplace(begin(), std::forward<Args>(args)...);
  }
  void push_back(const T& v) { emplace_back(v); }
  void push_back(T&& v) { emplace_back(std::move(v)); }
  void push_front(const T& v) { emplace_front(v); }
  void push_front(T&& v) { emplace_front(std::move(v)); }

  iterator erase(const_iterator pos) noexcept {
    node* n = pos.node_;
    node* prev = n->prev;
    node* next = n->next;
    if (prev) {
      prev->next = next;
    } else {
      head_ = next;
    }
    if (next) {
      next->prev = prev;
    } else {
      tail_ = prev;
    }
    n->~node();
    Cage::deallocate(n);
    size_--;
    return {next, this};
  }
  void pop_front() noexcept { erase(begin()); }
  void pop_back() noexcept { erase(const_iterator(tail_, this)); }

  void clear() noexcept {
    node* n = head_;
    while (n) {
      node* next = n->next;
      n->~node();
      Cage::deallocate(n);
      n = next;
    }
    head_ = tail_ = nullptr;
    size_ = 0;
  }

  // Bytes per element, including the links: what the cage hands out.
  static constexpr std::size_t node_size = sizeof(node);

 private:
  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem) node{nullptr, nullptr, T(std::forward<Args>(args)...)};
    } catch (...) {
      Cage::deallocate(mem);
      throw;
    }
  }

  node* head_ = nullptr;
  node* tail_ = nullptr;
  std::size_t size_ = 0;
};

}  // namespace cptr
