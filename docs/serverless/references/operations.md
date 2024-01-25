---
title: "Endpoint operations"
description: "Comprehensive guide on interacting with models using RunPod's API Endpoints without managing the pods yourself."
sidebar_position: 2
---

RunPod's endpoints facilitate submitting jobs and retrieving outputs. Endpoints available to all users are:

- `/run`: Asynchronous endpoint for submitting jobs. Returns a unique Job ID.
- `/runsync`: Synchronous endpoint for shorter running jobs, returning immediate results.
- `/stream/{job_id}`: For streaming results from generator-type handlers.
- `/status/{job_id}`: To check the job status and retrieve outputs upon completion.
- `/cancel/{job_id}`: To cancel a job prematurely.
- `/health`: Provides worker statistics and endpoint health.
- `/purge-queue`: Clears all queued jobs.
