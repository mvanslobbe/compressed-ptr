// A minimal test harness, so the tests have no dependencies.
#pragma once

#include <cstdio>
#include <cstdlib>
#include <functional>
#include <vector>

namespace check {

struct test_case {
  const char* name;
  void (*fn)();
};

inline std::vector<test_case>& registry() {
  static std::vector<test_case> tests;
  return tests;
}

inline int failures = 0;

struct registrar {
  registrar(const char* name, void (*fn)()) {
    registry().push_back({name, fn});
  }
};

inline int run_all() {
  for (const auto& t : registry()) {
    int before = failures;
    t.fn();
    std::printf("%s %s\n", failures == before ? "PASS" : "FAIL", t.name);
  }
  std::printf("%zu tests, %d failed checks\n", registry().size(), failures);
  return failures ? EXIT_FAILURE : EXIT_SUCCESS;
}

}  // namespace check

#define CHECK_CAT2(a, b) a##b
#define CHECK_CAT(a, b) CHECK_CAT2(a, b)
#define TEST(name)                                            \
  static void name();                                         \
  static check::registrar CHECK_CAT(reg_, name)(#name, name); \
  static void name()
#define CHECK(cond)                                                          \
  do {                                                                       \
    if (!(cond)) {                                                           \
      std::printf("  %s:%d: CHECK(%s) failed\n", __FILE__, __LINE__, #cond); \
      check::failures++;                                                     \
    }                                                                        \
  } while (0)
