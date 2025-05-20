
import os
from datetime import datetime

import pandas as pd
import requests
from tabulate import tabulate

response = requests.post(
    "https://api.runpod.io/graphql", 
    headers={
        "content-type": "application/json"
    }, 
    json={
        "query": "query CpuTypes { cpuTypes { displayName cores threadsPerCore } }"
    })

response.raise_for_status()

cpu_data = response.json()
cpus = cpu_data["data"]["cpuTypes"]

cpus_df = pd.DataFrame(cpus)

cpus_df = cpus_df[
    (cpus_df["displayName"].str.lower() != "unknown")
    & (~cpus_df["cores"].isna())
    & (~cpus_df["threadsPerCore"].isna())
]

cpus_df['displayName'].str.replace(r'\s{2,}', ' ', regex=True).str.strip()
cpus_df.dropna(how="all")
cpus_df.sort_values(by="displayName").reset_index(drop=True, inplace=True)

file_path = os.path.join(
    os.path.dirname(__file__), "../references/cpu-types.mdx"
)

table = tabulate(cpus_df, headers=["Display Name", "Cores", "Threads Per Core"], tablefmt="github", showindex=False)

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
{table}
""")

print("Markdown file with CPU data updated successfully.")
