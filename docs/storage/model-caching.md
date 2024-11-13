---
title: Model caching
description: "Model caching allows you to quickly switch out machine learning models in your code."
sidebar_position: 4
---

Model caching allows you to dynamically load and switch between machine learning models in your applications without rebuilding your contianer images or changing your code.
It automatically handles model and dataset downloads and makes them available to your application.

:::note

Model caching currently supports models and data sets from [Hugging Face](https://huggingface.co/).

:::

## Benefits

- Faster Development: Switch models instantly without rebuilding containers
- Better Performance: Optimized cold start times and caching
- Easy Integration: Works with popular ML frameworks like PyTorch and Transformers

You can cache your models for both Pods and Serverless.

## Get started with Serverless

With model caching you can preload the models.
This helps so you don't need to bake the model into your docker image or wait for the Worker to download your model from Hugging Face.

1. Log in to the [RunPod Serverless console](https://www.runpod.io/console/serverless).
2. Select **+ New Endpoint**.
3. Provide the following:
   1. Endpoint name.
   2. Select your GPU configuration.
   3. Configure the number of Workers.
   4. (optional) Select **FlashBoot**.
   5. (optional) Select a template.
   6. Enter the name of your Docker image.
      - For example `<username>/<repo>:<tag>`.
   7. Specify enough memory for your Docker image.
4. Add your Hugging Face model.
   1. Add the name of the model you want to use (up to five per endpoint).
   2. (optional) Add your Hugging Face API Key for gated or private models.
5. Select **Deploy**.

The Model Cache will automatically download the model and make it available to your code.

## Get started with Pods

With model caching you can preload the models.
This helps so you don't need to bake the model download the models while your Pod is starting up.
RunPod handles all of this for you.

1. Navigate to [Pods](https://www.runpod.io/console/pods) and select **+ Deploy**.
2. Choose between **GPU** and **CPU**.
3. Customize your an instance by setting up the following:
   1. (optional) Specify a Network volume.
   2. Select an instance type. For example, **A40**.
   3. (optional) Provide a template. For example, **RunPod Pytorch**.
   4. (GPU only) Specify your compute count.
   5. Add your Hugging Face model.
4. Review your configuration and select **Deploy On-Demand**.

The Model Cache will automatically download the model and make it available to your code on your Pod.

## How to interact with your models

The model path is as followed:

```
/runpod/cache/model/$MODELNAME
```

You can set this path in your code.
For example:

```python
import transformers

# path to your model
model = AutoModel.from_pretrained("/runpod/cache/model/$MODEL_NAME/main")
```

Now when this code executes in a Pod or Serverless example, it will already have the model available to you.

## Environment variables

HuggingFace models and datasets are configured using environment variables.

For public models and datasets, you only need to specify what to download.
For private resources, you must provide authentication credentials.

### Model and dataset selection

- `RUNPOD_HUGGINGFACE_MODEL`\
  Specifies which models to download. Accepts a comma-separated list of models in the format `user/model[:branch]`.

- `RUNPOD_HUGGINGFACE_DATASET`\
  Specifies which datasets to download. Accepts a comma-separated list of datasets in the format `user/dataset[:branch]`.

### Authentication (Optional)

Both variables must be provided together for private resource access:

- `RUNPOD_HUGGINGFACE_TOKEN`\
  Your HuggingFace authentication token.

- `RUNPOD_HUGGINGFACE_USER`\
  Your HuggingFace username.

### Basic usage

Download a single model or dataset from the default (`main`) branch:

```bash
# Download a model
RUNPOD_HUGGINGFACE_MODEL="openai/whisper-large"

# Download a dataset
RUNPOD_HUGGINGFACE_DATASET="mozilla-foundation/common_voice_11_0"
```

### Specifying branches

Access specific branches by appending `:branch-name`:

```bash
# Download from a specific branch
RUNPOD_HUGGINGFACE_MODEL="openai/whisper-large:experimental"
```

### Multiple resources

Download multiple models or datasets by separating them with commas:

```bash
# Download multiple models
RUNPOD_HUGGINGFACE_MODEL="openai/whisper-large,google/flan-t5-base"

# Download multiple datasets with different branches
RUNPOD_HUGGINGFACE_DATASET="mozilla-foundation/common_voice_11_0,huggingface/dataset-metrics:dev"
```

### Private resources

Access private resources by providing authentication:

```bash
RUNPOD_HUGGINGFACE_USER="your-username"
RUNPOD_HUGGINGFACE_TOKEN="hf_..."
RUNPOD_HUGGINGFACE_MODEL="your-org/private-model"
```

## Example configurations

```bash
# Single public model
RUNPOD_HUGGINGFACE_MODEL="facebook/opt-350m"

# Multiple models with different branches
RUNPOD_HUGGINGFACE_MODEL="facebook/opt-350m:main, google/flan-t5-base:experimental"

# Private model with authentication
RUNPOD_HUGGINGFACE_USER="your-username"
RUNPOD_HUGGINGFACE_TOKEN="hf_..."
RUNPOD_HUGGINGFACE_MODEL="your-org/private-model"

# Multiple datasets
RUNPOD_HUGGINGFACE_DATASET="mozilla-foundation/common_voice_11_0, huggingface/dataset-metrics"
```
