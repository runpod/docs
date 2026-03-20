# Documentation Agent Tests

Minimal test definitions that simulate real user prompts. Tests are intentionally sparse - the agent must figure out how to accomplish the goal using only the documentation.

## How to Run

In Claude Code, use natural language:

```
Run the flash-quickstart test
```

```
Run all vLLM tests
```

### Doc Source Modes

**Published docs (default)** - Uses the Runpod Docs MCP server to search published documentation:
```
Run the vllm-deploy test
```

**Local docs** - Reads MDX files directly from this repo (use to validate unpublished changes):
```
Run the vllm-deploy test using local docs
```

When using local docs, the agent will search and read `.mdx` files in this repository instead of querying the MCP server.

## Test Format

Each test has:
- **ID**: Unique identifier for the test
- **Goal**: What a user would ask (one sentence, no hints)
- **Cleanup**: Resources to delete after test (all use `doc_test_*` prefix)

---

## Flash SDK

| ID | Goal | Difficulty |
|----|------|------------|
| flash-quickstart | Deploy a GPU function using Flash | Easy |
| flash-hello-gpu | Run a simple PyTorch function on a GPU | Easy |
| flash-sdxl | Generate an image using SDXL with Flash | Medium |
| flash-text-gen | Deploy a text generation model with Flash | Medium |
| flash-dependencies | Deploy a function with custom pip dependencies | Easy |
| flash-multi-gpu | Create an endpoint that uses multiple GPUs | Medium |
| flash-cpu-endpoint | Deploy a CPU-only endpoint with Flash | Easy |
| flash-load-balancer | Build a REST API with load balancing using Flash | Hard |
| flash-mixed-workers | Create an app with both GPU and CPU workers | Hard |
| flash-env-vars | Configure environment variables for a Flash endpoint | Easy |
| flash-idle-timeout | Set a custom idle timeout for a Flash endpoint | Easy |
| flash-app-deploy | Initialize and deploy a complete Flash app | Medium |
| flash-local-test | Test a Flash function locally before deploying | Medium |

---

## Serverless Endpoints

> **Important:** Do NOT use public endpoints for these tests. The goal is to test the full deployment workflow: deploy an endpoint, send requests, and verify the integration works. Public endpoints are a separate product and skip the deployment steps we need to validate.

| ID | Goal | Difficulty |
|----|------|------------|
| serverless-create-endpoint | Create a serverless endpoint | Medium |
| serverless-serve-qwen | Create an endpoint to serve a Qwen model | Hard |
| serverless-custom-handler | Write a custom handler function and deploy it | Hard |
| serverless-logs | Build a custom handler that uses progress_update() to send log messages, deploy it, and verify updates appear in /status polling | Hard |
| serverless-send-request | Send a request to an existing endpoint | Easy |
| serverless-async-request | Submit an async job and poll for results | Medium |
| serverless-sync-request | Make a synchronous request to an endpoint using /runsync | Easy |
| serverless-streaming | Build a custom handler that uses yield to stream results, deploy it, and test the /stream endpoint | Hard |
| serverless-webhook | Set up webhook notifications for a serverless endpoint | Medium |
| serverless-cancel-job | Cancel a running or queued job | Easy |
| serverless-queue-delay | Create an endpoint with queue delay scaling | Medium |
| serverless-request-count | Create an endpoint with request count scaling | Medium |
| serverless-min-workers | Create an endpoint with 1 minimum active worker | Easy |
| serverless-idle-timeout | Create an endpoint with an idle timeout of 20 seconds | Easy |
| serverless-gpu-priority | Create an endpoint with GPU type priority/fallback | Medium |
| serverless-docker-deploy | Deploy an endpoint from Docker Hub | Hard |
| serverless-github-deploy | Deploy an endpoint from GitHub | Hard |
| serverless-ssh-worker | SSH into a running worker for debugging | Medium |
| serverless-metrics | View endpoint metrics (execution time, delay) | Easy |

---

## vLLM

> **Important:** Do NOT use public endpoints for these tests. Deploy your own vLLM endpoint to test the full workflow. Public endpoints skip the deployment and configuration steps we need to validate.

| ID | Goal | Difficulty |
|----|------|------------|
| vllm-deploy | Deploy a vLLM endpoint | Medium |
| vllm-openai-compat | Use the OpenAI Python client with a vLLM endpoint | Medium |
| vllm-chat-completion | Send a chat completion request to vLLM | Easy |
| vllm-streaming | Stream responses from a vLLM endpoint | Medium |
| vllm-custom-model | Deploy a custom/fine-tuned model with vLLM | Hard |
| vllm-gated-model | Deploy a gated Hugging Face model with vLLM | Medium |

---

## Pods

| ID | Goal | Difficulty |
|----|------|------------|
| pods-create | Create a GPU Pod | Medium |
| pods-start-stop | Start and stop an existing Pod | Easy |
| pods-ssh-connect | Connect to a Pod via SSH | Medium |
| pods-expose-port | Expose a custom port on a Pod | Medium |
| pods-env-vars | Set environment variables on a Pod | Easy |
| pods-resize-storage | Resize a Pod's container or volume disk | Easy |
| pods-template-use | Deploy a Pod using a custom template | Medium |
| pods-template-create | Create a custom Pod template | Hard |
| pods-comfyui | Deploy ComfyUI on a Pod and generate an image | Hard |

---

## Storage

| ID | Goal | Difficulty |
|----|------|------------|
| storage-create-volume | Create a network volume | Easy |
| storage-attach-pod | Attach a network volume to a Pod | Medium |
| storage-attach-serverless | Attach a network volume to a Serverless endpoint | Medium |
| storage-s3-api | Access a network volume using the S3 API | Hard |
| storage-upload-s3 | Upload a file to a network volume using S3 | Hard |
| storage-download-s3 | Download a file from a network volume using S3 | Hard |
| storage-runpodctl-send | Transfer files between Pods using runpodctl | Easy |
| storage-migrate-volume | Migrate data between network volumes | Hard |
| storage-cloud-sync | Sync data with cloud storage (S3, GCS) | Hard |
| storage-scp-transfer | Transfer files to a Pod using SCP | Medium |
| storage-rsync | Sync files to a Pod using rsync | Medium |

---

## Templates

| ID | Goal | Difficulty |
|----|------|------------|
| template-create-pod | Create a Pod template | Medium |
| template-create-serverless | Create a Serverless template | Medium |
| template-list | List all templates | Easy |
| template-preload-model | Create a template with a pre-loaded model | Hard |
| template-custom-dockerfile | Create a template with a custom Dockerfile | Hard |
| template-env-vars | Add environment variables to a template | Easy |

---

## Instant Clusters

| ID | Goal | Difficulty |
|----|------|------------|
| cluster-create | Create an Instant Cluster | Medium |
| cluster-pytorch | Run distributed PyTorch training on a cluster | Hard |
| cluster-slurm | Deploy a Slurm cluster | Hard |
| cluster-axolotl | Fine-tune an LLM with Axolotl on a cluster | Hard |

---

## SDKs & APIs

| ID | Goal | Difficulty |
|----|------|------------|
| sdk-python-install | Install the Runpod Python SDK | Easy |
| sdk-python-endpoint | Use the Python SDK to call an endpoint | Easy |
| sdk-js-install | Install the Runpod JavaScript SDK | Easy |
| sdk-js-endpoint | Use the JavaScript SDK to call an endpoint | Easy |
| api-graphql-query | Make a GraphQL query to list pods | Medium |
| api-graphql-mutation | Create a resource using GraphQL mutation | Medium |
| api-key-create | Create an API key with specific permissions | Easy |
| api-key-restricted | Create a restricted API key | Medium |

---

## CLI (runpodctl)

| ID | Goal | Difficulty |
|----|------|------------|
| cli-install | Install runpodctl on your local machine | Easy |
| cli-configure | Configure runpodctl with your API key | Easy |
| cli-list-pods | List pods using runpodctl | Easy |
| cli-create-pod | Create a pod using runpodctl | Medium |
| cli-send-file | Send a file to a Pod using runpodctl | Medium |
| cli-receive-file | Receive a file from a Pod using runpodctl | Medium |

---

## Model Caching

| ID | Goal | Difficulty |
|----|------|------------|
| cache-enable | Create an endpoint with model caching enabled | Medium |

---

## Integrations

| ID | Goal | Difficulty |
|----|------|------------|
| integration-openai-migrate | Create an OpenAI-compatible endpoint | Medium |
| integration-vercel-ai | Create an image generation app with the Vercel AI SDK | Medium |
| integration-cursor | Configure Cursor to use Runpod endpoints | Medium |
| integration-skypilot | Use Runpod with SkyPilot | Hard |

---

## Public Endpoints

| ID | Goal | Difficulty |
|----|------|------------|
| public-flux | Generate an image using FLUX public endpoint | Easy |
| public-qwen | Use the Qwen3 32B public endpoint | Easy |
| public-video | Generate video using WAN public endpoint | Medium |

---

## Tutorials (End-to-End)

| ID | Goal | Difficulty |
|----|------|------------|
| tutorial-sdxl-serverless | Deploy SDXL as a serverless endpoint | Medium |
| tutorial-comfyui-pod | Deploy ComfyUI on a Pod and generate an image | Medium |
| tutorial-comfyui-serverless | Deploy ComfyUI as a serverless endpoint and generate an image | Hard |
| tutorial-gemma-chatbot | Deploy a Gemma 3 chatbot with vLLM | Medium |
| tutorial-custom-worker | Build and deploy a custom worker | Hard |
| tutorial-web-integration | Integrate a Serverless endpoint into a web application | Hard |
| tutorial-dual-mode-worker | Deploy a dual-mode (Pod/Serverless) worker | Hard |
| tutorial-model-caching | Create an endpoint with model caching enabled | Hard |
| tutorial-pytorch-cluster | Deploy a PyTorch cluster | Hard |

---
---

## Cleanup Rules

All test resources must use the `doc_test_` prefix. After each test:

- **endpoints**: Delete endpoints matching `doc_test_*`
- **pods**: Delete pods matching `doc_test_*`
- **templates**: Delete templates matching `doc_test_*`
- **network-volumes**: Delete network volumes matching `doc_test_*`
- **clusters**: Delete clusters matching `doc_test_*`
- **none**: No cleanup needed (read-only test)
