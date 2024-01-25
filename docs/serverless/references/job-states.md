---
title: "Job states"
id: "job-states"
description: "Learn about the different states a serverless job can be in during its lifecycle."
sidebar_position: 5
---

When working with Handler Functions in RunPod, it's essential to understand the various states a job can go through from initiation to completion.
Each state provides insight into the job's current status and helps in managing the job flow effectively.

## Job state

Here are the states a job can be in:

- `IN_QUEUE`: This state indicates that the job is currently in the endpoint queue. It's waiting for an available worker to pick it up for processing.
- `IN_PROGRESS`: Once a worker picks up the job, its state changes to `IN_PROGRESS`. This means the job is actively being processed and is no longer in the queue.
- `COMPLETED`: After the job successfully finishes processing and returns a result, it moves to the `COMPLETED` state. This indicates the successful execution of the job.
- `FAILED`: If a job encounters an error during its execution and returns with an error, it is marked as `FAILED`. This state signifies that the job did not complete successfully and encountered issues.
- `CANCELLED`: Jobs can be manually cancelled using the `/cancel/job_id` endpoint. If a job is cancelled before it completes or fails, it will be in the `CANCELLED` state.
- `TIMED_OUT`: This state occurs in two scenarios: when a job expires before a worker picks it up, or if the worker fails to report back a result for the job before it reaches its timeout threshold.
