---
title: Concurrent handlers
description: "RunPod's concurrency functionality enables efficient task handling through asynchronous requests, allowing a single worker to manage multiple tasks concurrently. The concurrency_modifier configures the worker's concurrency level to optimize resource consumption and performance."
---

RunPod supports asynchronous functions for request handling, enabling a single worker to manage multiple tasks concurrently through non-blocking operations. This capability allows for efficient task switching and resource utilization.

Serverless architectures allow each worker to process multiple requests simultaneously, with the level of concurrency being contingent upon the runtime's capacity and the resources at its disposal.

## Configure concurrency modifier

The `concurrency_modifier` is a configuration option within `runpod.serverless.start` that dynamically adjusts a worker's concurrency level. This adjustment enables the optimization of resource consumption and performance by regulating the number of tasks a worker can handle concurrently.

### Step 1: Define an asynchronous handler function

Create an asynchronous function dedicated to processing incoming requests.
This function should efficiently yield results, ideally in batches, to enhance throughput.

```python
async def process_request(job):
    # Simulates processing delay
    await asyncio.sleep(1)
    return f"Processed: {job['input']}"
```

### Step 2: Set up the `concurrency_modifier` function

Implement a function to adjust the worker's concurrency level based on the current request load.
This function should consider the maximum and minimum concurrency levels, adjusting as needed to respond to fluctuations in request volume.

```python
def adjust_concurrency(current_concurrency):
    """
    Dynamically adjusts the concurrency level based on the observed request rate.
    """
    global request_rate
    update_request_rate()  # Placeholder for request rate updates

    max_concurrency = 10  # Maximum allowable concurrency
    min_concurrency = 1  # Minimum concurrency to maintain
    high_request_rate_threshold = 50  # Threshold for high request volume

    # Increase concurrency if under max limit and request rate is high
    if (
        request_rate > high_request_rate_threshold
        and current_concurrency < max_concurrency
    ):
        return current_concurrency + 1
    # Decrease concurrency if above min limit and request rate is low
    elif (
        request_rate <= high_request_rate_threshold
        and current_concurrency > min_concurrency
    ):
        return current_concurrency - 1

    return current_concurrency
```

### Step 3: Initialize the Serverless function

Start the Serverless function with the defined handler and `concurrency_modifier` to enable dynamic concurrency adjustment.

```python
runpod.serverless.start(
    {
        "handler": process_request,
        "concurrency_modifier": adjust_concurrency,
    }
)
```

---

## Example code

Here is an example demonstrating the setup for a RunPod Serverless function capable of handling multiple concurrent requests.

```python
import runpod
import asyncio
import random

# Simulated Metrics
request_rate = 0


async def process_request(job):
    await asyncio.sleep(1)  # Simulate processing time
    return f"Processed: { job['input'] }"


def adjust_concurrency(current_concurrency):
    """
    Adjusts the concurrency level based on the current request rate.
    """
    global request_rate
    update_request_rate()  # Simulate changes in request rate

    max_concurrency = 10
    min_concurrency = 1
    high_request_rate_threshold = 50

    if (
        request_rate > high_request_rate_threshold
        and current_concurrency < max_concurrency
    ):
        return current_concurrency + 1
    elif (
        request_rate <= high_request_rate_threshold
        and current_concurrency > min_concurrency
    ):
        return current_concurrency - 1
    return current_concurrency


def update_request_rate():
    """
    Simulates changes in the request rate to mimic real-world scenarios.
    """
    global request_rate
    request_rate = random.randint(20, 100)


# Start the Serverless function with the handler and concurrency modifier
runpod.serverless.start(
    {"handler": process_request, "concurrency_modifier": adjust_concurrency}
)
```

Using the `concurrency_modifier` in RunPod, Serverless functions can efficiently handle multiple requests concurrently, optimizing resource usage and improving performance. This approach allows for scalable and responsive Serverless applications.
