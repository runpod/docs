---
title: Deploy a vLLM worker
sidebar_position: 2
description: "Learn how to deploy a vLLM worker on RunPod Serverless to create a scalable endpoint for your large language model (LLM) applications."
---

# Deploy a vLLM worker

Learn how to deploy a large language model (LLM) using RunPod's preconfigured vLLM workers. By the end, you'll have a fully functional API endpoint that can use to handle LLM inference requests.

## What you'll learn

In this tutorial, you'll learn how to:

- Configure and deploy a vLLM worker using RunPod's Serverless platform
- Select the appropriate hardware and scaling settings for your model
- Set up environmental variables to customize your deployment
- Test your endpoint using both the OpenAI client and RunPod's native API
- Implement streaming responses for better user experience
- Monitor your endpoint's performance and make adjustments
- Troubleshoot common issues that might arise during deployment
- Optimize your configuration for production use cases

## Requirements

Before starting, make sure you have:

- A RunPod account with billing set up
- For gated models: a Hugging Face access token 
- For testing: your preferred API client (Python, cURL, etc.)

## Step 1: Choose your model

First, decide which LLM you want to deploy. The vLLM worker supports most Hugging Face models, including:

- Llama 2 (e.g., `meta-llama/Llama-2-7b-chat-hf`)
- Mistral (e.g., `mistralai/Mistral-7B-Instruct-v0.2`)
- OpenChat (e.g., `openchat/openchat-3.5-0106`)
- Gemma (e.g., `google/gemma-7b-it`)
- And many more

For this tutorial, we'll use `openchat/openchat-3.5-0106`, but you can substitute this with any compatible model.

## Step 2: Deploy using the RunPod console

The easiest way to deploy a vLLM worker is through the RunPod console with the [Quick Deploy](/serverless/quick-deploys) feature:

1. Navigate to the [Serverless page](https://www.runpod.io/console/serverless).
2. Under **Quick Deploy**, find **Serverless vLLM** and click **Configure**.
3. In the deployment modal:
   - Select a vLLM version (latest stable recommended).
   - Enter your model: `openchat/openchat-3.5-0106`
   - If using a gated model, enter your Hugging Face token.
   - Click **Next**.
4. In the vLLM settings modal, under **LLM Settings**:
   - Set **Max Model Length** to `8192` (or an appropriate context length for your model).
   - Leave other settings at their defaults unless you have specific requirements.
   - Click **Next**
5. In the endpoint configuration modal:
   - Under **Worker Configuration**:
     - Set **Active Workers** to `0` for cost savings or `1` for faster response times
     - Set **Max Workers** to `2` (or higher for more concurrent capacity)
     - Set **GPU Count** to `1` (increase for larger models)
   - Leave other settings at their defaults unless you have specific requirements.
   - Click **Deploy**

Your endpoint will now begin initializing. This may take several minutes while RunPod provisions resources and downloads your model.

::tip

For more info on all available endpoint settings, see [Endpoint configurations](/serverless/endpoints/endpoint-configurations).

:::

## Step 3: Understand your endpoint

While your endpoint is initializing, let's understand what's happening and what you'll be able to do with it:

- RunPod is creating a Serverless endpoint with your specified configuration.
- The vLLM worker image is being deployed with your chosen model.
- When it's ready, you'll have two API interfaces to choose from:
  1. **OpenAI-compatible API**: Use with standard OpenAI clients.
  2. **RunPod native API**: Use with RunPod's endpoint operations.

Each has advantages depending on your integration needs.

Once deployment is complete, note your **Endpoint ID**. You'll need this to make API requests.

<img src="/img/docs/serverless-endpoint-id.png" width="900" alt="Screenshot of the workers tab in the RunPod console."/>


## Step 5: Test your endpoint with the OpenAI client

Let's test your endpoint using the OpenAI Python client:

```python
from openai import OpenAI
import os

# Set your environment variables
ENDPOINT_ID = "your-endpoint-id"  # Replace with your actual endpoint ID
API_KEY = "your-api-key"  # Replace with your actual API key

# Initialize the OpenAI client
client = OpenAI(
    api_key=API_KEY,
    base_url=f"https://api.runpod.ai/v2/{ENDPOINT_ID}/openai/v1",
)

# Make a chat completion request
response = client.chat.completions.create(
    model="openchat/openchat-3.5-0106",  # Use your model name
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Explain quantum computing in simple terms."}
    ],
    temperature=0.7,
    max_tokens=500
)

# Print the response
print(response.choices[0].message.content)
```

Save this as `test_endpoint.py` and run it to test your endpoint.

## Step 6: Test with streaming responses

For many applications, streaming responses provide a better user experience. Let's modify our code to use streaming:

```python
from openai import OpenAI
import os

# Initialize the OpenAI client
client = OpenAI(
    api_key="your-api-key",
    base_url=f"https://api.runpod.ai/v2/your-endpoint-id/openai/v1",
)

# Make a streaming chat completion request
stream = client.chat.completions.create(
    model="openchat/openchat-3.5-0106",  # Use your model name
    messages=[
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Write a short poem about AI."}
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

## Step 7: Test with RunPod's native API

You can also use RunPod's native API format, which offers additional flexibility:

```python
import requests
import json
import time

# Your RunPod API key and endpoint ID
API_KEY = "your-api-key"
ENDPOINT_ID = "your-endpoint-id"

# API URL
url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"

# Request headers
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json"
}

# Request payload
payload = {
    "input": {
        "messages": [
            {"role": "system", "content": "You are a helpful assistant."},
            {"role": "user", "content": "What are the main benefits of using vLLM?"}
        ],
        "sampling_params": {
            "temperature": 0.7,
            "max_tokens": 300
        }
    }
}

# Send the request (asynchronous)
response = requests.post(url, headers=headers, json=payload)
job_data = response.json()
job_id = job_data.get("id")

print(f"Job ID: {job_id}")

# Poll for results
status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
while True:
    status_response = requests.get(status_url, headers=headers)
    status_data = status_response.json()
    
    if status_data.get("status") == "COMPLETED":
        output = status_data.get("output")
        print(f"\nResult:\n{output}")
        break
    elif status_data.get("status") in ["FAILED", "CANCELLED"]:
        print(f"Job {status_data.get('status')}: {status_data.get('error')}")
        break
    
    print(".", end="", flush=True)
    time.sleep(1)
```

## Step 8: Customize your model (optional)

If you need to customize your model deployment, you can edit your endpoint settings to add environment variables. Here are some useful environment variables you might want to set:

- `MAX_MODEL_LEN`: Maximum context length (e.g., `16384`)
- `DTYPE`: Data type for model weights (`float16`, `bfloat16`, or `float32`)
- `GPU_MEMORY_UTILIZATION`: Controls VRAM usage (e.g., `0.95` for 95%)
- `CUSTOM_CHAT_TEMPLATE`: For models that need a custom chat template
- `OPENAI_SERVED_MODEL_NAME_OVERRIDE`: Change the model name to use in OpenAI requests

To add or modify environment variables:
1. Go to your endpoint details page
2. Click on the three dots menu
3. Select **Edit Endpoint**
4. Navigate to the **Environment Variables** section
5. Add your desired variables
6. Click **Save Endpoint**

## Step 9: Monitor and scale

As you use your endpoint, you'll want to monitor its performance and scale accordingly:

1. Check the **Metrics** tab to see:
   - Request volume
   - Execution time
   - Queue delay time
   - Worker states

2. Adjust your endpoint configuration as needed:
   - Increase **Max Workers** for higher throughput
   - Add **Active Workers** to eliminate cold starts
   - Upgrade to more powerful GPUs for faster inference

## Step 10: Production considerations

When moving to production, consider these best practices:

1. **Cost optimization**:
   - Use the appropriate GPU for your model size
   - Set Active Workers to 0 when testing
   - Monitor your usage to find the right scaling settings

2. **Reliability**:
   - Implement retry logic in your client code
   - Use webhook notifications for asynchronous workflows
   - Set appropriate timeouts based on your model's performance

3. **Security**:
   - Rotate your API keys regularly
   - Use environment variables for sensitive credentials
   - Never expose your API keys in client-side code

## Troubleshooting

If you encounter issues with your deployment:

- **Worker fails to initialize**: Check that your model is compatible with vLLM and your GPU has enough VRAM
- **Slow response times**: Consider using a more powerful GPU or optimizing your request parameters
- **Out of memory errors**: Reduce the max_tokens parameter or use a smaller model
- **API errors**: Verify your endpoint ID and API key are correct

## Conclusion

Congratulations! You've successfully deployed a vLLM worker on RunPod's Serverless platform. You now have a powerful, scalable LLM inference API that's compatible with both the OpenAI client and RunPod's native API.

This setup gives you the flexibility to:
- Run various open-source LLMs
- Scale automatically based on demand
- Pay only for what you use
- Customize your deployment to your needs

## Next steps

- Try deploying different models
- Experiment with advanced vLLM parameters
- Integrate your endpoint with your applications
- Explore custom workers for more specialized workloads

For more information, check out:
- [vLLM environment variables reference](/serverless/vllm/environment-variables)
- [OpenAI compatibility guide](/serverless/vllm/openai-compatibility)
- [RunPod endpoint operations](/serverless/endpoints/operations)





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
