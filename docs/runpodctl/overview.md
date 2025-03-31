---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RunPod CLI

**RunPod CLI** is an [open source](https://github.com/runpod/runpodctl) command-line interface tool that simplifies the management of GPU [Pods](/pods/overview) and [Serverless](/serverless/overview) endpoints on the RunPod platform. You can use RunPod CLI to execute code on Pods, deploy endpoints, transfer data, and manage computing resources efficiently.

Every Pod you deploy comes preinstalled with the `runpodctl` command. You can also [install it locally](/runpodctl/install-runpodctl) to manage RunPod resources from your own machine.

## Key capabilities

RunPod CLI enables you to:

- Manage GPU and CPU Pods programmatically.
- Execute commands and run code on Pods.
- Transfer files and data between your local system and RunPod.
- Develop and deploy Serverless endpoints using [RunPod projects](/runpodctl/projects/overview).

## Streamline development with projects

RunPod projects provide a Docker-free workflow that significantly simplifies endpoint development:

- Create and deploy Serverless endpoints without prior experience with Docker.
- Skip the container build-push-deploy cycle when making code changes.
- Test changes in real time without rebuilding images.
- Focus on your code while RunPod handles the infrastructure.

See [Create your first project](/runpodctl/projects/get-started) for a step-by-step tutorial.

## Installation

For more information, see [Install RunPod CLI](/runpodctl/install-runpodctl).

<Tabs>

<TabItem value="macos" label="MacOS (Homebrew)">

Install using Homebrew:

```bash
brew install runpod/runpodctl/runpodctl
```

</TabItem>

<TabItem value="linux" label="Linux (WSL)" default>

Install using `wget`:

```bash
wget -qO- cli.runpod.net | sudo bash
```

</TabItem>

<TabItem value="windows" label="Windows (PowerShell)">

Install using PowerShell:

```powershell
wget https://github.com/runpod/runpodctl/releases/latest/download/runpodctl-windows-amd64.exe -O runpodctl.exe
```

</TabItem>
</Tabs>

### Help command

After you've installed `runpodctl`, you can learn how to use any RunPod CLI command by browsing the [CLI reference](/runpodctl/reference/runpodctl) or by running the `help` command:

```bash
runpodctl help
```

Learn more about a particular command by running:

```bash
runpodctl [command] help
```


### Configuration

Before using RunPod CLI, configure your API key, which can be obtained from your [RunPod account](https://runpod.io/console/user/settings).

```bash
runpodctl config --apiKey your-api-key
```

## Key commands

Below are some common commands for various RunPod tasks.

### Managing Pods

Use the following commands to manage your Pods.

Get all pods:

```bash
runpodctl get pod
```

Get details of a specific pod:

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

For a comprehensive list of commands, refer to the [RunPod CLI reference documentation](/runpodctl/reference/runpodctl).

### Data transfer

The RunPod CLI (runpodctl) provides simple commands for transferring data between your machine and RunPod. **It’s preinstalled on all RunPod Pods** and uses one-time codes for secure authentication, so no API keys are required.

#### Sending a File

To send a file from source machine:

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

To receive a file on destination machine:

```bash
runpodctl receive 8338-galileo-collect-fidel
```

Example output:

```bash
Receiving 'data.txt' (5 B)

Receiving (<-149.36.0.243:8692)
data.txt 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

### Transferring Files between Google Drive and RunPod

You can also use Google Drive for transferring files via the following links for Google Colab:

- [Send](https://colab.research.google.com/drive/1UaODD9iGswnKF7SZfsvwHDGWWwLziOsr#scrollTo=2nlcIAY3gGLt)
- [Receive](https://colab.research.google.com/drive/1ot8pODgystx1D6_zvsALDSvjACBF1cj6#scrollTo=RF1bMqhBOpSZ)

RunPod CLI (`runpodctl`) is a powerful tool for managing GPU and CPU resources on the RunPod platform.

It simplifies the process of executing code, transferring data, and managing pods, making it an essential tool for developers and data scientists leveraging cloud computing for AI and machine learning tasks.
