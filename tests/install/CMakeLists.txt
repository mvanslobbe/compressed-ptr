# A project that uses an installed compressed-ptr through find_package.
cmake_minimum_required(VERSION 3.21)
project(compressed_ptr_consumer LANGUAGES CXX)
find_package(compressed_ptr 0.1 CONFIG REQUIRED)
add_executable(consumer consumer.cpp)
target_link_libraries(consumer PRIVATE compressed_ptr::compressed_ptr)
target_compile_definitions(consumer PRIVATE
  EXPECTED_VERSION="${compressed_ptr_VERSION}")
