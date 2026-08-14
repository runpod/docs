#!/usr/bin/env python3
"""Validate the static RFC 9727 API catalog and its Mintlify route."""

from __future__ import annotations

import json
from pathlib import Path
from urllib.parse import urlparse


ROOT = Path(__file__).resolve().parents[1]
CATALOG_PATH = ROOT / "api-catalog.json"
CONFIG_PATH = ROOT / "docs.json"
SOURCE_PATH = "/.well-known/api-catalog"
DESTINATION_PATH = "/api-catalog.json"


def require_https(value: str, label: str) -> None:
    parsed = urlparse(value)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError(f"{label} must be an absolute HTTPS URL: {value!r}")


def main() -> None:
    catalog = json.loads(CATALOG_PATH.read_text())
    linkset = catalog.get("linkset")
    if not isinstance(linkset, list) or not linkset:
        raise ValueError("api-catalog.json must contain a non-empty linkset array")

    for index, entry in enumerate(linkset):
        if not isinstance(entry, dict):
            raise ValueError(f"linkset[{index}] must be an object")
        require_https(entry.get("anchor", ""), f"linkset[{index}].anchor")
        relations = [key for key in entry if key != "anchor"]
        if not relations:
            raise ValueError(f"linkset[{index}] must expose at least one relation")
        for relation in relations:
            links = entry[relation]
            if not isinstance(links, list) or not links:
                raise ValueError(f"linkset[{index}].{relation} must be non-empty")
            for link_index, link in enumerate(links):
                if not isinstance(link, dict):
                    raise ValueError(
                        f"linkset[{index}].{relation}[{link_index}] must be an object"
                    )
                require_https(
                    link.get("href", ""),
                    f"linkset[{index}].{relation}[{link_index}].href",
                )

    config = json.loads(CONFIG_PATH.read_text())
    redirects = config.get("redirects", [])
    matches = [item for item in redirects if item.get("source") == SOURCE_PATH]
    if matches != [{"source": SOURCE_PATH, "destination": DESTINATION_PATH}]:
        raise ValueError(
            f"docs.json must permanently redirect {SOURCE_PATH} to {DESTINATION_PATH}"
        )

    print(f"Validated {len(linkset)} API catalog entries and the Mintlify redirect.")


if __name__ == "__main__":
    main()
