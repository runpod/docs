# Customize a Template

A RunPod template is just a docker container image paired with some configuration. You can choose how deep you want to get into template customization depending on your skill level.

The easiest is to simply start with a RunPod official template or community template and use it as-is.

If you want better control over what gets done at pod start, you can modify the "Docker Command" field. The default docker command for all RunPod teamplates is:

```
bash -c './start.sh'
```

This means that if you want to run something prior to start.sh, you can put extra commands in there. For example, if I wanted to install vim:

```
bash -c 'apt update && apt install vim -y && ./start.sh'
```

The only downside to this approach is that you will run these commands every time your pod starts. If you wish to further customize the runtime container, you can create your own docker image. There is nothing special about creating a docker image for RunPod, but if you want a simple primer, [you can read this blog post.](https://www.runpod.io/blog/diy-deep-learning-docker-container)
