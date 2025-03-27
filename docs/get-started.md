---
title: Quickstart
sidebar_position: 2
description: "Learn how to create a RunPod account, add funds, and deploy your first GPU Pod."
---

# Get started with RunPod

Learn how to create an account and deploy your first Pod.

## Create an account

Start by creating a RunPod account to access GPU Pods and Serverless compute resources:

1. [Sign up here](https://www.runpod.io/console/signup).
2. Verify your email address.
3. Set up two-factor authentication (recommended for security).

## Add funds to your account

Before deploying resources, you'll need to add funds to your account:

1. Open the [Billing page](https://www.runpod.io/console/user/billing).
2. Choose your preferred payment method:
   - Credit/debit card
   - Cryptocurrency (Bitcoin, Ethereum, etc.)
3. Complete the payment process.

For detailed information on payment methods and billing policies, see [Billing information](/get-started/billing-information).

## Launch your first Pod

Now that you've funded your account, you're ready to deploy computing resources.

### 1. Deploy a Pod and connect to JupyterLab

Follow this step-by-step guide to deploy a Pod and use it to run code in JupyterLab:

<iframe
  src="https://app.tango.us/app/embed/e494032e-b628-45d6-a134-fd86bb76b668"
  sandbox="allow-scripts allow-top-navigation-by-user-activation allow-popups allow-same-origin"
  security="restricted"
  title="Deploy your first pod"
  width="100%"
  height="600px"
  referrerpolicy="strict-origin-when-cross-origin"
  frameborder="0"
  allowfullscreen
></iframe>

### 2. Clean up

To avoid incurring extra charges, make sure to:

1. Return to the [Pods page](https://www.runpod.io/console/pods) when you're finished.
2. [Stop your Pod](/pods/manage-pods#stop-a-pod) if you plan to use it again later.
3. [Terminate your Pod](/pods/manage-pods#terminate-a-pod) if you no longer need it.

:::warning
You will be charged for idle Pods even if they are stopped. If you don't need to retain your Pod environment, you should terminate it completely.
:::

## Next steps

Now that you've learned the basics, you're ready to:

- Generate [API keys](/get-started/api-keys) for programmatic access.
- Connect to RunPod using the [REST API](https://rest.runpod.io/v1/docs) or [command-line interface](/runpodctl/overview).
- Learn how to [choose the right Pod](/pods/choose-a-pod) for your workload.
- Build production-ready applications with [Serverless](/serverless/get-started).
- Explore [tutorials](/tutorials/overview) for specific use cases.

## Need help?

- Join the [Discord community](https://discord.gg/cUpRmau42V).
- Reach out via [email](mailto:help@runpod.io).
- Submit a request using the [contact page](https://contact.runpod.io/hc/requests/new).