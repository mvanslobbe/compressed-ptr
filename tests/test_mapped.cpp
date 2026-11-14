// A file-backed cage: build a list and a map in one process, then open the
// file in another process at a different address and use them there.
#include <fcntl.h>
#include <sys/mman.h>
#include <sys/resource.h>
#include <sys/wait.h>
#include <unistd.h>

#include <csignal>
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

namespace {
struct small_tag {};
using small_store = cptr::mapped_cage<small_tag, 24>;

// Write `value` at `offset` of the file, as a corrupted file would hold it.
void poke(const std::string& path, off_t offset, std::uint32_t value) {
  int fd = ::open(path.c_str(), O_RDWR);
  CHECK(fd >= 0);
  CHECK(pwrite(fd, &value, sizeof value, offset) == sizeof value);
  ::close(fd);
}
}  // namespace

// Several processes creating the same new file at once must agree on one
// header. Before open() took an flock(), each of them could format the file
// over the others' allocations: blocks were handed out twice, the byte count
// went wrong, and some opens failed or crashed.
TEST(mapped_cage_concurrent_creation) {
  std::string path = temp_path("cptr_mapped_race");
  constexpr int kProcs = 4;
  int failed = 0, duplicated = 0, miscounted = 0;
  for (int round = 0; round < 40; round++) {
    std::filesystem::remove(path);
    int go[2], res[2];
    CHECK(pipe(go) == 0 && pipe(res) == 0);
    std::fflush(stdout);
    for (int i = 0; i < kProcs; i++) {
      if (fork() == 0) {
        char c;
        (void)!read(go[0], &c, 1);
        std::uint32_t off = 0xFFFFFFFF;
        if (small_store::open(path.c_str())) {
          off = small_store::compress(small_store::allocate(64));
          small_store::close();
        }
        (void)!write(res[1], &off, sizeof off);
        _exit(0);
      }
    }
    char start[kProcs] = {};
    (void)!write(go[1], start, kProcs);
    std::uint32_t offs[kProcs];
    for (int i = 0; i < kProcs; i++) {
      CHECK(read(res[0], &offs[i], sizeof offs[i]) == sizeof offs[i]);
      failed += offs[i] == 0xFFFFFFFF;
      for (int j = 0; j < i; j++) {
        duplicated += offs[i] == offs[j];
      }
    }
    while (wait(nullptr) > 0) {
    }
    if (small_store::open(path.c_str())) {
      miscounted += small_store::allocated_bytes() != 64 * kProcs;
      small_store::close();
    } else {
      failed++;
    }
    for (int fd : {go[0], go[1], res[0], res[1]}) {
      ::close(fd);
    }
  }
  if (failed || duplicated || miscounted) {
    std::printf("  %d failed opens, %d duplicate blocks, %d bad counts\n",
                failed, duplicated, miscounted);
  }
  CHECK(failed == 0 && duplicated == 0 && miscounted == 0);
  std::filesystem::remove(path);
}

// root() and set_root() used to dereference the header of an unopened cage.
TEST(mapped_cage_root_before_open) {
  CHECK(!small_store::is_open());
  CHECK(small_store::root<int>() == nullptr);
  int on_the_side = 0;
  (void)on_the_side;
  small_store::set_root(nullptr);
  CHECK(small_store::root<int>() == nullptr);
}

// Alignments above a span were ignored: a 1 MiB alignment got a block
// aligned to 64 KiB only. They now fail, as in cage.
TEST(mapped_cage_large_alignment) {
  std::string path = temp_path("cptr_mapped_align");
  std::filesystem::remove(path);
  CHECK(small_store::open(path.c_str()));
  for (int i = 0; i < 4; i++) {
    CHECK(small_store::try_allocate(100, std::size_t(1) << 20) == nullptr);
  }
  void* p = small_store::try_allocate(100, small_store::span_size);
  CHECK(p != nullptr);
  CHECK(reinterpret_cast<std::uintptr_t>(p) % small_store::span_size == 0);
  small_store::deallocate(p);
  small_store::close();
  std::filesystem::remove(path);
}

// A file whose allocator state points outside the cage, or over its own
// header, is rejected instead of being written through.
TEST(mapped_cage_rejects_corrupt_state) {
  std::string path = temp_path("cptr_mapped_corrupt");
  // Header layout: magic 0, version 8, size_log2 12, lock 16, root 20,
  // base 24, allocated 32, next_span 40, free_runs 44, free_head 48.
  constexpr off_t kNextSpan = 40, kFreeRuns = 44, kFreeHead = 48;
  constexpr std::size_t kClasses = cptr::detail::kClassSizes.size();
  constexpr off_t kSlabCursor = kFreeHead + 4 * off_t(kClasses);
  constexpr off_t kSlabEnd = kSlabCursor + 4 * off_t(kClasses);
  auto make = [&] {
    std::filesystem::remove(path);
    CHECK(small_store::open(path.c_str()));
    void* a = small_store::allocate(16);
    void* b = small_store::allocate(16);
    small_store::deallocate(a);
    small_store::set_root(b);
    small_store::close();
  };
  struct corruption {
    off_t offset;
    std::uint32_t value;
  };
  const corruption cases[] = {
      {kNextSpan, 0xFFFFFFF0u},     // beyond the file
      {kNextSpan, 0},               // over the header
      {kFreeRuns, 0x7FFFFFFFu},     // a free run beyond the file
      {kFreeHead + 1 * 4, 0x100u},  // a free block in the header (class 1)
      {kFreeHead + 1 * 4, 0xFFFFFF00u},
      {kSlabCursor + 1 * 4, 0x10u},  // a slab in the header
      {kSlabEnd + 1 * 4, 0xFFFFFF00u},
  };
  int rejected = 0;
  for (const corruption& c : cases) {
    make();
    CHECK(small_store::open(path.c_str()));  // intact
    small_store::close();
    poke(path, c.offset, c.value);
    bool opened = small_store::open(path.c_str());
    rejected += !opened;
    if (opened) {
      std::printf("  accepted %#x at offset %ld\n", unsigned(c.value),
                  long(c.offset));
      small_store::close();
    }
  }
  CHECK(rejected == int(std::size(cases)));
  // A free list that loops back on itself.
  make();
  CHECK(small_store::open(path.c_str()));
  void* a = small_store::allocate(16);
  std::uint32_t self = small_store::compress(a);
  small_store::deallocate(a);  // the head of class 1's free list
  small_store::close();
  poke(path, off_t(self), self);
  CHECK(!small_store::open(path.c_str()));
  CHECK(small_store::base() == 0);
  std::filesystem::remove(path);
}

// A creator that cannot give the file its full size must not leave a file
// behind that every later open() rejects.
TEST(mapped_cage_failed_creation_leaves_no_file) {
  std::string path = temp_path("cptr_mapped_too_big");
  std::filesystem::remove(path);
  std::fflush(stdout);
  pid_t pid = fork();
  if (pid == 0) {
    signal(SIGXFSZ, SIG_IGN);
    rlimit limit{1 << 20, 1 << 20};
    setrlimit(RLIMIT_FSIZE, &limit);
    int failures = small_store::open(path.c_str());  // must fail
    failures += std::filesystem::exists(path);
    // An empty file that was there before stays, and stays empty.
    std::FILE* f = std::fopen(path.c_str(), "wb");
    std::fclose(f);
    failures += small_store::open(path.c_str());
    failures += std::filesystem::file_size(path) != 0;
    _exit(failures);
  }
  int status = 0;
  waitpid(pid, &status, 0);
  CHECK(WIFEXITED(status) && WEXITSTATUS(status) == 0);
  // And the empty file can then be opened normally.
  CHECK(small_store::open(path.c_str()));
  CHECK(small_store::allocate(8) != nullptr);
  small_store::close();
  std::filesystem::remove(path);
}

static_assert(store::compress(nullptr) == 0);
static_assert(store::decompress(0) == nullptr);
