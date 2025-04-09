---
title: "Programming model"
sidebar_position: 3
description: Learn the basics of the Serverless programming model and platform architecture.
---

# Programming model and architecture

This page explains the overall architecture of the Serverless platform, and gives an overview of the programming model for creating Serverless endpoints.

Understanding the architecture and programming model of Serverless allows you to build efficient and scalable applications. The platform's flexible design supports a wide range of workloads, from simple API endpoints to complex AI inference and training services.

By following the patterns and best practices outlined in this document, you can leverage the full power of Serverless to build high-performance, cost-effective, and scalable applications.

## Serverless programming model

Serverless follows an event-driven programming model where your code responds to triggers (HTTP requests) and processes data without managing the underlying infrastructure. This section explains the key concepts and patterns for developing applications on Serverless.

### Handler functions

At the core of Serverless is the **handler function**. This is the entry point to your Serverless application that processes incoming requests and returns results.

```python
import runpod

def handler(event):
    """
    This is the function that will be called when the Serverless function is executed.
    
    Args:
        event: The event payload, which includes the input data for your function
    
    Returns:
        The response data, which will be returned to the caller
    """
    # Extract input data from the event
    input_data = event["input"]
    
    # Process the input
    result = process_data(input_data)
    
    # Return the result
    return result

def process_data(data):
    # Your custom processing logic here
    return {"processed_data": data}

# Start the Serverless function
if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})
```

### Event structure

When your handler function is invoked, it receives an event object containing:

- **input**: The input data provided by the caller
- **id**: A unique identifier for the request

The `input` field contains the data sent to your endpoint. You have full control over its structure, but it should be JSON-serializable.

### Response format

Your handler function can return any JSON-serializable data, which will be delivered to the caller. For more advanced use cases, you can return:

- Simple values (strings, numbers, booleans).
- Complex objects (dictionaries, lists).
- Stream results using Python generators.
- File data using base64 encoding.

### Streaming results

For long-running operations, you can stream partial results back to the caller:

```python
import runpod

def handler(event):
    # For large operations that take time, you can yield partial results
    for i in range(10):
        # Process some data
        partial_result = {"progress": (i + 1) * 10, "data": f"Chunk {i}"}
        
        # Yield intermediate results
        yield partial_result
    
    # Return the final result
    return {"status": "complete"}

if __name__ == "__main__":
    runpod.serverless.start({"handler": handler})
```

## Serverless architecture

Serverless is built on a distributed architecture designed for performance, scalability, and reliability. Understanding this architecture helps you optimize your applications.

### Key components

1. **Serverless endpoints**: The REST API endpoints that serve your application and receive client requests.
2. **Serverless workers**: Container instances that execute your code when triggered by requests.
3. **Queue system**: Buffers requests when workers are busy to ensure reliable job processing.
4. **Job manager**: Handles job lifecycle including execution, monitoring, and result delivery.
5. **Storage system**: Manages temporary storage for request/response data (retained for 30 minutes).
6. **Network volumes**: Optional persistent storage that can be shared across workers.

### Request flow

1. **Request submission**: A client sends a request to the RunPod API (`https://api.runpod.ai/v2/{endpoint_id}/{operation}`).
2. **Request queuing**: If no workers are available, the request is placed in a queue.
3. **Worker assignment**: An available worker is assigned to process the request.
4. **Code execution**: Your handler function executes in the worker container.
5. **Result delivery**: The result is returned to the client (synchronously or asynchronously).

```plaintext
┌─────────┐     ┌─────────────┐     ┌──────────────┐     ┌─────────┐
│  Client │────▶│ Endpoint    │────▶│ Queue system │────▶│ Worker  │
└─────────┘     └─────────────┘     └──────────────┘     └────┬────┘
                                                              │ 
                                                              │ 
┌─────────┐     ┌─────────────┐     ┌─────────────┐           │
│  Client │◀────│ Endpoint    │◀────│ Storage     │◀──────────┘
└─────────┘     └─────────────┘     └─────────────┘
```

### Scaling behavior

Serverless automatically scales your application based on demand:

- **Scale to zero**: When there are no requests, your application scales to zero workers.
- **Automatic scaling**: Dynamically scale workers from 0 to 100 on the secure cloud platform.
- **Worker configuration**: Configure active workers (minimum number) and max workers settings.
- **Fast cold-start**: RunPod proactively pre-warms workers with 3-second cold-start times (plus runtime).
- **FlashBoot option**: Enable FlashBoot when creating endpoints to further reduce startup times.

### Endpoints

Endpoints are the fundamental interface between clients and your Serverless application. They serve as the gateway for deploying and managing your workers, providing a URL that clients can send requests to.
endpoint characteristics

- **REST API interface:** Each endpoint exposes a REST API at https://api.runpod.ai/v2/{endpoint_id}/{operation}.
- **Stateless design:** Endpoints follow a stateless design pattern, with temporary state maintained in the storage system.
- **Auto-scaling:** Endpoints automatically scale the number of workers based on demand.
- **Operation modes:** Serverless supports both synchronous and asynchronous operation modes for different use cases.
- **Health monitoring:** Provide health status and metrics through the `/health` endpoint.

#### vLLM endpoints

Serverless provides specialized endpoints for large language model (LLM) deployments through vLLM Workers. These endpoints leverage the vLLM engine to efficiently run inference on a wide range of LLMs with minimal configuration.

Key features:

- **Pre-built Docker images:** Deploy using `runpod/worker-v1-vllm:stable-cuda12.1.0` without building custom Docker images yourself.
- **OpenAI API compatibility:** Seamlessly integrate with OpenAI's API by changing just a few lines of code, supporting Chat Completions, Completions, and Models endpoints with both streaming and non-streaming capabilities.
- **Dynamic batch size:** Experience rapid time-to-first-token combined with high throughput for larger batches when streaming output.
- **Extensive model support:** Deploy almost any LLM from Hugging Face, including private and custom models.
- **Configurable environment:** Control model settings, tokenizer options, system configurations, and performance parameters through environment variables.

For LLM deployments, vLLM endpoints provide a high-performance, cost-effective solution with minimal operational overhead.

### Workers

A [worker](/serverless/workers/overview) is a single compute resource that processes API requests. Each endpoint can have multiple workers, enabling parallel processing of multiple requests simultaneously.

#### Worker states

Workers can exist in several states:

- **Initializing:** When preparing the Docker image.
- **Idle:** Ready to handle requests but not processing any (no charge).
- **Running:** Actively processing requests (billed per second).
- **Throttled:** When resources are temporarily unavailable.
- **Outdated:** After the endpoint updates, waiting for a rolling replacement.
- **Unhealthy:** When the Docker container crashes due to issues.

If the worker remains idle for too long or the max workers setting is reduced, it is terminated.

#### Container architecture

Workers uses Docker containers to isolate and execute your code:

1. **Custom images**: You can bring your own Docker images or use RunPod's pre-built templates.
2. **Quick Deploys**: Pre-built custom endpoints of popular models with minimal configuration.
3. **Environment variables**: Configure your containers using environment variables.
4. **File system**: Each worker has its own ephemeral file system.
5. **Network access**: Workers can access the internet to fetch resources.

#### GPU management and prioritization

Serverless workers provide efficient resource management for GPU workloads:

- **Dedicated GPUs**: Each worker gets dedicated access to one or more GPUs.
- **Memory isolation**: GPU memory is isolated between workers.
- **GPU prioritization**: When creating or modifying endpoints, you can specify GPU preferences in descending order of priority.
- **Flexible allocation**: If your preferred GPU isn't available, the system automatically defaults to the next available GPU in your priority list.
- **Streaming processing**: For large inputs/outputs, use streaming to avoid memory bottlenecks.

### Network volumes

Serverless uses temporary storage for request/response data by default, but you can also use [network volumes](/pods/storage/create-network-volumes) for **persistent storage** and **data sharing** between workers. You can also use network volumes to store large models instead of embedding them in container images.

### Security and data retention

1. **Isolation**: Each worker runs in an isolated container.
2. **API authentication**: API access is controlled through API keys.
3. **Network security**: Workers run in a secure network environment.
4. **Data privacy**: Input and output data are retained for a maximum of 30 minutes for asynchronous requests and 1 minute for synchronous requests to protect your information.
5. **Rate limits**: The platform enforces rate limits on various endpoint operations to ensure fair usage.

## Optimizing your application

Running applications on Serverless requires different optimization strategies than traditional server-based deployments. By understanding and implementing these optimization techniques, you can significantly improve performance, reduce costs, and enhance the user experience of your Serverless applications.

### Performance considerations

Optimizing performance in Serverless environments requires focusing on reducing initialization time, managing resources efficiently, and structuring your code for parallel execution:

1. **Minimize initialization time**: Move heavy initialization (like model loading) to the container startup.
2. **FlashBoot option**: Enable FlashBoot when creating endpoints to speed up worker startup times.
3. **Batch processing**: Process multiple items in a single request when possible.
4. **Efficient I/O**: Use asynchronous I/O for network and file operations.
5. **Memory management**: Be mindful of memory usage, especially with large models.
6. **Concurrency settings**: Adjust the concurrency settings based on your workload characteristics.

### Resource utilization

Effective resource utilization helps you maximize performance while controlling costs. Consider these strategies for optimizing how your application uses RunPod resources:

1. **Right-size your workers**: Choose the appropriate GPU instance for your workload.
2. **Worker configuration**: Configure active workers, max workers, and GPUs/worker settings to match your workload patterns.
3. **Optimize dependencies**: Include only necessary dependencies in your container.
4. **Use streaming**: For large outputs, stream results instead of returning them all at once.
5. **Health monitoring**: Use the `/health` endpoint to monitor the operational status of your endpoint, including workers available and job statistics.

## Development and testing

### Local testing

RunPod provides tools for testing your handler functions locally before deployment. See [Get started with Serverless](/serverless/get-started) for a step-by-step example.

### Debugging and monitoring

Serverless provides comprehensive tools for monitoring the health and performance of your applications and troubleshooting issues when they arise. These tools give you visibility into the execution environment and help you identify and resolve problems efficiently, ensuring optimal performance and reliability of your Serverless workloads.

1. **Logs**: Access the logs of your workers through the RunPod console.
2. **SSH access**: For deeper debugging, you can SSH into running workers.
3. **Web terminal**: Use the web terminal for interactive debugging.
4. **Metrics and monitoring**: Access GPU, CPU, memory, and other metrics to help understand your computational workloads.
5. **Health endpoint**: Use the `/health` endpoint to monitor the operational status of your endpoints, including workers available and job statistics.
