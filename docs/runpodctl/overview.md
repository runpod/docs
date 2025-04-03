---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# RunPod CLI

RunPod CLI is an [open source](https://github.com/runpod/runpodctl) command-line interface tool that simplifies the management of GPU [Pods](/pods/overview) and [Serverless](/serverless/overview) endpoints on the RunPod platform. You can use RunPod CLI to execute code on Pods, deploy endpoints, transfer data, and manage computing resources efficiently.

Every Pod you deploy comes preinstalled with the `runpodctl` command. You can also [install it locally](/runpodctl/install-runpodctl) to manage RunPod resources from your own machine.

## Key capabilities

RunPod CLI enables you to:

- Manage GPU and CPU Pods programmatically.
- Execute commands and run code on Pods.
- [Transfer files](/runpodctl/transfer-files) and data between your local system and RunPod.
- Develop and deploy Serverless endpoints using [RunPod projects](/runpodctl/projects/overview).

## Streamline development with projects

RunPod [projects](/runpodctl/projects/overview) provide a Docker-free workflow that significantly simplifies endpoint development:

- Create and deploy Serverless endpoints without prior experience with Docker.
- Skip the container build-push-deploy cycle when making code changes.
- Test changes in real time without rebuilding images.
- Focus on your code while RunPod handles the infrastructure.

Get started by learning how to [create your first project](/runpodctl/projects/get-started).

## Installation

For more information, see [Install runpodctl](/runpodctl/install-runpodctl).

<Tabs>

<TabItem value="macos" label="macOS (Homebrew)">

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

## Configure your API key

Before you can use RunPod CLI to manage resources from your local machine, you'll need to configure your [API key](/get-started/api-keys). You can create and manage API keys on the [RunPod account settings page](https://www.runpod.io/console/user/settings).

After installing `runpodctl` on your local system, run this command to configure it with your API key:

```bash
runpodctl config --apiKey [API_KEY]
```

## Help command

Learn how to use RunPod CLI commands by browsing the [CLI reference](/runpodctl/reference/runpodctl) or by running the `help` command:

```bash
runpodctl help
```

Learn more about a particular command by running:

```bash
runpodctl [command] help
```

For a comprehensive list of commands, see the [RunPod CLI reference](/runpodctl/reference/runpodctl).
