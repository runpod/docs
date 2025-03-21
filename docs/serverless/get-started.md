---
title: "Get started with Endpoints"
sidebar_position: 2
description: Master the art of building Docker images, deploying Serverless endpoints, and sending requests with this comprehensive guide, covering prerequisites, RunPod setup, and deployment steps.
---

## Build a Serverless Application on RunPod

Follow these steps to set up a development environment, create a handler file, test it locally, and build a Docker image for deployment:

1. Create a Python virtual environment and install RunPod SDK

```bash
# 1. Create a Python virtual environment
python3 -m venv venv

# 2. Activate the virtual environment
# On macOS/Linux:

source venv/bin/activate

# On Windows:
venv\Scripts\activate

# 3. Install the RunPod SDK
pip install runpod
```

2. Create the handler file (rp_handler.py):

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

3. Create a test_input.json file in the same folder:

```python
{
    "input": {
        "instruction": "create a image",
        "seconds": 15
    }
}
```

4. Test the handler code locally:

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

5. Create a Dockerfile:

```docker
FROM python:3.10-slim

WORKDIR /
RUN pip install --no-cache-dir runpod
COPY rp_handler.py /

# Start the container
CMD ["python3", "-u", "rp_handler.py"]
```

6. Build and push your Docker image

```command
docker build --platform linux/amd64 --tag <username>/<repo>:<tag> .
```

7. Push to your container registry:

```command
docker push <username>/<repo>:<tag>
```

:::note

When building your docker image, you might need to specify the platform you are building for.
This is important when you are building on a machine with a different architecture than the one you are deploying to.

When building for RunPod providers use `--platform=linux/amd64`.

:::

Alternatively, you can clone our [worker-basic](https://github.com/runpod-workers/worker-basic) repository to quickly build a Docker image and push it to your container registry for a faster start.

Now that you've pushed your container registry, you're ready to deploy your Serverless Endpoint to RunPod.

## Deploy a Serverless Endpoint

This step will walk you through deploying a Serverless Endpoint to RunPod. You can refer to this walkthrough to deploy your own custom Docker image.

<iframe
    src="https://app.tango.us/app/embed/7df17d43-9467-4d09-9b0f-19eba8a17249"
    sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
    security="restricted"
    title="Deploy your first serverless endpoint"
    width="100%"
    height="600px"
    referrerpolicy="strict-origin-when-cross-origin"
    frameborder="0"
    webkitallowfullscreen="webkitallowfullscreen"
    mozallowfullscreen="mozallowfullscreen"
    allowfullscreen
></iframe>
