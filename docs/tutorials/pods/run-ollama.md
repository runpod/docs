# How to Set Up Ollama on a GPU Pod with RunPod: A Step-by-Step Tutorial

This tutorial will guide you through setting up [Ollama](https://ollama.com), a powerful AI model serving platform, on a GPU Pod using RunPod.

This setup enables you to deploy and interact with AI models efficiently, leveraging the GPU acceleration for enhanced performance.

## Prerequisites

- A RunPod account: Ensure you have access to RunPod and can create GPU Pods.
- Basic familiarity with terminal commands and environment variables.

## Step 1: Start a PyTorch Template on RunPod

1. Log in to your [RunPod account](https://www.runpod.io/console/pods) and choose **+ GPU Pod**.
2. Choose a GPU Pod like `A40`.
3. From the availble templates, select the lastet PyTorch template.
4. Select **Customize Deployment**.
   1. Add the port `11434` to the list of exposed ports. This port is used by Ollama for HTTP API requests.
   2. Add the following environment variable to your Pod to allow Ollama to bind to the HTTP port:
   - Key: `OLLAMA_HOST`
   - Value: `0.0.0.0`
5. Select **Set Overrides**, **Continue**, then **Deploy**.

This setting configures Ollama to listen on all network interfaces, enabling external access through the exposed port.

For detailed instructions on setting environment variables, refer to the [Ollama FAQ documentation](https://github.com/ollama/ollama/blob/main/docs/faq.md#setting-environment-variables-on-linux).

Once the Pod is up and running, you'll have access to a terminal within the RunPod interface.

## Step 2: Install Ollama

1. Select **Connect** and choose **Start Web Terminal**.
2. Make note of the **Username** and **Password**, then select **Connect to Web Terminal**.
3. Enter your username and password.
4. In the terminal of your newly created Pod, run the following command and send to the background:

```bash
(curl -fsSL https://ollama.com/install.sh | sh && ollama serve > ollama.log 2>&1) &
```

This command fetches the Ollama installation script and executes it, setting up Ollama on your Pod.
The `ollama serve` part starts the Ollama server, making it ready to serve AI models.

## Step 3: Run an AI Model with Ollama

To deploy and run an AI model using Ollama, open a new terminal in the Pod and execute:

```bash
ollama run [model name]
# ollama run llama2
```

Replace `[model name]` with the name of the AI model you wish to deploy.
For a complete list of models, see the [Ollama Library](https://ollama.com/library).

This command pulls the model and runs it, making it accessible for inference.

You can begin interacting with the model directly from your web terminal.

Optionally, you can set up an HTTP API request to interact with Ollama.
This is covered in the next step.


## Step 4: Interact with Ollama via HTTP API

With Ollama set up and running, you can now interact with it using HTTP API requests.
For example, to list the local models available in Ollama, you can use the following GET request:

```
curl https://{POD_ID}-{INTERNAL_PORT}.proxy.runpod.net/api/tags
# curl https://cmko4ns22b84xo-11434.proxy.runpod.net/api/tags
```

Replace `[your-pod-id]` with your actual Pod ID. Your Pod's Jupyter Lab URL, which includes the Pod ID, can be found in the RunPod interface.

For more information on constructing HTTP requests and other operations you can perform with the Ollama API, consult the [Ollama API documentation](https://github.com/ollama/ollama/blob/main/docs/api.md).

## Additional considerations

This tutorial provides a foundational understanding of setting up and using Ollama on a GPU Pod with RunPod.

**Port Configuration and documentation**: For further details on exposing ports and the link structure, refer to the [RunPod documentation](/pods/configuration/expose-ports).
**Connect VSCode to RunPod**: For information on connecting VSCode to RunPod, refer to the [How to Connect VSCode To RunPod]([/pods/configuration/vscode](https://blog.runpod.io/how-to-connect-vscode-to-runpod/)).


By following these steps, you can deploy AI models efficiently and interact with them through HTTP API requests, harnessing the power of GPU acceleration for your AI projects.