---
title: "Endpoint configuration"
sidebar_position: 8
description: Configure your endpoint settings to optimize performance and cost, including GPU selection, worker count, idle timeout, and advanced options like data centers, network volumes, and scaling strategies.
---

This guide explains all available settings and best practices for configuring RunPod Serverless endpoints, helping you optimize for performance, cost, and reliability.

## Basic configuration

### Endpoint name

The name you assign to your endpoint for easy identification in your dashboard. This name is only visible to you and doesn't affect the endpoint ID used for API calls.

### GPU selection

Choose one or more GPU types for your endpoint in order of preference. RunPod prioritizes allocating the first GPU type in your list and falls back to subsequent GPU types if your first choice is unavailable.

:::tip

Selecting multiple GPU types improves availability, especially for high-demand GPUs.

:::

### Worker configuration

#### Active (min) workers

Sets the minimum number of workers that remain running at all times. Setting this at one or higher eliminates cold start delays for faster response times. Active workers incur charges immediately, but receive up to 30% discount from regular pricing.

Default: 0

:::tip

For workloads with long cold start times, consider using active workers to eliminate startup delays. You can estimate the optimal number by:

1. Measuring your requests per minute during typical usage.
2. Calculating average request duration in seconds.
3. Using the formula: Active Workers = (Requests per Minute × Request Duration) / 60

For example, with 6 requests per minute taking 30 seconds each: 6 × 30 / 60 = 3 active workers.

Even a small number of active workers can significantly improve performance for steady traffic patterns while maintaining cost efficiency.

:::

#### Max workers

The maximum number of concurrent workers your endpoint can scale to.

Default: 3

:::warning

Setting max workers to 1 restricts your deployment to a single machine, creating potential bottlenecks if that machine becomes unavailable.

We recommend setting your max worker count approximately 20% higher than your expected maximum concurrency. This headroom allows for smoother scaling during traffic spikes and helps prevent request throttling.

:::

#### GPUs per worker

The number of GPUs assigned to each worker instance.

Default: 1

:::tip

When choosing between multiple lower-tier GPUs or fewer high-end GPUs, you should generally prioritize high-end GPUs with lower GPU count per worker when possible.

- High-end GPUs typically offer faster memory speeds and newer architectures, improving model loading and inference times.
- Multi-GPU configurations introduce parallel processing overhead that can offset performance gains.
- Higher GPU-per-worker requirements can reduce availability, as finding machines with multiple free GPUs is more challenging than locating single available GPUs.

:::

### Timeout settings

#### Idle timeout

The amount of time that a worker continues running after completing a request. You're still charged for this time, even if the worker isn't actively processing any requests.

By default, the idle timeout is set to 5 seconds to help avoid frequent start/stop cycles and reduce the likelihood of cold starts. Setting a longer idle timeout can help minimize cold starts for intermittent traffic, but it may also increase your costs.

When configuring idle timeout, start by matching it to your average cold start time to reduce startup delays. For workloads with extended cold starts, consider longer idle timeouts to minimize repeated initialization costs.

:::warning

That idle timeout is only effective when using [queue delay scaling](#queue-delay). Be cautious with high timeout values, as workers with constant traffic may never reach the idle state necessary to scale down properly.

:::

#### Execution timeout

The maximum time a job can run before automatic termination. This prevents runaway jobs from consuming excessive resources. You can turn off this setting, but we highly recommend keeping it on.

Default: 600 seconds (10 minutes)
Maximum: 24 hours (can be extended using job TTL)

:::warning

We strongly recommend enabling execution timeout for all endpoints. Set the timeout value to your typical request duration plus a 10-20% buffer. This safeguard prevents unexpected or faulty requests from running indefinitely and consuming unnecessary resources.

:::

#### Job TTL (time-to-live)

The maximum time a job remains in the queue before automatic termination.

Default: 86,400,000 milliseconds (24 hours)
Minimum: 10,000 milliseconds (10 seconds)

See [Execution policies](/serverless/endpoints/send-requests#execution-policies) for more information.

:::tip

You can use the `/status` operation to configure the time-to-live (TTL) for an individual job by appending a TTL parameter when checking the status of a job. For example, `https://api.runpod.ai/v2/{endpoint_id}/status/{job_id}?ttl=6000` sets the TTL for the job to 6 seconds. Use this when you want to tell the system to remove a job result sooner than the default retention time.

:::

### FlashBoot

FlashBoot is RunPod's solution for reducing the average cold-start times on your endpoint. It works probabilistically. When your endpoint has consistent traffic, your workers have a higher chance of benefiting from FlashBoot for faster spin-ups. However, if your endpoint isn't receiving frequent requests, FlashBoot has fewer opportunities to optimize performance. There is no additional cost associated with FlashBoot.

## Advanced configuration

When configuring advanced settings, remember that each constraint (data center, storage, CUDA version, GPU type) may limit resource availability. For maximum availability and reliability, select all data centers and CUDA versions, and avoid network volumes unless your workload specifically requires them.

### Data centers

Control which data centers can deploy and cache your workers. Allowing multiple data centers improves availability, while using a network volume restricts your endpoint to a single data center.

Default: All data centers

:::tip

For the highest availability, allow all data centers (i.e., keep the default setting in place) and avoid using network volumes unless necessary.

:::

### Network volumes

Attach persistent storage to your workers. Network volumes have higher latency than local storage, and restrict workers to the data center containing your volume. However, they're very useful for sharing large models or data between workers on an endpoint.

See [Create a network volume](/pods/storage/create-network-volumes) for more information.

### Auto-scaling type

#### Queue delay

Adds workers based on request wait times.

The queue delay scaling strategy adjusts worker numbers based on request wait times. Workers are added if requests spend more than X seconds in the queue, where X is a threshold you define. By default, this threshold is set at 4 seconds.

#### Request count

The request count scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently.

Total workers formula: `Math.ceil((requestsInQueue + requestsInProgress) / 4)`

:::tip

**Optimizing your auto-scaling strategy:**

- For maximum responsiveness, use "request count" with a scaler value of 1 to provision workers immediately for each incoming request.
- LLM workloads with frequent, short requests typically perform better with "request count" scaling.
- For gradual scaling, increase the request count scaler value to provision workers more conservatively.
- Use queue delay when you want workers to remain available briefly after request completion to handle follow-up requests.
- With long cold start times, favor conservative scaling to minimize the performance and cost impacts of frequent worker initialization.

:::

### Expose HTTP/TCP ports

Enables direct communication with your worker via its public IP and port. This can be useful for real-time applications requiring minimal latency, such as [WebSocket applications](https://github.com/runpod-workers/worker-websocket).

### Enabled GPU types

Here you can specify which [GPU types](/references/gpu-types) to use within your selected GPU size categories. By default, all GPU types are enabled.

### CUDA version selection

Specify which CUDA versions can be used with your workload to ensures your code runs on compatible GPU hardware. RunPod will match your workload to GPU instances with the selected CUDA versions.

:::tip

CUDA versions are generally backward compatible, so we recommend that you check for the version you need and any higher versions. For example, if your code requires CUDA 12.4, you should also try running it on 12.5, 12.6, and so on.

Limiting your endpoint to just one or two CUDA versions can significantly reduce GPU availability. RunPod continuously updates GPU drivers to support the latest CUDA versions, so keeping more CUDA versions selected gives you access to more resources.

:::

## Best practices summary

- **Start conservative** with max workers and scale up as needed.
- **Monitor throttling** and adjust max workers accordingly.
- **Use active workers** for latency-sensitive applications.
- **Select multiple GPU types** to improve availability.
- **Choose appropriate timeouts** based on your workload characteristics.
- **Consider data locality** when using network volumes.
- **Avoid setting max workers to 1** to prevent bottlenecks.
- **Plan for 20% headroom** in max workers to handle load spikes.
- **Prefer high-end GPUs with lower GPU count** for better performance.
- **Set execution timeout** to prevent runaway processes.
- **Match auto-scaling strategy** to your workload patterns.