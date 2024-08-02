---
title: "Storage Full"
id: "storage-full"
description: "This document provides guidance to troubleshoot the storage full, which may occur when users generate many files, transfer files, or perform other storage-intensive tasks."
---

Storage full can occur when users generate many files, transfer files, or perform other storage-intensive tasks. This document provides guidance to help you troubleshoot this.

## Check Disk Usage

When encountering a storage full, the first step is to check your container’s disk usage. You can use the `df -h` command to display a summary of disk usage.

```bash
df -h
```

Example output:

```bash
root@9b8e325167b2:/# df -h
Filesystem                    Size  Used Avail Use% Mounted on
overlay                        20G   16M   20G   1% /
tmpfs                          64M     0   64M   0% /dev
tmpfs                         252G     0  252G   0% /sys/fs/cgroup
shm                            24G     0   24G   0% /dev/shm
/dev/sda2                     457G   12G  423G   3% /usr/bin/nvidia-smi
tmpfs                         252G   12K  252G   1% /proc/driver/nvidia
tmpfs                         252G  4.0K  252G   1% /etc/nvidia/nvidia-application-profiles-rc.d
tmpfs                          51G  4.4M   51G   1% /run/nvidia-persistenced/socket
tmpfs                         252G     0  252G   0% /proc/asound
tmpfs                         252G     0  252G   0% /proc/acpi
tmpfs                         252G     0  252G   0% /proc/scsi
tmpfs                         252G     0  252G   0% /sys/firmware
tmpfs                         252G     0  252G   0% /sys/devices/virtual/powercap
```

## Key Areas to Check

**Container Disk Usage**: The primary storage area for your container is mounted on the `overlay` filesystem. This indicates the container’s root directory.

```bash
Filesystem                    Size  Used Avail Use% Mounted on
overlay                        20G   16M   20G   1% /
```

You can use the command `du -sh .` to check the space usage of the current directory. The default volume of container volume or network volume is mounted at `/workspace`, You can check the usage with the following example::

```bash
root@9b8e325167b2:/# cd workspace/
root@9b8e325167b2:/workspace# du -sh .
194M    .
```

**Identifying Large Files**: To identify the top 10 largest files in your `/workspace`, you can run the following command:

```bash
root@9b8e325167b2:/# find /workspace -type f -exec du -h {} + | sort -rh | head -n 10
96M     /workspace/f.txt
96M     /workspace/e.txt
1.0K    /workspace/c.txt
512     /workspace/b.txt
512     /workspace/a.txt
```

## Removing Files and Directories

Once you’ve identified large files or directories that are no longer needed, you can remove them to free up space.

:::warning
This will permanently delete the file, folder. Use with caution.
:::

```bash
# To delete a specific file, use the rm command:
rm /path/to/file

# To remove an entire directory and its contents, use the rm -r command:
rm -r /path/to/directory
```
