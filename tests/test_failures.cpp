// Failure paths: misuse caught by CPTR_ASSERT, commit failures through the
// fault-injection hook, and address-space exhaustion through a resource
// limit. Built as a separate executable because it overrides CPTR_ASSERT.
#include <atomic>

inline std::atomic<int> g_assert_failures{0};
#define CPTR_ASSERT(cond, msg) ((cond) ? (void)0 : (void)g_assert_failures++)
#define CPTR_FAULT_INJECTION 1

#include <thread>
#include <vector>

#include "cptr/all.hpp"
#include "check.hpp"

#if !defined(_WIN32)
#  include <csignal>
#  include <sys/resource.h>
#  include <sys/wait.h>
#  include <unistd.h>
#endif

namespace {
struct wide : cptr::cage<wide, 35, 3> {};
struct fresh_small : cptr::cage<fresh_small, 24> {};
struct fresh_large : cptr::cage<fresh_large, 24> {};
struct reuse : cptr::cage<reuse, 24> {};
struct racy : cptr::cage<racy, 24> {};
struct unreservable : cptr::cage<unreservable> {};
struct alignas(4) four {
  int v;
};

int asserts_from(void (*f)()) {
  int before = g_assert_failures;
  f();
  return g_assert_failures - before;
}
}  // namespace

TEST(assert_compress_outside_cage) {
  CHECK(asserts_from([] {
          int local = 0;
          (void)cptr::default_cage::compress(&local);
        }) == 1);
}

TEST(assert_compress_unaligned_in_shifted_cage) {
  if (!wide::init()) {
    return;
  }
  CHECK(asserts_from([] {
          char* p = static_cast<char*>(wide::allocate(16, 8));
          (void)wide::compress(p + 1);
          wide::deallocate(p);
        }) == 1);
}

TEST(assert_alignment_not_power_of_two) {
  CHECK(asserts_from([] {
          void* p = cptr::default_cage::allocate(8, 3);
          cptr::default_cage::deallocate(p);
        }) == 1);
}

TEST(assert_nonnull_from_null) {
  CHECK(asserts_from([] {
          cptr::nonnull_ptr<int> p(static_cast<int*>(nullptr));
          (void)p;
        }) == 1);
}

TEST(assert_tag_too_large) {
  CHECK(asserts_from([] {
          auto a = cptr::make<four>();
          cptr::tagged_ptr<four, 2> t(a, 7);
          (void)t;
          cptr::destroy(a);
        }) == 1);
}

TEST(assert_tagged_pointer_misaligned) {
  CHECK(asserts_from([] {
          auto a = cptr::make<four>();
          char* inside = reinterpret_cast<char*>(a.get()) + 1;
          cptr::tagged_ptr<char, 2> t(inside, 0);
          (void)t;
          cptr::destroy(a);
        }) == 1);
}

TEST(small_allocation_commit_failure) {
  cptr::detail::commit_failures_to_inject = 1;
  CHECK(fresh_small::try_allocate(16, 8) == nullptr);
  CHECK(cptr::detail::commit_failures_to_inject == 0);
  void* p = fresh_small::try_allocate(16, 8);
  CHECK(p != nullptr);
  fresh_small::deallocate(p);
}

TEST(large_allocation_commit_failure) {
  cptr::detail::commit_failures_to_inject = 1;
  CHECK(fresh_large::try_allocate(1 << 20) == nullptr);
  bool threw = false;
  cptr::detail::commit_failures_to_inject = 1;
  try {
    (void)fresh_large::allocate(1 << 20);
  } catch (const std::bad_alloc&) {
    threw = true;
  }
  CHECK(threw);
  void* p = fresh_large::try_allocate(1 << 20);
  CHECK(p != nullptr);
  fresh_large::deallocate(p);
}

TEST(reused_run_commit_failure) {
  void* a = reuse::allocate(1 << 20);
  void* guard = reuse::allocate(1 << 20);
  reuse::deallocate(a);
  cptr::detail::commit_failures_to_inject = 1;
  CHECK(reuse::try_allocate(1 << 20) == nullptr);
  void* again = reuse::try_allocate(1 << 20);
  CHECK(again == a);
  reuse::deallocate(again);
  reuse::deallocate(guard);
}

TEST(concurrent_first_use) {
  std::atomic<int> waiting{8};
  std::atomic<int> ok{0};
  std::vector<std::thread> threads;
  for (int i = 0; i < 8; i++) {
    threads.emplace_back([&] {
      waiting--;
      while (waiting.load() > 0) {
      }
      ok += racy::init();
    });
  }
  for (auto& t : threads) {
    t.join();
  }
  CHECK(ok == 8);
  CHECK(racy::base() != 0);
}

TEST(address_space_exhausted) {
#if defined(_WIN32) || defined(__APPLE__) || defined(CPTR_ASAN)
  // macOS accepts RLIMIT_AS but does not enforce it.
  std::printf("  (skipped: needs fork and an enforced address-space limit)\n");
#else
  std::fflush(stdout);
  pid_t pid = fork();
  if (pid == 0) {
    rlimit limit{rlim_t(1) << 30, rlim_t(1) << 30};
    setrlimit(RLIMIT_AS, &limit);
    int failures = 0;
    failures += unreservable::init();
    failures += unreservable::try_allocate(16) != nullptr;
    try {
      (void)unreservable::allocate(16);
      failures++;
    } catch (const std::bad_alloc&) {
    }
    failures += unreservable::allocated_bytes() != 0;
    // exit, not _exit, so coverage data is written.
    std::exit(failures);
  }
  int status = 0;
  waitpid(pid, &status, 0);
  CHECK(WIFEXITED(status) && WEXITSTATUS(status) == 0);
#endif
}

// Dereferencing a null ptr must still fault, although operator-> and
// operator* skip the null check: offset zero is the cage's first span,
// which is never committed.
TEST(null_dereference_faults) {
#if defined(_WIN32) || defined(CPTR_ASAN)
  std::printf("  (skipped: needs fork)\n");
#else
  struct node {
    int value;
  };
  std::fflush(stdout);
  pid_t pid = fork();
  if (pid == 0) {
    (void)cptr::default_cage::allocate(16);  // commit something
    cptr::ptr<node> p;
    volatile int v = p->value;
    (void)v;
    std::exit(0);
  }
  int status = 0;
  waitpid(pid, &status, 0);
  CHECK(WIFSIGNALED(status) &&
        (WTERMSIG(status) == SIGSEGV || WTERMSIG(status) == SIGBUS));
#endif
}
