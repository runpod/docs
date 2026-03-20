# Style Guide

Follow the Runpod style guide (`.cursor/rules/rp-styleguide.mdc`) and Google Developer Style Guide (`.cursor/rules/google-style-guide.mdc`).

## Capitalization and Terminology

### Proper Nouns (always capitalize)
- Runpod
- Pods
- Serverless
- Hub
- Instant Clusters
- Secure Cloud
- Community Cloud
- Flash

### Generic Terms (lowercase)
- endpoint
- worker
- cluster
- template
- handler
- fine-tune
- network volume
- data center

### Headings
Always use **sentence case** for headings and titles:
- ✅ "Create a serverless endpoint"
- ❌ "Create a Serverless Endpoint"

## Writing Style

- Use **second person** ("you") instead of first person plural ("we").
- Prefer **active voice** over passive voice.
- Use **American English** spelling.
- Prefer **paragraphs** over bullet points unless listing discrete items.
- When using bullet points, **end each with a period**.

## Tutorial Structure

Tutorials should include:

1. **Requirements** section (not "Prerequisites")
2. Numbered steps using format: `## Step 1: Create a widget`
3. Clear expected outcomes for each step

Example:
```markdown
## Requirements

- A Runpod account with credits
- Docker installed locally

## Step 1: Create a template

Navigate to the Templates page...

## Step 2: Deploy the endpoint

Click Deploy and configure...
```

## Code Examples

- Always use code blocks with **language identifiers**.
- **Precede** code with context explaining what it does.
- **Follow** code with explanation of key parts.
- Include a **file title** where it makes sense.

Example:
````markdown
Create a handler function that processes image generation requests:

```python handler.py
import runpod

def handler(job):
    prompt = job["input"]["prompt"]
    # Generate image...
    return {"image_url": result}

runpod.serverless.start({"handler": handler})
```

The `handler` function receives a job dictionary containing the input from the API request.
````

## API and Code References

- Use backticks for inline code: `runpod.serverless.start()`
- Use backticks for file paths: `serverless/workers/handler.py`
- Use backticks for environment variables: `RUNPOD_API_KEY`
- Use backticks for API endpoints: `/v2/endpoint_id/run`
