---
title: "Maintenance and reliability"
---

## Maintenance

Hosts must currently schedule maintenance at least one week in advance and are able to program flash maintenance in the case their server is unrented. Users will get email reminders of upcoming maintenance that will occur on their active pods. Please contact RunPod on Discord or Slack if you are scheduling maintenance on more than a few machines so that we are aware of any major impacts to our customers.

Here are some things to keep in mind.

- Uptime/reliability will not be affected during scheduled maintenance.
- ALL other events that may impact customer workloads will result in a reliability score decrease. This includes unlisted machines.
- All machines that have maintenance scheduled will be automatically unlisted 4 days prior to the scheduled maintenance start time to minimize disruption for clients.
- Excessive maintenance will result in further penalties.
- You are allowed to bring down machines that have active users on them provided that you are in a maintenance window.

## Reliability calculations

RunPod aims to partner with datacenters that offer **99.99%** uptime.
Reliability is currently calculated as follows:

<!-- the $ is for math equations -->

$( total minutes + small buffer ) / total minutes in interval$

This means that if you have 30 minutes of network downtime on the first of the month, your reliability will be calculated as:

<!-- the $ is for math equations -->

$( 43200 - 30 + 10 ) / 43200 = 99.95%$

Based on approximately 43200 minutes per month and a 10 minute buffer.
We include the buffer because we do incur small single-minute uptime dings once in a while due to agent upgrades and such.
It will take an entire month to regenerate back to 100% uptime given no further downtimes in the month, considering it it calculated based on a 30 days rolling window.

Machines with less than **98%** reliability are **automatically removed** from the available GPU pool and can only be accessed by clients that already had their data on it.
