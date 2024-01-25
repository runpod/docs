---
title: "Manage Templates"
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

`containerDiskInGb`, `dockerArgs`, `env`, `imageName`, `name`, and `volumeInGb` are required arguments; all other arguments are optional.

If your container image is private, you can also specify Docker login credentials with a `containerRegistryAuthId` argument, which takes the ID (_not_ the name) of the container registry credentials you saved in your RunPod user settings as a string.

:::note

Template names must be unique as well; if you try to create a new template with the same name as an existing one, your call will fail.
:::

## Create a Pod Template

### Create GPU Template

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveTemplate(input: { containerDiskInGb: 5, dockerArgs: \"sleep infinity\", env: [ { key: \"key1\", value: \"value1\" }, { key: \"key2\", value: \"value2\" } ], imageName: \"ubuntu:latest\", name: \"Generated Template\", ports: \"8888/http,22/tcp\", readme: \"## Hello, World!\", volumeInGb: 15, volumeMountPath: \"/workspace\" }) { containerDiskInGb dockerArgs env { key value } id imageName name ports readme volumeInGb volumeMountPath } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveTemplate(input: {
    containerDiskInGb: 5,
    dockerArgs: "sleep infinity",
    env: [
      {
        key: "key1",
        value: "value1"
      },
      {
        key: "key2",
        value: "value2"
      }
    ],
    imageName: "ubuntu:latest",
    name: "Generated Template",
    ports: "8888/http,22/tcp",
    readme: "## Hello, World!",
    volumeInGb: 15,
    volumeMountPath: "/workspace"
  }) {
    containerDiskInGb
    dockerArgs
    env {
      key
      value
    }
    id
    imageName
    name
    ports
    readme
    volumeInGb
    volumeMountPath
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveTemplate": {
      "containerDiskInGb": 5,
      "dockerArgs": "sleep infinity",
      "env": [
        {
          "key": "key1",
          "value": "value1"
        },
        {
          "key": "key2",
          "value": "value2"
        }
      ],
      "id": "wphkv67a0p",
      "imageName": "ubuntu:latest",
      "name": "Generated Template",
      "ports": "8888/http,22/tcp",
      "readme": "## Hello, World!",
      "volumeInGb": 15,
      "volumeMountPath": "/workspace"
    }
  }
}
```
  </TabItem>
</Tabs>

### Create Serverless Template

For Serverless templates, always pass `0` for `volumeInGb`, since Serverless workers don't have persistent storage (other than those with network volumes).

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveTemplate(input: { containerDiskInGb: 5, dockerArgs: \"python handler.py\", env: [ { key: \"key1\", value: \"value1\" }, { key: \"key2\", value: \"value2\" } ], imageName: \"runpod/serverless-hello-world:latest\", isServerless: true, name: \"Generated Serverless Template\", readme: \"## Hello, World!\", volumeInGb: 0 }) { containerDiskInGb dockerArgs env { key value } id imageName isServerless name readme } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveTemplate(input: {
    containerDiskInGb: 5,
    dockerArgs: "python handler.py",
    env: [
      {
        key: "key1",
        value: "value1"
      },
      {
        key: "key2",
        value: "value2"
      }
    ],
    imageName: "runpod/serverless-hello-world:latest",
    isServerless: true,
    name: "Generated Serverless Template",
    readme: "## Hello, World!",
    volumeInGb: 0
  }) {
    containerDiskInGb
    dockerArgs
    env {
      key
      value
    }
    id
    imageName
    isServerless
    name
    readme
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveTemplate": {
      "containerDiskInGb": 5,
      "dockerArgs": "python handler.py",
      "env": [
        {
          "key": "key1",
          "value": "value1"
        },
        {
          "key": "key2",
          "value": "value2"
        }
      ],
      "id": "xkhgg72fuo",
      "imageName": "runpod/serverless-hello-world:latest",
      "isServerless": true,
      "name": "Generated Serverless Template",
      "readme": "## Hello, World!"
    }
  }
}
```
  </TabItem>
</Tabs>

## Modify a Pod Template

### Modify a GPU Pod Template

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveTemplate(input: { id: \"wphkv67a0p\", containerDiskInGb: 5, dockerArgs: \"sleep infinity\", env: [ { key: \"key1\", value: \"value1\" }, { key: \"key2\", value: \"value2\" } ], imageName: \"ubuntu:latest\", name: \"Generated Template\", volumeInGb: 15, readme: \"## Goodbye, World!\" }) { id containerDiskInGb dockerArgs env { key value } imageName name volumeInGb readme } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveTemplate(input: {
    id: "wphkv67a0p",
    containerDiskInGb: 5,
    dockerArgs: "sleep infinity",
    env: [
      {
        key: "key1",
        value: "value1"
      },
      {
        key: "key2",
        value: "value2"
      }
    ],
    imageName: "ubuntu:latest",
    name: "Generated Template",
    volumeInGb: 15,
    # Modify your template options here (or above, if applicable).
    # For this example, we've modified the template's README.
    readme: "## Goodbye, World!"
  }) {
    id
    containerDiskInGb
    dockerArgs
    env {
      key
      value
    }
    imageName
    name
    volumeInGb
    # You can include what you've changed here, too.
    readme
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveTemplate": {
      "id": "wphkv67a0p",
      "containerDiskInGb": 5,
      "dockerArgs": "sleep infinity",
      "env": [
        {
          "key": "key1",
          "value": "value1"
        },
        {
          "key": "key2",
          "value": "value2"
        }
      ],
      "imageName": "ubuntu:latest",
      "name": "Generated Template",
      "volumeInGb": 15,
      "readme": "## Goodbye, World!"
    }
  }
}
```
  </TabItem>
</Tabs>

### Modify a Serverless Pod Template

<Tabs>
  <TabItem value="curl" label="cURL" default>
```curl
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { saveTemplate(input: { id: \"xkhgg72fuo\", containerDiskInGb: 5, dockerArgs: \"python handler.py\", env: [ { key: \"key1\", value: \"value1\" }, { key: \"key2\", value: \"value2\" } ], imageName: \"runpod/serverless-hello-world:latest\", name: \"Generated Serverless Template\", volumeInGb: 0, readme: \"## Goodbye, World!\" }) { id containerDiskInGb dockerArgs env { key value } imageName name readme } }"}'
```
  </TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  saveTemplate(input: {
    id: "xkhgg72fuo",
    containerDiskInGb: 5,
    dockerArgs: "python handler.py",
    env: [
      {
        key: "key1",
        value: "value1"
      },
      {
        key: "key2",
        value: "value2"
      }
    ],
    imageName: "runpod/serverless-hello-world:latest",
    name: "Generated Serverless Template",
    volumeInGb: 0,
    # Modify your template options here (or above, if applicable).
    # For this example, we've modified the template's README.
    readme: "## Goodbye, World!"
  }) {
    id
    containerDiskInGb
    dockerArgs
    env {
      key
      value
    }
    imageName
    name
    # You can include what you've changed here, too.
    readme
  }
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "saveTemplate": {
      "id": "xkhgg72fuo",
      "containerDiskInGb": 5,
      "dockerArgs": "python handler.py",
      "env": [
        {
          "key": "key1",
          "value": "value1"
        },
        {
          "key": "key2",
          "value": "value2"
        }
      ],
      "imageName": "runpod/serverless-hello-world:latest",
      "name": "Generated Serverless Template",
      "readme": "## Goodbye, World!"
    }
  }
}
```
  </TabItem>
</Tabs>

## Delete a template

Note that the template you'd like to delete must not be in use by any Pods or assigned to any Serverless endpoints. It can take up to 2 minutes to be able to delete a template after its most recent use by a Pod or Serverless endpoint, too.

The same mutation is used for deleting both Pod and Serverless templates.

<Tabs>
  <TabItem value="curl" label="cURL" default>

```curl
curl --request POST \
	--header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=${YOUR_API_KEY}' \
  --data '{"query": "mutation { deleteTemplate(templateName: \"Generated Template\") }"}'
```

</TabItem>
  <TabItem value="graphql" label="GraphQL">
```graphql
mutation {
  deleteTemplate(templateName: "Generated Template")
}
```
  </TabItem>
  <TabItem value="output" label="Output">
```json
{
  "data": {
    "deleteTemplate": null
  }
}
```
  </TabItem>
</Tabs>
