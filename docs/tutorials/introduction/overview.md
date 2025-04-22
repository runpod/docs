---

title: Overview  
sidebar_position: 1  
description: Learn how to build and deploy applications on the RunPod platform with this set of tutorials. Covering tools, technologies, and deployment methods, including Containers, Docker, and Serverless implementation.
---

Learn how to build and deploy applications on the RunPod platform with this set of tutorials. Covering tools, technologies, and deployment methods, including Containers, Docker, and Serverless implementation.

## Serverless

Explore how to run and deploy AI applications using RunPod's Serverless platform.

### GPUs

- [Generate images with SDXL Turbo](/tutorials/serverless/gpu/generate-sdxl-turbo): Learn how to build a web application using RunPod's Serverless Workers and SDXL Turbo from Stability AI, a fast text-to-image model, and send requests to an Endpoint to generate images from text-based inputs.
- [Run Google's Gemma model](/tutorials/serverless/gpu/run-gemma-7b): Deploy Google's Gemma model on RunPod's vLLM Worker, create a Serverless Endpoint, and interact with the model using OpenAI APIs and Python.
- [Run your first serverless endpoint with Stable Diffusion](/tutorials/serverless/gpu/run-your-first): Use RunPod's Stable Diffusion v1 inference endpoint to generate images, set up your serverless worker, start a job, check job status, and retrieve results.

### CPUs

- [Run an Ollama Server on a RunPod CPU](/tutorials/serverless/cpu/run-ollama-inference): Set up and run an Ollama server on RunPod CPU for inference with this step-by-step tutorial.

## Pods

Discover how to leverage RunPod Pods to run and manage your AI applications.

### GPUs

- [Fine tune an LLM with Axolotl on RunPod](/tutorials/pods/fine-tune-llm-axolotl): Learn how to fine-tune large language models with Axolotl on RunPod, a streamlined workflow for configuring and training AI models with GPU resources, and explore examples for LLaMA2, Gemma, LLaMA3, and Jamba.
- [Run Fooocus in Jupyter Notebook](/tutorials/pods/run-fooocus): Learn how to run Fooocus, an open-source image generating model, in a Jupyter Notebook and launch the Gradio-based interface in under 5 minutes, with minimal requirements of 4GB Nvidia GPU memory and 8GB system memory.
- [How To Connect to a Pod Instance through VSCode](/tutorials/pods/connect-to-vscode): Learn how to connect to a RunPod Pod instance through VSCode for seamless development and management.
- [Build Docker Images on Runpod with Bazel](/tutorials/pods/build-docker-images): Learn how to build Docker images on RunPod using Bazel, a powerful build tool for creating consistent and efficient builds.
- [Set up Ollama on your GPU Pod](/tutorials/pods/run-ollama): Set up Ollama, a powerful language model, on a GPU Pod using RunPod, and interact with it through HTTP API requests, harnessing the power of GPU acceleration for your AI projects.
- [Run your first Fast Stable Diffusion with Jupyter Notebook](/tutorials/pods/run-your-first): Deploy a Jupyter Notebook to RunPod and generate your first image with Stable Diffusion in just 20 minutes, requiring Hugging Face user access token, RunPod infrastructure, and basic familiarity with the platform.

### CPUs

- [Run Docker in Docker on RunPod CPU Instances](/tutorials/pods/run-docker-in-docker): Learn how to run Docker in Docker on RunPod CPU instances for enhanced development and testing capabilities.

## Containers

Understand the use of Docker images and containers within the RunPod ecosystem.

- [Persist data outside of containers](/tutorials/introduction/containers/persist-data): Learn how to persist data outside of containers by creating named volumes, mounting volumes to data directories, and accessing persisted data from multiple container runs and removals in Docker.
- [Containers overview](/tutorials/introduction/containers/overview): Discover the world of containerization with Docker, a platform for isolated environments that package applications, frameworks, and libraries into self-contained containers for consistent and reliable deployment across diverse computing environments.
- [Dockerfile](/tutorials/introduction/containers/create-dockerfiles): Learn how to create a Dockerfile to customize a Docker image and use an entrypoint script to run a command when the container starts, making it a reusable and executable unit for deploying and sharing applications.
- [Docker commands](/tutorials/introduction/containers/docker-commands): RunPod enables BYOC development with Docker, providing a reference sheet for commonly used Docker commands, including login, images, containers, Dockerfile, volumes, network, and execute.

## Integrations

Explore how to integrate RunPod with other tools and platforms like OpenAI, SkyPilot, and Charm's Mods.

### OpenAI

- [Overview](/tutorials/migrations/openai/overview): Use the OpenAI SDK to integrate with your Serverless Endpoints.

### SkyPilot

- [Running RunPod on SkyPilot](/integrations/skypilot): Learn how to deploy Pods from RunPod using SkyPilot.

### Mods

- [Running RunPod on Mods](/integrations/mods): Learn to integrate into Charm's Mods tool chain and use RunPod as the Serverless Endpoint.

## Migration

Learn how to migrate from other tools and technologies to RunPod.

### Cog

- [Cog Migration](/tutorials/migrations/cog/overview): Migrate your Cog model from [Replicate.com](https://www.replicate.com) to RunPod by following this step-by-step guide, covering setup, model identification, Docker image building, and serverless endpoint creation.

### Banana

- [Banana migration](/tutorials/migrations/banana/overview): Quickly migrate from Banana to RunPod with Docker, leveraging a bridge between the two environments for a seamless transition. Utilize a Dockerfile to encapsulate your environment and deploy existing projects to RunPod with minimal adjustments.
