// Built with -fsanitize=address, this reports a heap-use-after-free inside
// the cage. Not run as a test.
#include <cstdio>

#include "cptr/ptr.hpp"

int main() {
  cptr::ptr<int> p = cptr::make<int>(1);
  cptr::ptr<int> dangling = p;
  cptr::destroy(p);
  std::printf("%d\n", *dangling);
}
