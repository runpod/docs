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

A single compute resource that processes requests. Each endpoint can have multiple workers, enabling parallel processing of multiple requests simultaneously

### Total Workers

Total Workers refers to the maximum number of workers available to your account. The sum of the max workers assigned across all your endpoints cannot exceed this limit. If you run out of total workers, please reach out to us by [creating a support ticket](https://contact.runpod.io/).

### Max Workers

Max workers set the upper limit on the number of workers your endpoint can run simultaneously.

Default: 3

### Active (Min) Workers

“Always on” workers. Setting active workers to 1 or more ensures that a worker is always ready to respond to job requests without cold start delays.

Default: 0

:::note

Active workers incur charges as soon as you enable them (set to >0), but they come with a discount of up to 30% off the regular price.

:::

### Flex Workers

Flex Workers are “sometimes on” workers that help scale your endpoint during traffic surges. They are often referred to as idle workers since they spend most of their time in an idle state. Once a flex worker completes a job, it transitions to idle or sleep mode to save costs. You can adjust the idle timeout to keep them running a little longer, reducing cold start delays when new requests arrive.

Default: Max Workers(3) - Active Workers(0) = 3

### Extra Workers

RunPod caches your worker’s Docker image on our host servers, ensuring faster scalability. If you experience a traffic spike, you can increase the max number of workers, and extra workers will be immediately added as part of the flex workers to handle the increased demand.

Default: 2

### Worker States

#### Initializing

When you create a new endpoint or release an update, RunPod needs to download and prepare the Docker image for your workers. During this process, workers remain in an initializing state until they are fully ready to handle requests.

#### Idle

A worker is ready to handle new requests but is not actively processing any. There is no charge while a worker is idle.

#### Running

A running worker is actively processing requests, and you are billed every second it runs. If a worker runs for less than a full second, it will be rounded up to the next whole second. For example, if a worker runs for 2.5 seconds, you will be billed for 3 seconds.

#### Throttled

Sometimes, the machine where the worker is cached may be fully occupied by other workloads. In this case, the worker will show as throttled until resources become available.

#### Outdated

When you update your endpoint configuration or deploy a new Docker image, existing workers are marked as outdated. These workers will continue processing their current jobs but will be gradually replaced through a rolling update, replacing 10% of max workers at a time. This ensures a smooth transition without disrupting active workloads.

#### Unhealthy

When your container crashes, it’s usually due to a bad Docker image, an incorrect start command, or occasionally a machine issue. When this happens, the worker is marked as unhealthy. The system will automatically retry the unhealthy worker after 1 hour, using exponential backoff for up to 7 days. Be sure to check the container logs and fix any issues causing the crash to prevent repeated failures.

## Endpoint

An Endpoint refers to a specific REST API (URL) provided by RunPod that your applications or services can interact with. These endpoints enable standard functionality for submitting jobs and retrieving their outputs.

## Handler

A Handler is a function you create that takes in submitted inputs, processes them (like generating images, text, or audio), and returns the final output.

## Serverless [SDK](https://github.com/runpod/runpod-python?tab=readme-ov-file#--serverless-worker-sdk)

A Python package used when creating a handler function. This package helps your code receive requests from our serverless system, triggers your handler function to execute, and returns the function’s result back to the serverless system.

## Endpoint Settings

### Idle Timeout

The amount of time a worker remains running after completing its current request. During this period, the worker stays active, continuously checking the queue for new jobs, and continues to incur charges. If no new requests arrive within this time, the worker will go to sleep.

Default: 5 seconds

### Execution Timeout

The maximum time a job can run before the system terminates the worker. This prevents “bad” jobs from running indefinitely and draining your credit.

You can disable this setting, but we highly recommend keeping it enabled. The default maximum value is 24 hours, but if you need a longer duration, you can use job TTL to override it.

Default: 600 seconds (10 minutes)

### Job [TTL](https://docs.runpod.io/serverless/endpoints/send-requests#execution-policies)(Time-To-Live)

Defines the maximum time a job can remain in the queue before it's automatically terminated. This parameter ensures that jobs don't stay in the queue indefinitely. You should set this if your job runs longer than 24 hours or if you want to remove job data as soon as it is finished.

Minimum value: 10,000 milliseconds (10 seconds)
Default value: 86,400,000 milliseconds (24 hours)

### Flashboot

FlashBoot is RunPod’s magic solution for reducing the average cold-start times on your endpoint. It works probabilistically. When your endpoint has consistent traffic, your workers have a higher chance of benefiting from FlashBoot for faster spin-ups. However, if your endpoint isn’t receiving frequent requests, FlashBoot has fewer opportunities to optimize performance. There’s no additional cost associated with FlashBoot.

### Scale Type

- Queue Delay scaling strategy adjusts worker numbers based on request wait times. With zero workers initially, the first request adds one worker. Subsequent requests add workers only after waiting in the queue for the defined number of delay seconds.
- Request Count scaling strategy adjusts worker numbers according to total requests in the queue and in progress. It automatically adds workers as the number of requests increases, ensuring tasks are handled efficiently.

### Expose HTTP/TCP Ports

We allow direct communication with your worker using its public IP and port. This is especially useful for real-time applications that require minimal latency. Check out this [WebSocket example](https://github.com/runpod-workers/worker-websocket) to see how it works!

## Endpoint Metrics

### Requests

Displays the total number of requests received by your endpoint, along with the number of completed, failed, and retried requests.

### Execution Time

Displays the P70, P90, and P98 execution times for requests on your endpoint. These percentiles help analyze execution time distribution and identify potential performance bottlenecks.

### Delay Time

Delay time is the duration a request spends waiting in the queue before being picked up by a worker. Displays the P70, P90, and P98 delay times for requests on your endpoint. These percentiles help assess whether your endpoint is scaling efficiently.

### Cold Start Time

Cold start time measures how long it takes to wake up a worker. This includes the time needed to start the container, load the model into GPU VRAM, and get the worker ready to process a job. Displays the P70, P90, and P98 cold start times for your endpoint.

### Cold Start Count

Displays the number of cold starts your endpoint has during a given period. The fewer, the better, as fewer cold starts mean faster response times.

### WebhookRequest Responses

Displays the number of webhook requests sent and their corresponding responses, including success and failure counts.

# Pod

## Secure Cloud

GPU instances that run in T3/T4 data centers, providing high reliability and security.

## Community Cloud

GPU instances connect individual compute providers to consumers through a vetted, secure peer-to-peer system.

## Datacenter

A data center is a secure location where RunPod's cloud computing services, such as Secure Cloud and GPU Instances, are hosted. These data centers are equipped with redundancy and data backups to ensure the safety and reliability of your data.

## GPU Instance

GPU Instance is a container-based GPU instance that you can deploy.
These instances spin up in seconds using both public and private repositories.
They are available in two different types:

- Secure Cloud
- Community Cloud

## Template

A RunPod template is a Docker container image paired with a configuration.

## SDKs

RunPod provides several Software Development Kits (SDKs) you can use to interact with the RunPod platform.
These SDKs enable you to create serverless functions, manage infrastructure, and interact with APIs.
