---
title: Deploy with Axolotl
sidebar_position: 3
description: Learn how to deploy an Instant Cluster and use it to fine-tune a large language model (LLM) with Axolotl.
---

# Deploy an Instant Cluster with Axolotl

This tutorial demonstrates how to use Instant Clusters with [Axolotl](https://axolotl.ai/) to fine-tune large language models (LLMs) across multiple GPUs. By leveraging PyTorch's distributed training capabilities and RunPod's high-speed networking infrastructure, you can significantly accelerate your training process compared to single-GPU setups.

Follow the steps below to deploy your Cluster and start training your models efficiently.

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

Currently, the dynamic `c10d` backend is not supported. Please keep the `rdzv_backend` flag set to `static`.

:::

After running the command on the last Pod, you should see output similar to this after the training process is complete:

```bash
...
{'loss': 1.2569, 'grad_norm': 0.11112671345472336, 'learning_rate': 5.418275829936537e-06, 'epoch': 0.9}
{'loss': 1.2091, 'grad_norm': 0.11100614815950394, 'learning_rate': 3.7731999690749585e-06, 'epoch': 0.92}
{'loss': 1.2216, 'grad_norm': 0.10450132936239243, 'learning_rate': 2.420361737256438e-06, 'epoch': 0.93}
{'loss': 1.223, 'grad_norm': 0.10873789340257645, 'learning_rate': 1.3638696597277679e-06, 'epoch': 0.95}
{'loss': 1.2529, 'grad_norm': 0.1063728854060173, 'learning_rate': 6.069322682050516e-07, 'epoch': 0.96}
{'loss': 1.2304, 'grad_norm': 0.10996092110872269, 'learning_rate': 1.518483566683826e-07, 'epoch': 0.98}
{'loss': 1.2334, 'grad_norm': 0.10642101615667343, 'learning_rate': 0.0, 'epoch': 0.99}
{'train_runtime': 61.7602, 'train_samples_per_second': 795.189, 'train_steps_per_second': 1.085, 'train_loss': 1.255359119443751, 'epoch': 0.99}

100%|████████████████████████████████████████████████████████████████████████████████████████████████████████████████████| 67/67 [01:00<00:00,  1.11it/s]
[2025-04-01 19:24:22,603] [INFO] [axolotl.train.save_trained_model:211] [PID:1009] [RANK:0] Training completed! Saving pre-trained model to ./outputs/lora-out.
```

Congrats! You've successfully trained a model using Axolotl on an Instant Cluster. Your fine-tuned model has been saved to the `./outputs/lora-out` directory. You can now use this model for inference or continue training with different parameters.

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
