---
title: "Manage endpoints"
description: "Learn to create, edit, and manage Serverless endpoints, including adding network volumes and setting GPU prioritization, with step-by-step guides and tutorials."
sidebar_position: 2
---

Learn to manage Serverless endpoints.

## Create an endpoint

You can create an endpoint in the web interface.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint** and enter the following:
   1. Endpoint name.
   2. Select your GPUs.
   3. Configure your workers.
   4. Add a container image.
   5. Select **Deploy**.

## Delete an endpoint

You can delete an endpoint in the web interface.
Before an endpoint can be deleted, all workers must be removed.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the endpoint you'd like to remove.
3. Select **Edit Endpoint** and set **Max Workers** to `0`.
4. Choose **Update** and then **Delete Endpoint**.

## Edit an endpoint

You can edit a running endpoint in the web interface after you've deployed it.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the endpoint you'd like to edit.
3. Select **Edit Endpoint** and make your changes.
4. Choose **Update**.

## Set GPU prioritization for an endpoint

When creating or modifying a worker endpoint, specify your GPU preferences in descending order of priority.
This allows you to configure the desired GPU models for your worker endpoints.

RunPod attempts to allocate your first choice if it's available.
If your preferred GPU isn't available, the system automatically defaults to the next available GPU in your priority list.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the endpoint you'd like to update.
3. Select the priority of the GPUs you'd like to use.
4. Choose **Update**.

:::note

You can force a configuration update by setting **Max Workers** to 0, selecting **Update**, then updating your max workers back to your needed value.

:::

## Add a network volume

Network volumes are a way to share data between workers: they are mounted to the same path on each worker.
For example, if a worker contains a large-language model, you can use a network volume to share the model across all workers.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the endpoint you'd like to edit.
3. Select **Edit Endpoint** and make your changes.
4. Under **Advanced** choose **Select Network Volume**.
5. Select the storage device and then choose **Update** to continue.
