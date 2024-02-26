---
title: Run Google's Gemma model
sidebar_position: 5
description: Run Google's Gemma model using RunPod's vLLM Worker, guiding you to set up a Serverless Endpoint with a gated large language model (LLM).

---

This tutorial walks you through running Google's Gemma model using RunPod's vLLM Worker. Throughout this tutorial, you'll learn to set up a Serverless Endpoint with a gated large language model (LLM), starting with the essential prerequisites to ensure a smooth setup process.

## Prerequisites

Before diving into the deployment process, gather the necessary tokens and accepting Google's terms.
This step ensures that you have access to the model and are in compliance with usage policies.

- [Hugging Face access token](https://huggingface.co/settings/tokens)
- [Accepting Google's terms of service](https://huggingface.co/google/gemma-7b)

The next section will guide you through setting up your Serverless Endpoint with RunPod.

## Get started

To begin, we'll deploy a vLLM Worker as a Serverless Endpoint. 
RunPod simplifies the process of running large language models, offering an alternative to the more complex Docker and Kubernetes deployment methods. 

Follow these steps in the RunPod Serverless console to create your Endpoint.

1. Login to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select a GPU.
   3. Configure the number of workers.
   4. (optional) Select **FlashBoot**.
   5. Enter the vLLM Worker image: `runpod/worker-vllm:latest`.
   6. Specify enough storage for your model.
   7. Add the following environment variables:
      1. `MODEL_NAME`: `google/gemma-7b`.
      2. `HF_TOKEN`: your Hugging Face API token for private models.
4. Select **Deploy**.

Once the Endpoint has initialized, you can send a request to your [Endpoint](/serverless/endpoints/get-started).
You've now successfully deployed your model, a significant milestone in utilizing Google's Gemma model.
 As we move forward, the next section will focus on interacting with your model.

## Interact with your model

With the Endpoint up and running, it's time to leverage its capabilities by sending requests to interact with the model.
This section demonstrates how to use OpenAI APIs to communicate with your model.

In this example, you'll create a Python chat bot using the `OpenAI` library; however, you can use any programming language and any library that supports HTTP requests. 

Here's how to get started:

Use the `OpenAI` class to interact with the model. The `OpenAI` class takes the following parameters:
- `base_url`: The base URL of the Serverless Endpoint.
- `api_key`: Your RunPod API key.

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url=os.environ.get("RUNPOD_BASE_URL"),
    api_key=os.environ.get("RUNPOD_API_KEY"),
)
```

:::note

Set your environment variables `RUNPOD_BASE_URL` and `RUNPOD_API_KEY` to your RunPod API key and base URL.
Your `RUNPOD_BASE_URL` will be in the form of:
    
```bash
https://api.runpod.ai/v2/${YOUR_ENDPOINT_ID}/openai/v1
```

Where `${YOUR_ENDPOINT_ID}` is the ID of your Serverless Endpoint.

:::

Next, you can use the `client` to interact with the model. For example, you can use the `chat.completions.create` method to generate a response from the model.

Provide the following parameters to the `chat.completions.create` method:

- `model`: `The model name`.
- `messages`: A list of messages to send to the model.
- `max_tokens`: The maximum number of tokens to generate.
- `temperature`: The randomness of the generated text.
- `top_p`: The cumulative probability of the generated text.
- `max_tokens`: The maximum number of tokens to generate.

```python
messages = [{"role": "assistant", "content": "Hello, I'm your assistant. How can I help you today?"}]


def display_chat_history(messages):
    for message in messages:
        print(f"{message['role'].capitalize()}: {message['content']}")


def get_assistant_response(messages):
    r = client.chat.completions.create(
        model="google/gemma-7b",
        messages=[{"role": m["role"], "content": m["content"]} for m in messages],
        temperature=.7,
        top_p=.8,
        max_tokens=100,
    )
    response = r.choices[0].message.content
    return response

while True:
    display_chat_history(messages)

    prompt = input("User: ")
    messages.append({"role": "user", "content": prompt})


    response = get_assistant_response(messages)
    messages.append({"role": "assistant", "content": response})
```

Congratulations!
You've successfully set up a Serverless Endpoint and interacted with Google's Gemma model.
This tutorial has shown you the essentials of deploying a model on RunPod and creating a simple application to communicate with it.
You've taken important steps towards integrating large language models into your projects.