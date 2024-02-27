---
title: Overview
sidebar_position: 1
---

Use the `runpod/worker-vllm:latest` image to deploy a vLLM Worker.
The vLLM Worker can use any Hugging Face model and is compatible with OpenAI's API.

This is the recommended way to deploy your model, as it does not require you to build a Docker image, upload heavy models to DockerHub and wait for workers to download them.
Instead, use this option to deploy your model in a few clicks. F
or even more convenience, attach a network storage volume to your Endpoint, which will download the model once and share it across all workers.

vLLM Workers are also compatible with OpenAI's API, so you can use the same code to interact with the vLLM Worker as you would with OpenAI's API.

For more information on the vLLM Worker, see:

- [vLLM Worker on GitHub](https://github.com/runpod-workers/worker-vllm)
- [vLLM Worker on Docker Hub](https://hub.docker.com/r/runpod/worker-vllm/tags)
