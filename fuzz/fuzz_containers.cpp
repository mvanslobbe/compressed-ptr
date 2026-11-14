// libFuzzer target for the bundled containers. The input picks one of
// cptr::list, cptr::forward_list, cptr::ordered_map and cptr::unordered_map
// and drives a sequence of operations on two of them and on the std
// containers they mirror, comparing the contents after every step. Keys and
// values come from a small range, so that duplicates, collisions and equal
// elements in sorts are common. The ordered map's red-black invariants are
// checked too.
//
// Each container runs in two modes. In the plain mode the elements are
// ints in the default cage. In the throwing mode they are `fz` values whose
// copies, assignments, comparisons and hashes throw on a countdown the
// input chooses, in a small cage whose allocate() throws std::bad_alloc on
// another countdown. After an operation throws, the container must still
// be valid; where the container promises the strong guarantee it must also
// be unchanged, and otherwise the mirror is resynchronised from it. When the
// containers are gone, the cage's allocated_bytes() must be back where it
// started, since ASan cannot see leaks inside the cage.
//
// Build: cmake -DCOMPRESSED_PTR_BUILD_FUZZERS=ON with clang, then run
//   ./build/fuzz_containers -max_total_time=60
#include <fuzzer/FuzzedDataProvider.h>

#include <algorithm>
#include <compare>
#include <cstdio>
#include <cstdlib>
#include <forward_list>
#include <iterator>
#include <list>
#include <map>
#include <new>
#include <stdexcept>
#include <unordered_map>
#include <utility>
#include <vector>

#include "cptr/all.hpp"

namespace {

#define FUZZ_CHECK(cond)                                                    \
  do {                                                                      \
    if (!(cond)) {                                                          \
      std::fprintf(stderr, "%s:%d: check failed: %s\n", __FILE__, __LINE__, \
                   #cond);                                                  \
      std::abort();                                                         \
    }                                                                       \
  } while (0)

constexpr std::size_t kMaxSize = 512;

// The countdowns: the element operation or the allocation that throws when
// its countdown reaches zero; -1 never throws.
int g_throw = -1;
int g_alloc = -1;

struct fuzz_error {};

void tick() {
  if (g_throw >= 0 && g_throw-- == 0) {
    throw fuzz_error{};
  }
}

// An element whose copies, copy assignments and comparisons can throw.
// Moves never do, as for most real types.
struct fz {
  int v = 0;
  fz() = default;
  fz(int x) : v(x) {}
  fz(const fz& o) : v(o.v) { tick(); }
  fz(fz&& o) noexcept : v(o.v) {}
  fz& operator=(const fz& o) {
    tick();
    v = o.v;
    return *this;
  }
  fz& operator=(fz&& o) noexcept {
    v = o.v;
    return *this;
  }
  friend bool operator==(const fz& a, const fz& b) {
    tick();
    return a.v == b.v;
  }
  friend bool operator==(const fz& a, int b) {
    tick();
    return a.v == b;
  }
  friend std::strong_ordering operator<=>(const fz& a, const fz& b) {
    tick();
    return a.v <=> b.v;
  }
  friend std::strong_ordering operator<=>(const fz& a, int b) {
    tick();
    return a.v <=> b;
  }
};

int val(int x) { return x; }
int val(const fz& x) { return x.v; }

// A 16 MiB cage whose allocations fail on a countdown, as if it ran out.
struct failing_cage : cptr::cage<failing_cage, 24> {
  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (g_alloc >= 0 && g_alloc-- == 0) {
      throw std::bad_alloc();
    }
    return cptr::cage<failing_cage, 24>::allocate(bytes, align);
  }
};

void disarm() {
  g_throw = -1;
  g_alloc = -1;
}

// Run `f` with the countdowns the input picks (in the throwing mode), and
// report whether it threw one of the injected exceptions.
template <class F>
bool attempt(FuzzedDataProvider& in, bool throwing, F f) {
  if (throwing) {
    g_throw = in.ConsumeIntegralInRange(-1, 12);
    g_alloc = in.ConsumeIntegralInRange(-1, 6);
  }
  try {
    f();
  } catch (const fuzz_error&) {
    disarm();
    return true;
  } catch (const std::bad_alloc&) {
    disarm();
    return true;
  }
  disarm();
  return false;
}

template <class L>
typename L::iterator nth(L& l, std::size_t k) {
  auto it = l.begin();
  std::advance(it, std::ptrdiff_t(k));
  return it;
}

template <class L>
typename L::iterator before(L& l, std::size_t k) {
  auto it = l.before_begin();
  std::advance(it, std::ptrdiff_t(k));
  return it;
}

template <class A, class B>
bool same_values(const A& a, const B& b) {
  return std::equal(
      a.begin(), a.end(), b.begin(), b.end(),
      [](const auto& x, const auto& y) { return val(x) == val(y); });
}

template <class A, class B>
bool same_pairs(const A& a, const B& b) {
  return std::equal(
      a.begin(), a.end(), b.begin(), b.end(), [](const auto& x, const auto& y) {
        return val(x.first) == val(y.first) && val(x.second) == val(y.second);
      });
}

// The list's links agree in both directions and with size().
template <class L>
void check_list_links(const L& m) {
  std::vector<int> forward, back;
  for (const auto& x : m) {
    forward.push_back(val(x));
  }
  for (auto it = m.rbegin(); it != m.rend(); ++it) {
    back.push_back(val(*it));
  }
  std::reverse(back.begin(), back.end());
  FUZZ_CHECK(forward.size() == m.size() && forward == back);
}

// The list is valid and holds what `r` holds.
template <class L, class R>
void check_list(const L& m, const R& r) {
  check_list_links(m);
  FUZZ_CHECK(m.size() == r.size());
  FUZZ_CHECK(same_values(m, r));
}

template <class T, class Cage>
void fuzz_list(FuzzedDataProvider& in, bool throwing) {
  using L = cptr::list<T, Cage>;
  L a, b;
  std::list<T> ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    std::size_t k = in.ConsumeIntegralInRange<std::size_t>(0, r.size());
    T v = in.ConsumeIntegralInRange(0, 15);
    // Strong: on a throw the list must be unchanged. Basic: it must only
    // be valid, and the mirror is rebuilt from it.
    bool strong = true;
    bool threw = false;
    switch (in.ConsumeIntegralInRange(0, 22)) {
      case 0:
        if (r.size() < kMaxSize) {
          threw = attempt(in, throwing, [&] { m.insert(nth(m, k), v); });
          if (!threw) {
            r.insert(nth(r, k), v);
          }
        }
        break;
      case 1:
        if (k < r.size()) {
          m.erase(nth(m, k));
          r.erase(nth(r, k));
        }
        break;
      case 2: {
        std::size_t j = in.ConsumeIntegralInRange<std::size_t>(k, r.size());
        auto it = m.erase(nth(m, k), nth(m, j));
        auto rit = r.erase(nth(r, k), nth(r, j));
        FUZZ_CHECK(std::distance(m.begin(), it) ==
                   std::distance(r.begin(), rit));
        break;
      }
      case 3: {
        std::size_t k2 = in.ConsumeIntegralInRange<std::size_t>(0, r2.size());
        std::size_t j2 = in.ConsumeIntegralInRange<std::size_t>(k2, r2.size());
        m.splice(nth(m, k), m2, nth(m2, k2), nth(m2, j2));
        r.splice(nth(r, k), r2, nth(r2, k2), nth(r2, j2));
        break;
      }
      case 4:
        if (!r.empty()) {
          std::size_t from =
              in.ConsumeIntegralInRange<std::size_t>(0, r.size() - 1);
          m.splice(nth(m, k), m, nth(m, from));
          r.splice(nth(r, k), r, nth(r, from));
        }
        break;
      case 5:
        strong = false;
        threw = attempt(in, throwing, [&] { m.sort(); });
        if (!threw) {
          r.sort();
        }
        break;
      case 6:
        // Sort both first, without throwing, then merge with throwing.
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        strong = false;
        threw = attempt(in, throwing, [&] { m.merge(m2); });
        if (!threw) {
          r.merge(r2);
          FUZZ_CHECK(m2.empty());
        } else {
          check_list_links(m2);
          r2.assign(m2.begin(), m2.end());
        }
        break;
      case 7:
        m.reverse();
        r.reverse();
        break;
      case 8: {
        strong = false;
        std::size_t removed = 0;
        threw = attempt(in, throwing, [&] { removed = m.remove(v); });
        if (!threw) {
          FUZZ_CHECK(removed == r.remove(v));
        }
        break;
      }
      case 9: {
        strong = false;
        std::size_t removed = 0;
        threw = attempt(in, throwing, [&] { removed = m.unique(); });
        if (!threw) {
          FUZZ_CHECK(removed == r.unique());
        }
        break;
      }
      case 10: {
        strong = false;
        std::size_t n =
            std::min<std::size_t>(std::size_t(val(v)) * 8, kMaxSize);
        threw = attempt(in, throwing, [&] { m.resize(n, v); });
        if (!threw) {
          r.resize(n, v);
        }
        break;
      }
      case 11:
        if (r.size() < kMaxSize) {
          threw = attempt(in, throwing, [&] { m.push_front(v); });
          if (!threw) {
            r.push_front(v);
          }
        }
        break;
      case 12: {
        bool eq = false;
        std::strong_ordering cmp = std::strong_ordering::equal;
        threw = attempt(in, throwing, [&] {
          eq = a == b;
          cmp = a <=> b;
        });
        if (!threw) {
          FUZZ_CHECK(eq == (ra == rb));
          FUZZ_CHECK(cmp == (ra <=> rb));
        }
        break;
      }
      case 13:
        // A copy that throws must leave the source alone and free itself.
        threw = attempt(in, throwing, [&] {
          L copy = m;
          FUZZ_CHECK(copy.size() == m.size());
          m = std::move(copy);
        });
        break;
      case 14:
        strong = false;
        threw = attempt(in, throwing, [&] { m = m2; });
        if (!threw) {
          r = r2;
        }
        break;
      case 15:
        m = std::move(m2);
        r = std::move(r2);
        m2.clear();
        r2.clear();
        break;
      case 16:
        if (in.ConsumeBool()) {
          swap(m, m2);
        } else {
          m.swap(m2);
        }
        std::swap(r, r2);
        break;
      case 17:
        m.clear();
        r.clear();
        break;
      case 18: {
        strong = false;
        std::size_t n = in.ConsumeIntegralInRange<std::size_t>(0, 8);
        if (in.ConsumeBool()) {
          threw = attempt(in, throwing, [&] { m.assign(n, v); });
          if (!threw) {
            r.assign(n, v);
          }
        } else {
          std::vector<T> src(n, v);
          threw =
              attempt(in, throwing, [&] { m.assign(src.begin(), src.end()); });
          if (!threw) {
            r.assign(src.begin(), src.end());
          }
        }
        break;
      }
      case 19:
        if (!r.empty()) {
          if (in.ConsumeBool()) {
            FUZZ_CHECK(val(m.front()) == val(r.front()));
            m.pop_front();
            r.pop_front();
          } else {
            FUZZ_CHECK(val(m.back()) == val(r.back()));
            m.pop_back();
            r.pop_back();
          }
        }
        break;
      case 20:
        if (r.size() < kMaxSize) {
          bool back = in.ConsumeBool();
          threw = attempt(in, throwing, [&] {
            if (back) {
              m.emplace_back(v);
            } else {
              m.emplace_front(v);
            }
          });
          if (!threw) {
            back ? r.emplace_back(v) : r.emplace_front(v);
          }
        }
        break;
      case 21:
        if (r.size() < kMaxSize) {
          std::size_t n = in.ConsumeIntegralInRange<std::size_t>(0, 6);
          threw = attempt(in, throwing, [&] {
            auto it = m.insert(nth(m, k), n, v);
            FUZZ_CHECK(std::distance(m.begin(), it) == std::ptrdiff_t(k));
          });
          if (!threw) {
            r.insert(nth(r, k), n, v);
          }
        }
        break;
      case 22:
        if (r.size() < kMaxSize) {
          std::vector<T> src(in.ConsumeIntegralInRange<std::size_t>(0, 6), v);
          threw = attempt(in, throwing,
                          [&] { m.insert(nth(m, k), src.begin(), src.end()); });
          if (!threw) {
            r.insert(nth(r, k), src.begin(), src.end());
          }
        }
        break;
    }
    if (threw && !strong) {
      // Basic guarantee: valid, and the mirror follows the list.
      check_list_links(m);
      r.assign(m.begin(), m.end());
    }
    check_list(a, ra);
    check_list(b, rb);
  }
}

template <class T, class Cage>
void fuzz_forward_list(FuzzedDataProvider& in, bool throwing) {
  using L = cptr::forward_list<T, Cage>;
  L a, b;
  std::forward_list<T> ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    std::size_t n = std::size_t(std::distance(r.begin(), r.end()));
    std::size_t n2 = std::size_t(std::distance(r2.begin(), r2.end()));
    std::size_t k = in.ConsumeIntegralInRange<std::size_t>(0, n);
    T v = in.ConsumeIntegralInRange(0, 15);
    bool strong = true;
    bool threw = false;
    switch (in.ConsumeIntegralInRange(0, 18)) {
      case 0:
        if (n < kMaxSize) {
          threw =
              attempt(in, throwing, [&] { m.insert_after(before(m, k), v); });
          if (!threw) {
            r.insert_after(before(r, k), v);
          }
        }
        break;
      case 1:
        if (k < n) {
          m.erase_after(before(m, k));
          r.erase_after(before(r, k));
        }
        break;
      case 2: {
        std::size_t j = in.ConsumeIntegralInRange<std::size_t>(k, n);
        auto last = j + 1 > n ? m.end() : before(m, j + 1);
        auto rlast = j + 1 > n ? r.end() : before(r, j + 1);
        m.erase_after(before(m, k), last);
        r.erase_after(before(r, k), rlast);
        break;
      }
      case 3: {
        std::size_t k2 = in.ConsumeIntegralInRange<std::size_t>(0, n2);
        std::size_t j2 = in.ConsumeIntegralInRange<std::size_t>(k2, n2);
        auto last = j2 + 1 > n2 ? m2.end() : before(m2, j2 + 1);
        auto rlast = j2 + 1 > n2 ? r2.end() : before(r2, j2 + 1);
        m.splice_after(before(m, k), m2, before(m2, k2), last);
        r.splice_after(before(r, k), r2, before(r2, k2), rlast);
        break;
      }
      case 4:
        strong = false;
        threw = attempt(in, throwing, [&] { m.sort(); });
        if (!threw) {
          r.sort();
        }
        break;
      case 5:
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        strong = false;
        threw = attempt(in, throwing, [&] { m.merge(m2); });
        if (!threw) {
          r.merge(r2);
          FUZZ_CHECK(m2.empty());
        } else {
          r2.assign(m2.begin(), m2.end());
        }
        break;
      case 6:
        m.reverse();
        r.reverse();
        break;
      case 7: {
        strong = false;
        std::size_t removed = 0;
        threw = attempt(in, throwing, [&] { removed = m.remove(v); });
        if (!threw) {
          FUZZ_CHECK(removed == r.remove(v));
        }
        break;
      }
      case 8: {
        strong = false;
        std::size_t removed = 0;
        threw = attempt(in, throwing, [&] { removed = m.unique(); });
        if (!threw) {
          FUZZ_CHECK(removed == r.unique());
        }
        break;
      }
      case 9: {
        strong = false;
        std::size_t len = std::size_t(val(v)) * 8;
        threw = attempt(in, throwing, [&] { m.resize(len, v); });
        if (!threw) {
          r.resize(len, v);
        }
        break;
      }
      case 10: {
        std::strong_ordering cmp = std::strong_ordering::equal;
        bool eq = false;
        threw = attempt(in, throwing, [&] {
          eq = a == b;
          cmp = a <=> b;
        });
        if (!threw) {
          FUZZ_CHECK(eq == (ra == rb));
          FUZZ_CHECK(cmp == (ra <=> rb));
        }
        break;
      }
      case 11:
        threw = attempt(in, throwing, [&] {
          L copy = m;
          m = std::move(copy);
        });
        break;
      case 12:
        strong = false;
        threw = attempt(in, throwing, [&] { m = m2; });
        if (!threw) {
          r = r2;
        }
        break;
      case 13:
        m = std::move(m2);
        r = std::move(r2);
        m2.clear();
        r2.clear();
        break;
      case 14:
        swap(m, m2);
        std::swap(r, r2);
        break;
      case 15:
        m.clear();
        r.clear();
        break;
      case 16: {
        strong = false;
        std::size_t len = in.ConsumeIntegralInRange<std::size_t>(0, 8);
        threw = attempt(in, throwing, [&] { m.assign(len, v); });
        if (!threw) {
          r.assign(len, v);
        }
        break;
      }
      case 17:
        if (n) {
          FUZZ_CHECK(val(m.front()) == val(r.front()));
          m.pop_front();
          r.pop_front();
        }
        break;
      case 18:
        if (n < kMaxSize) {
          std::vector<T> src(in.ConsumeIntegralInRange<std::size_t>(0, 6), v);
          threw = attempt(in, throwing, [&] {
            m.insert_after(before(m, k), src.begin(), src.end());
          });
          if (!threw) {
            r.insert_after(before(r, k), src.begin(), src.end());
          }
        }
        break;
    }
    if (threw && !strong) {
      r.assign(m.begin(), m.end());
    }
    FUZZ_CHECK(same_values(a, ra));
    FUZZ_CHECK(same_values(b, rb));
  }
}

template <class M, class R>
void check_ordered(const M& m, const R& r) {
  FUZZ_CHECK(m.valid());
  FUZZ_CHECK(m.size() == r.size());
  FUZZ_CHECK(same_pairs(m, r));
  FUZZ_CHECK(std::equal(m.rbegin(), m.rend(), r.rbegin(), r.rend(),
                        [](const auto& x, const auto& y) {
                          return val(x.first) == val(y.first);
                        }));
}

template <class T, class Cage>
void fuzz_ordered_map(FuzzedDataProvider& in, bool throwing) {
  using M = cptr::ordered_map<T, T, std::less<>, Cage>;
  using R = std::map<T, T, std::less<>>;
  M a, b;
  R ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    int ikey = in.ConsumeIntegralInRange(0, 255);
    T key = ikey;
    T value = in.ConsumeIntegralInRange(-1000, 1000);
    bool strong = true;
    bool threw = false;
    switch (in.ConsumeIntegralInRange(0, 18)) {
      case 0: {
        bool inserted = false;
        threw = attempt(in, throwing,
                        [&] { inserted = m.emplace(key, value).second; });
        if (!threw) {
          FUZZ_CHECK(inserted == r.emplace(key, value).second);
        }
        break;
      }
      case 1: {
        bool inserted = false;
        threw = attempt(in, throwing, [&] {
          inserted = m.insert_or_assign(key, value).second;
        });
        if (!threw) {
          FUZZ_CHECK(inserted == r.insert_or_assign(key, value).second);
        }
        break;
      }
      case 2: {
        std::size_t erased = 0;
        threw = attempt(in, throwing, [&] { erased = m.erase(key); });
        if (!threw) {
          FUZZ_CHECK(erased == r.erase(key));
        }
        break;
      }
      case 3: {
        T hi = ikey + in.ConsumeIntegralInRange(0, 32);
        std::ptrdiff_t at = 0;
        threw = attempt(in, throwing, [&] {
          auto na = m.erase(m.lower_bound(key), m.upper_bound(hi));
          at = std::distance(m.begin(), na);
        });
        if (!threw) {
          auto nb = r.erase(r.lower_bound(key), r.upper_bound(hi));
          FUZZ_CHECK(at == std::distance(r.begin(), nb));
        }
        break;
      }
      case 4: {
        std::ptrdiff_t lo = 0, up = 0;
        threw = attempt(in, throwing, [&] {
          lo = std::distance(m.begin(), m.lower_bound(key));
          up = std::distance(m.begin(), m.upper_bound(key));
        });
        if (!threw) {
          FUZZ_CHECK(lo == std::distance(r.begin(), r.lower_bound(key)));
          FUZZ_CHECK(up == std::distance(r.begin(), r.upper_bound(key)));
        }
        break;
      }
      case 5: {
        typename M::iterator it;
        threw = attempt(in, throwing, [&] { it = m.find(key); });
        if (!threw) {
          FUZZ_CHECK((it == m.end()) == !r.contains(key));
          if (it != m.end()) {
            auto next = m.erase(it);
            auto rnext = r.erase(r.find(key));
            FUZZ_CHECK(std::distance(m.begin(), next) ==
                       std::distance(r.begin(), rnext));
          }
        }
        break;
      }
      case 6:
        threw = attempt(in, throwing, [&] {
          M copy = m;
          FUZZ_CHECK(copy.valid());
          M moved = std::move(copy);
          FUZZ_CHECK(copy.empty() && moved.size() == m.size());
        });
        break;
      case 7:
        // Not strong: the key may be inserted before the assignment throws.
        strong = false;
        threw = attempt(in, throwing, [&] { m[key] = value; });
        if (!threw) {
          r[key] = value;
        }
        break;
      case 8: {
        int got = 0;
        bool missing = false;
        threw = attempt(in, throwing, [&] {
          try {
            got = val(std::as_const(m).at(key));
          } catch (const std::out_of_range&) {
            missing = true;
          }
        });
        if (!threw) {
          FUZZ_CHECK(missing == !r.contains(key));
          FUZZ_CHECK(missing || got == val(r.at(key)));
        }
        break;
      }
      case 9: {
        std::size_t count = 0;
        std::ptrdiff_t lo = 0, len = 0;
        threw = attempt(in, throwing, [&] {
          count = m.count(key);
          auto [x, y] = std::as_const(m).equal_range(key);
          lo = std::distance(m.cbegin(), x);
          len = std::distance(x, y);
        });
        if (!threw) {
          auto [x, y] = r.equal_range(key);
          FUZZ_CHECK(count == r.count(key));
          FUZZ_CHECK(lo == std::distance(r.begin(), x));
          FUZZ_CHECK(len == std::distance(x, y));
        }
        break;
      }
      case 10: {
        // Hinted insertions, at a hint that may or may not be right.
        std::size_t h = in.ConsumeIntegralInRange<std::size_t>(0, r.size());
        int form = in.ConsumeIntegralInRange(0, 3);
        threw = attempt(in, throwing, [&] {
          auto hint = nth(m, h);
          typename M::iterator it;
          if (form == 0) {
            it = m.emplace_hint(hint, key, value);
          } else if (form == 1) {
            it = m.insert(hint, std::pair<const T, T>(key, value));
          } else if (form == 2) {
            it = m.try_emplace(hint, key, value);
          } else {
            it = m.insert_or_assign(hint, key, value);
          }
          FUZZ_CHECK(val(it->first) == ikey);
        });
        if (!threw) {
          auto hint = nth(r, h);
          if (form == 0) {
            r.emplace_hint(hint, key, value);
          } else if (form == 1) {
            r.insert(hint, std::pair<const T, T>(key, value));
          } else if (form == 2) {
            r.try_emplace(hint, key, value);
          } else {
            r.insert_or_assign(hint, key, value);
          }
        }
        break;
      }
      case 11:
        // Copy-and-swap: the strong guarantee.
        threw = attempt(in, throwing, [&] { m = m2; });
        if (!threw) {
          r = r2;
        }
        break;
      case 12:
        if (in.ConsumeBool()) {
          m = std::move(m2);
          r = std::move(r2);
          m2.clear();
          r2.clear();
        } else {
          swap(m, m2);
          std::swap(r, r2);
        }
        break;
      case 13:
        m.clear();
        r.clear();
        break;
      case 14: {
        bool eq = false;
        std::strong_ordering cmp = std::strong_ordering::equal;
        threw = attempt(in, throwing, [&] {
          eq = a == b;
          cmp = a <=> b;
        });
        if (!threw) {
          FUZZ_CHECK(eq == (ra == rb));
          FUZZ_CHECK(cmp == (ra <=> rb));
        }
        break;
      }
      case 15: {
        // Heterogeneous lookup with an int against the T keys.
        bool found = false, contains = false;
        std::ptrdiff_t lo = 0;
        threw = attempt(in, throwing, [&] {
          found = m.find(ikey) != m.end();
          contains = std::as_const(m).contains(ikey);
          lo = std::distance(m.begin(), m.lower_bound(ikey));
        });
        if (!threw) {
          FUZZ_CHECK(found == r.contains(ikey) && contains == found);
          FUZZ_CHECK(lo == std::distance(r.begin(), r.lower_bound(ikey)));
        }
        break;
      }
      case 16: {
        strong = false;
        std::vector<std::pair<T, T>> src;
        for (int i = in.ConsumeIntegralInRange(0, 6); i; i--) {
          src.emplace_back(in.ConsumeIntegralInRange(0, 255), value);
        }
        threw =
            attempt(in, throwing, [&] { m.insert(src.begin(), src.end()); });
        if (!threw) {
          r.insert(src.begin(), src.end());
        }
        break;
      }
      case 17:
        threw = attempt(in, throwing, [&] {
          M built{{key, value}, {T(ikey + 1), value}};
          FUZZ_CHECK(built.size() == 2 && built.valid());
        });
        break;
      case 18:
        if (!r.empty()) {
          bool front = in.ConsumeBool();
          auto it = front ? m.begin() : std::prev(m.end());
          FUZZ_CHECK(val(it->first) ==
                     val(front ? r.begin()->first : r.rbegin()->first));
          m.erase(it);
          front ? r.erase(r.begin()) : r.erase(std::prev(r.end()));
        }
        break;
    }
    if (threw && !strong) {
      r.clear();
      for (const auto& [k, x] : m) {
        r.emplace(k, x);
      }
    }
    check_ordered(a, ra);
    check_ordered(b, rb);
  }
}

// Collides often: only 16 distinct hashes. Transparent, for lookup by int,
// and throwing on the countdown for fz.
struct weak_hash {
  using is_transparent = void;
  std::size_t operator()(int x) const noexcept { return std::size_t(x) & 15; }
  std::size_t operator()(const fz& x) const {
    tick();
    return std::size_t(x.v) & 15;
  }
};

template <class M, class R>
void check_unordered(const M& m, const R& r) {
  FUZZ_CHECK(m.size() == r.size());
  std::size_t walked = 0;
  for (const auto& [k, v] : m) {
    auto it = r.find(k);
    FUZZ_CHECK(it != r.end() && val(it->second) == val(v));
    walked++;
  }
  FUZZ_CHECK(walked == r.size());
  FUZZ_CHECK(m.load_factor() <= m.max_load_factor());
}

template <class T, class Cage>
void fuzz_unordered_map(FuzzedDataProvider& in, bool throwing) {
  using M = cptr::unordered_map<T, T, weak_hash, std::equal_to<>, Cage>;
  using R = std::unordered_map<T, T, weak_hash, std::equal_to<>>;
  M a, b;
  R ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    int ikey = in.ConsumeIntegralInRange(0, 1023);
    T key = ikey;
    T value = in.ConsumeIntegralInRange(-1000, 1000);
    bool strong = true;
    bool threw = false;
    switch (in.ConsumeIntegralInRange(0, 18)) {
      case 0: {
        bool inserted = false;
        threw = attempt(in, throwing,
                        [&] { inserted = m.try_emplace(key, value).second; });
        if (!threw) {
          FUZZ_CHECK(inserted == r.try_emplace(key, value).second);
        }
        break;
      }
      case 1: {
        bool inserted = false;
        threw = attempt(in, throwing, [&] {
          inserted = m.insert_or_assign(key, value).second;
        });
        if (!threw) {
          FUZZ_CHECK(inserted == r.insert_or_assign(key, value).second);
        }
        break;
      }
      case 2: {
        std::size_t erased = 0;
        threw = attempt(in, throwing, [&] { erased = m.erase(key); });
        if (!threw) {
          FUZZ_CHECK(erased == r.erase(key));
        }
        break;
      }
      case 3: {
        auto first_it = m.begin();
        auto last = first_it;
        for (int k = in.ConsumeIntegralInRange(0, 8); k && last != m.end();
             k--) {
          r.erase(last->first);
          ++last;
        }
        FUZZ_CHECK(m.erase(first_it, last) == last);
        break;
      }
      case 4:
        threw = attempt(in, throwing, [&] {
          m.rehash(in.ConsumeIntegralInRange<std::size_t>(0, 4096));
        });
        break;
      case 5:
        threw = attempt(in, throwing, [&] {
          m.max_load_factor(float(in.ConsumeIntegralInRange(1, 8)) / 4.0f);
        });
        break;
      case 6:
        threw = attempt(in, throwing, [&] {
          M copy = m;
          FUZZ_CHECK(copy.size() == m.size());
          M moved = std::move(copy);
          FUZZ_CHECK(copy.empty() && moved.size() == m.size());
        });
        break;
      case 7: {
        bool inserted = false;
        threw = attempt(in, throwing,
                        [&] { inserted = m.emplace(key, value).second; });
        if (!threw) {
          FUZZ_CHECK(inserted == r.emplace(key, value).second);
        }
        break;
      }
      case 8:
        strong = false;
        threw = attempt(in, throwing, [&] { m[key] = value; });
        if (!threw) {
          r[key] = value;
        }
        break;
      case 9: {
        int got = 0;
        bool missing = false;
        threw = attempt(in, throwing, [&] {
          try {
            got = val(m.at(key));
          } catch (const std::out_of_range&) {
            missing = true;
          }
        });
        if (!threw) {
          FUZZ_CHECK(missing == !r.contains(key));
          FUZZ_CHECK(missing || got == val(r.at(key)));
        }
        break;
      }
      case 10: {
        std::size_t count = 0;
        std::ptrdiff_t len = 0;
        threw = attempt(in, throwing, [&] {
          count = m.count(key);
          auto [x, y] = std::as_const(m).equal_range(key);
          len = std::distance(x, y);
          FUZZ_CHECK(x == m.end() || val(x->first) == ikey);
        });
        if (!threw) {
          FUZZ_CHECK(count == r.count(key));
          FUZZ_CHECK(std::size_t(len) == r.count(key));
        }
        break;
      }
      case 11:
        threw = attempt(in, throwing, [&] { m = m2; });
        if (!threw) {
          r = r2;
        }
        break;
      case 12:
        if (in.ConsumeBool()) {
          m = std::move(m2);
          r = std::move(r2);
          m2.clear();
          r2.clear();
        } else {
          swap(m, m2);
          std::swap(r, r2);
        }
        break;
      case 13:
        m.clear();
        r.clear();
        break;
      case 14: {
        bool eq = false;
        threw = attempt(in, throwing, [&] { eq = a == b; });
        if (!threw) {
          FUZZ_CHECK(eq == (ra == rb));
        }
        break;
      }
      case 15: {
        std::size_t want = in.ConsumeIntegralInRange<std::size_t>(0, 2048);
        threw = attempt(in, throwing, [&] { m.reserve(want); });
        if (!threw) {
          FUZZ_CHECK(double(m.bucket_count()) * m.max_load_factor() >=
                     double(want));
        }
        break;
      }
      case 16: {
        bool found = false;
        std::size_t count = 0;
        threw = attempt(in, throwing, [&] {
          found = std::as_const(m).find(ikey) != m.cend();
          count = m.count(ikey);
          FUZZ_CHECK(m.contains(ikey) == found);
        });
        if (!threw) {
          FUZZ_CHECK(found == r.contains(ikey) && count == r.count(ikey));
        }
        break;
      }
      case 17: {
        strong = false;
        std::vector<std::pair<T, T>> src;
        for (int i = in.ConsumeIntegralInRange(0, 6); i; i--) {
          src.emplace_back(in.ConsumeIntegralInRange(0, 1023), value);
        }
        threw =
            attempt(in, throwing, [&] { m.insert(src.begin(), src.end()); });
        if (!threw) {
          r.insert(src.begin(), src.end());
        }
        break;
      }
      case 18: {
        // Hinted insertions and std::inserter; the hint is not used.
        int form = in.ConsumeIntegralInRange(0, 4);
        threw = attempt(in, throwing, [&] {
          typename M::iterator it;
          if (form == 0) {
            it = m.emplace_hint(m.end(), key, value);
          } else if (form == 1) {
            it = m.insert(m.cbegin(), std::pair<const T, T>(key, value));
          } else if (form == 2) {
            it = m.try_emplace(m.end(), key, value);
          } else if (form == 3) {
            it = m.insert_or_assign(m.begin(), T(ikey), value);
          } else {
            std::pair<T, T> one[] = {{key, value}};
            std::copy(std::begin(one), std::end(one),
                      std::inserter(m, m.end()));
            return;
          }
          FUZZ_CHECK(val(it->first) == ikey);
        });
        if (!threw) {
          if (form == 3) {
            r.insert_or_assign(key, value);
          } else {
            r.try_emplace(key, value);
          }
        }
        break;
      }
    }
    if (threw && !strong) {
      r.clear();
      for (const auto& [k, x] : m) {
        r.emplace(k, x);
      }
    }
    check_unordered(a, ra);
    check_unordered(b, rb);
  }
}

void run(FuzzedDataProvider& in) {
  bool throwing = in.ConsumeBool();
  int which = in.ConsumeIntegralInRange(0, 3);
  if (!throwing) {
    switch (which) {
      case 0:
        fuzz_list<int, cptr::default_cage>(in, false);
        break;
      case 1:
        fuzz_forward_list<int, cptr::default_cage>(in, false);
        break;
      case 2:
        fuzz_ordered_map<int, cptr::default_cage>(in, false);
        break;
      case 3:
        fuzz_unordered_map<int, cptr::default_cage>(in, false);
        break;
    }
    return;
  }
  std::size_t baseline = failing_cage::allocated_bytes();
  switch (which) {
    case 0:
      fuzz_list<fz, failing_cage>(in, true);
      break;
    case 1:
      fuzz_forward_list<fz, failing_cage>(in, true);
      break;
    case 2:
      fuzz_ordered_map<fz, failing_cage>(in, true);
      break;
    case 3:
      fuzz_unordered_map<fz, failing_cage>(in, true);
      break;
  }
  disarm();
  // Everything the containers allocated has been freed.
  FUZZ_CHECK(failing_cage::allocated_bytes() == baseline);
}

}  // namespace

extern "C" int LLVMFuzzerTestOneInput(const std::uint8_t* data,
                                      std::size_t size) {
  FuzzedDataProvider in(data, size);
  run(in);
  return 0;
}
