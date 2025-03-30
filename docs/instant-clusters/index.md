---
title: Instant Clusters
sidebar_position: 1
description: Instant Clusters enable high-performance computing across multiple GPUs with high-speed networking capabilities.
---

Instant Clusters enable high-performance computing across multiple GPU [Pods](/pods/overview), with high-speed networking capabilities.

Instant Clusters provide:

- Fast local networking between Pods, with bandwidths from 100 Gbps to 3200 Gbps within a single data center.
- Static IP assignment for each Pod in the cluster.
- Automatic assignment of [environment variables](#environment-variables) for seamless coordination between Pods.

Each Pod receives a static IP address on the overlay network. The system designates one Pod as the primary node by setting the `PRIMARY_IP` and `CLUSTER_IP` environment variables. This primary designation simplifies working with multiprocessing libraries that require a primary node.

## Use cases for Instant Clusters

Instant Clusters provide powerful computing capabilities that benefit a wide range of applications:

### Deep learning & AI

- **Large Language Model training**: Distribute training of models across multiple GPUs for significantly faster convergence.
- **Federated Learning**: Train models across distributed systems while preserving data privacy and security.

### High-performance computing

- **Scientific simulations**: Use multi-GPU acceleration to run complex simulations for weather forecasting, molecular dynamics, and climate modeling.
- **Computational physics**: Solve large-scale physics problems requiring massive parallel computing power.
- **Fluid dynamics & engineering**: Perform fluid dynamics computations for use in aerospace, automotive, and energy sectors.

### Graphics computing & rendering

- **Large-scale rendering**: Generate high-fidelity images and animations for film, gaming, and visualization.
- **Real-time graphics processing**: Power complex visual effects and simulations requiring multiple GPUs.
- **Game development & testing**: Render game environments, test AI-driven behaviors, and generate procedural content.
- **Virtual reality & augmented reality**: Deliver real-time multi-view rendering for immersive AR/VR experiences.

### Large-scale data analytics

- **Big data processing**: Analyze large-scale datasets with distributed computing frameworks.
- **Social media analysis**: Detect real-time trends, analyze sentiment, and identify misinformation.

## Network interfaces

High-bandwidth interfaces (`eth1`, `eth2`, etc.) handle communication between Pods, while the management interface (`eth0`) manages external traffic. The [NCCL](https://developer.nvidia.com/nccl) environment variable `NCCL_SOCKET_IFNAME` uses all available interfaces by default. The `PRIMARY_ADDR` corresponds to `eth1` to enable launching and bootstrapping distributed processes.

Instant Clusters support up to 8 interfaces per Pod. Each interface (`eth1` - `eth8`) provides a private network connection for inter-node communication, made available to distributed backends such as NCCL or GLOO.

## Environment variables

The following environment variables are available in all Pods:

| Environment Variable           | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `PRIMARY_ADDR` / `MASTER_ADDR` | The address of the primary Pod.                               |
| `PRIMARY_PORT` / `MASTER_PORT` | The port of the primary Pod (all ports are available).        |
| `NODE_ADDR`                    | The static IP of this Pod within the cluster network.         |
| `NODE_RANK`                    | The Cluster (i.e., global) rank assigned to this Pod (0 for the primary Pod). |
| `NUM_NODES`                    | The number of Pods in the Cluster.                                |
| `NUM_TRAINERS`                 | The number of GPUs per Pod.                                       |
| `HOST_NODE_ADDR`               | Defined as `PRIMARY_ADDR:PRIMARY_PORT` for convenience.       |
| `WORLD_SIZE`                   | The total number of GPUs in the Cluster (`NUM_NODES` * `NUM_TRAINERS`). |

Each Pod receives a static IP (`NODE_ADDR`) on the overlay network. When a Cluster is deployed, the system designates one GPU as the primary node by setting the `PRIMARY_IP` and `CLUSTER_IP` environment variables. This simplifies working with multiprocessing libraries that require a primary node.

The variables `MASTER_ADDR`/`PRIMARY_ADDR` and `MASTER_PORT`/`PRIMARY_PORT` are equivalent. The `MASTER_*` variables provide compatibility with tools that expect these legacy names.

## Deploy your first Instant Cluster

Follow these steps to deploy an Instant Cluster and run a multi-node process using PyTorch.

:::note

All accounts have a default spending limit. To deploy a larger cluster, submit a support ticket at help@runpod.io

:::

### Step 1: Deploy an Instant Cluster using the web interface

1. Open the [Instant Clusters page](https://www.runpod.io/console/cluster) on the RunPod web interface.
1. Click **Create Cluster**.
1. Use the UI to name and configure your Cluster. For this walkthrough, keep **Pod Count** at **2**, and select the option for **16x H100 SXM** GPUs. Keep the Pod Template at its default setting (RunPod PyTorch).
1. Click **Deploy Cluster**. You should be redirected to the Instant Clusters page after a few seconds.

### Step 2: Clone the PyTorch demo into each Pod

1. Click your Cluster to expand the list of Pods.
1. Click your first Pod, for example `CLUSTERNAME-pod-0`, to expand the Pod.
1. Click **Connect**, then click **web terminal**.
1. Run the following command to clone a basic `main.py` file into the Pod's main directory:

```bash
git clone https://github.com/murat-runpod/torch-demo.git
```

Repeat these steps for **each Pod** in your cluster.

### Step 3: Understand the `main.py` file

Let's look at the code in our `main.py` file:

 ```python
import os
import torch
import torch.distributed as dist

def init_distributed():
    """Initialize the distributed training environment"""
    # Initialize the process group
    dist.init_process_group(backend="nccl")
    
    # Get local rank and global rank
    local_rank = int(os.environ["LOCAL_RANK"])
    global_rank = dist.get_rank()
    world_size = dist.get_world_size()
    
    # Set device for this process
    device = torch.device(f"cuda:{local_rank}")
    torch.cuda.set_device(device)
        
    return local_rank, global_rank, world_size, device

def cleanup_distributed():
    """Clean up the distributed environment"""
    dist.destroy_process_group()

def main():
    # Initialize distributed environment
    local_rank, global_rank, world_size, device = init_distributed()
    
    print(f"Running on rank {global_rank}/{world_size-1} (local rank: {local_rank}), device: {device}")

    # Your code here
    
    # Clean up distributed environment when done
    cleanup_distributed()
    
if __name__ == "__main__":
    main()
```

This is the minimal code necessary for initializing a distributed environment. The `main()` function prints the local and global rank for each GPU process (this is also where you can add your own code). `LOCAL_RANK` is assigned dynamically to each process by PyTorch. All other environment variables are set automatically by RunPod during deployment.

### Step 4: Start the PyTorch process on each Pod

Run the following command in the web terminal of **each Pod**:

```bash
export NCCL_DEBUG=WARN
torchrun \
  --nproc_per_node=$NUM_TRAINERS \
  --nnodes=$NUM_NODES \
  --node_rank=$NODE_RANK \
  --master_addr=$MASTER_ADDR \
  --master_port=$MASTER_PORT \
torch-demo/main.py
```

This command launches eight `main.py` processes per node (one per GPU in the Pod).

After running the command on the last Pod, you should see output similar to this:

```bash
Running on rank 8/15 (local rank: 0), device: cuda:0
Running on rank 15/15 (local rank: 7), device: cuda:7
Running on rank 9/15 (local rank: 1), device: cuda:1
Running on rank 12/15 (local rank: 4), device: cuda:4
Running on rank 13/15 (local rank: 5), device: cuda:5
Running on rank 11/15 (local rank: 3), device: cuda:3
Running on rank 14/15 (local rank: 6), device: cuda:6
Running on rank 10/15 (local rank: 2), device: cuda:2
```

The first number refers to the global rank of the thread, spanning from `0` to `WORLD_SIZE-1` (`WORLD_SIZE` = the total number of GPUs in the Cluster). In our example there are two Pods of eight GPUs, so the global rank spans from 0-15. The second number is the local rank, which defines the order of GPUs within a single Pod (0-7 for this example).

The specific number and order of ranks may be different in your terminal, and the global ranks listed will be different for each Pod.

The following diagram illustrates how local and global ranks are distributed across multiple Pods:

<img src="/img/docs/instant-clusters-rank-diagram.png" alt="Instant Cluster rank diagram" width="750"/>

### Step 5: Clean up

If you no longer need your Cluster, make sure you return to the [Instant Clusters page](https://www.runpod.io/console/cluster) and delete your Cluster to avoid incurring extra charges.

:::note

You can monitor your cluster usage and spending using the **Billing Explorer** at the bottom of the [Billing page](https://www.runpod.io/console/user/billing) section under the **Cluster** tab.

:::
