---
title: "Overview"
description: "Create a network volume in Secure Cloud to access high-performance storage and flexibility for multiple pods, with options for data center selection, naming, and size allocation, and enjoy cost-effective storage solutions with robust infrastructure and NVME SSDs."
sidebar_position: 9
---

# Storage overview

## Serverless

- Serverless on RunPod supports several storage options to fit different needs:
    - **Container Disk:** Temporary storage included when a worker (container) is running. This storage is wiped when the worker stops.
    - **Volume Storage (local):** Persistent storage on the host machine. Survives container restarts, but is deleted if the Pod/worker is removed. This storage is local to the server that hosts your endpoint, so it can’t be accessed elsewhere.
    - **Network Storage (Network Volumes):** Persistent storage accessible across workers and data centers. If attached, it’s mounted at `/runpod-volume`, and the BASE_PATH can be set for your workload to read/write here. Only one worker needs to download the model once, and all workers can then load it. For endpoints needing large shared models or datasets, this is the preferred method.
    - **S3-Compatible Storage:** You can supply your own credentials for S3-compatible storage. Serverless endpoints can use this to upload or download large output or input files, often needed when API payload size limits are exceeded.
- **Key Behaviors:**
    - If network storage is not used, each worker has its own local directory and maintains its own data.
    - With network storage, you can efficiently share models and data among your workers, but it does require spinning up workers in the same data center as the storage.
    - For large inputs/outputs (above API limits), storing files in network or S3 storage is recommended, with the endpoint configured to handle these files directly.
    - Serverless workers always cache and load their Docker images locally, even if network storage is attached. Local NVMe cache speeds up cold starts, but large model files still add to the cold start time.
- **Scaling, Persistence, and Cost:**
    - Serverless auto-scales workers as requests arrive and shuts them down when idle. Storage persists and is charged according to the storage type—container disk is only billed while running, network volumes are billed monthly, and S3 billing depends on your provider.
    - If you use network storage, keep in mind it can constrain your deployments to a single data center, which may impact availability and failover options.
- **Best Practices:**
    - For the fastest cold starts and best reliability, bake your model into your Docker image or use NVMe-accelerated storage if possible. Use network or S3-compatible storage for large shared files or payloads beyond API size limits.
    - Review your endpoint’s storage/config choices to balance startup time, costs, and availability across locations.

## Pods

- **Pod Storage Types:**
    - **Container Disk:** Temporary storage for the operating system and tasks running inside the Pod. This disk is wiped (data lost) as soon as the Pod stops or is terminated[[1]](https://www.notion.so/Pods-160ff732fc3480a6baedf7a2ae9e3ac0?pvs=21)[[2]](https://www.notion.so/How-Does-Pod-Storage-Billing-Work-144ff732fc348071a279ffcff114b2b1?pvs=21).
    - **Disk Volume Storage (Volume Storage):** Persistent storage local to the physical machine hosting your Pod. Data remains after stopping or restarting the Pod, but is permanently deleted if the Pod is terminated. This storage is limited to the specific machine and isn’t accessible from other Pods or locations[[2]](https://www.notion.so/How-Does-Pod-Storage-Billing-Work-144ff732fc348071a279ffcff114b2b1?pvs=21)[[3]](https://www.notion.so/Onboarding-Notes-1c0ff732fc3480048487c67ea74ae297?pvs=21).
    - **Network Volume Storage:** Persistent storage accessible across multiple Pods and even between CPU and GPU Pods. Network Volumes can be attached to different Pods as long as they are launched in the same data center as the volume. This is ideal for sharing datasets or models across Pods and persisting data beyond a single Pod’s lifespan. RunPod’s network volumes are backed by high-speed SSDs (NVMe) and support fast read/write speeds. Storage up to 4TB is self-service, but can be increased further on request[[2]](https://www.notion.so/How-Does-Pod-Storage-Billing-Work-144ff732fc348071a279ffcff114b2b1?pvs=21)[[4]](https://www.notion.so/CPU-Pods-1aaff732fc3480c89c72c6cac568ee0d?pvs=21)[[5]](https://www.notion.so/2-4-Pod-Storage-8b90275ccef04d1d8a49312481e8afe5?pvs=21).
- **Persistence and Access:**
    - Data on **Disk Volumes** persists between restarts but is tied to the Pod’s lifecycle (deleted when the Pod is deleted) and location (machine-local).
    - **Network Volumes** are the best option if you want data to outlive the Pod and be used in future sessions or across multiple Pods.
    - **Container Disk** should be used for scratch data or temporary files only.
- **Billing:**
    - **Disk Volume Storage:** Billed per month. $0.10/GB/month for running Pods, $0.20/GB/month for stopped Pods.
    - **Network Volume Storage:** Billed at $0.07/GB/month (under 1TB) or $0.05/GB/month (over 1TB).
    - **Container Disk:** Included in the Pod’s running cost and not billed separately, but you pay for Pod runtime[[2]](https://www.notion.so/How-Does-Pod-Storage-Billing-Work-144ff732fc348071a279ffcff114b2b1?pvs=21)[[6]](https://www.notion.so/3-1-Funding-an-Account-89c2558c72464ac8a11bf65e534839c2?pvs=21).
- **Best Practices:**
    - Use **Disk Volume Storage** for persistent data that only needs to survive as long as the Pod exists on a given machine.
    - Use **Network Volumes** for sharing data between Pods, moving data from CPU preprocessing Pods to GPU inference Pods, or for true persistence beyond a Pod’s lifetime[[4]](https://www.notion.so/CPU-Pods-1aaff732fc3480c89c72c6cac568ee0d?pvs=21).
    - Remember to stop or terminate unused Pods to avoid ongoing compute charges—storage charges may still accrue even when Pods are stopped, especially on persistent Disk Volumes[[2]](https://www.notion.so/How-Does-Pod-Storage-Billing-Work-144ff732fc348071a279ffcff114b2b1?pvs=21).
- **Data Security & Availability:**
    - Data is only accessible to you, with strong privacy or enterprise controls.
    - If your funding runs out, your storage may be deleted to free up resources for other customers, so setting up automatic payments is recommended[[6]](https://www.notion.so/3-1-Funding-an-Account-89c2558c72464ac8a11bf65e534839c2?pvs=21).
