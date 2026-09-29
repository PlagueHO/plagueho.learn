/**
 * Purpose: Validate all discovered lab and module metadata and report every actionable error.
 * Parameters: Optional --root <path> selects a repository-shaped workspace; defaults to the current directory.
 * Usage: node scripts/validate-lab-frontmatter.mjs [--root <path>]
 */

import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  discoverWorkspace,
  formatErrors,
  parseRootArgument,
} from './lab-pipeline.mjs';

export async function validateLabs(root) {
  const workspace = await discoverWorkspace(root);
  if (workspace.errors.length > 0) {
    throw new Error(formatErrors(workspace.errors, 'Lab validation'));
  }
  return workspace.labs.length;
}

async function main() {
  const root = parseRootArgument(process.argv.slice(2));
  const count = await validateLabs(root);
  console.log(`Validated ${count} lab${count === 1 ? '' : 's'} successfully.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
