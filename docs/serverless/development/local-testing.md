---
title: Test locally
sidebar_position: 2
description: "Learn how to test your Handler Function locally using custom inputs and a local test server, simulating deployment scenarios without the need for cloud resources."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When developing your Handler Function for RunPod serverless, it's crucial to test it thoroughly in a local environment before deployment.
The RunPod SDK provides multiple ways to facilitate this local testing, allowing you to simulate various scenarios and inputs without consuming cloud resources.

## Custom Inputs

The simplest way to test your Handler Function is by passing a custom input directly when running your Python file.

This method is ideal for quick checks and iterative development.

### Inline JSON

You can pass inline json to your function to test its response.

Assuming your handler function is in a file named `your_handler.py`, you can test it like this:
<Tabs>
<TabItem value="cli" label="CLI" default>

```bash
python your_handler.py \
  --test_input '{"input": {"prompt": "The quick brown fox jumps"}}'
```

</TabItem>
  <TabItem value="python" label="Python">

Add the following file to your project and run the command.

```python
import runpod


def handler(event):
    """
    This is a sample handler function that echoes the input
    and adds a greeting.
    """
    try:
        # Extract the prompt from the input
        prompt = event["input"]["prompt"]

        result = f"Hello! You said: {prompt}"

        # Return the result
        return {"output": result}
    except Exception as e:
        # If there's an error, return it
        return {"error": str(e)}


# Start the serverless function
runpod.serverless.start({"handler": handler})
```

</TabItem>

</Tabs>

This command runs your handler with the specified input, allowing you to verify the output and behavior quickly.

### JSON file

For more complex or reusable test inputs, you can use a `test_input.json` file.

This approach allows you to easily manage and version control your test cases.

Create a file named `test_input.json` in the same directory as your `your_handler.py` file. For example:

```json
{
  "input": {
    "prompt": "This is a test input from JSON file"
  }
}
```

2. Run your handler using the following command:

```bash
python your_handler.py
```

When you run this command, the script will automatically detect and use the `test_input.json` file if it exists.

3. The output will indicate that it's using the input from the JSON file:

```
--- Starting Serverless Worker |  Version 1.6.2 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'prompt': 'This is a test from JSON file'}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: {'output': 'Hello! You said: This is a test from JSON file'}
DEBUG  | local_test | run_job return: {'output': {'output': 'Hello! You said: This is a test from JSON file'}}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': {'output': 'Hello! You said: This is a test from JSON file'}}
INFO   | Local testing complete, exiting.
```

Using `test_input.json` is particularly helpful when:

- You have complex input structures that are cumbersome to type in the command line.
- You want to maintain a set of test cases that you can easily switch between.
- You're collaborating with a team and want to share standardized test inputs.

:::note

If you provide a test input via the command line (`--test_input` argument), it will override the `test_input.json` file. This allows for flexibility in your testing process.

:::

## Local Test Server

For more comprehensive testing, especially when you want to simulate HTTP requests to your serverless function, you can launch a local test server.
This server provides an endpoint that you can send requests to, mimicking the behavior of a deployed serverless function.

To start the local test server, use the `--rp_serve_api` flag:

```bash
python your_handler.py --rp_serve_api
```

This command starts a FastAPI server on your local machine, accessible at `http://localhost:8000`.

### Customizing the Local Server

You can further customize the local server using additional flags:

- `--rp_api_port`: Specify a custom port (default is 8000)
- `--rp_api_host`: Set the host address (default is "localhost")
- `--rp_api_concurrency`: Set the number of worker processes (default is 1)

Example:

```bash
python main.py \
  --rp_serve_api \
  --rp_api_port 8080 \
  --rp_api_concurrency 4
```

This starts the server on port `8080` with 4 worker processes.

### Sending Requests to the Local Server

Once your local server is running, you can send HTTP POST requests to test your function. Use tools like `curl` or Postman, or write scripts to automate your tests.

Example using `curl`:

```bash
curl -X POST http://localhost:8000/runsync \
     -H "Content-Type: application/json" \
     -d '{"input": {"prompt": "The quick brown fox jumps"}}'
```

:::note
When testing locally, the /run endpoint only returns a fake requestId without executing your code, as async mode requires communication with our system. This is why you can’t check job status using /status. For local testing, use /runsync. To test async functionality, you’ll need to deploy your app on our platform.
:::

## Advanced testing options

The RunPod SDK offers additional flags for more advanced testing scenarios:

- `--rp_log_level`: Control log verbosity (options: ERROR, WARN, INFO, DEBUG)
- `--rp_debugger`: Enable the RunPod debugger for detailed troubleshooting

Example:

```bash
python your_handler.py --rp_serve_api --rp_log_level DEBUG --rp_debugger
```

Local testing is a crucial step in developing robust and reliable serverless functions for RunPod. By utilizing these local testing options, you can catch and fix issues early, optimize your function's performance, and ensure a smoother deployment process.

For more detailed information on local testing and advanced usage scenarios, refer to our [blog post](https://blog.runpod.io/workers-local-api-server-introduced-with-runpod-python-0-9-13/) and the other tutorials in this documentation.
