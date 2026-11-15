// The library in a build without exceptions (-fno-exceptions; on MSVC,
// CPTR_NO_EXCEPTIONS). Everything works as usual, and where the library
// would throw it calls CPTR_ON_FAILURE, which this test catches with
// longjmp so that it can check the message and carry on.
#include <csetjmp>
#include <cstring>

namespace {
std::jmp_buf failure_jump;
const char* failure_what = nullptr;
}  // namespace

#define CPTR_ON_FAILURE(what) \
  (failure_what = (what), std::longjmp(failure_jump, 1))

#include "check.hpp"
#include "cptr/all.hpp"

static_assert(CPTR_EXCEPTIONS == 0);

namespace {
// Runs |f| and returns the message it failed with, or nullptr.
template <class F>
const char* failure_of(F f) {
  failure_what = nullptr;
  if (setjmp(failure_jump) == 0) {
    f();
  }
  return failure_what;
}
}  // namespace

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

TEST(at_reports_a_missing_key) {
  cptr::ordered_map<int, int> m{{1, 1}};
  cptr::unordered_map<int, int> h{{1, 1}};
  const char* what = failure_of([&] { (void)m.at(2); });
  CHECK(what && std::strstr(what, "no such key"));
  what = failure_of([&] { (void)h.at(2); });
  CHECK(what && std::strstr(what, "no such key"));
}

TEST(allocation_failure_is_reported) {
  const char* what = failure_of(
      [] { (void)cptr::default_cage::allocate(std::size_t(1) << 40); });
  CHECK(what && std::strstr(what, "out of memory"));
  // The cage still works afterwards.
  void* q = cptr::default_cage::allocate(64);
  CHECK(q != nullptr);
  cptr::default_cage::deallocate(q);
}
