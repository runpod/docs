---
title: Get started
sidebar_position: 2
description: "Deploy a Serverless Endpoint for large language models (LLMs) with RunPod, a simple and efficient way to run vLLM Workers with minimal configuration."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RunPod provides a simple way to run large language models (LLMs) as Serverless Endpoints.
vLLM Workers are pre-built Docker images that you can configure entirely within the RunPod UI.
This tutorial will guide you through deploying an OpenAI compatible Endpoint with a vLLM inference engine on RunPod.

## Prerequisites

Before getting started, ensure you have the following:

- A RunPod account
- A Hugging Face token (if using gated models)
- OpenAI or other required libraries installed for the code examples

## Deploy using the Web UI

You can use RunPod's Web UI to deploy a vLLM Worker with a model directly from Hugging Face.

1. Log in to your RunPod account and go to the [Serverless page](https://www.runpod.io/console/serverless).
2. Under **Quick Deploy**, find **Serverless vLLM** and choose **Start**.

You will now enter the vLLM module. Follow the on-screen instructions to add your LLM as a Serverless Endpoint:

1. Select a vLLM version.
2. Add a Hugging Face model (e.g., `openchat/openchat-3.5-0106`).
3. (Optional) Add a Hugging Face token for gated models.
4. Review your options and choose **Next**.

On the **vLLM parameters** page, provide additional parameters and options for your model:

1. In **LLM Settings**, enter **8192** for the **Max Model Length** parameter.
2. Review your options and choose **Next**.

On the **Endpoint parameters** page, configure your deployment:

1. Specify your GPU configuration for your Worker.
2. Configure your Worker deployment.

- Verify the **Container Image** uses your desired CUDA version.
- Update the **Container Disk** size if needed.

4. Select **Deploy**.

Once the Endpoint initializes, you can send requests to your [Endpoint](/serverless/endpoints/get-started).
Continue to the [Send a request](#send-a-request) section.

## Deploy using the Worker image

One advantage of deploying your model with the vLLM Worker is the minimal configuration required. For most models, you only need to provide the pre-built vLLM Worker image name and the LLM model name.

Follow these steps to run the vLLM Worker on a Serverless Endpoint:

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   - Endpoint name
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

Once the Endpoint initializes, you can send requests to your [Endpoint](/serverless/endpoints/get-started).
Continue to the [Send a request](#send-a-request) section.

For a complete list of available environment variables, see the [vLLM Worker variables](/serverless/workers/vllm/environment-variables).

## Send a request

This section walks you through sending a request to your Serverless Endpoint.
The vLLM Worker can use any Hugging Face model and is compatible with OpenAI's API.
If you have the OpenAI library installed, you can continue using it with the vLLM Worker. See the [OpenAI documentation](https://platform.openai.com/docs/libraries/) for more information.

### Environment setup

Set the `RUNPOD_ENDPOINT_ID` and `RUNPOD_API_KEY` environment variables with your Endpoint ID and API Key.

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

Choose your programming language and add the following code to your file.

<Tabs>
  <TabItem value="python" label="Python" default>

Install the OpenAI library if needed:

```bash
pip install openai
```

Create a file called `main.py` with the following code:

```python
from openai import OpenAI
import os

endpoint_id = os.environ.get("RUNPOD_ENDPOINT_ID")
api_key = os.environ.get("RUNPOD_API_KEY")

client = OpenAI(
    base_url=f"https://api.runpod.ai/v2/{endpoint_id}/openai/v1",
    api_key=api_key,
)

chat_completion = client.chat.completions.create(
    model="openchat/openchat-3.5-0106",
    messages=[{"role": "user", "content": "Reply with: Hello, World!"}]
)

print(chat_completion)
```

</TabItem>
  <TabItem value="node.js" label="Node.js">

Install the OpenAI library if needed:

```bash
npm install openai
```

Create a file called `main.js` with the following code:

```javascript
import OpenAI from "openai";

const openai = new OpenAI({
  baseURL:
    `https://api.runpod.ai/v2/${process.env.RUNPOD_ENDPOINT_ID}/openai/v1`,
  apiKey: process.env.RUNPOD_API_KEY,
});

const chatCompletion = await openai.chat.completions.create({
  model: "openchat/openchat-3.5-0106",
  messages: [{ role: "user", content: "Reply with: Hello, World!" }],
});

console.log(chatCompletion);
```

</TabItem>
  <TabItem value="curl" label="cURL">

Run the following command in your terminal:

```bash
curl https://api.runpod.ai/v2/${RUNPOD_ENDPOINT_ID}/openai/v1/chat/completions \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer ${RUNPOD_API_KEY}" \
    -d '{
        "model": "openchat/openchat-3.5-0106",
        "messages": [
            {
                "role": "user",
                "content": "Reply with: Hello, World!"
            }
        ]
    }'
```

</TabItem>
</Tabs>

### Run your code

Run your code from the terminal:

<Tabs>
  <TabItem value="python" label="Python" default>

```bash
python main.py
```

</TabItem>
  <TabItem value="node.js" label="Node.js">

```bash
node main.js
```

</TabItem>
</Tabs>

### Output

The output should look similar to:

```json
{
  "choices": [
    {
      "finish_reason": "stop",
      "index": 0,
      "message": {
        "content": "Hello, World!",
        "role": "assistant"
      }
    }
  ],
  "created": 3175963,
  "id": "cmpl-74d7792c92cd4b159292c38bda1286b0",
  "model": "openchat/openchat-3.5-0106",
  "object": "chat.completion",
  "usage": {
    "completion_tokens": 5,
    "prompt_tokens": 39,
    "total_tokens": 44
  }
}
```

You have now successfully sent a request to your Serverless Endpoint and received a response.

## Troubleshooting

If you encounter issues deploying or using vLLM Workers, check the following:

- Ensure your RunPod API Key has the necessary permissions to deploy and access Serverless Endpoints.
- Double-check that you have set the correct environment variables for your Endpoint ID and API Key.
- Verify that you are using the correct CUDA version for your selected GPU.
- If using a gated model, ensure your Hugging Face token is valid and has access to the model.

To learn more about managing your Serverless Endpoints, see the [Manage Endpoints](/serverless/endpoints/manage-endpoints) guide. For a complete reference of the vLLM Worker environment variables, see the [vLLM Worker variables](/serverless/workers/vllm/environment-variables) documentation.
