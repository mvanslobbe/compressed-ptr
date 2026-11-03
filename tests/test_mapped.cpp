// A file-backed cage: build a list and a map in one process, then open the
// file in another process at a different address and use them there.
#include <sys/mman.h>
#include <sys/wait.h>
#include <unistd.h>

#include <cstdio>
#include <cstdlib>
#include <filesystem>
#include <string>

#include "check.hpp"
#include "cptr/all.hpp"
#include "cptr/mapped_cage.hpp"

namespace {

struct store_tag {};
using store = cptr::mapped_cage<store_tag, 28>;

struct root_type {
  cptr::list<int, store> list;
  cptr::ordered_map<int, std::uint32_t, std::less<int>, store> map;
  cptr::ptr<root_type, store> self;
};

std::string temp_path(const char* name) {
  return (std::filesystem::temp_directory_path() /
          (std::string(name) + "." + std::to_string(getpid())))
      .string();
}

// Returns the address the file was mapped at.
std::uintptr_t build(const std::string& path) {
  CHECK(store::open(path.c_str()));
  CHECK(store::root<root_type>() == nullptr);
  auto r = cptr::make<root_type, store>();
  r->self = r;
  for (int i = 0; i < 1000; i++) {
    r->list.push_back(i);
    r->map.emplace(i, std::uint32_t(i) * 3);
  }
  store::set_root(r.get());
  std::uintptr_t base = store::base();
  store::close();
  return base;
}

void verify_and_change() {
  auto* r = store::root<root_type>();
  CHECK(r != nullptr);
  CHECK(r->self.get() == r);
  CHECK(r->list.size() == 1000 && r->map.size() == 1000);
  int expect = 0;
  for (int v : r->list) {
    CHECK(v == expect++);
  }
  CHECK(r->map.valid());
  for (auto [k, v] : r->map) {
    CHECK(v == std::uint32_t(k) * 3);
  }
  // Free half and allocate again: blocks are reused from the free lists.
  std::size_t before = store::allocated_bytes();
  for (int i = 0; i < 1000; i += 2) {
    r->map.erase(i);
  }
  CHECK(store::allocated_bytes() < before);
  for (int i = 0; i < 1000; i += 2) {
    r->map.emplace(i, std::uint32_t(i) * 3);
  }
  CHECK(store::allocated_bytes() == before);
  r->list.push_back(1000);
}

}  // namespace

TEST(mapped_cage_survives_reopening_at_another_address) {
  std::string path = temp_path("cptr_mapped");
  std::filesystem::remove(path);

  // Build in a child, which reports the address it mapped the file at.
  std::fflush(stdout);
  int fds[2];
  CHECK(pipe(fds) == 0);
  pid_t child = fork();
  if (child == 0) {
    std::uintptr_t base = build(path);
    (void)!write(fds[1], &base, sizeof base);
    std::fflush(stdout);
    _exit(check::failures ? 1 : 0);
  }
  std::uintptr_t child_base = 0;
  CHECK(read(fds[0], &child_base, sizeof child_base) == sizeof child_base);
  int status = 0;
  waitpid(child, &status, 0);
  CHECK(WIFEXITED(status) && WEXITSTATUS(status) == 0);
  close(fds[0]);
  close(fds[1]);

  // Occupy the child's address, so this process must map the file elsewhere.
  void* blocker = mmap(reinterpret_cast<void*>(child_base), store::size,
                       PROT_NONE, MAP_PRIVATE | MAP_ANON, -1, 0);
  CHECK(blocker != MAP_FAILED);
  CHECK(store::open(path.c_str()));
  CHECK(store::base() != child_base);
  CHECK(store::previous_base() == child_base);
  verify_and_change();
  store::close();

  // And once more, to see the changes made here.
  CHECK(store::open(path.c_str()));
  auto* r = store::root<root_type>();
  CHECK(r->list.size() == 1001 && r->list.back() == 1000);
  CHECK(r->map.size() == 1000 && r->map.valid());
  store::close();

  munmap(blocker, store::size);
  std::filesystem::remove(path);
}

TEST(mapped_cage_rejects_other_files) {
  std::string path = temp_path("cptr_not_a_cage");
  {
    std::FILE* f = std::fopen(path.c_str(), "wb");
    CHECK(f != nullptr);
    std::fputs("not a cage", f);
    std::fclose(f);
  }
  CHECK(!store::open(path.c_str()));
  CHECK(store::base() == 0);
  std::filesystem::remove(path);
}
