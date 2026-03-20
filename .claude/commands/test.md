# /test - Run a documentation test

Run a test from the testing framework to validate documentation quality.

## Usage

```
/test <test-id>
/test <test-id> local
/test smoke
```

## Arguments

- `<test-id>`: The test ID from `tests/TESTS.md` (e.g., `pods-quickstart-terminal`, `flash-quickstart`)
- `local`: (Optional) Use local MDX files instead of published docs
- `smoke`: Run all smoke tests

## Execution Rules

When running a test, you MUST follow these rules:

1. **Read the test definition** from `tests/TESTS.md` - find the row matching the test ID
2. **Do NOT use prior knowledge** - only use Runpod docs (published MCP or local MDX)
3. **Doc source mode**:
   - Default: Use `mcp__runpod-docs__search_runpod_documentation` for published docs
   - If `local` specified: Search and read `.mdx` files in this repository
4. **Resource naming**: All created resources MUST use `doc_test_` prefix
5. **Attempt the goal** using available tools (MCP for API, Bash for CLI)
6. **Handle GPU availability** - see GPU Fallback section below
7. **Verify the Expected Outcome** from the test definition
8. **Clean up** all `doc_test_*` resources after the test
9. **Generate report** using the helper script:
   ```bash
   python tests/scripts/report.py <test-id> <PASS|FAIL|PARTIAL> [--local]
   ```
10. **Complete the report** by filling in the generated template

## GPU Fallback Guidance

GPU availability varies. When tests require GPU resources:

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

## Report Locations

Reports are saved to both:
- `tests/reports/<test-id>-<timestamp>.md` (gitignored)
- `~/Dev/doc-tests/<test-id>-<timestamp>.md` (persistent archive)

## Example

```
/test pods-quickstart-terminal local
```

This will:
1. Load the test definition for `pods-quickstart-terminal`
2. Use local MDX files (not published docs)
3. Attempt: "Complete the Pod quickstart using only the terminal"
4. Verify: "Code runs on Pod via SSH"
5. Clean up and generate report
