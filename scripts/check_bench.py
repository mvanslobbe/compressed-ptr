#!/usr/bin/env python3
"""Fail if bench_runtime's output shows a regression.

Reads the Markdown tables that bench_runtime prints (stdin or a file) and
checks the median delta of some rows against limits. The deltas compare
two variants measured interleaved on the same machine, so they hold on
noisy CI runners where absolute times do not.

Usage: bench_runtime ... | scripts/check_bench.py
"""
import re
import sys

# Row name (as printed), maximum delta at p50 in percent.
LIMITS = [
    # CI's list fits in cache, where the decompression add on every hop
    # shows: about +20% against raw links. At 4 Mi elements it is -9%.
    ("walk: `cptr::list` compressed", 30),
    ("grow: `cptr::list` compressed", 15),
    ("find: `cptr::ordered_map` compressed", 10),
    ("walk: `cptr::ordered_map` compressed", 10),
    ("to `ptr<const int>`", 25),
    ("to `ptr<void>`", 25),
    ("cage `allocate` / `deallocate`", 50),
    ("1 threads, cage", 50),
    ("2 threads, cage", 100),
]


def main():
    text = open(sys.argv[1]).read() if len(sys.argv) > 1 else sys.stdin.read()
    rows = {}
    for line in text.splitlines():
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        if len(cells) == 8 and cells[3] not in ("ref", "Δp50"):
            m = re.fullmatch(r"([+-]?\d+)%", cells[3])
            if m:
                rows[cells[0]] = int(m.group(1))
    failed = False
    for name, limit in LIMITS:
        if name not in rows:
            print(f"missing: {name}")
            failed = True
            continue
        ok = rows[name] <= limit
        failed |= not ok
        print(f"{'ok  ' if ok else 'FAIL'} {name}: {rows[name]:+d}% "
              f"(limit +{limit}%)")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
