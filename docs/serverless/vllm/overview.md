---
title: Overview
sidebar_position: 1
description: "Discover RunPod's vLLM workers: optimized Serverless containers for deploying Hugging Face LLMs. vLLM workers offer OpenAI API compatibility, auto-scaling, and cost-effective performance."
---

# vLLM worker overview

vLLM workers are specialized containers designed to efficiently deploy and serve large language models (LLMs) on RunPod's [Serverless infrastructure](/serverless/overview). By leveraging RunPod's vLLM workers, you can quickly deploy state-of-the-art language models with optimized performance, flexible scaling, and cost-effective operation.

For detailed information on model compatibility and configuration options, check out the [vLLM worker GitHub repository](https://github.com/runpod-workers/worker-vllm).

## Key features

vLLM workers offer several advantages that make them ideal for LLM deployment:

- **Pre-built optimization**: The workers come with the vLLM inference engine pre-configured, which includes PagedAttention technology for optimized memory usage and faster inference.
- **OpenAI API compatibility**: They provide a drop-in replacement for OpenAI's API, allowing you to use existing OpenAI client code by simply changing the endpoint URL and API key.
- **Hugging Face integration**: vLLM workers support most models available on Hugging Face, including popular options like Llama 2, Mistral, Gemma, and many others.
- **Configurable environments**: Extensive customization options through [environment variables](https://github.com/runpod-workers/worker-vllm#environment-variables) allow you to adjust model parameters, performance settings, and other behaviors.
- **Auto-scaling architecture**: Serverless automatically scales your endpoint from zero to many workers based on demand, billing on a per-second basis.

## Deployment options

There are two ways to deploy a vLLM worker:

**Quick deploy a vLLM endpoint**: The simplest approach—use RunPod's UI to deploy a model directly from Hugging Face with minimal configuration. For step-by-step instructions, see [Deploy a vLLM worker](/serverless/vllm/get-started).

**Deploy using a prebuilt worker image**: Deploy a preconfigured vLLM worker image from [GitHub](https://github.com/runpod-workers/worker-vllm) or [Docker Hub](https://hub.docker.com/r/runpod/worker-v1-vllm/tags), configuring your endpoint using [environment variables](https://github.com/runpod-workers/worker-vllm#environment-variablessettings).

You can add new functionality your vLLM worker by customizing its [handler function](/serverless/workers/handler-function).

## Compatible models

You can deploy almost any model on [Hugging Face](https://huggingface.co/models?other=LLM) as a vLLM worker. You can find a full list of supported models architectures on the [GitHub README](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#compatible-model-architectures).

## How vLLM works

When deployed to a [Serverless endpoint](/serverless/endpoints/overview), vLLM workers:

1. Download and load the specified LLM from Hugging Face or other compatible sources.
2. Optimize the model for inference using vLLM's techniques like continuous batching and PagedAttention.
3. Expose API endpoints for both [OpenAI-compatible requests](/serverless/vllm/openai-compatibility) and RunPod's native [endpoint request](/serverless/endpoints/send-requests) format.
4. Process incoming requests by dynamically allocating GPU resources.
5. Scale workers up or down based on traffic patterns.

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

## Next steps

- [Deploy a vLLM worker as a Serverless endpoint.](/serverless/vllm/get-started)
- [Send requests to a vLLM endpoint.](/serverless/vllm/vllm-requests)
- [Learn about RunPod's OpenAI API compatibility.](/serverless/vllm/openai-compatibility)
- [Deploy Google's Gemma model using a vLLM Worker.](/tutorials/serverless/run-gemma-7b)

