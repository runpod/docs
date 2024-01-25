---
title: Manage Pods
description: Manage your Pod.
id: manage-pods
sidebar_position: 3
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## Start a Pod

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>
  1. Navigate to the **Pods** page.
  2. Click the **+ New Pod** button.
  3. Choose your Pod and click **Deploy**.
  :::tip

If you're not sure which Pod meets your needs, see [Choose a Pod](/pods/choose-a-pod).

:::
4. (Optional) Choose a [template](/pods/templates/overview).
5. Click **Continue**.
6. Verify your Pod configuration and click **Deploy**.

Next, RunPod builds your Pod. You'll start paying for the Pod as soon as it's built.
</TabItem>

<TabItem value="cli" label="Command line">
  To start a single Pod, enter the command `runpodctl start pod`. You can pass the environment variable `RUNPOD_POD_ID` to identify each Pod.

```bash
runpodctl start pod $RUNPOD_POD_ID
```

To start Pods in bulk, enter the command `runpodctl create pods`.

For example, to start up to 10 Pods with the name `bulk-task` on 3070 and 3080 GPUs and run a bash command, enter the following command.

```bash
runpodctl create pods \
  --name bulk-task \
  --gpuType "NVIDIA GeForce RTX 3070,NVIDIA GeForce RTX 3080" \
  --imageName "runpod/your-image-name" \ 
  --containerDiskSize 10 \ 
  --volumeSize 0 \ 
  --mem 1 \
--args "bash -c 'your-bash-command'
```

</TabItem>
</Tabs>
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

    You can also stop a Pod after a specific amount of time. For example, the following command sleeps for 2 hours, and then stops the Pod.

      <Tabs>
        <TabItem value="ssh" label="SSH">
          ```bash
          sleep 2h; runpodctl stop pod $RUNPOD_POD_ID &
          ```
        </TabItem>
        <TabItem value="web-terminal" label="Web terminal">
          ```bash
          nohup bash -c "sleep 2h; runpodctl stop pod $RUNPOD_POD_ID" &          
          ```
          `nohup` ensures the process continues running if you close the web terminal window.
        </TabItem>
      </Tabs>

</TabItem>

</Tabs>

:::warning

You are charged for storing idle Pods. If you do not need to store your Pod, be sure to terminate it next.

:::

## Terminate a Pod

:::danger

Terminating a Pod permanently deletes all data outside your [network volume](/pods/network-storage/create-network-volumes). Be sure you've saved any data you want to access again.

:::

<Tabs groupId="interface">

<TabItem value="web-ui" label="Web" default>
    1. Click the hamburger menu at the bottom of the Pod you want to terminate.
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
