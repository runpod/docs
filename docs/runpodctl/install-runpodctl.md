---
title: Install runpodctl
description: "Get started with runpodctl, an open-source CLI, to work with Pods and RunPod projects. Install and configure the tool, then verify the installation and API key setup to start using runpodctl."
sidebar_position: 2
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

**RunPod CLI** is an [open-source](https://github.com/runpod/runpodctl) command-line interface (CLI) for managing Pods and RunPod projects.

When you create a Pod, it comes with `runpodctl` installed and configured with a Pod-scoped API key. You can also install and run `runpodctl` locally.

## Step 1: Install RunPod CLI locally

To install `runpodctl` on your local machine, run one of the commands below based on your operating system:

<Tabs>
  <TabItem value="mac" label="macOS">

```bash
brew install runpod/runpodctl/runpodctl
```

</TabItem>
  <TabItem value="linux" label="Linux">

```bash
wget -qO- cli.runpod.net | sudo bash
```

</TabItem>
  <TabItem value="windows" label="Windows">

```bash
wget https://github.com/runpod/runpodctl/releases/download/v1.14.3/runpodctl-windows-amd64.exe -O runpodctl.exe
```

</TabItem>
</Tabs>

This installs RunPod CLI globally on your system, so you can run `runpodctl` commands from any directory.

## Step 2: Create an API key

Before you can use `runpodctl`, you must configure it with an [API key](/get-started/api-key). Follow these steps to create a new API key:

1. In the web interface, go to the [Settings page](https://www.runpod.io/console/user/settings).
2. Expand the **API Keys** section and click the **Create API Key** button.
3. Give your key a name and set its permissions. If you want to [manage Pods](/runpodctl/manage-pods) locally, your key will need **READ/WRITE** permissions (or **ALL**).
4. Click **Create**, then click on your newly-generated key to copy it to your clipboard.

:::warning

RunPod does not store your API key, so you may wish to save it elsewhere. Keep your API key secret—anyone with your key can gain full access to your account.

:::

## Step 3: Add your API key to runpodctl

Now that you've created an API key, run the following command to add it to `runpodctl`, replacing `[API_KEY]` with the key you just created:

```bash
runpodctl config --apiKey API_KEY
```

After running the command, you should see a confirmation message similar to this:

```bash
saved apiKey into config file: /Users/runpod/.runpod/config.toml
```

## Step 4: Verify installation

Now that you've added your API key, verify that `runpodctl` installed successfully by running this command:

```bash
runpodctl version
```

You should see which version is installed.

```bash
runpodctl v1.14.4
```

## Next steps

Now that you have successfully installed and configured `runpodctl`, you can:

- [Manage your Pods](/docs/runpodctl/pod-management) from the command line.
- [Transfer data](/docs/runpodctl/transfer-data) between your local machine and Pods.
- [Use projects](/docs/runpodctl/projects) to streamline endpoint development.