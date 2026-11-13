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

option(COMPRESSED_PTR_WERROR "Treat warnings as errors (CI)" OFF)
if(PROJECT_IS_TOP_LEVEL)
  if(MSVC)
    add_compile_options(/W4 /permissive-)
    if(COMPRESSED_PTR_WERROR)
      add_compile_options(/WX)
    endif()
  else()
    add_compile_options(-Wall -Wextra -Wpedantic)
    if(COMPRESSED_PTR_WERROR)
      add_compile_options(-Werror)
    endif()
  endif()
endif()

if(COMPRESSED_PTR_BUILD_TESTS)
  enable_testing()
  add_executable(compressed_ptr_tests
    tests/test_main.cpp tests/test_cage.cpp tests/test_ptr.cpp
    tests/test_containers.cpp tests/test_list.cpp tests/test_map.cpp
    tests/test_user_cage.cpp tests/test_unordered_map.cpp
    tests/test_forward_list.cpp
    $<$<NOT:$<PLATFORM_ID:Windows>>:tests/test_mapped.cpp>)
  target_link_libraries(compressed_ptr_tests PRIVATE compressed_ptr Threads::Threads)
  if(MSVC)
    # The tests CHECK constant expressions and pad aligned test types on
    # purpose.
    target_compile_options(compressed_ptr_tests PRIVATE /wd4127 /wd4324)
  endif()
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
  if(MSVC)
    target_compile_options(compressed_ptr_failure_tests PRIVATE /wd4127 /wd4324)
    target_compile_options(compressed_ptr_checked_tests PRIVATE /wd4127 /wd4324)
  endif()

  # The amalgamated single header, on its own.
  add_executable(compressed_ptr_single_header_test tests/single_header.cpp)
  target_include_directories(compressed_ptr_single_header_test PRIVATE
    ${CMAKE_CURRENT_SOURCE_DIR}/single_include)
  target_compile_features(compressed_ptr_single_header_test PRIVATE cxx_std_20)
  target_link_libraries(compressed_ptr_single_header_test PRIVATE Threads::Threads)
  add_test(NAME compressed_ptr_single_header_test
    COMMAND compressed_ptr_single_header_test)

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
  if(MSVC)
    # bench_runtime reads BENCH_TSV with getenv and writes it with fopen.
    target_compile_definitions(bench_runtime PRIVATE _CRT_SECURE_NO_WARNINGS)
  endif()
endif()

if(COMPRESSED_PTR_BUILD_EXAMPLES)
  set(examples minimal linked_list tree graph std_containers custom_allocator
    expect_gains lru_cache pmr)
  if(NOT WIN32)
    list(APPEND examples persistent)
  endif()
  foreach(example ${examples})
    add_executable(example_${example} examples/${example}.cpp)
    target_link_libraries(example_${example} PRIVATE compressed_ptr)
    if(WIN32)
      target_link_libraries(example_${example} PRIVATE psapi)
    endif()
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
  add_executable(example_plf_list_minimal examples/plf_list_minimal.cpp)
  target_include_directories(example_plf_list_minimal PRIVATE
    ${COMPRESSED_PTR_PLF_LIST_DIR})
  target_link_libraries(example_plf_list_minimal PRIVATE compressed_ptr)
  if(COMPRESSED_PTR_BUILD_TESTS)
    add_test(NAME example_plf_list COMMAND example_plf_list)
    add_test(NAME example_plf_list_minimal COMMAND example_plf_list_minimal)
  endif()
endif()

include(GNUInstallDirs)
install(DIRECTORY include/ DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
install(FILES single_include/cptr.hpp DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
configure_file(compressed_ptr.pc.in ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr.pc @ONLY)
install(FILES ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr.pc
  DESTINATION ${CMAKE_INSTALL_DATADIR}/pkgconfig)
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
  foreach(fuzzer fuzz_allocator fuzz_containers)
    add_executable(${fuzzer} fuzz/${fuzzer}.cpp)
    target_link_libraries(${fuzzer} PRIVATE compressed_ptr)
    target_compile_options(${fuzzer} PRIVATE
      -fsanitize=fuzzer,address,undefined -fno-sanitize-recover=all)
    target_link_options(${fuzzer} PRIVATE
      -fsanitize=fuzzer,address,undefined)
  endforeach()
endif()
