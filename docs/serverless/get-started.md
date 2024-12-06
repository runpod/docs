---
title: "Get started with Endpoints"
sidebar_position: 2
description: Master the art of building Docker images, deploying Serverless endpoints, and sending requests with this comprehensive guide, covering prerequisites, RunPod setup, and deployment steps.
---

## Overview

You'll have an understanding of building a Docker image, deploying a Serverless endpoint, and sending a request.
You'll also have a basic understanding of how to customize the handler for your use case.

## Prerequisites

This section presumes you have an understanding of the terminal and can execute commands from your terminal.

### RunPod

To continue with this quick start, you'll need the following from RunPod:

- RunPod account
- RunPod API Key

### Docker

To build your Docker image, you'll need the following:

- Docker installed
- Docker account

### GitHub

To clone the `worker-template` repo, you'll need access to the following:

- Git installed
- Permissions to clone GitHub repos

## Build a Serverless Application on RunPod

Follow these steps to create a handler file, test it locally, and build a Docker image for deployment:

1. Create the handler file (rp_handler.py):

```python
import runpod
import time

def handler(event):
    input = event['input']
    instruction = input.get('instruction')
    seconds = input.get('seconds', 0)

    # Placeholder for a task; replace with image or text generation logic as needed
    time.sleep(seconds)
    result = instruction.replace(instruction.split()[0], 'created', 1)

    return result

if __name__ == '__main__':
    runpod.serverless.start({'handler': handler})
```

2. Create a test_input.json file in the same folder:

```python
{
    "input": {
        "instruction": "create a image",
        "seconds": 15
    }
}
```

3. Test the handler code locally:

```python
python3 rp_handler.py

# You should see an output like this:
--- Starting Serverless Worker |  Version 1.7.0 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'instruction': 'create a image', 'seconds': 15}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: created a image
DEBUG  | local_test | run_job return: {'output': 'created a image'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': 'created a image'}
INFO   | Local testing complete, exiting.
```

4. Create a Dockerfile:

```docker
FROM python:3.10-slim

WORKDIR /
RUN pip install --no-cache-dir runpod
COPY rp_handler.py /

# Start the container
CMD ["python3", "-u", "rp_handler.py"]
```

5. Build and push your Docker image

```command
docker build --platform linux/amd64 --tag <username>/<repo>:<tag> .
```

6. Push to your container registry:

```command
docker push <username>/<repo>:<tag>
```

:::note

When building your docker image, you might need to specify the platform you are building for.
This is important when you are building on a machine with a different architecture than the one you are deploying to.

When building for RunPod providers use `--platform=linux/amd64`.

:::

Alternatively, you can clone our [worker-template](https://github.com/runpod-workers/worker-template) repository to quickly build a Docker image and push it to your container registry for a faster start.

Now that you've pushed your container registry, you're ready to deploy your Serverless Endpoint to RunPod.

## Deploy a Serverless Endpoint

This step will walk you through deploying a Serverless Endpoint to RunPod.
You can refer to this walkthrough to deploy your own custom Docker image.

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select your GPU configuration.
   3. Configure the number of Workers.
   4. (optional) Select **FlashBoot**.
   5. (optional) Select a template.
   6. Enter the name of your Docker image.
      - For example `<username>/<repo>:<tag>`.
   7. Specify enough memory for your Docker image.
4. Select **Deploy**.

Now, let's send a request to your [Endpoint](/serverless/endpoints/get-started).
