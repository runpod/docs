---
title: "Burn testing"
description: "Before listing a machine on the RunPod platform, thoroughly test it with a burn test, verifying memory, CPU, and disk capabilities, and ensure compatibility with popular templates by self-renting the machine after verifying its performance."
---

Machines should be thoroughly tested before they are listed on the RunPod platform.
Here is a simple guide to running a burn test for a few days.

Stop the RunPod agent by running:

```command
sudo systemctl stop runpod
```

Then you can kick off a gpu-burn run by typing:

```command
docker run --gpus all --rm jorghi21/gpu-burn-test 172800
```

You should also verify that your memory, CPU, and disk are up to the task.
You can use the [ngstress library](https://wiki.ubuntu.com/Kernel/Reference/stress-ngstress) to accomplish this.

When everything is verified okay, start the RunPod agent again by running

```command
sudo systemctl start runpod
```

Then, on your [machine dashboard](https://www.runpod.io/console/host/machines), self rent your machine to ensure it's working well with most popular templates.
