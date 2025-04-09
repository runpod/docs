---
title: Job operations
description: "Learn how to use the Runpod Endpoint to manage job operations, including running, checking status, purging queues, and streaming results, with cURL and SDK examples."
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This page provides instructions on job operations using the Runpod Endpoint.
You can invoke a job to run Endpoints the way you would interact with an API, get a status of a job, purge your job queue, and more with operations.

The following guide demonstrates how to use cURL to interact with an Endpoint.
You can also use the following SDK to interact with Endpoints programmatically:

- [Python SDK](/sdks/python/endpoints)

For information on sending requests, see [Send a request](/serverless/endpoints/send-requests).

## Asynchronous Endpoints

Asynchronous endpoints are designed for long-running tasks. When you submit a job through these endpoints, you receive a Job ID in response.
You can use this Job ID to check the status of your job at a later time, allowing your application to continue processing without waiting for the job to complete immediately.
This approach is particularly useful for tasks that require significant processing time or when you want to manage multiple jobs concurrently.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/run \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${API_KEY}' \
    -d '{"input": {"prompt": "Your prompt"}}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "id": "eaebd6e7-6a92-4bb8-a911-f996ac5ea99d",
  "status": "IN_QUEUE"
}
```

</TabItem>
</Tabs>

## Synchronous Endpoints

Synchronous endpoints are ideal for short-lived tasks where immediate results are necessary.
Unlike asynchronous calls, synchronous endpoints wait for the job to complete and return the result directly in the response.
This method is suitable for operations that are expected to complete quickly and where the client can afford to wait for the result.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/runsync \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${API_KEY}' \
    -d '{"input": {"prompt": "Your prompt"}}'
```

    </TabItem>

<TabItem value="output" label="Output">
```json
{
  "delayTime": 824,
  "executionTime": 3391,
  "id": "sync-79164ff4-d212-44bc-9fe3-389e199a5c15",
  "output": [
    {
      "image": "https://image.url",
      "seed": 46578
    }
  ],
  "status": "COMPLETED"
}
```
  </TabItem>
</Tabs>

## Health Endpoint

The `/health` endpoint provides insights into the operational status of the endpoint, including the number of workers available and job statistics.
This information can be used to monitor the health and performance of the API, helping you manage workload and troubleshoot issues more effectively.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl --request GET \
     --url https://api.runpod.ai/v2/{endpoint_id}/health \
     --header 'accept: application/json' \
     --header 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "jobs": {
    "completed": 1,
    "failed": 5,
    "inProgress": 0,
    "inQueue": 2,
    "retried": 0
  },
  "workers": {
    "idle": 0,
    "running": 0
  }
}
```

</TabItem>
</Tabs>

## Cancel Job

To cancel a job in progress, specify the `cancel` parameter with the endpoint ID and the job ID.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/cancel/{job_id} \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "id": "724907fe-7bcc-4e42-998d-52cb93e1421f-u1",
  "status": "CANCELLED"
}
```

</TabItem>
</Tabs>

## Purge Queue Endpoint

The `/purge-queue` endpoint allows you to clear all jobs that are currently in the queue.
This operation does not affect jobs that are already in progress.
It is a useful tool for managing your job queue, especially in situations where you need to reset or clear pending tasks due to operational changes or errors.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/purge-queue \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "removed": 2,
  "status": "completed"
}
```

</TabItem>
</Tabs>

## Check Job Status

To track the progress or result of an asynchronous job, you can check its status using the Job ID.
This endpoint provides detailed information about the job, including its current status, execution time, and the output if the job has completed.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/status/{job_id} \
    -H 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "delayTime": 31618,
  "executionTime": 1437,
  "id": "60902e6c-08a1-426e-9cb9-9eaec90f5e2b-u1",
  "output": {
    "input_tokens": 22,
    "output_tokens": 16,
    "text": ["Hello! How can I assist you today?\nUSER: I'm having"]
  },
  "status": "COMPLETED"
}
```

</TabItem>
</Tabs>

## Retry a job

To retry a job that has failed or encountered an error, send a POST request to `/retry/{job_id}` with the Job ID.
The system will automatically requeue and retry the job.

- You can retry any job with a `FAILED` or `TIMED_OUT` status, as long as the job hasn’t expired.
- Jobs submitted via `/run` expire 30 minutes after completion.
- Jobs submitted via `/runsync` expire 1 minute after completion.
- When a job is retried, the previous output is removed. If you call `/status` right after the retry, it will return no output until the new job run is complete.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/retry/{job_id} \
    -H 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
{
  "id": "60902e6c-08a1-426e-9cb9-9eaec90f5e2b-u1",
  "status": "IN_QUEUE"
}
```

</TabItem>
</Tabs>

## Stream results

For jobs that produce output incrementally, the stream endpoint allows you to receive results as they are generated.
This is particularly useful for tasks that involve continuous data processing or where immediate partial results are beneficial.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST https://api.runpod.ai/v2/{endpoint_id}/stream/{job_id} \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer ${API_KEY}'
```

    </TabItem>

<TabItem value="output" label="Output">

```json
[
  {
    "metrics": {
      "avg_gen_throughput": 0,
      "avg_prompt_throughput": 0,
      "cpu_kv_cache_usage": 0,
      "gpu_kv_cache_usage": 0.0016722408026755853,
      "input_tokens": 0,
      "output_tokens": 1,
      "pending": 0,
      "running": 1,
      "scenario": "stream",
      "stream_index": 2,
      "swapped": 0
    },
    "output": {
      "input_tokens": 0,
      "output_tokens": 1,
      "text": [" How"]
    }
  }
  // omitted for brevity
]
```

</TabItem>
</Tabs>

:::note

The maximum size for a payload that can be sent using yield to stream results is 1 MB.

:::

## Rate Limits

RunPod's Endpoints facilitate submitting jobs and retrieving outputs.
Access these endpoints at: `https://api.runpod.ai/v2/{endpoint_id}/{operation}`

- `/run`

  - 1000 requests per 10 seconds, 200 concurrent

- `/runsync`

  - 2000 requests per 10 seconds, 400 concurrent

- `/status`, `/status-sync`, `/stream`

  - 2000 requests per 10 seconds, 400 concurrent

- `/cancel`

  - 100 requests per 10 seconds, 20 concurrent

- `/purge-queue`

  - 2 requests per 10 seconds

- `/openai/*`

  - 2000 requests per 10 seconds, 400 concurrent

- `/requests`
  - 10 requests per 10 seconds, 2 concurrent

:::note

Retrieve results from `/status` within 30 minutes for privacy protection.

:::

For reference information on Endpoints, see [Endpoint Operations](/serverless/references/operations.md).
