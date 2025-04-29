---
title: "Run your first serverless endpoint with Stable Diffusion"
description: "Learn how to use RunPod's Stable Diffusion v1 inference endpoint to generate images, including setting up your serverless worker, starting a job, checking job status, and retrieving results."
sidebar_position: 1
---

:::note

Before we begin, ensure you have a RunPod API key, available under your user settings. This key is crucial for identification and billing purposes. Keep it secure! Also, remember to retrieve your results via the status endpoint within 30 minutes, as your inputs and outputs are not stored longer than this for privacy protection.

:::

### Overview

In this section, we'll explore how RunPod's API works. It's asynchronous, meaning that when you send a request, you get a job ID back almost instantly. Next, we'll show you how to use this job ID to check the status and retrieve your results.

Let's dive into an example using the Stable Diffusion v1 inference endpoint.

## Create a serverless worker

First, let's set up your serverless worker. Begin by selecting **Quick Deploy** on the RunPod interface. Then choose **Start** from the **Stable Diffusion v1.5** options. Pick a GPU, say a 24 GB GPU, and click **Deploy**. Here’s an example endpoint you might use: `https://api.runpod.ai/v2/{ID}/runsync`

### Start Your Job

Now, to initiate a job, you'll make a request like the one shown below. This sends your parameters to the API and starts the process.

```curl
curl -X POST https://api.runpod.ai/v2/{ID}/run \
    -H 'Content-Type: application/json'                             \
    -H 'Authorization: Bearer [Your API Key]'    \
    -d '{"input": {"prompt": "A cute fluffy white dog in the style of a Pixar animation 3D drawing."}}'
```

Upon doing this, you'll receive a response like this, containing your unique job ID:

```json
{
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "status": "IN_QUEUE"
}
```

### Check the Status of Your Job

Since your initial response doesn't include the output, a subsequent call is necessary. Use your job ID to check the job's status as follows:

```curl
curl https://api.runpod.ai/v2/{ID}/status/c80ffee4-f315-4e25-a146-0f3d98cf024b \
-H 'Content-Type: application/json' \
-H 'Authorization: Bearer [Your API Key]'
```

If your job is still processing, the response will indicate that. Here's an example:

```json
{
  "delayTime": 2624,
  "id": "c80ffee4-f315-4e25-a146-0f3d98cf024b",
  "input": {
    "prompt": "A cute fluffy white dog in the style of a Pixar animation 3D drawing."
  },
  "status": "IN_PROGRESS"
}
```

### Get Completed Job Status

Once your job is complete, you'll receive a final response like this:

```json
{
  "delayTime": 17158,
  "executionTime": 4633,
  "id": "fb5a249d-12c7-48e5-a0e4-b813c3381262-22",
  "output": [
    {
      "image": "base64image",
      "seed": 40264
    }
  ],
  "status": "COMPLETED"
}
```

To save the output, use the following command:

```json
curl https://api.runpod.ai/v2/{ID}/status/c80ffee4-f315-4e25-a146-0f3d98cf024b \
    -H 'Content-Type: application/json' \
    -H 'Authorization: Bearer [Your API Key]' | jq . > output.json
```

:::note

Remember, you have up to 1 hour to retrieve your results via the status endpoint for privacy reasons.

:::

### Get Your Results

Finally, to view your results, decode the base64 image from the output. Here's how you can do it in Python:

```python
import json
import base64


def decode_and_save_image(json_file_path, output_image_path):
    try:
        # Reading the JSON file
        with open(json_file_path, "r") as file:
            data = json.load(file)

        # Extracting the base64 encoded image data
        base64_image = data["output"][0]["image"]

        # Decode the Base64 string
        decoded_image_data = base64.b64decode(base64_image)

        # Writing the decoded data to an image file
        with open(output_image_path, "wb") as image_file:
            image_file.write(decoded_image_data)

        print(f"Image successfully decoded and saved as '{output_image_path}'.")

    except FileNotFoundError:
        print(
            "File not found. Please ensure the JSON file exists in the specified path."
        )
    except KeyError as e:
        print(f"Error in JSON structure: {e}")
    except Exception as e:
        print(f"An error occurred: {e}")


# Usage
json_file_path = "output.json"  # Path to your JSON file
output_image_path = "decoded_image.png"  # Desired path for the output image

decode_and_save_image(json_file_path, output_image_path)
```

Congratulations! You've now successfully used RunPod's Stable Diffusion API to generate images.

![](decoded_image.png)
