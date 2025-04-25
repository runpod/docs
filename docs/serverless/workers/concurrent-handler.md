---
title: "Build a concurrent handler"
description: "Learn how to implement concurrent handlers to process multiple requests simultaneously with a single worker."
sidebar_position: 5
---

# Build a concurrent handler

Learn how to implement concurrent handlers to process multiple requests simultaneously with a single worker.

## What you'll learn

In this guide you'll learn how to:

- Create an asynchronous handler function.
- Implement a concurrency modifier to dynamically adjust concurrency levels.
- Optimize worker resources based on request patterns.
- Deploy and test your concurrent handler.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've installed the RunPod SDK (`pip install runpod`).
- Basic understanding of Python's `asyncio` library.

## Step 1: Set up your environment

First, set up a virtual environment and install the necessary packages:

```bash
# Create a Python virtual environment
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install runpod asyncio
```

## Step 2: Create a concurrent handler file

Create a file named `concurrent_handler.py` and add the following code:

```python title="concurrent_handler.py"
import runpod
import asyncio
import random

# Simulated metrics
request_rate = 0

async def process_request(job):
    """
    This function processes incoming requests concurrently.
    
    Args:
        job (dict): Contains the input data and request metadata
        
    Returns:
        str: The processed result
    """
    
    # Extract input data
    job_input = job["input"]
    delay = job_input.get("delay", 1)
    
    # Simulate an asynchronous task (like a database query or API call)
    await asyncio.sleep(delay)
    
    return f"Processed: {job_input}"

def adjust_concurrency(current_concurrency):
    """
    Dynamically adjusts the worker's concurrency level based on request load.
    
    Args:
        current_concurrency (int): The current concurrency level
        
    Returns:
        int: The new concurrency level
    """
    global request_rate
    update_request_rate()  # In production, this would use real metrics
    
    max_concurrency = 10  # Maximum allowable concurrency
    min_concurrency = 1   # Minimum concurrency to maintain
    high_request_rate_threshold = 50  # Threshold for high request volume
    
    # Increase concurrency if under max limit and request rate is high
    if (request_rate > high_request_rate_threshold and 
        current_concurrency < max_concurrency):
        return current_concurrency + 1
    # Decrease concurrency if above min limit and request rate is low
    elif (request_rate <= high_request_rate_threshold and 
          current_concurrency > min_concurrency):
        return current_concurrency - 1
    
    return current_concurrency

def update_request_rate():
    """Simulates changes in the request rate to mimic real-world scenarios."""
    global request_rate
    request_rate = random.randint(20, 100)

# Start the Serverless function when the script is run
if __name__ == "__main__":
    runpod.serverless.start({
        "handler": process_request,
        "concurrency_modifier": adjust_concurrency
    })
```

This handler demonstrates the key components of a concurrent handler:

1. **Asynchronous handler function**: Processes requests concurrently using `async/await`.
2. **Concurrency modifier**: Dynamically adjusts the concurrency level based on load.
3. **Metrics tracking**: Simulates monitoring request patterns for adaptive scaling.

## Step 3: Create a test input file

Create a file named `test_input.json` to test your handler locally:

```json title="test_input.json"
{
    "input": {
        "message": "Test concurrent processing",
        "delay": 0.5
    }
}
```

## Step 4: Test your handler locally

Run your handler to verify that it works correctly:

```bash
python concurrent_handler.py
```

You should see output similar to this:

```
--- Starting Serverless Worker |  Version 1.7.9 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'message': 'Test concurrent processing', 'delay': 0.5}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: Processed: {'message': 'Test concurrent processing', 'delay': 0.5}
DEBUG  | local_test | run_job return: {'output': "Processed: {'message': 'Test concurrent processing', 'delay': 0.5}"}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': "Processed: {'message': 'Test concurrent processing', 'delay': 0.5}"}
INFO   | Local testing complete, exiting.
```

## Step 5: Create a Dockerfile

Create a file named `Dockerfile` with the following content:

```dockerfile
FROM python:3.10-slim

WORKDIR /

# Install dependencies
RUN pip install --no-cache-dir runpod asyncio

# Copy your handler file
COPY concurrent_handler.py /

# Start the container
CMD ["python3", "-u", "concurrent_handler.py"]
```

## Step 6: Build and push your Docker image

1. Build your Docker image, specifying the platform for RunPod deployment:

    ```bash
    docker build --platform linux/amd64 --tag yourusername/concurrent-handler:latest .
    ```

    :::note

    When building your Docker image, you must specify the platform as `linux/amd64` or it won't work on Serverless.

    :::

2. Then push the image to your container registry:

    ```bash
    docker push yourusername/concurrent-handler:latest
    ```

## Step 7: Deploy your worker using the RunPod console

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) of the RunPod console.
2. Click **New Endpoint**.
3. Under **Custom Source**, select **Docker Image**, then click **Next**.
4. In the **Container Image** field, enter your Docker image URL: `docker.io/yourusername/concurrent-handler:latest`.
5. (Optional) Enter a custom name for your endpoint, or use the randomly generated name.
6. Under **Worker Configuration**, check the box for the appropriate GPU (or CPU-only if your workload doesn't require GPU).
7. Click **Create Endpoint**.

## Step 8: Test your concurrent handler

To test your worker, send multiple requests to your endpoint:

1. Navigate to the **Requests** tab in your endpoint detail page.
2. Use the following test request:

```json
{
    "input": {
        "message": "Concurrent test",
        "delay": 2
    }
}
```

3. Click **Run** multiple times in quick succession to simulate concurrent requests.
4. Observe how the worker processes multiple requests without waiting for each to complete.

## Understanding the components

### Asynchronous handler

The `process_request` function is defined with the `async` keyword, allowing it to use non-blocking I/O operations with `await`. This enables the function to "pause" during I/O operations (simulated with `asyncio.sleep()`) and handle other requests while waiting.

### Concurrency modifier

The `adjust_concurrency` function:
- Takes the current concurrency level as input
- Checks the current request rate
- Increases concurrency when traffic is high (above 50 requests in this example)
- Decreases concurrency when traffic is low
- Respects minimum (1) and maximum (10) concurrency limits
- Returns the adjusted concurrency level

### Metrics tracking

In this example, we use a simple random number generator to simulate changing request patterns. In a production environment, you would:
- Track actual request counts and response times
- Monitor system resource usage (CPU, memory, etc.)
- Adjust concurrency based on real performance metrics

## Benefits of concurrent handlers

1. **Improved throughput**: Process more requests with fewer workers.
2. **Cost optimization**: Maximize worker utilization before scaling to additional workers.
3. **Reduced latency**: Start processing new requests immediately while waiting on I/O operations.
4. **Dynamic scaling**: Adjust concurrency based on actual workload patterns.

## Best practices

- Use concurrent handlers for I/O-bound operations, not CPU-bound tasks.
- Be mindful of memory usage when increasing concurrency.
- Test thoroughly to determine optimal concurrency levels for your specific workload.
- Use proper error handling to prevent one failing request from affecting others.
- Monitor and adjust the concurrency parameters based on real-world performance.

## Next steps

Now that you've implemented a concurrent handler, you can:

- [Add error handling for more robust processing](/serverless/handlers/handler-error-handling).
- [Implement streaming responses with generator functions](/serverless/handlers/handler-generator).
- [Configure your endpoint for optimal performance](/serverless/endpoints/endpoint-configurations).
- [Integrate with external services for more complex workflows](/serverless/endpoints/send-requests).