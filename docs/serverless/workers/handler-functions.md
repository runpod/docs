---
title: "Handler functions"
description: "Learn to create handler functions for RunPod Serverless. Handler functions define how your worker processes incoming requests and returns results."
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Handler functions

Handler functions form the core of your RunPod Serverless applications. They define how your worker processes incoming requests and returns results. This guide covers everything you need to know about building and using handler functions effectively.

:::tip

If you're new to Serverless, we recommend learning how to [build your first worker](/serverless/workers/custom-worker) before exploring this page.

:::

## Understanding job input

Before building a handler function, you should understand the structure of job requests. At minimum, the input will have this format:

```json
{
  "id": "A_RANDOM_JOB_IDENTIFIER",
  "input": { "key": "value" }
}
```

Your handler will access the `input` field to process the request data.

To learn more about endpoint requests, see [Send requests](/serverless/endpoints/send-requests).

## Basic handler implementation

Here's a simple handler function that processes an endpoint request:

```python
import runpod

def handler(job):
    job_input = job["input"]  # Access the input from the request
    # Add your custom code here
    return "Your job results"

runpod.serverless.start({"handler": handler})  # Required
```

The handler takes a request, extracts the input, processes it, and returns a result. The `runpod.serverless.start()` function launches your serverless application with the specified handler.

## Local testing

To test your handler locally, you can:

1. Create a `test_input.json` file:

```json
{
    "input": {
        "prompt": "Hey there!"
    }
}
```

2. Run your handler:

```bash
python handler.py
```

3. Or provide test input directly in the command line:
```bash
python handler.py --test_input '{"input": {"prompt": "Test prompt"}}'
```

## Handler types

RunPod supports several types of handler functions to meet different application needs:

### Standard handlers

Process inputs synchronously and return results directly. This is the simplest handler type.

```python
import runpod
import time

def handler(job):
    job_input = job["input"]
    prompt = job_input.get("prompt")
    seconds = job_input.get("seconds", 0)
    
    # Simulate processing time
    time.sleep(seconds)
    
    return prompt

runpod.serverless.start({"handler": handler})
```

### Generator handlers

Stream results incrementally as they become available. This is useful for real-time updates, especially in language model tasks.

```python
import runpod

def generator_handler(job):
    for count in range(3):
        result = f"This is the {count} generated output."
        yield result

runpod.serverless.start({
    "handler": generator_handler,
    "return_aggregate_stream": True  # Optional, makes results available via /run
})
```

By default, outputs from generator handlers are only available at the `/stream` endpoint. Set `return_aggregate_stream` to `True` to make outputs available from the `/run` and `/runsync` endpoints as well.

### Asynchronous handlers

Process operations concurrently for improved efficiency. This is particularly useful for tasks involving I/O operations, API calls, or processing large datasets.

```python
import runpod
import asyncio

async def async_handler(job):
    for i in range(5):
        # Generate an asynchronous output token
        output = f"Generated async token output {i}"
        yield output
        
        # Simulate an asynchronous task
        await asyncio.sleep(1)
        
runpod.serverless.start({
    "handler": async_handler,
    "return_aggregate_stream": True
})
```

Asynchronous handlers provide significant efficiency advantages by enabling non-blocking operations, allowing your code to handle multiple tasks concurrently without waiting for each operation to complete. This approach offers excellent scalability for applications that deal with high-frequency requests or need to process large-scale data, as your worker can maintain responsiveness even under heavy load.

Async handlers are particularly valuable when you need to yield results over time, making them perfectly suited for streaming data scenarios and long-running tasks that produce incremental outputs.

:::tip

When implementing async handlers, ensure proper use of `async` and `await` keywords throughout your code to maintain truly non-blocking operations and prevent performance bottlenecks, and consider leveraging the `yield` statement to generate outputs progressively over time.

Always test your async code thoroughly to properly handle asynchronous exceptions and edge cases, as async error patterns can be more complex than in synchronous code.

:::

### Concurrent handlers

Process multiple requests simultaneously with a single worker. Concurrent handlers are particularly useful for I/O-bound operations like API calls, database queries, or file operations where a single worker can efficiently manage multiple tasks at once.

Learn how to build a concurrent handler by [following this guide](/serverless/workers/concurrent-handler).

## Error handling

When an exception occurs in your handler function, the RunPod SDK automatically captures it, marks the [job status](/serverless/endpoints/job-states) as `FAILED` and returns the exception details in the job results.

For custom error responses:

```python
import runpod

def handler(job):
    job_input = job["input"]
    
    # Validate the presence of required inputs
    if not job_input.get("seed", False):
        return {
            "error": "Input is missing the 'seed' key. Please include a seed."
        }
    
    # Proceed if the input is valid
    return "Input validation successful."

runpod.serverless.start({"handler": handler})
```

Be cautious with `try/except` blocks to avoid unintentionally suppressing errors. Either return the error for a graceful failure or raise it to flag the job as `FAILED`.

## Advanced handler controls

Use these features to fine-tune your Serverless applications for specific use cases.

### Progress updates

Send progress updates during job execution to inform clients about the current state of processing:

```python
import runpod

def handler(job):
    for update_number in range(0, 3):
        runpod.serverless.progress_update(job, f"Update {update_number}/3")
    
    return "done"

runpod.serverless.start({"handler": handler})
```

Progress updates will be available when the job status is polled.

### Worker refresh

For long-running or complex jobs, you may want to refresh the worker after completion to start with a clean state for the next job:

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

Your handler must return a dictionary that contains the `refresh_worker` flag. This flag will be removed before the remaining job output is returned.

:::note

Refreshing a worker does not impact billing or count for/against your min, max, and warmed workers. It simply "resets" that worker at the end of a job.

:::

## Best practices

1. **Initialize outside handler**: Load models and other heavy resources outside your handler function to avoid repeated initialization.

  ```python
  import runpod
  import torch
  from transformers import AutoModelForSequenceClassification, AutoTokenizer

  # Load model and tokenizer outside the handler
  model_name = "distilbert-base-uncased-finetuned-sst-2-english"
  tokenizer = AutoTokenizer.from_pretrained(model_name)
  model = AutoModelForSequenceClassification.from_pretrained(model_name)

  # Move model to GPU if available
  device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
  model.to(device)

  def handler(event):
      # ...

  runpod.serverless.start({"handler": handler})
  ```

2. **Input validation**: Validate inputs before processing to avoid errors during execution.
3. **Optimize for efficiency**: Minimize resource usage and processing time.
4. **Consider refresh patterns**: Use worker refresh for memory-intensive tasks.
5. **Test thoroughly**: Test your handlers locally before deployment.

## Payload limits

Be aware of payload size limits when designing your handler:
- `/run` endpoint: 10 MB
- `/runsync` endpoint: 20 MB

If your results exceed these limits, consider storing them in cloud storage and returning links instead.

## Next steps

Once you've created your handler function, you can:
- [Package it in a Docker container.](/serverless/workers/deploy)
- [Deploy it as a Serverless endpoint.](/serverless/endpoints/manage-endpoints)
- [Configure your endpoint for optimal performance.](/serverless/endpoints/endpoint-configurations)
- [Explore local testing options.](/serverless/development/local-testing)