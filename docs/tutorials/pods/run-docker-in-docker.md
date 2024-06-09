---
title: Run Docker in Docker on RunPod CPU Instances
---

:::note

This tutorial applies only to RunPod's CPU offering. 
It is not possible to run Docker inside of a GPU at this time.

For information on building Docker images on GPUs, see [Build Docker Images with Bazel](/tutorials/pods/build-docker-images).

:::

RunPod provides virtualized machine images on CPUs.
With this virtualization, you can use your own Docker image as a base image and, in addition, run Docker containers inside the CPU instance.

## Create a CPU Instance

To get started, create a CPU instance:

1. Navigate to [Pods](https://www.dev.runpod.io/console/pods) and select **+ Deploy**.
2. Select your **CPU** type.
3. Customize your instance by setting up the following:
   1. (recommended) Specify a Network volume.
   2. Select an instance type. For example, **32 vCPU with 256 GB of RAM**.
   3. (optional) Provide a template. For example, **runpod/base:0.5.1-cpu**.
4. Review your configuration and select **Deploy On-Demand**.

## Install Docker

You can install Docker using one of the following methods. 
Ensure you have root privileges.

### From the Docker Install Script

Download and run the official Docker install script:

```shell
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

### From the Test Docker Install Script

Download and run the Docker test install script:

```shell
curl -fsSL https://test.docker.com -o test-docker.sh
sh test-docker.sh
```

### From the Source Repository

Clone and install Docker from the source repository:

```shell
git clone https://github.com/docker/docker-ce.git
cd docker-ce
sh install.sh
```

## Verify Docker Installation

After installation, verify that Docker is installed correctly:

```shell
docker --version
```

## Start Docker

Start the Docker daemon:

```shell
sudo dockerd &
```

## Test Docker Service

Run a test container to ensure the Docker service is running correctly:

```shell
docker run hello-world
```

If the container runs successfully and outputs a welcome message from Docker, you have successfully set up Docker in Docker on a RunPod CPU instance.


You now have Docker running inside a Docker container on a RunPod CPU instance. 
This setup allows you to manage and run additional containers as needed, leveraging the flexibility and power of Docker within a virtualized environment provided by RunPod.
