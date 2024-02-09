---
title: Loggers
---

Logging is essential for insight into your application's performance and health.
It facilitates quick identification and resolution of issues, ensuring smooth operation.

Because of this, RunPod provides a structured logging interface, simplifying application monitoring and debugging.

To setup logs, instantiate the `RunPodLogger()` module.

```python
import runpod

log = runpod.RunPodLogger()
```

Then set the log level.
In the following example, there are two logs levels being set.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")

log = runpod.RunPodLogger()


def handler(job):
    try:
        job_input = job["input"]
        log.info("Processing job input")

        name = job_input.get("name", "World")
        log.info("Processing completed successfully")

        return f"Hello, {name}!"
    except Exception as e:
        # Log the exception with an error level log
        log.error(f"An error occurred: {str(e)}")
        return "An error occurred during processing."


runpod.serverless.start({"handler": handler})
```

## Log levels

RunPod provides a logging interface with types you're already familiar with.

The following provides a list of log levels you can set inside your application.

- `debug`: For in-depth troubleshooting. Use during development to track execution flow.
- `info`: (default) Indicates normal operation. Confirms the application is running as expected.
- `warn`: Alerts to potential issues. Signals unexpected but non-critical events.
- `error`: Highlights failures. Marks inability to perform a function, requiring immediate attention.
