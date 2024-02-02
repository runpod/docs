---
title: Overview
sidebar_position: 1
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

To get started with RunPod, you can use the RunPod SDK to build and connect with your Severless Endpoints.

## Setting up your project

```command
pip install runpod
```

RunPod provides a [repository of templates for your project](https://github.com/runpod-workers). 

You can use the template to get started with your project.

```command
gh repo clone runpod-workers/worker-template
```

Now that you've got a basic RunPod Worker template created, let's see how you'd migrate from Banana to RunPod.

## Project structure

When begining to migrate your Banana monorepo to RunPod, you will need to understand the structure of your project.

<Tabs>

  <TabItem value="banana" label="Banana" default>

Banana is a monorepo that contains multiple services. The basic structure for Banana projects look like:

```text
Dockerfile # Your Docker file
README.md
app.py  # your code
banana_config.json
download.py
requirements.txt # required files
```

  </TabItem>
  <TabItem value="runpod" label="Runpod">

RunPod Serverless is a monorepo that contains multiple services. The basic structure for RunPod Serverless projects look like:

```text
.
├── Dockerfile # Your Docker file
├── LICENSE
├── README.md
├── builder
│   ├── requirements.txt # required files
│   └── setup.sh  # start script
└── src
    └── handler.py # your code
```

  </TabItem>
</Tabs>

Both project setups at miniumn contain:

- A Dockerfile: This is the file that defines the container that will be used to run your application.
- Application code: This is the code that will be executed when the container is run.

Both provide optional files:

- `requirements.txt`: This is the file that lists the required dependencies for the application.

### Banana Configuration settings

Banana configuraiton settings are stored in a `banana_config.json` file.

Banana uses a `banana_config.json` file which contains things like Idle Timeout, Inference Timeout, and Max Replicas.

**Idle Timeout**

RunPod allows you to set an [Idle Timeout](/serverless/references/endpoint-configurations#idle-timeout) when creating the Endpoint.
The default value is 5 seconds.

**Inference Timeout**

RunPod has a similar concept to Inference Timeout.
For runs that are take less than 30 seconds to execute, you should use the `run_sync` handler.
For runs that take longer than 30 seconds to execute, you should use the `sync` handler.

**Max Replicas**

When creating a Worker in RunPod, you can set the max Workers that will scale up depending on the amount of Worker sent to your Endpoint.
For more informaiton, see [Scale Type](/serverless/references/endpoint-configurations#scale-type)

:::note

When creating a Worker, select the **Flashboot** option to optimize your startup time.

:::