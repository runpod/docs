#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const root = path.resolve(__dirname, "..");
const config = JSON.parse(fs.readFileSync(path.join(root, "docs.json"), "utf8"));
const ignoredDirectories = new Set([".git", "node_modules", "snippets"]);

function collectPageRoutes(directory, routes = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory() && ignoredDirectories.has(entry.name)) continue;

    const absolutePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      collectPageRoutes(absolutePath, routes);
      continue;
    }

    if (!entry.name.endsWith(".md") && !entry.name.endsWith(".mdx")) continue;

    const relativePath = path.relative(root, absolutePath).replaceAll(path.sep, "/");
    routes.push(`/${relativePath.replace(/\.mdx?$/, "")}`);
  }

  return routes;
}

function redirectPattern(source) {
  let pattern = source.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  pattern = pattern.replace(/:[A-Za-z0-9_]+\\\*/g, ".*");
  pattern = pattern.replace(/:[A-Za-z0-9_]+/g, "[^/]+");
  pattern = pattern.replace(/\\\*/g, ".*");
  return new RegExp(`^${pattern}$`);
}

const redirects = (config.redirects || []).map(({ source, destination }) => ({
  source,
  destination,
  pattern: redirectPattern(source),
}));

const collisions = [];
for (const route of collectPageRoutes(root)) {
  for (const redirect of redirects) {
    if (redirect.pattern.test(route)) {
      collisions.push({ route, source: redirect.source, destination: redirect.destination });
    }
  }
}

if (collisions.length > 0) {
  console.error("Redirect source files can be emitted in the generated sitemap:");
  for (const collision of collisions) {
    console.error(
      `- ${collision.route} matches ${collision.source} -> ${collision.destination}`,
    );
  }
  process.exit(1);
}

console.log(`Validated ${redirects.length} redirects: no redirect source files found.`);
