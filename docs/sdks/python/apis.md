---
title: API Wrapper
id: apis
sidebar_label: APIs
description: "Learn how to manage computational resources with the RunPod API, including endpoint configurations, template creation, and GPU management, to optimize your project's performance."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

This guide explains how to use the RunPod API to manage computational resources. You'll learn how to work with endpoints, templates, and GPUs programmatically.

## Get endpoints

Retrieve a list of all available endpoint configurations:

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

# Get all available endpoints
endpoints = runpod.get_endpoints()
print(endpoints)
```

## Create templates

Templates define predefined configurations for your environments. Create a new template:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

try:
    # Create a new template
    new_template = runpod.create_template(
        name="test",
        image_name="runpod/base:0.1.0"
    )
    print(new_template)

except runpod.error.QueryError as err:
    print(err)
    print(err.query)
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "n6m0htekvq",
  "name": "test",
  "imageName": "runpod/base:0.1.0",
  "dockerArgs": "",
  "containerDiskInGb": 10,
  "volumeInGb": 0,
  "volumeMountPath": "/workspace",
  "ports": "",
  "env": [],
  "isServerless": false
}
```

</TabItem>
</Tabs>

## Create endpoints

Create a new endpoint using a template:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

try:
    # Create a template first
    new_template = runpod.create_template(
        name="test",
        image_name="runpod/base:0.4.4",
        is_serverless=True
    )
    print(new_template)

    # Create an endpoint using the template
    new_endpoint = runpod.create_endpoint(
        name="test",
        template_id=new_template["id"],
        gpu_ids="AMPERE_16",
        workers_min=0,
        workers_max=1
    )
    print(new_endpoint)

except runpod.error.QueryError as err:
    print(err)
    print(err.query)
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "id": "Unique_Id",
  "name": "YourTemplate",
  "imageName": "runpod/base:0.4.4",
  "dockerArgs": "",
  "containerDiskInGb": 10,
  "volumeInGb": 0,
  "volumeMountPath": "/workspace",
  "ports": null,
  "env": [],
  "isServerless": true
}
{
  "id": "Unique_Id",
  "name": "YourTemplate",
  "templateId": "Unique_Id",
  "gpuIds": "AMPERE_16",
  "networkVolumeId": null,
  "locations": null,
  "idleTimeout": 5,
  "scalerType": "QUEUE_DELAY",
  "scalerValue": 4,
  "workersMin": 0,
  "workersMax": 1
}
```

</TabItem>
</Tabs>

## List available GPUs

Get information about available GPUs:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import json
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

# Get all available GPUs
gpus = runpod.get_gpus()
print(json.dumps(gpus, indent=2))
```

</TabItem>
  <TabItem value="output" label="Output">

```json
[
  {
    "id": "NVIDIA A100 80GB PCIe",
    "displayName": "A100 80GB",
    "memoryInGb": 80
  },
  {
    "id": "NVIDIA A100-SXM4-80GB",
    "displayName": "A100 SXM 80GB",
    "memoryInGb": 80
  }
]
```

</TabItem>
</Tabs>

## Get GPU details

Retrieve detailed information about a specific GPU:

<Tabs>
  <TabItem value="python" label="Python" default>

```python
import runpod
import json
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

# Get details for a specific GPU
gpu = runpod.get_gpu("NVIDIA A100 80GB PCIe")
print(json.dumps(gpu, indent=2))
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "maxGpuCount": 8,
  "id": "NVIDIA A100 80GB PCIe",
  "displayName": "A100 80GB",
  "manufacturer": "Nvidia",
  "memoryInGb": 80,
  "cudaCores": 0,
  "secureCloud": true,
  "communityCloud": true,
  "securePrice": 1.89,
  "communityPrice": 1.59,
  "oneMonthPrice": null,
  "threeMonthPrice": null,
  "oneWeekPrice": null,
  "communitySpotPrice": 0.89,
  "secureSpotPrice": null,
  "lowestPrice": {
    "minimumBidPrice": 0.89,
    "uninterruptablePrice": 1.59
  }
}
```

</TabItem>
</Tabs>

> **Note:** The API provides flexible resource management options. Choose configurations that best match your project requirements.
