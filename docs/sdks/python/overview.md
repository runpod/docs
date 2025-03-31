---
title: Overview
sidebar_position: 1
description: "Get started with RunPod Python SDK for building AI applications, deploying ML models, and managing computational resources. Learn how to set up your environment and start building."
---

This guide helps you use the RunPod Python SDK to build AI applications and manage computational resources. You'll learn how to set up your environment and start building with Python.

## Quick start

1. Set up your Python environment:
   ```bash
   python3 -m venv env
   source env/bin/activate  # On macOS/Linux
   # or
   env\Scripts\activate    # On Windows
   ```

2. Install the SDK:
   ```bash
   python -m pip install runpod
   ```

3. Configure your API key:
   ```python
   import runpod
   import os

   runpod.api_key = os.getenv("RUNPOD_API_KEY")
   ```

## Common use cases

### Deploy ML models
- [Create serverless endpoints](endpoints.md)
- [Configure GPU resources](apis.md#list-available-gpus)
- [Monitor model performance](structured-logging.md)

### Build AI applications
- [Set up development environment](apis.md#create-templates)
- [Deploy applications](apis.md#create-endpoints)
- [Track application logs](structured-logging.md)

### Manage resources
- [Configure GPU instances](apis.md#list-available-gpus)
- [Set up templates](apis.md#create-templates)
- [Scale endpoints](apis.md#create-endpoints)

## Key features

### Serverless deployment
- Deploy ML models as serverless endpoints
- Automatic scaling based on demand
- Pay-per-use pricing model

### Resource management
- GPU instance configuration
- Template-based deployment
- Resource monitoring

### Monitoring and logging
- Structured logging interface
- Performance tracking
- Error handling

## Next steps

1. [Set up your environment](apis.md)
2. [Deploy your first model](endpoints.md)
3. [Monitor your application](structured-logging.md)
4. [Scale your resources](apis.md#create-endpoints)

> **Note:** The Python SDK is optimized for AI/ML applications. Use it for model deployment, data processing, and scientific computing.
