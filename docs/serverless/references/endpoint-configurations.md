---
title: "Endpoint configurations"
sidebar_position: 1
---

The following are configurable settings within an Endpoint.

## Endpoint Name

Create a name you'd like to use for the Endpoint configuration.
The resulting endpoint will be assigned a random ID to be used when making calls.

The name is only visible to you.

## GPU Selection

Select one or more GPUs you want your Endpoint to run on.

## Active (Min) Workers

Setting this amount to 1 will result in "always on" workers.
This will allow you to have a worker ready to respond to job requests without incurring any cold start delay.

:::note

You will incur the cost of any active workers you have set regardless if they are working on a job.

:::

## Max Workers

This will establish a ceiling or upper limit to the number of active workers your endpoint will have running at any given point.

Default: 3

<details>
<summary>

How to configure Max Workers

</summary>
You can also configure a max worker count. This is the top limit of what RunPod will attempt to auto-scale for you. Use this to cap your concurrent request count and also limit your cost ceiling.

:::note
We currently base your caching coefficient by this number, so an endpoint with higher max worker count will also receive a higher priority when caching workers.

This is partially why we limit new accounts to a relatively low max concurrency at the account level. If you want to get this number raised, you generally will need to have a higher history of spending, or commit to a relatively high spend per month.

You should generally aim to set your max worker count to be 20% higher than you expect your max concurrency to be.

:::

</details>

## GPUs / Worker

The number of GPUs you would like assigned to your worker.

:::note

Currently only available for 48GB GPUs.

:::

## Idle Timeout

The amount of time in seconds a worker not currently processing a job will remain active until it is put back into standby.
During the idle period, your worker is considered running and will incur a charge.

Default: 5 seconds

## FlashBoot

RunPod magic to further reduce the average cold-start time of your endpoint.
FlashBoot works best when an endpoint receives consistent utilization.
There is no additional cost associated with FlashBoot.

## Advanced

Additional controls to help you control where your endpoint is deployed and how it responds to incoming requests.

### Data Centers

Control which datacenters you would like your workers deployed and cached.
By default all datacenters are selected.

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
_Total Workers Formula: Math.ceil((requestsInQueue + requestsInProgress) / <set request count)_
```

### GPU Types

Within the select GPU size category you can further select which GPU models you would like your endpoint workers to run on.
Default: `4090` | `A4000` | `A4500`

<details>
<summary>
What's the difference between GPU models.
</summary>
A100s are about 2-3x faster than A5000s and also allow double the VRAM with very high bandwidth throughout. 3090s and A5000s are 1.5-2x faster than A4000s. Sometimes, it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Depending on the nature of the task, it's also possible that execution speeds may be bottlenecked and not significantly improved simply by using a higher-end card. Do your own calculations and experimentation to determine out what's most cost-effective for your workload and task type.

Want access to different flavors? [Let us know](https://www.runpod.io/contact) and we can look at expanding our offerings!

</details>
