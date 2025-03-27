---
title: Instant Clusters
sidebar_position: 1
description: Instant Clusters enables high-performance computing across multiple machines with high-speed networking capabilities.
---

Instant Clusters enables high-performance computing across multiple machines with high-speed networking capabilities.

**Key characteristics:**

- Fast local networking with bandwidths from 100 Gbps to 3200 Gbps within a single data center
- Static IP assignment for each pod in the cluster
- Environment variables set automatically for coordination between nodes

## Deploy your first Instant Cluster

This guide explains how to use Instant Clusters to support larger workloads.

Each pod receives a static IP on the overlay network. The system designates one machine as the primary node by setting `PRIMARY_IP` and `CLUSTER_IP` environment variables. This primary designation simplifies working with multiprocessing libraries that require a primary node.

### Environment variables

The following environment variables are available in all pods:

| Environment Variable           | Description                                                  |
| ------------------------------ | ------------------------------------------------------------ |
| `PRIMARY_ADDR` / `MASTER_ADDR` | The address of the primary pod                               |
| `PRIMARY_PORT` / `MASTER_PORT` | The port of the primary pod (all ports are available)        |
| `NODE_ADDR`                    | The static IP of this pod within the cluster network         |
| `NODE_RANK`                    | The cluster rank assigned to this pod (set to 0 for primary) |
| `NUM_NODES`                    | Number of pods in the cluster                                |
| `NUM_TRAINERS`                 | Number of GPUs per pod                                       |
| `HOST_NODE_ADDR`               | Defined as `PRIMARY_ADDR:PRIMARY_PORT` for convenience       |
| `WORLD_SIZE`                   | The total number of GPUs in the cluser (`NUM_NODES` * `NUM_TRAINERS`). |

The variables `MASTER_ADDR`/`PRIMARY_ADDR` and `MASTER_PORT`/`PRIMARY_PORT` are equivalent. The `MASTER_*` variables provide compatibility with tools that expect these legacy names.

### Network interfaces

High-bandwidth interfaces (`eth1`, `eth2`, etc.) handle inter-node communication, while the management interface (`eth0`) manages external traffic. The NCCL environment variable `NCCL_SOCKET_IFNAME` uses all available interfaces by default. The `PRIMARY_ADDR` corresponds to `eth1` to enable launching and bootstrapping distributed processes. Instant Clusters support up to 8 interfaces per Pod. Each interface (`eth1` - `eth8`) provides a private network connection for inter-node communication, made available to distributed backends such as NCCL or GLOO.

### Example PyTorch implementation

```python
export NCCL_SOCKET_IFNAME=eth1
torchrun \
  --nproc_per_node=$NUM_TRAINERS \
  --nnodes=$NUM_NODES \
  --node_rank=$NODE_RANK \
  --master_addr=$MASTER_ADDR \
  --master_port=$MASTER_PORT \
  main.py
```

:::note
All accounts have a default spending limit. To launch a larger cluster, submit a support ticket at help@runpod.io
:::

## Applications

Instant Clusters benefit these use cases:

### Deep Learning & AI

- **Training Large Neural Networks**: Speed up deep learning by distributing data across GPUs for faster convergence
- **Federated Learning**: Train models across distributed systems while maintaining data privacy

### High-Performance Computing (HPC)

- **Scientific Simulations**: Run weather forecasting, molecular dynamics, and climate modeling with multi-GPU acceleration
- **Astrophysics & Space Exploration**: Simulate galaxy formations, detect gravitational waves, and model space weather
- **Fluid Dynamics & Engineering**: Perform computational fluid dynamics in aerospace, automotive, and energy sectors

### Gaming & Graphics Rendering

- **Ray Tracing & Real-Time Rendering**: Create ultra-realistic graphics for gaming, VR, and movie CGI
- **Game Development & Testing**: Render game environments, test AI-driven behaviors, and generate procedural content
- **Virtual Reality & Augmented Reality**: Deliver real-time multi-view rendering for immersive experiences

### Large-Scale Data Analytics

- **Big Data Processing**: Accelerate data processing in AI-driven analytics and recommendation systems
- **Social Media Analysis**: Detect real-time trends, analyze sentiment, and identify misinformation

:::note

You can review your spending in the **Clusters** tab in the billing section.

:::
