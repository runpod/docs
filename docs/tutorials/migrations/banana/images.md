---
title: Migrate Your Banana Images to RunPod
sidebar_label: Migrate images
draft: true
---

Migrating your AI models and applications from one cloud service to another can often present a challenge, especially when the two platforms operate differently. This tutorial aims to streamline the process of moving from Banana Dev to RunPod, focusing on transferring Docker-based applications and AI models. Whether you're shifting due to preferences in service offerings, pricing, or performance, this guide will help you through the transition smoothly.

## Introduction

Banana Dev provides an environment for deploying machine learning models easily, while RunPod offers robust and scalable serverless solutions. Transitioning between these platforms involves adapting your application to the new environment's requirements and deploying it effectively.

Below, we'll walk through how to adapt a Python application from Banana Dev to RunPod, including necessary changes to your Dockerfile and deployment configurations.

## Step 1: Understand Your Application

First, take a comprehensive look at your current Banana Dev application. Our example application uses the `potassium` framework for serving a machine learning model:



```python
from io import BytesIO
from potassium import Potassium, Request, Response
from diffusers import DiffusionPipeline, DDPMScheduler
import torch
import base64

# create a new Potassium app
app = Potassium("my_app")

# @app.init runs at startup, and loads models into the app's context
@app.init
def init():
    repo_id="Meina/MeinaUnreal_V3"

    ddpm = DDPMScheduler.from_pretrained(repo_id, subfolder="scheduler")
    
    model = DiffusionPipeline.from_pretrained(
        repo_id, 
        use_safetensors=True,
        torch_dtype=torch.float16,
        scheduler=ddpm
    ).to("cuda")

    context = {
        "model": model,
    }

    return context

# @app.handler runs for every call
@app.handler()
def handler(context: dict, request: Request) -> Response:
    model = context.get("model")

    prompt = request.json.get("prompt")
    negative_prompt = "(worst quality, low quality:1.4), monochrome, zombie, (interlocked fingers), cleavage, nudity, naked, nude"

    image = model(
        prompt=prompt,
        negative_prompt=negative_prompt,
        guidance_scale=7,
        num_inference_steps=request.json.get("steps", 30),
        generator=torch.Generator(device="cuda").manual_seed(request.json.get("seed")) if request.json.get("seed") else None,
        width=512,
        height=512,
    ).images[0]

    buffered = BytesIO()
    image.save(buffered, format="JPEG", quality=80)
    img_str = base64.b64encode(buffered.getvalue())

    return Response(
        json = {"output": str(img_str, "utf-8")}, 
        status=200
    )

if __name__ == "__main__":
    app.serve()
```

This application initializes a BERT model for fill-mask tasks and serves it over HTTP.

---

## Step 2: Adapt Your Code for RunPod

In RunPod, applications can be adapted to run in a serverless manner, which involves modifying your application logic to fit into the RunPod's handler function format. Below is an example modification that adapts our initial Banana Dev application to work with RunPod, using the `diffusers` library for AI model inference:

```python
import runpod
from diffusers import AutoPipelineForText2Image
import base64
import io
import time

# If your handler runs inference on a model, load the model here.
# You will want models to be loaded into memory before starting serverless.

try:
    pipe = AutoPipelineForText2Image.from_pretrained("meina/meinaunreal_v3")
    pipe.to("cuda")
except RuntimeError:
    quit()

def handler(job):
    """ Handler function that will be used to process jobs. """
    job_input = job['input']
    prompt = job_input['prompt']

    time_start = time.time()
    image = pipe(prompt=prompt, num_inference_steps=1, guidance_scale=0.0).images[0]
    print(f"Time taken: {time.time() - time_start}")

    buffer = io.BytesIO()
    image.save(buffer, format="PNG")
    image_bytes = buffer.getvalue()

    return base64.b64encode(image_bytes).decode('utf-8')


runpod.serverless.start({"handler": handler})
```

---
This modification involves initializing your model outside of the handler function to ensure it's loaded into memory before processing jobs, a crucial step for efficient serverless execution.

## Step 3: Update Your Dockerfile

The Dockerfile must also be adapted for RunPod's environment. Here's a comparison between a typical Banana Dev Dockerfile and the adapted version for RunPod:

### Banana Dev Dockerfile

```dockerfile
FROM pytorch/pytorch:1.11.0-cuda11.3-cudnn8-runtime
...
CMD python3 -u app.py
```

---
### RunPod Dockerfile

```dockerfile
FROM runpod/base:0.4.0-cuda11.8.0

CMD python3.11 -u /handler.py
```

---

The key differences include the base image and the execution command, reflecting RunPod's requirements and Python version specifics.

## Step 4: Deploy to RunPod

Once your code and Dockerfile are ready, the next steps involve building your Docker image and deploying it on RunPod. This process typically involves:

- Building your Docker image with the adapted Dockerfile.
- Pushing the image to a container registry (e.g., DockerHub).
- Creating a serverless function on RunPod and configuring it to use your Docker image.

## Testing and Verification

After deployment, thoroughly test your application to ensure it operates as expected within the RunPod environment. This may involve sending requests to your serverless endpoint and verifying the output.

## Conclusion

Migrating from Banana Dev to RunPod involves several key steps: adapting your application code, updating the Dockerfile, and deploying the adapted application on RunPod. By following this guide, you can make the transition smoother and take advantage of RunPod's serverless capabilities for your AI applications.

Remember to review RunPod's documentation for specific details on serverless deployment and configuration options to optimize your application's performance and cost-efficiency.