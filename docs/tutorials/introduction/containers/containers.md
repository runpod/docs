---
title: Intro to containers
sidebar_position: 2
description: "Discover the world of containerization with Docker, a platform for isolated environments that package applications, frameworks, and libraries into self-contained containers for consistent and reliable deployment across diverse computing environments."
---

## What are containers?

> A container is an isolated environment for your code. This means that a container has no knowledge of your operating system, or your files. It runs on the environment provided to you by Docker Desktop. Containers have everything that your code needs in order to run, down to a base operating system.

[From Docker's website](https://docs.docker.com/guides/walkthroughs/what-is-a-container/#:~:text=A%20container%20is%20an%20isolated,to%20a%20base%20operating%20system)

Developers package their applications, frameworks, and libraries into a Docker container. Then, those containers can run outside their development environment.

### Why use containers?

> Build, ship, and run anywhere.

Containers are self-contained and run anywhere Docker runs. This means you can run a container on-premises or in the cloud, as well as in hybrid environments.
Containers include both the application and any dependencies, such as libraries and frameworks, configuration data, and certificates needed to run your application.

In cloud computing, you get the best cold start times with containers.

## What are images?

Docker images are fixed templates for creating containers. They ensure that applications operate consistently and reliably across different environments, which is vital for modern software development.

To create Docker images, you use a process known as "Docker build." This process uses a Dockerfile, a text document containing a sequence of commands, as instructions guiding Docker on how to build the image.

### Why use images?

Using Docker images helps in various stages of software development, including testing, development, and deployment. Images ensure a seamless workflow across diverse computing environments.

### Why not use images?

You must rebuild and push the container image, then edit your endpoint to use the new image each time you iterate on your code. Since development requires changing your code every time you need to troubleshoot a problem or add a feature, this workflow can be inconvenient.

For a streamlined development workflow, check out [RunPod projects](/docs/runpodctl/projects/overview.md). When you're done with development, you can create a Dockerfile from your project to reduce initialization overhead in production.

### What is Docker Hub?

After their creation, Docker images are stored in a registry, such as Docker Hub.
From these registries, you can download images and use them to generate containers, which make it easy to widely distribute and deploy applications.

Now that you've got an understanding of Docker, containers, images, and whether containerization is right for you, let's move on to installing Docker.

## Installing Docker

For this walkthrough, install Docker Desktop.
Docker Desktop bundles a variety of tools including:

- Docker GUI
- Docker CLI
- Docker extensions
- Docker Compose

The majority of this walkthrough uses the Docker CLI, but feel free to use the GUI if you prefer.

For the best installation experience, see Docker's [official documentation](https://docs.docker.com/get-docker/).

### Running your first command

Now that you've installed Docker, open a terminal window and run the following command:

```command
docker version
```

You should see something similar to the following output.

```text
docker version
Client: Docker Engine - Community
 Version:           24.0.7
 API version:       1.43
 Go version:        go1.21.3
 Git commit:        afdd53b4e3
 Built:             Thu Oct 26 07:06:42 2023
 OS/Arch:           darwin/arm64
 Context:           desktop-linux

Server: Docker Desktop 4.26.1 (131620)
 Engine:
  Version:          24.0.7
  API version:      1.43 (minimum version 1.12)
  Go version:       go1.20.10
  Git commit:       311b9ff
  Built:            Thu Oct 26 09:08:15 2023
  OS/Arch:          linux/arm64
  Experimental:     false
 containerd:
  Version:          1.6.25
  GitCommit:       abcd
 runc:
  Version:          1.1.10
  GitCommit:        v1.1.10-0-g18a0cb0
 docker-init:
  Version:          0.19.0
```

If at any point you need help with a command, you can use the `--help` flag to see documentation on the command you're running.

```command
docker --help
```

Let's run `busybox` from the command line to print out today's date.

```command
docker run busybox sh -c 'echo "The time is: $(date)"'
# The time is: Thu Jan 11 06:35:39 UTC 2024
```

- `busybox` is a lightweight Docker image with the bare minimum Linux utilities installed, including `echo`
- The `echo` command prints the container's uptime.

You've successfully installed Docker and run your first commands.
