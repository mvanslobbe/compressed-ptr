#include <atomic>
#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <memory_resource>
#include <random>
#include <set>
#include <thread>
#include <type_traits>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

#if !defined(_WIN32)
#  include <sys/wait.h>
#  include <unistd.h>
#endif

namespace {
struct small_cage : cptr::cage<small_cage, 24> {};
struct wide_cage : cptr::cage<wide_cage, 35, 3> {};
struct decommit_cage : cptr::cage<decommit_cage, 30> {};
struct coalesce_cage : cptr::cage<coalesce_cage, 30> {};
struct churn_cage : cptr::cage<churn_cage, 30> {};
}  // namespace

TEST(reserve_is_aligned) {
  CHECK(cptr::default_cage::init());
  CHECK(cptr::default_cage::base() % cptr::default_cage::size == 0);
}

TEST(null_round_trips) {
  CHECK(cptr::default_cage::compress(nullptr) == 0);
  CHECK(cptr::default_cage::decompress(0) == nullptr);
}

TEST(allocations_are_inside_and_round_trip) {
  using C = cptr::default_cage;
  std::vector<void*> blocks;
  for (std::size_t size :
       {1, 7, 8, 24, 100, 128, 129, 300, 5000, 40000, 1 << 20}) {
    void* p = C::allocate(size, 8);
    CHECK(C::contains(p));
    CHECK(C::compress(p) != 0);
    CHECK(C::decompress(C::compress(p)) == p);
    std::memset(p, 0xAB, size);
    blocks.push_back(p);
  }
  for (void* p : blocks) {
    C::deallocate(p);
  }
}

TEST(alignment_is_honoured) {
  using C = cptr::default_cage;
  for (std::size_t align : {8, 16, 32, 64, 128, 4096}) {
    void* p = C::allocate(align + 3, align);
    CHECK(reinterpret_cast<std::uintptr_t>(p) % align == 0);
    C::deallocate(p);
  }
}

TEST(freed_blocks_are_reused) {
  using C = cptr::default_cage;
  void* a = C::allocate(24, 8);
  C::deallocate(a);
  void* b = C::allocate(24, 8);
  CHECK(a == b);
  C::deallocate(b);
}

TEST(large_blocks_return_memory) {
  using C = decommit_cage;
  std::size_t before = C::committed_bytes();
  void* p = C::allocate(8 << 20);
  CHECK(C::committed_bytes() >= before + (8 << 20) - C::span_size);
  std::memset(p, 1, 8 << 20);
  C::deallocate(p);
  CHECK(C::committed_bytes() <= before + C::span_size);
  void* q = C::allocate(8 << 20);
  CHECK(q == p);
  C::deallocate(q);
}

TEST(no_overlap_under_random_use) {
  using C = cptr::default_cage;
  std::mt19937 rng(42);
  std::vector<std::pair<char*, std::size_t>> live;
  for (int i = 0; i < 20000; i++) {
    if (!live.empty() && rng() % 3 == 0) {
      std::size_t k = rng() % live.size();
      auto [p, n] = live[k];
      for (std::size_t j = 0; j < n; j++) {
        if (p[j] != char(n)) {
          CHECK(!"block was overwritten");
          break;
        }
      }
      C::deallocate(p);
      live[k] = live.back();
      live.pop_back();
    } else {
      std::size_t n = 1 + rng() % (rng() % 8 == 0 ? 70000 : 200);
      char* p = static_cast<char*>(C::allocate(n, 8));
      std::memset(p, char(n), n);
      live.push_back({p, n});
    }
  }
  for (auto [p, n] : live) {
    C::deallocate(p);
  }
}

TEST(exhausting_a_cage_fails_cleanly) {
  std::vector<void*> blocks;
  while (void* p = small_cage::try_allocate(1 << 20)) {
    blocks.push_back(p);
  }
  CHECK(blocks.size() >= 14 && blocks.size() < 16);
  bool threw = false;
  try {
    small_cage::allocate(1 << 20);
  } catch (const std::bad_alloc&) {
    threw = true;
  }
  CHECK(threw);
  for (void* p : blocks) {
    small_cage::deallocate(p);
  }
  CHECK(small_cage::try_allocate(1 << 20) != nullptr);
}

TEST(shifted_cage_spans_32_gib) {
  CHECK(wide_cage::size == std::size_t(32) << 30);
  if (!wide_cage::init()) {
    std::printf("  (skipped: cannot reserve 32 GiB of address space)\n");
    return;
  }
  void* p = wide_cage::allocate(16, 8);
  CHECK(wide_cage::decompress(wide_cage::compress(p)) == p);
  cptr::ptr<int, wide_cage> cp(static_cast<int*>(p));
  *cp = 7;
  CHECK(*static_cast<int*>(p) == 7);
  wide_cage::deallocate(p);
}

TEST(pmr_vector_lives_in_cage) {
  std::pmr::vector<int> v(cptr::default_cage::resource());
  for (int i = 0; i < 1000; i++) {
    v.push_back(i);
  }
  CHECK(cptr::default_cage::contains(v.data()));
  CHECK(v[999] == 999);
}

TEST(allocator_with_std_containers) {
  std::set<int, std::less<>, cptr::allocator<int>> s;
  for (int i = 0; i < 100; i++) {
    s.insert(i);
  }
  CHECK(cptr::default_cage::contains(&*s.find(50)));
}

TEST(concurrent_allocation) {
  using C = cptr::default_cage;
  std::vector<std::thread> threads;
  std::atomic<int> errors{0};
  for (int t = 0; t < 4; t++) {
    threads.emplace_back([&, t] {
      std::vector<int*> mine;
      for (int i = 0; i < 20000; i++) {
        int* p = static_cast<int*>(C::allocate(sizeof(int) * 4, 8));
        p[0] = t;
        p[3] = i;
        mine.push_back(p);
      }
      for (int i = 0; i < 20000; i++) {
        if (mine[i][0] != t || mine[i][3] != i) {
          errors++;
        }
        C::deallocate(mine[i]);
      }
    });
  }
  for (auto& th : threads) {
    th.join();
  }
  CHECK(errors == 0);
}

TEST(sixteen_byte_alignment_uses_tight_classes) {
  using C = cptr::default_cage;
  std::size_t before = C::allocated_bytes();
  void* a = C::allocate(48, 16);
  void* b = C::allocate(200, 16);
  void* c = C::allocate(64, 64);
  CHECK(reinterpret_cast<std::uintptr_t>(a) % 16 == 0);
  CHECK(reinterpret_cast<std::uintptr_t>(b) % 16 == 0);
  CHECK(reinterpret_cast<std::uintptr_t>(c) % 64 == 0);
  CHECK(C::allocated_bytes() - before == 48 + 208 + 64);
  C::deallocate(a);
  C::deallocate(b);
  C::deallocate(c);
}

TEST(free_large_runs_coalesce) {
  using C = coalesce_cage;
  constexpr std::size_t mib = 1 << 20;
  char* a = static_cast<char*>(C::allocate(mib));
  char* b = static_cast<char*>(C::allocate(mib));
  char* c = static_cast<char*>(C::allocate(mib));
  void* guard = C::allocate(mib);
  CHECK(b == a + mib && c == b + mib);
  C::deallocate(a);
  C::deallocate(c);
  C::deallocate(b);
  // The three runs merged, so a 3 MiB block fits where they were.
  void* big = C::allocate(3 * mib);
  CHECK(big == a);
  C::deallocate(big);
  C::deallocate(guard);
}

namespace {
struct left_base {
  virtual ~left_base() = default;
  long l = 1;
};
struct right_base {
  virtual ~right_base() = default;
  long r = 2;
};
struct both : left_base, right_base {};
}  // namespace

TEST(destroy_through_secondary_base) {
  using C = cptr::default_cage;
  std::size_t before = C::allocated_bytes();
  cptr::ptr<both> full = cptr::make<both>();
  cptr::ptr<right_base> base = full;
  CHECK(static_cast<void*>(base.get()) != static_cast<void*>(full.get()));
  cptr::destroy(base);
  CHECK(C::allocated_bytes() == before);
  void* again = C::allocate(sizeof(both), alignof(both));
  CHECK(again == static_cast<void*>(full.get()));
  C::deallocate(again);
}

namespace {
struct untouched_cage : cptr::cage<untouched_cage, 24> {};
struct tiny_cage : cptr::cage<tiny_cage, 24> {};
}  // namespace

TEST(statistics_before_first_use) {
  CHECK(untouched_cage::base() == 0);
  CHECK(untouched_cage::allocated_bytes() == 0);
  CHECK(untouched_cage::committed_bytes() == 0);
  int local = 0;
  CHECK(!untouched_cage::contains(&local));
}

TEST(zero_byte_and_null_requests) {
  using C = cptr::default_cage;
  void* a = C::allocate(0);
  void* b = C::allocate(0);
  CHECK(a && b && a != b);
  C::deallocate(a);
  C::deallocate(b);
  C::deallocate(nullptr);
  cptr::destroy(cptr::ptr<int>());
}

TEST(alignment_below_granularity_is_raised) {
  if (!wide_cage::init()) {
    return;
  }
  void* p = wide_cage::allocate(3, 1);
  CHECK(reinterpret_cast<std::uintptr_t>(p) % wide_cage::granularity == 0);
  wide_cage::deallocate(p);
}

TEST(pmr_resource_equality) {
  auto* r = cptr::default_cage::resource();
  CHECK(r->is_equal(*r));
  CHECK(!r->is_equal(*std::pmr::new_delete_resource()));
  CHECK(r != small_cage::resource());
}

TEST(allocator_rejects_overflowing_counts) {
  bool threw = false;
  try {
    (void)cptr::allocator<long>().allocate(std::size_t(-1) / 2);
  } catch (const std::bad_array_new_length&) {
    threw = true;
  }
  CHECK(threw);
  cptr::allocator<int> ints;
  cptr::allocator<long> longs(ints);
  CHECK(ints == longs);
}

TEST(impossible_requests_fail) {
  using C = tiny_cage;
  CHECK(C::try_allocate(16, 2 * C::span_size) == nullptr);
  CHECK(C::try_allocate(C::size) == nullptr);
  CHECK(C::try_allocate(C::size - C::span_size + 1) == nullptr);
}

TEST(filling_a_cage_span_by_span) {
  using C = tiny_cage;
  std::vector<void*> blocks;
  // Spans larger than the largest size class each take one whole span; the
  // final commit step is clipped at the last usable span. The first and last
  // spans are never handed out.
  while (void* p = C::try_allocate(C::span_size)) {
    blocks.push_back(p);
  }
  CHECK(blocks.size() == C::span_count - 2);
  CHECK(C::committed_bytes() == C::usable_end - C::span_size);
  // No room for a new slab either.
  CHECK(C::try_allocate(16, 8) == nullptr);
  for (void* p : blocks) {
    C::deallocate(p);
  }
  CHECK(C::committed_bytes() == 0);
  // Everything merged back into one run.
  void* all = C::try_allocate(C::usable_end - C::span_size);
  CHECK(all != nullptr);
  CHECK(C::try_allocate(C::span_size) == nullptr);
  C::deallocate(all);
}

TEST(size_class_table) {
  // Normally evaluated at compile time; run it again so its logic is tested.
  auto sizes = cptr::detail::make_class_sizes();
  CHECK(sizes == cptr::detail::kClassSizes);
  CHECK(sizes.size() == cptr::detail::class_count());
  for (std::size_t i = 1; i < sizes.size(); i++) {
    CHECK(sizes[i] > sizes[i - 1]);
  }
}

// Freeing every small block gives the slabs' memory back to the OS: at
// once with trim(), and otherwise once the empty slabs have been unused for
// a quarter of a second. The cage can be filled again afterwards.
namespace {
template <class C>
std::size_t fill_and_free(std::vector<void*>& blocks) {
  for (int i = 0; i < 200000; i++) {
    blocks.push_back(C::allocate(std::size_t(16 + (i % 15) * 16)));
  }
  std::size_t peak = C::committed_bytes();
  CHECK(peak >= std::size_t(200000) * 16);
  // Free in an order unrelated to allocation order.
  for (std::size_t i = 0; i < blocks.size(); i += 2) {
    C::deallocate(blocks[i]);
  }
  for (std::size_t i = 1; i < blocks.size(); i += 2) {
    C::deallocate(blocks[i]);
  }
  blocks.clear();
  CHECK(C::allocated_bytes() == 0);
  return peak;
}
}  // namespace

TEST(freed_small_blocks_are_decommitted) {
  using C = churn_cage;
  std::vector<void*> blocks;
  // At most one slab for each of the 15 size classes used may stay
  // committed; each is a single span. The bump region also commits up to
  // 1 MiB ahead.
  constexpr std::size_t kKept = 15 * C::span_size + (1 << 20);
  for (int round = 0; round < 2; round++) {
    std::size_t peak = fill_and_free<C>(blocks);
    std::size_t kept = C::committed_bytes();
    C::trim();
    std::printf(
        "  round %d: committed %zu KiB at peak, %zu KiB after free, "
        "%zu KiB after trim\n",
        round, peak / 1024, kept / 1024, C::committed_bytes() / 1024);
    CHECK(C::committed_bytes() <= kKept);
  }
  // Without trim(): after the retention time, the next slab that becomes
  // empty purges the others.
  (void)fill_and_free<C>(blocks);
  std::this_thread::sleep_for(std::chrono::milliseconds(300));
  for (int i = 0; i < 20000; i++) {
    blocks.push_back(C::allocate(16));
  }
  for (void* p : blocks) {
    C::deallocate(p);
  }
  blocks.clear();
  std::printf("  after 300 ms: committed %zu KiB\n",
              C::committed_bytes() / 1024);
  CHECK(C::committed_bytes() <= kKept + 8 * C::span_size);
}

namespace {
struct parked_cage : cptr::cage<parked_cage, 24> {};
struct late_free_cage : cptr::cage<late_free_cage, 24> {};
struct stats_cage : cptr::cage<stats_cage, 28> {};
}  // namespace

// A cage full of empty slabs, parked for reuse, must still serve a large
// allocation at once: take_spans() purged only slabs parked before time 0,
// that is none of them, so the 4 MiB request failed until trim().
TEST(full_cage_of_parked_slabs_serves_large_blocks) {
  using C = parked_cage;
  std::thread t([] {
    std::vector<void*> blocks;
    while (void* p = C::try_allocate(1024)) {
      blocks.push_back(p);
    }
    for (void* p : blocks) {
      C::deallocate(p);
    }
  });  // the thread's exit empties its cache, so every slab is parked
  t.join();
  CHECK(C::allocated_bytes() == 0);
  void* big = C::try_allocate(4 << 20);
  CHECK(big != nullptr);
  C::deallocate(big);
}

// A thread_local object constructed before the thread's cache is destroyed
// after it. Its frees used to go into the destroyed cache and were lost:
// allocated_bytes() grew by 384 bytes per thread.
namespace {
struct late_holder {
  void* blocks[8] = {};
  ~late_holder() {
    for (void* p : blocks) {
      late_free_cage::deallocate(p);
    }
    // And allocating after the cache is gone works too.
    late_free_cage::deallocate(late_free_cage::allocate(48));
  }
};
}  // namespace

TEST(frees_after_the_thread_cache_is_gone) {
  for (int round = 0; round < 3; round++) {
    std::thread t([] {
      thread_local late_holder h;  // constructed before the cache ...
      for (void*& p : h.blocks) {
        p = late_free_cage::allocate(48);  // ... which is destroyed first
      }
    });
    t.join();
    CHECK(late_free_cage::allocated_bytes() == 0);
  }
#if !defined(_WIN32)
  // The same at program exit: a container with static storage duration in
  // the main thread is destroyed after the main thread's cache.
  std::fflush(stdout);
  pid_t pid = fork();
  if (pid == 0) {
    static void (*check_at_exit)() = [] {
      _exit(late_free_cage::allocated_bytes() == 0 ? 0 : 1);
    };
    std::atexit(check_at_exit);  // runs after the vector is destroyed
    static std::pmr::vector<int> v(late_free_cage::resource());
    v.assign(10, 1);
    std::exit(0);
  }
  int status = 0;
  waitpid(pid, &status, 0);
  CHECK(WIFEXITED(status) && WEXITSTATUS(status) == 0);
#endif
}

// allocated_bytes() lowered the global count under the lock but a thread's
// cached count only after releasing it, so a reading in between came out
// near 2^64 (about 650 times a second with one thread allocating and
// another freeing).
TEST(allocated_bytes_never_wraps) {
  using C = stats_cage;
  std::atomic<bool> stop{false};
  std::atomic<void*> slot{nullptr};
  std::thread producer([&] {
    while (!stop.load(std::memory_order_relaxed)) {
      void* p = C::allocate(64);
      void* expected = nullptr;
      while (!slot.compare_exchange_weak(expected, p) && !stop.load()) {
        expected = nullptr;
      }
      if (stop.load()) {
        C::deallocate(p);
      }
    }
  });
  std::thread consumer([&] {
    while (!stop.load(std::memory_order_relaxed)) {
      if (void* p = slot.exchange(nullptr)) {
        C::deallocate(p);
      }
    }
  });
  long wrapped = 0;
  auto end = std::chrono::steady_clock::now() + std::chrono::seconds(1);
  while (std::chrono::steady_clock::now() < end) {
    wrapped += C::allocated_bytes() > (std::size_t(1) << 40);
  }
  stop = true;
  producer.join();
  consumer.join();
  C::deallocate(slot.exchange(nullptr));
  if (wrapped) {
    std::printf("  %ld readings wrapped\n", wrapped);
  }
  CHECK(wrapped == 0);
}

// The size class is computed in closed form. Check it against the search
// it replaced: the smallest class of at least `bytes` that is a multiple of
// `align`, for every alignment and every small size.
TEST(size_class_matches_a_search) {
  using cptr::detail::kClassSizes;
  auto search = [](std::size_t bytes, std::size_t align) {
    for (std::size_t i = 0; i < kClassSizes.size(); i++) {
      if (kClassSizes[i] >= bytes && kClassSizes[i] % align == 0) {
        return int(i);
      }
    }
    return -1;
  };
  long mismatches = 0;
  for (std::size_t align = 1; align <= cptr::detail::kMaxSmall; align *= 2) {
    for (std::size_t bytes = 1; bytes <= cptr::detail::kMaxSmall; bytes++) {
      mismatches +=
          cptr::detail::size_class(bytes, align) != search(bytes, align);
    }
  }
  CHECK(mismatches == 0);
}

// Size classes, compress() and decompress() work in constant expressions,
// the latter two for null only.
static_assert(cptr::detail::size_class(1, 1) == 0);
static_assert(cptr::detail::size_class(300, 16) == 24);   // 320
static_assert(cptr::detail::size_class(300, 128) == 25);  // 384
static_assert(cptr::detail::size_class(32768, 4096) ==
              int(cptr::detail::kClassSizes.size()) - 1);
static_assert(cptr::default_cage::compress(nullptr) == 0);
static_assert(cptr::default_cage::decompress(0) == nullptr);
static_assert(wide_cage::compress(nullptr) == 0);

namespace {
inline constexpr int some_object = 0;
template <class Cage>
concept compresses_nonnull_at_compile_time = requires {
  typename std::integral_constant<std::uint32_t, Cage::compress(&some_object)>;
};
template <class Cage>
concept decompresses_nonzero_at_compile_time = requires {
  typename std::integral_constant<bool, Cage::decompress(16) != nullptr>;
};
}  // namespace
static_assert(!compresses_nonnull_at_compile_time<cptr::default_cage>);
static_assert(!decompresses_nonzero_at_compile_time<cptr::default_cage>);

// compress() is a mask of the low bits, which relies on every cage being
// aligned to its own size.
TEST(compress_is_the_offset) {
  void* p = wide_cage::allocate(64, 8);
  std::uintptr_t offset =
      reinterpret_cast<std::uintptr_t>(p) - wide_cage::base();
  CHECK(wide_cage::base() % wide_cage::size == 0);
  CHECK(wide_cage::compress(p) == offset >> 3);
  CHECK(wide_cage::decompress(wide_cage::compress(p)) == p);
  wide_cage::deallocate(p);
}
