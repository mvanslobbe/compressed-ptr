#include <cstring>
#include <memory_resource>
#include <random>
#include <set>
#include <thread>
#include <vector>

#include "cptr/all.hpp"
#include "check.hpp"

namespace {
struct small_cage : cptr::cage<small_cage, 24> {};
struct wide_cage : cptr::cage<wide_cage, 35, 3> {};
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
  for (std::size_t size : {1, 7, 8, 24, 100, 128, 129, 300, 5000, 40000,
                           1 << 20}) {
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
  using C = cptr::default_cage;
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
