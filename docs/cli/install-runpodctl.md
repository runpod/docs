---
title: Installing runpodctl
description: "Install the command line interface for RunPod and run your first command."
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

runpodctl is an [open-source command-line interface (CLI)](https://github.com/runpod/runpodctl). You can use runpodctl to work with Pods and RunPod projects. 

When you create a Pod, it comes with runpodctl installed and configured with a Pod-scoped API key. You can also run runpodctl locally.

To install runpodctl on your local machine, run the appropriate command for your operating system. 

<Tabs>
  <TabItem value="mac" label="macOS" default>

    ```bash
    wget -qO- cli.runpod.net | sudo bash
    ```

  </TabItem>
  <TabItem value="linux" label="Linux">

    ```bash
    wget -qO- cli.runpod.net | sudo bash
    ```

  </TabItem>
  <TabItem value="windows" label="Windows">

    ```bash
    wget https://github.com/runpod/runpodctl/releases/download/v1.12.3/runpodctl-windows-amd64.exe -O runpodctl.exe
   ```

  </TabItem>
</Tabs>

:::tip 

If you see an error similar to `command not found: wget`, make sure you have [GNU wget](https://www.gnu.org/software/wget/) installed.

:::

## Configuring runpodctl

Before you can use runpodctl, you must configure an API key. To create a new API key, complete the following steps:
1. In the web interface, go to your [**Settings**](https://www.runpod.io/console/user/settings). 
2. Expand **API Keys** and click the **+ API Key** button. 
3. Select **Read** or **Read & Write** permissions. 
4. Click **Create**. 

:::note

Keep your API key secret. Anyone with the key can gain full access to your account.

:::

Now that you've created an API key, run the following command to add it to runpodctl:

```command
runpodctl config --apiKey your-api-key
``` 

You should see something similar to the following output: 

```command
saved apiKey into config file: /Users/runpod/.runpod/config.toml
saved new SSH public key into /Users/runpod/.runpod/ssh/RunPod-Key-Go.pub
```

Now that you've configured an API key, check that runpodctl installed successfully. Run the following command:

```command
runpodctl version
``` 

You should see which version is installed.

```command
runpodctl v1.12.3
```

If at any point you need help with a command, you can use the `--help` flag to see documentation on the command you're running.

```command
runpodctl --help
```