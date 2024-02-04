---
title: API
---

## Get Endpoints

To fetch all available endpoints from the API, use the get_endpoints function.
This function returns a list of endpoint configurations available for use.

```python
import runpod

endpoints = runpod.get_endpoints()

print(endpoints)
```

## Create Template

You can create a new template in RunPod by specifying the name and the Docker image to use.
This is useful for setting up environments with pre-defined configurations.

```python
import runpod


try:

    new_template = runpod.create_template(
        name="test",
        image_name="runpod/base:0.1.0"
    )

    print(new_template)

except runpod.error.QueryError as err:
    print(err)
    print(err.query)
```

## Create Endpoint

Creating an endpoint involves first creating a template and then setting up the endpoint with the template ID.
You can specify GPU requirements, the number of workers, and other configurations.
Your Template name must be unique.

```python
import runpod

try:

    new_template = runpod.create_template(
        name="test",
        image_name="runpod/base:0.4.4",
        is_serverless=True
    )

    print(new_template)

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

```json
{'id': 'cx829zvv9e', 'name': 'testing-01', 'imageName': 'runpod/base:0.4.4', 'dockerArgs': '', 'containerDiskInGb': 10, 'volumeInGb': 0, 'volumeMountPath': '/workspace', 'ports': None, 'env': [], 'isServerless': True}
{'id': '838j9id2xmmwew', 'name': 'test', 'templateId': 'cx829zvv9e', 'gpuIds': 'AMPERE_16', 'networkVolumeId': None, 'locations': None, 'idleTimeout': 5, 'scalerType': 'QUEUE_DELAY', 'scalerValue': 4, 'workersMin': 0, 'workersMax': 1}
```
