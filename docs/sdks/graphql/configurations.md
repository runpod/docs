---
title: "Configurations"
sidebar_position: 1
description: "Configure your environment with essential arguments: containerDiskInGb, dockerArgs, env, imageName, name, and volumeInGb, to ensure correct setup and operation of your container."
---

This guide explains the essential configuration arguments for your RunPod environment. For complete API details, see the [RunPod GraphQL Spec](https://graphql-spec.runpod.io/).

## Required arguments

The following arguments are required for proper container setup and operation:

### Container disk size

`containerDiskInGb` specifies the container's disk size in gigabytes:

- **Type**: Integer
- **Example**: `10` for a 10 GB disk
- **Use**: Operating system, applications, and container data

### Docker arguments

`dockerArgs` overrides the container's start command:

- **Type**: String
- **Example**: `sleep infinity` for background operation
- **Use**: Custom container startup behavior

### Environment variables

`env` sets container environment variables:

- **Type**: Dictionary/Object
- **Example**: `{"DATABASE_URL": "postgres://user:password@localhost/dbname"}`
- **Use**: Application configuration and credentials

### Docker image

`imageName` specifies the container image:

- **Type**: String
- **Example**: `"nginx:latest"`
- **Use**: Container base image and version

### Container name

`name` identifies your container instance:

- **Type**: String
- **Example**: `"my-app-container"`
- **Use**: Container identification and management

### Persistent volume

`volumeInGb` defines persistent storage size:

- **Type**: Integer
- **Example**: `5` for 5GB storage
- **Use**: Data persistence between restarts

## Optional arguments

Additional configuration options may be available for specific use cases. See the [RunPod GraphQL Spec](https://graphql-spec.runpod.io/) for details.

> **Note:** Ensure all required arguments are correctly specified to avoid deployment errors.
