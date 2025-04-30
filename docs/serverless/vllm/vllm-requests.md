---
title: Send vLLM requests
sidebar_position: 2
description: "Learn how to deploy a vLLM worker on RunPod Serverless to create a scalable endpoint for your large language model (LLM) applications."
---

# Send requests to vLLM workers

This page covers different methods for sending requests to vLLM workers on RunPod, including code examples and best practices for both the OpenAI-compatible API and RunPod's native API format. By understanding these request formats and parameters, you can effectively integrate LLMs into your applications while maintaining control over performance and cost.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've created a [RunPod API key](/get-started/api-keys).
- You've installed [Python](https://www.python.org/downloads/).
- (For gated models) You've created a [Hugging Face access token](https://huggingface.co/docs/hub/en/security-tokens).

Many of the code samples below will require you to input your endpoint ID. You can find your endpoint ID on the endpoint details page:

<img src="/img/docs/serverless-endpoint-id.png" width="900" alt="Screenshot of the workers tab in the RunPod console."/>

## OpenAI API requests

You can use the OpenAI API to send requests to your RunPod endpoint, enabling you to use the same client libraries and code that you use with OpenAI's services. You only need to change the base URL to point to your RunPod endpoint.

### Python example with OpenAI client

```python
from openai import OpenAI
import os

# Set your environment variables
API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"
MODEL_NAME = "mistralai/Mistral-7B-Instruct-v0.2"  # Use your deployed model

# Initialize the OpenAI client
client = OpenAI(
    api_key=YOUR_API_,
    base_url=f"https://api.runpod.ai/v2/{ENDPOINT_ID}/openai/v1",
)

# Chat completion request (for instruction-tuned models)
response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain how gravity works in simple terms."}
    ],
    temperature=0.7,
    max_tokens=500
)

# Print the response
print(response.choices[0].message.content)
```

### Streaming responses

For a more interactive experience, you can use streaming responses:

```python
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

### Using text completions instead of chat

For base models or when you prefer the completions API:

```python
# Text completion request
response = client.completions.create(
    model=MODEL_NAME,
    prompt="The capital city of France is",
    temperature=0.3,
    max_tokens=100
)

# Print the response
print(response.choices[0].text)
```

## RunPod API requests

RunPod's native API provides additional flexibility and control over your requests. These requests follow RunPod's standard [endpoint operations](/serverless/endpoints/operations) format.

### Python Example

Replace `[YOUR_API_KEY]` with your RunPod API key.

```python
import requests

url = "https://api.runpod.ai/v2/<endpoint_id>/run"
headers = {"Authorization": "Bearer [YOUR_API_KEY]", "Content-Type": "application/json"}

data = {"input": {
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short poem."}
    ],
    "sampling_params": {"temperature": 0.7, "max_tokens": 100}
}}

response = requests.post(url, headers=headers, json=data)
print(response.json())
```

### cURL Example

Run the following command in your local terminal, replacing `[YOUR_API_KEY]` with your RunPod API key and [YOUR_ENDPOINT_ID] with your vLLM endpoint ID.

```sh
curl -X POST "https://api.runpod.ai/v2/[YOUR_ENDPOINT_ID]/run" \
     -H "Authorization: Bearer [YOUR_API_KEY]" \
     -H "Content-Type: application/json" \
     -d '{"input":
               {
                 "prompt": "Write a haiku about nature.",
                 "sampling_params": {"temperature": 0.8, "max_tokens": 50}
         }}'
```

## Request parameters

vLLM workers support various parameters to control generation behavior. Here are the most commonly used ones:

### Common parameters

- `temperature` (float): Controls randomness (0.0 = deterministic, higher = more random)
- `max_tokens` (int): Maximum number of tokens to generate
- `top_p` (float): Nucleus sampling parameter (0.0-1.0)
- `top_k` (int): Limits consideration to top k tokens
- `stop` (string or array): Sequence(s) at which to stop generation
- `repetition_penalty` (float): Penalizes repetition (1.0 = no penalty)

### Advanced parameters

- `presence_penalty` (float): Penalizes new tokens already in text
- `frequency_penalty` (float): Penalizes token frequency
- `min_p` (float): Minimum probability threshold relative to most likely token
- `best_of` (int): Number of completions to generate server-side
- `use_beam_search` (boolean): Whether to use beam search instead of sampling

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


## Request Parameters

vLLM request paramters are formatted like this:

```json
"input": {
    "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short poem about stars."}    ],
    "stream": True,
    "sampling_params": {
        "temperature": 0.7,
        "max_tokens": 500
    }
}
```

The tables below contain a complete list of available request parameters.

### Input parameters

| Argument                   | Type                   | Default                                    | Description                                                                                                 |
| -------------------------- | ---------------------- | ------------------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| `prompt`                   | `str`                  | `None`                                     | The input string for text generation.                                                                       |
| `messages`                 | `list[dict[str, str]]` | `None`                                     | A list of messages with roles (`system`, `user`, `assistant`). Overrides `prompt`.                          |
| `apply_chat_template`      | `bool`                 | `False`                                    | Whether to apply the model's chat template to the `prompt`.                                                 |
| `sampling_params`          | `dict`                 | `{}`                                       | Sampling parameters to control generation (see below).                                                      |
| `stream`                   | `bool`                 | `False`                                    | Whether to enable streaming of the output.                                                                  |
| `max_batch_size`           | `int`                  | env var `DEFAULT_BATCH_SIZE`               | The maximum number of tokens to stream every HTTP POST call.                                                |
| `min_batch_size`           | `int`                  | env var `DEFAULT_MIN_BATCH_SIZE`           | The minimum number of tokens to stream every HTTP POST call.                                                |
| `batch_size_growth_factor` | `int`                  | env var `DEFAULT_BATCH_SIZE_GROWTH_FACTOR` | The growth factor by which min_batch_size will be multiplied for each call until max_batch_size is reached. |


### Sampling Parameters

These are parameters that you can specify in the `sampling_params` dictionary.

| Argument                        | Type                          | Default | Description                                                  |
| ------------------------------- | ----------------------------- | ------- | ------------------------------------------------------------ |
| `n`                             | `int`                         | `1`     | Number of output sequences generated.                        |
| `best_of`                       | `Optional[int]`               | `n`     | Number of sequences generated before selecting the best `n`. |
| `presence_penalty`              | `float`                       | `0.0`   | Penalizes tokens based on their presence.                    |
| `frequency_penalty`             | `float`                       | `0.0`   | Penalizes tokens based on frequency.                         |
| `repetition_penalty`            | `float`                       | `1.0`   | Penalizes tokens based on repetition.                        |
| `temperature`                   | `float`                       | `1.0`   | Controls randomness; lower values make it deterministic.     |
| `top_p`                         | `float`                       | `1.0`   | Limits probability mass of top tokens.                       |
| `top_k`                         | `int`                         | `-1`    | Limits number of top tokens considered.                      |
| `min_p`                         | `float`                       | `0.0`   | Minimum probability relative to most likely token.           |
| `use_beam_search`               | `bool`                        | `False` | Enables beam search.                                         |
| `length_penalty`                | `float`                       | `1.0`   | Penalizes sequences based on length.                         |
| `early_stopping`                | `Union[bool, str]`            | `False` | Controls stopping conditions.                                |
| `stop`                          | `Union[None, str, List[str]]` | `None`  | Stop generation on specified strings.                        |
| `stop_token_ids`                | `Optional[List[int]]`         | `None`  | Stop generation on specified token IDs.                      |
| `ignore_eos`                    | `bool`                        | `False` | Ignore End-Of-Sequence token.                                |
| `max_tokens`                    | `int`                         | `16`    | Maximum tokens generated.                                    |
| `skip_special_tokens`           | `bool`                        | `True`  | Whether to skip special tokens in the output.                |
| `spaces_between_special_tokens` | `bool`                        | `True`  | Whether to add spaces between special tokens.                |



## Error handling

When working with vLLM workers, it's important to implement proper error handling to address potential issues such as network timeouts, rate limiting, worker initialization delays, and model loading errors.

Here is an example error handling implentation:

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

## Next

For more information, refer to the [RunPod endpoint operations documentation](/serverless/endpoints/operations) and the [vLLM GitHub repository](https://github.com/vllm-project/vllm) for the latest updates on supported features and optimizations.
