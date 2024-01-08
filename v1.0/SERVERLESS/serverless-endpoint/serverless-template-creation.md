---
title: "Template Creation"
slug: "serverless-template-creation"
excerpt: "Templates define basic configurations for deploying workers."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Oct 31 2023 17:02:51 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 31 2023 20:58:01 GMT+0000 (Coordinated Universal Time)"
---

After logging into RunPod navigate to [Templates](https://www.dev.runpod.io/console/user/templates) then press `New Template` to open up the template dialog and choose `Serverless` from the Template Type.

### Template Name

Provide a name for your template; this can be anything you would like and is used to organize and locate your template as you add more.

### Container Image

Location to the container image. This could be from docker-hub or any other repository. You can use the following here if you didn't build your own worker:

runpod/serverless-hello-world

### Container Registry Credentials

Link container credentials for private repositories. These can be configured in your user settings menu.

### Docker Command

Command to run on container startup; by default, the command _(CMD)_ defined in the Dockerfile will be used.

### Container Disk

Amount of disk required to run your worker. This will depend on how your model and accompanying files are in the container.

### Environment Variables

Use these to pass config and secrets to your container.
