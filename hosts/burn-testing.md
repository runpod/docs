# Burn Testing

Machines should be thoroughly tested before being listed on the RunPod platform.

Here is a simple guide to running a burn test for a few days.

Stop the RunPod agent by running

`sudo systemctl stop runpod`

Then you can kick off a gpu-burn run by typing

```
docker run --rm --gpus all gshaibi/gpu-burn -d 36000
```

You should also verify that your memory, cpu, and disk are up to the task. You can use the stress-ng library to accomplish this: [https://wiki.ubuntu.com/Kernel/Reference/stress-ng](https://wiki.ubuntu.com/Kernel/Reference/stress-ng)

When everything is verified okay, you can start the RunPod agent again by running

`sudo systemctl start runpod`
