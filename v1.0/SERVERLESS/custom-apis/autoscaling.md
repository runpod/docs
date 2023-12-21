---
title: "Autoscaling and Worker Lifecycle"
slug: "autoscaling"
excerpt: "The Serverless AI platform enables seamless scale for your models. The following properties can be defined for your service."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Mar 28 2023 23:44:01 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Jun 27 2023 01:42:19 GMT+0000 (Coordinated Universal Time)"
---

New APIs can be created from the [API management page](https://www.runpod.io/console/serverless/user/apis).

![](https://files.readme.io/6b32f2b-sls-new-config.png)

### API Name

Anything you prefer.

### Network Volume

You can attach a network volume to your serverless endpoint. It will get automatically mounted at the "/runpod-volume" path. This can allow you to persist state between worker invocations and also share state between your workers. While this is a high performance network drive, do keep in mind that it will have higher latency than a local drive. **Please note that this will limit the availability of cards, as your endpoint workers will be locked to the datacenter that houses your network volume!**

### Template

Select from your templates. The template controls what worker is used to run your API jobs. Please note that you should be updating the container image name in your template with a different name:tag combination if you want your workers to update the version of the container image you are using. **If you use the same name:tag combination, workers will not automatically pull updates for you as we currently do not do hash based comparisons.**

### Min Workers

This is the minimum amount of workers that we will try to keep running for you. A minimum worker count of 0 means that if your API doesn't receive requests for a while, then you will have no active workers running. This will help you save on your costs, but may mean that the first cold start will take a bit longer than average. Use your discretion to pick something that suits your scale and budget.

### Max Workers

You can also configure a max worker count. This is the top limit of what RunPod will attempt to auto-scale for you. Use this to cap your concurrent request count and also limit your cost ceiling. Note that we currently base your caching coefficient by this number, so an endpoint with higher max worker count will also receive a higher priority when caching workers. This is partially why we limit new accounts to a relatively low max concurrency at the account level. If you want to get this number raised, you generally will need to have a higher history of spending, or commit to a relatively high spend per month. You should generally aim to set your max worker count to be 20% higher than you expect your max concurrency to be.

### Idle Timeout (seconds)

Idle timeout to wait before a worker is scaled down. If you specify 5 seconds, workers will sit idle for at least 5 seconds before it's stopped to help reduce cost.

### GPU Type

You can currently choose between three varieties of configurations: 16 GB, 24 GB, or 80 GB VRAM.\
For the 16 GB variety, we deploy NVIDIA RTX A4000.\
For the 24 GB variety, we deploy NVIDIA RTX A5000 or 3090.\
For the 80 GB variety, we deploy NVIDIA A100 80 GB.

A100s are about 2-3x faster than A5000s and also allow double the VRAM with very high bandwidth throughout. 3090s and A5000s are 1.5-2x faster than A4000s. Sometimes, it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Depending on the nature of the task, it's also possible that execution speeds may be bottlenecked and not significantly improved simply by using a higher-end card. Do your own calculations and experimentation to determine out what's most cost-effective for your workload and task type.

Want access to different flavors? [Let us know](https://www.runpod.io/contact) and we can look at expanding our offerings!
