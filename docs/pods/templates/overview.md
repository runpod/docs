---
title: Overview
description: Learn about Templates.
sidebar_position: 2
---

Templates are Docker containers images paired with a configuration.

They are used to launch images as Pods, define the required container disk size, volume, volume paths, and ports needed.

You can also define environment variables within the Template.

## Template types

There a few types of Templates:

- **Managed by RunPod**: Also known as offical Templates; these templates are created and maintained by RunPod.
- **Custom Templates**:
  - **Community Templates**: Custom Templates shared by the community.
  - **Private Templates**: Custom Templates created by you or if using a team account, shared inside your team.

### Custom Templates

You can customize templates depending on your skill level.
The easiest way is to start with a RunPod official template or community template and use it as-is.
If you want better control over what gets done at pod start, you can modify the "Docker Command" field.
For example, the default docker command is:

```bash
bash -c `/start.sh`
```

If you wanted to run something before `start.sh`, you can put an extra command there.

```bash
bash -c `apt update && apt install vim -y && /start.sh`
```
