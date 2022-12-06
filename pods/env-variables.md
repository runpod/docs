---
description: >-
  Environment variables are accessible within in a pod. These are the variables
  that are set by default.
---

# Env Variables

| Variable              | Description                                                                               |
| --------------------- | ----------------------------------------------------------------------------------------- |
| RUNPOD\_POD\_ID       | The unique identifier for your pod.                                                       |
| RUNPOD\_API\_KEY      | Used to make RunPod API calls to the specific pod. It's limited in scope to only the pod. |
| RUNPOD\_POD\_HOSTNAME | Name of the host server the pod is running on.                                            |
| RUNPOD\_GPU\_COUNT    | Number of GPUs available to the pod.                                                      |
| PWD                   | current working directory                                                                 |
| PYTORCH\_VERSION      | Installed PyTorch Version                                                                 |
| PUBLIC\_KEY           | The SSH public key to access the pod over SSH.                                            |

