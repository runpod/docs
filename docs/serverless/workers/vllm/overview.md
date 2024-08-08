---
title: Overview
sidebar_position: 1
description: "Deploy a highly optimized vLLM Worker as a serverless endpoint, leveraging Hugging Face LLMs and OpenAI's API with ease, featuring ease of use, open compatibility, dynamic batch size, and customization options for a scalable and cost-effective solution."
---

Use the `runpod/worker-v1-vllm:stable-cuda12.1.0` image to deploy a vLLM Worker.
The vLLM Worker can use most Hugging Face LLMs and is compatible with OpenAI's API, by specifying the `MODEL_NAME` parameter.
You can also use RunPod's [`input` request format](/serverless/endpoints/send-requests).

RunPod's vLLM Serverless Endpoint Worker are a highly optimized solution for leveraging the power of various LLMs.

For more information, see the [vLLM Worker](https://github.com/runpod-workers/worker-vllm) repository.

## Key features

- **Ease of Use**: Deploy any LLM using the pre-built Docker image without the hassle of building custom Docker images yourself, uploading heavy models, or waiting for lengthy downloads.
- **OpenAI Compatibility**: Seamlessly integrate with OpenAI's API by changing 2 lines of code, supporting Chat Completions, Completions, and Models, with both streaming and non-streaming.
- **Dynamic Batch Size**: Experience the rapid time-to-first-token high of no batching combined with the high throughput of larger batch sizes. (Related to batching tokens when streaming output)
- **Extensive Model Support**: Deploy almost any LLM from Hugging Face, including your own.
- **Customization**: Have full control over the configuration of every aspect of your deployment, from the model settings, to tokenizer options, to system configurations, and much more, all done through environment variables.
- **Speed**: Experience the speed of the vLLM Engine.
- **Serverless Scalability and Cost-Effectiveness**: Scale your deployment to handle any number of requests and only pay for active usage.

## Compatible models

You can deploy most [models from Hugging Face](https://huggingface.co/models?other=LLM).
For a full list of supported models architectures, see [Compatible model architectures](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#compatible-model-architectures).

## Getting started

At a high level, you can set up the vLLM Worker by:

- Selecting your deployment options
- Configure any necessary environment variables
- Deploy your model

For detailed guidance on setting up, configuring, and deploying your vLLM Serverless Endpoint Worker, including compatibility details, environment variable settings, and usage examples, see [Get started](/serverless/workers/vllm/get-started).

### Deployment options

- **[Configurable Endpoints](/serverless/workers/vllm/get-started#deploy-using-the-web-ui)**: (recommended) Use RunPod's Web UI to quickly deploy the OpenAI compatable LLM with the vLLM Worker.

- **[Pre-Built docker image](/serverless/workers/vllm/get-started#deploy-using-the-worker-image)**: Leverage pre-configured Docker image for hassle-free deployment. Ideal for users seeking a quick and straightforward setup process

- **Custom docker image**: For advanced users, customize and build your Docker image with the model baked in, offering greater control over the deployment process.

For more information see:

- [vLLM Worker GitHub Repository](https://github.com/runpod-workers/worker-vllm)
- [vLLM Worker Docker Hub](https://hub.docker.com/r/runpod/worker-vllm/tags)

For more information on creating a custom docker image, see [Build Docker Image with Model Inside](https://github.com/runpod-workers/worker-vllm/blob/main/README.md#option-2-build-docker-image-with-model-inside).

## Next steps

- [Get started](/serverless/workers/vllm/get-started): Learn how to deploy a vLLM Worker as a Serverless Endpoint, with detailed guides on configuration and sending requests.
- [Configurable Endpoints](/serverless/workers/vllm/configurable-endpoints): Select your Hugging Face model and vLLM takes care of the low-level details of model loading, hardware configuration, and execution.
- [Environment variables](/serverless/workers/vllm/environment-variables): Explore the environment variables available for the vLLM Worker, including detailed documentation and examples.
- [Run Gemma 7b](/tutorials/serverless/gpu/run-gemma-7b): Walk through deploying Google's Gemma model using RunPod's vLLM Worker, guiding you to set up a Serverless Endpoint with a gated large language model (LLM).
