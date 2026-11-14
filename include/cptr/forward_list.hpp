// SPDX-License-Identifier: MIT
// A singly linked list whose links are 32-bit compressed pointers.
#pragma once

#include <algorithm>
#include <compare>
#include <concepts>
#include <cstddef>
#include <functional>
#include <initializer_list>
#include <iterator>
#include <new>
#include <type_traits>
#include <utility>

#include "cptr/link.hpp"

namespace cptr {
namespace detail {

/// The class behind cptr::forward_list; use that alias. Its members behave like
/// those of `std::forward_list`.
///
/// The list behind cptr::forward_list. Compressed = false gives the same
/// list with raw 8-byte links, for the benchmarks.
///
/// The head link lives in the list object, which serves as before_begin().
/// No node ever links to it, so the object itself can be anywhere, and an
/// empty list allocates nothing. A node of a 4-byte value is 8 bytes.
template <class T, class Cage, bool Compressed>
class basic_forward_list {
  struct node_base;
  using link_type = link<node_base, Cage, Compressed>;
  struct node_base {
    link_type next;
  };
  struct node : node_base {
    T value;
  };

 public:
  using value_type = T;
  using size_type = std::size_t;
  using difference_type = std::ptrdiff_t;
  using reference = T&;
  using const_reference = const T&;

  template <bool Const>
  class basic_iterator {
   public:
    using iterator_category = std::forward_iterator_tag;
    using value_type = T;
    using difference_type = std::ptrdiff_t;
    using pointer = std::conditional_t<Const, const T*, T*>;
    using reference = std::conditional_t<Const, const T&, T&>;

    basic_iterator() noexcept = default;
    template <bool C = Const>
      requires C
    basic_iterator(const basic_iterator<false>& other) noexcept
        : node_(other.node_) {}

    reference operator*() const noexcept {
      return static_cast<node*>(node_)->value;
    }
    pointer operator->() const noexcept {
      return &static_cast<node*>(node_)->value;
    }
    basic_iterator& operator++() noexcept {
      node_ = node_->next;
      return *this;
    }
    basic_iterator operator++(int) noexcept {
      basic_iterator old = *this;
      ++*this;
      return old;
    }
    friend bool operator==(basic_iterator a, basic_iterator b) noexcept {
      return a.node_ == b.node_;
    }

   private:
    friend class basic_forward_list;
    friend class basic_iterator<!Const>;
    explicit basic_iterator(node_base* n) noexcept : node_(n) {}
    node_base* node_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;

  basic_forward_list() noexcept = default;
  explicit basic_forward_list(size_type n) { resize(n); }
  basic_forward_list(size_type n, const T& value) {
    insert_after(before_begin(), n, value);
  }
  template <std::input_iterator It>
  basic_forward_list(It first, It last) {
    insert_after(before_begin(), first, last);
  }
  basic_forward_list(std::initializer_list<T> values)
      : basic_forward_list(values.begin(), values.end()) {}
  basic_forward_list(const basic_forward_list& other)
      : basic_forward_list(other.begin(), other.end()) {}
  basic_forward_list(basic_forward_list&& other) noexcept {
    head_.next = other.head_.next;
    other.head_.next = nullptr;
  }
  basic_forward_list& operator=(const basic_forward_list& other) {
    if (this != &other) {
      assign(other.begin(), other.end());
    }
    return *this;
  }
  basic_forward_list& operator=(basic_forward_list&& other) noexcept {
    basic_forward_list(std::move(other)).swap(*this);
    return *this;
  }
  basic_forward_list& operator=(std::initializer_list<T> values) {
    assign(values.begin(), values.end());
    return *this;
  }
  ~basic_forward_list() { clear(); }

  template <std::input_iterator It>
  void assign(It first, It last) {
    clear();
    insert_after(before_begin(), first, last);
  }
  void assign(size_type n, const T& value) {
    clear();
    insert_after(before_begin(), n, value);
  }
  void assign(std::initializer_list<T> values) {
    assign(values.begin(), values.end());
  }

  void swap(basic_forward_list& other) noexcept {
    std::swap(head_.next, other.head_.next);
  }
  friend void swap(basic_forward_list& a, basic_forward_list& b) noexcept {
    a.swap(b);
  }

  iterator before_begin() noexcept { return iterator(&head_); }
  const_iterator before_begin() const noexcept {
    return const_iterator(const_cast<node_base*>(&head_));
  }
  const_iterator cbefore_begin() const noexcept { return before_begin(); }
  iterator begin() noexcept { return iterator(head_.next); }
  const_iterator begin() const noexcept { return const_iterator(head_.next); }
  const_iterator cbegin() const noexcept { return begin(); }
  iterator end() noexcept { return iterator(nullptr); }
  const_iterator end() const noexcept { return const_iterator(nullptr); }
  const_iterator cend() const noexcept { return end(); }

  bool empty() const noexcept { return !head_.next; }
  size_type max_size() const noexcept {
    return Cage::usable_end / sizeof(node);
  }

  T& front() noexcept { return *begin(); }
  const T& front() const noexcept { return *begin(); }

  template <class... Args>
  iterator emplace_after(const_iterator pos, Args&&... args) {
    node* n = new_node(std::forward<Args>(args)...);
    link_after(pos.node_, n);
    return iterator(n);
  }
  template <class... Args>
  T& emplace_front(Args&&... args) {
    return *emplace_after(before_begin(), std::forward<Args>(args)...);
  }
  void push_front(const T& v) { emplace_front(v); }
  void push_front(T&& v) { emplace_front(std::move(v)); }
  void pop_front() noexcept { erase_after(before_begin()); }

  iterator insert_after(const_iterator pos, const T& v) {
    return emplace_after(pos, v);
  }
  iterator insert_after(const_iterator pos, T&& v) {
    return emplace_after(pos, std::move(v));
  }
  /// Returns the last element inserted, or `pos` if none.
  iterator insert_after(const_iterator pos, size_type n, const T& v) {
    return insert_each(pos, [&](auto&& add) {
      for (; n; n--) {
        add(v);
      }
    });
  }
  template <std::input_iterator It>
  iterator insert_after(const_iterator pos, It first, It last) {
    return insert_each(pos, [&](auto&& add) {
      for (; first != last; ++first) {
        add(*first);
      }
    });
  }
  iterator insert_after(const_iterator pos, std::initializer_list<T> values) {
    return insert_after(pos, values.begin(), values.end());
  }

  /// Erases the element after `pos` and returns the one after that.
  iterator erase_after(const_iterator pos) noexcept {
    node_base* n = pos.node_->next;
    pos.node_->next = n->next;
    delete_node(n);
    return iterator(pos.node_->next);
  }
  /// Erases the elements strictly between `first` and `last`.
  iterator erase_after(const_iterator first, const_iterator last) noexcept {
    node_base* n = first.node_->next;
    first.node_->next = last.node_;
    while (n != last.node_) {
      node_base* next = n->next;
      delete_node(n);
      n = next;
    }
    return iterator(last.node_);
  }

  void clear() noexcept { erase_after(before_begin(), end()); }

  void resize(size_type n) {
    resize_with(n, [] { return T(); });
  }
  void resize(size_type n, const T& v) {
    resize_with(n, [&]() -> const T& { return v; });
  }

  /// Move all of `other` after `pos`.
  void splice_after(const_iterator pos, basic_forward_list& other) noexcept {
    splice_after(pos, other, other.before_begin(), other.end());
  }
  void splice_after(const_iterator pos, basic_forward_list&& other) noexcept {
    splice_after(pos, other);
  }
  /// Move the element after `it` in `other` to after `pos`.
  void splice_after(const_iterator pos, basic_forward_list&,
                    const_iterator it) noexcept {
    node_base* n = it.node_->next;
    if (pos.node_ == it.node_ || pos.node_ == n) {
      return;
    }
    it.node_->next = n->next;
    n->next = pos.node_->next;
    pos.node_->next = n;
  }
  void splice_after(const_iterator pos, basic_forward_list&& other,
                    const_iterator it) noexcept {
    splice_after(pos, other, it);
  }
  /// Move the elements strictly between `first` and `last` to after `pos`.
  void splice_after(const_iterator pos, basic_forward_list&,
                    const_iterator first, const_iterator last) noexcept {
    node_base* begin = first.node_->next;
    if (begin == last.node_ || pos.node_ == first.node_) {
      return;
    }
    node_base* tail = begin;
    while (tail->next != last.node_) {
      tail = tail->next;
    }
    first.node_->next = last.node_;
    tail->next = pos.node_->next;
    pos.node_->next = begin;
  }
  void splice_after(const_iterator pos, basic_forward_list&& other,
                    const_iterator first, const_iterator last) noexcept {
    splice_after(pos, other, first, last);
  }

  /// Merge sorted `other` into this sorted list; stable, this list's
  /// elements come first among equals.
  template <class Compare = std::less<>>
  void merge(basic_forward_list& other, Compare comp = Compare()) {
    if (&other == this) {
      return;
    }
    head_.next = merge_runs(head_.next, other.head_.next, comp);
    other.head_.next = nullptr;
  }
  template <class Compare = std::less<>>
  void merge(basic_forward_list&& other, Compare comp = Compare()) {
    merge(other, comp);
  }

  /// Stable merge sort on the links; no element is copied or moved.
  template <class Compare = std::less<>>
  void sort(Compare comp = Compare()) {
    node_base* bins[64] = {};
    node_base* chain = head_.next;
    while (chain) {
      node_base* carry = chain;
      chain = chain->next;
      carry->next = nullptr;
      std::size_t i = 0;
      for (; bins[i]; i++) {
        carry = merge_runs(bins[i], carry, comp);
        bins[i] = nullptr;
      }
      bins[i] = carry;
    }
    node_base* sorted = nullptr;
    for (node_base* bin : bins) {
      if (bin) {
        sorted = merge_runs(bin, sorted, comp);
      }
    }
    head_.next = sorted;
  }

  void reverse() noexcept {
    node_base* prev = nullptr;
    node_base* n = head_.next;
    while (n) {
      node_base* next = n->next;
      n->next = prev;
      prev = n;
      n = next;
    }
    head_.next = prev;
  }

  /// Unlinked nodes are destroyed only at the end, so `value` may refer to
  /// an element of this list.
  size_type remove(const T& value) {
    return remove_if([&](const T& v) { return v == value; });
  }
  template <class Pred>
  size_type remove_if(Pred pred) {
    node_base* doomed = nullptr;
    size_type removed = 0;
    node_base* prev = &head_;
    while (node_base* n = prev->next) {
      if (pred(value_of(n))) {
        prev->next = n->next;
        n->next = doomed;
        doomed = n;
        removed++;
      } else {
        prev = n;
      }
    }
    destroy_chain(doomed);
    return removed;
  }
  template <class Pred = std::equal_to<>>
  size_type unique(Pred pred = Pred()) {
    node_base* doomed = nullptr;
    size_type removed = 0;
    node_base* kept = head_.next;
    if (!kept) {
      return 0;
    }
    while (node_base* n = kept->next) {
      if (pred(value_of(kept), value_of(n))) {
        kept->next = n->next;
        n->next = doomed;
        doomed = n;
        removed++;
      } else {
        kept = n;
      }
    }
    destroy_chain(doomed);
    return removed;
  }

  friend bool operator==(const basic_forward_list& a,
                         const basic_forward_list& b) {
    return std::equal(a.begin(), a.end(), b.begin(), b.end());
  }
  friend auto operator<=>(const basic_forward_list& a,
                          const basic_forward_list& b)
    requires std::three_way_comparable<T>
  {
    return std::lexicographical_compare_three_way(a.begin(), a.end(), b.begin(),
                                                  b.end());
  }

  /// Bytes per element, including the link: what the cage hands out.
  static constexpr std::size_t node_size = sizeof(node);

 private:
  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem) node{{nullptr}, T(std::forward<Args>(args)...)};
    } catch (...) {
      Cage::deallocate(mem);
      throw;
    }
  }
  static void delete_node(node_base* n) noexcept {
    static_cast<node*>(n)->~node();
    Cage::deallocate(static_cast<node*>(n));
  }
  static T& value_of(node_base* n) noexcept {
    return static_cast<node*>(n)->value;
  }
  static void link_after(node_base* at, node_base* n) noexcept {
    n->next = at->next;
    at->next = n;
  }
  static void destroy_chain(node_base* n) noexcept {
    while (n) {
      node_base* next = n->next;
      delete_node(n);
      n = next;
    }
  }

  template <class Compare>
  static node_base* merge_runs(node_base* a, node_base* b, Compare& comp) {
    node_base head;
    node_base* tail = &head;
    while (a && b) {
      if (comp(value_of(b), value_of(a))) {
        tail->next = b;
        tail = b;
        b = b->next;
      } else {
        tail->next = a;
        tail = a;
        a = a->next;
      }
    }
    tail->next = a ? a : b;
    return head.next;
  }

  template <class Produce>
  iterator insert_each(const_iterator pos, Produce produce) {
    node_base* at = pos.node_;
    node_base* first_after = at->next;
    try {
      produce([&](auto&& v) {
        node* n = new_node(std::forward<decltype(v)>(v));
        link_after(at, n);
        at = n;
      });
    } catch (...) {
      erase_after(pos, const_iterator(first_after));
      throw;
    }
    return iterator(at);
  }

  template <class Make>
  void resize_with(size_type n, Make make) {
    node_base* at = &head_;
    for (; n && at->next; n--) {
      at = at->next;
    }
    if (n == 0) {
      erase_after(const_iterator(at), end());
      return;
    }
    for (; n; n--) {
      node* fresh = new_node(make());
      link_after(at, fresh);
      at = fresh;
    }
  }

  node_base head_{};
};

}  // namespace detail

/// A singly linked list with 4-byte links, like `std::forward_list` without
/// the allocator parameter.
///
/// Nodes are allocated in `Cage`; an empty list allocates nothing. Every
/// member behaves like its `std::forward_list` counterpart; see
/// @ref detail::basic_forward_list for the full member list.
///
/// @code
/// #include "cptr/forward_list.hpp"
///
/// cptr::forward_list<int> f{3, 1, 2};
/// f.push_front(0);
/// f.sort();
/// @endcode
template <class T, class Cage = default_cage>
using forward_list = detail::basic_forward_list<T, Cage, true>;

}  // namespace cptr
