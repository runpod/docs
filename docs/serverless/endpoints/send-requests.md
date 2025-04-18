---
title: "Send requests"
description: "Learn how to send requests to your Serverless endpoint, including constructing JSON request bodies, testing with the UI, using cURL, and configuring optional inputs for webhooks, execution policies, and S3-compatible storage."
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Send requests to an endpoint

After deploying a Serverless endpoint, you need to know how to interact with it effectively. This guide covers everything from testing your endpoint in the console to sending requests programmatically and configuring advanced options.

## Understanding request structure

Before sending requests, it's important to understand the basic structure. All requests to RunPod endpoints must:

1. Include an `input` object that contains the parameters for your worker's [handler function](/serverless/handlers/overview).
2. Be formatted as valid JSON.
3. Include your API key for authentication (unless sent from the RunPod console).

### Basic request structure

Every request must include a JSON object containing an `input` key. This is the minimum valid request:

```json
{
  "input": {
    "prompt": "Your input here"
  }
}
```

The exact parameters inside the `input` object depend on your specific worker implementation. Check your worker's documentation for the required and optional parameters.

## Testing methods

### Test in the RunPod console

The quickest way to test your endpoint is directly in the RunPod console:

1. Navigate to the [Serverless section](https://www.runpod.io/console/serverless).
2. Select your endpoint.
3. Click the **Requests** tab.

<img src="/img/docs/serverless-get-started-endpoint-details.png" width="900" alt="Screenshot of the endpoint details page."/>

You'll see a default test request in the editor:

```json
{
    "input": {
        "prompt": "Hello World"
    }
}
```

You can modify this request as needed, then click **Run** to test your endpoint. On first execution, your workers will need to initialize, which may take a moment.

The initial response will look similar to this:

```json
{
  "id": "6de99fd1-4474-4565-9243-694ffeb65218-u1",
  "status": "IN_QUEUE"
}
```

After processing completes, you'll see the full response. If there are any errors, the console will display error logs to help you troubleshoot.

### Send requests programmatically

Once your endpoint is working correctly, you'll likely want to integrate it with your applications. Here are examples using common methods:

<Tabs>
  <TabItem value="curl" label="cURL" default>

For command-line testing or scripting:

```bash
curl --request POST \
     --url https://api.runpod.ai/v2/[ENDPOINT_ID]/runsync \
     --header "accept: application/json" \
     --header "authorization: [YOUR_API_KEY]" \
     --header "content-type: application/json" \
     --data '
{
  "input": {
    "prompt": "A coffee cup.",
    "height": 512,
    "width": 512,
    "num_outputs": 1,
    "num_inference_steps": 50,
    "guidance_scale": 7.5,
    "scheduler": "KLMS"
  }
}
'
```

Replace `[ENDPOINT_ID]` with your endpoint ID and `[YOUR_API_KEY]` with your RunPod API key.
  </TabItem>

  <TabItem value="python" label="Python" default>


To send a request using the RunPod Python SDK:

```python
import runpod
import os

runpod.api_key = os.getenv("[YOUR_API_KEY]")

endpoint = runpod.Endpoint("[ENDPOINT_ID]")

try:
    run_request = endpoint.run_sync(
        {
            "prompt": "Hello, world!",
        },
        timeout=60,  # Timeout in seconds.
    )

    print(run_request)
except TimeoutError:
    print("Job timed out.")
```

For more details, see the [RunPod Python SDK reference](/sdks/python/endpoints).

</TabItem>

<TabItem value="javascript" label="JavaScript" default>

To send a request using the RunPod JavaScript SDK:

```javascript
const { [YOUR_API_KEY], [ENDPOINT_ID] } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk([YOUR_API_KEY]);
const endpoint = runpod.endpoint([ENDPOINT_ID]);
const result = await endpoint.runSync({
  "input": {
    "prompt": "Hello, World!",
  },
});

console.log(result);
```

For more details, see the [RunPod JavaScript SDK reference](/sdks/javascript/endpoints).

</TabItem>

</Tabs>


## Advanced configuration options

In addition to the required `input` object, you can include optional top-level parameters to enable additional functionality.

### Webhook notifications

To receive notifications when your job completes, specify a webhook URL:

```json
{
  "input": {
    "prompt": "Your input here"
  },
  "webhook": "https://your-webhook-url.com"
}
```

When your job completes, RunPod will send a `POST` request to your webhook URL containing the same information as the `/status/{job_id}` endpoint. Your webhook should return a `200` status code to acknowledge receipt. If the call fails, RunPod will retry up to 2 more times with a 10-second delay between attempts.

### Execution policies

By default, if a job remains `IN_PROGRESS` for longer than 10 minutes without completion, it's automatically terminated. This default behavior keeps a hanging request from draining your account credits. You can manually control job execution behavior with policies:

```json
{
  "input": {
    "prompt": "Your input here"
  },
  "policy": {
    "executionTimeout": 900000,  // 15 minutes in milliseconds
    "lowPriority": false,
    "ttl": 3600000  // 1 hour in milliseconds
  }
}
```

Policy options include:

| Option | Description | Default | Constraints |
|--------|-------------|---------|------------|
| `executionTimeout` | Maximum job runtime in milliseconds | 600000 (10 minutes) | Must be > 5000 ms |
| `lowPriority` | When true, job won't trigger worker scaling | false | - |
| `ttl` | Maximum queue time in milliseconds | 86400000 (24 hours) | Must be ≥ 10000 ms, max 1 week |

:::note

Setting the `executionTimeout` in a request overrides the default endpoint setting for that specific job only.

:::

### S3-compatible storage integration

For endpoints that need to work with large files, configure S3-compatible storage:

```json
{
  "input": {
    "prompt": "Your input here"
  },
  "s3Config": {
    "accessId": "your-access-id",
    "accessSecret": "your-access-secret",
    "bucketName": "your-bucket-name",
    "endpointUrl": "your-s3-endpoint-url"
  }
}
```

This configuration is passed directly to your worker but is not included in the response. Your worker must contain logic to use this information for storage operations.

:::tip
The S3 integration works with any S3-compatible storage provider, not just AWS S3. You can use MinIO, Backblaze B2, DigitalOcean Spaces, and other compatible providers.
:::

## Asynchronous vs. synchronous requests

RunPod endpoints support two types of requests: synchronous and asynchronous. To learn about them in more detail, see [Endpoint operations](/serverless/endpoints/operations).

### Synchronous requests (`/runsync`)

Synchronous requests wait for the job to complete and return the result in a single response:

```
POST https://api.runpod.ai/v2/{endpoint_id}/runsync
```

Best for:
- Short-running tasks (under 30 seconds)
- Interactive applications where immediate results are needed
- Simpler client code (no need to poll for status)

### Asynchronous requests (`/run`)

Asynchronous requests return immediately with a job ID, allowing your application to continue while the job processes in the background:

```
POST https://api.runpod.ai/v2/{endpoint_id}/run
```

Best for:
- Long-running tasks
- Batch processing
- Workflows with webhooks

When using asynchronous requests, you'll need to check the job status using the `/status/{job_id}` endpoint or configure a webhook to receive the result.

## Error handling

When sending requests, be prepared to handle these common errors:

| HTTP Status | Meaning | Solution |
|-------------|---------|----------|
| 400 | Bad Request | Check your request format and parameters |
| 401 | Unauthorized | Verify your API key is correct and has permission |
| 404 | Not Found | Check your endpoint ID |
| 429 | Too Many Requests | Implement backoff and retry logic |
| 500 | Internal Server Error | Check endpoint logs; worker may have crashed |

Implementing proper error handling and retry logic will make your integrations more robust.

## Next steps

Now that you've learned how to send requests to your endpoint, you can:

- [Manage job operations.](/serverless/endpoints/operations)
- [Create more advanced handler functions.](/serverless/handlers/overview)
- [Learn about local testing.](/serverless/development/local-testing)
- [Deploy your endpoints with GitHub.](/serverless/github-integration)