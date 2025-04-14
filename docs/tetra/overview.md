---
title: Overview
description: ""
sidebar_position: 1
---

# Tetra overview

Tetra is a Python SDK that streamlines the development and deployment of multi-model AI workflows on RunPod's [Serverless](/serverless/overview) infrastructure. It provides an abstraction layer that enables you to define, execute, and monitor sophisticated AI pipelines through a declarative interface, eliminating infrastructure overhead.

## Why use Tetra?

* **Simplified workflow development**: Define AI pipelines in pure Python with minimal configuration, focusing on your logic rather than infrastructure details.
* **Optimized resource utilization**: Specify hardware requirements at the function level for precise control over GPU and CPU allocation.
* **Seamless deployment**: Automatically handle the RunPod Serverless infrastructure setup, worker communication, and data transfer.
* **Reduced development overhead**: Skip the tedious process of writing application code, building Docker containers, and managing endpoints for each worker.
* **Intuitive programming model**: Use familiar Python decorators to mark functions for remote execution.

## Key concepts

### Resource configurations

Tetra allows explicit specification of hardware requirements at the function level through the `ServerlessResource` object. This provides granular control over:

* GPU/CPU allocation
* Worker scaling limits
* Template selection
* Memory requirements

CPU example:

```python
from tetra import ServerlessResource

# Configure a GPU endpoint
gpu_config = ServerlessResource(
    templateId="abc123",  # GPU template ID
    gpuIds="any",
    workersMax=5, # Scale up to 5 workers
    name="parallel-processor" # Name of the endpoint that will be created or used
)

cpu_resource = ServerlessResource(
    templateId="def456",  # CPU template ID
    workersMax=1 
    name="data-processor", # Name of the endpoint that will be created or used
)
```

### Remote functions

Remote functions are the building blocks of Tetra workflows. Simply mark any Python function with the `@remote` decorator to designate it for execution on RunPod's infrastructure:

```python
from tetra import remote

@remote(
    resource_config=gpu_config, # Uses the GPU config defined in the previous section
)
def process_image(image_data):

    # Code you add here will be run remotely using RunPod infrastructure

    return results
```

### Passing data between RunPod and your local machine

Tetra makes it easy to pass data between your local environment and RunPod's infrastructure. The remote function can accept any serializable Python objects as input and return them as output:

```python
async def main():
    # Code you add here will be run locally, allowing you to pass data between RunPod and your local machine.

    print("Processing image...")
    result = await process_image(image) # This function will run remotely, using an image passed in from your local machine

if __name__ == "__main__":
    asyncio.run(main())
```

### Dependencies

Specify required Python libraries directly in the `@remote` decorator, and Tetra ensures they're available in your execution environment:

```python
@remote(
    resource_config=gpu_resource,
    dependencies=["torch", "transformers", "pillow"]
)
def model_inference(data):
    # Libraries are automatically installed
    from transformers import AutoModel
    import torch
    from PIL import Image
    # ...
```

### Asynchronous execution

Tetra workflows run asynchronously, making it easy to manage complex pipelines:

```python
@remote(...)
def preprocess_data(raw_data):
    ...

@remote(...)
def model_inference(preprocessed):
    ...

@remote(...)
def process_chunk(data):
    ...

async def main():
    # Run remote functions in sequence
    preprocessed = await preprocess_data(raw_data)
    result = await model_inference(preprocessed)
    
    # Or run them in parallel
    results = await asyncio.gather(
        process_chunk(data1),
        process_chunk(data2),
        process_chunk(data3)
    )
```

## How Tetra works

When you execute a Tetra workflow:

1. The `@remote` decorator identifies functions designated for remote execution.
2. Tetra analyzes the dependencies between functions to determine execution order.
3. For each remote function:
   - Tetra provisions the appropriate resources on RunPod.
   - Input data is serialized and transferred to the remote worker.
   - The function executes on the remote infrastructure.
   - Results are returned to your local environment.
4. Data flows between functions according to your workflow definition.

<img src="https://www.runpod.io/blog-content/tetra-workflow.png" width="800" alt="A diagram showing the Tetra workflow execution process"/>

## Common use cases

* **Multi-modal AI pipelines**: Combine text, image, and audio models in unified workflows.
* **Distributed model training**: Scale model training across multiple GPU workers.
* **AI research experimentation**: Quickly prototype and test complex model combinations.
* **Production inference systems**: Deploy sophisticated, multi-stage inference pipelines.
* **Data processing workflows**: Process large datasets using distributed resources.

## Tetra vs. traditional RunPod Serverless

| Aspect | Traditional Serverless | Tetra |
|--------|------------------------|-------|
| Development Process | Write handler, build Docker, create endpoint | Write Python functions with decorators |
| Infrastructure Management | Manual endpoint configuration | Automatic resource provisioning |
| Worker Communication | Manage manually | Automatic data transfer between functions |
| Development Overhead | High (Docker, endpoints per worker) | Low (pure Python development) |
| Deployment Speed | Multiple manual steps | Automatic deployment from code |
| Resource Control | Endpoint-level | Function-level granularity |

## Get started with Tetra

Getting started with Tetra is straightforward:

1. Install Tetra and set up your environment:
   ```bash
   pip install tetra
   ```

2. Create your first remote function:
   ```python
   from tetra import remote, ServerlessResource
   
   resource = ServerlessResource(
       templateId="your_template_id",
       name="my-first-worker"
   )
   
   @remote(resource_config=resource)
   def hello_tetra(name):
       return f"Hello, {name} from Tetra!"
   
   async def main():
       result = await hello_tetra("World")
       print(result)
   
   if __name__ == "__main__":
       import asyncio
       asyncio.run(main())
   ```

3. Run your code and watch Tetra handle the infrastructure automatically.

## Next steps

Ready to streamline your AI workflow development with Tetra?

- [Follow the quickstart guide to deploy your first workflow.](/tetra/quickstart)
- [Learn about advanced Tetra configurations and resource optimization.](/tetra/advanced-config)
- [Explore example workflows for common AI use cases.](/tetra/examples)
- [Read the complete API reference.](/docs/tetra/api-reference)
- [Join the Tetra community and get support.](/docs/tetra/community)
