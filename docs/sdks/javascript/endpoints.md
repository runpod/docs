---
title: Endpoints
description: "Learn how to interact with RunPod's endpoints using the JavaScript SDK, including synchronous and asynchronous execution methods, status checks, and job cancellation. Discover how to set timeouts, execute policies, and purge queues."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Interacting with RunPod's endpoints is a core feature of the SDK, enabling the execution of tasks and the retrieval of results.
This section covers the synchronous and asynchronous execution methods, along with checking the status of operations.

## Prerequisites

Before using the RunPod JavaScript, ensure that you have:

- Installed the RunPod JavaScript SDK.
- Configured your API key.

## Set your Endpoint Id

Set your RunPod API key and your Endpoint Id as environment variables.

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
```

This allows all calls to pass through your Endpoint Id with a valid API key.

In most situations, you'll set a variable name `endpoint` on the `Endpoint` class.
This allows you to use the following methods or instances variables from the `Endpoint` class:

- [health](#health-check)
- [purge_queue](#purge-queue)
- [runSync](#run-synchronously)
- [run](#run-asynchronously)

## Run the Endpoint

Run the Endpoint with the either the asynchronous `run` or synchronous `runSync` method.

Choosing between asynchronous and synchronous execution hinges on your task's needs and application design.

### Run synchronously

To execute an endpoint synchronously and wait for the result, use the `runSync` method on your endpoint.
This method blocks the execution until the endpoint run is complete or until it times out.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
const result = await endpoint.runSync({
  "input": {
    "prompt": "Hello, World!",
  },
});

console.log(result);
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  delayTime: 18,
  executionTime: 36595,
  id: 'sync-d050a3f6-791a-4aff-857a-66c759db4a06-u1',
  output: [ { choices: [Array], usage: [Object] } ],
  status: 'COMPLETED',
  started: true,
  completed: true,
  succeeded: true
}
```

</TabItem>
</Tabs>

## Run asynchronously

Asynchronous execution allows for non-blocking operations, enabling your code to perform other tasks while waiting for an operation to complete.

For non-blocking operations, use the `run` method on the endpoint.
This method allows you to start an endpoint run and then check its status or wait for its completion at a later time.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
const result = await endpoint.run({
  "input": {
    "prompt": "Hello, World!",
  },
});

console.log(result);
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "d4e960f6-073f-4219-af24-cbae6b532c31-u1",
  "status": "IN_QUEUE"
}
```

</TabItem>
</Tabs>

### Get results from an asynchronous run

The following example shows how to get the results of an asynchronous run.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  const runpod = runpodSdk(RUNPOD_API_KEY);
  const endpoint = runpod.endpoint(ENDPOINT_ID);
  const result = await endpoint.run({
    input: {
      prompt: "Hello, World!",
    },
  });

  console.log(result);
  console.log("run response");
  console.log(result);

  const { id } = result; // Extracting the operation ID from the initial run response

  // Check the status in a loop, similar to the working example
  for (let i = 0; i < 20; i++) {
    // Increase or decrease the loop count as necessary
    const statusResult = await endpoint.status(id);
    console.log("status response");
    console.log(statusResult);

    if (
      statusResult.status === "COMPLETED"
      || statusResult.status === "FAILED"
    ) {
      // Once completed or failed, log the final status and break the loop
      if (statusResult.status === "COMPLETED") {
        console.log("Operation completed successfully.");
        console.log(statusResult.output);
      } else {
        console.log("Operation failed.");
        console.log(statusResult);
      }
      break;
    }

    // Wait for a bit before checking the status again
    await sleep(5000);
  }
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">

```json
run response
{ id: 'c671a352-78e6-4eba-b2c8-2ea537c00897-u1', status: 'IN_QUEUE' }
status response
{
  delayTime: 19,
  id: 'c671a352-78e6-4eba-b2c8-2ea537c00897-u1',
  status: 'IN_PROGRESS',
  started: true,
  completed: false,
  succeeded: false
}
status response
{
  delayTime: 19,
  executionTime: 539,
  id: 'c671a352-78e6-4eba-b2c8-2ea537c00897-u1',
  output: [ { choices: [Array], usage: [Object] } ],
  status: 'COMPLETED',
  started: true,
  completed: true,
  succeeded: true
}
Operation completed successfully.
[ { choices: [ [Object] ], usage: { input: 5, output: 16 } } ]
```

</TabItem>
</Tabs>

### Poll the status of an asynchronous run

Uses `await endpoint.status(id)` to check the status of the operation repeatedly until it either completes or fails.
After each check, the function waits for 5 seconds (or any other suitable duration you choose) before checking the status again, using the sleep function.
This approach ensures your application remains responsive and doesn't overwhelm the Runpod endpoint with status requests.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

// Function to pause execution for a specified time
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function main() {
  try {
    const runpod = runpodSdk(RUNPOD_API_KEY);
    const endpoint = runpod.endpoint(ENDPOINT_ID);
    const result = await endpoint.run({
      input: {
        prompt: "Hello, World!",
      },
    });

    const { id } = result;
    if (!id) {
      console.error("No ID returned from endpoint.run");
      return;
    }

    // Poll the status of the operation until it completes or fails
    let isComplete = false;
    while (!isComplete) {
      const status = await endpoint.status(id);
      console.log(`Current status: ${status.status}`);

      if (status.status === "COMPLETED" || status.status === "FAILED") {
        isComplete = true; // Exit the loop
        console.log(`Operation ${status.status.toLowerCase()}.`);

        if (status.status === "COMPLETED") {
          console.log("Output:", status.output);
        } else {
          console.error("Error details:", status.error);
        }
      } else {
        await sleep(5000); // Adjust the delay as needed
      }
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">

```text
Current status: IN_QUEUE
Current status: IN_PROGRESS
Current status: COMPLETED
Operation completed.
Hello, World!
```

</TabItem>
</Tabs>

## Stream

Stream allows you to stream the output of an Endpoint run.
To enable streaming, your handler must support the `"return_aggregate_stream": True` option on the `start` method of your Handler.
Once enabled, use the `stream` method to receive data as it becomes available.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

async function main() {
  const runpod = runpodSdk(RUNPOD_API_KEY);
  const endpoint = runpod.endpoint(ENDPOINT_ID);
  const result = await endpoint.run({
    input: {
      prompt: "Hello, World!",
    },
  });

  console.log(result);

  const { id } = result;
  for await (const result of endpoint.stream(id)) {
    console.log(`${JSON.stringify(result, null, 2)}`);
  }
  console.log("done streaming");
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">
```json
{ id: 'cb68890e-436f-4234-955d-001db6afe972-u1', status: 'IN_QUEUE' }
{
  "output": "H"
}
{
  "output": "e"
}
{
  "output": "l"
}
{
  "output": "l"
}
{
  "output": "o"
}
{
  "output": ","
}
{
  "output": " "
}
{
  "output": "W"
}
{
  "output": "o"
}
{
  "output": "r"
}
{
  "output": "l"
}
{
  "output": "d"
}
{
  "output": "!"
}
done streaming
```

</TabItem>

<TabItem value="handler" label="Handler" default>

You must define your handler to support the `"return_aggregate_stream": True` option on the `start` method.

```python
from time import sleep
import runpod


def handler(job):
    job_input = job["input"]["prompt"]

    for i in job_input:
        sleep(1)  # sleep for 1 second for effect
        yield i


runpod.serverless.start(
    {
        "handler": handler,
        "return_aggregate_stream": True,  # Ensures aggregated results are streamed back
    }
)
```

</TabItem>
</Tabs>

:::note

The maximum size for a payload that can be sent using yield to stream results is 1 MB.

:::

## Health check

Monitor the health of an endpoint by checking its status, including jobs completed, failed, in progress, in queue, and retried, as well as the status of workers.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);

const health = await endpoint.health();
console.log(health);
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "jobs": {
    "completed": 72,
    "failed": 1,
    "inProgress": 6,
    "inQueue": 0,
    "retried": 1
  },
  "workers": {
    "idle": 4,
    "initializing": 0,
    "ready": 4,
    "running": 1,
    "throttled": 0
  }
}
```

</TabItem>
</Tabs>

## Status

Use the `status` method and specify the `id` of the run to get the status of a run.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

async function main() {
  try {
    const runpod = runpodSdk(RUNPOD_API_KEY);
    const endpoint = runpod.endpoint(ENDPOINT_ID);
    const result = await endpoint.run({
      input: {
        prompt: "Hello, World!",
      },
    });

    const { id } = result;
    if (!id) {
      console.error("No ID returned from endpoint.run");
      return;
    }

    const status = await endpoint.status(id);
    console.log(status);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "delayTime": 18,
  "id": "792b1497-b2c8-4c95-90bf-4e2a6a2a37ff-u1",
  "status": "IN_PROGRESS",
  "started": true,
  "completed": false,
  "succeeded": false
}
```

</TabItem>
</Tabs>

## Cancel

You can cancel a Job request by using the `cancel()` function on the run request.
You might want to cancel a Job because it's stuck with a status of `IN_QUEUE` or `IN_PROGRESS`, or because you no longer need the result.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

async function main() {
  try {
    const runpod = runpodSdk(RUNPOD_API_KEY);
    const endpoint = runpod.endpoint(ENDPOINT_ID);
    const result = await endpoint.run({
      input: {
        prompt: "Hello, World!",
      },
    });

    const { id } = result;
    if (!id) {
      console.error("No ID returned from endpoint.run");
      return;
    }

    const cancel = await endpoint.cancel(id);
    console.log(cancel);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "5fb6a8db-a8fa-41a1-ad81-f5fad9755f9e-u1",
  "status": "CANCELLED"
}
```

</TabItem>
</Tabs>

### Timeout

To set a timeout on a run, pass a timeout value to the `run` method.
Time is measured in milliseconds.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
const result = await endpoint.run({
  "input": {
    "prompt": "Hello, World!",
  },
}, 5000);

console.log(result);
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "43309f93-0422-4eac-92cf-e385dee36e99-u1",
  "status": "IN_QUEUE"
}
```

</TabItem>
</Tabs>

### Execution policy

You can set the maximum time to wait for a response from the endpoint in the `policy` parameter.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
const result = await endpoint.run({
  "input": {
    "prompt": "Hello, World!",
  },
  policy: {
    executionTimeout: 5000,
  },
});

console.log(result);
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "21bd3763-dcbf-4091-84ee-85b80907a020-u1",
  "status": "IN_QUEUE"
}
```

</TabItem>
</Tabs>

For more information, see [Execution policy](/serverless/endpoints/job-operations).

## Purge queue

You can purge all jobs from a queue by using the `purgeQueue()` function.

`purgeQueue()` doesn't affect Jobs in progress.

<Tabs>
  <TabItem value="javascript" label="JavaScript" default>

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

async function main() {
  try {
    const runpod = runpodSdk(RUNPOD_API_KEY);
    const endpoint = runpod.endpoint(ENDPOINT_ID);
    await endpoint.run({
      input: {
        prompt: "Hello, World!",
      },
    });

    const purgeQueue = await endpoint.purgeQueue();
    console.log(purgeQueue);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "removed": 1,
  "status": "completed"
}
```

</TabItem>
</Tabs>
