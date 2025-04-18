---
title: "Endpoint configurations"
sidebar_position: 8
description: Configure your endpoint settings to optimize performance and cost, including GPU selection, worker count, idle timeout, and advanced options like data centers, network volumes, and scaling strategies.
---

This guide explains all configurable settings for RunPod Serverless endpoints, helping you optimize for performance, cost, and reliability.

## Basic configurations

### Endpoint name

The name you assign to your endpoint for easy identification in your dashboard. This name is only visible to you and doesn't affect the endpoint ID used for API calls.

### GPU selection

Choose one or more GPU types for your endpoint in order of preference. RunPod prioritizes allocating the first GPU type in your list and falls back to subsequent GPU types if your first choice is unavailable. Selecting multiple GPU types improves availability, especially for high-demand GPUs.

### Worker configuration

#### Active (min) workers

Sets the minimum number of workers that remain running at all times.

- **Default**: 0 (scales to zero when idle)

Setting this at one or higher eliminates cold start delays for faster response times. Active workers incur charges immediately, but receive up to 30% discount from regular pricing.

#### Max workers

The maximum number of concurrent workers your endpoint can scale to.

- **Default**: 3

:::tip

We recommend that you set this value 20% higher than your expected maximum concurrency. If requests are frequently throttled, consider increasing this value to 5 or more.

:::

#### GPUs per worker

The number of GPUs assigned to each worker instance.

- **Default**: 1

### Timeout settings

#### Idle timeout

The amount of time workers keep running without an active request (you are charged for active and idle workers at the same rate). An idle timeout of at least 5 seconds is recommended to minimize cold starts. Longer timeouts reduce cold starts for intermittent traffic but increase costs.

- **Default**: 5 seconds

#### Execution timeout

The maximum time a job can run before automatic termination. This prevents runaway jobs from consuming excessive resources. You can turn off this setting, but we highly recommend keeping it on.

- **Default**: 600 seconds (10 minutes)
- **Maximum**: 24 hours (can be extended using job TTL)

#### Job TTL (time-to-live)

The maximum time a job remains in the queue before automatic termination.

- **Default**: 86,400,000 milliseconds (24 hours)
- **Minimum**: 10,000 milliseconds (10 seconds)

See [Execution policies](/serverless/endpoints/send-requests#execution-policies) for more information.

:::tip

You can use the `/status` operation to configure the time-to-live (TTL) for an individual job by appending a TTL parameter when checking the status of a job. For example, `https://api.runpod.ai/v2/{endpoint_id}/status/{job_id}?ttl=6000` sets the TTL for the job to 6 seconds. Use this when you want to tell the system to remove a job result sooner than the default retention time.

:::

### FlashBoot

FlashBoot is RunPod's solution for reducing the average cold-start times on your endpoint. It works probabilistically. When your endpoint has consistent traffic, your workers have a higher chance of benefiting from FlashBoot for faster spin-ups. However, if your endpoint isn't receiving frequent requests, FlashBoot has fewer opportunities to optimize performance. There is no additional cost associated with FlashBoot.

## Advanced configurations

### Data centers

Control which data centers can deploy and cache your workers. Allowing multiple data centers improves availability, while using a network volume restricts your endpoint to a single data center.

- **Default**: All data centers

### Network volumes

Attach persistent storage to your workers. Network volumes have higher latency than local storage, and restrict workers to the data center containing your volume. However, they're very useful for sharing large models or data between workers on an endpoint.

See [Create a network volume](/pods/storage/create-network-volumes) for more information.

### Auto-scaling type

#### Queue delay

Adds workers based on request wait times.

The queue delay scaling strategy adjusts worker numbers based on request wait times. With zero workers initially, the first request adds one worker. Subsequent requests add workers only after waiting in the queue for 4 seconds.

#### Request count

The request count scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently.

Total workers formula: `Math.ceil((requestsInQueue + requestsInProgress) / 4)`

### Expose HTTP/TCP ports

Enables direct communication with your worker via its public IP and port. This can be useful for real-time applications requiring minimal latency, such as [WebSocket applications](https://github.com/runpod-workers/worker-websocket).

### Enabled GPU types

Here you can specify which [GPU types](/references/gpu-types) to use within your selected GPU size categories. By default, all GPU types are enabled.

### CUDA version selection

Specify which CUDA versions can be used with your workload to ensures your code runs on compatible GPU hardware RunPod will match your workload to GPU instances with the selected CUDA versions.

## Best practices

- **Start conservative** with max workers and scale up as needed.
- **Monitor throttling** and adjust max workers accordingly.
- **Use active workers** for latency-sensitive applications.
- **Select multiple GPU types** to improve availability.
- **Choose appropriate timeouts** based on your workload characteristics.
- **Consider data locality** when using network volumes.
