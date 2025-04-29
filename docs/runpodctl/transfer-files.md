---
title: Transfer files
sidebar_position: 4
---

# Transfer files with runpodctl

The RunPod CLI provides simple commands for transferring data between Pods, or between your local machine and a Pod. It uses one-time codes for secure authentication, so **no API keys are required**.

## Send a file

To send a file from the source machine (i.e. a Pod you've deployed or your local machine), run this command, replacing `YOUR_FILE` with the file you want to send:

```bash
runpodctl send [YOUR_FILE]
```

You should see output similar to this:

```bash
Sending '[YOUR_FILE]' (5 B)
Code is: 8338-galileo-collect-fidel
On the other computer run

runpodctl receive 8338-galileo-collect-fidel
```

`8338-galileo-collect-fidel` is the **one-time code** that you would use on the destination machine (your code will be different).

## Receive a file

Run the command outputted by the send command on the destination machine to receive a file, for example:

```bash
runpodctl receive 8338-galileo-collect-fidel
```

You should see output similar to this:

```bash
Receiving '[YOUR_FILE]' (5 B)

Receiving (<-149.36.0.243:8692)
data.txt 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

## Transfer files between Google Drive and RunPod

You can also transfer files between a Pod and Google Drive using Google Colab:

- [Send](https://colab.research.google.com/drive/1UaODD9iGswnKF7SZfsvwHDGWWwLziOsr#scrollTo=2nlcIAY3gGLt)
- [Receive](https://colab.research.google.com/drive/1ot8pODgystx1D6_zvsALDSvjACBF1cj6#scrollTo=RF1bMqhBOpSZ)
