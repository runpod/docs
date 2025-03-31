---
title: Workers overview
description: "Learn about RunPod workers and how they power serverless AI deployments. Understand worker architecture, capabilities, and implementation approaches."
sidebar_position: 1
---

# Workers overview

RunPod workers are the fundamental building blocks of serverless deployments on the RunPod platform. They provide a containerized, scalable approach to running AI workloads on demand. This overview explains what workers are, how they function, and the different types available.

## What are workers?

Workers are containerized applications designed to perform specific tasks when invoked through the RunPod API. Each worker:

- Runs in its own isolated environment (Docker container)
- Processes jobs from a queue
- Returns results through a standardized API response
- Can scale horizontally based on demand

Workers follow a handler-based architecture, where a central function processes incoming requests, performs computations, and returns results.

## Worker architecture

A typical RunPod worker consists of these components:

1. **Handler function**: The entry point that receives requests and returns responses
2. **Core logic**: The specific implementation of the worker's functionality
3. **Input validation**: Ensures requests contain the necessary parameters
4. **Output formatting**: Structures the results in a standardized way
5. **Error handling**: Manages exceptions and provides helpful error messages

## Types of workers

RunPod supports several types of workers:

### By template

- **Pre-built workers**: Ready-to-use workers for common AI tasks (vLLM, Stable Diffusion, Whisper)
- **Template workers**: Starting points for custom development
- **Custom workers**: Fully customized implementations for specific needs

### By capability

- **Inference workers**: Deploy AI models for inference (text generation, image generation)
- **Processing workers**: Transform or analyze data (image processing, audio transcription)
- **Utility workers**: Provide support functions (file conversion, data extraction)

## Worker development approaches

There are multiple ways to develop workers for RunPod:

1. **Start from scratch**: Build a worker completely from the ground up
2. **Customize a template**: Modify an existing template to meet your needs
3. **Adapt an existing model**: Package a pre-trained model into a worker
4. **Combine workers**: Create pipelines of workers that feed into each other

## When to use workers

Workers are ideal for:

- Deploying machine learning models for inference
- Processing data asynchronously
- Handling computationally intensive tasks
- Building scalable AI applications
- Creating APIs for AI functionality

## Next steps

The tutorials in this section will guide you through creating different types of workers:

- Building a custom worker from scratch
- Creating a vLLM worker for text generation
- Implementing a Whisper worker for speech-to-text
- Customizing specialized workers like Stable Diffusion and TTS

Each tutorial provides step-by-step instructions and code examples to help you build and deploy your own workers on RunPod. 