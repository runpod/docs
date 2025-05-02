---
title: "Build a concurrent handler"
description: "Learn how to implement concurrent handlers to process multiple requests simultaneously with a single worker."
sidebar_position: 5
---

# Build a concurrent handler

Learn how to implement concurrent handlers to process multiple requests simultaneously with a single worker.

## What you'll learn

In this guide you will learn how to:

- Create an asynchronous handler function.
- Create a concurrency modifier to dynamically adjust concurrency levels.
- Optimize worker resources based on request patterns.
- Test your concurrent handler locally.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've installed the RunPod SDK (`pip install runpod`).
- You know how to build a [basic handler function](/serverless/workers/handler-functions).

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

# Global variable to simulate a varying request rate
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

# Placeholder code for a dynamic concurrency adjustment function 
def adjust_concurrency(current_concurrency):
    return 50

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

The `process_request` function uses the `async` keyword, enabling it to use non-blocking I/O operations with `await`. This allows the function to pause during I/O operations (simulated with `asyncio.sleep()`) and handle other requests while waiting.

The `update_request_rate` function simulates monitoring request patterns for adaptive scaling. This example uses a simple random number generator to simulate changing request patterns. In a production environment, you would:
    - Track actual request counts and response times.
    - Monitor system resource usage, such as CPU and memory.
    - Adjust concurrency based on real performance metrics.

## Step 3: Implement dynamic concurrency adjustment

Let's enhance our handler with dynamic concurrency adjustment. This will allow your worker to handle more requests during high traffic periods and conserve resources during low traffic periods.

Replace the placeholder `adjust_concurrency` function with this improved version:

```python
def adjust_concurrency(current_concurrency):
    """
    Dynamically adjust the worker's concurrency level based on request load.
    
    Args:
        current_concurrency (int): The current concurrency level
        
    Returns:
        int: The new concurrency level
    """
    global request_rate
    
    # In production, this would use real metrics
    update_request_rate()
    
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
```

Let's break down how this function works:

1. **Control parameters**: 
   - `max_concurrency = 10`: Sets an upper limit on concurrency to prevent resource exhaustion.
   - `min_concurrency = 1`: Ensures at least one request can be processed at a time.
   - `high_request_rate_threshold = 50`: Defines when to consider traffic "high".

   You can adjust these parameters based on your specific workload.


2. **Scaling up logic**:

   ```python
   if (request_rate > high_request_rate_threshold and 
       current_concurrency < max_concurrency):
       return current_concurrency + 1
   ```

   This increases concurrency by 1 when:
   - The request rate exceeds our threshold (50 requests).
   - We haven't reached our maximum concurrency limit.

3. **Scaling down logic**:
   ```python
   elif (request_rate <= high_request_rate_threshold and 
         current_concurrency > min_concurrency):
       return current_concurrency - 1
   ```

   This decreases concurrency by 1 when:
   - The request rate is at or below our threshold.
   - We're above our minimum concurrency level.

4. **Default behavior**:
   ```python
   return current_concurrency
   ```
   If neither condition is met, maintain the current concurrency level.

With these enhancements, your concurrent handler will now dynamically adjust its concurrency level based on the observed request rate, optimizing resource usage and responsiveness.

## Step 4: Create a test input file

Now we're ready to test our handler. Create a file named `test_input.json` to test your handler locally:

```json title="test_input.json"
{
    "input": {
        "message": "Test concurrent processing",
        "delay": 0.5
    }
}
```

## Step 5: Test your handler locally

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

## (Optional) Step 6: Implement real metrics collection

In a production environment, you should to replace the `update_request_rate` function with real metrics collection. Here is an example how you could built this functionality:

```python
def update_request_rate(request_history):
    """Collects real metrics about request patterns."""
    global request_rate
    
    # Option 1: Track request count over a time window
    current_time = time.time()
    # Count requests in the last minute
    recent_requests = [r for r in request_history if r > current_time - 60]
    request_rate = len(recent_requests)
    
    # Option 2: Use an exponential moving average
    # request_rate = 0.9 * request_rate + 0.1 * new_requests
    
    # Option 3: Read from a shared metrics service like Redis
    # request_rate = redis_client.get('recent_request_rate')
```

## Next steps

Now that you've created a concurrent handler, you're ready to:

- [Package and deploy your handler as a Serverless worker.](/serverless/workers/deploy)
- [Add error handling for more robust processing.](/serverless/workers/handler-functions#error-handling)
- [Implement streaming responses with generator functions.](/serverless/workers/handler-functions#generator-handlers)
- [Configure your endpoint for optimal performance.](/serverless/endpoints/endpoint-configurations)
