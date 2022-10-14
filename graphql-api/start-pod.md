---
description: Start an OnDemand or Spot pod.
---

# Start Pod

### Start OnDemand Pod

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podResume( input: { podId: \"inzk6tzuz833h5\", gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
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
{% endtab %}
{% endtabs %}

{% code title="Output" overflow="wrap" %}
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
{% endcode %}

### Start Spot Pod

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podBidResume( input: { podId: \"d62t7qg9n5vtan\", bidPerGpu: 0.2, gpuCount: 1 } ) { id desiredStatus imageName env machineId machine { podHostId } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
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
{% endtab %}
{% endtabs %}

{% code title="Output" overflow="wrap" %}
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
{% endcode %}
