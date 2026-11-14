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
#include <memory>
#include <new>
#include <stdexcept>
#include <tuple>
#include <type_traits>
#include <utility>

#include "cptr/link.hpp"

namespace cptr {
namespace detail {

/// The class behind cptr::unordered_map; use that alias. Its members behave
/// like those of `std::unordered_map`; the alias lists the differences.
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
    /// Direct-initialises the element, as std's allocator_traits::construct
    /// does.
    template <class... Args>
    explicit node(std::in_place_t, Args&&... args)
        : next(nullptr), hash(0), kv(std::forward<Args>(args)...) {}
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

  /// A forward iterator: the node, and the bucket array and its size, so
  /// that it can move on to the next bucket. It does not refer to the map
  /// object, so like std's iterators it stays valid when the map is moved
  /// or swapped; a rehash invalidates it. With compressed links it is 16
  /// bytes.
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
        : node_(other.node_),
          buckets_(other.buckets_),
          log2_buckets_(other.log2_buckets_) {}

    reference operator*() const noexcept { return node_->kv; }
    pointer operator->() const noexcept { return std::addressof(node_->kv); }
    basic_iterator& operator++() noexcept {
      node_ = next_node(node_, buckets_, log2_buckets_);
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
    basic_iterator(node* n, link_type* buckets, unsigned log2) noexcept
        : node_(n), buckets_(buckets), log2_buckets_(log2) {}
    node* node_ = nullptr;
    link<link_type, Cage, Compressed> buckets_ = nullptr;
    unsigned log2_buckets_ = 0;
  };

  using iterator = basic_iterator<false>;
  using const_iterator = basic_iterator<true>;

  /// An empty map; allocates nothing.
  basic_unordered_map() noexcept = default;
  /// An empty map with at least `buckets` buckets.
  explicit basic_unordered_map(size_type buckets, const Hash& hash = Hash(),
                               const KeyEqual& eq = KeyEqual())
      : hash_(hash), eq_(eq) {
    rehash(buckets);
  }
  // The constructors that insert delegate to another one, so that the
  // destructor frees what was inserted if an element, the hash or an
  // allocation throws.
  /// The elements of [first, last); of equal keys, the first is kept.
  template <std::input_iterator It>
  basic_unordered_map(It first, It last, size_type buckets = 0,
                      const Hash& hash = Hash(),
                      const KeyEqual& eq = KeyEqual())
      : basic_unordered_map(buckets, hash, eq) {
    insert(first, last);
  }
  /// The elements of `values`; of equal keys, the first is kept.
  basic_unordered_map(std::initializer_list<value_type> values,
                      size_type buckets = 0, const Hash& hash = Hash(),
                      const KeyEqual& eq = KeyEqual())
      : basic_unordered_map(values.begin(), values.end(), buckets, hash, eq) {}
  /// Copies the elements, the hash function, the key comparison, the
  /// maximum load factor and the bucket count, so the copy iterates in the
  /// same order. The keys are not hashed again: each node keeps its hash,
  /// and the copy goes bucket by bucket.
  basic_unordered_map(const basic_unordered_map& other)
      : basic_unordered_map(0, other.hash_, other.eq_) {
    max_load_ = other.max_load_;
    if (other.size_ == 0) {
      return;
    }
    rehash(other.bucket_count());
    // Each node is linked as soon as it is made, so if one throws the
    // destructor frees the rest; first_ must already be a lower bound then.
    first_ = other.first_;
    size_type count = bucket_count();
    for (size_type i = other.first_; i < count; i++) {
      link_type* tail = &buckets_[i];
      for (node* n = other.buckets_[i]; n; n = n->next) {
        node* copy = new_node(n->kv);
        copy->hash = n->hash;
        *tail = copy;
        tail = &copy->next;
        size_++;
      }
    }
  }
  basic_unordered_map(basic_unordered_map&& other) noexcept
      : buckets_(std::exchange(other.buckets_, nullptr)),
        log2_buckets_(std::exchange(other.log2_buckets_, 0)),
        size_(std::exchange(other.size_, 0)),
        hash_(other.hash_),
        eq_(other.eq_),
        max_load_(other.max_load_),
        first_(std::exchange(other.first_, 0)) {}
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
    std::swap(first_, other.first_);
  }
  friend void swap(basic_unordered_map& a, basic_unordered_map& b) noexcept {
    a.swap(b);
  }

  /// The first element. Constant time on average: the map keeps a lower
  /// bound on its first non-empty bucket, which insertion lowers and
  /// erase(iterator) raises, so `while (!m.empty()) m.erase(m.begin());` is
  /// linear. begin() itself writes nothing, so concurrent calls are safe.
  iterator begin() noexcept { return make_iterator(first_from(first_)); }
  iterator end() noexcept { return make_iterator(nullptr); }
  const_iterator begin() const noexcept {
    return make_iterator(first_from(first_));
  }
  const_iterator end() const noexcept { return make_iterator(nullptr); }
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
  /// Set the maximum load factor, ignoring values that are not positive, and
  /// rehash if the map is now over it. If that rehash throws, the old
  /// maximum is kept.
  void max_load_factor(float f) {
    if (!(f > 0)) {
      return;
    }
    float old = std::exchange(max_load_, f);
    try {
      reserve(size_);
    } catch (...) {
      max_load_ = old;
      throw;
    }
  }
  hasher hash_function() const { return hash_; }
  key_equal key_eq() const { return eq_; }

  /// The most buckets the map can have: a power of two, limited by the
  /// cage's size and by the 32-bit hashes the nodes keep.
  static constexpr size_type max_bucket_count() noexcept {
    return size_type(1) << kMaxLog2Buckets;
  }

  /// Make room for `n` elements without exceeding max_load_factor(). Throws
  /// std::length_error if that needs more than max_bucket_count() buckets.
  void reserve(size_type n) { rehash(buckets_for(n)); }

  /// Use at least `n` buckets, and enough for max_load_factor(). The count
  /// is rounded up to a power of two. Throws std::length_error if that is
  /// more than max_bucket_count(); iterators are invalidated unless the
  /// count stays the same.
  void rehash(size_type n) {
    size_type need = std::max(n, buckets_for(size_));
    if (need == 0) {
      return;
    }
    if (need > max_bucket_count()) {
      throw std::length_error("cptr::unordered_map: too many buckets");
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
    size_type first = count;
    if (buckets_) {
      link_type* old = buckets_;
      size_type old_count = bucket_count();
      for (size_type i = first_; i < old_count; i++) {
        node* moving = old[i];
        while (moving) {
          node* next = moving->next;
          size_type at = index(moving->hash, log2);
          first = std::min(first, at);
          link_type& head = fresh[at];
          moving->next = head;
          head = moving;
          moving = next;
        }
      }
      Cage::deallocate(old);
    }
    buckets_ = fresh;
    log2_buckets_ = log2;
    first_ = std::uint32_t(first);
  }

  // Lookup. The template overloads take any key type when both Hash and
  // KeyEqual are transparent.
  iterator find(const K& key) { return make_iterator(find_node(key)); }
  const_iterator find(const K& key) const {
    return make_iterator(find_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  iterator find(const Key& key) {
    return make_iterator(find_node(key));
  }
  template <class Key>
    requires kTransparent<Key>
  const_iterator find(const Key& key) const {
    return make_iterator(find_node(key));
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
  /// Heterogeneous equal_range(), as in C++20.
  template <class Key>
    requires kTransparent<Key>
  std::pair<iterator, iterator> equal_range(const Key& key) {
    iterator it = find(key);
    return {it, it == end() ? it : std::next(it)};
  }
  /// Heterogeneous equal_range(), as in C++20.
  template <class Key>
    requires kTransparent<Key>
  std::pair<const_iterator, const_iterator> equal_range(const Key& key) const {
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

  /// Build the element from `args`, then insert it unless its key is
  /// present; returns the element with that key and whether it was
  /// inserted. As for std::unordered_map, the element is built first, even
  /// when the key turns out to be present (try_emplace avoids that). If the
  /// hash, the key comparison or a rehash throws, the element is destroyed
  /// and the map is unchanged.
  template <class... Args>
    requires std::constructible_from<value_type, Args...>
  std::pair<iterator, bool> emplace(Args&&... args) {
    node* n = new_node(std::forward<Args>(args)...);
    try {
      std::uint32_t h = hash_of(n->kv.first);
      if (node* existing = find_node(n->kv.first, h)) {
        delete_node(n);
        return {make_iterator(existing), false};
      }
      n->hash = h;
      link_node(n);
    } catch (...) {
      delete_node(n);
      throw;
    }
    return {make_iterator(n), true};
  }
  /// As emplace(). The hint is accepted for compatibility with
  /// std::unordered_map and generic code, but not used.
  template <class... Args>
    requires std::constructible_from<value_type, Args...>
  iterator emplace_hint(const_iterator, Args&&... args) {
    return emplace(std::forward<Args>(args)...).first;
  }
  /// If `key` is absent, insert it with a value built from `args`;
  /// otherwise do nothing, and leave `args` untouched. Returns the element
  /// with that key and whether it was inserted. Strong guarantee.
  template <class... Args>
  std::pair<iterator, bool> try_emplace(const K& key, Args&&... args) {
    return try_emplace_impl(key, std::forward<Args>(args)...);
  }
  /// As above, moving `key` into the map only if it is inserted, so
  /// move-only keys work.
  template <class... Args>
  std::pair<iterator, bool> try_emplace(K&& key, Args&&... args) {
    return try_emplace_impl(std::move(key), std::forward<Args>(args)...);
  }
  /// try_emplace() with a hint, which is not used.
  template <class... Args>
  iterator try_emplace(const_iterator, const K& key, Args&&... args) {
    return try_emplace(key, std::forward<Args>(args)...).first;
  }
  /// try_emplace() with a hint, which is not used, moving `key`.
  template <class... Args>
  iterator try_emplace(const_iterator, K&& key, Args&&... args) {
    return try_emplace(std::move(key), std::forward<Args>(args)...).first;
  }
  /// Insert `key` with `value`, or assign `value` to the element that has
  /// `key`. Returns the element and whether it was inserted.
  template <class M>
  std::pair<iterator, bool> insert_or_assign(const K& key, M&& value) {
    auto result = try_emplace(key, std::forward<M>(value));
    if (!result.second) {
      result.first->second = std::forward<M>(value);
    }
    return result;
  }
  /// As above, moving `key` into the map only if it is inserted.
  template <class M>
  std::pair<iterator, bool> insert_or_assign(K&& key, M&& value) {
    auto result = try_emplace(std::move(key), std::forward<M>(value));
    if (!result.second) {
      result.first->second = std::forward<M>(value);
    }
    return result;
  }
  /// insert_or_assign() with a hint, which is not used.
  template <class M>
  iterator insert_or_assign(const_iterator, const K& key, M&& value) {
    return insert_or_assign(key, std::forward<M>(value)).first;
  }
  /// insert_or_assign() with a hint, which is not used, moving `key`.
  template <class M>
  iterator insert_or_assign(const_iterator, K&& key, M&& value) {
    return insert_or_assign(std::move(key), std::forward<M>(value)).first;
  }
  /// Insert a copy of `kv` unless its key is present. Strong guarantee.
  std::pair<iterator, bool> insert(const value_type& kv) {
    return try_emplace(kv.first, kv.second);
  }
  /// Insert an element built from `kv` (such as a moved pair) unless its
  /// key is present.
  template <class P>
    requires std::is_constructible_v<value_type, P&&>
  std::pair<iterator, bool> insert(P&& kv) {
    return emplace(std::forward<P>(kv));
  }
  /// insert() with a hint, which is not used; returns the element with
  /// the key. With these, std::inserter(m, m.end()) works.
  iterator insert(const_iterator, const value_type& kv) {
    return insert(kv).first;
  }
  /// insert() with a hint, which is not used; returns the element with
  /// the key.
  template <class P>
    requires std::is_constructible_v<value_type, P&&>
  iterator insert(const_iterator, P&& kv) {
    return emplace(std::forward<P>(kv)).first;
  }
  /// Insert each element of [first, last) whose key is not present yet.
  /// If one throws, the elements inserted before it stay.
  template <std::input_iterator It>
  void insert(It first, It last) {
    for (; first != last; ++first) {
      emplace(*first);
    }
  }
  void insert(std::initializer_list<value_type> values) {
    insert(values.begin(), values.end());
  }

  /// Erase the element at `pos`; returns the element after it, in
  /// iteration order. Finding that element may step over empty buckets.
  iterator erase(const_iterator pos) noexcept {
    node* n = pos.node_;
    node* next = next_node(n, buckets_, log2_buckets_);
    std::size_t at = index(n->hash, log2_buckets_);
    unlink_node(n);
    delete_node(n);
    if (at == first_ && !buckets_[at]) {
      // The first bucket is now empty, and |next| is the new first element.
      first_ = std::uint32_t(next ? index(next->hash, log2_buckets_)
                                  : bucket_count());
    }
    return make_iterator(next);
  }
  iterator erase(iterator pos) noexcept { return erase(const_iterator(pos)); }
  iterator erase(const_iterator first, const_iterator last) noexcept {
    while (first != last) {
      first = erase(first);
    }
    return make_iterator(last.node_);
  }
  /// Erase the element with `key`, if any; returns how many were erased.
  /// One walk of the bucket finds the element and the link to it, and
  /// nothing looks for the next element.
  /// Erases the element with the given key, if there is one; returns how
  /// many were erased (0 or 1).
  size_type erase(const K& key) { return erase_key(key); }
#if defined(CPTR_HETEROGENEOUS_ERASE)
  /// C++23's heterogeneous erase: erases the element whose key compares
  /// equal to `key` without building a `K`. Only with transparent `Hash`
  /// and `KeyEqual`, and only when `Key` does not convert to an iterator.
  /// Opt in by defining `CPTR_HETEROGENEOUS_ERASE` before including this
  /// header (on every include, so that every translation unit sees the same
  /// class).
  template <class Key>
    requires(kTransparent<Key> && !std::is_convertible_v<Key &&, iterator> &&
             !std::is_convertible_v<Key &&, const_iterator>)
  size_type erase(Key&& key) {
    return erase_key(key);
  }
#endif

 private:
  template <class Key>
  size_type erase_key(const Key& key) {
    if (!buckets_) {
      return 0;
    }
    std::uint32_t h = hash_of(key);
    link_type* at = &buckets_[index(h, log2_buckets_)];
    while (node* n = *at) {
      if (n->hash == h && eq_(n->kv.first, key)) {
        *at = n->next;
        delete_node(n);
        size_--;
        return 1;
      }
      at = &n->next;
    }
    return 0;
  }

 public:
  void clear() noexcept {
    size_type count = bucket_count();
    for (size_type i = first_; i < count && size_; i++) {
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
    first_ = std::uint32_t(count);
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

  /// The largest log2 of a bucket count: the array must fit in the cage
  /// (and its byte size in a size_t), and a bucket index in 31 bits.
  static constexpr unsigned kMaxLog2Buckets = std::min<unsigned>(
      31, unsigned(std::bit_width(Cage::usable_end / sizeof(link_type))) - 1);

  /// The bucket count needed for `n` elements at max_load_factor(), in
  /// double precision so that neither the division nor the conversion back
  /// overflows or rounds a large count down. Saturates above
  /// max_bucket_count(), which rehash() rejects.
  size_type buckets_for(size_type n) const noexcept {
    double need = std::ceil(double(n) / double(max_load_));
    return need > double(max_bucket_count()) ? max_bucket_count() + 1
                                             : size_type(need);
  }

  iterator make_iterator(node* n) noexcept {
    return {n, buckets_, log2_buckets_};
  }
  const_iterator make_iterator(node* n) const noexcept {
    return {n, buckets_, log2_buckets_};
  }

  node* first_from(std::size_t i) const noexcept {
    return first_from(i, buckets_, log2_buckets_);
  }
  static node* first_from(std::size_t i, link_type* buckets,
                          unsigned log2) noexcept {
    if (!buckets) {
      return nullptr;
    }
    size_type count = size_type(1) << log2;
    for (; i < count; i++) {
      if (node* n = buckets[i]) {
        return n;
      }
    }
    return nullptr;
  }

  static node* next_node(node* n, link_type* buckets, unsigned log2) noexcept {
    if (node* next = n->next) {
      return next;
    }
    return first_from(index(n->hash, log2) + 1, buckets, log2);
  }

  void link_node(node* n) {
    if (double(size_ + 1) > double(bucket_count()) * double(max_load_)) {
      rehash(std::max<size_type>(bucket_count() * 2, 8));
    }
    std::size_t at = index(n->hash, log2_buckets_);
    link_type& head = buckets_[at];
    n->next = head;
    head = n;
    size_++;
    first_ = std::min(first_, std::uint32_t(at));
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
      return {make_iterator(existing), false};
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
    return {make_iterator(n), true};
  }

  template <class... Args>
  static node* new_node(Args&&... args) {
    void* mem = Cage::allocate(sizeof(node), alignof(node));
    try {
      return ::new (mem) node(std::in_place, std::forward<Args>(args)...);
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
  /// No bucket below this one holds an element; see begin().
  std::uint32_t first_ = 0;
};

}  // namespace detail

/// A hash map with 4-byte links, like `std::unordered_map` without the
/// allocator parameter, node handles and the bucket interface.
///
/// Separate chaining; nodes and buckets are allocated in `Cage`: about 20
/// bytes per element for 4-byte keys and values, against 44 for
/// `std::unordered_map`. The members behave like those of
/// `std::unordered_map`, with these differences: there is no allocator
/// parameter, no node handles (extract, merge, insert of a node), no bucket
/// interface (bucket(), bucket_size(), local iterators) and no
/// get_allocator(); bucket counts are powers of two, at most
/// max_bucket_count(); hints are accepted but not used; and the iteration
/// order is that of the buckets. See @ref detail::basic_unordered_map for
/// the full member list. Lookup is heterogeneous when both `Hash` and
/// `KeyEqual` are transparent; so is erase, C++23 style, when
/// `CPTR_HETEROGENEOUS_ERASE` is defined.
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
