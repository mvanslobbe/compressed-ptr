// SPDX-License-Identifier: MIT
// A cage whose memory is handed out by an allocator the user supplies. The
// cage reserves the address space and does the compression; the allocator
// decides where blocks go.
#pragma once

#include <atomic>
#include <bit>
#include <concepts>
#include <cstddef>
#include <cstdint>
#include <new>
#include <span>

#include "cptr/cage.hpp"
#include "cptr/platform.hpp"

namespace cptr {

/// Virtual memory helpers for allocators that manage a cage's region. The
/// region starts out reserved but inaccessible: commit a range before using
/// it.
namespace vm {

/// Make [p, p + size) readable and writable. Returns false on failure.
inline bool commit(void* p, std::size_t size) noexcept {
  return detail::commit(p, size);
}

/// Give the pages back to the OS and make the range inaccessible again.
inline void decommit(void* p, std::size_t size) noexcept {
  detail::decommit(p, size);
}

/// Give the pages back to the OS but keep the range mapped (on Linux and
/// macOS it reads as zeros afterwards). Commit it again before reuse.
inline void purge(void* p, std::size_t size) noexcept {
  detail::purge(p, size);
}

}  // namespace vm

/// What user_cage needs from an allocator. It is constructed once, with the
/// part of the cage it may hand out, and must be safe to call from every
/// thread that uses the cage.
///
/// - allocate(bytes, align) returns a block inside the region aligned to
///   `align` (a power of two), or nullptr when it cannot.
/// - deallocate(p) frees a block from allocate(). It gets no size, because
///   the bundled containers do not pass one.
template <class A>
concept region_allocator = std::constructible_from<A, std::span<std::byte>> &&
                           requires(A& a, void* p, std::size_t n) {
                             { a.allocate(n, n) } -> std::same_as<void*>;
                             a.deallocate(p);
                           };

/// A cage of 2^SizeLog2 bytes, compressed like cage<Tag, SizeLog2, Shift>,
/// whose allocations go to `Allocator`.
///
///   struct my_tag {};
///   using my_cage = cptr::user_cage<my_tag, my_allocator>;
///   cptr::list<int, my_cage> list;
///
/// The allocator is given the region from the second 64 KiB span to the
/// start of the last one, reserved but not committed (see cptr::vm). Offset
/// 0 stays outside it, so it remains null, and so does the last span, so
/// that one past the end of any block still compresses. With Shift > 0,
/// every block must be aligned to 2^Shift; user_cage raises the alignment
/// it asks for accordingly.
template <class Tag, region_allocator Allocator, unsigned SizeLog2 = 32,
          unsigned Shift = 0>
class CPTR_VISIBLE user_cage {
  static_assert(sizeof(void*) == 8, "cages need a 64-bit address space");
  static_assert(SizeLog2 >= 24, "a cage must be at least 16 MiB");
  static_assert(SizeLog2 <= 32 + Shift,
                "compressed offsets must fit in 32 bits");
  static_assert(Shift <= 4, "shift is limited to 16-byte granularity");

 public:
  using tag = Tag;
  using allocator_type = Allocator;
  static constexpr std::size_t size = std::size_t(1) << SizeLog2;
  static constexpr unsigned shift = Shift;
  static constexpr std::size_t granularity = std::size_t(1) << Shift;
  static constexpr std::size_t span_size = 64 * 1024;
  static constexpr std::size_t usable_end = size - span_size;

  /// Reserve the cage and construct the allocator. Called lazily by
  /// allocate(); returns false if the address space could not be reserved
  /// or the allocator's constructor threw. A failed call gives the address
  /// space back, and a later call tries again.
  static bool init() noexcept {
    if (ready_.load(std::memory_order_acquire)) {
      return true;
    }
    detail::lock_guard g(init_lock_);
    if (ready_.load(std::memory_order_relaxed)) {
      return true;
    }
    void* p = detail::reserve_aligned(size, size);
    if (!p) {
      return false;
    }
    auto* first = static_cast<std::byte*>(p) + span_size;
    try {
      ::new (static_cast<void*>(storage_))
          Allocator(std::span<std::byte>(first, usable_end - span_size));
    } catch (...) {
      detail::release(p, size);
      return false;
    }
    base_ = reinterpret_cast<std::uintptr_t>(p);
    ready_.store(true, std::memory_order_release);
    return true;
  }

  /// The allocator, constructed by init(). It is never destroyed, so
  /// objects with static storage duration can free into it during exit.
  static Allocator& allocator() noexcept {
    return *std::launder(reinterpret_cast<Allocator*>(storage_));
  }

  static std::uintptr_t base() noexcept { return base_; }

  static bool contains(const void* p) noexcept {
    return base_ != 0 && reinterpret_cast<std::uintptr_t>(p) - base_ < size;
  }

  static std::uint32_t compress(const void* p) noexcept {
    if (!p) {
      return 0;
    }
    CPTR_CHECK(contains(p), "pointer is outside the cage");
    std::uintptr_t offset = reinterpret_cast<std::uintptr_t>(p) - base_;
    CPTR_CHECK((offset & (granularity - 1)) == 0,
               "pointer is not aligned to the cage granularity");
    return static_cast<std::uint32_t>(offset >> Shift);
  }

  static void* decompress(std::uint32_t bits) noexcept {
    CPTR_ASSERT(bits == 0 || base_ != 0, "the cage is not initialised");
    std::uintptr_t full = base_ + (std::uintptr_t(bits) << Shift);
    return reinterpret_cast<void*>(bits ? full : std::uintptr_t(0));
  }

  static void* decompress_nonnull(std::uint32_t bits) noexcept {
    CPTR_ASSERT(base_ != 0, "the cage is not initialised");
    return reinterpret_cast<void*>(base_ + (std::uintptr_t(bits) << Shift));
  }

  /// Throws std::bad_alloc when the allocator returns nullptr.
  static void* allocate(std::size_t bytes,
                        std::size_t align = alignof(std::max_align_t)) {
    if (void* p = try_allocate(bytes, align)) {
      return p;
    }
    throw std::bad_alloc();
  }

  /// As allocate(), but returns nullptr on failure. A request for zero
  /// bytes asks the allocator for one, so every allocation is distinct.
  static void* try_allocate(std::size_t bytes, std::size_t align = alignof(
                                                   std::max_align_t)) noexcept {
    CPTR_ASSERT(std::has_single_bit(align), "alignment must be a power of two");
    if (!init()) {
      return nullptr;
    }
    if (bytes == 0) {
      bytes = 1;
    }
    void* p =
        allocator().allocate(bytes, align < granularity ? granularity : align);
    CPTR_CHECK(!p || (contains(p) &&
                      reinterpret_cast<std::uintptr_t>(p) - base_ + bytes <=
                          usable_end),
               "the allocator returned memory outside its region");
    return p;
  }

  static void deallocate(void* p) noexcept {
    if (p) {
      CPTR_CHECK(contains(p), "freeing a pointer from outside the cage");
      allocator().deallocate(p);
    }
  }
  static void deallocate(void* p, std::size_t, std::size_t = 0) noexcept {
    deallocate(p);
  }

 private:
  static inline std::atomic<bool> ready_{false};
  static inline detail::spin_lock init_lock_;
  static inline std::uintptr_t base_ = 0;
  alignas(Allocator) static inline std::byte storage_[sizeof(Allocator)];
};

namespace detail {

/// A spin lock that is held across fork(), like cage's own lock, so that a
/// child never starts with it taken by a thread that does not exist there.
/// Every live fork_safe_lock is in one list, which a single pthread_atfork
/// handler locks in order before fork() and unlocks after it.
class fork_safe_lock {
 public:
  fork_safe_lock() noexcept {
#if !defined(_WIN32)
    lock_guard g(registry_lock());
    static bool registered = false;
    if (!registered) {
      // If this fails the locks are no safer than before, but still work.
      registered = pthread_atfork(&lock_all, &unlock_all, &unlock_all) == 0;
    }
    next_ = head();
    if (next_) {
      next_->prev_ = this;
    }
    head() = this;
#endif
  }
  ~fork_safe_lock() {
#if !defined(_WIN32)
    lock_guard g(registry_lock());
    (prev_ ? prev_->next_ : head()) = next_;
    if (next_) {
      next_->prev_ = prev_;
    }
#endif
  }
  fork_safe_lock(const fork_safe_lock&) = delete;
  fork_safe_lock& operator=(const fork_safe_lock&) = delete;

  void lock() noexcept { lock_.lock(); }
  void unlock() noexcept { lock_.unlock(); }

 private:
  // Function-local statics, so that they are usable from any constructor
  // that runs during static initialisation.
  static spin_lock& registry_lock() noexcept {
    static spin_lock l;
    return l;
  }
  static fork_safe_lock*& head() noexcept {
    static fork_safe_lock* h = nullptr;
    return h;
  }
#if !defined(_WIN32)
  static void lock_all() noexcept {
    registry_lock().lock();
    for (fork_safe_lock* l = head(); l; l = l->next_) {
      l->lock();
    }
  }
  static void unlock_all() noexcept {
    for (fork_safe_lock* l = head(); l; l = l->next_) {
      l->unlock();
    }
    registry_lock().unlock();
  }
#endif

  spin_lock lock_;
  fork_safe_lock* next_ = nullptr;
  fork_safe_lock* prev_ = nullptr;
};

}  // namespace detail

/// A thread-safe bump (monotonic) allocator for user_cage: allocation is a
/// pointer increment, deallocate() does nothing, and memory is committed in
/// 1 MiB steps as it is used. Suited to data that is built once and freed
/// all at once, or never. Its lock is held across fork(), so a child process
/// can allocate even if another thread was allocating when it forked.
class bump_allocator {
 public:
  explicit bump_allocator(std::span<std::byte> region) noexcept
      : begin_(region.data()),
        next_(region.data()),
        committed_(region.data()),
        end_(region.data() + region.size()) {}

  void* allocate(std::size_t bytes, std::size_t align) noexcept {
    detail::lock_guard g(lock_);
    auto at = reinterpret_cast<std::uintptr_t>(next_);
    auto aligned = (at + align - 1) & ~(std::uintptr_t(align) - 1);
    auto* block = reinterpret_cast<std::byte*>(aligned);
    if (block > end_ || std::size_t(end_ - block) < bytes) {
      return nullptr;
    }
    std::byte* stop = block + bytes;
    if (stop > committed_) {
      std::size_t need = std::size_t(stop - committed_);
      std::size_t step = (need + kCommitStep - 1) / kCommitStep * kCommitStep;
      if (step > std::size_t(end_ - committed_)) {
        step = std::size_t(end_ - committed_);
      }
      if (!vm::commit(committed_, step)) {
        return nullptr;
      }
      committed_ += step;
    }
    next_ = stop;
    return block;
  }

  void deallocate(void*) noexcept {}

  /// Bytes handed out so far, including alignment padding.
  std::size_t used() const noexcept {
    detail::lock_guard g(lock_);
    return std::size_t(next_ - begin_);
  }

 private:
  static constexpr std::size_t kCommitStep = std::size_t(1) << 20;
  mutable detail::fork_safe_lock lock_;
  std::byte* begin_;
  std::byte* next_;
  std::byte* committed_;
  std::byte* end_;
};

}  // namespace cptr
