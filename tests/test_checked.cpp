// CPTR_CHECKED keeps the checks that catch foreign pointers in release
// builds: compressing a pointer from outside the cage, or freeing one, must
// abort even with NDEBUG defined.
#undef NDEBUG
#define NDEBUG 1
#define CPTR_CHECKED 1

#include <cstdio>
#include <cstdlib>

#include "cptr/all.hpp"
#include "check.hpp"

#if !defined(_WIN32)
#  include <csignal>
#  include <sys/wait.h>
#  include <unistd.h>
#endif

namespace {
struct wide : cptr::cage<wide, 35, 3> {};

#if !defined(_WIN32) && !defined(CPTR_ASAN)
// Runs |f| in a child process and returns true if it aborted.
bool aborts(void (*f)()) {
  std::fflush(stdout);
  pid_t pid = fork();
  if (pid == 0) {
    f();
    std::exit(0);
  }
  int status = 0;
  waitpid(pid, &status, 0);
  return WIFSIGNALED(status) && WTERMSIG(status) == SIGABRT;
}
#endif
}  // namespace

TEST(checked_release_build_still_works) {
  int value = 0;
  (void)value;
  auto p = cptr::make<int>(7);
  CHECK(*p == 7);
  cptr::ptr<int> null;
  CHECK(null == nullptr);
  cptr::destroy(p);
}

#if !defined(_WIN32) && !defined(CPTR_ASAN)
TEST(checked_compress_outside_cage_aborts) {
  CHECK(aborts([] {
    static int on_the_side = 1;
    cptr::ptr<int> p(&on_the_side);
    std::printf("  stored %u\n", p.bits());
  }));
}

TEST(checked_compress_misaligned_aborts) {
  CHECK(aborts([] {
    auto* bytes = static_cast<char*>(wide::allocate(64, 8));
    (void)wide::compress(bytes + 1);
  }));
}

TEST(checked_deallocate_foreign_pointer_aborts) {
  CHECK(aborts([] {
    static long on_the_side = 1;
    (void)cptr::default_cage::allocate(16);
    cptr::default_cage::deallocate(&on_the_side);
  }));
}

TEST(checked_nonnull_from_null_aborts) {
  CHECK(aborts([] {
    cptr::nonnull_ptr<int> p(static_cast<int*>(nullptr));
    std::printf("  stored %u\n", p.bits());
  }));
}
#endif
