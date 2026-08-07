#!/usr/bin/env python3
"""Validate breadcrumb JSON-LD in raw served HTML."""

from __future__ import annotations

import argparse
import json
import sys
from html.parser import HTMLParser
from urllib.parse import urljoin
from urllib.request import Request, urlopen


class JsonLdParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._capture = False
        self._parts: list[str] = []
        self.scripts: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag != "script":
            return
        attributes = dict(attrs)
        if attributes.get("type") == "application/ld+json":
            self._capture = True
            self._parts = []

    def handle_data(self, data: str) -> None:
        if self._capture:
            self._parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        if tag == "script" and self._capture:
            self.scripts.append("".join(self._parts))
            self._capture = False
            self._parts = []


def walk_json(value: object):
    if isinstance(value, dict):
        yield value
        for child in value.values():
            yield from walk_json(child)
    elif isinstance(value, list):
        for child in value:
            yield from walk_json(child)


def validate_url(url: str) -> list[str]:
    request = Request(url, headers={"User-Agent": "Runpod breadcrumb validator/1.0"})
    with urlopen(request, timeout=30) as response:
        html = response.read().decode(response.headers.get_content_charset() or "utf-8")

    parser = JsonLdParser()
    parser.feed(html)
    errors: list[str] = []
    breadcrumb_count = 0

    for raw_script in parser.scripts:
        try:
            data = json.loads(raw_script)
        except json.JSONDecodeError:
            continue
        for node in walk_json(data):
            if node.get("@type") != "BreadcrumbList":
                continue
            breadcrumb_count += 1
            items = node.get("itemListElement")
            if not isinstance(items, list) or not items:
                errors.append("BreadcrumbList has no itemListElement entries")
                continue
            for index, item in enumerate(items[:-1], start=1):
                if not isinstance(item, dict) or not item.get("item"):
                    errors.append(f'position {index} is missing required field "item"')

    if breadcrumb_count == 0:
        errors.append("no BreadcrumbList JSON-LD found in raw HTML")
    return errors


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--base-url", required=True)
    parser.add_argument("paths", nargs="+")
    args = parser.parse_args()

    failed = False
    for path in args.paths:
        url = urljoin(args.base_url.rstrip("/") + "/", path.lstrip("/"))
        errors = validate_url(url)
        if errors:
            failed = True
            for error in errors:
                print(f"FAIL {url}: {error}")
        else:
            print(f"PASS {url}")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
