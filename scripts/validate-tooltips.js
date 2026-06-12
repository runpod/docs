#!/usr/bin/env node

/**
 * Tooltip Import Validator
 *
 * This script validates that all tooltip components used in MDX files
 * are properly imported from /snippets/tooltips.jsx.
 *
 * Exit codes:
 *   0 - All tooltips are properly imported
 *   1 - Missing imports detected
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Path to the tooltips definition file
const TOOLTIPS_FILE = 'snippets/tooltips.jsx';

// Get all available tooltip exports from tooltips.jsx
function getAvailableTooltips() {
  const tooltipsPath = path.join(process.cwd(), TOOLTIPS_FILE);

  if (!fs.existsSync(tooltipsPath)) {
    console.error(`Error: Tooltips file not found at ${tooltipsPath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(tooltipsPath, 'utf-8');
  const exportRegex = /export\s+const\s+(\w+Tooltip)\s*=/g;
  const tooltips = new Set();

  let match;
  while ((match = exportRegex.exec(content)) !== null) {
    tooltips.add(match[1]);
  }

  return tooltips;
}

// Get all MDX files in the repository
function getMdxFiles() {
  try {
    // Use git to get tracked MDX files (respects .gitignore)
    const output = execSync('git ls-files "*.mdx"', { encoding: 'utf-8' });
    return output.trim().split('\n').filter(Boolean);
  } catch {
    // Fallback: find all MDX files manually
    const files = [];
    function walkDir(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          walkDir(fullPath);
        } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
          files.push(path.relative(process.cwd(), fullPath));
        }
      }
    }
    walkDir(process.cwd());
    return files;
  }
}

// Extract imported tooltips from a file
function getImportedTooltips(content) {
  const imported = new Set();

  // Match import statements from tooltips.jsx
  // Handles: import { Tooltip1, Tooltip2 } from "/snippets/tooltips.jsx";
  const importRegex = /import\s*\{([^}]+)\}\s*from\s*["']\/snippets\/tooltips\.jsx["']/g;

  let match;
  while ((match = importRegex.exec(content)) !== null) {
    const imports = match[1].split(',').map(s => s.trim()).filter(Boolean);
    imports.forEach(name => imported.add(name));
  }

  return imported;
}

// Extract used tooltips from a file
function getUsedTooltips(content, availableTooltips) {
  const used = new Set();

  // Match JSX component usage: <TooltipName /> or <TooltipName>...</TooltipName>
  // Only match known tooltip names to avoid false positives
  for (const tooltip of availableTooltips) {
    // Self-closing: <TooltipName />
    const selfClosingRegex = new RegExp(`<${tooltip}\\s*/>`, 'g');
    // Opening tag: <TooltipName> or <TooltipName ...>
    const openingRegex = new RegExp(`<${tooltip}[\\s>]`, 'g');

    if (selfClosingRegex.test(content) || openingRegex.test(content)) {
      used.add(tooltip);
    }
  }

  return used;
}

// Main validation function
function validateTooltips() {
  const availableTooltips = getAvailableTooltips();
  const mdxFiles = getMdxFiles();

  console.log(`Found ${availableTooltips.size} tooltip definitions in ${TOOLTIPS_FILE}`);
  console.log(`Scanning ${mdxFiles.length} MDX files...\n`);

  const errors = [];
  const warnings = [];
  let filesWithTooltips = 0;

  for (const file of mdxFiles) {
    const filePath = path.join(process.cwd(), file);
    const content = fs.readFileSync(filePath, 'utf-8');

    const imported = getImportedTooltips(content);
    const used = getUsedTooltips(content, availableTooltips);

    if (used.size === 0 && imported.size === 0) {
      continue;
    }

    filesWithTooltips++;

    // Check for used but not imported tooltips
    for (const tooltip of used) {
      if (!imported.has(tooltip)) {
        errors.push({
          file,
          tooltip,
          type: 'missing-import',
          message: `Tooltip "${tooltip}" is used but not imported`
        });
      }
    }

    // Check for imported but not used tooltips (warning only)
    for (const tooltip of imported) {
      if (!used.has(tooltip)) {
        warnings.push({
          file,
          tooltip,
          type: 'unused-import',
          message: `Tooltip "${tooltip}" is imported but not used`
        });
      }
    }

    // Check for imports of non-existent tooltips
    for (const tooltip of imported) {
      if (!availableTooltips.has(tooltip)) {
        errors.push({
          file,
          tooltip,
          type: 'invalid-import',
          message: `Tooltip "${tooltip}" does not exist in ${TOOLTIPS_FILE}`
        });
      }
    }
  }

  // Print results
  console.log(`Files using tooltips: ${filesWithTooltips}\n`);

  if (warnings.length > 0) {
    console.log('⚠️  Warnings (unused imports):');
    for (const warning of warnings) {
      console.log(`   ${warning.file}: ${warning.message}`);
    }
    console.log('');
  }

  if (errors.length > 0) {
    console.log('❌ Errors:');
    for (const error of errors) {
      console.log(`   ${error.file}: ${error.message}`);
    }
    console.log(`\n${errors.length} error(s) found.`);
    console.log('\nTo fix missing imports, add the tooltip to the import statement:');
    console.log('  import { ExistingTooltip, MissingTooltip } from "/snippets/tooltips.jsx";');
    process.exit(1);
  }

  console.log('✅ All tooltips are properly imported!');
  process.exit(0);
}

// Run validation
validateTooltips();
