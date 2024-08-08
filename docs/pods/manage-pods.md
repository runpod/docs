---
title: Manage Pods
description: "Learn how to start, stop, and manage Pods with RunPod, including creating and terminating Pods, and using the command line interface to manage your Pods."
id: manage-pods
sidebar_position: 3
---

Learn how to start, stop, and manage Pods with RunPod, including creating and terminating Pods, and using the command line interface to manage your Pods.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Prerequisites

If you are using the [RunPod CLI](/runpodctl/install-runpodctl), you'll need to set your API key in the configuration.

```bash
runpodctl config --apiKey $RUNPOD_API_KEY
```

Replace `$RUNPOD_API_KEY` with your RunPod API key.

Once your API key is set, you can manage your infrastructure.

If you're not sure which Pod meets your needs, see [Choose a Pod](/pods/choose-a-pod).

## Create Pods

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

1. Navigate to [Pods](https://www.runpod.io/console/pods) and select **+ Deploy**.
2. Choose between **GPU** and **CPU**.
3. Customize your an instance by setting up the following:
   1. (optional) Specify a Network volume.
   2. Select an instance type. For example, **A40**.
   3. (optional) Provide a template. For example, **RunPod Pytorch**.
   4. (GPU only) Specify your compute count.
4. Review your configuration and select **Deploy On-Demand**.

</TabItem>

<TabItem value="cli" label="Command line">

To create a Pod using the CLI, use the `runpodctl create pods` command.

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

:::tip

RunPod supports custom [templates](/pods/templates/overview) that allow you to specify your own Dockerfile.
By creating a Dockerfile, you can build a [custom Docker image](/tutorials/introduction/containers/overview) with your specific dependencies and configurations.
This ensures that your applications are reliable and portable across different environments.

:::

Charges occur after the Pod build is complete.

## Stop a Pod

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>
  1. Click the stop icon.
  2. Confirm by clicking the **Stop Pod** button.
  </TabItem>

<TabItem value="cli" label="Command line">
    To stop a Pod, enter the following command.

    ```bash
    runpodctl stop pod $RUNPOD_POD_ID
    ```

</TabItem>

</Tabs>

### Stop a Pod after a specific time

You can also stop a Pod after a specific amount of time.
For example, the following command sleeps for 2 hours, and then stops the Pod.

      <Tabs>
        <TabItem value="ssh" label="SSH">

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

:::warning

You are charged for storing idle Pods.
If you do not need to store your Pod, be sure to terminate it next.

:::

## Start a Pod

You can resume a pod that has been stopped.

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

1. Navigate to the **Pods** page.
2. Select your Pod you want to resume.
3. Select **Start**.

Your Pod will resume.

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

Terminating a Pod permanently deletes all data outside your [Network volume](/pods/storage/create-network-volumes).
Be sure you've saved any data you want to access again.

:::

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>

1. Select the hamburger menu at the bottom of the Pod you want to terminate.
2. Click **Terminate Pod**.
3. Confirm by clicking the **Yes** button.

</TabItem>

<TabItem value="cli" label="Command line">

To remove a single Pod, enter the following command.

```bash
runpodctl remove pod $RUNPOD_POD_ID
```

You can also remove Pods in bulk. For example, the following command terminates up to 40 pods with the name `my-bulk-task`.

```bash
runpodctl remove pods my-bulk-task --podCount 40
```

</TabItem>

</Tabs>

## List Pods

If you're using the command line, enter the following command to list your pods.

```bash
runpodctl get pod
```
