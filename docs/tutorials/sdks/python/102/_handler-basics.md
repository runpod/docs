---
title: "Running Code Locally"
description: "Learn how to test your RunPod Serverless applications locally"
sidebar_position: 3
---

This guide will review the things you learned in the 101 courses.

This is breif.

In this guide, we'll show you how to run your RunPod serverless applications right on your own machine.
We'll cover both synchronous and asynchronous handlers.

By the end of this, you'll be a pro at testing, debugging, and making sure your serverless code is ship-shape, all from the comfort of your local environment.

### Setting up your Handler Functions

Let's set up both a synchronous and an asynchronous handler function. We'll create two separate Python files for this.

1. **Synchronous Handler:**

   Create a file named `sync_handler.py` with the following content:

   ```python
   import runpod

   def custom_name(job):
       for count in range(3):
           result = f"This is the {count} generated output."
           yield result

   runpod.serverless.start(
       {
           "handler": custom_name  # Required
       }
   )
   ```

2. **Asynchronous Handler:**

   Create another file named `async_handler.py` with this content:

   ```python
   import runpod
   import asyncio

   async def async_generator_handler(job):
       for i in range(5):
           output = f"Generated async token output {i}"
           yield output

           await asyncio.sleep(1)

   runpod.serverless.start(
       {
           "handler": async_generator_handler,  # Required: Specify the async handler
           "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
       }
   )
   ```

### Running Your Code Locally

Now, let's walk through how to run these serverless functions locally using the RunPod Python SDK.

#### Using a JSON file

First, we'll create a JSON file to feed into our functions. This mimics how your function would get data in the real cloud environment.

1. **Create a JSON file:**

   Open up your favorite text editor and create a new file called `test_input.json`. Pop this content into it:

   ```json
   {
     "input": {
       "dummy": "data"
     }
   }
   ```

   This JSON is just a placeholder since our handlers don't actually use any specific input data.

2. **Run the synchronous handler:**

   Fire up your `sync_handler.py` script. We'll use the `--rp_server_api` flag to pretend we're in a serverless environment:

   ```python
   python sync_handler.py --rp_server_api
   ```

   You should see output showing the three generated results.

3. **Run the asynchronous handler:**

   Now, let's run our `async_handler.py` script:

   ```python
   python async_handler.py --rp_server_api
   ```

   You should see output showing the five generated results, with a one-second delay between each.

#### Using inline JSON

If you prefer, you can also feed your function data directly from the command line. Here's how:

1. **Run the synchronous handler with inline JSON:**

   ```python
   python sync_handler.py --test_input '{"input": {"dummy": "data"}}'
   ```

2. **Run the asynchronous handler with inline JSON:**

   ```python
   python async_handler.py --test_input '{"input": {"dummy": "data"}}'
   ```

This does the same thing as using the JSON file, but now you're passing the input data right in the command.

### Understanding the output

When you run these handlers, you'll see output similar to this:

```python
--- Starting Serverless Worker |  Version 1.6.2 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'dummy': 'data'}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: This is the 0 generated output.
DEBUG  | local_test | Handler output: This is the 1 generated output.
DEBUG  | local_test | Handler output: This is the 2 generated output.
DEBUG  | local_test | run_job return: {'output': ['This is the 0 generated output.', 'This is the 1 generated output.', 'This is the 2 generated output.']}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': ['This is the 0 generated output.', 'This is the 1 generated output.', 'This is the 2 generated output.']}
INFO   | Local testing complete, exiting.
```

For the asynchronous handler, you'll see similar output but with five results and a delay between each.

### Key Takeaways

- You can test both synchronous and asynchronous RunPod serverless functions right on your own computer.
- Synchronous handlers are great for quick, straightforward tasks.
- Asynchronous handlers allow you to simulate long-running tasks and test streaming outputs.
- You can feed your function data using a JSON file or by passing it directly in the command line.
- Local testing lets you catch and fix issues quickly, without having to deploy to the cloud each time.

And there you have it! You've successfully run both synchronous and asynchronous serverless applications using the RunPod Python SDK. This local testing is like having a practice arena where you can try out your code, fix any issues, and make sure everything's working perfectly before you send it off to the cloud.

Next up, we'll take a deeper dive into more advanced handler techniques. This will help you create even more powerful and complex serverless functions. Stay tuned!
