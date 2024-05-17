---
title: Overview
sidebar_position: 1
description: "Get started with RunPod JavaScript SDK, a tool for building web apps, server-side implementations, and automating tasks. Learn how to install, integrate, and secure your API key for seamless development."
---

Get started with setting up your RunPod projects using JavaScript. Whether you're building web applications, server-side implementations, or automating tasks, the RunPod JavaScript SDK provides the tools you need.
This guide outlines the steps to get your development environment ready and integrate RunPod into your JavaScript projects.

## Install the Go programming language

Download the Go programming language 
https://go.dev/doc/install

Very you've installed Go by enter the following command in your terminal:
```
go version
```

## Install the RunPod SDK

Create a directory:

```command
mkdir hello && cd hello
go mod init example/hello
```

Install the Go SDK

```
go get github.com/runpod/go-sdk
```


## Add your API key

To use the RunPod SDK in your project, you first need to import it and configure it with your API key and endpoint ID. Ensure these values are securely stored, preferably as environment variables.

Below is a basic example of how to initialize and use the RunPod SDK in your JavaScript project.

```go
package main

import (
	"encoding/json"
	"fmt"

	"github.com/runpod/go-sdk/pkg/sdk/config"
	rpEndpoint "github.com/runpod/go-sdk/pkg/sdk/endpoint"
)

func main() {
	apiKey := "XBFH94HD274LQ93IZ9ITIDQHQZ02YHCX7IV08DCZ"
	baseURL := "obnarm8axzcdrd"
	
	endpoint, err := rpEndpoint.New(
		&config.Config{ApiKey: &apiKey},
		&rpEndpoint.Option{EndpointId: &baseURL},
	)
	if err != nil {
		panic(err)
	}

	timeout := 120
	jobInput := rpEndpoint.RunInput{
		JobInput: &rpEndpoint.JobInput{
			Input: map[string]interface{}{"mock_delay": 95},
		},
		RequestTimeout: &timeout,
	}

	output, err := endpoint.Run(&jobInput)
	if err != nil {
		panic(err)
	}

	data, _ := json.Marshal(output)
	fmt.Printf("output: %s\n", data)
}	
```

This snippet demonstrates how to import the SDK, initialize it with your API key, and reference a specific endpoint using its ID.
Remember, the RunPod SDK uses the ES Module (ESM) system and supports asynchronous operations, making it compatible with modern JavaScript development practices.

### Secure your API key

When working with the RunPod SDK, it's essential to secure your API key.
Storing the API key in environment variables is recommended, as shown in the initialization example. This method keeps your key out of your source code and reduces the risk of accidental exposure.

:::note

Use environment variables or secure secrets management solutions to handle sensitive information like API keys.

:::

For further information, see the following:

- [RunPod SDK npm Package](https://www.npmjs.com/package/runpod-sdk)
- [RunPod GitHub Repository](https://github.com/runpod/js-sdk)
- [Endpoints](/sdks/javascript/endpoints)
