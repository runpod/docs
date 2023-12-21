---
title: "Get GPU Types"
slug: "get-gpu-types"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 18 2023 12:56:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 13 2023 18:12:45 GMT+0000 (Coordinated Universal Time)"
---

When creating a Pod, you will need to pass GPU type IDs. These queries can help find all GPU types, their IDs, and other attributes like VRAM.

## Get GPU Types

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query GpuTypes { gpuTypes { id displayName memoryInGb } }"}'
```
```graphql
query GpuTypes {
  gpuTypes {
    id
    displayName
    memoryInGb
  }
}
```
```json Output | JSON
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
<!-- dprint-ignore-end -->

## Get GPU Type by ID

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "query GpuTypes { gpuTypes(input: {id: \"NVIDIA GeForce RTX 3090\"}) { id displayName memoryInGb secureCloud communityCloud lowestPrice(input: {gpuCount: 1}) { minimumBidPrice uninterruptablePrice } } }"}'
```
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
```json Output | JSON
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
<!-- dprint-ignore-end -->
