#include <algorithm>
#include <memory>
#include <stdexcept>
#include <string>
#include <thread>
#include <unordered_set>
#include <vector>

#include "check.hpp"
#include "cptr/all.hpp"

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

namespace {
struct left_base {
  long l = 1;
};
struct right_base {
  long r = 2;
};
struct two_bases : left_base, right_base {};
}  // namespace

// cv and void conversions copy the offset; a base at a non-zero offset must
// still be adjusted.
TEST(conversions_keep_or_adjust_the_offset) {
  cptr::ptr<two_bases> d = cptr::make<two_bases>();
  cptr::ptr<const two_bases> c = d;
  cptr::ptr<void> v = d;
  cptr::ptr<const void> cv = c;
  CHECK(c.bits() == d.bits());
  CHECK(v.bits() == d.bits());
  CHECK(cv.bits() == d.bits());
  cptr::ptr<right_base> r = d;
  CHECK(r.get() == static_cast<right_base*>(d.get()));
  CHECK(r.bits() == d.bits() + sizeof(left_base));
  CHECK(r->r == 2);
  cptr::ptr<const right_base> cr = c;
  CHECK(cr.bits() == r.bits());
  cptr::ptr<two_bases> null;
  cptr::ptr<right_base> null_base = null;
  CHECK(null_base == nullptr);
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
  static_assert(
      std::is_same_v<std::iterator_traits<cptr::ptr<int>>::reference, int&>);
  cptr::ptr<int> block = cptr::fancy_allocator<int>().allocate(4);
  for (int i = 0; i < 4; i++) {
    block[i] = 3 - i;
  }
  std::sort(block, block + 4);
  CHECK(block[0] == 0 && block[3] == 3);
  cptr::fancy_allocator<int>().deallocate(block, 4);
}

namespace {
template <class A, class B>
concept ternary_compiles = requires(bool c, A a, B b) { c ? a : b; };
}  // namespace

// ptr converts both ways, so mixing it with T* in ?: is ambiguous, and any
// T* compresses silently. strict_ptr only converts to T* implicitly.
static_assert(!ternary_compiles<cptr::ptr<int>, int*>);
static_assert(ternary_compiles<cptr::strict_ptr<int>, int*>);
static_assert(std::is_convertible_v<int*, cptr::ptr<int>>);
static_assert(!std::is_convertible_v<int*, cptr::strict_ptr<int>>);
static_assert(!std::is_assignable_v<cptr::strict_ptr<int>&, int*>);
static_assert(std::is_convertible_v<cptr::strict_ptr<int>, int*>);
// A ptr may hold a pointer that was compressed implicitly, so it does not
// turn into a strict_ptr implicitly either; this used to compile.
static_assert(!std::is_convertible_v<cptr::ptr<int>, cptr::strict_ptr<int>>);
static_assert(std::is_constructible_v<cptr::strict_ptr<int>, cptr::ptr<int>>);
static_assert(std::is_convertible_v<cptr::strict_ptr<int>, cptr::ptr<int>>);
static_assert(
    std::is_convertible_v<cptr::strict_ptr<int>, cptr::ptr<const int>>);
static_assert(sizeof(cptr::strict_ptr<int>) == 4);

TEST(strict_ptr_needs_explicit_compression) {
  int* raw = static_cast<int*>(cptr::default_cage::allocate(sizeof(int)));
  *raw = 3;
  cptr::strict_ptr<int> s(raw);
  CHECK(*s == 3);
  int* other = nullptr;
  int* picked = s ? s : other;  // ?: works: s converts to int*
  CHECK(picked == raw);
  cptr::ptr<int> loose = s;           // converts to ptr implicitly...
  cptr::strict_ptr<int> back(loose);  // ...and back only explicitly
  CHECK(back == s);
  CHECK(back == loose && loose == back && !(back < loose));
  cptr::strict_ptr<int> from_make(cptr::make<int>(4));
  CHECK(*from_make == 4);
  s = nullptr;
  CHECK(!s);
  cptr::destroy(from_make);
  cptr::default_cage::deallocate(raw);
}

// atomic_ptr offers the std::atomic<T*> interface that applies to it.
static_assert(cptr::atomic_ptr<int>::is_always_lock_free);
static_assert(requires(cptr::atomic_ptr<int>& a, int*& e, int* d) {
  a.compare_exchange_weak(e, d, std::memory_order_acq_rel,
                          std::memory_order_acquire);
  a.compare_exchange_strong(e, d, std::memory_order_acq_rel,
                            std::memory_order_acquire);
  a.wait(d);
  a.notify_one();
  a.notify_all();
  { a.is_lock_free() } -> std::same_as<bool>;
  { static_cast<int*>(a) } -> std::same_as<int*>;
  { a = d } -> std::same_as<int*>;
});

TEST(atomic_ptr_std_interface) {
  auto* a = static_cast<int*>(cptr::default_cage::allocate(sizeof(int)));
  auto* b = static_cast<int*>(cptr::default_cage::allocate(sizeof(int)));
  cptr::atomic_ptr<int> p(a);
  CHECK(p.is_lock_free());
  int* expected = b;
  CHECK(!p.compare_exchange_strong(expected, b, std::memory_order_acq_rel,
                                   std::memory_order_acquire));
  CHECK(expected == a);
  CHECK(p.compare_exchange_strong(expected, b, std::memory_order_acq_rel,
                                  std::memory_order_acquire));
  expected = b;
  while (!p.compare_exchange_weak(expected, a, std::memory_order_release,
                                  std::memory_order_relaxed)) {
  }
  CHECK(static_cast<int*>(p) == a);
  CHECK((p = b) == b);
  CHECK(p.load() == b);

  // wait() returns once another thread has changed the value and notified.
  std::thread waker([&] {
    p.store(a, std::memory_order_release);
    p.notify_all();
  });
  p.wait(b, std::memory_order_acquire);
  CHECK(p.load() == a);
  waker.join();
  cptr::default_cage::deallocate(a);
  cptr::default_cage::deallocate(b);
}

// Everything that works on the stored offset alone, without the cage base,
// can run at compile time.
namespace {
constexpr bool offset_arithmetic_is_constexpr() {
  using p32 = cptr::ptr<std::uint32_t>;
  p32 null = nullptr;
  p32 zero = 0;
  if (null || zero != nullptr || !(null == zero)) {
    return false;
  }
  p32 a = p32::from_bits(64);
  p32 b = a + 3;
  b -= 1;
  ++b;
  b++;
  --b;
  b--;
  b += 2;
  cptr::ptr<const std::uint32_t> c = b;  // same address: copies the offset
  cptr::ptr<void> v = a;
  p32 d = 4 + a;
  d = d - 4;
  d = nullptr;
  d = 0;
  return b.bits() == 64 + 4 * 4 && b - a == 4 && c.bits() == b.bits() &&
         v.bits() == 64 && (a <=> b) < 0 && a != b && !d;
}
static_assert(offset_arithmetic_is_constexpr());

constexpr bool packing_is_constexpr() {
  cptr::ptr_with_payload<int> pp;
  pp.set_payload(7);
  cptr::tagged_ptr<std::uint64_t, 2> t;
  cptr::ptr_pair<int> pair;
  (void)pair;
  return pp.payload() == 7 && t.tag() == 0;
}
static_assert(packing_is_constexpr());
[[maybe_unused]] constinit cptr::atomic_ptr<int> global_atomic;
}  // namespace

// Only a null pointer constant converts to ptr, as for a raw pointer. An
// integer variable, a bool or a non-zero literal used to convert silently to
// null (and compare equal to null), with only a debug-build assertion.
namespace {
template <class P>
concept from_int_variable = requires(int i) { P(i); };
template <class P>
concept from_bool_variable = requires(bool b) { P(b); };
template <class P>
concept from_five = requires { P(5); };
template <class P>
concept from_true = requires { P(true); };
template <class P>
concept from_char = requires { P('a'); };
template <class P>
concept equals_int_variable = requires(P p, int i) { p == i; };
template <class P>
concept equals_five = requires(P p) { p == 5; };
template <class P>
concept assign_int_variable = requires(P p, int i) { p = i; };
template <class P>
concept assign_five = requires(P p) { p = 5; };
template <class P>
concept rejects_non_null_integers =
    !from_int_variable<P> && !from_bool_variable<P> && !from_five<P> &&
    !from_true<P> && !from_char<P> && !equals_int_variable<P> &&
    !equals_five<P> && !assign_int_variable<P> && !assign_five<P> &&
    !std::is_convertible_v<int, P> && !std::is_convertible_v<bool, P> &&
    !std::is_convertible_v<char, P>;
static_assert(rejects_non_null_integers<cptr::ptr<int>>);
static_assert(rejects_non_null_integers<cptr::strict_ptr<int>>);
static_assert(rejects_non_null_integers<cptr::ptr<const void>>);

template <class P>
constexpr bool null_pointer_constants_convert() {
  P a = 0;
  P b = NULL;  // NOLINT(modernize-use-nullptr)
  P c = nullptr;
  P d = 0L;
  P e(0);
  a = 0;
  a = NULL;  // NOLINT(modernize-use-nullptr)
  a = nullptr;
  return !a && !b && !c && !d && !e && a == 0 && 0 == a && !(a != 0) &&
         a == NULL && a == nullptr && nullptr == b && a == c;
}
static_assert(null_pointer_constants_convert<cptr::ptr<int>>());
static_assert(null_pointer_constants_convert<cptr::strict_ptr<int>>());
static_assert(null_pointer_constants_convert<cptr::ptr<const void>>());

// A literal 0 in a constructor's member initialiser list, as plf::list
// writes it.
struct holds_null {
  cptr::ptr<int> p;
  cptr::strict_ptr<int> s;
  constexpr holds_null() : p(0), s(NULL) {}  // NOLINT(modernize-use-nullptr)
};
static_assert(!holds_null().p && !holds_null().s);
}  // namespace

// std::to_address and std::pointer_traits see a null ptr as null. Without a
// pointer_traits specialisation, std::to_address fell back to operator->,
// which skips the null check and returned the cage base.
static_assert(
    std::is_same_v<std::pointer_traits<cptr::ptr<const int>>::rebind<void>,
                   cptr::ptr<void>>);
static_assert(
    std::is_same_v<std::pointer_traits<cptr::ptr<int>>::element_type, int>);
static_assert(
    std::is_same_v<std::pointer_traits<cptr::strict_ptr<int>>::rebind<long>,
                   cptr::strict_ptr<long>>);
static_assert(std::contiguous_iterator<cptr::ptr<int>>);
static_assert(std::contiguous_iterator<cptr::ptr<const int>>);
static_assert(std::contiguous_iterator<cptr::strict_ptr<int>>);

TEST(to_address_of_null_is_null) {
  auto one = cptr::make<int>(1);  // the cage is initialised
  cptr::ptr<int> null;
  CHECK(std::to_address(null) == nullptr);
  CHECK(std::to_address(one) == one.get());
  CHECK(std::pointer_traits<cptr::ptr<int>>::to_address(null) == nullptr);
  CHECK(std::pointer_traits<cptr::ptr<int>>::pointer_to(*one) == one);
  std::vector<int, cptr::fancy_allocator<int>> empty;
  CHECK(empty.data() == nullptr);
  cptr::destroy(one);
}

TEST(contiguous_copy_over_ptr_range) {
  cptr::fancy_allocator<int> alloc;
  cptr::ptr<int> block = alloc.allocate(100);
  for (int i = 0; i < 100; i++) {
    block[i] = i;
  }
  std::vector<int> out(100);
  std::copy(block, block + 100, out.begin());
  CHECK(out[0] == 0 && out[99] == 99);
  std::ranges::copy(out.rbegin(), out.rend(), block);
  CHECK(block[0] == 99 && block[99] == 0);
  alloc.deallocate(block, 100);
}

// Comparing or subtracting a ptr and a raw pointer, or a ptr and a
// strict_ptr, was ambiguous: each side converts to the other.
namespace {
template <class A, class B>
concept equality = requires(A a, B b) {
  { a == b } -> std::same_as<bool>;
  { b == a } -> std::same_as<bool>;
  { a != b } -> std::same_as<bool>;
};
template <class A, class B>
concept ordering = requires(A a, B b) {
  { a <=> b } -> std::same_as<std::strong_ordering>;
  { b <=> a } -> std::same_as<std::strong_ordering>;
  a < b;
  b >= a;
};
template <class A, class B>
concept difference = requires(A a, B b) {
  { a - b } -> std::same_as<std::ptrdiff_t>;
  { b - a } -> std::same_as<std::ptrdiff_t>;
};
using P = cptr::ptr<int>;
using S = cptr::strict_ptr<int>;
static_assert(equality<P, int*> && ordering<P, int*> && difference<P, int*>);
static_assert(equality<S, int*> && ordering<S, int*> && difference<S, int*>);
static_assert(difference<P, const int*> &&
              difference<cptr::ptr<const int>, int*>);
static_assert(equality<S, P> && ordering<S, P> && difference<S, P>);
static_assert(equality<P, cptr::ptr<const int>> &&
              ordering<P, cptr::ptr<const int>>);
static_assert(equality<cptr::ptr<derived>, base*> &&
              ordering<cptr::ptr<derived>, base*>);
}  // namespace

TEST(mixed_comparisons_agree_with_raw_pointers) {
  cptr::fancy_allocator<int> alloc;
  P block = alloc.allocate(4);
  int* raw = block.get();
  P null;
  S strict(block + 2);
  CHECK(block + 1 > raw && raw < block + 1 && block + 1 != raw);
  CHECK((block + 2 <=> raw + 2) == 0 && block + 2 == raw + 2);
  CHECK(block + 3 - raw == 3 && raw - (block + 3) == -3);
  CHECK((block + 3) - static_cast<const int*>(raw) == 3);
  CHECK(null < raw && raw > null && null == static_cast<int*>(nullptr));
  CHECK((null <=> static_cast<int*>(nullptr)) == 0);
  CHECK(strict == block + 2 && block + 2 == strict && strict != block);
  CHECK(block < strict && strict > block && null < strict);
  CHECK(strict - block == 2 && block - strict == -2);
  alloc.deallocate(block, 4);
}

// destroy() of a pointer to const did not compile: the static path
// initialised a void* from a const T*, the polymorphic path
// dynamic_cast<void*> from a const T*. delete accepts both.
namespace {
template <class P>
concept destroyable = requires(P p) { cptr::destroy(p); };
static_assert(destroyable<cptr::ptr<const int>> &&
              destroyable<cptr::ptr<const base>> &&
              destroyable<cptr::nonnull_ptr<int>>);
}  // namespace

TEST(destroy_through_const_and_nonnull) {
  auto before = cptr::default_cage::allocated_bytes();
  cptr::ptr<const int> c = cptr::make<int>(1);
  cptr::destroy(c);
  cptr::ptr<const base> cb = cptr::make<derived>();
  CHECK(cb->b == 1);
  cptr::destroy(cb);
  cptr::ptr<const volatile two_bases> cv = cptr::make<two_bases>();
  cptr::destroy(cv);
  cptr::nonnull_ptr<int> n(cptr::make<int>(2).get());
  cptr::destroy(n);
  CHECK(cptr::default_cage::allocated_bytes() == before);
}

// nonnull_ptr converts like ptr: derived to base, to ptr and strict_ptr, and
// back from its bits.
static_assert(
    std::is_convertible_v<cptr::nonnull_ptr<derived>, cptr::nonnull_ptr<base>>);
static_assert(std::is_convertible_v<cptr::nonnull_ptr<int>, cptr::ptr<int>>);
static_assert(
    std::is_convertible_v<cptr::nonnull_ptr<int>, cptr::strict_ptr<int>>);
static_assert(
    std::is_convertible_v<cptr::nonnull_ptr<derived>, cptr::ptr<const base>>);
static_assert(
    std::is_convertible_v<cptr::nonnull_ptr<int>, cptr::ptr<const void>>);
static_assert(!std::is_convertible_v<cptr::nonnull_ptr<base>,
                                     cptr::nonnull_ptr<derived>>);
static_assert(!std::is_convertible_v<cptr::nonnull_ptr<int>, cptr::ptr<long>>);
static_assert(cptr::nonnull_ptr<int>::from_bits(8).bits() == 8);
static_assert(cptr::nonnull_ptr<const int>(cptr::nonnull_ptr<int>::from_bits(8))
                  .bits() == 8);
static_assert(
    cptr::ptr<const void>(cptr::nonnull_ptr<int>::from_bits(8)).bits() == 8);
static_assert(cptr::nonnull_ptr<int>::from_bits(4) <
              cptr::nonnull_ptr<int>::from_bits(8));

TEST(nonnull_ptr_conversions) {
  cptr::ptr<two_bases> d = cptr::make<two_bases>();
  cptr::nonnull_ptr<two_bases> nd(d.get());
  cptr::nonnull_ptr<right_base> nr = nd;
  CHECK(nr.get() == static_cast<right_base*>(d.get()));
  CHECK(nr->r == 2);
  cptr::ptr<right_base> r = nd;
  CHECK(r == nr.get());
  cptr::ptr<two_bases> p = nd;
  CHECK(p == d && p.bits() == nd.bits());
  cptr::strict_ptr<const two_bases> s = nd;
  CHECK(s == d);
  CHECK(cptr::nonnull_ptr<two_bases>::from_bits(nd.bits()) == nd);
  cptr::destroy(nd);
}

// Ownership: std::unique_ptr with cptr::deleter stores a 4-byte ptr.
static_assert(sizeof(std::unique_ptr<int, cptr::deleter<int>>) == 4);
static_assert(std::is_same_v<std::unique_ptr<int, cptr::deleter<int>>::pointer,
                             cptr::ptr<int>>);
static_assert(
    std::is_convertible_v<std::unique_ptr<derived, cptr::deleter<derived>>,
                          std::unique_ptr<base, cptr::deleter<base>>>);

namespace {
struct counted {
  static inline int live = 0;
  static inline int throw_at = -1;
  int value = 7;
  counted() {
    if (live == throw_at) {
      throw std::runtime_error("counted");
    }
    live++;
  }
  counted(const counted&) = delete;
  ~counted() { live--; }
};
}  // namespace

TEST(unique_ptr_with_cage_deleter) {
  auto before = cptr::default_cage::allocated_bytes();
  {
    std::unique_ptr<counted, cptr::deleter<counted>> one(cptr::make<counted>());
    CHECK(counted::live == 1 && one->value == 7);
    std::unique_ptr<derived, cptr::deleter<derived>> d(cptr::make<derived>());
    std::unique_ptr<base, cptr::deleter<base>> b = std::move(d);
    CHECK(b->b == 1 && !d);
  }
  CHECK(counted::live == 0);
  CHECK(cptr::default_cage::allocated_bytes() == before);
}

TEST(make_array_and_destroy_array) {
  auto before = cptr::default_cage::allocated_bytes();
  cptr::ptr<int> ints = cptr::make_array<int>(5);
  CHECK(ints[0] == 0 && ints[4] == 0);  // value-initialised
  ints[4] = 9;
  cptr::destroy_array(ints, 5);
  cptr::ptr<counted> c = cptr::make_array<counted>(3);
  CHECK(counted::live == 3 && c[2].value == 7);
  cptr::destroy_array(c, 3);
  CHECK(counted::live == 0);
  // A throwing constructor: the elements built so far are destroyed and the
  // memory is freed.
  counted::throw_at = 2;
  bool threw = false;
  try {
    (void)cptr::make_array<counted>(4);
  } catch (const std::runtime_error&) {
    threw = true;
  }
  counted::throw_at = -1;
  CHECK(threw && counted::live == 0);
  threw = false;
  try {
    (void)cptr::make_array<counted>(std::size_t(-1) / 2);
  } catch (const std::bad_array_new_length&) {
    threw = true;
  }
  CHECK(threw);
  cptr::destroy_array(cptr::ptr<counted>(), 3);  // null is a no-op
  CHECK(cptr::default_cage::allocated_bytes() == before);
}

// The packing types compare equal when all their bits do.
static_assert(std::equality_comparable<cptr::ptr_pair<long>>);
static_assert(std::equality_comparable<cptr::ptr_with_payload<long>>);
static_assert(std::equality_comparable<cptr::tagged_ptr<long, 1>>);

TEST(packed_types_compare) {
  auto a = cptr::make<aligned>();
  auto b = cptr::make<aligned>();
  cptr::ptr_pair<aligned> p1(a, b), p2(a, b), p3(b, a);
  CHECK(p1 == p2 && p1 != p3);
  cptr::ptr_with_payload<aligned> w1(a, 1), w2(a, 1), w3(a, 2);
  CHECK(w1 == w2 && w1 != w3);
  cptr::tagged_ptr<aligned, 2> t1(a, 1), t2(a, 1), t3(b, 1);
  CHECK(t1 == t2 && t1 != t3);
  cptr::destroy(a);
  cptr::destroy(b);
}

// The allocators are constexpr and equal like std::allocator, and their
// max_size() is what the cage can hold.
static_assert(cptr::allocator<int>() == cptr::allocator<long>());
static_assert(cptr::fancy_allocator<int>() ==
              cptr::fancy_allocator<long>(cptr::fancy_allocator<int>()));
static_assert(cptr::allocator<int>().max_size() ==
              cptr::default_cage::size / sizeof(int));
static_assert(std::allocator_traits<cptr::fancy_allocator<long>>::max_size(
                  cptr::fancy_allocator<long>()) ==
              cptr::default_cage::size / sizeof(long));

TEST(allocator_rejects_more_than_the_cage) {
  cptr::allocator<int> a;
  bool threw = false;
  try {
    (void)a.allocate(a.max_size() + 1);
  } catch (const std::bad_array_new_length&) {
    threw = true;
  }
  CHECK(threw);
}
