/**
 * Purpose: Generate deterministic VitePress lab pages, copied resources, catalogue, and sidebar.
 * Parameters: Optional --root <path> selects a repository-shaped workspace; defaults to the current directory.
 * Usage: node scripts/generate-vitepress-labs.mjs [--root <path>]
 */

import { cp, mkdir, readdir, readFile, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  PRODUCTION_BASE,
  buildPageMap,
  discoverWorkspace,
  formatErrors,
  parseRootArgument,
  pathExists,
  renderGeneratedPage,
  rewriteMarkdownLinks,
  toPosix,
} from './lab-pipeline.mjs';

function yamlString(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

function parseDeckScalar(value, file, key) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try {
      return JSON.parse(trimmed);
    } catch {
      throw new Error(`${file}: malformed quoted "${key}" value`);
    }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) {
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  return trimmed;
}

function readDeckField(frontmatter, file, key) {
  const lines = frontmatter.split('\n');
  const fieldPattern = new RegExp(`^${key}:\\s*(.*)$`);
  for (let index = 0; index < lines.length; index += 1) {
    const match = fieldPattern.exec(lines[index]);
    if (!match) continue;
    const value = match[1].trim();
    if (!/^[>|][+-]?$/.test(value)) return parseDeckScalar(value, file, key);

    const block = [];
    while (index + 1 < lines.length && /^(?: {2,}|\s*$)/.test(lines[index + 1])) {
      index += 1;
      block.push(lines[index].replace(/^ {2}/, ''));
    }
    return value.startsWith('>') ? block.join(' ').trim() : block.join('\n').trim();
  }
  return undefined;
}

function summarizeDeckInfo(info, fallback) {
  if (typeof info !== 'string') return fallback;
  const summary = info
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line && !/^#{1,6}\s/.test(line))
    .join(' ');
  return summary || fallback;
}

async function readDeckMetadata(workspace, deck) {
  const deckPath = path.join(workspace.presentationsRoot, deck, 'slides.md');
  const source = await readFile(deckPath, 'utf8');
  const file = toPosix(path.relative(workspace.root, deckPath));
  const normalized = source.replace(/\r\n/g, '\n');
  if (!normalized.startsWith('---\n')) throw new Error(`${file}: missing YAML frontmatter`);
  const closingIndex = normalized.indexOf('\n---\n', 4);
  if (closingIndex === -1) throw new Error(`${file}: frontmatter is missing its closing delimiter`);
  const frontmatter = normalized.slice(4, closingIndex);
  return {
    title: readDeckField(frontmatter, file, 'title'),
    info: readDeckField(frontmatter, file, 'info'),
  };
}

async function removePreviouslyGeneratedLabs(siteRoot) {
  if (!(await pathExists(siteRoot))) return;
  const entries = await readdir(siteRoot, { withFileTypes: true });
  for (const entry of entries) {
    if (!entry.isDirectory() || entry.name === '.vitepress') continue;
    const indexPath = path.join(siteRoot, entry.name, 'index.md');
    if (await pathExists(indexPath)) {
      const content = await readFile(indexPath, 'utf8');
      if (content.includes('\ngenerated: true\n')) {
        await rm(path.join(siteRoot, entry.name), { recursive: true });
      }
    }
  }
}

function renderCatalogue(labs) {
  const cards = labs.length === 0
    ? 'No hands-on labs are available yet.\n'
    : labs.map((lab) => {
      const route = `/${lab.slug}/`;
      return [
        `## [${lab.metadata.title}](${route})`,
        '',
        lab.metadata.summary,
        '',
        `- **Duration:** ${lab.metadata.durationMinutes} minutes`,
        `- **Difficulty:** ${lab.metadata.difficulty}`,
        `- **Technologies:** ${lab.metadata.technologies.join(', ')}`,
      ].join('\n');
    }).join('\n\n');
  return [
    '---',
    "title: 'Hands-on Labs'",
    "description: 'Practical, guided learning experiences.'",
    'generated: true',
    "sourcePath: 'scripts/generate-vitepress-labs.mjs'",
    '---',
    '# Hands-on Labs',
    '',
    cards,
  ].join('\n') + '\n';
}

async function appendRelatedPresentations(body, lab, workspace) {
  const presentations = lab.metadata.relatedPresentations;
  if (!Array.isArray(presentations) || presentations.length === 0) return body;
  const cards = [];
  for (const presentation of presentations) {
    const deck = await readDeckMetadata(workspace, presentation.deck);
    cards.push([
      `### [${deck.title ?? presentation.deck}](https://plagueho.github.io/plagueho.learn/${presentation.deck}/)`,
      '',
      summarizeDeckInfo(deck.info, presentation.note),
      '',
      `${presentation.note} Slides: ${presentation.slides}.`,
    ].join('\n'));
  }
  return `${body.trimEnd()}\n\n## Related presentations\n\n${cards.join('\n\n')}\n`;
}

function renderSidebar(labs) {
  const groups = labs.map((lab) => {
    const items = [];
    const before = lab.supportingPages.find((page) => page.slug === 'before-you-start');
    const facilitator = lab.supportingPages.find((page) => page.slug === 'facilitator-notes');
    if (before) {
      items.push({
        text: before.metadata.title,
        link: `${PRODUCTION_BASE}${lab.slug}/before-you-start`,
      });
    }
    for (const module of lab.modules) {
      items.push({
        text: `${String(module.number).padStart(2, '0')}. ${module.metadata.title}`,
        link: `${PRODUCTION_BASE}${lab.slug}/${module.metadata.slug}`,
      });
    }
    if (facilitator) {
      items.push({
        text: facilitator.metadata.title,
        link: `${PRODUCTION_BASE}${lab.slug}/facilitator-notes`,
      });
    }
    return {
      text: lab.metadata.title,
      link: `${PRODUCTION_BASE}${lab.slug}/`,
      collapsed: true,
      items,
    };
  });
  return [
    '/**',
    ' * Purpose: Provide deterministic generated navigation for all discovered hands-on labs.',
    ' * Parameters: None; this file is generated by scripts/generate-vitepress-labs.mjs.',
    ' * Usage: Import the default export from the VitePress site configuration.',
    ' */',
    '',
    `export default ${JSON.stringify(groups, null, 2)}`,
    '',
  ].join('\n');
}

async function copyResources(lab, siteRoot) {
  const assetsSource = path.join(lab.root, 'assets');
  if (await pathExists(assetsSource)) {
    await cp(assetsSource, path.join(siteRoot, lab.slug, 'assets'), { recursive: true });
  }
  for (const module of lab.modules) {
    const solutionSource = path.join(module.root, 'solution');
    if (await pathExists(solutionSource)) {
      await cp(
        solutionSource,
        path.join(siteRoot, lab.slug, module.metadata.slug, 'solution'),
        { recursive: true },
      );
    }
  }
}

export async function generateLabs(root) {
  const workspace = await discoverWorkspace(root);
  if (workspace.errors.length > 0) {
    throw new Error(formatErrors(workspace.errors, 'Lab generation'));
  }

  const siteRoot = path.join(root, 'labs-site');
  const pageMap = buildPageMap(workspace);
  const generatedPages = [];
  const linkErrors = [];

  for (const lab of workspace.labs) {
    const pages = [lab, ...lab.supportingPages, ...lab.modules];
    for (const page of pages) {
      const mapping = pageMap.get(path.normalize(page.absolutePath));
      let body = await rewriteMarkdownLinks(page.body, {
        lab,
        pageMap,
        sourceFile: page.absolutePath,
        sourceRelative: page.relativePath,
        outputRelative: mapping.outputRelative,
        errors: linkErrors,
      });
      if (page === lab) body = await appendRelatedPresentations(body, lab, workspace);
      generatedPages.push({
        output: path.join(siteRoot, mapping.outputRelative),
        content: renderGeneratedPage(page, body),
      });
    }
  }

  if (linkErrors.length > 0) {
    throw new Error(formatErrors(linkErrors, 'Lab generation'));
  }

  await mkdir(path.join(siteRoot, '.vitepress'), { recursive: true });
  await removePreviouslyGeneratedLabs(siteRoot);
  for (const page of generatedPages) {
    await mkdir(path.dirname(page.output), { recursive: true });
    await writeFile(page.output, page.content, 'utf8');
  }
  for (const lab of workspace.labs) await copyResources(lab, siteRoot);
  await writeFile(path.join(siteRoot, 'index.md'), renderCatalogue(workspace.labs), 'utf8');
  await writeFile(
    path.join(siteRoot, '.vitepress', 'labs-sidebar.ts'),
    renderSidebar(workspace.labs),
    'utf8',
  );
  return workspace.labs.length;
}

async function main() {
  const root = parseRootArgument(process.argv.slice(2));
  const count = await generateLabs(root);
  console.log(`Generated VitePress content for ${count} lab${count === 1 ? '' : 's'}.`);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(fileURLToPath(import.meta.url))) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
