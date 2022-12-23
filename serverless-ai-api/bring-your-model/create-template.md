---
description: Create a new template for your model.
---

# Create Template

Template helps defines the config to deploy workers. The following properties can be defined per template.



**Template Name**\
****Name anything you want to help your organize your templates.

**Container Image**\
****Location to the container image, could be from docker-hub or any other repository.

**Container Registry Credentials**\
****Link container credentials for private repositories.

**Docker Command**\
****Command to run on container startup; by default command defined in docker-file will be used.

**Container Disk**\
****Amount of disk required to run your worker. This will depend on how big your model and other files are in the container.

**Environment Variables**\
****Use these to pass config, or secrets to your container.



Once you have created your template. You can move on to [creating your AI API](create-ai-api.md).

