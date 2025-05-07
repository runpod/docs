# RunPod Serverless storage overview

This guide provides a comprehensive overview of how storage works in RunPod's Serverless environment. Understanding your storage options is crucial for optimizing performance, managing costs, and ensuring your workloads run efficiently.

## Storage fundamentals in Serverless

RunPod Serverless uses an architecture where worker containers automatically scale up and down based on demand. This dynamic scaling affects how storage works in your Serverless workloads. When you deploy a Serverless endpoint, you have several storage options to choose from, each with different characteristics and use cases.

## Storage types available in Serverless

RunPod Serverless provides four primary storage options:

### Container disk storage

Container disk storage is temporary workspace that exists only while a worker is running. When the Serverless worker is initialized, it receives a container disk that houses the operating system and provides space for temporary files. This storage is entirely ephemeral and is wiped clean when the worker stops or scales down. The container disk is included in the compute cost and isn't billed separately, making it economical for temporary processing. Container disk storage offers the fastest read/write performance since it's directly attached to the worker.

### Local storage (local)

Local volumes provide persistence that survives worker restarts but remains tied to the specific host machine. This type of storage persists across worker container restarts but is deleted if the worker is removed or relocated to a different host. Volume storage is local to the server hosting your endpoint, so it cannot be accessed by workers running on different physical machines. This option provides a good balance of performance and persistence for workloads that need to maintain state between invocations but don't require sharing data across multiple workers.

### Network storage (network volumes)

Network storage offers persistent storage accessible across multiple workers and even across data centers. When attached to a Serverless endpoint, network storage is mounted at `/runpod-volume`, creating a shared space that all workers can access. This shared nature means only one worker needs to download models or datasets, and then all workers can load them from the shared volume. Network volumes persist independently from any worker's lifecycle, providing true long-term storage. This option is ideal for endpoints needing large shared models or datasets, as it eliminates redundant downloads and optimizes memory usage across your worker fleet.

### S3-compatible storage

S3-compatible storage enables connection to external storage providers using standard S3 protocols. You can supply your own credentials for any S3-compatible storage service, allowing Serverless endpoints to upload or download large files that exceed API payload limits. S3 storage is completely external to RunPod's infrastructure and offers the highest level of persistence. It's particularly useful when dealing with large inputs or outputs that would be impractical to process through standard API calls.

## How storage affects Serverless behavior

### Cold starts and data caching

Serverless workers always cache and load their Docker images locally, even when network storage is attached. The local NVMe cache accelerates cold starts, but large model files that need to be loaded from storage still add to the initialization time. When optimizing for fast cold starts, consider:

- Baking frequently used models into your Docker image
- Using network volumes for large models that would otherwise be downloaded repeatedly
- Pre-warming your Serverless endpoint by sending a test request before peak usage times

### Data isolation vs. sharing

When network storage is not used, each Serverless worker maintains its own isolated local directory and data. This means that even if you have multiple workers running simultaneously, they cannot share data directly. In contrast, with network storage attached, your workers can efficiently share models and datasets. This sharing capability is particularly valuable for large language models or other sizeable AI artifacts where redundant loading would be expensive and time-consuming.

### Data center constraints

If you use network storage with your Serverless endpoint, your deployments become constrained to the data center where the network volume is located. This constraint may impact availability and failover options, as your workloads must run in proximity to your storage. When planning for high availability, consider whether the benefits of shared storage outweigh the potential limitations of data center locality.

## Configuring storage for Serverless endpoints

### Adding a network volume

To attach a network volume to your Serverless endpoint:

1. Navigate to the Serverless section in the RunPod console
2. Click the three dots in the bottom right corner of your endpoint
3. Select "Edit Endpoint"
4. Expand the "Advanced" section
5. Select a volume from the dropdown below "Network Volume"
6. Click "Save Endpoint" to apply the changes

### Configuring S3 storage

To use S3-compatible storage with your endpoint, include the S3 configuration in your request payload:

```json
{
  "input": {
    "prompt": "Your input here"
  },
  "s3Config": {
    "accessId": "your-access-id",
    "accessSecret": "your-access-secret",
    "bucketName": "your-bucket-name",
    "endpointUrl": "your-s3-endpoint-url"
  }
}
```

Your worker must include logic to use this configuration for storage operations. The S3 configuration is passed directly to your worker but is not included in the response.

## Cost considerations

Serverless storage is charged according to the storage type:

- Container disk is only billed while the worker is running (included in compute cost)
- Network volumes are billed monthly at $0.07/GB/month (under 1TB) or $0.05/GB/month (over 1TB)
- S3 billing depends on your external provider's pricing model

When optimizing costs, consider:

- Using container disk for temporary files to avoid additional storage charges
- Sharing larger datasets across workers via network volumes rather than downloading them repeatedly
- Cleaning up unused network volumes to prevent ongoing charges
- Using S3 lifecycle policies to automatically manage data retention and deletion

## Best practices for Serverless storage

For optimal performance and cost efficiency in Serverless environments:

### For fastest cold starts

Bake your model into your Docker image or use NVMe-accelerated storage when possible. This approach minimizes initialization time by avoiding network downloads during startup. While this increases your image size, it significantly improves cold start performance.

### For large shared files

Use network or S3-compatible storage for large datasets or models. This prevents redundant downloads across workers and reduces memory pressure. Network volumes are particularly effective when multiple workers need access to the same large files.

### For handling large payloads

When dealing with inputs or outputs that exceed API size limits, configure your endpoint to use either network volumes or S3 storage. This allows your workers to process files of virtually any size without being constrained by API payload limitations.

### For optimizing storage configuration

Regularly review your endpoint's storage choices to balance startup time, costs, and availability. Consider using different storage strategies for development versus production environments, optimizing for speed during development and cost-efficiency in production.

## Real-world storage scenarios

### Scenario 1: Large language model deployment

When deploying a large language model (LLM) through Serverless, use a network volume to store the model weights. This allows multiple worker instances to load the model from the same storage location, eliminating redundant downloads and reducing cold start times after the initial load.

### Scenario 2: Batch image processing

For a batch image processing endpoint that handles large volumes of images, configure S3 storage integration. Your endpoint can receive small request payloads containing S3 paths, process the images directly from S3, and write results back to S3 without transferring large files through the API.

### Scenario 3: Stateful processing

If your endpoint needs to maintain state between invocations (such as a fine-tuning service), use volume storage to persist training checkpoints and model improvements. This ensures progress is maintained even if individual workers are scaled down or restarted.

## Storage security and data protection

All storage options in RunPod Serverless maintain strong isolation between customers, ensuring your data remains private and secure. Network volumes and local storage are accessible only to your account. For additional security with external S3 storage, use time-limited credentials and restrict bucket permissions to the minimum necessary for your workload.

## Next steps

- [Manage Serverless endpoints](https://docs.runpod.io/docs/manage-endpoints)
- [Create a network volume](https://docs.runpod.io/docs/create-a-network-volume)
- [Send requests to an endpoint](https://docs.runpod.io/docs/send-requests)
