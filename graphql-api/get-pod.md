---
description: Get pod attributes like podId, name, runtime metrics, and more.
---

# Get Pod

### Get All Pods

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "query Pods { myself { pods { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
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
{% endtab %}
{% endtabs %}

{% code title="Output" overflow="wrap" %}
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
{% endcode %}

### Get Pod by ID

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "query Pod { pod(input: {podId: \"ldl1dxirsim64n\"}) { id name runtime { uptimeInSeconds ports { ip isIpPublic privatePort publicPort type } gpus { id gpuUtilPercent memoryUtilPercent } container { cpuPercent memoryPercent } } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
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
{% endtab %}
{% endtabs %}

{% code title="Output" overflow="wrap" %}
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
{% endcode %}
