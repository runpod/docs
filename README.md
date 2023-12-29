# RunPod Documentation Guide

Welcome to the RunPod Documentation Guide. This repository contains all the necessary information and tools to help you effectively use and contribute to the RunPod project.

## Table of Contents

- [Dryrun Documentation](#dryrun-documentation)
- [Format Documentation](#format-documentation)
- [Lint Documentation](#lint-documentation)
- [Creating a New Version](#creating-a-new-version)
- [Contributing](#contributing)
- [License](#license)

## Dryrun Documentation

To perform a dry run of the project, use the following command:

```bash
yarn dryrun
```

This will simulate the project execution without making any real changes, allowing you to verify the setup and functionality.

## Format Documentation

For formatting your codebase to ensure consistency and readability, use the following command:

```bash
yarn format
```

This command will automatically format your code following the predefined coding standards of the project.

## Lint Documentation

Vale helps in keeping your documentation style clean and consistent.
First, ensure that you have [Vale](https://vale.sh/docs/vale-cli/installation/) installed.

Once Vale is installed, you can lint your documentation with:

```bash
yarn lint
```

This will check the documentation for any issues or inconsistencies based on the defined linting rules.

## Update runpodctl docs

The CLI reference documentation for runpodctl are configured by using the `runpodctl-docs.py` file.

```bash
python3 runpodctl-docs.py
```

## Creating a New Version

Versioning is crucial for tracking changes and releases.
For RunPod, we use an automated GitHub workflow for version updates.
This ensures a standardized and error-free process.

You should rely on the GitHub workflow to update versions.

## Contributing

We welcome contributions to the RunPod project.
Whether you're fixing bugs, adding new features, or improving documentation, your help is greatly appreciated.
See [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License

This project is protected under the [Apache 2.0 License](LICENSE).
For more details, refer to the [LICENSE](LICENSE) file.
