# Development Guide

## Local Development

### Setup

Install Mintlify globally:
```bash
npm i -g mintlify
```

Start the local development server:
```bash
mintlify dev
```

Most changes are reflected live without restarting the server.

### Linting

Install [Vale](https://vale.sh/docs/vale-cli/installation/), then lint files:
```bash
vale path/to/docs/
vale path/to/*.mdx
```

Vale is configured with Google and Readability style guides via `.vale.ini`.

### Python Code Formatting

Format Python code examples in documentation:
```bash
pip install blacken-docs
git ls-files -z -- '*.mdx' | xargs -0 blacken-docs
```

## Helper Scripts

### Update GPU/CPU Reference Tables

These scripts fetch current types from Runpod's GraphQL API:
```bash
cd helpers
python gpu_types.py      # Updates GPU reference tables
python sls_cpu_types.py  # Updates CPU reference tables
```

Requirements: `requests`, `tabulate`, `pandas` (see `helpers/requirements.txt`).

### Validate Tooltips

Check that all imported tooltips exist:
```bash
node scripts/validate-tooltips.js
```

This runs automatically in CI via `.github/workflows/validate-tooltips.yml`.

## Publishing Workflow

1. Create a pull request with changes.
2. Request review from [@muhsinking](https://github.com/muhsinking).
3. Changes deploy automatically to production after merge to `main` branch.

## Common Tasks

### Add a New Page

1. Create `.mdx` file in the appropriate directory.
2. Add frontmatter:
   ```yaml
   ---
   title: "Full page title"
   sidebarTitle: "Shorter title"
   description: "SEO description."
   ---
   ```
3. Add the page path to `docs.json` navigation.
4. Import tooltips for Runpod-specific terms.

### Add a New Tooltip

1. Open `snippets/tooltips.jsx`.
2. Add a new export in the appropriate category:
   ```jsx
   export const NewTermTooltip = () => {
     return (
       <Tooltip
         headline="New Term"
         tip="Definition of the new term."
         cta="Learn more"
         href="/path/to/docs"
       >new term</Tooltip>
     );
   };
   ```
3. Create singular and plural variants if needed.

### Move or Rename a Page

1. Move/rename the `.mdx` file.
2. Update `docs.json` navigation.
3. Add a redirect in `docs.json`:
   ```json
   {
     "redirects": [
       { "source": "/old-path", "destination": "/new-path" }
     ]
   }
   ```

### Update a Pricing Table

Edit `snippets/serverless-gpu-pricing-table.mdx` or run the helper scripts to regenerate from the API.
