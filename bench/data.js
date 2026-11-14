window.BENCHMARK_DATA = {
  "lastUpdate": 1794649077396,
  "repoUrl": "https://github.com/mvanslobbe/compressed-ptr",
  "entries": {
    "compressed as % of raw pointers": [
      {
        "commit": {
          "author": {
            "email": "michiel.van.slobbe@gmail.com",
            "name": "Michiel van Slobbe",
            "username": "mvanslobbe"
          },
          "committer": {
            "email": "michiel.van.slobbe@gmail.com",
            "name": "Michiel van Slobbe",
            "username": "mvanslobbe"
          },
          "distinct": true,
          "id": "1c6231d997f6654421b48ea872c8449a5e104c14",
          "message": "Compare compressed with raw pointers at p50, p90, p95, p99 and p99.5\n\nbench_runtime reports p50, p90, p95, p99 and p99.5, and writes every\nrow's percentiles to the file named by BENCH_TSV.\n\nThe benchmarks page opens with 'Compressed against raw pointers': for\neleven representative benchmarks (scripts/bench_reps.py: list\npush_back and walk, ordered_map and unordered_map insert and find, and\npointer chases from L1 to DRAM), a chart of the change against the same\ncode with raw 8-byte pointers at each percentile, and the same numbers\nas a table. Its summary says plainly that unordered_map find and L1/L2\npointer chases are slower.\n\nThe Pages workflow records a 'compressed as % of raw pointers' history\ngroup and absolute times at each percentile, from 10,000-epoch runs.\ndocs/site/history.html draws one small chart per representative\nbenchmark from that history, with a dashed line at 100% and a tooltip\nper commit.\n\nThe README gains a fourth recipe: plf::list with cptr::fancy_allocator,\n12.1 instead of 24.1 bytes per element.\nexamples/plf_list_minimal.cpp is that program, built and run as a test\nwhen COMPRESSED_PTR_PLF_LIST_DIR is set.",
          "timestamp": "2026-11-13T20:36:00+01:00",
          "tree_id": "31ce5dc7fecda83f3f4f1a468fdcc44b937d2e55",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/1c6231d997f6654421b48ea872c8449a5e104c14"
        },
        "date": 1794649074889,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 80.14,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 85.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 85.24,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 69.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 123.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 125.16,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 120.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 118.14,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 123.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 111.85,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 93.64,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 89.76,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 85.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 88.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 83.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 87.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 84.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 84.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 86.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 86.69,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 86.48,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 53.85,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 52.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 59.44,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 77.86,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 94.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 95.18,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 94.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 100.76,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 99.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 133.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 133.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 129.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 137.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 123.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 113.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 113.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 110.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 109.29,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 78.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 79.36,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 77.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 77.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 92.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 96.1,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 99.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 97.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 97.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 98.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 89.55,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 91.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 91.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 91.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 92.76,
            "unit": "% of raw pointers"
          }
        ]
      }
    ],
    "bench_runtime p50": [
      {
        "commit": {
          "author": {
            "email": "michiel.van.slobbe@gmail.com",
            "name": "Michiel van Slobbe",
            "username": "mvanslobbe"
          },
          "committer": {
            "email": "michiel.van.slobbe@gmail.com",
            "name": "Michiel van Slobbe",
            "username": "mvanslobbe"
          },
          "distinct": true,
          "id": "1c6231d997f6654421b48ea872c8449a5e104c14",
          "message": "Compare compressed with raw pointers at p50, p90, p95, p99 and p99.5\n\nbench_runtime reports p50, p90, p95, p99 and p99.5, and writes every\nrow's percentiles to the file named by BENCH_TSV.\n\nThe benchmarks page opens with 'Compressed against raw pointers': for\neleven representative benchmarks (scripts/bench_reps.py: list\npush_back and walk, ordered_map and unordered_map insert and find, and\npointer chases from L1 to DRAM), a chart of the change against the same\ncode with raw 8-byte pointers at each percentile, and the same numbers\nas a table. Its summary says plainly that unordered_map find and L1/L2\npointer chases are slower.\n\nThe Pages workflow records a 'compressed as % of raw pointers' history\ngroup and absolute times at each percentile, from 10,000-epoch runs.\ndocs/site/history.html draws one small chart per representative\nbenchmark from that history, with a dashed line at 100% and a tooltip\nper commit.\n\nThe README gains a fourth recipe: plf::list with cptr::fancy_allocator,\n12.1 instead of 24.1 bytes per element.\nexamples/plf_list_minimal.cpp is that program, built and run as a test\nwhen COMPRESSED_PTR_PLF_LIST_DIR is set.",
          "timestamp": "2026-11-13T20:36:00+01:00",
          "tree_id": "31ce5dc7fecda83f3f4f1a468fdcc44b937d2e55",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/1c6231d997f6654421b48ea872c8449a5e104c14"
        },
        "date": 1794649076950,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.4805,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 12.4062,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 31.8574,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.2744,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.595,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.2744,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.7246,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 8.9414,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.2109,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 243.9355,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 228.4199,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 271.9766,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 288.1016,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 251.7422,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 313.0703,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 45.3555,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 31.3555,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 52.1221,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 363.5371,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 323.5391,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 351.9902,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 24.0293,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 20.7812,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 41.6016,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 9.2363,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 8.707,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 10.2148,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 19.9204,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 19.0227,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 4.7231,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 53.9688,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 41.7598,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 106.2734,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1614,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3767,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1641,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3767,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1616,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1638,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1638,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 38.7051,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 21.7988,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 21.9551,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 13.6973,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 22.1113,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 13.7383,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 37.1797,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 23.1094,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 37.0938,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 22.9727,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.2627,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8789,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5654,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 5.2539,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.0986,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.1963,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 16.124,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 15.4951,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 15.2305,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 105.1094,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 94.1221,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 93.6035,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.7471,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.207,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.8936,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 14.5684,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 14.7148,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 14.4414,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 84.8467,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 80.3369,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 79.7393,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 116.6621,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 116.8574,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 116.4375,
            "unit": "ns (p50)"
          }
        ]
      }
    ]
  }
}