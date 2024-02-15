---
title: "Send a request"
description: "The method in which jobs are submitted and returned."
sidebar_position: 4
---

With a successful custom endpoint deployed, you are nearly ready to make a job request.
Let's start by constructing our request body that will be submitted.

## JSON Request Body

Requests to your endpoint must be made via a JSON formatted request; at a minimum, it will need to have an `input` key containing a dictionary of inputs required to complete your job request. For example, if your handler required an input prompt, you might send in something like this:

```json
{
  "input": {
    "prompt": "The lazy brown fox jumps over the"
  }
}
```

---

## Optional Inputs

Along with an input key, other top-level inputs can also be included and offer different functions. If a key is passed in at the top level and not included here, it will be discarded and unavailable to your handler.

> 👍 These optional inputs are available to all endpoints regardless of the worker.

### ⚓ | Webhook

To be notified of completed jobs, a URL can be passed within the top level of the request like so:

```json
{
  "input": {},
  "webhook": "https://URL.TO.YOUR.WEBHOOK"
}
```

Your webhook endpoint should respond with a 200 status to acknowledge the successful call. If not received, the webhook will be attempted up to 2 times after a 10-second timeout.

A POST request will be sent to your URL when the job is complete. This request will contain the same information you would receive if you fetched the results from the `/status/{job_id}` endpoint.

### 📜 | Execution Policy

By default, if a job remains `IN_PROGRESS` for longer than 24 hours without completion, it's automatically terminated.
This default behavior ensures that resources aren't indefinitely consumed by jobs that are unable to complete.
To customize the management of job lifecycles and resource consumption, the following policies can be configured:

- **Execution Timeout**: Specifies the maximum duration a job can run before it's automatically terminated. This limit helps prevent jobs from running indefinitely and consuming resources unnecessarily.
- **Low Priority**: When set, the job is marked as low priority. This option is ideal for non-time-sensitive tasks that don't require immediate execution. Low priority jobs won't trigger a scale-up of resources and only execute when higher priority jobs aren't pending. When the queue is empty, low priority jobs are executed.
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

By configuring both the execution timeout and TTL policies, you can have more control over job execution and system resource management, ensuring efficient operation and preventing resource wastage.

### 💾 | S3-Compatible Storage

The credentials for S3-compatible object storage can be passed in with the request as follows:

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

The configuration is only passed onto the worker; it will not be returned as part of the job request output.

_Note: The serverless worker will need to contain the logic/functionality that allows it to make sure of this input. If you build a custom endpoint and request s3Config in the input, your worker is ultimately responsible for using the information passed in to upload the output._
