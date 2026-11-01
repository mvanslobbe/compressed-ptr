// cptr::list against std::list: the interface, iterator size, and a long
// random sequence of every operation compared step by step.
#include <algorithm>
#include <compare>
#include <list>
#include <random>
#include <string>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

namespace {

using int_list = cptr::list<int>;

// The interface std::list offers, apart from the allocator.
static_assert(std::is_nothrow_move_constructible_v<int_list>);
static_assert(sizeof(int_list::iterator) == sizeof(void*));
static_assert(std::bidirectional_iterator<int_list::iterator>);
static_assert(std::bidirectional_iterator<int_list::const_iterator>);
static_assert(requires(int_list& l, const int_list& c, int_list::iterator it,
                       int_list::const_iterator cit, std::vector<int>& v) {
  int_list{1, 2, 3};
  int_list(v.begin(), v.end());
  int_list(std::size_t(3), 7);
  l.assign(v.begin(), v.end());
  l.assign({1, 2});
  l.assign(std::size_t(2), 5);
  c.front();
  c.back();
  c.rbegin();
  c.crend();
  c.cbegin();
  l.max_size();
  l.insert(cit, 1);
  l.insert(cit, std::size_t(2), 1);
  l.insert(cit, v.begin(), v.end());
  l.insert(cit, {1, 2});
  l.erase(cit, cit);
  l.resize(4);
  l.resize(4, 1);
  l.splice(cit, l);
  l.splice(cit, l, cit);
  l.splice(cit, l, cit, cit);
  l.merge(l);
  l.merge(l, std::greater<int>());
  l.sort();
  l.sort(std::greater<int>());
  l.reverse();
  { l.remove(1) } -> std::same_as<std::size_t>;
  {
    l.remove_if([](int x) { return x > 0; })
  } -> std::same_as<std::size_t>;
  { l.unique() } -> std::same_as<std::size_t>;
  l.unique(std::equal_to<int>());
  { c == c } -> std::same_as<bool>;
  { c <=> c } -> std::same_as<std::strong_ordering>;
  swap(l, l);
});

template <class A, class B>
void check_same(const A& mine, const B& ref) {
  CHECK(mine.size() == ref.size());
  CHECK(std::equal(mine.begin(), mine.end(), ref.begin(), ref.end()));
  CHECK(std::equal(mine.rbegin(), mine.rend(), ref.rbegin(), ref.rend()));
}

template <class L>
typename L::iterator nth(L& l, std::size_t k) {
  auto it = l.begin();
  std::advance(it, std::ptrdiff_t(k));
  return it;
}

}  // namespace

TEST(list_every_operation_matches_std_list) {
  cptr::list<int> a, b;
  std::list<int> ra, rb;
  std::mt19937 rng(7);
  auto value = [&] { return int(rng() % 50); };
  for (int step = 0; step < 30000; step++) {
    bool on_a = rng() % 2;
    auto& m = on_a ? a : b;
    auto& r = on_a ? ra : rb;
    auto& m2 = on_a ? b : a;
    auto& r2 = on_a ? rb : ra;
    std::size_t k = rng() % (r.size() + 1);
    switch (rng() % 20) {
      case 0:
        m.push_back(value());
        r.push_back(m.back());
        break;
      case 1:
        m.push_front(value());
        r.push_front(m.front());
        break;
      case 2: {
        int v = value();
        CHECK(*m.insert(nth(m, k), v) == v);
        r.insert(nth(r, k), v);
        break;
      }
      case 3: {
        std::size_t n = rng() % 4;
        int v = value();
        m.insert(nth(m, k), n, v);
        r.insert(nth(r, k), n, v);
        break;
      }
      case 4:
        if (!r.empty()) {
          k %= r.size();
          m.erase(nth(m, k));
          r.erase(nth(r, k));
        }
        break;
      case 5: {
        std::size_t j = k + rng() % (r.size() - k + 1);
        auto it = m.erase(nth(m, k), nth(m, j));
        auto rit = r.erase(nth(r, k), nth(r, j));
        CHECK(std::distance(m.begin(), it) == std::distance(r.begin(), rit));
        break;
      }
      case 6: {
        std::size_t n = rng() % 40;
        m.resize(n, 3);
        r.resize(n, 3);
        break;
      }
      case 7:
        m.sort();
        r.sort();
        break;
      case 8:
        m.reverse();
        r.reverse();
        break;
      case 9: {
        int v = value();
        CHECK(m.remove(v) == r.remove(v));
        break;
      }
      case 10:
        CHECK(m.remove_if([](int x) { return x % 7 == 0; }) ==
              r.remove_if([](int x) { return x % 7 == 0; }));
        break;
      case 11:
        CHECK(m.unique() == r.unique());
        break;
      case 12: {
        // Splice a range from the other list.
        std::size_t k2 = rng() % (r2.size() + 1);
        std::size_t j2 = k2 + rng() % (r2.size() - k2 + 1);
        m.splice(nth(m, k), m2, nth(m2, k2), nth(m2, j2));
        r.splice(nth(r, k), r2, nth(r2, k2), nth(r2, j2));
        break;
      }
      case 13:
        if (!r2.empty()) {
          std::size_t k2 = rng() % r2.size();
          m.splice(nth(m, k), m2, nth(m2, k2));
          r.splice(nth(r, k), r2, nth(r2, k2));
        }
        break;
      case 14:
        if (!r.empty()) {
          // Splice within the same list, including onto itself.
          std::size_t from = rng() % r.size();
          m.splice(nth(m, k), m, nth(m, from));
          r.splice(nth(r, k), r, nth(r, from));
        }
        break;
      case 15:
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        m.merge(m2);
        r.merge(r2);
        break;
      case 16:
        if (r.size() < 200) {
          m.splice(nth(m, k), m2);
          r.splice(nth(r, k), r2);
        }
        break;
      case 17: {
        std::vector<int> v(rng() % 5, value());
        m.assign(v.begin(), v.end());
        r.assign(v.begin(), v.end());
        break;
      }
      case 18:
        if (!r.empty()) {
          m.pop_back();
          r.pop_back();
        } else {
          m.clear();
          r.clear();
        }
        break;
      case 19: {
        CHECK((a == b) == (ra == rb));
        CHECK((a <=> b) == (ra <=> rb));
        break;
      }
    }
    check_same(a, ra);
    check_same(b, rb);
    if (r.size() > 300) {
      m.clear();
      r.clear();
    }
  }
}

TEST(list_sort_is_stable) {
  cptr::list<std::pair<int, int>> l;
  std::list<std::pair<int, int>> r;
  std::mt19937 rng(3);
  for (int i = 0; i < 5000; i++) {
    std::pair<int, int> v{int(rng() % 10), i};
    l.push_back(v);
    r.push_back(v);
  }
  auto by_first = [](const auto& x, const auto& y) {
    return x.first < y.first;
  };
  l.sort(by_first);
  r.sort(by_first);
  check_same(l, r);
}

TEST(list_end_stays_valid) {
  cptr::list<int> l;
  auto end = l.end();
  l.push_back(1);
  l.push_back(2);
  CHECK(end == l.end());
  CHECK(*std::prev(end) == 2);
  cptr::list<int> moved = std::move(l);
  // end() moves with the elements, as for std::list.
  CHECK(*std::prev(end) == 2);
  CHECK(end == moved.end());
}

TEST(list_constructors_and_strings) {
  cptr::list<std::string> a{"one", std::string(100, 'x'), "three"};
  cptr::list<std::string> b(a.begin(), a.end());
  cptr::list<std::string> c(std::size_t(2), "z");
  CHECK(a == b);
  CHECK(c.size() == 2 && c.front() == "z");
  b = c;
  CHECK(b == c);
  c = std::move(a);
  CHECK(c.size() == 3 && c.back() == "three");
  a = {"again"};
  CHECK(a.size() == 1);
  swap(a, c);
  CHECK(a.size() == 3 && c.size() == 1);
}
