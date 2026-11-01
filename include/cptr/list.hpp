// SPDX-License-Identifier: MIT
// A doubly linked list whose links are 32-bit compressed pointers.
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

// The list behind cptr::list. Compressed = false gives the same list with
// raw 8-byte links, which the benchmarks compare against.
//
// It is circular around a sentinel node that holds only the two links. The
// sentinel lives in the cage, so it can be linked to with compressed
// pointers, and the list object itself can live anywhere. Iterators are a
// single node pointer, and end() stays valid while the list exists.
template <class T, class Cage, bool Compressed>
class basic_list {
  struct node_base;
  using link_type = link<node_base, Cage, Compressed>;
  struct node_base {
    link_type prev;
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
    using iterator_category = std::bidirectional_iterator_tag;
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
    basic_iterator& operator--() noexcept {
      node_ = node_->prev;
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
    friend class basic_list;
    friend class basic_iterator<!Const>;
    explicit basic_iterator(node_base* n) noexcept : node_(n) {}
    node_base* node_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;
  using reverse_iterator = std::reverse_iterator<iterator>;
  using const_reverse_iterator = std::reverse_iterator<const_iterator>;

  // Allocates the sentinel, so it can throw std::bad_alloc.
  basic_list() : sentinel_(new_sentinel()) {}
  explicit basic_list(size_type n) : basic_list() { resize(n); }
  basic_list(size_type n, const T& value) : basic_list() {
    insert(end(), n, value);
  }
  template <std::input_iterator It>
  basic_list(It first, It last) : basic_list() {
    insert(end(), first, last);
  }
  basic_list(std::initializer_list<T> values)
      : basic_list(values.begin(), values.end()) {}
  basic_list(const basic_list& other)
      : basic_list(other.begin(), other.end()) {}
  // Takes the other list's nodes and sentinel; the other list is left empty
  // and allocates a new sentinel when it is next used.
  basic_list(basic_list&& other) noexcept
      : sentinel_(std::exchange(other.sentinel_, nullptr)),
        size_(std::exchange(other.size_, 0)) {}
  basic_list& operator=(const basic_list& other) {
    if (this != &other) {
      assign(other.begin(), other.end());
    }
    return *this;
  }
  basic_list& operator=(basic_list&& other) noexcept {
    basic_list(std::move(other)).swap(*this);
    return *this;
  }
  basic_list& operator=(std::initializer_list<T> values) {
    assign(values.begin(), values.end());
    return *this;
  }
  ~basic_list() {
    if (sentinel_) {
      clear();
      Cage::deallocate(sentinel_);
    }
  }

  template <std::input_iterator It>
  void assign(It first, It last) {
    clear();
    insert(end(), first, last);
  }
  void assign(size_type n, const T& value) {
    clear();
    insert(end(), n, value);
  }
  void assign(std::initializer_list<T> values) {
    assign(values.begin(), values.end());
  }

  void swap(basic_list& other) noexcept {
    std::swap(sentinel_, other.sentinel_);
    std::swap(size_, other.size_);
  }
  friend void swap(basic_list& a, basic_list& b) noexcept { a.swap(b); }

  iterator begin() noexcept {
    return iterator(sentinel_ ? static_cast<node_base*>(sentinel_->next)
                              : nullptr);
  }
  iterator end() noexcept { return iterator(sentinel_); }
  const_iterator begin() const noexcept {
    return const_cast<basic_list*>(this)->begin();
  }
  const_iterator end() const noexcept { return const_iterator(sentinel_); }
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

  T& front() noexcept { return *begin(); }
  const T& front() const noexcept { return *begin(); }
  T& back() noexcept { return *std::prev(end()); }
  const T& back() const noexcept { return *std::prev(end()); }

  template <class... Args>
  iterator emplace(const_iterator pos, Args&&... args) {
    node_base* at = position(pos);
    node* n = new_node(std::forward<Args>(args)...);
    link_before(at, n);
    size_++;
    return iterator(n);
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

  iterator insert(const_iterator pos, const T& v) { return emplace(pos, v); }
  iterator insert(const_iterator pos, T&& v) {
    return emplace(pos, std::move(v));
  }
  iterator insert(const_iterator pos, size_type n, const T& v) {
    return insert_each(pos, [&](auto&& add) {
      for (; n; n--) {
        add(v);
      }
    });
  }
  template <std::input_iterator It>
  iterator insert(const_iterator pos, It first, It last) {
    return insert_each(pos, [&](auto&& add) {
      for (; first != last; ++first) {
        add(*first);
      }
    });
  }
  iterator insert(const_iterator pos, std::initializer_list<T> values) {
    return insert(pos, values.begin(), values.end());
  }

  iterator erase(const_iterator pos) noexcept {
    node_base* n = pos.node_;
    node_base* next = unlink(n);
    delete_node(n);
    size_--;
    return iterator(next);
  }
  iterator erase(const_iterator first, const_iterator last) noexcept {
    while (first != last) {
      first = erase(first);
    }
    return iterator(last.node_);
  }
  void pop_front() noexcept { erase(begin()); }
  void pop_back() noexcept { erase(std::prev(end())); }

  void clear() noexcept {
    if (!sentinel_) {
      return;
    }
    node_base* n = sentinel_->next;
    while (n != sentinel_) {
      node_base* next = n->next;
      delete_node(n);
      n = next;
    }
    sentinel_->prev = sentinel_->next = sentinel_;
    size_ = 0;
  }

  void resize(size_type n) {
    resize_with(n, [] { return T(); });
  }
  void resize(size_type n, const T& v) {
    resize_with(n, [&]() -> const T& { return v; });
  }

  // Move all of |other| before |pos|.
  void splice(const_iterator pos, basic_list& other) {
    splice(pos, other, other.begin(), other.end());
  }
  void splice(const_iterator pos, basic_list&& other) { splice(pos, other); }
  // Move the element at |it| in |other| before |pos|.
  void splice(const_iterator pos, basic_list& other, const_iterator it) {
    node_base* n = it.node_;
    node_base* at = position(pos);
    if (at == n || at == n->next) {
      return;
    }
    unlink(n);
    link_before(at, n);
    other.size_--;
    size_++;
  }
  void splice(const_iterator pos, basic_list&& other, const_iterator it) {
    splice(pos, other, it);
  }
  // Move [first, last) of |other| before |pos|. Linear in the length of the
  // range when |other| is another list, to keep size() constant time.
  void splice(const_iterator pos, basic_list& other, const_iterator first,
              const_iterator last) {
    if (first == last) {
      return;
    }
    node_base* at = position(pos);
    if (&other != this) {
      size_type n = size_type(std::distance(first, last));
      other.size_ -= n;
      size_ += n;
    }
    transfer(at, first.node_, last.node_);
  }
  void splice(const_iterator pos, basic_list&& other, const_iterator first,
              const_iterator last) {
    splice(pos, other, first, last);
  }

  // Merge sorted |other| into this sorted list. Stable: of equal elements,
  // this list's come first.
  template <class Compare = std::less<>>
  void merge(basic_list& other, Compare comp = Compare()) {
    if (&other == this || other.empty()) {
      return;
    }
    position(end());
    node_base* a = sentinel_->next;
    node_base* b = other.sentinel_->next;
    while (a != sentinel_ && b != other.sentinel_) {
      if (comp(value_of(b), value_of(a))) {
        node_base* next = b->next;
        unlink(b);
        link_before(a, b);
        b = next;
      } else {
        a = a->next;
      }
    }
    if (b != other.sentinel_) {
      transfer(sentinel_, b, other.sentinel_);
    }
    size_ += other.size_;
    other.size_ = 0;
  }
  template <class Compare = std::less<>>
  void merge(basic_list&& other, Compare comp = Compare()) {
    merge(other, comp);
  }

  // Stable merge sort on the links; no element is copied or moved.
  template <class Compare = std::less<>>
  void sort(Compare comp = Compare()) {
    if (size_ < 2) {
      return;
    }
    // Detach the nodes as a null-terminated chain through |next|.
    node_base* chain = sentinel_->next;
    sentinel_->prev->next = nullptr;
    // bins[i] holds a sorted run of 2^i nodes; higher bins hold earlier
    // elements, so merging a higher bin first keeps the sort stable.
    node_base* bins[64] = {};
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
    // Restore the prev links and close the circle.
    node_base* prev = sentinel_;
    for (node_base* n = sorted; n; n = n->next) {
      n->prev = prev;
      prev->next = n;
      prev = n;
    }
    prev->next = sentinel_;
    sentinel_->prev = prev;
  }

  void reverse() noexcept {
    if (!sentinel_) {
      return;
    }
    node_base* n = sentinel_;
    do {
      node_base* next = n->next;
      n->next = static_cast<node_base*>(n->prev);
      n->prev = next;
      n = next;
    } while (n != sentinel_);
  }

  size_type remove(const T& value) {
    // Unlinked nodes are destroyed only at the end, so |value| may refer to
    // an element of this list.
    return remove_if_impl([&](const T& v) { return v == value; });
  }
  template <class Pred>
  size_type remove_if(Pred pred) {
    return remove_if_impl(pred);
  }

  template <class Pred = std::equal_to<>>
  size_type unique(Pred pred = Pred()) {
    if (size_ < 2) {
      return 0;
    }
    node_base* doomed = nullptr;
    size_type removed = 0;
    node_base* kept = sentinel_->next;
    node_base* n = kept->next;
    while (n != sentinel_) {
      node_base* next = n->next;
      if (pred(value_of(kept), value_of(n))) {
        unlink(n);
        n->next = doomed;
        doomed = n;
        removed++;
      } else {
        kept = n;
      }
      n = next;
    }
    destroy_chain(doomed);
    size_ -= removed;
    return removed;
  }

  friend bool operator==(const basic_list& a, const basic_list& b) {
    return a.size() == b.size() && std::equal(a.begin(), a.end(), b.begin());
  }
  friend auto operator<=>(const basic_list& a, const basic_list& b)
    requires std::three_way_comparable<T>
  {
    return std::lexicographical_compare_three_way(a.begin(), a.end(), b.begin(),
                                                  b.end());
  }

  // Bytes per element, including the links: what the cage hands out.
  static constexpr std::size_t node_size = sizeof(node);

 private:
  static node_base* new_sentinel() {
    void* mem = Cage::allocate(sizeof(node_base), alignof(node_base));
    auto* s = ::new (mem) node_base;
    s->prev = s;
    s->next = s;
    return s;
  }

  // The node a position refers to, allocating the sentinel of a moved-from
  // list first.
  node_base* position(const_iterator pos) {
    if (!sentinel_) {
      sentinel_ = new_sentinel();
      return sentinel_;
    }
    return pos.node_ ? pos.node_ : sentinel_;
  }

  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem)
          node{{nullptr, nullptr}, T(std::forward<Args>(args)...)};
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

  // These copy links as stored where they can, which for compressed links
  // saves a decompress and compress per copy.
  static void link_before(node_base* at, node_base* n) noexcept {
    link_type to_n = n;
    node_base* prev = at->prev;
    n->prev = at->prev;
    n->next = prev->next;  // which points to |at|
    prev->next = to_n;
    at->prev = to_n;
  }

  // Returns the node after |n|.
  static node_base* unlink(node_base* n) noexcept {
    node_base* prev = n->prev;
    node_base* next = n->next;
    prev->next = n->next;
    next->prev = n->prev;
    return next;
  }

  // Move the nodes [first, last) before |at|.
  static void transfer(node_base* at, node_base* first,
                       node_base* last) noexcept {
    if (at == last) {
      return;
    }
    node_base* tail = last->prev;
    node_base* before = first->prev;
    before->next = last;
    last->prev = before;
    node_base* at_prev = at->prev;
    first->prev = at_prev;
    at_prev->next = first;
    tail->next = at;
    at->prev = tail;
  }

  // Merge two null-terminated sorted chains linked through |next|; |a|'s
  // elements come first among equals.
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

  // Insert the values that |produce| passes to its callback before |pos|.
  // If one throws, the values inserted so far are removed again.
  template <class Produce>
  iterator insert_each(const_iterator pos, Produce produce) {
    node_base* at = position(pos);
    node_base* first = at;
    size_type added = 0;
    try {
      produce([&](auto&& v) {
        node* n = new_node(std::forward<decltype(v)>(v));
        link_before(at, n);
        if (added++ == 0) {
          first = n;
        }
      });
    } catch (...) {
      for (node_base* n = first; added; added--) {
        node_base* next = n->next;
        unlink(n);
        delete_node(n);
        n = next;
      }
      throw;
    }
    size_ += added;
    return iterator(first);
  }

  template <class Make>
  void resize_with(size_type n, Make make) {
    while (size_ > n) {
      pop_back();
    }
    while (size_ < n) {
      emplace_back(make());
    }
  }

  template <class Pred>
  size_type remove_if_impl(Pred pred) {
    if (!sentinel_) {
      return 0;
    }
    node_base* doomed = nullptr;
    size_type removed = 0;
    node_base* n = sentinel_->next;
    while (n != sentinel_) {
      node_base* next = n->next;
      if (pred(value_of(n))) {
        unlink(n);
        n->next = doomed;
        doomed = n;
        removed++;
      }
      n = next;
    }
    destroy_chain(doomed);
    size_ -= removed;
    return removed;
  }

  static void destroy_chain(node_base* n) noexcept {
    while (n) {
      node_base* next = n->next;
      delete_node(n);
      n = next;
    }
  }

  node_base* sentinel_;
  std::size_t size_ = 0;
};

}  // namespace detail

// A doubly linked list with 4-byte links, like std::list without the
// allocator parameter. Nodes are allocated in |Cage|.
template <class T, class Cage = default_cage>
using list = detail::basic_list<T, Cage, true>;

}  // namespace cptr
