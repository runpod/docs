---
title: "Deploy from GitHub"
sidebar_position: 7
description: "Learn how to deploy Serverless workers directly from GitHub."
---

# Deploy workers from GitHub

Learn how to deploy a [Serverless worker](/serverless/workers/overview) directly from a GitHub repository to a [Serverless endpoint](/serverless/endpoints/overview).

## How GitHub integration works

RunPod's GitHub integration simplifies your workflow by pulling your code and Dockerfile from GitHub, building the container image, storing it in RunPod's secure container registry, and deploying it to your endpoint.

## Requirements

To deploy a worker from GitHub, you need:

- A working [handler function](/serverless/workers/handler-functions) in a GitHub repository.
- A Dockerfile in your repository. See [Creating a Dockerfile](/serverless/workers/deploy#creating-a-dockerfile) for details.
- A GitHub account.

## Authorizing RunPod with GitHub

Before deploying from GitHub, you need to authorize RunPod to access your repositories:

1. Open the [settings page](http://runpod.io/console/user/settings) in the RunPod console.
2. Find the **GitHub** card under **Connections** and click **Connect**.
3. Sign in using the GitHub authorization flow. This will open your GitHub account settings page.
4. Choose which repositories RunPod can access:
   - **All repositories:** Access to all current and future repositories.
   - **Only select repositories:** Choose specific repositories.
5. Click **Save**.

You can manage this connection using RunPod settings or GitHub account settings, in the **Applications** tab.

## Deploying from GitHub

To deploy a worker from a GitHub repository:

1. Go to the [Serverless section](https://www.runpod.io/console/serverless) of the RunPod console
2. Click **New Endpoint**
3. Under **Custom Source**, select **GitHub Repo**, then click **Next**
4. Use the search bar or menu to select the repository containing your code. This menu is populated with all repos connected to your account (repos you've forked/created, or owned by your GitHub organizations).
5. Configure your deployment options:
   - **Branch:** Select which branch to deploy from.
   - **Dockerfile:** Specify the path to your Dockerfile (if not in root).
6. (Optional) Enter a custom name for your endpoint.
7. Configure your compute resources (GPU type, worker count, etc.).
8. Click **Create Endpoint**.

RunPod will build your Docker image and deploy it to your endpoint automatically. You'll be redirected to the endpoint details page when complete.

## Monitoring build status

You can monitor your build status in the **Builds** tab of your endpoint detail page. Builds progress through these statuses:

| Status | Description |
|--------|-------------|
| Pending | RunPod is scheduling the build. |
| Building | RunPod is building your container. |
| Uploading | RunPod is uploading your container to the registry. |
| Testing | RunPod is testing your Serverless worker. |
| Completed | RunPod completed the build and upload. |
| Failed | Something went wrong (check build logs). |

## Managing multiple environments

GitHub integration enables streamlined development workflows by supporting multiple environments:

- Production endpoint tracking the `main` branch.
- Staging endpoint tracking the `dev` branch.

To set up multiple environments:

1. Create a new branch for your staging endpoint.
2. [Create an endpoint](#deploying-from-github) for your production branch.
3. On the Serverless page of the RunPod console, click the three dots to the top right of your production endpoint. Click **Clone Endpoint**.
4. Expand the **Repository Configuration** section and select your staging branch.
5. Click **Create Endpoint**.

Each environment maintains independent GPU and worker configurations.

## Continuous integration with GitHub Actions

You can enhance your workflow with GitHub Actions for testing before deployment:

1. Create a workflow file at `.github/workflows/test-and-deploy.yml`:

      ```yaml
      name: Test and Deploy

      on:
      push:
         branches: [ main ]
      pull_request:
         branches: [ main ]

      jobs:
      test-and-deploy:
         runs-on: ubuntu-latest
         steps:
         - uses: actions/checkout@v3
         
         - name: Build and push Docker image
            uses: docker/build-push-action@v4
            with:
            context: .
            push: true
            tags: [DOCKER_USERNAME]/[WORKER_NAME]:${{ github.sha }}
            
         - name: Run Tests
            uses: runpod/runpod-test-runner@v1
            with:
            image-tag: [DOCKER_USERNAME]/[WORKER_NAME]:${{ github.sha }}
            runpod-api-key: ${{ secrets.RUNPOD_API_KEY }} # Add your API key to a GitHub secret
            test-filename: .github/tests.json
            request-timeout: 300
      ```

      :::tip

      To add your RunPod API key to a GitHub secret, see [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions).

      :::

2. Create test cases for your repository at `.github/tests.json`:

      ```json
      [
      {
         "input": {
            "prompt": "Test input 1"
         },
         "expected_output": {
            "status": "COMPLETED"
         }
      },
      {
         "input": {
            "prompt": "Test input 2",
            "parameter": "value"
         },
         "expected_output": {
            "status": "COMPLETED"
         }
      }
      ]
      ```

## Known limitations

RunPod's GitHub integration has a few limitations to be aware of:

## GitHub integration limitations

When using GitHub integration with RunPod, be aware of these important limitations:

- **Build time limit**: Builds must complete within 160 minutes (2.5 hours). Optimize your Dockerfile for efficiency with large images to avoid timeouts.
- **Image size restriction**: Docker images cannot exceed 100 GB. Plan your image requirements accordingly, particularly when including large model weights or dependencies.
- **Base image limitations**: The integration doesn't support privately hosted images as base images. Consider incorporating essential components directly into your Dockerfile instead.
- **Hardware-specific builds**: Builds requiring GPU access during construction (such as those using GPU-compiled versions of libraries like `bitsandbytes`) are not supported.
- **Platform exclusivity**: Images built through RunPod's image builder service are designed exclusively for RunPod's infrastructure and cannot be pulled or executed on other platforms.
- **Single GitHub connection**: Each RunPod account can link to only one GitHub account. This connection cannot be shared among team members, requiring separate RunPod accounts for collaborative projects.

## Disconnecting GitHub

To disconnect your GitHub account from RunPod:

1. Go to [RunPod Settings](https://www.runpod.io/console/user/settings) → **Connections** → **Edit Connection**
2. Select your GitHub account.
3. Click **Configure**.
4. Scroll down to the Danger Zone.
5. Uninstall "RunPod Inc."

## Troubleshooting deployment issues

If your worker fails to deploy or process requests:

- Check the build logs in the RunPod console for error messages.
- Verify your Dockerfile is properly configured.
- Ensure your handler function works correctly in local testing.
- Check that your repository structure matches what's expected in your Dockerfile.
- Verify you have the necessary permissions on the GitHub repository.

## Next steps

After deploying your worker from GitHub, you can:

- [Send API requests to your endpoint.](/serverless/endpoints/send-requests)
- [Create more advanced handler functions.](/serverless/workers/handler-functions)
- [Optimize your endpoint configurations.](/serverless/endpoints/endpoint-configurations)
- [Learn how to deploy workers from Docker Hub.](/serverless/workers/deploy)