#!/usr/bin/env python3
"""
Report generator for documentation tests.

Generates a report template with metadata pre-filled (timestamp, git info).
The agent fills in the remaining sections.

Usage:
    python report.py <test-id> <status> [--local]

Arguments:
    test-id: The test ID (e.g., pods-quickstart-terminal)
    status: PASS, FAIL, or PARTIAL
    --local: Mark as using local docs (default: published)

Example:
    python report.py pods-quickstart-terminal PASS --local
"""

import argparse
import os
import subprocess
import sys
from datetime import datetime
from pathlib import Path


def get_git_info() -> tuple[str, str]:
    """Get current git SHA and branch."""
    try:
        sha = subprocess.check_output(
            ["git", "rev-parse", "--short", "HEAD"],
            stderr=subprocess.DEVNULL
        ).decode().strip()
    except Exception:
        sha = "unknown"

    try:
        branch = subprocess.check_output(
            ["git", "branch", "--show-current"],
            stderr=subprocess.DEVNULL
        ).decode().strip()
    except Exception:
        branch = "unknown"

    return sha, branch


def get_test_definition(test_id: str) -> tuple[str, str]:
    """Look up test goal and expected outcome from TESTS.md."""
    tests_file = Path(__file__).parent.parent / "TESTS.md"

    if not tests_file.exists():
        return "Unknown", "Unknown"

    with open(tests_file) as f:
        for line in f:
            if line.startswith("|") and test_id in line:
                parts = [p.strip() for p in line.split("|")]
                if len(parts) >= 4 and parts[1] == test_id:
                    return parts[2], parts[3]  # goal, expected outcome

    return "Unknown", "Unknown"


def generate_report(test_id: str, status: str, local: bool) -> str:
    """Generate the report markdown."""
    now = datetime.now()
    timestamp = now.strftime("%Y-%m-%d %H:%M:%S")
    sha, branch = get_git_info()
    doc_source = "Local" if local else "Published"
    goal, expected = get_test_definition(test_id)

    return f"""# Test Report: {test_id}

## Metadata
| Field | Value |
|-------|-------|
| **Test ID** | {test_id} |
| **Date** | {timestamp} |
| **Git SHA** | {sha} |
| **Git Branch** | {branch} |
| **Doc Source** | {doc_source} |
| **Status** | {status} |

## Goal
{goal}

## Expected Outcome
{expected}

## Actual Result
<!-- Describe what actually happened -->

## Steps Taken
<!-- List the steps you took -->
1.
2.
3.

## Documentation Gaps
<!-- What was missing or unclear? Be specific about which page/section -->

## Suggestions
<!-- Concrete improvements to make this test pass -->
"""


def main():
    parser = argparse.ArgumentParser(description="Generate test report template")
    parser.add_argument("test_id", help="Test ID (e.g., pods-quickstart-terminal)")
    parser.add_argument("status", choices=["PASS", "FAIL", "PARTIAL"], help="Test status")
    parser.add_argument("--local", action="store_true", help="Mark as using local docs")
    args = parser.parse_args()

    # Generate timestamp for filename
    timestamp = datetime.now().strftime("%Y%m%d-%H%M%S")
    filename = f"{args.test_id}-{timestamp}.md"

    # Generate report content
    content = generate_report(args.test_id, args.status, args.local)

    # Save to both locations
    repo_reports = Path(__file__).parent.parent / "reports"
    archive_reports = Path.home() / "Dev" / "doc-tests"

    repo_reports.mkdir(exist_ok=True)
    archive_reports.mkdir(exist_ok=True)

    repo_path = repo_reports / filename
    archive_path = archive_reports / filename

    repo_path.write_text(content)
    archive_path.write_text(content)

    print(f"Report template created:")
    print(f"  - {repo_path}")
    print(f"  - {archive_path}")
    print(f"\nEdit the report to fill in: Actual Result, Steps Taken, Documentation Gaps, Suggestions")


if __name__ == "__main__":
    main()
