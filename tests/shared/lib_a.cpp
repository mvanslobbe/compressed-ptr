// Built as a shared library with hidden visibility: allocates in the default
// cage and hands out compressed offsets.
#include "cptr/ptr.hpp"
#define CPTR_TEST_BUILDING_LIB
#include "shared.hpp"

CPTR_TEST_EXPORT std::uint32_t lib_a_make(int value) {
  return cptr::make<int>(value).bits();
}

CPTR_TEST_EXPORT std::uintptr_t lib_a_base() {
  return cptr::default_cage::base();
}
