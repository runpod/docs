---
description: >-
  DreamBooth is a deep learning generation model that fine-tunes existing
  text-to-image models such as Stable Diffusion.
---

# DreamBooth (SD-v1.5)

This RunPod API requires the URL to a publicly accessible .zip file containing a folder of images of a concept to fine-tune the model.&#x20;

### Data Best Practices

Your dataset should contain around 20 - 24 photos. It is recommended to have an even number of photos. The photos should be cropped to 512x512 PNGs, with the subject centered in the frame. For best results, have 3 full-body photos, 8 mid-length ones, and 9 close-ups; taken in good lighting from various angles and in several different outfits and locations.

### Required Inputs

```json
{
    "input": {
        "concepts": [            
                {
                    "instance_data": "https://LINK_TO_ZIP.FILE",
                    "instance_prompt": "a unique 123xyz concept name",                
                    "class_prompt": "a thing doing something"
                }            
        ],
        "samples": 
        [        
            {"prompt": "a unique 123xyz concept name as a superhero"}            
        ]
    }   
}
```

{% tabs %}
{% tab title="cURL" %}
### Create a job request

```bash
curl -X POST https://api.runpod.ai/v1/dream-booth-v1/run            \
-H 'Content-Type: application/json'                                 \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx' \
-d '{"input": {"concepts": [
    {"instance_data": "https://LINK_TO_ZIP.FILE",
    "instance_prompt": "a unique 123xyz concept name",                
    "class_prompt": "a thing doing something"}            
    ], "samples": [{"prompt": "a unique 123xyz concept name as a superhero"}]}}'    
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
    "instance_prompt": "random_subject_name",
    "class_prompt": "subject_category", 
    "instance_data":["https://URL_TO_SUBJECT_ASSETS"],
    "samples": [
      {"save_sample_prompt": "random_subject_name having fun in the sun"}, 
      {"save_sample_prompt": "random_subject_name having fun as a wizard"}
    ]
    }, "output": [
    {
      "image": "https://job.results1",
      "seed": 2
    },
    {
      "image": "https://job.results2",
      "seed": 2
    }
  ],
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
        "concepts": [            
                {
                    "instance_data": "https://LINK_TO_ZIP.FILE",
                    "instance_prompt": "a unique 123xyz concept name",                
                    "class_prompt": "a thing doing something"
                }            
        ],
        "samples": 
        [        
            {"prompt": "a unique 123xyz concept name as a superhero"}            
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
        "concepts": [            
                {
                    "instance_data": "https://LINK_TO_ZIP.FILE",
                    "instance_prompt": "a unique 123xyz concept name",                
                    "class_prompt": "a thing doing something"
                }            
        ],
        "samples": 
        [        
            {"prompt": "a unique 123xyz concept name as a superhero"}            
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
        "concepts": [            
                {
                    "instance_data": "https://LINK_TO_ZIP.FILE",
                    "instance_prompt": "a unique 123xyz concept name",                
                    "class_prompt": "a thing doing something"
                }            
        ],
        "samples": 
        [        
            {"prompt": "a unique 123xyz concept name as a superhero"}            
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

{% swagger method="post" path="/v1/dream-booth-v1/run" baseUrl="https://api.runpod.ai" summary="Run an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="body" name="input" type="Object" required="true" %}
Input Object contains prompt, and more
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook" type="String" %}
URL endpoint to receive a webhook call on job complete, fail, or timeout.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.num_train_epochs" type="Integer" %}
The number of training steps to perform.

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.max_train_steps" type="Integer" %}
The total number of training steps to perform. If provided, overrides num\_train\_epochs.

Default: 2000
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train_batch_size" type="Integer" %}
Batch size (per device) for the training dataloader.

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.sample_batch_size" type="Integer" %}
Batch size (per device) for sampling images.

**Default: 2**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.gradient_accumulation_steps" type="Integer" %}
The number of updates steps to accumulate before performing a backward/update pass.

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.gradient_checkpointing" type="Boolean" %}
Whether or not to use gradient checkpointing to save memory at the expense of slower backward pass.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.learning_rate" type="Float" %}
Initial learning rate (after the potential warmup period) to use.

**Default: 1e-6**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.scale_lr" type="Boolean" %}
Scale the learning rate by the number of GPUs, gradient accumulation steps, and batch size.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.lr_scheduler" type="String" %}
The scheduler type to use.

Options: linear, cosine, cosine\_with\_restarts, polynomial, constant, constant\_with\_warmup

**Default: constant**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.lr_warmup_steps" type="Integer" %}
Number of steps for the warmup in the lr scheduler.

**Default: 0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.resolution" type="Integer" %}
The resolution for input images. All the images in the train/validation dataset will be resized to this.

Default: 512
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.center_crop" type="Boolean" %}
Whether to center crop images before resizing to resolution.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.use_8bit_adam" type="Boolean" %}
Whether or not to use 8-bit Adam from bitsandbytes.

**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.with_prior_preservation" type="Boolean" %}
Flag to add prior preservation loss.

**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.prior_loss_weight" type="Float" %}
Weight of prior preservation loss.

**Default: 1.0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.train_text_encoder" type="Boolean" %}
Whether to train the text encoder.

**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.adam_beta1" type="Float" %}
The beta1 parameter for the Adam optimizer.

**Default: 0.9**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.pad_tokens" type="Boolean" %}
Flag to pad tokens to length 77.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts" type="Array" required="true" %}
Contains the array of concepts that will be used to fine-tune your model. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.instance_data" type="String" required="true" %}
The URL to a publicly accessible .zip file of photos representing the instance.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.class_data" type="String" %}
The URL to a publicly accessible .zip file of photos representing the class.&#x20;

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.instance_prompt" type="String" required="true" %}
The prompt with an identifier specifying the instance.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.class_prompt" type="String" required="true" %}
The prompt to specify images in the same class as provided instance images.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.num_class_images" type="Integer" %}
Minimal class images for prior preservation loss. If not enough images are provided in class\_data, additional images will be sampled with class\_prompt.

**Default: 50**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.concepts.seed" type="Integer" %}
A seed for reproducible training.

**Default: 1337**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples" type="Array" required="true" %}
An array or objects of the samples to generate from the fine-tuned model. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.prompt" type="String" required="true" %}
The prompt used to generate sample outputs to save.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.negative_prompt" type="String" %}
The negative prompt used to generate sample outputs to save.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.guidance_scale" type="Float" %}
CFG for save sample.

**Default: 7.5**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.scheduler" type="String" %}
Choose a scheduler.\
Options: DDIM, K\_EULER,  DPMSolverMultistep, K\_EULER\_ANCESTRAL, PNDM, KLMS

**Default: DDIM**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.infer_steps" type="Integer" %}
The number of inference steps for save sample.

**Default: 50**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.samples.num_outputs" type="Integer" %}
The number of images to output.\
Range 1 -> 10

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.adam_beta2" type="Float" %}
The beta2 parameter for the Adam optimizer.

**Default: 0.999**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.adam_weight_decay" type="Float" %}
Weight decay to use.

**Default: 1e-2**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.adam_epsilon" type="Float" %}
Epsilon value for the Adam optimizer.

Default: 1.0
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.max_grad_norm" type="Float" %}
Max gradient norm.

Default: 1.0
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
    "instance_prompt": "random_subject_name",
    "class_prompt": "subject_category", 
    "instance_data":["https://URL_TO_SUBJECT_ASSETS"],
    "samples": [{
    "save_sample_prompt": "random_subject_name having fun in the sun"}, 
    {"save_sample_prompt": "random_subject_name having fun as a wizard"}
    ]},
    {
      "image": "https://job.results2",
      "seed": 2
    }
  ],
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
