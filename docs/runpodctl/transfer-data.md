---
title: Transfer data
sidebar_position: 4
---

# Transfer data with runpodctl

The RunPod CLI provides simple commands for transferring data between Pods or between your machine and a Pod. It uses one-time codes for secure authentication, so **no API keys are required**.

## Send a File

Send a file from the source machine:

```bash
runpodctl send data.txt
```

Example output:

```bash
Sending 'data.txt' (5 B)
Code is: 8338-galileo-collect-fidel
On the other computer run

runpodctl receive 8338-galileo-collect-fidel
```

## Receive a file

Receive a file on the destination machine:

```bash
runpodctl receive 8338-galileo-collect-fidel
```

Example output:

```bash
Receiving 'data.txt' (5 B)

Receiving (<-149.36.0.243:8692)
data.txt 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

## Transfer files between Google Drive and RunPod

You can also transfer files between a Pod and Google Drive using Google Colab:

- [Send](https://colab.research.google.com/drive/1UaODD9iGswnKF7SZfsvwHDGWWwLziOsr#scrollTo=2nlcIAY3gGLt)
- [Receive](https://colab.research.google.com/drive/1ot8pODgystx1D6_zvsALDSvjACBF1cj6#scrollTo=RF1bMqhBOpSZ)