---
title: "Transfer files"
sidebar_position: 9
description: "Transfer files to and from your Pod using runpotctl, SCP and rsync commands. Prerequisites include a Linux or WSL instance, runpotctl installed, SSH configured, and rsync installed. Follow syntax guides for secure file transfer and option flags for customization."
---

Learn to transfer files to and from RunPod.

## Prerequisites

- If you intend to use `runpodctl`, make sure it's installed on your machine, see [install runpodctl](/runpodctl/install-runpodctl)

- If you intend to use `scp`, make sure your Pod is configured to use real SSH.
  For more information, see [use SSH](/pods/configuration/use-ssh).

- If you intend to use `rsync`, make sure it's installed on both your local machine and your Pod with `apt install rsync`.

- Note the public IP address and external port from the SSH over exposed TCP command (you'll need these for the SCP/rsync commands).

## Transferring with [runpodctl](/runpodctl/overview#data-transfer)

The RunPod CLI (runpodctl) provides simple commands for transferring data between your machine and RunPod. **It’s preinstalled on all RunPod Pods** and uses one-time codes for secure authentication, so no API keys are required.

#### Sending a File

To send a file from source machine:

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

#### Receiving a File

To receive a file on destination machine:

```bash
runpodctl receive 8338-galileo-collect-fidel
```

Example output:

```bash
Receiving 'data.txt' (5 B)

Receiving (<-149.36.0.243:8692)
data.txt 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

## Transferring with SCP

The general syntax for sending files to a Pod with SCP is as follows (execute this on your local machine, and replace the x's with your Pod's external TCP port and IP; for this example, they are 43201 and 194.26.196.6, respectively):

```shell
scp -P 43201 -i ~/.ssh/id_ed25519 /local/file/path root@194.26.196.6:/destination/file/path
```

:::note

If your private key file is in a location other than `~/.ssh/id_ed25519` or you're using the Windows Command Prompt, make sure you update this path accordingly in your command.

:::

Example of sending a file to a Pod:

```shell
scp -P 43201 -i ~/.ssh/id_ed25519 ~/documents/example.txt root@194.26.196.6:/root/example.txt
```

If you want to receive a file from your Pod, switch the source and destination arguments:

```shell
scp -P 43201 -i ~/.ssh/id_ed25519 root@194.26.196.6:/root/example.txt ~/documents/example.txt
```

If you need to transfer a directory, use the `-r` flag to recursively copy files and subdirectories (this will follow any symbolic links encountered as well):

```shell
scp -r -P 43201 -i ~/.ssh/id_ed25519 ~/documents/example_dir root@194.26.196.6:/root/example_dir
```

## Transferring with rsync

:::note

Your local machine must be running Linux or a [WSL instance](https://learn.microsoft.com/en-us/windows/wsl/about) in order to use rsync.

:::

The general syntax for sending files to a Pod with rsync is as follows (execute this on your local machine, and replace the x's with your Pod's external TCP port and IP):

```shell
rsync -e "ssh -p 43201" /source/file/path root@194.26.196.6:/destination/file/path
```

Some helpful flags include:

- `-a`/`--archive` - archive mode (ensures that permissions, timestamps, and other attributes are preserved during the transfer; use this when transferring directories or their contents)
- `-d`/`--delete` - deletes files in the destination directory that are not present in the source
- `-p`/`--progress` - displays file transfer progress
- `-v`/`--verbose` - verbose output
- `-z`/`--compress` - compresses data as it's being sent and uncompresses as it's received (heavier on your CPU, but easier on your network connection)

Example of sending a file to a Pod using rsync:

```shell
rsync -avz -e "ssh -p 43201" ~/documents/example.txt root@194.26.196.6:/root/example.txt
```

If you want to receive a file from your Pod, switch the source and destination arguments:

```shell
rsync -avz -e "ssh -p 43201" root@194.26.196.6:/root/example.txt ~/documents/example.txt
```

To transfer the contents of a directory (without transferring the directory itself), use a trailing slash in the file path:

```shell
rsync -avz -e "ssh -p 43201" ~/documents/example_dir/ root@194.26.196.6:/root/example_dir/
```

Without a trailing slash, the directory itself is transferred:

```shell
rsync -avz -e "ssh -p 43201" ~/documents/example_dir root@194.26.196.6:/root/
```

An advantage of rsync is that files that already exist at the destination aren't transferred again if you attempt to copy them twice (note the minimal data transfer after the second execution):

```shell
rsync -avz -e "ssh -p 43201" ~/documents/example.txt root@194.26.196.6:/root/example.txt
sending incremental file list
example.txt
             119 100%    0.00kB/s    0:00:00 (xfr#1, to-chk=0/1)

sent 243 bytes  received 35 bytes  185.33 bytes/sec
total size is 119  speedup is 0.43

$ rsync -avz -e "ssh -p 43201" ~/documents/example.txt root@194.26.196.6:/root/example.txt
sending incremental file list

sent 120 bytes  received 12 bytes  88.00 bytes/sec
total size is 119  speedup is 0.90
```

## Sync a volume to a cloud provider

You can sync your volume to a cloud provider by clicking the **Cloud Sync** option under your **My Pods** page, For detailed instructions on connecting to AWS S3, Google Cloud Storage, Azure, Backblaze, Dropbox, and configuring these services, please refer to this [configuration guide](/pods/configuration/export-data).
