---
description: Stop an OnDemand or Spot Pod.
---

# Stop Pod

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```bash
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podStop(input: {podId: \"riixlu8oclhp\"}) { id desiredStatus } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
{% code overflow="wrap" %}
```graphql
mutation {
  podStop(input: {podId: "riixlu8oclhp"}) {
    id
    desiredStatus
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
    "podStop": {
      "id": "riixlu8oclhp",
      "desiredStatus": "EXITED"
    }
  }
}

```
{% endcode %}
