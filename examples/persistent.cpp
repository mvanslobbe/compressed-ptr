// A list that lives in a file. Each run opens the file, which may be
// mapped at a different address than last time, appends that address, and
// prints every address the file has been mapped at. Run it a few times:
//
//   ./example_persistent history.cage
#include <cstdio>
#include <filesystem>

#include "cptr/list.hpp"
#include "cptr/mapped_cage.hpp"

struct store_tag {};
using store = cptr::mapped_cage<store_tag, 24>;  // a 16 MiB file

// Everything reachable from the root lives in the file, and every pointer
// in it is a compressed offset.
struct history {
  cptr::list<std::uint64_t, store> bases;
};

int main(int argc, char** argv) {
  const char* path = argc > 1 ? argv[1] : "example_persistent.cage";
  if (!store::open(path)) {
    std::fprintf(stderr, "cannot open %s as a cage\n", path);
    return 1;
  }
  auto* h = store::root<history>();
  if (!h) {
    h = cptr::make<history, store>().get();
    store::set_root(h);
  }
  h->bases.push_back(store::base());
  for (std::uint64_t base : h->bases) {
    std::printf("mapped at %#llx\n", static_cast<unsigned long long>(base));
  }
  store::close();
  if (argc < 2) {
    std::filesystem::remove(path);
  }
}
