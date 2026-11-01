cmake_minimum_required(VERSION 3.21)
project(compressed_ptr VERSION 0.1.0 LANGUAGES CXX)

add_library(compressed_ptr INTERFACE)
add_library(compressed_ptr::compressed_ptr ALIAS compressed_ptr)
target_include_directories(compressed_ptr INTERFACE
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>)
target_compile_features(compressed_ptr INTERFACE cxx_std_20)
find_package(Threads REQUIRED)
target_link_libraries(compressed_ptr INTERFACE Threads::Threads)

# The header carries the version too; keep the two in step.
file(STRINGS include/cptr/version.hpp _cptr_version_line
  REGEX "^#define CPTR_VERSION \"")
string(REGEX REPLACE ".*\"(.*)\".*" "\\1" _cptr_header_version
  "${_cptr_version_line}")
if(NOT _cptr_header_version STREQUAL PROJECT_VERSION)
  message(FATAL_ERROR "include/cptr/version.hpp says ${_cptr_header_version}, "
    "project() says ${PROJECT_VERSION}")
endif()

option(COMPRESSED_PTR_BUILD_TESTS "Build the tests" ${PROJECT_IS_TOP_LEVEL})
option(COMPRESSED_PTR_BUILD_FUZZERS "Build the libFuzzer targets (clang)" OFF)
option(COMPRESSED_PTR_BUILD_BENCHMARKS "Build the benchmarks" ${PROJECT_IS_TOP_LEVEL})
option(COMPRESSED_PTR_BUILD_EXAMPLES "Build the examples" ${PROJECT_IS_TOP_LEVEL})

if(PROJECT_IS_TOP_LEVEL)
  if(MSVC)
    add_compile_options(/W4 /permissive-)
  else()
    add_compile_options(-Wall -Wextra -Wpedantic)
  endif()
endif()

if(COMPRESSED_PTR_BUILD_TESTS)
  enable_testing()
  add_executable(compressed_ptr_tests
    tests/test_main.cpp tests/test_cage.cpp tests/test_ptr.cpp
    tests/test_containers.cpp tests/test_list.cpp tests/test_map.cpp)
  target_link_libraries(compressed_ptr_tests PRIVATE compressed_ptr Threads::Threads)
  add_test(NAME compressed_ptr_tests COMMAND compressed_ptr_tests)
  add_executable(compressed_ptr_failure_tests tests/test_main.cpp
    tests/test_failures.cpp)
  target_link_libraries(compressed_ptr_failure_tests PRIVATE compressed_ptr
    Threads::Threads)
  add_test(NAME compressed_ptr_failure_tests COMMAND compressed_ptr_failure_tests)

  add_executable(compressed_ptr_checked_tests tests/test_main.cpp
    tests/test_checked.cpp)
  target_link_libraries(compressed_ptr_checked_tests PRIVATE compressed_ptr)
  add_test(NAME compressed_ptr_checked_tests COMMAND compressed_ptr_checked_tests)

  # Two shared libraries with hidden visibility must share one cage. Windows
  # DLLs never share one; see the README.
  if(NOT WIN32)
  foreach(lib a b)
    add_library(cptr_shared_${lib} SHARED tests/shared/lib_${lib}.cpp)
    target_link_libraries(cptr_shared_${lib} PRIVATE compressed_ptr)
    set_target_properties(cptr_shared_${lib} PROPERTIES
      CXX_VISIBILITY_PRESET hidden VISIBILITY_INLINES_HIDDEN ON)
  endforeach()
  add_executable(compressed_ptr_shared_test tests/shared/main.cpp)
  target_link_libraries(compressed_ptr_shared_test PRIVATE compressed_ptr
    cptr_shared_a cptr_shared_b)
  add_test(NAME compressed_ptr_shared_test COMMAND compressed_ptr_shared_test)
  endif()
endif()

if(COMPRESSED_PTR_BUILD_BENCHMARKS)
  add_executable(bench_runtime bench/bench_runtime.cpp)
  target_link_libraries(bench_runtime PRIVATE compressed_ptr)
  add_executable(bench_rss bench/bench_rss.cpp)
  target_link_libraries(bench_rss PRIVATE compressed_ptr)
  if(WIN32)
    target_link_libraries(bench_rss PRIVATE psapi)
    target_link_libraries(bench_runtime PRIVATE psapi)
  endif()
endif()

if(COMPRESSED_PTR_BUILD_EXAMPLES)
  foreach(example minimal linked_list tree graph std_containers)
    add_executable(example_${example} examples/${example}.cpp)
    target_link_libraries(example_${example} PRIVATE compressed_ptr)
    if(COMPRESSED_PTR_BUILD_TESTS)
      add_test(NAME example_${example} COMMAND example_${example})
    endif()
  endforeach()
endif()

set(COMPRESSED_PTR_PLF_LIST_DIR "" CACHE PATH
  "plf_list checkout, to build the plf::list example")
if(COMPRESSED_PTR_BUILD_EXAMPLES AND COMPRESSED_PTR_PLF_LIST_DIR)
  add_executable(example_plf_list examples/plf_list.cpp)
  target_include_directories(example_plf_list PRIVATE
    ${COMPRESSED_PTR_PLF_LIST_DIR})
  target_link_libraries(example_plf_list PRIVATE compressed_ptr)
  if(WIN32)
    target_link_libraries(example_plf_list PRIVATE psapi)
  endif()
  if(COMPRESSED_PTR_BUILD_TESTS)
    add_test(NAME example_plf_list COMMAND example_plf_list)
  endif()
endif()

include(GNUInstallDirs)
install(DIRECTORY include/ DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
install(TARGETS compressed_ptr EXPORT compressed_ptr-targets)
install(EXPORT compressed_ptr-targets NAMESPACE compressed_ptr::
  DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/compressed_ptr)
include(CMakePackageConfigHelpers)
file(WRITE ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config.cmake
  "include(CMakeFindDependencyMacro)\n"
  "find_dependency(Threads)\n"
  "include(\${CMAKE_CURRENT_LIST_DIR}/compressed_ptr-targets.cmake)\n")
write_basic_package_version_file(
  ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config-version.cmake
  COMPATIBILITY SameMinorVersion ARCH_INDEPENDENT)
install(FILES ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config.cmake
  ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config-version.cmake
  DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/compressed_ptr)

if(COMPRESSED_PTR_BUILD_FUZZERS)
  add_executable(fuzz_allocator fuzz/fuzz_allocator.cpp)
  target_link_libraries(fuzz_allocator PRIVATE compressed_ptr)
  target_compile_options(fuzz_allocator PRIVATE
    -fsanitize=fuzzer,address,undefined -fno-sanitize-recover=all)
  target_link_options(fuzz_allocator PRIVATE
    -fsanitize=fuzzer,address,undefined)
endif()
