---
title: "Dropbox"
slug: "dropbox"
excerpt: "Send files to Dropbox through RunPod Cloud Sync."
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Thu Apr 20 2023 01:11:15 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Tue Oct 10 2023 22:44:58 GMT+0000 (Coordinated Universal Time)"
---

This guide will walk you through creating a folder in Dropbox and using the Cloud Sync option in RunPod. You can also see a video guide on this process [here](https://www.youtube.com/watch?v=28lUYlh6uMQ&t=2s).

**Setting up Dropbox**

If you haven't already, you'll need to start by creating an app on the [DBX Platform](https://www.dropbox.com/developers/apps/create). Select Scoped Access under the API options, Full Dropbox under the type of access, and give it a name.

Under the Permissions tab in the Dropbox App Console, also ensure the following checkboxes for reading and writing are ticked.

![](https://files.readme.io/e73bced-image.png)

After checking these boxes, return to the Settings tab, scroll down to the OAuth2 section under your app and click Generate under Generated Access Token.

![](https://files.readme.io/e9d2698-image.png)

It will create an access key for you. **Save this in a safe place -- just like the RunPod API key, it will disappear after you navigate away from the page.**

![](https://files.readme.io/02b6bdd-image.png)

Although not strictly necessary, it's also a good idea to create a folder that your workspace will be deposited to in your Dropbox.

![](https://files.readme.io/261fba6-image.png)

**Sending the data from RunPod**

Next, go to RunPod and click the Cloud Sync option, and then click Dropbox.

![](https://files.readme.io/2281560-image.png)

Enter your Access Token and the remote path to send the data to.

![](https://files.readme.io/c646811-image.png)

Once you hit Copy to DropBox, your data should start syncing over.
