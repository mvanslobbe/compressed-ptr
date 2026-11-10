// Resident memory per element. Each configuration runs in a fresh child
// process so that allocator state from one does not leak into the next.
#include <cstdio>
#include <cstdlib>
#include <cstring>
#include <list>
#include <map>
#include <string>
#include <unordered_map>
#include <vector>

#include "common.hpp"
#include "cptr/all.hpp"

namespace {

template <class List>
std::size_t fill_list(std::uint32_t n) {
  std::size_t before = bench::current_rss();
  auto* l = new List;
  for (std::uint32_t i = 0; i < n; i++) {
    l->push_back(i);
  }
  std::size_t after = bench::current_rss();
  bench::keep(l);
  return after - before;
}

template <class Map>
std::size_t fill_map(std::uint32_t n) {
  auto keys = bench::random_permutation(n, 1);
  std::size_t before = bench::current_rss();
  auto* m = new Map;
  for (std::uint32_t k : keys) {
    m->emplace(k, k);
  }
  std::size_t after = bench::current_rss();
  bench::keep(m);
  return after - before;
}

struct graph_vertex_c {
  std::vector<cptr::ptr<graph_vertex_c>,
              cptr::allocator<cptr::ptr<graph_vertex_c>>>
      edges;
};
struct graph_vertex_r {
  std::vector<graph_vertex_r*> edges;
};

template <class V>
std::size_t fill_graph(std::uint32_t n) {
  constexpr int kDegree = 16;
  std::size_t before = bench::current_rss();
  auto* vs = new std::vector<V>(n);
  for (std::uint32_t i = 0; i < n; i++) {
    (*vs)[i].edges.reserve(kDegree);
    for (int d = 0; d < kDegree; d++) {
      (*vs)[i].edges.push_back(&(*vs)[(i * 31 + d * 7919) % n]);
    }
  }
  std::size_t after = bench::current_rss();
  bench::keep(vs);
  return after - before;
}

struct config {
  const char* name;
  std::size_t (*run)(std::uint32_t);
};

using map_c = cptr::ordered_map<std::uint32_t, std::uint32_t>;
using map_r = cptr::detail::basic_ordered_map<std::uint32_t, std::uint32_t,
                                              std::less<std::uint32_t>,
                                              cptr::default_cage, false>;
const config kConfigs[] = {
    {"list/cage-compressed", fill_list<cptr::list<std::uint32_t>>},
    {"list/cage-raw",
     fill_list<
         cptr::detail::basic_list<std::uint32_t, cptr::default_cage, false>>},
    {"list/std", fill_list<std::list<std::uint32_t>>},
    {"map/cage-compressed", fill_map<map_c>},
    {"map/cage-raw", fill_map<map_r>},
    {"map/std", fill_map<std::map<std::uint32_t, std::uint32_t>>},
    {"hash/cage-compressed",
     fill_map<cptr::unordered_map<std::uint32_t, std::uint32_t>>},
    {"hash/cage-raw",
     fill_map<cptr::detail::basic_unordered_map<
         std::uint32_t, std::uint32_t, std::hash<std::uint32_t>,
         std::equal_to<std::uint32_t>, cptr::default_cage, false>>},
    {"hash/std", fill_map<std::unordered_map<std::uint32_t, std::uint32_t>>},
    {"graph16/compressed", fill_graph<graph_vertex_c>},
    {"graph16/raw", fill_graph<graph_vertex_r>},
};

}  // namespace

int main(int argc, char** argv) {
  std::uint32_t n = 2000000;
  if (argc >= 3) {
    n = std::uint32_t(std::atoi(argv[2]));
    for (const config& c : kConfigs) {
      if (std::strcmp(c.name, argv[1]) == 0) {
        std::size_t bytes = c.run(n);
        std::printf("%-22s %8.1f MiB  %6.1f bytes/element\n", c.name,
                    bytes / 1048576.0, double(bytes) / n);
        return 0;
      }
    }
    std::fprintf(stderr, "unknown configuration %s\n", argv[1]);
    return 1;
  }
  if (argc == 2) {
    n = std::uint32_t(std::atoi(argv[1]));
  }
  std::printf("resident memory growth for %u elements\n", n);
  for (const config& c : kConfigs) {
    std::string cmd =
        std::string("\"") + argv[0] + "\" " + c.name + " " + std::to_string(n);
#if defined(_WIN32)
    cmd = "\"" + cmd + "\"";
#endif
    std::fflush(stdout);
    if (std::system(cmd.c_str()) != 0) {
      return 1;
    }
  }
}
