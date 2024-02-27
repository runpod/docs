---
title: Troubleshooting
sidebar_position: 4
---

This guide is designed to help you navigate and resolve common issues encountered when using the vLLM Workers.
It focuses on ensuring the correct setup of the Base URL, which is a crucial step in successfully interacting with the vLLM Worker API.

## Ensuring Correct Base URL Setup

Correct setup of the Base URL is essential for successful interaction with the vLLM Workers.
By following the guidelines and examples provided, you can mitigate common issues and ensure a smooth integration process.

Remember to verify your Base URL and the specific route requirements when configuring your client or sending requests.

The Base URL is the foundational link to the vLLM Worker API, facilitating the sending of requests. It's formatted as follows:

```bash
https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/openai/v1
```

Key points to remember:

- The domain `api.runpod.ai` should be used, which is distinct from the commonly associated Endpoint URL `api.runpod.io`.
- The path `openai/v1` is specified to direct requests to the vLLM Worker API.
- When using libraries that support `chat.completions.create`, it's unnecessary to include the route in the Base URL. This distinction is crucial for seamless integration.

### Example Usage

**In Python Library:**

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url=f"https://api.runpod.ai/v2/{endpoint_id}/openai/v1",
    api_key=os.environ.get("RUNPOD_API_KEY"),
)
```

This Python code snippet demonstrates how to configure the client with the correct Base URL and API key, ensuring a smooth connection to the vLLM Workers.

**In `curl` Command:**

```bash
curl https://api.runpod.ai/v2/${YOUR_ENDPOINT_ID}/openai/v1/chat/completions \
 // additional parameters here
```

Using `curl`, you need to explicitly specify the route (`chat/completions`), contrasting with some library implementations.

### Common Errors

Incorrect Base URL setup can lead to errors, such as:

```json
{
  "code": 400,
  "message": "Invalid route",
  "object": "error",
  "param": null,
  "type": "BadRequestError"
}
```

Or:

```output
{
  "delayTime": 673,
  "executionTime": 263,
  "id": "sync-fec10561-45f9-4a05-8765-3f1e213a64b6-u1",
  "output": [
    {
      "code": 400,
      "message": "Invalid route",
      "object": "error",
      "param": null,
      "type": "BadRequestError"
    }
  ],
  "status": "COMPLETED"
}
```

These errors typically indicate that the Base URL is incorrectly configured.
Ensure that the URL is correctly formatted and that the correct domain and route are used.
