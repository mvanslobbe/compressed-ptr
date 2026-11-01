// SPDX-License-Identifier: MIT
// An ordered map (a red-black tree) whose three links per node are 32-bit
// compressed pointers.
#pragma once

#include <algorithm>
#include <compare>
#include <concepts>
#include <cstddef>
#include <cstdint>
#include <functional>
#include <initializer_list>
#include <iterator>
#include <new>
#include <stdexcept>
#include <tuple>
#include <type_traits>
#include <utility>

#include "cptr/link.hpp"

namespace cptr {
namespace detail {

// The map behind cptr::ordered_map. Compressed = false gives the same tree
// with raw 8-byte links, which the benchmarks compare against.
//
// A red-black tree with parent links. A header node in the cage holds the
// root, the leftmost and the rightmost node, and serves as end(), so
// iterators are a single node pointer and the map object can live anywhere.
template <class K, class V, class Compare, class Cage, bool Compressed>
class basic_ordered_map {
  struct node_base;
  using link_type = link<node_base, Cage, Compressed>;
  static constexpr std::uint8_t kRed = 0;
  static constexpr std::uint8_t kBlack = 1;
  static constexpr std::uint8_t kHeader = 2;
  struct node_base {
    link_type parent;
    link_type left;
    link_type right;
    std::uint8_t color;
  };
  struct node : node_base {
    std::pair<const K, V> kv;
  };

  template <class Key>
  static constexpr bool kTransparent =
      requires { typename Compare::is_transparent; };

 public:
  using key_type = K;
  using mapped_type = V;
  using value_type = std::pair<const K, V>;
  using size_type = std::size_t;
  using difference_type = std::ptrdiff_t;
  using key_compare = Compare;
  using reference = value_type&;
  using const_reference = const value_type&;

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
        : node_(other.node_) {}

    reference operator*() const noexcept {
      return static_cast<node*>(node_)->kv;
    }
    pointer operator->() const noexcept {
      return &static_cast<node*>(node_)->kv;
    }
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
      node_ = predecessor(node_);
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
    friend class basic_ordered_map;
    friend class basic_iterator<!Const>;
    explicit basic_iterator(node_base* n) noexcept : node_(n) {}
    node_base* node_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;
  using reverse_iterator = std::reverse_iterator<iterator>;
  using const_reverse_iterator = std::reverse_iterator<const_iterator>;

  // Allocates the header, so it can throw std::bad_alloc.
  basic_ordered_map() : header_(new_header()) {}
  explicit basic_ordered_map(const Compare& comp)
      : header_(new_header()), comp_(comp) {}
  template <std::input_iterator It>
  basic_ordered_map(It first, It last, const Compare& comp = Compare())
      : basic_ordered_map(comp) {
    insert(first, last);
  }
  basic_ordered_map(std::initializer_list<value_type> values,
                    const Compare& comp = Compare())
      : basic_ordered_map(values.begin(), values.end(), comp) {}
  // Copies the tree's shape, in linear time.
  basic_ordered_map(const basic_ordered_map& other)
      : basic_ordered_map(other.comp_) {
    if (node_base* root = other.root()) {
      node_base* copy = clone(root, header_);
      header_->parent = copy;
      header_->left = minimum(copy);
      header_->right = maximum(copy);
      size_ = other.size_;
    }
  }
  // Takes the other map's nodes and header; the other map is left empty
  // and allocates a new header when it is next inserted into.
  basic_ordered_map(basic_ordered_map&& other) noexcept
      : header_(std::exchange(other.header_, nullptr)),
        size_(std::exchange(other.size_, 0)),
        comp_(other.comp_) {}
  basic_ordered_map& operator=(const basic_ordered_map& other) {
    if (this != &other) {
      basic_ordered_map(other).swap(*this);
    }
    return *this;
  }
  basic_ordered_map& operator=(basic_ordered_map&& other) noexcept {
    basic_ordered_map(std::move(other)).swap(*this);
    return *this;
  }
  basic_ordered_map& operator=(std::initializer_list<value_type> values) {
    clear();
    insert(values);
    return *this;
  }
  ~basic_ordered_map() {
    if (header_) {
      clear();
      Cage::deallocate(header_);
    }
  }

  void swap(basic_ordered_map& other) noexcept {
    std::swap(header_, other.header_);
    std::swap(size_, other.size_);
    std::swap(comp_, other.comp_);
  }
  friend void swap(basic_ordered_map& a, basic_ordered_map& b) noexcept {
    a.swap(b);
  }

  iterator begin() noexcept {
    return iterator(header_ ? static_cast<node_base*>(header_->left) : nullptr);
  }
  iterator end() noexcept { return iterator(header_); }
  const_iterator begin() const noexcept {
    return const_cast<basic_ordered_map*>(this)->begin();
  }
  const_iterator end() const noexcept { return const_iterator(header_); }
  const_iterator cbegin() const noexcept { return begin(); }
  const_iterator cend() const noexcept { return end(); }
  reverse_iterator rbegin() noexcept { return reverse_iterator(end()); }
  reverse_iterator rend() noexcept { return reverse_iterator(begin()); }
  const_reverse_iterator rbegin() const noexcept {
    return const_reverse_iterator(end());
  }
  const_reverse_iterator rend() const noexcept {
    return const_reverse_iterator(begin());
  }
  const_reverse_iterator crbegin() const noexcept { return rbegin(); }
  const_reverse_iterator crend() const noexcept { return rend(); }

  bool empty() const noexcept { return size_ == 0; }
  size_type size() const noexcept { return size_; }
  size_type max_size() const noexcept {
    return Cage::usable_end / sizeof(node);
  }
  key_compare key_comp() const { return comp_; }

  // Lookup. The template overloads take any key type that a transparent
  // comparator (one with is_transparent, such as std::less<>) accepts.
  iterator find(const K& key) { return iterator(find_node(key)); }
  const_iterator find(const K& key) const {
    return const_iterator(find_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  iterator find(const Key& key) {
    return iterator(find_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  const_iterator find(const Key& key) const {
    return const_iterator(find_node(key));
  }
  bool contains(const K& key) const { return find_node(key) != header_; }
  template <class Key>
    requires kTransparent<Key>
  bool contains(const Key& key) const {
    return find_node(key) != header_;
  }
  size_type count(const K& key) const { return contains(key) ? 1 : 0; }
  template <class Key>
    requires kTransparent<Key>
  size_type count(const Key& key) const {
    return contains(key) ? 1 : 0;
  }
  iterator lower_bound(const K& key) { return iterator(lower_node(key)); }
  const_iterator lower_bound(const K& key) const {
    return const_iterator(lower_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  iterator lower_bound(const Key& key) {
    return iterator(lower_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  const_iterator lower_bound(const Key& key) const {
    return const_iterator(lower_node(key));
  }
  iterator upper_bound(const K& key) { return iterator(upper_node(key)); }
  const_iterator upper_bound(const K& key) const {
    return const_iterator(upper_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  iterator upper_bound(const Key& key) {
    return iterator(upper_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  const_iterator upper_bound(const Key& key) const {
    return const_iterator(upper_node(key));
  }
  std::pair<iterator, iterator> equal_range(const K& key) {
    return {lower_bound(key), upper_bound(key)};
  }
  std::pair<const_iterator, const_iterator> equal_range(const K& key) const {
    return {lower_bound(key), upper_bound(key)};
  }
  template <class Key>
    requires kTransparent<Key>
  std::pair<iterator, iterator> equal_range(const Key& key) {
    return {lower_bound(key), upper_bound(key)};
  }
  template <class Key>
    requires kTransparent<Key>
  std::pair<const_iterator, const_iterator> equal_range(const Key& key) const {
    return {lower_bound(key), upper_bound(key)};
  }

  V& at(const K& key) {
    node_base* n = find_node(key);
    if (n == header_) {
      throw std::out_of_range("cptr::ordered_map::at: no such key");
    }
    return static_cast<node*>(n)->kv.second;
  }
  const V& at(const K& key) const {
    return const_cast<basic_ordered_map*>(this)->at(key);
  }
  V& operator[](const K& key) { return try_emplace(key).first->second; }
  V& operator[](K&& key) { return try_emplace(std::move(key)).first->second; }

  // Insertion. As std::map: emplace builds the element first, try_emplace
  // only builds the mapped value if the key is new.
  template <class... Args>
  std::pair<iterator, bool> emplace(Args&&... args) {
    node* n = new_node(std::forward<Args>(args)...);
    auto [parent, left, existing] = find_slot(n->kv.first);
    if (existing) {
      delete_node(n);
      return {iterator(existing), false};
    }
    attach(n, parent, left);
    return {iterator(n), true};
  }
  // The hint is not used; the result is the same as emplace's.
  template <class... Args>
  iterator emplace_hint(const_iterator, Args&&... args) {
    return emplace(std::forward<Args>(args)...).first;
  }
  template <class... Args>
  std::pair<iterator, bool> try_emplace(const K& key, Args&&... args) {
    return try_emplace_impl(key, std::forward<Args>(args)...);
  }
  template <class... Args>
  std::pair<iterator, bool> try_emplace(K&& key, Args&&... args) {
    return try_emplace_impl(std::move(key), std::forward<Args>(args)...);
  }
  template <class... Args>
  iterator try_emplace(const_iterator, const K& key, Args&&... args) {
    return try_emplace(key, std::forward<Args>(args)...).first;
  }
  template <class M>
  std::pair<iterator, bool> insert_or_assign(const K& key, M&& value) {
    auto result = try_emplace(key, std::forward<M>(value));
    if (!result.second) {
      result.first->second = std::forward<M>(value);
    }
    return result;
  }
  template <class M>
  iterator insert_or_assign(const_iterator, const K& key, M&& value) {
    return insert_or_assign(key, std::forward<M>(value)).first;
  }
  std::pair<iterator, bool> insert(const value_type& kv) {
    return try_emplace(kv.first, kv.second);
  }
  template <class P>
    requires std::is_constructible_v<value_type, P&&>
  std::pair<iterator, bool> insert(P&& kv) {
    return emplace(std::forward<P>(kv));
  }
  iterator insert(const_iterator, const value_type& kv) {
    return insert(kv).first;
  }
  template <std::input_iterator It>
  void insert(It first, It last) {
    for (; first != last; ++first) {
      emplace(*first);
    }
  }
  void insert(std::initializer_list<value_type> values) {
    insert(values.begin(), values.end());
  }

  iterator erase(const_iterator pos) noexcept {
    node_base* n = pos.node_;
    node_base* next = successor(n);
    unlink(n);
    delete_node(n);
    return iterator(next);
  }
  iterator erase(iterator pos) noexcept { return erase(const_iterator(pos)); }
  iterator erase(const_iterator first, const_iterator last) noexcept {
    while (first != last) {
      first = erase(first);
    }
    return iterator(last.node_);
  }
  size_type erase(const K& key) {
    node_base* n = find_node(key);
    if (n == header_) {
      return 0;
    }
    erase(const_iterator(n));
    return 1;
  }

  void clear() noexcept {
    if (!header_) {
      return;
    }
    // Post-order without recursion, using the parent links.
    node_base* n = root();
    while (n) {
      if (n->left) {
        n = n->left;
      } else if (n->right) {
        n = n->right;
      } else {
        node_base* p = n->parent;
        if (p == header_) {
          p = nullptr;
        } else if (p->left == n) {
          p->left = nullptr;
        } else {
          p->right = nullptr;
        }
        delete_node(n);
        n = p;
      }
    }
    reset_header();
    size_ = 0;
  }

  friend bool operator==(const basic_ordered_map& a,
                         const basic_ordered_map& b) {
    return a.size() == b.size() && std::equal(a.begin(), a.end(), b.begin());
  }
  friend auto operator<=>(const basic_ordered_map& a,
                          const basic_ordered_map& b)
    requires std::three_way_comparable<value_type>
  {
    return std::lexicographical_compare_three_way(a.begin(), a.end(), b.begin(),
                                                  b.end());
  }

  // Checks the red-black and ordering invariants and the header; for tests.
  bool valid() const {
    if (!header_) {
      return size_ == 0;
    }
    node_base* root_node = root();
    if (!root_node) {
      return size_ == 0 && header_->left == header_ &&
             header_->right == header_;
    }
    if (root_node->color != kBlack || root_node->parent != header_ ||
        header_->left != minimum(root_node) ||
        header_->right != maximum(root_node)) {
      return false;
    }
    std::size_t count = 0;
    return black_height(root_node, count) > 0 && count == size_ &&
           std::adjacent_find(begin(), end(),
                              [&](const auto& x, const auto& y) {
                                return !comp_(x.first, y.first);
                              }) == end();
  }

  // The number of nodes on the longest path from the root; for tests.
  std::size_t height() const { return header_ ? depth(root()) : 0; }

  // Bytes per element, including the links: what the cage hands out.
  static constexpr std::size_t node_size = sizeof(node);

 private:
  static node_base* new_header() {
    void* mem = Cage::allocate(sizeof(node_base), alignof(node_base));
    auto* h = ::new (mem) node_base;
    h->color = kHeader;
    h->parent = nullptr;
    h->left = h->right = h;
    return h;
  }

  void reset_header() noexcept {
    header_->parent = nullptr;
    header_->left = header_->right = header_;
  }

  node_base* root() const noexcept { return header_->parent; }

  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem) node{{nullptr, nullptr, nullptr, kRed},
                              value_type(std::forward<Args>(args)...)};
    } catch (...) {
      Cage::deallocate(mem);
      throw;
    }
  }

  static void delete_node(node_base* n) noexcept {
    static_cast<node*>(n)->~node();
    Cage::deallocate(static_cast<node*>(n));
  }

  static const K& key_of(node_base* n) noexcept {
    return static_cast<node*>(n)->kv.first;
  }

  template <class Key>
  node_base* lower_node(const Key& key) const {
    if (!header_) {
      return nullptr;
    }
    node_base* n = root();
    node_base* best = header_;
    while (n) {
      if (comp_(key_of(n), key)) {
        n = n->right;
      } else {
        best = n;
        n = n->left;
      }
    }
    return best;
  }

  template <class Key>
  node_base* upper_node(const Key& key) const {
    if (!header_) {
      return nullptr;
    }
    node_base* n = root();
    node_base* best = header_;
    while (n) {
      if (comp_(key, key_of(n))) {
        best = n;
        n = n->left;
      } else {
        n = n->right;
      }
    }
    return best;
  }

  template <class Key>
  node_base* find_node(const Key& key) const {
    node_base* n = lower_node(key);
    if (n && n != header_ && !comp_(key, key_of(n))) {
      return n;
    }
    return header_;
  }

  struct slot {
    node_base* parent;
    bool left;
    node_base* existing;
  };

  // Where |key| belongs, or the node that already has it.
  slot find_slot(const K& key) {
    if (!header_) {
      header_ = new_header();
    }
    node_base* parent = header_;
    node_base* n = root();
    bool left = true;
    while (n) {
      parent = n;
      if (comp_(key, key_of(n))) {
        left = true;
        n = n->left;
      } else if (comp_(key_of(n), key)) {
        left = false;
        n = n->right;
      } else {
        return {nullptr, false, n};
      }
    }
    return {parent, left, nullptr};
  }

  template <class Key, class... Args>
  std::pair<iterator, bool> try_emplace_impl(Key&& key, Args&&... args) {
    auto [parent, left, existing] = find_slot(key);
    if (existing) {
      return {iterator(existing), false};
    }
    node* n = new_node(std::piecewise_construct,
                       std::forward_as_tuple(std::forward<Key>(key)),
                       std::forward_as_tuple(std::forward<Args>(args)...));
    attach(n, parent, left);
    return {iterator(n), true};
  }

  void attach(node_base* n, node_base* parent, bool left) noexcept {
    n->parent = parent;
    if (parent == header_) {
      header_->parent = n;
      header_->left = header_->right = n;
    } else if (left) {
      parent->left = n;
      if (parent == header_->left) {
        header_->left = n;
      }
    } else {
      parent->right = n;
      if (parent == header_->right) {
        header_->right = n;
      }
    }
    insert_fixup(n);
    size_++;
  }

  static bool red(node_base* n) noexcept { return n && n->color == kRed; }
  static node_base* node_parent(node_base* n) noexcept { return n->parent; }

  void replace_child(node_base* old_child, node_base* new_child) noexcept {
    node_base* p = old_child->parent;
    if (p == header_) {
      header_->parent = new_child;
    } else if (p->left == old_child) {
      p->left = new_child;
    } else {
      p->right = new_child;
    }
  }

  // x's right child takes x's place.
  void rotate_left(node_base* x) noexcept {
    node_base* y = x->right;
    node_base* b = y->left;
    x->right = b;
    if (b) {
      b->parent = x;
    }
    y->parent = x->parent;
    replace_child(x, y);
    y->left = x;
    x->parent = y;
  }

  void rotate_right(node_base* x) noexcept {
    node_base* y = x->left;
    node_base* b = y->right;
    x->left = b;
    if (b) {
      b->parent = x;
    }
    y->parent = x->parent;
    replace_child(x, y);
    y->right = x;
    x->parent = y;
  }

  void insert_fixup(node_base* z) noexcept {
    while (red(z->parent)) {
      node_base* p = z->parent;
      node_base* g = p->parent;  // p is red, so not the root
      if (p == g->left) {
        node_base* u = g->right;
        if (red(u)) {
          p->color = kBlack;
          u->color = kBlack;
          g->color = kRed;
          z = g;
        } else {
          if (z == p->right) {
            z = p;
            rotate_left(z);
            p = z->parent;
          }
          p->color = kBlack;
          g->color = kRed;
          rotate_right(g);
        }
      } else {
        node_base* u = g->left;
        if (red(u)) {
          p->color = kBlack;
          u->color = kBlack;
          g->color = kRed;
          z = g;
        } else {
          if (z == p->left) {
            z = p;
            rotate_right(z);
            p = z->parent;
          }
          p->color = kBlack;
          g->color = kRed;
          rotate_left(g);
        }
      }
    }
    root()->color = kBlack;
  }

  // Put |v| (possibly null) where |u| was.
  void transplant(node_base* u, node_base* v) noexcept {
    replace_child(u, v);
    if (v) {
      v->parent = u->parent;
    }
  }

  void unlink(node_base* z) noexcept {
    if (z == header_->left) {
      header_->left = z->right ? minimum(z->right) : node_parent(z);
    }
    if (z == header_->right) {
      header_->right = z->left ? maximum(z->left) : node_parent(z);
    }
    node_base* x;
    node_base* x_parent;
    std::uint8_t removed_color = z->color;
    if (!z->left) {
      x = z->right;
      x_parent = z->parent;
      transplant(z, x);
    } else if (!z->right) {
      x = z->left;
      x_parent = z->parent;
      transplant(z, x);
    } else {
      node_base* y = minimum(z->right);
      removed_color = y->color;
      x = y->right;
      if (y->parent == z) {
        x_parent = y;
      } else {
        x_parent = y->parent;
        transplant(y, x);
        y->right = z->right;
        static_cast<node_base*>(y->right)->parent = y;
      }
      transplant(z, y);
      y->left = z->left;
      static_cast<node_base*>(y->left)->parent = y;
      y->color = z->color;
    }
    if (removed_color == kBlack) {
      erase_fixup(x, x_parent);
    }
    size_--;
  }

  void erase_fixup(node_base* x, node_base* x_parent) noexcept {
    while (x != root() && !red(x)) {
      if (x == x_parent->left) {
        node_base* w = x_parent->right;
        if (red(w)) {
          w->color = kBlack;
          x_parent->color = kRed;
          rotate_left(x_parent);
          w = x_parent->right;
        }
        if (!red(w->left) && !red(w->right)) {
          w->color = kRed;
          x = x_parent;
          x_parent = x_parent->parent;
        } else {
          if (!red(w->right)) {
            static_cast<node_base*>(w->left)->color = kBlack;
            w->color = kRed;
            rotate_right(w);
            w = x_parent->right;
          }
          w->color = x_parent->color;
          x_parent->color = kBlack;
          if (node_base* r = w->right) {
            r->color = kBlack;
          }
          rotate_left(x_parent);
          x = root();
        }
      } else {
        node_base* w = x_parent->left;
        if (red(w)) {
          w->color = kBlack;
          x_parent->color = kRed;
          rotate_right(x_parent);
          w = x_parent->left;
        }
        if (!red(w->right) && !red(w->left)) {
          w->color = kRed;
          x = x_parent;
          x_parent = x_parent->parent;
        } else {
          if (!red(w->left)) {
            static_cast<node_base*>(w->right)->color = kBlack;
            w->color = kRed;
            rotate_left(w);
            w = x_parent->left;
          }
          w->color = x_parent->color;
          x_parent->color = kBlack;
          if (node_base* l = w->left) {
            l->color = kBlack;
          }
          rotate_right(x_parent);
          x = root();
        }
      }
    }
    if (x) {
      x->color = kBlack;
    }
  }

  // Copy the subtree at |n|, colours included.
  node_base* clone(node_base* n, node_base* parent) {
    node* copy = new_node(static_cast<node*>(n)->kv);
    copy->color = n->color;
    copy->parent = parent;
    try {
      if (n->left) {
        copy->left = clone(n->left, copy);
      }
      if (n->right) {
        copy->right = clone(n->right, copy);
      }
    } catch (...) {
      destroy_subtree(copy);
      throw;
    }
    return copy;
  }

  static void destroy_subtree(node_base* n) noexcept {
    if (n) {
      destroy_subtree(n->left);
      destroy_subtree(n->right);
      delete_node(n);
    }
  }

  static node_base* minimum(node_base* n) noexcept {
    while (node_base* l = n->left) {
      n = l;
    }
    return n;
  }
  static node_base* maximum(node_base* n) noexcept {
    while (node_base* r = n->right) {
      n = r;
    }
    return n;
  }
  static node_base* successor(node_base* n) noexcept {
    if (node_base* r = n->right) {
      return minimum(r);
    }
    node_base* p = n->parent;
    while (p->color != kHeader && n == p->right) {
      n = p;
      p = p->parent;
    }
    return p;
  }
  static node_base* predecessor(node_base* n) noexcept {
    if (n->color == kHeader) {
      return n->right;  // the rightmost node, or the header if empty
    }
    if (node_base* l = n->left) {
      return maximum(l);
    }
    node_base* p = n->parent;
    while (p->color != kHeader && n == p->left) {
      n = p;
      p = p->parent;
    }
    return p;
  }

  // The number of black nodes on every path down from |n|, or 0 if the
  // paths differ or a red node has a red child. Counts the nodes into
  // |count| and checks the parent links and the key order.
  std::size_t black_height(node_base* n, std::size_t& count) const {
    if (!n) {
      return 1;
    }
    count++;
    node_base* l = n->left;
    node_base* r = n->right;
    if ((l && (l->parent != n || !comp_(key_of(l), key_of(n)))) ||
        (r && (r->parent != n || !comp_(key_of(n), key_of(r)))) ||
        (n->color == kRed && (red(l) || red(r)))) {
      return 0;
    }
    std::size_t hl = black_height(l, count);
    std::size_t hr = black_height(r, count);
    if (hl == 0 || hl != hr) {
      return 0;
    }
    return hl + (n->color == kBlack ? 1 : 0);
  }

  static std::size_t depth(node_base* n) {
    return n ? 1 + std::max(depth(n->left), depth(n->right)) : 0;
  }

  node_base* header_;
  std::size_t size_ = 0;
#if defined(_MSC_VER) && !defined(__clang__)
  [[msvc::no_unique_address]] Compare comp_{};
#else
  [[no_unique_address]] Compare comp_{};
#endif
};

}  // namespace detail

// An ordered map with 4-byte links, like std::map without the allocator
// parameter and node handles. Nodes are allocated in |Cage|.
template <class K, class V, class Compare = std::less<K>,
          class Cage = default_cage>
using ordered_map = detail::basic_ordered_map<K, V, Compare, Cage, true>;

}  // namespace cptr
