---
title: "Customize a Template"
slug: "customize-a-template"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Apr 02 2023 17:01:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Sep 28 2023 18:41:15 GMT+0000 (Coordinated Universal Time)"
---

A RunPod [template](https://www.runpod.io/console/templates) is just a Docker container image paired with a configuration. You can choose how deep you want to get into template customization, depending on your skill level.

The easiest is to simply start with a RunPod official template or community template and use it as-is.

If you want better control over what gets done at pod start, you can modify the "Docker Command" field. The default docker command for all RunPod templates is:

```
bash -c '/start.sh'
```

This means that if you want to run something prior to start.sh, you can put extra commands in there. For example, if I wanted to install vim:

```
bash -c 'apt update && apt install vim -y && /start.sh'
```

The only downside to this approach is that you will run these commands every time your pod starts. If you wish to customize the runtime container further, you can create your own Docker image. There is nothing special about creating a Docker image for RunPod, but if you want a simple primer, you can refer to [this blog post](https://www.runpod.io/blog/diy-deep-learning-docker-container).
