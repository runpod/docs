---
title: "Send a request"
description: "Learn how to send requests to your Serverless endpoint, including constructing JSON request bodies, testing with the UI, using cURL, and configuring optional inputs for webhooks, execution policies, and S3-compatible storage."
sidebar_position: 3
---

# Send a request to a Serverless endpoint

After you've deployed an endpoint, you can send requests to test and use it. This guide covers different ways to send requests and configure them.

## Test your endpoint through the UI

To test your endpoint, click the **Requests** tab in the endpoint detail page:

<img src="/img/docs/serverless-get-started-endpoint-details.png" width="900" alt="Screenshot of the endpoint details page."/>

On the left you should see the default test request:

```json
{
    "input": {
        "prompt": "Hello World"
    }
}
```

If your endpoint is configured to accept input in this form (i.e., the handler function is configured to look for the `"prompt"` key in the input object), you can click **Run** to test . It will take some time for your workers to initialize.

When the workers have finished processing your request, you should see output on the right side of the page similar to this:



1. From the Serverless endpoint detail page in the [RunPod console](https://www.runpod.io/console/serverless), select **Requests**.

2. Select **Run**.
3. You should see a successful response with the following:

```json
{
  "id": "6de99fd1-4474-4565-9243-694ffeb65218-u1",
  "status": "IN_QUEUE"
}
```

After a few minutes, the stream will show the full response.

## Send a request using cURL

You can send requests to your endpoint using cURL or any HTTP client. Here's an example:

```curl
curl --request POST \
     --url https://api.runpod.ai/v2/${endpoint_id}/runsync \
     --header "accept: application/json" \
     --header "authorization: ${YOUR_API_KEY}" \
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

Where `endpoint_id` is the name of your endpoint and `YOUR_API_KEY` is your API key.

:::note

Depending on any modifications you made to your handler function, you may need to modify the request.

:::

## JSON request body structure

Your request must include a JSON object containing an `input` key. For example, if your handler requires an input prompt, you might send in something like this:

```json
{
  "input": {
    "prompt": "The lazy brown fox jumps over the"
  }
}
```

## Optional inputs

Along with an input key, you can include other top-level inputs to access different functions. If a key is passed in at the top level and not included in the body of your request, it will be discarded and unavailable to your handler.

The following optional inputs are available to all endpoints regardless of the worker.

- Webhooks
- Execution policies
- S3-compatible storage

### Webhooks

To receive notifications for completed jobs, pass a URL in the top level of the request:

```json
{
  "input": {},
  "webhook": "https://URL.TO.YOUR.WEBHOOK"
}
```

Your webhook endpoint should respond with a `200` status to acknowledge the successful call. If the call is not successful, the request waits 10 seconds and sends the call again up to two more times.

A `POST` request goes to your URL when the job is complete. This request contains the same information as fetching the results from the `/status/{job_id}` endpoint.

### Execution policies

By default, if a job remains `IN_PROGRESS` for longer than 10 minutes without completion, it's automatically terminated. This default behavior keeps a hanging request from draining your account credits.

To customize the management of job lifecycles and resource consumption, the following policies can be configured:

- **Execution Timeout**: Specifies the maximum duration that a job can run before it's automatically terminated. This limit helps prevent jobs from running indefinitely and consuming resources. You can overwrite the value for a request by specifying `executionTimeout` in the job input.

:::note

Changing the **Execution Timeout** value through the Web UI sets the value for all requests to an Endpoint.
You can still overwrite the value for individual requests with `executionTimeout` in the job input.

:::

- **Low Priority**: When true, the job does not trigger scaling up resources to execute. Instead, it executes when there are no pending higher priority jobs in the queue. Use this option for tasks that are not time-sensitive.
- **TTL (Time-to-Live)**: Defines the maximum time a job can remain in the queue before it's automatically terminated. This parameter ensures that jobs don't stay in the queue indefinitely.

```json
{
  "input": {},
  "policy": {
    "executionTimeout": int, // Time in milliseconds. Must be greater than 5 seconds.
    "lowPriority": bool, // Sets the job's priority to low. Default behavior escalates to high under certain conditions.
    "ttl": int // Time in milliseconds. Must be greater than or equal to 10 seconds. Default is 24 hours. Maximum is one week.
  }
}
```

By configuring the execution timeout, priority, and TTL policies, you have more control over job execution and efficient system resource management.

### S3-compatible storage

Pass in the credentials for S3-compatible object storage as follows:

```json
{
  "input": {},
  "s3Config": {
    "accessId": "key_id_or_username",
    "accessSecret": "key_secret_or_password",
    "bucketName": "storage_location_name",
    "endpointUrl": "storage_location_address"
  }
}
```

The configuration only passes to the worker. It is not returned as part of the job request output.

:::note

The Serverless worker must contain logic that allows it to use this input. If you build a custom endpoint and request s3Config in the job input, your worker is ultimately responsible for using the information passed in to upload the output.

:::

## Next steps

Now that you've learned how to send requests to your endpoint, you can:

- [Invoke jobs](/serverless/endpoints/job-operations)
- [Create more advanced handler functions](/serverless/handlers/overview)
- [Learn about local testing](/serverless/development/local-testing)
- [Deploy your endpoints with GitHub](/serverless/github-integration)
