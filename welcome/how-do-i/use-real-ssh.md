# Use Real SSH

The basic terminal SSH access that RunPod exposes is not a full SSH connection and therefore does not support commands like scp. If you want to have full SSH capabilities, then you will need to run an instance that has public IP support and run a full SSH daemon in your pod.

Most of our official templates will do this for you if you are on a compatible instance. If you want to add SSH to a custom template, then you can [read this article for guidance.](https://www.runpod.io/blog/how-to-achieve-true-ssh-on-runpod/)
