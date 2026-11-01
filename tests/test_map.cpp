// cptr::ordered_map against std::map: the interface, iterator size, the
// red-black invariants, and a long random sequence of operations compared
// step by step.
#include <compare>
#include <map>
#include <random>
#include <stdexcept>
#include <string>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

namespace {

using int_map = cptr::ordered_map<int, int>;

// The interface std::map offers, apart from the allocator and node handles.
static_assert(std::is_nothrow_move_constructible_v<int_map>);
static_assert(sizeof(int_map::iterator) == sizeof(void*));
static_assert(std::bidirectional_iterator<int_map::iterator>);
static_assert(std::bidirectional_iterator<int_map::const_iterator>);
static_assert(requires(int_map& m, const int_map& c, int_map::iterator it,
                       int_map::const_iterator cit,
                       std::vector<std::pair<int, int>>& v) {
  int_map{{1, 2}, {3, 4}};
  int_map(v.begin(), v.end());
  m.insert(v.begin(), v.end());
  m.insert({{5, 6}});
  m.insert(cit, std::pair<const int, int>(1, 2));
  m.emplace(1, 2);
  m.emplace_hint(cit, 1, 2);
  m.try_emplace(1, 2);
  m.try_emplace(cit, 1, 2);
  m.insert_or_assign(1, 2);
  m.insert_or_assign(cit, 1, 2);
  { m.at(1) } -> std::same_as<int&>;
  { c.at(1) } -> std::same_as<const int&>;
  { m[1] } -> std::same_as<int&>;
  { c.find(1) } -> std::same_as<int_map::const_iterator>;
  { c.count(1) } -> std::same_as<std::size_t>;
  { c.contains(1) } -> std::same_as<bool>;
  c.lower_bound(1);
  c.upper_bound(1);
  {
    c.equal_range(1)
  }
  -> std::same_as<std::pair<int_map::const_iterator, int_map::const_iterator>>;
  m.erase(cit);
  m.erase(it);
  m.erase(cit, cit);
  { m.erase(1) } -> std::same_as<std::size_t>;
  c.rbegin();
  c.crend();
  c.max_size();
  c.key_comp();
  { c == c } -> std::same_as<bool>;
  { c <=> c } -> std::same_as<std::strong_ordering>;
  swap(m, m);
});

// Heterogeneous lookup with a transparent comparator.
using string_map = cptr::ordered_map<std::string, int, std::less<>>;
static_assert(requires(const string_map& m, const char* key) {
  m.find(key);
  m.contains(key);
  m.count(key);
  m.lower_bound(key);
  m.upper_bound(key);
  m.equal_range(key);
});

template <class A, class B>
void check_same(const A& mine, const B& ref) {
  CHECK(mine.valid());
  CHECK(mine.size() == ref.size());
  CHECK(std::equal(mine.begin(), mine.end(), ref.begin(), ref.end()));
  CHECK(std::equal(mine.rbegin(), mine.rend(), ref.rbegin(), ref.rend()));
}

template <class M, class R>
void check_iter(const M& mine, typename M::const_iterator a, const R& ref,
                typename R::const_iterator b) {
  CHECK(std::distance(mine.begin(), a) == std::distance(ref.begin(), b));
}

}  // namespace

TEST(map_every_operation_matches_std_map) {
  cptr::ordered_map<int, int> m;
  std::map<int, int> r;
  std::mt19937 rng(11);
  for (int step = 0; step < 60000; step++) {
    int key = int(rng() % 400);
    int value = int(rng());
    switch (rng() % 16) {
      case 0: {
        auto [a, ok] = m.emplace(key, value);
        auto [b, ok2] = r.emplace(key, value);
        CHECK(ok == ok2);
        check_iter(m, a, r, b);
        break;
      }
      case 1: {
        auto [a, ok] = m.try_emplace(key, value);
        auto [b, ok2] = r.try_emplace(key, value);
        CHECK(ok == ok2);
        check_iter(m, a, r, b);
        break;
      }
      case 2: {
        auto [a, ok] = m.insert_or_assign(key, value);
        auto [b, ok2] = r.insert_or_assign(key, value);
        CHECK(ok == ok2);
        check_iter(m, a, r, b);
        break;
      }
      case 3:
        m[key] = value;
        r[key] = value;
        break;
      case 4:
        CHECK(m.erase(key) == r.erase(key));
        break;
      case 5:
      case 6:
        if (!r.empty()) {
          auto a = m.lower_bound(key);
          auto b = r.lower_bound(key);
          if (b != r.end()) {
            auto na = m.erase(a);
            auto nb = r.erase(b);
            check_iter(m, na, r, nb);
          }
        }
        break;
      case 7: {
        auto a = m.lower_bound(key);
        auto b = r.lower_bound(key);
        auto ea = m.upper_bound(key + 10);
        auto eb = r.upper_bound(key + 10);
        auto na = m.erase(a, ea);
        auto nb = r.erase(b, eb);
        check_iter(m, na, r, nb);
        break;
      }
      case 8: {
        auto a = m.find(key);
        auto b = r.find(key);
        CHECK((a == m.end()) == (b == r.end()));
        CHECK(m.contains(key) == r.contains(key));
        CHECK(m.count(key) == r.count(key));
        break;
      }
      case 9: {
        check_iter(m, m.lower_bound(key), r, r.lower_bound(key));
        check_iter(m, m.upper_bound(key), r, r.upper_bound(key));
        auto [a, b] = m.equal_range(key);
        auto [c, d] = r.equal_range(key);
        check_iter(m, a, r, c);
        check_iter(m, b, r, d);
        break;
      }
      case 10: {
        // A hint that is right, wrong or end().
        auto hint = rng() % 2 ? m.lower_bound(key) : m.begin();
        auto a = m.emplace_hint(hint, key, value);
        auto b = r.emplace_hint(r.lower_bound(key), key, value);
        check_iter(m, a, r, b);
        break;
      }
      case 11: {
        bool threw = false;
        try {
          CHECK(m.at(key) == r.at(key));
        } catch (const std::out_of_range&) {
          threw = true;
        }
        CHECK(threw == !r.contains(key));
        break;
      }
      case 12: {
        std::vector<std::pair<int, int>> v;
        for (int i = int(rng() % 6); i; i--) {
          v.emplace_back(int(rng() % 400), int(rng()));
        }
        m.insert(v.begin(), v.end());
        r.insert(v.begin(), v.end());
        break;
      }
      case 13: {
        cptr::ordered_map<int, int> copy = m;
        CHECK(copy == m);
        CHECK((copy <=> m) == std::strong_ordering::equal);
        CHECK(copy.valid());
        break;
      }
      case 14:
        if (r.size() > 300) {
          m.clear();
          r.clear();
        }
        break;
      case 15: {
        auto a = m.begin();
        auto b = r.begin();
        while (a != m.end()) {
          CHECK(*a == *b);
          ++a;
          ++b;
        }
        break;
      }
    }
    check_same(m, r);
  }
}

TEST(map_sequential_and_reverse_keys_stay_balanced) {
  cptr::ordered_map<int, int> m;
  for (int i = 0; i < 100000; i++) {
    m.emplace(i, i);
  }
  for (int i = -1; i > -100000; i--) {
    m.emplace(i, i);
  }
  CHECK(m.valid());
  // A red-black tree of n nodes is at most 2 log2(n + 1) high.
  CHECK(m.height() <= 2 * 18);
  for (int i = 0; i < 100000; i += 2) {
    m.erase(i);
  }
  CHECK(m.valid());
  CHECK(m.size() == 199999 - 50000);
}

TEST(map_transparent_lookup) {
  cptr::ordered_map<std::string, int, std::less<>> m{{"a", 1}, {"bb", 2}};
  CHECK(m.find("bb")->second == 2);
  CHECK(m.contains("a"));
  CHECK(m.count("c") == 0);
  CHECK(m.lower_bound("b")->first == "bb");
}

TEST(map_end_stays_valid) {
  cptr::ordered_map<int, int> m;
  auto end = m.end();
  m.emplace(1, 1);
  m.emplace(2, 2);
  CHECK(end == m.end());
  CHECK(std::prev(end)->first == 2);
}
