// libFuzzer target for the bundled containers. The input picks one of
// cptr::list, cptr::forward_list, cptr::ordered_map and cptr::unordered_map
// and drives a sequence of operations on it and on the std container it
// mirrors, comparing the contents after every step. Keys and values come
// from a small range, so that duplicates, collisions and equal elements in
// sorts are common. The ordered map's red-black invariants are checked too.
//
// Build: cmake -DCOMPRESSED_PTR_BUILD_FUZZERS=ON with clang, then run
//   ./build/fuzz_containers -max_total_time=60
#include <fuzzer/FuzzedDataProvider.h>

#include <algorithm>
#include <cstdio>
#include <cstdlib>
#include <forward_list>
#include <iterator>
#include <list>
#include <map>
#include <unordered_map>

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

void fuzz_list(FuzzedDataProvider& in) {
  cptr::list<int> a, b;
  std::list<int> ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    std::size_t k = in.ConsumeIntegralInRange<std::size_t>(0, r.size());
    int v = in.ConsumeIntegralInRange(0, 15);
    switch (in.ConsumeIntegralInRange(0, 13)) {
      case 0:
        if (r.size() < kMaxSize) {
          m.insert(nth(m, k), v);
          r.insert(nth(r, k), v);
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
        m.erase(nth(m, k), nth(m, j));
        r.erase(nth(r, k), nth(r, j));
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
        m.sort();
        r.sort();
        break;
      case 6:
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        m.merge(m2);
        r.merge(r2);
        break;
      case 7:
        m.reverse();
        r.reverse();
        break;
      case 8:
        FUZZ_CHECK(m.remove(v) == r.remove(v));
        break;
      case 9:
        FUZZ_CHECK(m.unique() == r.unique());
        break;
      case 10:
        m.resize(std::min<std::size_t>(v * 8, kMaxSize), v);
        r.resize(std::min<std::size_t>(v * 8, kMaxSize), v);
        break;
      case 11:
        if (r.size() < kMaxSize) {
          m.push_front(v);
          r.push_front(v);
        }
        break;
      case 12:
        FUZZ_CHECK((a == b) == (ra == rb));
        FUZZ_CHECK((a <=> b) == (ra <=> rb));
        break;
      case 13: {
        cptr::list<int> copy = m;
        m = std::move(copy);
        break;
      }
    }
    FUZZ_CHECK(a.size() == ra.size() && b.size() == rb.size());
    FUZZ_CHECK(std::equal(a.begin(), a.end(), ra.begin(), ra.end()));
    FUZZ_CHECK(std::equal(b.rbegin(), b.rend(), rb.rbegin(), rb.rend()));
  }
}

void fuzz_forward_list(FuzzedDataProvider& in) {
  cptr::forward_list<int> a, b;
  std::forward_list<int> ra, rb;
  while (in.remaining_bytes()) {
    bool first = in.ConsumeBool();
    auto& m = first ? a : b;
    auto& r = first ? ra : rb;
    auto& m2 = first ? b : a;
    auto& r2 = first ? rb : ra;
    std::size_t n = std::size_t(std::distance(r.begin(), r.end()));
    std::size_t n2 = std::size_t(std::distance(r2.begin(), r2.end()));
    std::size_t k = in.ConsumeIntegralInRange<std::size_t>(0, n);
    int v = in.ConsumeIntegralInRange(0, 15);
    switch (in.ConsumeIntegralInRange(0, 10)) {
      case 0:
        if (n < kMaxSize) {
          m.insert_after(before(m, k), v);
          r.insert_after(before(r, k), v);
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
        m.sort();
        r.sort();
        break;
      case 5:
        m.sort();
        r.sort();
        m2.sort();
        r2.sort();
        m.merge(m2);
        r.merge(r2);
        break;
      case 6:
        m.reverse();
        r.reverse();
        break;
      case 7:
        FUZZ_CHECK(m.remove(v) == r.remove(v));
        break;
      case 8:
        FUZZ_CHECK(m.unique() == r.unique());
        break;
      case 9:
        m.resize(std::size_t(v) * 8, v);
        r.resize(std::size_t(v) * 8, v);
        break;
      case 10:
        FUZZ_CHECK((a <=> b) == (ra <=> rb));
        break;
    }
    FUZZ_CHECK(std::equal(a.begin(), a.end(), ra.begin(), ra.end()));
    FUZZ_CHECK(std::equal(b.begin(), b.end(), rb.begin(), rb.end()));
  }
}

void fuzz_ordered_map(FuzzedDataProvider& in) {
  cptr::ordered_map<int, int> m;
  std::map<int, int> r;
  while (in.remaining_bytes()) {
    int key = in.ConsumeIntegralInRange(0, 255);
    int value = in.ConsumeIntegral<int>();
    switch (in.ConsumeIntegralInRange(0, 7)) {
      case 0:
        FUZZ_CHECK(m.emplace(key, value).second ==
                   r.emplace(key, value).second);
        break;
      case 1:
        FUZZ_CHECK(m.insert_or_assign(key, value).second ==
                   r.insert_or_assign(key, value).second);
        break;
      case 2:
        FUZZ_CHECK(m.erase(key) == r.erase(key));
        break;
      case 3: {
        int hi = key + in.ConsumeIntegralInRange(0, 32);
        auto na = m.erase(m.lower_bound(key), m.upper_bound(hi));
        auto nb = r.erase(r.lower_bound(key), r.upper_bound(hi));
        FUZZ_CHECK(std::distance(m.begin(), na) ==
                   std::distance(r.begin(), nb));
        break;
      }
      case 4:
        FUZZ_CHECK(std::distance(m.begin(), m.lower_bound(key)) ==
                   std::distance(r.begin(), r.lower_bound(key)));
        FUZZ_CHECK(std::distance(m.begin(), m.upper_bound(key)) ==
                   std::distance(r.begin(), r.upper_bound(key)));
        break;
      case 5: {
        auto it = m.find(key);
        FUZZ_CHECK((it == m.end()) == !r.contains(key));
        if (it != m.end()) {
          m.erase(it);
          r.erase(key);
        }
        break;
      }
      case 6: {
        cptr::ordered_map<int, int> copy = m;
        FUZZ_CHECK(copy == m && copy.valid());
        break;
      }
      case 7:
        m[key] = value / 2;
        r[key] = value / 2;
        break;
    }
    FUZZ_CHECK(m.valid());
    FUZZ_CHECK(m.size() == r.size());
    FUZZ_CHECK(std::equal(m.begin(), m.end(), r.begin(), r.end()));
    FUZZ_CHECK(std::equal(m.rbegin(), m.rend(), r.rbegin(), r.rend()));
  }
}

// Collides often: only 16 distinct hashes.
struct weak_hash {
  std::size_t operator()(int x) const noexcept { return std::size_t(x) & 15; }
};

void fuzz_unordered_map(FuzzedDataProvider& in) {
  cptr::unordered_map<int, int, weak_hash> m;
  std::unordered_map<int, int> r;
  while (in.remaining_bytes()) {
    int key = in.ConsumeIntegralInRange(0, 1023);
    int value = in.ConsumeIntegral<int>();
    switch (in.ConsumeIntegralInRange(0, 6)) {
      case 0:
        FUZZ_CHECK(m.try_emplace(key, value).second ==
                   r.try_emplace(key, value).second);
        break;
      case 1:
        FUZZ_CHECK(m.insert_or_assign(key, value).second ==
                   r.insert_or_assign(key, value).second);
        break;
      case 2:
        FUZZ_CHECK(m.erase(key) == r.erase(key));
        break;
      case 3: {
        auto first = m.begin();
        auto last = first;
        for (int k = in.ConsumeIntegralInRange(0, 8); k && last != m.end();
             k--) {
          r.erase(last->first);
          ++last;
        }
        FUZZ_CHECK(m.erase(first, last) == last);
        break;
      }
      case 4:
        m.rehash(in.ConsumeIntegralInRange<std::size_t>(0, 4096));
        break;
      case 5:
        m.max_load_factor(float(in.ConsumeIntegralInRange(1, 8)) / 4.0f);
        break;
      case 6: {
        cptr::unordered_map<int, int, weak_hash> copy = m;
        FUZZ_CHECK(copy == m);
        break;
      }
    }
    FUZZ_CHECK(m.size() == r.size());
    std::size_t walked = 0;
    for (const auto& [k, v] : m) {
      auto it = r.find(k);
      FUZZ_CHECK(it != r.end() && it->second == v);
      walked++;
    }
    FUZZ_CHECK(walked == r.size());
    FUZZ_CHECK(m.load_factor() <= m.max_load_factor());
  }
}

}  // namespace

extern "C" int LLVMFuzzerTestOneInput(const std::uint8_t* data,
                                      std::size_t size) {
  FuzzedDataProvider in(data, size);
  switch (in.ConsumeIntegralInRange(0, 3)) {
    case 0:
      fuzz_list(in);
      break;
    case 1:
      fuzz_forward_list(in);
      break;
    case 2:
      fuzz_ordered_map(in);
      break;
    case 3:
      fuzz_unordered_map(in);
      break;
  }
  return 0;
}
