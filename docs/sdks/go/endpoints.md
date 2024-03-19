---
title: Endpoints
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Interacting with RunPod's endpoints is a core feature of the SDK, enabling the execution of tasks and the retrieval of results.
This section covers the synchronous and asynchronous execution methods, along with checking the status of operations.

## Prerequisites

Before using the RunPod Go SDK, ensure that you have:

- Installed the RunPod Go SDK.
- Configured your API key.

## Set your Endpoint Id

Set your RunPod API key and your Endpoint Id as environment variables.

```go
import (
    "os"

    "github.com/runpod/go-sdk/pkg/config"
    "github.com/runpod/go-sdk/pkg/rpEndpoint"
    "github.com/runpod/go-sdk/pkg/sdk"
)

func main() {
    endpoint, err := rpEndpoint.New(
        &config.Config{ApiKey: sdk.String(os.Getenv("RP_API_KEY"))},
        &rpEndpoint.Option{EndpointId: sdk.String(os.Getenv("RP_ENDPOINT_ID"))},
    )
    if err != nil {
        panic(err)
    }

    // Use the endpoint object
    // ...
}
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
  <TabItem value="go" label="Go" default>

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/runpod/go-sdk/pkg/sdk"
	"github.com/runpod/go-sdk/pkg/sdk/config"
	rpEndpoint "github.com/runpod/go-sdk/pkg/sdk/endpoint"
)

func main() {

	endpoint, err := rpEndpoint.New(
		&config.Config{ApiKey: sdk.String("XBFH94HD274LQ93IZ9ITIDQHQZ02YHCX7IV08DCZ")},
		&rpEndpoint.Option{EndpointId: sdk.String("azl59qv3r6e182")},
	)
	if err != nil {
		panic(err)
	}
	jobInput := rpEndpoint.RunSyncInput{
		JobInput: &rpEndpoint.JobInput{
			Input: map[string]interface{}{"mock_delay": 10},
		},
		Timeout: sdk.Int(120),
	}
	output, err := endpoint.RunSync(&jobInput)
	if err != nil {
		panic(err)
	}
	data, _ := json.Marshal(output)
	fmt.Printf("output: %s\n", data)
}
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
  <TabItem value="go" label="Go" default>

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/runpod/go-sdk/pkg/sdk"
	"github.com/runpod/go-sdk/pkg/sdk/config"
	rpEndpoint "github.com/runpod/go-sdk/pkg/sdk/endpoint"
)

func main() {

	endpoint, err := rpEndpoint.New(
		&config.Config{ApiKey: sdk.String("XBFH94HD274LQ93IZ9ITIDQHQZ02YHCX7IV08DCZ")},
		&rpEndpoint.Option{EndpointId: sdk.String("azl59qv3r6e182")},
	)
	if err != nil {
		panic(err)
	}
	jobInput := rpEndpoint.RunInput{
		JobInput: &rpEndpoint.JobInput{
			Input: map[string]interface{}{"mock_delay": 95},
		},
		RequestTimeout: sdk.Int(120),
	}
	output, err := endpoint.Run(&jobInput)
	if err != nil {
		panic(err)
	}
	data, _ := json.Marshal(output)
	fmt.Printf("output: %s\n", data)
}
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
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
  <TabItem value="go" label="Go" default>

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/runpod/go-sdk/pkg/sdk"
	"github.com/runpod/go-sdk/pkg/sdk/config"
	rpEndpoint "github.com/runpod/go-sdk/pkg/sdk/endpoint"
)

func main() {

	endpoint, err := rpEndpoint.New(
		&config.Config{ApiKey: sdk.String("XBFH94HD274LQ93IZ9ITIDQHQZ02YHCX7IV08DCZ")},
		&rpEndpoint.Option{EndpointId: sdk.String("azl59qv3r6e182")},
	)
	if err != nil {
		panic(err)
	}

	request, err := endpoint.Run(&rpEndpoint.RunInput{
		JobInput: &rpEndpoint.JobInput{
			Input: map[string]interface{}{
				"mock_return": []string{
					"value1",
					"value2",
					"value3",
					"value4",
					"value5",
					"value6",
					"value7",
					"value8",
					"value9",
					"value10",
				},
				"mock_delay": 10,
				"mock_error": false,
				"mock_crash": false,
			},
		},
	})
	if err != nil {
		panic(err)
	}

	streamChan := make(chan rpEndpoint.StreamOutput, 100)

	err = endpoint.Stream(&rpEndpoint.StreamInput{Id: request.Id}, streamChan)
	if err != nil {
		// timeout reached, if we want to get the data that has been streamed
		if err.Error() == "ctx timeout reached" {
			for data := range streamChan {
				dt, _ := json.Marshal(data)
				fmt.Printf("output:%s\n", dt)
			}
		}
		panic(err)
	}

	for data := range streamChan {
		dt, _ := json.Marshal(data)
		fmt.Printf("output:%s\n", dt)
	}

}
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

## Health check

Monitor the health of an endpoint by checking its status, including jobs completed, failed, in progress, in queue, and retried, as well as the status of workers.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
  <TabItem value="go" label="Go" default>

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/runpod/go-sdk/pkg/sdk"
	"github.com/runpod/go-sdk/pkg/sdk/config"
	rpEndpoint "github.com/runpod/go-sdk/pkg/sdk/endpoint"
)

func main() {

	endpoint, err := rpEndpoint.New(
		&config.Config{ApiKey: sdk.String("API_KEY")},
		&rpEndpoint.Option{EndpointId: sdk.String("ENDPOINT_ID")},
	)
	if err != nil {
		panic(err)
	}
	input := rpEndpoint.StatusInput{
		Id: sdk.String("30edb8b9-2b8d-4977-af7a-85fd91f51a12-u1"),
	}
	output, err := endpoint.Status(&input)
	if err != nil {
		panic(err)
	}
	dt, _ := json.Marshal(output)
	fmt.Printf("output:%s\n", dt)
}
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
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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

## Purge queue

You can purge all jobs from a queue by using the `purgeQueue()` function.

`purgeQueue()` doesn't affect Jobs in progress.

<Tabs>
  <TabItem value="go" label="Go" default>

```go
// Code examples will be added here
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
```
