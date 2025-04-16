---
title: "Secure Cloud partner requirements"
---

# RunPod Secure Cloud partner requirements (2025)

# Introduction

This document outlines the specifications required to be a RunPod secure cloud partner. These requirements establish the baseline, however for new partners, RunPod will perform a due diligence process prior to selection encompassing business health, prior performance, and corporate alignment.

Meeting these technical and operational requirements does not guarantee selection.

_New partners_

- All specifications will apply to new partners on November 1, 2024.

_Existing partners_

- Hardware specifications (Sections 1, 2, 3, 4) will apply to new servers deployed by existing partners on December 15, 2024.
- Compliance specification (Section 5) will apply to existing partners on April 1, 2025.

A new revision will be released in October 2025 on an annual basis. Minor mid-year revisions may be made as needed to account for changes in market, roadmap, or customer needs.

## Minimum deployment size

100kW of GPU server capacity is the minimum deployment size.

## 1. Hardware Requirements

### 1.1 GPU Compute Server Requirements

#### GPU Requirements

NVIDIA GPUs no older than Ampere generation.

### CPU

| Requirement      | Specification                                                                                                                          |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Cores            | Minimum 4 physical CPU cores per GPU + 2 for system operations                                                                         |
| Clock Speed      | Minimum 3.5 GHz base clock, with boost clock of at least 4.0 GHz                                                                       |
| Recommended CPUs | AMD EPYC 9654 (96 cores, up to 3.7 GHz), Intel Xeon Platinum 8490H (60 cores, up to 4.8 GHz), AMD EPYC 9474F (48 cores, up to 4.1 GHz) |

### Bus Bandwidth

| GPU VRAM          | Minimum Bandwidth |
| ----------------- | ----------------- |
| 8/10/12/16 GB     | PCIe 3.0 x16      |
| 20/24/32/40/48 GB | PCIe 4.0 x16      |
| 80 GB             | PCIe 5.0 x16      |

Exceptions list:

1. PCIe 4.0 x16 - A100 80GB PCI-E

### Memory

Main system memory must have ECC.

| GPU Configuration | Recommended RAM  |
| ----------------- | ---------------- |
| 8x 80 GB VRAM     | >= 2048 GB DDR5  |
| 8x 40/48 GB VRAM  | >= 1024 GB DDR5  |
| 8x 24 GB VRAM     | >= 512 GB DDR4/5 |
| 8x 16 GB VRAM     | >= 256 GB DDR4/5 |

### Storage

There are two types of required storage, boot and working arrays. These are two separate arrays of hard drives which provide isolation between host operating system activity (boot array) and customer workloads (working array).

### Boot array

| **Requirement**                    | **Specification**         |
| ---------------------------------- | ------------------------- |
| Redundancy                         | >= 2n redundancy (RAID 1) |
| Size                               | >= 500GB (Post RAID)      |
| Disk Perf - Sequential read        | 2,000 MB/s                |
| Disk Perf - Sequential write       | 2,000 MB/s                |
| Disk Perf - Random Read (4K QD32)  | 100,000 IOPS              |
| Disk Perf - Random Write (4K QD32) | 10,000 IOPS               |

### Working array

| Component                          | Requirement                                                                         |
| ---------------------------------- | ----------------------------------------------------------------------------------- |
| Redundancy                         | >= 2n redundancy (RAID 1 or RAID 10)                                                |
| Size                               | 2 TB+ NVME per GPU for 24/48 GB GPUs; 4 TB+ NVME per GPU for 80 GB GPUs (Post RAID) |
| Disk Perf - Sequential read        | 6,000 MB/s                                                                          |
| Disk Perf - Sequential write       | 5,000 MB/s                                                                          |
| Disk Perf - Random Read (4K QD32)  | 400,000 IOPS                                                                        |
| Disk Perf - Random Write (4K QD32) | 40,000 IOPS                                                                         |

### 1.2 Storage Cluster Requirements

Each datacenter must have a storage cluster which provides shared storage between all GPU servers. The hardware is provided by the partner, storage cluster licensing is provided by RunPod. All storage servers must be accessible by all GPU compute machines.

### Baseline Cluster Specifications

| Component            | Requirement                         |
| -------------------- | ----------------------------------- |
| Minimum Servers      | 4                                   |
| Minimum Storage size | 200 TB raw (100 TB usable)          |
| Connectivity         | 200 Gbps between servers/data-plane |
| Network              | Private subnet                      |

### Server Specifications

| Component | Requirement                                                                                                            |
| --------- | ---------------------------------------------------------------------------------------------------------------------- |
| CPU       | AMD Genoa: EPYC 9354P (32-Core, 3.25-3.8 GHz), EPYC 9534 (64-Core, 2.45-3.7 GHz), or EPYC 9554 (64-Core, 3.1-3.75 GHz) |
| RAM       | 256 GB or higher, DDR5/ECC                                                                                             |

### Storage Cluster Server Boot Array

| Requirement                        | Specification             |
| ---------------------------------- | ------------------------- |
| Redundancy                         | >= 2n redundancy (RAID 1) |
| Size                               | >= 500GB (Post RAID)      |
| Disk Perf - Sequential read        | 2,000 MB/s                |
| Disk Perf - Sequential write       | 2,000 MB/s                |
| Disk Perf - Random Read (4K QD32)  | 100,000 IOPS              |
| Disk Perf - Random Write (4K QD32) | 10,000 IOPS               |

### Storage Cluster Server Working Array

| Component                          | Requirement                                                                      |
| ---------------------------------- | -------------------------------------------------------------------------------- |
| Redundancy                         | None (JBOD) - RunPod will assemble into array. 7 to 14TB disk sizes recommended. |
| Disk Perf - Sequential read        | 6,000 MB/s                                                                       |
| Disk Perf - Sequential write       | 5,000 MB/s                                                                       |
| Disk Perf - Random Read (4K QD32)  | 400,000 IOPS                                                                     |
| Disk Perf - Random Write (4K QD32) | 40,000 IOPS                                                                      |

Servers should have spare disk slots for future expansion without deployment of new servers.

Even distribution among machines (e.g., 7 TB x 8 disks x 4 servers = 224 TB total space).

### Dedicated Metadata Server for Large-Scale Clusters

Once a storage cluster exceeds 90% single core CPU on the leader node during peak hours, a dedicated metadata server is required. Metadata tracking is a single process operation, and single threaded performance is the most important metric.

| Component | Requirement                                          |
| --------- | ---------------------------------------------------- |
| CPU       | AMD Ryzen Threadripper 7960X (24-Cores, 4.2-5.3 GHz) |
| RAM       | 128 GB or higher, DDR5/ECC                           |
| Boot disk | >= 500 GB, RAID 1                                    |

## 2. Software Requirements

### Operating System

Ubuntu Server 22.04 LTS
Linux kernel 6.5.0-15 or later production version (Ubuntu HWE Kernel)
SSH remote connection capability

### BIOS Configuration

IOMMU disabled for non-VM systems
Update server BIOS/firmware to latest stable version

### Drivers and Software

| Component          | Requirement                                   |
| ------------------ | --------------------------------------------- |
| NVIDIA Drivers     | Version 550.54.15 or later production version |
| CUDA               | Version 12.4 or later production version      |
| NVIDIA Persistence | Activated for GPUs of 48 GB or more           |

### HGX SXM System Addendum

- NVIDIA Fabric Manager installed, activated, running, and tested
- Fabric Manager version must match NVIDIA drivers and Kernel drivers headers
- CUDA Toolkit, NVIDIA NSCQ, and NVIDIA DCGM installed
- Verify NVLINK switch topology using nvidia-smi and dcgmi
- Ensure SXM performance using dcgmi diagnostic tool

## 3. Data Center Power Requirements

| Requirement             | Specification                                                                                                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Utility Feeds           | - Minimum of two independent utility feeds from separate substations <br /> - Each feed capable of supporting 100% of the data center's power load<br />- Automatic transfer switches (ATS) for seamless switchover between feeds with UL 1008 certification (or regional equivalent)                                                                                                                                                     |
| UPS                     | - N+1 redundancy for UPS systems<br />- Minimum of 15 minutes runtime at full load                                                                                                                                                                                                                                                                                                                                                        |
| Generators              | - N+1 redundancy for generator systems<br />- Generators must be able to support 100% of the data center's power load<br />- Minimum of 48 hours of on-site fuel storage at full load<br />- Automatic transfer to generator power within 10 seconds of utility failure                                                                                                                                                                   |
| Power Distribution      | - Redundant power distribution paths (2N) from utility to rack level<br />- Redundant Power Distribution Units (PDUs) in each rack<br />- Remote power monitoring and management capabilities at rack level                                                                                                                                                                                                                               |
| Testing and Maintenance | - Monthly generator tests under load for a minimum of 30 minutes<br />- Quarterly full-load tests of the entire backup power system, including UPS and generators<br />- Annual full-facility power outage test (coordinated with RunPod)<br />- Regular thermographic scanning of electrical systems<br />- Detailed maintenance logs for all power equipment<br />- 24/7 on-site facilities team for immediate response to power issues |
| Monitoring and Alerting | - Real-time monitoring of all power systems<br />- Automated alerting for any power anomalies or threshold breaches                                                                                                                                                                                                                                                                                                                       |
| Capacity Planning       | - Maintain a minimum of 20% spare power capacity for future growth<br />- Annual power capacity audits and forecasting                                                                                                                                                                                                                                                                                                                    |
| Fire Suppression        | - Maintain datacenter fire suppression systems in compliance with NFPA 75 and 76 (or regional equivalent)                                                                                                                                                                                                                                                                                                                                 |

## 4. Network Requirements

| Requirement             | Specification                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Internet Connectivity   | - Minimum of two diverse and redundant internet circuits from separate providers<br />- Each connection should be capable of supporting 100% of the data center's bandwidth requirements<br />- BGP routing implemented for automatic failover between circuit providers<br />- 100 Gbps minimum total bandwidth capacity                                                      |
| Core Infrastructure     | - Redundant core switches in a high-availability configuration (e.g., stacking, VSS, or equivalent)                                                                                                                                                                                                                                                                            |
| Distribution Layer      | - Redundant distribution switches with multi-chassis link aggregation (MLAG) or equivalent technology<br />- Minimum 100 Gbps uplinks to core switches                                                                                                                                                                                                                         |
| Access Layer            | - Redundant top-of-rack switches in each cabinet<br />- Minimum 100 Gbps server connections for high-performance compute nodes                                                                                                                                                                                                                                                 |
| DDoS Protection         | - Must have a DDoS mitigation solution, either on-premises or on-demand cloud-based                                                                                                                                                                                                                                                                                            |
| Quality of service      | Maintain network performance within the following parameters:<br /> * Network utilization levels must remain below 80% on any link during peak hours<br /> * Packet loss must not exceed 0.1% (1 in 1000) on any network segment<br /> * P95 round-trip time (RTT) within the data center should not exceed 4ms<br /> * P95 jitter within the datacenter should not exceed 3ms |
| Testing and Maintenance | - Regular failover testing of all redundant components (minimum semi-annually)<br />- Annual full-scale disaster recovery test<br />- Maintenance windows for network updates and patches, with minimal service disruption scheduled at least 1 week in advance                                                                                                                |
| Capacity Planning       | - Maintain a minimum of 40% spare network capacity for future growth<br />- Regular network performance audits and capacity forecasting                                                                                                                                                                                                                                        |

## 5. Compliance Requirements

To qualify as a RunPod secure cloud partner, the parent organization must adhere to at least one of the following compliance standards:

- SOC 2 Type I (System and Organization Controls)
- ISO/IEC 27001:2013 (Information Security Management Systems)
- PCI DSS (Payment Card Industry Data Security Standard)

Additionally, partners must comply with the following operational standards:

| Requirement       | Description                                                                                                                                                                                            |
| ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Data Center Tier  | Abide by Tier III+ Data Center Standards                                                                                                                                                               |
| Security          | 24/7 on-site security and technical staff                                                                                                                                                              |
| Physical security | RunPod servers must be held in an isolated secure rack or cage in an area that is not accessible to any non-partner or approved DC personnel. Physical access to this area must be tracked and logged. |
| Maintenance       | All maintenance resulting in disruption or downtime must be scheduled at least 1 week in advance. Large disruptions must be coordinated with RunPod at least 1 month in advance.                       |

RunPod will review evidence of:

- Physical access logs
- Redundancy checks
- Refueling agreements
- Power system test results and maintenance logs
- Power monitoring and capacity planning reports
- Network infrastructure diagrams and configurations
- Network performance and capacity reports
- Security audit results and incident response plans

For detailed information on maintenance scheduling, power system management, and network operations, please refer to our documentation.

### Release log

- 2025-11-01: Initial release.
