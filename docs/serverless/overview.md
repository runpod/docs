---
title: Overview
description: "Use Serverless to scale your machine learning workloads, with flexible GPU computing for AI inference, training, and general compute, pay-per-second pricing, and fast deployment options for custom endpoints."
sidebar_position: 1
---

# Serverless overview

RunPod Serverless is a cloud computing platform that lets you run AI models and compute-intensive workloads without managing servers. You only pay for the actual compute time you use, with no idle costs when your application isn't processing requests.

<iframe width="900" height="508" src="https://www.youtube.com/embed/8HzN9HxYZxc?si=mn6K4nYChD1iZ42I" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>

## Why use Serverless?

* **Focus on your code, not infrastructure**: Deploy your applications without worrying about server management, scaling, or maintenance.
* **GPU-powered computing**: Access powerful GPUs for AI inference, training, and other compute-intensive tasks.
* **Automatic scaling**: Your application scales automatically based on demand, from zero to hundreds of workers.
* **Cost efficiency**: Pay only for what you use, with per-second billing and no costs when idle.
* **Fast deployment**: Get your code running in the cloud in minutes with minimal configuration.

## Key concepts

### Endpoints

An [endpoint](/serverless/endpoints/overview) is the access point for your Serverless application. It provides a URL where users or applications can send requests to run your code. Each endpoint can be configured with different compute resources, scaling settings, and other parameters to suit your specific needs.

### Workers

[Workers](/serverless/workers/overview) are the container instances that execute your code when requests arrive at your endpoint. RunPod automatically manages worker lifecycle, starting them when needed and stopping them when idle to optimize resource usage.

### Handler functions

[Handler functions](/serverless/workers/handler-functions) are the core of your Serverless application. These functions define how a worker processes incoming requests and returns results. They follow a simple pattern:

```python # rp_handler.py
import runpod  # Required

def handler(event):
    # Extract input data from the request
    input_data = event["input"]
    
    # Process the input (replace this with your own code)
    result = process_data(input_data)
    
    # Return the result
    return result

runpod.serverless.start({"handler": handler})  # Required
```

## Deployment options

RunPod Serverless offers three ways to deploy your workloads, each designed for different use cases:

### Quick deploy an endpoint

**Best for**: Deploying preconfigured AI models with minimal effort (no coding required).

You can deploy a Serverless endpoint in minutes from the RunPod console:

1. Go to the [Serverless page](https://www.runpod.io/console/serverless) in the RunPod console.
2. Under **Quick Deploy**, browse the collection of preconfigured workers and select one that matches your needs.
3. Click **Configure**. Depending on your choice, you may need to enter a [Hugging Face model](https://huggingface.co/models).
4. Choose a **Worker Configuration**. Quick deploys are preconfigured with 
5. Click the **Create Endpoint**.

You'll be redirected to your new endpoint. Now you're ready to [send a request](/serverless/endpoints/send-requests).

[Quick deploy an endpoint →](https://www.runpod.io/console/serverless)

### Deploy a vLLM worker

**Best for**: Deploying and serving large language models (LLMs) with minimal configuration.

vLLM workers are specifically optimized for running LLMs:
* Support for any [Hugging Face model](https://huggingface.co/models).
* Optimized for LLM inference.
* Simple configuration via environment variables.
* High-performance serving with vLLM.

[Deploy a vLLM worker →](/serverless/vllm/get-started)

### Fork a worker template

**Best for**: Creating a custom worker using an existing template.

RunPod maintains a collection of [worker templates](https://github.com/runpod-workers) on GitHub that you can use as a starting point:

- [worker-basic](https://github.com/runpod-workers/worker-basic): A minimal template with essential functionality.
- [worker-template](https://github.com/runpod-workers/worker-template): A more comprehensive template with additional features
- [Model-specific templates](https://github.com/runpod-workers#worker-collection): Specialized templates for common AI tasks (image generation, audio processing, etc.)

After you fork a worker you can learn how to:

1. [Test your worker](/serverless/development/local-testing) locally.
2. Customize it with your own [handler function](/serverless/workers/handler-functions).
3. Deploy it to an endpoint using [Docker](/serverless/workers/deploy) or [GitHub](/serverless/workers/github-integration).

[Browse worker templates →](https://github.com/runpod-workers)

### Build a custom worker

**Best for**: Running custom code or specialized AI workloads.

Creating a custom workers give you complete control over your application:

* Write your own Python code.
* Package it in a Docker container.
* Allows full flexibility for any use case.
* Create custom processing logic.

[Build your first custom worker →](/serverless/workers/custom-worker)

## How requests work

When a user/client sends a request to your Serverless endpoint:

1. If no workers are active, RunPod automatically starts one (cold start).
2. The request is queued until a worker is available.
3. A worker processes the request using your handler function.
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

## Next steps

Ready to get started with RunPod Serverless?

- [Deploy large language models in minutes with vLLM.](/serverless/vllm/overview)
- [Build your first worker.](/serverless/workers/custom-worker)
- [Learn more about endpoints.](/serverless/endpoints/overview)
- [Learn more about workers.](/serverless/workers/overview)
- [Learn more about handler functions.](/serverless/workers/handler-functions)
