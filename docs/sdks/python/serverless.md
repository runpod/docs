---
title: Serverless
---

The Python SDK allows you to create Serverless Workers that are deployed to RunPod as custom Endpoints.

## Set your Endpoint Id

Pass your Endpoint Id on the `Endpoint` class.

```python
import runpod

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")
```

This allows all calls to pass through your Endpoint Id with a valid API key.

## Run the Endpoint

Run the Endpoint with the either the asynchronous `run` or synchronous `run_sync` method.

Set your method call on the instances of the endpoint.
`run` returns a Job Id.

```python
import runpod

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

endpoint.run(
    {"input": "your custom prompt"}
)
```

---

Alternatively, use can set `run_sync` for synchronously requests.
`run_sync` returns a dictionary of strings or any.

```python
import runpod

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

endpoint.run_sync(
    {"input": "your custom prompt"}
)
```

You can also set a timeout on the `run_sync` request.
The timeout is set in seconds.

```python
import runpod

endpoint = runpod.Endpoint("YOUR_ENDPOINT_ID")

endpoint.run_sync(
    {"input": "your custom prompt"},
    timeout=60
)
```
