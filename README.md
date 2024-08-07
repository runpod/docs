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

To lint a specific folder or file, run:

```command
vale path/to/docs/
# or
vale path/to/*.md
```

To lint the entire repo, run:

```command
yarn lint
```

## Format Python code examples

Install `blacken-docs`.

```command
python -m pip install blacken-docs
```

Run the formatter.

```command
git ls-files -z -- '*.md' | xargs -0 blacken-docs
```

## Update CPU and GPUs

```command
yarn gpu-types
yarn cpu-types
```
