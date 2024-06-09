---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**RunPod CLI** (`runpodctl`) is a command-line interface tool designed to automate and manage GPU pods on [RunPod](https://runpod.io). 

This tool facilitates efficient interaction with RunPod's cloud computing platform, enabling you to execute code, transfer data, and manage computing resources seamlessly.

Every Pod deployed to RunPod comes with this CLI tool installed.

### Purpose

The primary purpose of RunPod CLI is to provide you with a straightforward, command-line-based method to:

- Automate the management of GPU and CPU pods.
- Execute code on these pods.
- Transfer data between local systems and RunPod.
- Leverage serverless computing capabilities.

RunPod also contains a functionality that enables you to develop and deploy endpoints entirely on RunPod's infrastructure. 

That means you can get a worker up and running without knowing Docker or needing to structure handler code. 
This Dockerless workflow also streamlines the development process: you don't need to rebuild and push container images or edit your endpoint to use the new image each time you change your code.

To get started, see [Managing Projects](/cli/projects/manage-projects).


## Installation

For more information, see [Install RunPod CLI](/cli/install-runpodctl).

<Tabs>
  
  <TabItem value="macos" label="MacOS">
  
  Install using Homebrew:
  
  ```bash
  brew install runpod/runpodctl/runpodctl
  ```
  </TabItem>

  <TabItem value="linux" label="Linux/MacOS (WSL)" default>
  
  Install using `wget`:
  
  ```bash
  wget -qO- cli.runpod.net | sudo bash
  ```
  </TabItem>

  
  <TabItem value="windows" label="Windows PowerShell">
  
  Install via PowerShell:
  
  ```powershell
  wget https://github.com/runpod/runpodctl/releases/latest/download/runpodctl-windows-amd64.exe -O runpodctl.exe
  ```
  </TabItem>
</Tabs>



### Configuration

Before using RunPod CLI, configure your API key, which can be obtained from your [RunPod account](https://runpod.io/console/user/settings).

```bash
runpodctl config --apiKey={key}
```

## Key Features

### Managing Pods

RunPod CLI allows you to manage your computing pods effectively. Below are some common commands:

- Get all pods:

  ```bash
  runpodctl get pod
  ```

- Get details of a specific pod:

  ```bash
  runpodctl get pod {podId}
  ```

- Start an on-demand pod:

  ```bash
  runpodctl start pod {podId}
  ```

- Start a spot pod with a bid:

  ```bash
  runpodctl start pod {podId} --bid=0.3
  ```

- Stop a pod:

  ```bash
  runpodctl stop pod {podId}
  ```

For a comprehensive list of commands, refer to the [RunPod CLI reference documentation](/references/runpodctl).

### Data Transfer

RunPod CLI provides simple commands for transferring data between your local machine and RunPod. These commands do not require API keys due to built-in security measures using one-time codes.

#### Sending a File

To send a file from your local machine:

```bash
runpodctl send data.txt
```

Example output:

```bash
Sending 'data.txt' (5 B)
Code is: 8338-galileo-collect-fidel
On the other computer run

runpodctl receive 8338-galileo-collect-fidel
```

#### Receiving a File

To receive a file on another machine:

```bash
runpodctl receive 8338-galileo-collect-fidel
```

Example output:

```bash
Receiving 'data.txt' (5 B)

Receiving (<-149.36.0.243:8692)
data.txt 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

### Using Google Drive

You can also use Google Drive for transferring files via the following links for Google Colab:

- [Send](https://colab.research.google.com/drive/1UaODD9iGswnKF7SZfsvwHDGWWwLziOsr#scrollTo=2nlcIAY3gGLt)
- [Receive](https://colab.research.google.com/drive/1ot8pODgystx1D6_zvsALDSvjACBF1cj6#scrollTo=RF1bMqhBOpSZ)


RunPod CLI (`runpodctl`) is a powerful tool for managing GPU and CPU resources on the RunPod platform. 

It simplifies the process of executing code, transferring data, and managing pods, making it an essential tool for developers and data scientists leveraging cloud computing for AI and machine learning tasks.
