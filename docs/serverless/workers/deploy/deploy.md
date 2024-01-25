---
title: "Package and deploy an image"
description: "Packaged code that will be receive and execute API submitted requests."
sidebar_position: 2
---

Once you have a Handler Function, the next step will be to package it into a Docker image that can be deployed as a scalable serverless worker. This is accomplished by defining a docker file to import everything required to run your handler. Example docker files are in the [repos of our runpod-workers](https://github.com/orgs/runpod-workers/repositories).

_Unfamiliar with Docker? Check out their [overview page](https://docs.docker.com/get-started/overview/) or see out guide on [Containers](/category/containers)._

## Docker File

Let's say we have a directory that looks like the following:

```
project_directory
├── dockerfile
├── src
│   └── handler.py
└── builder
    └── requirements.txt
```

Your dockerfile would look something like this:

```Text Docker
from python:3.11.1-buster

WORKDIR /

COPY builder/requirements.txt .
RUN pip install -r requirements.txt

ADD handler.py .

CMD [ "python", "-u", "/handler.py" ]
```

> 🚧 If your handler requires external files such as model weights, be sure to cache them into your docker image. You are striving for a completly self contained worker that does not need to download or fetch external files to run.

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

## Other considerations

While we do not impose a limit on the docker image size your container registry might have, be sure to review any limitations they may have. Ideally, you want to keep your final docker image as small as possible and only container the absolute minimum to run your handler.

We also highly recommend the use of tags for docker images and not relying on the default `:latest` tag label, this will make version tracking and releasing updates significantly easier.
