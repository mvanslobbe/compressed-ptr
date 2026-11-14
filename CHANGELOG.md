# Changelog

All notable changes to compressed-ptr. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/): before 1.0.0, a minor version
may change the API; after it, only a major version will.

## [Unreleased]

First public version.

### Added

- `cptr::ptr`, `strict_ptr` and `nonnull_ptr`: 4-byte pointers into a cage,
  with pointer arithmetic, comparisons and `std::hash`; the operations that
  only touch the offset are `constexpr`.
- `ptr_pair`, `ptr_with_payload`, `tagged_ptr` and `atomic_ptr`.
- `cage<Tag, SizeLog2, Shift>`: a reserved region of up to 64 GiB with a
  size-class allocator, per-thread caches, return of free memory to the OS,
  `trim()`, fork safety, AddressSanitizer poisoning, and a
  `std::pmr::memory_resource`.
- `user_cage<Tag, Allocator>` with the `region_allocator` concept,
  `bump_allocator` and the `cptr::vm` helpers, to supply your own allocator.
- `mapped_cage<Tag>`: a file-backed cage for persistent structures.
- Containers with 4-byte links and the std interfaces: `list`,
  `forward_list`, `ordered_map` (red-black tree) and `unordered_map`.
- `allocator<T>` and `fancy_allocator<T>`.
- `CPTR_CHECKED` to keep the misuse checks in release builds.
- CMake package with `find_package(compressed_ptr)`, `cptr/version.hpp`.
- A Compiler Explorer example, an introductory article (`docs/why.md`) and
  a comparison with the alternatives in the README.
- `cptr::deleter<T, Cage>` for `std::unique_ptr` (4 bytes), and
  `make_array`/`destroy_array`.
- `nonnull_ptr` converts to a base class, to `ptr` and to `strict_ptr`, and
  has `from_bits`; `ptr_pair`, `ptr_with_payload` and `tagged_ptr` compare
  with `==`; mixed comparisons and subtraction between `ptr` and `T*`, and
  between `ptr` and `strict_ptr`.
- `std::pointer_traits` for `ptr` (`to_address`, `pointer_to`, `rebind`), and
  `ptr` is a contiguous iterator, so `std::copy` over a `ptr` range becomes
  a `memmove`.
- `unordered_map`: hinted `insert`, `emplace_hint`, hinted and rvalue-key
  `try_emplace` and `insert_or_assign` (so `std::inserter` works),
  heterogeneous `equal_range`, `max_bucket_count()`. C++23's heterogeneous
  `erase` on both maps, when `CPTR_HETEROGENEOUS_ERASE` is defined. `ordered_map`:
  `try_emplace` and `insert_or_assign` with an rvalue key, and their hinted
  forms.
- `constexpr` null paths: `get()`, conversions and comparisons of a null
  `ptr`, `ptr_pair::first()` and `tagged_ptr::get()` on null, and the size
  class functions.
- Tests, sanitizer and fuzzing CI (including a release build with
  `CPTR_CHECKED`, GCC 12 to 16, Clang 16 to 22, libc++ and clang-cl), benchmarks, and documentation on GitHub Pages.

### Changed

- `ptr` converts only from a null pointer constant (`nullptr`, `0`, `NULL`),
  like a raw pointer; an integer variable no longer becomes a null `ptr`.
- A `ptr` converts to a `strict_ptr` only explicitly.
- `unordered_map` iterators are 16 bytes and stay valid across move and
  swap, as std's do; `begin()` is constant time.
- `<=>` on the containers needs only `operator<` on the elements, as in std.
- A user-defined `CPTR_ASSERT` also handles the checks that `CPTR_CHECKED`
  keeps in release builds.
- `trim()` gives back all free memory; the span tables are committed as the
  cage grows; under AddressSanitizer only the requested bytes of a block are
  usable.
- `mapped_cage::open()` serialises creation between processes, rejects
  corrupt files, and `allocate` returns null for alignments above 64 KiB.
- `unordered_map::rehash` and `reserve` throw `std::length_error` for
  impossible sizes.

### Performance

- Size classes are computed in closed form: an allocate/free pair of
  257 B to 8 KiB takes 7.3 instead of 19.1 ns (GCC).
- Compressing a pointer is a mask and a shift, and the cage base no longer
  aliases integer stores, so loops keep it in a register.
- Copying an `unordered_map` reuses the stored hashes (about twice as fast),
  and `erase(key)` walks its bucket once.

### Fixed

- Memory safety: `forward_list::merge` with a throwing comparator freed
  nodes twice; `list::sort` with a throwing comparator left broken links;
  `unordered_map::rehash` with a huge count wrote past its bucket array;
  `unordered_map` iterators read freed memory after the map was moved;
  `std::to_address` of a null `ptr` returned the cage base; two processes
  creating the same `mapped_cage` file corrupted it.
- Leaks and wrong sizes when an element's copy, comparison or hash throws
  in `merge`, `remove`, `remove_if`, `unique`, `sort`, `emplace` and several
  constructors; copying a moved-from `ordered_map`.
- A full cage failed large allocations until `trim()`; frees after the
  calling thread's cache was destroyed leaked; `allocated_bytes()` could
  briefly wrap; a failed `user_cage::init()` leaked its reservation;
  zero-byte `user_cage` allocations returned the same pointer;
  `bump_allocator` could hang a child after `fork()`; `mapped_cage::root()`
  before `open()` crashed.
- `destroy` of a `ptr<const T>` did not compile; `list<int*>::emplace_back(42L)`
  compiled through a C-style cast.
