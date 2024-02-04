---
title: Endpoints
---

## Run Sync

## Run

### Async Job requests

Example of calling an endpoint using asyncio.

## Health

Example of calling a Health Endpoint.

```python
import runpod

endpoint = runpod.Endpoint("gwp4kx5yd3nur1")

endpoint_health = endpoint.health()

print(endpoint_health)
```

## Streaming

Example of Streaming your Endpoint.

```python
import runpod

endpoint = runpod.Endpoint("gwp4kx5yd3nur1")

run_request = endpoint.run({
    "input": {
        "mock_return": ["a", "b", "c", "d", "e", "f", "g"],
        "mock_delay": 1,
    }
})

for output in run_request.stream():
    print(output)
```
