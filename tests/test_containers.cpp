#include <list>
#include <map>
#include <random>
#include <string>

#include "cptr/all.hpp"
#include "check.hpp"

template <bool Compressed>
static void list_matches_std() {
  cptr::list<int, cptr::default_cage, Compressed> mine;
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
  using raw = cptr::list<std::uint32_t, cptr::default_cage, false>;
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
  cptr::ordered_map<int, int, std::less<int>, cptr::default_cage, Compressed>
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
  using raw = cptr::ordered_map<std::uint32_t, std::uint32_t,
                                std::less<std::uint32_t>, cptr::default_cage,
                                false>;
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
