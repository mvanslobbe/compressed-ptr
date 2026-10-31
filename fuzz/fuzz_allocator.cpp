// libFuzzer target for the cage allocator. The input is a sequence of
// allocate, free, trim and cross-thread operations on a 16 MiB cage and a
// 32 GiB cage with 8-byte granularity. Every block is checked for being
// inside its cage, aligned, not overlapping any other live block, and
// keeping its contents (a pattern written on allocation) until it is freed;
// its end must compress and round-trip. After each input every block is
// freed and allocated_bytes() must be exactly zero.
//
// Build: cmake -DCOMPRESSED_PTR_BUILD_FUZZERS=ON with clang, then run
//   ./build/fuzz_allocator -max_total_time=60
#include <fuzzer/FuzzedDataProvider.h>

#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <map>
#include <thread>
#include <vector>

#include "cptr/cage.hpp"

namespace {

struct small_cage : cptr::cage<small_cage, 24> {};
struct wide_cage : cptr::cage<wide_cage, 35, 3> {};

#define FUZZ_CHECK(cond)                                                    \
  do {                                                                      \
    if (!(cond)) {                                                          \
      std::fprintf(stderr, "%s:%d: check failed: %s\n", __FILE__, __LINE__, \
                   #cond);                                                  \
      std::abort();                                                         \
    }                                                                       \
  } while (0)

struct block {
  std::size_t size;
  unsigned char pattern;
};

template <class Cage>
struct model {
  std::map<std::uintptr_t, block> live;  // start -> block

  void check_pattern(std::uintptr_t start, const block& b) {
    const auto* bytes = reinterpret_cast<const unsigned char*>(start);
    for (std::size_t i = 0; i < b.size; i++) {
      FUZZ_CHECK(bytes[i] == b.pattern);
    }
  }

  void allocate(std::size_t size, std::size_t align, unsigned char pattern) {
    void* p = Cage::try_allocate(size, align);
    if (!p) {
      return;  // full: allowed
    }
    auto start = reinterpret_cast<std::uintptr_t>(p);
    std::size_t effective_size = size ? size : 1;
    std::size_t effective_align =
        align < Cage::granularity ? Cage::granularity : align;
    FUZZ_CHECK(Cage::contains(p));
    FUZZ_CHECK(start % effective_align == 0);
    FUZZ_CHECK(Cage::decompress(Cage::compress(p)) == p);
    auto* end = static_cast<char*>(p) + effective_size;
    if (reinterpret_cast<std::uintptr_t>(end) % Cage::granularity == 0) {
      FUZZ_CHECK(Cage::decompress(Cage::compress(end)) == end);
    }
    // No overlap with the neighbours.
    auto next = live.lower_bound(start);
    if (next != live.end()) {
      FUZZ_CHECK(start + effective_size <= next->first);
    }
    if (next != live.begin()) {
      auto prev = std::prev(next);
      FUZZ_CHECK(prev->first + prev->second.size <= start);
    }
    std::memset(p, pattern, effective_size);
    live.emplace(start, block{effective_size, pattern});
  }

  void free_at(std::size_t index) {
    if (live.empty()) {
      return;
    }
    auto it = live.begin();
    std::advance(it, index % live.size());
    check_pattern(it->first, it->second);
    Cage::deallocate(reinterpret_cast<void*>(it->first));
    live.erase(it);
  }

  // Free some blocks on another thread, which then allocates and exits, so
  // that its cache is flushed.
  void free_on_thread(std::size_t count, unsigned char pattern) {
    std::vector<std::pair<std::uintptr_t, block>> moved;
    while (count-- && !live.empty()) {
      auto it = std::prev(live.end());
      check_pattern(it->first, it->second);
      moved.push_back(*it);
      live.erase(it);
    }
    std::vector<void*> theirs;
    std::thread t([&] {
      for (auto& m : moved) {
        Cage::deallocate(reinterpret_cast<void*>(m.first));
      }
      for (int i = 0; i < 8; i++) {
        if (void* p = Cage::try_allocate(std::size_t(16 + i * 24))) {
          std::memset(p, pattern, std::size_t(16 + i * 24));
          theirs.push_back(p);
        }
      }
    });
    t.join();
    // Blocks allocated by the thread are freed here, on another thread.
    for (void* p : theirs) {
      Cage::deallocate(p);
    }
  }

  // Every live block is counted, rounded up to its size class.
  void check_accounting() {
    std::size_t bytes = 0;
    for (auto& [start, b] : live) {
      bytes += b.size;
    }
    FUZZ_CHECK(Cage::allocated_bytes() >= bytes);
  }

  void free_all() {
    while (!live.empty()) {
      free_at(0);
    }
    FUZZ_CHECK(Cage::allocated_bytes() == 0);
  }
};

template <class Cage>
void run(FuzzedDataProvider& in) {
  static model<Cage> m;
  unsigned char pattern = 1;
  while (in.remaining_bytes() > 0) {
    switch (in.ConsumeIntegralInRange<int>(0, 9)) {
      case 0:
      case 1:
      case 2:
      case 3: {
        // Mostly small blocks, sometimes large ones.
        std::size_t size = in.ConsumeBool()
                               ? in.ConsumeIntegralInRange<std::size_t>(0, 512)
                               : in.ConsumeIntegralInRange<std::size_t>(
                                     0, std::size_t(1) << 21);
        std::size_t align = std::size_t(1)
                            << in.ConsumeIntegralInRange<int>(0, 16);
        m.allocate(size, align, pattern++);
        break;
      }
      case 4:
      case 5:
      case 6:
        m.free_at(in.ConsumeIntegral<std::size_t>());
        break;
      case 7:
        Cage::trim();
        break;
      case 8:
        m.free_on_thread(in.ConsumeIntegralInRange<std::size_t>(0, 64),
                         pattern++);
        break;
      case 9:
        m.check_accounting();
        break;
    }
    if (pattern == 0) {
      pattern = 1;
    }
  }
  m.free_all();
}

}  // namespace

extern "C" int LLVMFuzzerTestOneInput(const std::uint8_t* data,
                                      std::size_t size) {
  FuzzedDataProvider in(data, size);
  if (in.ConsumeBool()) {
    run<small_cage>(in);
  } else {
    run<wide_cage>(in);
  }
  return 0;
}
