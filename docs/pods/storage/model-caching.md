---
title: "Model Caching"
description: "Model caching on RunPod allows you to efficiently manage and reuse machine learning models and datasets across multiple pods or serverless instances."
sidebar_position: 9
---


Model caching on RunPod allows you to efficiently manage and reuse machine learning models and datasets across multiple pods or serverless instances. 
RunPod significantly reduces download times, network usage, and overall resource consumption when working with large models or datasets from Hugging Face.

## Setting Up Model Caching

To use model caching on RunPod, you need to:

1. Set up the appropriate environment variables.
2. Create a network volume for the network cache.
3. Launch your pod or serverless instance with the network volume attached.

## Environment Variables

Configure model caching using the following environment variables:

- `HUGGINGFACE_MODEL` or `HUGGINGFACE_MODELS`: Comma-separated list of models to download (format: `model[:branch]`).
- `HUGGINGFACE_DATASET` or `HUGGINGFACE_DATASETS`: Comma-separated list of datasets to download (format: `dataset[:branch]`).
- `HUGGINGFACE_TOKEN`: Token for accessing private models or datasets.
- `HUGGINGFACE_USER`: Username for accessing private models or datasets.

Examples:
```
HUGGINGFACE_MODEL="openchat/openchat-3.5-0106,openchat/openchat-3.5-1210"
HUGGINGFACE_DATASET="google-bert/bert-base-uncased"
```

## Using Network Volumes

To create a network volume for caching:

1. Go to the Secure Cloud page on RunPod.
2. Click "Create Volume".
3. Select a data center, provide a name, and specify the size.
4. Add the enviroment variables for your model or dataset.
4. Deploy your pod, selecting the created network volume.

Network volumes allow multiple pods to share cached models and datasets, improving efficiency and reducing storage costs.

## Storage Types

RunPod offers three types of storage:

1. Container Volume: Temporary storage tied to a pod's lifecycle.
2. Disk Volume: Persistent storage that lasts for the duration of a pod's lease.
3. Network Storage: Persistent, movable storage that can be shared between Pods.

For model caching, you'll primarily use network storage to create shared caches across multiple Pods or Serverless instances.