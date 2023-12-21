---
title: "Google Cloud Storage"
slug: "transfer-data"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Apr 02 2023 16:58:19 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Apr 19 2023 12:05:31 GMT+0000 (Coordinated Universal Time)"
---

**Setting Up Google Cloud Storage**

Under your Google Cloud Storage dashboard, click on Buckets -> Create.

![](https://files.readme.io/4450288-image.png)

Give it a name, and leave all the other options as the default. You'll also need to uncheck "Enforce Public Access Prevention On This Bucket"

![](https://files.readme.io/052b6b3-image.png)

![](https://files.readme.io/5041653-image.png)

Once the bucket is created, it's a good idea to create a folder within the bucket to keep things better organized, especially if you have multiple pods.

![](https://files.readme.io/f3ac923-image.png)

**Transferring Data from RunPod**

Under your pod screen in RunPod, click on Cloud Sync -> Google Cloud Storage -> Copy to Google Cloud Storage.

![](https://files.readme.io/a4fcf38-image.png)

![](https://files.readme.io/1934fdf-image.png)

On this screen, you'll need to provide your Service Account JSON key. If you're not familiar with how to create a Service Account Key, refer to [this article for assistance.](https://cloud.google.com/iam/docs/keys-create-delete) In the first field, you will need to copy and paste the entire contents of your Service Account JSON key (even though it looks like a small field, you really do need to paste the entire file's contents in it. It will work!)

Then, specify the destination path in your bucket, along with the folder from your pod that you wish to copy.

![](https://files.readme.io/af87bb5-image.png)

If everything is set up, you'll see CloudSync push your workspace over to the bucket. Success!

![](https://files.readme.io/4eb7dee-image.png)

Note: If your bucket is not publicly viewable, you'll get the following error: "2023-04-18 20:22:00 ERROR : GCS bucket myrunpodbucket path myrunpodfolder: error reading destination root directory: googleapi: Error 403: [myrunpodkey@impactful-facet-384119.iam.gserviceaccount.com](mailto:myrunpodkey@impactful-facet-384119.iam.gserviceaccount.com) does not have storage.objects.list access to the Google Cloud Storage bucket. Permission 'storage.objects.list' denied on resource (or it may not exist)., forbidden." In that case, make the bucket publicly viewable [as described here.](https://cloud.google.com/storage/docs/access-control/making-data-public)
