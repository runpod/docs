---
title: "Create a Network Volume"
slug: "create-a-network-volume"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Mon Apr 24 2023 17:28:28 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Mon Nov 06 2023 04:52:33 GMT+0000 (Coordinated Universal Time)"
---

Network Volumes are a feature specific to Secure Cloud that allows you to create a volume that multiple pods can interact with. This gives you an extra amount of flexibility to keep working--especially if you are working with a high demand GPU pool that may not always be available--as you can simply create a pod in a different pool while you wait for an option to free up. This can also save you time by downloading frequently used models or other large files to a volume and holding them for later use, rather than having to re-download them every time you spin up a new pod.

**How to Create a Volume**

Under the Secure Cloud page, click the option to create a volume.

![](https://files.readme.io/797cfdc-image.png)

The pricing for the volume will be shown, and you can select a data center and provide a name and the requested size.

![](https://files.readme.io/596a4f5-image.png)

Once you create the volume, it will appear in your list.

![](https://files.readme.io/c4eea31-image.png)

Once you click the Deploy option, your container size will be locked to the size of your network volume. Note that there will be a nominal cost for network volume storage, in lieu of the disk cost normally quoted. Also note that you can link many pods to one singular network volume, and you will enjoy an overall cost saving even with just two pods sharing one volume (as opposed to setting up two pods with separate volumes), despite the presence of this additional cost.

![](https://files.readme.io/8f69d41-image.png)

**What's the infrastructure behind Network Volume**

When you choose to create a Network Volume, you gain access to our robust infrastructure, which includes state-of-the-art storage servers located in the same datacenters where you rent GPU servers from us. These servers are connected via a high-speed 25Gbps local network, up to 200Gbps in some locations, guaranteeing efficient data transfer and minimal latency. Everything is stored on high-speed NVME SSDs to ensure best performance.

If you're interested in harnessing the advantages of Network Volume and its cost-effective storage solutions, we invite you to read our detailed [blog article](https://blog.runpod.io/four-reasons-to-set-up-a/). It explores the benefits and features of Network Volume, helping you make an informed decision about your storage needs.

**Please note that if your machine-based storage or network volume is terminated due to lack of funds, that disk space is immediately freed up for use by other clients, and RunPod is unable to assist in recovering lost storage.**
