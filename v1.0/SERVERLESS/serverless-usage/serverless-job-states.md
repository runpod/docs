---
title: "Job States/Lifecycle"
slug: "serverless-job-states"
excerpt: "The states a job can be in."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Oct 31 2023 21:33:22 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Nov 08 2023 17:40:58 GMT+0000 (Coordinated Universal Time)"
---

## IN_QUEUE

> Indicates the job is in the endpoint queue and is waiting for a worker to pick it up.

## IN_PROGRESS

> A job is considered to be in progress after it is picked up by a worker and no longer in the queue.

## COMPLETED

> Upon returning a successful result the job is now considered complete.

## FAILED

> A job that returned with an error will be considered failed.

## CANCELLED

> If the `/cancel/{job_id}` endpoint is used to end a job before it as completed/failed it will report as have being cancelled.

## TIMED_OUT

> Jobs that expire before they are picked up by a worker or if the worker never reports back a result for the job before timing out.
