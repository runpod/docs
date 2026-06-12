# Documentation Architecture

## Directory Structure

```
mintlifydocs/
├── docs.json              # Site configuration, navigation, theme, redirects
├── CLAUDE.md              # AI assistant instructions (this file's parent)
│
├── get-started/           # Onboarding and account setup
├── flash/                 # Flash SDK (Python functions on cloud GPUs)
├── serverless/            # Serverless workers, endpoints, vLLM
├── pods/                  # GPU/CPU instances
├── storage/               # Network volumes, S3 API
├── hub/                   # Runpod Hub and publishing
├── public-endpoints/      # Public API endpoints
├── instant-clusters/      # Multi-node GPU clusters
├── sdks/                  # Python, JavaScript, Go, GraphQL SDKs
├── runpodctl/             # CLI documentation
├── api-reference/         # REST API reference
├── integrations/          # Third-party integrations
├── tutorials/             # Step-by-step guides
├── references/            # Reference tables (GPU types, billing, etc.)
├── community-solutions/   # Community-contributed content
│
├── snippets/              # Reusable content fragments
│   ├── tooltips.jsx       # Tooltip component definitions
│   └── *.mdx              # Reusable MDX snippets (e.g., pricing tables)
│
├── images/                # Static image assets
├── logo/                  # Logo files
├── styles/                # Custom CSS
│
├── scripts/               # Utility scripts
│   └── validate-tooltips.js
│
└── helpers/               # Python scripts for generating content
    ├── gpu_types.py       # Generates GPU reference tables
    └── sls_cpu_types.py   # Generates CPU reference tables
```

## Configuration (docs.json)

The `docs.json` file controls:

- **Theme and styling**: Colors, fonts, code block themes
- **Navigation**: Tab/group/page hierarchy
- **SEO**: Meta tags, Open Graph images
- **Redirects**: URL redirects for moved/renamed pages

### Navigation Structure

Pages are organized in a hierarchy:
```
tabs → groups → pages
```

Example:
```json
{
  "tab": "Docs",
  "groups": [
    {
      "group": "Serverless",
      "pages": [
        "serverless/overview",
        "serverless/quickstart",
        {
          "group": "vLLM",
          "pages": ["serverless/vllm/overview", "serverless/vllm/get-started"]
        }
      ]
    }
  ]
}
```

Pages are referenced by file path without the `.mdx` extension.

## MDX Files

Each documentation page is an MDX file with:

1. **Frontmatter** (required):
   ```yaml
   ---
   title: "Page title"
   sidebarTitle: "Shorter sidebar title"
   description: "SEO description for the page."
   ---
   ```

2. **Imports** (optional): React components, tooltips, snippets
3. **Content**: Markdown with JSX components

## Snippets

Reusable content in `snippets/`:

- **MDX snippets**: Embed with `import Table from '/snippets/pricing-table.mdx'`
- **JSX components**: Import specific exports like tooltips

### Tooltips

Tooltips provide hover definitions for technical terms. Defined in `snippets/tooltips.jsx`.

**Structure:**
```jsx
export const PodTooltip = () => {
  return (
    <Tooltip
      headline="Pod"
      tip="A dedicated GPU or CPU instance for containerized AI/ML workloads."
      cta="Learn more about Pods"
      href="/pods/overview"
    >Pod</Tooltip>
  );
};
```

**Usage in MDX:**
```mdx
import { PodTooltip, TemplateTooltip } from "/snippets/tooltips.jsx";

Deploy your first GPU <PodTooltip /> using a <TemplateTooltip />.
```

**Guidelines:**
- Use for Runpod-specific terms users might not know.
- Most tooltips have singular/plural variants (`PodTooltip`, `PodsTooltip`).
- Group by category: Pods, Serverless, Storage, Products, Concepts, AI/ML, Flash.
- Run `scripts/validate-tooltips.js` to check imports.

## Adding New Pages

1. Create `.mdx` file in the appropriate directory.
2. Add frontmatter with `title`, `sidebarTitle`, and `description`.
3. Add the page path to `docs.json` navigation.
4. Import tooltips for technical terms.

## Redirects

When moving or renaming pages, add to `docs.json`:
```json
{
  "redirects": [
    { "source": "/old-path", "destination": "/new-path" }
  ]
}
```
