---
title: Overview
sidebar_position: 1
description: "Deploy and manage Serverless workers with RunPod endpoints, featuring asynchronous and synchronous operations, scalability, and flexibility for modern computing tasks."
---

# Endpoints overview

Endpoints are the foundation of RunPod Serverless, serving as the gateway for deploying and managing your Serverless workers. They provide a consistent API interface that allows your applications to interact with powerful computational resources on demand.

Whether you're processing large datasets, running AI inference, or performing compute-intensive tasks, endpoints give you the flexibility to deploy and scale your workloads.

## What are endpoints?

RunPod endpoints are RESTful APIs that accept HTTP requests, execute your code, and return the result via HTTP response. Each endpoint provides a unique URL and abstracts away the complexity of managing infrastructure. Behind the scenes, RunPod handles the entire lifecycle of Serverless workers, including job queuing, execution, and result delivery, so you can focus on your code, not the infrastructure.

## Key features

### Execution modes

Serverless offers **asynchronous processing** via the `/run` endpoint operation, which lets you submit jobs that run in the background and check results later, making this ideal for long-running tasks.

It also provides **synchronous operations** through the `/runsync` endpoint operation, allowing you to receive immediate results in the same request, which is perfect for interactive applications.

To learn more, see [Endpoint operations](/serverless/endpoints/operations).

### Deployment and scaling

RunPod endpoints are **auto-scaling**, automatically scaling from zero to hundreds of workers based on demand. You can **customize your endpoint configuration** to adjust the minimum and maximum worker count, GPU allocation, and memory settings. The system also offers **GPU prioritization**, allowing you to specify preferred GPU types in order of priority.

To learn more, see [Endpoint configurations](/serverless/endpoints/endpoint-configurations).

### Integration options

RunPod endpoints support [webhook notifications](/serverless/endpoints/send-requests#webhook-notifications), allowing you to configure endpoints to call your webhook when jobs complete.

It also includes [S3-compatible storage integration](/serverless/endpoints/send-requests#s3-compatible-storage-integration) for working with object storage for larger inputs and outputs.

## Key concepts

Understanding these fundamental concepts will help you work effectively with Serverless endpoints:

An **endpoint** is a RESTful API, which provides a URL that serves as the entry point for your Serverless worker, allowing you to send requests and receive responses.

A **request** is an HTTP request that you send to an endpoint, which can include parameters, payloads, and headers that define what the endpoint should process. For example, a `POST` request to run a job, or a `GET` request to check status of a job or endpoint health.

When a request is sent to an endpoint, it creates a **job** that gets processed by a worker. **Jobs** can be either synchronous (immediate response) or asynchronous (background processing).

A **worker** is the containerized environment that executes your handler code, providing the compute resources (CPU, GPU, memory) needed to process requests.

The **handler** is the code that processes incoming requests and returns responses, defining the business logic of your endpoint.

<img src="/img/docs/serverless-request-flow.png" width="800" alt="A diagram demonstrating the Serverless endpoint request flow"/>

## Getting started

[Follow this step-by-step guide](/serverless/get-started) to create your first custom endpoint. This tutorial walks you through the process of setting up your development environment, creating a handler file, testing your endpoint locally, building and deploying a worker image, and sending endpoint requests using the RunPod console.

## Next steps

Dive deeper into what you can achieve with RunPod Serverless endpoints:

- [Deploy a vLLM worker as a Serverless endpoint.](/serverless/vllm/overview)
- [Submit jobs to your Serverless workers.](/serverless/endpoints/operations)
- [Send requests to your endpoints programmatically.](/serverless/endpoints/send-requests)
- [Manage your endpoints using the RunPod console.](/serverless/endpoints/manage-endpoints)
- [Configure your endpoints for optimal performance and cost.](/serverless/endpoints/endpoint-configurations)
