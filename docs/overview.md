---
title: Introduction
description: "RunPod is a cloud computing platform for AI, machine learning, and general compute, offering GPU and CPU resources, serverless computing, and a Command Line Interface for easy deployment and development."
sidebar_position: 1
---

# What is RunPod?

RunPod is a cloud computing platform built for AI, machine learning, and general compute needs. Whether you're running deep learning models, training AI, or deploying cloud-based applications, RunPod provides **scalable, high-performance GPU and CPU resources** to power your workloads.

RunPod offers:

- **High-performance compute:** Access powerful GPU & CPU resources on demand.
- **Flexible deployment:** Deploy your code using [Serverless](/serverless/overview) for autoscaling pay-per-second execution, or [Pods](/pods/overview) for containerized GPU and CPU instances.
- **Command-line interface:** Use the [RunPod command-line interface](/runpodctl/overview) to seamlessly automate deployments.
- **Transparent pricing:** GPUs are billed by the minute, with no fees for ingress/egress. See [RunPod Pricing](https://www.runpod.io/pricing) for details.

Get started today by [signing up for an account](https://www.runpod.io/console/signup).

## Serverless

[Serverless](/serverless/overview) offers **pay-per-second** serverless computing with **built-in autoscaling** for production workloads.

Use Serverless to:

- **Deploy AI workloads** with low cold-start times and robust security.
- Build and expose **REST API endpoints** with autoscaling.
- Queue jobs efficiently **without managing infrastructure**.

Get started with Serverless:

- [Deploy a preconfigured endpoint in seconds from the RunPod Hub.](/hub/overview)
- [Build your first custom Serverless endpoint.](/serverless/get-started)
- [Deploy a large language model endpoint using vLLM.](/serverless/vllm/get-started)

## Pods

[Pods](/pods/overview) allow you to run **containerized workloads** on dedicated GPU or CPU instances.

RunPod offers [two types of Pods](/references/faq/#secure-cloud-vs-community-cloud).

- **Secure Cloud:** Operates in T3/T4 data centers, providing high reliability and security.
- **Community Cloud**: Connects individual compute providers to users through a vetted, secure peer-to-peer system.

Get started with Pods:

- [Deploy your first Pod.](/get-started)
- [Choose the right Pod.](/pods/choose-a-pod)
- [Tutorial: Connect to a Pod instance with VSCode.](/tutorials/pods/connect-to-vscode)

## RunPod CLI

RunPod provides a [command-line interface](/runpodctl/overview) (CLI) tool for programmatically managing Pods, or quickly developing and deploying custom Serverless environments.

For more information, see:

- [CLI overview](/runpodctl/overview)
- [CLI reference](/runpodctl/reference/runpodctl)
- [CLI GitHub page](https://github.com/runpod/runpodctl)

## Support

If you need help, reach out to us on [Discord](https://discord.gg/cUpRmau42V), via [email](mailto:help@runpod.io), or submit a request using our [contact page](https://contact.runpod.io/hc/requests/new).

## Next steps

- [Create and manage your account](/get-started/manage-accounts)
- [Add funds to your account](/get-started/billing-information)
- [Complete your first tutorial](/tutorials/introduction/overview)
