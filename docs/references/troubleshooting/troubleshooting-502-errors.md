---
title: "502 Errors"
id: "troubleshooting-502-errors"
---

502 errors can occur when users attempt to access a program running on a specific port of a deployed pod and the program isn't running or has encountered an error. This document provides guidance to help you troubleshoot this error.

### Check Your Pod's GPU

The first step to troubleshooting a 502 error is to check whether your pod has a GPU attached.

1. **Access your pod's settings**: Click on your pod's settings in the user interface to access detailed information about your pod.

2. **Verify GPU attachment**: Here, you should be able to see if your pod has a GPU attached. If it does not, you will need to attach a GPU.

If a GPU is attached, you will see it under the Pods screen (e.g. 1 x A6000). If a GPU is not attached, this number will be 0. RunPod does allow you to spin up a pod with 0 GPUs so that you can connect to it via a Terminal or CloudSync to access data. However, the options to connect to RunPod via the web interface will be nonfunctional, even if they are lit up.

![](/img/docs/fb4c0dd-image.png)

### Check Your Pod's Logs

After confirming that your pod has a GPU attached, the next step is to check your pod's logs for any errors.

1. **Access your pod's logs**: You can view the logs from the pod's settings in the user interface.

2. ![](/img/docs/3500eba-image.png)\
   **Look for errors**: Browse through the logs to find any error messages that may provide clues about why you're experiencing a 502 error.

### Verify Additional Steps for Official Templates

In some cases, for our official templates, the user interface does not work right away and may require additional steps to be performed by the user.

1. **Access the template's ReadMe**: Navigate to the template's page and open the ReadMe file.

2. **Follow additional steps**: The ReadMe file should provide instructions on any additional steps you need to perform to get the UI functioning properly. Make sure to follow these instructions closely.

Remember, each template may have unique requirements or steps for setup. It is always recommended to thoroughly review the documentation associated with each template.

If you continue to experience 502 errors after following these steps, please contact our support team. We're here to help ensure that your experience on our platform is as seamless as possible.
