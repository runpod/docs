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

This is the minimum amount of workers that we will try to keep running for you. A minimum worker count of 0 means that if your API doesn't receive requests for a while, then you will have no active workers running. This will help you save on your costs, but may mean that the first cold start will take a bit longer than average. Use your discretion to pick something that suits your scale and budget.

**Max Workers**

You can also configure a max worker count. This is the top limit of what RunPod will attempt to autoscale for you. Use this to cap your concurrent request count and also limit your cost ceiling.

**Idle Timeout** (seconds)\
Idle timeout to wait before a worker is scaled down. If you specify 5 seconds, workers will sit idle for at least 5 seconds before it's stopped to help reduce cost.

**GPU Type**\
****You can currently choose between three varieties of configurations: 16 GB, 24 GB, or 80 GB VRAM.\
For the 16 GB variety, we deploy NVIDIA RTX A4000.\
For the 24 GB variety, we deploy NVIDIA RTX A5000 or 3090. \
For the 80 GB variety, we deploy NVIDIA A100 80 GB.&#x20;

A100s are about 1.5 - 2x faster than A5000s and also allow double the VRAM with very high bandwidth throughout. 3090s and A5000s are 1.5 - 2x faster than A4000s. Sometimes it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Do your own calculations to figure out what's more cost effective for your workload.

Want access to different flavors? Let us know and we can look at expanding our offerings!
