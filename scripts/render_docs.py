#!/usr/bin/env python3
"""Render docs/*.md to standalone HTML pages for GitHub Pages.

Usage: scripts/render_docs.py OUTPUT_DIR

Renders docs/guide.md and docs/benchmarks.md with python-markdown
(pip install markdown) into OUTPUT_DIR/guide.html and
OUTPUT_DIR/benchmarks.html. Links between the pages become .html links;
links into the repository point at GitHub.
"""
import html
import os
import re
import sys

import markdown

HERE = os.path.dirname(os.path.abspath(__file__))
DOCS = os.path.join(HERE, "..", "docs")
REPO = "https://github.com/mvanslobbe/compressed-ptr/blob/main/"
PAGES = {"guide.md": "Guide", "benchmarks.md": "Benchmarks"}

TEMPLATE = """<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>compressed-ptr: {title}</title>
<style>
  :root {{ --bg: #fff; --fg: #1f2328; --muted: #59636e; --link: #0969da;
          --code: #f6f8fa; --line: #d1d9e0; }}
  @media (prefers-color-scheme: dark) {{
    :root {{ --bg: #0d1117; --fg: #e6edf3; --muted: #9198a1; --link: #4493f8;
            --code: #151b23; --line: #3d444d; }}
  }}
  body {{ margin: 0; background: var(--bg); color: var(--fg);
         font: 16px/1.6 system-ui, -apple-system, "Segoe UI", sans-serif; }}
  nav {{ border-bottom: 1px solid var(--line); padding: 12px 16px; }}
  nav a {{ margin-right: 16px; }}
  main {{ max-width: 920px; margin: 0 auto; padding: 24px 16px 64px; }}
  a {{ color: var(--link); text-decoration: none; }}
  a:hover {{ text-decoration: underline; }}
  h1, h2, h3 {{ line-height: 1.25; }}
  h2 {{ border-bottom: 1px solid var(--line); padding-bottom: 4px; margin-top: 2em; }}
  code {{ background: var(--code); padding: 1px 4px; border-radius: 4px;
         font-size: 0.9em; }}
  pre {{ background: var(--code); padding: 12px; border-radius: 6px;
        overflow-x: auto; }}
  pre code {{ background: none; padding: 0; }}
  table {{ border-collapse: collapse; display: block; overflow-x: auto;
          margin: 1em 0; font-variant-numeric: tabular-nums; }}
  th, td {{ border: 1px solid var(--line); padding: 4px 10px; }}
  th {{ background: var(--code); }}
</style>
</head>
<body>
<nav>
  <a href="index.html"><strong>compressed-ptr</strong></a>
  <a href="guide.html">Guide</a>
  <a href="benchmarks.html">Benchmarks</a>
  <a href="reference/index.html">API reference</a>
  <a href="coverage/index.html">Coverage</a>
  <a href="bench/index.html">History</a>
  <a href="https://github.com/mvanslobbe/compressed-ptr">GitHub</a>
</nav>
<main>
{body}
</main>
</body>
</html>
"""


def fix_links(text):
    text = re.sub(r"\]\((guide|benchmarks)\.md(#[^)]*)?\)",
                  lambda m: f"]({m.group(1)}.html{m.group(2) or ''})", text)
    text = re.sub(r"\]\(\.\./([^)]+)\)", lambda m: f"]({REPO}{m.group(1)})",
                  text)
    return text


def main():
    out = sys.argv[1]
    os.makedirs(out, exist_ok=True)
    for name, title in PAGES.items():
        src = open(os.path.join(DOCS, name), encoding="utf-8").read()
        body = markdown.markdown(
            fix_links(src),
            extensions=["tables", "fenced_code", "toc", "sane_lists"])
        page = TEMPLATE.format(title=html.escape(title), body=body)
        dest = os.path.join(out, name.replace(".md", ".html"))
        open(dest, "w", encoding="utf-8").write(page)
        print(dest)


if __name__ == "__main__":
    main()
