---
title: Send vLLM requests
sidebar_position: 2
description: "Learn how to send requests to vLLM workers on RunPod Serverless, including code examples and best practices for RunPod's native API format."
---

# Send requests to vLLM workers

This guide covers different methods for sending requests to vLLM workers on RunPod, including code examples and best practices for RunPod's native API format. Use this guide to effectively integrate LLMs into your applications while maintaining control over performance and cost.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've created a [RunPod API key](/get-started/api-keys).
- You've installed [Python](https://www.python.org/downloads/).
- (For gated models) You've created a [Hugging Face access token](https://huggingface.co/docs/hub/en/security-tokens).

Many of the code samples below will require you to input your endpoint ID. You can find your endpoint ID on the endpoint details page:

<img src="/img/docs/serverless-endpoint-id.png" width="900" alt="Screenshot of the workers tab in the RunPod console."/>

## RunPod API requests

RunPod's native API provides additional flexibility and control over your requests. These requests follow RunPod's standard [endpoint operations](/serverless/endpoints/operations) format.

### Python Example

Replace `[RUNPOD_API_KEY]` with your RunPod API key.

```python
import requests

url = "https://api.runpod.ai/v2/<endpoint_id>/run"
headers = {"Authorization": "Bearer [RUNPOD_API_KEY]", "Content-Type": "application/json"}

data = {
    "input": {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "Write a short poem."}
        ],
        "sampling_params": {"temperature": 0.7, "max_tokens": 100}
    }
}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### cURL Example

Run the following command in your local terminal, replacing `[RUNPOD_API_KEY]` with your RunPod API key and `[RUNPOD_ENDPOINT_ID]` with your vLLM endpoint ID.

```sh
curl -X POST "https://api.runpod.ai/v2/[RUNPOD_ENDPOINT_ID]/run" \
     -H "Authorization: Bearer [RUNPOD_API_KEY]" \
     -H "Content-Type: application/json" \
     -d '{
           "input": {
             "prompt": "Write a haiku about nature.",
             "sampling_params": {"temperature": 0.8, "max_tokens": 50}
           }
         }'
```

## Request formats

vLLM workers accept two primary input formats:

### Messages format (for chat models)

```json
{
  "messages": [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": "Tell me about the solar system."}
  ]
}
```

### Prompt format (for text completion)

```json
{
  "prompt": "Summarize the following text: Climate change is a global challenge that affects..."
}
```

## Request input parameters

vLLM workers support various parameters to control generation behavior. Here are some commonly used parameters:

| Parameter | Type | Description |
|-----------|------|-------------|
| `temperature` | `float` | Controls randomness (0.0-1.0) |
| `max_tokens` | `int` | Maximum number of tokens to generate |
| `top_p` | `float` | Nucleus sampling parameter (0.0-1.0) |
| `top_k` | `int` | Limits consideration to top k tokens |
| `stop` | `string` or `array` | Sequence(s) at which to stop generation |
| `repetition_penalty` | `float` | Penalizes repetition (1.0 = no penalty) |
| `presence_penalty` | `float` | Penalizes new tokens already in text |
| `frequency_penalty` | `float` | Penalizes token frequency |
| `min_p` | `float` | Minimum probability threshold relative to most likely token |
| `best_of` | `int` | Number of completions to generate server-side |
| `use_beam_search` | `boolean` | Whether to use beam search instead of sampling |

You can find a complete list of request input parameters on the [GitHub README](https://github.com/runpod-workers/worker-vllm?tab=readme-ov-file#usage-standard-non-openai).

## Error handling

When working with vLLM workers, it's crucial to implement proper error handling to address potential issues such as network timeouts, rate limiting, worker initialization delays, and model loading errors.

Here is an example error handling implementation:

```python
import requests
import time
import backoff  # pip install backoff

@backoff.on_exception(backoff.expo, requests.exceptions.RequestException, max_tries=5)
def send_request(url, headers, payload):
    response = requests.post(url, headers=headers, json=payload)
    response.raise_for_status()  # Raises an exception for 4XX/5XX responses
    return response.json()

try:
    result = send_request(url, headers, payload)
    print(f"Success: {result}")
except requests.exceptions.HTTPError as e:
    if e.response.status_code == 429:
        print("Rate limit exceeded. Try again later.")
    elif e.response.status_code == 500:
        print("Server error. The model may be having trouble loading.")
    else:
        print(f"HTTP error: {e}")
except requests.exceptions.ConnectionError:
    print("Connection error. Check your network and endpoint ID.")
except requests.exceptions.Timeout:
    print("Request timed out. The model may be processing a large batch.")
except Exception as e:
    print(f"An unexpected error occurred: {e}")
```

## Best practices

Here are some best practices to keep in mind when creating your requests:

1. **Use appropriate timeouts**: Set timeouts based on your model size and complexity.
2. **Implement retry logic**: Add exponential backoff for failed requests.
3. **Optimize batch size**: Adjust request frequency based on model inference speed.
4. **Monitor response times**: Track performance to identify optimization opportunities.
5. **Use streaming for long responses**: Improve user experience for lengthy content generation.
6. **Cache frequent requests**: Reduce redundant API calls for common queries.
7. **Handle rate limits**: Implement queuing for high-volume applications.

## Next steps

- [Send requests using the OpenAI-compatible API.](/serverless/vllm/openai-compatibility)
- [Learn how to use Serverless endpoint operations.](/serverless/endpoints/operations)
