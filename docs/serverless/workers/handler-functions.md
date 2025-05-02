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

```python title="handler.py"
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

You can create several types of handler functions depending on the needs of your application.

### Standard handlers

The simplest handler type, standard handlers process inputs synchronously and return results directly.

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

Generator handlers stream results incrementally as they become available. Use these when your application requires real-time updates, for example when streaming results from a language model.

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

Asynchronous handlers process operations concurrently for improved efficiency. Use these for tasks involving I/O operations, API calls, or processing large datasets.

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

Async handlers allow your code to handle multiple tasks concurrently without waiting for each operation to complete. This approach offers excellent scalability for applications that deal with high-frequency requests, allowing your workers to remain responsive even under heavy load. Async handlers are also useful for streaming data scenarios and long-running tasks that produce incremental outputs.

:::tip

When implementing async handlers, ensure proper use of `async` and `await` keywords throughout your code to maintain truly non-blocking operations and prevent performance bottlenecks, and consider leveraging the `yield` statement to generate outputs progressively over time.

Always test your async code thoroughly to properly handle asynchronous exceptions and edge cases, as async error patterns can be more complex than in synchronous code.

:::

### Concurrent handlers

Concurrent handlers process multiple requests simultaneously with a single worker. Use these for small, rapid operations that don't fully utlize the worker's GPU.

When increasing concurrency, it's crucial to monitor memory usage carefully and test thoroughly to determine the optimal concurrency levels for your specific workload. Implement proper error handling to prevent one failing request from affecting others, and continuously monitor and adjust concurrency parameters based on real-world performance.

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

Exercise caution when using `try/except` blocks to avoid unintentionally suppressing errors. Either return the error for a graceful failure or raise it to flag the job as `FAILED`.

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

For long-running or complex jobs, you may want to refresh the worker after completion to start with a clean state for the next job. Enabling worker refresh clears all logs and wipes the worker state after a job is completed.

For example:

```python
# Requires runpod python version 0.9.0+
import runpod
import time

def handler(job):
    job_input = job["input"]  # Access the input from the request

    results = []
    
    # Compute results
    ...

    # Return the results and indicate the worker should be refreshed
    return {"refresh_worker": True, "job_results": results}


# Configure and start the RunPod serverless function
runpod.serverless.start(
    {
        "handler": handler,  # Required: Specify the sync handler
        "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
    }
)
```

Your handler must return a dictionary that contains the `refresh_worker` flag. This flag will be removed before the remaining job output is returned.

## Handler function best practices

A short list of best practices to keep in mind as you build your handler function:

1. **Initialize outside the handler**: Load models and other heavy resources outside your handler function to avoid repeated initialization.

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

2. **Input validation**: [Validate inputs](#error-handling) before processing to avoid errors during execution.
3. **Local testing**: [Test your handlers locally](/serverless/development/local-testing) before deployment.

## Payload limits

Be aware of payload size limits when designing your handler:
- `/run` endpoint: 10 MB
- `/runsync` endpoint: 20 MB

If your results exceed these limits, consider stashing them in cloud storage and returning links instead.

## Next steps

Once you've created your handler function, you can:

- [Package it in a Docker container.](/serverless/workers/deploy)
- [Deploy it as a Serverless endpoint.](/serverless/endpoints/manage-endpoints)
- [Configure your endpoint for optimal performance.](/serverless/endpoints/endpoint-configurations)
- [Explore local testing options.](/serverless/development/local-testing)