---
title: "Endpoint operations"
description: "RunPod's Endpoints enable job submission and output retrieval, using a constructed URL starting with https://api.runpod.ai/v2/{endpoint_id}/{operation}. Operations include job submission, synchronous execution, job status checking, and more."
sidebar_position: 2
---

RunPod's Endpoints facilitate submitting jobs and retrieving outputs.

To use these Endpoints, you will need to have your Endpoint ID.
The constructed URL will start with `https://api.runpod.ai/v2/{endpoint_id}/{operation}` followed by an operation.

Operations available to all users are:

- `/run`: Asynchronous endpoint for submitting jobs. Returns a unique Job ID.
  - Payload capacity: 10 MB
  - Rate limit: 1000 per second
  - Job availability: Job results are accessible for 30 minutes after completion
- `/runsync`: Synchronous endpoint for shorter running jobs, returning immediate results.
  - Payload capacity: 20 MB
  - Rate limit: 2000 requests every 10 seconds
  - Job availability: Job results are accessible for 60 seconds after completion
- `/stream/{job_id}`: For streaming results from generator-type handlers.
- `/status/{job_id}`: To check the job status and retrieve outputs upon completion.
- `/cancel/{job_id}`: To cancel a job prematurely.
- `/health`: Provides worker statistics and endpoint health.
  - Only accepts `GET` methods
- `/purge-queue`: Clears all queued jobs, it will not cancel jobs in progress.

To see how to run these Endpoint Operations, see [Invoke a Job](/serverless/endpoints/job-operations).
