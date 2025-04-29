---
title: Cleanup 
sidebar_position: 3
description: "Learn how to use the clean() function to manage resources and cleanup after your AI model processing."
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

When developing for RunPod serverless, it's crucial to manage resources efficiently.
The RunPod SDK provides a `clean()` function to help you remove temporary files and folders after processing.
This guide will show you how to use this cleanup utility effectively.

## The clean() Function

The `clean()` function is part of RunPod's serverless utilities.
It helps maintain a clean environment by removing specified folders and files after a job is completed.

To use it, import the function from the RunPod serverless utilities:

```python
from runpod.serverless.utils.rp_cleanup import clean
```

## Default Behavior

By default, `clean()` removes the following:

- `input_objects` folder
- `output_objects` folder
- `job_files` folder
- `output.zip` file

## Using clean() in Your Handler

Here's an example of how to incorporate the `clean()` function in your AI model handler:

<Tabs>
  <TabItem value="python" label="Python">

```python
import runpod
from runpod.serverless.utils.rp_cleanup import clean
import requests
import os


def download_image(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, "wb") as file:
            file.write(response.content)
        return True
    return False


def handler(event):
    """
    This is a sample AI model handler function that downloads an image,
    processes it, and then cleans up.
    """
    try:
        # Extract the image URL from the input
        image_url = event["input"]["image_url"]

        # Create a temporary directory for the image
        os.makedirs("temp_images", exist_ok=True)
        image_path = "temp_images/downloaded_image.jpg"

        # Download the image
        if not download_image(image_url, image_path):
            raise Exception("Failed to download image")

        # Your AI model processing code here
        # For this example, we're just simulating processing
        result = f"Processed image from: {image_url}"

        # Cleanup after processing
        clean(folder_list=["temp_images"])

        # Return the result
        return {"output": result}
    except Exception as e:
        # If there's an error, attempt cleanup and return the error
        clean(folder_list=["temp_images"])
        return {"error": str(e)}


# Start the serverless function
runpod.serverless.start({"handler": handler})
```

</TabItem>
</Tabs>

In this example, `clean()` is called after the model processing is complete, ensuring that temporary files and folders are removed.

## Custom Cleanup

You can also specify additional folders to be removed by passing a list to the `clean()` function:

```python
clean(["custom_folder1", "custom_folder2"])
```

## Testing your Handler with Cleanup

To test your handler with the cleanup function:

<Tabs>
  <TabItem value="cli" label="CLI">

```bash
python ai_model_handler.py \
  --test_input '{
    "input": {
        "image_url": "https://avatars.githubusercontent.com/u/95939477?s=200&v=4"
    }
}'
```

</TabItem>
  <TabItem value="json" label="JSON">

Create a `test_input.json` file:

```json
{
  "input": {
    "image_url": "https://avatars.githubusercontent.com/u/95939477?s=200&v=4"
  }
}
```

Then run:

```bash
python ai_model_handler.py
```

</TabItem>
</Tabs>

## Best Practices

1. Call `clean()` at the end of your handler to ensure proper cleanup.
2. Use try-except blocks to handle any errors during cleanup.
3. Be cautious when adding custom folders to the cleanup list.
4. Consider logging cleanup actions for debugging purposes.

By implementing the `clean()` function in your handlers, you ensure that each job starts with a clean slate, preventing potential issues caused by leftover files from previous runs.
