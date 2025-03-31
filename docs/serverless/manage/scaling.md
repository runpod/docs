---
title: Configure autoscaling
description: "Learn how to optimize the performance and cost of your RunPod serverless endpoints through effective autoscaling configuration. Find strategies for different workload patterns."
sidebar_position: 1
---

# Configure autoscaling

RunPod's serverless platform provides powerful autoscaling capabilities that allow your endpoints to dynamically adjust to changing workloads. This guide will help you configure autoscaling for optimal performance and cost efficiency.

## How autoscaling works

RunPod Serverless uses a queue-based system to manage requests and automatically scale workers:

1. **Requests enter the queue**: When requests are sent to your endpoint, they enter a queue
2. **Workers process the queue**: Available workers pull jobs from the queue
3. **Automatic scaling**: When the queue builds up, RunPod spawns more workers (up to your max)
4. **Scale down**: When workers are idle for the specified timeout period, they are shut down

## Key autoscaling parameters

| Parameter | Description | Default | Recommendation |
|-----------|-------------|---------|---------------|
| **Min Workers** | Minimum number of workers to keep running | 0 | Set to 1+ for low latency |
| **Max Workers** | Maximum number of workers to scale to | 1 | Set based on peak demand |
| **Idle Timeout** | How long to keep inactive workers (seconds) | 30 | 60-300 for balance |
| **Flash Boot** | Pre-warm workers for faster startup | Off | Enable for latency-sensitive apps |

## Configuring autoscaling

1. **Navigate to your endpoint** in the RunPod console
2. Click **Edit** next to your endpoint
3. Adjust the following settings:

### Min Workers

Set the minimum number of workers to keep running at all times:

- **0 workers**: Scale to zero when idle (lowest cost, highest cold start latency)
- **1+ workers**: Always keep some workers running (higher cost, instant responses)

### Max Workers

Set the maximum number of workers that can run concurrently:

- Set this based on your expected peak demand
- Consider your budget and quota limits
- Higher values allow for better handling of traffic spikes

### Idle Timeout

Configure how long (in seconds) to keep inactive workers running:

- **Low values (30-60s)**: More aggressive scale down, lower costs
- **High values (5-30min)**: More stable availability, lower cold starts, higher costs

## Choosing the right configuration

### For low cost, occasional use

```
Min Workers: 0
Max Workers: 1-3
Idle Timeout: 30-60 seconds
```

Best for: Personal projects, testing, infrequent usage

### For balanced performance and cost

```
Min Workers: 1
Max Workers: 5-10
Idle Timeout: 2-5 minutes
```

Best for: Production applications with moderate, variable traffic

### For high-performance applications

```
Min Workers: 2+
Max Workers: 20+
Idle Timeout: 5-10 minutes
Flash Boot: Enabled
```

Best for: Production applications with high traffic or strict latency requirements

## Monitoring autoscaling performance

1. Navigate to your endpoint in the RunPod console
2. Click the **Metrics** tab to view:
   - Active workers over time
   - Queue depth
   - Request latency
   - Worker utilization

Use these metrics to fine-tune your autoscaling configuration.

## Advanced strategies

### For batch processing

If you're running batch jobs where throughput is more important than latency:

- Set a higher **Max Workers** to process more jobs in parallel
- Consider a lower **Idle Timeout** to reduce costs between batches
- Use the [RunPod Sync API](/docs/serverless/reference/api) for coordinating batch jobs

### For consistent low latency

If your application requires consistently low latency:

- Set **Min Workers** to at least 1 to avoid cold starts
- Enable **Flash Boot** to pre-warm additional workers
- Consider using [Multiple GPU types](/docs/serverless/reference/configurations) for cost optimization

## Common pitfalls

- **Setting Max Workers too low**: Can cause queue buildup during traffic spikes
- **Setting Min Workers too high**: Increases costs unnecessarily during low-traffic periods
- **Setting Idle Timeout too low**: Can cause thrashing (constant scaling up and down)
- **Not accounting for initialization time**: Some models take time to load, adjust accordingly

## Next steps

- [Monitor performance](/docs/serverless/manage/monitoring) - Track your endpoint's metrics
- [Optimize resources](/docs/serverless/manage/optimize) - Further tune for cost and performance
- [Manage jobs](/docs/serverless/manage/jobs) - Learn how to manage individual job requests 