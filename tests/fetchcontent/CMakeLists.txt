# Consumes compressed-ptr with FetchContent from a local checkout, as the
# README's quick start does from GitHub. Used by scripts/test_install.sh.
cmake_minimum_required(VERSION 3.20)
project(compressed_ptr_fetchcontent CXX)
include(FetchContent)
FetchContent_Declare(compressed_ptr SOURCE_DIR ${CPTR_SOURCE_DIR})
FetchContent_MakeAvailable(compressed_ptr)
add_executable(consumer ../install/consumer.cpp)
target_link_libraries(consumer PRIVATE compressed_ptr::compressed_ptr)
# FetchContent does not export the subproject's version variables, so read
# it from the project() line.
file(STRINGS ${CPTR_SOURCE_DIR}/CMakeLists.txt project_line
  REGEX "^project\\(compressed_ptr VERSION")
string(REGEX MATCH "[0-9]+\\.[0-9]+\\.[0-9]+" expected "${project_line}")
target_compile_definitions(consumer PRIVATE EXPECTED_VERSION="${expected}")
