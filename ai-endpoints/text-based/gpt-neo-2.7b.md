# GPT Neo 2.7B

{% swagger method="post" path="gpt-neo-2_7b/runsync" baseUrl="https://api.runpod.ai/v2/" summary="" %}
{% swagger-description %}

{% endswagger-description %}

{% swagger-parameter in="header" name="Authorization" required="true" %}
RunPod API Key
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input" type="Object" required="true" %}
Input components for the GPT model
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.prompt" required="true" %}
The start of the prompt text that the model will infer from. 
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.do_sample" type="Boolean" %}
Enables decoding strategies such as multinomial sampling, beam-search multinomial sampling, Top-K sampling and Top-p sampling. All these strategies select the next token from the probability distribution over the entire vocabulary with various strategy-specific adjustments.

\




**Default: True**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.max_length" type="Integer" %}
The number of tokens (words) that should be generated. 

\




**Default: 100**
{% endswagger-parameter %}

{% swagger-parameter in="body" name="input.temperature" type="Boolean" %}
How closely the output should follow the prompt. 
{% endswagger-parameter %}

{% swagger-response status="200: OK" description="Requested Output" %}

{% endswagger-response %}
{% endswagger %}
