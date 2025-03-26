---
title: Worker Tutorials
description: "Learn how to create and customize specialized RunPod workers. Follow step-by-step guides to build, deploy, and optimize workers for various AI workloads."
sidebar_position: 1
---

# Worker Tutorials

These tutorials will guide you through creating and customizing specialized RunPod workers. Each tutorial provides detailed instructions and examples to help you build robust, high-performance workers for your specific use cases.

## What you'll learn

- How to set up your development environment for creating workers
- Best practices for building efficient and scalable workers
- Techniques for customizing and optimizing workers for specific tasks
- Methods for testing and deploying your workers to production

## Available tutorials

| Tutorial | Description |
|----------|-------------|
| [Build a Custom Worker from Scratch](./custom-worker.md) | Create a custom worker completely from scratch with a focus on image processing |
| [Create a vLLM Worker](./vllm-worker.md) | Build a worker for serving Large Language Models efficiently using vLLM |
| [Build a Whisper STT Worker](./whisper-worker.md) | Create a speech-to-text worker using OpenAI's Whisper model |
| [Custom Stable Diffusion Worker](/docs/serverless/workers/specialized/stable-diffusion) | Deploy and customize a Stable Diffusion image generation worker |
| [Text-to-Speech Worker](/docs/serverless/workers/specialized/tts) | Build a worker for converting text into natural-sounding speech |

## Prerequisites

Before starting these tutorials, you should have:

- A RunPod account with serverless access
- Basic understanding of Docker and containerization
- Familiarity with Python programming
- Docker installed on your local machine for development and testing

## Getting help

If you encounter any issues while following these tutorials, you can:

- Check the [RunPod documentation](https://docs.runpod.io) for additional information
- Join the [RunPod Discord community](https://discord.gg/runpod) for help from other users
- Contact [RunPod support](https://runpod.io/contact) for assistance

## Next steps

After completing these tutorials, consider:

1. Exploring other worker templates in the [RunPod Workers GitHub repository](https://github.com/runpod-workers)
2. Combining multiple workers to create more complex AI pipelines
3. Sharing your custom worker with the RunPod community
4. Setting up monitoring and observability for your deployed workers 