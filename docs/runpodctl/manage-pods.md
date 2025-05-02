---
title: Manage Pods
sidebar_position: 3
description: "Learn how to manage Pods with runpodctl."

---

# Manage Pods with runpodctl

RunPod CLI makes it easy to manage [Pods](/pods/overview) using your local terminal. Use the commands below to manage your Pods with `runpodctl`. For a complete list of commands, run `runpodctl help`.

## List all Pods

Run this command to list the details of all Pods associated with your RunPod account:

```bash
runpodctl get pod
```

Example output:

```bash
ID            	NAME 	GPU        	IMAGE NAME                                              	STATUS  
wu5ekmn69oh1xr	Pod1	1 RTX A5000	runpod/stable-diffusion:web-ui-10.2.1                   	EXITED 	
gq9xijdra9hwyd	Pod2	1 L4       	runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04	RUNNING	
kyvwslyyjtf97w	Pod3	1 RTX A4500	runpod/stable-diffusion:web-ui-10.2.1                   	RUNNING
```

## Get details for a Pod

Run this command to get the details of a single Pod:

```bash
runpodctl get pod [POD_ID]
```

Example output:

```bash
ID            	NAME 	GPU        	IMAGE NAME                                              	STATUS  
gq9xijdra9hwyd	Pod2	1 L4       	runpod/pytorch:2.1.0-py3.10-cuda11.8.0-devel-ubuntu22.04	RUNNING
```

## Stop a Pod

:::warning

You will be charged for idle Pods even if they are stopped. If you don't need to retain your Pod environment, you should [terminate](#terminate-a-pod) it completely.

:::

Run this command to stop a Pod:

```bash
runpodctl stop pod [POD_ID]
```

Example output:

```bash
pod "gq9xijdra9hwyd" stopped
```

## Resume a Pod

Run this command to resume a Pod that has been stopped:

```bash
runpodctl start pod [POD_ID]
```

Example output:

```bash
pod "wu5ekmn69oh1xr" started with $0.290 / hr
```

## Terminate a Pod

:::danger

Terminating a Pod permanently deletes all data outside your [network volume](/pods/storage/create-network-volumes). Be sure you've saved any data you want to access again.

:::

Run this command to terminate a Pod:

```bash
runpodctl remove pod [POD_ID]
```

Example output:

```bash
pod "wu5ekmn69oh1xr" removed
```

You can also terminate a Pod by name:

```bash
runpodctl remove pods [POD_NAME]
```
