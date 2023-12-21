---
title: "🔥 | Burn Testing"
slug: "burn-testing"
excerpt: ""
hidden: false
createdAt: "Sun Apr 02 2023 17:16:22 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Dec 18 2023 15:57:42 GMT+0000 (Coordinated Universal Time)"
---

Machines should be thoroughly tested before being listed on the RunPod platform. Here is a simple guide to running a burn test for a few days.

Stop the RunPod agent by running

`sudo systemctl stop runpod`

Then you can kick off a gpu-burn run by typing

`docker run --gpus all --rm jorghi21/gpu-burn-test 172800`

You should also verify that your memory, CPU, and disk are up to the task. You can use the [ngstress library](https://wiki.ubuntu.com/Kernel/Reference/stress-ngstress) to accomplish this.

When everything is verified okay, you can start the RunPod agent again by running

`sudo systemctl start runpod`

Then, on your [machine dashboard](https://www.runpod.io/console/host/machines), self rent your machine to ensure it is working well with most popular templates.
