# Documentation Agent Tests

The `tests/` directory contains minimal test definitions that simulate real user prompts. Tests are intentionally sparse - the agent must figure out how to accomplish the goal using only the documentation.

## Philosophy

Tests should be **hard to pass**. They simulate a user typing a simple request without context. If the docs are good, the agent figures it out. If not, the test reveals gaps.

## Running Tests

Use the `/test` command:

```
/test <test-id>              # Single test with published docs
/test <test-id> local        # Single test with local docs
/test <category>             # All tests in category
/test <category> local       # Category with local docs
/test smoke                  # Smoke tests only
```

### Categories

| Category | Description |
|----------|-------------|
| `smoke` | Fast tests, no GPU deploys |
| `flash` | Flash SDK |
| `serverless` | Serverless endpoints |
| `vllm` | vLLM deployment |
| `pods` | Pod management |
| `storage` | Network volumes |
| `templates` | Template management |
| `clusters` | Instant Clusters |
| `sdk` | SDKs and APIs |
| `cli` | runpodctl |
| `integrations` | Third-party integrations |
| `public` | Public endpoints |
| `tutorials` | End-to-end tutorials |

## Single Test Execution

1. Read the test definition from `tests/TESTS.md`.
2. **Do NOT use prior knowledge** - only use Runpod docs.
3. Attempt to complete the goal using available tools.
4. All created resources must use `doc_test_` prefix.
5. Handle GPU availability issues (see GPU Fallback section below).
6. Clean up resources after test (see Cleanup section below).
7. Generate report using the helper script:
   ```bash
   python3 tests/scripts/report.py <test-id> <PASS|FAIL|PARTIAL> [--local]
   ```
8. Fill in the generated report template with actual results.

## Batch Execution

When running a category (e.g., `/test serverless` or `/test flash local`):

1. **Parse category** - Identify all test IDs in that section of `tests/TESTS.md`
2. **Show test list** - Display tests to be run and ask for confirmation
3. **Run sequentially** - Execute each test following single test rules
4. **Track results** - Record PASS/FAIL/PARTIAL for each test
5. **Clean up between tests** - Delete all `doc_test_*` resources before starting next test
6. **Generate summary** - Create batch summary report at end

### Batch Summary Format

```markdown
## Batch Summary: <category>

| Test ID | Status | Notes |
|---------|--------|-------|
| test-1 | PASS | |
| test-2 | FAIL | Missing docs for X |
| test-3 | PARTIAL | Used fallback GPU |

**Results:** X passed, Y failed, Z partial out of N tests
**Doc Source:** Published / Local
**Date:** YYYY-MM-DD HH:MM
```

Save batch summaries to:
- `tests/reports/batch-<category>-<timestamp>.md`
- `~/Dev/doc-tests/batch-<category>-<timestamp>.md`

### Batch Options

- **Stop on failure**: By default, continue through all tests. Say "stop on first failure" to halt early.
- **Skip tests**: Say "skip test-id" during batch to skip specific tests.

## GPU Fallback Guidance

GPU availability varies by type and time. When a test requires GPU resources:

### Queue Timeout Thresholds

| Wait Time | Action |
|-----------|--------|
| < 2 min | Normal, keep waiting |
| 2-5 min | Consider trying fallback GPU |
| > 5 min | Use fallback GPU or mark test blocked |

### Fallback GPU Order

If the documented GPU type is unavailable, try these in order:

1. **First choice**: GPU specified in docs (tests the docs as-is)
2. **Fallback 1**: NVIDIA L4 (good availability, cost-effective)
3. **Fallback 2**: NVIDIA A4000 (broad availability)
4. **Fallback 3**: RTX 3090 (community cloud)

### When to Use Fallbacks

- **Test the docs first**: Always try the GPU specified in documentation first.
- **Document the issue**: If you must use a fallback, note it in the report as a documentation gap.
- **Mark appropriately**:
  - PASS: Test completed with documented GPU
  - PARTIAL: Test completed with fallback GPU (doc improvement needed)
  - FAIL: Test failed even with fallbacks

### Cloud Type Fallbacks

If Secure Cloud has no availability:
1. Try Community Cloud for the same GPU type
2. Note cloud type used in the test report

### Example Report Note

```markdown
## Documentation Gaps
GPU availability: Docs specify RTX 4090 but none available after 3 min wait.
Used fallback: NVIDIA L4 on Community Cloud.
Suggestion: Add note about GPU availability or use more available GPU in example.
```

## Cleanup

All test resources use the `doc_test_` prefix. Clean up after each test to avoid orphaned resources.

### During Tests (Claude Code)

After completing a test, use the Runpod MCP tools to delete created resources:

```
# List and identify test resources
mcp__runpod__list-pods (filter by name starting with "doc_test_")
mcp__runpod__list-endpoints
mcp__runpod__list-templates
mcp__runpod__list-network-volumes

# Delete matching resources
mcp__runpod__delete-pod (podId)
mcp__runpod__delete-endpoint (endpointId)
mcp__runpod__delete-template (templateId)
mcp__runpod__delete-network-volume (networkVolumeId)
```

### Manual Cleanup (Standalone Script)

Run the cleanup script to find and delete orphaned test resources:

```bash
# Dry run - see what would be deleted
python tests/scripts/cleanup.py

# Actually delete resources
python tests/scripts/cleanup.py --delete
```

### Cleanup Command

Users can request cleanup directly:
```
Clean up test resources
Delete all doc_test_ resources
```

When this is requested, list all resources matching `doc_test_*` and delete them after confirmation.

## Doc Source Modes

### Published Docs (default)

Use the `mcp__runpod-docs__search_runpod_documentation` tool to search the live published documentation. This tests what real users see.

### Local Docs

When the user says "using local docs":
- Search and read `.mdx` files directly from this repository.
- Use Glob to find files: `**/*.mdx`
- Use Grep to search content.
- Use Read to read file contents.

This validates unpublished doc changes before they go live.

## Test Tiers

### Smoke Tests

Fast tests that don't require GPU deployments. Run these for quick validation:

```
Run smoke tests
Run all smoke tests using local docs
```

Smoke tests are listed in the "Smoke Tests" section of `tests/TESTS.md`. They include:
- SDK/CLI installation tests
- Read-only API tests (list templates, view metrics)
- Public endpoint tests (FLUX, Qwen)
- Account configuration tests (SSH keys, API keys)

### Full Tests

All tests including GPU deployments. Use for comprehensive validation:

```
Run all tests
Run all serverless tests
```

Full tests may create billable resources. Always clean up after.

## Report Format

Save reports to **both** locations:
1. `tests/reports/{test-id}-{YYYYMMDD-HHMMSS}.md` (gitignored, in repo)
2. `~/Dev/doc-tests/{test-id}-{YYYYMMDD-HHMMSS}.md` (persistent archive)

Use this template:

```markdown
# Test Report: {Test ID}

## Metadata
| Field | Value |
|-------|-------|
| **Test ID** | {test-id} |
| **Date** | {YYYY-MM-DD HH:MM:SS} |
| **Git SHA** | {git rev-parse --short HEAD} |
| **Git Branch** | {git branch --show-current} |
| **Doc Source** | Published / Local |
| **Status** | PASS / FAIL / PARTIAL |

## Goal
{Copy the goal from TESTS.md}

## Expected Outcome
{Copy from TESTS.md}

## Actual Result
{What actually happened - be specific}

## Steps Taken
1. {First thing tried}
2. {Second thing tried}
...

## Documentation Gaps
{What was missing or unclear - be specific about which page/section}

## Suggestions
{Concrete improvements to make this test pass}
```

### Comparing Runs

Reports in `~/Dev/doc-tests/` persist across git operations. To compare runs:
```bash
# List all runs for a test
ls ~/Dev/doc-tests/flash-quickstart-*.md

# Diff two runs
diff ~/Dev/doc-tests/flash-quickstart-20240115-100000.md ~/Dev/doc-tests/flash-quickstart-20240120-140000.md
```

### Tracking Pass Rates

Use the stats script to analyze historical results:

```bash
# Overall summary
python3 tests/scripts/stats.py

# Group by test
python3 tests/scripts/stats.py --by-test

# Recent runs
python3 tests/scripts/stats.py --recent 10

# Show failures
python3 tests/scripts/stats.py --failures
```

## Test Categories

Tests are organized by product area in `tests/TESTS.md`:

- **Flash SDK**: Deploying Python functions
- **Serverless Endpoints**: Creating and managing endpoints (must deploy real endpoints, not use public endpoints)
- **vLLM**: Deploying LLM inference (must deploy real endpoints, not use public endpoints)
- **Pods**: Creating and managing GPU instances
- **Storage**: Network volumes and file transfer
- **Templates**: Creating and using templates
- **Instant Clusters**: Multi-node deployments
- **SDKs & APIs**: Using client libraries
- **CLI (runpodctl)**: Command-line operations
- **Integrations**: Third-party tool integration
- **Tutorials**: End-to-end workflows

## Requirements

- Runpod API MCP server configured
- Runpod Docs MCP server configured
- Docker available for building custom images
