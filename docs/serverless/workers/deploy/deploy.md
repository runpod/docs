---
title: "Package and deploy an image"
description: "Package your Handler Function into a Docker image for scalable Serverless Worker deployment, leveraging Dockerfiles and Configurable Endpoints for efficient deployment. Learn how to build, push, and integrate your image for continuous integration and testing."
sidebar_position: 2
---

Once you have a Handler Function, the next step is to package it into a Docker image that can be deployed as a scalable Serverless Worker.
This is accomplished by defining a Docker file to import everything required to run your handler. Example Docker files are in the [runpod-workers](https://github.com/orgs/runpod-workers/repositories) repository on GitHub.

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

## Using Docker tags

We also highly recommend the use of tags for Docker images and not relying on the default `:latest` tag label, this will make version tracking and releasing updates significantly easier.

### Docker Image Versioning

To ensure consistent and reliable versioning of Docker images, we highly recommend using SHA tags instead of relying on the default `:latest` tag.

Using SHA tags offers several benefits:

- **Version Control:** SHA tags provide a unique identifier for each image version, making it easier to track changes and updates.
- **Reproducibility:** By using SHA tags, you can ensure that the same image version is used across different environments, reducing the risk of inconsistencies.
- **Security:** SHA tags help prevent accidental overwrites and ensure that you are using the intended image version.

### Using SHA Tags

To pull a Docker image using its SHA tag, use the following command:

```bash
docker pull <image_name>@<sha256:hash>
```

For example:

```bash
docker pull myapp@sha256:4d3d4b3c5a5c2b3a5a5c3b2a5a4d2b3a2b3c5a3b2a5d2b3a3b4c3d3b5c3d4a3
```

### Best Practices

- Avoid using the `:latest` tag, as it can lead to unpredictable behavior and make it difficult to track which version of the image is being used.
- Use semantic versioning (e.g., `v1.0.0`, `v1.1.0`) along with SHA tags to provide clear and meaningful version identifiers.
- Document the SHA tags used for each deployment to ensure easy rollback and version management.

## Other considerations

While we do not impose a limit on the Docker image size your container registry might have, be sure to review any limitations they may have. Ideally, you want to keep your final Docker image as small as possible and only container the absolute minimum to run your handler.
