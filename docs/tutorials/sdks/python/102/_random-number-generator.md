---
title: "Random Number Generator with RunPod"
description: "Create a more complex Serverless application that generates random numbers"
sidebar_position: 6
---

Understanding how to create simple serverless applications can unlock many possibilities in modern software development. In this tutorial, we will build a random number generator using the RunPod Python SDK. This project will introduce you to input validation, error handling, and generating efficient output, reinforcing essential concepts for more advanced AI tasks.

When you're finished, you'll know how to set up a basic serverless application with RunPod that generates random numbers within a specified range. You will also understand the importance of input validation and basic error handling.

## Import required libraries

To get started, we need to import the necessary libraries that will help us build our random number generator. Run the following code to import these libraries:

```python
import runpod
import random
```

## Define the Handler Function

The handler function is the core of our serverless application. It processes input, performs actions, and returns output. In this case, it will generate a random number within a specified range.

```python
def random_number_handler(job):
    job_input = job["input"]

    # Extract the minimum and maximum values from the input
    min_value = job_input.get("min", 1)
    max_value = job_input.get("max", 100)

    # Validate input
    if not isinstance(min_value, int) or not isinstance(max_value, int):
        return {"error": "Both min and max must be integers."}

    if min_value >= max_value:
        return {"error": "min must be less than max."}

    # Generate the random number
    random_num = random.randint(min_value, max_value)

    return {"random_number": random_num}
```

Explanation:

- `job["input"]`: Retrieves the input data from the job.
- `get("min", 1)` and `get("max", 100)`: Extract minimum and maximum values from the input; set default values if not present.
- Input validation ensures `min_value` and `max_value` are integers and `min_value` is less than `max_value`.
- `random.randint(min_value, max_value)`: Generates a random number within the specified range and returns it.

You have now created the handler function that will process input and generate the random number. Let's move on to starting the serverless worker.

## Start the Serverless Worker

To start the serverless worker, which will run the handler function, use the `runpod.serverless.start` method:

```python
runpod.serverless.start({"handler": random_number_handler})
```


Now your serverless worker is ready to process jobs and generate random numbers. 

## Complete code example

Here is the complete code for the Random Number Generator:

```python
import runpod
import random

def random_number_handler(job):
    job_input = job["input"]

    min_value = job_input.get("min", 1)
    max_value = job_input.get("max", 100)

    if not isinstance(min_value, int) or not isinstance(max_value, int):
        return {"error": "Both min and max must be integers."}

    if min_value >= max_value:
        return {"error": "min must be less than max."}

    random_num = random.randint(min_value, max_value)

    return {"random_number": random_num}

runpod.serverless.start({"handler": random_number_handler})
```

To test your code locally, create a file named `test_input.json` with the following content:

```json
{
  "input": {
    "min": 1,
    "max": 10
  }
}
```

Run the following command to test the script:

```command
python random_number_generator.py --rp_server_api
```

You should see output similar to this:

```
[secondary_label Output]
--- Starting Serverless Worker |  Version 1.6.2 ---
INFO   | Using test_input.json as job input.
DEBUG  | Retrieved local job: {'input': {'min': 1, 'max': 10}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: {'random_number': 7}
DEBUG  | local_test | run_job return: {'output': {'random_number': 7}}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': {'random_number': 7}}
INFO   | Local testing complete, exiting.
```

The random number will vary each time you run the script.

## Error Handling

Our handler includes basic error handling to manage incorrect input:

1. If the input types are incorrect (not integers), it returns an error message.
2. If the minimum value is greater than or equal to the maximum value, it returns an error message.

These error messages will be part of the job output, allowing the client to address these issues appropriately.

## Conclusion

In this tutorial, you learned how to create a random number generator as a serverless application using the RunPod Python SDK. This included input validation and error handling to ensure robust performance. With this foundation, you can build more complex serverless applications and integrate AI tasks into your projects.

Excellent work on completing your random number generator! Up next, you'll explore how to integrate pre-trained AI models into your RunPod functions, taking your skills to the next level.
