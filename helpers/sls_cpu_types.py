import os
from datetime import datetime
import requests
from dotenv import load_dotenv
import pandas as pd
from tabulate import tabulate
import io

load_dotenv()

api_key = os.getenv("API_KEY")

# URL and headers for the POST request
url = "https://api.runpod.io/graphql"
headers = {"content-type": "application/json", "api_key": api_key}

# The GraphQL query
data = {"query": "query CpuTypes { cpuTypes { displayName cores threadsPerCore } }"}

# Send the POST request
response = requests.post(url, headers=headers, json=data)

# Check if the request was successful
if response.status_code == 200:
    # Parse the response JSON
    cpu_data = response.json()

    # Extract CPU data
    cpus = cpu_data["data"]["cpuTypes"]

    # Convert to DataFrame
    new_df = pd.DataFrame(cpus)

    # Writing to a markdown file
    file_path = os.path.join(
        os.path.dirname(__file__), "../docs/references/cpu-types.md"
    )

    # Check if the file already exists
    if os.path.exists(file_path):
        with open(file_path, "r") as file:
            lines = file.readlines()

        # Find where the table ends
        table_end_index = 0
        for i, line in enumerate(lines):
            if line.strip() == "" and i > 0:
                table_end_index = i
                break

        # Extract the current table
        current_table = "".join(lines[:table_end_index])

        # Convert the current table to a DataFrame
        current_df = pd.read_csv(io.StringIO(current_table), sep="|").iloc[:, 1:-1]

        # Append the new data to the current table
        updated_df = pd.concat([current_df, new_df], ignore_index=True)

    else:
        # If the file does not exist, start a new DataFrame
        updated_df = new_df

    # Sort the DataFrame alphabetically by displayName
    updated_df = updated_df.sort_values(by="displayName").reset_index(drop=True)

    # Convert the updated DataFrame to markdown table format
    updated_table = tabulate(
        updated_df, headers="keys", tablefmt="pipe", showindex=False
    )

    with open(file_path, "w") as file:
        # Write the headers and table
        date = datetime.now().strftime("%Y-%m-%d")
        file.write(
            f"""---
title: Serverless CPU types
---

The following list contains all CPU types available on RunPod.

<!--
Table last generated: {date}
-->
{updated_table}
"""
        )

    print("Markdown file with CPU data updated successfully.")
else:
    print("Failed to retrieve data: ", response.status_code)
