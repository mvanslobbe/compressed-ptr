# compressed-ptr

32-bit compressed pointers for 64-bit C++, in the style of V8's pointer
compression. A header-only C++20 library.

```cpp
#include "cptr/ptr.hpp"

struct node {
  int value;
  cptr::ptr<node> next;  // 4 bytes, not 8
};

cptr::ptr<node> head = cptr::make<node>(1, nullptr);
head->next = cptr::make<node>(2, nullptr);
node* raw = head->next;   // converts back to a raw pointer
```

Pointer-heavy data structures, such as lists, trees, graphs, tries and
object graphs, often spend half their memory on pointers. Most programs
never need more than 4 GiB for one such structure. If every node lives in
one 4 GiB region, a pointer to a node only needs its 32-bit offset into that
region.

## How it works

```
 address space
 ┌──────────────────────────────── cage: 4 GiB, aligned to 4 GiB ───────────────────────────────┐
 │ span 0 (never used,  │ slabs of 8, 16, 24 ... byte blocks │ large blocks │ ... reserved only ... │
 │ so offset 0 = null)  │                                    │              │                      │
 └──────────────────────────────────────────────────────────────────────────────────────────────┘
 ^ base                    ^ base + 0x00012340
                           cptr::ptr stores 0x00012340
```

* **Cage.** At first use, a cage reserves 4 GiB of address space aligned to
  4 GiB (`mmap(PROT_NONE)` or `VirtualAlloc(MEM_RESERVE)`). Reserved space
  costs no memory. Pages are committed in 1 MiB steps as the allocator needs
  them.
* **Compression.** A pointer is stored as `p - base`, truncated to 32 bits.
* **Decompression.** `base + bits` is one add. `ptr` maps 0 to `nullptr`
  with a conditional move. `nonnull_ptr` skips that check.
* **Allocator.** Every object a compressed pointer refers to must come from
  the cage. The cage has a built-in allocator: segregated free lists of
  header-less blocks (8-byte classes up to 128 B), plus whole 64 KiB spans
  for large blocks, which are decommitted on free. It also works as a
  standard allocator and as a `std::pmr::memory_resource`.
* **Several cages.** Each cage is its own type with its own base, so a
  program can have several independent 4 GiB heaps:

  ```cpp
  struct mesh_heap : cptr::cage<mesh_heap> {};
  cptr::ptr<vertex, mesh_heap> v = cptr::make<vertex, mesh_heap>();
  ```
* **More than 4 GiB.** If every object is 8-byte aligned, a cage can be
  32 GiB with the pointer still 4 bytes. Pointers are stored shifted right
  by 3, which is the JVM's "compressed oops" trick:

  ```cpp
  struct big_heap : cptr::cage<big_heap, 35, 3> {};  // 2^35 = 32 GiB
  ```

## What is in the box

| Header | Contents |
|---|---|
| `cptr/cage.hpp` | `cage<Tag, SizeLog2 = 32, Shift = 0>`, `default_cage`: reserve, allocate, compress, decompress, `pmr` resource, statistics |
| `cptr/ptr.hpp` | `ptr<T, Cage>` (nullable, 4 B), `nonnull_ptr<T, Cage>`, `make<T>()`, `destroy()`, `std::hash` |
| `cptr/pack.hpp` | `ptr_pair` (two pointers in 8 B), `ptr_with_payload` (pointer + 32-bit value in 8 B), `tagged_ptr` (pointer + tag bits in 4 B), `atomic_ptr` (lock-free CAS on 4 B) |
| `cptr/allocator.hpp` | `cptr::allocator<T>`, so any std container's elements live in the cage |
| `cptr/list.hpp` | `cptr::list<T>`: doubly linked list with 4-byte links |
| `cptr/ordered_map.hpp` | `cptr::ordered_map<K, V>`: ordered map (treap with parent links) with 4-byte links |
| `cptr/all.hpp` | All of the above |

`list` and `ordered_map` take a `Compressed` template argument. With `false`
they use raw pointers but the same code and allocator. The benchmarks use
this to separate the effect of compression from the effect of the allocator.

The packing helpers often matter more than `ptr` itself. A lone 4-byte field
next to an 8-byte one is padded back to 8 bytes. Gains come from putting two
4-byte halves together:

```cpp
struct tree_node {
  cptr::ptr_pair<tree_node> children;  // left + right: 8 bytes
  std::uint32_t key;
  std::uint32_t subtree_size;
};
static_assert(sizeof(tree_node) == 16);  // 32 with raw pointers
```

## Examples

Each example is a short, self-contained program in [`examples/`](examples):

| Example | Shows |
|---|---|
| [`minimal.cpp`](examples/minimal.cpp) | Two objects pointing at each other; what is stored |
| [`linked_list.cpp`](examples/linked_list.cpp) | `cptr::list` as a drop-in for `std::list` |
| [`tree.cpp`](examples/tree.cpp) | A hand-written order-statistics tree with `ptr_pair`; 16-byte nodes |
| [`graph.cpp`](examples/graph.cpp) | BFS over a graph whose edges are 4 bytes and whose adjacency vectors live in the cage |
| [`std_containers.cpp`](examples/std_containers.cpp) | `std::deque` and `std::pmr` containers in the cage, indexed by `cptr::ptr` |
| [`use_after_free.cpp`](examples/use_after_free.cpp) | AddressSanitizer catching a dangling compressed pointer |

## Benchmarks

Measured on an i7-12700H, Linux, GCC 15, `-O2`. Build with
`-DCMAKE_BUILD_TYPE=Release` and run `bench_rss` and `bench_runtime`.

### Memory: resident set growth for 2,000,000 elements

| Structure | std | cage, raw pointers | cage, compressed | Compressed vs std |
|---|---:|---:|---:|---:|
| list of `uint32_t` | 32.0 B/elem | 24.1 B/elem | **16.1 B/elem** | −50% |
| map `uint32_t → uint32_t` | 48.0 B/elem | 40.1 B/elem | **24.1 B/elem** | −50% |
| graph, 16 edges per vertex | 168.0 B/vertex (raw `T*` edges) | — | **88.1 B/vertex** | −48% |

The "cage, raw pointers" column uses the same code and allocator with 8-byte
links. Compression saves 8 to 16 B per node; the header-less allocator saves
the remaining 8 B against `malloc`.

### Time: 1,000,000 elements, ns per element

| | build/insert | walk | find (random) | erase/destroy |
|---|---:|---:|---:|---:|
| `cptr::list` compressed | 7.7 | 1.6 | — | 6.5 |
| `cptr::list` raw | 7.9 | 1.5 | — | 6.7 |
| `std::list` | 10.4 | 2.6 | — | 4.5 |
| `cptr::ordered_map` compressed | 407 | 39 | **392** | 396 |
| `cptr::ordered_map` raw | 463 | 62 | 511 | 454 |
| `std::map` (red-black tree) | 439 | 71 | 471 | 447 |

Once the structure no longer fits in the cache, compressed links are faster
than raw ones, because more nodes fit in each cache line.

### Pointer chasing: where the decompression add costs and where it pays

A random cycle through *n* nodes: link plus 4 B of payload, so nodes are
8 B compressed and 16 B raw.

| Nodes (working set raw) | raw `T*` | `ptr` | `nonnull_ptr` |
|---|---:|---:|---:|
| 1 Ki (16 KiB, L1) | 1.10 ns | 1.78 ns (+62%) | 1.31 ns (+20%) |
| 16 Ki (256 KiB, L2) | 2.97 ns | 3.23 ns (+9%) | 2.76 ns (−7%) |
| 256 Ki (4 MiB, L3) | 11.75 ns | 9.28 ns (−21%) | 8.79 ns (−25%) |
| 4 Mi (64 MiB, DRAM) | 76.3 ns | 50.0 ns (−34%) | 46.3 ns (−39%) |

The decompression add and the null check sit on the critical path of a
dependent load. That only shows when everything is in L1. With 56-byte
payloads (64 B nodes either way) the difference is within ±8%.

## Building

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
ctest --test-dir build              # unit tests + examples
./build/bench_rss                   # memory, one child process per config
./build/bench_runtime [elements]    # time
```

Coverage (clang and llvm-cov; HTML report in `build-coverage/`):

```sh
scripts/coverage.sh            # LLVM_SUFFIX=-18 for versioned tool names
```

The tests cover 95% of the header lines, 99% of the functions and 90% of
the branches. A second test executable overrides `CPTR_ASSERT` to check
misuse detection, injects commit failures with `CPTR_FAULT_INJECTION`, and
runs out of address space under `RLIMIT_AS`. The remaining gaps are
assertion branches that cannot be taken safely (such as freeing a pointer
from outside the cage), the compile-time size-class table, and out-of-memory
inside the allocator's own bookkeeping.

To use the library from another CMake project:

```cmake
add_subdirectory(compressed-ptr)   # or FetchContent, or find_package(compressed_ptr)
target_link_libraries(app PRIVATE compressed_ptr::compressed_ptr)
```

Target platforms: Linux, macOS and Windows on x86-64 and arm64, with
GCC 11+, Clang 16+ and MSVC 2022. The CI workflow covers all of them, plus
AddressSanitizer and UBSan on Linux. So far it has been verified on Linux
x86-64 with GCC 15 and Clang 22.

## Rules and limitations

* **Only cage memory can be compressed.** Compressing a stack or `malloc`
  pointer is a bug. Debug builds catch it with an assertion.
* **64-bit only.** A 32-bit target already has 4-byte pointers.
* **Standard containers cannot use `cptr::ptr` as their internal pointer
  type.** Fancy-pointer support in standard libraries is patchy. Use the
  bundled containers, or put std containers' storage in the cage with
  `cptr::allocator` and refer to their elements with `cptr::ptr`.
* **The allocator takes one lock per cage.** It is thread-safe but not
  built for heavy multi-threaded allocation. Freed small blocks are reused
  but their pages are not returned to the OS. Large blocks are decommitted
  on free, and adjacent free runs are merged.
* **The cage's bookkeeping is never destroyed,** so containers with static
  storage duration can still free into it during program exit.
* **The cage size is fixed when the cage is reserved.** The default is
  4 GiB. Allocation fails with `std::bad_alloc` when the cage is full.
* **Misuse checks** use `CPTR_ASSERT(cond, msg)`, which defaults to
  `assert`. Define it before including a cage header to log or throw
  instead.
* **AddressSanitizer** understands the cage: freed blocks are poisoned.
  LeakSanitizer does not see cage memory.

## Using it in a larger code base

This library came out of an experiment adding V8-style pointer compression
to SpiderMonkey, Firefox's JavaScript engine. That work cut the engine's
memory by about 40% over a 12-site browsing session. The engine-specific
parts of that work (GC tracing, write barriers, JIT code that loads
compressed pointers) cannot be done by a library. The parts that can are the
ones here: the aligned reservation, the compress and decompress arithmetic,
and the packing helpers, which keep the bit layout in one place. For a code
base with its own allocator, the reservation and the arithmetic can be used
on their own, with `cptr::detail::reserve_aligned` and the compress and
decompress functions.

## Licence

MIT. See [LICENSE](LICENSE).
