---
title: "Start Pod"
slug: "start-pod"
excerpt: "Start an On-Demand or Spot Pod."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 18 2023 13:00:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 10 2023 17:34:37 GMT+0000 (Coordinated Universal Time)"
---

## Start On-Demand Pod

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podResume( input: { podId: \"inzk6tzuz833h5\", gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
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
```json Output | JSON
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
<!-- dprint-ignore-end -->

## Start Spot Pod

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { podBidResume( input: { podId: \"d62t7qg9n5vtan\", bidPerGpu: 0.2, gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
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
```json Output | JSON
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
<!-- dprint-ignore-end -->
