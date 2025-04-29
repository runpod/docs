---
title: Running RunPod on Mods
sidebar_label: Mods
---

[Mods](https://github.com/charmbracelet/mods) is an AI-powered tool designed for the command line and built to seamlessly integrate with pipelines.
It provides a convenient way to interact with language models directly from your terminal.

## How Mods Works

Mods operates by reading standard input and prefacing it with a prompt supplied in the Mods arguments.
It sends the input text to a language model (LLM) and prints out the generated result.
Optionally, you can ask the LLM to format the response as Markdown.
This allows you to "question" the output of a command, making it a powerful tool for interactive exploration and analysis. Additionally, Mods can work with standard input or an individually supplied argument prompt.

## Getting Started

To start using Mods, follow these step-by-step instructions:

1. **Obtain Your API Key**:
   - Visit the [RunPod Settings](https://www.runpod.io/console/user/settings) page to retrieve your API key.
   - If you haven't created an account yet, you'll need to sign up before obtaining the key.

2. **Install Mods**:
   - Refer to the different installation methods for [Mods](https://github.com/charmbracelet/mods) based on your preferred approach.

3. **Configure RunPod**:
   - Update the `config_template.yml` file to use your RunPod configuration. Here's an example:

     ```yml
     runpod:
       # https://docs.runpod.io/serverless/vllm/openai-compatibility
       base-url: https://api.runpod.ai/v2/${YOUR_ENDPOINT}/openai/v1
       api-key:
       api-key-env: RUNPOD_API_KEY
       models:
         # Add your model name
         openchat/openchat-3.5-1210:
           aliases: ["openchat"]
           max-input-chars: 8192
     ```

   - `base-url`: Update your base-url with your specific endpoint.
   - `api-key-env`: Add your RunPod API key.
   - `openchat/openchat-3.5-1210`: Replace with the name of the model you want to use.
   - `aliases: ["openchat"]`: Replace with your preferred model alias.
   - `max-input-chars`: Update the maximum input characters allowed for your model.

4. **Verify Your Setup**:
   - To ensure everything is set up correctly, pipe any command line output and pass it to `mods`.
   - Specify the RunPod API and model you want to use.

     ```bash
     ls ~/Downloads | mods --api runpod --model openchat -f "tell my fortune based on these files" | glow
     ```

   - This command will list the files in your `~/Downloads` directory, pass them to Mods using the RunPod API and the specified model, and format the response as a fortune based on the files. The output will then be piped to `glow` for a visually appealing display.
