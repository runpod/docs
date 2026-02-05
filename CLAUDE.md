# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the Runpod documentation site, built using [Mintlify](https://mintlify.com/). The documentation covers Runpod's cloud GPU platform, including Serverless endpoints, Pods, storage solutions, SDKs, and APIs.

## Development Commands

### Local Development

Install Mintlify globally:
```bash
npm i -g mintlify
```

Start the local development server:
```bash
mintlify dev
```

Most changes will be reflected live without restarting the server.

### Linting

Install [vale](https://vale.sh/docs/vale-cli/installation/), then lint specific files or folders:
```bash
vale path/to/docs/
# or
vale path/to/*.md
```

Vale is configured with Google and Readability style guides via `.vale.ini`.

### Python Code Formatting

For Python code examples in documentation:
```bash
python -m pip install blacken-docs
yarn format
# or directly:
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

### Update GPU and CPU Reference Tables

These scripts fetch current GPU/CPU types from Runpod's GraphQL API and regenerate reference documentation:
```bash
python helpers/gpu_types.py
python helpers/sls_cpu_types.py
```

The scripts require: `requests`, `tabulate`, and `pandas` (see `helpers/requirements.txt`).

## Documentation Architecture

### Content Organization

The site is organized into major product areas, defined in `docs.json`:

- **Serverless**: Worker handlers, endpoints, vLLM deployments, and load balancing
- **Pods**: GPU instances, storage, templates, and connections
- **Storage**: Network volumes and S3 API
- **Hub**: Public endpoints and publishing guides
- **Instant Clusters**: Multi-node GPU clusters
- **SDKs**: Python, JavaScript, Go, and GraphQL client libraries
- **API Reference**: REST API documentation for all resources
- **Examples/Tutorials**: Step-by-step guides organized by product area
- **Community**: Community-contributed tools and solutions

### File Structure

- **Documentation files**: MDX (`.mdx`) files organized by product area
- **Snippets**: Reusable content fragments in `snippets/`
- **Images**: Static assets in `images/`
- **Configuration**: `docs.json` defines site structure, navigation, theme, and redirects

### Navigation and Routing

The `docs.json` file controls all site navigation through a hierarchical tab/group/page structure. Pages are referenced by their file path (without extension). When adding new documentation, you must update the `navigation.tabs` array in `docs.json` to make pages visible.

### vLLM Documentation

The vLLM section (`serverless/vllm/`) documents Runpod's vLLM worker for LLM inference. Key topics:
- vLLM overview and architecture (PagedAttention, continuous batching)
- Getting started and configuration
- Environment variable reference
- OpenAI API compatibility
- Request handling

vLLM documentation should explain both the underlying vLLM technology and Runpod-specific integration details.

## Style Guidelines

Follow the Runpod style guide (`.cursor/rules/rp-styleguide.mdc`) and Google Developer Style Guide (`.cursor/rules/google-style-guide.mdc`):

### Capitalization and Terminology

- **Always use sentence case** for headings and titles
- **Proper nouns**: Runpod, Pods, Serverless, Hub, Instant Clusters, Secure Cloud, Community Cloud, Tetra
- **Generic terms** (lowercase): endpoint, worker, cluster, template, handler, fine-tune, network volume

### Writing Style

- Use second person ("you") instead of first person plural ("we")
- Prefer active voice
- Use American English spelling
- Prefer paragraphs over bullet points unless specifically requested
- When using bullet points, end each with a period

### Tutorial Structure

Tutorials should include:
- **What you'll learn** section
- **Requirements** section (not "Prerequisites")
- Numbered steps using format: `## Step 1: Create a widget`

### Code Examples

- Always use code blocks with language identifiers
- Precede code with context/purpose explanation
- Follow code with explanation of key parts

## Publishing Workflow

1. Create a pull request with changes
2. Request review from [@muhsinking](https://github.com/muhsinking)
3. Changes deploy automatically to production after merge to `main` branch

## Common Patterns

### Adding New Documentation Pages

1. Create `.mdx` file in appropriate directory
2. Add frontmatter with `title`, `sidebarTitle`, and `description`
3. Update `docs.json` navigation to include the page path
4. Ensure proper categorization under relevant tab/group

### Using Snippets

Reusable content (like pricing tables) lives in `snippets/` and can be embedded in multiple pages to maintain consistency.

### Redirects

When moving or renaming pages, add redirect entries to the `redirects` array in `docs.json` to maintain backward compatibility.
