#!/bin/sh
# Line and branch coverage of the headers, from the tests and the examples.
# Needs clang, llvm-profdata and llvm-cov (set LLVM_SUFFIX=-18 etc. if the
# tools are versioned).
set -eu
cd "$(dirname "$0")/.."
build=build-coverage
cmake -S . -B "$build" -DCMAKE_BUILD_TYPE=Debug -DCMAKE_CXX_COMPILER="${CXX:-clang++}" \
  -DCMAKE_CXX_FLAGS="-fprofile-instr-generate -fcoverage-mapping" \
  -DCOMPRESSED_PTR_BUILD_BENCHMARKS=OFF >/dev/null
cmake --build "$build" >/dev/null
cd "$build"
rm -f ./*.profraw
LLVM_PROFILE_FILE="cov-%p.profraw" ctest >/dev/null
"llvm-profdata${LLVM_SUFFIX:-}" merge -o all.profdata cov-*.profraw
objects=""
for exe in compressed_ptr_failure_tests example_*; do
  objects="$objects -object ./$exe"
done
# shellcheck disable=SC2086
"llvm-cov${LLVM_SUFFIX:-}" report ./compressed_ptr_tests $objects \
  -instr-profile=all.profdata ../include/cptr/*.hpp
# shellcheck disable=SC2086
"llvm-cov${LLVM_SUFFIX:-}" show ./compressed_ptr_tests $objects \
  -instr-profile=all.profdata -format=html -output-dir=coverage-html \
  ../include/cptr/*.hpp
echo "HTML report: $build/coverage-html/index.html"

# Line coverage as a shields.io endpoint badge, for the README.
# shellcheck disable=SC2086
"llvm-cov${LLVM_SUFFIX:-}" export ./compressed_ptr_tests $objects \
  -instr-profile=all.profdata -summary-only ../include/cptr/*.hpp > summary.json
python3 - <<'PYEOF'
import json
lines = json.load(open("summary.json"))["data"][0]["totals"]["lines"]
pct = lines["percent"]
color = "brightgreen" if pct >= 90 else "green" if pct >= 80 else "yellow" if pct >= 70 else "red"
json.dump({"schemaVersion": 1, "label": "coverage",
           "message": f"{pct:.0f}%", "color": color},
          open("coverage-html/badge.json", "w"))
print(f"line coverage {pct:.1f}%")
PYEOF
