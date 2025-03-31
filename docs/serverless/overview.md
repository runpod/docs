---
title: Concepts overview
description: "Learn the core concepts of RunPod Serverless - how it works, key components, and fundamental architecture. Understand workers, endpoints, and the request lifecycle."
sidebar_position: 4
---

# RunPod Serverless concepts

This guide explains the core concepts of RunPod Serverless to help you understand how the platform works and how different components interact with each other.

## Architecture overview

RunPod Serverless operates as a managed container platform that automatically handles scaling, infrastructure, and resource allocation. Here's how it works:

1. **Containers**: Your code runs inside Docker containers with the resources you specify (GPU, memory, etc.)
2. **Request queue**: API requests are placed in a queue specific to your endpoint
3. **Workers**: Container instances process jobs from the queue in parallel
4. **Auto-scaling**: Workers are dynamically created or destroyed based on demand

<!-- Architecture diagram will be added here in the future -->

## Core components

### Endpoints

An endpoint is the public REST API URL that serves your application. It has:

- A unique ID and API key for authentication
- Configuration for scaling, resources, and networking
- A job queue that manages all incoming requests

### Workers

Workers are container instances that process jobs from the queue:

- Each worker runs your container image
- Workers can be scaled from 0 to many instances
- Workers are isolated for security and performance

### Handler functions

A handler function is the code that processes each request:

```python
def handler(event):
    # Process input data
    job_input = event["input"]
    
    # Perform work here
    result = process_data(job_input)
    
    # Return output
    return result
```

### Jobs

Each request to your endpoint creates a job:

- Jobs have unique IDs for tracking
- Jobs can be synchronous (wait for result) or asynchronous (get result later)
- Jobs have states (PENDING, IN_PROGRESS, COMPLETED, etc.)

## Request lifecycle

1. **Request submission**: A client sends a POST request to your endpoint's URL
2. **Queue entry**: The request becomes a job in the queue
3. **Worker assignment**: A worker picks up the job when available
4. **Processing**: Your handler function processes the job
5. **Response**: The result is returned to the client

## Scalability concepts

### Min/Max workers

- **Min workers**: The minimum number of workers to keep running (even when idle)
- **Max workers**: The maximum number of concurrent workers to scale to

### Idle timeout

The time (in seconds) a worker remains active after finishing a job before shutting down.

### Flash boot

A feature that pre-warms workers to reduce cold start latency.

## Next steps

Now that you understand the core concepts:

1. [Deploy a pre-built model](quick-start/deploy-models.md) for a quick start
2. [Create your first endpoint](build/first-endpoint.md) to build something custom
3. [Learn about handler functions](workers/handlers/overview.md) for advanced development

> **Pro tip**: For optimal performance and cost-efficiency, tailor your worker count and idle timeout to your workload patterns.

<!--
### Endpoints

A Serverless Endpoint provides the REST API endpoint that serves your application.
You can create multiple endpoints for your application, each with its own configuration.

### Serverless handlers

Serverless handlers are the core of the Serverless platform.
They are the code that is executed when a request is made to a Serverless endpoint.
Handlers are written in Python and can be used to run any code that can be run in a Docker container.
-->
