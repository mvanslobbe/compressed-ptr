// SPDX-License-Identifier: MIT
// An ordered map (a treap with parent links) whose three links per node are
// 32-bit compressed pointers.
#pragma once

#include <cstddef>
#include <cstdint>
#include <functional>
#include <iterator>
#include <new>
#include <utility>

#include "cptr/link.hpp"

namespace cptr {

template <class K, class V, class Compare = std::less<K>,
          class Cage = default_cage, bool Compressed = true>
class ordered_map {
  struct node {
    link<node, Cage, Compressed> parent;
    link<node, Cage, Compressed> left;
    link<node, Cage, Compressed> right;
    std::uint32_t priority;
    std::pair<const K, V> kv;
  };

 public:
  using key_type = K;
  using mapped_type = V;
  using value_type = std::pair<const K, V>;
  using size_type = std::size_t;

  template <bool Const>
  class basic_iterator {
   public:
    using iterator_category = std::bidirectional_iterator_tag;
    using value_type = std::pair<const K, V>;
    using difference_type = std::ptrdiff_t;
    using pointer = std::conditional_t<Const, const value_type*, value_type*>;
    using reference = std::conditional_t<Const, const value_type&, value_type&>;

    basic_iterator() noexcept = default;
    template <bool C = Const>
      requires C
    basic_iterator(const basic_iterator<false>& other) noexcept
        : node_(other.node_), owner_(other.owner_) {}

    reference operator*() const noexcept { return node_->kv; }
    pointer operator->() const noexcept { return &node_->kv; }
    basic_iterator& operator++() noexcept {
      node_ = successor(node_);
      return *this;
    }
    basic_iterator operator++(int) noexcept {
      basic_iterator old = *this;
      ++*this;
      return old;
    }
    basic_iterator& operator--() noexcept {
      node_ = node_ ? predecessor(node_) : rightmost(owner_->root_);
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
    friend class ordered_map;
    friend class basic_iterator<!Const>;
    basic_iterator(node* n, const ordered_map* owner) noexcept
        : node_(n), owner_(owner) {}
    node* node_ = nullptr;
    const ordered_map* owner_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;

  ordered_map() noexcept = default;
  ordered_map(const ordered_map& other) : ordered_map() {
    for (const auto& kv : other) {
      emplace(kv.first, kv.second);
    }
  }
  ordered_map(ordered_map&& other) noexcept
      : root_(std::exchange(other.root_, nullptr)),
        size_(std::exchange(other.size_, 0)),
        seed_(other.seed_) {}
  ordered_map& operator=(ordered_map other) noexcept {
    swap(other);
    return *this;
  }
  ~ordered_map() { clear(); }

  void swap(ordered_map& other) noexcept {
    std::swap(root_, other.root_);
    std::swap(size_, other.size_);
    std::swap(seed_, other.seed_);
  }

  iterator begin() noexcept { return {leftmost(root_), this}; }
  iterator end() noexcept { return {nullptr, this}; }
  const_iterator begin() const noexcept { return {leftmost(root_), this}; }
  const_iterator end() const noexcept { return {nullptr, this}; }

  bool empty() const noexcept { return size_ == 0; }
  size_type size() const noexcept { return size_; }

  iterator find(const K& key) noexcept { return {find_node(key), this}; }
  const_iterator find(const K& key) const noexcept {
    return {find_node(key), this};
  }
  bool contains(const K& key) const noexcept { return find_node(key); }

  iterator lower_bound(const K& key) noexcept {
    node* n = root_;
    node* best = nullptr;
    while (n) {
      if (comp_(n->kv.first, key)) {
        n = n->right;
      } else {
        best = n;
        n = n->left;
      }
    }
    return {best, this};
  }

  template <class... Args>
  std::pair<iterator, bool> emplace(const K& key, Args&&... args) {
    node* parent = nullptr;
    node* n = root_;
    bool go_left = false;
    while (n) {
      parent = n;
      if (comp_(key, n->kv.first)) {
        go_left = true;
        n = n->left;
      } else if (comp_(n->kv.first, key)) {
        go_left = false;
        n = n->right;
      } else {
        return {{n, this}, false};
      }
    }
    node* fresh = new_node(key, std::forward<Args>(args)...);
    fresh->parent = parent;
    if (!parent) {
      root_ = fresh;
    } else if (go_left) {
      parent->left = fresh;
    } else {
      parent->right = fresh;
    }
    while (node* p = fresh->parent) {
      if (p->priority >= fresh->priority) {
        break;
      }
      if (p->left == fresh) {
        rotate_right(p);
      } else {
        rotate_left(p);
      }
    }
    size_++;
    return {{fresh, this}, true};
  }

  // Like std::map::try_emplace: V is only constructed if the key is new.
  template <class... Args>
  std::pair<iterator, bool> try_emplace(const K& key, Args&&... args) {
    return emplace(key, std::forward<Args>(args)...);
  }

  std::pair<iterator, bool> insert(const value_type& kv) {
    return emplace(kv.first, kv.second);
  }

  V& operator[](const K& key) { return emplace(key).first->second; }

  iterator erase(const_iterator pos) noexcept {
    node* n = pos.node_;
    node* next = successor(n);
    // Rotate the node down until it is a leaf, then unlink it.
    while (n->left || n->right) {
      node* l = n->left;
      node* r = n->right;
      if (!r || (l && l->priority > r->priority)) {
        rotate_right(n);
      } else {
        rotate_left(n);
      }
    }
    node* p = n->parent;
    if (!p) {
      root_ = nullptr;
    } else if (p->left == n) {
      p->left = nullptr;
    } else {
      p->right = nullptr;
    }
    delete_node(n);
    size_--;
    return {next, this};
  }

  size_type erase(const K& key) noexcept {
    node* n = find_node(key);
    if (!n) {
      return 0;
    }
    erase(const_iterator(n, this));
    return 1;
  }

  void clear() noexcept {
    // Post-order without recursion, using the parent links.
    node* n = root_;
    while (n) {
      if (n->left) {
        n = n->left;
      } else if (n->right) {
        n = n->right;
      } else {
        node* p = n->parent;
        if (p) {
          if (p->left == n) {
            p->left = nullptr;
          } else {
            p->right = nullptr;
          }
        }
        delete_node(n);
        n = p;
      }
    }
    root_ = nullptr;
    size_ = 0;
  }

  static constexpr std::size_t node_size = sizeof(node);

 private:
  template <class... Args>
  node* new_node(const K& key, Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    seed_ ^= seed_ << 13;
    seed_ ^= seed_ >> 17;
    seed_ ^= seed_ << 5;
    try {
      return ::new (mem)
          node{nullptr, nullptr, nullptr, seed_,
               value_type(std::piecewise_construct, std::forward_as_tuple(key),
                          std::forward_as_tuple(std::forward<Args>(args)...))};
    } catch (...) {
      Cage::deallocate(mem);
      throw;
    }
  }

  static void delete_node(node* n) noexcept {
    n->~node();
    Cage::deallocate(n);
  }

  node* find_node(const K& key) const noexcept {
    node* n = root_;
    while (n) {
      if (comp_(key, n->kv.first)) {
        n = n->left;
      } else if (comp_(n->kv.first, key)) {
        n = n->right;
      } else {
        return n;
      }
    }
    return nullptr;
  }

  void replace_child(node* parent, node* old_child, node* new_child) noexcept {
    if (!parent) {
      root_ = new_child;
    } else if (parent->left == old_child) {
      parent->left = new_child;
    } else {
      parent->right = new_child;
    }
  }

  // x's right child takes x's place.
  void rotate_left(node* x) noexcept {
    node* y = x->right;
    node* b = y->left;
    replace_child(x->parent, x, y);
    y->parent = x->parent;
    y->left = x;
    x->parent = y;
    x->right = b;
    if (b) {
      b->parent = x;
    }
  }

  void rotate_right(node* x) noexcept {
    node* y = x->left;
    node* b = y->right;
    replace_child(x->parent, x, y);
    y->parent = x->parent;
    y->right = x;
    x->parent = y;
    x->left = b;
    if (b) {
      b->parent = x;
    }
  }

  static node* leftmost(node* n) noexcept {
    if (n) {
      while (node* l = n->left) {
        n = l;
      }
    }
    return n;
  }
  static node* rightmost(node* n) noexcept {
    if (n) {
      while (node* r = n->right) {
        n = r;
      }
    }
    return n;
  }
  static node* successor(node* n) noexcept {
    if (node* r = n->right) {
      return leftmost(r);
    }
    node* p = n->parent;
    while (p && p->right == n) {
      n = p;
      p = p->parent;
    }
    return p;
  }
  static node* predecessor(node* n) noexcept {
    if (node* l = n->left) {
      return rightmost(l);
    }
    node* p = n->parent;
    while (p && p->left == n) {
      n = p;
      p = p->parent;
    }
    return p;
  }

  node* root_ = nullptr;
  std::size_t size_ = 0;
  std::uint32_t seed_ = 0x9E3779B9u;
#if defined(_MSC_VER) && !defined(__clang__)
  [[msvc::no_unique_address]] Compare comp_{};
#else
  [[no_unique_address]] Compare comp_{};
#endif
};

}  // namespace cptr
