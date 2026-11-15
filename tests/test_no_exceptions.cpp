// The library in a build without exceptions (-fno-exceptions; on MSVC,
// CPTR_NO_EXCEPTIONS). Everything works as usual, and where the library
// would throw it calls CPTR_ON_FAILURE instead, which must not return.
//
// Run without arguments, this checks that the containers work. Run with the
// name of a failure, it triggers that failure; the hook below prints the
// message and exits, and CTest checks the message. A separate process per
// failure keeps the test portable: longjmp out of the hook trips MSVC's
// C4611 and, under clang-cl, an unwinding error at run time.
#include <cstdio>
#include <cstdlib>
#include <cstring>

#define CPTR_ON_FAILURE(what) \
  (std::printf("cptr failure: %s\n", what), std::fflush(stdout), std::_Exit(0))

#include "check.hpp"
#include "cptr/all.hpp"

static_assert(CPTR_EXCEPTIONS == 0);

TEST(containers_work_without_exceptions) {
  cptr::list<int> l{3, 1, 2};
  l.sort();
  CHECK(l.front() == 1 && l.back() == 3);
  cptr::forward_list<int> f{2, 1};
  f.sort();
  CHECK(f.front() == 1);
  cptr::ordered_map<int, int> m;
  cptr::unordered_map<int, int> h;
  for (int i = 0; i < 1000; i++) {
    m.emplace(i, i * 2);
    h.emplace(i, i * 3);
  }
  CHECK(m.at(10) == 20 && h.at(10) == 30);
  cptr::ptr<int> p = cptr::make<int>(7);
  CHECK(*p == 7);
  cptr::destroy(p);
}

int main(int argc, char** argv) {
  if (argc < 2) return check::run_all();
  if (std::strcmp(argv[1], "ordered_map_at") == 0) {
    cptr::ordered_map<int, int> m{{1, 1}};
    (void)m.at(2);
  } else if (std::strcmp(argv[1], "unordered_map_at") == 0) {
    cptr::unordered_map<int, int> h{{1, 1}};
    (void)h.at(2);
  } else if (std::strcmp(argv[1], "allocate") == 0) {
    (void)cptr::default_cage::allocate(std::size_t(1) << 40);
  } else {
    std::printf("unknown failure %s\n", argv[1]);
    return EXIT_FAILURE;
  }
  std::printf("no failure reported\n");
  return EXIT_FAILURE;
}
