# /test - Run a documentation test

Run a test from the testing framework to validate documentation quality.

## Usage

```
/test <test-id>              # Run single test
/test <test-id> local        # Run with local docs
/test <category>             # Run all tests in category
/test <category> local       # Run category with local docs
/test smoke                  # Run smoke tests only
```

## Arguments

- `<test-id>`: Single test ID (e.g., `pods-quickstart-terminal`, `flash-quickstart`)
- `<category>`: Category name to run all tests in that section
- `local`: (Optional) Use local MDX files instead of published docs
- `smoke`: Run all smoke tests

## Categories

| Category | Tests | Description |
|----------|-------|-------------|
| `smoke` | 13 | Fast tests, no GPU deploys |
| `flash` | 13 | Flash SDK tests |
| `serverless` | 20 | Serverless endpoint tests |
| `vllm` | 6 | vLLM deployment tests |
| `pods` | 11 | Pod management tests |
| `storage` | 11 | Network volume tests |
| `templates` | 6 | Template tests |
| `clusters` | 4 | Instant Cluster tests |
| `sdk` | 8 | SDK and API tests |
| `cli` | 16 | runpodctl tests |
| `integrations` | 4 | Third-party integrations |
| `public` | 3 | Public endpoint tests |
| `tutorials` | 9 | End-to-end tutorials |

## Single Test Execution

When running a single test:

1. **Read the test definition** from `tests/TESTS.md`
2. **Do NOT use prior knowledge** - only use Runpod docs
3. **Doc source mode**:
   - Default: Use `mcp__runpod-docs__search_runpod_documentation`
   - If `local`: Search and read `.mdx` files in this repository
4. **Resource naming**: All resources MUST use `doc_test_` prefix
5. **Attempt the goal** using available tools
6. **Handle GPU availability** - see GPU Fallback section
7. **Verify the Expected Outcome** from the test definition
8. **Clean up** all `doc_test_*` resources
9. **Generate report**: `python tests/scripts/report.py <test-id> <PASS|FAIL|PARTIAL> [--local]`
10. **Complete the report** with actual results

## Batch Execution

When running a category (e.g., `/test serverless`):

1. **Parse category** - Identify all test IDs in that section of TESTS.md
2. **Show test list** - Display tests to be run and ask for confirmation
3. **Run sequentially** - Execute each test following single test rules
4. **Track results** - Record PASS/FAIL/PARTIAL for each
5. **Clean up between tests** - Delete all `doc_test_*` resources before next test
6. **Generate summary** - Create batch summary report at end

### Batch Summary Format

After running all tests in a batch, output:

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

Save the summary to:
- `tests/reports/batch-<category>-<timestamp>.md`
- `~/Dev/doc-tests/batch-<category>-<timestamp>.md`

### Batch Options

- **Stop on failure**: By default, continue through all tests. User can say "stop on first failure"
- **Skip cleanup**: User can say "skip cleanup between tests" for speed (not recommended)

## GPU Fallback Guidance

| Queue Wait | Action |
|------------|--------|
| < 2 min | Keep waiting |
| 2-5 min | Try fallback GPU |
| > 5 min | Use fallback or mark blocked |

**Fallback order**: L4 → A4000 → RTX 3090 (Community Cloud)

**Status marking**:
- PASS: Completed with documented GPU
- PARTIAL: Completed with fallback GPU (doc improvement needed)
- FAIL: Failed even with fallbacks

## Examples

```
/test pods-quickstart-terminal       # Single test
/test flash local                    # All Flash tests with local docs
/test serverless                     # All Serverless tests
/test smoke                          # Quick validation
```
