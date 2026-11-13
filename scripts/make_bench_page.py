#!/usr/bin/env python3
"""Generate docs/benchmarks.md from benchmark output.

Usage:
  scripts/make_bench_page.py RUNTIME.md RSS.txt [--machine TEXT] > docs/benchmarks.md

RUNTIME.md is the output of bench_runtime (one or more sections, in any
order); RSS.txt is the output of bench_rss. The page's prose comes from
docs/benchmarks.in.md, whose {{name}} placeholders are replaced by the
tables: list, map, hash, arithmetic, conversion, allocator, threads, chase,
chase_big and rss; {{versus}}, the chart and table of the representative
benchmarks in scripts/bench_reps.py; and {{machine}} and {{date}}.
"""
import argparse
import datetime
import os
import platform
import re
import subprocess
import sys

from bench_reps import PERCENTILES, REPRESENTATIVE

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


def runtime_tables(path, raw_rows):
    """Markdown for each table; raw_rows[key][name] gets the row's cells."""
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
            key = classify(title or "")
            if key and len(rows) >= 2:
                raw_rows.setdefault(key, {})[cells[0]] = cells
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


def delta(cell):
    """'+12%' -> 12.0; 'ref' or anything else -> None."""
    m = re.fullmatch(r"([+-]?\d+(?:\.\d+)?)%", cell.replace("\u2212", "-"))
    return float(m.group(1)) if m else None


def nice_step(span):
    for step in (5, 10, 20, 25, 50, 100):
        if span / step <= 8:
            return step
    return 200


def versus(raw_rows):
    """Chart and table: compressed against raw pointers, every percentile."""
    data = []
    for key, name, label in REPRESENTATIVE:
        cells = raw_rows.get(key, {}).get(name)
        if not cells or len(cells) != 3 + len(PERCENTILES):
            continue
        ds = [delta(c) for c in cells[3:]]
        if None in ds:
            continue
        # The raw reference's p50 is the first row of the same table whose
        # deltas are "ref" in the same group (same prefix before the colon,
        # or the same node count).
        group = re.split(r"[:,]", name)[0]
        ref = next((c for n, c in raw_rows[key].items()
                    if c[3] == "ref" and re.split(r"[:,]", n)[0] == group),
                   None)
        data.append((label, ref[1] if ref else "", ds))
    if not data:
        return "*(no comparison results)*"

    # Table.
    head = ("| Benchmark | raw p50 ns | " +
            " | ".join(f"Δ{p}" for p in PERCENTILES) + " |")
    table = [head, "|---|---:|" + "---:|" * len(PERCENTILES)]
    for label, ref_p50, ds in data:
        cells = [f"{d:+.0f}%".replace("-", "\u2212") for d in ds]
        table.append(f"| {label} | {ref_p50} | " + " | ".join(cells) + " |")

    # Chart: one group of bars per benchmark, one bar per percentile, from
    # zero; left of zero is faster than raw pointers.
    lo = min(min(min(ds) for _, _, ds in data), -10)
    hi = max(max(max(ds) for _, _, ds in data), 10)
    step = nice_step(hi - lo)
    lo, hi = step * ((lo // step)), step * -((-hi) // step)
    width, left, right, top = 760, 230, 20, 28
    bar, gap, group_gap = 7, 2, 14
    group_h = len(PERCENTILES) * (bar + gap) - gap
    height = top + len(data) * (group_h + group_gap) + 24
    plot_w = width - left - right

    def x(v):
        return left + (v - lo) / (hi - lo) * plot_w

    out = [f'<svg class="versus" viewBox="0 0 {width} {height}" role="img" '
           f'aria-label="Compressed against raw pointers, change at each '
           f'percentile">']
    tick = lo
    while tick <= hi:
        cls = "zero" if tick == 0 else "grid"
        out.append(f'<line class="{cls}" x1="{x(tick):.1f}" y1="{top - 6}" '
                   f'x2="{x(tick):.1f}" y2="{height - 22}"/>')
        out.append(f'<text class="tick" x="{x(tick):.1f}" y="{height - 6}" '
                   f'text-anchor="middle">{tick:+.0f}%</text>'
                   .replace("+0%", "0").replace(">-", ">\u2212"))
        tick += step
    out.append(f'<text class="tick" x="{x(lo):.1f}" y="{top - 12}">'
               f'\u2190 faster than raw pointers</text>')
    out.append(f'<text class="tick" x="{x(hi):.1f}" y="{top - 12}" '
               f'text-anchor="end">slower \u2192</text>')
    y = top
    for label, ref_p50, ds in data:
        out.append(f'<text class="label" x="{left - 10}" '
                   f'y="{y + group_h / 2 + 4:.1f}" text-anchor="end">'
                   f'{label}</text>')
        for i, (p, d) in enumerate(zip(PERCENTILES, ds)):
            x0, x1 = sorted((x(0), x(d)))
            out.append(
                f'<rect class="s{i}" x="{x0:.1f}" y="{y + i * (bar + gap)}" '
                f'width="{max(x1 - x0, 1):.1f}" height="{bar}" rx="2">'
                f'<title>{label}, {p}: {d:+.0f}% against raw pointers'
                f'</title></rect>')
        y += group_h + group_gap
    out.append("</svg>")
    legend = ('<p class="legend">' + "".join(
        f'<span><i class="s{i}"></i>{p}</span>'
        for i, p in enumerate(PERCENTILES)) + "</p>")
    return legend + "\n" + "".join(out) + "\n\n" + "\n".join(table)


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
    raw_rows = {}
    values = runtime_tables(args.runtime, raw_rows)
    values["versus"] = versus(raw_rows)
    values["rss"] = rss_table(args.rss)
    values["machine"] = args.machine or machine()
    values["date"] = datetime.date.today().isoformat()
    page = open(TEMPLATE, encoding="utf-8").read()

    def fill(m):
        return values.get(m.group(1), f"*(no {m.group(1)} results)*")

    sys.stdout.write(re.sub(r"\{\{(\w+)\}\}", fill, page))


if __name__ == "__main__":
    main()
