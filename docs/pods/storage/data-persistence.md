---
title: "Data Persistence"
description: "Understanding data persistence options in RunPod and how to protect your important data across different cloud environments."
sidebar_position: 2
---

# Data Persistence in RunPod

Data persistence is a critical consideration when working with cloud computing resources. This guide explains the different storage options available in RunPod, their persistence characteristics, and best practices for managing your data.

## Storage Types and Persistence Characteristics

RunPod offers several storage options, each with different persistence characteristics:

### Container Disk (Ephemeral)

- **Persistence Level**: Temporary
- **Availability**: Only while the pod is running
- **Data Loss Triggers**: Pod stops, restarts, or terminates
- **Use Cases**: Temporary files, application binaries, OS files
- **Best For**: Software installations, runtime dependencies, temporary outputs

Container disk storage is completely ephemeral. Any data stored here will be lost when your pod stops or restarts. This includes data in the root filesystem and any directories not explicitly mounted to a volume.

### Volume Disk (Semi-Persistent)

- **Persistence Level**: Semi-persistent
- **Availability**: Persists when pod is stopped, but tied to specific machine
- **Data Loss Triggers**: Pod termination, machine unavailability, account fund depletion
- **Use Cases**: Project files, datasets, model weights
- **Best For**: Active projects that don't require machine mobility

Volume disks provide persistence across pod stops and restarts, but they are tied to the specific physical machine where your pod runs. If that machine becomes unavailable or your pod is terminated, the data may be lost.

### Network Volumes (Persistent)

- **Persistence Level**: Highly persistent
- **Availability**: Independent of specific machines, available across multiple pods
- **Data Loss Triggers**: Account fund depletion, explicit deletion
- **Use Cases**: Valuable datasets, trained models, shared resources
- **Availability**: Secure Cloud only
- **Best For**: Important data that needs to be accessed from multiple pods

Network volumes offer the highest level of persistence in RunPod. They exist independently of specific machines and can be mounted to multiple pods simultaneously. This makes them ideal for valuable data that needs to be preserved and shared.

## Community Cloud vs. Secure Cloud Data Persistence

The reliability of your data storage is significantly affected by which cloud environment you choose:

### Community Cloud

- **Infrastructure**: Peer-to-peer network of vetted providers
- **Reliability**: Variable, dependent on individual providers
- **Data Persistence**: Not guaranteed
- **Risk Factors**: 
  - Machine owners may take servers offline for maintenance
  - Hardware failures may occur without immediate resolution
  - Power or network issues may affect availability
- **Best Practice**: Always maintain external backups of important data

**Important**: Community Cloud should not be relied upon for persistent data storage of critical information. While many Community Cloud machines operate reliably, there is inherently less infrastructure redundancy compared to Secure Cloud.

### Secure Cloud

- **Infrastructure**: T3/T4 data centers with professional management
- **Reliability**: High, with redundant systems
- **Data Persistence**: More reliable, especially with Network Volumes
- **Advantages**:
  - Professional data center operations
  - Redundant power and networking
  - Faster issue resolution
- **Best Practice**: Still maintain external backups for critical data

Even in Secure Cloud, it's recommended to back up critical data to external storage systems.

## Best Practices for Data Persistence

To ensure your data remains safe while using RunPod:

1. **Identify Data Value**
   - Categorize your data by importance and replaceability
   - Determine appropriate storage location based on data value

2. **Use Appropriate Storage**
   - Store temporary or easily regenerated data on container disk
   - Keep active project files on volume disk
   - Place valuable data on network volumes (Secure Cloud)

3. **Implement Regular Backups**
   - Use [Cloud Sync](/pods/storage/sync-volumes) to back up to external cloud storage
   - Schedule regular backups for important data
   - Verify backup integrity periodically

4. **Design for Resilience**
   - Create workflows that can recover from interruptions
   - Use checkpointing for long-running processes
   - Store intermediate results in persistent storage

5. **Monitor Account Balance**
   - Maintain sufficient funds to prevent automatic pod termination
   - Set up automatic balance replenishment for critical workloads
   - Remember that storage is billed even when pods are stopped

## Data Transfer Options

When you need to move data between storage types or to external systems:

1. **Between RunPod Storage Types**
   - Use standard file operations (cp, mv) to transfer between mounted volumes
   - For large transfers, consider using tools like rsync for efficiency

2. **To/From External Systems**
   - [runpodctl](/runpodctl/reference/runpodctl_send) for direct file transfers
   - [SCP](/pods/storage/transfer-files#scp) for secure copy via SSH
   - [Cloud Sync](/pods/storage/sync-volumes) for integration with cloud storage providers

## Recovery Options

In the event of unexpected data loss:

1. **Community Cloud**
   - Recovery may not be possible if the physical machine is unavailable
   - Contact support, but understand that recovery cannot be guaranteed

2. **Secure Cloud**
   - For volume disk issues, contact support for potential recovery options
   - For network volumes, recovery is typically possible unless explicitly deleted

Remember that RunPod is primarily a compute platform rather than a storage service. For truly critical data, always maintain copies in dedicated storage systems designed for long-term data preservation.

## Conclusion

Understanding the persistence characteristics of different storage options in RunPod is essential for protecting your valuable data. By following best practices and choosing the appropriate storage type for your needs, you can minimize the risk of data loss while taking advantage of RunPod's powerful computing capabilities.

For mission-critical data and workloads, we recommend:
1. Using Secure Cloud with Network Volumes
2. Implementing regular backups to external storage systems
3. Designing workflows that can recover from interruptions