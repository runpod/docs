---
title: Troubleshooting guide
description: "Comprehensive guide to troubleshooting common issues with RunPod Serverless. Find solutions for deployment problems, runtime errors, performance issues, and more."
---

# Troubleshooting guide

This guide helps you diagnose and resolve common issues with RunPod Serverless.

## Deployment issues

### Endpoint failed to deploy

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| "Failed to pull image" | Image doesn't exist or private | Verify image name, check registry permissions |
| "GPU not available" | GPU type unavailable/quota limit | Try different GPU type or contact support |
| "Container exited with code 1" | Container startup error | Check container logs for errors |
| "Network error" | Network configuration issue | Check network settings, VPC configurations |

#### Checking container logs:

1. Go to your endpoint in the RunPod console
2. Click on the "Logs" tab
3. Look for error messages during container startup

### Container startup issues

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| "ImportError: No module named X" | Missing dependency | Add dependency to Dockerfile |
| "CUDA error: out of memory" | Model too large for GPU | Use larger GPU or optimize model |
| "Permission denied" | File permissions issue | Fix permissions in Dockerfile or in handler |

#### Example: Adding dependencies

```dockerfile
# Add missing dependencies
RUN pip install --no-cache-dir missing-package
```

## Runtime errors

### Request failures

| Error code | Description | Possible solution |
|------------|-------------|-------------------|
| 400 | Bad request format | Check input JSON format |
| 401 | Unauthorized | Verify API key is correct and active |
| 404 | Endpoint not found | Verify endpoint ID is correct |
| 429 | Rate limit exceeded | Reduce request rate or increase quota |
| 500 | Server error | Check endpoint logs for errors |
| 503 | Service unavailable | Endpoint may be overloaded or down |

### Common handler errors

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| "KeyError" | Missing required input field | Check input validation in handler |
| "CUDA out of memory" | Input too large or memory leak | Optimize memory usage, batch processing |
| "Timeout error" | Processing took too long | Optimize handler, increase timeout, disable flash boot |

#### Example: Input validation

```python
def handler(event):
    job_input = event.get("input", {})
    
    # Validate required fields
    if "text" not in job_input:
        return {"error": "Missing required field 'text'"}
    
    # Process valid input
    # ...
```

## Performance issues

### Slow cold start

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| First request takes >30s | Large container/model | Use smaller model, optimize container, enable flash boot |
| Inconsistent cold starts | Resource contention | Increase min workers to avoid cold starts |

#### Optimizing cold starts:

1. Minimize container size
2. Load models on demand rather than at startup
3. Use quantized models
4. Enable flash boot option
5. Increase min workers to 1+ to keep container warm

### High latency

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| All requests slow | Inefficient handler code | Profile and optimize handler |
| Intermittent slowdowns | Worker overload | Check metrics, adjust container concurrency |
| Queue delays | Not enough workers | Increase max workers, adjust scaling |

## Scaling issues

### Not scaling up

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| Requests queuing | Max workers too low | Increase max workers |
| Workers not spawning | Resource quota reached | Request quota increase |
| Slow scaling | GPU availability | Try different GPU types |

### Excessive scaling

| Symptom | Possible cause | Solution |
|---------|---------------|----------|
| Too many idle workers | Min workers too high | Reduce min workers |
| High costs | Idle timeout too long | Reduce idle timeout |
| Workers scaling but idle | Handler not processing queue | Check handler implementation |

## Logs and monitoring

### Accessing logs

1. Go to your endpoint in the RunPod console
2. Click on the "Logs" tab
3. Select a worker ID to view specific worker logs
4. Use the search function to filter logs

### Setting log level

Set the `RUNPOD_LOG_LEVEL` environment variable to one of:
- `DEBUG` - Verbose debugging information
- `INFO` - Standard operational information (default)
- `WARNING` - Only warnings and errors
- `ERROR` - Only errors

```dockerfile
ENV RUNPOD_LOG_LEVEL=DEBUG
```

## Debugging strategies

### Local testing

Test your handler locally before deployment:

```bash
python handler.py
```

This runs the handler with your `test_input.json` file.

### SSH into worker

For complex issues, you can SSH into a running worker:

1. Go to your endpoint in the RunPod console
2. Click "SSH" next to an active worker
3. Use the web terminal to investigate issues

Common debug commands:
```bash
# Check container logs
cat /var/log/runpod/worker.log

# Check system resources
nvidia-smi
free -h
df -h

# Check running processes
ps aux
```

### Testing API requests

Use curl to test your endpoint directly:

```bash
curl -X POST https://api.runpod.ai/v2/YOUR_ENDPOINT_ID/run \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "input": {
      "test": "value"
    }
  }'
```

## Common fixes

### Memory issues

1. **Use streaming responses** for large outputs
2. **Process data in batches** instead of all at once
3. **Clean up unused variables** to free memory
4. **Use lower precision** (fp16 or int8) for models
5. **Add swap space** in your Dockerfile:

```dockerfile
# Add swap space for extra memory
RUN fallocate -l 4G /swapfile && \
    chmod 600 /swapfile && \
    mkswap /swapfile && \
    swapon /swapfile
```

### Network issues

1. **Increase request timeout** for long-running operations
2. **Add retry logic** in your client applications
3. **Check firewall settings** if making external API calls
4. **Use VPC** for secure internal communication

## Getting help

If you've tried the solutions above and still have issues:

1. **Check documentation** for updates and known issues
2. **Join the RunPod Discord** for community support
3. **Open a support ticket** with detailed information:
   - Endpoint ID
   - Container logs
   - Steps to reproduce the issue
   - Error messages
   - Screenshots if applicable 