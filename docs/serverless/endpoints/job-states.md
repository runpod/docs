---
title: "Job states and metrics"
description: "Learn how to monitor your RunPod endpoints, including job states, performance metrics, and system health indicators to effectively manage and optimize your serverless workloads."
sidebar_position: 9
---

Understanding job states and metrics is essential for effectively managing your Serverless endpoints. This documentation covers the different states your jobs can be in and the key metrics available to monitor endpoint performance and health.

## Request job states

Understanding job states helps you track the progress of individual requests and identify where potential issues might occur in your workflow.

- `IN_QUEUE`: The job is waiting in the endpoint queue for an available worker to process it.
- `RUNNING`: A worker has picked up the job and is actively processing it.
- `COMPLETED`: The job has finished processing successfully and returned a result.
- `FAILED`: The job encountered an error during execution and did not complete successfully.
- `CANCELLED`: The job was manually cancelled using the `/cancel/job_id` endpoint before completion.
- `TIMED_OUT`: The job either expired before it was picked up by a worker or the worker failed to report back before reaching the timeout threshold.

## Endpoint metrics

You can find endpoint metrics in the **Metrics** tab of the Serverless endpoint details page in the [RunPod web interface](https://www.runpod.io/console/serverless).

- **Requests**: Displays the total number of requests received by your endpoint, along with the number of completed, failed, and retried requests.
- **Execution time**: Displays the P70, P90, and P98 execution times for requests on your endpoint. These percentiles help analyze execution time distribution and identify potential performance bottlenecks.
- **Delay time**: Delay time is the duration a request spends waiting in the queue before it is picked up by a worker. Displays the P70, P90, and P98 delay times for requests on your endpoint. These percentiles help assess whether your endpoint is scaling efficiently.
- **Cold start time**: Cold start time measures how long it takes to wake up a worker. This includes the time needed to start the container, load the model into GPU VRAM, and get the worker ready to process a job. Displays the P70, P90, and P98 cold start times for your endpoint.
- **Cold start count**: Displays the number of cold starts your endpoint has during a given period. The fewer, the better, as fewer cold starts mean faster response times.
- **WebhookRequest responses**: Displays the number of webhook requests sent and their corresponding responses, including success and failure counts.
- **Worker states**: Displays the number of workers that are [running, idle, throttled, etc.](/serverless/workers/overview) across the selected time interval.
