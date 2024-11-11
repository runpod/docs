---
title: API keys
description: "Generate API keys with Read/Write, Restricted, or Read permission to authenticate requests to RunPod. Create and revoke keys from the console under Settings > API Keys."
sidebar_position: 4
---

API keys authenticate requests to RunPod.
You can generate an API key with **Read/Write** permission, **Restricted** permission, or **Read Only** permission.

:::note

Legacy API keys generated before November 11, 2024 have either Read/Write or Read Only access to GraphQL based on what was set for that key. All legacy keys have full access to AI API. To improve security, generate a new key with Restricted permission and select the minimum permission needed for your use case. 

:::

## Generate

To create an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, choose **+ Create API Key**.
3. Select the permission. If you choose **Restricted** permission, you can customize access for each API:
    - **None**: No access
    - (AI API only) **Restricted**: Custom access to specific endpoints. No access is default.
    - **Read/Write**: Full access 
    - **Read Only**: Read access without write access 
    :::warning

    Select the minimum permission needed for your use case. Only allow full access to GraphQL when absolutely necessary for automations like creating or managing RunPod resources outside of Serverless endpoints. 

    :::
5. Choose **Create**.

:::note

Once your API key is generated, keep it secure. Treat it like a password and avoid sharing it in insecure environments.

:::

## Edit permission

To edit an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, select the pencil icon and select the permission.
3. Choose **Update**.

## Disable

To disable an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, select the toggle and select **Yes**.

## Enable

To enable an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, select the toggle and select **Yes**.

## Revoke

To delete an API key:

1. From the console, select **Settings**.
2. Under **API Keys**, select the trash can icon and select **Revoke Key**.
