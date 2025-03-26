---
title: Text generation
description: "Build a text generation API with large language models on RunPod Serverless. This complete guide covers setup, deployment, optimization, and integration."
---

# Text generation with LLMs

This guide shows you how to build and deploy a text generation API using large language models (LLMs) on RunPod Serverless.

## Overview

You'll learn how to:
1. Set up a text generation endpoint
2. Configure for optimal performance and cost
3. Send requests and process responses
4. Integrate with your applications

## Prerequisites

- A RunPod account with serverless access
- Basic understanding of Python and Docker
- Familiarity with LLMs (optional)

## Option 1: Use quick deploy (easiest)

RunPod offers pre-configured endpoints for popular LLMs:

1. Go to the [RunPod Console](https://www.runpod.io/console/serverless)
2. Click "Quick Deploy"
3. Select a text generation model (Llama, Mistral, etc.)
4. Configure GPU and worker settings
5. Deploy

## Option 2: Build a custom endpoint

For more flexibility, you can create a custom endpoint:

### Step 1: Create a handler with vLLM

Create a file named `handler.py`:

```python
import runpod
import os
from vllm import LLM, SamplingParams

# Initialize the model (runs once when worker starts)
def init_model():
    global model
    model = LLM(
        model="meta-llama/Llama-3-8b-chat-hf",  # Replace with your preferred model
        tensor_parallel_size=1,                # Adjust based on GPU type
        trust_remote_code=True
    )
    return model

# Initialize model globally
model = init_model()

# Define sampling parameters
default_params = SamplingParams(
    temperature=0.7,
    top_p=0.95,
    max_tokens=512
)

def handler(event):
    """
    Handle inference requests
    """
    try:
        # Get input from request
        job_input = event["input"]
        prompt = job_input.get("prompt", "")
        system_prompt = job_input.get("system_prompt", "You are a helpful AI assistant.")
        
        # Get custom generation parameters or use defaults
        params = job_input.get("params", {})
        sampling_params = SamplingParams(
            temperature=params.get("temperature", default_params.temperature),
            top_p=params.get("top_p", default_params.top_p),
            max_tokens=params.get("max_tokens", default_params.max_tokens)
        )
        
        # Format prompt for chat
        formatted_prompt = f"[INST] <<SYS>>\n{system_prompt}\n<</SYS>>\n\n{prompt} [/INST]"
        
        # Generate text
        outputs = model.generate([formatted_prompt], sampling_params)
        
        # Format output
        generated_text = outputs[0].outputs[0].text
        
        return {
            "generated_text": generated_text,
            "model": "meta-llama/Llama-3-8b-chat-hf",
            "usage": {
                "prompt_tokens": len(prompt.split()),
                "completion_tokens": len(generated_text.split()),
                "total_tokens": len(prompt.split()) + len(generated_text.split())
            }
        }
        
    except Exception as e:
        return {"error": str(e)}

# Start the serverless function
runpod.serverless.start({"handler": handler})
```

### Step 2: Create a Dockerfile

Create a `Dockerfile`:

```dockerfile
FROM runpod/pytorch:2.2.0-py3.10-cuda12.1.0-devel

WORKDIR /app

# Install dependencies
RUN pip install --no-cache-dir runpod vllm transformers accelerate

# Copy handler code
COPY handler.py .

# Set environment variables
ENV HUGGING_FACE_HUB_TOKEN="your_hf_token"  # Replace with your token
ENV RUNPOD_VLLM_MODEL="meta-llama/Llama-3-8b-chat-hf"

# Start the handler
CMD ["python", "-u", "handler.py"]
```

### Step 3: Build and push the image

```bash
docker build -t your-username/llm-endpoint:latest .
docker push your-username/llm-endpoint:latest
```

### Step 4: Deploy the endpoint

1. Go to the RunPod Serverless console
2. Create a new endpoint with your image
3. Select an appropriate GPU (A10G, A100, etc.)
4. Configure workers based on expected traffic
5. Deploy

## Sending requests

Send requests to your endpoint:

```python
import requests
import json

# Replace with your endpoint ID and API key
ENDPOINT_ID = "your-endpoint-id"
API_KEY = "your-api-key"

def generate_text(prompt, system_prompt="You are a helpful AI assistant.", **params):
    url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run"
    
    payload = {
        "input": {
            "prompt": prompt,
            "system_prompt": system_prompt,
            "params": params
        }
    }
    
    headers = {
        "Content-Type": "application/json",
        "Authorization": f"Bearer {API_KEY}"
    }
    
    response = requests.post(url, headers=headers, data=json.dumps(payload))
    return response.json()

# Example usage
result = generate_text(
    "Explain quantum computing in simple terms.",
    temperature=0.5,
    max_tokens=300
)

print(result)
```

## Performance optimization

### Model size vs. performance

| Model Size | GPU Recommendation | Throughput | Latency |
|------------|-------------------|------------|---------|
| 7B-8B | L4, RTX 4090 | Medium-High | Low |
| 13B-14B | A10G, A6000 | Medium | Medium |
| 30B-70B | A100 40GB/80GB | Low-Medium | Medium-High |

### Quantization

Add quantization to reduce memory usage and increase throughput:

```python
# Modify the init_model function
def init_model():
    global model
    model = LLM(
        model="meta-llama/Llama-3-8b-chat-hf",
        tensor_parallel_size=1,
        trust_remote_code=True,
        quantization="awq"  # Use AWQ quantization
    )
    return model
```

### Caching

Enable caching to improve performance for repeated queries:

```python
# Modify the init_model function
def init_model():
    global model
    model = LLM(
        model="meta-llama/Llama-3-8b-chat-hf",
        tensor_parallel_size=1,
        trust_remote_code=True,
        cache_size=1024  # Cache up to 1024 requests
    )
    return model
```

## Monitoring and scaling

### Configure optimal scaling

For text generation endpoints:

- **For experimentation**: Min 0, Max 1-2, Idle 60s
- **For production**: Min 1, Max 5+, Idle 300s

### Monitor performance

Check your endpoint metrics to:
- Track usage patterns
- Identify bottlenecks
- Optimize cost

## Integration examples

### Web application

```javascript
async function generateText() {
  const prompt = document.getElementById('prompt').value;
  
  const response = await fetch('https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: JSON.stringify({
      input: {
        prompt: prompt
      }
    })
  });
  
  const data = await response.json();
  document.getElementById('result').innerText = data.output.generated_text;
}
```

### Async processing for long tasks

For long-running generation, use the async API:

```python
# Submit job
response = requests.post(
    f"https://api.runpod.ai/v2/{ENDPOINT_ID}/run",
    headers=headers,
    json=payload
)
job_id = response.json()["id"]

# Check status and get result when done
status_url = f"https://api.runpod.ai/v2/{ENDPOINT_ID}/status/{job_id}"
while True:
    status = requests.get(status_url, headers=headers).json()
    if status["status"] == "COMPLETED":
        result = status["output"]
        break
    time.sleep(1)
```

## Next steps

- [Explore image generation](/docs/serverless/examples/image-generation)
- [Learn about chaining endpoints](/docs/serverless/examples/chaining-endpoints)
- [Optimize costs](/docs/serverless/manage/optimize) 