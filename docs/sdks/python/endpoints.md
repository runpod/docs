---
title: Endpoints
description: "Learn how to use the RunPod Python SDK to interact with various endpoints, perform synchronous and asynchronous operations, stream data, and check endpoint health. Discover how to set your Endpoint Id, run jobs, and cancel or purge queues with this comprehensive guide."
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

In most situations, you'll set a variable name `endpoint` on the `Endpoint` class.
This allows you to use the following methods or instances variables from the `Endpoint` class:

- [health](#health-check)
- [purge_queue](#purge-queue)
- [run_sync](#run-synchronously)
- [run](#run-asynchronously)

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
            "prompt": "Hello, world!",
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

input_payload = {"prompt": "Hello, World!"}

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")
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
        endpoint = AsyncioEndpoint("YOUR_ENDPOINT_ID", session)
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


if __name__ == "__main__":
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

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

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

:::note

The maximum size for a payload that can be sent using yield to stream results is 1 MB.

:::

## Status

Returns the status of the Job request.
Set the `status()` function on the run request to return the status of the Job.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {"input": {"prompt": "Hello, World!"}}

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")
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

## Cancel

You can cancel a Job request by using the `cancel()` function on the run request.
You might want to cancel a Job because it's stuck with a status of `IN_QUEUE` or `IN_PROGRESS`, or because you no longer need the result.

The following pattern cancels a job given a human interaction, for example pressing `Ctrl+C` in the terminal.

This sends a `SIGINT` signal to the running Job by catching the `KeyboardInterrupt` exception.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import time
import runpod

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {
    "messages": [{"role": "user", "content": f"Hello, World"}],
    "max_tokens": 2048,
    "use_openai_format": True,
}

try:
    endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")
    run_request = rp_endpoint.run(input_payload)

    while True:
        status = run_request.status()
        print(f"Current job status: {status}")

        if status == "COMPLETED":
            output = run_request.output()
            print("Job output:", output)

            generated_text = (
                output.get("choices", [{}])[0].get("message", {}).get("content")
            )
            print(generated_text)
            break
        elif status in ["FAILED", "ERROR"]:
            print("Job failed to complete successfully.")
            break
        else:
            time.sleep(10)
except KeyboardInterrupt:  # Catch KeyboardInterrupt
    print("KeyboardInterrupt detected. Canceling the job...")
    if run_request:  # Check if a job is active
        run_request.cancel()
    print("Job canceled.")
```

</TabItem>
  <TabItem value="output" label="Output">

```json
Current job status: IN_QUEUE
Current job status: IN_PROGRESS
KeyboardInterrupt detected. Canceling the job...
Job canceled.
```

</TabItem>

</Tabs>

### Timeout

Use the `cancel()` function and the `timeout` argument to cancel the Job after a specified time.

In the previous `cancel()` example, the Job is canceled due to an external condition.
In this example, you can cancel a running Job that has taken too long to complete.

<Tabs>
  <TabItem value="python" label="Python" default>

```python
from time import sleep
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

input_payload = {"input": {"prompt": "Hello, World!"}}

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")


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

## Purge queue

You can purge all jobs from a queue by using the `purge_queue()` function.
You can provide the `timeout` parameter to specify how long to wait for the server to respond before purging the queue.

`purge_queue()` doesn't affect Jobs in progress.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

endpoint.purge_queue(timeout=3)
```
