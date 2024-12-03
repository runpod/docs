---
title: "Get started"
sidebar_position: 2
description: Get started by deploying a Worker and integrating it with GitHub
---

RunPod manages the container registry and docker build process, enabling seamless integration with your developer workflow.

1. Pulls your code and Dockerfile
2. Builds the container image using layer caching for speed
3. Stores it in our secure container registry
4. Deploys it to your endpoint

This integration enables you to focus on development while RunPod handles the infrastructure complexity.

:::note

You must use [RunPod](docs/serverless/workers/development/overview) Python library to develop your Serverless worker.

:::

## Authorize RunPod

You will need to authorize RunPod to have access to deploy your GitHub repository as a container.

You can connect and authorize your GitHub account either through the [settings page](http://runpod.io/console/user/settings) or when deploying through the GitHub integration for the first time.
Only one GitHub account per RunPod account can be connected at a time.

Authorizing the integration allows the following options:

- **All repositories:** This applies to all current _and_ future repositories owned by the resource owner. Also includes public repositories (read-only).
- **Only select repositories**: Select at least one repository. Also includes public repositories (read-only).

You can manage the connection through the settings page of RunPod or within your GitHub account.

## Set up

To get started with the GitHub integration use the following steps:

1. Go to the [Serverless section](http://runpod.io/console/serverless).
2. Select **+ New Endpoint** and choose **GitHub Repo**.
3. Select **Next**.
4. Select the repository you want to connect to and choose **Next**.
5. Configure your deployment options and choose **Next**:
   1. **Branch**: Select the branch to watch for updates to.
   2. **Dockerfile**: Specify the path to the Dockerfile.
6. Configure your compute options

Your GitHub repository is now configured with RunPod.

Every `git push` to your specified branch results in an updated Endpoint.

:::note

Your first build will take some time; however, every subsequent build will rely on RunPod's intelligent layer caching to build your container images faster.

:::

## Multiple Environments

GitHub Integration enables streamlined development workflows for your Serverless endpoints. By cloning endpoints and connecting them to different branches, you can maintain separate environments for testing and production.

For instance:

- Production endpoint tracking the `main` branch
- Staging endpoint tracking the `dev` branch

Each environment maintains independent GPU and worker configurations. To set this up, select **Clone Endpoint** and modify the repository branch setting.
This ensures safe testing while maintaining full control over your deployment environments.

## Status

Builds can have the following statuses:

| Status name | Description                                  |
| ----------- | -------------------------------------------- |
| Building    | Your container is building.                  |
| Failed      | Something went wrong. Check your build logs. |
| Pending     | RunPod is scheduling the build.              |
| Uploading   | Your container is uploading to the registry. |
| Completed   | The container build and upload is complete.  |
