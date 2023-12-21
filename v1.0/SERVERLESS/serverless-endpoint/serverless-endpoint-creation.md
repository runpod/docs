---
title: "Endpoint Creation"
slug: "serverless-endpoint-creation"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Oct 31 2023 17:24:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 31 2023 20:57:39 GMT+0000 (Coordinated Universal Time)"
---

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/0186a32-image.png",
null,
"The Endpoint Creation Dialog"
],
"align": "center",
"sizing": "80% ",
"caption": "The Endpoint Creation Dialog"
}
]
}
[/block]

To convert a serverless template into an endpoint, navigate to [Serverless > Endpoints](https://www.runpod.io/console/serverless/user/endpoints) and press `New Endpoint` to open up the endpoint creation dialog. After you are done configuring your endpoint, press `deploy`.

### Endpoint Name

Any name you would like to use for this endpoint configuration, the resulting endpoint will be assigned a random ID to be used when making calls. This name is only visible to you.

### Select Template

Select a serverless template that you would like to use for this particular endpoint.

### GPU Selection

Select one or more GPUs you want your endpoint to run on.

> #### Priority
>
> When multiple GPU sizes are selected, they will be prioritized based on the chosen order. When an endpoint is created, RunPod will allocate as many works to the first available GPU size selected based on priority. Roughly every 60 minutes, the number of allocated workers is reviewed, and a rebalance will occur to either move more to your first priority or spill over to different sizes until your active and max workers are met.

### Active (Min) Workers

Setting this amount to >1 will result in "always on" workers. This will allow you to have a worker ready to respond to job requests without incurring any cold start delay.

> ❗️ You will incour the cost of any active workers you have set regardless if they are working on a job.

### Max Workers

This will establish a ceiling or upper limit to the number of active workers your endpoint will have running at any given point.

### GPUs / Worker

The number of GPUs you would like assigned to your worker.\
_Note: Currently only available for 48GB GPUs_

### Idle Timeout

The amount of time in seconds a worker not currently processing a job will remain active until it is put back into standby. During the idle period, your worker is considered running and will incur a charge.

### ⚡ FlashBoot

RunPod magic to further reduce the average cold-start time of your endpoint. FlashBoot works best when an endpoint receives consistent utilization. There is no additional cost associated with FlashBoot.

### Advanced

Additional controls to help you control where your endpoint is deployed and how it responds to incoming requests.

> #### Data Centers
>
> Control which datacenters you would like your workers deployed and cached. By default all datacenters are selected.
>
> #### Select Network Volume
>
> Attatch a network storage volume to your deployed workers.
>
> 📘 Network volumes will be mounted to `/runpod-volume/`
>
> #### Scale Type
>
> - **Queue Delay** scaling strategy adjusts worker numbers based on request wait times. With zero workers initially, the first request adds one worker. Subsequent requests add workers only after waiting in the queue for the defined number of delay seconds.
> - **Request Count **scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently. _Total Workers Formula: Math.ceil((requestsInQueue + requestsInProgress) / <set request count>)_
>
> #### GPU Types
>
> Within the select GPU size category you can further select which GPU models you would like your endpoint workers to run on.
