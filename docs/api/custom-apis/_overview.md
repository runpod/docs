---
title: "Overview"
slug: "overview"
description: "Custom API overview."
sidebar_position: 1
---

You can create Custom APIs for your specific use cases.
If you have a custom use case, you can use RunPod's custom API support to stand up your serverless API.
You can bring your own container image, and RunPod will handle the scaling and other aspects.

To create a custom API, you can navigate to the RunPod Serverless console and click "New Template" to add your container image. Once the template is created, you can convert it into an API endpoint by navigating to the APIs section and clicking "New API".

Please note that running 1 minimum worker is great for debugging purposes, but you will be charged for that worker whether or not you are making requests to your endpoint.

Once everything is set up, you can invoke your API using the "run" endpoint on your API dashboard. RunPod services are currently asynchronous, so you must use the "status" endpoint to get the status/results of each run using the ID present in the run response payload.
