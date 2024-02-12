---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Get started with setting up your Python projects using RunPod.
Depending on the specific needs of your project, there are various ways to interact with the RunPod platform.
This guide provides an approach to get you up and running.

## Install the RunPod SDK

Using virtual environments for Python project development is highly recommended.
Virtual environments allow you to manage dependencies for different projects separately, avoiding conflicts between project requirements.

To get started, install setup a virtual environment then install the RunPod SDK library.

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
  <TabItem value="linux" label="Linux">

Create a Python virtual environment with [venv](https://docs.python.org/3/library/venv.html):

    ```command
    python3 -m venv env
    source env/bin/activate
    ```

</TabItem>
</Tabs>

To install the SDK, run the following command from the terminal.

```command
python -m pip install runpod
```

<!--
pip uninstall -y runpod
-->

You should have the RunPod SDK installed and ready to use.

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
Now that you've installed the RunPod SDK, add your API key.

## Add your API key

Set `api_key` and reference its variable in your Python application.
This authenticates your requests to the RunPod platform and allows you to access the RunPod API.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")
```

:::note

It's recommended to use environment variables to set your API key.
You shouldn't load your API key directly into your code.

For these examples, the API key loads from an environment variable called `RUNPOD_API_KEY`.

:::

For more information, see:

- [APIs](/sdks/python/apis)
- [Endpoints](/sdks/python/endpoints)
- [Loggers](/sdks/python/loggers)
