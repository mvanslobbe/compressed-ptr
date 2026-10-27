// plf::list (https://github.com/mattreecebentley/plf_list) with 4-byte
// links: give it cptr::fancy_allocator and its node pointers become
// cptr::ptr. Run without arguments for a short demonstration, or with
// "compressed" or "plain" and an element count to compare memory and speed.
//
// Built when CMake is given -DCOMPRESSED_PTR_PLF_LIST_DIR=/path/to/plf_list.
#include <cstdint>
#include <cstdio>

#include <memory>

#include "cptr/fancy_allocator.hpp"
#include "plf_tools.h"

// plf passes the allocator's pointer type to allocator_traits::construct and
// destroy, which take raw pointers. Convert it first, as the standard
// containers do.
#undef PLF_CONSTRUCT
#undef PLF_DESTROY
#define PLF_CONSTRUCT(the_allocator, allocator_instance, location, ...) \
  std::allocator_traits<the_allocator>::construct(                      \
      allocator_instance, std::to_address(location), __VA_ARGS__)
#define PLF_DESTROY(the_allocator, allocator_instance, location)    \
  std::allocator_traits<the_allocator>::destroy(allocator_instance, \
                                                std::to_address(location))

#include "plf_list.h"

#include <chrono>
#include <cstdlib>
#include <cstring>

#include "../bench/common.hpp"

using compressed_list =
    plf::list<std::uint32_t, cptr::fancy_allocator<std::uint32_t>>;
using plain_list = plf::list<std::uint32_t>;

template <class List>
void run(List& l, std::uint32_t n, const char* name) {
  auto keys = bench::random_permutation(n, 1);
  std::size_t before = bench::current_rss();
  auto t0 = std::chrono::steady_clock::now();
  for (std::uint32_t k : keys) {
    l.push_back(k);
  }
  auto t1 = std::chrono::steady_clock::now();
  std::size_t after = bench::current_rss();
  std::uint64_t sum = 0;
  for (int rep = 0; rep < 10; rep++) {
    for (std::uint32_t v : l) {
      sum += v;
    }
  }
  auto t2 = std::chrono::steady_clock::now();
  l.sort();
  auto t3 = std::chrono::steady_clock::now();
  std::uint32_t expect = 0;
  bool sorted = true;
  for (std::uint32_t v : l) {
    sorted = sorted && v == expect++;
  }
  l.remove_if([](std::uint32_t v) { return v % 2; });
  using ms = std::chrono::duration<double, std::milli>;
  std::printf(
      "%-26s %6.1f bytes/elem  push_back %5.1f ms  walk x10 %6.1f ms  "
      "sort %6.1f ms  %s size after remove_if %zu (sum %llu)\n",
      name, double(after - before) / n, ms(t1 - t0).count(),
      ms(t2 - t1).count(), ms(t3 - t2).count(),
      sorted ? "sorted," : "NOT SORTED,", l.size(),
      static_cast<unsigned long long>(sum));
}

int main(int argc, char** argv) {
  if (argc < 2) {
    // Small demonstration.
    // The end sentinel is a member of the list object, and nodes link to
    // it, so the list object itself must live in the cage.
    cptr::ptr<compressed_list> l = cptr::make<compressed_list>();
    for (std::uint32_t i = 0; i < 10; i++) {
      l->push_back(i);
    }
    for (auto it = l->begin(); it != l->end();) {
      it = (*it % 2) ? l->erase(it) : std::next(it);
    }
    l->push_front(100);
    l->sort();
    for (std::uint32_t v : *l) {
      std::printf("%u ", v);
    }
    std::printf("\n");
    cptr::destroy(l);
    return 0;
  }
  std::uint32_t n = argc > 2 ? std::uint32_t(std::atoi(argv[2])) : 4000000;
  if (std::strcmp(argv[1], "compressed") == 0) {
    cptr::ptr<compressed_list> l = cptr::make<compressed_list>();
    run(*l, n, "plf::list compressed (4 B links)");
    cptr::destroy(l);
  } else {
    plain_list l;
    run(l, n, "plf::list (8 B links)");
  }
}
