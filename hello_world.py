import runpod
import asyncio

async def async_generator_handler(job):
    results = []
    for i in range(5):
        # Generate an asynchronous output token
        output = f"Generated async token output {i}"
        results.append(output)

        # Simulate an asynchronous task, such as processing time for a large language model
        await asyncio.sleep(1)
    
    # Return the results and indicate the worker should be refreshed
    return {"refresh_worker": True, "job_results": results}

# Configure and start the RunPod serverless function
runpod.serverless.start(
    {
        "handler": async_generator_handler,  # Required: Specify the async handler
        "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
    }
)