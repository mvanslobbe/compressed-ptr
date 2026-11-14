// Cages whose memory is managed by an allocator the user supplies.
#include <atomic>
#include <cstddef>
#include <cstdint>
#include <cstdio>
#include <map>
#include <new>
#include <span>

#include "check.hpp"
#include "cptr/all.hpp"
#include "cptr/user_cage.hpp"

#if !defined(_WIN32)
#  include <sys/wait.h>
#  include <unistd.h>
#  include <csignal>
#endif
#include <thread>

namespace {

// A user allocator: a bump allocator that counts calls and remembers the
// region it was given.
struct counting_allocator {
  static inline std::byte* first = nullptr;
  static inline std::byte* last = nullptr;
  static inline int allocations = 0;
  static inline int frees = 0;

  explicit counting_allocator(std::span<std::byte> region) : arena_(region) {
    first = region.data();
    last = region.data() + region.size();
  }
  void* allocate(std::size_t bytes, std::size_t align) noexcept {
    void* p = arena_.allocate(bytes, align);
    allocations += p != nullptr;
    return p;
  }
  void deallocate(void* p) noexcept {
    frees++;
    arena_.deallocate(p);
  }

 private:
  cptr::bump_allocator arena_;
};

struct counting_tag {};
using counting_cage = cptr::user_cage<counting_tag, counting_allocator>;
static_assert(cptr::region_allocator<counting_allocator>);
static_assert(cptr::region_allocator<cptr::bump_allocator>);

// A small cage, to test running out of memory.
struct tiny_tag {};
using tiny_cage = cptr::user_cage<tiny_tag, cptr::bump_allocator, 24>;

}  // namespace

TEST(user_cage_hands_the_region_to_the_allocator) {
  CHECK(counting_cage::init());
  auto base = reinterpret_cast<std::byte*>(counting_cage::base());
  // Offset 0 (null) and the last span stay out of the allocator's reach.
  CHECK(counting_allocator::first == base + counting_cage::span_size);
  CHECK(counting_allocator::last == base + counting_cage::usable_end);

  cptr::list<int, counting_cage> list;
  cptr::ordered_map<int, int, std::less<int>, counting_cage> map;
  for (int i = 0; i < 1000; i++) {
    list.push_back(i);
    map.emplace(i, -i);
  }
  CHECK(counting_allocator::allocations == 2 + 2000);  // sentinels + nodes
  CHECK(list.size() == 1000 && list.back() == 999);
  CHECK(map.valid() && map.at(500) == -500);
  CHECK(counting_cage::contains(&list.front()));
  list.clear();
  CHECK(counting_allocator::frees == 1000);

  auto p = cptr::make<double, counting_cage>(2.5);
  CHECK(*p == 2.5);
  CHECK(p.bits() ==
        std::uint32_t(reinterpret_cast<std::byte*>(p.get()) - base));
  cptr::destroy(p);
}

TEST(user_cage_reports_exhaustion) {
  bool threw = false;
  try {
    // 16 MiB cage; one 8 MiB block fits, the second does not.
    void* a = tiny_cage::allocate(8 << 20, 16);
    CHECK(a != nullptr);
    CHECK(tiny_cage::try_allocate(8 << 20, 16) == nullptr);
    tiny_cage::allocate(8 << 20, 16);
  } catch (const std::bad_alloc&) {
    threw = true;
  }
  CHECK(threw);
}

TEST(bump_allocator_aligns_and_commits) {
  struct tag {};
  using cage = cptr::user_cage<tag, cptr::bump_allocator>;
  auto* a = static_cast<char*>(cage::allocate(1, 1));
  auto* b = static_cast<char*>(cage::allocate(64, 64));
  CHECK(reinterpret_cast<std::uintptr_t>(b) % 64 == 0);
  CHECK(b > a);
  // Freshly committed memory is writable across a commit-chunk boundary.
  auto* big = static_cast<char*>(cage::allocate(3 << 20, 16));
  big[0] = 1;
  big[(3 << 20) - 1] = 2;
  CHECK(big[0] + big[(3 << 20) - 1] == 3);
}

namespace {
int flaky_constructions = 0;
// An allocator whose constructor fails the first few times.
struct flaky_allocator {
  explicit flaky_allocator(std::span<std::byte>) {
    if (++flaky_constructions < 9) {
      throw std::bad_alloc();
    }
  }
  void* allocate(std::size_t, std::size_t) noexcept { return nullptr; }
  void deallocate(void*) noexcept {}
};
struct flaky_tag {};
using flaky_cage = cptr::user_cage<flaky_tag, flaky_allocator>;

#if defined(__linux__)
std::size_t vm_size_kib() {
  std::FILE* f = std::fopen("/proc/self/status", "r");
  char line[256];
  std::size_t kib = 0;
  while (f && std::fgets(line, sizeof line, f)) {
    if (std::sscanf(line, "VmSize: %zu", &kib) == 1) {
      break;
    }
  }
  if (f) {
    std::fclose(f);
  }
  return kib;
}
#endif
}  // namespace

// A failed init() kept the 4 GiB reservation: eight failures and a success
// left 36 GiB of address space reserved.
TEST(user_cage_failed_init_releases_the_reservation) {
#if defined(__linux__)
  std::size_t before = vm_size_kib();
#endif
  for (int i = 0; i < 8; i++) {
    CHECK(!flaky_cage::init());
  }
  CHECK(flaky_cage::base() == 0);
  CHECK(flaky_cage::init());
#if defined(__linux__)
  std::size_t grown_gib = (vm_size_kib() - before) >> 20;
  if (grown_gib > 5) {
    std::printf("  address space grew by %zu GiB\n", grown_gib);
  }
  CHECK(grown_gib <= 5);  // one 4 GiB cage, plus slack
#endif
}

TEST(user_cage_zero_byte_requests_are_distinct) {
  struct tag {};
  using cage = cptr::user_cage<tag, cptr::bump_allocator>;
  void* a = cage::allocate(0, 8);
  void* b = cage::allocate(0, 8);
  void* c = cage::allocate(8, 8);
  CHECK(a != b && b != c && a != c);
}

#if defined(__SANITIZE_ADDRESS__)
#  define CPTR_TEST_NO_FORK 1
#elif defined(__has_feature)
#  if __has_feature(address_sanitizer)
#    define CPTR_TEST_NO_FORK 1
#  endif
#endif

// fork() while another thread holds bump_allocator's lock left the child
// spinning for ever on its first allocation.
TEST(bump_allocator_survives_fork) {
#if defined(_WIN32) || defined(CPTR_TEST_NO_FORK)
  std::printf("  (skipped: needs fork)\n");
#else
  struct tag {};
  using cage = cptr::user_cage<tag, cptr::bump_allocator, 36, 4>;
  CHECK(cage::init());
  std::atomic<bool> stop{false};
  std::thread churn([&] {
    while (!stop.load(std::memory_order_relaxed) &&
           cage::allocator().used() < (std::size_t(1) << 30)) {
      (void)cage::allocate(16, 16);
    }
  });
  int stuck = 0;
  for (int i = 0; i < 200; i++) {
    std::fflush(stdout);
    pid_t pid = fork();
    if (pid == 0) {
      alarm(2);
      (void)cage::allocate(16, 16);
      _exit(0);
    }
    int status = 0;
    waitpid(pid, &status, 0);
    stuck += WIFSIGNALED(status) && WTERMSIG(status) == SIGALRM;
  }
  stop = true;
  churn.join();
  if (stuck) {
    std::printf("  %d of 200 children hung\n", stuck);
  }
  CHECK(stuck == 0);
#endif
}
