---
title: Running RunPod on SkyPilot
sidebar_label: SkyPilot
---

[SkyPilot](https://skypilot.readthedocs.io/en/latest/) is a framework for executing LLMs, AI, and batch jobs on any cloud, offering maximum cost savings, highest GPU availability, and managed execution.

This integration leverages the RunPod CLI infrastructure, streamlining the process of spinning up on-demand pods and deploying serverless endpoints with SkyPilot.

## Getting started

To begin using RunPod with SkyPilot, follow these steps:

1. **Obtain Your API Key**: Visit the [RunPod Settings](https://www.runpod.io/console/user/settings) page to get your API key. If you haven't created an account yet, you'll need to do so before obtaining the key.

2. **Install RunPod**: Use the following command to install the latest version of RunPod:
   ```
   pip install "runpod>=1.6"
   ```

3. **Configure RunPod**: Enter `runpod config` in your CLI and paste your API key when prompted.

4. **Install SkyPilot RunPod Cloud**: Execute the following command to install the [SkyPilot RunPod cloud](https://skypilot.readthedocs.io/en/latest/getting-started/installation.html#runpod):
   ```
   pip install "skypilot-nightly[runpod]"
   ```

5. **Verify Your Setup**: Run `sky check` to ensure your credentials are correctly set up and you're ready to proceed.

## Running a Project

After setting up your environment, you can seamlessly spin up a cluster in minutes:

1. **Create a New Project Directory**: Run `mkdir hello-sky` to create a new directory for your project.

2. **Navigate to Your Project Directory**: Change into your project directory with `cd hello-sky`.

3. **Create a Configuration File**: Enter `cat > hello_sky.yaml` and input the following configuration details:

   ```yml
   resources:
     cloud: runpod

   # Working directory (optional) containing the project codebase.
   # Its contents are synced to ~/sky_workdir/ on the cluster.
   workdir: .

   # Setup commands (optional).
   # Typical use: pip install -r requirements.txt
   # Invoked under the workdir (i.e., can use its files).
   setup: |
     echo "Running setup."

   # Run commands.
   # Typical use: make use of resources, such as running training.
   # Invoked under the workdir (i.e., can use its files).
   run: |
     echo "Hello, SkyPilot!"
     conda env list
   ```

4. **Launch Your Project**: With your configuration file created, launch your project on the cluster by running `sky launch -c mycluster hello_sky.yaml`.

5. **Confirm Your GPU Type**: You should see the available GPU options on Secure Cloud appear in your command line. Once you confirm your GPU type, your cluster will start spinning up.

With this integration, you can leverage the power of RunPod and SkyPilot to efficiently run your LLMs, AI, and batch jobs on any cloud.
