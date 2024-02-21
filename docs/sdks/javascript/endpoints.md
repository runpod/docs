---
title: Endpoints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Interacting with RunPod's endpoints is a core feature of the SDK, enabling the execution of tasks and retrieval of results.
This section covers the synchronous and asynchronous execution methods, along with checking the status of operations.

## Run sync

Use the `runSync` method to run an endpoint synchronously.
This method will block until the endpoint has completed execution.
The `runSync` method returns the result of the endpoint execution.

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

## Run async

Use the `run` method to run an endpoint asynchronously.
This will return a promise that resolves when the endpoint has completed execution.

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

## Get the status of a run

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

## Health

To get the health of your Endpoint instance, use the `health` method.

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

## Timeout

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

## Execution policy

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

For more information, see [Execution policy](/serverless/endpoints/send-requests#execution-policy).
