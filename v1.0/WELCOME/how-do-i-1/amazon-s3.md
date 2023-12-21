---
title: "Amazon S3"
slug: "amazon-s3"
excerpt: "Create a bucket within Amazon S3."
hidden: false
metadata:
  image: []
  robots: "index"
createdAt: "Thu Apr 20 2023 01:33:08 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 10 2023 22:46:45 GMT+0000 (Coordinated Universal Time)"
---

You can review a video guide on the process [here](https://www.youtube.com/watch?v=2ZuOKwFR9pc&t=1s).

### Creating a Bucket within Amazon S3

1. **Access the Bucket Creation Form:**
   - Navigate to the Amazon S3 bucket creation form by visiting [this link](https://s3.console.aws.amazon.com/s3/bucket/create?region=us-east-1).

2. **Name Your Bucket:**
   - Provide a descriptive name for your bucket. Choose a name that is easy to remember and reflects the contents or purpose of the bucket.

3. **Select AWS Region:**
   - Ensure you select your preferred AWS Region. This is important for data storage locations and can affect access speeds.

4. **Adjust Public Access Settings:**
   - Uncheck the **Block All Public Access** option at the bottom of the form if you need your bucket to be publicly accessible.

5. **Access Key and Secret Access Key:**
   - Go to Security Credentials in your AWS account.
   - Create an Access Key on the Security Credentials page.
   - Note that your Secret Access Key will be displayed during this process. Keep it secure.

![](https://files.readme.io/7fa9781-image.png)

### Sending Data from RunPod to AWS S3

1. **Access CloudSync in RunPod:**
   - In RunPod, navigate to the CloudSync section.

2. **Enter Key IDs and Bucket Information:**
   - Enter your Access Key and Secret Access Key.
   - Specify the AWS Region where your bucket is located.
   - Provide the path of your bucket as shown in the interface.

3. **Initiate Data Transfer:**
   - Select the **Copy to AWS S3** option.
   - This action will start copying your pod contents to the specified Amazon S3 bucket.

4. **Monitor Transfer:**
   - Once you select Copy, your pod contents should begin copying over to Amazon S3.
   - You can monitor the transfer process through RunPod’s interface to ensure that the data transfer completes successfully.

![](https://files.readme.io/8fec5c5-image.png)

Remember to keep your Access Key and Secret Access Key confidential to maintain the security of your AWS resources.
