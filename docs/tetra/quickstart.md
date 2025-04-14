---
title: Quickstart
description: ""
sidebar_position: 2
---

# Tetra quickstart

Learn how to set up your Tetra development environment to seamlessly run AI workloads using [RunPod Serverless](/serverless/overview) resources.

Tetra is a Python SDK that simplifies the deployment AI workflows on RunPod by automating infrastructure management and worker communication. It lets you run code using RunPod compute resources without needing to open the RunPod web—just run your code locally and Tetra takes care of the rest.

## What you'll learn

In this tutorial you'll learn how to:

- Set up your development environment for Tetra.
- Create and define remote functions with the `@remote` decorator.
- Deploy a GPU-based Tetra workload using RunPod resources.
- Pass data between your local environment and remote workers.
- Understand how Tetra manages remote execution.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've created a [RunPod API key](/get-started/api-keys).
- You've installed [Python 3.9 - 3.12](https://www.python.org/downloads/) and [Poetry](https://python-poetry.org/) (for dependency management).

:::note

If you have a later version of Python installed, you can use [penv](https://github.com/pyenv/pyenv) to switch to an earlier one.

:::

## Step 1: Install Tetra

First, let's install Tetra and set up your virtual environment:

1. Run this command to clone the Tetra repository:
    ```bash
    git clone git clone https://github.com/runpod/tetra-rp.git && cd tetra-rp
    ```

2. Install dependencies with poetry:
    ```bash
    poetry install
    ```

3. Activate the virtual environment:
    ```bash
    $(poetry env activate)
    ```

## Step 2: Add your API key to the environment

You'll need to add your [RunPod API key](/get-started/api-keys) to your development environment before you can use Tetra to run your workloads.

Run this command to create a `.env` file in your project root, replacing [YOUR_API_KEY] with your API key:

```bash
touch .env && echo "RUNPOD_API_KEY=[YOUR_API_KEY]" > .env
```

## Step 3: Create your project file

Now you can start building your Tetra project. Create a new file called `matrix_gpu_example.py` in the same folder as the `.env` file you just created, and open it in your code editor. You'll build this file step-by-step.

## Step 4: Add imports and load .env file

First, add the necessary import statements:

```python
import asyncio
from dotenv import load_dotenv
from tetra import remote, ServerlessResource

# Load environment variables from .env file
load_dotenv()
```

This imports:

- `asyncio`: Python's asynchronous programming library, which Tetra uses for non-blocking execution.
- `dotenv`: Helps load environment variables from your `.env` file, including your RunPod API key.
- `remote` and `ServerlessResource`: The core Tetra components you'll use to define remote functions and their resource requirements.

The `load_dotenv()` call reads your API key from the `.env` file and makes it available to Tetra.

## Step 5: Add Serverless endpoint configuration

Next, let's define the Serverless endpoint configuration for our Tetra workload:

```python
# Configuration for a Serverless endpoint using GPU workers
gpu_config = ServerlessResource(
    templateId="[YOUR_TEMPLATE_ID]",  # Replace with your template ID
    gpuIds="any",  # Use any available GPU
    workersMax=1,
    name="tetra_gpu", 
)
```

This `ServerlessResource` object defines:

- `templateId`: The RunPod template ID to use (you'll replace this with your actual template ID).
- `gpuIds="any"`: The GPU IDs that can be used by workers on this endpoint. This configuration allows the endpoint to use any GPUs that are available. You can also replace `any` with a comma-separated list of [GPU IDs](/references/gpu-types).
- `workersMax=1`: Sets the maximum number of worker instances to 1.
- `name="tetra_gpu"`: The name of the endpoint that will be created and used on the RunPod web interface. If an endpoint of this name already exists, Tetra will reuse it instead of creating a new one.

## Step 6: Define your remote function

Now, let's define the function that will run on the GPU worker:

```python
@remote(
    resource_config=gpu_config,
    dependencies=["numpy", "torch"]
)
def tetra_matrix_operations(size=1000):
    """Perform large matrix operations using NumPy and check GPU availability."""
    import numpy as np
    import torch
    
    # Check if GPU is available
    gpu_available = torch.cuda.is_available()
    device_count = torch.cuda.device_count() if gpu_available else 0
    device_name = torch.cuda.get_device_name(0) if gpu_available else "N/A"
    
    # Create large random matrices
    A = np.random.rand(size, size)
    B = np.random.rand(size, size)

    # Perform matrix multiplication
    C = np.dot(A, B)
    
    return {
        "matrix_size": size,
        "result_shape": C.shape,
        "result_mean": float(np.mean(C)),
        "result_std": float(np.std(C)),
        "gpu_available": gpu_available,
        "device_count": device_count,
        "device_name": device_name
    }
```

Let's break down this function:

- `@remote`: This is the "remote decorator" that marks the function to run on RunPod's infrastructure instead of locally.
  - `resource_config=gpu_config`: The function will run using the GPU configuration we defined earlier.
  - `dependencies=["numpy", "torch"]`: Lists the Python packages that must be installed on the remote worker.

- The `tetra_matrix_operations` function itself:
  - Checks if a GPU is available using PyTorch's CUDA utilities.
  - Creates two large random matrices using NumPy.
  - Performs matrix multiplication.
  - Returns statistics about the result and information about the GPU.

Notice that we import `numpy` and `torch` inside the function, not at the top of the file. This is because these imports need to happen on the remote worker, not in your local environment.

## Step 7: Add the main function

Finally, add the main function to execute your GPU workload:

```python
async def main():
    # Run the GPU matrix operations
    print("Starting large matrix operations on GPU...")
    result = await tetra_matrix_operations(1000)
    
    # Print the results
    print("\nMatrix operations results:")
    print(f"Matrix size: {result['matrix_size']}x{result['matrix_size']}")
    print(f"Result shape: {result['result_shape']}")
    print(f"Result mean: {result['result_mean']:.4f}")
    print(f"Result standard deviation: {result['result_std']:.4f}")
    
    # Print GPU information
    print("\nGPU Information:")
    if result['gpu_available']:
        print(f"GPU device count: {result['device_count']}")
        print(f"GPU device name: {result['device_name']}")

if __name__ == "__main__":
    asyncio.run(main())
```

This main function:
- Calls the remote function with `await`, which runs it asynchronously.
- Prints the results of the matrix operations.
- Displays information about the GPU that was used.

The `asyncio.run(main())` line runs the asynchronous main function.

All code outside of the `@remote` decorated function runs on your local machine. This main function serves as the interface between your local environment and RunPod's infrastructure, allowing you to send input data to remote functions and process their returned results. The `await` keyword handles the asynchronous communication, making the remote execution feel seamless.

## Step 8: Run your GPU example

Now you're ready to run the example:

```bash
python matrix_gpu_example.py
```

You should see output similar to this:

```
Starting large matrix operations on GPU...
Resource ServerlessResource_33e1fa59c64b611c66c5a778e120c522 already exists, reusing.
Registering RunPod endpoint: server_ServerlessResource_33e1fa59c64b611c66c5a778e120c522 at https://api.runpod.ai/xvf32dan8rcilp
Initialized RunPod stub for endpoint: https://api.runpod.ai/xvf32dan8rcilp (ID: xvf32dan8rcilp)
Executing function on RunPod endpoint ID: xvf32dan8rcilp
Initial job status: IN_QUEUE
Job completed, output received

Matrix operations results:
Matrix size: 1000x1000
Result shape: (1000, 1000)
Result mean: 249.8286
Result standard deviation: 6.8704

GPU Information:
GPU device count: 1
GPU device name: NVIDIA GeForce RTX 4090
```

## Step 9: Understand what's happening

When you run this script:

1. Tetra reads your GPU resource configuration and provisions a worker on RunPod.
2. It installs the required dependencies (NumPy and PyTorch) on the worker.
3. Your `tetra_matrix_operations` function runs on the remote worker.
4. The function creates and multiplies large matrices, then calculates statistics.
5. It also checks for GPU availability using PyTorch.
6. The results are returned to your local environment.
7. Your main function displays those results.

## Step 10: Run multiple operations in parallel

Now you'll see how easy it is to run multiple remote operations in paralell. First, replace your `main` function with this code:

```python
async def main():
    # Run multiple matrix operations in parallel
    print("Starting large matrix operations on GPU...")
    
    # Run all matrix operations in parallel
    results = await asyncio.gather(
        tetra_matrix_operations(500),
        tetra_matrix_operations(1000),
        tetra_matrix_operations(2000)
    )

    print("\nMatrix operations results:")
    # Print the results for each matrix size
    for r in results:
        print(f"\nMatrix size: {result['matrix_size']}x{result['matrix_size']}")
        print(f"Result shape: {result['result_shape']}")
        print(f"Result mean: {result['result_mean']:.4f}")
        print(f"Result standard deviation: {result['result_std']:.4f}")
    
    # Print GPU information (using the first result since it's the same for all)
    print("\nGPU Information:")
    if results[0]['gpu_available']:
        print(f"GPU device count: {results[0]['device_count']}")
        print(f"GPU device name: {results[0]['device_name']}")

if __name__ == "__main__":
    asyncio.run(main())
```

Now you're ready to run the example again:

```bash
python matrix_gpu_example.py
```

You should now see results for all three matrix sizes after the operations have completed:

```bash
Initial job status: IN_QUEUE
Initial job status: IN_QUEUE
Initial job status: IN_QUEUE
Job completed, output received
Job completed, output received
Job completed, output received

Matrix size: 500x500
Result shape: (500, 500)
Result mean: 125.3097
Result standard deviation: 5.0425

Matrix size: 1000x1000
Result shape: (1000, 1000)
Result mean: 249.9442
Result standard deviation: 7.1072

Matrix size: 2000x2000
Result shape: (2000, 2000)
Result mean: 500.1321
Result standard deviation: 9.8879
```

That's all it takes to run multiple operations in parallel!

## Next steps

Nicely done, you've successfuly used Tetra to seamlessly run a GPU workload using RunPod resources!

Now that you've learned the basics of Tetra, you can:

- Create a workflow that chains functions together, passing data between them.
- Explore more advanced PyTorch operations on the GPU.
- Try different resource configurations to optimize performance.
