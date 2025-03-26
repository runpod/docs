---
title: Configuration options
description: "Complete reference guide for RunPod Serverless configuration options. Learn about all available settings for endpoints, workers, networking, storage, and advanced features."
sidebar_position: 1
---

# Configuration options

This reference guide details all available configuration options for RunPod Serverless endpoints.

## Endpoint configurations

### Basic settings

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| **Name** | Identifier for your endpoint | - | Alphanumeric, hyphens allowed |
| **Image** | Container image URL | - | Public or private registry |
| **GPU Type** | Hardware type for compute | - | See [GPU options](#gpu-options) |
| **Worker Count** | Minimum workers to keep warm | 0 | Range: 0-1000 |
| **Max Workers** | Maximum concurrent workers | 1 | Range: 1-1000 |
| **Idle Timeout** | Seconds before scaling down | 30 | Range: 10-3600 |
| **Flash Boot** | Pre-warm workers | Disabled | Reduces cold start latency |

### Network settings

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| **Public Network** | Allow internet access | Enabled | Required for most use cases |
| **VPC** | Virtual Private Cloud | None | For secure networking |
| **Custom Domains** | Custom endpoint URL | None | Requires SSL certificate |

### Storage settings

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| **Volume Size** | Additional storage (GB) | 0 | Range: 0-1000 |
| **Volume Type** | Storage performance tier | Standard | Standard or SSD |
| **Persistent Storage** | Keep data between runs | Disabled | Higher cost, data preservation |

### Advanced settings

| Setting | Description | Default | Notes |
|---------|-------------|---------|-------|
| **Container Concurrency** | Jobs per worker | 1 | Range: 1-10 |
| **Memory** | RAM per worker (GB) | Auto | Based on GPU/CPU |
| **vCPUs** | CPU cores per worker | Auto | Based on GPU type |
| **Environment Variables** | Container environment | None | Format: KEY=value |
| **Secrets** | Encrypted environment vars | None | For sensitive data |
| **Container Template ID** | Template reference | None | For template deployment |

## GPU options

### NVIDIA GPUs

| GPU | vCPUs | Memory | Best for |
|-----|-------|--------|----------|
| **A100 80GB** | 30 | 80GB | Large LLMs, multi-modal models |
| **A100 40GB** | 24 | 40GB | Most LLMs, large diffusion models |
| **A10G** | 12 | 24GB | Medium models, production workloads |
| **L4** | 8 | 24GB | Efficient, cost-effective inference |
| **A6000** | 14 | 48GB | Research, 3D rendering |
| **A5000** | 12 | 24GB | Computer vision, mixed workloads |
| **A4000** | 10 | 16GB | Smaller models, cost effective |
| **RTX 4090** | 12 | 24GB | Fast cost-effective inference |
| **RTX 3090** | 10 | 24GB | Good balance for most models |

### CPU only

| CPU | vCPUs | Memory | Best for |
|-----|-------|--------|----------|
| **4 Core** | 4 | 16GB | API servers, orchestration |
| **8 Core** | 8 | 32GB | Data processing, medium workloads |
| **16 Core** | 16 | 64GB | Heavy CPU computation |

## Environment variables

You can set these environment variables to configure worker behavior:

| Variable | Description | Default |
|----------|-------------|---------|
| `RUNPOD_WEBHOOK_URL` | URL to receive job completion webhooks | None |
| `RUNPOD_WEBHOOK_SECRET` | Secret for webhook authentication | None |
| `RUNPOD_ENDPOINT_ID` | Endpoint identifier (auto-set) | - |
| `RUNPOD_API_KEY` | For API actions within container | None |
| `RUNPOD_LOG_LEVEL` | Logging verbosity (DEBUG,INFO,WARN,ERROR) | INFO |
| `RUNPOD_TIMEOUT_GRACE` | Grace period before timeout (seconds) | 30 |
| `RUNPOD_TRUSTED_ORIGINS` | CORS origins for direct access | None |

## Endpoint template format

If you're using CI/CD or Infrastructure as Code, here's the JSON schema for endpoint configuration:

```json
{
  "name": "my-endpoint",
  "image": "username/image:tag",
  "gpu": "A10G",
  "minWorkers": 0,
  "maxWorkers": 5,
  "idleTimeout": 60,
  "flashBoot": false,
  "network": {
    "publicNetwork": true,
    "vpc": null,
    "domains": []
  },
  "storage": {
    "size": 20,
    "type": "ssd",
    "persistent": false
  },
  "advanced": {
    "containerConcurrency": 1,
    "memory": null,
    "vcpu": null,
    "envVars": {
      "KEY1": "value1",
      "KEY2": "value2"
    },
    "secrets": {
      "API_KEY": "secret_value"
    }
  }
}
```

## Configuration best practices

- **Start with minimal resources** and scale up as needed
- **Test locally** before deployment to ensure container works
- **Use environment variables** for configuration that changes between environments
- **Use secrets** for sensitive information like API keys
- **Consider persistent storage** for large models or datasets
- **Monitor metrics** to fine-tune your configuration

## Related guides

- [Configure autoscaling](/docs/serverless/manage/scaling) - Optimize performance and cost
- [Optimize resources](/docs/serverless/manage/optimize) - Fine-tune resource usage
- [API reference](/docs/serverless/reference/api) - Programmatically manage endpoints
- [Troubleshooting guide](/docs/serverless/reference/troubleshooting) - Solve common issues 