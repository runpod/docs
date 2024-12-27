# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```shell
yarn
```

## Local Development

```shell
yarn start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```shell
yarn build
```

## Linting

- Install [vale](https://vale.sh/docs/vale-cli/installation/)
- Lint a specific folder or file, run:

```bash
vale path/to/docs/
# or
vale path/to/*.md
```

- Lint the entire repo

```bash
yarn lint
```

## Format Python code examples

Install `blacken-docs`.

```bash
python -m pip install blacken-docs
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
yarn gpu-types
yarn cpu-types
```
