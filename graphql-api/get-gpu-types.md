# Get GPU Types

When creating a pod, you will need to pass GPU type ids. These queries can help find all GPU types and their ids along with other attributes like VRAM.

### Get GPU Types

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "query GpuTypes { gpuTypes { id displayName memoryInGb } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
{% code overflow="wrap" %}
```graphql
query GpuTypes {
  gpuTypes {
    id
    displayName
    memoryInGb
  }
}
```
{% endcode %}
{% endtab %}
{% endtabs %}

{% code title="Output" overflow="wrap" %}
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
{% endcode %}

### Get GPU Type by ID

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "query GpuTypes { gpuTypes(input: {id: \"NVIDIA GeForce RTX 3090\"}) { id displayName memoryInGb secureCloud communityCloud lowestPrice(input: {gpuCount: 1}) { minimumBidPrice uninterruptablePrice } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
{% code overflow="wrap" %}
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
{% endcode %}
{% endtab %}
{% endtabs %}

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
