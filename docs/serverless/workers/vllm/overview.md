---
title: Overview
sidebar_position: 1
---

Use the `runpod/worker-vllm:latest` image to deploy a vLLM Worker.
The vLLM Worker can use most Hugging Face LLMs and is compatible with OpenAI's API, by specifying the `MODEL_NAME` parameter.
You can also use RunPod's [`input` request format](/serverless/endpoints/send-requests).

RunPod's vLLM Serverless Endpoint Worker are a highly optimized solution for leveraging the power of various LLMs.

## Key features

- **Ease of Use**: Deploy any model using the `runpod/worker-vllm:latest` Docker image without the hassle of building custom Docker images, uploading heavy models, or waiting for lengthy downloads.
- **OpenAI Compatibility**: Seamlessly integrate with OpenAI's API by adjusting only a few lines of code, supporting routes like Chat Completions, Completions, and Models, both in streaming and non-streaming modes.
- **Dynamic Batch Size**: Experience rapid time-to-first-token responses with dynamic batch sizes, balancing performance and efficiency throughout your request.
- **Extensive Model Support**: From Gemma and DeepSeek MoE to OLMo, along with FP8 KV Cache support and Multi-LoRA readiness, expand your capabilities with a wide array of models and settings.
- **Customization**: Tailor your deployment with custom chat templates, tokenization settings, and system configurations to fit your specific needs.
- **Efficiency**: Utilize environment variables to fine-tune LLM settings, tokenizer options, system configurations, and more, ensuring optimal performance and resource utilization.

## Compatible models

You can deploy most [models from HuggingFace](https://huggingface.co/models?other=LLM).
For a full list of supported models architectures, see [Compatible model architectures](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#compatible-model-architectures).

## Getting started

At a high level, you can set up the vLLM Worker by:

- Selecting your deployment options
- Configure any necessary environment variables
- Deploy your model

For detailed guidance on setting up, configuring, and deploying your vLLM Serverless Endpoint Worker, including compatibility details, environment variable settings, and usage examples, see [Get started](/serverless/workers/vllm/get-started).

### Deployment options

- **Pre-Built docker image**: (recommended) Leverage pre-configured Docker image for hassle-free deployment. Ideal for users seeking a quick and straightforward setup process

- **Custom docker image**: For advanced users, customize and build your Docker image with the model baked in, offering greater control over the deployment process.

For more information see:

- [vLLM Worker GitHub Repository](https://github.com/runpod-workers/worker-vllm)
- [vLLM Worker Docker Hub](https://hub.docker.com/r/runpod/worker-vllm/tags)

For more information on creating a custom docker image, see [Build Docker Image with Model Inside](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#option-2-build-docker-image-with-model-inside).

## Next steps

- [Get started](/serverless/workers/vllm/get-started): Learn how to deploy a vLLM Worker as a Serverless Endpoint, with detailed guides on configuration and sending requests.
- [Environment variables](/serverless/workers/vllm/environment-variables): Explore the environment variables available for the vLLM Worker, including detailed documentation and examples.
- [Run Gemma 7b](/tutorials/serverless/run-gemma-7b): Walk through deploying Google's Gemma model using RunPod's vLLM Worker, guiding you to set up a Serverless Endpoint with a gated large language model (LLM).
