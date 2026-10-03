cmake_minimum_required(VERSION 3.21)
project(compressed_ptr VERSION 0.1.0 LANGUAGES CXX)

add_library(compressed_ptr INTERFACE)
add_library(compressed_ptr::compressed_ptr ALIAS compressed_ptr)
target_include_directories(compressed_ptr INTERFACE
  $<BUILD_INTERFACE:${CMAKE_CURRENT_SOURCE_DIR}/include>
  $<INSTALL_INTERFACE:include>)
target_compile_features(compressed_ptr INTERFACE cxx_std_20)

option(COMPRESSED_PTR_BUILD_TESTS "Build the tests" ${PROJECT_IS_TOP_LEVEL})
option(COMPRESSED_PTR_BUILD_BENCHMARKS "Build the benchmarks" ${PROJECT_IS_TOP_LEVEL})
option(COMPRESSED_PTR_BUILD_EXAMPLES "Build the examples" ${PROJECT_IS_TOP_LEVEL})

if(PROJECT_IS_TOP_LEVEL)
  if(MSVC)
    add_compile_options(/W4 /permissive-)
  else()
    add_compile_options(-Wall -Wextra -Wpedantic)
  endif()
endif()

find_package(Threads REQUIRED)

if(COMPRESSED_PTR_BUILD_TESTS)
  enable_testing()
  add_executable(compressed_ptr_tests
    tests/test_main.cpp tests/test_cage.cpp tests/test_ptr.cpp
    tests/test_containers.cpp)
  target_link_libraries(compressed_ptr_tests PRIVATE compressed_ptr Threads::Threads)
  add_test(NAME compressed_ptr_tests COMMAND compressed_ptr_tests)
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

include(GNUInstallDirs)
install(DIRECTORY include/ DESTINATION ${CMAKE_INSTALL_INCLUDEDIR})
install(TARGETS compressed_ptr EXPORT compressed_ptr-targets)
install(EXPORT compressed_ptr-targets NAMESPACE compressed_ptr::
  DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/compressed_ptr)
file(WRITE ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config.cmake
  "include(\${CMAKE_CURRENT_LIST_DIR}/compressed_ptr-targets.cmake)\n")
install(FILES ${CMAKE_CURRENT_BINARY_DIR}/compressed_ptr-config.cmake
  DESTINATION ${CMAKE_INSTALL_LIBDIR}/cmake/compressed_ptr)
