---
title: "Override public key"
sidebar_position: 9
description: "Configure public key authentication for secure access via terminal, or override at the Pod level using the SSH_PUBLIC_KEY environment variable."
---

RunPod attempts to inject the public key that you configure in your account's settings page for authentication using basic terminal.
If you want to override this at a Pod level, you can manually supply a public key using the `SSH_PUBLIC_KEY` environment variable.
