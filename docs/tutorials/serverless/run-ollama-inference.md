---
title: Run an Ollama Server on a RunPod CPU
description: Learn to set up and run an Ollama server on RunPod CPU for inference with this step-by-step tutorial.
---

In this guide, you will learn how to run an Ollama server on your RunPod CPU for inference.
Although this tutorial focuses on CPU compute, you can also select a GPU type and follow the same steps.
By the end of this tutorial, you will have a fully functioning Ollama server ready to handle requests.

## Setting up your Endpoint

:::note

Use a [Network volume](/pods/storage/create-network-volumes) to attach to your Worker so that it can cache the LLM and decrease cold start times.
If you do not use a network volume, the Worker will have to download the model every time it spins back up, leading to increased latency and resource consumption.

:::

To begin, you need to set up a new endpoint on RunPod.

1. Log in to your [RunPod account](https://www.runpod.io/console/console/home).
2. Navigate to the **Serverless** section and select **New Endpoint**.
3. Choose **CPU** and provide a name for your Endpoint, for example 8 vCPUs 16 GB RAM.
4. Configure your Worker settings according to your needs.
5. In the **Container Image** field, enter the `pooyaharatian/runpod-ollama:0.0.8` container image.
6. In the **Container Start Command** field, specify the [Ollama supported model](https://ollama.com/library), such as `orca-mini` or `llama3.1`.
7. Allocate sufficient container disk space for your model. Typically, 20 GB should suffice for most models.
8. (optional) In **Environment Variables**, set a new key to `OLLAMA_MODELS` and its value to `/runpod-volume`. This will allow the model to be stored to your attached volume.
9. Click **Deploy** to initiate the setup.

Your model will start downloading. Once the Worker is ready, proceed to the next step.

## Sending a Run request

After your endpoint is deployed and the model is downloaded, you can send a run request to test the setup.

1. Go to the **Requests** section in the RunPod web UI.
2. In the input module, enter the following JSON object:

   ```json
   {
     "input": {
       "method_name": "generate",
       "input": {
         "prompt": "why the sky is blue?"
       }
     }
   }
   ```

3. Select **Run** to execute the request.
4. In a few seconds, you will receive a response. For example:

   ```json
   {
     "delayTime": 153,
     "executionTime": 4343,
     "id": "c2cb6af5-c822-4950-bca9-5349288c001d-u1",
     "output": {
       "context": [
         "omitted for brevity"
       ],
       "created_at": "2024-05-17T16:56:29.256938735Z",
       "done": true,
       "eval_count": 118,
       "eval_duration": 807433000,
       "load_duration": 3403140284,
       "model": "orca-mini",
       "prompt_eval_count": 46,
       "prompt_eval_duration": 38548000,
       "response": "The sky appears blue because of a process called scattering. When sunlight enters the Earth's atmosphere, it encounters molecules of air such as nitrogen and oxygen. These molecules scatter the light in all directions, but they scatter the shorter wavelengths of light (such as violet and blue) more than the longer wavelengths (such as red). This creates a reddish-orange sky that is less intense on the horizon than on the observer's position. As the sun gets lower in the sky, the amount of scattering increases and the sky appears to get brighter.",
       "total_duration": 4249684714
     },
     "status": "COMPLETED"
   }
   ```

With your Endpoint set up, you can now integrate it into your application just like any other request.

## Conclusion

In this tutorial, you have successfully set up and run an Ollama server on a RunPod CPU.
Now you can handle inference requests using your deployed model.

For further exploration, check out the following resources:

- [Runpod Ollama repository](https://github.com/pooyahrtn/)
- [RunPod Ollama container image](https://hub.docker.com/r/pooyaharatian/runpod-ollama)
