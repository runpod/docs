---
description: There are shared functions that are accessible by all serverless APIs.
---

# Worker Functions

## Webhook

To be notified of completed jobs, a URL can be passed within the top level of the request like so:

```json
{
    "input": "Data needed to complete the job.",
    "webhook": "https://URL.TO.YOUR.WEBHOOK"
}
```

A POST request will be sent to your URL when the job is complete. This request will contain the same information you would receive if you fetched the results from the /status/{id} endpoint.&#x20;

_Note: Webhook functionality is identical regardless of the worker._&#x20;

## S3 Compatible Storage&#x20;

The credentials for S3-compatible object storage can be passed in with the request as follows:

```json
{
    "input": "Data needed to complete the job.",
    "s3Config": {
        "accessId": "key_id_or_username",
        "accessSecret": "key_secret_or_password",
        "bucketName": "storage_location_name",
        "endpointUrl": "storage_location_address"
    },
}
```

The configuration is only passed onto the worked, it will not be returned as part of the job request output.&#x20;

_Note: The serverless worker will need to contain the logic/functionality that allows it to make sure of this input. If you build a custom endpoint and request s3Config in the input, your worker is ultimately responsible for using the information passed in to upload the output._

## Worker Controls&#x20;

When completing long-running job requests or complicated requests that involve a lot of reading and writing files, starting with a fresh worker can be beneficial each time. A flag can be returned with the resulting job output to stop and refresh the used worker. This behavior is achieved by doing the following within your worker:

```python
# Requires runpod python version 0.9.0+

def your_handler(job):
    .
    .
    ...
    Your handlers functionality here.
    ...
    .
    .
    return {"refresh_worker": True, "job_results": "can be anything"}
```

Your handler must return a dictionary that contains `refresh_worker,` this flag will be removed before the remaining job output is returned.&#x20;

_Note: Refreshing a worker does not impact billing or count for/against your min, max, and warmed workers. It simply "resets" that worker at the end of a job._&#x20;
