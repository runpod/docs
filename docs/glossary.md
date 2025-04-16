---
title: Glossary
sidebar_position: 1
description: RunPod is a cloud computing platform for AI and machine learning applications, offering GPU and CPU instances, serverless computing, and SDKs for seamless integration.
---

# Serverless

Serverless is a pay-per-second computing solution designed for dynamic autoscaling in production environments. It automatically adjusts computational resources based on your request traffic, ensuring cost-effective usage.

We offer both GPU and CPU serverless options:

- GPU Serverless: Each worker is equipped with a dedicated GPU, ideal for AI/ML workloads.
- CPU Serverless: Workers come with high-clock-speed CPU cores, suited for general-purpose workloads.

## Worker

A [worker](./serverless/workers/overview.md) is a single compute resource that processes Serverless endpoint requests. Each endpoint can have multiple workers, enabling parallel processing of multiple requests simultaneously.

## Endpoint

An endpoint refers to a specific REST API (URL) provided by RunPod that your applications or services can interact with. These endpoints enable standard functionality for submitting jobs and retrieving their outputs.

## Handler

A handler is a function you create that takes in submitted inputs, processes them (like generating images, text, or audio), and returns the final output.

## Serverless SDK

The [Serverless SDK](https://github.com/runpod/runpod-python?tab=readme-ov-file#--serverless-worker-sdk) is a Python package used when creating a handler function. This package helps your code receive requests from our serverless system, triggers your handler function to execute, and returns the function's result back to the Serverless system.

## Endpoint settings

### Idle timeout

The amount of time a worker remains running after completing its current request. During this period, the worker stays active, continuously checking the queue for new jobs, and continues to incur charges. If no new requests arrive within this time, the worker will go to sleep.

Default: 5 seconds

### Execution timeout

The maximum time a job can run before the system terminates the worker. This prevents "bad" jobs from running indefinitely and draining your credit.

You can disable this setting, but we highly recommend keeping it enabled. The default maximum value is 24 hours, but if you need a longer duration, you can use job TTL to override it.

Default: 600 seconds (10 minutes)

### Job TTL (Time-To-Live)

[Job TTL](/serverless/endpoints/send-requests#execution-policies) defines the maximum time a job can remain in the queue before it's automatically terminated. This parameter ensures that jobs don't stay in the queue indefinitely. You should set this if your job runs longer than 24 hours or if you want to remove job data as soon as it is finished.

Minimum value: 10,000 milliseconds (10 seconds)
Default value: 86,400,000 milliseconds (24 hours)

### FlashBoot

FlashBoot is RunPod's magic solution for reducing the average cold-start times on your endpoint. It works probabilistically. When your endpoint has consistent traffic, your workers have a higher chance of benefiting from FlashBoot for faster spin-ups. However, if your endpoint isn't receiving frequent requests, FlashBoot has fewer opportunities to optimize performance. There's no additional cost associated with FlashBoot.

### Scale type

- Queue Delay scaling strategy adjusts worker numbers based on request wait times. With zero workers initially, the first request adds one worker. Subsequent requests add workers only after waiting in the queue for the defined number of delay seconds.
- Request Count scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently.

### Expose HTTP/TCP ports

We allow direct communication with your worker using its public IP and port. This is especially useful for real-time applications that require minimal latency. Check out this [WebSocket example](https://github.com/runpod-workers/worker-websocket) to see how it works!

## Endpoint metrics

### Requests

Displays the total number of requests received by your endpoint, along with the number of completed, failed, and retried requests.

### Execution time

Displays the P70, P90, and P98 execution times for requests on your endpoint. These percentiles help analyze execution time distribution and identify potential performance bottlenecks.

### Delay time

Delay time is the duration a request spends waiting in the queue before being picked up by a worker. Displays the P70, P90, and P98 delay times for requests on your endpoint. These percentiles help assess whether your endpoint is scaling efficiently.

### Cold start time

Cold start time measures how long it takes to wake up a worker. This includes the time needed to start the container, load the model into GPU VRAM, and get the worker ready to process a job. Displays the P70, P90, and P98 cold start times for your endpoint.

### Cold start count

Displays the number of cold starts your endpoint has during a given period. The fewer, the better, as fewer cold starts mean faster response times.

### WebhookRequest responses

Displays the number of webhook requests sent and their corresponding responses, including success and failure counts.

# Pod

## Secure Cloud

GPU instances that run in T3/T4 data centers, providing high reliability and security.

## Community Cloud

GPU instances connect individual compute providers to consumers through a vetted, secure peer-to-peer system.

## Datacenter

A data center is a secure location where RunPod's cloud computing services, such as Secure Cloud and GPU instances, are hosted. These data centers are equipped with redundancy and data backups to ensure the safety and reliability of your data.

## GPU instance

GPU instance is a container-based GPU instance that you can deploy.
These instances spin up in seconds using both public and private repositories.
They are available in two different types:

- Secure Cloud
- Community Cloud

## Template

A RunPod template is a Docker container image paired with a configuration.

## SDKs

RunPod provides several Software Development Kits (SDKs) you can use to interact with the RunPod platform.
These SDKs enable you to create serverless functions, manage infrastructure, and interact with APIs.
