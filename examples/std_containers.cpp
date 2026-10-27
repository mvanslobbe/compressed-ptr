// Standard containers can live in the cage too, through cptr::allocator or
// the std::pmr resource. Their elements can then be referred to by
// cptr::ptr, e.g. for an index into a std::deque or a std::unordered_map.
#include <cstdio>
#include <deque>
#include <memory_resource>
#include <string>
#include <unordered_map>

#include "cptr/allocator.hpp"
#include "cptr/ptr.hpp"

struct record {
  int id;
  double score;
};

int main() {
  std::deque<record, cptr::allocator<record>> records;
  for (int i = 0; i < 1000; i++) {
    records.push_back({i, i * 0.5});
  }

  // deque never moves its elements on push_back, so compressed pointers to
  // them stay valid.
  std::pmr::unordered_map<int, cptr::ptr<record>> by_id(
      cptr::default_cage::resource());
  for (record& r : records) {
    by_id.emplace(r.id, &r);
  }
  std::printf("record 640 has score %.1f\n", by_id.at(640)->score);

  std::pmr::string text("strings can live in the cage as well",
                        cptr::default_cage::resource());
  std::printf("%s (%s)\n", text.c_str(),
              cptr::default_cage::contains(text.data()) ? "inside" : "outside");
  std::printf("cage: %zu bytes allocated, %zu committed\n",
              cptr::default_cage::allocated_bytes(),
              cptr::default_cage::committed_bytes());
}
