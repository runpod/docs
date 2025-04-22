---
title: "Concurrency"
description: "Learn how to leverage concurrent workers in your local testing environment"
sidebar_position: 6
---

In this tutorial, we'll dive deep into the `--rp_api_concurrency` argument of the RunPod Python SDK.
This powerful feature allows you to simulate multiple concurrent requests to your serverless function, mimicking real-world scenarios more closely.

## What is rp_api_concurrency?

The `--rp_api_concurrency` argument controls the number of concurrent workers that the local FastAPI server uses when simulating the RunPod serverless environment. Each worker can handle a separate request simultaneously, allowing you to test how your function performs under parallel execution.

### Basic Usage

To set the number of concurrent workers, use the `--rp_api_concurrency` flag followed by the desired number of workers:

```bash
python your_function.py --rp_serve_api --rp_api_concurrency 2
```

This command starts your local server with 2 concurrent workers.

### Example: Testing a Counter Function

Let's create a simple function that increments a counter and test it with different concurrency settings.

1. Create a file named `counter_function.py`:

```python
import runpod

counter = 0


def handler(event):
    global counter
    counter += 1
    return {"counter": counter}


runpod.serverless.start({"handler": handler})
```

2. Run the function with a single worker:

```bash
python counter_function.py --rp_serve_api --rp_api_concurrency 1
```

3. In another terminal, use curl to send multiple requests.
   Create a new file called `counter.sh` and add the following to the file.

```bash
for i in {1..10}; do
    curl -X POST http://localhost:8000/runsync -H "Content-Type: application/json" -d '{"input": {}}' &
done
```

To execute this file run `bash counter.sh`.

4. Observe the results. With a single worker, the requests are processed sequentially, and you'll see the counter increment from 1 to 10.

5. Now, let's run the function with multiple workers:

```bash
python counter_function.py --rp_serve_api --rp_api_concurrency 4
```

6. When you try to run this command, you'll encounter the following error:

```
WARNING:  You must pass the application as an import string to enable 'reload' or 'workers'.
```

This error occurs because the RunPod SDK integrates with FastAPI to create the local server, and FastAPI has certain expectations about how the application is structured and named.

7. To resolve this issue, we need to understand a bit more about the FastAPI integration:

   - The RunPod SDK uses FastAPI to create an ASGI application that simulates the serverless environment.
   - FastAPI's underlying server, Uvicorn, expects the main application to be in a file named `main.py` by default.
   - When you use the `--rp_api_concurrency` flag to specify multiple workers, Uvicorn tries to spawn separate processes, each running your application.

8. To make this work, we need to rename our file to `main.py`. This allows Uvicorn to correctly import and run multiple instances of your application. Here's what you need to do:

   a. Rename your `counter_function.py` to `main.py`:

   ```bash
   mv counter_function.py main.py
   ```

   b. Now, run the command again:

   ```bash
   python main.py --rp_serve_api --rp_api_concurrency 4
   ```

   This time, the command should work without errors, starting your local server with 4 concurrent workers.

9. With the server running, you can now send multiple requests using the curl command from step 3:

```bash
for i in {1..10}; do
    curl -X POST http://localhost:8000/run -H "Content-Type: application/json" -d '{"input": {}}' &
done
```

10. Observe the results. With multiple workers, you might see inconsistent results due to race conditions.
    The counter might not reach 10, and you may see duplicate values.

## Handling Concurrency in your code

To make your function concurrency-safe, you need to use appropriate synchronization mechanisms.
Here's an improved version of the counter function:

```python
import runpod
from threading import Lock

counter = 0
counter_lock = Lock()


def handler(event):
    global counter
    with counter_lock:
        counter += 1
        return {"counter": counter}


runpod.serverless.start({"handler": handler})
```

Now, even with multiple workers, the counter will increment correctly.

## Best Practices for Using rp_api_concurrency

1. **Start Low**: Begin testing with a low number of workers and gradually increase.
2. **Match Production**: Set concurrency to match your expected production configuration.
3. **Test Varied Loads**: Try different concurrency levels to understand your function's behavior under various conditions.
4. **Monitor Resources**: Keep an eye on CPU and memory usage as you increase concurrency.
5. **Use Logging**: Implement detailed logging to track the flow of concurrent executions.

It's important to note that `--rp_api_concurrency` provides concurrent execution, not necessarily parallel execution.
The degree of parallelism depends on your system's capabilities and the nature of your function.

## Conclusion

The `--rp_api_concurrency` argument is a powerful tool for testing your RunPod serverless functions under more realistic conditions. By simulating concurrent requests, you can identify and resolve issues related to race conditions, resource contention, and scalability before deploying to production.

Remember, while local testing with concurrency is valuable, it's not a complete substitute for load testing in a production-like environment.
Use this feature as part of a comprehensive testing strategy to ensure your serverless functions are robust and scalable.
