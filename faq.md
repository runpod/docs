---
description: General questions about RunPod and its services.
---

# FAQ

### **Secure Cloud vs Community Cloud**

RunPod provides two cloud computing services: **Secure Cloud** and **Community Cloud**.

**Secure Cloud** runs in T4 data centers by our trusted partners. Our close partnership comes with high-reliability w/ redundancy, security, and fast response times to mitigate any downtimes. For any sensitive and enterprise workloads, we highly recommend Secure Cloud.

**Community Cloud** brings power in numbers and diversity spanning the whole world. Through our decentralized platform, we can offer peer-to-peer GPU computing that connects individual compute providers to compute consumers. Our Community Cloud hosts are invite-only and vetted by us.

Both solutions offer far more competitive prices than large cloud providers such as AWS or GCP.

### On-Demand vs. Spot Pod

**OnDemand** pods can run forever without interruptions with resources dedicated to your pod. They do incur higher costs than **Spot** pods.

**Spot** pods use spare compute capacity and allow you to bid for those compute resources. Resources are dedicated to your pod, but someone else can bid higher or start an **OnDemand** pod that will stop your pod. When this happens, your pod is given 5 seconds to stop with _SIGTERM_ and eventually _SIGKILL_ after 5 seconds. You can use volumes to save any data to the disk in that 5s period or push data to the cloud periodically.

<details>

<summary>How does RunPod work?</summary>

RunPod leverages technologies like docker to containerize and isolate guest workloads on a host machine. We have built a decentralized platform where 1000s of servers can be connected to offer a seamless experience for all users.

</details>

<details>

<summary><strong>Where can I go for help?</strong></summary>

We'd be happy to help! Join our community on [discord](https://discord.gg/pJ3P2DbUUq), message us in our support chat, or email us at support@runpod.io

</details>

### Refunds and Credits

If you aren't sure if RunPod is for you, feel free to hang out in our [Discord](https://discord.gg/cUpRmau42V) to ask questions or shoot an email to [support@runpod.io](mailto:support@runpod.io). You can load as little as $10 into your account to start trying things out. We don't currently offer refunds or trial credits due to the overhead of processing these types of requests. Please plan accordingly!

## Pods

<details>

<summary><strong>What is an on-demand instance?</strong></summary>

A - On-demand instances are for non-interruptible workloads. You pay the on-demand price and cannot be displaced by other users as long as you have funds to keep your pod running.

</details>

<details>

<summary><strong>What is a spot instance?</strong></summary>

A spot instance is an interruptible instance that can generally be rented for much cheaper than an on-demand instance**.** Spot instances are great for stateless workloads like an API, or for workloads that you can periodically save to a volume disk. Your volume disk is retained even if your spot instance is interrupted.

</details>

## Billing

All billing, including per-hour compute and storage billing, is charged per minute.

<details>

<summary>How does Pod billing work?</summary>

Every pod has an hourly cost based on GPU type. You are charged for the pod every minute as long as the pod is running. The charge is against your RunPod credits. If you ever run out of credits, your pods will be automatically stopped, and you will get an email notification. Eventually, pods will be terminated if you don't refill your credit.

</details>

<details>

<summary>How does storage billing work?</summary>

We currently charge $0.1/GB/month for all storage on running pods and $0.2/GB/month for volume storage on stopped pods. Storage is tied to compute servers, and we want to ensure active users have enough space to run their workloads. Storage is charged per minute, and we never charge users if the host machine is down or unavailable from the public internet.

</details>

## Security

<details>

<summary>Is my data protected from other clients?</summary>

Yes. Your data is run in a multi-tenant environment where other clients do not have the ability to access your pod. For sensitive workloads requiring the best security, please use **Secure Cloud**.

</details>

<details>

<summary>Is my data protected from the host of the machine that my pod is running on?</summary>

Data privacy is important to us at RunPod. Our terms of service prohibit hosts from trying to inspect your pod data or usage patterns in any way. If you want the highest level of security, use Secure Cloud.

</details>

## Usability

<details>

<summary>What can I do in a RunPod pod?</summary>

You can run any docker container available on any publicly reachable container registry. If you are not well versed in containers, we recommend sticking with the default run templates like our RunPod PyTorch template. However, if you know what you are doing, you can do a lot more!

</details>

<details>

<summary>Can I run my own Docker daemon on RunPod?</summary>

You can't currently spin up your own instance of docker, as we run Docker for you! This unfortunately does mean that you cannot currently build docker containers on runpod or use things like docker compose. Many use cases can be solved by creating a custom template with the docker image that you want to run.

</details>

<details>

<summary>My pod is stuck on initializing? What gives?</summary>

Usually, this happens for one of several reasons. If you can't figure it out, contact us, and we'll be happy to help you.

1. You are trying to run a pod to SSH into, but you did not give the pod an idle job to run like "sleep infinity."
2. You have given your pod a command that it doesn't know how to run. Check the logs to make sure that you don't have any syntax errors, etc.

</details>

<details>

<summary>Can I run Windows?</summary>

We don't currently support windows. We want to do this in the future, but we do not have a solid timeframe for windows support.

</details>

<details>

<summary>How do I find a reliable server in Community Cloud?</summary>

It is important for RunPod to provide you with reliable servers. All of our listed servers must meet minimum reliability, and most are running in a data center! However, if you want the highest level of reliability and security, use Secure Cloud. RunPod calculates server reliability by maintaining a heartbeat with each server in real-time.

</details>

<details>

<summary><strong>Why do I have 0 GPU assigned to my pod?</strong></summary>

Most of our machines have between 4 and 8 GPUs per physical machine. When you start a pod, it is locked to a specific physical machine. If you keep it running (on-demand), then that GPU cannot be taken from you. However, if you stop your pod, it becomes available for a different user to rent. When you want to start your pod again, your specific machine may be wholly occupied! In this case, we give you the option to spin up your pod with 0 GPUs so you can retain access to your data.

Remember that this does not mean there are no more GPUs of that type available, just none on the physical machine that specific pod is locked to. We know this isn't ideal, but please bear with us until we develop some better solutions. Note that transfer pods have limited computing capabilities, so transferring files using a UI may be difficult, and you may need to resort to terminal access or cloud sync options.

</details>

## What if?

<details>

<summary>What if I run out of funds?</summary>

All your pods are stopped automatically when you don't have enough funds to keep your pods running for at least ten more minutes. When your pods are stopped, your container disk data will be lost, but your volume data will be preserved. You will have two days to add more funds. If you fail to do so, your pods will be terminated, and pod volumes will be removed.

After you add more funds to your account, you can start your pod if you wish (assuming enough GPUs are available on the host machine).

</details>

<details>

<summary>What if the machine that my pod is running on loses power?</summary>

If the host machine loses power, it will attempt to start your pod again when it returns online. Your volume data will be preserved, and your container will run the same command as it ran the first time you started renting it. Your container disk and anything in memory will be lost!

</details>

<details>

<summary>What if my pod loses internet connectivity?</summary>

The host machine will continue to run your pod to the best of its ability, even if it is not connected to the internet. If your job requires internet connectivity, then it will not function. You will **not** be charged if the host loses internet connectivity, even if it continues to run your job. You may, of course, request that your pod exit while the host is offline, and it will exit your pod when it regains network connectivity.

</details>

<details>

<summary>What if it says that my spending limit has been exceeded?</summary>

We implement a spending limit for newer accounts that will grow over time. This is because we have found that sometimes scammers try to interfere with the natural workings of the platform. We believe that this limit should not impact normal usage. We would be delighted to up your spending limit if you contact us and share your use case.

</details>

## Legal

<details>

<summary>Do you have some legal stuff I can look at?</summary>

Sure do! Take a look at our [legal page](https://www.runpod.io/legal).

</details>
