---
description: Templates define additional configuration for deploying workers
---

# Template Creation

You can access [template creation here](https://www.runpod.io/console/serverless/user/templates).

The following properties can be defined per template.

**Template Name**\
****Name your template anything you want to help your organize your templates.

**Container Image**\
****Location to the container image, could be from docker-hub or any other repository. You can use&#x20;

`runpod/serverless-hello-world`&#x20;

here if you didn't build your own worker.

**Container Registry Credentials**\
****Link container credentials for private repositories. These can be configured in your [user settings menu](https://www.runpod.io/console/serverless/user/settings).

**Docker Command**\
****Command to run on container startup; by default command defined in the Dockerfile will be used.

**Container Disk**\
****Amount of disk required to run your worker. This will depend on how big your model and other files are in the container.

**Environment Variables**\
****Use these to pass config and secrets to your container.
