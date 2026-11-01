#include <list>
#include <map>
#include <random>
#include <string>

#include "check.hpp"
#include "cptr/all.hpp"

template <bool Compressed>
static void list_matches_std() {
  cptr::detail::basic_list<int, cptr::default_cage, Compressed> mine;
  std::list<int> ref;
  std::mt19937 rng(1);
  for (int i = 0; i < 20000; i++) {
    int op = rng() % 6;
    int v = int(rng());
    if (op == 0) {
      mine.push_back(v);
      ref.push_back(v);
    } else if (op == 1) {
      mine.push_front(v);
      ref.push_front(v);
    } else if (op == 2 && !ref.empty()) {
      mine.pop_front();
      ref.pop_front();
    } else if (op == 3 && !ref.empty()) {
      mine.pop_back();
      ref.pop_back();
    } else if (op == 4) {
      auto a = mine.begin();
      auto b = ref.begin();
      for (std::size_t k = rng() % (ref.size() + 1); k; k--) {
        ++a;
        ++b;
      }
      mine.emplace(a, v);
      ref.emplace(b, v);
    } else if (op == 5 && !ref.empty()) {
      auto a = mine.begin();
      auto b = ref.begin();
      for (std::size_t k = rng() % ref.size(); k; k--) {
        ++a;
        ++b;
      }
      mine.erase(a);
      ref.erase(b);
    }
  }
  CHECK(mine.size() == ref.size());
  CHECK(std::equal(mine.begin(), mine.end(), ref.begin(), ref.end()));
  CHECK(std::equal(std::make_reverse_iterator(mine.end()),
                   std::make_reverse_iterator(mine.begin()), ref.rbegin(),
                   ref.rend()));
}

TEST(list_compressed_matches_std_list) { list_matches_std<true>(); }
TEST(list_raw_matches_std_list) { list_matches_std<false>(); }

TEST(list_nodes_are_smaller) {
  using compressed = cptr::list<std::uint32_t>;
  using raw =
      cptr::detail::basic_list<std::uint32_t, cptr::default_cage, false>;
  CHECK(compressed::node_size == 12);
  CHECK(raw::node_size == 24);
}

TEST(list_copy_move_and_strings) {
  cptr::list<std::string> a;
  a.push_back("one");
  a.push_back(std::string(100, 'x'));
  cptr::list<std::string> b = a;
  cptr::list<std::string> c = std::move(a);
  CHECK(a.empty());
  CHECK(b.size() == 2 && c.size() == 2);
  CHECK(b.back() == c.back());
}

template <bool Compressed>
static void map_matches_std() {
  cptr::detail::basic_ordered_map<int, int, std::less<int>, cptr::default_cage,
                                  Compressed>
      mine;
  std::map<int, int> ref;
  std::mt19937 rng(2);
  for (int i = 0; i < 50000; i++) {
    int k = int(rng() % 5000);
    switch (rng() % 4) {
      case 0:
      case 1:
        CHECK(mine.emplace(k, i).second == ref.emplace(k, i).second);
        break;
      case 2:
        CHECK(mine.erase(k) == ref.erase(k));
        break;
      case 3: {
        auto a = mine.find(k);
        auto b = ref.find(k);
        CHECK((a == mine.end()) == (b == ref.end()));
        if (b != ref.end()) {
          CHECK(a->second == b->second);
        }
        auto la = mine.lower_bound(k);
        auto lb = ref.lower_bound(k);
        CHECK((la == mine.end()) == (lb == ref.end()));
        if (lb != ref.end()) {
          CHECK(la->first == lb->first);
        }
        break;
      }
    }
  }
  CHECK(mine.size() == ref.size());
  CHECK(std::equal(mine.begin(), mine.end(), ref.begin(), ref.end()));
  CHECK(std::equal(std::make_reverse_iterator(mine.end()),
                   std::make_reverse_iterator(mine.begin()), ref.rbegin(),
                   ref.rend()));
  for (auto it = mine.begin(); it != mine.end();) {
    it = mine.erase(it);
  }
  CHECK(mine.empty());
}

TEST(map_compressed_matches_std_map) { map_matches_std<true>(); }
TEST(map_raw_matches_std_map) { map_matches_std<false>(); }

TEST(map_nodes_are_smaller) {
  using compressed = cptr::ordered_map<std::uint32_t, std::uint32_t>;
  using raw = cptr::detail::basic_ordered_map<std::uint32_t, std::uint32_t,
                                              std::less<std::uint32_t>,
                                              cptr::default_cage, false>;
  CHECK(compressed::node_size == 24);
  CHECK(raw::node_size == 40);
}

TEST(map_operator_index_and_copy) {
  cptr::ordered_map<std::string, int> m;
  m["b"] = 2;
  m["a"] = 1;
  m["b"]++;
  auto copy = m;
  CHECK(copy.size() == 2);
  CHECK(copy.begin()->first == "a");
  CHECK(copy.find("b")->second == 3);
}

// Destroyed after main() returns, after the cage's own statics would have
// been if they were ordinary function-local statics.
static cptr::list<int> g_list_destroyed_at_exit;

TEST(static_container_outlives_main) {
  for (int i = 0; i < 1000; i++) {
    g_list_destroyed_at_exit.push_back(i);
  }
  CHECK(g_list_destroyed_at_exit.size() == 1000);
}

namespace {
struct throws_on {
  static inline int countdown = -1;
  int value;
  explicit throws_on(int v) : value(v) {
    if (countdown >= 0 && countdown-- == 0) {
      throw std::runtime_error("constructor failed");
    }
  }
};
}  // namespace

TEST(throwing_constructors_do_not_leak) {
  using C = cptr::default_cage;
  std::size_t before = C::allocated_bytes();
  bool threw = false;
  throws_on::countdown = 0;
  try {
    (void)cptr::make<throws_on>(1);
  } catch (const std::runtime_error&) {
    threw = true;
  }
  CHECK(threw);
  CHECK(C::allocated_bytes() == before);

  {
    cptr::list<throws_on> l;
    l.emplace_back(1);
    throws_on::countdown = 0;
    threw = false;
    try {
      l.emplace_back(2);
    } catch (const std::runtime_error&) {
      threw = true;
    }
    CHECK(threw);
    CHECK(l.size() == 1 && l.front().value == 1);

    cptr::ordered_map<int, throws_on> m;
    m.try_emplace(1, 1);
    throws_on::countdown = 0;
    threw = false;
    try {
      m.try_emplace(2, 2);
    } catch (const std::runtime_error&) {
      threw = true;
    }
    CHECK(threw);
    CHECK(m.size() == 1 && !m.contains(2));
  }
  throws_on::countdown = -1;
  CHECK(C::allocated_bytes() == before);
}

TEST(const_access_and_postfix_iteration) {
  cptr::list<int> l;
  l.push_back(1);
  l.push_back(2);
  l.push_front(0);
  const auto& cl = l;
  int sum = 0;
  for (auto it = cl.begin(); it != cl.end(); it++) {
    sum += *it;
  }
  CHECK(sum == 3);
  auto last = cl.end();
  last--;
  CHECK(*last == 2);
  cptr::list<int>::const_iterator converted = l.begin();
  CHECK(*converted == 0);
  CHECK(l.back() == 2);
  l.pop_back();
  l.pop_front();
  CHECK(l.size() == 1 && l.front() == 1);
  cptr::list<int> other;
  other = l;
  CHECK(other.size() == 1);

  cptr::ordered_map<int, int> m;
  for (int i = 0; i < 10; i++) {
    m.insert({i, i * i});
  }
  const auto& cm = m;
  CHECK(cm.find(3)->second == 9);
  CHECK(cm.find(42) == cm.end());
  CHECK(!cm.empty());
  auto it = cm.end();
  it--;
  CHECK(it->first == 9);
  auto prev = it--;
  CHECK(prev->first == 9 && it->first == 8);
  auto next = it++;
  CHECK(next->first == 8 && it->first == 9);
  cptr::ordered_map<int, int>::const_iterator ci = m.begin();
  CHECK(ci->first == 0);
  CHECK(m.lower_bound(100) == m.end());
  CHECK(m.erase(100) == 0);
  cptr::ordered_map<int, int> moved = std::move(m);
  CHECK(m.empty() && moved.size() == 10);
  m = moved;
  CHECK(m.size() == 10);
}
