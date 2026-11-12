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
- Tests, sanitizer and fuzzing CI, benchmarks, and documentation on GitHub
  Pages.
