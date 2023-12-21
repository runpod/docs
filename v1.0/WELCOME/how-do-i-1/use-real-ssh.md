---
title: "Use Real SSH"
slug: "use-real-ssh"
excerpt: ""
hidden: false
metadata: 
  image: []
  robots: "index"
createdAt: "Sun Apr 02 2023 17:03:14 GMT+0000 (Coordinated Universal Time)"
updatedAt: "Wed Oct 11 2023 14:17:13 GMT+0000 (Coordinated Universal Time)"
---

The basic terminal SSH access that RunPod exposes is not a full SSH connection and, therefore, does not support commands like SCP. If you want to have full SSH capabilities, then you will need to rent an instance that has public IP support and run a full SSH daemon in your Pod.

## Setup

1. Generate your public/private SSH key pair on your local machine with `ssh-keygen -t ed25519 -C "your_email@example.com"`. This will save your public/private key pair to `~/.ssh/id_ed25519.pub` and `~/.ssh/id_ed25519`, respectively.\
   Note: if you're using command prompt in Windows rather than the Linux terminal or WSL, your public/private key pair will be saved to `C:\users\{yourUserAccount}\.ssh\id_ed25519.pub` and `C:\users\{yourUserAccount}\.ssh\id_ed25519`, respectively.

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/4655a01-1.png",
null,
"You can specify a different file in which to save your public/private key pair if you desire, but simply press enter when prompted to save to the default location. If you specify a different file, you'll need to modify the file path specified in our default command (circled in red later down the page) to reflect this change."
],
"align": "center",
"caption": "You can specify a different file in which to save your public/private key pair if you desire, but simply press enter when prompted to save to the default location. If you specify a different file, you'll need to modify the file path specified in our default command (circled in red later down the page) to reflect this change."
}
]
}
[/block]

2. Add your public key to your [RunPod user settings](https://www.runpod.io/console/user/settings).

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/4972691-2.png",
null,
""
],
"align": "center"
}
]
}
[/block]

![](https://files.readme.io/c340553-image.png)

3. Start your Pod. Make sure of the following things:

- Your Pod supports a public IP, if you're deploying in Community Cloud.
- An SSH daemon is started. If you're using a RunPod official template such as RunPod Stable Diffusion, you don't need to take any additional steps. If you're using a custom template, make sure your template has TCP port 22 exposed and use the following Docker command. If you have an existing start command, replace `sleep infinity` at the end with your existing command:

<!-- dprint-ignore-start -->
```shell Bash
bash -c 'apt update;DEBIAN_FRONTEND=noninteractive apt-get install openssh-server -y;mkdir -p ~/.ssh;cd $_;chmod 700 ~/.ssh;echo "$PUBLIC_KEY" >> authorized_keys;chmod 700 authorized_keys;service ssh start;sleep infinity'
```
<!-- dprint-ignore-end -->

![](https://files.readme.io/97823c6-image.png)

Once your Pod is done initializing, you'll be able to SSH into it by running the SSH over exposed TCP command in the Pod's Connection Options menu on your local machine.

Note:

- if you're using the Windows Command Prompt rather than the Linux terminal or WSL, and you've used the default key location when generating your public/private key pair (i.e., you didn't specify a different file path when prompted), you'll need to modify the file path in the provided SSH command after the `-i` flag to `C:\users\{yourUserAccount}\.ssh\id_ed25519`.
- If you've saved your key to a location other than the default, specify that path you chose when generating your key pair after the `-i` flag instead.

![](https://files.readme.io/3d51ed8-image.png)

![](https://files.readme.io/ff71847-image.png)

## What's the SSH password?

If you're being prompted for a password when you attempt to connect, something is amiss. We don't require a password for SSH connections. Some common mistakes that cause your SSH client to prompt for a password include:

- Copying and pasting the key _fingerprint_ (beginning with `SHA256:`) into your RunPod user settings instead of the public key itself (the contents of the `id_ed25519.pub` file when viewed from a text editor)
- Omitting the encryption type from the beginning of the key when copying and pasting into your RunPod user settings (i.e., copying the random text, but not the `ssh-ed25519` which precedes it)
- Not separating different public keys in your RunPod user settings with a newline between each one (this would result in the first public/private key pair functioning as expected, but each subsequent key pair would not work)
- Specifying an incorrect file path to your private key file:

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/10cbfa6-image.png",
null,
"In this instance, a Linux-style file path (`~./ssh/id_ed25519`) is being specified on a Windows machine, so the file path to the key is invalid."
],
"align": "center",
"caption": "In this instance, a Linux-style file path (`~./ssh/id_ed25519`) is being specified on a Windows machine, so the file path to the key is invalid."
}
]
}
[/block]

- Attempting to use a private key that other users on the machine have permissions for:

[block:image]
{
"images": [
{
"image": [
"https://files.readme.io/7a5cf85-image.png",
null,
"`ls -la` shows that all users have read access to the private key (`id_ed25519`) file, so it isn't used when attempting to create a new SSH connection; it's functionally identical to not specifying a private key file at all. Run `sudo chmod 700 ~/.ssh/id_ed25519` to give your private key the proper permissions."
],
"align": "center",
"caption": "`ls -la` shows that all users have read access to the private key (`id_ed25519`) file, so it isn't used when attempting to create a new SSH connection; it's functionally identical to not specifying a private key file at all. Run `sudo chmod 600 ~/.ssh/id_ed25519` on your local machine to give your private key the proper permissions."
}
]
}
[/block]
