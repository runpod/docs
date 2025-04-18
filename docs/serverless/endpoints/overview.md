---
title: Overview
sidebar_position: 1
description: "Deploy and manage Serverless workers with RunPod endpoints, featuring asynchronous and synchronous operations, scalability, and flexibility for modern computing tasks."
---

# Endpoints overview

Endpoints are the foundation of RunPod Serverless, serving as the gateway for deploying and managing your Serverless workers. They provide a consistent API interface that allows your applications to interact with powerful computational resources on demand.

## What are endpoints?

RunPod endpoints are REST APIs that execute your code in response to HTTP requests. Each endpoint:

- Provides a unique URL for sending requests
- Manages the lifecycle of Serverless workers
- Handles job queuing, execution, and result delivery
- Supports both synchronous and asynchronous operations
- Automatically scales based on demand

Whether you're processing large datasets, running AI inference, or performing compute-intensive tasks, endpoints give you the flexibility to deploy and scale your workloads without managing infrastructure.

## Key features

### Execution modes

- **Asynchronous processing (`/run`)**: Submit jobs that run in the background and check results later, ideal for long-running tasks.
- **Synchronous operations (`/runsync`)**: Receive immediate results in the same request, perfect for interactive applications.
- **Streaming responses (`/stream`)**: Get partial results as they're generated for real-time applications.

To learn more, see [Endpoint operations](/serverless/endpoints/operations).

### Deployment and scaling

- **Auto-scaling workers**: Automatically scale from zero to hundreds of workers based on demand.
- **Worker configuration**: Customize worker count, GPU allocation, and memory settings.
- **GPU prioritization**: Specify preferred GPU types in order of priority.

### Integration options

- **Webhook notifications**: Configure endpoints to call your webhook when jobs complete.
- **S3-compatible storage**: Integrate with object storage for larger inputs and outputs.
- **Execution policies**: Control job timeouts, priority levels, and queue time-to-live.



## Key concepts

Understanding these fundamental concepts will help you work effectively with Serverless endpoints:

- **Endpoints**: A URL that serves as the entry point for your Serverless worker, allowing you to send requests and receive responses.
- **Request**: An HTTP request that you send to an endpoint, which can include parameters, payloads, and headers that define what the endpoint should process. For example, a `POST` request to run a job, or a `GET` requests to check status of a job or endpoint health.
- **Jobs**: When a request is sent to an endpoint, it creates a job that gets processed by a worker. Jobs can be either synchronous (immediate response) or asynchronous (background processing).
- **Worker**: The containerized environment that executes your Handler code, providing the compute resources (CPU, GPU, memory) needed to process requests.
- **Handlers**: The code that processes incoming requests and returns responses. Handlers define the business logic of your endpoint.

<img src="/img/docs/serverless-request-flow.png" width="800" alt="A diagram demonstrating the Serverless endpoint request flow"/>

## Getting started

Ready to create your first endpoint? Follow this step-by-step guide to [create a custom endpoint](/serverless/get-started) that walks you through:

- Setting up your development environment.
- Creating a handler file.
- Testing your endpoint locally.
- Building and deploying your Docker image.
- Sending requests to your endpoint.

For a detailed explanation of all the configurable settings for an endpoint, see [Endpoint configurations](/serverless/endpoints/endpoint-configurations.md).

## Next steps

Dive deeper into what you can achieve with RunPod Serverless endpoints:

- [Learn how to deploy a vLLM worker as a Serverless endpoint.](/serverless/vllm/overview)
- [Learn how to submit jobs to your Serverless workers.](/serverless/endpoints/operations)
- [Send requests to your endpoints programmatically.](/serverless/endpoints/send-requests)
- [Learn how to manage your endpoints using the RunPod console.](/serverless/endpoints/manage-endpoints)