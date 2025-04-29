---
title: Get started
sidebar_position: 2
description: "Deploy a Serverless Endpoint for large language models (LLMs) with RunPod, a simple and efficient way to run vLLM Workers with minimal configuration."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RunPod provides a simple way to run large language models (LLMs) as Serverless Endpoints.
vLLM Workers are pre-built Docker images that you can configure entirely within the RunPod UI.
This tutorial will guide you through deploying an OpenAI compatible endpoint with a vLLM inference engine on RunPod.

## Prerequisites

Before getting started, ensure you have the following:

- A RunPod account
- A Hugging Face token (if using gated models)
- OpenAI or other required libraries installed for the code examples

## Deploy using the Web UI

You can use RunPod's Web UI to deploy a vLLM Worker with a model directly from Hugging Face.

1. Log in to your RunPod account and go to the [Serverless page](https://www.runpod.io/console/serverless).
2. Under **Quick Deploy**, find **Serverless vLLM** and choose **Start**.

You will now enter the vLLM module. Follow the on-screen instructions to add your LLM as a Serverless endpoint:

1. Select a vLLM version.
2. Add a Hugging Face model (e.g., `openchat/openchat-3.5-0106`).
3. (Optional) Add a Hugging Face token for gated models.
4. Review your options and choose **Next**.

On the **vLLM parameters** page, provide additional parameters and options for your model:

1. In **LLM Settings**, enter **8192** for the **Max Model Length** parameter.
2. Review your options and choose **Next**.

On the **endpoint Parameters** page, configure your deployment:

1. Specify your GPU configuration for your Worker.
2. Configure your Worker deployment.

- Verify the **Container Image** uses your desired CUDA version.
- Update the **Container Disk** size if needed.

4. Select **Deploy**.

Once the endpoint initializes, you can send requests to your [endpoint](/serverless/endpoints/send-requests).
Continue to the [Send a request](#send-a-request) section.

## Deploy using the Worker image

One advantage of deploying your model with the vLLM Worker is the minimal configuration required. For most models, you only need to provide the pre-built vLLM Worker image name and the LLM model name.

Follow these steps to run the vLLM Worker on a Serverless endpoint:

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New endpoint**.
3. Provide the following:
   - endpoint name
   - Select a GPU (filter for CUDA 12.1.0+ support under the **Advanced** tab if needed)
   - Configure the number of Workers
   - (Optional) Select **FlashBoot** to speed up Worker startup times
   - Enter the vLLM RunPod Worker image name with the compatible CUDA version:
     - `runpod/worker-vllm:stable-cuda11.8.0`
     - `runpod/worker-v1-vllm:stable-cuda12.1.0`
   - (Optional) Select a [network storage volume](/serverless/endpoints/manage-endpoints#add-a-network-volume)
   - Configure the environment variables:
     - `MODEL_NAME`: (Required) The large language model (e.g., `openchat/openchat-3.5-0106`)
     - `HF_TOKEN`: (Optional) Your Hugging Face API token for private models
4. Select **Deploy**.

Once the endpoint initializes, you can send requests to your [endpoint](/serverless/endpoints/send-requests).

For a complete list of available environment variables, see the [vLLM Worker variables](/serverless/vllm/environment-variables).

## Send a request

This section walks you through sending a request to your Serverless endpoint.
The vLLM Worker can use any Hugging Face model and is compatible with OpenAI's API.
If you have the OpenAI library installed, you can continue using it with the vLLM Worker. See the [OpenAI documentation](https://platform.openai.com/docs/libraries/) for more information.

### Environment setup

Set the `RUNPOD_ENDPOINT_ID` and `RUNPOD_API_KEY` environment variables with your endpoint ID and API Key.

<Tabs>
  <TabItem value="macos" label="macOS" default>

```bash
export RUNPOD_ENDPOINT_ID=<YOUR_RUNPOD_ENDPOINT_ID>
export RUNPOD_API_KEY=<YOUR_RUNPOD_API_KEY>
```

</TabItem>
  <TabItem value="windows" label="Windows">

```bash
set RUNPOD_ENDPOINT_ID=<YOUR_RUNPOD_ENDPOINT_ID>
set RUNPOD_API_KEY=<YOUR_RUNPOD_API_KEY>
```

</TabItem>
</Tabs>

### Code implementation

## Using Runpod API

RunPod API provides an efficient way to interact with vllm endpoint by sending requests with either a prompt or a list of messages. The API applies chat templates automatically to messages, allowing seamless interaction.

---

## API Endpoints

### Synchronous Request

```http
POST https://api.runpod.ai/v2/{endpoint_id}/run_sync
```

### Asynchronous Request

```http
POST https://api.runpod.ai/v2/{endpoint_id}/run
```

---

## Request Parameters

### Main Input Parameters

<details>
  <summary>Click to expand</summary>

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

</details>

### Sampling Parameters

Below are all available sampling parameters that you can specify in the `sampling_params` dictionary. If you do not specify any of these parameters, the default values will be used.

<details>
  <summary>Click to expand</summary>

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

</details>

---

## Text Input Formats

### Using `prompt`

The prompt string can be any string, and the model's chat template will not be applied to it unless `apply_chat_template` is set to `true`, in which case it will be treated as a user message.

```json
{
  "prompt": "Translate the following text to French: 'Hello, how are you?'"
}
```

### Using `messages`

Your list can contain any number of messages, and each message usually can have any role from the following list:

- `user`
- `assistant`
- `system`
  However, some models may have different roles, so you should check the model's chat template to see which roles are required.
  The model's chat template will be applied to the messages automatically, so the model must have one.

```json
{
  "messages": [
    { "role": "system", "content": "You are a helpful assistant." },
    { "role": "user", "content": "Tell me a joke." }
  ]
}
```

---

## Sample API Requests

### Python Example

```python
import requests

url = "https://api.runpod.ai/v2/<endpoint_id>/run"
headers = {"Authorization": "Bearer YOUR_API_KEY", "Content-Type": "application/json"}

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

```sh
curl -X POST "https://api.runpod.ai/v2/yf2k4t0vl3ciaf/run" \
     -H "Authorization: Bearer YOUR_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"input":
               {
                 "prompt": "Write a haiku about nature.",
                 "sampling_params": {"temperature": 0.8, "max_tokens": 50}
         }}'
```

---

## Troubleshooting

If you encounter issues deploying or using vLLM Workers, check the following:

- Ensure your RunPod API Key has the necessary permissions to deploy and access Serverless Endpoints.
- Double-check that you have set the correct environment variables for your endpoint ID and API Key.
- Verify that you are using the correct CUDA version for your selected GPU.
- If using a gated model, ensure your Hugging Face token is valid and has access to the model.

To learn more about managing your Serverless endpoints, see the [Manage Endpoints](/serverless/endpoints/manage-endpoints) guide. For a complete reference of the vLLM Worker environment variables, see the [vLLM Worker variables](/serverless/vllm/environment-variables) documentation.
