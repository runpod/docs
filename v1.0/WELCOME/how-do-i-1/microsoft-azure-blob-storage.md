---
title: "Microsoft Azure Blob Storage"
slug: "microsoft-azure-blob-storage"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Fri Apr 21 2023 06:17:03 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Sat Apr 29 2023 13:54:53 GMT+0000 (Coordinated Universal Time)"
---

**Creating a Storage Account in Azure**

First, you'll need to create a [Resource Group](https://portal.azure.com/#view/HubsExtension/BrowseResourceGroups) in Azure by hitting the Create button. Once you give it a name, you'll be ready to proceed to the next step.

![](https://files.readme.io/dcc8c23-image.png)

Under [Storage Accounts](https://portal.azure.com/#view/HubsExtension/BrowseResource/resourceType/Microsoft.Storage%2FStorageAccounts) in Azure, hit the Create button to create a new account.

![](https://files.readme.io/1bbc566-image.png)

You'll need to give it a name as well, and assign it to the resource group you just created.

![](https://files.readme.io/294103f-image.png)

Go to Access Keys under Security + Networking to retrieve the key for your account.

![](https://files.readme.io/f2193e4-image.png)

Under Storage Browser, click Blob Containers, and then Add Container to create a container. You can also create folders within that container, if desired.

![](https://files.readme.io/256e4ef-image.png)

**Transferring the data from Runpod**

Go to the your pod under My Pods, and click Cloud Sync and select Azure Blob Storage, and Copy to Azure Blob Storage.

![](https://files.readme.io/55e94f0-image.png)

Enter your account name, account key, and desired path, and click Copy to Azure Blob Storage.

![](https://files.readme.io/855625c-image.png)

Once you hit Copy, your pod contents should begin copying over.

![](https://files.readme.io/62134fd-image.png)
