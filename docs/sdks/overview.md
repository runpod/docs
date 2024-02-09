---
title: Overview
description: Overview of the SDKs
sidebar_position: 1
---

RunPod SDKs provide developers with tools to use the RunPod API for creating serverless functions and managing infrastructure.
They enable custom logic integration, simplify deployments, and allow for programmatic infrastructure management.

## Serverless Functions

Serverless functions allow you to execute code in response to events without the need to manage server infrastructure.

### Creating Serverless Functions

With the RunPod SDKs, you can create serverless functions by writing custom handlers.

These handlers define the logic executed when the function is invoked.

1. **Set up environment**: Ensure the RunPod SDK is installed and configured in your development environment.
2. **Write a Handler Function**: Define the logic you want to execute.
   The handler function acts as the entry point for your serverless function.
3. **Deploy the Function**: Use the RunPod SDK to deploy your serverless function.
   This typically involves specifying the handler, runtime, and any dependencies.
4. **Test the Function**: Invoke your function manually or through an event to test its behavior.

### Interacting with Serverless Endpoints

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
