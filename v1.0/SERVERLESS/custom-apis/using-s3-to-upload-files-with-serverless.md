---
title: "Using S3 to upload images with serverless"
slug: "using-s3-to-upload-files-with-serverless"
excerpt: "Here's how you can use S3 to upload files with serverless, and get urls to the outputs as files"
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Tue Apr 18 2023 16:07:56 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 22 2023 08:47:46 GMT+0000 (Coordinated Universal Time)"
---

## Uploading to an S3 bucket has 2 major steps

1. Writing python code to upload files to S3
2. Setting the environment variables for your S3 bucket

## Uploading to an S3 bucket with python

1. For the example code, we presume 2 things

   - you've installed the runpod python library with `pip install runpod`
   - you've an image file at `./image.png` in the docker container

2. Now in your handler function, here's some example code that can upload to an s3 bucket, the code uploads the image `image.png` to an s3 bucket, and returns a url to the image

<!-- dprint-ignore-start -->
   ```python
   from runpod.serverless.utils import rp_upload
   import runpod

   def handler(job):
       image_url = rp_upload.upload_image(job['id'], "./image.png")
       return [image_url]

   runpod.serverless.start({"handler": handler})
   ```
<!-- dprint-ignore-end -->

3. now package your code in a similar manner as described by the [Worker Image Creation](https://docs.runpod.io/docs/worker-image-creation) and [Template Creation](https://docs.runpod.io/docs/template-creation) steps

## Setting the environment variables

1. You can set environment variables for a pod via the template creation/editing interface, the Environment Variables section is in the very bottom\
   ![](https://files.readme.io/2d93548-image.png)
2. Set the following environment variables\
   ![](https://files.readme.io/0693616-image.png)
3. You've to set the variables

   - `BUCKET_ENDPOINT_URL`
   - `BUCKET_ACCESS_KEY_ID`
   - and `BUCKET_SECRET_ACCESS_KEY`

   ensure your `BUCKET_ENDPOINT_URL` has the bucket name at the start (for example, `https://your-bucket-name.nyc3.digitaloceanspaces.com` or `https://your-bucket.s3.us-west-004.backblazeb2.com`)

## Testing your api out

1. Now when you access your api you should see the image as an output uploaded to s3, here's a sample input\
   Editors note : your request **must** contain an input key, and it must be a json item, so ensure you put that, a sample request has been provided below

<!-- dprint-ignore-start -->
   ```python Python
   import requests

   endpoint = "https://api.runpod.ai/v2/xxxxxxxxx/run"

   headers = {
     "Content-Type": "application/json",
     "Authorization": "Bearer XXXXXXXXXXXXX"
   }

   # Define your inputs
   # an input value must be present, even if it is unused,
   # and it must be a json value
   input_data = {
       "input": {"inp":"this is an example input"}
   }

   response = requests.post(endpoint, json=input_data, headers=headers)
   json     = response.json()

   # the json will be similar to
   # {'id': 'e3d2e250-ea81-4074-9838-1c52d006ddcf', 'status': 'IN_QUEUE'}
   ```
<!-- dprint-ignore-end -->

2. Here's an example output request, with the image in output

<!-- dprint-ignore-start -->
   ```python
   response = requests.get("https://api.runpod.ai/v2/xxxxxxxxx/status/" + json['id'], headers=headers)
   response.json()
   ```
<!-- dprint-ignore-end -->

Here's an example response, after the request completes

<!-- dprint-ignore-start -->
   ```python JSON
   {
     'delayTime': 86588,
     'executionTime': 1563,
     'id': 'e3d2e250-ea81-4074-9838-1c52d006ddcf',
     'output': ['https://your-bucket.s3.us-west-004.backblazeb2.com/your-image.png'],
     'status': 'COMPLETED'
   }
   ```
<!-- dprint-ignore-end -->
