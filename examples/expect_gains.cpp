// What you gain, measured on your machine: memory per element and time per
// operation for the standard containers against their cptr counterparts.
//
//   ./example_expect_gains [elements]     (default 1,000,000)
//
// Memory is the growth of the resident set while a container is built, so
// it includes the allocator's own overhead. Times are the best of five
// passes. Build in Release mode.
#include <algorithm>
#include <chrono>
#include <cstdint>
#include <cstdio>
#include <cstdlib>
#include <list>
#include <map>
#include <random>
#include <unordered_map>
#include <vector>

#include "cptr/all.hpp"

#if defined(_WIN32)
#  ifndef NOMINMAX
#    define NOMINMAX
#  endif
#  include <windows.h>
// psapi.h needs the types from windows.h.
#  include <psapi.h>
#elif defined(__APPLE__)
#  include <mach/mach.h>
#else
#  include <unistd.h>
#endif

namespace {

std::size_t rss() {
#if defined(_WIN32)
  PROCESS_MEMORY_COUNTERS c;
  GetProcessMemoryInfo(GetCurrentProcess(), &c, sizeof c);
  return c.WorkingSetSize;
#elif defined(__APPLE__)
  mach_task_basic_info info;
  mach_msg_type_number_t count = MACH_TASK_BASIC_INFO_COUNT;
  task_info(mach_task_self(), MACH_TASK_BASIC_INFO,
            reinterpret_cast<task_info_t>(&info), &count);
  return info.resident_size;
#else
  long pages = 0, resident = 0;
  if (std::FILE* f = std::fopen("/proc/self/statm", "r")) {
    if (std::fscanf(f, "%ld %ld", &pages, &resident) != 2) {
      resident = 0;
    }
    std::fclose(f);
  }
  return std::size_t(resident) * std::size_t(sysconf(_SC_PAGESIZE));
#endif
}

template <class F>
double best_ns(std::size_t items, F f) {
  double best = 1e300;
  for (int pass = 0; pass < 5; pass++) {
    auto t0 = std::chrono::steady_clock::now();
    f();
    auto t1 = std::chrono::steady_clock::now();
    best = std::min(best,
                    std::chrono::duration<double, std::nano>(t1 - t0).count());
  }
  return best / double(items);
}

volatile std::uint64_t sink;

struct result {
  double bytes, ns;
};

template <class List>
result measure_list(List& l, std::uint32_t n) {
  std::size_t before = rss();
  for (std::uint32_t i = 0; i < n; i++) {
    l.push_back(i);
  }
  double bytes = double(rss() - before) / n;
  double ns = best_ns(n, [&] {
    std::uint64_t sum = 0;
    for (std::uint32_t v : l) {
      sum += v;
    }
    sink = sum;
  });
  return {bytes, ns};
}

template <class Map>
result measure_map(Map& m, const std::vector<std::uint32_t>& keys,
                   const std::vector<std::uint32_t>& lookups) {
  std::size_t before = rss();
  for (std::uint32_t k : keys) {
    m.emplace(k, k);
  }
  double bytes = double(rss() - before) / double(keys.size());
  double ns = best_ns(lookups.size(), [&] {
    std::uint64_t sum = 0;
    for (std::uint32_t k : lookups) {
      sum += m.find(k)->second;
    }
    sink = sum;
  });
  return {bytes, ns};
}

void row(const char* what, const char* op, result std_r, result cptr_r) {
  std::printf(
      "%-30s %7.1f B %7.1f B %5.0f%%   %-6s %6.1f ns %6.1f ns %5.0f%%\n", what,
      std_r.bytes, cptr_r.bytes, 100.0 * (cptr_r.bytes / std_r.bytes - 1.0), op,
      std_r.ns, cptr_r.ns, 100.0 * (cptr_r.ns / std_r.ns - 1.0));
}

}  // namespace

int main(int argc, char** argv) {
  std::uint32_t n = argc > 1 ? std::uint32_t(std::atol(argv[1])) : 1000000;
  std::vector<std::uint32_t> keys(n), lookups(n);
  // Distinct keys spread over the whole 32-bit range, as real keys are.
  // (Dense keys 0 to n - 1 flatter std::unordered_map, whose identity hash
  // then puts every key in a bucket of its own.)
  for (std::uint32_t i = 0; i < n; i++) {
    keys[i] = lookups[i] = i * 2654435761u;
  }
  std::shuffle(keys.begin(), keys.end(), std::mt19937(1));
  std::shuffle(lookups.begin(), lookups.end(), std::mt19937(2));

  std::printf("%u elements of uint32_t\n\n", n);
  std::printf("%-30s %9s %9s %6s   %-6s %9s %9s %6s\n", "", "std", "cptr",
              "change", "", "std", "cptr", "change");

  // Every container stays alive to the end, so none reuses another's
  // freed memory.
  std::list<std::uint32_t> std_list;
  cptr::list<std::uint32_t> cptr_list;
  result a = measure_list(std_list, n);
  result b = measure_list(cptr_list, n);
  row("std::list / cptr::list", "walk", a, b);

  std::map<std::uint32_t, std::uint32_t> std_map;
  cptr::ordered_map<std::uint32_t, std::uint32_t> cptr_map;
  a = measure_map(std_map, keys, lookups);
  b = measure_map(cptr_map, keys, lookups);
  row("std::map / ordered_map", "find", a, b);

  std::unordered_map<std::uint32_t, std::uint32_t> std_hash;
  cptr::unordered_map<std::uint32_t, std::uint32_t> cptr_hash;
  a = measure_map(std_hash, keys, lookups);
  b = measure_map(cptr_hash, keys, lookups);
  row("unordered_map", "find", a, b);

  struct raw_node {
    raw_node *left, *right;
    std::uint32_t key, size;
  };
  struct small_node {
    cptr::ptr_pair<small_node> children;
    std::uint32_t key, size;
  };
  std::printf(
      "\nyour own tree node: %zu bytes with raw pointers, %zu with "
      "cptr::ptr_pair\n",
      sizeof(raw_node), sizeof(small_node));
}
