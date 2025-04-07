---
title: Deploy with SLURM
sidebar_position: 4
description: Learn how to deploy an Instant Cluster and set up SLURM for distributed job scheduling.
---

# Deploy an Instant Cluster with SLURM

This tutorial demonstrates how to use Instant Clusters with [SLURM](https://slurm.schedmd.com/) (Simple Linux Utility for Resource Management) to manage and schedule distributed workloads across multiple nodes. SLURM is a popular open-source job scheduler that provides a framework for job management, scheduling, and resource allocation in high-performance computing environments. By leveraging SLURM on RunPod's high-speed networking infrastructure, you can efficiently manage complex workloads across multiple GPUs.

Follow the steps below to deploy a cluster and start running distributed SLURM workloads efficiently.

## Step 1: Deploy an Instant Cluster

1. Open the [Instant Clusters page](https://www.runpod.io/console/cluster) on the RunPod web interface.
2. Click **Create Cluster**.
3. Use the UI to name and configure your cluster. For this walkthrough, keep **Pod Count** at **2** and select the option for **16x H100 SXM** GPUs. Keep the **Pod Template** at its default setting (RunPod PyTorch).
4. Click **Deploy Cluster**. You should be redirected to the Instant Clusters page after a few seconds.

## Step 2: Clone the SLURM demo into each Pod

1. On the Instant Clusters page, click on the cluster you created to expand the list of Pods.
2. Click on a Pod, for example `CLUSTERNAME-pod-0`, to expand the Pod.
3. Click **Connect**, then click **Web Terminal**.
4. In the terminal that opens, run this command to clone the SLURM demo files into the Pod's main directory:

    ```bash
    git clone https://github.com/pandyamarut/dotfiles.git
    cd dotfiles/runpod/slurm_example
    ```

5. Run this command to the scripts executable:

    ```bash
    chmod +x create_gres_conf.sh create_slurm_conf.sh install.sh setup.sh test_batch.sh
    ```

Repeat these steps for **each Pod** in your cluster.

## Step 3: Overview of SLURM demo scripts

The repository contains several essential scripts for setting up SLURM. Let's examine what each script does:

- `setup.sh`: Prepares the Pod environment with necessary dependencies and utilities for SLURM and distributed computing.
- `create_gres_conf.sh`: Generates the SLURM Generic Resource (GRES) configuration file that defines GPU resources for each node.
- `create_slurm_conf.sh`: Creates the main SLURM configuration file with cluster settings, node definitions, and partition setup.
- `install.sh`: The primary installation script that sets up MUNGE authentication, configures SLURM, and prepares the environment.
- `test_batch.sh`: A sample SLURM job script for testing cluster functionality.

## Step 4: Run setup.sh

Run `setup.sh` to prepare your Pod environment for each node:

```bash
./setup.h
```

*TODO: Describe what this does*

## Step 4: Get the hostname and IP address for each Pod

Before running the installation script, you need to get the hostname and IP address for each Pod. **On each Pod:**

1. Run this command to get the IP address of the node:

    ```bash
    echo $NODE_ADDR
    ```

    If this outputs `10.65.0.2`, this is the **primary node**. If it outputs `10.65.0.3`, this is the **secondary node**. 

2. Run this command to get the Pod's hostname:

    ```bash
    echo $HOSTNAME
    ```

    This should output a string of random numbers and letters, similar to:

    ```bash
    4f653f31b496
    ```

3. Make a note of the hostname for the primary (`$NODE_ADDR` = `10.65.0.2`) and secondary (`$NODE_ADDR` = `10.65.0.3`) nodes.

## Step 5: Install SLURM on each Pod

Now run the installation script on each Pod:

```bash
./install.sh "[MUNGE_SECRET_KEY]" [HOSTNAME_PRIMARY] [HOSTNAME_SECONDARY] `10.65.0.2` `10.65.0.3`
```

Replace:
- `[MUNGE_SECRET_KEY]` with any secure random string (like a password). The secret key is used for authentication between nodes, and must be identical across all Pods in your cluster.
- `[HOSTNAME_PRIMARY]` with the hostname of the primary node (`$NODE_ADDR` = `10.65.0.2`)
- `[HOSTNAME_SECONDARY]` with the hostname of the secondary node (`$NODE_ADDR` = `10.65.0.3`).

*TODO: Describe what this does*

## Step 5: Start SLURM services

1. On the primary node (`$NODE_ADDR` = `10.65.0.2`), run both SLURM services:

    ```bash
    sudo slurmctld -D
    ```

2. Use the web interface to open a second terminal on the primary node and run:

    ```bash
    sudo slurmd -D
    ```

3. On the secondary node (`$NODE_ADDR` = `10.65.0.3`), run:

    ```bash
    sudo slurmd -D
    ```

After running these commands, you should see output indicating that the services have started successfully. The `-D` flag keeps the services running in the foreground, so each command needs its own terminal.

*TODO: Describe what this does*

## Step 6: Test your SLURM Cluster

1. Run this command on one node to check the status of your nodes:

    ```bash
    sinfo
    ```

    You should see output showing both nodes in your cluster, with a state of "idle" if everything is working correctly.

2. Run this command to test GPU availability across both nodes:

    ```bash
    srun --nodes=2 --gres=gpu:1 nvidia-smi -L
    ```

    This command should list one GPU from each of your two nodes.

## Step 7: Submit a SLURM job script

1. Create a SLURM job script to test your cluster:

    ```bash
    cat > test_batch.sh << 'EOL'
    #!/bin/bash
    #SBATCH --partition=gpupart
    #SBATCH --nodes=2
    #SBATCH --time=00:02:00
    #SBATCH --output=test_simple_%j.out

    srun hostname
    EOL

    chmod +x test_batch.sh
    ```

2. Submit the job:

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

For more SLURM examples and configurations, check out:
[SLURM Example Repository](https://github.com/pandyamarut/dotfiles/tree/master/runpod/slurm_example).