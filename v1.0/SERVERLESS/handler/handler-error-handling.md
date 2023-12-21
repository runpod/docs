---
title: "Error Handling"
slug: "handler-error-handling"
excerpt: "Managing errors while processing a job."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Oct 31 2023 14:05:56 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 31 2023 15:28:39 GMT+0000 (Coordinated Universal Time)"
---

By default, if an exception is raised within your handler function, the runpod SDK will catch it and return it as part of the job results. Jobs that produce an error will have their final status "FAILED."

## Custom Errors

There are times when you may want to flag a job as failed and return an error. For example, if your job requires a _seed_ key to be included as part of the input, you might first validate the job input and then return an error indicating that this field was missing. This might look like the following:

```python
import runpod 

def handler(job):
  job_input = job["input"]
  
  if not job_input.get("seed", False):
    return {"error": "Input is missing the 'seed' key, please include a seed and try your request again"}
  
  return "Everything looks good!"

runpod.serverless.start({"handler": handler})
```

> ❗️ Careful not to swallow errors when using a `try/except` within your handler function. Either return the error or raise it if the job should result should be "FAILED".
