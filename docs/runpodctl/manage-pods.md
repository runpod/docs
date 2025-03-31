---
title: Manage Pods
sidebar_position: 3
description: "Get started with runpodctl, an open-source CLI, to work with Pods and RunPod projects. Install and configure the tool, then verify the installation and API key setup to start using runpodctl."

---

# Manage Pods with runpodctl

Use the commands below to manage your Pods with `runpodctl`. For a complete list of commands, run `runpodctl help`.

## Get all Pods

```bash
runpodctl get pod
```

## Get details for a specific Pod

```bash
runpodctl get pod [pod_id]
```

## Start an on-demand Pod

```bash
runpodctl start pod [pod_id]
```

## Start a spot Pod with a bid

```bash
runpodctl start pod [pod_id] --bid=0.3
```

## Stop a Pod

```bash
runpodctl stop pod [pod_id]
```

## Terminate a Pod

```bash
runpodctl remove pod [pod_id]
```
