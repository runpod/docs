---
title: "Create Pod"
slug: "create-pod"
excerpt: "Create a Pod which starts with a container image."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Mar 28 2023 22:55:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Aug 19 2023 04:38:03 GMT+0000 (Coordinated Universal Time)"
---

A Pod consists of the following resources:

- 0 or more GPUs - A pod can be started with 0 GPUs for the purposes of accessing data, though GPU-accelerated functions and web services will fail to work.
- vCPU
- System RAM
- Container Disk
  - It's temporary and removed when the pod is stopped or terminated.
  - You only pay for the container disk when the pod is running.
- Instance Volume
  - Data persists even when you reset or stop a Pod. Volume is removed when the Pod is terminated.
  - You pay for volume storage even when the Pod is stopped.

## Create On-Demand Pod

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podFindAndDeployOnDemand( input: { cloudType: ALL, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Tensorflow\", imageName: \"runpod/tensorflow\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"rn51hunbpgtltcpac3ol\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
```graphql
mutation {
  podFindAndDeployOnDemand(
    input: {
      cloudType: ALL
      gpuCount: 1
      volumeInGb: 40
      containerDiskInGb: 40
      minVcpuCount: 2
      minMemoryInGb: 15
      gpuTypeId: "NVIDIA RTX A6000"
      name: "RunPod Tensorflow"
      imageName: "runpod/tensorflow"
      dockerArgs: ""
      ports: "8888/http"
      volumeMountPath: "/workspace"
      env: [{ key: "JUPYTER_PASSWORD", value: "rn51hunbpgtltcpac3ol" }]
    }
  ) {
    id
    imageName
    env
    machineId
    machine {
      podHostId
    }
  }
}
```
```json Output | JSON
{
  "data": {
    "podFindAndDeployOnDemand": {
      "id": "50qynxzilsxoey",
      "imageName": "runpod/tensorflow",
      "env": [
        "JUPYTER_PASSWORD=rn51hunbpgtltcpac3ol"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "50qynxzilsxoey-64410065"
      }
    }
  }
}
```
<!-- dprint-ignore-end -->

## Create Spot Pod

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podRentInterruptable( input: { bidPerGpu: 0.2, cloudType: SECURE, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Pytorch\", imageName: \"runpod/pytorch\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"vunw9ybnzqwpia2795p2\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
```graphql
mutation {
  podRentInterruptable(
    input: {
      bidPerGpu: 0.2
      cloudType: SECURE
      gpuCount: 1
      volumeInGb: 40
      containerDiskInGb: 40
      minVcpuCount: 2
      minMemoryInGb: 15
      gpuTypeId: "NVIDIA RTX A6000"
      name: "RunPod Pytorch"
      imageName: "runpod/pytorch"
      dockerArgs: ""
      ports: "8888/http"
      volumeMountPath: "/workspace"
      env: [{ key: "JUPYTER_PASSWORD", value: "vunw9ybnzqwpia2795p2" }]
    }
  ) {
    id
    imageName
    env
    machineId
    machine {
      podHostId
    }
  }
}
```
```json Output | JSON
{
  "data": {
    "podRentInterruptable": {
      "id": "fkjbybgpwuvmhk",
      "imageName": "runpod/pytorch",
      "env": [
        "JUPYTER_PASSWORD=vunw9ybnzqwpia2795p2"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "fkjbybgpwuvmhk-64410065"
      }
    }
  }
}
```
<!-- dprint-ignore-end -->
