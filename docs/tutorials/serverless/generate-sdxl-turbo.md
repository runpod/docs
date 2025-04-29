---
title: Generate images with SDXL Turbo
description: "Learn how to build a web application using RunPod's Serverless Workers and SDXL Turbo from Stability AI, a fast text-to-image model, and send requests to an Endpoint to generate images from text-based inputs."
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When it comes to working with an AI image generator, the speed in which images are generated is often a compromise.
RunPod's Serverless Workers allows you to host [SDXL Turbo](https://huggingface.co/stabilityai/sdxl-turbo) from Stability AI, which is a fast text-to-image model.

In this tutorial, you'll build a web application, where you'll leverage RunPod's Serverless Worker and Endpoint to return an image from a text-based input.

By the end of this tutorial, you'll have an understanding of running a Serverless Worker on RunPod and sending requests to an Endpoint to receive a response.

You can proceed with the tutorial by following the build steps outlined here or skip directly to [Deploy a Serverless Endpoint](#deploy-a-serverless-endpoint) section.

## Prerequisites

This section presumes you have an understanding of the terminal and can execute commands from your terminal.

Before starting this tutorial, you'll need access to:

### RunPod

To continue with this quick start, you'll need access to the following from RunPod:

- RunPod account
- RunPod API Key

### Docker

To build your Docker image, you'll need access to the following:

- Docker installed
- Docker account

You can also use the prebuilt image from [runpod/sdxl-turbo](https://hub.docker.com/r/runpod/sdxl-turbo).

### GitHub

To clone the `worker-sdxl-turbo` repo, you'll need access to the following:

- Git installed
- Permissions to clone GitHub repos

With the prerequisites covered, get started by building and pushing a Docker image to a container registry.

## Build and push your Docker image

This step will walk you through building and pushing your Docker image to your container registry.
This is useful to building custom images for your use case.
If you prefer, you can use the prebuilt image from [runpod/sdxl-turbo](https://hub.docker.com/r/runpod/sdxl-turbo) instead of building your own.

Building a Docker image allows you to specify the container when creating a Worker.
The Docker image includes the [RunPod Handler](https://github.com/runpod-workers/worker-sdxl-turbo/blob/main/src/handler.py) which is how you provide instructions to Worker to perform some task.
In this example, the Handler is responsible for taking a Job and returning a base 64 instance of the image.

1. Clone the [RunPod Worker SDXL Turbo](https://github.com/runpod-workers/worker-sdxl-turbo) repository:

```command
gh repo clone runpod-workers/worker-sdxl-turbo
```

2. Navigate to the root of the cloned repo:

```command
cd worker-sdxl-turbo
```

3. Build the Docker image:

```command
docker build --tag <username>/<repo>:<tag> .
```

4. Push your container registry:

```command
docker push <username>/<repo>:<tag>
```

Now that you've pushed your container registry, you're ready to deploy your Serverless Endpoint to RunPod.

## Deploy a Serverless Endpoint

The container you just built will run on the Worker you're creating.
Here, you will configure and deploy the Endpoint.
This will include the GPU and the storage needed for your Worker.

This step will walk you through deploying a Serverless Endpoint to RunPod.

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select a GPU.
   3. Configure the number of Workers.
   4. (optional) Select **FlashBoot**.
   5. (optional) Select a template.
   6. Enter the name of your Docker image.
      - For example, `runpod/sdxl-turbo:dev`.
   7. Specify enough memory for your Docker image.
4. Select **Deploy**.

Now, let's send a request to your Endpoint.

## Send a request

Now that our Endpoint is deployed, you can begin interacting with and integrating it into an application.
Before writing the logic into the application, ensure that you can interact with the Endpoint by sending a request.

Run the following command:

<Tabs>
  <TabItem value="curl" label="cURL" default>

```bash
curl -X POST "https://api.runpod.ai/v2/${YOUR_ENDPOINT}/runsync" \
     -H "accept: application/json" \
     -H "content-type: application/json" \
     -H "authorization: ${YOUR_API_KEY}" \
     -d '{
        "input": {
            "prompt": "${YOUR_PROMPT}",
            "num_inference_steps": 25,
            "refiner_inference_steps": 50,
            "width": 1024,
            "height": 1024,
            "guidance_scale": 7.5,
            "strength": 0.3,
            "seed": null,
            "num_images": 1
        }
     }'
```

</TabItem>
  <TabItem value="output" label="Output">

```json
{
  "delayTime": 168,
  "executionTime": 251,
  "id": "sync-fa542d19-92b2-47d0-8e58-c01878f0365d-u1",
  "output": "BASE_64",
  "status": "COMPLETED"
}
```

</TabItem>
</Tabs>

Export your variable names in your terminal session or replace them in line:

- `YOUR_ENDPOINT`: The name of your Endpoint.
- `YOUD_API_KEY`: The API Key required with read and write access.
- `YOUR_PROMPT`: The custom prompt passed to the model.

You should se the output. The status will return `PENDING`; but quickly change to `COMPLETED` if you query the Job Id.

## Integrate into your application

Now, let's create a web application that can take advantage of writing a prompt and generate an image based on that prompt.
While these steps are specific to JavaScript, you can make requests against your Endpoint in any language of your choice.

To do that, you'll create two files:

- `index.html`: The frontend to your web application.
- `script.js`: The backend which handles the logic behind getting the prompt and the call to the Serverless Endpoint.

<Tabs>
  <TabItem value="html" label="HTML" default>

The HTML file (`index.html`) sets up a user interface with an input box for the prompt and a button to trigger the image generation.

```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RunPod AI Image Generator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            padding: 20px;
        }

        #imageResult {
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <h1>RunPod AI Image Generator</h1>
    <input type="text" id="promptInput" placeholder="Enter your image prompt" />
    <button onclick="generateImage()">Generate Image</button>

    <div id="imageResult"></div>

    <script src="script.js"></script>
</body>
</html>
```

</TabItem>
  <TabItem value="javascript" label="JavaScript">

The JavaScript file (`script.js`) contains the `generateImage` function. This function reads the user's input, makes a POST request to the RunPod serverless endpoint, and handles the response.
The server's response is expected to contain the base64-encoded image, which is then displayed on the webpage.

```javascript
// script.js
async function generateImage() {
  const prompt = document.getElementById("promptInput").value;
  if (!prompt) {
    alert("Please enter a prompt!");
    return;
  }

  const options = {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      // Replace with your actual API key
      authorization: "Bearer ${process.env.REACT_APP_AUTH_TOKEN}",
    },
    body: JSON.stringify({
      input: {
        prompt: prompt,
        num_inference_steps: 25,
        width: 1024,
        height: 1024,
        guidance_scale: 7.5,
        seed: null,
        num_images: 1,
      },
    }),
  };

  try {
    const response = await fetch(
      // Replace with your actual Endpoint Id
      "https://api.runpod.ai/v2/${process.env.REACT_APP_ENDPOINT_ID}/runsync",
      options,
    );
    const data = await response.json();
    if (data && data.output) {
      const imageBase64 = data.output;
      const imageUrl = `data:image/jpeg;base64,${imageBase64}`;
      document.getElementById("imageResult").innerHTML =
        `<img src="${imageUrl}" alt="Generated Image" />`;
    } else {
      alert("Failed to generate image");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error generating image");
  }
}
```

</TabItem>
</Tabs>

1. Replace `${process.env.REACT_APP_AUTH_TOKEN}` with your actual API key.
2. Replace `${process.env.REACT_APP_ENDPOINT_ID}` with your specific Endpoint.
3. Open `index.html` in a web browser, enter a prompt, and select **Generate Image** to see the result.

This web application serves as a basic example of how to interact with your RunPod serverless endpoint from a client-side application.
It can be expanded or modified to fit more complex use cases.

## Run a server

You can run a server through Python or by opening the `index.html` page in your browser.

<Tabs>

<TabItem value="python" label="Python" default>

    Run the following command to start a server locally using Python.

    ```command
    python -m http.server 8000
    ```

</TabItem>

<TabItem value="directly" label="File explorer">

    **Open the File in a Browser**

    Open the `index.html` file directly in your web browser.

    1. Navigate to the folder where your `index.html` file is located.
    2. Right-click on the file and choose **Open with** and select your preferred web browser.
    - Alternatively, you can drag and drop the `index.html` file into an open browser window.
    - The URL will look something like `file:///path/to/your/index.html`.

</TabItem>
</Tabs>
