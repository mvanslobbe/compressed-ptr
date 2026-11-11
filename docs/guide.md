# compressed-ptr guide

Everything about using compressed-ptr: how it works, every header, the
allocators, persistence, the rules, and building and testing. For the
numbers, see [Benchmarks](benchmarks.md); for every type and function, the
[API reference](https://mvanslobbe.github.io/compressed-ptr/reference/).

## Contents

- [Background](#background)
- [How it works](#how-it-works)
- [What is in the box](#what-is-in-the-box)
- [Examples](#examples)
- [With plf::list (fancy pointers)](#with-plflist-fancy-pointers)
- [Rules and limitations](#rules-and-limitations)
- [Building](#building)
- [Using it in a larger code base](#using-it-in-a-larger-code-base)

## Background

Most programs never need more than 4 GiB for one data structure. If every
node lives in one 4 GiB region, a pointer to a node only needs its 32-bit
offset into that region.

The idea comes from V8, Chrome's JavaScript engine. It keeps its whole heap
in one 4 GiB "cage" and stores 32-bit offsets instead of full pointers. See
[Pointer Compression in V8](https://v8.dev/blog/pointer-compression)
(Igor Sheludko and Santiago Aboy Solanes, 2020). V8 builds this into its
garbage collector and JIT. This library offers the same addressing trick
for ordinary C++ code: plain pointers with a null value, a malloc-style
allocator, several independent cages, and containers. No V8 code is used.

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
| `cptr/ptr.hpp` | `ptr<T, Cage>` (nullable, 4 B), `strict_ptr<T, Cage>` (compressing a `T*` is explicit), `nonnull_ptr<T, Cage>`, `make<T>()`, `destroy()`, `std::hash` |
| `cptr/pack.hpp` | `ptr_pair` (two pointers in 8 B), `ptr_with_payload` (pointer + 32-bit value in 8 B), `tagged_ptr` (pointer + tag bits in 4 B), `atomic_ptr` (lock-free CAS on 4 B) |
| `cptr/allocator.hpp` | `cptr::allocator<T>`, so any std container's elements live in the cage |
| `cptr/fancy_allocator.hpp` | `cptr::fancy_allocator<T>` with `pointer = cptr::ptr<T>`, for containers that support fancy pointers |
| `cptr/list.hpp` | `cptr::list<T>`: doubly linked list with 4-byte links and the `std::list` interface |
| `cptr/forward_list.hpp` | `cptr::forward_list<T>`: singly linked list with 4-byte links and the `std::forward_list` interface; 8-byte nodes for 4-byte values |
| `cptr/unordered_map.hpp` | `cptr::unordered_map<K, V>`: hash map with separate chaining, 4-byte links and buckets, and the `std::unordered_map` interface without node handles and the bucket API |
| `cptr/ordered_map.hpp` | `cptr::ordered_map<K, V>`: ordered map (red-black tree) with 4-byte links and the `std::map` interface, without node handles |
| `cptr/user_cage.hpp` | `user_cage<Tag, Allocator, SizeLog2 = 32, Shift = 0>`: a cage whose blocks come from your own allocator; `bump_allocator`; `cptr::vm` commit helpers |
| `cptr/mapped_cage.hpp` | `mapped_cage<Tag, SizeLog2 = 32>`: a cage whose memory is a file, with a root pointer; POSIX only |
| `cptr/all.hpp` | All of the above except `user_cage.hpp` and `mapped_cage.hpp` |

Operations that only touch the stored offset are `constexpr`: null,
pointer arithmetic, comparisons, `bits()` and `from_bits()`, and
conversions that keep the address. Compressing and decompressing need the
cage's base, which is only known at run time.

Both containers keep a sentinel node in the cage, so an iterator is one
8-byte pointer and `end()` stays valid as elements come and go. They are
aliases of `cptr::detail::basic_list` and `cptr::detail::basic_ordered_map`,
whose last template argument, `Compressed = false`, gives raw links with the
same code and allocator. The benchmarks use those to separate the effect of
compression from the effect of the allocator; they are not part of the
public interface.

The built-in allocator is fast, but you can supply your own. A
`user_cage` reserves the region and compresses like `cage`; your allocator
is constructed once with the usable part of the region (reserved, not yet
committed) and serves `allocate(bytes, align)` and `deallocate(p)`. Commit
memory with `cptr::vm::commit` as you use it. `cptr::bump_allocator` is a
ready-made monotonic allocator, and a building block for others:

```cpp
struct my_allocator {
  explicit my_allocator(std::span<std::byte> region);
  void* allocate(std::size_t bytes, std::size_t align);  // nullptr if full
  void deallocate(void* p);  // no size: the containers do not pass one
};
struct my_tag {};
using my_cage = cptr::user_cage<my_tag, my_allocator>;
cptr::ordered_map<int, int, std::less<>, my_cage> map;
```

The allocator must be safe to call from every thread that uses the cage.

A compressed pointer is an offset from the cage's base, so a structure
built in a `mapped_cage` is still valid when the file is mapped again, by
another process, at another address. The containers store their sentinel
as a compressed link too, so a `cptr::list` or `cptr::ordered_map` of plain
values can live in the file. The allocator keeps its state in the file,
behind a lock there, so several processes can allocate in one file at once;
the containers themselves are not synchronised. The file is created sparse
at the full cage size, and only pages written to use disk space.

```cpp
struct store_tag {};
using store = cptr::mapped_cage<store_tag>;
store::open("data.cage");
auto* h = store::root<history>();  // nullptr in a new file
```

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

Each example is a short, self-contained program in [`examples/`](../examples):

| Example | Shows |
|---|---|
| [`expect_gains.cpp`](../examples/expect_gains.cpp) | Measures memory and time of each std container against its cptr counterpart on your machine |
| [`minimal.cpp`](../examples/minimal.cpp) | Two objects pointing at each other; what is stored |
| [`linked_list.cpp`](../examples/linked_list.cpp) | `cptr::list` as a drop-in for `std::list` |
| [`tree.cpp`](../examples/tree.cpp) | A hand-written order-statistics tree with `ptr_pair`; 16-byte nodes |
| [`graph.cpp`](../examples/graph.cpp) | BFS over a graph whose edges are 4 bytes and whose adjacency vectors live in the cage |
| [`std_containers.cpp`](../examples/std_containers.cpp) | `std::deque` and `std::pmr` containers in the cage, indexed by `cptr::ptr` |
| [`custom_allocator.cpp`](../examples/custom_allocator.cpp) | Your own allocator behind a cage: a pool of 16-byte slots for list nodes |
| [`persistent.cpp`](../examples/persistent.cpp) | A list kept in a file and reopened at a new address on every run |
| [`use_after_free.cpp`](../examples/use_after_free.cpp) | AddressSanitizer catching a dangling compressed pointer |

## With plf::list (fancy pointers)

Containers that take their internal pointer type from the allocator can
switch to 4-byte links without changes to their code. `cptr::fancy_allocator`
has `pointer = cptr::ptr<T>`, and `cptr::ptr` supports the arithmetic,
`NULL` literals and casts such containers need. With
[plf::list](https://github.com/mattreecebentley/plf_list):

```cpp
using compressed_list =
    plf::list<std::uint32_t, cptr::fancy_allocator<std::uint32_t>>;

// The list's end sentinel is a member of the list object and nodes link to
// it, so the list object itself must be in the cage too.
cptr::ptr<compressed_list> l = cptr::make<compressed_list>();
l->push_back(1);
```

Two details:

* plf::list passes the allocator's pointer to
  `std::allocator_traits::construct` and `destroy`, which take raw pointers.
  The example redefines plf's `PLF_CONSTRUCT` and `PLF_DESTROY` macros to
  convert with `std::to_address` first, as the standard containers do. The
  same change in `plf_tools.h` would make this unnecessary.
* The list object must live in the cage (see above).

4,000,000 random `uint32_t`, GCC 15 `-O2`, i7-12700H, best of 3:

| | bytes/element | push_back | 10 walks | sort |
|---|---:|---:|---:|---:|
| `plf::list` | 24.1 | 29 ms | 67 ms | 543 ms |
| `plf::list` with `cptr::fancy_allocator` | **12.1** | 25 ms | 57 ms | 530 ms |

Build it with `-DCOMPRESSED_PTR_PLF_LIST_DIR=/path/to/plf_list`; see
[`examples/plf_list.cpp`](../examples/plf_list.cpp).

## Rules and limitations

* **Only cage memory can be compressed.** Compressing a stack or `malloc`
  pointer is a bug. Debug builds catch it with an assertion. Define
  `CPTR_CHECKED` to keep that check (and the checks on `deallocate` and
  `nonnull_ptr`) in release builds, where a failure prints a message and
  aborts. The cost is one compare and branch per compression, which did
  not show in the list benchmark (p50 to p95 unchanged).
* **`ptr` converts implicitly both ways** between `T*` and `ptr<T>`, so it
  can replace a raw pointer member with few other changes. The cost is that
  any `T*` compresses without notice, and `cond ? p : raw` with a `ptr`
  and a `T*` is ambiguous. `strict_ptr<T>` is the same type with an
  explicit `strict_ptr<T>(raw)` constructor and no assignment from `T*`;
  it still converts to `T*` and to and from `ptr<T>` implicitly.
* **64-bit only.** A 32-bit target already has 4-byte pointers.
* **Standard library containers mostly ignore fancy pointers** for their
  internal links, so `cptr::fancy_allocator` does not shrink `std::list` or
  `std::map` nodes. Use the bundled containers or a container that honours
  the allocator's pointer type (such as plf::list). Otherwise, put std
  containers' storage in the cage with `cptr::allocator` and refer to their
  elements with `cptr::ptr`.
* **Allocator.** Small blocks (up to 32 KiB) come from size-class slabs.
  Each thread keeps a small cache of free blocks per size class, so most
  allocations and frees take no lock; the cage-wide lock is taken once per
  batch of blocks and for large allocations. Slabs whose blocks are all
  free are kept for reuse for a quarter of a second (at most 64 MiB of
  them), then their pages are given back to the OS. `default_cage::trim()` does
  that at once and also returns the calling thread's cached blocks;
  other threads' cached blocks go back when they exit. Large blocks are
  decommitted on free, and adjacent free runs are merged. `fork()` is
  safe: the child can allocate even if another thread held the lock.
* **Shared libraries.** A cage's base and bookkeeping are static members
  of a header-only template, so every shared library gets its own copy
  unless the dynamic linker merges them. The cage templates and
  `default_cage` are marked `CPTR_VISIBLE` (default visibility), so on
  Linux and macOS they are merged even when libraries are built with
  `-fvisibility=hidden`; mark your own tags the same way:
  `struct CPTR_VISIBLE my_cage : cptr::cage<my_cage> {};`. Libraries
  loaded with `dlopen(RTLD_LOCAL)` may still get their own copy.
  **Windows DLLs never share one**: each DLL that uses a cage has its own,
  so keep everything that compresses or decompresses a given cage in one
  module. Debug builds assert when a module decompresses in a cage it never
  initialised, which is how this usually shows.
* **The cage's bookkeeping is never destroyed,** so containers with static
  storage duration can still free into it during program exit.
* **The cage size is fixed when the cage is reserved.** The default is
  4 GiB. Allocation fails with `std::bad_alloc` when the cage is full.
* **Misuse checks** use `CPTR_ASSERT(cond, msg)`, which defaults to
  `assert`. Define it before including a cage header to log or throw
  instead.
* **AddressSanitizer** understands the cage: freed blocks are poisoned.
  LeakSanitizer does not see cage memory.

## Building

```sh
cmake -S . -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
ctest --test-dir build              # unit tests + examples
./build/bench_rss                   # memory, one child process per config
./build/bench_runtime [elements] [epochs] [list|map|hash|arithmetic|conversion|allocator|threads|chase]
```

To use an installed copy, `cmake --install build`, then in your project:

```cmake
find_package(compressed_ptr 0.1 CONFIG REQUIRED)
target_link_libraries(your_target PRIVATE compressed_ptr::compressed_ptr)
```

There are no vcpkg or Conan recipes yet: both pin a tagged release by its
archive hash, and there is no tagged release.

CI runs the benchmarks on every push, shows the tables in the run summary
and keeps them as an artifact. `scripts/check_bench.py` fails the run if a
median delta between variants measured side by side regresses past a
limit (for example compressed against raw links, or the cage against
`malloc` on two threads); absolute times on shared runners are too noisy
to gate on.

`scripts/test_install.sh` checks that round trip, and CI runs it on Linux,
macOS and Windows. `cptr/version.hpp` defines `CPTR_VERSION`.
Sources are formatted with clang-format 22 (`.clang-format`); CI checks it.

The allocator fuzzer needs clang:

```sh
cmake -S . -B build-fuzz -DCMAKE_CXX_COMPILER=clang++ -DCOMPRESSED_PTR_BUILD_FUZZERS=ON
cmake --build build-fuzz --target fuzz_allocator
./build-fuzz/fuzz_allocator -max_total_time=60
```

Coverage (clang and llvm-cov; HTML report in `build-coverage/`):

```sh
scripts/coverage.sh            # LLVM_SUFFIX=-18 for versioned tool names
```

The tests cover 95% of the header lines, 99% of the functions and 88% of
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

Supported platforms: Linux, macOS and Windows on x86-64 and arm64, with
GCC 11+, Clang 16+ and MSVC 2022. CI runs the tests on all six, plus
AddressSanitizer, UBSan, ThreadSanitizer and coverage on Linux.

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
