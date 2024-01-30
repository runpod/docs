---
title: Concurrent Handlers
sidebar_position: 4
---

RunPod enables your Workers to handle multiple requests concurrently.
This document explains how to configure a RunPod Serverless Handler to efficiently manage and process multiple concurrent requests using the `concurrency_modifier` argument.

## Key Concepts

### Asynchronous Request Handling

RunPod supports [asynchronous functions](/serverless/Workers/handlers/handler-async) for request handling.
An asynchronous function allows a single Worker to manage multiple tasks concurrently by executing non-blocking operations and switching between tasks efficiently.

### Concurrency in Serverless

In a serverless environment, each Worker can process multiple requests simultaneously.
The degree of concurrency depends on the runtime's capacity and the available resources.

### `concurrency_modifier`

The `concurrency_modifier` is a configurable argument in `runpod.serverless.start` that dynamically determines the concurrency level of a Worker.
It adjusts the number of simultaneous tasks a Worker can handle, optimizing resource usage and performance.

## Implementation guide

<CH.Scrollycoding showCopyButton={true} rows="focus" showExpandButton={true}>

### Step 1: Asynchronous Handler Function

Define an asynchronous handler function to process incoming requests. This function should be capable of yielding results in batches for efficient processing.

<CH.Code>

```python handler.py
async def handler(job):
    # Process job and yield results
    # ...
```

</CH.Code>

---

### Step 2: Configure `concurrency_modifier`

Set the `concurrency_modifier` argument to a lambda function. This function should return the desired concurrency level based on the capabilities of the underlying processing engine or environmental factors.

<CH.Code>

```python handler.py
def concurrency_modifier(current_concurrency):
    return absolute_desired_concurrency
```

</CH.Code>

The function calculates the desired concurrency using the current concurrency as an input.

---

### Step 3: Start Serverless Function

Initialize the serverless function with the handler and `concurrency_modifier`.

<CH.Code>

```python handler.py focus=3
runpod.serverless.start({
    "handler": handler,
    "concurrency_modifier": concurrency_modifier
})
```

</CH.Code>

---

</CH.Scrollycoding>

## Example code

Here is an example demonstrating the setup for a RunPod Serverless Handler capable of handling multiple concurrent requests.

<CH.Code>

```python handler.py focus=1,9,18

import runpod
import asyncio
import random

# Simulated Metrics
request_rate = 0

def update_request_rate():
    global request_rate
    request_rate = random.randint(20, 100)

async def process_request(job):
    await asyncio.sleep(1)  # Simulate processing time
    return f"Processed: {job['data']}"

# Start the serverless function with the handler and concurrency modifier
runpod.serverless.start({
    "handler": process_request,
    "concurrency_modifier": lambda current_concurrency: min(10, max(1, current_concurrency + 1 if request_rate > 50 else current_concurrency - 1))
})
```

</CH.Code>

## Conclusion

Using the `concurrency_modifier` in RunPod, serverless functions can efficiently handle multiple requests concurrently, optimizing resource usage and improving performance. This approach allows for scalable and responsive serverless applications.
