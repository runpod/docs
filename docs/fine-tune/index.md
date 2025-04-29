---
title: Fine-tune a model
description: "Learn how to Fine Tune a model using Axolotl"
sidebar_position: 1
---

This guide explains how to fine-tune a large language model using RunPod and Axolotl. You'll learn how to select a base model, configure your training environment, and start the fine-tuning process.

## Prerequisites

Before you begin fine-tuning, ensure you have:

- A RunPod account with access to the Fine Tuning feature
- (Optional) A Hugging Face access token for gated models

## Select a base model

To start fine-tuning, you'll need to choose a base model from Hugging Face:

1. Navigate to the **Fine Tuning** section in the sidebar
2. Enter the Hugging Face model ID in the **Base Model** field
   - Example: `NousResearch/Meta-Llama-3-8B`

3. For gated models (requiring special access):
   1. Generate a Hugging Face token with appropriate permissions
   2. Add your token in the designated field

## Select a dataset

You can choose a dataset from Hugging Face for fine-tuning:

1. Browse available datasets on [Hugging Face](https://huggingface.co/datasets?task_categories=task_categories:text-generation&sort=trending)
2. Enter your chosen dataset identifier in the **Dataset** field
   - Example: `tatsu-lab/alpaca`

## Deploy the fine-tuning pod

Follow these steps to set up your training environment:

1. Click **Deploy the Fine Tuning Pod**
2. Select a GPU instance based on your model's requirements:
   - Smaller models: Choose GPUs with less memory
   - Larger models/datasets: Choose GPUs with higher memory capacity
3. Monitor the system logs for deployment progress
4. Wait for the success message: `"You've successfully configured your training environment!"`

## Connect to your training environment

After your pod is deployed and active, you can connect using any of these methods:

1. Go to your Fine Tuning pod dashboard
2. Click **Connect** and choose your preferred connection method:
   - **Jupyter Notebook**: Browser-based notebook interface
   - **Web Terminal**: Browser-based terminal
   - **SSH**: Local machine terminal connection

:::note

To use SSH, add your public SSH key in your account settings. The system automatically adds your key to the pod's `authorized_keys` file.

:::

## Configure your environment

Your training environment includes this directory structure in `/workspace/fine-tuning/`:

- `examples/`: Sample configurations and scripts
- `outputs/`: Training results and model outputs
- `config.yaml`: Training parameters for your model

The system generates an initial `config.yaml` based on your selected base model and dataset.

## Review and modify the configuration

The `config.yaml` file controls your fine-tuning parameters. Here's how to customize it:

1. Open the configuration file:
   ```bash
   nano config.yaml
   ```

2. Review and adjust the parameters based on your specific use case

Here's an example configuration with common parameters:

```yaml
base_model: NousResearch/Meta-Llama-3.1-8B

# Model loading settings
load_in_8bit: false
load_in_4bit: false
strict: false

# Dataset configuration
datasets:
  - path: tatsu-lab/alpaca
    type: alpaca
dataset_prepared_path: last_run_prepared
val_set_size: 0.05
output_dir: ./outputs/out

# Training parameters
sequence_len: 8192
sample_packing: true
pad_to_sequence_len: true

# Weights & Biases logging (optional)
wandb_project:
wandb_entity:
wandb_watch:
wandb_name:
wandb_log_model:

# Training optimization
gradient_accumulation_steps: 8
micro_batch_size: 1
num_epochs: 1
optimizer: paged_adamw_8bit
lr_scheduler: cosine
learning_rate: 2e-5

# Additional settings
train_on_inputs: false
group_by_length: false
bf16: auto
fp16:
tf32: false

gradient_checkpointing: true
gradient_checkpointing_kwargs:
  use_reentrant: false
early_stopping_patience:
resume_from_checkpoint:
logging_steps: 1
xformers_attention:
flash_attention: true

warmup_steps: 100
evals_per_epoch: 2
eval_table_size:
saves_per_epoch: 1
debug:
deepspeed:
weight_decay: 0.0
fsdp:
fsdp_config:
special_tokens:
  pad_token: <|end_of_text|>
```

:::note

The `config.yaml` file contains all hyperparameters needed for fine-tuning. You may need to iterate on these settings to achieve optimal results.

:::

For more configuration examples, visit the [Axolotl examples repository](https://github.com/axolotl-ai-cloud/axolotl/tree/main/examples).

## Start the fine-tuning process

Once your configuration is ready, follow these steps:

1. Start the training process:
   ```bash
   axolotl train config.yaml
   ```

2. Monitor the training progress in your terminal

## Push your model to Hugging Face

After completing the fine-tuning process, you can share your model:

1. Log in to Hugging Face:
   ```bash
   huggingface-cli login
   ```

2. Create a new repository on Hugging Face if needed

3. Upload your model:
   ```bash
   huggingface-cli upload <your-username>/<model-name> ./output
   ```

Replace `<your-username>` with your Hugging Face username and `<model-name>` with your desired model name.

## Additional resources

For more information about fine-tuning with Axolotl, see:

- [Axolotl Documentation](https://github.com/OpenAccess-AI-Collective/axolotl)
