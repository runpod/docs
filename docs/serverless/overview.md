---
title: Overview
description: "Use Serverless to scale your machine learning workloads, with flexible GPU computing for AI inference, training, and general compute, pay-per-second pricing, and fast deployment options for custom endpoints."
sidebar_position: 1
---

# Serverless overview

Serverless is a cloud computing platform that enables developers to run AI models and other compute-intensive workloads without managing the underlying infrastructure. It provides on-demand GPU and CPU resources with automatic scaling to handle varying workload requirements.

Get started with Serverless by following a step-by-step tutorial:

- Handler functions: Bring your own functions and run in the cloud.
- Quick Deploy: Quick deploys are pre-built custom endpoints of the most popular AI models.

You can also learn about the [Serverless programming model](/serverless/architecture).

## Key features

- **AI Inference:** Handle millions of inference requests daily with the ability to scale to billions, making it ideal for machine learning inference tasks while keeping costs low.

- **Autoscaling:** Dynamically scale workers from 0 to 100 on the Secure Cloud platform, which is highly available and distributed globally, providing computational resources exactly when needed.

- **AI Training:** Run machine learning training tasks that can take up to 12 hours. GPUs are spun up per request and scaled down once the task is done, offering a flexible solution for AI training needs.

- **Container Support:** Bring any Docker container to RunPod. Both public and private image repositories are supported, allowing you to configure your environment exactly how you want.

- **Fast Cold-Start:** RunPod proactively pre-warms workers to reduce cold-start times. For stable diffusion, the total start time is typically 3 seconds cold-start plus 5 seconds runtime.

- **Monitoring and Debugging:** Access to GPU, CPU, Memory, and other metrics helps you understand your computational workloads. Full debugging capabilities are available through logs and SSH, with a web terminal for easier access.

- **Webhooks:** Leverage webhooks to get data output as soon as a request is done. Data is pushed directly to your Webhook API, providing instant access to results.

## Get started with Serverless

You can get started with RunPod Serverless in a few different ways:

### 1. Quick Deploys

Quick Deploys are pre-built custom endpoints of the most popular AI models, allowing you to deploy with minimal configuration:

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) in the Web interface
2. Select your model
3. Provide a name for your Endpoint
4. Select your GPU instance
5. (Optional) Customize your deployment
6. Select **Deploy**

### 2. Handler Functions

Bring your own functions and run them in the cloud:

1. Create a Python handler function
2. Package it in a Docker container
3. Deploy it as a Serverless Endpoint

### 3. vLLM Workers

Deploy large language models with ease:

1. Use the pre-built vLLM Worker Docker image
2. Specify the Hugging Face model you want to deploy
3. Configure your environment variables
4. Deploy your model

## Key Concepts

### Endpoints

A Serverless Endpoint provides the REST API endpoint that serves your application. You can create multiple endpoints, each with its own configuration.

### Workers

Workers run your code in the cloud with the following characteristics:

- **Fully Managed Execution:** RunPod handles the infrastructure, so your code runs when triggered
- **Automatic Scaling:** Workers scale based on workload, ensuring efficient resource usage
- **Flexible Language Support:** Use various programming languages with RunPod SDK
- **Seamless Integration:** Each deployed Worker provides an Endpoint for easy integration

## Deployment Options

### GitHub Integration

RunPod can integrate with your GitHub repository to streamline your workflow:

1. Authorize RunPod to access your GitHub repository
2. Configure the branch, Dockerfile, and deployment options
3. Set up your compute options

With GitHub integration, every push to your specified branch results in an updated Endpoint, making continuous deployment seamless.

### Custom Container Images

You can also deploy your own custom Docker images:

1. Create a Dockerfile for your application
2. Build and push the Docker image to a container registry
3. Deploy the image as a Serverless Endpoint

## Next Steps

- [Get started with Serverless](/serverless/get-started)
- Deploy an endpoint in seconds with [Quick Deploys](/serverless/quick-deploys)
- [Learn about Endpoints](/serverless/endpoints/overview)
- [Develop Custom Workers](/serverless/workers/overview)
- [Set Up GitHub Integration](/serverless/github-integration)