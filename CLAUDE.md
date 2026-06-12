# CLAUDE.md

This file provides guidance to Claude Code when working with this repository.

## Project Overview

This is the Runpod documentation site, built with [Mintlify](https://mintlify.com/). The documentation covers Runpod's cloud GPU platform: Serverless endpoints, Pods, Flash SDK, storage, and APIs.

## Quick Reference

| Topic | File |
|-------|------|
| Directory structure, navigation, snippets, tooltips | [.claude/architecture.md](.claude/architecture.md) |
| Writing style, capitalization, terminology | [.claude/style-guide.md](.claude/style-guide.md) |
| Running and writing documentation tests | [.claude/testing.md](.claude/testing.md) |
| Local dev, linting, publishing workflow | [.claude/development.md](.claude/development.md) |

## Key Commands

```bash
mintlify dev                    # Start local dev server
vale path/to/file.mdx           # Lint documentation
node scripts/validate-tooltips.js  # Check tooltip imports
```

## Self-Improvement

**Claude should continuously learn and improve these docs.**

If you discover something that would be useful for future sessions, ask me:
> "I noticed [insight]. Would you like me to add this to `.claude/[appropriate-file].md`?"

Examples of things worth capturing:
- Patterns that work well (or don't) in this codebase
- Common mistakes to avoid
- Useful commands or workflows discovered during tasks
- Clarifications about how Runpod products work

## Terminology Quick Reference

**Capitalize:** Runpod, Pods, Serverless, Hub, Instant Clusters, Flash, Secure Cloud, Community Cloud, Public Endpoint

**Lowercase:** endpoint, worker, template, handler, network volume, data center, cluster, fine-tune, repo
