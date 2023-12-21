---
title: "Stop Pod"
slug: "stop-pod"
excerpt: "Stop an On-Demand or Spot Pod."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 18 2023 13:01:34 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Jul 10 2023 17:34:15 GMT+0000 (Coordinated Universal Time)"
---

<!-- dprint-ignore-start -->
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podStop(input: {podId: \"riixlu8oclhp\"}) { id desiredStatus } }"}'
```
```graphql
mutation {
  podStop(input: {podId: "riixlu8oclhp"}) {
    id
    desiredStatus
  }
}
```
```json Output | JSON
{
  "data": {
    "podStop": {
      "id": "riixlu8oclhp",
      "desiredStatus": "EXITED"
    }
  }
}

```
<!-- dprint-ignore-end -->
