
```json
{"code":400,"message":"Invalid route","object":"error","param":null,"type":"BadRequestError"}
```

Check that your base url is correct.

For example:

```bash
https://api.runpod.ai/v2/${YOUR_ENDPOINT_ID}/openai/v1/chat/completions
```



```output
{
  "delayTime": 673,
  "executionTime": 263,
  "id": "sync-fec10561-45f9-4a05-8765-3f1e213a64b6-u1",
  "output": [
    {
      "code": 400,
      "message": "Invalid route",
      "object": "error",
      "param": null,
      "type": "BadRequestError"
    }
  ],
  "status": "COMPLETED"
}
```

