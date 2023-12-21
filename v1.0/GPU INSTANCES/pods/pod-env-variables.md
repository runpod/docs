---
title: "Pod Environment Variables"
slug: "pod-env-variables"
excerpt: "Environment variables are accessible within in a pod. You can access this page by clicking on the menu icon and Edit Pod."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Mar 28 2023 22:52:14 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Oct 23 2023 18:21:14 GMT+0000 (Coordinated Universal Time)"
---

| Variable            | Description                                                                               |
| :------------------ | :---------------------------------------------------------------------------------------- |
| RUNPOD_POD_ID       | The unique identifier for your pod.                                                       |
| RUNPOD_API_KEY      | Used to make RunPod API calls to the specific pod. It's limited in scope to only the pod. |
| RUNPOD_POD_HOSTNAME | Name of the host server the pod is running on.                                            |
| RUNPOD_GPU_COUNT    | Number of GPUs available to the pod.                                                      |
| RUNPOD_CPU_COUNT    | Number of CPUs available to the pod.                                                      |
| RUNPOD_PUBLIC_IP    | If available, the publicly accessible IP for the pod.                                     |
| RUNPOD_TCP_PORT_22  | The public port SSH port 22.                                                              |
| RUNPOD_DC_ID        | The data center where the pod is located.                                                 |
| RUNPOD_VOLUME_ID    | The ID of the volume connected to the pod.                                                |
| CUDA_VERSION        | The installed CUDA version.                                                               |
| PWD                 | Current working directory.                                                                |
| PYTORCH_VERSION     | Installed PyTorch Version.                                                                |
| PUBLIC_KEY          | The SSH public keys to access the pod over SSH.                                           |
