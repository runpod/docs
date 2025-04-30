---
title: Manage API keys
description: "Generate API keys with Read/Write, Restricted, or Read permission to authenticate requests to RunPod. Create and revoke keys from the console under Settings > API Keys."
sidebar_position: 2
---

Learn how to create, edit, and disable RunPod API keys.

:::note

Legacy API keys generated before November 11, 2024 have either Read/Write or Read Only access to GraphQL based on what was set for that key. All legacy keys have full access to AI API. To improve security, generate a new key with **Restricted** permission and select the minimum permission needed for your use case.

:::

## Create an API key

Follow these steps to create a new RunPod API key:

1. In the RunPod console, navigate to the [Settings page](https://www.runpod.io/console/user/settings).
2. Expand the **API Keys** section and select the **Create API Key** button.
3. Give your key a name and set its permissions (**All**, **Restricted**, or **Read Only**). If you choose **Restricted**, you can customize access for each RunPod API:
   - **None**: No access
   - **Restricted**: Customize access for each of your [Serverless endpoints](/serverless/overview). (Default: None.)
   - **Read/Write**: Full access to your endpoints.
   - **Read Only**: Read access without write access.
4. Select **Create**, then select your newly-generated key to copy it to your clipboard.

:::warning

RunPod does not store your API key, so you may wish to save it elsewhere (e.g., in your password manager, or in a GitHub secret). Treat your API key like a password and don't share it with anyone.

:::

## Edit API key permissions

To edit an API key:

1. Navigate to the [Settings page](https://www.runpod.io/console/user/settings).
2. Under **API Keys**, select the pencil icon for the key you wish to update
3. Update the key with your desired permissions, then select **Update**.

## Enable/disable an API key

To enable/disable an API key:

1. Navigate to the [Settings page](https://www.runpod.io/console/user/settings).
2. Under **API Keys**, select the toggle for the API key you wish to enable/disable, then select **Yes** in the confirmation modal.

## Delete an API key

To delete an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, select the trash can icon and select **Revoke Key** in the confirmation modal.
