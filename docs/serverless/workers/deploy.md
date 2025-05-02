---
title: "Deploy a worker image"
description: "Learn how to package your handler function into a Docker image for scalable Serverless worker deployment."
sidebar_position: 6
---

# Package and deploy a worker image

Learn how to package a [handler function](/serverless/workers/handler-functions) into a Docker image and deploy it as a Serverless worker on RunPod.

## Requirements

To deploy a worker image, you need:

- A working [handler function](/serverless/workers/handler-functions).
- [Docker](https://docs.docker.com/get-started/install/) installed on your development machine.
- A [Docker Hub](https://hub.docker.com/) account.

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

## Creating a Dockerfile

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
COPY models/ /models/

# Set environment variables if needed
ENV MODEL_PATH=/models/my_model.pt

# Command to run when the container starts
CMD ["python", "-u", "/handler.py"]
```

Always include your model files directly in the Docker image rather than downloading them at runtime to ensure faster startup times and more reliable execution.

## Building the Docker image

From your terminal, navigate to your project directory and build the Docker image:

```bash
docker build --platform linux/amd64 -t [DOCKER_USERNAME]/[WORKER_NAME]:v1.0.0 .
```

Replace `[DOCKER_USERNAME]` with your Docker Hub username, `[WORKER_NAME]` with a descriptive name for your worker, and `v1.0.0` with an appropriate version tag.

:::note

The `--platform linux/amd64` flag is required to ensure compatibility with RunPod's infrastructure.

:::

## Testing your image locally

Before pushing it to the registry, you should test your Docker image locally:

```bash
docker run -it [DOCKER_USERNAME]/[WORKER_NAME]:v1.0.0
```

If your handler is properly configured with a [test input](/serverless/workers/handler-functions#local-testing), you should see it process the test input and provide output.

## Pushing the image to Docker Hub

Make your image available to RunPod by pushing it to Docker Hub:

```bash
# Log in to Docker Hub
docker login

# Push the image
docker push [DOCKER_USERNAME]/[WORKER_NAME]:v1.0.0
```

Once your image is in the Docker container registry, you can [create a Serverless endpoint](/serverless/endpoints/manage-endpoints#create-an-endpoint) through the RunPod console.

## Image versioning

For production workloads, use SHA tags for absolute reproducibility:

```bash
# Get the SHA after pushing
docker inspect --format='{{index .RepoDigests 0}}' [DOCKER_USERNAME]/[WORKER_NAME]:v1.0.0

# Use the SHA when deploying
# [DOCKER_USERNAME]/[WORKER_NAME]:v1.0.0@sha256:4d3d4b3c5a5c2b3a5a5c3b2a5a4d2b3a2b3c5a3b2a5d2b3a3b4c3d3b5c3d4a3
```

Versioning best practices:

- Never rely on the `:latest` tag for production.
- Use semantic versioning AND SHA tags for clarity and reproducibility.
- Document the specific image SHA in your deployment documentation.
- Keep images as small as possible for faster startup times.

## Troubleshooting deployment issues

If your worker fails to start or process requests:

1. Check the logs in the RunPod console for error messages.
2. Verify your handler function works correctly in local testing.
3. Ensure all dependencies are properly installed in the Docker image.
4. Check that your Docker image is compatible with the selected GPU type.
5. Verify your input format matches what your handler expects.

## Next steps

After successfully deploying your worker, you can:

- [Send API requests to your endpoint.](/serverless/endpoints/send-requests)
- [Create more advanced handler functions](/serverless/workers/handler-functions)
- [Optimize your endpoint configurations](/serverless/endpoints/endpoint-configurations)
- [Learn how to deploy workers directly from GitHub](/serverless/workers/github-integration)