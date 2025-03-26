---
title: Stable Diffusion worker
description: "Deploy and customize Stable Diffusion image generation models on RunPod using our optimized worker implementation. Generate high-quality images with simple API calls."
sidebar_position: 1
---

# Stable Diffusion worker

The RunPod Stable Diffusion worker provides an optimized implementation of Stable Diffusion models for image generation. This worker allows you to deploy and interact with Stable Diffusion models through a simple API interface.

## Features

- Support for multiple Stable Diffusion versions (XL, 2.1, 1.5)
- Optimized inference for faster generation
- Advanced sampling techniques (DDIM, DPM-Solver, etc.)
- Support for various generation parameters (guidance scale, steps, etc.)
- Image-to-image and inpainting capabilities
- ControlNet and LoRA adaptation support

## Quick deployment

### Option 1: Deploy from template

1. Go to the [RunPod Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Select "Stable Diffusion XL" from the templates
4. Configure your endpoint settings:
   - GPU Type: A10G or higher recommended
   - Worker Count: 0 (scale to zero) or 1+ for immediate availability
   - Max Workers: Based on your expected load
5. Click "Deploy"

### Option 2: Use custom Docker image

```bash
docker pull runpod/stable-diffusion:latest
```

## API usage

### Text-to-image generation

```json
{
  "input": {
    "prompt": "A photorealistic cat astronaut floating in space, 4k, detailed",
    "negative_prompt": "deformed, ugly, bad anatomy",
    "width": 1024,
    "height": 1024,
    "num_inference_steps": 30,
    "guidance_scale": 7.5,
    "seed": 42
  }
}
```

### Image-to-image generation

```json
{
  "input": {
    "prompt": "A castle in a magical forest",
    "negative_prompt": "deformed, ugly, bad anatomy",
    "image": "https://example.com/input-image.jpg",
    "strength": 0.75,
    "num_inference_steps": 30,
    "guidance_scale": 7.5
  }
}
```

## Configuration

### Environment variables

| Variable | Description | Default |
|----------|-------------|---------|
| `SD_MODEL` | Model version to use | `stabilityai/stable-diffusion-xl-base-1.0` |
| `PRECISION` | Inference precision | `fp16` |
| `ENABLE_XFORMERS` | Enable memory efficient attention | `true` |
| `MAX_QUEUE_SIZE` | Maximum queue size | `100` |
| `MAX_BATCH_SIZE` | Maximum batch size | `4` |

### Model options

| Model ID | Description | VRAM Required |
|----------|-------------|--------------|
| `stabilityai/stable-diffusion-xl-base-1.0` | SDXL base model | 16GB+ |
| `stabilityai/stable-diffusion-2-1-base` | SD 2.1 base model | 8GB+ |
| `runwayml/stable-diffusion-v1-5` | SD 1.5 | 6GB+ |

## Performance considerations

- A10G GPUs can process approximately 2-3 SDXL images per minute at 1024x1024
- For higher throughput, consider using A100 GPUs or increasing max_workers
- Reducing resolution and inference steps can significantly improve throughput
- Using SD 2.1 or 1.5 instead of SDXL can double throughput with slightly lower quality

## Advanced usage

### Using ControlNet

```json
{
  "input": {
    "prompt": "A fantasy landscape with mountains",
    "controlnet": {
      "type": "canny",
      "image": "https://example.com/canny-image.jpg",
      "conditioning_scale": 0.8
    }
  }
}
```

### Using LoRA models

```json
{
  "input": {
    "prompt": "A portrait in the style of <lora:name:1.0>",
    "lora": {
      "model_id": "path/to/lora",
      "weight": 0.8
    }
  }
}
```

## Examples

### Basic image generation

```python
import requests
import json
import base64
from PIL import Image
import io

API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

def generate_image(prompt):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    payload = {
        "input": {
            "prompt": prompt,
            "negative_prompt": "ugly, deformed, bad anatomy, blurry",
            "num_inference_steps": 30,
            "guidance_scale": 7.5,
            "width": 1024,
            "height": 1024
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response_json = response.json()
    
    # Get job ID
    job_id = response_json.get("id")
    
    # Check status and get result when complete
    status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
    
    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        
        if status_data.get("status") == "COMPLETED":
            # Get the base64 image data
            image_data = status_data.get("output", [])[0]
            # Convert base64 to image
            image = Image.open(io.BytesIO(base64.b64decode(image_data)))
            # Save the image
            image.save("generated_image.png")
            print("Image generated successfully!")
            break
        
        time.sleep(2)  # Poll every 2 seconds

# Generate an image
generate_image("A photorealistic cat astronaut floating in space, 4k, detailed")
```

## Next steps

- [Explore vLLM workers](/docs/serverless/workers/vllm/overview) for text generation
- [Learn about text-to-speech workers](/docs/serverless/workers/specialized/tts) for audio generation
- [Configure autoscaling](/docs/serverless/manage/scaling) to optimize cost and performance

> **Pro tip**: For AI application development, consider using a combination of different worker types to build a complete pipeline (e.g., text generation → image generation → speech synthesis). 