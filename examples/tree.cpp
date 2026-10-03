// A hand-written binary tree using the packing helpers: both children share
// one 8-byte word, and the size of each subtree rides along in the spare half
// of another.
#include <cstdint>
#include <cstdio>
#include <random>

#include "cptr/pack.hpp"

struct node {
  cptr::ptr_pair<node> children;  // left and right in 8 bytes
  std::uint32_t key;
  std::uint32_t subtree_size;
};
static_assert(sizeof(node) == 16);  // 32 with raw pointers

static node* insert(node* n, std::uint32_t key) {
  if (!n) {
    return cptr::make<node>(cptr::ptr_pair<node>(), key, 1u).get();
  }
  n->subtree_size++;
  if (key < n->key) {
    n->children.set_first(insert(n->children.first(), key));
  } else {
    n->children.set_second(insert(n->children.second(), key));
  }
  return n;
}

// The k-th smallest key, using the subtree sizes.
static std::uint32_t select(const node* n, std::uint32_t k) {
  for (;;) {
    const node* l = n->children.first();
    std::uint32_t left = l ? l->subtree_size : 0;
    if (k < left) {
      n = l;
    } else if (k == left) {
      return n->key;
    } else {
      k -= left + 1;
      n = n->children.second();
    }
  }
}

static void destroy(node* n) {
  if (n) {
    destroy(n->children.first());
    destroy(n->children.second());
    cptr::destroy(cptr::ptr<node>(n));
  }
}

int main() {
  std::mt19937 rng(7);
  node* root = nullptr;
  for (int i = 0; i < 100000; i++) {
    root = insert(root, rng());
  }
  std::printf("median of %u keys: %u\n", root->subtree_size,
              select(root, root->subtree_size / 2));
  std::printf("sizeof(node) = %zu bytes\n", sizeof(node));
  destroy(root);
}
