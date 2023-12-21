---
title: "Worker Image Creation"
slug: "worker-image-creation"
excerpt: "Workers are Docker containers that can be easily configured to run your jobs."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Mar 28 2023 23:39:48 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Nov 04 2023 00:55:46 GMT+0000 (Coordinated Universal Time)"
---

It's easy to create a container image using our [Python SDK](https://github.com/runpod/runpod-python). For a simple "Hello, world!" example, you can check out this [repository](https://github.com/runpod/serverless-workers/tree/main/Tutorials/helloworld).

This is the Dockerfile for Hello, World:

<!-- dprint-ignore-start -->
```python
from python:3.11.1-buster

WORKDIR /

RUN pip install runpod

ADD handler.py .

CMD [ "python", "-u", "/handler.py" ]
```
<!-- dprint-ignore-end -->

Your Dockerfile should package all dependencies required to run your code. You should also bake in any models that you wish to have cached between jobs. You should aim to build a Docker container that is under 15-20GB maximum. **Be advised that we do not give the elevated privileges that enable Docker-in-Docker, so the container will need to be built off of Runpod.**

Our simple example only packages the handler.py file, which is called as the default Docker command, so that it runs when the container starts.

<!-- dprint-ignore-start -->
```python
import runpod
import os
import time

sleep_time = int(os.environ.get('SLEEP_TIME', 3))

## load your model(s) into vram here

def handler(event):
    print(event)
    time_slept = 0
    while time_slept < sleep_time:
        print("working, I promise")
        time_slept += 1
        time.sleep(1)
    # do the things

    return "Hello World"


runpod.serverless.start({
    "handler": handler
})
```
<!-- dprint-ignore-end -->

Important things to note for handler.py:

- Import runpod as a dependency.
- Write the code that loads your model into VRAM outside of the handler function. This will cause it to be warm between job runs. Otherwise, you will have to load and unload from VRAM every time a new job starts.\
  Your handler function gets an "event" as the only function parameter. This includes metadata as well as whatever is passed to your API under the "input" property.
- You must invoke the runpod.serverless.start function and pass your handler function under the "handler" property.
- You must return something as output when your worker is done processing the job. This can directly be the output, or it can be links to cloud storage where the artifacts are saved. Keep in mind that the input and output payloads are limited to 2MB each. If your inputs or outputs are larger than that, you can upload them to S3 or other cloud storage and have your worker download/upload from there.

<!-- dprint-ignore-start -->
```json
// example event payload
{
  "delayTime": 2534,
  "id": "2a16b881-830f-4d14-af5b-f7db7c0a96fc",
  "input": {
    "prompt": "A beautiful painting of a singular lighthouse, shining its light across a tumultuous sea of blood by greg rutkowski and thomas kinkade, Trending on artstation."
  },
  "status": "IN_PROGRESS"
}
```
<!-- dprint-ignore-end -->

This Hello, World example simply takes whatever is passed to it, pretends it's doing work for 3 seconds (or whatever is configured in the env variable), then returns "Hello, World" as an output.

Build and push your image to your favorite container image repository when you're done.

While you can't currently use RunPod for this step, we are looking for ways to make this part of the development experience more smooth. [Let us know](https://www.runpod.io/contact) if you have ideas or feature requests to make this part of the workflow more streamlined!
