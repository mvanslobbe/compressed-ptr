// Built with -fsanitize=address, this reports a use-after-poison inside the
// cage: freed cage blocks are poisoned, as heap blocks are. Not run as a
// test; CI builds it and checks for that report.
#include <cstdio>

#include "cptr/ptr.hpp"

int main() {
  cptr::ptr<int> p = cptr::make<int>(1);
  cptr::ptr<int> dangling = p;
  cptr::destroy(p);
  std::printf("%d\n", *dangling);
}
