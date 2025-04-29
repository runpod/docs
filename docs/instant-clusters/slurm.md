---
title: Deploy with SLURM
sidebar_position: 4
description: Learn how to deploy an Instant Cluster and set up SLURM for distributed job scheduling.
---

# Deploy an Instant Cluster with SLURM

This tutorial demonstrates how to use Instant Clusters with [SLURM](https://slurm.schedmd.com/) (Simple Linux Utility for Resource Management) to manage and schedule distributed workloads across multiple nodes. SLURM is a popular open-source job scheduler that provides a framework for job management, scheduling, and resource allocation in high-performance computing environments. By leveraging SLURM on RunPod's high-speed networking infrastructure, you can efficiently manage complex workloads across multiple GPUs.

Follow the steps below to deploy a cluster and start running distributed SLURM workloads efficiently.

## Requirements

- You've created a [RunPod account](https://www.runpod.io/console/home) and funded it with sufficient credits.
- You have basic familiarity with Linux command line.
- You're comfortable working with [Pods](/pods/overview) and understand the basics of [SLURM](https://slurm.schedmd.com/).

## Step 1: Deploy an Instant Cluster

1. Open the [Instant Clusters page](https://www.runpod.io/console/cluster) on the RunPod web interface.
2. Click **Create Cluster**.
3. Use the UI to name and configure your cluster. For this walkthrough, keep **Pod Count** at **2** and select the option for **16x H100 SXM** GPUs. Keep the **Pod Template** at its default setting (RunPod PyTorch).
4. Click **Deploy Cluster**. You should be redirected to the Instant Clusters page after a few seconds.

## Step 2: Clone demo and install SLURM on each Pod

To connect to a Pod:

1. On the Instant Clusters page, click on the cluster you created to expand the list of Pods.
2. Click on a Pod, for example `CLUSTERNAME-pod-0`, to expand the Pod.

**On each Pod:**

1. Click **Connect**, then click **Web Terminal**.
2. In the terminal that opens, run this command to clone the SLURM demo files into the Pod's main directory:

    ```bash
    git clone https://github.com/pandyamarut/slurm_example.git && cd slurm_example
    ```

3. Run this command to install SLURM:

    ```bash
    apt update && apt install -y slurm-wlm slurm-client munge
    ```

## Step 3: Overview of SLURM demo scripts

The repository contains several essential scripts for setting up SLURM. Let's examine what each script does:

- `create_gres_conf.sh`: Generates the SLURM Generic Resource (GRES) configuration file that defines GPU resources for each node.
- `create_slurm_conf.sh`: Creates the main SLURM configuration file with cluster settings, node definitions, and partition setup.
- `install.sh`: The primary installation script that sets up MUNGE authentication, configures SLURM, and prepares the environment.
- `test_batch.sh`: A sample SLURM job script for testing cluster functionality.

## Step 4: Install SLURM on each Pod

Now run the installation script **on each Pod**, replacing `[MUNGE_SECRET_KEY]` with any secure random string (like a password). The secret key is used for authentication between nodes, and must be identical across all Pods in your cluster.

```bash
./install.sh "[MUNGE_SECRET_KEY]" node-0 node-1 10.65.0.2 10.65.0.3
```

This script automates the complex process of configuring a two-node SLURM cluster with GPU support, handling everything from system dependencies to authentication and resource configuration. It implements the necessary setup for both the primary (i.e. master/control) and secondary (i.e compute/worker) nodes.

## Step 5: Start SLURM services

:::tip

If you're not sure which Pod is the primary node, run the command `echo $HOSTNAME` on the web terminal of each Pod and look for `node-0`.

:::

1. **On the primary node** (`node-0`), run both SLURM services:

    ```bash
    slurmctld -D
    ```

2. Use the web interface to open a second terminal **on the primary node** and run:

    ```bash
    slurmd -D
    ```

3. **On the secondary node** (`node-1`), run:

    ```bash
    slurmd -D
    ```

After running these commands, you should see output indicating that the services have started successfully. The `-D` flag keeps the services running in the foreground, so each command needs its own terminal.

## Step 6: Test your SLURM Cluster

1. Run this command **on the primary node** (`node-0`) to check the status of your nodes:

    ```bash
    sinfo
    ```

    You should see output showing both nodes in your cluster, with a state of "idle" if everything is working correctly.

2. Run this command to test GPU availability across both nodes:

    ```bash
    srun --nodes=2 --gres=gpu:1 nvidia-smi -L
    ```

    This command should list all GPUs across both nodes.

## Step 7: Submit the SLURM job script

Run the following command **on the primary node** (`node-0`) to submit the test job script and confirm that your cluster is working properly:

```bash
sbatch test_batch.sh
```

Check the output file created by the test (`test_simple_[JOBID].out`) and look for the hostnames of both nodes. This confirms that the job ran successfully across the cluster.

## Step 8: Clean up

If you no longer need your cluster, make sure you return to the [Instant Clusters page](https://www.runpod.io/console/cluster) and delete your cluster to avoid incurring extra charges.

:::note

You can monitor your cluster usage and spending using the **Billing Explorer** at the bottom of the [Billing page](https://www.runpod.io/console/user/billing) section under the **Cluster** tab.

:::

## Next steps

Now that you've successfully deployed and tested a SLURM cluster on RunPod, you can:

- **Adapt your own distributed workloads** to run using SLURM job scripts.
- **Scale your cluster** by adjusting the number of Pods to handle larger models or datasets.
- **Try different frameworks** like [Axolotl](/instant-clusters/axolotl) for fine-tuning large language models.
- **Optimize performance** by experimenting with different distributed training strategies.