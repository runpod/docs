---
title: "runpodctl"
---

You can use RunPod's CLI [runpodctl](https://github.com/runpod/runpodctl) to manage Pods.

All Pods come with `runpodctl` installed with a Pod-scoped API key, which makes managing your Pods easier through the command line.

## Quick Install

Choose one of the following methods to install the RunPod CLI.

### MacOs

**Brew**

```bash
brew install runpod/runpodctl/runpodctl
```

**ARM**

```bash
wget --quiet --show-progress https://github.com/runpod/runpodctl/releases/download/v1.14.3/runpodctl-darwin-arm64 -O runpodctl && chmod +x runpodctl && sudo mv runpodctl /usr/local/bin/runpodctl
```

**AMD**

```bash
wget --quiet --show-progress https://github.com/runpod/runpodctl/releases/download/v1.14.3/runpodctl-darwin-amd64 -O runpodctl && chmod +x runpodctl && sudo mv runpodctl /usr/local/bin/runpodctl
```

### Linux

```bash
wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.14.3/runpodctl-linux-amd64 -O runpodctl && chmod +x runpodctl && sudo cp runpodctl /usr/bin/runpodctl
```

### Windows (powershell)

```bash
wget https://github.com/runpod/runpodctl/releases/download/v1.14.3/runpodctl-win-amd -O runpodctl.exe
```

### Google Collab

```bash
!wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.14.3/runpodctl-linux-amd -O runpodctl
!chmod +x runpodctl
!cp runpodctl /usr/bin/runpodctl
```

### Jupyter notebook

```bash
!wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.14.3/runpodctl-linux-amd -O runpodctl
!chmod +x runpodctl
!cp runpodctl /usr/bin/runpodctl
```

## Usage

```
The RunPod CLI tool to manage resources on runpod.io and develop serverless applications.

Usage:
  runpodctl [command]

Available Commands:
  completion  Generate the autocompletion script for the specified shell
  config      Manage CLI configuration
  create      create a resource
  exec        Execute commands in a pod
  get         get resource
  help        Help about any command
  project     Manage RunPod projects
  receive     receive file(s), or folder
  remove      remove a resource
  send        send file(s), or folder
  ssh         SSH keys and commands
  start       start a resource
  stop        stop a resource
  update      update runpodctl

Flags:
  -h, --help      help for runpodctl
  -v, --version   Print the version of runpodctl

Use "runpodctl [command] --help" for more information about a command.
```
