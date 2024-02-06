---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This overview page will help you get started setting up your Python projects with RunPod.
RunPod's Python SDK offers multiple ways to interact with the RunPod platform:

- Managing Pods
- Manging Endpoints
- Managing Functions

How you choose to interact with the RunPod platform will depend on your project's needs.

## Project structure

RunPod Serverless is a monorepo that contains multiple services.

```text
.
├── Dockerfile               # Docker configuration
├── LICENSE                  # License information
├── README.md                # Project documentation
├── builder
│   ├── requirements.txt     # Dependencies
│   └── setup.sh             # Setup script
└── src
    └── __init__.py          # API key reference
    └── handler.py           # Main handler code
```

## Install the RunPod SDK

It is recommend to use virtual environments when developing Python projects.

To get started, install setup a virtual environment then install the SDK library.

<Tabs>
  <TabItem value="macos" label="macOS" default>

Create a Python virtual environment with [venv](https://docs.python.org/3/library/venv.html):

    ```command
    python3 -m venv env
    source env/bin/activate
    ```

</TabItem>
  <TabItem value="windows" label="Windows">

Create a Python virtual environment with [venv](https://docs.python.org/3/library/venv.html):

    ```command
    python -m venv env
    env\Scripts\activate
    ```

</TabItem>

</Tabs>

To install the SDK, run the following command from the terminal.

```command
python -m pip install runpod
```

## Get RunPod SDK version

To ensure you've setup your installation correctly, get the RunPod SDK version.
Create a new file called `main.py`.
Add the following to your Python file and execute the script.

```python
import runpod

version = runpod.version.get_version()

print(f"RunPod version number: {version}")
```

You should see something similar to the following output.

```text
RunPod version number: 1.X.0
```

You can find the latest version of the RunPod Python SDK on [GitHub](https://github.com/runpod/runpod-python/releases).

## Add your API key

Add the `api_key` variable to your project.
This authenticates your requests to the RunPod platform and allows you to access the RunPod API.

You can create a `__init__.py` file in your project root directory and add the `api_key` variable.

```python
import os

api_key = os.getenv("RUNPOD_API_KEY")
```

This file will be read upon every execution of your code.

Alternatively, you can set your API key directly in your Python application.

Use an environment variable and load it into your code.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")
```

:::note

It is recommended to use environment variables to set your API key.
You shouldn't load your API key directly into your code.

For these examples, the API key is loaded from an environment variable called `RUNPOD_API_KEY`.

:::
