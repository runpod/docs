# Instant Clusters User Facing docs

# Overview

This feature enables high-performance computing across multiple machines with high-speed networking capabilities.

**Key characteristics:**

- Provides very fast local networking with bandwidths from 100 Gbps up to 3200 Gbps within a single data center⁠
- Each pod in a cluster gets a static IP within the network, with environment variables set for coordination between nodes

## Deploy your first Instant Cluster

This guide explains how to use Instant Clusters to support larger workloads

Each pod will have a static IP on their overlay network. Machines will have a designated
`PRIMARY_IP` and `CLUSTER_IP` set. The primary is arbitrary but one is selected for you on
cluster creation, to make it easier to work with multiprocessing libraries that expect a primary.

The following environment variables will be set in all pods:

- **$PRIMARY_ADDR / MASTER_ADDR** - the address of the primary pod
- **$PRIMARY_PORT / MASTER_PORT** - the port of the primary pod. Offered for
convenience, all ports are available.
- **$NODE_ADDR** - the static IP of this pod within the cluster network
- **$NODE_RANK** - the cluster rank we have assigned this pod, set to 0 for primary
- **$NUM_NODES** - number of pods in the cluster
- **$NUM_TRAINERS** - number of GPU’s per pod
- **$HOST_NODE_ADDR** - defined as **$PRIMARY_ADDR:$PRIMARY_PORT**, for your
convenience

The variables **MASTER_ADDR** and **MASTER_PORT / PRIMARY_ADDR** and **PRIMARY_PORT**
are equivalent. **MASTER_*** variables are supplied for legacy compatibility with tools that expect
them.

All of these are per pytorch defaults. An example pytorch invocation would be:

```jsx
export NCCL_SOCKET_IFNAME = eth1
torchrun \
--nproc_per_node=$NUM_TRAINERS \
--nnodes=$NUM_NODES \
--node_rank=$NODE_RANK \
--master_addr=$MASTER_ADDR \
--master_port=$MASTER_PORT \
[main.py](http://main.py/)
```

High-bandwidth interfaces `eth1, eth2...` are provided for inter-node communication, while the
management interface `eth0` can be used for external traffic. The NCCL environment variable `$NCCL_SOCKET_IFNAME` is configured by default to use all available interfaces. The aforementioned `PRIMARY_ADDR` simply corresponds to `eth1` , to allow launching and bootstrapping distributed processes.

:::note

💡 All accounts have a default spending limit. To launch a larger cluster, please submit a support ticket [here](mailto:help@runpod.io)

:::

## Applications

Let's look at some use cases where you can benefit from this feature:

- **Deep Learning & AI**
    - **Training Large Neural Networks**: Instant clusters speed up deep learning training by distributing data across GPUs, enabling faster convergence
    - **Federated Learning**: Clusters help train models across distributed systems while maintaining data privacy
- **High-Performance Computing (HPC)**
    - **Scientific Simulations**: Weather forecasting, molecular dynamics (e.g., protein folding, drug discovery), and climate modeling require multi-GPU acceleration
    - **Astrophysics & Space Exploration**: Simulations of galaxy formations, gravitational wave detection, and space weather modeling
    - **Fluid Dynamics & Engineering Simulations**: Computational fluid dynamics (CFD) in aerospace, automotive, and energy sectors
- **Gaming & Graphics Rendering**
    - **Ray Tracing & Real-Time Rendering**: Multi-GPU clusters are used for ultra-realistic graphics in gaming, VR, and movie CGI
    - **Game Development & Testing**: Large-scale GPU clusters help in rendering game environments, testing AI-driven behaviors, and procedural content generation
    - **Virtual Reality (VR) & Augmented Reality (AR)**: Real-time multi-view rendering for immersive experiences
- **Large-Scale Data Analytics**
    - **Big Data Processing**: Multi-GPU clusters accelerate data processing in AI-driven analytics and recommendation systems
    - **Social Media Analysis**: Real-time trend detection, sentiment analysis, and misinformation detection

:::note
💡Note: You can review your spending in the "Clusters" tab in the billing section

:::
