// A second shared library with hidden visibility: reads offsets that
// lib_a produced. Both must see the same cage.
#include "cptr/ptr.hpp"
#define CPTR_TEST_BUILDING_LIB
#include "shared.hpp"

CPTR_TEST_EXPORT int lib_b_read(std::uint32_t bits) {
  return *cptr::ptr<int>::from_bits(bits);
}

CPTR_TEST_EXPORT std::uintptr_t lib_b_base() {
  return cptr::default_cage::base();
}
