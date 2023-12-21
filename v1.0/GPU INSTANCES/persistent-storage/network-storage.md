---
title: "Network Storage"
slug: "network-storage"
excerpt: "Exclusive to secure cloud, this datacenter level storage option that can be shared between pods."
hidden: true
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Nov 06 2023 19:32:55 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 06 2023 19:51:06 GMT+0000 (Coordinated Universal Time)"
---

When using network storage you are no longer restricted by the resources of an individual system like you were with a basic attached volume. Since this form of storage is at a datacenter level you can easily switch pods/GPU types that are available at that datacenter or even allow multiple Pods to share a single network storage volume.

> 👍 By using `/runpod-volume` as the default mounting location, you will be ready to deploy on serverless if you choose to do so.
