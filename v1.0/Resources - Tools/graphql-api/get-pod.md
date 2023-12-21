---
title: "Get Pod"
slug: "get-pod"
excerpt: "Get Pod attributes like Pod ID, name, runtime metrics, and more."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 18 2023 12:57:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 10 2023 17:34:57 GMT+0000 (Coordinated Universal Time)"
---

## Get All Pods

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query Pods { myself { pods { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } } }"}'
```
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
```json Output | JSON
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
<!-- dprint-ignore-end -->

## Get Pod by ID

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query Pod { pod(input: {podId: \"ldl1dxirsim64n\"}) { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } }"}'
```
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
```json Output | JSON
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
<!-- dprint-ignore-end -->
