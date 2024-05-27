---
title: "Requirements"
description: "Meet the minimum requirements for scalable AI cloud infrastructure: Ubuntu Server 22.04 LTS, remote SSH access, Nvidia drivers, CUDA Toolkit, and more."
---

The following requirements are minimal and are subject to change.

## Software specifications

- Ubuntu Server 22.04 LTS:
  - Basic Linux proficiency.
  - Ability to remotely connect via SSH.

### Operating system

- Ubuntu Server 22.04 LTS
  - Use the same file as 22.04, but select HWE during install.
  - That way, Kernel 6.5 is installed (please replace by any more recent production version if available).

### BIOS

- For non-VM systems, make sure IOMMU is disabled in the BIOS.
- Another good practice is to update the server BIOS to the latest stable version when facing compatibility issues.

### Drivers

- Nvidia drivers 550.XX.XX (please replace by any more recent production version if available).
  - Never use beta or new feature branch drivers except if you have been instructed otherwise.
- CUDA 12.4 (please replace by any more recent production version if available).
- Nvidia Persistence should be activated for GPUs of 48 GB or more.

### HGX SXM Systems

- Nvidia Fabric Manager needs to be installed, activated, running, and tested.
  - Mandatory: Fabric Manager version = Nvidia drivers version = Kernel drivers headers.
  - A p2p bandwidth test should be passed.
- ECC should be activated for system memory.
- CUDA Toolkit, Nvidia NSCQ and Nvidia DCGM need to be installed.
- Ensure the topology of the NVLINK switch is right by leveraging nvidia-smi and dcgmi.
  - Ensure the SXM is performing well leveraging the dcgmi diagnostic tool.

## Minimal Secure Cloud Specifications

### GPU Models

- Latest Nvidia GPUs are required with models of at least 30xx or RTX A4000 or more recent.
- Demand is highest for SXM 80 GB, PCIe 80 GB, Ada 6000 48 GB, Ada 5000 32 GB, 4090 24 GB, L4 24 GB, A5000 24 GB, and Ada 4000.

### Quantity

- **Option 1**: At least 100 GPUs in total, each with a minimum of 12 GB VRAM.
- **Option 2**: At least 32 GPUs in total, each with a minimum of 80 GB of VRAM.
- **Option 3**: For Secure Cloud eligibility, 500x GPUs are required at minimum.

We also require 2 GPU per server at minimum.
8x configuration is recommended.

### CPU

- Minimum of 4 Physical CPU Cores per GPU + 2 for system operations.
- You must prioritize CPU core clock as fast as possible over more providing more cores. Base core clock must be above 3.0 GHz.
- For example, a 24-cores CPU clocking at 5.0 GHz is preferred to a 128-cores CPU clocking at 3.0 GHz for a 4x GPU configuration.
- Genoa CPU are often a good option for these reasons. The F version is preferred, and is needed for AMD Milan systems.

### Bus Bandwidth

- Minimum banwitdh per GPU is PCIe 3.0 x16 for 8 GB | 10 GB | 12 GB | 16 GB GPUs.
- Minimum banwitdh per GPU is PCIe 4.0 x16 for 20 GB | 24 GB | 32 GB | 40 GB | 48 GB | 80 GB GPUs.
- Minimum banwitdh per GPU is PCIe 5.0 x16 for Hopper and Blackwell GPUs.

### Memory

- Your RAM should at minimum equals between 1.5 times to 2 times your total VRAM of all GPUs + 12 GB for system operations.
  - 1536 GB+ of RAM recommended for 8x 80 GB VRAM GPU configurations.
  - 1024 GB+ of RAM recommended for 8x 48 GB VRAM GPU configurations.
  -  512 GB+ of RAM recommended for 8x 24 GB VRAM GPU configurations.
  -  256 GB+ of RAM recommended for 8x 16 GB VRAM GPU configurations.
- DDR4 minimum. DDR5 is recommended.
- Memory should be ECC compatible.

### Storage

- Absolute minimum of 1 TB+ of NVME space per GPU for each server (excluding the OS drives). Recommended storage is 2 TB+ of NVME space per GPU for 24 GB and 48 GB GPU, and is 4 TB+ of NVME space per GPU for 80 GB GPUs.
  - 32TB+ recommended for 8x 80 GB VRAM GPU configurations.
  - 16TB+ recommended for 8x 48 GB VRAM GPU configurations.
  -  8TB+ recommended for all others VRAM configurations.
- We recommend 2 smaller NVME disk in RAID 1 for the operating system (2x 500 GB or 2x 1 TB is fine).
- For the data drives, keep one larger NVME unpartitioned and unformatted.
  - If several data drives are provided, you need to create a LVM volume for those.
  - For higher number of drives, Raid 10 is the ideal scenario.
  - When installing RunPod, you will have to mention that LVM or Raid volume.
- A read/write speed of 3,000 mbps is required.
  - PCIe 5.0 x4 NVME SSD are an asset for 80 GB and newer 48 GPUs.
- Ability to deploy network storage clusters if needed.

### Networking

- 10 gbps Bidirectional Internet Speed as backbone.
  - ISP access of minimum 1 gbps symmetrical per server.
- Static Public IP.
  - A single IP can be shared between up between groups of up to 20 servers.
  - Find how to activate Public IP [here](https://www.runpod.io/console/host/docs/config-options).
- Access and ability to port forward.
  - Minimum of 30 ports forwarded per GPU per server. For an 8x GPU server, 300 ports forwarded is recommended.
- Minimum interconnect speed of 25 gbps between servers.
  - Recommended interconnect speed of 50 gbps between servers.
  - Recommended interconnect speed of 200 gbps between servers for 80 GB GPUs.
  - A100 HGX SXM4 80 GB and H100 HGX SXM5 80 GB see higher demand if on high-speed InfiniBand that are 1600 gbps to 3200 gbps.

## Compliance

- Abide by Tier III+ Datacenter Standards.
- Robust Uninterruptible Power Supply and backup generators.
- Switches and PDU redundancy.
- Internet Service Provider redundancy.
- 24/7 on-site security and technical staff.
- All maintenance or downtime need to be scheduled one week in advance. See more about it [here](https://docs.runpod.io/hosting/maintenance-and-reliability).

## Most importantly

- The ability to scale GPU supply over time.
- Interest for less purely transactional relationship, and eagerness for a partnership centered around building the future of AI Cloud Infrastructure.
