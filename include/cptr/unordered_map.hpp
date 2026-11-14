// SPDX-License-Identifier: MIT
// A hash map with separate chaining whose links and buckets are 32-bit
// compressed pointers.
#pragma once

#include <algorithm>
#include <bit>
#include <cmath>
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

/// The class behind cptr::unordered_map; use that alias. Its members behave
/// like those of `std::unordered_map`.
///
/// The map behind cptr::unordered_map. Compressed = false gives the same
/// table with raw 8-byte links, which the benchmarks compare against.
///
/// Each node holds its next link and the low 32 bits of its hash, so a
/// node of two 4-byte values is 16 bytes. The bucket array holds one link
/// per bucket and is allocated in the cage too, so the map can live in a
/// mapped_cage. Bucket counts are powers of two, and a bucket is chosen by
/// Fibonacci hashing of the stored hash, so identity hashes of integers
/// spread well.
template <class K, class V, class Hash, class KeyEqual, class Cage,
          bool Compressed>
class basic_unordered_map {
  struct node;
  using link_type = link<node, Cage, Compressed>;
  struct node {
    link_type next;
    std::uint32_t hash;
    std::pair<const K, V> kv;
  };

  template <class Key>
  static constexpr bool kTransparent = requires {
    typename Hash::is_transparent;
    typename KeyEqual::is_transparent;
  };

 public:
  using key_type = K;
  using mapped_type = V;
  using value_type = std::pair<const K, V>;
  using size_type = std::size_t;
  using difference_type = std::ptrdiff_t;
  using hasher = Hash;
  using key_equal = KeyEqual;
  using reference = value_type&;
  using const_reference = const value_type&;

  /// A forward iterator: the node and the map, so that it can move on to
  /// the next bucket.
  template <bool Const>
  class basic_iterator {
   public:
    using iterator_category = std::forward_iterator_tag;
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
      node_ = owner_->next_node(node_);
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
    friend class basic_unordered_map;
    friend class basic_iterator<!Const>;
    basic_iterator(node* n, const basic_unordered_map* owner) noexcept
        : node_(n), owner_(owner) {}
    node* node_ = nullptr;
    const basic_unordered_map* owner_ = nullptr;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;

  basic_unordered_map() noexcept = default;
  explicit basic_unordered_map(size_type buckets, const Hash& hash = Hash(),
                               const KeyEqual& eq = KeyEqual())
      : hash_(hash), eq_(eq) {
    rehash(buckets);
  }
  template <std::input_iterator It>
  basic_unordered_map(It first, It last) {
    insert(first, last);
  }
  basic_unordered_map(std::initializer_list<value_type> values)
      : basic_unordered_map(values.begin(), values.end()) {}
  basic_unordered_map(const basic_unordered_map& other)
      : hash_(other.hash_), eq_(other.eq_), max_load_(other.max_load_) {
    reserve(other.size_);
    for (const auto& kv : other) {
      emplace(kv.first, kv.second);
    }
  }
  basic_unordered_map(basic_unordered_map&& other) noexcept
      : buckets_(std::exchange(other.buckets_, nullptr)),
        log2_buckets_(std::exchange(other.log2_buckets_, 0)),
        size_(std::exchange(other.size_, 0)),
        hash_(other.hash_),
        eq_(other.eq_),
        max_load_(other.max_load_) {}
  basic_unordered_map& operator=(const basic_unordered_map& other) {
    if (this != &other) {
      basic_unordered_map(other).swap(*this);
    }
    return *this;
  }
  basic_unordered_map& operator=(basic_unordered_map&& other) noexcept {
    basic_unordered_map(std::move(other)).swap(*this);
    return *this;
  }
  ~basic_unordered_map() {
    clear();
    if (buckets_) {
      Cage::deallocate(static_cast<link_type*>(buckets_));
    }
  }

  void swap(basic_unordered_map& other) noexcept {
    std::swap(buckets_, other.buckets_);
    std::swap(log2_buckets_, other.log2_buckets_);
    std::swap(size_, other.size_);
    std::swap(hash_, other.hash_);
    std::swap(eq_, other.eq_);
    std::swap(max_load_, other.max_load_);
  }
  friend void swap(basic_unordered_map& a, basic_unordered_map& b) noexcept {
    a.swap(b);
  }

  iterator begin() noexcept { return {first_from(0), this}; }
  iterator end() noexcept { return {nullptr, this}; }
  const_iterator begin() const noexcept { return {first_from(0), this}; }
  const_iterator end() const noexcept { return {nullptr, this}; }
  const_iterator cbegin() const noexcept { return begin(); }
  const_iterator cend() const noexcept { return end(); }

  bool empty() const noexcept { return size_ == 0; }
  size_type size() const noexcept { return size_; }
  size_type max_size() const noexcept {
    return Cage::usable_end / sizeof(node);
  }

  size_type bucket_count() const noexcept {
    return buckets_ ? size_type(1) << log2_buckets_ : 0;
  }
  float load_factor() const noexcept {
    return buckets_ ? float(size_) / float(bucket_count()) : 0.0f;
  }
  float max_load_factor() const noexcept { return max_load_; }
  void max_load_factor(float f) {
    max_load_ = f > 0 ? f : max_load_;
    reserve(size_);
  }
  hasher hash_function() const { return hash_; }
  key_equal key_eq() const { return eq_; }

  /// Make room for `n` elements without exceeding max_load_factor().
  void reserve(size_type n) {
    rehash(size_type(std::ceil(float(n) / max_load_)));
  }

  /// Use at least `n` buckets, and enough for max_load_factor(). The count
  /// is rounded up to a power of two.
  void rehash(size_type n) {
    size_type need =
        std::max<size_type>(n, size_type(std::ceil(float(size_) / max_load_)));
    if (need == 0) {
      return;
    }
    unsigned log2 = unsigned(std::bit_width(need - 1));
    log2 = std::max(log2, 3u);
    if (buckets_ && log2 == log2_buckets_) {
      return;
    }
    size_type count = size_type(1) << log2;
    auto* fresh = static_cast<link_type*>(
        Cage::allocate(count * sizeof(link_type), alignof(link_type)));
    for (size_type i = 0; i < count; i++) {
      ::new (&fresh[i]) link_type(nullptr);
    }
    if (buckets_) {
      link_type* old = buckets_;
      size_type old_count = bucket_count();
      for (size_type i = 0; i < old_count; i++) {
        node* moving = old[i];
        while (moving) {
          node* next = moving->next;
          link_type& head = fresh[index(moving->hash, log2)];
          moving->next = head;
          head = moving;
          moving = next;
        }
      }
      Cage::deallocate(old);
    }
    buckets_ = fresh;
    log2_buckets_ = log2;
  }

  // Lookup. The template overloads take any key type when both Hash and
  // KeyEqual are transparent.
  iterator find(const K& key) { return {find_node(key), this}; }
  const_iterator find(const K& key) const { return {find_node(key), this}; }
  template <class Key>
    requires kTransparent<Key>
  iterator find(const Key& key) {
    return {find_node(key), this};
  }
  template <class Key>
    requires kTransparent<Key>
  const_iterator find(const Key& key) const {
    return {find_node(key), this};
  }
  bool contains(const K& key) const { return find_node(key) != nullptr; }
  template <class Key>
    requires kTransparent<Key>
  bool contains(const Key& key) const {
    return find_node(key) != nullptr;
  }
  size_type count(const K& key) const { return contains(key) ? 1 : 0; }
  template <class Key>
    requires kTransparent<Key>
  size_type count(const Key& key) const {
    return contains(key) ? 1 : 0;
  }
  std::pair<iterator, iterator> equal_range(const K& key) {
    iterator it = find(key);
    return {it, it == end() ? it : std::next(it)};
  }
  std::pair<const_iterator, const_iterator> equal_range(const K& key) const {
    const_iterator it = find(key);
    return {it, it == end() ? it : std::next(it)};
  }

  V& at(const K& key) {
    node* n = find_node(key);
    if (!n) {
      throw std::out_of_range("cptr::unordered_map::at: no such key");
    }
    return n->kv.second;
  }
  const V& at(const K& key) const {
    return const_cast<basic_unordered_map*>(this)->at(key);
  }
  V& operator[](const K& key) { return try_emplace(key).first->second; }
  V& operator[](K&& key) { return try_emplace(std::move(key)).first->second; }

  template <class... Args>
  std::pair<iterator, bool> emplace(Args&&... args) {
    node* n = new_node(std::forward<Args>(args)...);
    std::uint32_t h = hash_of(n->kv.first);
    if (node* existing = find_node(n->kv.first, h)) {
      delete_node(n);
      return {{existing, this}, false};
    }
    n->hash = h;
    link_node(n);
    return {{n, this}, true};
  }
  template <class... Args>
  std::pair<iterator, bool> try_emplace(const K& key, Args&&... args) {
    return try_emplace_impl(key, std::forward<Args>(args)...);
  }
  template <class... Args>
  std::pair<iterator, bool> try_emplace(K&& key, Args&&... args) {
    return try_emplace_impl(std::move(key), std::forward<Args>(args)...);
  }
  template <class M>
  std::pair<iterator, bool> insert_or_assign(const K& key, M&& value) {
    auto result = try_emplace(key, std::forward<M>(value));
    if (!result.second) {
      result.first->second = std::forward<M>(value);
    }
    return result;
  }
  std::pair<iterator, bool> insert(const value_type& kv) {
    return try_emplace(kv.first, kv.second);
  }
  template <class P>
    requires std::is_constructible_v<value_type, P&&>
  std::pair<iterator, bool> insert(P&& kv) {
    return emplace(std::forward<P>(kv));
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

  /// Returns the element after the erased one, in iteration order.
  iterator erase(const_iterator pos) noexcept {
    node* n = pos.node_;
    node* next = next_node(n);
    unlink_node(n);
    delete_node(n);
    return {next, this};
  }
  iterator erase(iterator pos) noexcept { return erase(const_iterator(pos)); }
  iterator erase(const_iterator first, const_iterator last) noexcept {
    while (first != last) {
      first = erase(first);
    }
    return {last.node_, this};
  }
  size_type erase(const K& key) {
    node* n = find_node(key);
    if (!n) {
      return 0;
    }
    unlink_node(n);
    delete_node(n);
    return 1;
  }

  void clear() noexcept {
    size_type count = bucket_count();
    for (size_type i = 0; i < count && size_; i++) {
      node* n = buckets_[i];
      buckets_[i] = nullptr;
      while (n) {
        node* next = n->next;
        delete_node(n);
        size_--;
        n = next;
      }
    }
    size_ = 0;
  }

  /// Equal if both hold the same keys with equal values.
  friend bool operator==(const basic_unordered_map& a,
                         const basic_unordered_map& b) {
    if (a.size() != b.size()) {
      return false;
    }
    for (const auto& [k, v] : a) {
      node* n = b.find_node(k);
      if (!n || !(n->kv.second == v)) {
        return false;
      }
    }
    return true;
  }

  /// Bytes per element, including the link and the hash.
  static constexpr std::size_t node_size = sizeof(node);

 private:
  template <class Key>
  std::uint32_t hash_of(const Key& key) const {
    std::size_t h = hash_(key);
    return std::uint32_t(h ^ (std::uint64_t(h) >> 32));
  }

  static std::size_t index(std::uint32_t h, unsigned log2) noexcept {
    return std::size_t(std::uint32_t(h * 0x9E3779B9u) >> (32 - log2));
  }

  template <class Key>
  node* find_node(const Key& key) const {
    return buckets_ ? find_node(key, hash_of(key)) : nullptr;
  }
  template <class Key>
  node* find_node(const Key& key, std::uint32_t h) const {
    if (!buckets_) {
      return nullptr;
    }
    for (node* n = buckets_[index(h, log2_buckets_)]; n; n = n->next) {
      if (n->hash == h && eq_(n->kv.first, key)) {
        return n;
      }
    }
    return nullptr;
  }

  node* first_from(std::size_t i) const noexcept {
    size_type count = bucket_count();
    for (; i < count; i++) {
      if (node* n = buckets_[i]) {
        return n;
      }
    }
    return nullptr;
  }

  node* next_node(node* n) const noexcept {
    if (node* next = n->next) {
      return next;
    }
    return first_from(index(n->hash, log2_buckets_) + 1);
  }

  void link_node(node* n) {
    if (size_ + 1 > float(bucket_count()) * max_load_) {
      rehash(std::max<size_type>(bucket_count() * 2, 8));
    }
    link_type& head = buckets_[index(n->hash, log2_buckets_)];
    n->next = head;
    head = n;
    size_++;
  }

  void unlink_node(node* n) noexcept {
    link_type* at = &buckets_[index(n->hash, log2_buckets_)];
    while (static_cast<node*>(*at) != n) {
      at = &static_cast<node*>(*at)->next;
    }
    *at = n->next;
    size_--;
  }

  template <class Key, class... Args>
  std::pair<iterator, bool> try_emplace_impl(Key&& key, Args&&... args) {
    std::uint32_t h = hash_of(key);
    if (node* existing = find_node(key, h)) {
      return {{existing, this}, false};
    }
    node* n = new_node(std::piecewise_construct,
                       std::forward_as_tuple(std::forward<Key>(key)),
                       std::forward_as_tuple(std::forward<Args>(args)...));
    n->hash = h;
    try {
      link_node(n);
    } catch (...) {
      delete_node(n);
      throw;
    }
    return {{n, this}, true};
  }

  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem)
          node{nullptr, 0, value_type(std::forward<Args>(args)...)};
    } catch (...) {
      Cage::deallocate(mem);
      throw;
    }
  }

  static void delete_node(node* n) noexcept {
    n->~node();
    Cage::deallocate(n);
  }

  // A compressed link to the bucket array, so the map can live in a
  // mapped_cage.
  link<link_type, Cage, Compressed> buckets_ = nullptr;
  unsigned log2_buckets_ = 0;
  std::size_t size_ = 0;
#if defined(_MSC_VER) && !defined(__clang__)
  [[msvc::no_unique_address]] Hash hash_{};
  [[msvc::no_unique_address]] KeyEqual eq_{};
#else
  [[no_unique_address]] Hash hash_{};
  [[no_unique_address]] KeyEqual eq_{};
#endif
  float max_load_ = 1.0f;
};

}  // namespace detail

/// A hash map with 4-byte links, like `std::unordered_map` without the
/// allocator parameter, node handles and the bucket interface.
///
/// Separate chaining; nodes and buckets are allocated in `Cage`: about 20
/// bytes per element for 4-byte keys and values, against 44 for
/// `std::unordered_map`. Every member behaves like its
/// `std::unordered_map` counterpart; see @ref detail::basic_unordered_map
/// for the full member list. Lookup is heterogeneous when both `Hash` and
/// `KeyEqual` are transparent.
///
/// @code
/// #include "cptr/unordered_map.hpp"
///
/// cptr::unordered_map<std::uint32_t, float> prices;
/// prices.reserve(1000);
/// prices[42] = 9.5f;
/// if (auto it = prices.find(42); it != prices.end()) { /* ... */ }
/// @endcode
template <class K, class V, class Hash = std::hash<K>,
          class KeyEqual = std::equal_to<K>, class Cage = default_cage>
using unordered_map =
    detail::basic_unordered_map<K, V, Hash, KeyEqual, Cage, true>;

}  // namespace cptr
