---
title: "Manage Endpoints"
description: "Learn to create, edit, and manage Serverless Endpoints, including adding network volumes and setting GPU prioritization, with step-by-step guides and tutorials."
sidebar_position: 10
---

Learn to manage Severless Endpoints.

## Create an Endpoint

You can create an Endpoint in the Web interface.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint** and enter the following:
   1. Endpoint Name.
   2. Select your GPUs.
   3. Configure your workers.
   4. Add a container image.
   5. Select **Deploy**.

## Delete an Endpoint

You can delete an Endpoint in the Web interface.
Before an Endpoint can be deleted, all workers must be removed.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the Endpoint you'd like to remove.
3. Select **Edit Endpoint** and set **Max Workers** to `0`.
4. Choose **Update** and then **Delete Endpoint**.

## Edit an Endpoint

You can edit a running Endpoint in the Web interface after you've deployed it.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the Endpoint you'd like to edit.
3. Select **Edit Endpoint** and make your changes.
4. Choose **Update**.

## Set GPU prioritization an Endpoint

When creating or modifying a Worker Endpoint, specify your GPU preferences in descending order of priority.
This allows you to configure the desired GPU models for your Worker Endpoints.

RunPod attempts to allocate your first choice if it's available.
If your preferred GPU isn't available, the system automatically defaults to the next available GPU in your priority list.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the Endpoint you'd like to update.
3. Select the priority of the GPUs you'd like to use.
4. Choose **Update**.

:::note

You can force a configuration update by setting **Max Workers** to 0, selecting **Update**, then updating your max workers back to your needed value.

:::

## Add a Network Volume

Network volumes are a way to share data between Workers: they are mounted to the same path on each Worker.
For example, if a Worker contains a large-language model, you can use a network volume to share the model across all Workers.

1. Navigate to [Serverless Endpoints](https://www.runpod.io/console/serverless).
2. Select the Endpoint you'd like to edit.
3. Select **Edit Endpoint** and make your changes.
4. Under **Advanced** choose **Select Network Volume**.
5. Select the storage device and then choose **Update** to continue.
