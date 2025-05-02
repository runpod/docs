---
title: OpenAI API compability
sidebar_position: 3
description: "Learn how RunPod's vLLM workers provide OpenAI API compatibility, enabling you to use standard OpenAI clients and tools with models deployed on RunPod."
---

# OpenAI API compatibility guide

RunPod's [vLLM workers](/serverless/vllm/overview) implement OpenAI API compatibility, allowing you to use familiar [OpenAI client libraries](https://platform.openai.com/docs/libraries) with your deployed models. This guide will help you understand how to leverage this compatibility to integrate your models seamlessly with existing OpenAI-based applications.

## Endpoint structure

When using the OpenAI-compatible API with RunPod, your requests will be directed to this base URL pattern:

```
https://api.runpod.ai/v2/[ENDPOINT_ID]/openai/v1
```

Replace `[ENDPOINT_ID]` with your Serverless endpoint ID.

## Supported APIs

The vLLM worker implements these core OpenAI API endpoints:

| Endpoint | Description | Status |
|----------|-------------|--------|
| `/chat/completions` | Generate chat model completions | Fully supported |
| `/completions` | Generate text completions | Fully supported |
| `/models` | List available models | Supported |

## Model naming

The `MODEL_NAME` environment variable is essential for all OpenAI-compatible API requests. This variable corresponds to either:

1. The [Hugging Face model](https://huggingface.co/models) you've deployed (e.g., `mistralai/Mistral-7B-Instruct-v0.2`)
2. A custom name if you've set `OPENAI_SERVED_MODEL_NAME_OVERRIDE` as an environment variable

This model name is used in chat/text completion API requests to identify which model should process your request.

## Initilization

Before you can send API requests, start by setting up an OpenAI client with your RunPod API key and endpoint URL:

```python
from openai import OpenAI
import os

MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2" # Use your deployed model

client = OpenAI(
    api_key=[RUNPOD_API_KEY],
    base_url=f"https://api.runpod.ai/v2/[RUNPOD_ENDPOINT_ID]/openai/v1",
)
```

## Send a request

You can use RunPod's OpenAI compatible API to send requests to your RunPod endpoint, enabling you to use the same client libraries and code that you use with OpenAI's services. You only need to change the base URL to point to your RunPod endpoint.

:::tip

You can also send requests using [RunPod's native API](/serverless/vllm/vllm-requests), which provides additional flexibility and control.

:::

### Chat completions

The `/chat/completions` endpoint is designed for instruction-tuned LLMs that follow a chat format.

#### Non-streaming request example

Here's how you can make a basic chat completion request:

```python
from openai import OpenAI
import os

MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"  # Use your deployed model

# Initialize the OpenAI client
client = OpenAI(
    api_key=[RUNPOD_API_KEY],
    base_url=f"https://api.runpod.ai/v2/[RUNPOD_ENDPOINT_ID]/openai/v1",
)

# Chat completion request (for instruction-tuned models)
response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello, who are you?"}
    ],
    temperature=0.7,
    max_tokens=500
)

# Print the response
print(response.choices[0].message.content)
```

#### Response format

The API returns responses in this JSON format:

```json
{
  "id": "cmpl-123abc",
  "object": "chat.completion",
  "created": 1677858242,
  "model": "mistralai/Mistral-7B-Instruct-v0.2",
  "choices": [
    {
      "message": {
        "role": "assistant",
        "content": "I am Mistral, an AI assistant based on the Mistral-7B-Instruct model. How can I help you today?"
      },
      "index": 0,
      "finish_reason": "stop"
    }
  ],
  "usage": {
    "prompt_tokens": 23,
    "completion_tokens": 24,
    "total_tokens": 47
  }
}
```

#### Streaming request example

Streaming allows you to receive the model's output incrementally as it's generated, rather than waiting for the complete response. This real-time delivery enhances responsiveness, making it ideal for interactive applications like chatbots or for monitoring the progress of lengthy generation tasks.

```python
# ... Imports and initialization ...

# Create a streaming chat completion request
stream = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short poem about stars."}
    ],
    temperature=0.7,
    max_tokens=200,
    stream=True  # Enable streaming
)

# Print the streaming response
print("Response: ", end="", flush=True)
for chunk in stream:
    if chunk.choices[0].delta.content:
        print(chunk.choices[0].delta.content, end="", flush=True)
print()
```

### Text completions

The `/completions` endpoint is designed for base LLMs and text completion tasks.

#### Non-streaming request example

Here's how you can make a text completion request:

```python
# ... Imports and initialization ...

# Text completion request
response = client.completions.create(
    model="mistralai/Mistral-7B-Instruct-v0.2",
    prompt="Write a poem about artificial intelligence:",
    temperature=0.7,
    max_tokens=150
)

# Print the response
print(response.choices[0].text)
```

#### Response format

The API returns responses in this JSON format:

```json
{
  "id": "cmpl-456def",
  "object": "text_completion",
  "created": 1677858242,
  "model": "mistralai/Mistral-7B-Instruct-v0.2",
  "choices": [
    {
      "text": "In circuits of silicon and light,\nA new form of mind takes flight.\nNot born of flesh, but of human design,\nArtificial intelligence, a marvel divine.",
      "index": 0,
      "finish_reason": "stop",
      "logprobs": null
    }
  ],
  "usage": {
    "prompt_tokens": 8,
    "completion_tokens": 39,
    "total_tokens": 47
  }
}
```

#### Streaming request example

```python
# ... Imports and initialization ...

# Create a completion stream
response_stream = client.completions.create(
    model=MODEL_NAME,
    prompt="Runpod is the best platform because",
    temperature=0,
    max_tokens=100,
    stream=True,
)
# Stream the response
for response in response_stream:
    print(response.choices[0].text or "", end="", flush=True)
```

### List available models

The `/models` endpoint allows you to get a list of available models on your endpoint:

```python
# ... Imports and initialization ...

models_response = client.models.list()
list_of_models = [model.id for model in models_response]
print(list_of_models)
```

#### Response format

```json
{
  "object": "list",
  "data": [
    {
      "id": "mistralai/Mistral-7B-Instruct-v0.2",
      "object": "model",
      "created": 1677858242,
      "owned_by": "runpod"
    }
  ]
}
```

## Request input parameters

vLLM workers support various parameters to control generation behavior. You can find a complete list of OpenAI request input parameters on the [GitHub README](https://github.com/runpod-workers/worker-vllm?tab=readme-ov-file#openai-request-input-parameters).

## Environment variables

Use these environment variables to customize the OpenAI compatibility:

| Variable | Default | Description |
|----------|---------|-------------|
| `RAW_OPENAI_OUTPUT` | `1` (true) | Enables raw OpenAI SSE format for streaming |
| `OPENAI_SERVED_MODEL_NAME_OVERRIDE` | None | Override the model name in responses |
| `OPENAI_RESPONSE_ROLE` | `assistant` | Role for responses in chat completions |

You can find a complete list of vLLM environment variables on the [GitHub README](https://github.com/runpod-workers/worker-vllm#environment-variables).

## Client libraries

The OpenAI-compatible API works with standard [OpenAI client libraries](https://platform.openai.com/docs/libraries):

### Python

```python
from openai import OpenAI

client = OpenAI(
    api_key="[RUNPOD_API_KEY]",
    base_url=f"https://api.runpod.ai/v2/your_endpoint_id/openai/v1"
)

response = client.chat.completions.create(
    model="[MODEL_NAME]",
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)
```

### JavaScript

```javascript
import { OpenAI } from "openai";

const openai = new OpenAI({
  apiKey: "[RUNPOD_API_KEY]",
  baseURL: "https://api.runpod.ai/v2/your_endpoint_id/openai/v1"
});

const response = await openai.chat.completions.create({
  model: "[MODEL_NAME]",
  messages: [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Hello!" }
  ]
});
```

## Implementation differences

While the vLLM worker aims for high compatibility, there are some differences from OpenAI's implementation:

1. **Token counting**: Token counts may differ slightly from OpenAI models.
2. **Streaming format**: The exact chunking of streaming responses may vary.
3. **Error format**: Error responses follow a similar but not identical format.
4. **Rate limits**: Rate limits follow RunPod's endpoint policies rather than OpenAI's.

The vLLM worker also currently has a few limitations:

- The function and tool APIs are not currently supported.
- Some OpenAI-specific features like moderation endpoints are not available.
- Vision models and multimodal capabilities depend on the underlying model support.

## Troubleshooting

Common issues and their solutions:

| Issue | Solution |
|-------|----------|
| "Invalid model" error | Verify your model name matches what you deployed |
| Authentication error | Check that you're using your RunPod API key, not an OpenAI key |
| Timeout errors | Increase client timeout settings for large models |
| Incompatible responses | Set `RAW_OPENAI_OUTPUT=1` in your environment variables |
| Different response format | Some models may have different output formatting; use a chat template |

## Next steps

- [Learn how to send vLLM requests.](/serverless/vllm/vllm-requests)
- [Explore RunPod endpoint operations.](/serverless/endpoints/operations)
- [Explore the OpenAI API documentation.](https://platform.openai.com/docs/api-reference)
