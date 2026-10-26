#!/usr/bin/env python3
"""
Cleanup script for documentation agent tests.

Deletes all Runpod resources matching the test prefix (doc_test_*).
Can be run manually or scheduled in CI to catch orphaned resources.

Usage:
    python cleanup.py              # Dry run (list only)
    python cleanup.py --delete     # Actually delete resources
    python cleanup.py --prefix my_ # Use custom prefix

Requires:
    RUNPOD_API_KEY environment variable
"""

import argparse
import os
import sys
from typing import Any

try:
    import requests
except ImportError:
    print("Error: requests library required. Install with: pip install requests")
    sys.exit(1)


API_BASE = "https://api.runpod.io/v2"
DEFAULT_PREFIX = "doc_test_"


def get_headers() -> dict:
    """Get authorization headers."""
    api_key = os.environ.get("RUNPOD_API_KEY")
    if not api_key:
        print("Error: RUNPOD_API_KEY environment variable not set")
        sys.exit(1)
    return {
        "Authorization": f"Bearer {api_key}",
        "User-Agent": "runpod-docs-cleanup/1.0",
    }


def list_resources(path: str, key: str, prefix: str) -> list[dict[str, Any]]:
    """List every resource at path whose name matches prefix, following pagination."""
    items: list[dict[str, Any]] = []
    params: dict[str, Any] = {"limit": 1000}
    while True:
        resp = requests.get(f"{API_BASE}/{path}", headers=get_headers(), params=params)
        resp.raise_for_status()
        body = resp.json()
        items.extend(body.get(key, []))
        pagination = body.get("pagination") or {}
        if not pagination.get("hasNextPage") or not pagination.get("nextCursor"):
            break
        params["cursor"] = pagination["nextCursor"]
    return [i for i in items if (i.get("name") or "").startswith(prefix)]


def list_pods(prefix: str) -> list[dict[str, Any]]:
    """List pods matching prefix."""
    return list_resources("pods", "pods", prefix)


def list_endpoints(prefix: str) -> list[dict[str, Any]]:
    """List serverless endpoints matching prefix."""
    return list_resources("serverless", "endpoints", prefix)


def list_templates(prefix: str) -> list[dict[str, Any]]:
    """List templates matching prefix."""
    return list_resources("templates", "templates", prefix)


def list_network_volumes(prefix: str) -> list[dict[str, Any]]:
    """List network volumes matching prefix."""
    return list_resources("network-volumes", "networkVolumes", prefix)


def delete_resource(path: str, resource_id: str) -> bool:
    """Delete a resource by ID. REST v2 returns 204 No Content on success."""
    resp = requests.delete(f"{API_BASE}/{path}/{resource_id}", headers=get_headers())
    return resp.status_code in (200, 204)


def delete_pod(pod_id: str) -> bool:
    """Delete a pod by ID."""
    return delete_resource("pods", pod_id)


def delete_endpoint(endpoint_id: str) -> bool:
    """Delete an endpoint by ID."""
    return delete_resource("serverless", endpoint_id)


def delete_template(template_id: str) -> bool:
    """Delete a template by ID."""
    return delete_resource("templates", template_id)


def delete_network_volume(volume_id: str) -> bool:
    """Delete a network volume by ID."""
    return delete_resource("network-volumes", volume_id)


def main():
    parser = argparse.ArgumentParser(
        description="Clean up test resources matching prefix"
    )
    parser.add_argument(
        "--delete", action="store_true", help="Actually delete (default: dry run)"
    )
    parser.add_argument(
        "--prefix", default=DEFAULT_PREFIX, help=f"Resource prefix (default: {DEFAULT_PREFIX})"
    )
    args = parser.parse_args()

    prefix = args.prefix
    dry_run = not args.delete

    if dry_run:
        print(f"DRY RUN - Looking for resources matching '{prefix}*'\n")
    else:
        print(f"DELETING resources matching '{prefix}*'\n")

    # Track totals
    found = {"pods": 0, "endpoints": 0, "templates": 0, "volumes": 0}
    deleted = {"pods": 0, "endpoints": 0, "templates": 0, "volumes": 0}

    # Pods
    print("Pods:")
    pods = list_pods(prefix)
    found["pods"] = len(pods)
    if not pods:
        print("  (none found)")
    for pod in pods:
        pod_id = pod.get("id")
        name = pod.get("name")
        if dry_run:
            print(f"  Would delete: {name} ({pod_id})")
        else:
            if delete_pod(pod_id):
                print(f"  Deleted: {name} ({pod_id})")
                deleted["pods"] += 1
            else:
                print(f"  Failed to delete: {name} ({pod_id})")

    # Endpoints
    print("\nEndpoints:")
    endpoints = list_endpoints(prefix)
    found["endpoints"] = len(endpoints)
    if not endpoints:
        print("  (none found)")
    for endpoint in endpoints:
        endpoint_id = endpoint.get("id")
        name = endpoint.get("name")
        if dry_run:
            print(f"  Would delete: {name} ({endpoint_id})")
        else:
            if delete_endpoint(endpoint_id):
                print(f"  Deleted: {name} ({endpoint_id})")
                deleted["endpoints"] += 1
            else:
                print(f"  Failed to delete: {name} ({endpoint_id})")

    # Templates
    print("\nTemplates:")
    templates = list_templates(prefix)
    found["templates"] = len(templates)
    if not templates:
        print("  (none found)")
    for template in templates:
        template_id = template.get("id")
        name = template.get("name")
        if dry_run:
            print(f"  Would delete: {name} ({template_id})")
        else:
            if delete_template(template_id):
                print(f"  Deleted: {name} ({template_id})")
                deleted["templates"] += 1
            else:
                print(f"  Failed to delete: {name} ({template_id})")

    # Network Volumes
    print("\nNetwork Volumes:")
    volumes = list_network_volumes(prefix)
    found["volumes"] = len(volumes)
    if not volumes:
        print("  (none found)")
    for volume in volumes:
        volume_id = volume.get("id")
        name = volume.get("name")
        if dry_run:
            print(f"  Would delete: {name} ({volume_id})")
        else:
            if delete_network_volume(volume_id):
                print(f"  Deleted: {name} ({volume_id})")
                deleted["volumes"] += 1
            else:
                print(f"  Failed to delete: {name} ({volume_id})")

    # Summary
    print("\n" + "=" * 40)
    total_found = sum(found.values())
    total_deleted = sum(deleted.values())

    if dry_run:
        print(f"Found {total_found} resources matching '{prefix}*'")
        if total_found > 0:
            print("Run with --delete to remove them")
    else:
        print(f"Deleted {total_deleted}/{total_found} resources")


if __name__ == "__main__":
    main()
