---
title: Get started
sidebar_position: 2
description: "Quickly deploy custom Endpoints of popular models with minimal configuration through the web interface, following a simple 5-step process. Customize your deployments and utilize CI/CD features with RunPod's GitHub repositories and Handler Functions."
---

Quick Deploys lets you deploy custom Endpoints of popular models with minimal configuration.

You can find [Quick Deploys](https://www.runpod.io/console/serverless) and their descriptions in the Web interface.


# Get Started with Quick Deploys

Quick Deploys enable you to deploy popular AI models on RunPod Serverless in minutes with minimal configuration. Follow this guide to set up your first quick deploy and send your first requests to the deployed model.

## Prerequisites

Before you begin, ensure you have:
- A RunPod account
- Credit available in your RunPod account
- Your RunPod API key (for sending requests)

## Step 1: Access the Quick Deploys section

Navigate to the Quick Deploys area in the RunPod console:

1. Log in to your RunPod account
2. Go to the [Serverless section](https://www.runpod.io/console/serverless)
3. The Quick Deploy options will be displayed at the top of the page

## Step 2: Select your model

Browse the available Quick Deploy models and choose one that fits your needs:

1. Review the available models and their descriptions
2. Click on your chosen model to begin the deployment process

## Step 3: Configure your deployment

Set up the basic configuration for your model:

1. Provide a name for your Endpoint (e.g., "stable-diffusion-endpoint")
2. Select your GPU instance type from the dropdown menu
3. Review the default configuration settings

## Step 4: Customize advanced settings (optional)

If needed, you can customize additional settings:

1. Click the **Advanced** section to expand additional options
2. Adjust parameters such as:
   - Worker count (Active Workers and Max Workers)
   - GPUs per worker
   - Container disk size
   - Environment variables (model-specific settings)
3. If you need persistent storage, select a network volume

## Step 5: Deploy your model

Launch your configured model as a Serverless Endpoint:

1. Review all your settings
2. Click **Deploy**
3. Wait for the deployment to complete (this typically takes 1-3 minutes)
4. Your Endpoint ID will be displayed once deployment is finished

## Step 6: Test your endpoint in the RunPod console

After deployment completes and your endpoint is active:

1. Navigate to your endpoint in the RunPod console
2. Select the **Requests** tab
3. Click **Run** to send a test request with the default input
4. You should see a response similar to:
   ```json
   {
     "id": "6de99fd1-4474-4565-9243-694ffeb65218-u1",
     "status": "IN_QUEUE"
   }
   ```
5. Wait for processing to complete
6. The response stream will update to show the full result

## Step 7: Send a request using cURL

You can also test your endpoint programmatically using cURL:

```bash
curl --request POST \
     --url https://api.runpod.ai/v2/${ENDPOINT_ID}/runsync \
     --header "accept: application/json" \
     --header "authorization: ${YOUR_API_KEY}" \
     --header "content-type: application/json" \
     --data '
{
  "input": {
    "prompt": "A coffee cup.",
    "height": 512,
    "width": 512,
    "num_outputs": 1,
    "num_inference_steps": 50,
    "guidance_scale": 7.5,
    "scheduler": "KLMS"
  }
}
'
```

Replace `${ENDPOINT_ID}` with your actual Endpoint ID and `${YOUR_API_KEY}` with your RunPod API key.

> **Note:** The request format may vary depending on the model you deployed. Check the model's documentation for the correct input parameters.

## Step 8: Integrate with your application

Once you've verified your endpoint works correctly, you can integrate it with your application:

1. Install the appropriate client library (e.g., requests for Python)
2. Use your Endpoint ID and API key in your code
3. Format your requests according to the model's expected input

Example Python code:

```python
import requests
import os

# Set your endpoint ID and API key
endpoint_id = "your-endpoint-id"
api_key = "your-api-key"

# Prepare the request
url = f"https://api.runpod.ai/v2/{endpoint_id}/runsync"
headers = {
    "authorization": api_key,
    "content-type": "application/json"
}
payload = {
    "input": {
        "prompt": "A coffee cup.",
        "height": 512,
        "width": 512,
        "num_outputs": 1,
        "num_inference_steps": 50,
        "guidance_scale": 7.5,
        "scheduler": "KLMS"
    }
}

# Send the request
response = requests.post(url, headers=headers, json=payload)
result = response.json()

# Process the result
print(result)
```

## Next Steps

After successfully deploying and testing your Quick Deploy model, you can:

- [Customize your model settings](/serverless/endpoints/manage-endpoints)
- [Learn about job operations](/serverless/endpoints/job-operations) for more advanced usage
- [Explore other available models](/serverless/quick-deploys)
- [Create custom handler functions](/serverless/workers/handlers/overview) for more specialized needs







## How to do I get started with Quick Deploys?

You can get started by following the steps below:

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) in the Web interface.
2. Select your model.
3. Provide a name for your Endpoint.
4. Select your GPU instance.
   1. (optional) You can further customize your deployment.
5. Select **Deploy**.

Your Endpoint Id is now created and you can use it in your application.

## Customize your AI endpoint

To customize AI Endpoints, visit the [RunPod GitHub repositories](https://github.com/runpod-workers).
Here, you can fork the programming and compute model templates.

Begin with the [worker-template](https://github.com/runpod-workers/worker-template) and modify it as needed.
These RunPod workers incorporate CI/CD features to streamline your project setup.

For detailed guidance on customizing your interaction Endpoints, refer to [Handler Functions](/serverless/workers/handlers/overview).