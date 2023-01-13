# Automatically Stop My Pod

If you want to automatically stop your pod when your workload is done, simply run the following command at the os level after your script is completed:

```
runpodctl stop pod $RUNPOD_POD_ID
```

runpodctl is our command line tool that is automatically installed in every pod. RUNPOD\_POD\_ID is an environment variable that we pass to uniquely identify each pod. Each runpodctl pod instance is configured with an API key that is scoped to that pod, so it cannot affect other pods.

If you simply want to stop your pod after a specific amount of time, you can run the following command in your web terminal:

<pre><code><strong>(sleep 2h; runpodctl stop pod $RUNPOD_POD_ID) &#x26;
</strong></code></pre>

This simple command sleeps for 2 hours (change 2h to whatever you want), and then stops the pod. Keep in mind that you will still incur disk fees on a stopped pod.

If you want to terminate the pod completely, you can configure your pod with 0 volume disk. In this case, stopping the pod is equivalent to terminating it.&#x20;
