# Maintenance and Reliability

#### Maintenance

Hosts can currently schedule maintenance at least one week in advance. Users will get email reminders of upcoming maintenance that will occur on their active pods. Please contact support@runpod.io if you are scheduling maintenance on more than a few machines so that we are aware of any major impacts to our customers.



Here are some things to keep in mind.

* Uptime/Reliability will not be affected during scheduled maintenance
* ALL other events that may impact customer workloads will result in a reliability score decrease. **This includes for unlisted machines.**
* All Machines that have maintenance scheduled will be automatically unlisted 4 days prior to the scheduled maintenance start time.
* Excessive maintenance will result in further penalties.
* You are allowed to bring down machines that have active users on them provided that you are in a maintenance window.

#### Reliability calculations

Reliability is currently calculated as follows:

( total minutes + small buffer ) / total minutes in interval

This means that if you have 30 minutes of network downtime on the first of the month, your reliability will be calculated as

( 43200 - 30 + 10 ) / 43200 = 99.95%

based on approximately 43200 minutes per month and a 10 minute buffer. We include the buffer because we do incur small single-minute uptime dings once in a while due to agent upgrades and such. It will take an entire month to regenerate back to 100% uptime given no further downtimes in the month. This is because uptime works on a sliding window, and does not automatically grow over time.
