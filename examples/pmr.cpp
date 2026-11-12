// Using a cage through std::pmr: any allocator-aware std container, and
// any library that takes a std::pmr::memory_resource, can put its memory in
// the cage. The container's own pointers stay 8 bytes; what you gain is the
// cage's fast header-less allocator, and pointers *into* that memory can
// then be stored compressed.
#include <cstdio>
#include <memory_resource>
#include <string>
#include <vector>

#include "cptr/all.hpp"

struct record {
  std::pmr::string name;
  cptr::ptr<record> parent;  // 4 bytes: the records live in the cage
};

int main() {
  std::pmr::memory_resource* cage = cptr::default_cage::resource();
  std::pmr::vector<record> records(cage);
  records.reserve(3);
  for (const char* n : {"root", "child", "a grandchild with a long name"}) {
    record r{std::pmr::string(n, cage), nullptr};
    if (!records.empty()) {
      r.parent = &records.back();
    }
    records.push_back(std::move(r));
  }
  for (const record& r : records) {
    std::printf("%-30s parent: %s\n", r.name.c_str(),
                r.parent ? r.parent->name.c_str() : "(none)");
  }
  std::printf("sizeof(cptr::ptr<record>) = %zu\n", sizeof(cptr::ptr<record>));
}
