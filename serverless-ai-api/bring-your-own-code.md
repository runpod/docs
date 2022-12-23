---
description: Bring your own container image, we scale and handle the rest.
---

# Bring Your Own Code

### _Note: We will be releasing billing updates to our serverless offerings in the near future. For now, you are just billed for your normal pod usage on a per-minute basis._

## Create your worker image

It's easy to create a container image using our [python sdk](https://github.com/runpod/runpod-python). For a simple hello world example, you can check out [this repository](https://github.com/runpod/serverless-workers/tree/main/helloworld).

As you can see, all you need to do is define your runtime environment and add a simple handler file to serve your API requests.

Push your image to your favorite container image repository when you're done.

If you want to try it out with our hello world example, you can skip this step.

## Create a template

Go to your serverless dashboard and create a new template.

The template helps defines the config to deploy workers. The following properties can be defined per template.

**Template Name**\
****Name your template anything you want to help your organize your templates.

**Container Image**\
****Location to the container image, could be from docker-hub or any other repository. You can use&#x20;

`runpod/serverless-hello-world`&#x20;

here if you didn't build your own worker.

**Container Registry Credentials**\
****Link container credentials for private repositories. These can be configured in your user settings menu.

**Docker Command**\
****Command to run on container startup; by default command defined in docker-file will be used.

**Container Disk**\
****Amount of disk required to run your worker. This will depend on how big your model and other files are in the container.

**Environment Variables**\
****Use these to pass config, or secrets to your container.

## Configure your API

The Serverless AI platform enables seamless scale for your models. The following properties can be defined for your service.

**API Name**\
****Anything you prefer.

**Template**\
Select the template you created before or create one if you have not already.

**Min / Max Workers**\
****Minimum and maximum workers needed to handle your throughput. These can be used to control cost and also help you manage # of requests that can be processed in parallel.\
Minimum workers help reduce cold start times.

**Idle Timeout** (seconds)\
Idle timeout to wait before a worker is scaled down. If you specify 5 seconds, workers will sit idle for at least 5 seconds before it's stopped to help reduce cost.

**GPU Type**\
****You can choose 16 GB or 24 GB VRAM for the GPU type.\
For 16 GB, we deploy NVIDIA RTX A4000.\
For 24GB, we deploy NVIDIA RTX A5000 or 3090.&#x20;

These are 1.5 - 2x faster than A4000. Sometimes it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Do your own calculations to figure out what's more cost effective for your workload.

## Query your API

Once everything above is configured, you will be able to invoke your API using the "run" endpoint on your API dashboard. Our services are currently asynchronous, so you must use the "status" endpoint to get the status/results of each run using the id present in the run response payload.
