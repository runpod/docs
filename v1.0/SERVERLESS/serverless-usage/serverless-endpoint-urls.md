---
title: "Endpoint URLs"
slug: "serverless-endpoint-urls"
excerpt: ""
hidden: false
createdAt: "Tue Oct 31 2023 21:12:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Nov 30 2023 17:24:42 GMT+0000 (Coordinated Universal Time)"
---

These endpoints provide standard functionality for submitting jobs and retrieving the output from job requests. To use these endpoints, you will need to have your endpoint ID. The constructed URL will start with `https://api.runpod.ai/v2/{endpoint_id}` followed by one of the following:

# /run

> Used to submit job requests. A unique Job ID is returned upon submitting a job to this endpoint. The Job ID can be used to check the status of a job and retrieve the output upon completion, or cancel the job before it completes.
>
> _Payload Capacity: 10MB\
> Rate limit: 1000/s\
> Job Availability: Successful job results are accessible for 30 minutes after completion_
>
> ### Response Example
>
> ```json
> { "id": "eaebd6e7-6a92-4bb8-a911-f996ac5ea99d", "status": "IN_QUEUE" }
> ```

# /runsync

> Used for shorter running jobs. When a job is submitted to this endpoint, if the job completes within 90 seconds, the job output is returned in the same request. If the job does not complete within this time frame, a Job ID is returned instead, which can be used to check the job status and retrieve the output upon completion.
>
> _Payload Capacity: 20MB\
> Rate limit: 2000 per second.\
> Job Availability: Successful job results only maintained for 60 seconds after completion._
>
> ### Response Example
>
> ```json
> {
>   "delayTime": 824,
>   "executionTime": 3391,
>   "id": "sync-79164ff4-d212-44bc-9fe3-389e199a5c15",
>   "output": [
>     {
>       "image": "https://14068d66ba387efac9ce5e4b1741bcf2.r2.cloudflarestorage.com/ai-api/06-23/sync-79164ff4-d212-44bc-9fe3-389e199a5c15_0.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=16b502c87564788383d52ec498a61a24%2F20230613%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230613T101718Z&X-Amz-Expires=604800&X-Amz-SignedHeaders=host&X-Amz-Signature=8e810e9593c56523a77107875f2aa14a997ba64115fbc04856e68bf67da296a1",
>       "seed": 46578
>     }
>   ],
>   "status": "COMPLETED"
> }
> ```

# /stream/{job_id}

> Used in conjunction with generator-type handlers. As generator-type handlers yield results, these results will become available at the streaming endpoint.
>
> ### Response Example
>
> ```json
> {
>   "id": "00000000-0000-0000-0000-000000000000",
>   "delayTime": 1234,
>   "status": "IN_PROGRESS",
>   "stream": [{ "output": "A partial" }]
> }
> ```

# /status/{job_id}

> Used to check the status of a job. Replace {job_id} with the unique Job ID returned when the job was submitted. The output is returned at this endpoint if the job is completed; otherwise, you will receive the current status of the job. If your handler returns progress updates, those updates can be retrieved by calling status on the job_id.
>
> ### Response Example
>
> ```json
> # Status of a job currently in the queue, waiting for a worker to grab it.
> {'id': '5a65c668-e99e-4e4c-81fd-0d106a843ee8', 'status': 'IN_QUEUE'}
>
> # Status of a job that has finished.
> {
>   'delayTime': 609,
>  	'executionTime': 3050,
>  	'id': '525b1754-4cf4-4983-a0c0-7ba9799f3e74',
>  	'output': [{'image': 'https://example.com/image.png',
>   'seed': 46578}],
>  	'status': 'COMPLETED'
> }
> ```

# /cancel/{job_id}

> Used to cancel a job early. Replace {job_id} with the unique Job ID of the job you wish to cancel.
>
> ### Response Example
>
> ```json
> { "id": "e8d30bc5-9e9c-4bed-a3a2-0daaddda77ea", "status": "CANCELLED" }
> ```

# /health

> Used to receive worker numbers and additional statistics on a particular endpoint.
>
> _Only accepts GET method. _
>
> ### Response Example
>
> ```json
> {
>   "jobs": {
>     "completed": 1,
>     "failed": 5,
>     "inProgress": 0,
>     "inQueue": 2,
>     "retried": 0
>   },
>   "workers": {
>     "idle": 0,
>     "running": 0
>   }
> }
> ```

# /purge-queue

> Clears all jobs in the queue; it will not cancel jobs in progress
>
> ### Response Example
>
> ```json
> {
>   "removed": 0,
>   "status": "completed"
> }
> ```
