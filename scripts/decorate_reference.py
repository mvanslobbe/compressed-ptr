#!/usr/bin/env python3
"""Fit the MrDocs output into the GitHub Pages site.

Usage: scripts/decorate_reference.py build-docs/site

Adds the site's navigation bar to the top of every reference page, and
replaces index.html (MrDocs' "Global namespace" page) with a redirect to
cptr.html, whose description is the reference's start page.
"""
import os
import sys

NAV = """<nav style="font: 15px/1.6 system-ui, -apple-system, 'Segoe UI', sans-serif;
  padding: 10px 16px; border-bottom: 1px solid #d1d9e0; background: #fff;">
  <a href="{root}index.html" style="margin-right: 16px; text-decoration: none;
    color: #0969da;"><strong>compressed-ptr</strong></a>
  <a href="{root}why.html" style="margin-right: 16px; color: #0969da;
    text-decoration: none;">Why</a>
  <a href="{root}guide.html" style="margin-right: 16px; color: #0969da;
    text-decoration: none;">Guide</a>
  <a href="{root}benchmarks.html" style="margin-right: 16px; color: #0969da;
    text-decoration: none;">Benchmarks</a>
  <a href="{root}history.html" style="margin-right: 16px; color: #0969da;
    text-decoration: none;">History</a>
  <a href="{root}reference/cptr.html" style="margin-right: 16px;
    color: #0969da; text-decoration: none;">API reference</a>
  <a href="https://github.com/mvanslobbe/compressed-ptr" style="color: #0969da;
    text-decoration: none;">GitHub</a>
</nav>
"""

REDIRECT = """<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=cptr.html">
<title>compressed-ptr API reference</title></head>
<body><p><a href="cptr.html">compressed-ptr API reference</a></p></body></html>
"""


def main():
    site = sys.argv[1]
    count = 0
    for dirpath, _, files in os.walk(site):
        for name in files:
            if not name.endswith(".html"):
                continue
            path = os.path.join(dirpath, name)
            depth = os.path.relpath(path, site).count(os.sep)
            # The reference is published under reference/, one level below
            # the site root.
            root = "../" * (depth + 1)
            text = open(path, encoding="utf-8").read()
            if "<body>" in text and "compressed-ptr</strong></a>" not in text:
                text = text.replace("<body>", "<body>\n" + NAV.format(root=root), 1)
                open(path, "w", encoding="utf-8").write(text)
                count += 1
    open(os.path.join(site, "index.html"), "w", encoding="utf-8").write(REDIRECT)
    print(f"added the navigation bar to {count} pages")


if __name__ == "__main__":
    main()
