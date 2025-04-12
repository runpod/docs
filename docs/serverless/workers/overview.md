---
title: Overview
sidebar_position: 1
description: "RunPod is a cloud-based platform for managed function execution, offering fully managed infrastructure, automatic scaling, flexible language support, and seamless integration, allowing developers to focus on code and deploy it easily."
---

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
