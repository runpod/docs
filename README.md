# Runpod documentation site

This website is built using [Mintlify](https://mintlify.com/).

## Publishing Changes

Create a pull request to make document changes, and request a review from [@muhsinking](https://github.com/muhsinking). Changes will be deployed to production automatically after they are pushed to the `main` branch.

## Running the docs locally

Install Mintlify:

```shell
npm i -g mintlify
```

Start a local development server on your browser:

```shell
mintlify dev
```

Most changes will be reflected live without having to restart the server.

## Linting

- Install [vale](https://vale.sh/docs/vale-cli/installation/)
- Lint a specific folder or file, run:

```bash
vale path/to/docs/
# or
vale path/to/*.md
```

## Format Python code examples

Install `blacken-docs`.

```bash
python3 -m pip install blacken-docs
```

Run the formatter.

```bash
yarn format
```

```bash
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

## Update CPU and GPUs

```bash
# Set up virtual environment
python3 -m venv helpers/.venv
source helpers/.venv/bin/activate
pip install -r helpers/requirements.txt

# Run scripts
python3 helpers/gpu_types.py
python3 helpers/sls_cpu_types.py
```

## Agent experience testing

The `tests/TESTS.md` file contains test definitions for validating documentation quality through AI agent testing. Tests simulate real user prompts - a coding agent must accomplish the goal using only the documentation as it currently exists.

### Requirements

- [Claude Code](https://docs.anthropic.com/en/docs/claude-code) with the Runpod MCP servers configured:
  ```bash
  # Add Runpod API MCP server
  claude mcp add runpod --scope user -e RUNPOD_API_KEY=your_key -- npx -y @runpod/mcp-server@latest

  # Add Runpod Docs MCP server
  claude mcp add runpod-docs --scope user --transport http https://docs.runpod.io/mcp
  ```

### Running tests

In Claude Code, use natural language:

```
Run the flash-quickstart test
```

```
Run all vLLM tests
```

To validate unpublished doc changes, use local docs mode:

```
Run the vllm-deploy test using local docs
```

Claude will:
1. Read the test from `tests/TESTS.md`
2. Attempt to accomplish the goal using only the docs
3. Clean up any resources created (prefixed with `doc_test_`)
4. Write a report to `tests/reports/`
5. Suggest documentation improvements

### Test definitions

All tests are defined in [`tests/TESTS.md`](tests/TESTS.md) as a table

### Adding new tests

Add a row to the appropriate section in `tests/TESTS.md` with:
- **ID**: Unique test identifier
- **Goal**: One sentence describing what the user wants
- **Cleanup**: Resource types to delete (`endpoints`, `pods`, `templates`, `network-volumes`, or `none`)

### Reports

Test reports are saved to `tests/reports/` (gitignored) and include:
- What worked and what didn't
- Where the agent got stuck
- Specific documentation improvement suggestions
