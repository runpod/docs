---
title: Configurable Endpoints
description: Focus on selecting their desired model and customizing the template parameters, while vLLM takes care of the low-level details of model loading, hardware configuration, and execution.
---

RunPod's Configurable Endpoints feature leverages vLLM to enable the deployment of any large language model.

When you select the **vLLM Endpoint** option, RunPod utilizes vLLM's capabilities to load and run the specified Hugging Face model.
By integrating vLLM into the configurable endpoints, RunPod simplifies the process of deploying and running large language models.

Focus on selecting their desired model and customizing the template parameters, while vLLM takes care of the low-level details of model loading, hardware configuration, and execution.

## Deploy an LLM

1. Select **Explore** and then choose **vLLM** to deploy any large language models.
2. In the vLLM deploy modal, enter the following:
   1. (optional) Enter a template.
   2. Enter your Hugging Face LLM repository name.
   3. (optional) Enter your Hugging Face token.
   4. Review the CUDA version.
3. Select **Next** and review the configurations for the **vLLM parameters** page.
4. Select **Next** and review the Endpoint parameters page.
   1. Prioritize your **Worker Configuration** by selecting the order GPUs you want your Workers to use.
   2. Enter the Active, Max, and GPU Workers.
   3. Provide additional Container configuration.
      1. Provide **Container Disk** size.
      2. Review the **Environment Variables**.
5. Select **Deploy**.


Your LLM is now deployed to an Endpoint.
You can now use the API to interact with your model.

:::note

RunPod supports any models' architecture that can run on [vLLM](https://github.com/vllm-project/vllm) with configurable endpoints.

:::