---
title: Fine tune an LLM with Axolotl on RunPod
description: Learn to fine tune LLMs.
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Training a large language model (LLM) can be a complex process, but Axolotl makes it easier by providing a streamlined workflow.
Combining Axolotl's simplicity with RunPod's GPUs gives you the power to train an LLM on a GPU.

In this tutorial, we'll walk through the steps of training an LLM using Axolotl on RunPod and uploading your model to Hugging Face.

### Setting up the environment

Fine-tuning a large language model (LLM) can take up a lot of compute power.
Because of this, we recommend fine-tuning using RunPod's GPUs.


To do this, you'll need to create a Pod, specify a container, then you can begin training.
A Pod is an instance on a GPU or multiple GPUs that you can use to run your training job.
You also specify a Docker image like `winglian/axolotl-cloud:main-latest` that you want installed on your Pod.

1. Login to [RunPod](https://www.runpod.io/console/console/home) and deploy your Pod.
    1. Select **Deploy**.
    2. Select a GPU instance.
    3. Specify the `winglian/axolotl-cloud:main-latest` as your Template image.
    4. Select your GPU count.
    5. Select **Deploy**.

Now that you have your Pod set up and running, connect to it over secure SSH.

1. Wait for the Pod to startup, then connect to it using secure SSH.
   1. On your Pod page, select **Connect**.
   2. Copy the secure SSH string and paste it into your terminal on your machine.
    ```bash
    ssh <username>@<pod-ip-address> -p <ssh-port> -i <path-to-ssh-key>  string
    ```
    Follow the on-screen prompts to SSH into your Pod.

:::note

You should use the SSH connection to your Pod as it is a persistent connection.
The Web UI terminal shouldn't be relied on for long-running processes, as it will be disconnected after a period of inactivity.

:::

Once the Pod is deployed and you're connected via SSH, you're ready to start preparing your dataset.

### Preparing the dataset

The dataset you provide to your LLM is crucial, as it's the data your model will learn from during fine-tuning.
You can make your own dataset that will then be used to fine-tune your own model, or you can use a pre-made one.

You can either use a [local dataset](#using-a-local-dataset) or one [stored on Hugging Face](#using-a-hugging-face-dataset).

#### Using a local dataset

To use a local dataset, you'll need to transfer it to your RunPod instance.
You can do this using RunPod CLI to securely transfer files from your local machine to the one hosted by RunPod.
All Pods automatically come with `runpodctl` installed with a pod-scoped API key.
**To send a file**

<Tabs>
  <TabItem value="runpodctl" label="runpodctl" default>

Run the following on the computer that has the file you want to send, enter the following command:

```bash
runpodctl send data.jsonl
```

  </TabItem>
  <TabItem value="output" label="output">

```bash
Sending 'data.jsonl' (5 B)
Code is: 8338-galileo-collect-fidel
On the other computer run

runpodctl receive 8338-galileo-collect-fidel
```

  </TabItem>
</Tabs>





**To receive a file**

<Tabs>
  <TabItem value="runpodctl" label="runpodctl" default>

The following is an example of a command you'd run on your RunPod machine.

```bash
runpodctl receive 8338-galileo-collect-fidel
```

  </TabItem>
  <TabItem value="output" label="output">

The following is an example of an output.

```bash
Receiving 'data.jsonl' (5 B)

Receiving (<-149.36.0.243:8692)
data.jsonl 100% |████████████████████| ( 5/ 5B, 0.040 kB/s)
```

  </TabItem>
</Tabs>

Now update your RunPod machine's requirement and preprocessed your data.

#### Using a Hugging Face dataset

If your dataset is stored on Hugging Face, you can specify its path in the `lora.yaml` configuration file under the `datasets` key.
Axolotl will automatically download the dataset during the preprocessing step.

Now update your RunPod machine's requirement and preprocess your data.

### Updating requirements and preprocessing data

Before you can start training, you'll need to install the necessary dependencies and preprocess our dataset.

1. Install the required packages by running the following commands:

```command
pip3 install packaging ninja
pip3 install -e '.[flash-attn,deepspeed]'
```

2. Update the `lora.yml` configuration file with your dataset path and other training settings.
You can use any of the examples in the `examples` folder as a starting point.
3. Preprocess your dataset by running:

```command
CUDA_VISIBLE_DEVICES=""
python -m axolotl.cli.preprocess examples/openllama-3b/lora.yml
```

This step converts your dataset into a format that Axolotl can use for training.

### Fine-tuning the LLM

With your environment set up and data preprocessed, you're ready to start fine-tuning the LLM.

Run the following command to fine-tune the base model.

```command
accelerate launch -m axolotl.cli.train examples/openllama-3b/lora.yml
```

This will start the training process using the settings specified in your `lora.yml` file.

The training time will depend on factors like your model size, dataset size, and GPU type.

Be prepared to wait a while, especially for larger models and datasets.

### Inference

Once training is complete, you can test your fine-tuned model using the inference script:

```command
accelerate launch -m axolotl.cli.inference examples/openllama-3b/lora.yml --lora_model_dir="./lora-out"
```

This will allow you to interact with your model and see how it performs on new prompts.

If you're satisfied with your model's performance, you can merge the LoRA weights with the base model using the `merge_lora` script. 

### Merge the model

You will merge the base model with the LoRA weights using the `merge_lora` script.

Run the following command:

```command
python3 -m axolotl.cli.merge_lora examples/openllama-3b/lora.yml \
    --lora_model_dir="./lora-out"
```

This creates a standalone model that doesn't require LoRA layers for inference.


### Upload the model to Hugging Face

Finally, you can share your fine-tuned model with others by uploading it to Hugging Face. 

1. Login to Hugging Face through the CLI:
```command
huggingface-cli login
```
2. Create a new model repository on Hugging Face using `huggingface-cli`.
```command
huggingface-cli repo create your_model_name --type model
```
3. Then, use the `huggingface-cli upload` command to upload your merged model to the repository.
```command
huggingface-cli upload your_model_name path_to_your_model
```
