---
title: Overview
description: "Use Serverless to scale your machine learning workloads, with flexible GPU computing for AI inference, training, and general compute, pay-per-second pricing, and fast deployment options for custom endpoints."
sidebar_position: 1
---

# Serverless overview

RunPod Serverless is a cloud computing platform that lets you run AI models and compute-intensive workloads without managing servers. You only pay for the actual compute time you use, with no idle costs when your application isn't processing requests.

## Why use Serverless?

* **Focus on your code, not infrastructure**: Deploy your applications without worrying about server management, scaling, or maintenance.
* **GPU-powered computing**: Access powerful GPUs for AI inference, training, and other compute-intensive tasks.
* **Automatic scaling**: Your application scales automatically based on demand, from zero to hundreds of workers.
* **Cost efficiency**: Pay only for what you use, with per-second billing and no costs when idle.
* **Fast deployment**: Get your code running in the cloud in minutes with minimal configuration.

## Deployment options

RunPod Serverless offers three ways to deploy your workloads, each designed for different use cases:

### Quick Deploys

**Best for**: Getting popular AI models running quickly with minimal setup.

Quick Deploys are pre-configured templates for popular AI models that you can deploy with just a few clicks:
* No coding required.
* Pre-optimized configurations.
* Wide selection of popular AI models.
* Minimal technical knowledge needed.

[Get started with Quick Deploys →](/serverless/quick-deploys)

### vLLM endpoints

**Best for**: Deploying and serving large language models (LLMs).

vLLM endpoints are specifically optimized for running LLMs:
* Support for any [Hugging Face model](https://huggingface.co/models).
* Optimized for LLM inference.
* Simple configuration via environment variables.
* High-performance serving with vLLM.

[Get started with vLLM endpoints →](/serverless/vllm/get-started)

### Custom endpoints

**Best for**: Running custom code or specialized AI workloads.

Custom endpoints give you complete control over your application:

* Write your own Python code.
* Package in Docker containers.
* Full flexibility for any use case.
* Custom processing logic.

[Get started with custom endpoints →](/serverless/get-started)

## Key concepts

### Endpoints

An [endpoint](/serverless/endpoints/overview) is the access point for your Serverless application. It provides a URL where users or applications can send requests to run your code. Each endpoint can be configured with different compute resources, scaling settings, and other parameters to suit your specific needs.

### Workers

[Workers](/serverless/workers/overview) are the container instances that execute your code when requests arrive at your endpoint. RunPod automatically manages worker lifecycle, starting them when needed and stopping them when idle to optimize resource usage.

### Handler functions

[Handler functions](/serverless/handlers/overview) are the core of your Serverless application. These are the functions that process incoming requests and return results. They follow a simple pattern:

```python # rp_handler.py
import runpod  # Required

def handler(event):
    # Extract input data
    input_data = event["input"]
    
    # Process the input (replace this with your own code)
    result = process_data(input_data)
    
    # Return the result
    return result

runpod.serverless.start({"handler": handler})  # Required
```

## How requests work

When a user/client sends a request to your Serverless endpoint:

1. If no workers are active, RunPod automatically starts one (cold start).
2. The request is queued until a worker is available.
3. Your handler function processes the request.
4. The result is returned to the user/client after they call `/status` (see [Job operations](/serverless/endpoints/operations)).
5. Workers remain active for a period to handle additional requests.
6. Idle workers eventually shut down if no new requests arrive.

<img src="/img/docs/serverless-request-flow.png" width="800" alt="Diagram showing the complete flow of a request through a Serverless endpoint, from initial request to response"/>

## Common use cases

* **AI inference**: Deploy machine learning models that respond to user queries.
* **Batch processing**: Process large datasets in parallel.
* **API backends**: Create scalable APIs for computationally intensive operations.
* **Media processing**: Handle video transcoding, image generation, or audio processing.
* **Scientific computing**: Run simulations, data analysis, or other specialized workloads.

## Next Steps

Ready to get started with RunPod Serverless?

- [Deploy your first Serverless endpoint.](/serverless/get-started)
- [Try a Quick Deploy model.](/serverless/quick-deploys)
- [Deploy large language models in minutes with vLLM.](/serverless/vllm/overview)
- [Learn about handler functions.](/serverless/handlers/overview)
- [Learn about endpoints.](/serverless/endpoints/overview)