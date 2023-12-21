---
title: "🗄️ | Persistent Storage"
slug: "persistent-storage"
excerpt: "Dedicated space to save and retain data."
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Nov 06 2023 15:50:05 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 06 2023 19:44:26 GMT+0000 (Coordinated Universal Time)"
---

Any data saved to container disk space will be lost when a pod is restarted, in order to maintain data between restarts you must use a form of persistent storage. Currently, RunPod offers the following two solutions:

1. Attached volume, this form of storage is provided at a server level and connects to your pod. You cannot share this storage between pods or move it.
2. Network storage, this is a network-based storage solution that significantly increases the flexibility of what you can do on RunPod. With network storage, you can share data between different pods.
