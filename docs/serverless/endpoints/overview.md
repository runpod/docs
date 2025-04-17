---
title: Overview
sidebar_position: 1
description: "Deploy and manage Serverless workers with RunPod endpoints, featuring asynchronous and synchronous operations, scalability, and flexibility for modern computing tasks."
---

RunPod endpoints serve as the gateway to deploying and managing your Serverless workers.
These endpoints allow for flexible interaction with a variety of models, supporting both asynchronous and synchronous operations tailored to your computational needs.
Whether you're processing large data sets, requiring immediate results, or scheduling tasks to run in the background, RunPod's API endpoints provide the versatility and scalability essential for modern computing tasks.

## Key features

- **Asynchronous and synchronous jobs:** Choose the execution mode that best fits your workflow, whether it's a task that runs in the background or one that delivers immediate results.
- **Serverless workers:** Deploy your computational tasks without worrying about server management, enjoying the benefits of a fully managed infrastructure.
- **Scalability and flexibility:** Easily scale your operations up or down based on demand, with the flexibility to handle various computational loads.

<img src="/img/docs/serverless-request-flow.png" width="800" alt="A diagram demonstrating the Serverless endpoint request flow"/>

## Key concepts

Check out these two links for fundamental endpoint concepts, including key definitions and basic settings.

## Create a custom endpoint

Ready to create your first endpoint? Follow our step-by-step guide to [create a custom endpoint](/serverless/get-started) that walks you through:

- Setting up your development environment
- Creating a handler file
- Testing your endpoint locally
- Building and deploying your Docker image
- Sending requests to your endpoint

For a detailed explanation of all the configurable options for an endpoint, see [Endpoint settings](/serverless/endpoints/endpoint-configurations.md).

## Next steps

Dive deeper into what you can achieve with RunPod endpoints through the following resources:

- [Create a vLLM endpoint](/serverless/vllm/overview): Learn how to deploy a vLLM worker as a Serverless endpoint, with detailed guides on configuration and sending requests.
- [Invoke jobs](/serverless/endpoints/job-operations): Learn how to submit jobs to your Serverless workers, with detailed guides on both asynchronous and synchronous operations.
- [Send requests](/serverless/endpoints/send-requests): Discover how to communicate with your endpoints, including tips on structuring requests for optimal performance.
- [Manage endpoints](/serverless/endpoints/manage-endpoints): Find out how to manage your endpoints effectively, from deployment to scaling and monitoring.
- [Endpoint operations](/serverless/endpoints/operations): Access a comprehensive list of operations supported by RunPod endpoints, including detailed documentation and examples.
