# Coding Agent Experience Tests

Tests that simulate real user prompts. A coding agent must accomplish the goal using only the documentation.

## Philosophy

These tests should be **hard to pass**. They simulate a user typing a simple request without context. If the docs are good, the agent can figure it out. If not, the test reveals gaps.

## Running Tests

In Claude Code:

```
Run the flash-quickstart test
```

```
Run all vLLM tests
```

### Doc Source Modes

- **Published docs** (default) - Uses the Runpod Docs MCP server
- **Local docs** - Reads `.mdx` files from this repo (for validating unpublished changes)

```
Run the vllm-deploy test using local docs
```

## Test Definitions

All tests are defined in [TESTS.md](./TESTS.md) as a table with:
- **ID**: Test identifier
- **Goal**: What the user wants (one sentence)
- **Expected Outcome**: What constitutes PASS

**Smoke tests** are fast tests that don't require GPU deployments (SDK installs, read-only API calls, public endpoints).

Cleanup rules are defined globally at the bottom of TESTS.md. All test resources use the `doc_test_` prefix.

## Reports

Reports are saved to two locations:
- `reports/` (gitignored, in repo)
- `~/Dev/doc-tests/` (persistent local archive)

Each report includes:
- Git SHA and branch
- Steps taken
- Actual vs expected results
- Documentation gaps and suggestions
