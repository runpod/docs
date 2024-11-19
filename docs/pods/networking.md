---
title: "Global Networking"
description: "Learn how to securely communicate between pods within your RunPod account using a private network."
id: networking
sidebar_position: 6
---

This private networking feature enables secure communication between all Pods within your RunPod account. It creates a private, virtual network that connects your Pods, allowing them to communicate with each other as if they were on the same local network, regardless of their physical location.

## How to use it?

1. **Enable Global Networking**:

   - When creating a new Pod, check the "**Global Networking**" option.

2. **Access the Private Network**:
   - Each Pod with Global Networking enabled will be assigned a private IP address.
   - The Private IP Address is referenced via the DNS record for the pod using the pattern: `$podid.runpod.internal`
   - The DNS record will displayed on the pod details card after the pod is created.
3. **Run Services**:
    - Start your services on the Pods as usual. They will be accessible to other Pods on the private network without needing to explicitly expose ports.
    - To test connectivity between pods, open a terminal and run: `ping podid.runpod.internal`

4. **Public Access** (if needed):
   - For services that need to be publicly accessible, you still need to expose ports as usual when creating the Pod.
   - Consider using a "gateway" Pod that exposes public endpoints and then communicates with your private Pods.
5. **Security Best Practices**:
   - Keep sensitive services (like databases) on private Pods without exposing any public ports.

:::note
Global Networking doesn't increase throughput between Pods, but it does allow for secure, private communication within your account's infrastructure.
:::

:::tip
For more detailed information or support, please [contact our customer service team](https://contact.runpod.io/hc/en-us/requests/new).
:::

## Current Limitations

- Available only on NVIDIA GPU Pods
- Not yet available for CPU Pods