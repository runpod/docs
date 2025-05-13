---
title: "Pricing"
description: "Understand RunPod Serverless pricing, including GPU rates and cost components."
sidebar_position: 5
---

# Serverless pricing

RunPod Serverless offers flexible, pay-per-second pricing with no upfront costs. This guide explains how pricing works and how to optimize your costs.

## GPU pricing

 Serverless offers two pricing tiers:

### Flex workers

**On-demand workers**. Flex workers are ideal for variable workloads, non-time-sensitive applications, and maximizing cost efficiency for sporadic usage. Flex workers scale to zero when not in use, so you only pay when processing requests.

### Active workers

**Always-on workers**. Active workers are ideal for consistent workloads, latency-sensitive applications, and high-volume processing. Active workers run 24/7 and receive a 20-30% discount compared to Flex pricing, but you're charged continuously regardless of usage.


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

## Understanding flex worker costs

Flex workers are charged during the following periods:

1. **Cold start time**: The time required to revive a worker and load models into GPU memory.
2. **Execution time**: The time spent actually processing the request.
3. **Idle time**: The period in which the worker remains active after completing a request.

<!-- 4. **Container storage**: Charges for storage used while the endpoint is running. -->

### Cold start time

A cold start occurs when a worker is revived from an idle state. This typically involves starting the container, loading models into GPU memory, and initializing runtime environments. Cold start duration varies based on model size and complexity. Larger models take longer to load into GPU memory.

To learn how to optimize cold starts times, see [Endpoint configuration](/serverless/endpoints/endpoint-configurations#reducing-worker-startup-times).

### Execution time

This is the time your worker spends processing a request. Execution time depends on the complexity of your workload, the size of input data, and the performance of the GPUs you've selected.

### Idle time

After completing a request, workers remain active for a specified period before scaling down. This reduces cold starts for subsequent requests but incurs additional charges. The default idle timeout is 5 seconds, but you can configure this in your [endpoint settings](/serverless/endpoints/endpoint-configurations#idle-timeout).

### Container storage

Container storage is charged only while your workers are running. When all workers are scaled down, you will no longer be charged.

## Cost optimization tips

### Minimize cold starts

Use [FlashBoot](/serverless/endpoints/endpoint-configurations#flashboot) to reduce cold start times (included at no extra charge). For latency-sensitive applications, increase the number of [active workers](/serverless/endpoints/endpoint-configurations#worker-configuration). Set appropriate [idle timeout](/serverless/endpoints/endpoint-configurations#idle-timeout) values based on your request frequency pattern to balance cost and performance.

### Control execution costs

Set reasonable [execution timeout limits](/serverless/endpoints/endpoint-configurations#execution-timeout) to prevent runaway jobs from consuming excessive resources. Optimize your code to reduce processing time where possible. Choose GPU types appropriate for your workload size rather than overprovisioning resources.

### Storage optimization

Use [network volumes](/pods/storage/create-network-volumes) for persistent storage needs (billed separately from Serverless). Optimize your container size to reduce storage costs during runtime.

## Billing support

If you think you've been billed incorrectly, please [contact support](https://www.runpod.io/contact), and include this information in your request:

1. The Serverless endpoint ID where you experienced billing issues
2. Request ID for the specific request (if applicable)
3. The approximate time when the billing issue occurred

Providing these details will help our support team resolve your issue more efficiently.

For additional questions about Serverless pricing, please [contact us](https://www.runpod.io/contact).