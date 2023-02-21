---
description: Okay so now you have everything set up, but how do you use it?
---

# Using Your API

Once everything above is configured, you will be able to invoke your API using the "run" endpoint on your API dashboard. Our services are currently asynchronous, so you must use the "status" endpoint to get the status/results of each run using the id present in the run response payload. You can also pass in webhook URL when invoking "run" within the JSON body.

Our own APIs are built using the same tools, so you can take a look at the [RunPod API overview](../../ai-endpoints/runpod-apis.md). The only difference is that your custom API endpoint only accepts requests using your own account's API key, not any RunPod API key.
