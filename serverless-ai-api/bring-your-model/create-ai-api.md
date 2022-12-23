# Create AI API

Serverless AI platform enabled seamless scale for your models. The following properties can be defined for your API.



**API Name**\
****Anything you prefer.

**Template**\
Select the template you created before or create one if you have not already.

**Min / Max Workers**\
****Minimum and maximum workers needed to handle your throughput. These can be used to control cost and also help you manage # of requests that can be processed in parallel.\
Minimum workers help reduce cold start time from seconds to milliseconds.

**Idle Timeout** (seconds)\
Idle timeout to wait before a worker is scaled down. If you specify 5 seconds. a worker will sit idle for at least 5 seconds before it's stopped to help reduce cost.

**GPU Type**\
****You can choose 16 GB or 24 GB VRAM for the GPU type.\
For 16 GB, we deploy NVIDIA RTX A4000.\
For 24GB, we deploy NVIDIA RTX A5000 or 3090. These are 1.5 - 2x faster than A4000. Sometimes it may make more sense to use 24 GB even if you don't need it compared to 16 GB due to faster response times. Do your own calculations to figure out what's more cost effective for your workload.

