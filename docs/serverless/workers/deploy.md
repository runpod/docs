---
title: "Deploy a worker image"
description: "Learn how to package your handler function into a Docker image for scalable Serverless worker deployment."
sidebar_position: 6
---

# Package and deploy a worker image

Learn how to package your handler function into a Docker image and deploy it as a Serverless worker on RunPod.

:::tip

If you're new to Serverless, we recommend learning how to [build your first worker](/serverless/workers/custom-worker) before exploring this page.

:::

## Requirements

To deploy a worker image, you need:

- A working handler function (see [Handler functions](/serverless/handlers/overview)).
- [Docker](https://docs.docker.com/get-started/install/) installed on your development machine.
- A Docker Hub account.

## Project organization

Organize your project files in a directory structure like this:

```
project_directory
├── Dockerfile              # Instructions for building the Docker image
├── src
│   └── handler.py          # Your handler function
└── builder
    └── requirements.txt    # Dependencies required by your handler
```

Your `requirements.txt` file should list all Python packages your handler needs:

```
# Example requirements.txt
runpod==1.7.0
torch==2.0.1
pillow==9.5.0
transformers==4.30.2
```

## Create a Dockerfile

The Dockerfile tells Docker how to build your worker image. Create a file named `Dockerfile` (no extension) in your project's root directory:

```dockerfile
FROM python:3.11.1-slim

WORKDIR /

# Copy and install requirements
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your handler code
COPY src/handler.py .

# Command to run when the container starts
CMD ["python", "-u", "/handler.py"]
```

This Dockerfile starts with a Python base image, installs your dependencies, copies your handler code, and specifies the command to run when the container starts.

## Including models and external files

If your handler uses machine learning models or other external files, include them in the Docker image:

```dockerfile
FROM python:3.11.1-slim

WORKDIR /

# Copy and install requirements
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy your code and model files
COPY src/handler.py .
// highlight-start
COPY models/ /models/

# Set environment variables if needed
ENV MODEL_PATH=/models/my_model.pt
// highlight-end

# Command to run when the container starts
CMD ["python", "-u", "/handler.py"]
```

Always include your model files directly in the Docker image rather than downloading them at runtime to ensure faster startup times and more reliable execution.

## Building the Docker image

From your terminal, navigate to your project directory and build the Docker image:

```bash
docker build --platform linux/amd64 -t yourusername/worker-name:v1.0.0 .
```

Replace `yourusername` with your Docker Hub username, `worker-name` with a descriptive name for your worker, and `v1.0.0` with an appropriate version tag.

The `--platform linux/amd64` flag ensures compatibility with RunPod's infrastructure.

## Testing your image locally

Before pushing to a registry, test your Docker image locally:

```bash
docker run -it yourusername/worker-name:v1.0.0
```

If your handler is properly configured with a test input, you should see it process the test input and provide output.

## Pushing the image to a registry

Make your image available to RunPod by pushing it to Docker Hub or another registry:

```bash
# Log in to Docker Hub
docker login

# Push the image
docker push yourusername/worker-name:v1.0.0
```

## Creating a Serverless endpoint

Once your image is in a container registry, create a Serverless endpoint through the RunPod console:

1. Go to the [RunPod Serverless console](https://www.runpod.io/console/serverless)
2. Click **New Endpoint**
3. Under **Custom Source**, select **Docker Image**, then click **Next**
4. Enter your Docker image URL: `docker.io/yourusername/worker-name:v1.0.0`
5. Name your endpoint or use the auto-generated one
6. Configure the GPU type and worker count settings
7. Click **Create Endpoint**

## Testing your endpoint

The **Requests** tab in your endpoint details page allows you to test your endpoint with sample inputs. You'll see a default test request like:

```json
{
    "input": {
        "prompt": "Hello World"
    }
}
```

Customize this request according to your handler's expected input format, click **Run**, and review the output returned by your worker.

## Continuous integration with GitHub Actions

Automate testing and deployment with GitHub Actions by creating configuration files in your repository.

For the workflow file (`.github/workflows/test-and-deploy.yml`):

```yaml
name: Test and Deploy

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test-and-deploy:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Build and push Docker image
      uses: docker/build-push-action@v4
      with:
        context: .
        push: true
        tags: yourusername/worker-name:${{ github.sha }}
        
    - name: Run Tests
      uses: runpod/runpod-test-runner@v1
      with:
        image-tag: yourusername/worker-name:${{ github.sha }}
        runpod-api-key: ${{ secrets.RUNPOD_API_KEY }}
        test-filename: .github/tests.json
        request-timeout: 300
```

For test cases (`.github/tests.json`):

```json
[
  {
    "input": {
      "prompt": "Test input 1"
    },
    "expected_output": {
      "status": "COMPLETED"
    }
  },
  {
    "input": {
      "prompt": "Test input 2",
      "parameter": "value"
    },
    "expected_output": {
      "status": "COMPLETED"
    }
  }
]
```

## Image versioning best practices

For production workloads, use SHA tags for absolute reproducibility:

```bash
# Get the SHA after pushing
docker inspect --format='{{index .RepoDigests 0}}' yourusername/worker-name:v1.0.0

# Use the SHA when deploying
# yourusername/worker-name@sha256:4d3d4b3c5a5c2b3a5a5c3b2a5a4d2b3a2b3c5a3b2a5d2b3a3b4c3d3b5c3d4a3
```

Additional versioning recommendations:
- Never rely on the `:latest` tag for production
- Use semantic versioning AND SHA tags for clarity and reproducibility
- Document the specific image SHA in your deployment documentation
- Keep images as small as possible for faster startup times

## Troubleshooting deployment issues

If your worker fails to start or process requests:
- Check the logs in the RunPod console for error messages.
- Verify your handler function works correctly with local testing
- Ensure all dependencies are properly installed in the Docker image
- Check that your Docker image is compatible with the selected GPU type
- Verify your input format matches what your handler expects

## Next steps

After successfully deploying your worker, you can try:

- [Sending API requests to your endpoint.](/serverless/endpoints/send-requests)
- [Creating more advanced handler functions](/serverless/workers/handler-functions)
- [Optimizing your endpoint configurations](/serverless/endpoints/endpoint-configurations)









After you've create a handler function, the next step is to package it into a Docker image that can be deployed as a Serverless worker.

This is accomplished by defining a Docker file to import everything required to run your handler.

Example Docker files are in the [runpod-workers](https://github.com/orgs/runpod-workers/repositories) repository on GitHub.

:::note

For deploying large language models (LLMs), you can use the [Configurable Endpoints](/serverless/vllm/configurable-endpoints) feature instead of working directly with Docker.

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

To build and push the image, review the steps in [Get started](/serverless/overview).

> 🚧 If your handler requires external files such as model weights, be sure to cache them into your docker image. You are striving for a completely self-contained worker that doesn't need to download or fetch external files to run.

## Continuous integrations

Integrate your handler functions through continuous integration.

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
