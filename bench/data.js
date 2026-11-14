window.BENCHMARK_DATA = {
  "lastUpdate": 1794661345743,
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
      }
    ]
  }
}