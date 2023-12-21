---
title: "DreamBooth (SD-v1.5)"
slug: "dreambooth-sd-v15"
excerpt: "DreamBooth is a deep learning generation model that fine-tunes existing text-to-image models such as Stable Diffusion."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Mar 24 2023 19:29:26 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Jun 24 2023 10:39:05 GMT+0000 (Coordinated Universal Time)"
---

This is an adaptation of [DreamBooth](https://github.com/TheLastBen/fast-stable-diffusion) by [TheLastBen](https://github.com/TheLastBen) to a [RunPod Endpoint](https://www.runpod.io/endpoints). This endpoint requires the URL to a publicly accessible .zip file containing a folder of images of a concept to fine-tune the model. To dive deep into DreamBooth, look at the [original paper](https://arxiv.org/pdf/2208.12242.pdf).

## Retrieve Results & Status

**Note: For information on how to check job status and retrieve results, please refer to our [Status Endpoint Documentation](https://docs.runpod.io/reference/status).**

## Model Upload (s3Config)

The DreamBooth endpoint can be used to return custom images, return a trained model, or both. To receive back the trained model, you must provide your credentials to an S3-compatible bucket.
