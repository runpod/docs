---
title: "Endpoint operations"
description: "RunPod's endpoints enable job submission and output retrieval, using a constructed URL starting with https://api.runpod.ai/v2/{endpoint_id}/{operation}. Operations include job submission, synchronous execution, job status checking, and more."
sidebar_position: 5
---

RunPod's endpoints allow you to submit jobs and retrieve outputs.

Access these endpoints at: `https://api.runpod.ai/v2/{endpoint_id}/{operation}`

## /run

- **Method**: `POST`
- **Description**: Asynchronous endpoint for submitting jobs
- **Returns**: Unique Job ID
- **Payload Limit**: 10 MB
- **Rate Limit**: 1000 requests per 10 seconds, 200 concurrent
- **Job Availability**: 30 minutes after completion

## /runsync

- **Method**: `POST`
- **Description**: Synchronous endpoint for shorter running jobs
- **Returns**: Immediate results
- **Payload Limit**: 20 MB
- **Rate Limit**: 2000 requests per 10 seconds, 400 concurrent
- **Job Availability**: 60 seconds after completion

## /status and /stream

All status and stream operations share a rate limit of 2000 requests per 10 seconds, 400 concurrent:

- `/status/{job_id}` - Check job status and retrieve outputs
  - Methods: `GET` | `POST`
- `/status-sync/{job_id}` - Synchronous status check
  - Methods: `GET` | `POST`
- `/stream/{job_id}` - Stream results from generator-type handlers
  - Methods: `GET` | `POST`

Requests will receive a `429 (Too Many Requests)` status if:
- Queue size exceeds 50 jobs AND
- Queue size exceeds endpoint.WorkersMax * 500

## Additional operations

- `/cancel/{job_id}`
  - **Method**: `POST`
  - **Rate Limit**: 100 requests per 10 seconds, 20 concurrent

- `/purge-queue`
  - **Method**: `POST`
  - **Description**: Clears all queued jobs (does not affect running jobs)
  - **Rate Limit**: 2 requests per 10 seconds

- `/health`
  - **Method**: `GET`
  - **Description**: Provides worker statistics and endpoint health

- `/requests`
  - **Method**: `GET`
  - **Rate Limit**: 10 requests per 10 seconds, 2 concurrent

To learn how to run these endpoint operations, see [Manage job operations](/serverless/endpoints/job-operations).
