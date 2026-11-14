window.BENCHMARK_DATA = {
  "lastUpdate": 1794649420081,
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
      },
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
          "id": "94eab073e7b0848984aad99cc33a687dd5891d93",
          "message": "Make the API reference and the README easier to start from\n\nAPI reference:\n- The container member lists are documented: the four detail::basic_*\n  classes behind cptr::list, forward_list, ordered_map and\n  unordered_map are no longer excluded, so each alias now links to a\n  page with every member. Only the allocator and lock internals stay\n  hidden.\n- The cptr namespace carries a start page: what a cage is, where to\n  begin for containers, own nodes, other containers and cages, the\n  one rule, and a complete example. reference/index.html, MrDocs'\n  bare 'Global namespace' list, redirects to it.\n- Each container alias and both allocators have a description and an\n  example; basic_ptr's comments now sit on the members they describe,\n  and get, operator*, the arithmetic operators and nonnull_ptr's\n  members are documented.\n- |name| markup in doc comments, which MrDocs printed literally, is\n  now inline code.\n- scripts/decorate_reference.py adds the site's navigation bar to\n  every reference page; the Pages workflow runs it.\n\nThe guide names default_cage::trim() instead of a bare cage::trim().\n\nREADME:\n- 'Start in two minutes': a complete CMakeLists.txt and main.cpp, the\n  build command and its output, and the single-header and installed\n  alternatives. It replaces the Install section.\n- The first recipe uses real types, and the mapped_cage recipe shows\n  its include (it is not part of cptr/all.hpp) and a whole round trip.\n\nEvery README snippet was built and run as written.",
          "timestamp": "2026-11-14T11:20:00+01:00",
          "tree_id": "75f6ae31bd83ef5b32bdff4ed4f8c755b97771e3",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/94eab073e7b0848984aad99cc33a687dd5891d93"
        },
        "date": 1794649415579,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 81.48,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 81.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 86.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 97.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 119.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 116.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 122.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 120.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 91.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 108.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 91.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 92.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 94.08,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 93.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 92.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 91.47,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 90.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 94.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 94.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 94.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 90.65,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 59.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 54.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 61.1,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 76.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 99.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 99.59,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 99.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 94.08,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 100.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 162.24,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 150.98,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 150.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 122.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 134.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 119.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 114.69,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 114.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 98.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 111.03,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 107.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 111.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 111.4,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 111.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 104.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 87.99,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 90.9,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 91.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 93.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 93.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 96.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 96.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 96.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 97.18,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 97.31,
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
      },
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
          "id": "94eab073e7b0848984aad99cc33a687dd5891d93",
          "message": "Make the API reference and the README easier to start from\n\nAPI reference:\n- The container member lists are documented: the four detail::basic_*\n  classes behind cptr::list, forward_list, ordered_map and\n  unordered_map are no longer excluded, so each alias now links to a\n  page with every member. Only the allocator and lock internals stay\n  hidden.\n- The cptr namespace carries a start page: what a cage is, where to\n  begin for containers, own nodes, other containers and cages, the\n  one rule, and a complete example. reference/index.html, MrDocs'\n  bare 'Global namespace' list, redirects to it.\n- Each container alias and both allocators have a description and an\n  example; basic_ptr's comments now sit on the members they describe,\n  and get, operator*, the arithmetic operators and nonnull_ptr's\n  members are documented.\n- |name| markup in doc comments, which MrDocs printed literally, is\n  now inline code.\n- scripts/decorate_reference.py adds the site's navigation bar to\n  every reference page; the Pages workflow runs it.\n\nThe guide names default_cage::trim() instead of a bare cage::trim().\n\nREADME:\n- 'Start in two minutes': a complete CMakeLists.txt and main.cpp, the\n  build command and its output, and the single-header and installed\n  alternatives. It replaces the Install section.\n- The first recipe uses real types, and the mapped_cage recipe shows\n  its include (it is not part of cptr/all.hpp) and a whole round trip.\n\nEvery README snippet was built and run as written.",
          "timestamp": "2026-11-14T11:20:00+01:00",
          "tree_id": "75f6ae31bd83ef5b32bdff4ed4f8c755b97771e3",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/94eab073e7b0848984aad99cc33a687dd5891d93"
        },
        "date": 1794649417827,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 13.0957,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 10.6699,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 24.0488,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4709,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.7078,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.6477,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 7,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.6426,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 8.4258,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 316.2539,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 289.7227,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 343.873,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 329.125,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 301.0488,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 363.1504,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 41.9102,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 37.8037,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 44.2754,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 353.0723,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 342.3125,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 359.7012,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 24.7891,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 22.4707,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 44.332,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 9.1543,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 9.082,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 10.9473,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 19.051,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 31.6028,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 9.7402,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 27.1582,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 26.6602,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 53.7754,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1445,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3853,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1609,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3848,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1423,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1423,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1423,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 22.2305,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 22.5469,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 12.6387,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 12.6348,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 12.3848,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 12.4961,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 27.5625,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 18.7461,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 27.582,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.7578,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.4121,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.291,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.6904,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.0908,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.3848,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.7842,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 30.6973,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 27.0117,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 26.4238,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 126.0332,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 122.0273,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 121.1621,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.4658,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.9502,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.3516,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 29.2734,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 27.54,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 27.6348,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 119.9521,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 118.4229,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 117.3936,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 143.5986,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 145.2158,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 144.1182,
            "unit": "ns (p50)"
          }
        ]
      }
    ],
    "bench_runtime p90": [
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
        "date": 1794649078767,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 21.7402,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 18.5117,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 38.373,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.3525,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6313,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.4065,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 10.1367,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.2188,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.4863,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 354.0078,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 317.7656,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 427.3477,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 361.7363,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 307.1602,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 388.3672,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 69.7847,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 48.3723,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 76.6726,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 528.7891,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 404.1016,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 497.8906,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 44.6934,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 24.0684,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 58.7227,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.9785,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 10.4492,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 12.4062,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 23.7922,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 22.1316,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 16.0898,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 65.4355,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 52.3242,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 163.0605,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1638,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1833,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1641,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1641,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1641,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 43.8711,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 25.9863,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 22.4844,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 13.9707,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 23.0898,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 14.0703,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 38.4316,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 23.5605,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 38.9141,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 23.541,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5156,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.0244,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7217,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 6.9648,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 5.5273,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 8.0215,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 17.9502,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 17.9111,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 17.7354,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 115.627,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 105.5693,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 104.3564,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.0312,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.4521,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.3447,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.958,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 16.5635,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 16.3105,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 97.2529,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 93.8682,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 93.7803,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 127.6094,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 127.8145,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 127.4541,
            "unit": "ns (p90)"
          }
        ]
      },
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
          "id": "94eab073e7b0848984aad99cc33a687dd5891d93",
          "message": "Make the API reference and the README easier to start from\n\nAPI reference:\n- The container member lists are documented: the four detail::basic_*\n  classes behind cptr::list, forward_list, ordered_map and\n  unordered_map are no longer excluded, so each alias now links to a\n  page with every member. Only the allocator and lock internals stay\n  hidden.\n- The cptr namespace carries a start page: what a cage is, where to\n  begin for containers, own nodes, other containers and cages, the\n  one rule, and a complete example. reference/index.html, MrDocs'\n  bare 'Global namespace' list, redirects to it.\n- Each container alias and both allocators have a description and an\n  example; basic_ptr's comments now sit on the members they describe,\n  and get, operator*, the arithmetic operators and nonnull_ptr's\n  members are documented.\n- |name| markup in doc comments, which MrDocs printed literally, is\n  now inline code.\n- scripts/decorate_reference.py adds the site's navigation bar to\n  every reference page; the Pages workflow runs it.\n\nThe guide names default_cage::trim() instead of a bare cage::trim().\n\nREADME:\n- 'Start in two minutes': a complete CMakeLists.txt and main.cpp, the\n  build command and its output, and the single-header and installed\n  alternatives. It replaces the Install section.\n- The first recipe uses real types, and the mapped_cage recipe shows\n  its include (it is not part of cptr/all.hpp) and a whole round trip.\n\nEvery README snippet was built and run as written.",
          "timestamp": "2026-11-14T11:20:00+01:00",
          "tree_id": "75f6ae31bd83ef5b32bdff4ed4f8c755b97771e3",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/94eab073e7b0848984aad99cc33a687dd5891d93"
        },
        "date": 1794649419676,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.8105,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 12.8477,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 27.9551,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.5349,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.8806,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7043,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.3477,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.002,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 8.7148,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 416.3105,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 384.9277,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 449.5312,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 428.582,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 388.5527,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 462.9551,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 47.7764,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 44.8582,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 49.7327,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 436.582,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 457.1562,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 436.5664,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 44.7188,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 26.6172,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 58.4902,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.5215,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 10.4785,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 11.8672,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 22.3691,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 38.6328,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 28.6875,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 31.9609,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 30.6543,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 74.334,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1487,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3896,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.3884,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3889,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1477,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1479,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1477,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 25.3066,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 26.4746,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 14.6992,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 15.1309,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 13.2461,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 12.8398,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 28.4277,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 19.1055,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 28.8027,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 19.1582,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.6416,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.4785,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.8828,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.3252,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.8242,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.2305,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 33.4189,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 30.377,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 29.9766,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 131.6436,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 127.46,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 126.7471,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.4834,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 5.1562,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.5781,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 30.8447,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 28.9785,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 28.9043,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 125.5244,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 124.4658,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 123.4883,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 149.7783,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 151.4873,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 150.3613,
            "unit": "ns (p90)"
          }
        ]
      }
    ],
    "bench_runtime p95": [
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
        "date": 1794649080587,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 22.2676,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 18.9805,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 40.7031,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4038,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6584,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.5044,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 10.293,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.3535,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.584,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 585.1465,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 497.4395,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 668.1328,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 394.8652,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 335.2617,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 423.6113,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 77.791,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 55.4316,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 83.6731,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 561.7422,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 429.1094,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 547.8672,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 50.7988,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 26.7109,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 64.3594,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 11.623,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 10.957,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 13.1289,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 25.6953,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 23.7971,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 18.8025,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 71.4629,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 55.5742,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 188.2246,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1641,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1982,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1787,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1663,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.176,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 51.4844,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 26.5918,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 23.0117,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 14.2266,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 26.0254,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 14.6191,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 45.3594,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 23.8535,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 47.5898,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 23.9121,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5361,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.0439,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7412,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 7.8555,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 6.1035,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 8.3828,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.0947,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.5664,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 18.3994,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 119.5215,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 109.4629,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 108.25,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.168,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.5098,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.4805,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 16.0352,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 16.6035,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 16.3584,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 101.1572,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 97.8604,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 97.9668,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 130.5547,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 131.0049,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 130.252,
            "unit": "ns (p95)"
          }
        ]
      }
    ],
    "bench_runtime p99": [
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
        "date": 1794649082299,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 34.1465,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 23.6387,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 62.4414,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 2.0718,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.5562,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 2.9668,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 10.8809,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 14.4629,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 21.9746,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 645.9238,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 568.6484,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 750.8301,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 459.5586,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 395.9805,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 485.6211,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 94.0884,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 73.1641,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 97.8274,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 625.3574,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 473.5273,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 593.6973,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 142.5742,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 84.75,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 99.6602,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 20.7812,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 20.9395,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 26.0645,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 30.4014,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 26.5857,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 27.1338,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 80.209,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 65.9258,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 217.8906,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1787,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2715,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.4036,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.4011,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.4109,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 66.0625,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 45.2402,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 42.7188,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 26.123,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 46.0645,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 24.5176,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 68.8594,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 51.3652,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 84.3574,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 51.8359,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.6045,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.084,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7705,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 12.5303,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 9.7236,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 10.917,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 28.2607,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 27.6445,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 27.6543,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 128.7373,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 118.3281,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 117.0264,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 5.7637,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 5.2539,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 5.3125,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 25.8301,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 25.8691,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 25.9385,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 109.6006,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 106.4199,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 106,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 139.1064,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 139.6309,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 139.0576,
            "unit": "ns (p99)"
          }
        ]
      }
    ],
    "bench_runtime p99.5": [
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
        "date": 1794649084074,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 36.7305,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 45.3594,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 86.9414,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 3.8206,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 4.2732,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 4.009,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 11.8379,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 29,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 31.916,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 695.1367,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 578.1211,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 759.6914,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 484.3887,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 419.9121,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 503.3691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 99.9233,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 80.689,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 101.282,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 647.5469,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 499.8086,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 646.0996,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1078.3203,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 839.6074,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 882.9707,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 30.623,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 30.584,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 32.8926,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 33.124,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 28.3369,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 30.8101,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 91.4023,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 72.4219,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 234.4648,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1833,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.3865,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4963,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.4182,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.4182,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.4282,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 75.7676,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 49.1934,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 45.9258,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 32.6406,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 54.3398,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 34.6172,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 72.9297,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 53.3223,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 109.8945,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 59.7812,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.6826,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.3184,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.8389,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.2305,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 14.1162,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 14.8887,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 29.8018,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 29.3174,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 29.7139,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 132.9258,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 123.2979,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 121.2822,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 9.4229,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 9.168,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 9.1973,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 27.3262,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 27.4932,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 27.3955,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 112.9463,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 110.1191,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 108.7588,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 142.0811,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 144.7959,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 142.7314,
            "unit": "ns (p99.5)"
          }
        ]
      }
    ]
  }
}