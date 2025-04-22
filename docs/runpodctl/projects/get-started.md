---
title: Get started
sidebar_position: 2
description: "Get the IP address of your machine and deploy your code to the RunPod platform with this step-by-step tutorial. Learn how to set up a project environment, run a development server, and interact with your code using the RunPod API."
---

# Create your first project

In this tutorial, we'll explore how to get the IP address of the machine your code is running on and deploy your code to the RunPod platform.
You will get the IP address of your local machine, the development server, and the Serverless Endpoint's server.

By the end, you'll have a solid understanding of how to set up a project environment, interact with your code, and deploy your code to a Serverless Endpoint on the RunPod platform.

While this project is scoped to getting the IP address of the machine your code is running on, you can use the RunPod platform to deploy any code you want.
For larger projects, bundling large packages a Docker image and making code changes requires multiple steps.
With a RunPod development server, you can make changes to your code and test them in a live environment without having to rebuild a Docker image or redeploy your code to the RunPod platform.

This tutorial takes advantage of making updates to your code and testing them in a live environment.

Let's get started by setting up the project environment.

## Prerequisites

Before we begin, you'll need the following:

- RunPod CLI
- Python 3.8 or later

## Set up the project environment

In this first step, you'll set up your project environment using the RunPod CLI.

Set your API key in the RunPod CLI configuration file.

```bash
runpodctl config --apiKey $(RUNPOD_API_KEY)
```

Next, use the RunPod CLI `project create` command to create a new directory and files for your project.

```bash
runpodctl project create
```

Select the **Hello World** project and follow the prompts on the screen.

## Write the code

Next, you'll write the code to get the IP address of the machine your code is running on.

Use `httpbin` to retrieve the IP address and test the code locally.

Change directories to the project directory and open the `src/handler.py` file in your text editor.

```bash
cd my_ip
```

The current code is boiler plate text.
Replace the code with the following:

```python
import runpod
import requests


def get_my_ip(job):
    response = requests.get("https://httpbin.org/ip")
    return response.json()["origin"]


runpod.serverless.start({"handler": get_my_ip})
```

This uses `httpbin` to get the IP address of the machine your code is running on.

Run this code locally to get the IP address of your machine, for example:

```bash
python3 src/handler.py --test_input '{"input": {"prompt": ""}}'
```

```text
--- Starting Serverless Worker |  Version 1.6.1 ---
INFO   | test_input set, using test_input as job input.
DEBUG  | Retrieved local job: {'input': {'prompt': ''}, 'id': 'local_test'}
INFO   | local_test | Started.
DEBUG  | local_test | Handler output: 174.21.174.xx
DEBUG  | local_test | run_job return: {'output': '174.21.174.xx'}
INFO   | Job local_test completed successfully.
INFO   | Job result: {'output': '174.21.174.xx'}
INFO   | Local testing complete, exiting.`
```

This testing environment works for smaller projects, but for larger projects, you will want to use the RunPod CLI to deploy your code to run on the RunPod platform.

In the next step, you'll see how to deploy your code to the RunPod platform.

## Run a development server

Now let's run the code you've written using RunPod's development server.
You'll start a development server using the RunPod CLI `project dev` command.

RunPod provides a development server that allows you to quickly make changes to your code and test these changes in a live environment.
You don't need to rebuild a Docker image or redeploy your code to the RunPod platform just because you made a small change or added a new dependency.

To run a development server, use the RunPod CLI `project dev` command and select a Network volume.

```bash
runpodctl project dev
```

This starts a development server on a Pod.
The logs shows the status of your Pod as well as the port number your Pod is running on.

The development server watches for changes in your code and automatically updates the Pod with changes to your code and files like `requirements.txt`.

When the Pod is running you should see the following logs:

```text
Connect to the API server at:
[lug43rcd07ug47] >  https://lug43rcd07ug47-8080.proxy.runpod.net
[lug43rcd07ug47]
[lug43rcd07ug47] Synced venv to network volume
[lug43rcd07ug47] --- Starting Serverless Worker |  Version 1.6.2 ---
```

The `[lug43rcd07ug47]` is your Worker Id.
The `https://lug43rcd07ug47-8080.proxy.runpod.net` is the URL to access your Pod with the 8080 port exposed.
You can interact with this URL like you would any other Endpoint.

## Interact with your code

In this step, you'll interact with your code by running a `curl` command to fetch the IP address from the development server.
You'll learn how to include dependencies in your project and how to use the RunPod API to run your code.

You might have noticed that the function to get an IP address uses a third-party dependency `requests`.
This means by default it's not included in Python or the RunPod environment.

To include this dependency, you need to add it to the `requirements.txt` file in the root of your project.

```text
runpod
requests
```

When you save your file, notice that the development server automatically updates the Pod with the dependencies.

During this sync, your Pod is unable to receive requests.
Wait until you see the following logs:

```text
Restarted API server with PID: 701
--- Starting Serverless Worker |  Version 1.6.2 ---
INFO   | Starting API server.
```

Now you can interact with your code.

While the Pod is still running, create a new terminal session and run the following command:

```bash
curl -X 'POST' \
  'https://${YOUR_ENDPOINT}-8080.proxy.runpod.net/runsync' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "input": {}
}'
```

This command uses the `runsync` method on the RunPod API to run your code synchronously.

The previous command returns a response:

```text
{
  "id": "test-9613c9be-3fed-401f-8cda-6b5f354417f8",
  "status": "COMPLETED",
  "output": "69.30.85.70"
}
```

The output is the IP address of the Pod your code is running on and not your local machine.
Even though you're executing code locally, you can see that it's running on a Pod.

Now, what if you wanted this function to run as a Serverless Endpoint?
Meaning, you didn't want to keep the Pod running all the time.
You only wanted it to turn on when you sent a request to it.

In the next step, you'll learn to deploy your code to the Serverless platform and get the IP address of that machine.

## Deploy your code

Now that you've tested your code in the development environment, you'll deploy it to the RunPod platform using the RunPod CLI `project deploy` command.
This will make your code available as a [Serverless Endpoint](/serverless/endpoints/overview).

Stop the development server by pressing `Ctrl + C` in the terminal.

To deploy your code to the RunPod platform, use the RunPod CLI `project deploy` command.

```bash
runpodctl project deploy
```

Select your network volume and wait for your Endpoint to deploy.

After deployment, you will see the following logs:

```text
The following URLs are available:
    - https://api.runpod.ai/v2/${YOUR_ENDPOINT}/runsync
    - https://api.runpod.ai/v2/${YOUR_ENDPOINT}/run
    - https://api.runpod.ai/v2/${YOUR_ENDPOINT}/health
```

:::note

You can follow the logs to see the status of your deployment.
You may notice that the logs show the Pod being created and then the Endpoint being created.

:::

## Interact with your Endpoint

Finally, you'll interact with your Endpoint by running a `curl` command to fetch the IP address from the deployed Serverless function.
You'll see how your code runs as expected and tested in the development environment.

When the deployment completes, you can interact with your Endpoint as you would any other Endpoint.

Replace the previous Endpoint URL and specify the new one and add your API key.

Then, run the following command:

```bash
curl -X 'POST' \
  'https://api.runpod.ai/v2/${YOUR_ENDPOINT}/runsync' \
  -H 'accept: application/json' \
  -H  'authorization: ${YOUR_API_KEY}' \
  -H 'Content-Type: application/json' \
  -d '{
  "input": {}
}'
```

The previous command returns a response:

```text
{
  "delayTime": 249,
  "executionTime": 88,
  "id": "sync-b2188a79-3f9f-4b99-b4d1-18273db3f428-u1",
  "output": "69.30.85.69",
  "status": "COMPLETED"
}
```

The output is the IP address of the Pod your code is running on.

## Conclusion

In this tutorial, you've learned how to get the IP address of the machine your code is running on and deploy your code to the RunPod platform.
You've also learned how to set up a project environment, run a development server, and interact with your code using the RunPod API.
With this knowledge, you can now use this code as a Serverless Endpoint or continue developing your project, testing, and deploying it to the RunPod platform.
