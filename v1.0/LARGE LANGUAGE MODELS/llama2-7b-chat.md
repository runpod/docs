---
title: "Llama2 7B Chat"
slug: "llama2-7b-chat"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Aug 11 2023 05:51:57 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Fri Sep 29 2023 19:55:44 GMT+0000 (Coordinated Universal Time)"
---

## Retrieve Results & Status

**Note: For information on how to check job status and retrieve results, please refer to our [Status Endpoint Documentation](https://docs.runpod.io/reference/status).**

## Streaming Token Outputs

1. Make a POST request to the /llama2-7b-chat/run API endpoint.
2. Retrieve the job ID.
3. Make a GET request to /llama2-7b-chat/stream/{job-id} to retrieve the real-time token output.

Here's a code sample in Python:

<!-- dprint-ignore-start -->
```python python
import requests
import json
import time

url = f"https://api.runpod.ai/v2/llama2-7b-chat/run"

headers = {
  "Authorization":"XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  "Content-Type": "application/json"
}

prompt = """
Write me an essay about how the french revolution impacted the rest of europe over the 18th century. 
"""

payload = {
  "input": {
    "prompt": prompt,
    "sampling_params": {
      "max_tokens": 1000,
      "n": 1,
      "presence_penalty": 0.2,
      "frequency_penalty": 0.7,
      "temperature": 0.3,
    }
  }
}

response = requests.post(url, headers=headers, json=payload)
response_json = json.loads(response.text)
status_url = f"https://api.runpod.ai/v2/llama2-7b-chat/stream/{response_json['id']}"


for i in range(10):
  time.sleep(1)
  get_status = requests.get(status_url, headers=headers)
  print(get_status.text) 

	# example output from print(get_status.text)
	"""{"status":"IN_PROGRESS","stream":[{"output":{"text":["\nWrite me an essay about how the french revolution impacted the rest of europe over the 18th century. \n\nThe French Revolution, which began in 1789 and lasted for over a decade, had a profound impact on Europe in the late 18th century. The revolution, which was sparked by economic hardship, political corruption, and social inequality, led to the overthrow of the French monarchy and the establishment of a new political order. This essay will examine how the French Revolution impacted the rest of Europe during this period.\nOne of the most significant ways in which the French Revolution impacted"]}},{"output":{"text":["\nWrite me an essay about how the french revolution impacted the rest of europe over the 18th century. \n\nThe French Revolution, which began in 1789 and lasted for over a decade, had a profound impact on Europe in the late 18th century. The revolution, which was sparked by economic hardship, political corruption, and social inequality, led to the overthrow of the French monarchy and the establishment of a new political order. This essay will examine how the French Revolution impacted the rest of Europe during this period.\nOne of the most significant ways in which the French Revolution impacted Europe was"]}},{"output":{"text":["\nWrite me an essay about how the french revolution impacted the rest of europe over the 18th century. \n\nThe French Revolution, which began in 1789 and lasted for over a decade, had a profound impact on Europe in the late 18th century. The revolution, which was sparked by economic hardship, political corruption, and social inequality, led to the overthrow of the French monarchy and the establishment of a new political order. This essay will examine how the French Revolution impacted the rest of Europe during this period.\nOne of the most significant ways in which the French Revolution impacted Europe was through its"]}},{"output":{"text":["\nWrite me an essay about how the french revolution impacted the rest of europe over the 18th century. \n\nThe French Revolution, which began in 1789 and lasted for over a decade, had a profound impact on Europe in the late 18th century. The revolution, which was sparked by economic hardship, political corruption, and social inequality, led to the overthrow of the French monarchy and the establishment of a new political order. This essay will examine how the French Revolution impacted the rest of Europe during this period.\nOne of the most significant ways in which the French Revolution impacted Europe was through its influence on"]}}]}"""
```
<!-- dprint-ignore-end -->

### Worker Resources

- [Source Code Repository](https://github.com/runpod-workers/worker-vllm)
