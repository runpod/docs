---
title: "⚙️ | The Handler"
slug: "handler"
excerpt: "The function responsible for processing requests."
hidden: false
createdAt: "Sat Aug 19 2023 16:14:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 23 2023 00:36:47 GMT+0000 (Coordinated Universal Time)"
---

Written in Python, the handler function is responsible for processing submitted inputs and generating the resulting output. When developing your handler, you can do so locally on your PC or remotely on a RunPod GPU instance. Example handler functions can be found within the [repos of our runpod-workers](https://github.com/orgs/runpod-workers/repositories).

## Job Input

Before we look at the handler, it is essential first to understand what a job request input will look like; later, we will cover all of the input options in detail; for now, what is essential is that your handler should be expecting a JSON dictionary to be passed in. At a minimum, the input will be formatted as such:

```json
{
  "id": "A_RANDOM_JOB_IDENTIFIER",
  "input": { "key": "value" }
}
```

## Requirements

You will need to have the RunPod Python SDK installed; this can be done by running `pip install runpod`.

## Basic Handler Function

```python
# your_handler.py

import runpod # Required.

def handler(job):
  job_input = job["input"] # Access the input from the request.
  
  # Add your custom code here.
  
	return "Your job results"

runpod.serverless.start({ "handler": handler}) # Required.
```

> 🚧 Keep setup processes and functions outside of your handler function. For example, if you are running models make sure they are loaded into VRAM prior to calling `serverless.start` with your handler function.

## Testing Locally

As you develop your handler, you will, of course, want to test it with inputs formatted similarly to what you will be sending in once deployed as a worker. The quickest way to run a test is to pass in your input as an argument when calling your handler file. Assuming your handler function is inside of a file called `your_handler.py` and your input is `{"input": {"prompt": "The quick brown fox jumps"}}` you would call your file like so:

```curl Bash
python your_handler.py --test_input '{"input": {"prompt": "The quick brown fox jumps"}}'
```

Additionally, you can launch a local test server that will provide you with an endpoint to send requests to by calling your file with the `--rp_serve_api` argument. See our [blog post](https://blog.runpod.io/workers-local-api-server-introduced-with-runpod-python-0-9-13/) for additional examples.

```python Bash
python your_handler.py --rp_serve_api
```

### CI/CD Pipeline

If any errors are returned by the worker while running a test_input job, the worker will exit with a non-zero exit code. Otherwise, the worker will exit with a zero exit code. This can be used to check if the worker ran successfully, for example, in a CI/CD pipeline.
