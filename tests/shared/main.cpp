// Two shared libraries built with hidden visibility must share one default
// cage: an offset compressed in one must decompress in the other.
#include <cstdio>

#include "cptr/ptr.hpp"
#include "shared.hpp"

int main() {
  std::uint32_t bits = lib_a_make(42);
  int failures = 0;
  if (lib_a_base() != lib_b_base()) {
    std::printf("FAIL: lib_a cage base %#zx, lib_b cage base %#zx\n",
                std::size_t(lib_a_base()), std::size_t(lib_b_base()));
    failures++;
  }
  if (lib_a_base() != cptr::default_cage::base()) {
    std::printf("FAIL: lib_a cage base %#zx, executable %#zx\n",
                std::size_t(lib_a_base()),
                std::size_t(cptr::default_cage::base()));
    failures++;
  }
  if (failures == 0 && lib_b_read(bits) != 42) {
    std::printf("FAIL: lib_b read %d\n", lib_b_read(bits));
    failures++;
  }
  std::printf("%s\n", failures ? "shared cage: FAILED" : "shared cage: ok");
  return failures;
}
