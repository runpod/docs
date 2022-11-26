---
description: Create a Pod which starts with a container image.
---

# Create Pod

A pod consists of the following resources:

* 0 or more GPUs
* vCPU
* System RAM
* Container Disk
  * It's temporary and removed when the pod is stopped or terminated.
  * _You only pay for the container disk when the pod is running._
* Instance Volume
  * Data persists even when you reset or stop a pod. Volume is removed when the pod is terminated.
  * _You pay for volume storage even when the pod is stopped._

### Create OnDemand Pod

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```shell
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podFindAndDeployOnDemand( input: { cloudType: ALL, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Tensorflow\", imageName: \"runpod/tensorflow\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"rn51hunbpgtltcpac3ol\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
{% code overflow="wrap" %}
```graphql
mutation {
  podFindAndDeployOnDemand(
    input: {
      cloudType: ALL
      gpuCount: 1
      volumeInGb: 40
      containerDiskInGb: 40
      minVcpuCount: 2
      minMemoryInGb: 15
      gpuTypeId: "NVIDIA RTX A6000"
      name: "RunPod Tensorflow"
      imageName: "runpod/tensorflow"
      dockerArgs: ""
      ports: "8888/http"
      volumeMountPath: "/workspace"
      env: [{ key: "JUPYTER_PASSWORD", value: "rn51hunbpgtltcpac3ol" }]
    }
  ) {
    id
    imageName
    env
    machineId
    machine {
      podHostId
    }
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
    "podFindAndDeployOnDemand": {
      "id": "50qynxzilsxoey",
      "imageName": "runpod/tensorflow",
      "env": [
        "JUPYTER_PASSWORD=rn51hunbpgtltcpac3ol"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "50qynxzilsxoey-64410065"
      }
    }
  }
}
```
{% endcode %}

### Create Spot Pod

{% tabs %}
{% tab title="Curl" %}
{% code overflow="wrap" %}
```shell
curl --request POST \
  --header 'content-type: application/json' \
  --url 'https://api.runpod.io/graphql?api_key=pewpew' \
  --data '{"query": "mutation { podRentInterruptable( input: { bidPerGpu: 0.2, cloudType: SECURE, gpuCount: 1, volumeInGb: 40, containerDiskInGb: 40, minVcpuCount: 2, minMemoryInGb: 15, gpuTypeId: \"NVIDIA RTX A6000\", name: \"RunPod Pytorch\", imageName: \"runpod/pytorch\", dockerArgs: \"\", ports: \"8888/http\", volumeMountPath: \"/workspace\", env: [{ key: \"JUPYTER_PASSWORD\", value: \"vunw9ybnzqwpia2795p2\" }] } ) { id imageName env machineId machine { podHostId } } }"}'
```
{% endcode %}
{% endtab %}

{% tab title="GraphQL" %}
{% code overflow="wrap" %}
```graphql
mutation {
  podRentInterruptable(
    input: {
      bidPerGpu: 0.2
      cloudType: SECURE
      gpuCount: 1
      volumeInGb: 40
      containerDiskInGb: 40
      minVcpuCount: 2
      minMemoryInGb: 15
      gpuTypeId: "NVIDIA RTX A6000"
      name: "RunPod Pytorch"
      imageName: "runpod/pytorch"
      dockerArgs: ""
      ports: "8888/http"
      volumeMountPath: "/workspace"
      env: [{ key: "JUPYTER_PASSWORD", value: "vunw9ybnzqwpia2795p2" }]
    }
  ) {
    id
    imageName
    env
    machineId
    machine {
      podHostId
    }
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
    "podRentInterruptable": {
      "id": "fkjbybgpwuvmhk",
      "imageName": "runpod/pytorch",
      "env": [
        "JUPYTER_PASSWORD=vunw9ybnzqwpia2795p2"
      ],
      "machineId": "hpvdausak8xb",
      "machine": {
        "podHostId": "fkjbybgpwuvmhk-64410065"
      }
    }
  }
}
```
{% endcode %}
