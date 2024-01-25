---
title: Test locally
sidebar_position: 1
---

As you develop your Handler Function, you will, of course, want to test it with inputs formatted similarly to what you will be sending in once deployed as a worker. The quickest way to run a test is to pass in your input as an argument when calling your handler file. Assuming your handler function is inside of a file called `your_handler.py` and your input is `{"input": {"prompt": "The quick brown fox jumps"}}` you would call your file like so:

```curl
python your_handler.py --test_input '{"input": {"prompt": "The quick brown fox jumps"}}'
```

Additionally, you can launch a local test server that will provide you with an endpoint to send requests to by calling your file with the `--rp_serve_api` argument. See our [blog post](https://blog.runpod.io/workers-local-api-server-introduced-with-runpod-python-0-9-13/) for additional examples.

```bash
python your_handler.py --rp_serve_api
```
