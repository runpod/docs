---
title: Create your first endpoint
description: "Build and deploy your own custom serverless endpoint on RunPod. Learn to set up your environment, create a handler function, and deploy your container to RunPod Serverless."
sidebar_position: 1
---

# Create your first endpoint

In this guide, you'll learn how to build and deploy a custom serverless endpoint that can process any type of data.

## Prerequisites

Before you begin, make sure you have:

- A RunPod account ([Sign up here](https://www.runpod.io/console/serverless))
- Docker installed on your machine ([Get Docker](https://docs.docker.com/get-docker/))
- Python 3.10 or later
- Basic Python knowledge

## Step 1: Set up your project

1. Create a new directory for your project:

```bash
mkdir my-runpod-endpoint
cd my-runpod-endpoint
```

2. Create a Python virtual environment:

```bash
# Create the virtual environment
python -m venv venv

# Activate it (macOS/Linux)
source venv/bin/activate

# Or on Windows
# venv\Scripts\activate
```

3. Install the RunPod Python SDK:

```bash
pip install runpod
```

## Step 2: Create a handler function

Create a file named `handler.py` with this basic template:

```python
import runpod

def handler(event):
    """
    This function is called when a request is sent to your endpoint.
    """
    # Get the input from the request
    job_input = event["input"]
    
    # Process the input
    # Replace this with your actual processing logic
    result = {
        "message": f"Received input: {job_input}",
        "processed": True,
        "timestamp": runpod.utils.get_utc_timestamp()
    }
    
    # Return the result
    return result

# Start the serverless function
runpod.serverless.start({"handler": handler})
```

## Step 3: Create a test input file

Create a file named `test_input.json` to test your handler locally:

```json
{
    "input": {
        "text": "Hello, RunPod!",
        "parameter": 42
    }
}
```

## Step 4: Test your handler locally

Run your handler locally to make sure it works:

```bash
python handler.py
```

You should see output that looks like:

```
--- Starting Serverless Worker | Version X.X.X ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'text': 'Hello, RunPod!', 'parameter': 42}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: {'message': "Received input: {'text': 'Hello, RunPod!', 'parameter': 42}", 'processed': True, 'timestamp': '2023-08-01T15:30:45Z'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': {'message': "Received input: {'text': 'Hello, RunPod!', 'parameter': 42}", 'processed': True, 'timestamp': '2023-08-01T15:30:45Z'}}
INFO   | Local testing complete, exiting.
```

## Step 5: Create a Dockerfile

Create a `Dockerfile` to package your handler:

```dockerfile
FROM python:3.10-slim

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir runpod

# Copy handler code
COPY handler.py /app/
COPY test_input.json /app/

# Start the handler
CMD ["python", "-u", "handler.py"]
```

## Step 6: Build and push your Docker image

1. Build your Docker image:

```bash
docker build -t username/my-runpod-endpoint:latest .
```

Replace `username` with your Docker Hub username or container registry prefix.

2. Push your image to Docker Hub or your container registry:

```bash
docker push username/my-runpod-endpoint:latest
```

## Step 7: Deploy to RunPod

1. Go to the [RunPod Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Enter your Docker image URL
4. Configure your endpoint:
   - **Name**: Choose a descriptive name
   - **GPU Type**: Select a GPU type (or CPU)
   - **Min/Max Workers**: Set scaling parameters
   - **Idle Timeout**: How long to keep workers running after inactivity

5. Click "Deploy"

## Step 8: Test your endpoint

Once deployed, you can test your endpoint using the RunPod console or with a curl request:

```bash
curl -X POST "https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "input": {
      "text": "Hello from API request!",
      "parameter": 100
    }
  }'
```

Replace `YOUR_ENDPOINT_ID` and `YOUR_API_KEY` with your actual values.

## Next steps

Now that you've created your first endpoint, you might want to:

- [Learn about handler functions](/docs/serverless/build/handler-functions) - More advanced handler patterns
- [Build a custom worker](/docs/serverless/build/custom-workers) - Create workers with custom dependencies
- [Start from a template](/docs/serverless/build/from-template) - Use starter templates for different use cases
- [Configure autoscaling](/docs/serverless/manage/scaling) - Optimize for performance and cost 