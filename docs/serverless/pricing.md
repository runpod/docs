---
title: "Pricing"
description: "Understand RunPod Serverless pricing, including GPU rates and cost components."
sidebar_position: 2
---

# Serverless pricing

RunPod Serverless offers flexible, pay-per-second pricing with no upfront costs. This guide explains how pricing works and how to optimize your costs.

## GPU pricing

Serverless offers two pricing tiers:

### Flex workers

**On-demand workers** that scale to zero when not in use, so you only pay when processing requests. Flex workers are ideal for variable workloads, non-time-sensitive applications, and maximizing cost efficiency for sporadic usage.

### Active workers

**Always-on workers** that run 24/7. Active workers receive a 20-30% discount compared to flex workers, but you are charged continuously regardless of usage. Use active workers for consistent workloads, latency-sensitive applications, and high-volume processing.

### Pricing table (per second)

The price of flex/active workers depends on the GPU type and worker configuration:

| **GPU type(s)** | **Memory** | **Flex** | **Active** | **Description** |
| --- | --- | --- | --- | --- |
| H200 PRO | 141 GB | $0.00155 | $0.00124 | Extreme throughput for huge models |
| A100 | 80 GB | $0.00076 | $0.00060 | High throughput GPU, yet still very cost-effective |
| H100 PRO | 80 GB | $0.00116 | $0.00093 | Extreme throughput for big models |
| A6000, A40 | 48 GB | $0.00034 | $0.00024 | A cost-effective option for running big models |
| L40, L40S, 6000 Ada PRO | 48 GB | $0.00053 | $0.00037 | Extreme inference throughput on LLMs like Llama 3 7B |
| L4, A5000, 3090 | 24 GB | $0.00019 | $0.00013 | Great for small-to-medium sized inference workloads |
| 4090 PRO | 24 GB | $0.00031 | $0.00021 | Extreme throughput for small-to-medium models |
| A4000, A4500, RTX 4000 | 16 GB | $0.00016 | $0.00011 | The most cost-effective for small models |

For the latest pricing information, visit the [RunPod pricing page](https://www.runpod.io/pricing).

## How billing works

Serverless billing operates on a precise pay-as-you-go model with specific timing mechanisms.

Billing starts when the system signals a worker to wake up and ends when the worker is fully stopped. RunPod Serverless is charged by the second, with partial seconds rounded up to the next full second. For example, if your request takes 2.3 seconds to complete, you'll be billed for 3 seconds.

### Compute and storage costs

Your total Serverless costs include both compute time (GPU usage) and temporary storage:

1. **Compute costs**: Charged per second based on the GPU type as shown in the pricing table above.
2. **Storage costs**: The worker container volume incurs charges only while workers are running, calculated in 5-minute intervals. Even if your worker runs for less than 5 minutes, you'll be charged for the full 5-minute period. The storage cost is $0.000011574 per GB per 5 minutes (equivalent to approximately $0.10 per GB per month).

If you have many workers continuously running with high storage costs, you can utilize [network volumes](/pods/storage/create-network-volumes) to reduce expenses. Network volumes allow you to share data efficiently across multiple workers, reduce per-worker storage requirements by centralizing common files, and maintain persistent storage separate from worker lifecycles.

### Compute cost breakdown

Serverless workers incur charges during these periods:

1. **Cold start time:** The time required to initialize a worker and load models into GPU memory.
2. **Execution time:** The time spent actually processing the request.
3. **Idle time:** The period in which the worker remains active after completing a request.

#### Cold start time

A cold start occurs when a worker is initialized from a scaled-down state. This typically involves starting the container, loading models into GPU memory, and initializing runtime environments. Cold start duration varies based on model size and complexity. Larger models take longer to load into GPU memory.

To optimize cold start times, you can use FlashBoot (included at no extra charge) or configure your [endpoint settings](/serverless/endpoints/endpoint-configurations#reducing-worker-startup-times).

#### Execution time

This is the time your worker spends processing a request. Execution time depends on the complexity of your workload, the size of input data, and the performance of the GPUs you've selected.

Set reasonable [execution timeout limits](/serverless/endpoints/endpoint-configurations#execution-timeout) to prevent runaway jobs from consuming excessive resources, and optimize your code to reduce processing time where possible.

#### Idle time

After completing a request, workers remain active for a specified period before scaling down. This reduces cold starts for subsequent requests but incurs additional charges. The default idle timeout is 5 seconds, but you can configure this in your [endpoint settings](/serverless/endpoints/endpoint-configurations#idle-timeout).

## Billing support

If you think you've been billed incorrectly, please [contact support](https://www.runpod.io/contact), and include this information in your request:

1. The Serverless endpoint ID where you experienced billing issues.
2. Request ID for the specific request (if applicable).
3. The approximate time when the billing issue occurred.

Providing these details will help our support team resolve your issue more quickly.
