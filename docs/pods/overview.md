---
title: Overview
description: "Run container-based workloads as pods with GPU acceleration, persistent storage, and customizable configurations to meet your computing needs."
sidebar_position: 1
---

# Pods overview

Pods are containerized computing environments that provide on-demand access to GPU and CPU resources. Each Pod runs as an isolated container instance that you can customize for your specific workloads.

## What are Pods?

Pods are virtual computing environments based on container technology. They provide flexible access to GPU and CPU resources within isolated runtime environments. Each Pod comes with persistent storage options and customizable configurations, all accessible through web-based interfaces. When you deploy a Pod, you're essentially spinning up a container with your preferred software stack, connected to the hardware resources required for your workload.

## Key components

Each Pod consists of these core components:

- **Container environment**: An Ubuntu Linux-based container that can run almost any compatible software.
- **Container volume**: Houses the operating system and temporary storage (volatile and cleared when the Pod stops).
- **Disk volume**: Permanent storage preserved for the duration of your Pod's lease.
- **Hardware resources**: Allocated vCPU, system RAM, and optional GPUs based on your selection.
- **Network connectivity**: A proxy connection enabling web access to any exposed port on your container.
- **Unique identifier**: Each Pod receives a dynamic ID (e.g., `2s56cp0pof1rmt`) for management and access.

## Storage options

Pods offer three [storage types](/storage/types) to match different use cases:

1. **Container volume**: Temporary storage within the container itself. This storage is cleared when the Pod stops.
2. **Disk volume**: Storage that persists between Pod restarts, similar to an attached hard drive.
3. **Network volume**: Portable storage that can be moved between machines and persists even after Pod deletion.

## Deployment options

You can deploy Pods in several ways:

- [From a template](https://docs.runpod.io/pods/templates/overview): Pre-configured environments for quick setup of common workflows.
- **Custom containers**: Pull from any compatible container registry such as Docker Hub, GitHub Container Registry, or Amazon ECR.
- **Custom images**: Build and deploy your own container images.

:::note

When building images for RunPod on Apple Silicon, use the flag `--platform linux/amd64` to ensure compatibility. RunPod currently only supports the `linux/amd64` architecture.

:::

## Accessing your pod

Once deployed, you can access your Pod through:

- **SSH**: Direct command-line access for development and management.
- **Web proxy**: HTTP access to exposed web services via URLs in the format `https://[pod-id]-[port].proxy.runpod.net`.
- **API**: Programmatic access and control through the RunPod API.

## Customization options

Pods offer extensive customization to match your specific requirements.

You can select your preferred [GPU type](/references/gpu-types) and quantity, adjust system disk size, and specify your container image.

Additionally, you can configure custom start commands, set [environment variables](/pods/references/environment-variables), define [exposed HTTP/TCP ports](/pods/configuration/expose-ports), and implement various [storage configurations](/storage/types) to optimize your Pod for your specific workload.

## Getting started

To start using Pods:

1. [Deploy your first Pod](/get-started) using this tutorial.
2. [Choose a Pod](/pods/choose-a-pod) based on your resource needs.
3. [Learn how to start, stop, and terminate your Pod](/pods/manage-pods).
4. [Connect to your Pod](/pods/connect-to-a-pod) using SSH, JupyterLab, or the web terminal.

For quicker deployment, start with a [template](/pods/templates/overview) that includes pre-configured environments for common workflows.
