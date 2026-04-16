# Test Scripts

Utility scripts for the documentation testing framework.

## cleanup.py

Finds and deletes Runpod resources matching the test prefix (`doc_test_*`).

```bash
# Dry run - see what would be deleted
python cleanup.py

# Actually delete resources
python cleanup.py --delete

# Use custom prefix
python cleanup.py --prefix my_test_
```

**Requirements:** `requests`, `RUNPOD_API_KEY` env var

## report.py

Generates a test report template with metadata pre-filled.

```bash
# Generate report for a passing test
python report.py pods-quickstart-terminal PASS

# Mark as using local docs
python report.py pods-quickstart-terminal PASS --local

# Generate report for a failing test
python report.py flash-quickstart FAIL
```

**Output:** Creates report in both:
- `tests/reports/<test-id>-<timestamp>.md`
- `~/Dev/doc-tests/<test-id>-<timestamp>.md`

The template includes:
- Timestamp, git SHA, branch
- Test goal and expected outcome (from TESTS.md)
- Placeholder sections for you to fill in

## stats.py

Analyzes historical test reports to show pass rates and trends.

```bash
# Show overall summary
python stats.py

# Group by test ID
python stats.py --by-test

# Show last 10 reports
python stats.py --recent 10

# Show only failures
python stats.py --failures
```

**Data source:** Reads reports from `~/Dev/doc-tests/`

## CI Integration

Add to GitHub Actions for scheduled cleanup:

```yaml
- name: Cleanup orphaned test resources
  env:
    RUNPOD_API_KEY: ${{ secrets.RUNPOD_API_KEY }}
  run: python tests/scripts/cleanup.py --delete
```
