// SPDX-License-Identifier: MIT
// Virtual memory primitives: reserve address space, commit and decommit it.
#pragma once

#include <cstddef>
#include <cstdint>

#if defined(_WIN32)
#  ifndef NOMINMAX
#    define NOMINMAX
#  endif
#  ifndef WIN32_LEAN_AND_MEAN
#    define WIN32_LEAN_AND_MEAN
#  endif
#  include <windows.h>
#else
#  include <sys/mman.h>
#  include <unistd.h>
#endif

namespace cptr::detail {

inline std::size_t page_size() noexcept {
#if defined(_WIN32)
  SYSTEM_INFO info;
  GetSystemInfo(&info);
  return info.dwPageSize;
#else
  return static_cast<std::size_t>(sysconf(_SC_PAGESIZE));
#endif
}

// Reserve |size| bytes of inaccessible address space aligned to |align|.
// Returns nullptr on failure.
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

inline bool commit(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  return VirtualAlloc(p, size, MEM_COMMIT, PAGE_READWRITE) == p;
#else
  return mprotect(p, size, PROT_READ | PROT_WRITE) == 0;
#endif
}

// Return the physical memory and make the range inaccessible again.
inline void decommit(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  VirtualFree(p, size, MEM_DECOMMIT);
#else
  int flags = MAP_PRIVATE | MAP_ANON | MAP_FIXED;
#  ifdef MAP_NORESERVE
  flags |= MAP_NORESERVE;
#  endif
  mmap(p, size, PROT_NONE, flags, -1, 0);
#endif
}

inline void release(void* p, std::size_t size) noexcept {
#if defined(_WIN32)
  (void)size;
  VirtualFree(p, 0, MEM_RELEASE);
#else
  munmap(p, size);
#endif
}

}  // namespace cptr::detail
