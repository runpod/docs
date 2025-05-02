---
title: Glossary
sidebar_position: 1
description: RunPod is a cloud computing platform for AI and machine learning applications, offering GPU and CPU instances, serverless computing, and SDKs for seamless integration.
---

# Serverless

Serverless is a pay-per-second computing solution designed for dynamic autoscaling in production environments. It automatically adjusts computational resources based on your request traffic, ensuring cost-effective usage.

We offer both GPU and CPU serverless options:

- GPU Serverless: Each worker is equipped with a dedicated GPU, ideal for AI/ML workloads.
- CPU Serverless: Workers come with high-clock-speed CPU cores, suited for general-purpose workloads.

## Worker

A [worker](/serverless/workers/overview) is a single compute resource that processes Serverless endpoint requests. Each endpoint can have multiple workers, enabling parallel processing of multiple requests simultaneously.

## Endpoint

An endpoint refers to a specific REST API (URL) provided by RunPod that your applications or services can interact with. These endpoints enable standard functionality for submitting jobs and retrieving their outputs.

## Handler

A handler is a function you create that takes in submitted inputs, processes them (like generating images, text, or audio), and returns the final output.

## Serverless SDK

The [Serverless SDK](https://github.com/runpod/runpod-python) is a Python package used when creating a handler function. This package helps your code receive requests from our serverless system, triggers your handler function to execute, and returns the function's result back to the serverless system.

# Pod

## Secure Cloud

GPU instances that run in T3/T4 data centers, providing high reliability and security.

## Community Cloud

GPU instances connect individual compute providers to consumers through a vetted, secure peer-to-peer system.

## Data center

A data center is a secure location where RunPod's cloud computing services, such as GPU instances and storage instances, are hosted. These data centers are equipped with redundant power, multiple ISP connections, and data backups to ensure the safety and reliability of your compute services and data.

## GPU instance

A GPU instance is a container-based compute resource that you can deploy.

These instances spin up in seconds using both public and private repositories.
They are available in two different types:

- Secure Cloud
- Community Cloud

## Template

A RunPod template is a Docker container image paired with a configuration.

## SDKs

RunPod provides several Software Development Kits (SDKs) you can use to interact with the RunPod platform.
These SDKs enable you to create serverless functions, manage infrastructure, and interact with APIs.
