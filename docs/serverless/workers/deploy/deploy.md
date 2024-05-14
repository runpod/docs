---
title: "Package and deploy an image"
description: "Packaged code that receives and executes API submitted requests."
sidebar_position: 2
---

Once you have a Handler Function, the next step is to package it into a Docker image that can be deployed as a scalable Serverless Worker.
This is accomplished by defining a docker file to import everything required to run your handler. Example docker files are in the [runpod-workers](https://github.com/orgs/runpod-workers/repositories) repository on GitHub.

:::note

For deploying large language models (LLMs), you can use the [Configurable Endpoints](/serverless/workers/vllm/configurable-endpoints) feature instead of working directly with Docker.

Configurable Endpoints simplify the deployment process by allowing you to select a pre-configured template and customize it according to your needs.

:::

_Unfamiliar with Docker? Check out Docker's [overview page](https://docs.docker.com/get-started/overview/) or see our guide on [Containers](/category/containers)._

## Docker file

Let's say we have a directory that looks like the following:

```
project_directory
├── Dockerfile
├── src
│   └── handler.py
└── builder
    └── requirements.txt
```

Your Dockerfile would look something like this:

```text Docker
from python:3.11.1-buster

WORKDIR /

COPY builder/requirements.txt .
RUN pip install -r requirements.txt

ADD handler.py .

CMD [ "python", "-u", "/handler.py" ]
```

To build and push the image, review the steps in [Get started](/serverless/workers/get-started).

> 🚧 If your handler requires external files such as model weights, be sure to cache them into your docker image. You are striving for a completely self-contained worker that doesn't need to download or fetch external files to run.

## Continuous integrations

Integrate your Handler Functions through continuous integration.

The [Test Runner](https://github.com/runpod/test-runner) GitHub Action is used to test and integrate your Handler Functions into your applications.

:::note

Running any Action that sends requests to RunPod occurs a cost.

:::

You can add the following to your workflow file:

```yaml
- uses: actions/checkout@v3
- name: Run Tests
  uses: runpod/runpod-test-runner@v1
  with:
    image-tag: [tag of image to test]
    runpod-api-key: [a valid Runpod API key]
    test-filename: [path for a json file containing a list of tests, defaults to .github/tests.json]
    request-timeout: [number of seconds to wait on each request before timing out, defaults to 300]
```

If `test-filename` is omitted, the Test Runner Action attempts to look for a test file at `.github/tests.json`.

You can find a working example in the [Worker Template repository](https://github.com/runpod-workers/worker-template/tree/main/.github).

Here's an updated version of the docs section with the additional information from the thread:

## Other considerations

### Docker Image Size

While we do not impose a limit on the docker image size your container registry might have, be sure to review any limitations they may have. 
Ideally, you want to keep your final docker image as small as possible and only contain the absolute minimum required to run your handler.

### Versioning and Tagging
We highly recommend the use of tags for docker images and not relying on the default `:latest` tag. 
This will make version tracking and releasing updates significantly easier. Consider using semantic versioning (e.g., v1.0.0, v1.0.1) or a deterministic naming scheme like a Git commit hash for your image tags.

### Automated Deployments with GitHub Actions

You can automate the deployment of your serverless endpoints using GitHub Actions.
Here's a basic workflow:

1. Set up a GitHub Action that builds and publishes a new version of your Docker image to a container registry whenever changes are pushed to your repository.
2. In the same GitHub Action, make a request to the RunPod API to update the container image field of your serverless template with the newly published image tag.
3. RunPod will then trigger a new release of your serverless endpoint using the updated image.

Here's a simple example of updating the container image using curl:

```bash
curl --request POST \
    --header 'content-type: application/json' \
    --url 'https://api.runpod.dev/graphql?api_key=<YOUR_RUNPOD_API_KEY>' \
    --data '{"query":"mutation Mutation($input: UpdateEndpointTemplateInput) {\n  updateEndpointTemplate(input: $input) {\n    id\n    templateId\n    template {\n      imageName\n    }\n  }\n}","variables":{"input":{"endpointId":"yourEndpointId","templateId":"newTemplateId"}}}''
```

you can call the code like this:

Call the helper function to construct the object to in the righ format for Save Template format.
```code
  //template names have uniqueness constraint unlike endpoint names
  const templateName =
    (templateConfig?.name ?? defaultTemplateConfig.name) + " " + randomUUID().slice(0, 8)
  const createTemplateResp = await createTemplate({
    containerRegistryAuthId: CONTAINER_REGISTRY_AUTH_ID, //dockerhub creds for image if it's private
    ...defaultTemplateConfig, //start with default values
    ...(templateConfig ?? {}), //any overridden values
    imageName: imageTag, // your new docker image tag
    name: templateName, //template names must be unique so override default with name of your choice
  })
```

This is the object used to contsturt 

```code
  mutation saveTemplate($input: SaveTemplateInput) {
    saveTemplate(input: $input) {
      advancedStart
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
      startJupyter
      startScript
      startSsh
      volumeInGb
      volumeMountPath
    }
  }
```


For a complete example, see here:

https://github.com/runpod/test-runner/blob/55cdf37e7cc3a2272c2f2fefc760dc262f469b80/test-runner.js#L66


Replace `<YOUR_RUNPOD_API_KEY>` with your RunPod API key, `myregistry.azurecr.io/myimage:v1.0.1` with your newly published image tag, and `<YOUR_TEMPLATE_ID>` with the ID of the serverless template you want to update.
