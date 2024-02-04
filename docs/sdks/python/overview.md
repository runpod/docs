---
title: Overview
sidebar_position: 1
---

## Project structure

RunPod Serverless is a monorepo that contains multiple services.

```text
.
├── Dockerfile               # Docker configuration
├── LICENSE                  # License information
├── README.md                # Project documentation
├── builder
│   ├── requirements.txt     # Dependencies
│   └── setup.sh             # Setup script
└── src
    └── __init__.py          # API key reference
    └── handler.py           # Main handler code
```

## Add your API key

In most cases, you'll add your `api_key` variable to the `__init__.py` file.

```python
api_key = "YOUR_API_KEY"
```

This file will be read upon every execution of your code.

Alternatively, you can set your API key in your environment variables.
Use an environment variable and load it into your code.

```python
import runpod
import os

runpod.api_key = os.getenv("RUNPOD_API_KEY")
```
