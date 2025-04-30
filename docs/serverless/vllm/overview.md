---
title: Overview
sidebar_position: 1
description: "Discover RunPod's vLLM workers: optimized Serverless containers for deploying Hugging Face LLMs. vLLM workers offer OpenAI API compatibility, auto-scaling, and cost-effective performance."
---

# vLLM worker overview

vLLM workers are specialized containers designed to efficiently deploy and serve large language models (LLMs) on RunPod's [Serverless infrastructure](/serverless/overview). These workers leverage the high-performance vLLM inference engine to optimize model serving, providing a streamlined solution for AI applications that require LLM capabilities.

For detailed information on model compatibility and configuration options, check out the [vLLM worker GitHub repository](https://github.com/runpod-workers/worker-vllm).

## Key features

vLLM workers offer several advantages that make them ideal for LLM deployment:

- **Pre-built optimization**: The workers come with the vLLM inference engine pre-configured, which includes PagedAttention technology for optimized memory usage and faster inference.
- **OpenAI API compatibility**: They provide a drop-in replacement for OpenAI's API, allowing you to use existing OpenAI client code by simply changing the endpoint URL and API key.
- **Hugging Face integration**: vLLM workers support most models available on Hugging Face, including popular options like Llama 2, Mistral, Gemma, and many others.
- **Configurable environments**: Extensive customization options through [environment variables](https://github.com/runpod-workers/worker-vllm#environment-variablessettings) allow you to adjust model parameters, performance settings, and other behaviors.
- **Auto-scaling architecture**: Serverless automatically scales your endpoint from zero to many workers based on demand, billing on a per-second basis.

## Compatible models

You can deploy also any model on [Hugging Face](https://huggingface.co/models?other=LLM) as a vLLM worker. For a full list of supported models architectures, see [Compatible model architectures](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#compatible-model-architectures).

## How it works

When deployed to a [Serverless endpoint](/serverless/endpionts/overview), vLLM workers:

1. Download and load the specified LLM from Hugging Face or other compatible sources.
2. Optimize the model for inference using vLLM's techniques like continuous batching and PagedAttention.
3. Expose API endpoints for both [OpenAI-compatible requests](/serverless/vllm/openai-compatibility) and RunPod's native [endpoint request](/serverless/endpoints/send-requests) format.
4. Process incoming requests by dynamically allocating GPU resources.
5. Scale workers up or down based on traffic patterns

## Deployment options

RunPod offers multiple ways to deploy vLLM workers:

1. **Quick Deploy a vLLM endpoint**: The simplest approach—use RunPod's UI to deploy a model directly from Hugging Face with minimal configuration. For step-by-step instructions, see [Deploy a vLLM worker](/serverless/vllm/get-started).
2. **Deploy using a prebuilt worker image**: Deploy a preconfigured vLLM worker image from [GitHub](https://github.com/runpod-workers/worker-vllm) or [Docker Hub](https://hub.docker.com/r/runpod/worker-v1-vllm/tags), configuring your endpoint using [environment variables](https://github.com/runpod-workers/worker-vllm#environment-variablessettings).
3. **Custom Docker images**: For advanced users who need to include specialized components or modifications.

### Deployment options

- **[Configurable Endpoints](/serverless/vllm/get-started#deploy-using-the-web-ui)**: (recommended) Use RunPod's Web UI to quickly deploy the OpenAI compatible LLM with the vLLM Worker.

- **[Pre-Built docker image](/serverless/vllm/get-started#deploy-using-the-worker-image)**: Leverage pre-configured Docker image for hassle-free deployment. Ideal for users seeking a quick and straightforward setup process

- **Custom docker image**: For advanced users, customize and build your Docker image with the model baked in, offering greater control over the deployment process.

For more information see:

- [vLLM Worker GitHub Repository](https://github.com/runpod-workers/worker-vllm)
- [vLLM Worker Docker Hub](https://hub.docker.com/r/runpod/worker-v1-vllm/tags)

For more information on creating a custom docker image, see [Build Docker Image with Model Inside](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#option-2-build-docker-image-with-model-inside).


## Use cases

vLLM workers are an effective choice for:

- High-performance inference for text generation.
- Cost-effective scaling for LLM workloads.
- Integration with existing OpenAI-based applications.
- Deploying open-source models with commercial licenses.
- AI systems requiring both synchronous and streaming responses.

## Performance considerations

The performance of vLLM workers depends on several factors:

- **GPU selection**: Larger models require more VRAM (A10G or better recommended for 7B+ parameter models). For a list of available GPUs, see [GPU types](/references/gpu-types)
- **Model size**: Affects both loading time and inference speed.
- **Quantization**: Options like AWQ or GPTQ can reduce memory requirements at a small quality cost.
- **Batch size settings**: Impact throughput and latency tradeoffs.
- **Context length**: Longer contexts require more memory and processing time.

By leveraging RunPod's vLLM workers, developers can quickly deploy state-of-the-art language models with optimized performance, flexible scaling, and cost-effective operation.

## Next steps

- [Get started](/serverless/vllm/get-started): Learn how to deploy a vLLM Worker as a Serverless Endpoint, with detailed guides on configuration and sending requests.
- [Environment variables](https://github.com/runpod-workers/worker-vllm#environment-variablessettings): Explore the environment variables available for the vLLM Worker on the GitHub README.
- [Run Gemma 7b](/tutorials/serverless/run-gemma-7b): Walk through deploying Google's Gemma model using RunPod's vLLM Worker, guiding you to set up a Serverless Endpoint with a gated large language model (LLM).





## Getting started

At a high level, you can set up the vLLM Worker by:

- Selecting your deployment options
- Configure any necessary environment variables
- Deploy your model

For detailed instructions, configuration options, and usage examples, see [Get started](/serverless/vllm/get-started).

### Deployment options

- **[Configurable Endpoints](/serverless/vllm/get-started#deploy-using-the-web-ui)**: (recommended) Use RunPod's Web UI to quickly deploy the OpenAI compatible LLM with the vLLM Worker.

- **[Pre-Built docker image](/serverless/vllm/get-started#deploy-using-the-worker-image)**: Leverage pre-configured Docker image for hassle-free deployment. Ideal for users seeking a quick and straightforward setup process

- **Custom docker image**: For advanced users, customize and build your Docker image with the model baked in, offering greater control over the deployment process.

For more information see:

- [vLLM Worker GitHub Repository](https://github.com/runpod-workers/worker-vllm)
- [vLLM Worker Docker Hub](https://hub.docker.com/r/runpod/worker-v1-vllm/tags)

For more information on creating a custom docker image, see [Build Docker Image with Model Inside](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#option-2-build-docker-image-with-model-inside).

## Next steps

- [Get started](/serverless/vllm/get-started): Learn how to deploy a vLLM Worker as a Serverless Endpoint, with detailed guides on configuration and sending requests.
- [Configurable Endpoints](/serverless/vllm/configurable-endpoints): Select your Hugging Face model and vLLM takes care of the low-level details of model loading, hardware configuration, and execution.
- [Environment variables](/serverless/vllm/environment-variables): Explore the environment variables available for the vLLM Worker, including detailed documentation and examples.
- [Run Gemma 7b](/tutorials/serverless/run-gemma-7b): Walk through deploying Google's Gemma model using RunPod's vLLM Worker, guiding you to set up a Serverless Endpoint with a gated large language model (LLM).
