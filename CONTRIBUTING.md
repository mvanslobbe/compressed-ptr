# Contributing

Contributions are welcome, large or small: a bug report, a benchmark run on
hardware we have not tried, a fix, a new container, a port, or a clearer
sentence in the documentation. If you are planning something big, open an
issue first so we can agree on the approach before you spend time on it.

## Reporting a bug

Please include:

- a short, complete program that shows the problem;
- the compiler, its version, the standard library and the operating
  system;
- what you expected, and what happened, with the exact output (a
  sanitizer report is ideal).

Security problems, such as memory corruption that input from outside the
program can trigger, are best reported privately through GitHub's
"Report a vulnerability" button rather than in a public issue.

## Building and testing

```sh
cmake -B build -DCMAKE_BUILD_TYPE=Release
cmake --build build
ctest --test-dir build
```

Before sending a change, please also run the tests under the sanitizers,
which is what CI does:

```sh
# AddressSanitizer and UndefinedBehaviorSanitizer
cmake -B build-asan -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_BUILD_TYPE=Debug \
  -DCMAKE_CXX_FLAGS="-fsanitize=address,undefined -fno-omit-frame-pointer"
cmake --build build-asan && ctest --test-dir build-asan

# ThreadSanitizer
cmake -B build-tsan -DCMAKE_CXX_COMPILER=clang++ -DCMAKE_BUILD_TYPE=Debug \
  -DCMAKE_CXX_FLAGS="-fsanitize=thread"
cmake --build build-tsan && ctest --test-dir build-tsan
```

Changes to the allocator should also survive a while under the fuzzer:

```sh
cmake -B build-fuzz -DCMAKE_CXX_COMPILER=clang++ \
  -DCOMPRESSED_PTR_BUILD_FUZZERS=ON
cmake --build build-fuzz --target fuzz_allocator
./build-fuzz/fuzz_allocator -max_total_time=600
```

## Sending a change

- **Tests first.** A bug fix comes with a test that fails without the fix.
  A new feature comes with tests of its interface and, for containers, a
  random differential test against the standard container.
- **Performance changes come with numbers.** Use `bench_runtime`, which
  reports p50, p95, p99 and p99.9 against a reference measured in the
  same run. Give the numbers before and after the change, built with the
  same compiler and flags, and say what machine they come from.
- **Format** with clang-format 22 and the repository's `.clang-format`.
  CI checks it.
- **Keep it header-only, C++20 and dependency-free.** Code in
  `include/cptr` may use only the standard library and the operating
  system's virtual memory calls.
- **Portability.** CI builds with GCC, Clang and MSVC on Linux, macOS and
  Windows. If a feature cannot work on one of them (as `mapped_cage` cannot
  on Windows yet), say so in the README and keep the others building.
- **Commit messages** explain why as well as what, in full sentences.
  British spelling is used in the documentation; please match it.

By contributing, you agree that your contribution is licensed under the
project's [MIT licence](LICENSE).

## Releasing (maintainers)

1. Set the version in `CMakeLists.txt` (`project(... VERSION x.y.z)`) and
   in `include/cptr/version.hpp`; CMake fails if they differ.
2. Rename `## [Unreleased]` in `CHANGELOG.md` to `## [x.y.z] - YYYY-MM-DD`
   and start a new, empty `## [Unreleased]` above it.
3. Run `scripts/amalgamate.py` and commit.
4. Tag and push: `git tag vx.y.z && git push origin vx.y.z`. The Release
   workflow checks the version, runs the tests and publishes the release
   with the single header attached.
