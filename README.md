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
python3 -m venv helpers/venv
source helpers/venv/bin/activate
pip install -r helpers/requirements.txt

# Run scripts
python3 helpers/gpu_types.py
python3 helpers/sls_cpu_types.py
```
