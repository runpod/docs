---
title: Overview
sidebar_position: 1
description: Instant Clusters enable high-performance computing across multiple GPUs with high-speed networking capabilities.
---

# Instant Clusters

Instant Clusters enable high-performance computing across multiple GPU [Pods](/pods/overview), with high-speed networking capabilities.

Instant Clusters provide:

- Fast local networking between Pods, with bandwidths from 100 Gbps to 3200 Gbps within a single data center.
- Static IP assignment for each Pod in the cluster.
- Automatic assignment of [environment variables](#environment-variables) for seamless coordination between Pods.

:::note

All accounts have a default spending limit. To deploy a larger cluster, submit a support ticket at help@runpod.io

:::

## Get started

Get started with Instant Clusters by following a step-by-step tutorials for your preferred framework:

- [Deploy an Instant Cluster with PyTorch](/instant-clusters/pytorch)
- [Deploy an Instant Cluster with Axolotl](/instant-clusters/axolotl)

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

| Environment Variable           | Description                                                                   |
| ------------------------------ | ----------------------------------------------------------------------------- |
| `PRIMARY_ADDR` / `MASTER_ADDR` | The address of the primary Pod.                                               |
| `PRIMARY_PORT` / `MASTER_PORT` | The port of the primary Pod (all ports are available).                        |
| `NODE_ADDR`                    | The static IP of this Pod within the cluster network.                         |
| `NODE_RANK`                    | The Cluster (i.e., global) rank assigned to this Pod (0 for the primary Pod). |
| `NUM_NODES`                    | The number of Pods in the Cluster.                                            |
| `NUM_TRAINERS`                 | The number of GPUs per Pod.                                                   |
| `HOST_NODE_ADDR`               | Defined as `PRIMARY_ADDR:PRIMARY_PORT` for convenience.                       |
| `WORLD_SIZE`                   | The total number of GPUs in the Cluster (`NUM_NODES` * `NUM_TRAINERS`).       |

Each Pod receives a static IP (`NODE_ADDR`) on the overlay network. When a Cluster is deployed, the system designates one Pod as the primary node by setting the `PRIMARY_ADDR` and `PRIMARY_PORT` environment variables. This simplifies working with multiprocessing libraries that require a primary node.

The variables `MASTER_ADDR`/`PRIMARY_ADDR` and `MASTER_PORT`/`PRIMARY_PORT` are equivalent. The `MASTER_*` variables provide compatibility with tools that expect these legacy names.