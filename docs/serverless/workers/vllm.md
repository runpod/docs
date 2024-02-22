---
title: vLLM Workers
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RunPod provides a simple way to run large language models (LLMs) as a Serverless Endpoint.
vLLM Workers are a pre-build docker image that you can configure entirely within the RunPod UI.
This means, you don't need to write a Dockerfile, download the model on your machine, try building the image, or write any other code to run your model.

## Get started

This step will walk you through running the vLLM Worker as Serverless Endpoint to RunPod.

1. Login to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select a GPU.
   3. Configure the number of workers.
   4. (optional) Select **FlashBoot**.
   5. Enter the vLLM Worker image: `runpod/worker-vllm:0.2.3`.
   6. Specify enough storage for your model.
   7. Configure the environment variables:
      1. `MODEL_NAME`: the Hugging Face Model.
         1. For example: `openchat/openchat-3.5-1210`.
4. Select **Deploy**.

Once the Endpoint has initialized, you can send a request to your [Endpoint](/serverless/endpoints/get-started).


## Send a request

This step will walk you through sending a request to your Serverless Endpoint.
The vLLM Worker can use any Hugging Face model and is comptabile with OpenAI's API.

In the following example, you will build a chatbot that runs on the command line and uses the OpenAI API to generate responses.

1. Create a file called `main.py` in on your machine with the following code:

```python
from openai import OpenAI
import os

client = OpenAI(
    base_url=os.environ.get("RUNPOD_HOST"),
    api_key=os.environ.get("RUNPOD_API_KEY"),
)
messages = [{"role": "assistant", "content": "How can I help?"}]


def display_chat_history(messages):
    for message in messages:
        print(f"{message['role'].capitalize()}: {message['content']}")


def get_assistant_response(messages):
    r = client.chat.completions.create(
        model="openchat/openchat-3.5-1210", # Add your model name here to align with the model you provided in the RunPod UI.
        messages=[{"role": m["role"], "content": m["content"]} for m in messages],
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

2. Set your environment variables:

- Replace `${YOUR_ENDPOINT_ID}` with your Endpoint ID.
- Replace `${YOUR_API_KEY}` with your API Key.


<Tabs>
  <TabItem value="macos" label="macOS" default>

    ```command
    export RUNPOD_HOST="https://api.runpod.io/v2/${YOUR_ENDPOINT_ID}/openai/v1"
    export RUNPOD_API_KEY="${YOUR_API_KEY}"
    ```

</TabItem>
  <TabItem value="windows" label="Windows">

    ```command
    set RUNPOD_HOST="https://api.runpod.io/v2/${YOUR_ENDPOINT_ID}/openai/v1"
    set RUNPOD_API_KEY="${YOUR_API_KEY}"
    ```

</TabItem>
  <TabItem value="linux" label="Linux">

    ```command
    export RUNPOD_HOST="https://api.runpod.io/v2/${YOUR_ENDPOINT_ID}/openai/v1"
    export RUNPOD_API_KEY="${YOUR_API_KEY}"
    ```

</TabItem>
</Tabs>

3. Run your code:

Now you can run your code from your terminal:

```command
python main.py
```
