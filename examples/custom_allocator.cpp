// Supplying your own allocator: a cage whose blocks come from a pool of
// fixed-size slots, here for the nodes of a cptr::list. The cage still does
// the reservation and the compression.
#include <cstddef>
#include <cstdio>
#include <mutex>
#include <span>

#include "cptr/list.hpp"
#include "cptr/user_cage.hpp"

// Every block is one 16-byte slot. Freed slots go on a free list; new ones
// come from a bump allocator over the cage's region, which commits memory
// as it goes.
class slot_pool {
 public:
  static constexpr std::size_t kSlot = 16;

  explicit slot_pool(std::span<std::byte> region) : fresh_(region) {}

  void* allocate(std::size_t bytes, std::size_t align) noexcept {
    if (bytes > kSlot || align > kSlot) {
      return nullptr;  // this pool only serves small nodes
    }
    std::lock_guard g(mutex_);
    if (free_) {
      slot* s = free_;
      free_ = s->next;
      return s;
    }
    return fresh_.allocate(kSlot, kSlot);
  }

  void deallocate(void* p) noexcept {
    std::lock_guard g(mutex_);
    free_ = ::new (p) slot{free_};
  }

 private:
  struct slot {
    slot* next;
  };
  std::mutex mutex_;
  slot* free_ = nullptr;
  cptr::bump_allocator fresh_;
};

struct pool_tag {};
using pool_cage = cptr::user_cage<pool_tag, slot_pool>;

int main() {
  // A list node is two 4-byte links plus the value: 12 bytes, one slot.
  using list = cptr::list<int, pool_cage>;
  static_assert(list::node_size <= slot_pool::kSlot);

  list numbers;
  for (int i = 0; i < 5; i++) {
    numbers.push_back(i * i);
  }
  numbers.pop_front();    // its slot goes on the free list ...
  numbers.push_back(99);  // ... and is reused here
  for (int v : numbers) {
    std::printf("%d ", v);
  }
  std::printf("\nnodes of %zu bytes in %zu-byte slots\n", list::node_size,
              slot_pool::kSlot);
}
