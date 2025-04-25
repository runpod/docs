---
title: Overview
sidebar_position: 1
description: "RunPod is a cloud-based platform for managed function execution, offering fully managed infrastructure, automatic scaling, flexible language support, and seamless integration, allowing developers to focus on code and deploy it easily."
---

# Serverless workers

Workers are container instances that execute your code when requests are made to your [Serverless endpoint](/serverless/endpoints/overview). They process request inputs using a [handler function](/serverless/workers/handler-functions) that you define. Serverless endpoints automatically manage the worker lifecycle, starting them when needed and stopping them when idle to optimize resource usage.

<img src="/img/docs/serverless-workers-tab.png" width="1200" alt="Screenshot of the workers tab in the RunPod console."/>

Workers are responsible for:

- Processing incoming requests.
- Executing your handler functions.
- Managing computational resources.
- Outputting results for your endpoint to return.

## Deploy a worker

To deploy a custom worker:

1. Create a [handler function](/serverless/workers/handler-functions) to process your inputs.
2. Package your application in a Docker container or use pre-built templates.
3. Deploy your worker to a Serverless endpoint.

For a full walkthrough, see [Create a custom worker](/serverless/workers/custom-worker).

You can also deploy a preconfigured working by using [Quick Deploys.](/serverless/workers/quick-deploys)

## Worker configurations

When deploying a worker to a Serverless endpoint, you can configure various parameters:

- **GPU selection**: Choose the appropriate GPU type for your workload.
- **Worker count**: Set minimum and maximum number of workers.
- **Memory allocation**: Configure memory available to each worker.
- **Environment variables**: Set parameters for worker behavior.
- **Storage options**: Add network volumes for persistent storage between workers.

To learn more, see [Endpoint configurations](/serverless/endpoints/endpoint-configurations#worker-configuration).

## Worker types
- **Active (min) workers**: "Always on" workers that eliminate cold start delays. Charged immediately but with up to 30% discount. (Default: 0)
- **Flex workers**: "Sometimes on" workers that scale during traffic surges. Transition to idle after completing jobs. (Default: Max - Active = 3)
- **Extra workers**: Additional workers added during traffic spikes when Docker images are cached on host servers. (Default: 2)

## Worker states

Workers transition through different states as they handle requests and respond to changes in traffic patterns. Understanding these states helps you monitor and troubleshoot your Serverless endpoints effectively.

- **Initializing**: Worker is starting up as the Docker image is downloaded and prepared. The container is starting and code is loading.
- **Idle**: Worker is ready but not processing requests. No charges apply while idle.
- **Running**: Worker is actively processing requests. Billing occurs per second.
- **Throttled**: Worker is ready but temporarily unable to run due to host machine resource constraints.
- **Outdated**: Worker is marked for replacement after endpoint updates. Continues processing current jobs during rolling updates (10% of max workers at a time).
- **Unhealthy**: Worker has crashed due to Docker image issues, incorrect start commands, or machine problems. System automatically retries with exponential backoff for up to 7 days.

You can view the state of your workers using the **Workers** tab of a Serverless endpoint. This tab provides real-time information about each worker's current state, resource utilization, and job processing history, allowing you to monitor performance and troubleshoot issues effectively.

## Next steps

- [Create a custom worker.](/serverless/get-started)
- [Deploy large language models using vLLM.](/serverless/vllm/overview)
- [Explore Quick Deploy options.](/serverless/quick-deploys)
- [Learn about handler functions.](/serverless/handlers/overview)
- [Configure your endpoints for optimal performance.](/serverless/endpoints/endpoint-configurations)