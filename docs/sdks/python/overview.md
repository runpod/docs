---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Get started with setting up your RunPod projects using Python.
Depending on the specific needs of your project, there are various ways to interact with the RunPod platform.
This guide provides an approach to get you up and running.

## Install the RunPod SDK

Create a Python virtual environment to install the RunPod SDK library.
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

To ensure you've setup your RunPod SDK in Python, choose from one of the following methods to print the RunPod Python SDK version to your terminal.

<Tabs>
  <TabItem value="pip" label="Pip" default>

    Run the following command using pip to get the RunPod SDK version.
    
    ```command
    pip show runpod
    ```
    
    You should see something similar to the following output.
    
    ```command
    runpod==1.6.1
    ```

</TabItem>
  <TabItem value="shell" label="Shell">

    Run the following command from your terminal to get the RunPod SDK version.
    
    ```command
    python3 -c "import runpod; print(runpod.__version__)"
    ```
    

</TabItem>
  <TabItem value="python" label="Python">

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

</TabItem>
</Tabs>




You can find the latest version of the RunPod Python SDK on [GitHub](https://github.com/runpod/runpod-python/releases).

Now that you've installed the RunPod SDK, add your API key.

## Add your API key

Set `api_key` and reference its variable in your Python application.
This authenticates your requests to the RunPod platform and allows you to access the [RunPod API](/sdks/python/apis).

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

Now that you've have the RunPod Python SDK installed and configured, you can start using the RunPod platform.

For more information, see:

- [APIs](/sdks/python/apis)
- [Endpoints](/sdks/python/endpoints)
