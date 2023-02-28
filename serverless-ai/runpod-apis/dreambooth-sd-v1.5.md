---
description: >-
  DreamBooth is a deep learning generation model that fine-tunes existing
  text-to-image models such as Stable Diffusion.
---

# DreamBooth (SD-v1.5)

This is an adaptation of [DreamBooth](https://github.com/TheLastBen/fast-stable-diffusion) by [TheLastBen](https://github.com/TheLastBen) to a [RunPod Endpoint](https://www.runpod.io/endpoints). This endpoint requires the URL to a publicly accessible .zip file containing a folder of images of a concept to fine-tune the model. If you want to dive deep into DreamBooth, look at the [original paper](https://arxiv.org/pdf/2208.12242.pdf).

{% tabs %}
{% tab title="cURL" %}
### Create a job request

```bash
curl -X POST https://api.runpod.ai/v1/dream-booth-v1/run            \
-H 'Content-Type: application/json'                                 \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
-d '"input": {"train": {"data_url": "https://your_public.zip"},
    "inference":[ {"prompt": "A yellow submarine."} ] }}'    
```

#### Response

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "status": "IN_QUEUE"
}
```

###

### Retrieve Status/Output

```bash
curl https://api.runpod.ai/v1/dream-booth-v1/status/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    
```

#### Response

```json
{
  "delayTime": 123456, // (milliseconds) time in queue
  "executionTime": 1234, // (milliseconds) time it took to complete the job
  "gpu": "24", // gpu type used to run the job
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "input": {
    "train": {
      "data_url": "https://your_public.zip"
    },
    "inference":[ 
      {"prompt": "A yellow submarine."}
    ]
  },
  "status": "COMPLETED"
}
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

# Set the API endpoint URL
endpoint = "https://api.runpod.ai/v1/dream-booth-v1/run"

# Set the headers for the request
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 }

# Define your inputs
input_data = {
    "input": {
      "train": {
        "data_url": "https://your_public.zip"
      },
      "inference":[ 
        {"prompt": "A yellow submarine."}
      ]
    }  
}
 
# Make the request
response = requests.post(endpoint, json=input_data, headers=headers)

# Print the response 
print(response.text)             
```
{% endtab %}

{% tab title="NodeJS" %}
```javascript
const request = require('request');

// Set the API endpoint and model name
const endpoint = 'https://api.runpod.ai/v1/dream-booth-v1/run';

// Set the API key and input data
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const inputData = {
    "input": {
      "train": {
        "data_url": "https://your_public.zip"
      },
      "inference":[ 
        {"prompt": "A yellow submarine."}
      ]
    }  
};

// Set the headers for the request
const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${apiKey}`,
};

// Make the request
request.post(
  {
    url: endpoint,
    json: inputData,
    headers,
  },
  (err, response) => {
    if (err) {
      console.error(err);
      return;
    }

    // Print the response
    console.log(response.body);
  },
);
```
{% endtab %}

{% tab title="GO" %}
```go
package main

import (
  "bytes"
  "encoding/json"
  "fmt"
  "io/ioutil"
  "log"
  "net/http"
)

func main() {
  // Set the API endpoint and model name
  endpoint := "https://api.runpod.ai/v1/dream-booth-v1/run" 

  // Set the API key and input data
  apiKey := "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  inputData := map[string]interface{}{
    "input": {
      "train": {
        "data_url": "https://your_public.zip"
      },
      "inference":[ 
        {"prompt": "A yellow submarine."}
      ]
    }  
}

  // Convert the input data to JSON
  inputJSON, err := json.Marshal(inputData)
  if err != nil {
    log.Fatal(err)
  }

  // Set the headers for the request
  headers := map[string][]string{
    "Content-Type": {"application/json"},
    "Authorization": {fmt.Sprintf("Bearer %s", apiKey)},
  }

  // Make the request
  resp, err := http.Post(endpoint, "application/json", bytes.NewBuffer(inputJSON))
  if err != nil {
    log.Fatal(err)
  }
  defer resp.Body.Close()

  // Print the response
  body, err := ioutil.ReadAll(resp.Body)
  if err != nil {
    log.Fatal(err)
  }
  fmt.Println(string(body))
}
```
{% endtab %}
{% endtabs %}

### Supported Inputs

```json
{
     "input": {
          "train": {
               "data_url": str,
               "concept_name": str,
               "text_steps": int,
               "text_seed": int,
               "text_learning_rate": float,
               "text_lr_scheduler": str,
               "text_8_bit_adam": bool,
               "unet_seed": int,
               "unet_resolution": int,
               "unet_epochs": int,
               "unet_learning_rate": float,
               "unet_lr_scheduler": str,
               "unet_8_bit_adam": bool,      
          },
          "inference": [
               {
                    "enable_hr": bool,
                    "denoising_strength": int,
                    "firstphase_width": int,
                    "firstphase_height": int,
                    "hr_scale": int,
                    "hr_upscaler": str,
                    "hr_second_pass_steps": int,
                    "hr_resize_x": int,
                    "hr_resize_y": int,
                    "prompt": str,
                    "styles": list,
                    "seed": int,
                    "subseed": int,
                    "subseed_strength": int,
                    "seed_resize_from_h": int,
                    "seed_resize_from_w": int,
                    "sampler_name": str,
                    "batch_size": int,
                    "n_iter": int,
                    "steps": int,
                    "cfg_scale": int,
                    "width": int,
                    "height": int,
                    "restore_faces": bool,
                    "tiling": bool,
                    "negative_prompt": str,
                    "eta": int,
                    "s_churn": int,
                    "s_tmax": int,
                    "s_tmin": int,
                    "s_noise": int,
                    "sampler_index": str,
                    "script_name": str,
                    "passback": str
               }
          ]
     },
     "s3Config": {
        "accessId": str,
        "accessSecret": str,
        "bucketName": str,
        "endpointUrl": str
    },
    "webhook": str
}
```

{% swagger method="post" path="/v1/dream-booth-v1/run" baseUrl="https://api.runpod.ai" summary="Run an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="input" type="Object" required="true" %}
Input object containing your training paramaters, optional infrerence paramaters, optional S3 bucket, and optional webhook.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train" type="Object" required="true" %}
Contains the list of configurations to train a new model. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.data_url" type="String" required="true" %}
A bublicly accessible URL to your zip file containing your data set images. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.concept_name" type="String" %}
A uniqe name to train your concept with, this will over-ride your file names using the following scheme:  

_"concept (#).jpg"_
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.text_steps" type="Integer" %}
The number of steps used to train the text encoder.

**Default: 350**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.text_seed" type="Integer" %}
The seed used to train the text encoder.

**Default: 555**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.text_learning_rate" type="Float" %}
The learning rate for the text encoder.

**Default: 1e-6**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.text_lr_scheduler" type="String" %}
The scheduler used when training the text encoder.

_Options: linear, cosine, cosine\_with\_restarts, polynomial, constant, constant\_with\_warmup_

**Default: linear**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.text_8_bit_adam" type="Boolean" %}
Enable 8-bit-adam.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_seed" type="Integer" %}
The seed used for training the UNet.&#x20;

**Default: 555**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_resolution" type="Integer" %}
The resolution at which the UNet is trained.

**Default: 256**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_epochs" type="Integer" %}
The number of epochs used when training the UNet, the number of steps are extrapalated by multiplying the number of input images by the epochs.&#x20;

**Default: 150**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_learning_rate" type="Float" %}
The learning rate when training the UNet.&#x20;

**Default: 2e-6**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_lr_scheduler" type="Integer" %}
The scheduler used when training the UNet ext encoder.

_Options: linear, cosine, cosine\_with\_restarts, polynomial, constant, constant\_with\_warmup_

**Default: linear**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train.unet_8_bit_adam" type="Boolean" %}
Enable 8-bit-adam.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference" type="List" %}
A list of infrence prompts to generate images from. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.enable_hr" type="Boolean" %}
Toggle for hires fix.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.denoising_strength" type="Integer" %}
The amount of denoising applied to the image.

**Default: 0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.firstphase_width" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.firstphase_height" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.hr_scale" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.hr_upscaler" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.hr_second_pass_steps" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.hr_resize_x" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.hr_resize_y" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.prompt" type="String" required="true" %}
The prompt that is used for the generation of the image. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.styles" type="List" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.seed" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.subseed" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.subseed_strength" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.seed_resize_from_h" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.seed_resize_from_w" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.sampler_name" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.batch_size" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.n_iter" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.steps" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.cfg_scale" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.width" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.height" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.restore_faces" type="Boolean" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.tiling" type="Boolean" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.negative_prompt" type="String" %}
Prompt for things that should not appear in the final resulting image. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.eta" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.s_churn" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.s_tmax" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.s_tmin" type="Integer" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.s_noise" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.sampler_index" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.script_name" type="String" %}

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.inference.passback" type="String" %}
An otpional string that you can provide, this string is simply returned with the corrisponding image in your request. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook" type="String" %}
URL endpoint to receive a webhook call on job complete, fail, or timeout.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config" type="Object" %}
Credentials for a user-defined S3 compatible bucket where the trained model can be uploaded to. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config.accessId" type="String" %}
The ID required for your S3 bucket.

\




**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config.accessSecret" type="String" %}
The secret required for your S3 bucket.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config.bucketName" type="String" %}
The name of the bucket where you want to upload your model to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config.endpointUrl" type="String" %}
The URL for your S3 bucket.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JSON Response" %}
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "status": "IN_QUEUE"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid input" %}

{% endswagger-response %}

{% swagger-response status="401" description="Invalid API Key" %}

{% endswagger-response %}

{% swagger-response status="429: Too Many Requests" description="Rate limited due to many requests" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/v1/dream-booth-v1/status/{REQUEST_ID}" baseUrl="https://api.runpod.ai" summary="Status and output of an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="REQUEST_ID" required="true" type="UUID" %}
Inference Request id
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="" %}
```json
{
  "delayTime": 123456, // (milliseconds) time in queue
  "executionTime": 1234, // (milliseconds) time it took to complete the job
  "gpu": "24", // gpu type used to run the job
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "input": {
    "train": {
      "data_url": "https://your_public.zip"
    },
    "inference":[ 
      {"prompt": "A yellow submarine."}
    ]
  },
  "status": "COMPLETED"
}
```
{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid API Key" %}
```javascript
{
    // Response
}
```
{% endswagger-response %}
{% endswagger %}

_Please reach out in discord or email us at support@runpod.io for feature requests regarding DreamBooth fine-tuning._
