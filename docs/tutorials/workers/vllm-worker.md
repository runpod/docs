---
title: Create a vLLM worker
description: "Learn how to create, customize, and deploy a vLLM worker for serving Large Language Models efficiently on RunPod. Follow step-by-step instructions to build your own LLM inference endpoint."
sidebar_position: 2
---

# Creating a custom vLLM worker

In this tutorial, you'll learn how to create and deploy a custom vLLM worker on RunPod. vLLM is a high-performance library for LLM inference that provides significant speedups over traditional methods. We'll walk through setting up your development environment, customizing a vLLM worker, and deploying it as a serverless endpoint.

## Prerequisites

- RunPod account with serverless access
- Docker installed locally
- Basic understanding of Python and Docker
- GitHub account (optional, for storing your worker code)

## Step 1: Set up your development environment

1. Clone the RunPod vLLM worker template:

```bash
git clone https://github.com/runpod-workers/worker-vllm.git
cd worker-vllm
```

2. Create a Python virtual environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install development dependencies:

```bash
pip install -r requirements.txt
```

## Step 2: Understand the worker structure

The template worker includes these key files:

- `handler.py`: The main worker logic that processes requests
- `Dockerfile`: Instructions for building the worker container
- `builder/requirements.txt`: Python dependencies for the worker
- `predict.py`: Core inference logic using vLLM

## Step 3: Customize the worker for your model

Let's modify the worker to use a specific LLM model and add custom parameters.

1. Open `predict.py` and modify the model initialization:

```python
import os
from vllm import LLM, SamplingParams

# Get model ID from environment variable or use default
MODEL_ID = os.environ.get("MODEL_ID", "meta-llama/Llama-3-8b-instruct")

# Initialize the model with specific settings
def init_model():
    # Automatically determine tensor parallelism based on available GPUs
    gpu_count = os.environ.get("GPU_COUNT", 1)
    
    model = LLM(
        model=MODEL_ID,
        tensor_parallel_size=int(gpu_count),
        trust_remote_code=True,
        # Add custom vLLM options here
        dtype="bfloat16",  # Use bfloat16 for better efficiency
        gpu_memory_utilization=0.8,  # Control memory usage
        enforce_eager=False,  # Use CUDA graphs for optimization
    )
    return model
```

2. Create a more sophisticated handler in `handler.py`:

```python
import runpod
import os
import predict
from vllm import SamplingParams

# Initialize the model globally
model = predict.init_model()

# Define default sampling parameters
default_params = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=512
)

def format_chat_prompt(messages):
    """Format messages into a prompt format that the model understands."""
    formatted = ""
    
    # Different models have different chat templates
    # This example uses Llama-3 style formatting
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        
        if role == "system":
            formatted += f"<|system|>\n{content}\n"
        elif role == "user":
            formatted += f"<|user|>\n{content}\n"
        elif role == "assistant":
            formatted += f"<|assistant|>\n{content}\n"
    
    # Add final assistant prompt to indicate it's the model's turn
    formatted += "<|assistant|>\n"
    
    return formatted

def handler(event):
    """Handle inference requests."""
    try:
        job_input = event["input"]
        
        # Get prompt - either as raw text or chat format
        if "messages" in job_input:
            prompt = format_chat_prompt(job_input["messages"])
        else:
            prompt = job_input.get("prompt", "")
        
        # Get custom parameters or use defaults
        params = job_input.get("parameters", {})
        
        # Create sampling parameters
        sampling_params = SamplingParams(
            temperature=params.get("temperature", default_params.temperature),
            top_p=params.get("top_p", default_params.top_p),
            top_k=params.get("top_k", 50),
            max_tokens=params.get("max_tokens", default_params.max_tokens),
            presence_penalty=params.get("presence_penalty", 0.0),
            frequency_penalty=params.get("frequency_penalty", 0.0),
            stop=params.get("stop", None)
        )
        
        # Generate text
        outputs = model.generate([prompt], sampling_params)
        
        # Format output
        generated_text = outputs[0].outputs[0].text
        
        # Count tokens for usage tracking
        prompt_tokens = len(model.tokenizer.encode(prompt))
        completion_tokens = len(model.tokenizer.encode(generated_text))
        
        return {
            "generated_text": generated_text,
            "model": os.environ.get("MODEL_ID", "meta-llama/Llama-3-8b-instruct"),
            "usage": {
                "prompt_tokens": prompt_tokens,
                "completion_tokens": completion_tokens,
                "total_tokens": prompt_tokens + completion_tokens
            }
        }
        
    except Exception as e:
        return {"error": str(e)}

# Start the serverless worker
runpod.serverless.start({"handler": handler})
```

3. Update the Dockerfile to customize the environment:

```dockerfile
FROM runpod/base:0.4.0-cuda12.1.0

# Set environment variables
ENV MODEL_ID="meta-llama/Llama-3-8b-instruct"
ENV HUGGING_FACE_HUB_TOKEN="YOUR_HF_TOKEN"  # Set your token here or via RunPod
ENV PORT=8000
ENV WORKSPACE="/workspace"

# Install dependencies
WORKDIR ${WORKSPACE}
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir flash-attn --no-build-isolation

# Copy source code
COPY . .

# vLLM writes model files to this directory
VOLUME /root/.cache/huggingface

# Pre-download model weights
RUN python -c "from huggingface_hub import snapshot_download; snapshot_download('${MODEL_ID}')"

# Run the worker
CMD python -u handler.py
```

## Step 4: Test the worker locally

1. Create a test input file named `test_input.json`:

```json
{
  "input": {
    "messages": [
      {
        "role": "system",
        "content": "You are a helpful AI assistant."
      },
      {
        "role": "user",
        "content": "Explain quantum computing in simple terms."
      }
    ],
    "parameters": {
      "temperature": 0.7,
      "max_tokens": 500
    }
  }
}
```

2. Run the worker locally:

```bash
python handler.py
```

## Step 5: Build and push the Docker image

1. Build the Docker image:

```bash
docker build -t your-username/vllm-worker:latest .
```

2. Push to Docker Hub:

```bash
docker push your-username/vllm-worker:latest
```

## Step 6: Deploy to RunPod

1. Go to the [RunPod Serverless Console](https://www.runpod.io/console/serverless)
2. Click "New Endpoint"
3. Enter your Docker image URL
4. Configure your endpoint settings:
   - GPU Type: A10G or better recommended for LLMs
   - Worker Count: 0 (scale to zero) or 1+ to keep warm
   - Max Workers: Set based on expected load
   - Advanced Settings: Add your Hugging Face token as a secret
5. Click "Deploy"

## Step 7: Test your deployed endpoint

Use this Python code to test your endpoint:

```python
import requests
import json
import time

API_KEY = "YOUR_API_KEY"
ENDPOINT_ID = "YOUR_ENDPOINT_ID"

def generate_text(messages):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    payload = {
        "input": {
            "messages": messages,
            "parameters": {
                "temperature": 0.7,
                "max_tokens": 500
            }
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    response = requests.post(url, headers=headers, json=payload)
    response_json = response.json()
    
    job_id = response_json.get("id")
    status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
    
    while True:
        status_response = requests.get(status_url, headers=headers)
        status_data = status_response.json()
        
        if status_data.get("status") == "COMPLETED":
            return status_data.get("output")
        
        time.sleep(1)

# Example conversation
messages = [
    {"role": "system", "content": "You are a helpful AI assistant."},
    {"role": "user", "content": "Explain quantum computing in simple terms."}
]

result = generate_text(messages)
print(result["generated_text"])
```

## Adding OpenAI compatibility (Optional)

To make your vLLM worker compatible with the OpenAI API format:

1. Create a new file `openai_compat.py`:

```python
import json
from fastapi import FastAPI, Request
from fastapi.responses import StreamingResponse
import asyncio
import predict
from vllm import SamplingParams
import uvicorn
import time

app = FastAPI()
model = predict.init_model()

@app.post("/v1/chat/completions")
async def chat_completions(request: Request):
    data = await request.json()
    
    # Extract request parameters
    messages = data.get("messages", [])
    model_name = data.get("model", "runpod-model")
    temperature = data.get("temperature", 0.7)
    top_p = data.get("top_p", 0.95)
    max_tokens = data.get("max_tokens", 512)
    stream = data.get("stream", False)
    
    # Format messages into prompt
    prompt = ""
    for msg in messages:
        role = msg.get("role", "user")
        content = msg.get("content", "")
        
        if role == "system":
            prompt += f"<|system|>\n{content}\n"
        elif role == "user":
            prompt += f"<|user|>\n{content}\n"
        elif role == "assistant":
            prompt += f"<|assistant|>\n{content}\n"
    
    prompt += "<|assistant|>\n"
    
    # Set up sampling parameters
    sampling_params = SamplingParams(
        temperature=temperature,
        top_p=top_p,
        max_tokens=max_tokens
    )
    
    # Generate response
    start_time = time.time()
    outputs = model.generate([prompt], sampling_params)
    end_time = time.time()
    
    generated_text = outputs[0].outputs[0].text
    
    # Count tokens
    input_tokens = len(model.tokenizer.encode(prompt))
    output_tokens = len(model.tokenizer.encode(generated_text))
    
    # Format response to match OpenAI API
    completion_id = f"cmpl-{int(time.time())}"
    response_data = {
        "id": completion_id,
        "object": "chat.completion",
        "created": int(time.time()),
        "model": model_name,
        "choices": [
            {
                "index": 0,
                "message": {
                    "role": "assistant",
                    "content": generated_text
                },
                "finish_reason": "stop"
            }
        ],
        "usage": {
            "prompt_tokens": input_tokens,
            "completion_tokens": output_tokens,
            "total_tokens": input_tokens + output_tokens
        }
    }
    
    if stream:
        # Implement streaming logic
        pass
    
    return response_data

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
```

2. Update your Dockerfile to include FastAPI and run the compatibility server:

```dockerfile
FROM runpod/base:0.4.0-cuda12.1.0

# Set environment variables
ENV MODEL_ID="meta-llama/Llama-3-8b-instruct"
ENV HUGGING_FACE_HUB_TOKEN="YOUR_HF_TOKEN"
ENV PORT=8000
ENV WORKSPACE="/workspace"
ENV ENABLE_OPENAI_API="true"

# Install dependencies
WORKDIR ${WORKSPACE}
COPY builder/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install --no-cache-dir flash-attn --no-build-isolation
RUN pip install --no-cache-dir fastapi uvicorn

# Copy source code
COPY . .

# vLLM writes model files to this directory
VOLUME /root/.cache/huggingface

# Pre-download model weights
RUN python -c "from huggingface_hub import snapshot_download; snapshot_download('${MODEL_ID}')"

# Start either the RunPod handler or OpenAI-compatible API server
CMD if [ "$ENABLE_OPENAI_API" = "true" ]; then python -u openai_compat.py; else python -u handler.py; fi
```

## Advanced optimizations

For even better performance, consider these optimizations:

1. **Quantization**: Add quantization to save memory and improve throughput:

```python
# In predict.py
model = LLM(
    model=MODEL_ID,
    tensor_parallel_size=int(gpu_count),
    trust_remote_code=True,
    dtype="bfloat16",
    quantization="awq",  # Use AWQ quantization
)
```

2. **Continuous Batching**: Utilize vLLM's continuous batching by adjusting container concurrency:

```
# In RunPod endpoint configuration
Container Concurrency: 8
```

3. **PagedAttention**: vLLM already uses PagedAttention, but ensure your model is compatible for best results.

## Next steps

- Explore other LLM optimizations like KV caching and speculative decoding
- Add additional API endpoints for specific use cases
- Fine-tune your own models and deploy them using this worker
- Set up monitoring and alerting for your endpoint

> **Pro tip**: When working with large models, start with a smaller variant (e.g., 7B parameters) to test your setup before scaling to larger models. 