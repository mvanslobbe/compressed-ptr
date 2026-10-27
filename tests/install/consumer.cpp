#include <cstdio>
#include <cstring>
#include <thread>

#include "cptr/all.hpp"
#include "cptr/version.hpp"

static_assert(CPTR_VERSION_MAJOR >= 0 && CPTR_VERSION_MINOR >= 0);

int main() {
  if (std::strcmp(CPTR_VERSION, EXPECTED_VERSION) != 0) {
    std::printf("header version %s, package version %s\n", CPTR_VERSION,
                EXPECTED_VERSION);
    return 1;
  }
  cptr::ptr<int> p;
  std::thread t([&] { p = cptr::make<int>(42); });
  t.join();
  std::printf("compressed-ptr %s: %d\n", CPTR_VERSION, *p);
  cptr::destroy(p);
  return 0;
}
