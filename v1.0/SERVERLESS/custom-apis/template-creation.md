---
title: "Template Creation"
slug: "template-creation"
excerpt: "Templates define additional configuration for deploying workers."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Mar 28 2023 23:42:35 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Apr 29 2023 14:17:05 GMT+0000 (Coordinated Universal Time)"
---

You can access [template creation here](https://www.runpod.io/console/serverless/user/templates).

The following properties can be defined per template.

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/8cd505f-image.png",
null,
""
],
"align": "center",
"sizing": "% "
}
]
}
[/block]

### Template Name

Name your template anything you want to help you organize your templates.

### Container Image

Location to the container image. This could be from docker-hub or any other repository. You can use the following here if you didn't build your own worker:

runpod/serverless-hello-world

### Container Registry Credentials

Link container credentials for private repositories. These can be configured in your [user settings menu](https://www.runpod.io/console/serverless/user/settings).

### Docker Command

Command to run on container startup; by default, command defined in the Dockerfile will be used.

### Container Disk

Amount of disk required to run your worker. This will depend on how your model and accompanying files are in the container.

### Environment Variables

Use these to pass config and secrets to your container.
