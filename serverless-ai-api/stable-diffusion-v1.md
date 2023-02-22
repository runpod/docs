---
description: >-
  Stable Diffusion v1.5 is a latent text-to-image diffusion model capable of
  generating photo-realistic images given any text input.
---

# Stable Diffusion v1

### Examples

{% tabs %}
{% tab title="cURL" %}
### Create a job request

```bash
curl -X POST https://api.runpod.ai/v1/stable-diffusion-v1/run \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {"prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"}}'
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
curl https://api.runpod.ai/v1/stable-diffusion-v1/status/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    
```

#### Response&#x20;

```json
{
  "delayTime": 123456, // (milliseconds) time in queue
  "executionTime": 1234, // (milliseconds) time it took to complete the job
  "gpu": "24", // gpu type used to run the job
  "id": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
  "input": {
    "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists"
  },
  "output": [
    {
      "image": "https://job.results1",
      "seed": 1
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
<pre class="language-python"><code class="lang-python">import requests

# Set the API endpoint URL
endpoint = "https://api.runpod.ai/v1/stable-diffusion-v1/run"

# Set the headers for the request
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 }

# Define your inputs
input_data = {
  "input": {
    "prompt": "My creative vision."
  }
 }

# Make the request
<strong>response = requests.post(endpoint, json=input_data, headers=headers)
</strong>
# Print the response 
print(response.text)             
</code></pre>
{% endtab %}

{% tab title="NodeJS" %}
```javascript
const request = require('request');

// Set the API endpoint and model name
const endpoint = 'https://api.runpod.ai/v1/stable-diffusion-v1/run';

// Set the API key and input data
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const inputData = {
  input: {
    prompt: 'My creative vision.',
  },
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

{% tab title="Go" %}
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
  endpoint := "https://api.runpod.ai/v1/stable-diffusion-v1/run" 

  // Set the API key and input data
  apiKey := "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  inputData := map[string]interface{}{
    "input": map[string]string{
      "prompt": "My creative vision.",
    },
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

{% swagger method="post" path="/v1/stable-diffusion-v1/run" baseUrl="https://api.runpod.ai" summary="Run an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
RunPod API Key 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input" type="Object" required="true" %}
Input Object contains prompt, and more
{% endswagger-parameter %}

{% swagger-parameter in="body" name="webhook" type="String" %}
URL endpoint to receive a webhook call on job complete, fail, or timeout.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.prompt" required="true" type="String" %}
Your input prompt.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.negative_prompt" type="String" required="false" %}
Specify things to not see in the output.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.width" type="Integer" %}
With of output image.\
128, 256, 384, 448, 512, 576, 640, 704, 768

**Default: 512**\

{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.height" type="Integer" %}
Height of output image.\
128, 256, 384, 448, 512, 576, 640, 704, 768

**Default: 512**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.init_image" type="String" %}
URL for an initial image to generate variations of. Will be resized to the specific width and height.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.mask" type="String" %}
URL of a black and white image to use as a mask for inpainting over init\_image. Black pixels are inpainted and white pixels are preserved.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.guidance_scale" type="Float" %}
Scale for classifier-free guidance.\
Rage 1 -> 20

**Default: 7.5**
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Integer" name="input.num_inference_steps" %}
The number of denoising steps.\
Range 1 -> 500

**Default: 50**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.num_outputs" type="Integer" %}
The number of images to output.\
Range 1 -> 10

**Default: 1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.prompt_strength" type="Float" %}
How much importance is given to the prompt.\
Range: 0.0 -> 1.0

**Default: 0.8**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.scheduler" type="String" %}
Choose a scheduler.\
Options: DDIM, DDPM, DPM-M, DPM-S,  EULER-A, EULER-D, HEUN, IPNDM, KDPM2-A, KDPM2-D, PNDM, K-LMS

**Default: K-LMS**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.seed" type="Integer" %}
Random seed.

\




**Default: None**
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JSON response" %}
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

{% swagger-response status="429: Too Many Requests" description="Rate limited due to many requests" %}

{% endswagger-response %}
{% endswagger %}

{% swagger method="get" path="/v1/stable-diffusion-v1/status/{ REQUEST_ID }" baseUrl="https://api.runpod.ai" summary="Status and output of an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="REQUEST_ID" type="UUID" required="true" %}
inference request id
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JSON response" %}
```json
{
    "delayTime": 71, // (milliseconds) time in queue
    "executionTime": 3423, // (milliseconds) time it took to complete the job
    "gpu": "24", // gpu type used to run the job
    "id": "39a6a9eb-3f39-40ee-892f-d3c2b2545a2f",
    "input": {
        "height": 640,
        "num_inference_steps": 50,
        "prompt": "a cute magical flying dog, fantasy art drawn by disney concept artists",
        "width": 512
    },
    "output": [
        "https://r2..." // securely signed URLs
    ],
    "status": "COMPLETED" // COMPLETED, IN_QUEUE, IN_PROGRESS, FAILED
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
