---
title: Managing Projects
description: Manage your RunPod project.
sidebar_position: 2
---

Projects enable you to develop and deploy endpoints entirely on RunPod's infrastructure.

## Create a project

A RunPod project is a folder with everything you need to run a development session on a Pod.

1. To create a new project, run the following command.

```
runpod project create
```

2. Select a starter project. Starter projects include preliminary settings for different kinds of project environments, such as LLM or image diffusion development.
3. Check the [base image](https://github.com/runpod/containers/tree/main/official-templates/base) for included dependencies.
4. (Optional) If you need dependencies that are not included or added by your starter project, add them to the generated `requirements.txt` file.
5. Save your changes.

You've customized your project, and now you're ready to run a development session.

## Run a development session

A development session is the active connection between your local environment and the project environment on your Pod. During a development session, local changes to your project propagate to the project environment in real time.

1. To start a development session, run the following command.

```
runpodctl project dev
```

2. When you're done developing, press `ctrl` + `c` to end the session. Your Pod will terminate automatically when the session ends.

:::tip

You can resume developing at any time by running `runpodctl project dev` again.

:::

Now that you've developed your project, you can deploy an endpoint directly to RunPod or build a Dockerfile to create a portable image.

## Deploy a project

When you deploy a project, RunPod creates a serverless endpoint with access to saved project data on your network volume.

To deploy a project, run the following command.

```
runpodctl project deploy
```

You now have a serverless endpoint. To learn more, refer to [Endpoints](/docs/serverless/endpoints/).

## Build a project

You have the option to build your project instead of deploying it as an endpoint. When you build a project, RunPod emits a Dockerfile.

To build a project, run the following command.

```
runpodctl project build
```

You can use the generated Dockerfile to build an image, then deploy the image to any API server.
