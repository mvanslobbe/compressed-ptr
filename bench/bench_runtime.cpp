// Runtime of the bundled containers with compressed links, the same code with
// raw links, and the std equivalents, plus a pointer-chasing loop that shows
// where the extra decompression add is paid for by fewer cache misses.
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <list>
#include <map>
#include <string>

#include "cptr/all.hpp"
#include "common.hpp"

namespace {

constexpr int kReps = 5;

template <class List>
void bench_list(const char* name, std::uint32_t n) {
  double build = 0, walk = 0, destroy = 0;
  for (int r = 0; r < kReps; r++) {
    auto* l = new List;
    build += bench::time_ns(1, n, [&] {
      for (std::uint32_t i = 0; i < n; i++) {
        l->push_back(i);
      }
    });
    walk += bench::time_ns(3, n, [&] {
      std::uint64_t sum = 0;
      for (std::uint32_t v : *l) {
        sum += v;
      }
      bench::keep(sum);
    });
    destroy += bench::time_ns(1, n, [&] { delete l; });
  }
  std::printf("  %-22s build %6.2f  walk %6.2f  destroy %6.2f ns/elem\n", name,
              build / kReps, walk / kReps, destroy / kReps);
}

template <class Map>
void bench_map(const char* name, std::uint32_t n) {
  auto keys = bench::random_permutation(n, 1);
  auto lookups = bench::random_permutation(n, 2);
  double insert = 0, find = 0, walk = 0, erase = 0;
  for (int r = 0; r < kReps; r++) {
    Map m;
    insert += bench::time_ns(1, n, [&] {
      for (std::uint32_t k : keys) {
        m.emplace(k, k);
      }
    });
    find += bench::time_ns(3, n, [&] {
      std::uint64_t sum = 0;
      for (std::uint32_t k : lookups) {
        sum += m.find(k)->second;
      }
      bench::keep(sum);
    });
    walk += bench::time_ns(3, n, [&] {
      std::uint64_t sum = 0;
      for (const auto& kv : m) {
        sum += kv.second;
      }
      bench::keep(sum);
    });
    erase += bench::time_ns(1, n, [&] {
      for (std::uint32_t k : lookups) {
        m.erase(k);
      }
    });
  }
  std::printf(
      "  %-22s insert %6.1f  find %6.1f  walk %6.2f  erase %6.1f ns/elem\n",
      name, insert / kReps, find / kReps, walk / kReps, erase / kReps);
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

template <link_kind Kind, std::size_t Payload>
double chase(std::uint32_t n, std::uint32_t steps) {
  using node = chase_node<Kind, Payload>;
  auto* nodes = static_cast<node*>(
      cptr::default_cage::allocate(sizeof(node) * n, 64));
  auto order = bench::random_permutation(n, 3);
  for (std::uint32_t i = 0; i < n; i++) {
    nodes[order[i]].next = &nodes[order[(i + 1) % n]];
  }
  double ns = bench::time_ns(kReps, steps, [&] {
    node* p = &nodes[0];
    for (std::uint32_t i = 0; i < steps; i++) {
      p = p->next;
    }
    bench::keep(p);
  });
  cptr::default_cage::deallocate(nodes);
  return ns;
}

template <std::size_t Payload>
void bench_chase() {
  std::printf("  payload %2zu B: node %2zu B compressed, %2zu B raw\n",
              Payload, sizeof(chase_node<link_kind::compressed, Payload>),
              sizeof(chase_node<link_kind::raw, Payload>));
  for (std::uint32_t n : {1u << 10, 1u << 14, 1u << 18, 1u << 22}) {
    double r = chase<link_kind::raw, Payload>(n, 1 << 22);
    double c = chase<link_kind::compressed, Payload>(n, 1 << 22);
    double nn = chase<link_kind::nonnull, Payload>(n, 1 << 22);
    std::printf(
        "    %8u nodes  raw %6.2f  ptr %6.2f (%+4.0f%%)  nonnull_ptr %6.2f "
        "(%+4.0f%%) ns/step\n",
        n, r, c, (c / r - 1) * 100, nn, (nn / r - 1) * 100);
  }
}

}  // namespace

int main(int argc, char** argv) {
  std::uint32_t n = argc > 1 ? std::uint32_t(std::atoi(argv[1])) : 1000000;
  std::printf("list<uint32_t>, %u elements\n", n);
  bench_list<cptr::list<std::uint32_t>>("cptr::list compressed", n);
  bench_list<cptr::list<std::uint32_t, cptr::default_cage, false>>(
      "cptr::list raw", n);
  bench_list<std::list<std::uint32_t>>("std::list", n);

  std::printf("map<uint32_t, uint32_t>, %u random keys\n", n);
  bench_map<cptr::ordered_map<std::uint32_t, std::uint32_t>>(
      "ordered_map compressed", n);
  bench_map<cptr::ordered_map<std::uint32_t, std::uint32_t,
                              std::less<std::uint32_t>, cptr::default_cage,
                              false>>("ordered_map raw", n);
  bench_map<std::map<std::uint32_t, std::uint32_t>>("std::map", n);

  std::printf("pointer chasing, random cycle\n");
  bench_chase<4>();
  bench_chase<12>();
  bench_chase<56>();
}
