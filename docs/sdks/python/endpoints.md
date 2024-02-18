---
title: Endpoints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This documentation provides detailed instructions on how to use the RunPod Python SDK to interact with various endpoints.
You can perform synchronous and asynchronous operations, stream data, and check the health status of endpoints.

## Prerequisites

Before using the RunPod Python, ensure that you have:

- Installed the RunPod Python SDK.
- Configured your API key.

## Set your Endpoint Id

Pass your Endpoint Id on the `Endpoint` class.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")
```

This allows all calls to pass through your Endpoint Id with a valid API key.

## Run the Endpoint

Run the Endpoint with the either the asynchronous `run` or synchronous `run_sync` method.

Choosing between asynchronous and synchronous execution hinges on your task's needs and application design.

- **Asynchronous methods**: Choose the asynchronous method for handling tasks efficiently, especially when immediate feedback isn't crucial.
  They allow your application to stay responsive by running time-consuming operations in the background, ideal for:
  - **Non-blocking calls**: Keep your application active while waiting on long processes.
  - **Long-running operations**: Avoid timeouts on tasks over 30 seconds, letting your app's workflow continue smoothly.
  - **Job tracking**: Get a Job Id to monitor task status, useful for complex or delayed-result operations.

- **Synchronous methods**: Choose the synchronous method for these when your application requires immediate results from operations.
  They're best for:
  - **Immediate results**: Necessary for operations where quick outcomes are essential to continue with your app's logic.
  - **Short operations**: Ideal for tasks under 30 seconds to prevent application delays.
  - **Simplicity and control**: Provides a straightforward execution process, with timeout settings for better operational control.

### Run synchronously

To execute an endpoint synchronously and wait for the result, use the `run_sync` method.
This method blocks the execution until the endpoint run is complete or until it times out.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

try:
    run_request = endpoint.run_sync(
        {
            "input": {
                "prompt": "Hello, world!",
            }
        },
        timeout=60,  # Timeout in seconds.
    )

    print(run_request)
except TimeoutError:
    print("Job timed out.")
```

### Run asynchronously

Asynchronous execution allows for non-blocking operations, enabling your code to perform other tasks while waiting for an operation to complete.
RunPod supports both standard asynchronous execution and advanced asynchronous programming with Python's [asyncio](https://docs.python.org/3/library/asyncio.html) framework.

Depending on your application's needs, you can choose the approach that best suits your scenario.

For non-blocking operations, use the `run` method.
This method allows you to start an endpoint run and then check its status or wait for its completion at a later time.

#### Asynchronous execution

This executes a standard Python environment without requiring an asynchronous event loop.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {"input": {"prompt": "Hello, World!"}}

try:
    endpoint = runpod.Endpoint("n74gtin2lgmieh")
    run_request = endpoint.run(input_payload)

    # Initial check without blocking, useful for quick tasks
    status = run_request.status()
    print(f"Initial job status: {status}")

    if status != "COMPLETED":
        # Polling with timeout for long-running tasks
        output = run_request.output(timeout=60)
    else:
        output = run_request.output()
    print(f"Job output: {output}")
except Exception as e:
    print(f"An error occurred: {e}")
```

</TabItem>
  <TabItem value="output" label="Output">

```text
Initial job status: IN_QUEUE
Job output: {'input_tokens': 24, 'output_tokens': 16, 'text': ["Hello! How may I assist you today?\n"]}
```

</TabItem>

</Tabs>

#### Asynchronous execution with asyncio

Use Python's `asyncio` library for handling concurrent Endpoint calls efficiently.
This method embraces Python's asyncio framework for asynchronous programming, requiring functions to be defined with async and called with await.
This approach is inherently non-blocking and is built to handle concurrency efficiently.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import asyncio
import aiohttp
import os
import runpod
from runpod import AsyncioEndpoint, AsyncioJob

# asyncio.set_event_loop_policy(asyncio.WindowsSelectorEventLoopPolicy())  # For Windows users.


runpod.api_key = os.getenv("RUNPOD_API_KEY")


async def main():
    async with aiohttp.ClientSession() as session:
        input_payload = {"prompt": "Hello, World!"}
        endpoint = AsyncioEndpoint("va4k04wy48gk9a", session)
        job: AsyncioJob = await endpoint.run(input_payload)

        # Polling job status
        while True:
            status = await job.status()
            print(f"Current job status: {status}")
            if status == "COMPLETED":
                output = await job.output()
                print("Job output:", output)
                break  # Exit the loop once the job is completed.
            elif status in ["FAILED"]:
                print("Job failed or encountered an error.")

                break
            else:
                print("Job in queue or processing. Waiting 3 seconds...")
                await asyncio.sleep(3)  # Wait for 3 seconds before polling again


asyncio.run(main())
```

</TabItem>
  <TabItem value="output" label="Output">

```text
Current job status: IN_QUEUE
Job in queue or processing. Waiting 3 seconds...
Current job status: COMPLETED
Job output: {'input_tokens': 24, 'output_tokens': 16, 'text': ['Hello! How may I assist you today?\n']}
```

</TabItem>

</Tabs>

## Health check

Monitor the health of an endpoint by checking its status, including jobs completed, failed, in progress, in queue, and retried, as well as the status of workers.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import json
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

endpoint = runpod.Endpoint("gwp4kx5yd3nur1")

endpoint_health = endpoint.health()

print(json.dumps(endpoint_health, indent=2))
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "jobs": {
    "completed": 100,
    "failed": 0,
    "inProgress": 0,
    "inQueue": 0,
    "retried": 0
  },
  "workers": {
    "idle": 1,
    "initializing": 0,
    "ready": 1,
    "running": 0,
    "throttled": 0
  }
}
```

</TabItem>

</Tabs>

## Streaming

To enable streaming, your handler must support the `"return_aggregate_stream": True` option on the `start` method of your Handler.
Once enabled, use the `stream` method to receive data as it becomes available.

<Tabs>
  <TabItem value="endpoint" label="Endpoint">

```python
import runpod

runpod.api_key = os.getenv("RUNPOD_API_KEY")

endpoint = runpod.Endpoint("y8nqc2llx72yyy")

run_request = endpoint.run(
    {
        "input": {
            "prompt": "Hello, world!",
        }
    }
)

for output in run_request.stream():
    print(output)
```

</TabItem>
  <TabItem value="handler" label="Handler" default>

```python
from time import sleep
import runpod


def handler(job):
    job_input = job["input"]["prompt"]

    for i in job_input:
        sleep(1)  # sleep for 1 second for effect
        yield i


runpod.serverless.start(
    {
        "handler": handler,
        "return_aggregate_stream": True,  # Ensures aggregated results are streamed back
    }
)
```

</TabItem>

</Tabs>

## Status

Returns the status of the Job request.
Set the `status()` function on the run request to return the status of the Job.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {"input": {"prompt": "Hello, World!"}}

try:
    endpoint = runpod.Endpoint("n74gtin2lgmieh")
    run_request = endpoint.run(input_payload)

    # Initial check without blocking, useful for quick tasks
    status = run_request.status()
    print(f"Initial job status: {status}")

    if status != "COMPLETED":
        # Polling with timeout for long-running tasks
        output = run_request.output(timeout=60)
    else:
        output = run_request.output()
    print(f"Job output: {output}")
except Exception as e:
    print(f"An error occurred: {e}")
```

</TabItem>
  <TabItem value="output" label="Output">

```text
Initial job status: IN_QUEUE
Job output: Hello, World!
```

</TabItem>
</Tabs>

## Timeout

Use the `cancel()` function and the `timeout` argument to cancel the Job after a specified time.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from time import sleep
import runpod

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {"input": {"prompt": "Hello, World!"}}

endpoint = runpod.Endpoint("n74gtin2lgmieh")


# Submit the job request
run_request = endpoint.run(input_payload)

# Retrieve and print the initial job status
initial_status = run_request.status()
print(f"Initial job status: {initial_status}")

# Attempt to cancel the job after a specified timeout period (in seconds)
# Note: This demonstrates an immediate cancellation for demonstration purposes.
# Typically, you'd set the timeout based on expected job completion time.
run_request.cancel(timeout=3)

# Wait for the timeout period to ensure the cancellation takes effect
sleep(3)
print("Sleeping for 3 seconds to allow for job cancellation...")

# Check and print the job status after the sleep period
final_status = run_request.status()
print(f"Final job status: {final_status}")
```

</TabItem>
  <TabItem value="output" label="Output">

```text
Initial job status: IN_QUEUE
Sleeping for 3 seconds to allow for job cancellation...
Final job status: CANCELLED
```

</TabItem>

</Tabs>
