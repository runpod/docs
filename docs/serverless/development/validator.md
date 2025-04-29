---
title: "Input validation"
description: "Use RunPod's input validation utility for serverless workers."
sidebar_position: 4
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

RunPod's validator utility ensures robust execution of serverless workers by validating input data against a defined schema.

To use it, import the following to your Python file:

```python
from runpod.serverless.utils.rp_validator import validate
```

The `validate` function takes two arguments:

- the input data
- the schema to validate against

## Schema Definition

Define your schema as a nested dictionary with these possible rules for each input:

- `required` (default: `False`): Marks the type as required.
- `default` (default: `None`): Default value if input is not provided.
- `type` (required): Expected input type.
- `constraints` (optional): for example, a lambda function returning `true` or `false`.

## Example Usage

```python
import runpod
from runpod.serverless.utils.rp_validator import validate

schema = {
    "text": {
        "type": str,
        "required": True,
    },
    "max_length": {
        "type": int,
        "required": False,
        "default": 100,
        "constraints": lambda x: x > 0,
    },
}


def handler(event):
    try:
        validated_input = validate(event["input"], schema)
        if "errors" in validated_input:
            return {"error": validated_input["errors"]}

        text = validated_input["validated_input"]["text"]
        max_length = validated_input["validated_input"]["max_length"]

        result = text[:max_length]
        return {"output": result}
    except Exception as e:
        return {"error": str(e)}


runpod.serverless.start({"handler": handler})
```

## Testing

Save as `your_handler.py` and test using:

<Tabs>
  <TabItem value="command" label="Command" default>

```bash
python your_handler.py
```

Or with inline input:

```bash
python your_handler.py --test_input '{"input": {"text": "Hello, world!", "max_length": 5}}'
```

</TabItem>
  <TabItem value="json" label="JSON">

Create `test_input.json`:

```json
{
  "input": {
    "text": "The quick brown fox jumps over the lazy dog",
    "max_length": 50
  }
}
```

</TabItem>
</Tabs>

This approach allows early detection of input errors, preventing issues from unexpected or malformed inputs.
