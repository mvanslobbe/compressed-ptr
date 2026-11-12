// A least-recently-used cache, the classic hash map plus list pair, built
// from cptr::unordered_map and cptr::list instead of the std ones. Only the
// type names change; the cache takes about half the memory.
#include <cstdint>
#include <cstdio>
#include <list>
#include <optional>
#include <unordered_map>

#include "cptr/all.hpp"

template <class K, class V, template <class...> class Map,
          template <class...> class List>
class lru_cache {
 public:
  explicit lru_cache(std::size_t capacity) : capacity_(capacity) {}

  std::optional<V> get(const K& key) {
    auto it = index_.find(key);
    if (it == index_.end()) {
      return std::nullopt;
    }
    order_.splice(order_.begin(), order_, it->second);  // most recent first
    return it->second->second;
  }

  void put(const K& key, const V& value) {
    if (auto it = index_.find(key); it != index_.end()) {
      it->second->second = value;
      order_.splice(order_.begin(), order_, it->second);
      return;
    }
    if (order_.size() == capacity_) {
      index_.erase(order_.back().first);
      order_.pop_back();
    }
    order_.emplace_front(key, value);
    index_.emplace(key, order_.begin());
  }

  std::size_t size() const { return order_.size(); }

 private:
  using entry = std::pair<K, V>;
  std::size_t capacity_;
  List<entry> order_;
  Map<K, typename List<entry>::iterator> index_;
};

template <class T>
using std_list = std::list<T>;
template <class K, class V>
using std_map = std::unordered_map<K, V>;
template <class T>
using cptr_list = cptr::list<T>;
template <class K, class V>
using cptr_map = cptr::unordered_map<K, V>;

template <class Cache>
std::uint64_t run(Cache& cache) {
  std::uint64_t hits = 0;
  std::uint32_t x = 1;
  for (int i = 0; i < 2000000; i++) {
    x = x * 1664525u + 1013904223u;
    std::uint32_t key = (x >> 8) % 300000;
    if (cache.get(key)) {
      hits++;
    } else {
      cache.put(key, key * 2);
    }
  }
  return hits;
}

int main() {
  lru_cache<std::uint32_t, std::uint32_t, std_map, std_list> a(100000);
  lru_cache<std::uint32_t, std::uint32_t, cptr_map, cptr_list> b(100000);
  std::uint64_t ha = run(a), hb = run(b);
  std::printf("std:  %zu entries, %llu hits\n", a.size(),
              static_cast<unsigned long long>(ha));
  std::printf("cptr: %zu entries, %llu hits\n", b.size(),
              static_cast<unsigned long long>(hb));
  return ha == hb ? 0 : 1;
}
