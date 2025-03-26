---
title: "Step-by-step guide"
sidebar_position: 2
description: "Follow this detailed step-by-step guide to build and deploy a custom serverless endpoint on RunPod. Set up your development environment, create a handler, and deploy your application."
---

# Building a custom endpoint: Step-by-step

This comprehensive guide walks you through creating and deploying a custom serverless endpoint on RunPod from scratch. We'll build a simple application that you can later adapt for your specific needs.

## Prerequisites

Before you begin, make sure you have:
- A RunPod account ([Sign up here](https://www.runpod.io/console/serverless))
- Docker installed on your machine ([Get Docker](https://docs.docker.com/get-docker/))
- Python 3.10 or later
- Basic understanding of Python and Docker

## Step 1: Set up your development environment

1. Create a new directory for your project:
   ```bash
   mkdir my-serverless-app
   cd my-serverless-app
   ```

2. Create and activate a Python virtual environment:
   ```bash
   # Create virtual environment
   python3 -m venv venv

   # Activate it (macOS/Linux)
   source venv/bin/activate
   # OR (Windows)
   venv\Scripts\activate
   ```

3. Install the RunPod SDK:
   ```bash
   pip install runpod
   ```

## Step 2: Create your handler function

Create a file named `handler.py` with this basic template:

```python
import runpod

def handler(event):
    """
    Process requests sent to your serverless endpoint.
    This function is invoked when a request is sent to your endpoint.
    """
    try:
        # Get input from the request
        job_input = event["input"]
        
        # Process the input (customize this for your needs)
        # This is where your application logic goes
        result = {
            "message": f"Processed input: {job_input}",
            "status": "success",
            "timestamp": runpod.utils.get_utc_timestamp()
        }
        
        # Return the result
        return result
        
    except Exception as e:
        # Return error information if something goes wrong
        return {"error": str(e)}

# Start the serverless function
runpod.serverless.start({"handler": handler})
```

## Step 3: Create a test input file

Create a file named `test_input.json` to test your handler locally:

```json
{
    "input": {
        "message": "Hello, RunPod!",
        "parameter": 42
    }
}
```

## Step 4: Test locally

Run your handler locally to ensure it works correctly:

```bash
python handler.py
```

You should see output similar to:

```
--- Starting Serverless Worker | Version X.X.X ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'message': 'Hello, RunPod!', 'parameter': 42}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: {'message': "Processed input: {'message': 'Hello, RunPod!', 'parameter': 42}", 'status': 'success', 'timestamp': '2023-08-01T15:30:45Z'}
INFO   | Job local_test completed successfully.
INFO   | Local testing complete, exiting.
```

## Step 5: Containerize your application

1. Create a `Dockerfile`:
   ```dockerfile
   FROM python:3.10-slim

   WORKDIR /app
   
   # Install dependencies
   RUN pip install --no-cache-dir runpod
   
   # Copy your handler code
   COPY handler.py /app/
   COPY test_input.json /app/
   
   # Start the handler
   CMD ["python", "-u", "handler.py"]
   ```

2. Build your Docker image:
   ```bash
   docker build --platform linux/amd64 -t your-username/serverless-app:latest .
   ```

   Replace `your-username` with your Docker Hub username or registry prefix.

3. Test your container locally:
   ```bash
   docker run your-username/serverless-app:latest
   ```

4. Push to Docker Hub or your registry:
   ```bash
   docker push your-username/serverless-app:latest
   ```

## Step 6: Deploy to RunPod

1. Go to the [RunPod Serverless Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Enter your Docker image URL (e.g., `your-username/serverless-app:latest`)
4. Configure your endpoint:
   - **Name**: Choose a descriptive name for your endpoint
   - **GPU Type**: Select the appropriate GPU (or CPU) based on your needs
   - **Worker Count**: Set to 0 for scale-to-zero or 1+ to keep workers warm
   - **Max Workers**: Set the maximum number of concurrent workers
   - **Idle Timeout**: How long to keep workers alive after finishing a job
   - **Flash Boot**: Enable for faster cold starts (if needed)

5. Click "Deploy" to create your endpoint

## Step 7: Test your endpoint

Once deployed, you can test your endpoint using the RunPod console or with curl:

```bash
curl -X POST "https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "input": {
      "message": "Hello from API request!",
      "parameter": 100
    }
  }'
```

Replace `YOUR_ENDPOINT_ID` and `YOUR_API_KEY` with your actual values.

## Step 8: Monitor and adjust

1. Check the logs and metrics in the RunPod console
2. Adjust worker count and idle timeout based on your observed traffic patterns
3. Update your endpoint as needed by pushing new Docker images

## Next steps

Now that you've deployed your custom endpoint, you can:

- Add more complex processing logic to your handler function
- Integrate with machine learning models or other libraries
- Set up CI/CD for automated deployments
- Connect your endpoint to your applications

For advanced usage, explore:

- [Worker development](workers/overview.md)
- [Endpoint management](endpoints/manage-endpoints.md)
- [Configure autoscaling](manage/scaling.md)

> **Pro tip**: For local development, you can use our [example repository](https://github.com/runpod-workers/worker-basic) as a starting point.
