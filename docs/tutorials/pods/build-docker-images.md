---
title:  Build Docker Images on Runpod Using Bazel
---

# Build Docker Images on RunPod Using Bazel

RunPod's GPU Pods use custom Docker images to run your code.
This means you can't directly spin up your own Docker instance or build Docker containers on a GPU Pod.
Tools like Docker Compose are also unavailable.

This limitation can be frustrating when you need to create custom Docker images for your RunPod templates.

Fortunately, many use cases can be addressed by creating a custom template with the desired Docker image.

In this tutorial, you'll learn how to use the [Bazel](https://bazel.build) build tool to build and push Docker images from inside a RunPod container.

By the end of this tutorial, you’ll be able to build custom Docker images on RunPod and push them to Docker Hub for use in your own templates.

## Prerequisites

Before you begin this guide you'll need the following:

- A Docker Hub account and access token for authenticating the docker login command
- Enough volume for your image to be built

## Create a Pod

1. Navigate to [Pods](https://www.dev.runpod.io/console/pods) and select **+ Deploy**.
2. Choose between **GPU** and **CPU**.
3. Customize your an instance by setting up the following:
   1. (optional) Specify a Network volume.
   2. Select an instance type. For example, **A40**.
   3. (optional) Provide a template. For example, **RunPod Pytorch**.
   4. (GPU only) Specify your compute count.
4. Review your configuration and select **Deploy On-Demand**.

For more information, see [Manage Pods](/pods/manage-pods#start-a-pod).

Wait for the Pod to spin up then connect to your Pod through the Web Terminal:

1. Select **Connect**.
2. Choose **Start Web Terminal** and then **Connect to Web Terminal**.
3. Enter your username and password.

Now you can clone the example GitHub repository

## Clone the example GitHub repository

Clone the example code repository that demonstrates building Docker images with Bazel:

```command
git clone https://github.com/therealadityashankar/build-docker-in-runpod.git && cd build-docker-in-runpod
```

## Install dependencies

Install the required dependencies inside the Runpod container:

Update packages and install sudo:

```command
apt update && apt install -y sudo
```

Install Docker using the convenience script:

```command
curl -fsSL https://get.docker.com -o get-docker.sh && sudo sh get-docker.sh
```

Log in to Docker using an access token:

1. Go to https://hub.docker.com/settings/security and click "New Access Token".
2. Enter a description like "Runpod Token" and select "Read/Write" permissions.
3. Click "Generate" and copy the token that appears.
4. In the terminal, run:

```command
docker login -u <your-username>
```

When prompted, paste in the access token you copied instead of your password.

Install Bazel via the Bazelisk version manager:

```command
wget https://github.com/bazelbuild/bazelisk/releases/download/v1.20.0/bazelisk-linux-amd64
chmod +x bazelisk-linux-amd64  
sudo cp ./bazelisk-linux-amd64 /usr/local/bin/bazel
```

## Configure the Bazel Build

First, install nano if it’s not already installed and open the `BUILD.bazel` file for editing:

```
sudo apt install nano
nano BUILD.bazel
```

Replace the `{YOUR_USERNAME}` placeholder with your Docker Hub username in the `BUILD.bazel` file:

```starlark
[label BUILD.bazel]
oci_push(
    name = "push_custom_image",
    image = ":custom_image",
    repository = "index.docker.io/{YOUR_USERNAME}/custom_image",
    remote_tags = ["latest"]
)
```

## Build and Push the Docker Image

Run the bazel command to build the Docker image and push it to your Docker Hub account:

```command
bazel run //:push_custom_image
```

Once the command completes, go to https://hub.docker.com/ and log in. You should see a new repository called `custom_image` containing the Docker image you just built.

You can now reference this custom image in your own Runpod templates.

## Conclusion

In this tutorial, you used Bazel as an alternative way to build Docker images from inside Runpod containers and push them to Docker Hub. The key steps are:

1. Pulling an existing base image by digest
2. Adding custom files as a new layer
3. Pushing the image to a registry

Now you can create custom Docker images for your own use.
The techniques shown here can be extended to build more complex images as needed.
