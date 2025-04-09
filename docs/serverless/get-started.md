---
title: "Get started"
sidebar_position: 2
description: Deploy your first custom Serverless endpoint. Learn to build a Docker image, deploying an endpoint, and sending requests with this comprehensive guide.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Create a custom Serverless endpoint

Learn how to create, deploy, and test your first custom Serverless endpoint.

:::tip

For an even faster start, you can clone the [worker-basic](https://github.com/runpod-workers/worker-basic) repository to get a pre-configured template for building and deploying Serverless endpoints. After cloning the repository, you can skip to [step 6 of this tutorial](#step-6-build-and-push-your-docker-image) to deploy and test the endpoint.

:::

## What you'll learn

This tutorial will teach you how to:

- Set up your development environment.
- Create a handler file.
- Test your endpoint locally.
- Build a Docker image for deployment.
- Deploy and test your endpoint on the RunPod console.

## Requirements

- You've created a RunPod account.
- You have [Python 3.x](https://www.python.org/downloads/) and [Docker](https://docs.docker.com/get-started/get-docker/) installed on your local machine and configured for your command line.

## Step 1: Create a Python virtual environment

First, set up a virtual environment to manage your project dependencies.

1. Run this command in your local terminal:

    ```bash
    # Create a Python virtual environment
    python3 -m venv venv
    ```

2. Then activate the virtual environment:

    <Tabs>
    <TabItem value="mac-linux" label="macOS/Linux">

    ```bash
    source venv/bin/activate
    ```

    </TabItem>

    <TabItem value="windows" label="Windows">

    ```bash
    venv\Scripts\activate
    ```

    </TabItem>

    </Tabs>

3. Finally, install the RunPod SDK:

    ```bash
    pip install runpod
    ```

## Step 2: Create a handler file

Create a file named `rp_handler.py` and add the following code:

```python title="rp_handler.py"
import runpod
import time

def handler(event):
    """
    This function processes incoming requests to your Serverless endpoint.
    
    Args:
        event (dict): Contains the input data and request metadata
        
    Returns:
        Any: The result to be returned to the client
    """
    # Extract input data
    input_data = event['input']
    prompt = input_data.get('prompt')
    seconds = input_data.get('seconds', 0)

    # Simulate processing time
    time.sleep(seconds)
    
    # Convert the input string to upper case (this is where you should add your own logic)
    result = prompt.upper() 

    return result

# Start the Serverless function when the script is run
if __name__ == '__main__':
    runpod.serverless.start({'handler': handler})
```

This is a bare-bones handler that will process a JSON `input` object and output a `prompt` string in uppercase characters.

## Step 4: Test your handler locally

Run your handler to verify it works correctly:

```bash
python rp_handler.py
```

You should see output similar to this:

```
--- Starting Serverless Worker |  Version 1.7.9 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'instruction': 'create a image', 'seconds': 15}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: created a image
DEBUG  | local_test | run_job return: {'output': 'created a image'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': 'created a image'}
INFO   | Local testing complete, exiting.
```

## Step 5: Create a Dockerfile

Create a file named `Dockerfile` with the following content:

```dockerfile
FROM python:3.10-slim

WORKDIR /

# Install dependencies
RUN pip install --no-cache-dir runpod

# Copy your handler file
COPY rp_handler.py /

# Start the container
CMD ["python3", "-u", "rp_handler.py"]
```

## Step 6: Build and push your Docker image

1. Build your Docker image, specifying the platform for RunPod deployment, replacing `[YOUR_USERNAME] with your Docker username:

    ```bash
    docker build --platform linux/amd64 --tag [YOUR_USERNAME]/serverless-test.
    ```

    :::note

    When building your Docker image, you must specify the platform as `linux/amd64` or it won't work on Serverless.

    :::

1. Then push the image to your container registry:

    ```bash
    docker push yourusername/yourrepo:yourtag
    ```

## Step 7: Deploy your endpoint using the web interface

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) of the RunPod web interface.
2. Click **New Endpoint**.
3. Under **Custom Source**, select **Docker Image**, then click **Next**.
4. In the **Container Image** field, enter your Docker image URL: `docker.io/[YOUR_USERNAME]/serverless-test:latest`
5. Enter a name for your endpoint (or leave the randomly generated name in place).
6. Under **Worker Configuration**, check the box for **16 GB** GPUs.
7. Leave the rest of the settings at their defaults.
8. Click **Create Endpoint**.

You should be automatically redirected to a dedicated detail page for your new endpoint.

## Step 8: Test your endpoint on RunPod

To test your endpoint, click the **Requests** tab in the endpoint detail page:

<img src="/img/docs/serverless-get-started-endpoint-details.png" width="900" alt="Screenshot of the endpoint details page."/>

On the left you should see the default test request:

```json
{
    "input": {
        "prompt": "Hello World"
    }
}
```

Leave the default input as-is and click **Run**. It will take some time for your workers to initialize.

When the workers have finished processing your request, you should see output on the right side of the page similar to this:

```json
{
"delayTime": 15088,
"executionTime": 60,
"id": "04f01223-4aa2-40df-bdab-37e5caa43cbe-u1",
"output": "HELLO WORLD",
"status": "COMPLETED",
"workerId": "uhbbfre73gqjwh"
}
```

## Next steps

Nice job, you've successfully deployed and tested your first Serverless endpoint! 

Now that you've learned the basics, you're ready to:

- [Rapidly deploy large language models](/serverless/workers/vllm/get-started) from Hugging Face as Serverless endpoints.
- [Manage your Serverless endpoints](/serverless/endpoints/manage-endpoints) using the web interface.
- Learn how to create more advanced [handler functions](/serverless/workers/handlers/overview).
- [Deploy your endpoints with GitHub](/serverless/github-integration).
- Learn more about [local testing](/serverless/workers/development/local-testing).