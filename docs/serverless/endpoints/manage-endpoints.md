---
title: "Manage endpoints"
description: "Learn how to create, configure, and manage your RunPod Serverless endpoints, including GPU prioritization and network volumes for optimal performance and cost efficiency."
sidebar_position: 2
---

# Manage Serverless endpoints

This guide covers the essential management operations for RunPod Serverless endpoints, helping you deploy, configure, and maintain your Serverless applications effectively.

## Create an endpoint

Create a new Serverless endpoint through the RunPod web interface:

1. Navigate to the [Serverless section](https://www.runpod.io/console/serverless) of the RunPod console.
2. Click **New Endpoint**.
3. Select a source for your endpoint, such as a [Docker image](/serverless/workers/deploy), [GitHub repo](/serverless/workers/github-integration), or a preset model. Click **Next**.
4. Follow the UI steps to select a Docker image, GitHub repo, or Hugging Face model. Click **Next**.
5. Configure your endpoint, setting the **Endpoint Name**, the number of **Max Workers**, **Environment Variables**, etc. For a full list of options, see [Endpoint configurations](/serverless/endpoints/endpoint-configurations)
6. Click **Create Endpoint** to deploy.

:::tip

You can optimize cost and availability by specifying GPU preferences in order of priority. RunPod attempts to allocate your first choice GPU. If unavailable, it automatically uses the next GPU in your priority list, ensuring your workloads run on the best available resources.

You can enable or disable particular GPU types using the **Advanced > Enabled GPU Types** section.

:::

After deployment, your endpoint takes time to initialize before it is ready to process requests. You can monitor the deployment status on the endpoint details page, which shows worker status and initialization progress. Once active, your endpoint displays a unique API URL (`https://api.runpod.ai/v2/{endpoint_id}/`) that you can use to send requests. For information on how to interact with your endpoint, see [Endpoint operations](/serverless/endpoints/operations).

## Edit an endpoint

You can modify your endpoint's configuration at any time:

1. Navigate to the [Serverless section](https://www.runpod.io/console/serverless) in the RunPod console.
2. Click the three dots in the bottom right corner of the endpoint you want to modify.
3. Click **Edit Endpoint**.
4. Update any [configuration parameters](/serverless/endpoints/endpoint-configurations) as needed:
   - Endpoint name
   - Worker configuration
   - Docker configuration (container image or version)
   - Environment variables
   - Storage
5. Click **Save Endpoint** to apply your changes.

Changes take effect over time as each worker is updated to the new configuration.

:::tip

To force an immediate configuration update, temporarily set **Max Workers** to 0, trigger the **Release**, then restore your desired worker count and update again.

:::

## Add a network volume

Attach persistent storage to share data across workers:

1. Navigate to the [Serverless section](https://www.runpod.io/console/serverless) in the RunPod console.
2. Click the three dots in the bottom right corner of the endpoint you want to modify.
3. Click **Edit Endpoint**.
4. Expand the **Advanced** section.
5. Select a volume from the dropdown below **Network Volume**.
7. Click **Save Endpoint** to attach the volume to your endpoint.

Network volumes are mounted to the same path on each worker, making them ideal for sharing large models, datasets, or any data that needs to persist across worker instances.

## Delete an endpoint

When you no longer need an endpoint, you can remove it from your account:

1. Navigate to the [Serverless section](https://www.runpod.io/console/serverless) in the RunPod console.
2. Click the three dots in the bottom right corner of the endpoint you want to delete.
3. Click **Delete Endpoint**.
4. Type the name of the endpoint, then click **Confirm**.

After confirmation, the endpoint will be removed from your account, and you'll no longer be charged for its resources.

## Best practices for endpoint management

- **Start small and scale**: Begin with fewer workers and scale up as demand increases.
- **Monitor usage**: Regularly check your endpoint metrics to optimize worker count and GPU allocation.
- **Use GPU prioritization**: Set up fallback GPU options to balance cost and availability.
- **Leverage network volumes** for large models or datasets rather than embedding them in your container image.
- **Set appropriate timeouts** based on your workload's processing requirements.

## Next steps

- [Learn how to send requests to your endpoints.](/serverless/endpoints/send-requests)
- [Explore advanced endpoint operations.](/serverless/endpoints/operations)
- [Optimize your endpoints for cost and performance.](/serverless/endpoints/endpoint-configurations)
- [Learn about endpoint job states and metrics.](/serverless/endpoints/job-states)
