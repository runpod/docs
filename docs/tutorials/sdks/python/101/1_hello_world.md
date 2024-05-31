# Introduction

The RunPod Python SDK allows developers to build and deploy serverless applications with ease. This course will guide you through the process of creating serverless functions, handling failures, and integrating advanced features.

## Hello, World!

Let's start with a basic "Hello, World!" program that demonstrates how a Serverless application responds to a request.

```python
import runpod

def handler(job):
    job_input = job["input"]

    return f"Hello {job_input['name']}!"

runpod.serverless.start({"handler": handler})
```


In this example, we first import the `runpod` library to access its functionality.

We define a handler function `def handler()` that accepts a `job` parameter. This function is responsible for processing the incoming request.

When a `job` is received, the handler parses the input data and extracts the `input` field from the job object.

It then returns a greeting message using the `name` value from the JSON input.

Finally, the `serverless.start()` function is called with the handler function as an argument to start the Serverless Worker in an asyncio event loop.

## Running the Code Locally

When you write your serverless application code, you’ll need a way to test it.
You have two options to process input to the Serverless Worker:

- [Using a JSON file](#using-a-json-file): this is a good option when testing your handler in a CI pipeline or for large inputs.
- [Using inline JSON](#using-inline-json): this is a good option when testing quickly from the command line.


### Using a JSON file

To execute this code locally, you can use the `--rp_server_api` flag.

Create a file named `test_input.json` with the following content:

```json
{
  "input": {
    "name": "World"
  }
}
```

Run the command `python hello_world.py --rp_server_api` in your terminal. 
You should see the following output:

```plaintext
--- Starting Serverless Worker |  Version 1.6.2 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'name': 'World'}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: Hello World!
DEBUG  | local_test | run_job return: {'output': 'Hello World!'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': 'Hello World!'}
INFO   | Local testing complete, exiting.
```

This output demonstrates that the Serverless Worker has successfully processed the local test job and returned the expected greeting message.

### Using inline JSON

You can test the input arguments by passing in the `--test_input` flag followed by your JSON arguments.

For example:

```sh
python hello_world.py --test_input '{"input": {"name": "World"}}'
```

Congratulations! 
You've just written and executed your first Serverless application using the RunPod Python SDK.
In the following sections, we'll explore more advanced concepts and features to help you build powerful Serverless applications.
