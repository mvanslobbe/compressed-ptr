#!/bin/sh
# Install compressed-ptr to a temporary prefix and build and run a project
# that finds it with find_package. Usage: scripts/test_install.sh [cmake args]
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
