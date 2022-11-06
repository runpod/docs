---
description: Offer your NVIDIA GPU compute on our platform!
---

# How to become a Host?

Our community cloud empowers hosts to offer their compute on our platform. Currently we only support NVIDIA GPU servers.



**Server Requirements**

* Ubuntu 20.04 LTS
* at least 2 Physical Core Per GPU + 1 extra for System
  * 2x 3090s should have at least 5 Cores
  * 4x A6000 should have at least 9 Cores
* Latest GPUs, at least 30xx or RTX A4000 or higher
  * PCIE 3 x16 per GPU or PCIE 4 x8
* RAM 4 GB + Total VRAM of all GPUs
  * 2x 3090s should have (24+24+4) 52 GB RAM
  * 4x A6000 should have (48+48+48+48+4) 196 GB RAM
* 1 TB disk space at minimum
  * at least 150 MB/s read speed required
  * disk speed test: `hdparm -tv {device}`
* 100 Mb/s Down / 50 Mb/s Up at minimum per server
* Public IP support (20 ports per GPU)
  * single IP can be shared between multiple servers

****

**Other Requirements**

* RunPod service fee is 24%
  * we cover \~4% Stripe payment fees
  * also 2% referral and 1% template program is included as well ([learn more](https://www.runpod.io/refer-a-friend))
* GPU OnDemand prices are standard, you can set min bid price for Spot
* We only accept Hosts with at least **12 GPUs** with at least 24 GB VRAM GPU or **4 GPUs** with at least 48 GB VRAM GPU
* We require **KYC** for all hosts to protect our users and deter any fraud



If you meet the above requirements, please email us at support@runpod.io with your server specs, # of GPUs, internet speeds, and location.

****
