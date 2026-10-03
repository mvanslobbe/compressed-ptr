// The smallest useful program: two objects pointing at each other with
// 4-byte pointers.
#include <cstdio>

#include "cptr/ptr.hpp"

struct person {
  const char* name;
  cptr::ptr<person> friend_;  // 4 bytes instead of 8
};

int main() {
  cptr::ptr<person> alice = cptr::make<person>("Alice", nullptr);
  cptr::ptr<person> bob = cptr::make<person>("Bob", alice);
  alice->friend_ = bob;

  std::printf("%s's friend is %s\n", alice->name, alice->friend_->name);
  std::printf("sizeof(cptr::ptr<person>) = %zu, sizeof(person*) = %zu\n",
              sizeof(cptr::ptr<person>), sizeof(person*));
  std::printf("bob is stored as offset 0x%08x from the cage base\n",
              bob.bits());

  cptr::destroy(alice);
  cptr::destroy(bob);
}
