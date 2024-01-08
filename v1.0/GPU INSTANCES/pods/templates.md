---
title: "Templates"
slug: "templates"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Wed May 31 2023 21:02:58 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 01 2023 17:11:03 GMT+0000 (Coordinated Universal Time)"
---

To create a Template:

1. Login to the console and select [Templates](https://www.runpod.io/console/user/templates).
2. Select **New Template**.
   1. Provide a container image name.
   2. (optional) Provide a container registry credential.
   3. (optional) Provide a docker command.
   4. (optional) Provide a container disk size and volume disk.
      1. Enter a volume mount path.
   5. (optional) Expose ports.
   6. (optional) Provide environment variables.

## Creating a Template

![](https://files.readme.io/8418b2b-image.png)

Templates are used to launch images as a pod; within a template, you define the required container disk size, volume, volume path, and ports needed.

### Environment Variables

![](https://files.readme.io/b7670dd-image.png)

Environment variables are accessible within your pod; define a variable by setting a name with the `key` and then what it should contain with `value`.
