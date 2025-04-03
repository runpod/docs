---
title: Deploy with SLURM
sidebar_position: 4
description: Learn how to deploy an Instant Cluster and set up SLURM for distributed job scheduling.
---

# Deploy an Instant Cluster with SLURM

This tutorial demonstrates how to use Instant Clusters with [SLURM](https://slurm.schedmd.com/) (Simple Linux Utility for Resource Management) to manage and schedule distributed workloads across multiple nodes. SLURM is a popular open-source job scheduler that provides a framework for job management, scheduling, and resource allocation in high-performance computing environments. By leveraging SLURM on RunPod's high-speed networking infrastructure, you can efficiently manage complex workloads across multiple GPUs.

Follow the steps below to deploy your Cluster and start running distributed PyTorch workloads efficiently.

## Step 1: Deploy an Instant Cluster

1. Open the [Instant Clusters page](https://www.runpod.io/console/cluster) on the RunPod web interface.
2. Click **Create Cluster**.
3. Use the UI to name and configure your Cluster. For this walkthrough, keep **Pod Count** at **2** and select the option for **16x H100 SXM** GPUs. Keep the **Pod Template** at its default setting (RunPod PyTorch).
4. Click **Deploy Cluster**. You should be redirected to the Instant Clusters page after a few seconds.

<!-- TODO: Grab the host name and IP address -->

## Step 2: Clone the SLURM demo into each Pod

1. Click your Cluster to expand the list of Pods.
2. Click on a Pod, for example `CLUSTERNAME-pod-0`, to expand the Pod.
3. Click **Connect**, then click **Web Terminal**.
4. Run this command to clone a the SLURM demo files into the Pod's main directory:

```bash
git clone TODO
```

Repeat these steps for **each Pod** in your Cluster.

## Step 3: Run the setup script

Create and run this setup script on **each node** to prepare the environment:

```bash
#!/bin/bash

# 1) Setup linux dependencies
su -c 'apt-get update && apt-get install -y sudo'
sudo apt-get install -y less nano htop ncdu nvtop lsof rsync btop jq

# 2) Setup virtual environment
curl -LsSf https://astral.sh/uv/install.sh | sh
source $HOME/.local/bin/env
uv python install 3.11
uv venv
source .venv/bin/activate
uv pip install ipykernel simple-gpu-scheduler # very useful on runpod with multi-GPUs
python -m ipykernel install --user --name=venv # so it shows up in jupyter notebooks within vscode

# 3) Setup dotfiles and ZSH (optional)
mkdir -p git && cd git
git clone https://github.com/jplhughes/dotfiles.git
cd dotfiles
./install.sh --zsh --tmux
chsh -s /usr/bin/zsh
./deploy.sh
cd ..

# 4) Setup github (optional)
# echo ./scripts/setup_github.sh "<YOUR_GITHUB_EMAIL>" "<YOUR_NAME>"

```

Save this as `setup.sh`, make it executable with `chmod +x setup.sh`, and run it on each node.

## Step 2: SLURM Configuration Scripts

Create a directory for the installation scripts:

```bash
mkdir rp_install
cd rp_install

```

### Create GRES Configuration Script

Create a file named `create_gres_conf.sh` with the following content:

```bash
#!/bin/bash

if [ -z "$1" ]; then
    echo "Usage: $0 <hostname>"
    exit 1
fi

HOSTNAME=$1

cat <<EOL
NodeName=$HOSTNAME Name=gpu File=/dev/nvidia[0-7]
EOL

```

### Create SLURM Configuration Script

Create a file named `create_slurm_conf.sh` with the following content:

```bash
#!/bin/bash

# Check if both hostnames are provided
[ -z "$1" ] && echo "Error: hostname1 is not set." >&2 && exit 1
[ -z "$2" ] && echo "Error: hostname2 is not set." >&2 && exit 1
[ -z "$3" ] && echo "Error: hostname1_ip is not set." >&2 && exit 1
[ -z "$4" ] && echo "Error: hostname2_ip is not set." >&2 && exit 1

HOSTNAME1=$1
HOSTNAME2=$2
HOSTNAME1_IP=$3
HOSTNAME2_IP=$4

num_cpus=$(nproc --all)
num_sockets=$(lscpu | grep "Socket(s):" | awk '{print $2}')
num_cores_per_socket=$(lscpu | grep "Core(s) per socket:" | awk '{print $4}')
num_threads_per_core=$(lscpu | grep "Thread(s) per core:" | awk '{print $4}')
total_memory=$(free -m | grep Mem: | awk '{print $2}')

cat <<EOL
ClusterName=localcluster
SlurmctldHost=$HOSTNAME1
MpiDefault=none
ProctrackType=proctrack/linuxproc
ReturnToService=2
SlurmctldPidFile=/var/run/slurmctld.pid
SlurmctldPort=6817
SlurmdPidFile=/var/run/slurmd.pid
SlurmdPort=6818
SlurmdSpoolDir=/var/lib/slurm-llnl/slurmd
SlurmUser=slurm
StateSaveLocation=/var/lib/slurm-llnl/slurmctld
SwitchType=switch/none
TaskPlugin=task/none

# TIMERS
InactiveLimit=0
KillWait=30
MinJobAge=300
SlurmctldTimeout=120
SlurmdTimeout=300
Waittime=0
# SCHEDULING
SchedulerType=sched/backfill
SelectType=select/cons_tres
SelectTypeParameters=CR_Core

# AccountingStoragePort=
AccountingStorageType=accounting_storage/none
JobCompType=jobcomp/none
JobAcctGatherFrequency=30
JobAcctGatherType=jobacct_gather/none
SlurmctldDebug=info
SlurmctldLogFile=/var/log/slurm-llnl/slurmctld.log
SlurmdDebug=info
SlurmdLogFile=/var/log/slurm-llnl/slurmd.log

GresTypes=gpu
NodeName=$HOSTNAME1 CPUs=$num_cpus Boards=$num_sockets Sockets=$num_sockets CoresPerSocket=$num_cores_per_socket ThreadsPerCore=$num_threads_per_core RealMemory=$total_memory Gres=gpu:8 State=UNKNOWN
NodeName=$HOSTNAME2 CPUs=$num_cpus Boards=$num_sockets Sockets=$num_sockets CoresPerSocket=$num_cores_per_socket ThreadsPerCore=$num_threads_per_core RealMemory=$total_memory Gres=gpu:8 State=UNKNOWN

PartitionName=gpupart Nodes=$HOSTNAME1,$HOSTNAME2 Default=YES MaxTime=INFINITE State=UP
EOL

```

### Create Main Installation Script

Create a file named `install.sh` with the following content:

```bash
#!/bin/bash

[ -z "$1" ] && echo "Error: MUNGE_KEY_STR is not set." >&2 && exit 1
[ -z "$2" ] && echo "Error: HOSTNAME1 is not set." >&2 && exit 1
[ -z "$3" ] && echo "Error: HOSTNAME2 is not set." >&2 && exit 1
[ -z "$4" ] && echo "Error: HOSTNAME1_IP is not set." >&2 && exit 1
[ -z "$5" ] && echo "Error: HOSTNAME2_IP is not set." >&2 && exit 1

MUNGE_KEY_STR=$1
HOSTNAME1=$2
HOSTNAME2=$3
HOSTNAME1_IP=$4
HOSTNAME2_IP=$5

SCRIPT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)

# Install slurm
sudo apt update && sudo apt upgrade -y
sudo apt install -y slurm-wlm slurm-client munge locales

# Set locale
sudo locale-gen en_GB.UTF-8
sudo update-locale LANG=en_GB.UTF-8
export LANG=en_GB.UTF-8
export LC_ALL=en_GB.UTF-8

current_hostname=$(hostname)
if [ "$current_hostname" == "$HOSTNAME1" ]; then
    echo "$HOSTNAME2_IP $HOSTNAME2" | sudo tee -a /etc/hosts
elif [ "$current_hostname" == "$HOSTNAME2" ]; then
    echo "$HOSTNAME1_IP $HOSTNAME1" | sudo tee -a /etc/hosts
else
    echo "Error: current hostname is not $HOSTNAME1 or $HOSTNAME2" >&2 && exit 1
fi

# ================================================
# munge setup
# ================================================

# Create munge user and group
getent passwd munge
getent group munge
sudo groupadd -r munge
sudo useradd -r -g munge -s /sbin/nologin munge
# Add slurm user to munge group
sudo usermod -aG munge slurm

# Create munge directories and set permissions
for dir in /var/log/munge /var/lib/munge /etc/munge /var/run/munge /run/munge; do
    sudo mkdir -p $dir
    sudo chown -R munge:munge $dir
    sudo chmod -R 755 $dir
done

echo -n "$MUNGE_KEY_STR" | sha256sum | awk '{print $1}' > /etc/munge/munge.key
sudo chmod 400 /etc/munge/munge.key
sudo chown munge:munge /etc/munge/munge.key

# Start munge service
sudo /usr/sbin/munged --force

# Set permissions for munge socket
if [ ! -f /run/munge/munge.socket.2 ]; then
    sudo chmod 777 /run/munge/munge.socket.2
fi

if munge -n | unmunge; then
    echo "Munge is working correctly."
else
    echo "Error: Munge is not working correctly." >&2
    exit 1
fi

# ================================================
# Slurm setup
# ================================================

# Create slurm directories and set permissions
for dir in /etc/slurm /etc/slurm-llnl /var/spool/slurm /var/log/slurm-llnl /var/spool/slurm/ctld /var/lib/slurm-llnl /var/lib/slurm-llnl/slurmctld /var/spool/slurmd /var/lib/slurm-llnl/slurmd /var/log/slurm; do
    sudo mkdir -p $dir
    sudo chown -R slurm:slurm $dir
    sudo chmod -R 755 $dir
done

# Create slurm.conf
bash $SCRIPT_DIR/create_slurm_conf.sh $HOSTNAME1 $HOSTNAME2 $HOSTNAME1_IP $HOSTNAME2_IP > /etc/slurm-llnl/slurm.conf
bash $SCRIPT_DIR/create_gres_conf.sh $current_hostname > /etc/slurm-llnl/gres.conf
sudo ln -s /etc/slurm-llnl/slurm.conf /etc/slurm/slurm.conf
sudo ln -s /etc/slurm-llnl/gres.conf /etc/slurm/gres.conf

echo "Now run the following command to start the slurm services:"
echo "sudo slurmctld -D"
echo "sudo slurmd -D"

```

## Step 3: Installation and Setup

1. Make all scripts executable:

```bash
chmod +x create_gres_conf.sh create_slurm_conf.sh install.sh

```

2. Run the installation script on each node, using the same munge key string for all nodes:

```bash
bash install.sh "your_munge_key_string" hostname1 hostname2 hostname1_ip hostname2_ip

```

Replace:

- `your_munge_key_string`: A secret string used to create the munge key
- `hostname1`: The hostname of the first node (master)
- `hostname2`: The hostname of the second node
- `hostname1_ip`: The IP address of the first node
- `hostname2_ip`: The IP address of the second node

You can find hostnames and IP addresses in `/etc/hosts` on each machine:

```bash
cat etc/hosts
```

Example output:

```bash
127.0.0.1       localhost
::1     localhost ip6-localhost ip6-loopback
fe00::0 ip6-localnet
ff00::0 ip6-mcastprefix
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters
172.18.0.2      d3d512c9aaf6
10.65.0.2       d3d512c9aaf6
10.65.1.2       d3d512c9aaf6
10.65.2.2       d3d512c9aaf6
10.65.3.2       d3d512c9aaf6
10.65.4.2       d3d512c9aaf6
10.65.5.2       d3d512c9aaf6
10.65.6.2       d3d512c9aaf6
10.65.7.2       d3d512c9aaf6
```

## Step 4: Start SLURM Services

### On the Master Node:

Run both commands:

```bash
sudo slurmctld -D
sudo slurmd -D

```

### On Worker Nodes:

Run only the slurmd daemon:

```bash
sudo slurmd -D

```

![Screenshot 2025-03-27 at 5.12.51 PM.png](attachment:f04cc306-4dfd-4355-b170-a19eba46f4bb:Screenshot_2025-03-27_at_5.12.51_PM.png)

## Step 5: Verify Cluster Setup

Check the status of your nodes:

```bash
sinfo 

# Healthy nodes are typically in idle, alloc, or mix states.

```

Test GPU availability across nodes:

```bash
srun --nodes=2 --gres=gpu:1 nvidia-smi -L

```

![Screenshot 2025-03-27 at 5.11.25 PM.png](attachment:d79a7158-5f86-44c5-8c2a-b4091ba69a71:Screenshot_2025-03-27_at_5.11.25_PM.png)

## Step 6: Submit a Test Job

Create a test batch script named `test_batch.sh`:

```bash
#!/bin/bash
#SBATCH --partition=gpupart
#SBATCH --nodes=2
#SBATCH --time=00:02:00
#SBATCH --output=test_simple_%j.out

srun hostname

```

Submit the job:

```bash
sbatch test_batch.sh

```

Check the output file `test_simple_*.out` to verify that the job ran successfully.

![Screenshot 2025-03-27 at 3.22.25 PM.png](attachment:8b42e131-973e-4049-930b-a0c545d43810:Screenshot_2025-03-27_at_3.22.25_PM.png)

## Troubleshooting

If you encounter issues:

1. Check the SLURM logs in `/var/log/slurm-llnl/`
2. Ensure Munge is running correctly on all nodes
3. Verify network connectivity between nodes
4. Make sure hostnames and IP addresses are correctly configured


## Step 5: Clean up

If you no longer need your Cluster, make sure you return to the [Instant Clusters page](https://www.runpod.io/console/cluster) and delete your Cluster to avoid incurring extra charges.

:::note

You can monitor your cluster usage and spending using the **Billing Explorer** at the bottom of the [Billing page](https://www.runpod.io/console/user/billing) section under the **Cluster** tab.

:::

## Next steps

Now that you've successfully deployed and tested a PyTorch distributed application on an Instant Cluster, you can:

- **Adapt your own PyTorch code** to run on the Cluster by modifying the distributed initialization in your scripts.
- **Scale your training** by adjusting the number of Pods in your Cluster to handle larger models or datasets.
- **Try different frameworks** like [Axolotl](/instant-clusters/axolotl) for fine-tuning large language models.
- **Optimize performance** by experimenting with different distributed training strategies like Data Parallel (DP), Distributed Data Parallel (DDP), or Fully Sharded Data Parallel (FSDP).

For more information on distributed training with PyTorch, refer to the [PyTorch Distributed Training documentation](https://pytorch.org/tutorials/beginner/dist_overview.html).


For more information and examples, check:
https://github.com/pandyamarut/dotfiles/tree/master/runpod/slurm_example