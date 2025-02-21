---
title: Configurable Endpoints
description: "Deploy large language models and vision models with ease using RunPod's Configurable Endpoints feature, leveraging vLLM to simplify model loading, hardware configuration, and execution, allowing you to focus on model selection and customization."
---

RunPod's Configurable Endpoints feature leverages vLLM to enable the deployment of multiple model types, including language and vision models.

When you select the **Serverless vLLM** option, RunPod utilizes vLLM's capabilities to load and run the specified Hugging Face models.
By integrating vLLM into the configurable endpoints, RunPod simplifies the process of deploying and running various AI models.

Focus on selecting your desired models and customizing the template parameters, while vLLM takes care of the low-level details of model loading, hardware configuration, and execution.

## Deploy Models

1. Select **Explore** and then choose **Serverless vLLM** to deploy your models.
2. In the vLLM deploy modal, enter the following:
   1. Select a vLLM version.
   2. Enter your Hugging Face model repository name.
   3. Choose your model type (language or vision) using the UI selector.
   4. (optional) Enter your Hugging Face token.
3. Select **Next** and review the configurations on the **vLLM parameters** page.
4. Select **Next** and review the **Endpoint parameters** page.
   1. Prioritize your **Worker Configuration** by selecting GPUs in the order that you prefer your Workers to use.
   2. Enter the **Active Workers**, **Max Workers**, and **GPUs/Worker**.
   3. Provide additional Container Configuration.
      1. (optional) Select a Template.
      2. Verify the **Container Image** uses your desired CUDA version.
      3. Provide **Container Disk** size.
      4. Review the **Environment Variables**.
5. Select **Deploy**.

Your models are now deployed to an Endpoint.
You can now use the API to interact with your models, selecting between language and vision capabilities as needed through the interface.

:::note

RunPod supports any models' architecture that can run on [vLLM](https://github.com/vllm-project/vllm) with configurable endpoints, including both language and vision models.

:::
