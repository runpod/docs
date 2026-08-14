---
name: seo-aeo-best-practices
description: Audit, configure, write, and validate Mintlify documentation for technical SEO, AEO/GEO, AI-agent discoverability, answer-engine citations, metadata, indexing, redirects, structured content, llms.txt, skill.md, content negotiation, MCP, sitemaps, and robots rules. Use for new docs, migrations, content refreshes, ranking or citation gaps, crawl issues, and pre-publish reviews.
---

# SEO and AEO best practices

Make Mintlify documentation easy for developers, search engines, and answer engines to find, parse, trust, and cite. Optimize for the reader's job first. Treat SEO and AEO as outcomes of accurate, direct, well-structured documentation.

## Establish the baseline

1. Read `docs.json`, navigation, `.mintignore`, page frontmatter, `robots.txt`, `sitemap.xml`, redirects, and repository guidance.
2. Determine the site's public, partially authenticated, or private state. Preserve every existing access boundary.
3. Inspect the served site before recommending changes. Record status codes, canonical URLs, metadata, headings, JSON-LD, internal links, and response headers.
4. Inventory unrelated drafts and active work. Do not overwrite, publish, or expose them.
5. Separate observed facts from recommendations. Label assumptions and stale evidence.

## Use Mintlify platform features deliberately

- Treat generated canonicals, sitemap, `robots.txt`, `llms.txt`, `llms-full.txt`, `skill.md`, Markdown content negotiation, and MCP as platform features to verify, not rebuild by default.
- Add a custom `robots.txt`, `sitemap.xml`, `llms.txt`, or `skill.md` only when a documented requirement cannot be met by Mintlify's generated output. A custom file overrides generated behavior and requires an explicit reason.
- Keep navigation and indexing aligned. Use `seo.indexing` only after deciding whether non-navigation pages belong in search, MCP, and AI context.
- Use `noindex: true` deliberately. Never expose hidden, private, user-group, or draft content to improve coverage.
- Preserve authentication requirements. Do not weaken access controls for crawlers or agents.
- Redirect every moved public URL to its final successor with a permanent redirect. Avoid chains, loops, anchors, and query strings in redirect rules.

## Write pages that can be found and cited

- Give each page one distinct user job and search intent.
- Write a unique, intent-led `title` and a concrete `description` that states what the page helps the reader do. Keep approved terminology consistent across both.
- Lead with the direct answer, outcome, or procedure. Put prerequisites, limits, and exceptions near the claim they qualify.
- Use question or task headings with a sequential hierarchy. Do not add a literal H1 until served output proves Mintlify does not already render one.
- Prefer precise nouns over ambiguous pronouns. Define terms once and reuse them consistently.
- Include factual limits, defaults, supported values, failure modes, and runnable examples. Label every code block with its language.
- Add descriptive alt text to every informative image or diagram. Use empty alt text only for decorative images.
- Link to the strongest internal source with descriptive anchor text. Remove orphan pages, duplicate intent, broken links, and redirecting internal links.
- Reject keyword stuffing, FAQ padding, hidden AEO copy, unsupported schema, invented freshness, and content written for bots at the reader's expense.

## Apply Runpod brand constraints

- Spell `Runpod` exactly.
- Use `AI Infrastructure Developers Trust.` and `AI Developer Cloud` exactly when the positioning or tagline is needed.
- Use `1M+ Developers` for the developer count.
- Call the external product `Clusters`.
- Lead with developers, platform, and lifecycle.
- Do not use em dashes, filler, or unsupported performance, cost, market, or comparative claims.
- Verify quotes come from active staff before using them.

## Make the smallest safe change

1. Map each finding to one exact file and acceptance check.
2. Reuse or improve the canonical page instead of creating near-duplicates.
3. Make repository changes on a feature branch. Do not mix unrelated cleanup into the change.
4. Run available formatting, schema, link, tooltip, lint, and build checks.
5. Stage or preview first. Never publish, deploy, merge, or alter production without explicit current-task approval.

## Verify at the acceptance surface

Run repository checks, then verify the staged or served surface. Use `mint score` for agent-readiness coverage and independently check:

| Surface | Required evidence |
| --- | --- |
| Page | `200`, one visible H1, intended title and description, canonical, sequential headings, valid links, image alt text, and expected JSON-LD |
| Redirect | Permanent status, one hop, final canonical destination, and no redirecting internal links |
| Discovery | `robots.txt`, `sitemap.xml`, `llms.txt`, `llms-full.txt`, and `skill.md` resolve with intended scope |
| Agent skills | `/.well-known/agent-skills/index.json` lists the skill and its `SKILL.md` URL resolves |
| Agent content | `Accept: text/markdown` returns clean Markdown and advertised discovery headers |
| MCP | Server is discoverable, tools respond, and indexed content matches navigation, indexing, and access rules |

Treat browser, editor, API, build, and repository state as supporting evidence. Served output is the acceptance surface for a deployed change.

## Report the result

Return a prioritized table with:

| Priority | Observed evidence | Impact | Exact change | Verification |
| --- | --- | --- | --- | --- |

End with one recommended next move, remaining risks, and the exact approval required. Never report a recommendation as shipped or a preview as production.
