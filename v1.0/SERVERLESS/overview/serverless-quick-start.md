---
title: "Quick Start"
slug: "serverless-quick-start"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Oct 31 2023 16:28:07 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 31 2023 23:02:04 GMT+0000 (Coordinated Universal Time)"
---

Let's dive right in! This quick start guide assumes the following:

- You have some experience using a terminal
- Have git installed and can clone GitHub repos
- Have Docker installed and can build Docker images
- Have a RunPod account and Docker Hub (or other container registry) account

To deploy our template work:

1. Clone the [worker-template](https://github.com/runpod-workers/worker-template) locally to your PC.
2. Navigate into the root of the cloned repo and run `docker build --tag <username>/<repo>:<tag> .` once it has completed building, push it to your container registry.
3. Deploy a serverless endpoint on RunPod by following The Endpoint guide.
4. Send a test request by following the Job Requests guide.

Now that you have successfully launched an endpoint using our template, you can start customizing the handler for your use case.
