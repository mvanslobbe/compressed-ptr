#!/usr/bin/env python3
"""Generate docs/benchmarks.md from benchmark output.

Usage:
  scripts/make_bench_page.py RUNTIME.md RSS.txt [--machine TEXT] > docs/benchmarks.md

RUNTIME.md is the output of bench_runtime (one or more sections, in any
order); RSS.txt is the output of bench_rss. The page's prose comes from
docs/benchmarks.in.md, whose {{name}} placeholders are replaced by the
tables: list, map, hash, arithmetic, conversion, allocator, threads, chase,
chase_big and rss, plus {{machine}} and {{date}}.
"""
import argparse
import datetime
import os
import platform
import re
import subprocess
import sys

HERE = os.path.dirname(os.path.abspath(__file__))
TEMPLATE = os.path.join(HERE, "..", "docs", "benchmarks.in.md")


def classify(title):
    t = title.lower()
    if t.startswith("list of"):
        return "list"
    if t.startswith("map "):
        return "map"
    if t.startswith("hash map"):
        return "hash"
    if t.startswith("pointer arithmetic"):
        return "arithmetic"
    if t.startswith("conversion"):
        return "conversion"
    if t.startswith("allocator churn"):
        return "threads"
    if t.startswith("allocator"):
        return "allocator"
    if t.startswith("pointer chasing"):
        return "chase" if re.search(r"\b4 B payload", title) else "chase_big"
    return None


def nice(cell):
    """Typographic minus signs, and fewer digits for large numbers."""
    cell = re.sub(r"^-(?=\d)", "−", cell)
    try:
        v = float(cell)
    except ValueError:
        return cell
    return f"{v:.3g}" if v < 100 else f"{v:.0f}"


def runtime_tables(path):
    tables, title, rows = {}, None, []

    def flush():
        if title and rows:
            key = classify(title)
            if key:
                tables[key] = f"*{title}*\n\n" + "\n".join(rows)

    for line in open(path, encoding="utf-8"):
        line = line.rstrip("\n")
        if line.startswith("|"):
            cells = [c.strip() for c in line.strip("|").split("|")]
            if cells and cells[0].startswith("---") is False and len(rows) >= 2:
                cells = [cells[0]] + [nice(c) for c in cells[1:]]
            rows.append("| " + " | ".join(cells) + " |")
        elif line.strip():
            flush()
            title, rows = line.strip(), []
    flush()
    return tables


def rss_table(path):
    data = {}
    for line in open(path, encoding="utf-8"):
        m = re.match(r"(\S+)/(\S+)\s+([\d.]+) MiB\s+([\d.]+) bytes", line)
        if m:
            data.setdefault(m.group(1), {})[m.group(2)] = float(m.group(4))
    names = {"list": "list of `uint32_t`", "map": "map `uint32_t → uint32_t`",
             "hash": "hash map `uint32_t → uint32_t`",
             "graph16": "graph, 16 edges per vertex"}
    out = ["| Structure | std | cage, raw links | cage, compressed | "
           "compressed vs std |", "|---|---:|---:|---:|---:|"]
    for key, label in names.items():
        d = data.get(key)
        if not d:
            continue
        std = d.get("std", d.get("raw"))
        raw = d.get("cage-raw")
        comp = d.get("cage-compressed", d.get("compressed"))
        change = f"−{100 * (1 - comp / std):.0f}%" if std and comp else ""
        cell = lambda v: f"{v:.1f} B" if v else "—"
        out.append(f"| {label} | {cell(std)} | {cell(raw)} | "
                   f"**{cell(comp)}** | {change} |")
    return "\n".join(out)


def machine():
    cpu = platform.processor()
    try:
        for line in open("/proc/cpuinfo"):
            if line.startswith("model name"):
                cpu = line.split(":", 1)[1].strip()
                break
    except OSError:
        pass
    try:
        cxx = subprocess.run(["c++", "--version"], capture_output=True,
                             text=True).stdout.splitlines()[0]
    except (OSError, IndexError):
        cxx = "unknown compiler"
    return f"{cpu}, {platform.system()} {platform.release()}, {cxx}"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("runtime")
    ap.add_argument("rss")
    ap.add_argument("--machine", default=None)
    args = ap.parse_args()
    values = runtime_tables(args.runtime)
    values["rss"] = rss_table(args.rss)
    values["machine"] = args.machine or machine()
    values["date"] = datetime.date.today().isoformat()
    page = open(TEMPLATE, encoding="utf-8").read()

    def fill(m):
        return values.get(m.group(1), f"*(no {m.group(1)} results)*")

    sys.stdout.write(re.sub(r"\{\{(\w+)\}\}", fill, page))


if __name__ == "__main__":
    main()
