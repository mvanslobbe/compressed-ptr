// cptr::list against std::list: same interface, half the per-node overhead.
#include <cstdint>
#include <cstdio>
#include <list>

#include "cptr/list.hpp"

int main() {
  cptr::list<std::uint32_t> numbers;
  for (std::uint32_t i = 0; i < 10; i++) {
    numbers.push_back(i * i);
  }
  for (auto it = numbers.begin(); it != numbers.end();) {
    it = (*it % 2) ? numbers.erase(it) : std::next(it);
  }
  numbers.push_front(1000);

  std::printf("even squares:");
  for (std::uint32_t n : numbers) {
    std::printf(" %u", n);
  }
  std::printf("\n");

  using raw = cptr::list<std::uint32_t, cptr::default_cage, false>;
  std::printf("node size: compressed %zu B, raw pointers %zu B, std::list "
              "~%zu B + malloc header\n",
              cptr::list<std::uint32_t>::node_size, raw::node_size,
              2 * sizeof(void*) + sizeof(std::uint32_t));
}
