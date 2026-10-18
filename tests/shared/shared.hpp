#pragma once

#include <cstdint>

#if defined(_WIN32)
#  define CPTR_TEST_EXPORT extern "C" __declspec(dllexport)
#  define CPTR_TEST_IMPORT extern "C" __declspec(dllimport)
#else
#  define CPTR_TEST_EXPORT extern "C" __attribute__((visibility("default")))
#  define CPTR_TEST_IMPORT extern "C"
#endif

#if !defined(CPTR_TEST_BUILDING_LIB)
CPTR_TEST_IMPORT std::uint32_t lib_a_make(int value);
CPTR_TEST_IMPORT std::uintptr_t lib_a_base();
CPTR_TEST_IMPORT int lib_b_read(std::uint32_t bits);
CPTR_TEST_IMPORT std::uintptr_t lib_b_base();
#endif
