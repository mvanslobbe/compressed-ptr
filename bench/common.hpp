#pragma once

#include <algorithm>
#include <chrono>
#include <cstddef>
#include <cstdint>
#include <vector>

#if defined(_WIN32)
#  ifndef NOMINMAX
#    define NOMINMAX
#  endif
#  include <windows.h>
#  include <psapi.h>
#elif defined(__APPLE__)
#  include <mach/mach.h>
#else
#  include <cstdio>
#  include <unistd.h>
#endif

namespace bench {

// Resident set size of this process, in bytes.
inline std::size_t current_rss() {
#if defined(_WIN32)
  PROCESS_MEMORY_COUNTERS counters;
  GetProcessMemoryInfo(GetCurrentProcess(), &counters, sizeof(counters));
  return counters.WorkingSetSize;
#elif defined(__APPLE__)
  mach_task_basic_info info;
  mach_msg_type_number_t count = MACH_TASK_BASIC_INFO_COUNT;
  task_info(mach_task_self(), MACH_TASK_BASIC_INFO,
            reinterpret_cast<task_info_t>(&info), &count);
  return info.resident_size;
#else
  long pages = 0, resident = 0;
  if (FILE* f = std::fopen("/proc/self/statm", "r")) {
    if (std::fscanf(f, "%ld %ld", &pages, &resident) != 2) {
      resident = 0;
    }
    std::fclose(f);
  }
  return static_cast<std::size_t>(resident) *
         static_cast<std::size_t>(sysconf(_SC_PAGESIZE));
#endif
}

// Best of |reps| runs, in nanoseconds per |items|.
template <class F>
double time_ns(int reps, std::size_t items, F&& f) {
  double best = 1e300;
  for (int r = 0; r < reps; r++) {
    auto start = std::chrono::steady_clock::now();
    f();
    auto stop = std::chrono::steady_clock::now();
    best = std::min(
        best, std::chrono::duration<double, std::nano>(stop - start).count());
  }
  return best / double(items);
}

// Keep a value alive so the optimiser cannot drop the work producing it.
template <class T>
inline void keep(const T& value) {
#if defined(_MSC_VER) && !defined(__clang__)
  static volatile T sink;
  sink = value;
#else
  asm volatile("" : : "r,m"(value) : "memory");
#endif
}

inline std::vector<std::uint32_t> random_permutation(std::uint32_t n,
                                                     std::uint64_t seed) {
  std::vector<std::uint32_t> v(n);
  for (std::uint32_t i = 0; i < n; i++) {
    v[i] = i;
  }
  for (std::uint32_t i = n - 1; i > 0; i--) {
    seed = seed * 6364136223846793005ull + 1442695040888963407ull;
    std::uint32_t j = std::uint32_t((seed >> 33) % (i + 1));
    std::swap(v[i], v[j]);
  }
  return v;
}

}  // namespace bench
