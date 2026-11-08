// Cages whose memory is managed by an allocator the user supplies.
#include <cstddef>
#include <cstdint>
#include <map>
#include <new>
#include <span>

#include "check.hpp"
#include "cptr/all.hpp"
#include "cptr/user_cage.hpp"

namespace {

// A user allocator: a bump allocator that counts calls and remembers the
// region it was given.
struct counting_allocator {
  static inline std::byte* first = nullptr;
  static inline std::byte* last = nullptr;
  static inline int allocations = 0;
  static inline int frees = 0;

  explicit counting_allocator(std::span<std::byte> region) : arena_(region) {
    first = region.data();
    last = region.data() + region.size();
  }
  void* allocate(std::size_t bytes, std::size_t align) noexcept {
    void* p = arena_.allocate(bytes, align);
    allocations += p != nullptr;
    return p;
  }
  void deallocate(void* p) noexcept {
    frees++;
    arena_.deallocate(p);
  }

 private:
  cptr::bump_allocator arena_;
};

struct counting_tag {};
using counting_cage = cptr::user_cage<counting_tag, counting_allocator>;
static_assert(cptr::region_allocator<counting_allocator>);
static_assert(cptr::region_allocator<cptr::bump_allocator>);

// A small cage, to test running out of memory.
struct tiny_tag {};
using tiny_cage = cptr::user_cage<tiny_tag, cptr::bump_allocator, 24>;

}  // namespace

TEST(user_cage_hands_the_region_to_the_allocator) {
  CHECK(counting_cage::init());
  auto base = reinterpret_cast<std::byte*>(counting_cage::base());
  // Offset 0 (null) and the last span stay out of the allocator's reach.
  CHECK(counting_allocator::first == base + counting_cage::span_size);
  CHECK(counting_allocator::last == base + counting_cage::usable_end);

  cptr::list<int, counting_cage> list;
  cptr::ordered_map<int, int, std::less<int>, counting_cage> map;
  for (int i = 0; i < 1000; i++) {
    list.push_back(i);
    map.emplace(i, -i);
  }
  CHECK(counting_allocator::allocations == 2 + 2000);  // sentinels + nodes
  CHECK(list.size() == 1000 && list.back() == 999);
  CHECK(map.valid() && map.at(500) == -500);
  CHECK(counting_cage::contains(&list.front()));
  list.clear();
  CHECK(counting_allocator::frees == 1000);

  auto p = cptr::make<double, counting_cage>(2.5);
  CHECK(*p == 2.5);
  CHECK(p.bits() ==
        std::uint32_t(reinterpret_cast<std::byte*>(p.get()) - base));
  cptr::destroy(p);
}

TEST(user_cage_reports_exhaustion) {
  bool threw = false;
  try {
    // 16 MiB cage; one 8 MiB block fits, the second does not.
    void* a = tiny_cage::allocate(8 << 20, 16);
    CHECK(a != nullptr);
    CHECK(tiny_cage::try_allocate(8 << 20, 16) == nullptr);
    tiny_cage::allocate(8 << 20, 16);
  } catch (const std::bad_alloc&) {
    threw = true;
  }
  CHECK(threw);
}

TEST(bump_allocator_aligns_and_commits) {
  struct tag {};
  using cage = cptr::user_cage<tag, cptr::bump_allocator>;
  auto* a = static_cast<char*>(cage::allocate(1, 1));
  auto* b = static_cast<char*>(cage::allocate(64, 64));
  CHECK(reinterpret_cast<std::uintptr_t>(b) % 64 == 0);
  CHECK(b > a);
  // Freshly committed memory is writable across a commit-chunk boundary.
  auto* big = static_cast<char*>(cage::allocate(3 << 20, 16));
  big[0] = 1;
  big[(3 << 20) - 1] = 2;
  CHECK(big[0] + big[(3 << 20) - 1] == 3);
}
