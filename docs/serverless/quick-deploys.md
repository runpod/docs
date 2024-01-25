---
title: Quick Deploys
id: quick-deploys
sidebar_position: 2
---

Quick Deploys lets you deploy custom Endpoints of popular models with minimal configuration.

You can find [Quick Deploys](https://www.runpod.io/console/serverless) and their descriptions in the Web interface.

## How to do I get started with Quick Deploys?

You can get started by following the steps below:

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) in the Web interface.
2. Select your model.
3. Provide a name for your Endpoint.
4. Select your GPU instance.
   1. (optional) You can further customize your deployment.
5. Select **Deploy**.

Your Endpoint Id is now created and you can use it in your application.

## Customizing your Functions

To customize AI Endpoints, visit the [RunPod GitHub repositories](https://github.com/runpod-workers).
Here, you can fork the programming and compute model templates.

Begin with the [worker-template](https://github.com/runpod-workers/worker-template) and modify it as needed.
These RunPod workers incorporate CI/CD features to streamline your project setup.

For detailed guidance on customizing your interaction Endpoints, refer to [Handler Functions](/serverless/workers/handlers/overview).
