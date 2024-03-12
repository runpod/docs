---
title: Environment variables
sidebar_position: 4
---

Environment variables configure your vLLM Worker by providing control over model selection, access credentials, and operational parameters necessary for optimal Worker performance.

## CUDA versions

Adjust your vLLM Worker to operate with different CUDA versions, enhancing compatibility and performance across various hardware configurations.
When deploying, ensure to choose an appropriate CUDA version based on your needs.

| CUDA Version | Stable Image Tag                      | Development Image Tag               | Note                                                                        |
| ------------ | ------------------------------------- | ----------------------------------- | --------------------------------------------------------------------------- |
| 11.8.0       | `runpod/worker-vllm:0.3.0-cuda11.8.0` | `runpod/worker-vllm:dev-cuda11.8.0` | Available on all RunPod Workers without additional selection needed.        |
| 12.1.0       | `runpod/worker-vllm:0.3.0-cuda12.1.0` | `runpod/worker-vllm:dev-cuda12.1.0` | When creating an Endpoint, select CUDA Version 12.2 and 12.1 in the filter. |

This table provides a reference to the image tags you should use based on the desired CUDA version and image stability, stable or development.
Ensure to follow the selection note for CUDA 12.1.0 compatibility.

## Environment variables

:::note

`MODEL_NAME` is a mandatory setting.
All other configurations are optional but recommended for tailored operation.

Boolean values are represented by `0` for false and `1` true.
:::

### LLM settings

Configure your vLLM Worker by setting environment variables as needed.
For instance, `MODEL_NAME` might be `openchat/openchat-3.5-1210`, with `HF_TOKEN` set to your Hugging Face API token for accessing private models.

| Name                | Default          | Type/Choices                                              | Description                                                                                                                                                                                                                                                                                               |
| ------------------- | ---------------- | --------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MODEL_NAME`        | -                | `str`                                                     | Hugging Face Model Repository (e.g., `openchat/openchat-3.5-1210`).                                                                                                                                                                                                                                       |
| `MODEL_REVISION`    | `None`           | `str`                                                     | Model revision(branch) to load.                                                                                                                                                                                                                                                                           |
| `MAX_MODEL_LENGTH`  | Model's maximum  | `int`                                                     | Maximum number of tokens for the engine to handle per request.                                                                                                                                                                                                                                            |
| `BASE_PATH`         | `/runpod-volume` | `str`                                                     | Storage directory for Huggingface cache and model. Utilizes network storage if attached when pointed at `/runpod-volume`, which will have only one worker download the model once, which all workers will be able to load. If no network volume is present, creates a local directory within each worker. |
| `LOAD_FORMAT`       | `auto`           | `str`                                                     | Format to load model in.                                                                                                                                                                                                                                                                                  |
| `HF_TOKEN`          | -                | `str`                                                     | Hugging Face token for private and gated models.                                                                                                                                                                                                                                                          |
| `QUANTIZATION`      | `None`           | `awq`, `squeezellm`, `gptq`                               | Quantization of given model. The model must already be quantized.                                                                                                                                                                                                                                         |
| `TRUST_REMOTE_CODE` | `0`              | boolean as `int`                                          | Trust remote code for Hugging Face models. Can help with Mixtral 8x7B, Quantized models, and unusual models/architectures.                                                                                                                                                                                |
| `SEED`              | `0`              | `int`                                                     | Sets random seed for operations.                                                                                                                                                                                                                                                                          |
| `KV_CACHE_DTYPE`    | `auto`           | boolean as `int`                                          | Data type for kv cache storage. Uses `DTYPE` if set to `auto`.                                                                                                                                                                                                                                            |
| `DTYPE`             | `auto`           | `auto`, `half`, `float16`, `bfloat16`, `float`, `float32` | Sets datatype/precision for model weights and activations.                                                                                                                                                                                                                                                |

### Tokenizer settings

Fine-tune how text is converted into tokens with these settings.

| Name                   | Default | Type/Choices                        | Description                                                                                                                       |
| ---------------------- | ------- | ----------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `TOKENIZER_NAME`       | `None`  | `str`                               | Tokenizer repository to use a different tokenizer than the model's default.                                                       |
| `TOKENIZER_REVISION`   | `None`  | `str`                               | Tokenizer revision to load.                                                                                                       |
| `CUSTOM_CHAT_TEMPLATE` | `None`  | `str` of single-line jinja template | Custom chat jinja template. For more information see, [chat templates](https://huggingface.co/docs/transformers/chat_templating). |

### System, GPU, and tensor parallelism (Multi-GPU) Settings

These settings optimize hardware utilization and parallel processing capabilities, enhancing performance and efficiency for your vLLM Worker.

| Name                           | Default | Type/Choices     | Description                                                                                                                         |
| ------------------------------ | ------- | ---------------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `GPU_MEMORY_UTILIZATION`       | `0.95`  | `float`          | Sets GPU VRAM utilization.                                                                                                          |
| `MAX_PARALLEL_LOADING_WORKERS` | `None`  | `int`            | Load model sequentially in multiple batches, to avoid RAM OOM when using tensor parallel and large models.                          |
| `BLOCK_SIZE`                   | `16`    | `8`, `16`, `32`  | Token block size for contiguous chunks of tokens.                                                                                   |
| `SWAP_SPACE`                   | `4`     | `int`            | CPU swap space size (GiB) per GPU.                                                                                                  |
| `ENFORCE_EAGER`                | `0`     | boolean as `int` | Always use eager-mode PyTorch. If False(`0`), will use eager mode and CUDA graph in hybrid for maximal performance and flexibility. |
| `MAX_CONTEXT_LEN_TO_CAPTURE`   | `8192`  | `int`            | Maximum context length covered by CUDA graphs. When a sequence has context length larger than this, we fall back to eager mode.     |
| `DISABLE_CUSTOM_ALL_REDUCE`    | `0`     | `int`            | Enables or disables custom all reduce.                                                                                              |

### Streaming batch size settings

Control the batch size for streaming tokens, reducing HTTP request overhead and optimizing throughput with settings like `DEFAULT_BATCH_SIZE` and related parameters.

| Name                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | Default | Type/Choices | Description                                                                                          |
| ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ------------ | ---------------------------------------------------------------------------------------------------- |
| `DEFAULT_BATCH_SIZE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | `50`    | `int`        | Default and Maximum batch size for token streaming to reduce HTTP calls.                             |
| `DEFAULT_MIN_BATCH_SIZE`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | `1`     | `int`        | Batch size for the first request, which is multiplied by the growth factor every subsequent request. |
| `DEFAULT_BATCH_SIZE_GROWTH_FACTOR`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `3`     | `float`      | Growth factor for dynamic batch size.                                                                |

The first request will have a batch size of `DEFAULT_MIN_BATCH_SIZE`, and each subsequent request will have a batch size of `previous_batch_size * DEFAULT_BATCH_SIZE_GROWTH_FACTOR`.
This will continue until the batch size reaches `DEFAULT_BATCH_SIZE`.

For example, the default values, the batch sizes will be `1, 3, 9, 27, 50, 50, 50, ...`.
You can also specify this per request, with inputs `max_batch_size`, `min_batch_size`, and `batch_size_growth_factor`. 
This has nothing to do with vLLM's internal batching, but rather the number of tokens sent in each HTTP request from the worker.

### OpenAI settings

Configure compatibility with OpenAI's API, including output formatting and model naming.

| Name                                | Default     | Type/Choices     | Description                                                                                                                                                                       |
| ----------------------------------- | ----------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `RAW_OPENAI_OUTPUT`                 | `1`         | boolean as `int` | Enables raw OpenAI SSE format string output when streaming. Required to be enabled (which it is by default) for OpenAI compatibility.                                             |
| `OPENAI_SERVED_MODEL_NAME_OVERRIDE` | `None`      | `str`            | Overrides the name of the served model from model repo/path to specified name, which you will then be able to use the value for the `model` parameter when making OpenAI requests |
| `OPENAI_RESPONSE_ROLE`              | `assistant` | `str`            | Role of the LLM's Response in OpenAI Chat Completions.                                                                                                                            |

### Serverless settings

Maximize the scalability and efficiency of your vLLM Worker in serverless environments with concurrency and logging settings.

| Name                   | Default | Type/Choices     | Description                                                                                                                                                                |
| ---------------------- | ------- | ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `MAX_CONCURRENCY`      | `300`   | `int`            | Max concurrent requests per worker. vLLM has an internal queue, so you don't have to worry about limiting by VRAM, this is for improving scaling/load balancing efficiency |
| `DISABLE_LOG_STATS`    | `1`     | boolean as `int` | Enables or disables vLLM stats logging.                                                                                                                                    |
| `DISABLE_LOG_REQUESTS` | `1`     | boolean as `int` | Enables or disables vLLM request logging.                                                                                                                                  |

:::tip

For advanced model scenarios, such as using Mixtral 8x7B or quantized models, consider enabling `TRUST_REMOTE_CODE` to ensure compatibility and performance.

:::
