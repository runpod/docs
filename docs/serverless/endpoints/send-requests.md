---
title: "Send a request"
description: "The method in which jobs are submitted and returned."
sidebar_position: 4
---

Before sending a job request, ensure you have deployed your custom endpoint.

Let's start by constructing our request body to send to the endpoint.

## JSON Request Body

You can make requests to your endpoint with JSON. Your request must include a JSON object containing an `input` key. For example, if your handler requires an input prompt, you might send in something like this:

```json
{
  "input": {
    "prompt": "The lazy brown fox jumps over the"
  }
}
```

## Optional Inputs

Along with an input key, you can include other top-level inputs to access different functions. If a key is passed in at the top level and not included in the body of your request, it will be discarded and unavailable to your handler.

The following optional inputs are available to all endpoints regardless of the worker.

- Webhooks
- Execution policies
- S3-compatible storage

### Webhooks

To see notifications for completed jobs, pass a URL in the top level of the request:

```json
{
  "input": {},
  "webhook": "https://URL.TO.YOUR.WEBHOOK"
}
```

Your webhook endpoint should respond with a `200` status to acknowledge the successful call. If the call is not successful, the request waits 10 seconds and sends the call again up to two more times.

A `POST` request goes to your URL when the job is complete. This request contains the same information as fetching the results from the `/status/{job_id}` endpoint.

### Execution Policies

By default, if a job remains `IN_PROGRESS` for longer than 10 minutes without completion, it's automatically terminated.

This default behavior keeps a hanging request from draining your account credits.

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

### S3-Compatible Storage

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

The serverless worker must contain logic that allows it to use this input. If you build a custom endpoint and request s3Config in the job input, your worker is ultimately responsible for using the information passed in to upload the output.

:::
