---
title: Overview
description: "Tetra is a Python SDK that streamlines the development and deployment of AI workflows on RunPod's Serverless infrastructure."
sidebar_position: 1
---

# Tetra overview

Tetra is a Python SDK that streamlines the development and deployment of AI workflows on RunPod's [Serverless](/serverless/overview) infrastructure. It provides an abstraction layer that lets you define, execute, and monitor sophisticated AI pipelines through a declarative interface, eliminating infrastructure overhead.

You can get started with Tetra in minutes by following this [step-by-step tutorial](/tetra/get-started).

You can also start by cloning the Tetra repository and running the examples inside:

```
git clone https://github.com/runpod/tetra-rp.git
```

## Why use Tetra?

Tetra provides several advantages over vanilla Serverless:

- **Simplified workflow development**: Define AI pipelines in pure Python with minimal configuration, focusing on your logic rather than infrastructure details.
- **Optimized resource utilization**: Specify hardware requirements at the function level for precise control over GPU and CPU allocation.
- **Seamless deployment**: Tetra automatically handles RunPod Serverless infrastructure setup, worker communication, and data transfer.
- **Reduced development overhead**: Skip the tedious process of writing application code, building Docker containers, and managing endpoints for each worker.
- **Intuitive programming model**: Use Python decorators to mark functions for remote execution.

## Key concepts

### Resource configuration

Tetra lets you specificy hardware requirements at the function level through the `ServerlessResource` object. This provides granular control over:

- GPU/CPU allocation.
- Worker scaling limits.
- Template selection.

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
    resource_config=gpu_config, # Uses a ServerlessResource object to set up an endpoint
)
def process_image(image_data):

    # Code you add here will be run remotely using RunPod Serverless

    return results
```

### Transfer data between RunPod and your local machine

Tetra makes it easy to pass data between your local environment and RunPod's infrastructure. The remote function can accept any serializable Python objects as input and return them as output:

```python
async def main():
    # Code you add here will be run locally

    image = ... # Upload an image from your local machine

    print("Processing image...")
    result = await process_image(image) # Process image remotely

if __name__ == "__main__":
    asyncio.run(main())
```

### Dependencies

You can specify required Python dependencies for remote workers at the function level from within the `@remote` decorator, and Tetra ensures they will be installed in your execution environment:

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

Make sure to include `import` statements *inside* any remote functions that require them.

### Asynchronous execution

Tetra workflows run asynchronously, making it easy to manage complex pipelines and run parallel processes:

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
   - Tetra provisions the appropriate endpoint and worker resources on RunPod.
   - Input data is serialized and transferred to the remote worker.
   - The function executes on the remote infrastructure.
   - Results are returned to your local environment.
4. Data flows between functions as defined by your local code.

## Common use cases

- **Multi-modal AI pipelines**: Combine text, image, and audio models in unified workflows.
- **Distributed model training**: Scale model training across multiple GPU workers.
- **AI research experimentation**: Quickly prototype and test complex model combinations.
- **Production inference systems**: Deploy sophisticated, multi-stage inference pipelines.
- **Data processing workflows**: Process large datasets using distributed resources.

## Next steps

Ready to streamline your AI workflow development with Tetra?

- [Build your first Tetra workflow using this step-by-step tutorial.](/tetra/get-started)
- [Clone the tetra-rp repository and test the files in the `/examples` folder.](https://github.com/runpod/tetra-rp)