---
description: >-
  EveryDream provides general fine-tuning for Stable Diffusion. This endpoint
  also provides inference so that models can be trained and images can be
  generated in one shot.
---

# EveryDream (SD-v1.5)

This is an adaptation of [EveryDream2trainer by victorchall](https://github.com/victorchall/EveryDream2trainer) to a [RunPod Endpoint](https://www.runpod.io/endpoints). To run this endpoint, you will need a publicly accessible .zip file that contains images of a concept you wish to fine-tune the model with. The key to successfully using EveryDream is to have well-captioned images; look at our blog post to learn more.&#x20;

### Examples

{% tabs %}
{% tab title="cURL" %}
### Create a job request

```bash
curl -X POST https://api.runpod.ai/v1/everydream-v1/run             \
-H 'Content-Type: application/json'                                 \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
-d '{"input": {"train": {"data_url": "https://LINK_TO_ZIP.FILE"},    
    "inference": {"prompt": "a unique 123xyz concept name as a superhero"}}}'
```

#### Response

```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "status": "IN_QUEUE"
}
```

### Retrieve Status/Output

```bash
curl https://api.runpod.ai/v1/everydream-v1/status/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    
```

#### Response

```json
{
    "delayTime": int,
    "executionTime": int,
    "gpu": str,
    "id": str,
    "input": {},
    "output": {},
    "status": str        
}
```
{% endtab %}

{% tab title="Python" %}
```python
import requests

# Set the API endpoint URL
endpoint = "https://api.runpod.ai/v1/everydream-v1/run"

# Set the headers for the request
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 }

# Define your inputs
input_data = {
    "input": {
        "train": {
            "data_url": "https://LINK_TO_ZIP.FILE"
        },
        "inference": {
            "prompt": "a unique 123xyz concept name as a superhero"
        }
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
const endpoint = 'https://api.runpod.ai/v1/everydream-v1/run';

// Set the API key and input data
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const inputData = {
    "input": {
        "train": {
            "data_url": "https://LINK_TO_ZIP.FILE"
        },
        "inference": {
            "prompt": "a unique 123xyz concept name as a superhero"
        }
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
  endpoint := "https://api.runpod.ai/v1/everydream-v1/run" 

  // Set the API key and input data
  apiKey := "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  inputData := map[string]interface{}{
    "input": {
        "train": {
            "data_url": "https://LINK_TO_ZIP.FILE"
        },
        "inference": {
            "prompt": "a unique 123xyz concept name as a superhero"
        }
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
            "amp": bool,
            "batch_size": int,
            "ckpt_every_n_minutes": int,
            "clip_grad_norm": float,
            "clip_skip": int,
            "cond_dropout": float,
            "data_url": str,
            "disable_textenc_training": bool,
            "disable_unet_training": bool,
            "disable_xformers": bool,
            "flip_p": float,
            "gradient_checkpointing": bool,
            "grad_accum": int,
            "hf_repo_subfolder": str,
            "lr": float,
            "lr_decay_steps": int,
            "lr_scheduler": str,
            "lr_warmup_steps": int,
            "max_epochs": int,
            "resolution": int,
            "resume_ckpt_url": str,
            "sample_prompts": list,
            "sample_steps": int, 
            "save_full_precision": bool,
            "save_optimizer": bool,
            "scale_lr": bool,
            "seed": int,
            "shuffle_tags": bool,
            "useadam8bit": bool,
            "rated_dataset": bool,
            "rated_dataset_target_dropout_percent": int
        },
        "inference": [
            {
                "prompt": str,
                "negative_prompt": str,
                "width": int,
                "height": int,
                "num_outputs": int,   
                "num_inference_steps": int, 
                "guidance_scale": float,
                "scheduler": str,
                "seed": int,   
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

{% swagger method="post" path="/v1/everydream-v1/run" baseUrl="https://api.runpod.ai" summary="" %}
{% swagger-description %}
Run a training & inference request. 
{% endswagger-description %}

{% swagger-parameter in="body" name="train" type="Object" %}
Contains the list of configuration options to train a new model. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.amp" type="Boolean" %}
Enables automatic mixed precision compute.

**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.batch_size" type="Integer" %}
Batch size

**Default: 2**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.ckpt_every_n_minutes" type="Integer" %}
Save checkpoint every n minutes.

**Default: 20**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.clip_grad_norm" type="Float" %}
Clip gradient norm, useful if loss=nan?

\




**Default: None (Disabled)**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.clip_skip" type="Integer" %}
Train using penultimate layer.

_Options: 0, 1, 2, 3,4_

**Default: 0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.cond_dropout" type="Float" %}
Conditional drop out as decimal, see [docs](https://github.com/victorchall/EveryDream2trainer/blob/main/doc/ATWEAKING.md#conditional-dropout) for more info

_Options: 0.0 -> 1.0_\
**Default: 0.04**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.data_url" type="String" required="true" %}
URL to a publicly accessible zip file that contains the training images.

\




**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.disable_textenc_training" type="Boolean" %}
Disables training of text encoder.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.disable_unet_training" type="Boolean" %}
Disables training of unet. (NOT RECOMMENDED)

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.disable_xformers" type="Boolean" %}
Disable xformers, may reduce performance.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.flip_p" type="Float" %}
Probability of flipping image horizontally, not good for specific faces!

_Options: 0.0 -> 1.0_

**Default: 0.0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.gradient_checkpointing" type="Boolean" %}
Enable gradient checkpointing to reduce VRAM use, may reduce performance.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.grad_accum" type="Integer" %}
Gradient accumulation factor.

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.hf_repo_subfolder" type="String" %}
Subfolder inside the huggingface repo to download, if the model is not in the root of the repo.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.lr" type="Float" %}
Learning rate, if using scheduler is maximum LR at top of curve.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.lr_decay_steps" type="Integer" %}
Steps to reach minimum LR.

**Default: None, automatically set**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.lr_scheduler" type="String" %}
LR scheduler

_Options: constant, linear, cosine, polynomial_

**Default: constant**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.lr_warmup_steps" type="Integer" %}
Steps to reach max LR during warmup , non-functional for constant.

**Default: 0.02 of lr\_decay\_steps**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.max_epochs" type="Integer" %}
Maximum number of epochs to train for.

**Default: 300**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.resolution" type="Integer" %}
Resolution to train.

_Options: 256, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024, 1088, 1152_

**Default: 512**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.resume_ckpt_url" type="String" %}
The url to a publicly available checkpoint to resume from, either a local .ckpt file, a converted Diffusers format (ziped) folder, or a Huggingface.co repo  such as [https://huggingface.co/stabilityai/stable-diffusion-2-1](https://huggingface.co/stabilityai/stable-diffusion-2-1)

**Default: sd\_v1-5\_vae.ckpt**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.sample_prompts" type="List" %}
A list of prompt strings to generate samples from your trained model.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.sample_steps" type="Integer" %}
Number of steps between samples.

**Default: 250**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.save_full_precision" type="Boolean" %}
Save ckpts at full FP32

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.save_optimizer" type="Boolean" %}
Saves optimizer state with ckpt, useful for resuming training later.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.scale_lr" type="Boolean" %}
Automatically scale up learning rate based on batch size and grad accumulation.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.seed" type="Integer" %}
Seed used for samples and shuffling, use -1 for random.

**Default: 555**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.shuffle_tags" type="Boolean" %}
Randomly shuffles CSV tags in captions, for booru datasets.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.useadam8bit" type="Boolean" %}
Use AdamW 8-Bit optimizer, recommended!

**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.rated_dataset" type="Boolean" %}
Enable rated image set training, to less often train on lower rated images through the epochs.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="train.rated_dataset_target_dropout_percent" type="Integer" %}
How many images (in percent) should be included in the last epoch.

_Options: 1 -> 100_

**Default: 50**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference" type="List" %}
A list of images to create once the model has been trained.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.prompt" type="String" required="true" %}
Input prompt.

Default: None
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.negative_prompt" type="String" %}
Specify things to not see in the output.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.width" type="Integer" %}
Width of the output image.

_Options: 128, 256, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024_

**Default: 512**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.height" type="Integer" %}
Height of the output image.

_Options: 128, 256, 384, 448, 512, 576, 640, 704, 768, 832, 896, 960, 1024_

**Default: 512**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.num_outputs" type="Integer" %}
Number of batched images to generate for the given prompt.

\




_Options: 1 -> 10_

\




**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference:num_inference_steps" type="Integer" %}
Number of denoising steps.\
_Options: 1 -> 500_

**Default: 50**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference:guidance_scale" type="Float" %}
Scale for classifier-free guidance.

_Options: 1 -> 20_

**Default: 7.5**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference:scheduler" type="String" %}
Choose a scheduler.

_Options: DDIM, DDPM, DPM-M, DPM-S,  EULER-A, EULER-D, HEUN, IPNDM, KDPM2-A, KDPM2-D, PNDM, K-LMS_

**Default: K-LMS**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.seed" type="Integer" %}
Random seed.

\




**Default: Random**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="inference.passback" type="String" %}
User provide note/identifier, passed back with the corresponding image.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config" type="Object" %}
Credentials for a user-defined S3 compatibe bucket where the trained model can be uploaded to.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="s3Config.accessId" type="String" %}
The ID required for your S3 bucket.
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

{% swagger-parameter in="body" name="webhook" type="String" %}
URL endpoint to receive a webhook call on job complete, fail, or timeout.
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Request successfully received. " %}
```json
{
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "status": "IN_QUEUE"
}
```
{% endswagger-response %}

{% swagger-response status="400: Bad Request" description="Invalid input" %}

{% endswagger-response %}

{% swagger-response status="401: Unauthorized" description="Invalid API Key" %}

{% endswagger-response %}

{% swagger-response status="429: Too Many Requests" description="Rate limited due to too many requests. " %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/v1/everydream-v1/status/{ REQUEST_ID }" baseUrl="https://api.runpod.ai" summary="" %}
{% swagger-description %}
Status and output of an inference request.
{% endswagger-description %}

{% swagger-parameter in="path" name="REQUEST_ID" type="UUID" %}
Inference request ID
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Contains the job status along with the output." %}
```json
{
    "delayTime": int,
    "executionTime": int,
    "gpu": str,
    "id": str,
    "input": {},
    "output": {},
    "status": str        
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
