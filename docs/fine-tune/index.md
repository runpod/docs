---
title: Fine-tune a model
description: "Learn how to fine-tune a model using Axolotl"
sidebar_position: 1
---

This guide explains how to fine-tune a large language model with RunPod.

## Before you begin

Make sure you have:

- An account with access to the fine-tuning feature
- A Hugging Face account (required for accessing models)
- (Optional) A HuggingFace access token for gated models

## Select a base model

1. Go to the **Fine-Tuning** section in the sidebar.
2. In the **Base Model** field, enter the Hugging Face model ID you want to fine-tune. 
    For example: `NousResearch/Meta-Llama-3-8B`

3. If your selected model is gated (requires special access):
   1. Generate a Hugging Face token with the necessary permissions.
   2. Add the token in the designated field.

## Select a dataset (Optional)

1. Choose a dataset from Hugging Face for fine-tuning.

   Example: `tatsu-lab/alpaca`

2. Enter the dataset identifier in the **Dataset** field.

## Deploy the fine-tuning pod

1. Click **Deploy the Fine-Tuning Pod**.
2. Select an appropriate GPU instance based on your model's requirements:
   - For smaller models: Choose GPUs with less memory
   - For larger models/datasets: Choose GPUs with higher memory capacity
3. The system will deploy your pod and initialize the container.
4. Monitor the system logs for deployment progress.
5. Look for the success message: `"You've successfully configured your training environment!"`

## Connect to your training environment

After your fine-tuning pod is deployed and active:

1. Go to your fine-tuning pod dashboard.
2. Click **Connect** to view connection options:
   - **Jupyter Notebook**: Launch a browser-based notebook interface
   - **Web Terminal**: Open a terminal in your browser
   - **SSH**: Connect from your local machine terminal

     Note: To use SSH, ensure you've added your public SSH key in your account settings. The system automatically adds your key to the pod's `authorized_keys` file.

## Configure your environment

When you connect to your environment, you'll find this directory structure in `/workspace/fine-tuning/`:

- `examples/`: Contains sample configurations and scripts
- `outputs/`: Stores training results and model outputs
- `config.yaml`: Defines training parameters for your model

The system generates an initial `config.yaml` based on your selected base model and dataset.

## Review and modify the configuration

1. Open the `config.yaml` file using a text editor:

   ```bash
   nano config.yaml
   ```

2. Review the configuration parameters and modify them as needed.

   Note: It's recommended to adjust parameters based on your specific use case.

Example configuration:

```yaml
base_model: NousResearch/Meta-Llama-3.1-8B

load_in_8bit: false
load_in_4bit: false
strict: false

datasets:
  - path: tatsu-lab/alpaca
    type: alpaca
dataset_prepared_path: last_run_prepared
val_set_size: 0.05
output_dir: ./outputs/out

sequence_len: 8192
sample_packing: true
pad_to_sequence_len: true

wandb_project:
wandb_entity:
wandb_watch:
wandb_name:
wandb_log_model:

gradient_accumulation_steps: 8
micro_batch_size: 1
num_epochs: 1
optimizer: paged_adamw_8bit
lr_scheduler: cosine
learning_rate: 2e-5

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

For more configuration examples, see the [Axolotl examples repository](https://github.com/axolotl-ai-cloud/axolotl/tree/main/examples).

## Start the fine-tuning process

When your configuration is ready:

1. Run the following command to start fine-tuning:

   ```bash
   axolotl train config.yaml
   ```

2. The training process will begin, and progress will be displayed in your terminal.

When you've finished, push your changes to Hugging Face.

## Resources

For more information, see:

- [Axolotl Documentation](https://github.com/OpenAccess-AI-Collective/axolotl)
