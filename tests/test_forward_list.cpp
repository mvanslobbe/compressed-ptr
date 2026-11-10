// cptr::forward_list against std::forward_list: the interface, node size,
// and a long random sequence of every operation compared step by step.
#include <compare>
#include <forward_list>
#include <iterator>
#include <random>
#include <string>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

namespace {

using int_list = cptr::forward_list<int>;

static_assert(std::is_nothrow_move_constructible_v<int_list>);
static_assert(sizeof(int_list::iterator) == sizeof(void*));
static_assert(std::forward_iterator<int_list::iterator>);
static_assert(int_list::node_size == 8);  // 4-byte link + int
static_assert(requires(int_list& l, const int_list& c,
                       int_list::const_iterator cit, std::vector<int>& v) {
  int_list{1, 2, 3};
  int_list(v.begin(), v.end());
  int_list(std::size_t(3), 7);
  l.assign(v.begin(), v.end());
  l.assign({1, 2});
  l.assign(std::size_t(2), 5);
  c.front();
  c.before_begin();
  c.cbefore_begin();
  c.cbegin();
  l.max_size();
  l.push_front(1);
  l.emplace_front(1);
  l.pop_front();
  l.insert_after(cit, 1);
  l.insert_after(cit, std::size_t(2), 1);
  l.insert_after(cit, v.begin(), v.end());
  l.insert_after(cit, {1, 2});
  l.emplace_after(cit, 1);
  l.erase_after(cit);
  l.erase_after(cit, cit);
  l.resize(4);
  l.resize(4, 1);
  l.splice_after(cit, l);
  l.splice_after(cit, l, cit);
  l.splice_after(cit, l, cit, cit);
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
  { c == c } -> std::same_as<bool>;
  { c <=> c } -> std::same_as<std::strong_ordering>;
  swap(l, l);
});

template <class A, class B>
void check_same(const A& mine, const B& ref) {
  CHECK(std::equal(mine.begin(), mine.end(), ref.begin(), ref.end()));
}

// The iterator before element |k| (before_begin() for k == 0).
template <class L>
typename L::iterator before(L& l, std::size_t k) {
  auto it = l.before_begin();
  std::advance(it, std::ptrdiff_t(k));
  return it;
}

}  // namespace

TEST(forward_list_every_operation_matches_std) {
  cptr::forward_list<int> a, b;
  std::forward_list<int> ra, rb;
  std::mt19937 rng(9);
  auto value = [&] { return int(rng() % 40); };
  for (int step = 0; step < 30000; step++) {
    bool on_a = rng() % 2;
    auto& m = on_a ? a : b;
    auto& r = on_a ? ra : rb;
    auto& m2 = on_a ? b : a;
    auto& r2 = on_a ? rb : ra;
    std::size_t n = std::size_t(std::distance(r.begin(), r.end()));
    std::size_t n2 = std::size_t(std::distance(r2.begin(), r2.end()));
    std::size_t k = rng() % (n + 1);
    switch (rng() % 18) {
      case 0: {
        int v = value();
        m.push_front(v);
        r.push_front(v);
        break;
      }
      case 1: {
        int v = value();
        CHECK(*m.insert_after(before(m, k), v) == v);
        r.insert_after(before(r, k), v);
        break;
      }
      case 2: {
        std::size_t c = rng() % 4;
        int v = value();
        auto it = m.insert_after(before(m, k), c, v);
        auto rit = r.insert_after(before(r, k), c, v);
        CHECK(std::distance(m.before_begin(), it) ==
              std::distance(r.before_begin(), rit));
        break;
      }
      case 3:
        if (k < n) {
          m.erase_after(before(m, k));
          r.erase_after(before(r, k));
        }
        break;
      case 4: {
        std::size_t j = k + rng() % (n - k + 1);
        // Erase the elements strictly between positions k and j + 1.
        auto last = j + 1 > n ? m.end() : before(m, j + 1);
        auto rlast = j + 1 > n ? r.end() : before(r, j + 1);
        m.erase_after(before(m, k), last);
        r.erase_after(before(r, k), rlast);
        break;
      }
      case 5:
        m.resize(rng() % 30, 3);
        r.resize(std::size_t(std::distance(m.begin(), m.end())), 3);
        break;
      case 6:
        m.sort();
        r.sort();
        break;
      case 7:
        m.reverse();
        r.reverse();
        break;
      case 8: {
        int v = value();
        CHECK(m.remove(v) == r.remove(v));
        break;
      }
      case 9:
        CHECK(m.remove_if([](int x) { return x % 5 == 0; }) ==
              r.remove_if([](int x) { return x % 5 == 0; }));
        break;
      case 10:
        CHECK(m.unique() == r.unique());
        break;
      case 11: {
        // Splice the range after k2 up to j2 from the other list.
        std::size_t k2 = rng() % (n2 + 1);
        std::size_t j2 = k2 + rng() % (n2 - k2 + 1);
        auto last = j2 + 1 > n2 ? m2.end() : before(m2, j2 + 1);
        auto rlast = j2 + 1 > n2 ? r2.end() : before(r2, j2 + 1);
        m.splice_after(before(m, k), m2, before(m2, k2), last);
        r.splice_after(before(r, k), r2, before(r2, k2), rlast);
        break;
      }
      case 12:
        if (n2) {
          std::size_t k2 = rng() % n2;
          m.splice_after(before(m, k), m2, before(m2, k2));
          r.splice_after(before(r, k), r2, before(r2, k2));
        }
        break;
      case 13:
        if (n < 200) {
          m.splice_after(before(m, k), m2);
          r.splice_after(before(r, k), r2);
        }
        break;
      case 14:
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        m.merge(m2);
        r.merge(r2);
        break;
      case 15: {
        std::vector<int> v(rng() % 5, value());
        m.assign(v.begin(), v.end());
        r.assign(v.begin(), v.end());
        break;
      }
      case 16:
        if (n) {
          CHECK(m.front() == r.front());
          m.pop_front();
          r.pop_front();
        }
        break;
      case 17:
        CHECK((a == b) == (ra == rb));
        CHECK((a <=> b) == (ra <=> rb));
        break;
    }
    check_same(a, ra);
    check_same(b, rb);
    if (n > 300) {
      m.clear();
      r.clear();
    }
  }
}

TEST(forward_list_sort_is_stable_and_strings_work) {
  cptr::forward_list<std::pair<int, int>> l;
  std::forward_list<std::pair<int, int>> r;
  std::mt19937 rng(4);
  for (int i = 0; i < 3000; i++) {
    std::pair<int, int> v{int(rng() % 10), i};
    l.push_front(v);
    r.push_front(v);
  }
  auto by_first = [](const auto& x, const auto& y) {
    return x.first < y.first;
  };
  l.sort(by_first);
  r.sort(by_first);
  check_same(l, r);

  cptr::forward_list<std::string> s{"a", std::string(50, 'b')};
  cptr::forward_list<std::string> t = s;
  CHECK(s == t);
  cptr::forward_list<std::string> u = std::move(s);
  CHECK(s.empty() && u == t);
}
