#include <algorithm>
#include <memory>
#include <string>
#include <thread>
#include <unordered_set>
#include <vector>

#include "cptr/all.hpp"
#include "check.hpp"

namespace {
struct base {
  int b = 1;
  virtual ~base() = default;
};
struct derived : base {
  int d = 2;
};
struct alignas(8) aligned {
  int v;
};
}  // namespace

TEST(ptr_is_four_bytes_and_converts) {
  auto p = cptr::make<int>(41);
  static_assert(sizeof(p) == 4);
  int* raw = p;
  CHECK(*raw == 41);
  ++*p;
  CHECK(*p.get() == 42);
  cptr::ptr<int> q = raw;
  CHECK(p == q);
  CHECK(p != nullptr);
  cptr::destroy(p);
}

TEST(null_ptr_behaves) {
  cptr::ptr<int> p;
  CHECK(!p);
  CHECK(p == nullptr);
  CHECK(p.get() == nullptr);
  CHECK(p.bits() == 0);
  p = cptr::make<int>(1);
  CHECK(p);
  cptr::destroy(p);
  p = nullptr;
  CHECK(!p);
}

TEST(derived_to_base_conversion) {
  cptr::ptr<derived> d = cptr::make<derived>();
  cptr::ptr<base> b = d;
  CHECK(b->b == 1);
  CHECK(static_cast<base*>(d.get()) == b.get());
  cptr::destroy(d);
}

TEST(ordering_matches_addresses) {
  auto a = cptr::make<int>(1);
  auto b = cptr::make<int>(2);
  CHECK((a < b) == (a.get() < b.get()));
  std::unordered_set<cptr::ptr<int>> set{a, b};
  CHECK(set.size() == 2);
  cptr::destroy(a);
  cptr::destroy(b);
}

TEST(bits_round_trip) {
  auto a = cptr::make<int>(5);
  auto b = cptr::ptr<int>::from_bits(a.bits());
  CHECK(a == b);
  cptr::destroy(a);
}

TEST(nonnull_ptr_works) {
  int* raw = cptr::make<int>(9).get();
  cptr::nonnull_ptr<int> p(raw);
  CHECK(*p == 9);
  CHECK(p.get() == raw);
  cptr::destroy(cptr::ptr<int>(raw));
}

TEST(ptr_pair_packs_two) {
  auto a = cptr::make<int>(1);
  auto b = cptr::make<int>(2);
  cptr::ptr_pair<int> pair(a, b);
  static_assert(sizeof(pair) == 8);
  CHECK(pair.first() == a.get());
  CHECK(pair.second() == b.get());
  pair.set_first(nullptr);
  CHECK(pair.first() == nullptr);
  CHECK(pair.second() == b.get());
  pair.set_second(a);
  CHECK(pair.second() == a.get());
  cptr::destroy(a);
  cptr::destroy(b);
}

TEST(ptr_with_payload_keeps_both) {
  auto a = cptr::make<int>(1);
  cptr::ptr_with_payload<int> pp(a, 0xDEADBEEF);
  CHECK(pp.get() == a.get());
  CHECK(pp.payload() == 0xDEADBEEF);
  pp.set_payload(7);
  CHECK(pp.get() == a.get());
  pp.set(nullptr);
  CHECK(pp.get() == nullptr);
  CHECK(pp.payload() == 7);
  cptr::destroy(a);
}

TEST(tagged_ptr_uses_alignment_bits) {
  auto a = cptr::make<aligned>();
  cptr::tagged_ptr<aligned, 3> t(a, 5);
  static_assert(sizeof(t) == 4);
  CHECK(t.get() == a.get());
  CHECK(t.tag() == 5);
  t.set(nullptr, 2);
  CHECK(t.get() == nullptr);
  CHECK(t.tag() == 2);
  cptr::destroy(a);
}

namespace {
struct stack_node {
  int value;
  cptr::ptr<stack_node> next;
};
}  // namespace

TEST(atomic_ptr_lock_free_stack) {
  // A Treiber stack; nodes are never freed during the test, so there is no
  // ABA problem to worry about.
  cptr::atomic_ptr<stack_node> head;
  constexpr int kThreads = 4, kPerThread = 10000;
  std::vector<std::thread> threads;
  for (int t = 0; t < kThreads; t++) {
    threads.emplace_back([&, t] {
      for (int i = 0; i < kPerThread; i++) {
        stack_node* n =
            cptr::make<stack_node>(t * kPerThread + i, nullptr).get();
        stack_node* old = head.load(std::memory_order_relaxed);
        do {
          n->next = old;
        } while (!head.compare_exchange_weak(old, n));
      }
    });
  }
  for (auto& th : threads) {
    th.join();
  }
  std::vector<bool> seen(kThreads * kPerThread);
  int count = 0;
  for (stack_node* n = head.load(); n;) {
    seen[n->value] = true;
    count++;
    stack_node* next = n->next;
    cptr::destroy(cptr::ptr<stack_node>(n));
    n = next;
  }
  CHECK(count == kThreads * kPerThread);
  bool all = true;
  for (bool s : seen) {
    all = all && s;
  }
  CHECK(all);
}

TEST(fancy_pointer_arithmetic) {
  cptr::ptr<int> block = cptr::fancy_allocator<int>().allocate(8);
  for (int i = 0; i < 8; i++) {
    block[i] = i * 10;
  }
  cptr::ptr<int> p = block;
  ++p;
  CHECK(*p == 10);
  p += 3;
  CHECK(*p == 40);
  p--;
  CHECK(*p == 30);
  CHECK(*(p + 2) == 50 && *(2 + p) == 50 && *(p - 1) == 20);
  CHECK(p - block == 3);
  cptr::ptr<int> q = p++;
  CHECK(*q == 30 && *p == 40);
  q = p--;
  CHECK(*q == 40 && *p == 30);
  --p;
  p -= 2;
  CHECK(p == block);
  cptr::fancy_allocator<int>().deallocate(block, 8);
}

TEST(null_literals_and_explicit_casts) {
  cptr::ptr<int> p = 0;
  CHECK(p == 0 && !p);
  p = cptr::make<int>(3);
  CHECK(!(p == 0));
  p = 0;
  CHECK(!p);

  cptr::ptr<derived> d = cptr::make<derived>();
  base* b = d.get();
  cptr::ptr<derived> back(b);
  CHECK(back == d);
  cptr::ptr<base> pb = d;
  cptr::ptr<derived> back2(pb);
  CHECK(back2 == d);
  cptr::ptr<void> v = d.get();
  cptr::ptr<derived> from_void(v);
  CHECK(from_void == d);
  cptr::destroy(d);
}

TEST(fancy_allocator_through_allocator_traits) {
  using alloc = cptr::fancy_allocator<std::string>;
  using traits = std::allocator_traits<alloc>;
  static_assert(std::is_same_v<traits::pointer, cptr::ptr<std::string>>);
  static_assert(std::is_same_v<traits::void_pointer, cptr::ptr<void>>);
  alloc a;
  traits::pointer p = traits::allocate(a, 2);
  traits::construct(a, std::to_address(p), "first");
  a.construct(p + 1, std::string(40, 'x'));
  CHECK(p[0] == "first" && p[1].size() == 40);
  a.destroy(p + 1);
  traits::destroy(a, std::to_address(p));
  traits::deallocate(a, p, 2);
  bool threw = false;
  try {
    (void)a.allocate(std::size_t(-1) / 2);
  } catch (const std::bad_array_new_length&) {
    threw = true;
  }
  CHECK(threw);
  cptr::fancy_allocator<int> ints(a);
  CHECK(ints == a);
  CHECK(cptr::ptr<int>::pointer_to(*cptr::make<int>(1)) != nullptr);
}

TEST(ptr_is_a_random_access_iterator) {
  static_assert(std::random_access_iterator<cptr::ptr<int>>);
  static_assert(std::is_same_v<std::iterator_traits<cptr::ptr<int>>::reference,
                               int&>);
  cptr::ptr<int> block = cptr::fancy_allocator<int>().allocate(4);
  for (int i = 0; i < 4; i++) {
    block[i] = 3 - i;
  }
  std::sort(block, block + 4);
  CHECK(block[0] == 0 && block[3] == 3);
  cptr::fancy_allocator<int>().deallocate(block, 4);
}
