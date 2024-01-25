---
title: Get started
sidebar_position: 2
---

Now that your Endpoint is deployed, send a test.
This is a great way to test your Endpoint before sending a request from your application.

## Send a Request

1. From the Endpoint's page, select **Requests**.
2. Choose **Run**.
3. You should see a successful response with the following:

```json
{
  "id": "6de99fd1-4474-4565-9243-694ffeb65218-u1",
  "status": "IN_QUEUE"
}
```

After a few minutes, the stream will show the full response.

You can now begin sending requests to your Endpoint from your terminal and an application.

## Send a request using cURL

Once your Endpoint is deployed, you can send a request.
This example sends a response to the Endpoint using cURL; however, you can use any HTTP client.

```curl
curl --request POST \
     --url https://api.runpod.ai/v2/${YOUR_ENDPOINT}/runsync 
     --header "accept: application/json" \
     --header "authorization: ${YOUR_API_KEY}" \
     --header "content-type: application/json" \
     --data '
{
  "input": {
    "prompt": "A coffee cup.",
    "height": 512,
    "width": 512,
    "num_outputs": 1,
    "num_inference_steps": 50,
    "guidance_scale": 7.5,
    "scheduler": "KLMS"
  }
}
'
```

Where `YOUR_ENDPOINT` is the name of your Endpoint and `YOUR_API_KEY` is your API Key.

:::note

Depending on any modifications you made to your Handler Function, you may need to modify the request.

:::

## Next steps

Now that you have successfully launched an endpoint using our template, you can:

- [Send requests to the Endpoint](/serverless/endpoints/overview)

If the models provided aren't enough, you can write your own customize Function Handler:

- [Customize the Handler Function](/serverless/workers/handlers/overview)
