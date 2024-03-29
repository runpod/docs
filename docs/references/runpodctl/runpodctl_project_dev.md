---
title: "Project Dev"
---

## runpodctl project dev

starts a development session for the current project

### Synopsis

connects your local environment and the project environment on your Pod. Changes propagate to the project environment in real time.

```
runpodctl project dev [flags]
```

### Options

```
-h, --help              help for dev
    --prefix-pod-logs   prefix logs from project Pod with Pod ID (default true)
    --select-volume     select a new default network volume for current project
```

### SEE ALSO

- [runpodctl project](runpodctl_project.md) - Manage RunPod projects
