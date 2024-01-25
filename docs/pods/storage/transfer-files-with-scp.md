---
title: "Transfer files with SCP"
sidebar_position: 9
---

## Prerequisites

:::note

Your local machine must be running Linux or a [WSL instance](https://learn.microsoft.com/en-us/windows/wsl/about) in order to use rsync.
:::

1. Make sure your Pod is configured to use real SSH. Refer to [this guide](https://docs.runpod.io/docs/use-real-ssh) for assistance.
2. If you intend to use rsync, make sure it's installed on both your local machine and your Pod with `apt install rsync`.

![](/img/docs/ae0ee09-image.png)

![](/img/docs/d00988d-image.png)

1. Note the public IP address and external port from the SSH over exposed TCP command (you'll need these for the SCP/rsync commands).

![](/img/docs/c099425-image.png)

## Transferring with SCP

The general syntax for sending files to a Pod with SCP is as follows (execute this on your local machine, and replace the x's with your Pod's external TCP port and IP; for this example, they are 43201 and 194.26.196.6, respectively):

```shell
scp -P xxxxx -i ~/.ssh/id_ed25519 /local/file/path root@xxx.xxx.xxx.xxx:/destination/file/path
```

:::note

If your private key file is in a location other than `~/.ssh/id_ed25519` or you're using the Windows Command Prompt, make sure you update this path accordingly in your command.

:::

![](/img/docs/1e471f2-3.png)

If you want to receive a file from your Pod, switch the source and destination arguments:

![](/img/docs/51e282a-4.png)

If you need to transfer a directory, use the `-r` flag to recursively copy files and subdirectories (this will follow any symbolic links encountered as well):

![](/img/docs/47d5c1c-5.png)

## Transferring with rsync

The general syntax for sending files to a Pod with rsync is as follows (execute this on your local machine, and replace the x's with your Pod's external TCP port and IP):

```shell
rsync -e "ssh -p xxxxx" /source/file/path root@xxx.xxx.xxx.xxx:/destination/file/path
```

Some helpful flags include:

`-a`/`--archive` - archive mode (ensures that permissions, timestamps, and other attributes are preserved during the transfer; use this when transferring directories or their contents)

`-d`/`--delete` - deletes files in the destination directory that are not present in the source

`-p`/`--progress` - displays file transfer progress

`-v`/`--verbose` - verbose output

`-z`/`--compress` - compresses data as it's being sent and uncompresses as it's received (heavier on your CPU, but easier on your network connection)

![](/img/docs/b7e7dd5-6.png)

If you want to receive a file from your Pod, switch the source and destination arguments:

![](/img/docs/4867182-7.png)

To transfer the contents of a directory (without transferring the directory itself), use a trailing slash in the file path:

![](/img/docs/ec221c3-image.png)

![](/img/docs/28a2134-image.png)

Without a trailing slash, the directory itself is transferred:

![](/img/docs/ec31ef2-image.png)

![](/img/docs/effbe45-image.png)

An advantage of rsync is that files that already exist at the destination aren't transferred again if you attempt to copy them twice (note the minimal data transfer after the second execution):
