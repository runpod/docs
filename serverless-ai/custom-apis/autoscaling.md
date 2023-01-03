---
description: >-
  The Serverless AI platform enables seamless scale for your models. The
  following properties can be defined for your service.
---

# Autoscaling

New APIs can be created from the [API management page](https://www.runpod.io/console/serverless/user/apis).

**API Name**\
****Anything you prefer.

**Template**\
Select from your templates. The template controls what worker is used to run your API jobs.

**Min Workers**

This is the minimum amount of workers that we will try to keep warm for you. A minimum worker count of 0 means that if your API doesn't receive responses for a while, then you will have no active workers running. This will help you save on your costs, but may mean that the first cold start will take a bit longer than average. Use your discretion to pick something that suits your scale and budget.

**Max Workers**

You can also configure a max worker count. This is the top limit of what RunPod will attempt to autoscale for you. Use this cap your concurrent request count and also limit your cost ceiling.

**Idle Timeout** (seconds)\
Idle timeout to wait before a worker is scaled down. If you specify 5 seconds, workers will sit idle for at least 5 seconds before it's stopped to help reduce cost.

**GPU Type**\
****You can currently choose between two varieties of configurations: 16 GB or 24 GB VRAM.\
For the 16 GB variety, we deploy NVIDIA RTX A4000.\
For the 24GB variety, we deploy NVIDIA RTX A5000 or 3090.&#x20;

3090s and A5000s are 1.5 - 2x faster than A4000s. Sometimes it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Do your own calculations to figure out what's more cost effective for your workload.

Want access to different flavors? Let us know and we can look at expanding our offerings!
