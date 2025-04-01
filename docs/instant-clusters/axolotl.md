---
title: Deploy with Axolotl
sidebar_position: 3
description: Learn how to train a model with Instant Clusters and Axolotl 
---

# Deploy an Instant Cluster with Axolotl

Learn how to deploy an Instant Cluster and use it to fine-tune a large language model (LLM) with [Axolotl](https://axolotl.ai/), a popular framework for working with LLMs.

## Step 1: Deploy an Instant Cluster

1. Open the [Instant Clusters page](https://www.runpod.io/console/cluster) on the RunPod web interface.
2. Click **Create Cluster**.
3. Use the UI to name and configure your Cluster. For this walkthrough, keep **Pod Count** at **2** and select the option for **16x H100 SXM** GPUs. Keep the **Pod Template** at its default setting (RunPod PyTorch).
4. Click **Deploy Cluster**. You should be redirected to the Instant Clusters page after a few seconds.

## Step 2: Set up Axolotl on each Pod

1. Click your Cluster to expand the list of Pods.
2. Click on a Pod, for example `CLUSTERNAME-pod-0`, to expand the Pod.
3. Click **Connect**, then click **Web Terminal**.
4. Clone the Axolotl repository into the Pod's main directory:

```bash
git clone https://github.com/axolotl-ai-cloud/axolotl
```

5. Navigate to the `axolotl` directory:

```bash
cd axolotl
```

6. Install the required packages:

```bash
pip3 install -U packaging setuptools wheel ninja
pip3 install --no-build-isolation -e '.[flash-attn,deepspeed]'
```

7. Navigate to the `examples/llama-3` directory:

```bash
cd examples/llama-3
```

Repeat these steps for **each Pod** in your Cluster.

## Step 3: Start the training process on each Pod

Run this command in the web terminal of **each Pod**:

```bash
torchrun \
--nnodes $NUM_NODES \
--node_rank $NODE_RANK \
--nproc_per_node $NUM_TRAINERS \
--rdzv_id "myjob" \
--rdzv_backend static \
--rdzv_endpoint "$PRIMARY_ADDR:$PRIMARY_PORT" -m axolotl.cli.train lora-1b.yml
```

:::note

Currently, the dynamic `c10d` backend is not supported. Please set `rdzv_backend` to `static`.

:::

After running the command on the last Pod, you should see output similar to this:

```bash
TODO: ADD TERMINAL OUTPUT
```

## Step 4: Clean up

If you no longer need your Cluster, make sure you return to the [Instant Clusters page](https://www.runpod.io/console/cluster) and delete your Cluster to avoid incurring extra charges.

:::note

You can monitor your Cluster usage and spending using the **Billing Explorer** at the bottom of the [Billing page](https://www.runpod.io/console/user/billing) section under the **Cluster** tab.

:::

## Next steps

Now that you've successfully deployed and tested an Axolotl distributed training job on an Instant Cluster, you can:

- **Fine-tune your own models** by modifying the configuration files in Axolotl to suit your specific requirements.
- **Scale your training** by adjusting the number of Pods in your Cluster (and the size of their containers and volumes) to handle larger models or datasets.
- **Try different optimization techniques** such as DeepSpeed, FSDP (Fully Sharded Data Parallel), or other distributed training strategies.

For more information on fine-tuning with Axolotl, refer to the [Axolotl documentation](https://github.com/OpenAccess-AI-Collective/axolotl).
