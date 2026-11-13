"""The representative benchmarks: compressed pointers against raw 8-byte
pointers in the same code, as shown on the benchmarks page and recorded in
the history.

Each entry is (table key, row name, label). The row's reference in its table
is the same container or loop with raw pointers, so the row's deltas are
"compressed against raw" at each percentile.
"""

PERCENTILES = ["p50", "p90", "p95", "p99", "p99.5"]

REPRESENTATIVE = [
    ("list", "grow: `cptr::list` compressed", "list push_back"),
    ("list", "walk: `cptr::list` compressed", "list walk"),
    ("map", "grow: `cptr::ordered_map` compressed", "ordered_map insert"),
    ("map", "find: `cptr::ordered_map` compressed", "ordered_map find"),
    ("hash", "grow: `cptr::unordered_map` compressed", "unordered_map insert"),
    ("hash", "find: `cptr::unordered_map` compressed", "unordered_map find"),
    ("chase", "1024 nodes, `ptr`", "pointer chase, L1"),
    ("chase", "1024 nodes, `nonnull_ptr`", "pointer chase, L1, nonnull_ptr"),
    ("chase", "16384 nodes, `ptr`", "pointer chase, L2"),
    ("chase", "262144 nodes, `ptr`", "pointer chase, L3"),
    ("chase", "4194304 nodes, `ptr`", "pointer chase, DRAM"),
]
