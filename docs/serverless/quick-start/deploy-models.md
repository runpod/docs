---
title: Deploy popular models
description: "Deploy pre-built AI models on RunPod Serverless in minutes with no coding required. Start with popular models like Stable Diffusion, Llama, and more."
sidebar_position: 1
---

# Deploy popular models

Get started with RunPod Serverless in minutes by deploying pre-built models. No coding required!

## Available models

RunPod offers several popular AI models as pre-configured endpoints:

| Model | Category | Description |
|-------|----------|-------------|
| Stable Diffusion XL | Image Generation | Generate high-quality images from text prompts |
| Llama 3 70B | Text Generation | Advanced large language model for text generation |
| Whisper | Speech-to-Text | Transcribe audio files to text |
| CLIP | Image Understanding | Extract features and understand content in images |
| ComfyUI | Workflow | Visual workflow builder for image generation |

## Deploying your first model

1. **Navigate to Serverless Dashboard**
   
   Go to the [RunPod Console](https://www.runpod.io/console/serverless) and click "Serverless" in the sidebar.

2. **Select Quick Deploy**
   
   Click the "Quick Deploy" button at the top of the page.

3. **Choose a model**
   
   Browse the available models and select one that matches your needs.

   <!-- Image will be added later -->
   <!-- ![Quick Deploy Selection](/img/docs/serverless/quick-deploy-selection.png) -->

4. **Configure your endpoint**
   
   Set your endpoint configurations:
   
   - **Name**: Give your endpoint a descriptive name
   - **GPU Type**: Select the GPU type (A100, A6000, etc.)
   - **Worker Count**: How many concurrent workers to run
   - **Idle Timeout**: How long to keep workers warm after inactivity

5. **Deploy**
   
   Click "Deploy" to create your endpoint. The deployment typically takes 1-2 minutes.

6. **Get your endpoint ID and API Key**
   
   Once deployed, note your Endpoint ID and ensure you have your API key (available in your account settings).

## Testing your model

### Using the web interface

1. Navigate to your endpoint in the RunPod console
2. Click "Test" in the sidebar
3. Enter your test input in the provided JSON editor
4. Click "Run" to see the results

### Using curl

```bash
curl -X POST "https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "input": {
      "prompt": "a photo of an astronaut riding a horse on mars"
    }
  }'
```

Replace `YOUR_ENDPOINT_ID` and `YOUR_API_KEY` with your actual values.

## Example: Stable Diffusion XL

Here's an example input for Stable Diffusion XL:

```json
{
  "input": {
    "prompt": "A serene mountain landscape with a lake, photorealistic, 8k",
    "negative_prompt": "blurry, distorted, low quality",
    "num_inference_steps": 30,
    "guidance_scale": 7.5
  }
}
```

## Next steps

- Customize model parameters - Adjust settings for better results
- Integrate with your application - Connect your model to your app
- Monitor performance - Track usage and optimize costs 