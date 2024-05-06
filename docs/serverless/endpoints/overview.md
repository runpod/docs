---
title: Overview
sidebar_position: 1
---

RunPod Endpoints serve as the gateway to deploying and managing your Serverless Workers.
These endpoints allow for flexible interaction with a variety of models, supporting both asynchronous and synchronous operations tailored to your computational needs.
Whether you're processing large data sets, requiring immediate results, or scheduling tasks to run in the background, RunPod's API Endpoints provide the versatility and scalability essential for modern computing tasks.

### Key features

- **Asynchronous and synchronous jobs:** Choose the execution mode that best fits your workflow, whether it's a task that runs in the background or one that delivers immediate results.
- **Serverless Workers:** Deploy your computational tasks without worrying about server management, enjoying the benefits of a fully managed infrastructure.
- **Scalability and flexibility:** Easily scale your operations up or down based on demand, with the flexibility to handle various computational loads.

### Getting started

Before you begin, ensure you have obtained your [RunPod API key](/get-started/api-keys).
This key is essential for authentication, billing, and accessing the API.

You can find your API key in the [user settings section](https://www.runpod.io/console/user/settings) of your RunPod account.

:::note

**Privacy and security:** RunPod prioritizes your data's privacy and security.
Inputs and outputs are retained for a maximum of 30 minutes for asynchronous requests and 1 minute for synchronous requests to protect your information.

:::

### Exploring RunPod Endpoints

Dive deeper into what you can achieve with RunPod Endpoints through the following resources:

- [Use the vLLM Worker](/serverless/workers/vllm/overview): Learn how to deploy a vLLM Worker as a Serverless Endpoint, with detailed guides on configuration and sending requests.
- [Invoke Jobs](/serverless/endpoints/job-operations): Learn how to submit jobs to your serverless workers, with detailed guides on both asynchronous and synchronous operations.
- [Send Requests](/serverless/endpoints/send-requests): Discover how to communicate with your endpoints, including tips on structuring requests for optimal performance.
- [Manage Endpoints](/serverless/endpoints/manage-endpoints): Find out how to manage your endpoints effectively, from deployment to scaling and monitoring.
- [Endpoint Operations](/serverless/references/operations): Access a comprehensive list of operations supported by RunPod Endpoints, including detailed documentation and examples.
