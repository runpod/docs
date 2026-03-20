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
- **Cleanup**: Resource types to delete after test

## Reports

Reports are saved to `reports/` (gitignored) and include:
- What worked / what didn't
- Where the agent got stuck
- Documentation improvements needed
