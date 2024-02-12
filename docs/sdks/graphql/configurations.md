---
title: "Configurations"
sidebar_position: 1
---

When configuring your environment, certain arguments are essential to ensure the correct setup and operation. Below is a detailed overview of each required argument:

### `containerDiskInGb`

- **Description**: Specifies the size of the disk allocated for the container in gigabytes. This space is used for the operating system, installed applications, and any data generated or used by the container.
- **Type**: Integer
- **Example**: `10` for a 10 GB disk size.

### `dockerArgs`

- **Description**: Contains additional arguments that are passed directly to Docker when starting the container. This can include mount points, network settings, or any other Docker command-line arguments.
- **Type**: String
- **Example**: `"-p 8080:8080"` to expose port 8080.

### `env`

- **Description**: A set of environment variables to be set within the container. These can configure application settings, external service credentials, or any other configuration data required by the software running in the container.
- **Type**: Dictionary or Object
- **Example**: `{"DATABASE_URL": "postgres://user:password@localhost/dbname"}`.

### `imageName`

- **Description**: The name of the Docker image to use for the container. This should include the repository name and tag, if applicable.
- **Type**: String
- **Example**: `"nginx:latest"` for the latest version of the Nginx image.

### `name`

- **Description**: The name assigned to the container instance. This name is used for identification and must be unique within the context it's being used.
- **Type**: String
- **Example**: `"my-app-container"`.

### `volumeInGb`

- **Description**: Defines the size of an additional persistent volume in gigabytes. This volume is used for storing data that needs to persist between container restarts or redeployments.
- **Type**: Integer
- **Example**: `5` for a 5GB persistent volume.

Ensure that these arguments are correctly specified in your configuration to avoid errors during deployment.

Optional arguments may also be available, providing additional customization and flexibility for your setup.
