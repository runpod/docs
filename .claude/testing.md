# Documentation Agent Tests

The `tests/` directory contains minimal test definitions that simulate real user prompts. Tests are intentionally sparse - the agent must figure out how to accomplish the goal using only the documentation.

## Philosophy

Tests should be **hard to pass**. They simulate a user typing a simple request without context. If the docs are good, the agent figures it out. If not, the test reveals gaps.

## Running Tests

Use natural language:
```
Run the flash-quickstart test
Run the vllm-deploy test using local docs
Run all pods tests
```

## Test Execution Rules

1. Read the test definition from `tests/TESTS.md`.
2. **Do NOT use prior knowledge** - only use Runpod docs.
3. Attempt to complete the goal using available tools.
4. All created resources must use `doc_test_` prefix.
5. Clean up resources after test.
6. Write report to `tests/reports/{test-id}-{timestamp}.md`.

## Doc Source Modes

### Published Docs (default)

Use the `mcp__runpod-dops__search_runpod_documentation` tool to search the live published documentation. This tests what real users see.

### Local Docs

When the user says "using local docs":
- Search and read `.mdx` files directly from this repository.
- Use Glob to find files: `**/*.mdx`
- Use Grep to search content.
- Use Read to read file contents.

This validates unpublished doc changes before they go live.

## Report Format

```markdown
# Test Report: {Test Name}

**Date:** {timestamp}
**Status:** PASS | FAIL | PARTIAL

## What Happened
Brief narrative of the attempt.

## Where I Got Stuck
Specific points of confusion or failure.

## Documentation Gaps
What was missing or unclear in the docs.

## Suggestions
Specific improvements to make tests pass.
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
