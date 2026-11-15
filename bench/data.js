window.BENCHMARK_DATA = {
  "lastUpdate": 1794733239877,
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661337873,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 80.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 56,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 86.99,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 86.53,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 55.43,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 118.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 111.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 106.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 89.77,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 157.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 83.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 86.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 85.36,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 94.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 97.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 78.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 83.99,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 85.44,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 89.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 88.29,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 62.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 55.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 45.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 65.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 69.83,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 84.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 85.73,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 86.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 71.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 87.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 149.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 137.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 137.9,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 135.65,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 122.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 124.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 116.95,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 117.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 116.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 106.29,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 101.39,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 104.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 104.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 104.76,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 90.74,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 91.47,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 84.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 78.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 92.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 92.74,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 96.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 97.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 96.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 98.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 99.48,
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662060778,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 82.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 63.96,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 86.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 82.56,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 111.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 125.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 119.69,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 116.86,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 104.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 195.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 94.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 83.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 83.92,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 86.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 90.78,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 85.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 88.83,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 88.81,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 88.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 87.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 82.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 54.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 47.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 55.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 72.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 90.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 87.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 87.39,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 87.59,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 97.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.67,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 131.94,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 131.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 129.08,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 126.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 124.73,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 112.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 111.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 110.12,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 108.47,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 104.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 106.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 100.22,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 93.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 94.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 83.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 87.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 89.47,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 87.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 85.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 88.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 90.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 90.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 90.92,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 90.54,
            "unit": "% of raw pointers"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663801349,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 82.07,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 64.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 86.85,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 57.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 58.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 117.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 108.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 106.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 101.59,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 107.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 85.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 91.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 95.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 94.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 94.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 90.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 97.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 100.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 101.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 104.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 64.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 57.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 43.14,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 57.81,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 67.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 83.93,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 86.43,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 87.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 81.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 88.22,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.67,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 133.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 133.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 129.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 123.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 124.73,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 111.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 111.1,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 109.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 105.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 103.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 103,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 91.98,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 94.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 108.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 71.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 55.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 55.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 55.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 56.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 96.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 96.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 96.64,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 96.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 96.97,
            "unit": "% of raw pointers"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663958046,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 81.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 55.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 87.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 88.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 95.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 123.16,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 120.03,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 118.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 191.22,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 186.81,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 99.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 89.18,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 87.9,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 89.65,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 88.81,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 88.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 86.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 84.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 77.24,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 74.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 93.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 62.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 57.48,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 60.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 74.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 97.72,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 96.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 93.72,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 90.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 87.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 150.41,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 139.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 139.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 136.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 123.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 125.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 116.74,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 117.4,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 115.89,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 104.72,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 101.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 105.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 104.94,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 94.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 73.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 96.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 101.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 101.17,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 97.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 99.85,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 82.86,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 85.72,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 88.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 76.48,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 82.55,
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677887106,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 84.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 65.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 88.51,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 83.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 49.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 124.56,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 119.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 116.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 115.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 191.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 93.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 88,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 86.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 85.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 85.4,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 83.98,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 86.92,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 86.45,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 85.75,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 87.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 83.27,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 57.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 50.14,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 44.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 68.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 86.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 85.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 84.96,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 85.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 85.63,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.67,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 131.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 129.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 127.55,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 123.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 123.93,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 111.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 109.71,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 108.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 105.83,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 101.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 104.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 101.81,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 96.29,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 96.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 93.95,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 88.57,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 88.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 94.39,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 93.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 89.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 90.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 91.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 91.77,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 91.86,
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678162517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 81.85,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 64.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 86.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 82.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 130.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 119.64,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 112.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 110.03,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 109.44,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 104.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 81.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 82.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 82.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 86.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 79.77,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 82.51,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 83.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 84.96,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 86.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 87.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 76.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 53.63,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 50.18,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 52.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 68.55,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 82.48,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 82.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 82.52,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 65.96,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 86.65,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 134.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 133.84,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 131.68,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 135.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 124.07,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 114.16,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 114.75,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 113.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 110.69,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 83.75,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 98.88,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 83.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 86.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 83.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 96.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 100.44,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 98.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 98.03,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 98.91,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 84.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 85.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 86.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 87.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 87.49,
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730963199,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 88.37,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 90.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 93.55,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 219.77,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 224.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 175,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 176.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 172.53,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 224.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 137.45,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 92.18,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 100.59,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 106.5,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 111.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 113.1,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 79.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 81.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 82.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 83.36,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 83.96,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 84.24,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 49.02,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 38,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 46.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 63.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 95.24,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 96.21,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 95.75,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 92.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 96.69,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 162.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 152.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 151.35,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 150.58,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 127.25,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 119.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 115.13,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 114.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 114.01,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 97.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 107.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 111.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 111.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 92.74,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 78.43,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 83.45,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 85.04,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 85.22,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 88.66,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 88.99,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 97.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 97.1,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 96.87,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 96.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 96.55,
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
          "id": "7bb67d36e511b0504fcce55984c8ea4b9ac38e1c",
          "message": "Inline the allocator's thread-cache fast path\n\ntry_allocate() and deallocate() were too large for either compiler to\ninline, so every allocation and free was a call; Clang also refused to\ninline state(), whose static-initialisation guard pushed it over the\nthreshold. Each now holds only the common case, a small block popped\nfrom or pushed onto this thread's cache, and calls try_allocate_slow()\nor deallocate_slow() for the rest: initialisation, refills, flushes,\nlarge blocks, alignment above 64 and threads whose cache has gone.\n\nThe free path reads the span table through a pointer set in init()\nbefore the cage is published, as the base address already is, so it\ndoes not go through state().\n\nGCC 15 and Clang 22 now inline about a dozen instructions for an\nallocation, with no call. Measured on an i7-12700H at p50: allocator\nchurn 16% (GCC) and 19% (Clang) faster, list push_back 24% and 26%, list\npop 19% and 22%, unordered_map inserts 15% and 23%; walks and lookups\nare unchanged. The tests pass with CPTR_CHECKED, under ASan, UBSan and\nTSan, and fuzz_allocator ran for three minutes without a finding.",
          "timestamp": "2026-11-15T09:57:10+01:00",
          "tree_id": "626de93c20b05321ec8ebafb45df546e6b8ce8bf",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/7bb67d36e511b0504fcce55984c8ea4b9ac38e1c"
        },
        "date": 1794733233470,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list push_back, p50",
            "value": 66.28,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p90",
            "value": 50.39,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p95",
            "value": 77.31,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99",
            "value": 64.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "list push_back, p99.5",
            "value": 42.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p50",
            "value": 120.42,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p90",
            "value": 111.93,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p95",
            "value": 108.46,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99",
            "value": 98.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "list walk, p99.5",
            "value": 111.2,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p50",
            "value": 93.64,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p90",
            "value": 88.79,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p95",
            "value": 89.8,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99",
            "value": 91.16,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map insert, p99.5",
            "value": 91.45,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p50",
            "value": 79.07,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p90",
            "value": 87.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p95",
            "value": 90.07,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99",
            "value": 94.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "ordered_map find, p99.5",
            "value": 94.59,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p50",
            "value": 74.11,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p90",
            "value": 45.51,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p95",
            "value": 34.75,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99",
            "value": 56.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map insert, p99.5",
            "value": 76.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p50",
            "value": 83.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p90",
            "value": 87.62,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p95",
            "value": 87.72,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99",
            "value": 83.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "unordered_map find, p99.5",
            "value": 85.38,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p50",
            "value": 148.97,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p90",
            "value": 140.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p95",
            "value": 138.74,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99",
            "value": 138.82,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, p99.5",
            "value": 129.95,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p50",
            "value": 125.08,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p90",
            "value": 118.23,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p95",
            "value": 117.06,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99",
            "value": 116.64,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L1, nonnull_ptr, p99.5",
            "value": 107.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p50",
            "value": 101.34,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p90",
            "value": 105.49,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p95",
            "value": 105.15,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99",
            "value": 100.3,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L2, p99.5",
            "value": 100.54,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p50",
            "value": 96,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p90",
            "value": 53.26,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p95",
            "value": 56.61,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99",
            "value": 76.6,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, L3, p99.5",
            "value": 79.29,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p50",
            "value": 95.19,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p90",
            "value": 97.32,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p95",
            "value": 97.7,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99",
            "value": 98.09,
            "unit": "% of raw pointers"
          },
          {
            "name": "pointer chase, DRAM, p99.5",
            "value": 96.84,
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661339551,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 10.8184,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 8.6836,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 20.7148,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.0222,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.2151,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.0146,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 4.3223,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.5176,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 5.6152,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 438.4746,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 363.9883,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 500.0508,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 628.957,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 496.041,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 647.2676,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 123.9663,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 106.77,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 132.1331,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 581.0332,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 497.5293,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 527.6719,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 33.6836,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 20.9883,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 27.502,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 16.1367,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 13.6348,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 21.2422,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 74.3701,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 56.4619,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 21.26,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 63.1035,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 53.2246,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 88.9023,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.115,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2273,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2273,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.115,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.115,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.115,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 13.4785,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 10.6406,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.4883,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 9.9941,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 9.3906,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 9.8379,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 17.7617,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 14.8867,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 17.7207,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 14.6895,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 0.9102,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.3594,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.1348,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 2.875,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 2.915,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.6895,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 12.04,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 11.0127,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 10.7686,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 148.1328,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 143.1846,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 142.7734,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.4238,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.6094,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.374,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 10.7676,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 10.9443,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 10.709,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 140.1533,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 139.0381,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 138.5781,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 155.2725,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 155.292,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 154.96,
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662063569,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 13.2227,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 10.8965,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 28.0488,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4033,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1223,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.0449,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.2793,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.8184,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 215.5977,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 202.707,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 245.1523,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 270.0547,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 231.2266,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 298.4766,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 45.437,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 33.4072,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 49.7698,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 346.8906,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 291.6094,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 327.3477,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 22.6328,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 18.5625,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 32.2949,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.9355,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 9.8789,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 13.3398,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 20.3259,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 18.5898,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 5.6458,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 36.0117,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 28.7148,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 59.3066,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1394,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4131,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1394,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4131,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.144,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.144,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 23.8848,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 15.4922,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 15.5117,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.4844,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 15.5117,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 9.5059,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 26.0918,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.5625,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 26.0508,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 17.5645,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.6436,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.3789,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.6582,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.8135,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.54,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 18.0449,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 15.0713,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 14.9541,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 130.3428,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 115.5156,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 115.2314,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8242,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.1963,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9229,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 13.5947,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 13.7705,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 13.5068,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 91.8467,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 88.083,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 87.9746,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 148.9043,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 149.0703,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 148.9922,
            "unit": "ns (p50)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663803476,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 13.3008,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 10.916,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 27.0312,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.2104,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4207,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1787,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.1035,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.0215,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.7988,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 433.4473,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 369.6602,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 525.127,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 522.4473,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 474.3867,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 569.9805,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 121.0588,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 104.5242,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 123.9148,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 642.293,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 547.1914,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 589.9688,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 35.5215,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 22.8086,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 33.252,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 19.9512,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 16.7441,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 25.1934,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 70.7095,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 54.9165,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 20.0691,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 69.9883,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 53.7715,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 116.0938,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1394,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4131,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4131,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 65.5469,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 16.4707,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 15.4727,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 9.5469,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 15.5117,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 9.2129,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 26.0547,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.625,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 26.0547,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 17.5078,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.6436,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.3789,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.668,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.8135,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.541,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 23.8633,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 17.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 17.2627,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 142.7637,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 137.7949,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 137.5117,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8242,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.1963,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9219,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 13.6045,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 13.751,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 13.4277,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 118.1074,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 115.5156,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 115.0557,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 152.0938,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 152.1426,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 151.6436,
            "unit": "ns (p50)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663959844,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 9.7402,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 7.9023,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 18.6816,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 0.939,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.1565,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 0.9292,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 3.873,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.1484,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 5.3594,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 160.8086,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 159.3418,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 188.291,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 176.3613,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 155.2148,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 185.7285,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 22.7563,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 18.0229,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 25.3657,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 211.4336,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 199.5605,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 205.1758,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 13.1445,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 12.2852,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 22.9648,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 5.2246,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 5.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 5.2031,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 14.0251,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 13.2771,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 3.1174,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 15.6875,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 14.8652,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 26.8184,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2373,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2371,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1223,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1223,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1223,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 13.752,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 11.1484,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.7617,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.4062,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 9.8574,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.5039,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 17.7812,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 15.0215,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 17.6445,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 14.7285,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 0.9297,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.3984,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.1641,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 2.9248,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 2.9639,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.7383,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 12.3438,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 11.8545,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 11.6191,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 127.8203,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 105.9121,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 105.0996,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2568,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.4326,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.1982,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 10.9434,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 11.1201,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 10.9346,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 87.4756,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 78.6543,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 77.2158,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 146.1777,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 146.1885,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 145.875,
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677889299,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 13.1836,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.1113,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 27.3457,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1248,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4011,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 5.9062,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.3574,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.4082,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 213.1523,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 199.7324,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 240.6348,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 274.709,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 230.7012,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 302.0566,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 45.8577,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 33.2483,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 49.188,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 350.502,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 285.4785,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 306.0176,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 23.9629,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 19.9531,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 32.8828,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.4277,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 9.0371,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 12.4609,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 19.696,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 18.3682,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 5.2229,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 35.8945,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 29.1641,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 54.75,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0979,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4131,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.0979,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4109,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1418,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 23.5703,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 15.6484,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 15.4531,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 9.3301,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 15.4336,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 9.3301,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 25.7422,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 19.2285,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 26.0156,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.9941,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.6436,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.3701,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.7949,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.8633,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.5791,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 15.8545,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 14.8955,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 14.4746,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 130.9199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 116.7207,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 115.3984,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8242,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.1963,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9229,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 13.3994,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 13.5947,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 13.2715,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 93.9014,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 89.8516,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 89.667,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 149.9131,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 149.8896,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 149.5703,
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678164486,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 16.4941,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 13.5,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 31.8164,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.3452,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6094,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.4382,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 8.9043,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.2559,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.1738,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 366.0547,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 298.7227,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 427.9297,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 356.877,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 294.457,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 387.6562,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 50.3113,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 33.0791,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 57.0254,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 462.0137,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 381.7852,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 450.5859,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 32.9336,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 25.1055,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 46.1406,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 17.3164,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 14.2832,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 21.5039,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 19.7095,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 19.02,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 4.4712,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 38.2754,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 31.623,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 90.1504,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1125,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3767,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.115,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3767,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1614,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1614,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1614,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 40.4648,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 22.5605,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 22.4629,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 14.5586,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 22.4434,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 14.5,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 37.4727,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 24.4395,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 37.5312,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 24.3613,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.2617,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8779,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5654,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.9893,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.1787,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.8545,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 16.29,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 15.7715,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 15.4199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 109.374,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 91.9678,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 91.332,
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
            "value": 3.8945,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 14.8613,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 15.1553,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 14.8223,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 71.0605,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 66.3145,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 64.7402,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 125.3408,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 125.4873,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 124.9893,
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730965517,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 13.5156,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.9434,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 20.5117,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4463,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.531,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.5422,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.8496,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.457,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 7.5469,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 362.4473,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 334.0938,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 431.4707,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 490.5508,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 387.5684,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 525.5547,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 72.4456,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 53.0088,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 83.6689,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 465.9004,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 413.2754,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 492.3984,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 33.1094,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 27.8906,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 44.3281,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 8.7832,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 8.3652,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 10.7773,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 18.7205,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 30.1873,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 10.1348,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 43.6348,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 33.6113,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 55.9258,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0977,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3557,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1702,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.356,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.0972,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.0969,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.0969,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 22.1953,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 14.832,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 11.2383,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.9824,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 11.1602,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.9863,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 26.2441,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.4688,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 26.2168,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 17.4902,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.3037,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.1201,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5605,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.8057,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.084,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.5322,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 33.7549,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 28.1689,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 27.6367,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 149.2783,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 145.4326,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 144.709,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.1211,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.5566,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.0146,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 30.8945,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 28.666,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 28.6982,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 139.3193,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 138.7529,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 138.1406,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 168.5664,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 168.29,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 167.7852,
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
          "id": "7bb67d36e511b0504fcce55984c8ea4b9ac38e1c",
          "message": "Inline the allocator's thread-cache fast path\n\ntry_allocate() and deallocate() were too large for either compiler to\ninline, so every allocation and free was a call; Clang also refused to\ninline state(), whose static-initialisation guard pushed it over the\nthreshold. Each now holds only the common case, a small block popped\nfrom or pushed onto this thread's cache, and calls try_allocate_slow()\nor deallocate_slow() for the rest: initialisation, refills, flushes,\nlarge blocks, alignment above 64 and threads whose cache has gone.\n\nThe free path reads the span table through a pointer set in init()\nbefore the cage is published, as the base address already is, so it\ndoes not go through state().\n\nGCC 15 and Clang 22 now inline about a dozen instructions for an\nallocation, with no call. Measured on an i7-12700H at p50: allocator\nchurn 16% (GCC) and 19% (Clang) faster, list push_back 24% and 26%, list\npop 19% and 22%, unordered_map inserts 15% and 23%; walks and lookups\nare unchanged. The tests pass with CPTR_CHECKED, under ASan, UBSan and\nTSan, and fuzz_allocator ran for three minutes without a finding.",
          "timestamp": "2026-11-15T09:57:10+01:00",
          "tree_id": "626de93c20b05321ec8ebafb45df546e6b8ce8bf",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/7bb67d36e511b0504fcce55984c8ea4b9ac38e1c"
        },
        "date": 1794733235823,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 9.9746,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 6.6113,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 17.4082,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 0.9341,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.1248,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 0.939,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.2402,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.9297,
            "unit": "ns (p50)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.0449,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 214.4648,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 200.8301,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 243.6484,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 444.1875,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 351.2129,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 493.9102,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 111.7898,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 86.4121,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 121.6533,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 484.2461,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 402.6973,
            "unit": "ns (p50)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 463.3555,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 23.8848,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 17.7012,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 25.957,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 13.6738,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 11.4824,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 18.0352,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 20.8101,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 16.7095,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 8.7827,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 63.4551,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 56.2559,
            "unit": "ns (p50)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 123.7988,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1199,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2373,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1248,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2371,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1174,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1174,
            "unit": "ns (p50)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1174,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 13.1836,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 9.252,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.623,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 8.625,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 9.6426,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 8.5664,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 17.4863,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 12.3223,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 16.9395,
            "unit": "ns (p50)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 11.9316,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 0.8994,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.3398,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.125,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 2.8369,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 2.875,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.6504,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 12.2354,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 11.7461,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 11.3066,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 142.6289,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 135.7705,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 135.4609,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2764,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.4521,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.2168,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 10.5527,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 10.7393,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 10.4453,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 132.2754,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 130.4951,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 129.7334,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 149.8213,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 149.9092,
            "unit": "ns (p50)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 149.625,
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661341101,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 16.4512,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 9.2129,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 26.6406,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1467,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.2764,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1296,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 5.0273,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.7539,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.0625,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 658.8457,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 571.8203,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 714.3027,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 753.3262,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 632.7129,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 762.6738,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 141.9478,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 130.7051,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 149.1306,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 740.8262,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 690.7305,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 667.3945,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 59.9531,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 33.0762,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 85.0879,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 18.3672,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 15.7461,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 23.8828,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 97.2195,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 82.7959,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 73.6904,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 73.5879,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 69.5195,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 128.1816,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1174,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2275,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.176,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2275,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.115,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1172,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.115,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 15.4336,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 10.8965,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.7422,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.2891,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 10.5039,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.1133,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 19.0137,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 15.6875,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 19.5801,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 15.8047,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0371,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4277,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2129,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.0518,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.1982,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.9736,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 14.2891,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 12.0977,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 11.8545,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 155.8594,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 151.2041,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 150.8721,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.5117,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.7168,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.4717,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.7266,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 12.0889,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 11.8047,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 147.9961,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 146.9697,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 146.5498,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 163.8105,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 164.0264,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 163.5762,
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662065908,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 18.0742,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.5605,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 33.2539,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1931,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.428,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1934,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.3379,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.5137,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.8984,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 380.1602,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 316.1191,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 457.3301,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 317.9199,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 282.3965,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 343.3672,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 60.5085,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 43.9211,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 66.1323,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 450.1289,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 379.3203,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 432.4863,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 39.9043,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 21.6328,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 45.3418,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 13.7891,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 12.0312,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 17.7402,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 23.6145,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 21.7856,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 17.8027,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 40.6465,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 33.0371,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 77.7539,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1418,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1492,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 26.2695,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 16.7031,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 16.9609,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.5605,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 16.7051,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.6016,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 27.9883,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.9746,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 31.0391,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.1328,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.3789,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8193,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5449,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.8037,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.0391,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.7461,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 22.2695,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 19.5898,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 18.4844,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 141.1201,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 127.7695,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 127.4385,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8535,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2549,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9707,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.1982,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 15.5508,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 15.2578,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 105.9209,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 101.833,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 100.7178,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 157.7168,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 157.8535,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 157.8232,
            "unit": "ns (p90)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663805290,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 17.9766,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.5801,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 32.041,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.3499,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4646,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.291,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.8477,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.375,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.0352,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 726.6016,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 661.3281,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 842.7363,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 624.7305,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 609.7266,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 659.5586,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 137.7437,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 127.5525,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 138.5745,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 816.3652,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 738.6504,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 742.25,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 59.3281,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 34.0352,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 88.2383,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 22.6309,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 19.5605,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 28.3828,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 97.8569,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 84.3162,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 66.7654,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 78.9453,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 64.4512,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 148.5625,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1418,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4155,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2004,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 75.8945,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 18.9922,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 17.1172,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.6797,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 17.5254,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.6797,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 28.0703,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 18.0918,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 35.4043,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.1133,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.3887,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8584,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5459,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.9023,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.0195,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.7656,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 44.2754,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 24.3623,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 25.2041,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 153.8447,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 148.6221,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 148.3281,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8535,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2539,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9707,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.0029,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 15.5117,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 15.1787,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 129.4922,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 128.1416,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 127.7607,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 165.0234,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 164.7402,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 164.6221,
            "unit": "ns (p90)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663961325,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.1973,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 8.4492,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 24.0781,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 0.9902,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.1885,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 0.9805,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 4.0293,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.2852,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 5.418,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 235.5898,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 210.1016,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 292.043,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 213.252,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 184.2617,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 229.4863,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 39.5959,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 24.8718,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 45.7334,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 243.8652,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 231.4434,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 241.7344,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 23.3164,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 14.5723,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 30.418,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 6.123,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 5.9062,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 6.5332,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 15.6633,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 15.0544,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 10.6387,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 18.5645,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 17.1934,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 40.4922,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1223,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2422,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1248,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2373,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1245,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1245,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1245,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 14.0254,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 11.4434,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.9766,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.6797,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 10.1328,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 12.8125,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 18.4453,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 15.8633,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 18.3887,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 15.2363,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0557,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4766,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2324,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.1299,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.3057,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.0713,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 13.126,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 13.2627,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 13.0283,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 136.085,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 116.6504,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 114.7822,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2676,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.5791,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.3643,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.7471,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 12.2939,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 12.0391,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 112.1523,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 106.0596,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 105.1777,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 156.5742,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 156.7139,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 155.9492,
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677891018,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 17.8984,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.7363,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 32.5684,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1934,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4231,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1858,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.2207,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.5723,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.8379,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 312.6191,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 275.1016,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 371.125,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 325.3125,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 282.75,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 356.3574,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 59.489,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 42.8696,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 64.208,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 412.1211,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 336.5156,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 363.8027,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 41.2734,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 23.8047,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 45.3828,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 14.0449,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 12.0488,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 17.5254,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 22.833,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 21.3489,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 16.5898,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 42.2305,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 35.1895,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 80.8848,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0979,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1174,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 26.0938,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 16.5879,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 16.9785,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.4648,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 16.8223,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.6602,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 27.4434,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 19.9922,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 29.8301,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 19.8926,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.3887,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8291,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5449,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.0781,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.2646,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.9609,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.3359,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 17.125,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 16.9199,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 140.1035,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 126.9297,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 125.3057,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8535,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2549,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9707,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 14.8672,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 15.2578,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 14.9453,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 109.0625,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 104.7295,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 104.5635,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 158.4961,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 158.4268,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 158.3242,
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678166260,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 22.5996,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 14.5195,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 38.0391,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4775,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6682,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.6682,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.3926,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.7832,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.3691,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 456.5938,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 375.7617,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 517.0996,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 468.4707,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 392.7656,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 496.043,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 99.7637,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 77.459,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 103.1953,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 617.127,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 507.0391,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 570.2031,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 58.7422,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 31.5059,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 67.8809,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 21.8379,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 18.0215,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 26.6504,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 22.9822,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 21.9524,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 15.4045,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 44.0469,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 36.8086,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 126.584,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1125,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2029,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1638,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1638,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1638,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 45.2207,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 26.3789,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 29.5664,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 14.8906,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 30.1914,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 14.9297,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 38.8223,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 25.0469,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 39.8984,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 24.9102,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5166,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.0352,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7314,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 6.085,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 6.0166,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 5.4502,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 17.9248,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.0029,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 17.7773,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 119.7832,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 102.4668,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 101.5078,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.7861,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2852,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9521,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 16.3096,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 16.7305,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 16.3584,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 83.7695,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 78.2412,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 75.3359,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 135.9473,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 136.1523,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 135.5752,
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730967319,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.7715,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 14.2539,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 23.373,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.5432,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.718,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.6624,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 7.6543,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.5918,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 8.2324,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 494.9961,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 497.9043,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 599.1465,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 590.4043,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 478.4512,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 605.4023,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 88.2922,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 68.5105,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 104.741,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 571.8027,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 551.125,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 587.6758,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 66.293,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 32.498,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 70.1055,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 9.9473,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 9.5703,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 11.873,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 28.7649,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 37.8032,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 32.3843,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 54.5254,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 44.1074,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 102.2871,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0984,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3611,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.4128,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3618,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.0977,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.0989,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.0974,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 24.7051,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 15.5859,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 11.957,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.3945,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 12.502,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 11.375,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 27.1055,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.8301,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 27.9258,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 17.9121,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5098,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.2969,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7383,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.002,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.459,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.9023,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 36.9004,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 31.3799,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 30.8438,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 158.7969,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 154.1865,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 153.6084,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.1514,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.7441,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.2207,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 32.3438,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 30.5049,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 30.3086,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 152.752,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 152.8564,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 152.2383,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 187.5605,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 187.8779,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 187.0342,
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
          "id": "7bb67d36e511b0504fcce55984c8ea4b9ac38e1c",
          "message": "Inline the allocator's thread-cache fast path\n\ntry_allocate() and deallocate() were too large for either compiler to\ninline, so every allocation and free was a call; Clang also refused to\ninline state(), whose static-initialisation guard pushed it over the\nthreshold. Each now holds only the common case, a small block popped\nfrom or pushed onto this thread's cache, and calls try_allocate_slow()\nor deallocate_slow() for the rest: initialisation, refills, flushes,\nlarge blocks, alignment above 64 and threads whose cache has gone.\n\nThe free path reads the span table through a pointer set in init()\nbefore the cage is published, as the base address already is, so it\ndoes not go through state().\n\nGCC 15 and Clang 22 now inline about a dozen instructions for an\nallocation, with no call. Measured on an i7-12700H at p50: allocator\nchurn 16% (GCC) and 19% (Clang) faster, list push_back 24% and 26%, list\npop 19% and 22%, unordered_map inserts 15% and 23%; walks and lookups\nare unchanged. The tests pass with CPTR_CHECKED, under ASan, UBSan and\nTSan, and fuzz_allocator ran for three minutes without a finding.",
          "timestamp": "2026-11-15T09:57:10+01:00",
          "tree_id": "626de93c20b05321ec8ebafb45df546e6b8ce8bf",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/7bb67d36e511b0504fcce55984c8ea4b9ac38e1c"
        },
        "date": 1794733237624,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.2187,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 7.668,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 22.75,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.0662,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.1934,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.0564,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.8086,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 5.2617,
            "unit": "ns (p90)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.4355,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 702.3105,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 623.5977,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 805.2969,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 722.6133,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 629.7402,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 774.998,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 134.8081,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 122.2622,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 141.6152,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 698.4766,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 649.2422,
            "unit": "ns (p90)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 683.8242,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 50.3301,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 22.9062,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 53.9492,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 21.9668,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 19.248,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 28.9492,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 96.9153,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 81.9148,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 47.5322,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 69.1074,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 65.2363,
            "unit": "ns (p90)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 142.7539,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1223,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2422,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1907,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2397,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1199,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1199,
            "unit": "ns (p90)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1199,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 13.5547,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 9.5645,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 9.8379,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.5977,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 9.8008,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 8.7832,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 18.4258,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 12.6348,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 18.8379,
            "unit": "ns (p90)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 12.3418,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0176,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4277,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2031,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.0225,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.1885,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.9736,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 41.0088,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 21.8398,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 17.8779,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 150.4795,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 146.4404,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 146.2744,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2959,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.5898,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.3643,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.4326,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 11.8145,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 11.502,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 143.0234,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 142.751,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 142.4561,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 166.291,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 164.6182,
            "unit": "ns (p90)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 164.4033,
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
        "date": 1794649421608,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 17.1211,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 14.7949,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 29.5117,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.6372,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.9729,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7864,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.5195,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 8.3027,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 8.8242,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 457.3125,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 430.2363,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 497.5469,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 446.6836,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 423.4277,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 486.0664,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 48.6711,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 45.3389,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 51.2512,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 486.1621,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 490.7969,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 486.9082,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 52.1035,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 28.1836,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 62.1758,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.8789,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 10.832,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 12.0488,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 22.8474,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 38.8318,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 30.9299,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 35.6621,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 33.5859,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 79.8945,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1501,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3923,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.4282,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3906,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1479,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1648,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1479,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 27.3984,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 29.0117,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 17.5176,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 15.3613,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 13.6875,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 13.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 29.1719,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 19.2363,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 30.7305,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 19.3242,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.6611,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.502,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.8975,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.3506,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.8467,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.2559,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 34.1064,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 31.2148,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 30.6182,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 134.0342,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 129.7217,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 129.0381,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.4922,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 5.1758,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.5889,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 32.0361,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 30.1416,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 30.0107,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 127.7285,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 126.5859,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 125.6025,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 152.3301,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 153.9414,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 152.5977,
            "unit": "ns (p95)"
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661342553,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 16.998,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 14.7871,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 27.0918,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.2227,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.3032,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.2126,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 5.4785,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.9102,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.2598,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 721.2832,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 615.7148,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 771.6914,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 796.9062,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 680.8516,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 806.5488,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 146.407,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 136.2263,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 153.3906,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 816.9141,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 762.2207,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 710.6621,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 81.2734,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 37.0664,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 94.4004,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 19.0703,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 16.4121,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 24.8809,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 103.9753,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 90.6055,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 81.4094,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 77.3438,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 74.3105,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 148.252,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1174,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2297,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2031,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2275,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1174,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1174,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1174,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 18.4258,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 11.0117,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 10.0332,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.3867,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 15.3145,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 10.2109,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 25.1738,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 16.1191,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 30.084,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 16.3926,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0566,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.457,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2422,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.1689,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.3066,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.0713,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 15.6875,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 12.3721,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 12.0986,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 159.2539,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 154.4316,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 154.1191,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.5215,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.8145,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.5693,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 12.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 12.2939,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 12.0205,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 151.5664,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 150.1289,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 149.708,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 169.043,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 169.3457,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 169.1211,
            "unit": "ns (p95)"
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662068054,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 18.7988,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 16.1953,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 33.957,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.2324,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4402,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.2419,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.5918,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.6113,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.9746,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 414.4512,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 347.7871,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 499.6758,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 334.7793,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 297.3223,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 360.2285,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 71.9417,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 50.6987,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 78.3684,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 530.4473,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 421.5918,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 506.0156,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 48.5293,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 23.0625,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 48.002,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 14.5723,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 12.7344,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 18.7793,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 24.7615,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 22.71,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 19.8931,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 41.9785,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 35.0332,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 89.6465,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.144,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4182,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1787,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4182,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 29.125,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 18.0723,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 17.8789,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 12.3633,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 17.5254,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 11.4824,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 29.5156,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 18.2676,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 42.0703,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.6387,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.3984,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8389,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5645,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.04,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.0488,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.7656,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 23.874,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 21.3604,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 19.874,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 145.9219,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 132.6211,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 131.917,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8633,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2646,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9805,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.7266,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 16.1475,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 15.834,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 112.3467,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 107.8965,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 105.8721,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 160.7979,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 160.9736,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 161.1689,
            "unit": "ns (p95)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663807031,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 18.6016,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 16.1562,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 32.7051,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4011,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.489,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.3376,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 7.2773,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.6484,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.2109,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 812.6504,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 774.5059,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 926.2598,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 667.6855,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 668.9766,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 693.623,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 143.4456,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 134.1426,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 143.1404,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 893.4121,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 819.9824,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 790.25,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 82.8008,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 35.7168,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 97.1191,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 23.5312,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 20.4805,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 29.5371,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 105.4932,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 92.813,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 76.7119,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 83.4258,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 68.1094,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 170.334,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4158,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2224,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4182,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 78.8105,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 20.8516,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 19.2676,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.4629,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 20.9492,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 11.5215,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 31.8262,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 18.4258,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 54.4961,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.4844,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.4082,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8779,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5645,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.3818,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.0303,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.8145,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 49.8701,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 27.6006,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 28.8516,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 157.6689,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 152.3682,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 152.084,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8633,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2637,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9805,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.5703,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 16.0596,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 15.8633,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 133.1689,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 131.6729,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 131.5156,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 169.874,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 169.5322,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 169.3467,
            "unit": "ns (p95)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663962864,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.4336,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 13.498,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 24.5098,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.0198,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.2126,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.0146,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 4.6953,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 4.3809,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 5.4395,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 248.7949,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 218.6895,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 310.3496,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 227.082,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 192.752,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 247.3652,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 57.4626,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 34.3098,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 67.2649,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 257.0879,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 240.3652,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 251.7285,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 26.4082,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 15.1797,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 32.627,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 6.5332,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 6.123,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 7.041,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 15.9568,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 15.2671,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 11.0151,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 19.9707,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 18.0938,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 53.9688,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1223,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2444,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1296,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2395,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1248,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1248,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1248,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 14.2598,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 11.5605,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 10.1523,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 10.7383,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 12.6562,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 13.125,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 18.916,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 16.0391,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 18.9355,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 15.707,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0664,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4863,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.252,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.1592,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.3154,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.0908,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 13.2822,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 13.4375,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 13.1836,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 141.0234,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 124.4648,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 121.042,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2764,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.5898,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.374,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.8926,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 12.4404,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 12.1963,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 120.2305,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 115.585,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 114.4111,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 164.7607,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 164.1045,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 163.5869,
            "unit": "ns (p95)"
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677892719,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 18.543,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 16.4121,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 33.3906,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.2324,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.4399,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.2349,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 6.4941,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.6699,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.877,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 335.3691,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 290.3789,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 397.1992,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 344.875,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 298.1445,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 380.1211,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 71.5261,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 49.2759,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 76.0471,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 440.0938,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 365.0742,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 390.916,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 50.4492,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 25.293,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 49.4531,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 15.6094,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 13.2617,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 19.7773,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 23.843,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 22.3855,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 18.95,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 46.1836,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 37.1445,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 101.3242,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1001,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4182,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.418,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 27.9727,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 17.2129,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 20.4414,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.2656,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 18.2109,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 11.7168,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 29.0293,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 20.3047,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 40.3926,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 20.2656,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.418,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8389,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5557,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.2549,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.332,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 20.5576,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.1523,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 18.2598,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 143.2324,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 130.4209,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 128.7891,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.8633,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2646,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9805,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 15.3262,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 15.874,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 15.4434,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 116.0654,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 112.7402,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 112.3975,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 161.5029,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 161.3066,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 161.2197,
            "unit": "ns (p95)"
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678167967,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 23.0312,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 19.8809,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 38.7051,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.5361,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6902,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7585,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.5488,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 10,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 11.4844,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 486.6309,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 401.6699,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 561.166,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 497.3535,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 422.5469,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 524.2793,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 104.3962,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 84.4863,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 107.3242,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 656.2031,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 537.1934,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 612.2168,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 72.0273,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 36.1426,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 73.0273,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 22.9531,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 18.9414,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 28.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 24.7898,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 22.4639,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 17.239,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 48.1367,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 39.3516,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 147.502,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1125,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2249,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3792,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1641,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1641,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1641,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 48.4492,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 26.7871,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 30.4668,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 15.0684,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 31.8555,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 15.8887,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 47.5293,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 25.4004,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 53.5176,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 25.3008,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5352,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.0547,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7617,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 7.6123,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 6.3789,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 5.9297,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.1768,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.8535,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 18.5889,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 122.9043,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 106.1553,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 105.0977,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.7959,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.2949,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.9531,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 16.417,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 17.0342,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 16.6621,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 89.6201,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 82.9863,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 79.3672,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 138.9209,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 138.9502,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 138.4609,
            "unit": "ns (p95)"
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730969274,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 16.6777,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 15.6016,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 23.9785,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.6211,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.7969,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7393,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.7305,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 9.9043,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 8.625,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 521.373,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 555.2656,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 638.0156,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 625.9688,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 514.6094,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 633.6719,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 93.9739,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 73.553,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 111.2163,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 625.8105,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 597.832,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 637.5273,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 91.4844,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 34.7637,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 74.8438,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 10.3418,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 9.9023,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 13.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 32.2253,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 39.729,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 36.8625,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 73.7188,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 65.3574,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 117.9316,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0989,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3625,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.4912,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3635,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.0984,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.0991,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.0989,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 26.6387,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 15.9414,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 12.373,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.5703,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 13.1328,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 11.5312,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 27.9199,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 17.9727,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 36.373,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 18.0938,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5312,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.3174,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.7549,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.0811,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.5635,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.9971,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 39.4961,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 33.6602,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 32.5879,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 161.9834,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 156.9102,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 156.6504,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.2295,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.7725,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.2256,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 35.6143,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 31.4375,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 31.333,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 157.4736,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 157.4385,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 156.835,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 191.3887,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 191.8311,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 190.8613,
            "unit": "ns (p95)"
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
          "id": "7bb67d36e511b0504fcce55984c8ea4b9ac38e1c",
          "message": "Inline the allocator's thread-cache fast path\n\ntry_allocate() and deallocate() were too large for either compiler to\ninline, so every allocation and free was a call; Clang also refused to\ninline state(), whose static-initialisation guard pushed it over the\nthreshold. Each now holds only the common case, a small block popped\nfrom or pushed onto this thread's cache, and calls try_allocate_slow()\nor deallocate_slow() for the rest: initialisation, refills, flushes,\nlarge blocks, alignment above 64 and threads whose cache has gone.\n\nThe free path reads the span table through a pointer set in init()\nbefore the cage is published, as the base address already is, so it\ndoes not go through state().\n\nGCC 15 and Clang 22 now inline about a dozen instructions for an\nallocation, with no call. Measured on an i7-12700H at p50: allocator\nchurn 16% (GCC) and 19% (Clang) faster, list push_back 24% and 26%, list\npop 19% and 22%, unordered_map inserts 15% and 23%; walks and lookups\nare unchanged. The tests pass with CPTR_CHECKED, under ASan, UBSan and\nTSan, and fuzz_allocator ran for three minutes without a finding.",
          "timestamp": "2026-11-15T09:57:10+01:00",
          "tree_id": "626de93c20b05321ec8ebafb45df546e6b8ce8bf",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/7bb67d36e511b0504fcce55984c8ea4b9ac38e1c"
        },
        "date": 1794733239439,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 15.5117,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 11.9922,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 23.082,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.1248,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.22,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.1077,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 7.2949,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 5.418,
            "unit": "ns (p95)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.6504,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 815.8613,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 732.6289,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 896.002,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 826.9707,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 744.8145,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 881.623,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 141.3289,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 131.2773,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 147.6667,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 787.3223,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 767.625,
            "unit": "ns (p95)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 774.4707,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 68.5605,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 23.8242,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 56.5293,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 22.7676,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 19.9727,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 29.7324,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 110.6104,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 98.1501,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 63.6599,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 73.0195,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 70.0254,
            "unit": "ns (p95)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 146.8613,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1245,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2444,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2175,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2419,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1199,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1199,
            "unit": "ns (p95)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1199,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 13.8672,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 9.7031,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 10.3086,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 11.7949,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 9.918,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 8.8594,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 20.6367,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 12.7324,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 33.0977,
            "unit": "ns (p95)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 12.5977,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0361,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4375,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2129,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.0508,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.208,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 2.9922,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 77.6357,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 43.9521,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 39.0918,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 152.8955,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 149.3809,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 149.0811,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2959,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.6084,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.375,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.7646,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 12.0596,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 11.7949,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 145.7822,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 145.5381,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 145.4697,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 173.0684,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 170.3398,
            "unit": "ns (p95)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 169.7822,
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
        "date": 1794649423457,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 21.2832,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 20.6484,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 70.6777,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 3.3042,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 3.0303,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 4.123,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 13.8438,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 25.6699,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 9.3418,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 517.9648,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 485.2383,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 549.0488,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 478.334,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 451.5996,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 524.4375,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 51.6719,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 47.9026,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 54.3306,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 508.1543,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 516.7324,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 505.5937,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 138.7227,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 84.7656,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 105.2207,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 14.5527,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 13.6914,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 15.3457,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 26.5625,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 41.6326,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 35.752,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 51.7949,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 46.4902,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 92.6914,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1721,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.6382,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.4907,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.5081,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1487,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1707,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1489,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 51.8359,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 50.0625,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 46.4258,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 29.5332,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 27.166,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 23.0566,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 49.7871,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 31.1465,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 67.1348,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 31.4824,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 2.0762,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.5352,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 2.0508,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.3945,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.8828,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.2744,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 40.3623,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 37.8525,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 35.9141,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 142.7393,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 138.7168,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 137.5039,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.5957,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 5.2803,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.6855,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 37.4199,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 35.5166,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 34.8652,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 133.667,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 131.9453,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 130.8242,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 162.1387,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 162.6924,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 159.9355,
            "unit": "ns (p99)"
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661343981,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 17.5859,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 15.2168,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 29.8887,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.55,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.3914,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.4941,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 8.3711,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 6.4746,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.5918,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 774.4121,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 728.4043,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 854.7266,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 887.5312,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 791.0371,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 896.9199,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 154.1953,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 143.6023,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 161.1638,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 995.5059,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 951.2598,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 815.0547,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 114.9785,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 75.6992,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 114.8398,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 28.5391,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 20.3828,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 35.0723,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 117.4551,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 104.0876,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 96.1997,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 86.6934,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 85.5391,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 166.0508,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1174,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2324,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2542,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2349,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1174,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1174,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1174,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 46.457,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 21.2227,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 23.1992,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 16.9199,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 44.3242,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 18.7969,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 84.873,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 28.6758,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 99.9551,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 29.459,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.0957,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.4863,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2715,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.2861,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.4424,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.1982,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 18.8174,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 17.3506,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 16.8125,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 169.5918,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 167.5283,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 164.3984,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.541,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.9023,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.6475,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 17.7324,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 17.9951,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 17.3604,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 164.8682,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 160.0166,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 160.7207,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 197.6514,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 199.7041,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 192.5566,
            "unit": "ns (p99)"
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662070308,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 20.1875,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 16.666,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 55.5898,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.4817,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.5454,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.3521,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 14.377,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.2773,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.25,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 487.6465,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 422.3145,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 568.1777,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 371.8477,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 327.7188,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 401.7363,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 92.8521,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 69.0735,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 99.6292,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 661.8555,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 516.793,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 604.7773,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 130.2344,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 71.6504,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 80.5117,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 17.9766,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 15.7461,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 23.2578,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 28.1528,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 25.3677,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 25.0623,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 56.8047,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 46.3594,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 113.1016,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4207,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2251,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4644,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 45.6348,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 31.4551,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 31.4922,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 17.8574,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 29.7715,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 17.4688,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 46.4922,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 33.2109,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 74.5977,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 35.498,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.4473,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8682,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5938,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 5.7412,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 5.3398,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 5.1836,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 28.8613,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 25.2725,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 23.9424,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 155.5557,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 141.4238,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 141.6094,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.6455,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.7334,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.5967,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 21.9961,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 22.0254,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 22.0059,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 128.7295,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 122,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 117.6963,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 168.6602,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 168.4062,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 167.6436,
            "unit": "ns (p99)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663808844,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 29.8105,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 17.1758,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 46.5547,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.55,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.5747,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.4719,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.8008,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 11.7559,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 14.0254,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 1026.9004,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 966.8672,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 1080.0449,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 763.9922,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 773.5293,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 767.8945,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 150.4758,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 142.0063,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 149.8865,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 1020.6562,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 931.6543,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 875.6719,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 126.6562,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 73.2148,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 119.0254,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 31.6094,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 25.8008,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 43.0527,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 119.3616,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 110.2561,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 92.5708,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 100.7969,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 77.4395,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 197.7383,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1787,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4377,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2617,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4399,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 91.1719,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 32.5098,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 38.3594,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 18.6406,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 54.4961,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 21.8887,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 61.3613,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 34.5234,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 105.373,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 35.1895,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.4678,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8975,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.6045,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 6.3672,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 6.0244,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 5.917,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 62.3008,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 34.5537,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 35.9629,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 166.2754,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 160.4463,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 160.8672,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.2256,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.7529,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.665,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 22.8184,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 22.8955,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 22.5625,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 140.4062,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 139.4092,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 139.6631,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 179.958,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 178.8135,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 178.2363,
            "unit": "ns (p99)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663964377,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 16.2734,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 14.3574,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 27.0918,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.3618,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.604,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.3523,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 7.7266,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 5.6328,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 5.7715,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 273.3828,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 245.0762,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 328.9941,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 274.7891,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 212.2539,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 308.3945,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 78.4197,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 49.8975,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 90.4912,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 281.9707,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 358.4531,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 284.5723,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 110.9102,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 66.8594,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 69.9492,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 8.3535,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 7.5293,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 8.2949,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 17.4631,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 16.7466,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 12.4678,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 30.3984,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 20.3633,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 76.8945,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.137,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2715,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1736,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2419,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1248,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1248,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1248,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 34.3281,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 21.6543,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 19.3848,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 12.5566,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 22.2012,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 171.4102,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 35.7969,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 22.4355,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 42.0371,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 29.0488,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.1055,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.5068,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.2812,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 3.5605,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 3.3545,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.1201,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.209,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.7002,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 18.4072,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 231.9619,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 177.3975,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 156.2324,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.2959,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.6094,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.3936,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 17.6729,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 17.5459,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 17.4688,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 136.1826,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 131.6152,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 131.3701,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 301.9111,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 291.8994,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 274.7314,
            "unit": "ns (p99)"
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677894511,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 20.5977,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 17.1543,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 54.1055,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.467,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 1.6943,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7117,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 14.5723,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.0605,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.1328,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 374.6445,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 321.4219,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 439.8809,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 400.3887,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 343.3496,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 439.1387,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 90.6907,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 66.7288,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 95.5613,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 497.4863,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 394.2793,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 437.9219,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 166.2129,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 74.0996,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 82.0215,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 18.1523,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 15.4336,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 22.7109,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 27.9629,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 24.8713,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 23.6548,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 57.3516,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 45.498,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 125.9902,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1003,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4231,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2053,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4619,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 48.4902,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 32.4316,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 30.75,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 16.4902,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 30.2207,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 17.8398,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 45.8906,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 35.1699,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 75.9941,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 35.5801,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.457,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8584,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.5752,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 5.8096,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 5.5938,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 5.3984,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 24.9297,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 23.5312,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 23.4629,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 149.4727,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 137.1719,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 135.7637,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.3232,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.6162,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.4502,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 21.1748,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 22.0068,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 21.6836,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 129.1426,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 127.1738,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 127.2451,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 167.6055,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 168.4922,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 167.0488,
            "unit": "ns (p99)"
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678169759,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 29.998,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 24.6543,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 76.6875,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.9421,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.1255,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 2.1501,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.9395,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 15.5176,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 13.0898,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 638.0879,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 551.6758,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 679.1602,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 547.2324,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 472.6406,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 578.9336,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 112.7837,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 96.0825,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 114.606,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 752.0859,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 589.8105,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 711.6797,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 177.5176,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 92.9863,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 101.0859,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 36.9043,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 24.3418,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 41.5039,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 29.6746,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 26.1008,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 23.0288,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 62.1094,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 54.0664,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 172.8613,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1296,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.301,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1785,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1785,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1785,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 65.8652,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 45.3789,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 44.5156,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 25.5176,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 49.2148,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 25.5352,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 70.3066,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 54.1035,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 87.918,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 54.4766,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5752,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.0742,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.791,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 11.6719,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 10.0771,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 9.7246,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 28.2754,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 27.7178,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 27.4639,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 130.7227,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 114.1777,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 112.6221,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.334,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.8916,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.5596,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 25.7803,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 25.8887,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 25.4473,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 99.5996,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 91.8418,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 88.29,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 147.0322,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 147.2861,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 146.249,
            "unit": "ns (p99)"
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730971258,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 17.9629,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 39.4766,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 28.3418,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 3.8044,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 8.5222,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 4.531,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 14.1895,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 10.3594,
            "unit": "ns (p99)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.2637,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 577.7285,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 645.0879,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 718.5098,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 678.4023,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 565.5352,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 682.1543,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 103.3152,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 82.2075,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 124.47,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 705.7754,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 647.7227,
            "unit": "ns (p99)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 694.9277,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 167.3281,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 77.3164,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 131.1699,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 13.7148,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 12.75,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 19.1758,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 40.8782,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 43.7253,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 43.802,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 90.5039,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 85.1055,
            "unit": "ns (p99)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 191.2285,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.0999,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3657,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.5618,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3823,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1025,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.103,
            "unit": "ns (p99)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1023,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 65.4531,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 37.5938,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 31.1523,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 19.6855,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 30.0352,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 21.2188,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 68.2988,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 34.4961,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 90.1348,
            "unit": "ns (p99)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 35.0957,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5889,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.3926,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.8115,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.9658,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.6055,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 4.0547,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 50.4287,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 44.71,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 43.7598,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 168.6289,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 162.5977,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 161.8535,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 4.2578,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.9072,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 4.3379,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 48.1309,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 45.4766,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 45.1221,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 165.3906,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 165.5068,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 166.2246,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 198.4023,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 197.9141,
            "unit": "ns (p99)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 197.2588,
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
        "date": 1794649425308,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 31.4902,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 37.5273,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 110.9922,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 4.1509,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 4.4946,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 4.4329,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 13.8809,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 29.5684,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 10.9785,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 529.1875,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 489.5879,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 573.1426,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 493.9805,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 464.7812,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 543.3262,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 53.1582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 48.8208,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 55.9976,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 515.6836,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 518.6387,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 513.4648,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1041.0059,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 791.8047,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 1060.6113,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 31.1699,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 31.2168,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 30.168,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 31.3594,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 42.0354,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 36.4958,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 54.2168,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 49.3789,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 101.4473,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.2234,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.6663,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.5286,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.6641,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1663,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1714,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1724,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 65.1797,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 60.4355,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 52.6895,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 45.0898,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 36.2129,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 30.041,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 53.7793,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 32.8691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 87.373,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 36.5293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 2.5146,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.3906,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 2.792,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 8.793,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 9.1562,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 8.2402,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 42.3701,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 39.5088,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 37.7695,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 147.8506,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 143.8789,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 144.0918,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 8.3242,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 9.5625,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 8.8955,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 41.7158,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 39.5742,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 37.2676,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 138.959,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 136.083,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 136.0547,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 167.668,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 167.8936,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 164.584,
            "unit": "ns (p99.5)"
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
          "id": "b33f1a0bccdc30281f40289679755165470bb4ea",
          "message": "Make the project easier to discover, try and join\n\n- README: a chart of the memory saved, a 'try it' link to a Compiler\n  Explorer example that runs in the browser, a 'Why not something\n  else?' comparison with vector indices, offset_ptr and the x32 ABI,\n  and a Community section pointing at Discussions, issue #3 for\n  benchmark results from other hardware, and good first issues.\n- docs/why.md, rendered to why.html: a five-minute article on the idea,\n  what it buys, what it costs and the alternatives. It is in the site\n  navigation, including the API reference's.\n- The landing page leads with the claim, the chart, a code sample and\n  buttons to try it, start a project or read why, and carries Open\n  Graph tags with a social preview image (docs/assets).\n- CONTRIBUTING.md says where to start: Discussions, labelled issues,\n  and posting benchmark results, which needs no code.",
          "timestamp": "2026-11-14T13:59:23+01:00",
          "tree_id": "8e8fa9d9dc449cc2be621f97f0d5729027480110",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/b33f1a0bccdc30281f40289679755165470bb4ea"
        },
        "date": 1794661345471,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 34.9746,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 19.3848,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 53.0098,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.8682,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 2.9463,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 1.7971,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 17.9551,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 7.5898,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.7871,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 822.2383,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 803.1465,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 907.8535,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 939.5254,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 829.5527,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 927.8457,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 161.4294,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 148.1802,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 170.2888,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 1106.9844,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 1071.6953,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 847.2148,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1034.1191,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 722.125,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 657.1055,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 31.3555,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 27.4434,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 37.5762,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 123.7661,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 108.9363,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 100.6182,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 98.293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 90.4102,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 179.0215,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1321,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2666,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2761,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.252,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1174,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1174,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1174,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 49.6855,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 24.9219,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 28.2656,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 22.2207,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 49.0391,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 24.5293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 98.7051,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 30.3184,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 119.6523,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 40.2949,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.2422,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.5254,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.3203,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 4.8613,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.4111,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.4043,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.9424,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 18.4951,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 17.79,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 177.0439,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 176.125,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 171.1562,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.6582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 4.9785,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 3.7852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 18.8564,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 19.209,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 19.0332,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 173.709,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 164.5449,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 171.2051,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 346.7148,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 345.4336,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 266.7695,
            "unit": "ns (p99.5)"
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
          "id": "cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af",
          "message": "Allow for the runner's CPU in the in-cache list walk limit\n\nThe benchmark gate failed on a documentation-only commit: the in-cache\nlist walk measured +82% and +87% against raw links, where the same code\nhad passed at +30% or less a few hours earlier. GitHub's hosted runners\ndiffer in CPU model, and a pointer chase that fits in cache shows the\ndecompression add more on some than on others. The limit is now +120%,\nwhich still catches a gross regression such as a check on every hop.",
          "timestamp": "2026-11-14T14:11:47+01:00",
          "tree_id": "a2954c23b211fe7b4ad3dd92c5b99c7eba5fa26b",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/cf7ba2b7ddde3814ea13c1eef5d01a8fd4d4f7af"
        },
        "date": 1794662072476,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 28.6367,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 31.8633,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 64.8633,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.8142,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 3.5381,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 2.9683,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 14.7305,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 17.7012,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 25.8008,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 525.0664,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 476.6543,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 602.1562,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 389.0234,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 341.2148,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 416.4277,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 100.4954,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 77.8748,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 106.3757,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 718.3066,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 575.0645,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 651.3516,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1010.9551,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 730.3965,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 732.7637,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 27.209,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 26.4863,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 30.2988,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 31.7471,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 26.9668,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 28.2139,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 58.5664,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 52.5996,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 117.2852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1809,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4255,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2517,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.5208,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1467,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 48.5508,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 33.7422,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 34.877,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 28.832,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 35.9707,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 23.4922,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 48.6426,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 35.6758,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 94.5273,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 45.2793,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.4873,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8779,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.6133,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 8.3906,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 7.9326,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 7.4619,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 31.3955,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 26.7393,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 25.3896,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 161.2295,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 145.9814,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 145.208,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 6.3672,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 8.2549,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 6.582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 23.5898,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 23.1016,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 23.6494,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 132.1807,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 125.5801,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 121.8828,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 174.9199,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 173.335,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 169.834,
            "unit": "ns (p99.5)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "532411d755a31182ca9407ed5e1f54775dd176ab",
          "message": "Bump actions/upload-artifact from 4 to 7 (#2)\n\nBumps [actions/upload-artifact](https://github.com/actions/upload-artifact) from 4 to 7.\n- [Release notes](https://github.com/actions/upload-artifact/releases)\n- [Commits](https://github.com/actions/upload-artifact/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/upload-artifact\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:40:42+01:00",
          "tree_id": "9e46b5200966e3c99ec09ff218aaefa4c6ec62f1",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/532411d755a31182ca9407ed5e1f54775dd176ab"
        },
        "date": 1794663810575,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 37.0859,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 21.7715,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 60.6973,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 3.5796,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 3.8413,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 2.4255,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 10.7207,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 36.2656,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 20.3418,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 1079.6152,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 1019.2305,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 1108.4277,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 800.3281,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 833.502,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 796.6309,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 152.5051,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 143.9175,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 152.4207,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 1065.5293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 1121.1582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 895.8789,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1132.8945,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 763.0234,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 735.8926,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 39.1797,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 34.5625,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 45.1074,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 123.7578,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 116.6084,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 99.5173,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 103.0449,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 90.293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 213.543,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.2566,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.5159,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.2886,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4768,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1467,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1736,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 97.0586,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 35.8926,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 47.6309,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 25.8203,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 61.498,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 28.9688,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 88.043,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 36.4414,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 123.3496,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 42.6426,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5352,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8975,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.6133,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 8.9482,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 9.6924,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 7.6582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 65.6162,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 37.3223,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 38.8271,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 169.7773,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 164.6318,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 163.8691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 6.25,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 6.7871,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 6.9541,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 25.1846,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 25.4775,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 24.7051,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 144.4365,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 142.5977,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 142.4697,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 184.1631,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 183.5859,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 181.4453,
            "unit": "ns (p99.5)"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "email": "49699333+dependabot[bot]@users.noreply.github.com",
            "name": "dependabot[bot]",
            "username": "dependabot[bot]"
          },
          "committer": {
            "email": "noreply@github.com",
            "name": "GitHub",
            "username": "web-flow"
          },
          "distinct": true,
          "id": "2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d",
          "message": "Bump actions/checkout from 4 to 7 (#1)\n\nBumps [actions/checkout](https://github.com/actions/checkout) from 4 to 7.\n- [Release notes](https://github.com/actions/checkout/releases)\n- [Changelog](https://github.com/actions/checkout/blob/main/CHANGELOG.md)\n- [Commits](https://github.com/actions/checkout/compare/v4...v7)\n\n---\nupdated-dependencies:\n- dependency-name: actions/checkout\n  dependency-version: '7'\n  dependency-type: direct:production\n  update-type: version-update:semver-major\n...\n\nSigned-off-by: dependabot[bot] <support@github.com>\nCo-authored-by: dependabot[bot] <49699333+dependabot[bot]@users.noreply.github.com>",
          "timestamp": "2026-11-14T14:41:21+01:00",
          "tree_id": "76acf4123d417a05a0ffb7e833530d2d8ac81201",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/2d40ab26d96e4a8b91e5b0a2462cfda2d210eb1d"
        },
        "date": 1794663965926,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 32.5879,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 31.2188,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 43.5605,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 2.6138,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 4.8828,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 2.5625,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 9.7227,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 10.543,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 6.1035,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 280.1895,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 248.832,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 341.2969,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 310.0781,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 230.9941,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 348.4941,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 85.9089,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 55.5627,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 96.8901,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 364.9277,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 407.6289,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 288.4629,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 865.4902,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 642.5957,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 561.9277,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 9.3691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 8.2148,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 9.1543,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 18.0815,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 17.2429,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 12.9102,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 32.4316,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 27.6387,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 79.125,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1589,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.2883,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.1958,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.2544,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1516,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 37.0879,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 25.2734,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 23.9629,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 22.2207,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 32.5098,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 195.334,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 40.0801,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 30.4961,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 58.7031,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 33.0566,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.2422,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.5361,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.3008,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 5.6133,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 4.1084,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 3.6582,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 19.8643,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 19.835,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 19.3945,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 298.1943,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 246.1631,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 238.6914,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 3.6875,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 3.6094,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 8.46,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 18.7588,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 19.1113,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 18.9453,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 146.6182,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 138.6475,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 141.0928,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 363.5508,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 343.2432,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 343.5156,
            "unit": "ns (p99.5)"
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
          "id": "f4d179effb8e53e13d1329d1d0a6cca3e85647fe",
          "message": "Test every supported compiler version in CI\n\nCI tested one GCC (14) and one Clang (18) on Linux, so the README's GCC and Clang claims had no lower bound and newer releases were not covered. New jobs build and test the suite in Debug, with warnings as errors:\n\n- GCC 12 and 13, and Clang 16 and 17, from the runner image;\n- Clang 19, 20, 21 and 22 from apt.llvm.org, and Clang 22 with libc++;\n- GCC 15 and 16 in the official gcc container images;\n- clang-cl on Windows.\n\nGCC 11 compiles the library and the examples but crashes with an internal compiler error on a lambda inside a requires-expression in the tests, so the documented minimum is GCC 12. Locally, GCC 13 and 16 pass the suite in Debug with -Werror, and Clang 16 (Ubuntu 24.04, libstdc++ 14) compiles every test and example.",
          "timestamp": "2026-11-14T18:34:15+01:00",
          "tree_id": "792185aee6e19ee43db77d91bc89c8bba728f314",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/f4d179effb8e53e13d1329d1d0a6cca3e85647fe"
        },
        "date": 1794677896214,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 37.9277,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 18.6797,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 66.918,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 1.8557,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 3.5503,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 3.2544,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 14.9629,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 26.5039,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 30.4766,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 387.0879,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 330.5742,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 468.0098,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 423.5078,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 372.123,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 464.1172,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 95.9353,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 71.5874,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 100.2241,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 518.6523,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 399.9727,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 451.5371,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1037.7148,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 711.627,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 698.9688,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 26.7988,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 22.9473,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 29.9863,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 33.7336,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 27.0264,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 26.6123,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 67.3867,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 48.7852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 134.2852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1345,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.4402,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.22,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.5234,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1516,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1467,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1443,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 51.6211,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 35.6602,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 34.1738,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 23.7852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 36.6172,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 23.9824,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 48.041,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 37.4785,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 94.3223,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 39.8047,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.5254,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 1.8779,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.6143,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 7.0518,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 6.7773,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 7.1787,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 26.8184,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 25.0967,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 25.0576,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 152.7197,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 140.2891,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 138.0889,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 6.5723,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 6.5918,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 8.1377,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 22.4951,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 23.4834,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 23.0332,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 134.6758,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 132.7607,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 132.4482,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 172.5156,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 172.6523,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 170.1875,
            "unit": "ns (p99.5)"
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
          "id": "9241119d0d346704b5fee32c74b0009a7f6524b9",
          "message": "Re-measure the benchmarks after the review's changes\n\ndocs/benchmarks.md is regenerated on the reference machine (i7-12700H, GCC 15.2, same recipe), and the README, why.md, the hero chart and the social preview carry the new expect_gains figures (median of three runs): list walk -28%, map find -35%, unordered_map find -49% against std, at half the memory as before.\n\nNotable changes against the previous page: unordered_map erase by key went from +89% against raw links to +1%, since erase walks its bucket once; the list walk tail (p99.5) went from +29% to -9%; unordered_map find against raw links is +14% (was +17%). The summary now lists unordered_map find, L1/L2 pointer chases and the list shrink tail as the cases where compression is slower.",
          "timestamp": "2026-11-14T18:39:47+01:00",
          "tree_id": "f4ab3e0f6d764533ed50a736a0366d8ce6d45eab",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/9241119d0d346704b5fee32c74b0009a7f6524b9"
        },
        "date": 1794678171383,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 48.2734,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 62.7734,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 87.0176,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 4.2732,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 4.4812,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 4.2927,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 10.3906,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 39.1152,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 36.1426,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 728.1953,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 580.8691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 726.9062,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 564.998,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 493.0313,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 602.6504,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 115.2029,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 100.0623,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 116.8389,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 834.3105,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 623.9375,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 757.7422,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1271.6895,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 871.7227,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 1026.4473,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 42.8145,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 37.0996,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 47.2363,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 36.6577,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 28.9187,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 28.5469,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 66.5508,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 57.5469,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 183.4473,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.137,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3889,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.3376,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.3816,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1809,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1809,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1787,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 68.623,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 48.5859,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 48.4492,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 35.0059,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 61.9316,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 39.0176,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 74.3379,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 55.6504,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 111.75,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 56.9805,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.6436,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.2207,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.8193,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 16.085,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 13.3848,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 14.001,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 29.5273,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 29.2051,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 29.0781,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 134.3223,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 117.5137,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 115.6748,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 5.4688,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 12.709,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 5.4697,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 26.6025,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 27.1895,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 26.5732,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 103.4258,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 95.6963,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 91.2246,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 150.8379,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 150.3584,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 149.5459,
            "unit": "ns (p99.5)"
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
          "id": "03f875ce11a5da4e02f7fb52d3783a9d97cc4647",
          "message": "Add a logo: an asterisk squeezed in a vice\n\ndocs/assets/logo.svg follows the reader's light or dark theme. Every page\non the site uses it as the favicon and next to the name in the navigation\nbar, including the API reference; the landing page and the README show it\nabove the title. The social preview is redrawn around it, with the name\nand one line of text.",
          "timestamp": "2026-11-15T09:19:34+01:00",
          "tree_id": "ac449b775c10b620061952bb8d75f2ca6d96640e",
          "url": "https://github.com/mvanslobbe/compressed-ptr/commit/03f875ce11a5da4e02f7fb52d3783a9d97cc4647"
        },
        "date": 1794730973149,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "list of uint32_t: grow: cptr::list raw links",
            "value": 19.2031,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: cptr::list compressed",
            "value": 43.1426,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: grow: std::list",
            "value": 39.3848,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list raw links",
            "value": 6.7517,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: cptr::list compressed",
            "value": 9.2803,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: walk: std::list",
            "value": 6.8896,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list raw links",
            "value": 50.9023,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: cptr::list compressed",
            "value": 12.002,
            "unit": "ns (p99.5)"
          },
          {
            "name": "list of uint32_t: shrink: std::list",
            "value": 50.2852,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map raw links",
            "value": 583.8984,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: cptr::ordered_map compressed",
            "value": 660.4004,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: grow: std::map",
            "value": 740.3828,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map raw links",
            "value": 694.5234,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: cptr::ordered_map compressed",
            "value": 583.1387,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: find: std::map",
            "value": 701.2422,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map raw links",
            "value": 106.4592,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: cptr::ordered_map compressed",
            "value": 85.5933,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: walk: std::map",
            "value": 129.1267,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map raw links",
            "value": 796.3691,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: cptr::ordered_map compressed",
            "value": 694.3594,
            "unit": "ns (p99.5)"
          },
          {
            "name": "map uint32_t -> uint32_t: shrink: std::map",
            "value": 719.0508,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map raw links",
            "value": 1170.7871,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: cptr::unordered_map compressed",
            "value": 741.3555,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: grow: std::unordered_map",
            "value": 1075.3516,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map raw links",
            "value": 37.8027,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: cptr::unordered_map compressed",
            "value": 36.5527,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: find: std::unordered_map",
            "value": 54.2656,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map raw links",
            "value": 47.1099,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: cptr::unordered_map compressed",
            "value": 44.8928,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: walk: std::unordered_map",
            "value": 45.884,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map raw links",
            "value": 94.793,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: cptr::unordered_map compressed",
            "value": 89.4922,
            "unit": "ns (p99.5)"
          },
          {
            "name": "hash map uint32_t -> uint32_t: shrink: std::unordered_map",
            "value": 201.7305,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, raw T*",
            "value": 0.1025,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 65536 elements, ptr",
            "value": 0.3699,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, raw T*",
            "value": 0.5867,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer arithmetic: ++p over an array of uint32_t: 4194304 elements, ptr",
            "value": 0.4238,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: copy to ptr<int>",
            "value": 0.1145,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<const int>",
            "value": 0.1243,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Conversion of 4: to ptr<void>",
            "value": 0.1079,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: malloc / free",
            "value": 67.7754,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator: free a random block of 65: cage allocate / deallocate",
            "value": 58.0586,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, malloc / free",
            "value": 45.5684,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 1 threads, cage",
            "value": 28.9355,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, malloc / free",
            "value": 45.9512,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 2 threads, cage",
            "value": 29.0547,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, malloc / free",
            "value": 71.9805,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 4 threads, cage",
            "value": 36.5742,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, malloc / free",
            "value": 117.3906,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Allocator churn on several threads: 8 threads, cage",
            "value": 38.5664,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 1.96,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 2.4941,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 1.9063,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 10.9492,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 8.5879,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 7.9756,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 52.3018,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 46.543,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 45.3877,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 171.168,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 165.2598,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 163.8018,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, raw T*",
            "value": 8.6758,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, ptr",
            "value": 11.5293,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 1024 nodes, nonnull_ptr",
            "value": 8.5391,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, raw T*",
            "value": 49.8555,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, ptr",
            "value": 46.1621,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 16384 nodes, nonnull_ptr",
            "value": 45.9746,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, raw T*",
            "value": 168.0508,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, ptr",
            "value": 168.8965,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 262144 nodes, nonnull_ptr",
            "value": 169.3896,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, raw T*",
            "value": 201.252,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, ptr",
            "value": 200.2607,
            "unit": "ns (p99.5)"
          },
          {
            "name": "Pointer chasing: 4194304 nodes, nonnull_ptr",
            "value": 199.7529,
            "unit": "ns (p99.5)"
          }
        ]
      }
    ]
  }
}