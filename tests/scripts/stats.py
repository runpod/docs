#!/usr/bin/env python3
"""
Test statistics analyzer.

Analyzes historical test reports to show pass rates and trends.

Usage:
    python stats.py              # Show overall stats
    python stats.py --by-test    # Group by test ID
    python stats.py --recent 10  # Show last 10 reports
    python stats.py --failures   # Show only failures
"""

import argparse
import re
from collections import defaultdict
from datetime import datetime
from pathlib import Path


def parse_report(path: Path) -> dict | None:
    """Parse a report file and extract metadata."""
    try:
        content = path.read_text()

        # Extract metadata from table
        test_id_match = re.search(r"\*\*Test ID\*\*\s*\|\s*(\S+)", content)
        date_match = re.search(r"\*\*Date\*\*\s*\|\s*(.+)", content)
        status_match = re.search(r"\*\*Status\*\*\s*\|\s*(\S+)", content)
        doc_source_match = re.search(r"\*\*Doc Source\*\*\s*\|\s*(\S+)", content)
        git_sha_match = re.search(r"\*\*Git SHA\*\*\s*\|\s*(\S+)", content)

        if not all([test_id_match, status_match]):
            return None

        return {
            "file": path.name,
            "test_id": test_id_match.group(1),
            "date": date_match.group(1).strip() if date_match else "Unknown",
            "status": status_match.group(1),
            "doc_source": doc_source_match.group(1) if doc_source_match else "Unknown",
            "git_sha": git_sha_match.group(1) if git_sha_match else "Unknown",
        }
    except Exception as e:
        print(f"Warning: Could not parse {path}: {e}")
        return None


def load_reports() -> list[dict]:
    """Load all reports from the archive directory."""
    archive_dir = Path.home() / "Dev" / "doc-tests"

    if not archive_dir.exists():
        print(f"Archive directory not found: {archive_dir}")
        return []

    reports = []
    for path in sorted(archive_dir.glob("*.md")):
        report = parse_report(path)
        if report:
            reports.append(report)

    return reports


def show_summary(reports: list[dict]):
    """Show overall summary statistics."""
    if not reports:
        print("No reports found.")
        return

    total = len(reports)
    passed = sum(1 for r in reports if r["status"] == "PASS")
    failed = sum(1 for r in reports if r["status"] == "FAIL")
    partial = sum(1 for r in reports if r["status"] == "PARTIAL")

    pass_rate = (passed / total) * 100 if total > 0 else 0

    print("=" * 50)
    print("TEST SUMMARY")
    print("=" * 50)
    print(f"Total runs:   {total}")
    print(f"Passed:       {passed} ({pass_rate:.1f}%)")
    print(f"Failed:       {failed}")
    print(f"Partial:      {partial}")
    print("=" * 50)


def show_by_test(reports: list[dict]):
    """Show statistics grouped by test ID."""
    if not reports:
        print("No reports found.")
        return

    by_test = defaultdict(list)
    for r in reports:
        by_test[r["test_id"]].append(r)

    print("=" * 60)
    print(f"{'TEST ID':<35} {'RUNS':<6} {'PASS':<6} {'RATE':<8}")
    print("=" * 60)

    for test_id in sorted(by_test.keys()):
        runs = by_test[test_id]
        total = len(runs)
        passed = sum(1 for r in runs if r["status"] == "PASS")
        rate = (passed / total) * 100 if total > 0 else 0
        print(f"{test_id:<35} {total:<6} {passed:<6} {rate:.0f}%")

    print("=" * 60)


def show_recent(reports: list[dict], count: int):
    """Show most recent reports."""
    if not reports:
        print("No reports found.")
        return

    recent = reports[-count:]

    print("=" * 80)
    print(f"{'DATE':<20} {'TEST ID':<30} {'STATUS':<10} {'SOURCE':<10}")
    print("=" * 80)

    for r in reversed(recent):
        print(f"{r['date']:<20} {r['test_id']:<30} {r['status']:<10} {r['doc_source']:<10}")

    print("=" * 80)


def show_failures(reports: list[dict]):
    """Show only failed tests."""
    failures = [r for r in reports if r["status"] in ("FAIL", "PARTIAL")]

    if not failures:
        print("No failures found!")
        return

    print("=" * 80)
    print("FAILURES AND PARTIAL PASSES")
    print("=" * 80)

    for r in failures:
        print(f"\n{r['test_id']} - {r['status']}")
        print(f"  Date: {r['date']}")
        print(f"  File: {r['file']}")
        print(f"  Git SHA: {r['git_sha']}")


def main():
    parser = argparse.ArgumentParser(description="Analyze test report statistics")
    parser.add_argument("--by-test", action="store_true", help="Group by test ID")
    parser.add_argument("--recent", type=int, metavar="N", help="Show last N reports")
    parser.add_argument("--failures", action="store_true", help="Show only failures")
    args = parser.parse_args()

    reports = load_reports()

    if args.by_test:
        show_by_test(reports)
    elif args.recent:
        show_recent(reports, args.recent)
    elif args.failures:
        show_failures(reports)
    else:
        show_summary(reports)


if __name__ == "__main__":
    main()
