#!/bin/sh
# Run clang-tidy over the tests and examples and fail on any diagnostic in
# include/cptr. Usage: scripts/run_tidy.sh BUILD_DIR [clang-tidy binary]
# BUILD_DIR must have been configured with -DCMAKE_EXPORT_COMPILE_COMMANDS=ON.
set -eu
build=$1
tidy=${2:-clang-tidy}
root=$(cd "$(dirname "$0")/.." && pwd)
out=$(mktemp)
trap 'rm -f "$out"' EXIT
ls "$root"/tests/*.cpp "$root"/examples/*.cpp | grep -v plf_list.cpp |
  xargs -P "$(nproc 2>/dev/null || echo 2)" -n 1 "$tidy" -p "$build" --quiet \
    >"$out" 2>/dev/null || true
if grep -E "include/cptr/[^:]+:[0-9]+:[0-9]+: (warning|error):" "$out" |
    sort -u | grep .; then
  echo "clang-tidy found problems in include/cptr" >&2
  exit 1
fi
echo "clang-tidy: no diagnostics in include/cptr"
