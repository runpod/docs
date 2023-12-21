---
title: "Retrieve Results & Status"
slug: "retrieve-results-status-copy"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 25 2023 00:52:16 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Aug 31 2023 16:43:54 GMT+0000 (Coordinated Universal Time)"
---

When a request is made using the `/run` endpoint, or if a job takes longer than 90 seconds to complete when using the `/runsync` endpoint, a job ID will be returned. This job ID is essential for tracking the progress of a job and obtaining its results upon completion. To do so, use the `/status/{job_id}` endpoint described below.

### Check Job Status and Retrieve Results

To check the status of a job or retrieve its results once completed, make a request to the `/status/{job_id}` endpoint, replacing `{job_id}` with the specific job ID received earlier.

1. **Checking job status:** If the job is still in progress, the endpoint will return the current status of the job (e.g., "IN_QUEUE", "IN_PROGRESS", "FAILED", "COMPLETED", ).
2. **Retrieving job results:** If the job has been completed successfully, the endpoint will return the results of the job.

Please note that you should periodically poll the `/status/{job_id}` endpoint to monitor the progress of your job and retrieve the results once it has finished.

**Note: Job results are kept for up to 30 minutes after a job is completed. **
