---
description: Workers are docker containers that can be easily configured to run your jobs
---

# Worker Image Creation

It's easy to create a container image using our [python sdk](https://github.com/runpod/runpod-python). For a simple hello world example, you can check out [this repository](https://github.com/runpod/serverless-workers/tree/main/helloworld).

This is the Dockerfile for hello world:

```docker
from python:3.11.1-buster

WORKDIR /

RUN pip install runpod

ADD handler.py .

CMD [ "python", "-u", "/handler.py" ]
```

Your Dockerfile should package all dependencies required to run your code. You should also bake in any models that you wish to have cached between jobs. You should aim to build a docker container that is less than 15-20GB maximum.

Our simple example only packages the handler.py file, which is called as the default docker command, so that it runs when the container starts.

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

Important things to note for handler.py:

* Import `runpod` as a dependency
* Write the code that loads your model into VRAM outside of the handler function. This will cause it to be warm between job runs. Otherwise, you will have to load and unload from VRAM every time a new job starts.
* Your handler function gets an "event" as the only function parameter. This includes metadata as well as whatever is passed to your API under the "input" property.
* You must invoke the `runpod.serverless.start` function and pass your handler function under the "handler" property.
* You must return something as output when your worker is done processing the job. This can directly be the output, or it can be links to cloud storage where the artifacts are saved. Keep in mind that the input and output payloads are limited to 2MB each. If your inputs or outputs are larger than that, you can upload them to S3 or other cloud storage and have your worker download/upload from there.

<pre class="language-json"><code class="lang-json"><strong>// example event payload
</strong><strong>{
</strong>    'delayTime': 2534,
    'id': '2a16b881-830f-4d14-af5b-f7db7c0a96fc',
    'input': {
        'prompt': 'A beautiful painting of a singular lighthouse, shining its light across a tumultuous sea of blood by greg rutkowski and thomas kinkade, Trending on artstation.'
        },
    'status': 'IN_PROGRESS'
}
</code></pre>

This hello world example simply takes whatever is passed to it, pretends its doing work for 3 (or whatever is configured in the env variable) seconds, then returns "hello world" as an output.

Build and push your image to your favorite container image repository when you're done.
