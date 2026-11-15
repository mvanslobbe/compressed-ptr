// SPDX-License-Identifier: MIT
// Virtual memory primitives: reserve address space, commit and decommit it.
#pragma once

#include <atomic>
#include <cassert>
#include <cstddef>
#include <cstdint>

// Checks for misuse: active when NDEBUG is not defined. Define CPTR_ASSERT
// before including any cage header to route failures elsewhere.
#ifdef CPTR_ASSERT
#  define CPTR_DETAIL_USER_ASSERT 1
#else
#  define CPTR_ASSERT(cond, msg) assert((cond) && msg)
#endif

// Checks that catch pointers from outside a cage: compressing one, freeing
// one, or building a nonnull_ptr from null. They are assertions by default.
// Define CPTR_CHECKED to keep them in release builds too, where a failure
// prints the message and aborts. Each costs a compare and a branch that is
// never taken.
//
// A CPTR_ASSERT of your own takes these checks too, with or without
// CPTR_CHECKED, so one handler sees every failure. Define CPTR_CHECK
// yourself to handle only these differently; it must not return.
#ifndef CPTR_CHECK
#  if defined(CPTR_CHECKED) && !defined(CPTR_DETAIL_USER_ASSERT)
#    include <cstdio>
#    include <cstdlib>
#    define CPTR_CHECK(cond, msg) \
      ((cond) ? (void)0 : ::cptr::detail::check_failed(msg))
namespace cptr::detail {
[[noreturn]] inline void check_failed(const char* msg) noexcept {
  std::fprintf(stderr, "cptr: %s\n", msg);
  std::abort();
}
}  // namespace cptr::detail
#  else
#    define CPTR_CHECK(cond, msg) CPTR_ASSERT(cond, msg)
#  endif
#endif

// Builds without exceptions (-fno-exceptions, or MSVC without /EH). Where
// the library would throw (std::bad_alloc when a cage is full,
// std::out_of_range from at(), ...) it calls CPTR_ON_FAILURE(what) instead,
// which by default prints what to stderr and aborts. Define CPTR_ON_FAILURE
// before including any cptr header to handle it yourself; it must not
// return. The library's try/catch blocks, which only undo a half-done
// operation before rethrowing, compile away. CPTR_NO_EXCEPTIONS forces this
// mode in a build that has exceptions.
#if !defined(CPTR_NO_EXCEPTIONS) &&                        \
    (defined(__cpp_exceptions) || defined(__EXCEPTIONS) || \
     defined(_CPPUNWIND))
#  define CPTR_EXCEPTIONS 1
#  define CPTR_TRY try
#  define CPTR_CATCH_ALL catch (...)
#  define CPTR_RETHROW throw
#  define CPTR_THROW(exception, what) throw exception
#else
#  define CPTR_EXCEPTIONS 0
#  include <cstdio>
#  include <cstdlib>
#  ifndef CPTR_ON_FAILURE
#    define CPTR_ON_FAILURE(what) \
      (std::fprintf(stderr, "cptr: %s\n", what), std::abort())
#  endif
// The abort is unreachable when the hook does not return, which MSVC
// reports as C4702.
#  if defined(_MSC_VER)
#    pragma warning(push)
#    pragma warning(disable : 4702)
#  endif
namespace cptr::detail {
[[noreturn]] inline void failed(const char* what) noexcept {
  CPTR_ON_FAILURE(what);
  std::abort();  // in case a handler returns
}
}  // namespace cptr::detail
#  if defined(_MSC_VER)
#    pragma warning(pop)
#  endif
#  define CPTR_TRY if (true)
#  define CPTR_CATCH_ALL else
#  define CPTR_RETHROW ::cptr::detail::failed("unreachable")
#  define CPTR_THROW(exception, what) ::cptr::detail::failed(what)
#endif

#if defined(_MSC_VER) && !defined(__clang__)
#  define CPTR_NOINLINE __declspec(noinline)
#else
#  define CPTR_NOINLINE __attribute__((noinline))
#endif

// [[no_unique_address]] for the functors the maps store. On Windows both
// MSVC and clang-cl ignore the standard spelling (it would change the
// MSVC ABI) and honour only the msvc:: one.
#if defined(_MSC_VER)
#  define CPTR_NO_UNIQUE_ADDRESS [[msvc::no_unique_address]]
#else
#  define CPTR_NO_UNIQUE_ADDRESS [[no_unique_address]]
#endif

// Gives a cage and its tag default visibility, so that every shared library
// built with -fvisibility=hidden still shares one cage with the rest of the
// process. Put it on your own cage tags too:
//
//   struct CPTR_VISIBLE my_cage : cptr::cage<my_cage> {};
//
// Windows DLLs do not merge such symbols; see the README.
#if !defined(_WIN32) && (defined(__GNUC__) || defined(__clang__))
#  define CPTR_VISIBLE __attribute__((visibility("default")))
#else
#  define CPTR_VISIBLE
#endif

#if defined(_WIN32)
#  ifndef NOMINMAX
#    define NOMINMAX
#  endif
#  ifndef WIN32_LEAN_AND_MEAN
#    define WIN32_LEAN_AND_MEAN
#  endif
#  include <windows.h>
#else
#  include <pthread.h>
#  include <sys/mman.h>
#  include <unistd.h>
#endif

namespace cptr::detail {

/// Reserve `size` bytes of inaccessible address space aligned to `align`.
/// Returns nullptr on failure.
inline void* reserve_aligned(std::size_t size, std::size_t align) noexcept {
#if defined(_WIN32)
  // Windows cannot release part of a reservation, so reserve an oversized
  // region to find an aligned address, release it, and reserve again at that
  // address. Another thread may take the address in between, so retry.
  for (int attempt = 0; attempt < 16; attempt++) {
    void* probe =
        VirtualAlloc(nullptr, size + align, MEM_RESERVE, PAGE_NOACCESS);
    if (!probe) {
      return nullptr;
    }
    std::uintptr_t aligned =
        (reinterpret_cast<std::uintptr_t>(probe) + align - 1) & ~(align - 1);
    VirtualFree(probe, 0, MEM_RELEASE);
    void* p = VirtualAlloc(reinterpret_cast<void*>(aligned), size, MEM_RESERVE,
                           PAGE_NOACCESS);
    if (p) {
      return p;
    }
  }
  return nullptr;
#else
  int flags = MAP_PRIVATE | MAP_ANON;
#  ifdef MAP_NORESERVE
  flags |= MAP_NORESERVE;
#  endif
  std::size_t length = size + align;
  void* region = mmap(nullptr, length, PROT_NONE, flags, -1, 0);
  if (region == MAP_FAILED) {
    return nullptr;
  }
  std::uintptr_t start = reinterpret_cast<std::uintptr_t>(region);
  std::uintptr_t aligned = (start + align - 1) & ~(align - 1);
  if (aligned != start) {
    munmap(region, aligned - start);
  }
  std::uintptr_t end = start + length;
  if (end != aligned + size) {
    munmap(reinterpret_cast<void*>(aligned + size), end - (aligned + size));
  }
  return reinterpret_cast<void*>(aligned);
#endif
}

/// Give back address space from reserve_aligned(), whole.
inline void release(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  (void)size;
  VirtualFree(p, 0, MEM_RELEASE);
#else
  munmap(p, size);
#endif
}

#ifdef CPTR_FAULT_INJECTION
/// Tests set this to make the next N commits fail.
inline std::atomic<int> commit_failures_to_inject{0};
#endif

inline bool commit(void* p, std::size_t size) noexcept {
#ifdef CPTR_FAULT_INJECTION
  if (commit_failures_to_inject.load() > 0) {
    commit_failures_to_inject--;
    return false;
  }
#endif
#if defined(_WIN32)
  return VirtualAlloc(p, size, MEM_COMMIT, PAGE_READWRITE) == p;
#else
  return mprotect(p, size, PROT_READ | PROT_WRITE) == 0;
#endif
}

/// Return the physical memory and make the range inaccessible again.
inline void decommit(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  VirtualFree(p, size, MEM_DECOMMIT);
#else
  int flags = MAP_PRIVATE | MAP_ANON | MAP_FIXED;
#  ifdef MAP_NORESERVE
  flags |= MAP_NORESERVE;
#  endif
  // If this fails the pages simply stay committed.
  void* unused = mmap(p, size, PROT_NONE, flags, -1, 0);
  (void)unused;
#endif
}

/// Give the pages of a committed range back to the OS. On Linux and macOS
/// the range stays mapped and reads as zeros afterwards; unlike decommit()
/// this does not split the mapping, so it is much cheaper for small ranges.
/// The caller must commit() the range again before reusing it, which is
/// needed on Windows, where this decommits.
inline void purge(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  VirtualFree(p, size, MEM_DECOMMIT);
#elif defined(__APPLE__)
  madvise(p, size, MADV_FREE_REUSABLE);
#else
  madvise(p, size, MADV_DONTNEED);
#endif
}

}  // namespace cptr::detail
