// cptr::unordered_map against std::unordered_map: the interface, node size,
// and a long random sequence of operations compared step by step.
#include <map>
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
  m.find(key);
  m.contains(key);
  m.count(key);
});

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
