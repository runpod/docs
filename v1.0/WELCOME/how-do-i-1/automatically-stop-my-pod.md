---
title: "Automatically Stop My Pod"
slug: "automatically-stop-my-pod"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Apr 02 2023 16:59:20 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jul 27 2023 12:56:53 GMT+0000 (Coordinated Universal Time)"
---

If you want to automatically stop your Pod when your workload is done, simply run the following command at the operating system level after your script is completed:

```Text Bash
runpodctl stop pod $RUNPOD_POD_ID
```

runpodctl is our command line tool that is automatically installed in every Pod. RUNPOD_POD_ID is an environment variable that we pass to uniquely identify each Pod. Each runpodctl Pod instance is configured with an API key that is scoped to that Pod, so it cannot affect other Pods.

If you simply want to stop your Pod after a specific amount of time, you can run the following command:

<!-- dprint-ignore-start -->
```Text Bash | Web Terminal
nohup bash -c "sleep 2h; runpodctl stop pod $RUNPOD_POD_ID" &
```
```Text Bash | SSH
sleep 2h; runpodctl stop pod $RUNPOD_POD_ID &
```
<!-- dprint-ignore-end -->

This simple command sleeps for 2 hours (change 2h to whatever you want), and then stops the Pod. `nohup` ensures the process won't terminate if you close the web terminal window. Keep in mind that you will still incur disk fees on a stopped Pod.

If you want to terminate the Pod completely, you can configure your Pod with a zero-volume disk. In this case, stopping the Pod is equivalent to terminating it.

You can also request to terminate the Pod directly using a similar cli command:

```Text Bash
runpodctl remove pod $RUNPOD_POD_ID
```
