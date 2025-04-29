---
title: Overview
sidebar_position: 1
description: "Migrate your Cog model from Replicate.com to RunPod by following this step-by-step guide, covering setup, model identification, Docker image building, and serverless endpoint creation."
---

To get started with RunPod:

- [Create a RunPod account](/get-started/manage-accounts)
- [Add funds](/get-started/billing-information)
- [Use the RunPod SDK](/serverless/overview) to build and connect with your Serverless Endpoints

In this tutorial, you'll go through the process of migrating a model deployed via replicate.com or utilizing the Cog framework to a RunPod serverless worker.

This guide assumes you are operating within a Linux terminal environment and have Docker installed on your system.

:::note

This method might occur a delay when working with RunPod Serverless Endpoints.
This delay is due to the FastAPI server that is used to run the Cog model.

To eliminate this delay, consider using [RunPod Handler](/serverless/handlers/overview) functions in a future iteration.

:::

By following this streamlined process, you'll be able to simplify the migration and deployment of your Cog image.

### Prerequisites

- Docker installed on your system
- Familiarity with the Cog framework
- Existing model on Replicate.com
- RunPod account

## Clone and navigate the cog-worker repository

Before we begin, let's set up the necessary environment.
You will need to clone the `cog-worker` repository, which contains essential scripts and configuration files required for the migration process.
To do this, run the following commands in your terminal:

```bash
git clone https://github.com/runpod-workers/cog-worker.git
cd cog-worker/
```

The cog-worker repository contains essential scripts and configuration files required for the migration.

Now that the repository is cloned and you've navigated to the correct directory, you're ready to proceed with the next step.

## Identify model information

In this step, you will need to gather the necessary information about your Cog model that is currently hosted on Replicate.com.
You will require your username, model name, and version.

Identify the username, model name, and version you wish to use from Replicate.
For example, if you are using [this model](https://replicate.com/lucataco/hotshot-xl/versions):

- your username is `lucataco`
- your model name is `hotshot-xl`
- your model version is `78b3a6257e16e4b241245d65c8b2b81ea2e1ff7ed4c55306b511509ddbfd327a`

Once you have collected the required information, you can move on to the next step, where you will build and push your Docker image.

## Build and push docker image

Now that you have identified the necessary information about your model, you can proceed to build and push your Docker image. This is a crucial step, as it prepares your model for deployment on the RunPod platform.

Build the Docker image by providing the necessary arguments for your model.
Once your Docker image is built, push it to a container repository such as DockerHub:

```bash
# replace user, model_name, and model_version with the appropriate values
docker build -platform=linux/amd64 --tag <username>/<repo>:<tag> --build-arg COG_REPO=user --build-arg COG_MODEL=model_name --build-arg COG_VERSION=model_version .
docker push <username>/<repo>:<tag>
```

The `--tag` option allows you to specify a name and tag for your image, while the `--build-arg` options provide the necessary information for building the image.

With your Docker image built and pushed, you're one step closer to deploying your Cog model on RunPod.

## Create and Deploy a Serverless Endpoint

Now that your Docker image is ready, it's time to create and deploy a serverless endpoint on RunPod.
This step will enable you to send requests to your new endpoint and use your Cog model in a serverless environment.

To create and deploy a serverless endpoint on RunPod:

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select a GPU.
   3. Configure the number of Workers.
   4. (optional) Select **FlashBoot**.
   5. (optional) Select a template.
   6. Enter the name of your Docker image.
      - For example `<username>/<repo>:<tag>`.
   7. Specify enough memory for your Docker image.
4. Select **Deploy**.

Now, let's send a request to your [Endpoint](/serverless/endpoints/get-started).

Once your endpoint is set up and deployed, you'll be able to start receiving requests and utilize your Cog model in a serverless context.

## Conclusion

Congratulations, you have successfully migrated your Cog model from Replicate to RunPod and set up a serverless endpoint.
As you continue to develop your models and applications, consider exploring additional features and capabilities offered by RunPod to further enhance your projects.

Here are some resources to help you continue your journey:

- [Learn more about RunPod serverless workers](/serverless/overview)
- [Explore additional RunPod tutorials and examples](/tutorials/introduction/overview)
