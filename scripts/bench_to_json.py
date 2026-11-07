#!/usr/bin/env python3
"""Turn bench_runtime's Markdown tables into github-action-benchmark JSON.

Each row's p50 in ns becomes one series ("customSmallerIsBetter"), named
after the table and the row, so the history pages plot every variant.

Usage: scripts/bench_to_json.py bench.md > bench.json
"""
import json
import re
import sys

out = []
section = ""
for line in open(sys.argv[1], encoding="utf-8"):
    line = line.rstrip("\n")
    if line and not line.startswith("|"):
        section = re.sub(r"`", "", line.split(",")[0].strip())
        continue
    cells = [c.strip() for c in line.strip("|").split("|")]
    if len(cells) < 3 or cells[0] in ("", "---") or cells[1].startswith("-"):
        continue
    try:
        p50 = float(cells[1])
    except ValueError:
        continue
    name = re.sub(r"`", "", cells[0])
    out.append({"name": f"{section}: {name}" if section else name,
                "unit": "ns (p50)", "value": p50})
json.dump(out, sys.stdout, indent=1)
