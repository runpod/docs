# Documentation Agent Tests

Minimal test definitions that simulate real user prompts. Tests are intentionally sparse - the agent must figure out how to accomplish the goal using only the documentation.

## How to Run

Use the `/test` command:

```
/test flash-quickstart           # Single test
/test serverless                 # All serverless tests
/test pods local                 # All pod tests with local docs
/test smoke                      # Smoke tests only
```

Or natural language:

```
Run the flash-quickstart test
Run all vLLM tests
Run smoke tests using local docs
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

### Test Tiers

**Smoke tests** - Fast tests that don't deploy GPU resources. Use for quick validation:
```
Run smoke tests
Run all smoke tests using local docs
```

**Full tests** - All tests including GPU deployments. Use for comprehensive validation.

## Test Format

Each test has:
- **ID**: Unique identifier for the test
- **Goal**: What a user would ask (one sentence, no hints)
- **Expected Outcome**: What constitutes PASS (objective, measurable)

Cleanup rules are defined in the [Cleanup Rules](#cleanup-rules) section at the bottom. All test resources use the `doc_test_` prefix.

---

## Smoke Tests

Fast tests that don't require GPU deployments. Run these for quick validation.

| ID | Goal | Expected Outcome |
|----|------|------------------|
| sdk-python-install | Install the Runpod Python SDK | `import runpod` succeeds |
| sdk-js-install | Install the Runpod JavaScript SDK | `require('runpod-sdk')` succeeds |
| cli-install | Install runpodctl on your local machine | `runpodctl version` returns version |
| cli-configure | Configure runpodctl with your API key | `runpodctl config` shows configured key |
| cli-list-pods | List pods using runpodctl | `runpodctl get pods` returns list |
| template-list | List all templates | API returns template array |
| api-key-create | Create an API key with specific permissions | New API key ID returned |
| pods-add-ssh-key | Add an SSH key to your Runpod account | Key appears in account |
| public-flux | Generate an image using FLUX public endpoint | Image data returned |
| public-qwen | Use the Qwen3 32B public endpoint | Chat completion returned |
| public-video | Generate video using WAN public endpoint | Video generation starts |
| serverless-metrics | View endpoint metrics (execution time, delay) | Metrics data returned |

**Run smoke tests:**
```
Run smoke tests
Run all smoke tests using local docs
```

---

## Flash SDK

| ID | Goal | Expected Outcome |
|----|------|------------------|
| flash-quickstart | Deploy a GPU function using Flash | Endpoint responds to request |
| flash-hello-gpu | Run a simple PyTorch function on a GPU | PyTorch GPU tensor returned |
| flash-sdxl | Generate an image using SDXL with Flash | Image bytes returned |
| flash-text-gen | Deploy a text generation model with Flash | Generated text returned |
| flash-dependencies | Deploy a function with custom pip dependencies | Function using deps succeeds |
| flash-multi-gpu | Create an endpoint that uses multiple GPUs | Multi-GPU endpoint responds |
| flash-cpu-endpoint | Deploy a CPU-only endpoint with Flash | CPU endpoint responds |
| flash-load-balancer | Build a REST API with load balancing using Flash | Multiple routes respond |
| flash-mixed-workers | Create an app with both GPU and CPU workers | Both worker types respond |
| flash-env-vars | Configure environment variables for a Flash endpoint | Env vars accessible in function |
| flash-idle-timeout | Set a custom idle timeout for a Flash endpoint | Timeout visible in config |
| flash-app-deploy | Initialize and deploy a complete Flash app | App deploys successfully |
| flash-local-test | Test a Flash function locally before deploying | Local test passes |

---

## Serverless Endpoints

> **Important:** Do NOT use public endpoints for these tests. The goal is to test the full deployment workflow: deploy an endpoint, send requests, and verify the integration works. Public endpoints are a separate product and skip the deployment steps we need to validate.

| ID | Goal | Expected Outcome |
|----|------|------------------|
| serverless-create-endpoint | Create a serverless endpoint | Endpoint ID returned |
| serverless-serve-qwen | Create an endpoint to serve a Qwen model | Chat completion works |
| serverless-custom-handler | Write a custom handler function and deploy it | Handler responds to request |
| serverless-logs | Build a custom handler that uses progress_update() to send log messages, deploy it, and verify updates appear in /status polling | Progress updates in /status |
| serverless-send-request | Send a request to an existing endpoint | Response received |
| serverless-async-request | Submit an async job and poll for results | Job completes, output returned |
| serverless-sync-request | Make a synchronous request to an endpoint using /runsync | Sync response returned |
| serverless-streaming | Build a custom handler that uses yield to stream results, deploy it, and test the /stream endpoint | Streamed chunks received |
| serverless-webhook | Set up webhook notifications for a serverless endpoint | Webhook receives callback |
| serverless-cancel-job | Cancel a running or queued job | Job status is CANCELLED |
| serverless-queue-delay | Create an endpoint with queue delay scaling | Scaler type is QUEUE_DELAY |
| serverless-request-count | Create an endpoint with request count scaling | Scaler type is REQUEST_COUNT |
| serverless-min-workers | Create an endpoint with 1 minimum active worker | workersMin is 1 |
| serverless-idle-timeout | Create an endpoint with an idle timeout of 20 seconds | idleTimeout is 20 |
| serverless-gpu-priority | Create an endpoint with GPU type priority/fallback | Multiple GPU types listed |
| serverless-docker-deploy | Deploy an endpoint from Docker Hub | Endpoint from Docker image |
| serverless-github-deploy | Deploy an endpoint from GitHub | Endpoint from GitHub repo |
| serverless-ssh-worker | SSH into a running worker for debugging | SSH session established |
| serverless-metrics | View endpoint metrics (execution time, delay) | Metrics data returned |

---

## vLLM

> **Important:** Do NOT use public endpoints for these tests. Deploy your own vLLM endpoint to test the full workflow. Public endpoints skip the deployment and configuration steps we need to validate.

| ID | Goal | Expected Outcome |
|----|------|------------------|
| vllm-deploy | Deploy a vLLM endpoint | Endpoint responds to /health |
| vllm-openai-compat | Use the OpenAI Python client with a vLLM endpoint | OpenAI client call succeeds |
| vllm-chat-completion | Send a chat completion request to vLLM | Chat response returned |
| vllm-streaming | Stream responses from a vLLM endpoint | Streamed tokens received |
| vllm-custom-model | Deploy a custom/fine-tuned model with vLLM | Custom model responds |
| vllm-gated-model | Deploy a gated Hugging Face model with vLLM | Gated model loads and responds |

---

## Pods

| ID | Goal | Expected Outcome |
|----|------|------------------|
| pods-quickstart-terminal | Complete the Pod quickstart using only the terminal | Code runs on Pod via SSH |
| pods-add-ssh-key | Add an SSH key to your Runpod account | Key appears in account |
| pods-create | Create a GPU Pod | Pod status is RUNNING |
| pods-start-stop | Start and stop an existing Pod | Pod starts and stops |
| pods-ssh-connect | Connect to a Pod via SSH | SSH session established |
| pods-expose-port | Expose a custom port on a Pod | Port accessible via URL |
| pods-env-vars | Set environment variables on a Pod | Env vars visible in Pod |
| pods-resize-storage | Resize a Pod's container or volume disk | Storage size increased |
| pods-template-use | Deploy a Pod using a custom template | Pod uses template config |
| pods-template-create | Create a custom Pod template | Template ID returned |
| pods-comfyui | Deploy ComfyUI on a Pod and generate an image | ComfyUI generates image |

---

## Storage

| ID | Goal | Expected Outcome |
|----|------|------------------|
| storage-create-volume | Create a network volume | Volume ID returned |
| storage-attach-pod | Attach a network volume to a Pod | Volume mounted in Pod |
| storage-attach-serverless | Attach a network volume to a Serverless endpoint | Volume accessible to workers |
| storage-s3-api | Access a network volume using the S3 API | S3 list/read works |
| storage-upload-s3 | Upload a file to a network volume using S3 | File appears on volume |
| storage-download-s3 | Download a file from a network volume using S3 | File downloaded locally |
| storage-runpodctl-send | Transfer files between Pods using runpodctl | File arrives on target Pod |
| storage-migrate-volume | Migrate data between network volumes | Data exists on new volume |
| storage-cloud-sync | Sync data with cloud storage (S3, GCS) | Data synced both ways |
| storage-scp-transfer | Transfer files to a Pod using SCP | File arrives on Pod |
| storage-rsync | Sync files to a Pod using rsync | Files synced to Pod |

---

## Templates

| ID | Goal | Expected Outcome |
|----|------|------------------|
| template-create-pod | Create a Pod template | Template ID returned |
| template-create-serverless | Create a Serverless template | Template ID returned |
| template-list | List all templates | Template array returned |
| template-preload-model | Create a template with a pre-loaded model | Model preloads on start |
| template-custom-dockerfile | Create a template with a custom Dockerfile | Template uses custom image |
| template-env-vars | Add environment variables to a template | Env vars in template config |

---

## Instant Clusters

| ID | Goal | Expected Outcome |
|----|------|------------------|
| cluster-create | Create an Instant Cluster | Cluster nodes are RUNNING |
| cluster-pytorch | Run distributed PyTorch training on a cluster | Training completes on all nodes |
| cluster-slurm | Deploy a Slurm cluster | Slurm queue accepts jobs |
| cluster-axolotl | Fine-tune an LLM with Axolotl on a cluster | Fine-tuning starts |

---

## SDKs & APIs

| ID | Goal | Expected Outcome |
|----|------|------------------|
| sdk-python-install | Install the Runpod Python SDK | `import runpod` succeeds |
| sdk-python-endpoint | Use the Python SDK to call an endpoint | SDK call returns response |
| sdk-js-install | Install the Runpod JavaScript SDK | `require('runpod-sdk')` succeeds |
| sdk-js-endpoint | Use the JavaScript SDK to call an endpoint | SDK call returns response |
| api-graphql-query | Make a GraphQL query to list pods | Query returns pod list |
| api-graphql-mutation | Create a resource using GraphQL mutation | Resource created via mutation |
| api-key-create | Create an API key with specific permissions | New API key ID returned |
| api-key-restricted | Create a restricted API key | Key has limited permissions |

---

## CLI (runpodctl)

| ID | Goal | Expected Outcome |
|----|------|------------------|
| cli-install | Install runpodctl on your local machine | `runpodctl version` returns version |
| cli-configure | Configure runpodctl with your API key | `runpodctl config` shows key |
| cli-list-pods | List pods using runpodctl | `runpodctl get pods` returns list |
| cli-create-pod | Create a pod using runpodctl | Pod ID returned |
| cli-send-file | Send a file to a Pod using runpodctl | File arrives on Pod |
| cli-receive-file | Receive a file from a Pod using runpodctl | File downloaded locally |

---

## Model Caching

| ID | Goal | Expected Outcome |
|----|------|------------------|
| cache-enable | Create an endpoint with model caching enabled | Caching enabled in config |

---

## Integrations

| ID | Goal | Expected Outcome |
|----|------|------------------|
| integration-openai-migrate | Create an OpenAI-compatible endpoint | OpenAI client works |
| integration-vercel-ai | Create an image generation app with the Vercel AI SDK | Image generated via Vercel AI |
| integration-cursor | Configure Cursor to use Runpod endpoints | Cursor uses Runpod backend |
| integration-skypilot | Use Runpod with SkyPilot | SkyPilot launches on Runpod |

---

## Public Endpoints

| ID | Goal | Expected Outcome |
|----|------|------------------|
| public-flux | Generate an image using FLUX public endpoint | Image data returned |
| public-qwen | Use the Qwen3 32B public endpoint | Chat completion returned |
| public-video | Generate video using WAN public endpoint | Video generation starts |

---

## Tutorials (End-to-End)

| ID | Goal | Expected Outcome |
|----|------|------------------|
| tutorial-sdxl-serverless | Deploy SDXL as a serverless endpoint | SDXL generates image |
| tutorial-comfyui-pod | Deploy ComfyUI on a Pod and generate an image | ComfyUI workflow executes |
| tutorial-comfyui-serverless | Deploy ComfyUI as a serverless endpoint and generate an image | ComfyUI endpoint generates image |
| tutorial-gemma-chatbot | Deploy a Gemma 3 chatbot with vLLM | Chatbot responds |
| tutorial-custom-worker | Build and deploy a custom worker | Custom worker responds |
| tutorial-web-integration | Integrate a Serverless endpoint into a web application | Web app calls endpoint |
| tutorial-dual-mode-worker | Deploy a dual-mode (Pod/Serverless) worker | Both modes work |
| tutorial-model-caching | Create an endpoint with model caching enabled | Caching improves cold start |
| tutorial-pytorch-cluster | Deploy a PyTorch cluster | Distributed training runs |

---

## Cleanup Rules

All test resources must use the `doc_test_` prefix. After each test:

- **endpoints**: Delete endpoints matching `doc_test_*`
- **pods**: Delete pods matching `doc_test_*`
- **templates**: Delete templates matching `doc_test_*`
- **network-volumes**: Delete network volumes matching `doc_test_*`
- **clusters**: Delete clusters matching `doc_test_*`
- **none**: No cleanup needed (read-only test)
