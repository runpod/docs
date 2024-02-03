---
title: Migrate Your Banana Text to RunPod
sidebar_label: Migrate texts
draft: true
---

Migrating your AI models and applications from one cloud service to another can often present a challenge, especially when the two platforms operate differently. This tutorial aims to streamline the process of moving from Banana Dev to RunPod, focusing on transferring Docker-based applications and AI models. Whether you're shifting due to preferences in service offerings, pricing, or performance, this guide will help you through the transition smoothly.

## Vllm Worker

RunPod provides an optimized image for running AI models. This image is called the Vllm Worker. It is based on the [Vllm](https://github.com/vllm/vllm) framework, which is a lightweight, high-performance, and portable AI framework. The Vllm Worker image is designed to run on RunPod's serverless infrastructure and is optimized for performance and scalability.

### Vllm Worker Image

To get started, login to RunPod and select Serverless.
Choose your GPU.
Add `runpod/worker-vllm:0.2.2` to the Container Image.
Set the Container Disk to size large enough for your model.
Under Enviroment Variables, add `MODEL_NAME` and set it to your model name, for example `bert-base-uncased`.
Select **Deploy**.


Once your serverless pod has initialized, you can start executing commands against the Endpont.

```command
curl --request POST \
     --url https://api.runpod.ai/v2/{YOUR_ENDPOINT}/runsync \
     --header 'accept: application/json' \
     --header 'authorization: ${YOUR_API_KEY}' \
     --header 'content-type: application/json' \
     --data @- <<EOF
{
  "input": {
    "prompt": "What is the meaning of life?",
    "do_sample": false,
    "max_length": 100,
    "temperature": 0.9
  }
}
EOF
```