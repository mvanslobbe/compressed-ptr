// Runtime of compressed pointers against a reference, measured with
// nanobench.
//
// Every benchmark runs many short epochs (a few hundred to a few thousand
// operations each) on a structure that stays large for the whole run, and
// reports the 50th, 95th, 99th and 99.9th percentile of the per-epoch time
// per element. Each candidate is compared with a reference at the same
// percentile: "+10%" means the candidate's p99 is 10% slower than the
// reference's p99. The reference is the same code with raw 8-byte links, or
// a raw T* for the pointer loops.
//
// The variants being compared run interleaved, a burst of epochs each in
// turn, so that frequency changes and other drift during the run affect all
// of them alike.
//
// Usage: bench_runtime [elements] [epochs]
// [list|map|arithmetic|conversion|allocator|threads|chase]
#define ANKERL_NANOBENCH_IMPLEMENT
#include "third_party/nanobench.h"

#include <algorithm>
#include <atomic>
#include <chrono>
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <functional>
#include <list>
#include <map>
#include <thread>
#include <vector>

#include "common.hpp"
#include "cptr/all.hpp"

namespace {

using ankerl::nanobench::doNotOptimizeAway;

// Per-epoch nanoseconds per element, sorted.
struct distribution {
  std::vector<double> ns;

  // Nearest-rank percentile, |q| in [0, 1].
  double at(double q) const {
    std::size_t i = std::size_t(q * double(ns.size()));
    return ns[std::min(i, ns.size() - 1)];
  }
};

constexpr double kPercentiles[] = {0.50, 0.95, 0.99, 0.999};

constexpr std::size_t kBurst = 8;

// Runs every function in |variants| |epochs| times, each call doing |items|
// operations, in interleaved bursts of kBurst epochs. |epochs| must be a
// multiple of kBurst. Returns one distribution per variant.
std::vector<distribution> measure(
    std::size_t epochs, std::size_t items,
    const std::vector<std::function<void()>>& variants) {
  std::vector<ankerl::nanobench::Bench> benches(variants.size());
  for (auto& b : benches) {
    b.output(nullptr)
        .epochs(kBurst)
        .epochIterations(1)
        .warmup(0)
        .performanceCounters(false);
  }
  for (std::size_t done = 0; done < epochs; done += kBurst) {
    for (std::size_t v = 0; v < variants.size(); v++) {
      benches[v].run(variants[v]);
    }
  }
  std::vector<distribution> out(variants.size());
  for (std::size_t v = 0; v < variants.size(); v++) {
    for (const auto& r : benches[v].results()) {
      for (std::size_t i = 0; i < r.size(); i++) {
        out[v].ns.push_back(
            r.get(i, ankerl::nanobench::Result::Measure::elapsed) * 1e9 /
            double(items));
      }
    }
    std::sort(out[v].ns.begin(), out[v].ns.end());
  }
  return out;
}

void print_header(const char* title) {
  std::printf("\n%s\n\n", title);
  std::printf(
      "| | p50 ns | p99.9 ns | Δp50 | Δp95 | Δp99 | Δp99.9 |\n"
      "|---|---:|---:|---:|---:|---:|---:|\n");
}

void print_row(const char* name, const distribution& d,
               const distribution* reference) {
  std::printf("| %s | %.2f | %.2f |", name, d.at(0.50), d.at(0.999));
  for (double q : kPercentiles) {
    if (reference == nullptr) {
      std::printf(" ref |");
    } else {
      std::printf(" %+.0f%% |", (d.at(q) / reference->at(q) - 1) * 100);
    }
  }
  std::printf("\n");
}

constexpr std::size_t kChunk = 512;
constexpr std::size_t kWalk = kChunk * 8;

// A container under test. Each call does one epoch's work: grow and shrink
// add or remove kChunk elements, find looks up kChunk keys and walk visits
// kWalk elements, continuing where the previous call stopped.
struct container_variant {
  virtual ~container_variant() = default;
  virtual void grow() = 0;
  virtual void find() {}
  virtual void walk() = 0;
  virtual void shrink() = 0;
};

template <class List>
struct list_variant final : container_variant {
  List l;
  std::uint32_t next = 0;
  typename List::iterator it{};
  bool started = false;

  void grow() override {
    for (std::size_t i = 0; i < kChunk; i++) {
      l.push_back(next++);
    }
  }
  void walk() override {
    if (!started) {
      it = l.begin();
      started = true;
    }
    std::uint64_t sum = 0;
    for (std::size_t i = 0; i < kWalk; i++) {
      if (it == l.end()) {
        it = l.begin();
      }
      sum += *it;
      ++it;
    }
    doNotOptimizeAway(sum);
  }
  void shrink() override {
    for (std::size_t i = 0; i < kChunk; i++) {
      l.pop_front();
    }
  }
};

template <class Map>
struct map_variant final : container_variant {
  const std::vector<std::uint32_t>& keys;
  const std::vector<std::uint32_t>& lookups;
  Map m;
  std::size_t grow_pos = 0, find_pos = 0, shrink_pos = 0;
  typename Map::iterator it{};
  bool started = false;

  map_variant(const std::vector<std::uint32_t>& k,
              const std::vector<std::uint32_t>& l)
      : keys(k), lookups(l) {}

  void grow() override {
    for (std::size_t i = 0; i < kChunk; i++, grow_pos++) {
      m.emplace(keys[grow_pos], keys[grow_pos]);
    }
  }
  void find() override {
    std::uint64_t sum = 0;
    for (std::size_t i = 0; i < kChunk; i++) {
      sum += m.find(lookups[find_pos])->second;
      find_pos = find_pos + 1 == lookups.size() ? 0 : find_pos + 1;
    }
    doNotOptimizeAway(sum);
  }
  void walk() override {
    if (!started) {
      it = m.begin();
      started = true;
    }
    std::uint64_t sum = 0;
    for (std::size_t i = 0; i < kWalk; i++) {
      if (it == m.end()) {
        it = m.begin();
      }
      sum += it->second;
      ++it;
    }
    doNotOptimizeAway(sum);
  }
  void shrink() override {
    for (std::size_t i = 0; i < kChunk; i++, shrink_pos++) {
      m.erase(lookups[shrink_pos]);
    }
  }
};

// Runs every phase on |variants| (reference first) and prints the table.
void bench_containers(const char* const* names,
                      std::vector<container_variant*> variants, std::uint32_t n,
                      std::size_t epochs, bool has_find) {
  struct phase {
    const char* name;
    void (container_variant::*fn)();
    std::size_t epochs, items;
  };
  std::vector<phase> phases = {
      {"grow", &container_variant::grow, n / kChunk, kChunk}};
  if (has_find) {
    phases.push_back({"find", &container_variant::find, epochs, kChunk});
  }
  phases.push_back({"walk", &container_variant::walk, epochs, kWalk});
  phases.push_back({"shrink", &container_variant::shrink, n / kChunk, kChunk});
  for (const phase& ph : phases) {
    std::vector<std::function<void()>> fns;
    for (container_variant* v : variants) {
      fns.push_back([v, fn = ph.fn] { (v->*fn)(); });
    }
    auto d = measure(ph.epochs, ph.items, fns);
    for (std::size_t v = 0; v < variants.size(); v++) {
      char name[96];
      std::snprintf(name, sizeof name, "%s: %s", ph.name, names[v]);
      print_row(name, d[v], v == 0 ? nullptr : &d[0]);
    }
  }
}

enum class link_kind { raw, compressed, nonnull };

// A random cycle through |n| nodes, each padded to |Payload| bytes besides
// its link.
template <link_kind Kind, std::size_t Payload>
struct chase_node {
  using link_type = std::conditional_t<
      Kind == link_kind::raw, chase_node*,
      std::conditional_t<Kind == link_kind::compressed, cptr::ptr<chase_node>,
                         cptr::nonnull_ptr<chase_node>>>;
  link_type next;
  char payload[Payload];
};

// A random cycle through |n| nodes; each call follows 1024 links.
template <link_kind Kind, std::size_t Payload>
struct chase_cycle {
  using node = chase_node<Kind, Payload>;
  static constexpr std::size_t kSteps = 1024;
  node* nodes;
  node* p;

  explicit chase_cycle(std::uint32_t n)
      : nodes(static_cast<node*>(
            cptr::default_cage::allocate(sizeof(node) * n, 64))) {
    auto order = bench::random_permutation(n, 3);
    for (std::uint32_t i = 0; i < n; i++) {
      nodes[order[i]].next = &nodes[order[(i + 1) % n]];
    }
    p = &nodes[0];
  }
  ~chase_cycle() { cptr::default_cage::deallocate(nodes); }
  chase_cycle(const chase_cycle&) = delete;
  chase_cycle& operator=(const chase_cycle&) = delete;

  void operator()() {
    node* q = p;
    for (std::size_t i = 0; i < kSteps; i++) {
      q = q->next;
    }
    p = q;
    doNotOptimizeAway(q);
  }
};

template <std::size_t Payload>
void bench_chase(std::size_t epochs) {
  char title[160];
  std::snprintf(title, sizeof title,
                "Pointer chasing, random cycle, %zu B payload (node %zu B "
                "compressed, %zu B raw), ns per step",
                Payload, sizeof(chase_node<link_kind::compressed, Payload>),
                sizeof(chase_node<link_kind::raw, Payload>));
  print_header(title);
  for (std::uint32_t n : {1u << 10, 1u << 14, 1u << 18, 1u << 22}) {
    chase_cycle<link_kind::raw, Payload> r(n);
    chase_cycle<link_kind::compressed, Payload> c(n);
    chase_cycle<link_kind::nonnull, Payload> nn(n);
    auto d = measure(epochs, decltype(r)::kSteps,
                     {[&] { r(); }, [&] { c(); }, [&] { nn(); }});
    const char* kinds[] = {"raw `T*`", "`ptr`", "`nonnull_ptr`"};
    for (std::size_t v = 0; v < 3; v++) {
      char name[64];
      std::snprintf(name, sizeof name, "%u nodes, %s", n, kinds[v]);
      print_row(name, d[v], v == 0 ? nullptr : &d[0]);
    }
  }
}

// Walking an array through the pointer type, as containers that index into
// blocks of elements do. Each call sums the next kStep elements.
template <class P>
struct array_walk {
  static constexpr std::uint32_t kStep = 4096;
  P begin;
  std::uint32_t n;
  std::uint32_t offset = 0;

  void operator()() {
    std::uint64_t sum = 0;
    P end = begin + (offset + kStep);
    for (P p = begin + offset; p != end; ++p) {
      sum += *p;
    }
    offset = offset + kStep == n ? 0 : offset + kStep;
    doNotOptimizeAway(sum);
  }
};

void bench_arithmetic(std::size_t epochs) {
  print_header(
      "Pointer arithmetic: `++p` over an array of `uint32_t`, ns per "
      "element");
  for (std::uint32_t n : {1u << 16, 1u << 22}) {
    auto* raw = static_cast<std::uint32_t*>(
        cptr::default_cage::allocate(sizeof(std::uint32_t) * n, 64));
    for (std::uint32_t i = 0; i < n; i++) {
      raw[i] = i;
    }
    array_walk<std::uint32_t*> r{raw, n};
    array_walk<cptr::ptr<std::uint32_t>> c{raw, n};
    auto d = measure(epochs, decltype(r)::kStep, {[&] { r(); }, [&] { c(); }});
    const char* kinds[] = {"raw `T*`", "`ptr`"};
    for (std::size_t v = 0; v < 2; v++) {
      char name[64];
      std::snprintf(name, sizeof name, "%u elements, %s", n, kinds[v]);
      print_row(name, d[v], v == 0 ? nullptr : &d[0]);
    }
    cptr::default_cage::deallocate(raw);
  }
}

// Allocator churn: a heap of 65,536 live blocks of 16 to 256 bytes; each
// operation frees a random block and allocates a new one in its place.
struct churn {
  void* (*alloc)(std::size_t);
  void (*release)(void*);
  std::vector<void*> live;
  std::vector<std::uint32_t> slots;
  std::vector<std::uint16_t> sizes;
  std::size_t pos = 0;

  churn(void* (*a)(std::size_t), void (*r)(void*),
        std::uint32_t live_blocks = 1 << 16, std::uint64_t seed = 5)
      : alloc(a), release(r) {
    const std::uint32_t kLive = live_blocks;
    slots = bench::random_permutation(kLive, seed);
    auto order = bench::random_permutation(kLive, seed + 1);
    for (std::uint32_t i = 0; i < kLive; i++) {
      sizes.push_back(std::uint16_t(16 + order[i] % 241));
      live.push_back(alloc(sizes.back()));
    }
  }
  ~churn() {
    for (void* p : live) {
      release(p);
    }
  }
  churn(const churn&) = delete;
  churn& operator=(const churn&) = delete;

  void operator()() {
    for (std::size_t i = 0; i < kChunk; i++) {
      std::uint32_t slot = slots[pos];
      release(live[slot]);
      live[slot] = alloc(sizes[pos]);
      pos = pos + 1 == slots.size() ? 0 : pos + 1;
    }
  }
};

void bench_allocator(std::size_t epochs) {
  print_header(
      "Allocator: free a random block of 65,536 and allocate 16 to "
      "256 bytes, ns per free and allocate");
  churn m([](std::size_t n) { return std::malloc(n); },
          [](void* p) { std::free(p); });
  churn c([](std::size_t n) { return cptr::default_cage::allocate(n); },
          [](void* p) { cptr::default_cage::deallocate(p); });
  auto d = measure(epochs, kChunk, {[&] { m(); }, [&] { c(); }});
  print_row("`malloc` / `free`", d[0], nullptr);
  print_row("cage `allocate` / `deallocate`", d[1], &d[0]);
}

// The same churn on 1 to 8 threads at once, each with its own heap of
// 16,384 blocks. Each thread measures its own epochs; the percentiles are
// over all threads' epochs. malloc and the cage alternate in four rounds.
// nanobench keeps global state and cannot run on several threads at once,
// so each epoch is timed with std::chrono::steady_clock, the clock
// nanobench uses.
void bench_threads(std::size_t epochs) {
  print_header(
      "Allocator churn on several threads, ns per free and "
      "allocate on each thread");
  using alloc_fn = void* (*)(std::size_t);
  using free_fn = void (*)(void*);
  struct variant {
    alloc_fn alloc;
    free_fn release;
  };
  const variant variants[] = {
      {[](std::size_t n) { return std::malloc(n); },
       [](void* p) { std::free(p); }},
      {[](std::size_t n) { return cptr::default_cage::allocate(n); },
       [](void* p) { cptr::default_cage::deallocate(p); }}};
  for (unsigned threads : {1u, 2u, 4u, 8u}) {
    distribution d[2];
    constexpr int kRounds = 4;
    std::size_t per_thread =
        std::max<std::size_t>(epochs / kRounds / kBurst * kBurst, kBurst);
    for (int round = 0; round < kRounds; round++) {
      for (int v = 0; v < 2; v++) {
        std::vector<distribution> results(threads);
        std::atomic<unsigned> ready{0};
        std::vector<std::thread> pool;
        for (unsigned t = 0; t < threads; t++) {
          pool.emplace_back([&, t] {
            churn heap(variants[v].alloc, variants[v].release, 1 << 14,
                       std::uint64_t(t) + 7);
            ready++;
            while (ready.load() < threads) {
            }
            distribution& out = results[t];
            out.ns.reserve(per_thread);
            for (std::size_t e = 0; e < per_thread; e++) {
              auto start = std::chrono::steady_clock::now();
              heap();
              auto stop = std::chrono::steady_clock::now();
              out.ns.push_back(
                  std::chrono::duration<double, std::nano>(stop - start)
                      .count() /
                  double(kChunk));
            }
          });
        }
        for (auto& th : pool) {
          th.join();
        }
        for (auto& r : results) {
          d[v].ns.insert(d[v].ns.end(), r.ns.begin(), r.ns.end());
        }
      }
    }
    for (auto& x : d) {
      std::sort(x.ns.begin(), x.ns.end());
    }
    char name[64];
    std::snprintf(name, sizeof name, "%u threads, `malloc` / `free`", threads);
    print_row(name, d[0], nullptr);
    std::snprintf(name, sizeof name, "%u threads, cage", threads);
    print_row(name, d[1], &d[0]);
  }
}

// Converting to ptr<const T> and ptr<void>, against a plain copy.
void bench_conversion(std::size_t epochs) {
  print_header("Conversion of 4,096 `ptr<int>`, ns per conversion");
  constexpr std::size_t kCount = 4096;
  std::vector<cptr::ptr<int>> v;
  for (std::size_t i = 0; i < kCount; i++) {
    v.push_back(cptr::make<int>(int(i)));
  }
  auto d = measure(epochs, kCount,
                   {[&] {
                      std::uint64_t sum = 0;
                      for (const auto& p : v) {
                        cptr::ptr<int> q = p;
                        sum += q.bits();
                      }
                      doNotOptimizeAway(sum);
                    },
                    [&] {
                      std::uint64_t sum = 0;
                      for (const auto& p : v) {
                        cptr::ptr<const int> q = p;
                        sum += q.bits();
                      }
                      doNotOptimizeAway(sum);
                    },
                    [&] {
                      std::uint64_t sum = 0;
                      for (const auto& p : v) {
                        cptr::ptr<void> q = p;
                        sum += q.bits();
                      }
                      doNotOptimizeAway(sum);
                    }});
  const char* names[] = {"copy to `ptr<int>`", "to `ptr<const int>`",
                         "to `ptr<void>`"};
  for (std::size_t i = 0; i < 3; i++) {
    print_row(names[i], d[i], i == 0 ? nullptr : &d[0]);
  }
  for (auto& p : v) {
    cptr::destroy(p);
  }
}

}  // namespace

int main(int argc, char** argv) {
  std::uint32_t n = argc > 1 ? std::uint32_t(std::atoi(argv[1])) : 1u << 20;
  std::size_t epochs = argc > 2 ? std::size_t(std::atoi(argv[2])) : 2000;
  // Whole bursts of whole chunks.
  n = std::max<std::uint32_t>(n / (kChunk * kBurst), 1) *
      std::uint32_t(kChunk * kBurst);
  epochs = std::max<std::size_t>(epochs / kBurst, 1) * kBurst;
  const char* only = argc > 3 ? argv[3] : nullptr;
  auto wanted = [only](const char* section) {
    return only == nullptr || std::strcmp(only, section) == 0;
  };

  char title[160];
  std::snprintf(title, sizeof title,
                "list of `uint32_t`, %u elements, ns per element "
                "(chunks of %zu, walk %zu)",
                n, kChunk, kWalk);
  if (wanted("list")) {
    print_header(title);
    list_variant<
        cptr::detail::basic_list<std::uint32_t, cptr::default_cage, false>>
        r;
    list_variant<cptr::list<std::uint32_t>> c;
    list_variant<std::list<std::uint32_t>> s;
    const char* names[] = {"`cptr::list` raw links", "`cptr::list` compressed",
                           "`std::list`"};
    bench_containers(names, {&r, &c, &s}, n, epochs, false);
  }

  std::snprintf(title, sizeof title,
                "map `uint32_t -> uint32_t`, %u random keys, ns per element",
                n);
  if (wanted("map")) {
    print_header(title);
    auto keys = bench::random_permutation(n, 1);
    auto lookups = bench::random_permutation(n, 2);
    map_variant<cptr::detail::basic_ordered_map<std::uint32_t, std::uint32_t,
                                                std::less<std::uint32_t>,
                                                cptr::default_cage, false>>
        r(keys, lookups);
    map_variant<cptr::ordered_map<std::uint32_t, std::uint32_t>> c(keys,
                                                                   lookups);
    map_variant<std::map<std::uint32_t, std::uint32_t>> s(keys, lookups);
    const char* names[] = {"`cptr::ordered_map` raw links",
                           "`cptr::ordered_map` compressed", "`std::map`"};
    bench_containers(names, {&r, &c, &s}, n, epochs, true);
  }

  if (wanted("arithmetic")) {
    bench_arithmetic(epochs);
  }
  if (wanted("conversion")) {
    bench_conversion(epochs);
  }
  if (wanted("allocator")) {
    bench_allocator(epochs);
  }
  if (wanted("threads")) {
    bench_threads(epochs);
  }
  if (wanted("chase")) {
    bench_chase<4>(epochs);
    bench_chase<56>(epochs);
  }
}
