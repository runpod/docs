---
title: Overview
sidebar_position: 1
description: "Get started with RunPod Go SDK for building web applications, server-side implementations, and automating tasks. Learn how to install, configure, and secure your API key."
---

This guide helps you set up and use the RunPod Go SDK in your projects. You'll learn how to install the SDK, configure your environment, and integrate RunPod into your Go applications.

## Prerequisites

Before you begin, ensure you have:

- Go 1.16 or later installed
- A RunPod account with an API key and endpoint ID

## Install the SDK

To install the RunPod SDK in your project:

1. Run this command in your project directory:
   ```bash
   go get github.com/runpod/go-sdk
   ```

2. Install dependencies:
   ```bash
   go mod tidy
   ```

For more details, visit:
- [Go package documentation](https://pkg.go.dev/github.com/runpod/go-sdk/pkg/sdk)
- [GitHub repository](https://github.com/runpod/go-sdk)

## Configure your environment

Set up your API key and endpoint ID in your Go application:

```go
func main() {
    endpoint, err := rpEndpoint.New(
        &config.Config{ApiKey: sdk.String(os.Getenv("RUNPOD_API_KEY"))},
        &rpEndpoint.Option{EndpointId: sdk.String(os.Getenv("RUNPOD_BASE_URL"))},
    )
    if err != nil {
        panic(err)
    }

    // Use the endpoint object
    // ...
}
```

## Secure your API key

Always store your API key securely:

- Use environment variables (recommended)
- Avoid storing keys in source code
- Use secure secrets management solutions

> **Note:** Never commit API keys to version control. Use environment variables or secure secrets management solutions to handle sensitive information.

## Next steps

For more information, see:

- [Endpoints documentation](endpoints.md)
- [Go package documentation](https://pkg.go.dev/github.com/runpod/go-sdk/pkg/sdk)
- [GitHub repository](https://github.com/runpod/go-sdk)
