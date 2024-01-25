import requests
from dotenv import load_dotenv
import os
from datetime import datetime

load_dotenv()


api_key = os.getenv("API_KEY")
# URL and headers for the POST request
url = "https://api.runpod.io/graphql"
headers = {"content-type": "application/json", "api_key": api_key}

# The GraphQL query
data = {"query": "query GpuTypes { gpuTypes { id displayName memoryInGb } }"}

# Send the POST request
response = requests.post(url, headers=headers, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Parse the response JSON
    gpu_data = response.json()

    # Extract GPU data
    gpus = gpu_data["data"]["gpuTypes"]

    # Sort the GPUs by display name
    gpus_sorted = sorted(gpus, key=lambda x: x["displayName"])

    # Writing to a markdown file
    # relative path
    # os.path.join(os.path.dirname(__file__), "gpu-types.md")
    file_path = os.path.join(
        os.path.dirname(__file__), "../docs/references/gpu-types.md"
    )

    with open(file_path, "w") as file:
        # Write the table headers
        date = datetime.now().strftime("%Y-%m-%d")
        file.write(
            f"""---
title: GPU types
---

The following list contains all GPU types available on RunPod.

For more information, see [GPU pricing](https://www.runpod.io/gpu-instance/pricing).
<!--
Table last generated: {date}
-->
| GPU ID | Display Name | Memory (GB) |
| ------ | ------------ | ----------- |
                   """
        )

        # Write each GPU data as a row in the table
        for gpu in gpus_sorted:
            if gpu["id"] == "unknown":
                pass
            else:
                file.write(
                    f"| {gpu['id']} | {gpu['displayName']} | {gpu['memoryInGb']} |\n"
                )

    print("Markdown file with GPU data created successfully.")
else:
    print("Failed to retrieve data: ", response.status_code)
