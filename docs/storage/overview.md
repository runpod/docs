---
title: "Overview"
description: "Create a network volume in Secure Cloud to access high-performance storage and flexibility for multiple pods, with options for data center selection, naming, and size allocation, and enjoy cost-effective storage solutions with robust infrastructure and NVME SSDs."
sidebar_position: 9
---

# RunPod storage overview

This guide explains the different types of storage available in RunPod, their characteristics, and when to use each option. Understanding storage options is essential for optimizing your workloads and managing costs effectively.

## Understanding storage types

RunPod offers three primary storage types, each with unique characteristics designed for different use cases:

### Container volume storage

Container volume storage is temporary storage that exists only while your container is running.

**Key characteristics:**
Container volume storage is volatile and will be completely lost if the Pod is halted or rebooted. It's created automatically when a Pod or Serverless worker launches and remains tightly coupled with the container's lifecycle throughout its existence. This type of storage provides fast read and write speeds since it's locally attached to the container. The cost of container volume storage is included in the Pod's running cost and is not billed separately, making it an economical choice for temporary data.

**Best for:** Temporary files, processing data, or anything that doesn't need to persist beyond the current session.

### Disk volume storage

Disk volume storage is persistent storage that remains available throughout a Pod's lease period, even if the Pod is restarted.

**Key characteristics:**
Disk volume storage persists across Pod restarts or reboots, maintaining your data even when the container is not running. However, this data is lost if the Pod is terminated (deleted), so it's not truly permanent storage. Disk volumes are local to the physical machine hosting your Pod and cannot be accessed from other Pods or locations. This storage option is billed at $0.10/GB/month for running Pods and at a higher rate of $0.20/GB/month for stopped Pods, reflecting the cost of reserving physical storage space even when the Pod isn't active.

**Best for:** Data that needs to survive Pod restarts but doesn't need to be shared across different Pods.

### Network volume storage

Network volume storage is persistent storage that can be attached to different Pods and even shared between multiple Pods.

**Key characteristics:**
Network volume storage persists independently of any Pod's lifecycle, making it truly permanent until you explicitly delete it. These volumes can be attached to multiple Pods simultaneously, allowing for efficient data sharing and collaboration. Network volumes are shareable across any Pods located in the same data center, providing flexibility in your workflow. All network storage is backed by high-speed NVME SSDs and connected via a high-speed network ranging from 25Gbps to 200Gbps, ensuring excellent performance even when accessed by multiple Pods. This storage type is billed at $0.07/GB/month for volumes under 1TB or at a discounted rate of $0.05/GB/month for larger volumes over 1TB. Storage up to 4TB is available through self-service, and even larger allocations can be arranged on request.

**Best for:** Sharing datasets between Pods, storing models that need to be accessed by multiple Pods, or preserving data that needs to outlive any individual Pod.

## Storage comparison table

| Feature | Container Volume | Disk Volume | Network Volume |
|---------|-----------------|-------------|----------------|
| **Persistence** | Temporary (lost on restart) | Pod-lifetime (survives restarts) | Permanent (independent of Pods) |
| **Sharing** | Not shareable | Not shareable | Can be attached to multiple Pods |
| **Speed** | Fastest (local) | Fast (local) | Fast (networked NVME) |
| **Cost** | Included in Pod cost | $0.10-0.20/GB/month | $0.05-0.07/GB/month |
| **Size limits** | Varies by Pod | Varies by Pod | Up to 4TB self-service |
| **Use case** | Temporary processing | Single Pod persistence | Multi-Pod sharing, true persistence |

## Storage in serverless vs. pods

While the fundamental storage types are similar, there are important differences in how storage works in Serverless environments compared to Pods.

### Serverless storage options

1. **Container disk:** Temporary storage included when a worker is running, wiped when the worker stops.

2. **Volume storage (local):** Persistent storage on the host machine that survives container restarts but is deleted if the worker is removed.

3. **Network storage:** Persistent storage accessible across workers and data centers. When attached, it's mounted at `/runpod-volume`.

4. **S3-compatible storage:** You can supply your own credentials for S3-compatible storage. Useful for handling large files that exceed API payload limits.

### Serverless storage behavior

If network storage is not used, each worker has its own local directory and maintains its own data. With network storage, you can share models and data among workers, but workers must be in the same data center as the storage. Serverless workers always cache and load their Docker images locally, even if network storage is attached. For large inputs/outputs (above API limits), storing files in network or S3 storage is recommended.

### Pod storage behavior

The container volume houses the operating system and provides temporary workspace for your activities. The disk volume functions like a hard disk, allowing you to store data that persists across Pod restarts. Network storage can be moved between machines and shared across multiple Pods, providing the most flexibility.

## Best practices for storage

### When to use container volumes

Container volumes are ideal for temporary processing data that doesn't need to be saved long-term. They're the best choice when speed is critical since they provide the fastest I/O performance. Since container volumes don't persist, they're perfect for data that doesn't need to survive a restart, and they help minimize storage costs since they're included in your compute charges.

### When to use disk volumes

Disk volumes are the right choice when your data needs to survive Pod restarts but doesn't need to be shared. They're excellent for Pod-specific configurations and settings that you want to maintain between sessions. Disk volumes meet moderate persistence requirements where data needs to be maintained for the lifetime of the Pod but not beyond. They're most cost-effective when sharing between Pods isn't a requirement for your workflow.

### When to use network volumes

Network volumes show their value when you need to share datasets between multiple Pods working on the same project. They're the optimal solution for storing large models that multiple Pods need to access simultaneously. Network volumes are essential when data needs to outlive any specific Pod, ensuring true data permanence. They're also ideal for moving data between CPU and GPU Pods in complex workflows, and when you need true long-term persistence independent of any specific compute resource.

### Cost optimization tips

Use container volumes for temporary data to avoid additional storage charges beyond your compute costs. Implement network volumes when multiple Pods need access to the same data, as this is more cost-effective than duplicating data across multiple disk volumes. Remember to delete unused network volumes to avoid ongoing charges for storage you're not using. For stopped Pods with disk volumes, consider backing up important data and terminating the Pod to avoid the higher storage rate applied to stopped instances.

## Data security and availability

All storage types provide strong privacy protections to ensure your data remains secure. Your data is only accessible to you and users you explicitly authorize to access it. It's important to note that if your account runs out of funds, your storage may be deleted to free up resources for other customers. Setting up automatic payments is highly recommended to prevent unexpected data loss due to billing issues. As an additional safeguard, always back up critical data to external systems to protect against any potential data loss.

## Next steps

- [Create a network volume](https://docs.runpod.io/docs/create-a-network-volume)
- [Sync a volume to a cloud provider](https://docs.runpod.io/docs/sync-a-volume-to-a-cloud-provider)
- [Manage Serverless endpoints](https://docs.runpod.io/docs/manage-endpoints)
