---
title: Glossary
sidebar_position: 1
description: RunPod is a cloud computing platform for AI and machine learning applications, offering GPU and CPU instances, serverless computing, and SDKs for seamless integration.
---

## Community Cloud

GPU instances connect individual compute providers to consumers through a vetted, secure peer-to-peer system.

## Datacenter

A data center is a secure location where RunPod's cloud computing services, such as Secure Cloud and GPU Instances, are hosted. These data centers are equipped with redundancy and data backups to ensure the safety and reliability of your data.

## Endpoint

An Endpoint refers to a specific URL where your serverless applications or services can be accessed. These endpoints provide standard functionality for submitting jobs and retrieving the output from job requests.

## GPU Instance

GPU Instance is a container-based GPU instance that you can deploy.
These instances spin up in seconds using both public and private repositories.
They are available in two different types:

- Secure Cloud
- Community Cloud

## Handler

A Handler is a function that is responsible for processing submitted inputs and generating the resulting output.

## RunPod

RunPod is a cloud computing platform primarily designed for AI and machine learning applications.

## SDKs

RunPod provides several Software Development Kits (SDKs) you can use to interact with the RunPod platform.
These SDKs enable you to create serverless functions, manage infrastructure, and interact with APIs.

## Secure Cloud

GPU instances that run in T3/T4 data centers, providing high reliability and security.

## Serverless CPU

Serverless CPU is a pay-per-second serverless CPU computing solution.
It is designed to bring autoscaling to your production environment, meaning it can dynamically adjust computational resources based on your application's needs.

## Serverless GPU

Serverless GPU is a pay-per-second serverless GPU computing solution.
It is designed to bring autoscaling to your production environment, meaning it can dynamically adjust computational resources based on your application's needs.

## Template

A RunPod template is a Docker container image paired with a configuration.

## Total Workers

Total workers refer to the total number of workers available to your account, which is the sum of the max workers across all your endpoints. If you run out of total workers, please reach out to us by [creating a support ticket](https://contact.runpod.io/).

## Initial Workers

When you first create your endpoint, RunPod needs to download the Docker image for your workers, and they will be marked as initializing during this process.

## Active (Min) Workers

“Always on” workers. Setting active workers to 1 or more ensures that a worker is always ready to respond to job requests without cold start delays.

Default: 0

:::note

Active workers incur charges as soon as you enable them (set to >0), but they come with a discount of up to 30% off the regular price.

:::

## Max Workers

Max workers set the upper limit on the number of workers your endpoint can run simultaneously.

Default: 3

## Flex Workers

Flex workers are "sometimes on" workers (Max Workers - Active Workers) that help scale your endpoint during traffic surges. Once a flex worker completes its job, it goes to “sleep” to save costs. You can adjust the idle timeout to keep them active a little longer, helping to avoid cold start delays when new requests arrive.

Default: Max Workers(3) - Active Workers(0) = 3

## Extra Workers

RunPod caches your worker’s Docker image on our host servers, ensuring faster scalability. If you experience a traffic spike, you can increase the max number of workers, and extra workers will be immediately added as part of the flex workers to handle the increased demand.

Default: 2

## Throttled Worker

If the selected GPUs are not available when your worker starts up, the worker is throttled until resources become available.

## Stale Workers

When you change your endpoint configuration or update the worker with a new Docker image, the worker is marked as stale and replaced with a new worker once it completes its current job. This replacement occurs through a rolling update, where a portion of stale workers are replaced with new workers based on the number of max worker your endpoint has.
