---
title: "Async Handler"
slug: "handler-async"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Oct 30 2023 17:23:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Oct 30 2023 17:35:38 GMT+0000 (Coordinated Universal Time)"
---

```python
import runpod

async def async_generator_handler(job):
    for i in range(5):
        output = f"Generated async token output {i}"
        yield output
        await asyncio.sleep(1)  # Simulate an asynchronous task (e.g., LLM processing time).
        
runpod.serverless.start({
  "handler": async_generator_handler, # Required
  "return_aggregate_stream": True # Optional, results available via /run
})
```
