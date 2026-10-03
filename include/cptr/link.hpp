// SPDX-License-Identifier: MIT
#pragma once

#include <type_traits>

#include "cptr/ptr.hpp"

namespace cptr {

// The link type used by the bundled containers. Compressed = false gives a
// raw-pointer twin with identical code, which the benchmarks use to isolate
// the effect of compression from the effect of the allocator.
template <class T, class Cage, bool Compressed>
using link = std::conditional_t<Compressed, ptr<T, Cage>, T*>;

}  // namespace cptr
