---
title: "Manage Pods"
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Authentication

RunPod uses API Keys for all API requests.
Go to [Settings](https://www.runpod.io/console/user/settings) to manage your API keys.

## GraphQL API Spec

If you need detailed queries, mutations, fields, and inputs, look at the [GraphQL Spec](https://graphql-spec.runpod.io/).

## Create Pods

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

### Create On-Demand Pod

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podFindAndDeployOnDemand( input: { cloudType: ALL, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Tensorflow\", imageName: \"runpod/tensorflow\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"rn51hunbpgtltcpac3ol\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
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
  </TabItem>
</Tabs>

### Create Spot Pod

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podRentInterruptable( input: { bidPerGpu: 0.2, cloudType: SECURE, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Pytorch\", imageName: \"runpod/pytorch\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"vunw9ybnzqwpia2795p2\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
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
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
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
  </TabItem>
</Tabs>

## Start Pods

### Start On-Demand Pod

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podResume( input: { podId: \"inzk6tzuz833h5\", gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  podResume(input: {podId: "inzk6tzuz833h5", gpuCount: 1}) {
    id
    desiredStatus
    imageName
    env
    machineId
    machine {
      podHostId
    }
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "podResume": {
      "id": "inzk6tzuz833h5",
      "desiredStatus": "RUNNING",
      "imageName": "runpod/tensorflow",
      "env": [
        "JUPYTER_PASSWORD=ywm4c9r15j1x6gfrds5n"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "inzk6tzuz833h5-64410065"
      }
    }
  }
}
```
  </TabItem>
</Tabs>

### Start Spot Pod

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podBidResume( input: { podId: \"d62t7qg9n5vtan\", bidPerGpu: 0.2, gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  podBidResume(input: {podId: "d62t7qg9n5vtan", bidPerGpu: 0.2, gpuCount: 1}) {
    id
    desiredStatus
    imageName
    env
    machineId
    machine {
      podHostId
    }
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "podBidResume": {
      "id": "d62t7qg9n5vtan",
      "desiredStatus": "RUNNING",
      "imageName": "runpod/tensorflow",
      "env": [
        "JUPYTER_PASSWORD=vunw9ybnzqwpia2795p2"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "d62t7qg9n5vtan-64410065"
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## Stop Pods

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podStop(input: {podId: \"riixlu8oclhp\"}) { id desiredStatus } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  podStop(input: {podId: "riixlu8oclhp"}) {
    id
    desiredStatus
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "podStop": {
      "id": "riixlu8oclhp",
      "desiredStatus": "EXITED"
    }
  }
}
```
  </TabItem>
</Tabs>

## List Pods

### List all Pods

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query Pods { myself { pods { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
query Pods {
  myself {
    pods {
      id
      name
      runtime {
        uptimeInSeconds
        ports {
          ip
          isIpPublic
          privatePort
          publicPort
          type
        }
        gpus {
          id
          gpuUtilPercent
          memoryUtilPercent
        }
        container {
          cpuPercent
          memoryPercent
        }
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "myself": {
      "pods": [
        {
          "id": "ldl1dxirsim64n",
          "name": "RunPod Pytorch",
          "runtime": {
            "uptimeInSeconds": 3931,
            "ports": [
              {
                "ip": "100.65.0.101",
                "isIpPublic": false,
                "privatePort": 8888,
                "publicPort": 60141,
                "type": "http"
              }
            ],
            "gpus": [
              {
                "id": "GPU-e0488b7e-6932-795b-a125-4472c16ea72c",
                "gpuUtilPercent": 0,
                "memoryUtilPercent": 0
              }
            ],
            "container": {
              "cpuPercent": 0,
              "memoryPercent": 0
            }
          }
        },
        {
          "id": "hpvdausak8xb00",
          "name": "hpvdausak8xb-BG",
          "runtime": {
            "uptimeInSeconds": 858937,
            "ports": null,
            "gpus": [
              {
                "id": "GPU-2630fe4d-a75d-a9ae-8c15-6866088dfae2",
                "gpuUtilPercent": 100,
                "memoryUtilPercent": 100
              }
            ],
            "container": {
              "cpuPercent": 0,
              "memoryPercent": 1
            }
          }
        }
      ]
    }
  }
}
```
  </TabItem>
</Tabs>

### Get Pod by ID

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query Pod { pod(input: {podId: \"ldl1dxirsim64n\"}) { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
query Pod {
  pod(input: {podId: "ldl1dxirsim64n"}) {
    id
    name
    runtime {
      uptimeInSeconds
      ports {
        ip
        isIpPublic
        privatePort
        publicPort
        type
      }
      gpus {
        id
        gpuUtilPercent
        memoryUtilPercent
      }
      container {
        cpuPercent
        memoryPercent
      }
    }
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "pod": {
      "id": "ldl1dxirsim64n",
      "name": "RunPod Pytorch",
      "runtime": {
        "uptimeInSeconds": 11,
        "ports": [
          {
            "ip": "100.65.0.101",
            "isIpPublic": false,
            "privatePort": 8888,
            "publicPort": 60141,
            "type": "http"
          }
        ],
        "gpus": [
          {
            "id": "GPU-e0488b7e-6932-795b-a125-4472c16ea72c",
            "gpuUtilPercent": 0,
            "memoryUtilPercent": 0
          }
        ],
        "container": {
          "cpuPercent": 0,
          "memoryPercent": 0
        }
      }
    }
  }
}
```
  </TabItem>
</Tabs>

## List GPU types

When creating a Pod, you will need to pass GPU type IDs.
These queries can help find all GPU types, their IDs, and other attributes like VRAM.

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query GpuTypes { gpuTypes { id displayName memoryInGb } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GpuTypes {
  gpuTypes {
    id
    displayName
    memoryInGb
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "gpuTypes": [
      {
        "id": "NVIDIA GeForce RTX 3070",
        "displayName": "RTX 3070",
        "memoryInGb": 8
      },
      {
        "id": "NVIDIA GeForce RTX 3080",
        "displayName": "RTX 3080",
        "memoryInGb": 10
      },
      {
        "id": "NVIDIA RTX A6000",
        "displayName": "RTX A6000",
        "memoryInGb": 48
      }
    ]
  }
}
```
  </TabItem>
</Tabs>

### Get GPU Type by ID

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query GpuTypes { gpuTypes(input: {id: \"NVIDIA GeForce RTX 3090\"}) { id displayName memoryInGb secureCloud communityCloud lowestPrice(input: {gpuCount: 1}) { minimumBidPrice uninterruptablePrice } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
query GpuTypes {
  gpuTypes(input: {id: "NVIDIA GeForce RTX 3090"}) {
    id
    displayName
    memoryInGb
    secureCloud
    communityCloud
    lowestPrice(input: {gpuCount: 1}) {
      minimumBidPrice
      uninterruptablePrice
    }
  }
}
```
  </TabItem>
  <TabItem value="ouput" label="Output">
```json
{
  "data": {
    "gpuTypes": [
      {
        "id": "NVIDIA GeForce RTX 3090",
        "displayName": "RTX 3090",
        "memoryInGb": 24,
        "secureCloud": false,
        "communityCloud": true,
        "lowestPrice": {
          "minimumBidPrice": 0.163,
          "uninterruptablePrice": 0.3
        }
      }
    ]
  }
}
```
  </TabItem>
</Tabs>
