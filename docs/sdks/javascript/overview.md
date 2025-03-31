---
title: Overview
sidebar_position: 1
description: "Get started with RunPod JavaScript SDK, a tool for building web apps, server-side implementations, and automating tasks. Learn how to install, integrate, and secure your API key for seamless development."
---

This guide helps you set up and use the RunPod JavaScript SDK in your projects. You'll learn how to install the SDK, configure your environment, and integrate RunPod into your JavaScript applications.

## Install the SDK

To use the RunPod SDK in your project:

1. Ensure you have Node.js and npm installed on your system
2. Run one of these commands in your project directory:

   ```bash
   npm install --save runpod-sdk
   # or
   yarn add runpod-sdk
   ```

This installs the `runpod-sdk` package and adds it to your project's `package.json` dependencies.

For more details, visit:
- [npm package page](https://www.npmjs.com/package/runpod-sdk)
- [GitHub repository](https://github.com/runpod/js-sdk)

## Configure your environment

To use the RunPod SDK, you need to:

1. Import the SDK
2. Configure it with your API key and endpoint ID
3. Store sensitive information securely

Here's how to initialize the SDK:

```javascript
const { RUNPOD_API_KEY, ENDPOINT_ID } = process.env;
import runpodSdk from "runpod-sdk";

const runpod = runpodSdk(RUNPOD_API_KEY);
const endpoint = runpod.endpoint(ENDPOINT_ID);
```

The SDK uses ES Modules (ESM) and supports asynchronous operations for modern JavaScript development.

## Secure your API key

Always store your API key securely:

- Use environment variables (recommended)
- Avoid storing keys in source code
- Use secure secrets management solutions

> **Note:** Never commit API keys to version control. Use environment variables or secure secrets management solutions to handle sensitive information.

## Next steps

For more information, see:

- [Endpoints documentation](endpoints.md)
- [npm package documentation](https://www.npmjs.com/package/runpod-sdk)
- [GitHub repository](https://github.com/runpod/js-sdk)
