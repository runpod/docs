---
title: "FAQ"
description: "RunPod offers two cloud computing services: Secure Cloud and Community Cloud. Secure Cloud provides high-reliability, while Community Cloud offers peer-to-peer GPU computing. On-Demand Pods run continuously, while Spot Pods use spare compute capacity."
---

## Secure Cloud vs Community Cloud

RunPod provides two cloud computing services: [Secure Cloud](https://www.runpod.io/console/gpu-secure-cloud) and [Community Cloud.](https://www.runpod.io/console/gpu-cloud)

**Secure Cloud** runs in T3/T4 data centers by our trusted partners. Our close partnership comes with high-reliability with redundancy, security, and fast response times to mitigate any downtimes. For any sensitive and enterprise workloads, we highly recommend Secure Cloud.

**Community Cloud** brings power in numbers and diversity spanning the whole world. Through our decentralized platform, we can offer peer-to-peer GPU computing that connects individual compute providers to compute consumers. Our Community Cloud hosts are invite-only and vetted by us, and still have to abide by our standards. Even though their associated infrastructure might not offer as much redundancy for power and networking, they still offer good servers that combine quality and affordability.

Both solutions offer far more competitive prices than large cloud providers such as AWS or GCP.

## On-Demand vs. Spot Pod

**On-Demand Pods** can run forever without interruptions with resources dedicated to your Pod. They do incur higher costs than Spot Pods.

**Spot Pods** use spare compute capacity, allowing you to bid for those compute resources. Resources are dedicated to your Pod, but someone else can bid higher or start an On-Demand Pod that will stop your Pod. When this happens, your Pod is given a signal to stop 5 seconds prior with SIGTERM, and eventually, the kill signal SIGKILL after 5 seconds. You can use volumes to save any data to the disk in that 5s period or push data to the cloud periodically.

### How does RunPod work?

RunPod leverages technologies like [Docker](https://www.docker.com/) to containerize and isolate guest workloads on a host machine. We have built a decentralized platform where thousands of servers can be connected to offer a seamless experience for all users.

### Where can I go for help?

We'd be happy to help! Join our community on [Discord](https://discord.gg/pJ3P2DbUUq), message us in our support chat, or email us at [help@runpod.io](mailto:help@runpod.io).

### What is RunPod's policy on refunds and credits?

If you aren't sure if RunPod is for you, feel free to hang out in our [Discord](https://discord.gg/cUpRmau42V) to ask questions or email [help@runpod.io](mailto:help@runpod.io) You can load as little as $10 into your account to try things out. We don't currently offer refunds or trial credits due to the overhead of processing these requests. Please plan accordingly!

## What are Pods?

---

### What is an On-Demand instance?

**On-Demand instances** are for non-interruptible workloads.
You pay the On-Demand price and cannot be displaced by other users if you have funds to keep your Pod running.

### What is a Spot instance?

A **Spot instance** is an interruptible instance that can generally be rented much cheaper than an On-Demand one.
Spot instances are great for stateless workloads like an API or for workloads you can periodically save to a volume disk.
Your volume disk is retained even if your Spot instance is interrupted.

### What is a Savings Plan?

Savings Plans are a way for you to pay up-front and get a discount for it.
This is great for when you know you will need prolonged access to compute.
You can learn more on the about [Savings Plans here](/pods/savings-plans).

## Billing

All billing, including per-hour compute and storage billing, is charged per minute.

### How does Pod billing work?

Every Pod has an hourly cost based on GPU type. Your RunPod credits are charged for the Pod every minute as long as the Pod is running. If you ever run out of credits, your Pods will be automatically stopped, and you will get an email notification. Eventually, Pods will be terminated if you don't refill your credit. **We pre-emptively stop all of your Pods if you get down to 10 minutes of remaining run time. This gives your account enough balance to keep your data volumes around in the case you need access to your data. Please plan accordingly.**

Once a balance has been completely drained, all pods are subject to deletion at the discretion of the service.
An attempt will be made to hold the pods for as long as possible, but this should not be relied upon!
We highly recommend setting up [automatic payments](https://www.runpod.io/console/user/billing) to ensure balances are automatically topped up as needed.

:::note

You must have at least one hour's worth of time in your balance to rent a Pod at your given spec.
If your balance is insufficient to rent a Pod, then consider renting the Pod on Spot, depositing additional funds, or lowering your GPU spec requirements.

:::

### How does storage billing work?

We currently charge $0.10 GB per month for all storage on running Pods and $0.20 GB per month for volume storage on stopped Pods.
Storage is tied to compute servers, and we want to ensure active users have enough space to run their workloads.
Storage is charged per minute, and we never charge users if the host machine is down or unavailable from the public internet.

### How does Network Volume billing work?

For storage requirements below 1TB, we charge a competitive rate of $0.07/GB/Month. If your storage requirements exceed 1TB, we provide a cost-effective pricing of $0.05/GB/Month. This ensures that you receive significant savings as your data storage scales.

When you choose to create a Network Volume, you gain access to our robust infrastructure, which includes state-of-the-art storage servers located in the same datacenters where you rent GPU servers from us. These servers are connected via a high-speed 25Gbps local network, up to 200 Gbps in some locations, guaranteeing efficient data transfer and minimal latency. Everything is stored on high-speed NVME SSDs to ensure best performance.

Network volumes are billed on a per-hour basis. Please note that if your machine-based storage or network volume is terminated due to lack of funds, that disk space is immediately freed up for use by other clients, and RunPod is unable to assist in recovering lost storage.
RunPod is also not designed to be a cloud storage system; storage is provided in the pursuit of running tasks using its GPUs, and not meant to be a long-term backup solution.
It is highly advisable to continually back up anything you want to save offsite locally or to a cloud provider.

### Can I withdraw my unused balance?

No, RunPod does not offer the option to withdraw your unused balance after depositing funds into your account. When you add funds to your RunPod account, these credits are non-refundable and can only be used for RunPod services.

:::important

When depositing funds into your RunPod account, please be aware that you cannot withdraw your balance once it has been added. Only deposit the amount you intend to use for RunPod services.

:::

We recommend carefully considering the amount you wish to deposit based on your expected usage of our services. If you have any questions about billing or need assistance in planning your RunPod expenses, please don't hesitate to contact our support team at [help@runpod.io](mailto:help@runpod.io).

## Security

---

### Is my data protected from other clients?

Yes. Your data is run in a multi-tenant environment where other clients can't access your pod. For sensitive workloads requiring the best security, please use Secure Cloud.

### Is my data protected from the host of the machine my Pod is running on?

Data privacy is important to us at RunPod.
Our Terms of Service prohibit hosts from trying to inspect your Pod data or usage patterns in any way.
If you want the highest level of security, use Secure Cloud.

## Usability

---

### What can I do in a RunPod Pod?

You can run any Docker container available on any publicly reachable container registry. If you are not well versed in containers, we recommend sticking with the default run templates like our RunPod PyTorch template. However, if you know what you are doing, you can do a lot more!

### Can I run my own Docker daemon on RunPod?

You can't currently spin up your own instance of Docker, as we run Docker for you! Unfortunately, this means that you cannot currently build Docker containers on RunPod or use things like Docker Compose. Many use cases can be solved by creating a custom template with the Docker image that you want to run.

### My Pod is stuck on initializing. What gives?

Usually, this happens for one of several reasons. If you can't figure it out, [contact us](https://www.runpod.io/contact), and we'll gladly help you.

1. You are trying to run a Pod to SSH into, but you did not give the Pod an idle job to run like "sleep infinity."
2. You have given your Pod a command that it doesn't know how to run. Check the logs to make sure that you don't have any syntax errors, etc.

### Can I run Windows?

We don't currently support Windows.
We want to do this in the future, but we do not have a solid timeframe for Windows support.

### How do I find a reliable server in Community Cloud?

RunPod needs to provide you with reliable servers. All of our listed servers must meet minimum reliability, and most are running in a data center! However, if you want the highest level of reliability and security, use Secure Cloud. RunPod calculates server reliability by maintaining a heartbeat with each server in real-time.

### Why do I have zero GPUs assigned to my Pod?

If you want to avoid this, using network volumes is the best choice. [Read about it here.](https://blog.runpod.io/four-reasons-to-set-up-a/)

[Learn how to use them here](https://docs.runpod.io/pods/storage/create-network-volumes).

Most of our machines have between 4 and 8 GPUs per physical machine. When you start a Pod, it is locked to a specific physical machine. If you keep it running (On-Demand), then that GPU cannot be taken from you. However, if you stop your Pod, it becomes available for a different user to rent. When you want to start your Pod again, your specific machine may be wholly occupied! In this case, we give you the option to spin up your Pod with zero GPUs so you can retain access to your data.

Remember that this does not mean there are no more GPUs of that type available, just none on the physical machine that specific Pod is locked to. Note that transfer Pods have limited computing capabilities, so transferring files using a UI may be difficult, and you may need to resort to terminal access or cloud sync options.

#### What are Network Volumes?

Network volumes allow you to share data between Pods and generally be more mobile with your important data. This feature is only available in specific secure cloud data centers, but we are actively rolling it out to more and more of our secure cloud footprint. If you use network volumes, you should rarely run into situations where you cannot use your data with a GPU without a file transfer!

[Read about it here](https://blog.runpod.io/four-reasons-to-set-up-a/).

## What if?

---

### What if I run out of funds?

All your Pods are stopped automatically when you don't have enough funds to keep your Pods running for at least ten more minutes. When your Pods are stopped, your container disk data will be lost, but your volume data will be preserved. Pods are scheduled for removal if adequate credit balance is not maintained. If you fail to do so, your Pods will be terminated, and Pod volumes will be removed.

After you add more funds to your account, you can start your Pod if you wish (assuming enough GPUs are available on the host machine).

### What if the machine that my Pod is running loses power?

If the host machine loses power, it will attempt to start your Pod again when it returns online. Your volume data will be preserved, and your container will run the same command as it ran the first time you started renting it. Your container disk and anything in memory will be lost!

### What if my Pod loses internet connectivity?

The host machine continues to run your Pod to the best of its ability, even if it is not connected to the internet. If your job requires internet connectivity, then it will not function. You will not be charged if the host loses internet connectivity, even if it continues to run your job. You may, of course, request that your Pod exit while the host is offline, and it will exit your Pod when it regains network connectivity.

### What if it says that my spending limit has been exceeded?

We implement a spending limit for newer accounts that will grow over time. This is because we have found that sometimes scammers try to interfere with the natural workings of the platform. We believe that this limit should not impact normal usage. We would be delighted to up your spending limit if you [contact us](https://www.runpod.io/contact) and share your use case.

## Legal

---

### Do you have some legal stuff I can look at?

Sure, do! Take a look at our [legal page](https://www.runpod.io/legal).

## GDPR Compliance

At Runpod, we take data protection and privacy seriously.
We have implemented robust policies, procedures, and technical measures to ensure compliance with the GDPR requirements.

### Is RunPod compliant with GDPR for data processed in Europe?

Yes, RunPod is fully compliant with the General Data Protection Regulation (GDPR) requirements for any data processed within our European data center regions.

### What measures does RunPod take to ensure GDPR compliance?

For servers hosted in GDPR-compliant regions like the European Union, we ensure:

- **Data processing procedures**: We have established clear procedures for the collection,
  storage, processing, and deletion of personal data, ensuring transparency and accountability in
  our data processing activities.
- **Data protection measures**: We have implemented appropriate technical and organizational
  measures to safeguard personal data against unauthorized access, disclosure, alteration, and
  destruction.
- **Consent mechanisms**: We obtain and record consent from individuals for the processing of
  their personal data in accordance with GDPR requirements, and we provide mechanisms for
  individuals to withdraw consent if desired.
- **Rights of data subjects**: We facilitate the rights of data subjects under the GDPR, including
  the right to access, rectify, erase, or restrict the processing of their personal data, and we handle
  data subject requests promptly and efficiently.
- **Data transfer mechanisms**: We ensure lawful and secure transfer of personal data outside the
  EU, where applicable, in compliance with GDPR requirements, utilizing appropriate mechanisms
  such as adequacy decisions, standard contractual clauses, or binding corporate rules.
- **Compliance monitoring**: We regularly monitor and review our GDPR compliance to ensure
  ongoing effectiveness and adherence to regulatory requirements, conducting data protection
  impact assessments and internal audits as needed.

For any inquiries or concerns regarding our GDPR compliance or our data protection practices, reach out to our team through email at [help@runpod.io](mailto:help@runpod.io).
