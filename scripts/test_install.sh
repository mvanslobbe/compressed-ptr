#!/bin/sh
# Install compressed-ptr to a temporary prefix and build and run a project
# that finds it with find_package; then the same project with FetchContent,
# and, where pkg-config exists, with pkg-config and the single header.
# Usage: scripts/test_install.sh [cmake args]
set -eu
root=$(cd "$(dirname "$0")/.." && pwd)
work=$(mktemp -d)
trap 'rm -rf "$work"' EXIT
cmake -S "$root" -B "$work/build" -DCMAKE_BUILD_TYPE=Release \
  -DCOMPRESSED_PTR_BUILD_TESTS=OFF -DCOMPRESSED_PTR_BUILD_BENCHMARKS=OFF \
  -DCOMPRESSED_PTR_BUILD_EXAMPLES=OFF "$@"
cmake --build "$work/build" --config Release
cmake --install "$work/build" --prefix "$work/prefix" --config Release
cmake -S "$root/tests/install" -B "$work/consumer" -DCMAKE_BUILD_TYPE=Release \
  -DCMAKE_PREFIX_PATH="$work/prefix" "$@"
cmake --build "$work/consumer" --config Release
if [ -x "$work/consumer/consumer" ]; then
  "$work/consumer/consumer"
else
  "$work/consumer/Release/consumer.exe"
fi

run() {
  if [ -x "$1/consumer" ]; then "$1/consumer"; else "$1/Release/consumer.exe"; fi
}

cmake -S "$root/tests/fetchcontent" -B "$work/fetch" -DCMAKE_BUILD_TYPE=Release \
  -DCPTR_SOURCE_DIR="$root" "$@"
cmake --build "$work/fetch" --config Release
run "$work/fetch"

# Not on Windows, where the runners' pkg-config and c++ are not MSVC's.
case "$(uname -s)" in MINGW* | MSYS* | CYGWIN*) exit 0 ;; esac
if command -v pkg-config >/dev/null 2>&1 && command -v c++ >/dev/null 2>&1; then
  export PKG_CONFIG_PATH="$work/prefix/share/pkgconfig"
  # shellcheck disable=SC2046
  c++ -std=c++20 -DEXPECTED_VERSION="\"$(pkg-config --modversion compressed_ptr)\"" \
    $(pkg-config --cflags compressed_ptr) \
    "$root/tests/install/consumer.cpp" -o "$work/pc" $(pkg-config --libs compressed_ptr)
  "$work/pc"
  c++ -std=c++20 -I"$work/prefix/include" "$root/tests/single_header.cpp" \
    -o "$work/single" -pthread
  "$work/single"
fi
