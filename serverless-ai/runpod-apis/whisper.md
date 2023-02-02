---
description: Whisper is an automatic speech recognition (ASR) system.
---

# Whisper

### Required Input

```json
{
  "input":{
    "audio": "https://LINK_TO_AUDIO.FILE"
  }    
}
```

### Examples

{% tabs %}
{% tab title="cURL" %}
### Create a job request

```bash
curl -X POST https://api.runpod.ai/v1/whisper/run \
-H 'Content-Type: application/json'                             \
-H 'Authorization: Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'    \
-d '{"input": {"audio": "https://LINK_TO_AUDIO.FILE"}}'
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
curl https://api.runpod.ai/v1/whisper/status/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx \
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
    "audio": "https://LINK_TO_AUDIO.FILE"
  },
  "output": {
    "detected_language": "language", 
    "segments": [{
      "avg_logprob": 0.1,
      "compression_ratio": 1,
      "end": 2,
      "id": 0,
      "no_speech_prob": 0,
      "seek": 0,
      "start": 0,
      "temperature": 1,
      "text": "Couple starting words",
      "tokens": [1,2,3]
    }],
    "transcription": "Full transcription",
    "translation": null
  },
  "status": "COMPLETED"
}
```
{% endtab %}

{% tab title="Python" %}
<pre class="language-python"><code class="lang-python">import requests

# Set the API endpoint URL
endpoint = "https://api.runpod.ai/v1/whisper/run"

# Set the headers for the request
headers = {
  "Content-Type": "application/json",
  "Authorization": "Bearer xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 }

# Define your inputs
input_data = {
  "input": {
    "audio": "https://LINK_TO_AUDIO.FILE"
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
const endpoint = 'https://api.runpod.ai/v1/whisper/run';

// Set the API key and input data
const apiKey = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
const inputData = {
  input: {
    audio: 'https://LINK_TO_AUDIO.FILE',
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
  endpoint := "https://api.runpod.ai/v1/whisper/run" 

  // Set the API key and input data
  apiKey := "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  inputData := map[string]interface{}{
    "input": map[string]string{
      "audio": "https://LINK_TO_AUDIO.FILE",
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

{% swagger method="post" path="/v1/whisper/run" baseUrl="https://api.runpod.ai" summary="Run an inference request." %}
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

{% swagger-parameter in="body" name="input.audio" required="false" type="String" %}
Your input audio file.
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.model" type="String" required="false" %}
Choose a Whisper model.

Options: tiny, base, small, medium, large-v1, large-v2

**Default: base**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.transcription" type="String" %}
Choose the format for the transcription.

Options: plain text, srt, vtt

**Default: plain text**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.translate" type="Boolean" %}
Translate the text to English when set to True.

**Default: False**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.language" type="String" %}
Language spoken in the audio, specify None to perform language detection.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" type="Float" name="input.temperature" %}
Temperature to use for sampling.

**Default: 0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.best_of" type="Integer" %}
The number of candidates when sampling with non-zero temperature.

**Default: 5**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.beam_size" type="Integer" %}
Number of beams in beam search, only applicable when temperature is zero.

**Default: 5**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.patience" type="Float" %}
Optional patience value to use in beam decoding.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.length_penalty" type="Float" %}
Optional token length penalty coefficient (alpha) as in https://arxiv.org/abs/1609.08144, uses simple length normalization by default.

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.suppress_tokens" type="String" %}
Comma-separated list of token ids to suppress during sampling; '-1' will suppress most special characters except common punctuations.&#x20;

**Default: -1**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.initial_prompt" type="String" %}
Optional text to provide as a prompt for the first window.&#x20;

**Default: None**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.condition_on_previous_text" type="Boolean" %}
If True, provide the previous output of the model as a prompt for the next window; disabling may make the text inconsistent across windows, but the model becomes less prone to getting stuck in a failure loop.

\




**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.temperature_increment_on_fallback" type="Float" %}
Temperature to increase when falling back when the decoding fails to meet either of the thresholds below.&#x20;

**Default: 0.2**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.compression_ratio_threshold" type="Float" %}
If the gzip compression ration is higher than this value, treat the decoding as failed.&#x20;

**Default: 2.4**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.logprob_threshold" type="Float" %}
If the average log probability is lower than this value, treat the decoding as failed.

**Default: -1.0**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.no_speech_threshold" type="Float" %}
If the probability of the <|nospeech|> token is higher than this value AND the decoding has failed due to 'logprob\_threshold', consider the segment as silence.&#x20;

**Default: 0.6**
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

{% swagger method="get" path="/v1/whisper/status/{ REQUEST_ID }" baseUrl="https://api.runpod.ai" summary="Status and output of an inference request." %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="path" name="REQUEST_ID" type="UUID" required="true" %}
inference request id
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="JSON response" %}
```json
{
    "delayTime": 157664,
    "executionTime": 3289,
    "id": "4b82e3fb-ce2b-49dc-bd35-965041cd161b",
    "input": {
        "audio": "https://github.com/runpod/serverless-workers/raw/main/Input-Samples/gettysburg.wav"
    },
    "output": {
        "detected_language": "english",
        "segments": [{
            "avg_logprob": -0.18336993294793205,
            "compression_ratio": 1.3858267716535433,
            "end": 10,
            "id": 0,
            "no_speech_prob": 0.06009136512875557,
            "seek": 0,
            "start": 0,
            "temperature": 0,
            "text": " Four score and seven years ago, our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.",
            "tokens": [50364, 7451, 6175, 293, 3407, 924, 2057, 11, 527, 23450, 3038, 5220, 322, 341, 18932, 257, 777, 4790, 11, 34898, 294, 22849, 11, 293, 8374, 281, 264, 24830, 300, 439, 1706, 366, 2942, 2681, 13, 50864]
        }],
        "transcription": "00:00.000 --> 00:10.000\nFour score and seven years ago, our fathers brought forth on this continent a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.\n\n",
        "translation": null
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
