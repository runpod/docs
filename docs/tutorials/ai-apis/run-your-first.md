---
title: "Run your first AI API with Stable Diffusion"
description: "Interact with your favorite models without managing the pods yourself."
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Job endpoints in RunPod are URLs that provide standard functionality for submitting jobs and retrieving the output from job requests.

To use these endpoints, you will need to have your endpoint ID.

The constructed URL will start with `https://api.runpod.ai/v2/{endpoint_id}`.

:::note

To run these commands, _as is_, export your RunPod API key as an environment variable.

<Tabs>
  <TabItem value="macos" label="macOS" default>
    ```text
    export YOUR_API_KEY=<KEY>
    ```
  </TabItem>
  <TabItem value="windows" label="Windows">
    ```text
    set YOUR_API_KEY=<KEY>
    ```
  </TabItem>

</Tabs>

:::

## Runsync

Runsync is a synchronous endpoint that runs your model and returns the result. It is useful for testing your model and debugging.
Recommended for jobs that take less than 15 seconds.

For example, if you are using the Stable Diffusion v1 inference endpoint, you would make a request like the following:

<Tabs>
  <TabItem value="input" label="Input" default>
    ```shell
    curl -X POST https://api.runpod.ai/v2/stable-diffusion-v1/runsync \
        -H "Content-Type: application/json" \
        -H "Authorization: Bearer ${YOUR_API_KEY}" \
        -d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
    ```
  </TabItem>
  <TabItem value="output" label="Output">
    ```json
    {
  "delayTime": 719,
  "executionTime": 5587,
  "id": "sync-ad4dc65e-19d2-4432-b8e0-7c9b8b65635f-u1",
  "output": [
    {
      "image": "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/01-24/sync-ad4dc65e-19d2-4432-b8e0-7c9b8b65635f-u1_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ebf97c96008980701d3a38cf47337f28%2F20240124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240124T191713Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=61a2d5d8266c6054181e197a93432336aa2b32b7b66c4ae3477c5139a0339587",
      "seed": 13742
    }
  ],
  "status": "COMPLETED"
}
    ```
  </TabItem>

</Tabs>

You would get an immediate response that includes a unique job ID.
You can then query the status endpoint and pass it your job ID. The status endpoint will give you the job results when completed.

## Run

Run is an asynchronous endpoint that runs your model and returns a job ID. It is useful for running your model in the background.
Recommended for jobs that take more than 15 seconds.

For example, if you are using the Stable Diffusion v1 inference endpoint, you would make a request like the following:

<Tabs>
  <TabItem value="input" label="Input" default>

```shell
curl -X POST https://api.runpod.ai/v2/stable-diffusion-v1/run \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${YOUR_API_KEY}" \
    -d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
```

</TabItem>
  <TabItem value="ouput" label="Output">
    ```json
    {
      "id": "1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1",
      "status": "IN_QUEUE"
    }
    ```
  </TabItem>

</Tabs>

## Status

Status is an endpoint that returns the status of your job.

For checking the status of your job, you would make a request like the following:

<Tabs>
  <TabItem value="input" label="Input" default>

```shell
curl https://api.runpod.ai/v2/stable-diffusion-v1/status/1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${YOUR_API_KEY}"
```

</TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "delayTime": 699,
  "executionTime": 5488,
  "id": "1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1",
  "output": [
    {
      "image": "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/01-24/1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ebf97c96008980701d3a38cf47337f28%2F20240124%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20240124T192059Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=66d5ffc5244ec88148f38420416332925a2f33a91151f2f0c208f28872453810",
      "seed": 49802
    }
  ],
  "status": "COMPLETED"
}
```
  </TabItem>

</Tabs>

## Cancel

Cancel is an endpoint that cancels your job.
It is useful for cancelling your job.

<Tabs>
  <TabItem value="input" label="Input" default>

```shell
curl https://api.runpod.ai/v2/stable-diffusion-v1/cancel/1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1 \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${YOUR_API_KEY}"
```

</TabItem>
  <TabItem value="ouput" label="Output">

```json
{
  "id": "1b30c19b-9729-46d0-b0fc-a2e96b9342fa-u1",
  "status": "CANCELLED"
}
```

</TabItem>

</Tabs>

## Health

Health is an endpoint that returns the health of your serverless worker. It is useful for checking the health of your serverless worker.
The health check is a utility function that can be called on any endpoint to provide worker and queue metrics.
<Tabs>
<TabItem value="input" label="Input" default>

```bash
curl --request GET \
     --url https://api.runpod.ai/v2/stable-diffusion-v1/health \
     --header "accept: application/json" \
     --header "authorization: Bearer ${YOUR_API_KEY}"
```

</TabItem>
  <TabItem value="ouput" label="Output">
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

:::note

You must retrieve your results via the status endpoint within 30 minutes as RunPod does not keep your inputs or outputs longer than that to protect your privacy.

:::
