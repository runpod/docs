---
title: "Bulk Start/Stop Pods"
slug: "bulk-startstop-pods"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Apr 02 2023 17:04:23 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Apr 29 2023 13:45:54 GMT+0000 (Coordinated Universal Time)"
---

Sometimes, you want to run a bunch of pods that all do the same thing, but it's a pain to have to click a hundred times to start 30 pods. If you want to just spin up a bunch of pods to do some kind of automated task, you can use our [runpodctl command line tool](https://github.com/runpod/runpodctl) to easily accomplish this.

To start 10 pods with name "my-bulk-task":

```
runpodctl create pods --name my-bulk-task --gpuType "NVIDIA GeForce RTX 3070,NVIDIA GeForce RTX 3080" --imageName "runpod/cool-stuff" --containerDiskSize 10 --volumeSize 0 --mem 1 --args "bash -c 'bash command I want to run; runpodctl remove pod \$RUNPOD_POD_ID;'" --env "KEY1=VAL1" --env "KEY2=VAL2" --podCount 10
```

This will create up to 10 pods on 3070 and 3080 GPUs that will run a bash command and then terminate themselves automatically when the bash command is done running.

If you want to clean your pods up manually, you can run:

```
runpodctl remove pods my-bulk-task --podCount 40
```

This command will terminate up to 40 pods with the name "my-bulk-task".
