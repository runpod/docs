---
title: OpenAI compatibility
sidebar_position: 3
---

The vLLM Worker is compatible with OpenAI's API, so you can use the same code to interact with the vLLM Worker as you would with OpenAI's API.

## Conventions

Completions endpoint provides the completion for a single prompt and takes a single string as an input.

Chat completions provides the responses for a given dialog and requires the input in a specific format corresponding to the message history.

Choose the convention that works best for your use case.

### Model names

The `MODEL_NAME` environment variable is required for all requests.
Use this value when making requests to the vLLM Worker.

Model names in RunPod follow the `model:tag` format.

For example `openchat/openchat-3.5-1210`, `mistral:latest`, `llama2:70b`.

Generate a response for a given prompt with a provided model. This is a streaming endpoint, so there will be a series of responses. The final response object will include statistics and additional data from the request.

### Parameters

When using the chat completion feature of the vLLM Serverless Endpoint Worker, you can customize your requests with the following parameters:

### Chat Completions

<details>
  <summary>Supported Chat Completions inputs and descriptions</summary>

| Parameter           | Type                             | Default Value | Description                                                                                                                                                                                                                                                  |
| ------------------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `messages`          | Union[str, List[Dict[str, str]]] |               | List of messages, where each message is a dictionary with a `role` and `content`. The model's chat template will be applied to the messages automatically, so the model must have one or it should be specified as `CUSTOM_CHAT_TEMPLATE` env var.           |
| `model`             | str                              |               | The model repo that you've deployed on your RunPod Serverless Endpoint. If you are unsure what the name is or are baking the model in, use the guide to get the list of available models in the **Examples: Using your RunPod endpoint with OpenAI** section |
| `temperature`       | Optional[float]                  | 0.7           | Float that controls the randomness of the sampling. Lower values make the model more deterministic, while higher values make the model more random. Zero means greedy sampling.                                                                              |
| `top_p`             | Optional[float]                  | 1.0           | Float that controls the cumulative probability of the top tokens to consider. Must be in (0, 1]. Set to 1 to consider all tokens.                                                                                                                            |
| `n`                 | Optional[int]                    | 1             | Number of output sequences to return for the given prompt.                                                                                                                                                                                                   |
| `max_tokens`        | Optional[int]                    | None          | Maximum number of tokens to generate per output sequence.                                                                                                                                                                                                    |
| `seed`              | Optional[int]                    | None          | Random seed to use for the generation.                                                                                                                                                                                                                       |
| `stop`              | Optional[Union[str, List[str]]]  | list          | List of strings that stop the generation when they are generated. The returned output will not contain the stop strings.                                                                                                                                     |
| `stream`            | Optional[bool]                   | False         | Whether to stream or not                                                                                                                                                                                                                                     |
| `presence_penalty`  | Optional[float]                  | 0.0           | Float that penalizes new tokens based on whether they appear in the generated text so far. Values > 0 encourage the model to use new tokens, while values < 0 encourage the model to repeat tokens.                                                          |
| `frequency_penalty` | Optional[float]                  | 0.0           | Float that penalizes new tokens based on their frequency in the generated text so far. Values > 0 encourage the model to use new tokens, while values < 0 encourage the model to repeat tokens.                                                              |
| `logit_bias`        | Optional[Dict[str, float]]       | None          | Unsupported by vLLM                                                                                                                                                                                                                                          |
| `user`              | Optional[str]                    | None          | Unsupported by vLLM                                                                                                                                                                                                                                          |

### Additional parameters supported by vLLM

| Parameter                       | Type                | Default Value | Description                                                                                                                                                                                                                                                                               |
| ------------------------------- | ------------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `best_of`                       | Optional[int]       | None          | Number of output sequences that are generated from the prompt. From these `best_of` sequences, the top `n` sequences are returned. `best_of` must be greater than or equal to `n`. This is treated as the beam width when `use_beam_search` is True. By default, `best_of` is set to `n`. |
| `top_k`                         | Optional[int]       | -1            | Integer that controls the number of top tokens to consider. Set to -1 to consider all tokens.                                                                                                                                                                                             |
| `ignore_eos`                    | Optional[bool]      | False         | Whether to ignore the EOS token and continue generating tokens after the EOS token is generated.                                                                                                                                                                                          |
| `use_beam_search`               | Optional[bool]      | False         | Whether to use beam search instead of sampling.                                                                                                                                                                                                                                           |
| `stop_token_ids`                | Optional[List[int]] | list          | List of tokens that stop the generation when they are generated. The returned output will contain the stop tokens unless the stop tokens are special tokens.                                                                                                                              |
| `skip_special_tokens`           | Optional[bool]      | True          | Whether to skip special tokens in the output.                                                                                                                                                                                                                                             |
| `spaces_between_special_tokens` | Optional[bool]      | True          | Whether to add spaces between special tokens in the output. Defaults to True.                                                                                                                                                                                                             |
| `add_generation_prompt`         | Optional[bool]      | True          | Read more [here](https://huggingface.co/docs/transformers/main/en/chat_templating#what-are-generation-prompts)                                                                                                                                                                            |
| `echo`                          | Optional[bool]      | False         | Echo back the prompt in addition to the completion                                                                                                                                                                                                                                        |
| `repetition_penalty`            | Optional[float]     | 1.0           | Float that penalizes new tokens based on whether they appear in the prompt and the generated text so far. Values > 1 encourage the model to use new tokens, while values < 1 encourage the model to repeat tokens.                                                                        |
| `min_p`                         | Optional[float]     | 0.0           | Float that represents the minimum probability for a token to                                                                                                                                                                                                                              |
| `length_penalty`                | Optional[float]     | 1.0           | Float that penalizes sequences based on their length. Used in beam search..                                                                                                                                                                                                               |
| `include_stop_str_in_output`    | Optional[bool]      | False         | Whether to include the stop strings in output text. Defaults to False.                                                                                                                                                                                                                    |

</details>

### Completions

<details>
  <summary>Supported Completions inputs and descriptions</summary>

| Parameter           | Type                                              | Default Value | Description                                                                                                                                                                                                                                                   |
| ------------------- | ------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `model`             | str                                               |               | The model repo that you've deployed on your RunPod Serverless Endpoint. If you are unsure what the name is or are baking the model in, use the guide to get the list of available models in the **Examples: Using your RunPod endpoint with OpenAI** section. |
| `prompt`            | Union[List[int], List[List[int]], str, List[str]] |               | A string, array of strings, array of tokens, or array of token arrays to be used as the input for the model.                                                                                                                                                  |
| `suffix`            | Optional[str]                                     | None          | A string to be appended to the end of the generated text.                                                                                                                                                                                                     |
| `max_tokens`        | Optional[int]                                     | 16            | Maximum number of tokens to generate per output sequence.                                                                                                                                                                                                     |
| `temperature`       | Optional[float]                                   | 1.0           | Float that controls the randomness of the sampling. Lower values make the model more deterministic, while higher values make the model more random. Zero means greedy sampling.                                                                               |
| `top_p`             | Optional[float]                                   | 1.0           | Float that controls the cumulative probability of the top tokens to consider. Must be in (0, 1]. Set to 1 to consider all tokens.                                                                                                                             |
| `n`                 | Optional[int]                                     | 1             | Number of output sequences to return for the given prompt.                                                                                                                                                                                                    |
| `stream`            | Optional[bool]                                    | False         | Whether to stream the output.                                                                                                                                                                                                                                 |
| `logprobs`          | Optional[int]                                     | None          | Number of log probabilities to return per output token.                                                                                                                                                                                                       |
| `echo`              | Optional[bool]                                    | False         | Whether to echo back the prompt in addition to the completion.                                                                                                                                                                                                |
| `stop`              | Optional[Union[str, List[str]]]                   | list          | List of strings that stop the generation when they are generated. The returned output will not contain the stop strings.                                                                                                                                      |
| `seed`              | Optional[int]                                     | None          | Random seed to use for the generation.                                                                                                                                                                                                                        |
| `presence_penalty`  | Optional[float]                                   | 0.0           | Float that penalizes new tokens based on whether they appear in the generated text so far. Values > 0 encourage the model to use new tokens, while values < 0 encourage the model to repeat tokens.                                                           |
| `frequency_penalty` | Optional[float]                                   | 0.0           | Float that penalizes new tokens based on their frequency in the generated text so far. Values > 0 encourage the model to use new tokens, while values < 0 encourage the model to repeat tokens.                                                               |
| `best_of`           | Optional[int]                                     | None          | Number of output sequences that are generated from the prompt. From these `best_of` sequences, the top `n` sequences are returned. `best_of` must be greater than or equal to `n`. This parameter influences the diversity of the output.                     |
| `logit_bias`        | Optional[Dict[str, float]]                        | None          | Dictionary of token IDs to biases.                                                                                                                                                                                                                            |
| `user`              | Optional[str]                                     | None          | User identifier for personalizing responses. (Unsupported by vLLM)                                                                                                                                                                                            |

### Additional parameters supported by vLLM

| Parameter                       | Type                | Default Value | Description                                                                                                                                                                                                        |
| ------------------------------- | ------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `top_k`                         | Optional[int]       | -1            | Integer that controls the number of top tokens to consider. Set to -1 to consider all tokens.                                                                                                                      |
| `ignore_eos`                    | Optional[bool]      | False         | Whether to ignore the End Of Sentence token and continue generating tokens after the EOS token is generated.                                                                                                       |
| `use_beam_search`               | Optional[bool]      | False         | Whether to use beam search instead of sampling for generating outputs.                                                                                                                                             |
| `stop_token_ids`                | Optional[List[int]] | list          | List of tokens that stop the generation when they are generated. The returned output will contain the stop tokens unless the stop tokens are special tokens.                                                       |
| `skip_special_tokens`           | Optional[bool]      | True          | Whether to skip special tokens in the output.                                                                                                                                                                      |
| `spaces_between_special_tokens` | Optional[bool]      | True          | Whether to add spaces between special tokens in the output. Defaults to True.                                                                                                                                      |
| `repetition_penalty`            | Optional[float]     | 1.0           | Float that penalizes new tokens based on whether they appear in the prompt and the generated text so far. Values > 1 encourage the model to use new tokens, while values < 1 encourage the model to repeat tokens. |
| `min_p`                         | Optional[float]     | 0.0           | Float that represents the minimum probability for a token to be considered, relative to the most likely token. Must be in [0, 1]. Set to 0 to disable.                                                             |
| `length_penalty`                | Optional[float]     | 1.0           | Float that penalizes sequences based on their length. Used in beam search.                                                                                                                                         |
| `include_stop_str_in_output`    | Optional[bool]      | False         | Whether to include the stop strings in output text. Defaults to False.                                                                                                                                             |

</details>

## Initialize your project

Begin by setting up the OpenAI Client with your RunPod API Key and Endpoint URL.

```python
from openai import OpenAI
import os

# Initialize the OpenAI Client with your RunPod API Key and Endpoint URL
client = OpenAI(
    api_key=os.environ.get("RUNPOD_API_KEY"),
    base_url="https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/openai/v1",
)
```

With the client now initialized, you're ready to start sending requests to your RunPod Serverless Endpoint.

## Generating a request

You can leverage LLMs for instruction-following and chat capabilities.
This is suitable for a variety of open source chat and instruct models such as:

- `meta-llama/Llama-2-7b-chat-hf`
- `mistralai/Mixtral-8x7B-Instruct-v0.1`
- and more

Models not inherently designed for chat and instruct tasks can be adapted using a custom chat template specified by the `CUSTOM_CHAT_TEMPLATE` environment variable.

For more information see the [OpenAI documentation](https://platform.openai.com/docs/guides/text-generation).

### Streaming responses

For real-time interaction with the model, create a chat completion stream.
This method is ideal for applications requiring feedback.

```python
# Create a chat completion stream
response_stream = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[{"role": "user", "content": "Why is RunPod the best platform?"}],
    temperature=0,
    max_tokens=100,
    stream=True,
)
# Stream the response
for response in response_stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)
```

### Non-streaming responses

You can also return a synchronous, non-streaming response for batch processing or when a single, consolidated response is sufficient.

```python
# Create a chat completion
response = client.chat.completions.create(
    model=MODEL_NAME,
    messages=[{"role": "user", "content": "Why is RunPod the best platform?"}],
    temperature=0,
    max_tokens=100,
)
# Print the response
print(response.choices[0].message.content)
```

## Generating a Chat Completion

This method is tailored for models that support text completion.
It complements your input with a continuation stream of output, differing from the interactive chat format.

### Streaming responses

Enable streaming for continuous, real-time output.
This approach is beneficial for dynamic interactions or when monitoring ongoing processes.

```python
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

### Non-streaming responses

Choose a non-streaming method when a single, consolidated response meets your needs.

```python
# Create a completion
response = client.completions.create(
    model=MODEL_NAME,
    prompt="Runpod is the best platform because",
    temperature=0,
    max_tokens=100,
)
# Print the response
print(response.choices[0].text)
```

## Get a list of available models

You can list the available models.

```python
models_response = client.models.list()
list_of_models = [model.id for model in models_response]
print(list_of_models)
```
