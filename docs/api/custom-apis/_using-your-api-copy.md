---
title: "Using Your API"
slug: "using-your-api-copy"
excerpt: "Okay! Now you have everything set up, but how do you use it?"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Jul 27 2023 10:39:12 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Oct 27 2023 13:53:56 GMT+0000 (Coordinated Universal Time)"
---

Once everything above is configured, you will be able to invoke your API using the "run" endpoint on your API dashboard. Our services are currently asynchronous, so you must use the "status" endpoint to get the status/results of each run using the ID present in the run response payload. You can also pass in a webhook URL when invoking "run" within the JSON body.

Our own APIs are built using the same tools, so you can take a look at the RunPod API overview. The only difference is that your custom API endpoint only accepts requests using your own account's API key, not any RunPod API key.

We offer two different kinds of run mechanisms: synchronous responses and asynchronous responses.

## Running your API

### /runsync

<!-- dprint-ignore-start -->
```curl cURL
curl -X POST https://api.runpod.ai/v2/<your-api-id>/runsync \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {<your-input-json}}'
```
```python
# this requires the installation of runpod-python
# with `pip install runpod-python` beforehand

import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # you can find this in settings

endpoint = runpod.Endpoint("ENDPOINT_ID")

run_request = endpoint.run_sync({"your_model_input_key": "your_model_input_value"})
```
<!-- dprint-ignore-end -->

here's a possible example request (taken from our stable diffusion image)

<!-- dprint-ignore-start -->
```curl cURL
curl -X POST https://api.runpod.ai/v2/<your-api-id>/runsync \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
```
```python
# this requires the installation of runpod-python
# with `pip install runpod-python` beforehand

import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # you can find this in settings

endpoint = runpod.Endpoint("ENDPOINT_ID")

run_request = endpoint.run_sync(
    {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}
)

print(run_request)
```
<!-- dprint-ignore-end -->

this should give a direct response if the code runs for \< 90 seconds, or else it'll give a status response (which you can see below)

**Sample response**

```json
{
  "delayTime": 123456, // (milliseconds) time in queue
  "executionTime": 1234, // (milliseconds) time it took to complete the job
  "gpu": "24", // gpu type used to run the job
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "input": {
    "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"
  },
  "output": [
    {
      "image": "https://job.results1",
      "seed": 1
    },
    {
      "image": "https://job.results2",
      "seed": 2
    }
  ],
  "status": "COMPLETED"
}
```

### /run

<!-- dprint-ignore-start -->
```curl cURL
curl -X POST https://api.runpod.ai/v2/<your-api-id>/run \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {<your-input-json}}'
```
```python
# this requires the installation of runpod-python
# with `pip install runpod-python` beforehand

import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # you can find this in settings

endpoint = runpod.Endpoint("ENDPOINT_ID")

run_request = endpoint.run({"your_model_input_key": "your_model_input_value"})

print(run_request.status())
```
<!-- dprint-ignore-end -->

here's a possible example request

<!-- dprint-ignore-start -->
```curl cURL
curl -X POST https://api.runpod.ai/v2/<your-api-id>/run \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
```
```python
# this requires the installation of runpod-python
# with `pip install runpod-python` beforehand

import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # you can find this in settings

endpoint = runpod.Endpoint("ENDPOINT_ID")

run_request = endpoint.run(
    {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}
)

print(run_request.status())
```
<!-- dprint-ignore-end -->

running your api via **/run** runs the code asynchronously, here's a sample response

**sample response (for curl)**

```json
{
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "status": "IN_QUEUE"
}
```

### /status

**Sample request**

<!-- dprint-ignore-start -->
```Text cURL
curl https://api.runpod.ai/v2/<your-api-id>/status/<your-status-id>
```
```python Start a job and return a status
# this requires the installation of runpod-python
# with `pip install runpod-python` beforehand

import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # you can find this in settings

endpoint = runpod.Endpoint("ENDPOINT_ID")

run_request = endpoint.run(
    {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}
)

print(run_request.status())
```
```python Get the status of a running job
# Prerequisite: Install runpod-python using `pip install runpod-python`
import runpod

runpod.api_key = "xxxxxxxxxxxxxxxxxxxxxx"  # Replace with your API key
client = runpod.endpoint.runner.RunPodClient()


job = runpod.endpoint.Job(
    endpoint_id="your_endpoint_id", job_id="your_job_id", client=client
)

print(job.status())
```
<!-- dprint-ignore-end -->

**sample response (for job in progress)**

```json JSON
{
  "delayTime": 2624,
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "input": {
    "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"
  },
  "status": "IN_PROGRESS"
}
```

**sample response (for completed job)**

```json JSON
{
  "delayTime": 123456, // (milliseconds) time in queue
  "executionTime": 1234, // (milliseconds) time it took to complete the job
  "gpu": "24", // gpu type used to run the job
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "input": {
    "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"
  },
  "output": [
    {
      "image": "https://job.results1",
      "seed": 1
    },
    {
      "image": "https://job.results2",
      "seed": 2
    }
  ],
  "status": "COMPLETED"
}
```
