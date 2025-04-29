---
title: Pod environment variables
description: "Configure and manage your pods with these essential environment variables, including pod ID, API key, host name, GPU and CPU count, public IP, SSH port, data center ID, volume ID, CUDA version, current working directory, PyTorch version, and public SSH key."
sidebar_position: 4
---

You can store the following environment variables in your Pods.

| Variable              | Description                                                                               |
| :-------------------- | :---------------------------------------------------------------------------------------- |
| `RUNPOD_POD_ID`       | The unique identifier for your pod.                                                       |
| `RUNPOD_API_KEY`      | Used to make RunPod API calls to the specific pod. It's limited in scope to only the pod. |
| `RUNPOD_POD_HOSTNAME` | Name of the host server the pod is running on.                                            |
| `RUNPOD_GPU_COUNT`    | Number of GPUs available to the pod.                                                      |
| `RUNPOD_CPU_COUNT`    | Number of CPUs available to the pod.                                                      |
| `RUNPOD_PUBLIC_IP`    | If available, the publicly accessible IP for the pod.                                     |
| `RUNPOD_TCP_PORT_22`  | The public port SSH port 22.                                                              |
| `RUNPOD_ALLOW_IP`     | You can whitelist specific IPs to access your pod, like 192.168.0.12/32, 172.16.0.16/32.  |
| `RUNPOD_DC_ID`        | The data center where the pod is located.                                                 |
| `RUNPOD_VOLUME_ID`    | The ID of the volume connected to the pod.                                                |
| `CUDA_VERSION`        | The installed CUDA version.                                                               |
| `PWD`                 | Current working directory.                                                                |
| `PYTORCH_VERSION`     | Installed PyTorch Version.                                                                |
| `PUBLIC_KEY`          | The SSH public keys to access the pod over SSH.                                           |
