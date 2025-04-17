---
title: "API endpoints"
description: "Unlock the power of RunPod's API endpoints, manage models without managing pods, and retrieve results via the status endpoint within 30 minutes for privacy protection; rate limits enforced per user."
sidebar_position: 1
---

:::note

You will need a RunPod API key which can be generated under your user settings.
This API key will identify you for billing purposes, so guard it well!
You must retrieve your results via the status endpoint within 30 minutes.
We don't keep your inputs or outputs longer than that to protect your privacy!

:::

API endpoints are endpoints managed by RunPod that you can use to interact with your favorite models without managing the pods yourself.
These endpoints are available to all users.

## Overview

The API Endpoint implementation works asynchronously as well as synchronous.

Let's take a look at the differences between the two different implementations.

### Asynchronous endpoints

Asynchronous endpoints are useful for long-running jobs that you don't want to wait for. You can submit a job and then check back later to see if it's done.
When you fire an Asynchronous request with the API Endpoint, your input parameters are sent to our endpoint and you immediately get a response with a unique job ID.
You can then query the response by passing the job ID to the status endpoint. The status endpoint will give you the job results when completed.

### Synchronous endpoints

Synchronous endpoints are useful for short-running jobs that you want to wait for.
You can submit a job and get the results back immediately.

Let's take the Stable Diffusion v1 inference endpoint, for example.

### Start your job

You would first make a request like the following (remember to replace the "xxxxxx"s with your real API key:

```curl
curl -X POST https://api.runpod.ai/v2/stable-diffusion-v1/run \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
    -d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
```

You would get an immediate response that looks like this:

```json
{
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "status": "IN_QUEUE"
}
```

In this example, your job ID would be "c80ffee4-f315-4e25-a146-0f3d98cf024b".
You get a new one for each job, and it is a unique identifier for your job.

### Check the status of your job

You haven't gotten any output, so you must make an additional call to the status endpoint after some time. Your status endpoint uses the job ID to route to the correct job status. In this case, the status endpoint is

```command
https://api.runpod.ai/v1/stable-diffusion-v1/status/c80ffee4-f315-4e25-a146-0f3d98cf024b
```

Note how the last part of the URL is your job ID. You could request that endpoint like so.
Remember to use your API key for this request too!

```curl
curl https://api.runpod.ai/v2/stable-diffusion-v1/status/c80ffee4-f315-4e25-a146-0f3d98cf024b \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
```

If your job hasn't been completed, you may get something that looks like this back:

```json
{
  "delayTime": 2624,
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "input": {
    "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"
  },
  "status": "IN_PROGRESS"
}
```

This means to wait a bit longer before you query the status endpoint again.

## Get completed job status

Eventually, you will get the final results of your job. They would look something like this:

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

:::note

You must retrieve your results via the status endpoint within 1 hour. We do not keep your inputs or outputs longer than that to protect your privacy!

:::

### Get your stuff

Note how you don't get the images directly in the output. The output contains the URLs to the cloud storage that will let you download each image.

You've successfully generated your first images with our Stable Diffusion API!

### Rate Limits

Rate limits are enforced per-user basis.
Exceeding limits returns a `429` error.

`/run` - 1000 requests/10s, max 200 concurrent
`/runsync` - 2000 requests/10s, max 400 concurrent

For more information, see [Job operations](/serverless/endpoints/operations).
