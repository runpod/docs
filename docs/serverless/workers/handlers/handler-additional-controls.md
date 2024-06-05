---
title: "Additional controls"
sidebar_position: 6
description: "Send progress updates during job execution using the runpod.serverless.progress_update function, and refresh workers for long-running or complex jobs by returning a dictionary with a 'refresh_worker' flag in your handler."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Update progress

Progress updates can be sent out from your worker while a job is in progress. Progress updates will be available when the status is polled. To send an update, call the `runpod.serverless.progress_update` function with your job and context of your update.

```python
import runpod


def handler(job):
    for update_number in range(0, 3):
        runpod.serverless.progress_update(job, f"Update {update_number}/3")

    return "done"


runpod.serverless.start({"handler": handler})
```

## Refresh Worker

When completing long-running job requests or complicated requests that involve a lot of reading and writing files, starting with a fresh worker can be beneficial each time.
A flag can be returned with the resulting job output to stop and refresh the used worker.

This behavior is achieved by doing the following within your worker:

<Tabs>
  <TabItem value="sync" label="Synchronous" default>

```python
# Requires runpod python version 0.9.0+
import runpod
import time

def sync_handler(job):
    job_input = job["input"]  # Access the input from the request.
    
    results = []
    for i in range(5):
        # Generate a synchronous output token
        output = f"Generated sync token output {i}"
        results.append(output)

        # Simulate a synchronous task, such as processing time for a large language model
        time.sleep(1)
    
    # Return the results and indicate the worker should be refreshed
    return {"refresh_worker": True, "job_results": results}

# Configure and start the RunPod serverless function
runpod.serverless.start(
    {
        "handler": sync_handler,  # Required: Specify the sync handler
        "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
    }
)
```

</TabItem>
  <TabItem value="async" label="Asynchronous">

```python
import runpod
import asyncio

async def async_generator_handler(job):
    results = []
    for i in range(5):
        # Generate an asynchronous output token
        output = f"Generated async token output {i}"
        results.append(output)

        # Simulate an asynchronous task, such as processing time for a large language model
        await asyncio.sleep(1)
    
    # Return the results and indicate the worker should be refreshed
    return {"refresh_worker": True, "job_results": results}

# Configure and start the RunPod serverless function
runpod.serverless.start(
    {
        "handler": async_generator_handler,  # Required: Specify the async handler
        "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
    }
)
```

</TabItem>
</Tabs>

Your handler must return a dictionary that contains the `refresh_worker`: this flag will be removed before the remaining job output is returned.

:::note

Refreshing a worker does not impact billing or count for/against your min, max, and warmed workers. It simply "resets" that worker at the end of a job.

:::
