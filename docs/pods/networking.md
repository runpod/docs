---
title: "Global networking"
description: "Learn how to securely communicate between pods within your RunPod account using a private network."
id: networking
sidebar_position: 6
---

This private networking feature enables secure communication between all Pods within your RunPod account. It creates a private, virtual network that connects your Pods, allowing them to communicate with each other as if they were on the same local network, regardless of their physical location.

:::note

Global networking is currently only available on NVIDIA GPU Pods.

:::

## How to use it

**Enable global networking**

1. Go to [Pods](https://www.runpod.io/console/pods) section and select **+ Deploy**.
2. Toggle the **Global Networking** to select Pods that have global networking enabled.
3. Configure your GPUs and select **Deploy**.

**Access the private network**

- Each Pod with global networking enabled will be assigned a private IP address.
- The private IP address is referenced via the DNS record for the Pod using the pattern: `$podid.runpod.internal`
- The DNS record will be displayed on the Pod details card after the Pod is created.

**Run services**

Start your services on the Pods as usual. They will be accessible to other Pods on the private network without needing to explicitly expose ports.
To test connectivity between Pods, open a terminal and run: `ping podid.runpod.internal`

**Public access** (if needed)

For services that need to be publicly accessible, you still need to expose ports as usual when creating the Pod.
Consider using a "gateway" Pod that exposes public endpoints and then communicates with your private Pods.

**Security best practices**

Keep sensitive services (like databases) on private Pods without exposing any public ports.

:::note

Global networking provides a 100mbps link between Pods and allows for secure, private communication within your account's infrastructure, but it doesn't increase overall throughput between Pods.

:::

For more detailed information or support, please [contact our customer service team](https://contact.runpod.io/hc/en-us/requests/new).

## Available data centers

Global networking is available across 17 data centers worldwide.

| Region ID | Geographic Location | 
|-----------|---------------------|
| CA-MTL-3 | Canada |
| EU-CZ-1 | Czech Republic |
| EU-FR-1 | France |
| EU-NL-1 | Netherlands |
| EU-RO-1 | Romania |
| EU-SE-1 | Sweden |
| EUR-IS-2 | Iceland |
| OC-AU-1 | Australia |
| US-CA-2 | California |
| US-GA-1 | Georgia |
| US-GA-2 | Georgia |
| US-IL-1 | Illinois |
| US-KS-2 | Kansas |
| US-NC-1 | North Carolina |
| US-TX-3 | Texas |
| US-TX-4 | Texas |
| US-WA-1 | Washington |

:::note

All data centers support the global networking feature with a 100mbps link limit.

:::
