---
title: "Manage Endpoints"
description: "Create a new Serverless endpoint, or modify/delete existing ones."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`gpuIds`, `name`, and `templateId` are required arguments; all other arguments are optional, and default values will be used if unspecified.

## Create a new Serverless Endpoint

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveEndpoint(input: { gpuIds: \"AMPERE_16\", idleTimeout: 5, locations: \"US\", name: \"Generated Endpoint -fb\", networkVolumeId: \"\", scalerType: \"QUEUE_DELAY\", scalerValue: 4, templateId: \"xkhgg72fuo\", workersMax: 3, workersMin: 0 }) { gpuIds id idleTimeout locations name scalerType scalerValue templateId workersMax workersMin } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveEndpoint(input: {
    # options for gpuIds are "AMPERE_16,AMPERE_24,AMPERE_48,AMPERE_80,ADA_24"
    gpuIds: "AMPERE_16",
    idleTimeout: 5,
    # leave locations as an empty string or null for any region
    # options for locations are "CZ,FR,GB,NO,RO,US"
    locations: "US",
    # append -fb to your endpoint's name to enable FlashBoot
    name: "Generated Endpoint -fb",
    # uncomment below and provide an ID to mount a network volume to your workers
    # networkVolumeId: "",
    scalerType: "QUEUE_DELAY",
    scalerValue: 4,
    templateId: "xkhgg72fuo",
    workersMax: 3,
    workersMin: 0
  }) {
    gpuIds
    id
    idleTimeout
    locations
    name
    # networkVolumeId
    scalerType
    scalerValue
    templateId
    workersMax
    workersMin
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveEndpoint": {
      "gpuIds": "AMPERE_16",
      "id": "i02xupws21hp6i",
      "idleTimeout": 5,
      "locations": "US",
      "name": "Generated Endpoint -fb",
      "scalerType": "QUEUE_DELAY",
      "scalerValue": 4,
      "templateId": "xkhgg72fuo",
      "workersMax": 3,
      "workersMin": 0
    }
  }
}
```
  </TabItem>
</Tabs>

## Modify an existing Serverless Endpoint

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveEndpoint(input: { id: \"i02xupws21hp6i\", gpuIds: \"AMPERE_16\", name: \"Generated Endpoint -fb\", templateId: \"xkhgg72fuo\", workersMax: 0 }) { id gpuIds name templateId workersMax } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveEndpoint(input: {
    id: "i02xupws21hp6i",
    gpuIds: "AMPERE_16",
    name: "Generated Endpoint -fb",
    templateId: "xkhgg72fuo",
    # Modify your template options here (or above, if applicable).
    # For this example, we've modified the endpoint's max workers.
    workersMax: 0
  }) {
    id
    gpuIds
    name
    templateId
    # You can include what you've changed here, too.
    workersMax
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveEndpoint": {
      "id": "i02xupws21hp6i",
      "gpuIds": "AMPERE_16",
      "name": "Generated Endpoint -fb",
      "templateId": "xkhgg72fuo",
      "workersMax": 0
    }
  }
}
```
  </TabItem>
</Tabs>

# View your Endpoints

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
     --header 'content-type: application/json' \
     --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
     --data '{"query": "query Endpoints { myself { endpoints { gpuIds id idleTimeout locations name networkVolumeId pods { desiredStatus } scalerType scalerValue templateId workersMax workersMin } serverlessDiscount { discountFactor type expirationDate } } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
query Endpoints {
  myself {
    endpoints {
      gpuIds
      id
      idleTimeout
      locations
      name
      networkVolumeId
      pods {
        desiredStatus
      }
      scalerType
      scalerValue
      templateId
      workersMax
      workersMin
    }
    serverlessDiscount {
      discountFactor
      type
      expirationDate
    }
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "myself": {
      "endpoints": [
        {
          "gpuIds": "AMPERE_16",
          "id": "i02xupws21hp6i",
          "idleTimeout": 5,
          "locations": "US",
          "name": "Generated Endpoint -fb",
          "networkVolumeId": null,
          "pods": [],
          "scalerType": "QUEUE_DELAY",
          "scalerValue": 4,
          "templateId": "xkhgg72fuo",
          "workersMax": 0,
          "workersMin": 0
        }
      ],
      "serverlessDiscount": null
    }
  }
}
```
  </TabItem>
</Tabs>

# Delete a Serverless Endpoints

Note that your endpoint's min and max workers must both be set to zero for your call to work.

<Tabs>
  <TabItem value="curl" label="cURL">
```curl
curl --request POST \
	--header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { deleteEndpoint(id: \"i02xupws21hp6i\") }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  deleteEndpoint(id: "i02xupws21hp6i")
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "deleteEndpoint": null
  }
}
```
  </TabItem>
</Tabs>
