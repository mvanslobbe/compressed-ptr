// Builds against single_include/cptr.hpp alone, to check that the
// amalgamated header is complete on every platform CI covers.
#include <cstdio>

#include "cptr.hpp"

struct node {
  cptr::ptr_pair<node> children;
  int key;
};

int main() {
  cptr::list<int> l{1, 2, 3};
  cptr::ordered_map<int, int> m{{1, 2}};
  cptr::unordered_map<int, int> h{{3, 4}};
  cptr::forward_list<int> f{5};
  cptr::ptr<node> n = cptr::make<node>();
  n->key = l.back() + m.at(1) + h.at(3) + f.front();
  bool ok = n->key == 3 + 2 + 4 + 5 && sizeof(cptr::ptr<node>) == 4;
  cptr::destroy(n);
  std::printf("single header: %s\n", ok ? "ok" : "FAILED");
  return ok ? 0 : 1;
}
