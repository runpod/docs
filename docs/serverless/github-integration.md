---
title: "Get started"
sidebar_position: 2
description: Get started by deploying a Worker and integrating it with GitHub
---

RunPod manages the container registry and build process, enabling seamless integration with your developer workflows.

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

## Clone an Endpoint

One benefit of using RunPod's GitHub integration is it makes iteration with your Serverless code easier.

You can clone an Endpoint and select a new branch for RunPod to watch. This helps unlock working in branches in your organization.

For example, you can have an endpoint named `prod` that watches `main` and another endpoint named `testing` that watches the branch named `feature-release`.

This way you don't test your Endpoints in production while maintaining control of each environment's GPU, Worker count, and more.

Select your Endpoint and choose **Clone Endpoint** and update the configuration from that options page.

## Status

The following statuses are for builds.

| Status name | Description                                  |
| ----------- | -------------------------------------------- |
| Building    | Your container is building.                  |
| Failed      | Something went wrong. Check your build logs. |
| Pending     | RunPod is scheduling the build.              |
| Uploading   | Your container is uploading to the registry. |
| Completed   | The container build and upload is complete.  |
