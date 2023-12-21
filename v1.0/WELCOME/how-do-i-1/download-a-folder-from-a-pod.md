---
title: "Download a Folder from a Pod"
slug: "download-a-folder-from-a-pod"
excerpt: ""
hidden: false
metadata:
  image: []
  robots: "index"
createdAt: "Thu Jun 22 2023 16:24:27 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Thu Jun 22 2023 17:39:24 GMT+0000 (Coordinated Universal Time)"
---

## Method 1. - Install Jupyter Archive

Note: we've temporarily removed this package from our templates due to bugs associated with it; some users report that this package interferes with the ability to right-click and download single files. Use at your own discretion!

1. In JupyterLab, if your Pod comes with a Python virtual environment (`venv`) in `/workspace`, activate it with `. /workspace/venv/bin/activate`. This way, even if you reset your Pod, you'll still keep the download as archive tool.

![](https://files.readme.io/e297415-image.png)

# 

2. Run `pip install jupyter-archive`.

![](https://files.readme.io/1e9c735-image.png)

# 

3. Restart your Pod.

![](https://files.readme.io/9e8d41b-image.png)

# 

4. You should now be able to right-click folders to download them as archives!

![](https://files.readme.io/f77d850-image.png)

# 

## Method 2. - Manually Zip and Download

1. Run `apt install zip --yes`.

![](https://files.readme.io/1245fad-image.png)

# 

2. Run `zip -r archiveName.zip /path/to/folder/to/zip`, replacing `archiveName.zip` with the name you'd like to give your zip file and `/path/to/folder/to/zip` with, well, the path to the folder to zip.

![](https://files.readme.io/aecf8ec-image.png)

# 

3. You can now right click your zip file to download your folder!

![](https://files.readme.io/f7a1e39-image.png)
