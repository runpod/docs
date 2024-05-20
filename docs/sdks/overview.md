---
title: Overview
description: "Unlock serverless functionality with RunPod SDKs, enabling developers to create custom logic, simplify deployments, and programatically manage infrastructure, including Pods, Templates, and Endpoints."
sidebar_position: 1
---

RunPod SDKs provide developers with tools to use the RunPod API for creating serverless functions and managing infrastructure.
They enable custom logic integration, simplify deployments, and allow for programmatic infrastructure management.

## Interacting with Serverless Endpoints

Once deployed, serverless functions is exposed as an Endpoints, you can allow external applications to interact with them through HTTP requests.

#### Interact with Serverless Endpoints:

Your Serverless Endpoints works similarlly to an HTTP request.
You will need to provide an Endpoint Id and a reference to your API key to complete requests.

## Infrastructure management

The RunPod SDK facilitates the programmatic creation, configuration, and management of various infrastructure components, including Pods, Templates, and Endpoints.

### Managing Pods

Pods are the fundamental building blocks in RunPod, representing isolated environments for running applications.

#### Manage Pods:

1. **Create a Pod**: Use the SDK to instantiate a new Pod with the desired configuration.
2. **Configure the Pod**: Adjust settings such as GPU, memory allocation, and network access according to your needs.
3. **Deploy Applications**: Deploy your applications or services within the Pod.
4. **Monitor and scale**: Utilize the SDK to monitor Pod performance and scale resources as required.

### Manage Templates and Endpoints

Templates define the base environment for Pods, while Endpoints enable external access to services running within Pods.

#### Use Templates and Endpoints:

1. **Create a Template**: Define a Template that specifies the base configuration for Pods.
2. **Instantiate Pods from Templates**: Use the Template to create Pods with a consistent environment.
3. **Expose Services via Endpoints**: Configure Endpoints to allow external access to applications running in Pods.
