#!/usr/bin/env python3
"""Turn bench_runtime's percentiles into github-action-benchmark JSON.

Run bench_runtime with BENCH_TSV=bench.tsv in the environment; it writes
one line per row: title, name, then p50, p90, p95, p99 and p99.5 in ns. This
script writes one "customSmallerIsBetter" file per percentile, each with one
series per row, named after the table and the row so that the history pages
plot every variant.

Usage: scripts/bench_to_json.py bench.tsv OUTPUT_PREFIX
       (writes OUTPUT_PREFIX-p50.json, -p90.json, ... -p99.5.json, and
       OUTPUT_PREFIX-vs-raw.json: for each representative benchmark in
       bench_reps.py and each percentile, compressed time as a percentage of
       the raw-pointer time; 100 means equal, below 100 is faster)
"""
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from bench_reps import PERCENTILES, REPRESENTATIVE  # noqa: E402

TITLE_KEYS = [("list of", "list"), ("map ", "map"), ("hash map", "hash"),
              ("pointer chasing", "chase")]


def table_key(title):
    t = title.lower()
    if t.startswith("pointer chasing") and " 4 B payload" not in title:
        return None
    return next((k for prefix, k in TITLE_KEYS if t.startswith(prefix)), None)


def main():
    path, prefix = sys.argv[1], sys.argv[2]
    series = {p: [] for p in PERCENTILES}
    rows = {}  # (table key, name) -> values; the first row is the reference
    refs = {}  # (table key, group) -> reference values
    for line in open(path, encoding="utf-8"):
        fields = line.rstrip("\n").split("\t")
        if len(fields) != 2 + len(PERCENTILES):
            continue
        title, name, values = fields[0], fields[1], fields[2:]
        key = table_key(title)
        if key:
            group = re.split(r"[:,]", name)[0]
            refs.setdefault((key, group), [float(v) for v in values])
            rows[(key, name)] = [float(v) for v in values]
        section = re.sub(r"`", "", title.split(",")[0].strip())
        label = f"{section}: {re.sub(r'`', '', name)}"
        for p, v in zip(PERCENTILES, values):
            series[p].append({"name": label, "unit": f"ns ({p})",
                              "value": float(v)})
    for p in PERCENTILES:
        with open(f"{prefix}-{p}.json", "w", encoding="utf-8") as f:
            json.dump(series[p], f, indent=1)
        print(f"{prefix}-{p}.json: {len(series[p])} series")

    versus = []
    for key, name, label in REPRESENTATIVE:
        values = rows.get((key, name))
        ref = refs.get((key, re.split(r"[:,]", name)[0]))
        if not values or not ref:
            continue
        for p, v, r in zip(PERCENTILES, values, ref):
            versus.append({"name": f"{label}, {p}", "unit": "% of raw pointers",
                           "value": round(100 * v / r, 2)})
    with open(f"{prefix}-vs-raw.json", "w", encoding="utf-8") as f:
        json.dump(versus, f, indent=1)
    print(f"{prefix}-vs-raw.json: {len(versus)} series")


if __name__ == "__main__":
    main()
