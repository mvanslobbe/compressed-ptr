// The smallest program that gives plf::list 4-byte links: swap in
// cptr::fancy_allocator and allocate the list object in the cage.
#include <cstdio>
#include <memory>

#include "cptr/fancy_allocator.hpp"
#include "plf_list.h"

using list = plf::list<int, cptr::fancy_allocator<int>>;  // was plf::list<int>

int main() {
  // Nodes link to the list's end sentinel, which is a member of the list
  // object, so the list object must live in the cage too.
  cptr::ptr<list> l = cptr::make<list>();
  for (int i = 0; i < 1000; i++) {
    l->push_back(i);
  }
  l->sort();
  long sum = 0;
  for (int v : *l) {
    sum += v;
  }
  std::printf(
      "sum %ld, %zu-byte links\n", sum,
      sizeof(std::allocator_traits<cptr::fancy_allocator<int>>::pointer));
  cptr::destroy(l);
  return sum == 499500 ? 0 : 1;
}
