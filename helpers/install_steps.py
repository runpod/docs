install_steps = """
You can use RunPod's CLI [runpodctl](https://github.com/runpod/runpodctl) to manage Pods.

The runpodctl is a tool for managing your GPU pods on RunPod.
All Pods come with `runpodctl` installed with a Pod-scoped API key, which makes managing your Pods easier through the command line.

Choose one of the following methods to install the RunPod CLI.

### MacOs

**ARM**

```bash
wget --quiet --show-progress https://github.com/runpod/runpodctl/releases/download/v1.10.0/runpodctl-darwin-arm -O runpodctl && chmod +x runpodctl && sudo mv runpodctl /usr/local/bin/runpodctl
```


**AMD**

```bash
wget --quiet --show-progress https://github.com/runpod/runpodctl/releases/download/v1.10.0/runpodctl-darwin-amd -O runpodctl && chmod +x runpodctl && sudo mv runpodctl /usr/local/bin/runpodctl
```

### Linux

```bash
wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.10.0/runpodctl-linux-amd -O runpodctl && chmod +x runpodctl && sudo cp runpodctl /usr/bin/runpodctl
```

### Windows (powershell)

```bash
wget https://github.com/runpod/runpodctl/releases/download/v1.10.0/runpodctl-win-amd -O runpodctl.exe
```

### Google Collab

```bash
!wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.10.0/runpodctl-linux-amd -O runpodctl
!chmod +x runpodctl
!cp runpodctl /usr/bin/runpodctl
```

###  Jupyter notebook

```bash
!wget --quiet --show-progress https://github.com/Run-Pod/runpodctl/releases/download/v1.10.0/runpodctl-linux-amd -O runpodctl
!chmod +x runpodctl
!cp runpodctl /usr/bin/runpodctl
```

"""
