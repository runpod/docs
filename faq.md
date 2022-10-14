---
description: General questions about RunPod and its services.
---

# FAQ

### **What is Secure Cloud or Community Cloud?**

RunPod provides two cloud compute services: **Secure Cloud** and **Community Cloud**.

**Secure Cloud** runs in T4 data centers by our trusted partners. Our close partnership comes with high reliability w/ redundancy, security, and fast response times to mitigate any downtimes. For any sensitive and enterprise workloads, we highly recommend Secure Cloud.

**Community Cloud** brings power in numbers and diversity spanning the whole world. Through our decentralized platform, we are able to offer peer-to-peer gpu compute that connects individual compute providers to compute consumers. Our Community Cloud hosts are invite-only and vetted by us.

Both solutions offer prices that are far more competitive than large cloud providers such as AWS or GCP.

#### **How does RunPod work?**

RunPod leverages technologies such as docker to containerize and isolate guest workloads on a host machine. We have built a decentralized platform where 1000s of servers can be connected to offer a seamless experience for all users.

#### **Where can I go for help?**

We'd be happy to help! Join our community on [discord](https://discord.gg/pJ3P2DbUUq), message us in our support chat, or send us an email at support@runpod.io!



### Pods

#### **What is an on-demand instance?**&#x20;

On-demand instances are for non-interruptible workloads. You pay the on-demand price and cannot be displaced by other users as long as long as you have funds to keep your pod running.

#### **What is a spot instance?**

A spot instance is an interruptible instance that can generally be rented for much cheaper than an on-demand instance**.** Spot instances are great for workloads that are stateless like an API, or for workloads that you can periodically save to volume disk. Your volume disk is retained even if your spot instance is interrupted.



### Billing

All billing including per hour compute and storage billing is charged per minute.

#### How does Pod billing work?

Every pod has an hourly cost based on GPU type. You are charged for the compute every minute as long as pod is running. The charge is against your RunPod credits. If you ever run out of credits, your pods will be automatically stopped and you will get an email notification. Eventually pods will be terminated if you don't refill your credit.

#### **How does storage billing work?**

We currently charge $0.1/GB/month for all storage on running pods and $0.2/GB/month for volume storage on stopped pods. Storage is tied to compute servers, and we want to make sure that active users have enough space to run their workloads. Storage is charged on a per-minute basis and we never charge users if the host machine is down or unavailable from public internet.

### Security

#### **Is my data protected from other clients?**

Yes. Your data is run in a multi-tenant environment where other clients do not have the ability to access your pod. For sensitive workloads requiring the best security, please use **Secure Cloud**.

#### **Is my data protected from the host of the machine that my pod is running on?**

Data privacy is important to us at RunPod. Our terms of service prohibits hosts from trying to inspect your pod data or usage patterns in any way. If you want the highest level of security, use Secure Cloud.

### Usability

#### **What can I do in a RunPod pod?**

You can run any docker container available on any publicly reachable container registry. If you are not well versed in containers, we would recommend that you stick with the default run templates like our RunPod PyTorch template. If you know what you are doing, however, you can do a lot more!

#### **My pod is stuck on initializing? What gives?**

Usually this happens for one of several reasons. If you can't figure it out, reach out to us and we'll be happy to help you.

1. You are trying to run a pod to SSH into, but you did not give the pod an idle job to run like "sleep infinity"
2. You have given your pod a command that it doesn't know how to run. Check the logs to make sure that you don't have any syntax errors, etc.

#### **How do I find a reliable server in Community Cloud?**

It is important for RunPod to provide you with reliable servers. All of our listed servers must meet a minimum reliability and most of them are running in a datacenter! However, if you want the highest level of reliability and security, use Secure Cloud. RunPod calculates server reliability by maintaining a heartbeat with each server in real time.

**Why do I have 0 GPU assigned to my pod?**

Most of our machines have somewhere between 4 and 8 GPUs per physical machine. Currently, when you start a pod, it is locked to a specific physical machine. If you keep it running (on-demand), then that GPU cannot be taken from you. However, if you stop your pod, it becomes available for a different user to rent. When you want to start your pod again, it's possible that your specific machine may be completely occupied! In this case, we give you the option to spin up your pod with 0 GPUs so you can retain access to your data.

Keep in mind that this does not mean that there are no more GPUs of that type available, just none on the physical machine that specific pod is locked to. We know that this isn't ideal, but please bear with us until we come up with some better solutions. Note that transfer pods have limited compute capabilities, so it may be difficult to transfer files using a UI and you may need to resort to terminal access or cloud sync options.

### What if?

#### **What if I run out of funds?**

All your pods are stopped automatically when you don't have enough funds to keep your pods running for at least 10 more mins. When your pods are stopped, your container disk data will be lost, but your volume data will be preserved. You will have 2 days to add more funds. If you fail to do so, your pods will be terminated and pod volumes will be removed.

After you add more funds to your account, you can start your pod if you wish (assuming that there are enough GPUs available on the host machine).

#### **What if the machine that my pod is running on loses power?**

If the host machine loses power, then it will attempt to start your pod again when it comes back online. Your volume data will be preserved and your container will run the same command as it ran the first time you started renting it. Your container disk and anything in memory will be lost!

#### **What if my pod loses internet connectivity?**

The host machine will continue to run your pod to the best of its ability even if it is not connected to the internet. If your job requires internet connectivity, then it will not function. You will **not** be charged if the host loses internet connectivity, even if it continues to run your job. You may, of course, request that your pod exit while the host is offline and it will exit your pod when it regains network connectivity.

#### **What if it says that my spending limit has been exceeded?**

We implement a spending limit for newer accounts that will grow over time. This is because we have found that sometimes scammers try to interfere with the natural workings of the platform. We believe that normal usage should not be impacted by this limit. That being said, we are perfectly happy to up your spending limit if you contact us and share your use case with us.

### Recipes

### **How do I get my data into my pod?**

The best way to get data into your pod is to put it somewhere in the cloud and then use our Cloud Sync feature to pull it from your private bucket. We currently offer multiple integrations with cloud providers like AWS, Google Cloud, Azure, Dropbox, and Backblaze. If you just want to get running and have a small dataset (megs, not gigs), then you can use the upload feature inside Jupyter notebook. You can also use scp or sftp if you add and configure sshd in your pod as described [in this blog post](https://www.runpod.io/blog/how-to-achieve-true-ssh-on-runpod).

#### **How do I get SSH terminal access to my pod to set it up?**

The easiest way to get access to your pod is through the Jupyter notebook if you have it set up. If you need quick terminal access, you can find a step-by-step [in this blog post](https://www.runpod.io/blog/how-to-set-up-terminal-access-on-runpod). Note that this terminal access is not a real ssh daemon and therefore only supports basic functionality. Our custom TensorFlow and PyTorch images have easy configuration for real SSH access if you are on our secure cloud. If you need IDE/SCP/SFTP support on your own custom container, then you should add openSSH daemon to your pod and tunnel over an open TCP port.

#### **How to I add true SSH with SCP support to my pod?**

If you need to run a real SSH daemon in your pod, you can use a runpod container image, or you can find a step-by-step [in this blog post](https://www.runpod.io/blog/how-to-achieve-true-ssh-on-runpod) to roll your own.

#### **How do I run a Jupyter notebook?**

The easiest way to run a Jupyter notebook is to choose the runpod TensorFlow or runpod PyTorch run templates.

1. Choose the default settings when renting and choose deploy.
2. Navigate to your "my pods" dashboard when asked on the deploy success page.
3. Wait a 20 seconds to a few minutes for your pod to get ready.
4. The Connect button should light up. Click on it for access to the Connect to Jupyter button. Note that it may take an additional 10-30 seconds for the webserver to start serving the notebook. You may get a "502" error in the meantime.

#### **How do I add some automation so that my pod resumes if the pod is interrupted?**

1. Choose a container that fits your use case. Some simple ones to start with are runpod/tensorflow or runpod/pytorch.
2. When renting your pod, put bash -c "sleep infinity" into the docker command box if you aren't using one of our runpod images.
3. Add a volume and a volume path. This will allow you to have persistent storage on the host machine.
4. Rent the pod.
5. Navigate to your "my pods" dashboard.
6. Click on detail expander button on the bottom left of the pod card.
7. Click on the SSH button on the pod card. You can find it under the name and ID on the left side of the card.
8. Generate and set up your SSH key in RunPod if you have not already done so.
9. Copy the SSH command into your local terminal to log in.
10. Do everything you need to set up your environment
11. Create a script that you can run to restart your job on failure and that saves your job to the volume path disk every once in a while.
12. Save your script and anything else your job needs in your volume path
13. Go to RunPod and navigate to your "my pods" dashboard.
14. Click on the "edit job" button on the pod you are using.
15. Edit the docker command to run your script. For example, if your volume mount path is /volume and you have a start.sh script, then your docker command command should look like bash -c "./volume/start.sh"
16. Your container should restart and begin running your job. If the container goes down, it will automatically start running your script again when it comes back up.

### Legal

#### **Do you have some legal stuff I can look at?**

Sure do! Take a look at our [legal page](https://www.runpod.io/legal).

