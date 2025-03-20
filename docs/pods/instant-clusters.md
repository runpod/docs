# Instant Clusters

Instant Clusters enable you to connect multiple GPU machines together, providing a unified computing environment for distributed workloads. This feature is accessible directly through the RunPod dashboard UI.

## Creating an Instant Cluster

1. In the RunPod dashboard UI, select **Instant Cluster**.
2. Specify the number of servers you want to include in your cluster.
3. Choose your preferred GPU type for the cluster nodes.
4. Select a template that will be used across all cluster nodes.
5. Review your configuration settings.
6. Click **Deploy Cluster** to create your instant cluster.

## Managing Your Cluster

After deployment, you'll be redirected to the Clusters page where you can:

1. View all your active clusters
2. Select a specific cluster to manage its settings
3. Access the Pods page for the cluster
4. Connect to individual pods within the cluster

## Connecting to Cluster Pods

To connect to pods within your cluster:

1. Navigate to the Pods page for your cluster
2. Select the **Connect** button for your desired pod
3. Choose your connection method based on your template configuration

## Best Practices

- Ensure all nodes in your cluster use the same template for consistency
- Verify network connectivity requirements before deployment
- Monitor resource utilization across all cluster nodes
- Use appropriate security measures when connecting to cluster pods

## Technical Considerations

- All nodes in a cluster must use the same GPU type
- Network connectivity is automatically configured between cluster nodes
- Template settings are replicated across all nodes in the cluster
- Resource allocation is managed at both the cluster and individual pod level