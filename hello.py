import runpod
import asyncio


async def async_generator_handler(job):
    for i in range(5):
        # Generate an asynchronous output token
        output = f"Generated async token output {i}"
        yield {"job_results": output}

        # Simulate an asynchronous task, such as processing time for a large language model
        await asyncio.sleep(1)


runpod.serverless.start(
    {
        "handler": async_generator_handler,  # Required: Specify the async handler
        "return_aggregate_stream": True,  # Optional: Aggregate results are accessible via /run endpoint
        "refresh_worker": True,  # Worker refreshes after every job
    }
)


# refresh happens after every job
# stops the pod until a new request is called
# you don't get per job stream at the moment
