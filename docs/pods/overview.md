---
title: Overview
description: Learn about Pods.
sidebar_position: 1
---

Pods are running container instances. You can pull an instance from a container registry such as Docker Hub, GitHub Container Registry, Amazon Elastic Container Registry, or another compatible registry. 

:::note

When building an image for RunPod, use the flag `--platform linux/amd64,linux/arm64` to ensure your image is compatible with the platform.

:::

You can jump straight to a running Pod by starting from a [template](/pods/templates/overview). For more customization, you can configure the following:

- [GPU Type](/references/gpu-types) and Quantity
- System Disk Size
- Start Command
- [Environment Variables](/pods/references/environment-variables)
- [Expose HTTP/TCP ports](/pods/configuration/expose-ports)
- [Persistent Storage Options](/category/network-storage)

To get started, see how to [Choose a Pod](/pods/choose-a-pod) then see the instructions on [Manage Pods](/pods/manage-pods).
