---
title: Structured logging
description: "Monitor and debug your applications with RunPod's structured logging interface. Track performance, identify issues, and gain insights into your running serverless functions."
---

# Loggers

RunPod's structured logging interface helps you monitor and debug your applications. This guide shows you how to set up and use the RunPod logger to track performance metrics, identify issues, and ensure smooth operation of your deployments.

## Quick start

### Initialize the logger

```python
from runpod.serverless.logging import RunPodLogger

# Initialize the logger
logger = RunPodLogger()
```

### Using the logger in a handler function

```python
from runpod.serverless.logging import RunPodLogger

logger = RunPodLogger()

def handler(event):
    logger.info("Processing request")
    
    try:
        # Your logic here
        input_data = event["input"]
        logger.debug(f"Received input: {input_data}")
        
        # Process data
        result = process_data(input_data)
        
        logger.info("Request processed successfully")
        return result
    except Exception as e:
        logger.error(f"Error processing request: {str(e)}")
        return {"error": str(e)}
```

## Log levels

RunPod logger supports different log levels for various situations:

- **Debug**: Detailed information useful for debugging
  ```python
  logger.debug("Loading model with parameters", extra={"model_size": "7B", "quantization": "4bit"})
  ```

- **Info**: General information about the application's operation
  ```python
  logger.info("Request processing started")
  ```

- **Warning**: Potential issues that aren't errors but might need attention
  ```python
  logger.warn("Memory usage above 80%", extra={"memory_used": "12.8GB", "memory_total": "16GB"})
  ```

- **Error**: Errors that allow the application to continue running
  ```python
  logger.error("Failed to process input", extra={"error_type": "ValueError", "input_id": "123"})
  ```

## Best practices

For effective logging:

1. **Use appropriate log levels**: Reserve debug for development information, info for normal operations, warnings for potential issues, and errors for actual problems.

2. **Include context**: Add relevant data using the `extra` parameter to make logs more useful.
   ```python
   logger.info("Generated image", extra={"dimensions": "1024x1024", "generation_time": "2.3s"})
   ```

3. **Log beginning and end of key operations**: This helps track execution flow and identify where issues occur.
   ```python
   logger.info("Starting model inference")
   # ... inference code ...
   logger.info("Model inference completed", extra={"inference_time": elapsed_time})
   ```

4. **Include error details**: When catching exceptions, include specific error information.
   ```python
   try:
       # Operation that might fail
   except Exception as e:
       logger.error(f"Operation failed: {str(e)}", extra={"error_type": type(e).__name__})
   ```

> **Note**: The default log level is `info`. You can adjust this based on your debugging needs and production requirements.
