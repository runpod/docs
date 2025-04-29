---
title: "Build your first worker"
sidebar_position: 3
description: Build and deploy your first custom Serverless worker. Learn to create a handler, test it locally, build a Docker image, create an endpoint, and send requests with this step-by-step tutorial.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Build your first worker

Learn how to create, deploy, and test a custom Serverless worker.

:::tip

For an even faster start, clone the [worker-basic](https://github.com/runpod-workers/worker-basic) repository for a pre-configured template for building and deploying Serverless workers. After cloning the repository, skip to [step 6 of this tutorial](#step-6-build-and-push-your-docker-image) to deploy and test the endpoint.

:::

## What you'll learn

In this tutorial you'll learn how to:

- Set up your development environment.
- Create a handler file.
- Test your handler locally.
- Build a Docker image for deployment.
- Deploy and test your worker on the RunPod console.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've installed [Python 3.x](https://www.python.org/downloads/) and [Docker](https://docs.docker.com/get-started/get-docker/) on your local machine and configured them for your command line.

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
    print(f"Worker Start")
    input = event['input']
    
    prompt = input.get('prompt')  
    seconds = input.get('seconds', 0)  

    print(f"Received prompt: {prompt}")
    print(f"Sleeping for {seconds} seconds...")
    
    # You can replace this sleep call with your Python function to generate images, text, or run any machine learning workload
    time.sleep(seconds)  
    
    return prompt 

# Start the Serverless function when the script is run
if __name__ == '__main__':
    runpod.serverless.start({'handler': handler })
```

This is a bare-bones handler that processes a JSON object and outputs a `prompt` string contained in the `input` object. You can replace the `time.sleep(seconds)` call with your own Python code for generating images, text, or running any machine learning workload.

## Step 3: Create a test input file

You'll need to create an input file to properly test your handler locally. Create a file named `test_input.json` and add the following code:

```json title="test_input.json"
{
    "input": {
        "prompt": "Hey there!"
    }
}
```

## Step 4: Test your handler locally

Run your handler to verify that it works correctly:

```bash
python rp_handler.py
```

You should see output similar to this:

```
--- Starting Serverless Worker |  Version 1.7.9 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'prompt': 'Hey there!'}, 'id': 'local_test'}
INFO   | local_test | Started.
Worker Start
Received prompt: Hey there!
Sleeping for 0 seconds...
DEBUG  | local_test | Handler output: Hey there!
DEBUG  | local_test | run_job return: {'output': 'Hey there!'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': 'Hey there!'}
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

:::note

Instead of building and pushing your image via Docker Hub, you can also [deploy your worker from a GitHub repository](/serverless/workers/github-integration).

:::

Before you can deploy your worker on RunPod Serverless, you need to push it to Docker Hub:

1. Build your Docker image, specifying the platform for RunPod deployment, replacing `[YOUR_USERNAME]` with your Docker username:

    ```bash
    docker build --platform linux/amd64 --tag [YOUR_USERNAME]/serverless-test .
    ```

2. Push the image to your container registry:

    ```bash
    docker push yourusername/serverless-test:latest
    ```

## Step 7: Deploy your worker using the RunPod console

To deploy your worker to a Serverless endpoint:

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) of the RunPod console.
2. Click **New Endpoint**.
3. Under **Custom Source**, select **Docker Image**, then click **Next**.
4. In the **Container Image** field, enter your Docker image URL: `docker.io/yourusername/serverless-test:latest`.
5. (Optional) Enter a custom name for your endpoint, or use the randomly generated name.
6. Under **Worker Configuration**, check the box for **16 GB** GPUs.
7. Leave the rest of the settings at their defaults.
8. Click **Create Endpoint**.

The system will redirect you to a dedicated detail page for your new endpoint.

## Step 8: Test your worker

To test your worker, click the **Requests** tab in the endpoint detail page:

<img src="/img/docs/serverless-get-started-endpoint-details.png" width="900" alt="Screenshot of the endpoint details page."/>

On the left you should see the default test request:

```json
{
    "input": {
        "prompt": "Hello World"
    }
}
```

Leave the default input as is and click **Run**. The system will take a few minutes to initialize your workers.

When the workers finish processing your request, you should see output on the right side of the page similar to this:

```json
{
    "delayTime": 15088,
    "executionTime": 60,
    "id": "04f01223-4aa2-40df-bdab-37e5caa43cbe-u1",
    "output": "Hello World",
    "status": "COMPLETED",
    "workerId": "uhbbfre73gqjwh"
}
```

Congratulations! You've successfully deployed and tested your first Serverless worker.

## Next steps

Now that you've learned the basics, you're ready to:

- [Create more advanced handler functions.](/serverless/workers/handler-functions)
- [Send endpoint requests using cURL and the Serverless SDK.](/serverless/endpoints/send-requests)
- [Learn how to use endpoint operations like `/run` and `/status`.](/serverless/endpoints/operations)
- [Manage your Serverless endpoints using the RunPod console.](/serverless/endpoints/manage-endpoints)
- [Configure your endpoints for optimal performance and cost.](/serverless/endpoints/endpoint-configurations)
- [Learn more about local testing.](/serverless/development/local-testing)
