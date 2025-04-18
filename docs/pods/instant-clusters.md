---
title: "Instant Clusters"
description: "Learn how to deploy and manage multiple GPU machines together using RunPod's Instant Cluster feature."
id: instant-clusters
sidebar_position: 7
---

Instant Clusters is a feature that enables you to quickly deploy and manage multiple GPU machines as a unified cluster. This feature simplifies the process of setting up distributed computing environments for tasks that require multiple GPUs working together.

## Overview

With Instant Clusters, you can:
- Deploy multiple GPU machines simultaneously
- Manage them as a single unit
- Connect to individual pods within the cluster
- Scale your computing resources efficiently

## Creating an Instant Cluster

1. From the RunPod dashboard, select **Instant Cluster**.

2. Configure your cluster:
   - Specify the number of servers you want in your cluster
   - Choose your GPU type
   - Select a template for your pods
   - Review and verify your settings

3. Click **Deploy Cluster** to create your cluster.

## Managing Your Cluster

After deployment, you'll be redirected to the Clusters page. From here, you can:

1. Select your cluster to view details
2. Access the Pods page showing all pods in your cluster
3. Connect to individual pods as needed
4. Monitor the status and performance of your cluster

## Connecting to Cluster Pods

To connect to pods within your cluster:

1. Navigate to the Pods page for your cluster
2. Select the **Connect** button for the desired pod
3. Choose your connection method based on your template type:
   - SSH terminal
   - Web terminal
   - Jupyter notebook
   - Other template-specific connections

## Best Practices

- Choose consistent templates across your cluster for better compatibility
- Monitor resource usage across all pods
- Use [Global Networking](networking.md) to enable secure communication between your cluster pods
- Consider using network volumes for shared storage across your cluster

## Limitations and Considerations

- All pods in a cluster must use the same template
- Resource availability may affect cluster deployment
- Pricing is based on the cumulative resources of all pods in the cluster

## Related Resources

- [Global Networking](networking.md)
- [Storage Options](storage/_volume.md)
- [Pod Management](manage-pods.md)

For additional support or questions about Instant Clusters, please [contact our support team](https://contact.runpod.io/hc/en-us/requests/new).