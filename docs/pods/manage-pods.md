---
title: Manage Pods
description: "Learn how to create, start, stop, and terminate Pods using both the RunPod web interface and command line interface (CLI)."
id: manage-pods
sidebar_position: 3
---

Learn how to create, start, stop, and terminate Pods using the [web interface](https://www.runpod.io/console/pods) and the [command-line interface](/runpodctl/overview.md) (CLI).

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Before you begin

If you want to manage Pods using the RunPod CLI, you'll need to [install `runpodctl`](/runpodctl/install-runpodctl), and set your [API key](/get-started/api-keys) in the configuration.

Run the following command, replacing `RUNPOD_API_KEY` with your API key:

```bash
runpodctl config --apiKey RUNPOD_API_KEY
```

## Create a Pod

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

To create a Pod using the web interface:

1. Open the [Pods page](https://www.runpod.io/console/pods) in the RunPod console and click the **Deploy** button.
1. (Optional) Specify a **Network Volume** if you need to share data between multiple Pods, or to save data for later use.
1. Select **GPU** or **CPU** using the buttons in the top-left corner of the window, and follow the configuration steps below.

GPU configuration:

1. Select a graphics card (e.g., A40, RTX 4090, H100 SXM).
1. Give your Pod a name using the **Pod Name** field.
1. (Optional) Choose a **Pod Template** such as **RunPod Pytorch 2.1** or **RunPod Stable Diffusion**.
1. Specify your **GPU count** if you need multiple GPUs.
1. Click **Deploy On-Demand** to deploy and start your Pod.

CPU configuration:

1. Select a **CPU type** (e.g., CPU3/CPU5, Compute Optimized, General Purpose, Memory-Optimized).
1. Specify the number of CPUs and quantity of RAM for you Pod by selecting an **Instance Cofiguration**.
1. Give your Pod a name using the **Pod Name** field.
1. Click **Deploy On-Demand** to deploy and start your Pod.

</TabItem>

<TabItem value="cli" label="Command line">

To create a Pod using the CLI, use the `runpodctl create pods` command:

```bash
runpodctl create pods \
  --name hello-world \
  --gpuType "NVIDIA A40" \
  --imageName "runpod/pytorch:3.10-2.0.0-117" \
  --containerDiskSize 10 \
  --volumeSize 100 \
  --args "bash -c 'mkdir /testdir1 && /start.sh'"
```

</TabItem>
</Tabs>

### Custom templates

RunPod supports custom [Pod templates](/pods/templates/overview) that let you define your environment using a Dockerfile.
With custom templates, you can:

- Install specific dependencies and packages.
- Configure your development environment.
- Create [portable Docker images](/tutorials/introduction/containers/overview) that work consistently across deployments.
- Share environments with team members for collaborative work.

## Stop a Pod

:::warning
You will be charged for idle Pods even if they are stopped. If you don't need to retain your Pod environment, you should terminate it completely.
:::

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

  1. Open the [Pods page](https://www.runpod.io/console/pods).
  1. Find the Pod you want to stop and expand it.
  1. Click the **Stop button** (square icon).
  1. Confirm by clicking the **Stop Pod** button.
  </TabItem>

<TabItem value="cli" label="Command line">
    To stop a Pod, enter the following command.

    ```bash
    runpodctl stop pod $RUNPOD_POD_ID
    ```

</TabItem>

</Tabs>

### Stop a Pod after a period of time

You can also stop a Pod after a specified period of time.
The examples below show how to use the CLI and the [web terminal](/pods/connect-to-a-pod#web-terminal) to schedule a Pod to stop after 2 hours of runtime.

      <Tabs>
        <TabItem value="cli" label="Command line">

          Use the following command to stop a Pod after 2 hours:

          ```bash
          sleep 2h; runpodctl stop pod $RUNPOD_POD_ID &
          ```
          This command uses sleep to wait for 2 hours before executing the `runpodctl stop pod` command to stop the Pod.
          The `&` at the end runs the command in the background, allowing you to continue using the SSH session.
        </TabItem>
        <TabItem value="web-terminal" label="Web terminal">

          To stop a Pod after 2 hours using the web terminal, enter:

          ```bash
          nohup bash -c "sleep 2h; runpodctl stop pod $RUNPOD_POD_ID" &
          ```
          `nohup` ensures the process continues running if you close the web terminal window.
        </TabItem>
      </Tabs>


## Start a Pod

Pods start as soon as they are created, but you can resume a Pod that has been stopped.

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

1. Open the [Pods page](https://www.runpod.io/console/pods).
1. Find the Pod you want to start and expand it.
1. Click the **Start** button (play icon).

</TabItem>

<TabItem value="cli" label="Command line">
  To start a single Pod, enter the command `runpodctl start pod`. You can pass the environment variable `RUNPOD_POD_ID` to identify each Pod.

```bash
runpodctl start pod $RUNPOD_POD_ID
```

</TabItem>
</Tabs>

## Terminate a Pod

:::danger
Terminating a Pod permanently deletes all data outside your [network volume](/pods/storage/create-network-volumes). Be sure you've saved any data you want to access again.
:::

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

1. Open the [Pods page](https://www.runpod.io/console/pods).
1. Find the Pod you want to terminate and expand it.
1. [Stop the Pod](#stop-a-pod) if it's running.
1. Click the **Terminate** button (trash icon).
1. Confirm by clicking the **Yes** button.

</TabItem>

<TabItem value="cli" label="Command line">

To remove a single Pod, enter the following command.

```bash
runpodctl remove pod $RUNPOD_POD_ID
```

You can also remove Pods in bulk. For example, the following command terminates up to 40 Pods with the name `my-bulk-task`.

```bash
runpodctl remove pods my-bulk-task --podCount 40
```

</TabItem>

</Tabs>

## List Pods

You can find a list of all your Pods on the [Pods page](https://www.runpod.io/console/pods) of the web interface.

If you're using the CLI, use the following command to list your Pods:

```bash
runpodctl get pod
```