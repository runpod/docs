---
title: "Endpoint configurations"
sidebar_position: 8
description: Configure your endpoint settings to optimize performance and cost, including GPU selection, worker count, idle timeout, and advanced options like data centers, network volumes, and scaling strategies.
---

The following are configurable settings within an endpoint.

## Endpoint Name

Create a name you'd like to use for the endpoint configuration.
The resulting endpoint is assigned a random ID to be used for making calls.

The name is only visible to you.

## GPU Selection

Select one or more GPUs that you want your endpoint to run on. RunPod matches you with GPUs in the order that you select them, so the first GPU type that you select is prioritized, then the second, and so on. Selecting multiple GPU types can help you get a worker more quickly, especially if your first selection is an in-demand GPU.

## Active (Min) Workers

Setting the active workers to 1 or more ensures you have "always on" workers, ready to respond to job requests without cold start delays.

Default: 0

:::note

Active workers incur charges as soon as you enable them (set to >0), but they come with a discount of up to 30% off the regular price.

:::

## Max Workers

Max workers set a limit on the number of workers your endpoint can run simultaneously. If the max workers are set too low, you might experience [throttled workers](/glossary#throttled-worker). To prevent this, consider increasing the max workers to 5 or more if you see frequent throttling.

Default: 3

<details>
<summary>

How to configure Max Workers

</summary>
You can also configure a max worker count. This is the top limit of what RunPod will attempt to auto-scale for you. Use this to cap your concurrent request count and also limit your cost ceiling.

:::note

We currently base your caching coefficient by this number, so an endpoint with higher max worker count will also receive a higher priority when caching workers.

This is partially why we limit new accounts to a relatively low max concurrency at the account level.
If you want to get this number raised, you generally will need to have a higher history of spending, or commit to a relatively high spend per month.

You should generally aim to set your max worker count to be 20% higher than you expect your max concurrency to be.

:::

</details>

## GPUs / Worker

The number of GPUs you would like assigned to your worker.

:::note

Currently only available for 48 GB GPUs.

:::

## Idle Timeout

The amount of time a worker remains running after completing its current request. During this period, the worker stays active, continuously checking the queue for new jobs, and continues to incur charges. If no new requests arrive within this time, the worker will go to sleep.

Default: 5 seconds

## Execution Timeout

The maximum time a job can run before the system terminates the worker. This prevents "bad" jobs from running indefinitely and draining your credit.

You can disable this setting, but we highly recommend keeping it enabled. The default maximum value is 24 hours, but if you need a longer duration, you can use job TTL to override it.

Default: 600 seconds (10 minutes)

## Job TTL (Time-To-Live)

[Job TTL](/serverless/endpoints/send-requests#execution-policies) defines the maximum time a job can remain in the queue before it's automatically terminated. This parameter ensures that jobs don't stay in the queue indefinitely. You should set this if your job runs longer than 24 hours or if you want to remove job data as soon as it is finished.

Minimum value: 10,000 milliseconds (10 seconds)
Default value: 86,400,000 milliseconds (24 hours)

## FlashBoot

FlashBoot is RunPod's magic solution for reducing the average cold-start times on your endpoint. It works probabilistically. When your endpoint has consistent traffic, your workers have a higher chance of benefiting from FlashBoot for faster spin-ups. However, if your endpoint isn't receiving frequent requests, FlashBoot has fewer opportunities to optimize performance. There's no additional cost associated with FlashBoot.

## Advanced

Additional controls to help you control where your endpoint is deployed and how it responds to incoming requests.

### Data Centers

Control which data centers can deploy and cache your workers. Allowing multiple data centers can help you get a worker more quickly.

Default: all data centers

### Select Network Volume

Attach a network storage volume to your deployed workers.

Network volumes will be mounted to `/runpod-volume/`.

:::note

While this is a high performance network drive, do keep in mind that it will have higher latency than a local drive.

This will limit the availability of cards, as your endpoint workers will be locked to the datacenter that houses your network volume.

:::

### Scale Type

- **Queue Delay** scaling strategy adjusts worker numbers based on request wait times. With zero workers initially, the first request adds one worker. Subsequent requests add workers only after waiting in the queue for the defined number of delay seconds.
- **Request Count** scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently.

```text
_Total Workers Formula: Math.ceil((requestsInQueue + requestsInProgress) / <set request count>_
```

### Expose HTTP/TCP ports

We allow direct communication with your worker using its public IP and port. This is especially useful for real-time applications that require minimal latency. Check out this [WebSocket example](https://github.com/runpod-workers/worker-websocket) to see how it works!

### GPU Types

Within the select GPU size category you can further select which GPU models you would like your endpoint workers to run on.
Default: `4090` | `A4000` | `A4500`

<details>
<summary>
What's the difference between GPU models?
</summary>
A100s are about 2-3x faster than A5000s and also allow double the VRAM with very high bandwidth throughout. 3090s and A5000s are 1.5-2x faster than A4000s. Sometimes, it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Depending on the nature of the task, it's also possible that execution speeds may be bottlenecked and not significantly improved simply by using a higher-end card. Do your own calculations and experimentation to determine out what's most cost-effective for your workload and task type.

Want access to different flavors? [Let us know](https://www.runpod.io/contact) and we can look at expanding our offerings!

</details>

## CUDA version selection

You have the ability to select the allowed CUDA versions for your workloads.
The CUDA version selection determines the compatible GPU types that will be used to execute your serverless tasks.

Specifically, the CUDA version selection works as follows:

- You can choose one or more CUDA versions that your workload is compatible with or requires.
- RunPod will then match your workload to available GPU instances that have the selected CUDA versions installed.
- This ensures that your serverless tasks run on GPU hardware that meets the CUDA version requirements.

For example, if you select CUDA 11.6, your serverless tasks will be scheduled to run on GPU instances that have CUDA 11.6 or a compatible version installed. This allows you to target specific CUDA versions based on your workload's dependencies or performance requirements.
