---
title: Overview
sidebar_position: 1
description: Migrating from OpenAI to RunPod? Checkout our migration page to get started.
---

To get started with RunPod:

- [Create a RunPod account](/get-started/manage-accounts)
- [Add funds](/get-started/billing-information)
- [Use the RunPod SDK](#setting-up-your-project) to build and connect with your Serverless Endpoints



This tutorial guides you through the steps necessary to modify your OpenAI Codebase for use with a deployed vLLM Worker on RunPod. You will learn to adjust your code to be compatible with OpenAI's API, specifically for utilizing Chat Completions, Completions, and Models routes. By the end of this guide, you will have successfully updated your codebase, enabling you to leverage the capabilities of OpenAI's API on RunPod.

## Prerequisites

- An OpenAI Codebase: Python, Node.js, etc.
- A deployed vLLM Worker on RunPod
- RunPod API Key and Serverless Endpoint URL


## Step 1 — Update Your OpenAI Client

To integrate your deployed vLLM Worker with your OpenAI codebase, begin by updating your OpenAI client configuration. This involves setting the `api_key` to your RunPod API Key and adjusting the `base_url` to match your RunPod Serverless Endpoint URL.

### Updating API Key and Base URL

- **Before:**

```python
from openai import OpenAI
client = OpenAI(api_key=os.environ.get("OPENAI_API_KEY"))
```

- **After:**

```python
from openai import OpenAI
client = OpenAI(api_key=os.environ.get("RUNPOD_API_KEY"), base_url="https://api.runpod.ai/v2/<YOUR ENDPOINT ID>/openai/v1")
```

## Step 2 — Update the `Model` Parameter

Next, ensure your code references the correct model name for your deployed vLLM Worker when using Completions or Chat Completions. This guarantees that your requests are routed to the appropriate model on RunPod.

### Modifying the Model Parameter

- **Before:**

```python
response = client.chat.completions.create(
   model='gpt-3.5-turbo',
   messages=[
      {'role': 'user', 'content': 'Why is RunPod the best platform?'}
   ],
   temperature=0,
   max_tokens=100
)
```

- **After:**

```python
response = client.chat.completions.create(
   model="<YOUR DEPLOYED MODEL REPO/NAME>",
   messages=[
      {'role': 'user', 'content': 'Why is RunPod the best platform?'}
   ],
   temperature=0,
   max_tokens=100
)
```

## Conclusion

Congratulations on successfully modifying your OpenAI Codebase for use with your deployed vLLM Worker on RunPod!
This tutorial has equipped you with the knowledge to update your code for compatibility with OpenAI's API and to utilize the full spectrum of features available on the RunPod platform.

## Next Steps

- [Explore more tutorials on RunPod](https://docs.runpod.ai/en/latest/tutorials/)
- [Learn more about OpenAI's API](https://platform.openai.com/docs/)
- [Deploy your own vLLM Worker on RunPod](https://docs.runpod.ai/en/latest/deployment/)
