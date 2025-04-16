---
title: "Local Server Flags"
description: "A comprehensive guide to all flags available when starting your RunPod local server for endpoint testing"
sidebar_position: 1
---

When developing RunPod serverless functions, it's crucial to test them thoroughly before deployment.
The RunPod SDK provides a powerful local testing environment that allows you to simulate your serverless endpoints right on your development machine.
This local server eliminates the need for constant Docker container rebuilds, uploads, and endpoint updates during the development and testing phase.

To facilitate this local testing environment, the RunPod SDK offers a variety of flags that allow you to customize your setup.
These flags enable you to:

- Configure the server settings (port, host, concurrency)
- Control logging verbosity
- Enable debugging features
- Provide test inputs

By using these flags, you can create a local environment that closely mimics the behavior of your functions in the RunPod cloud, allowing for more accurate testing and smoother deployments.

This guide provides a comprehensive overview of all available flags, their purposes, and how to use them effectively in your local testing workflow.

## Basic Usage

To start your local server with additional flags, use the following format:

```bash
python your_function.py [flags]
```

Replace `your_function.py` with the name of your Python file containing the RunPod handler.

## Available Flags

### --rp_serve_api

Starts the API server for local testing.

**Usage**:

```bash
python your_function.py --rp_serve_api
```

### --rp_api_port

Sets the port number for the FastAPI server.

**Default**: 8000

**Usage**:

```bash
python your_function.py --rp_serve_api --rp_api_port 8080
```

Setting `--rp_api_host` to `0.0.0.0` allows connections from other devices on the network, which can be useful for testing but may have security implications.

### --rp_api_concurrency

Sets the number of concurrent workers for the FastAPI server.

**Default**: 1

**Usage**:

```bash
python your_function.py --rp_serve_api --rp_api_concurrency 4
```

:::note

When using `--rp_api_concurrency` with a value greater than 1, ensure your main file is named `main.py` for proper FastAPI integration.

:::

### --rp_api_host

Sets the hostname for the FastAPI server.

**Default**: "localhost"

**Usage**:

```bash
python your_function.py --rp_serve_api --rp_api_host 0.0.0.0
```

### --rp_log_level

Controls the verbosity of console output.

**Options**: `ERROR` | `WARN` | `INFO` | `DEBUG`

**Usage**:

```bash
python your_function.py --rp_serve_api --rp_log_level DEBUG
```

### --rp_debugger

Enables the RunPod debugger for troubleshooting.
The `--rp_debugger` flag is particularly useful when you need to step through your code for troubleshooting.

**Usage**:

```bash
python your_function.py --rp_serve_api --rp_debugger
```

### --test_input

Provides test input data for your function, formatted as JSON.

**Usage**:

```bash
python your_function.py --rp_serve_api \
    --test_input '{"input": {"key": "value"}}'
```

The `--test_input` flag is an alternative to using a `test_input.json` file. If both are present, the command-line input takes precedence.

## Combined flags

You can combine multiple flags to customize your local testing environment.

For example:

```bash
python main.py --rp_serve_api \
    --rp_api_port 8080 \
    --rp_api_concurrency 4 \
    --rp_log_level DEBUG \
    --test_input '{"input": {"key": "value"}}'
```

This command starts the local server on port `8080` with 4 concurrent workers, sets the log level to `DEBUG`, and provides test input data.

These flags provide powerful tools for customizing your local testing environment. By using them effectively, you can simulate various scenarios, debug issues, and ensure your serverless functions are robust and ready for deployment to the RunPod cloud.

For more detailed information on each flag and advanced usage scenarios, refer to the individual tutorials in this documentation.
