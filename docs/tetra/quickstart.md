---
title: Quickstart
description: "Learn how to set up your Tetra development environment to seamlessly run AI workloads using RunPod Serverless resources."
sidebar_position: 2
---

# Tetra quickstart

Learn how to set up your Tetra development environment to seamlessly run AI workloads using [RunPod Serverless](/serverless/overview) resources.

Tetra is a Python SDK that simplifies the deployment AI workflows on RunPod by automating infrastructure management and worker communication. It lets you run code using RunPod compute resources without needing to open the RunPod web—just run your code locally and Tetra takes care of the rest.

## What you'll learn

In this tutorial you'll learn how to:

- Set up your development environment for Tetra.
- Configure a [Serverless endpoint](/serverless/endpoints/overview) using a `ServerlessResource` object.
- Create and define remote functions with the `@remote` decorator.
- Deploy a GPU-based Tetra workload using RunPod resources.
- Pass data between your local environment and remote workers.
- Understand how Tetra manages remote execution.

## Requirements

- You've [created a RunPod account](/get-started/manage-accounts).
- You've created a [RunPod API key](/get-started/api-keys).
- You've installed [Python 3.9 - 3.12](https://www.python.org/downloads/) and [Poetry](https://python-poetry.org/) (for dependency management).

:::note

If you have a later version of Python installed (> 3.12), you can use [pyenv](https://github.com/pyenv/pyenv) to switch to an earlier one.

:::

## Step 1: Install Tetra

First, let's clone the Tetra repo and set up your virtual environment:

1. Run this command to clone the Tetra repository:
    ```bash
    git clone https://github.com/runpod/tetra-rp.git && cd tetra-rp
    ```

2. Install dependencies with Poetry:
    ```bash
    poetry install
    ```

3. Activate the virtual environment:
    ```bash
    $(poetry env activate)
    ```

## Step 2: Add your API key to the environment

You'll need to add your [RunPod API key](/get-started/api-keys) to your development environment before you can use Tetra to run your workloads.

Run this command to create a `.env` file, replacing [YOUR_API_KEY] with your RunPod API key:

```bash
touch .env && echo "RUNPOD_API_KEY=[YOUR_API_KEY]" > .env
```

:::note

You can create this in your project's root directory or in the `/examples` folder. Just make sure your `.env` file is in the same folder as the Python file you create in the next step.

:::

## Step 3: Create your project file

Now you're ready to start building your Tetra project. Create a new file called `matrix_operations.py` in the same directory as your `.env` file:

```bash
touch matrix_operations.py
```

Open this file in your preferred code editor. We'll walk through building it out step-by-step, implementing a simple matrix multiplication example that demonstrates Tetra's remote execution and parallel processing capabilities.

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

`load_dotenv()` reads your API key from the `.env` file and makes it available to Tetra.

## Step 5: Add Serverless endpoint configuration

Next, let's define the Serverless endpoint configuration for our Tetra workload:

```python
# Configuration for a Serverless endpoint using GPU workers
gpu_config = ServerlessResource(
    templateId="[YOUR_TEMPLATE_ID]", # Replace with your template ID
    gpuIds="any", # Use any available GPU
    workersMax=1,
    name="tetra_gpu", 
)
```

This `ServerlessResource` object defines:

- `templateId`: The RunPod template ID to use (you'll replace this with your actual template ID).
- `gpuIds="any"`: The GPU IDs that can be used by workers on this endpoint. This configuration allows the endpoint to use any GPUs that are available. You can also replace `any` with a comma-separated list of [GPU IDs](/references/gpu-types).
- `workersMax=1`: Sets the maximum number of worker instances to 1.
- `name="tetra_gpu"`: The name of the endpoint that will be created/used on the RunPod web interface.

If you run a Tetra function that uses an identical `ServerlessResource` configuration to a prior run, RunPod will reuse your existing endpoint rather than creating a new one. However, if any configuration values have changed (not just the `name` parameter), a new endpoint will be created to match your updated requirements.

## Step 6: Define your remote function

Now, let's define the function that will run on the GPU worker:

```python
@remote(
    resource_config=gpu_config,
    dependencies=["numpy", "torch"]
)
def tetra_matrix_operations(size):
    """Perform large matrix operations using NumPy and check GPU availability."""
    import numpy as np
    import torch
    
    # Get GPU count and name
    device_count = torch.cuda.device_count()
    device_name = torch.cuda.get_device_name(0)
    
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
        "device_count": device_count,
        "device_name": device_name
    }
```

Let's break down this function:

- `@remote`: This is the "remote decorator" that marks the function to run on RunPod's infrastructure instead of locally.
  - `resource_config=gpu_config`: The function will run using the GPU configuration we defined earlier.
  - `dependencies=["numpy", "torch"]`: Lists the Python packages that must be installed on the remote worker.

- The `tetra_matrix_operations` function itself:
  - Gets GPU details using PyTorch's CUDA utilities.
  - Creates two large random matrices using NumPy.
  - Performs matrix multiplication.
  - Returns statistics about the result and information about the GPU.

Notice that we import `numpy` and `torch` inside the function, not at the top of the file. This is because these imports need to happen on the remote worker, not in your local environment.

## Step 7: Add the main function

Finally, add this `main` function to execute your GPU workload:

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

This `main` function:

- Calls the remote function with `await`, which runs it asynchronously on RunPod's infrastructure.
- Prints the results of the matrix operations.
- Displays information about the GPU that was used.

The `asyncio.run(main())` line is Python's standard way to execute an asynchronous `main` function from synchronous code. It creates an event loop, runs the `main function until completion, and then closes the loop.

All code outside of the `@remote` decorated function runs on your local machine. The `main` function acts as a bridge between your local environment and RunPod's cloud infrastructure, allowing you to:

- Send input data to remote functions (in this case, the matrix size parameter)
- Wait for remote execution to complete without blocking your local process
- Process the returned results locally once they're available

The `await` keyword is crucial here—it pauses execution of the `main` function until the remote operation completes, but doesn't block the entire Python process. This asynchronous pattern enables efficient resource utilization while maintaining a simple, sequential coding style.

## Step 8: Run your GPU example

Now you're ready to run the example:

```bash
python matrix_operations.py
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

:::tip

If you're having trouble running your code due to authentication issues:
1. Verify your `.env` file is in the same directory as your `matrix_operations.py` file.
2. Check that the API key in your `.env` file is correct and properly formatted.
3. Alternatively, you can set the API key directly in your terminal with:
   ```bash
   export RUNPOD_API_KEY=[YOUR_API_KEY]
   ```
4. For Windows users:
   ```cmd
   set RUNPOD_API_KEY=[YOUR_API_KEY]
   ```

:::

## Step 9: Understand what's happening

When you run this script:

1. Tetra reads your GPU resource configuration and provisions a worker on RunPod.
2. It installs the required dependencies (NumPy and PyTorch) on the worker.
3. Your `tetra_matrix_operations` function runs on the remote worker.
4. The function creates and multiplies large matrices, then calculates statistics.
5. Your local `main` function receives these results and displays them in your terminal.

## Step 10: Run multiple operations in parallel

Now let's see how easy it is to run multiple remote operations in paralell using Tetra.

First, replace your `main` function with this code:

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
    for result in results:
        print(f"\nMatrix size: {result['matrix_size']}x{result['matrix_size']}")
        print(f"Result shape: {result['result_shape']}")
        print(f"Result mean: {result['result_mean']:.4f}")
        print(f"Result standard deviation: {result['result_std']:.4f}")

if __name__ == "__main__":
    asyncio.run(main())
```

This new `main` function demonstrates Tetra's ability to run multiple operations in parallel using `asyncio.gather()`. Instead of running one matrix operation at a time, we're now launching three operations with different matrix sizes (500, 1000, and 2000) simultaneously. This parallel execution significantly improves efficiency when you have multiple independent tasks that can run concurrently, making better use of available GPU resources.

Try running the example again:

```bash
python matrix_operations.py
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

## Next steps

Nicely done, you've successfuly used Tetra to seamlessly run a GPU workload using RunPod resources!

Now that you've learned the basics of Tetra, you can:

- Create a workflow that chains functions together, passing data between them.
- Explore more advanced PyTorch operations on the GPU.
- Try different resource configurations to optimize performance.
