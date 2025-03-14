---
title: Volumes
description: "Explore the concept of volumes in computing, where data can be stored as persistent or ephemeral resources, each with its own unique characteristics and applications."
---

# Understanding Volumes in RunPod

Volumes in RunPod provide storage space for your data, applications, and files. Understanding the different types of volumes and their characteristics is essential for managing your data effectively.

## Persistent Volumes

Persistent volumes retain data even when pods are stopped or restarted. They are essential for storing valuable information that needs to survive pod lifecycle events.

### Types of Persistent Volumes in RunPod

#### 1. Volume Disk

- **Characteristics**: Persists when pod is stopped but tied to the specific physical machine
- **Location**: Typically mounted at `/workspace` by default
- **Use Cases**: Project files, datasets, code repositories
- **Limitations**: Cannot be accessed if the physical machine is unavailable
- **Billing**: $0.10 GB/month for running pods, $0.20 GB/month for stopped pods

Volume disks are created automatically when you deploy a pod and specify a volume size. They provide persistence across pod stops and restarts but are tied to the specific machine where your pod runs.

#### 2. Network Volumes (Secure Cloud Only)

- **Characteristics**: Independent of specific machines, can be mounted to multiple pods
- **Location**: Typically mounted at `/runpod-volume`
- **Use Cases**: Shared datasets, trained models, files needed across multiple pods
- **Advantages**: Higher reliability, shareable across pods, machine-independent
- **Billing**: $0.07 GB/month (under 1TB), $0.05 GB/month (over 1TB)

Network volumes offer the highest level of persistence and flexibility in RunPod. They exist independently of specific machines and can be accessed from any pod in the same data center.

[Learn more about creating network volumes](/pods/storage/create-network-volumes)

## Ephemeral Volumes

Ephemeral volumes are temporary storage spaces that exist only for the lifetime of a pod. When the pod stops or restarts, all data in ephemeral volumes is lost.

### Types of Ephemeral Volumes in RunPod

#### 1. Container Disk

- **Characteristics**: Temporary, lost when pod stops or restarts
- **Location**: Root filesystem (/) and all directories not explicitly mounted to persistent volumes
- **Use Cases**: OS files, application binaries, temporary files
- **Size**: Specified during pod creation (Container Disk Size)
- **Billing**: Included in pod hourly rate while running

Container disk provides the root filesystem for your pod and is completely ephemeral. It's suitable for software installations, runtime dependencies, and temporary files that don't need to persist.

#### 2. Memory-based Volumes

- **Characteristics**: Ultra-fast, volatile storage in RAM
- **Location**: Various system-defined locations like `/dev/shm`
- **Use Cases**: High-performance temporary storage, caching
- **Limitations**: Limited by available RAM, lost on pod restart or stop
- **Billing**: No additional charge (uses pod's allocated memory)

Memory-based volumes provide high-performance temporary storage for applications that need fast access to data but don't require persistence.

## Volume Persistence Comparison

| Volume Type | Persists When Pod Stops | Persists When Pod Terminates | Machine Independent | Shareable Between Pods |
|-------------|-------------------------|------------------------------|---------------------|------------------------|
| Container Disk | ❌ No | ❌ No | ❌ No | ❌ No |
| Volume Disk | ✅ Yes | ❌ No | ❌ No | ❌ No |
| Network Volume | ✅ Yes | ✅ Yes | ✅ Yes | ✅ Yes |
| Memory Volumes | ❌ No | ❌ No | ❌ No | ❌ No |

## Best Practices for Volume Usage

1. **Match data importance to volume type**
   - Critical data: Network volumes with regular backups
   - Project data: Volume disk with periodic backups
   - Temporary data: Container disk or memory volumes

2. **Size volumes appropriately**
   - Allocate enough space for your needs plus growth
   - Monitor usage to avoid running out of space
   - Consider cost implications of oversized volumes

3. **Organize data logically**
   - Keep related files together
   - Use clear directory structures
   - Document data organization for team projects

4. **Implement backup strategies**
   - Use [Cloud Sync](/pods/storage/sync-volumes) for important data
   - Schedule regular backups
   - Test restoration processes periodically

For a comprehensive guide on data persistence and protecting your data in RunPod, see our [Data Persistence Guide](/pods/storage/data-persistence).

## Volume Management Commands

Common commands for working with volumes in Linux environments:

```bash
# Check disk usage
df -h

# Check directory size
du -sh /path/to/directory

# Move files between volumes
mv /source/path /destination/path

# Copy files between volumes
cp -r /source/directory /destination/directory

# Check inode usage (for many small files)
df -i
```

Understanding the different volume types and their characteristics will help you make informed decisions about where to store your data based on its importance and your specific requirements.