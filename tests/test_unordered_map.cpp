// cptr::unordered_map against std::unordered_map: the interface, node size,
// and a long random sequence of operations compared step by step.
#include <algorithm>
#include <bit>
#include <cstdint>
#include <iterator>
#include <map>
#include <memory>
#include <random>
#include <stdexcept>
#include <string>
#include <unordered_map>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

namespace {

using int_map = cptr::unordered_map<int, int>;

static_assert(std::is_nothrow_move_constructible_v<int_map>);
static_assert(std::forward_iterator<int_map::iterator>);
// The node, the compressed bucket array and its log2 size.
static_assert(sizeof(int_map::iterator) == 16);
static_assert(std::forward_iterator<int_map::const_iterator>);
// next link and 32-bit hash in 8 bytes, then the pair.
static_assert(int_map::node_size == 16);
static_assert(requires(int_map& m, const int_map& c,
                       int_map::const_iterator cit,
                       std::vector<std::pair<int, int>>& v) {
  int_map{{1, 2}, {3, 4}};
  int_map(v.begin(), v.end());
  m.insert(v.begin(), v.end());
  m.insert({{5, 6}});
  m.insert(std::pair<const int, int>(1, 2));
  m.emplace(1, 2);
  m.try_emplace(1, 2);
  m.insert_or_assign(1, 2);
  { m.at(1) } -> std::same_as<int&>;
  { c.at(1) } -> std::same_as<const int&>;
  { m[1] } -> std::same_as<int&>;
  { c.find(1) } -> std::same_as<int_map::const_iterator>;
  { c.count(1) } -> std::same_as<std::size_t>;
  { c.contains(1) } -> std::same_as<bool>;
  c.equal_range(1);
  m.erase(cit);
  m.erase(cit, cit);
  { m.erase(1) } -> std::same_as<std::size_t>;
  m.reserve(100);
  m.rehash(100);
  { c.bucket_count() } -> std::same_as<std::size_t>;
  { c.load_factor() } -> std::same_as<float>;
  { c.max_load_factor() } -> std::same_as<float>;
  m.max_load_factor(2.0f);
  c.hash_function();
  c.key_eq();
  { c == c } -> std::same_as<bool>;
  swap(m, m);
});

struct string_hash {
  using is_transparent = void;
  std::size_t operator()(std::string_view s) const noexcept {
    return std::hash<std::string_view>()(s);
  }
};
using string_map =
    cptr::unordered_map<std::string, int, string_hash, std::equal_to<>>;
static_assert(requires(const string_map& m, std::string_view key) {
  m.equal_range(key);
  m.find(key);
  m.contains(key);
  m.count(key);
});

#if defined(CPTR_HETEROGENEOUS_ERASE)
TEST(unordered_map_heterogeneous_erase) {
  string_map m{{"a", 1}, {"bb", 2}};
  std::string_view key = "bb";
  CHECK(m.erase(key) == 1);
  CHECK(m.erase(key) == 0);
  CHECK(m.erase("a") == 1);
  CHECK(m.empty());
  m.emplace("c", 3);
  m.erase(m.begin());
  CHECK(m.empty());
}
template <class M, class Key>
concept umap_can_erase = requires(M& m, Key k) { m.erase(k); };
static_assert(
    !umap_can_erase<cptr::unordered_map<std::string, int>, std::string_view>);
static_assert(umap_can_erase<string_map, std::string_view>);
#endif

template <class A, class B>
void check_same(const A& mine, const B& ref) {
  CHECK(mine.size() == ref.size());
  std::size_t walked = 0;
  for (const auto& [k, v] : mine) {
    auto it = ref.find(k);
    CHECK(it != ref.end() && it->second == v);
    walked++;
  }
  CHECK(walked == ref.size());
  CHECK(mine.load_factor() <= mine.max_load_factor());
}

}  // namespace

TEST(unordered_map_every_operation_matches_std) {
  cptr::unordered_map<int, int> m;
  std::unordered_map<int, int> r;
  std::mt19937 rng(5);
  for (int step = 0; step < 60000; step++) {
    int key = int(rng() % 600);
    int value = int(rng());
    switch (rng() % 12) {
      case 0:
        CHECK(m.emplace(key, value).second == r.emplace(key, value).second);
        break;
      case 1:
        CHECK(m.try_emplace(key, value).second ==
              r.try_emplace(key, value).second);
        break;
      case 2:
        CHECK(m.insert_or_assign(key, value).second ==
              r.insert_or_assign(key, value).second);
        break;
      case 3:
        m[key] = value;
        r[key] = value;
        break;
      case 4:
      case 5:
        CHECK(m.erase(key) == r.erase(key));
        break;
      case 6: {
        auto it = m.find(key);
        CHECK((it == m.end()) == !r.contains(key));
        if (it != m.end()) {
          CHECK(it->second == r.at(key));
          auto next = m.erase(it);
          r.erase(key);
          // erase returns the element after the erased one.
          CHECK(next == m.end() || r.contains(next->first));
        }
        break;
      }
      case 7: {
        bool threw = false;
        try {
          CHECK(m.at(key) == r.at(key));
        } catch (const std::out_of_range&) {
          threw = true;
        }
        CHECK(threw == !r.contains(key));
        break;
      }
      case 8: {
        // Erase a run of elements in iteration order.
        auto first = m.begin();
        auto last = first;
        for (int k = int(rng() % 5); k && last != m.end(); k--) {
          r.erase(last->first);
          ++last;
        }
        CHECK(m.erase(first, last) == last);
        break;
      }
      case 9:
        m.rehash(rng() % 2000);
        break;
      case 10: {
        cptr::unordered_map<int, int> copy = m;
        CHECK(copy == m);
        copy[100000] = 1;
        CHECK(copy != m);
        break;
      }
      case 11:
        if (r.size() > 500) {
          m.clear();
          r.clear();
        }
        break;
    }
    check_same(m, r);
  }
}

TEST(unordered_map_strings_and_transparent_lookup) {
  string_map m{{"one", 1}, {std::string(100, 'x'), 2}};
  CHECK(m.find(std::string_view("one"))->second == 1);
  CHECK(m.contains(std::string_view(std::string(100, 'x'))));
  CHECK(m.count(std::string_view("two")) == 0);
  string_map moved = std::move(m);
  CHECK(moved.size() == 2 && m.empty());
  m["again"] = 3;
  CHECK(m.size() == 1);
}

TEST(unordered_map_grows_and_reserves) {
  cptr::unordered_map<std::uint32_t, std::uint32_t> m;
  m.reserve(1000);
  std::size_t buckets = m.bucket_count();
  CHECK(buckets >= 1000);
  for (std::uint32_t i = 0; i < 1000; i++) {
    m.emplace(i * 4096, i);  // keys that share their low bits
  }
  CHECK(m.bucket_count() == buckets);
  for (std::uint32_t i = 0; i < 100000; i++) {
    m.emplace(i, i);
  }
  CHECK(m.size() == 100000 + 1000 - 25);  // 25 keys i * 4096 < 100000
  for (std::uint32_t i = 0; i < 100000; i++) {
    CHECK(m.at(i) == (i % 4096 == 0 ? i / 4096 : i));
  }
}

TEST(unordered_map_iterators_survive_move_and_swap) {
  // Before the fix an iterator held a pointer to the map object, so after a
  // move it read the moved-from (or freed) map, and after a swap the other
  // map's buckets, and stopped early or walked freed memory.
  auto p = std::make_unique<int_map>();
  for (int i = 0; i < 100; i++) {
    (*p)[i] = i;
  }
  int_map::iterator it = p->begin();
  int_map moved = std::move(*p);
  p.reset();
  std::size_t walked = 0;
  for (; it != moved.end(); ++it) {
    walked++;
  }
  CHECK(walked == 100);

  int_map a, b;
  for (int i = 0; i < 100; i++) {
    a[i] = i;
  }
  b[1000] = 1;
  int_map::const_iterator from_a = a.cbegin();
  a.swap(b);
  walked = 0;
  for (; from_a != b.cend(); ++from_a) {
    walked++;
  }
  CHECK(walked == 100);

  int_map c;
  c[5] = 5;
  auto in_c = c.begin();
  c = std::move(b);
  CHECK(in_c != c.end());
  b = int_map{{7, 7}};
  auto in_b = b.find(7);
  std::swap(b, c);
  CHECK(in_b != b.end() && in_b->first == 7 && std::next(in_b) == c.end());
}

TEST(unordered_map_too_many_buckets_throws_length_error) {
  // Before the fix rehash computed count * sizeof(link) in size_t, which
  // wrapped and allocated a tiny array, and reserve(SIZE_MAX) converted an
  // out-of-range float to an integer (undefined behaviour).
  int_map m{{1, 1}, {2, 2}};
  std::size_t buckets = m.bucket_count();
  auto expect_length_error = [&](auto&& f) {
    bool threw = false;
    try {
      f();
    } catch (const std::length_error&) {
      threw = true;
    }
    CHECK(threw);
    CHECK(m.bucket_count() == buckets && m.size() == 2 && m.at(2) == 2);
  };
  expect_length_error([&] { m.rehash(std::size_t(1) << 62); });
  expect_length_error([&] { m.rehash(int_map::max_bucket_count() + 1); });
  expect_length_error([&] { m.reserve(SIZE_MAX); });
  expect_length_error([&] { m.max_load_factor(1e-30f); });
  CHECK(m.max_load_factor() == 1.0f);
  CHECK(std::has_single_bit(int_map::max_bucket_count()));
  CHECK(int_map::max_bucket_count() * 4 <= cptr::default_cage::usable_end);
}

namespace {

struct umap_leak_tag {};
using leak_cage = cptr::cage<umap_leak_tag, 24>;

inline int g_countdown = -1;
// Throws when the global countdown reaches zero; -1 never throws.
inline void tick() {
  if (g_countdown >= 0 && g_countdown-- == 0) {
    throw std::runtime_error("countdown");
  }
}

struct throwing_hash {
  std::size_t operator()(int k) const {
    tick();
    return std::size_t(k);
  }
};

struct throwing_value {
  int v;
  throwing_value(int x) : v(x) {}
  throwing_value(const throwing_value& o) : v(o.v) { tick(); }
  throwing_value& operator=(const throwing_value&) = default;
  bool operator==(const throwing_value&) const = default;
};

}  // namespace

TEST(unordered_map_emplace_and_constructors_do_not_leak_on_throw) {
  // Before the fix emplace leaked the node when the hash threw, and the
  // copy and range constructors, which did not delegate, leaked every
  // element made before one threw.
  std::size_t before = leak_cage::allocated_bytes();
  using hash_map = cptr::unordered_map<int, int, throwing_hash,
                                       std::equal_to<int>, leak_cage>;
  for (int at = 0; at < 20; at++) {
    hash_map m;
    for (int i = 0; i < 8; i++) {
      m.emplace(i, i);
    }
    g_countdown = at;
    try {
      for (int i = 0; i < 16; i++) {
        m.emplace(i, i);
      }
    } catch (const std::runtime_error&) {
    }
    g_countdown = -1;
    for (const auto& [k, v] : m) {
      CHECK(k == v && m.find(k)->second == v);
    }
  }
  CHECK(leak_cage::allocated_bytes() == before);

  using value_map = cptr::unordered_map<int, throwing_value, std::hash<int>,
                                        std::equal_to<int>, leak_cage>;
  std::vector<std::pair<int, throwing_value>> pairs;
  for (int i = 0; i < 10; i++) {
    pairs.emplace_back(i, i);
  }
  value_map source;
  for (int i = 0; i < 10; i++) {
    source.emplace(i, i);
  }
  std::size_t with_source = leak_cage::allocated_bytes();
  for (int at = 0; at < 12; at++) {
    g_countdown = at;
    try {
      value_map copy = source;
      CHECK(copy == source);
    } catch (const std::runtime_error&) {
    }
    g_countdown = at;
    try {
      value_map range(pairs.begin(), pairs.end());
      CHECK(range == source);
    } catch (const std::runtime_error&) {
    }
    g_countdown = -1;
    CHECK(leak_cage::allocated_bytes() == with_source);
  }
}

namespace {

struct move_only_key {
  int v;
  explicit move_only_key(int x) : v(x) {}
  move_only_key(move_only_key&&) = default;
  move_only_key(const move_only_key&) = delete;
  bool operator==(const move_only_key& o) const { return v == o.v; }
};
struct move_only_hash {
  std::size_t operator()(const move_only_key& k) const noexcept {
    return std::size_t(k.v);
  }
};

static_assert(requires(int_map& m, int_map::const_iterator cit,
                       const std::pair<const int, int>& kv) {
  { m.insert(cit, kv) } -> std::same_as<int_map::iterator>;
  {
    m.insert(cit, std::pair<int, int>(1, 2))
  } -> std::same_as<int_map::iterator>;
  { m.emplace_hint(cit, 1, 2) } -> std::same_as<int_map::iterator>;
  { m.try_emplace(cit, 1, 2) } -> std::same_as<int_map::iterator>;
  { m.insert_or_assign(cit, 1, 2) } -> std::same_as<int_map::iterator>;
});

}  // namespace

TEST(unordered_map_hinted_insertion_and_move_only_keys) {
  // Before the fix there was no hinted insert, so std::inserter did not
  // compile, and insert_or_assign copied its key.
  std::vector<std::pair<int, int>> v{{1, 2}, {3, 4}, {1, 5}};
  int_map m;
  std::copy(v.begin(), v.end(), std::inserter(m, m.end()));
  CHECK(m.size() == 2 && m.at(1) == 2 && m.at(3) == 4);
  CHECK(m.emplace_hint(m.begin(), 5, 6)->second == 6);
  CHECK(m.try_emplace(m.end(), 5, 7)->second == 6);
  CHECK(m.insert_or_assign(m.end(), 5, 8)->second == 8);

  cptr::unordered_map<move_only_key, int, move_only_hash> k;
  CHECK(k.insert_or_assign(move_only_key(1), 1).second);
  CHECK(!k.insert_or_assign(move_only_key(1), 2).second);
  CHECK(k.try_emplace(k.end(), move_only_key(2), 3)->second == 3);
  CHECK(k.insert_or_assign(k.end(), move_only_key(3), 4)->second == 4);
  CHECK(k.size() == 3 && k.find(move_only_key(1))->second == 2);
}

TEST(unordered_map_erase_begin_until_empty_matches_std) {
  // begin() starts from a lower bound on the first non-empty bucket, which
  // erase(begin()) keeps tight; before, every begin() scanned from bucket
  // 0, so this loop was quadratic (5.3 s for 160k elements).
  int_map m;
  std::unordered_map<int, int> r;
  std::mt19937 rng(11);
  for (int i = 0; i < 20000; i++) {
    m[i * 7919] = i;
    r[i * 7919] = i;
  }
  m.reserve(100000);
  int round = 0;
  while (!m.empty()) {
    auto it = m.begin();
    CHECK(r.erase(it->first) == 1);
    m.erase(it);
    if (++round % 997 == 0) {
      // Inserting into a low bucket must lower the bound again.
      int key = int(rng() % 1000);
      m[key] = key;
      r[key] = key;
    }
  }
  CHECK(r.empty());
  m[1] = 1;
  CHECK(m.begin()->first == 1);
  m.clear();
  CHECK(m.begin() == m.end());
  m[2] = 2;
  int_map moved = std::move(m);
  CHECK(moved.begin()->first == 2 && m.begin() == m.end());
}

TEST(unordered_map_copy_keeps_buckets_and_order) {
  // The copy reuses the stored hashes bucket by bucket instead of
  // inserting every element again.
  int_map m;
  m.reserve(5000);
  for (int i = 0; i < 1000; i++) {
    m[i * 31] = i;
  }
  for (int i = 0; i < 500; i++) {
    m.erase(m.begin());
  }
  int_map copy = m;
  CHECK(copy == m && copy.bucket_count() == m.bucket_count());
  CHECK(std::equal(copy.begin(), copy.end(), m.begin(), m.end()));
  copy[-1] = -1;
  CHECK(copy.size() == 501 && copy.at(-1) == -1);
  int_map empty_copy = int_map();
  CHECK(empty_copy.empty() && empty_copy.begin() == empty_copy.end());
}
