/**
 * Purpose: Share lab discovery, frontmatter validation, route mapping, and link rewriting.
 * Parameters: Functions accept an absolute repository root and source/output paths.
 * Usage: Import from the lab generator, validator, or their focused Node tests.
 */

import { access, readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

export const PRODUCTION_BASE = '/plagueho.learn/labs/';
export const LAB_DIFFICULTIES = new Set(['beginner', 'intermediate', 'advanced']);
export const LAB_STATUSES = new Set(['draft', 'published', 'archived']);
export const MODULE_CONTENT_TYPES = new Set(['lab']);
export const RESERVED_LAB_SLUGS = new Set(['index', '.vitepress', 'assets', 'public']);
export const RESERVED_PAGE_SLUGS = new Set([
  'index',
  'assets',
  'before-you-start',
  'facilitator-notes',
]);

const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/;
const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const MODULE_DIRECTORY_PATTERN = /^(\d{2,})-(.+)$/;
const MODULE_LIKE_DIRECTORY_PATTERN = /^\d+-/;
const EXTERNAL_LINK_PATTERN = /^(?:[a-z][a-z\d+.-]*:|\/\/|\/|#)/i;
const PUBLICATION_BLOCKER_PATTERN = /(?:TODO-SCREENSHOT|PUBLICATION-BLOCKER:)/;

function parseScalar(value, file, lineNumber) {
  const trimmed = value.trim();
  if (trimmed === '[]') return [];
  if (trimmed === '{}') return {};
  if (trimmed === 'true') return true;
  if (trimmed === 'false') return false;
  if (trimmed === 'null' || trimmed === '~') return null;
  if (/^-?\d+(?:\.\d+)?$/.test(trimmed)) return Number(trimmed);
  if (
    (trimmed.startsWith("'") && trimmed.endsWith("'")) ||
    (trimmed.startsWith('"') && trimmed.endsWith('"'))
  ) {
    if (trimmed.startsWith('"')) {
      try {
        return JSON.parse(trimmed);
      } catch {
        throw new Error(`${file}:${lineNumber}: malformed quoted frontmatter value`);
      }
    }
    return trimmed.slice(1, -1).replace(/''/g, "'");
  }
  if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
    const inner = trimmed.slice(1, -1).trim();
    if (!inner) return [];
    return inner.split(',').map((item) => parseScalar(item, file, lineNumber));
  }
  if (!trimmed || /[{}\[\]]/.test(trimmed)) {
    throw new Error(`${file}:${lineNumber}: unsupported or malformed frontmatter value`);
  }
  return trimmed.replace(/\s+#.*$/, '');
}

function parseFrontmatterLines(lines, file) {
  const metadata = {};

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!line.trim() || line.trimStart().startsWith('#')) continue;
    const topLevel = /^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/.exec(line);
    if (!topLevel) {
      throw new Error(`${file}:${index + 2}: malformed frontmatter entry`);
    }

    const [, key, rawValue = ''] = topLevel;
    if (Object.hasOwn(metadata, key)) {
      throw new Error(`${file}:${index + 2}: duplicate frontmatter key "${key}"`);
    }
    if (rawValue.trim()) {
      metadata[key] = parseScalar(rawValue, file, index + 2);
      continue;
    }

    const items = [];
    while (index + 1 < lines.length && /^(?: {2,}|\s*$)/.test(lines[index + 1])) {
      index += 1;
      const nested = lines[index];
      if (!nested.trim() || nested.trimStart().startsWith('#')) continue;
      const listItem = /^ {2}-(?:\s*(.*))?$/.exec(nested);
      if (!listItem) {
        throw new Error(`${file}:${index + 2}: expected a two-space-indented list item`);
      }

      const itemValue = listItem[1] ?? '';
      const objectStart = /^([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/.exec(itemValue);
      if (!objectStart) {
        items.push(parseScalar(itemValue, file, index + 2));
        continue;
      }

      const item = {
        [objectStart[1]]: parseScalar(objectStart[2] ?? '', file, index + 2),
      };
      while (index + 1 < lines.length && /^ {4}\S/.test(lines[index + 1])) {
        index += 1;
        const property = /^ {4}([A-Za-z][A-Za-z0-9]*):(?:\s*(.*))?$/.exec(lines[index]);
        if (!property) {
          throw new Error(`${file}:${index + 2}: malformed list-object property`);
        }
        item[property[1]] = parseScalar(property[2] ?? '', file, index + 2);
      }
      items.push(item);
    }
    metadata[key] = items;
  }

  return metadata;
}

export function parseMarkdown(source, file) {
  if (!source.startsWith('---\n') && !source.startsWith('---\r\n')) {
    throw new Error(`${file}: missing YAML frontmatter`);
  }
  const normalized = source.replace(/\r\n/g, '\n');
  const closingIndex = normalized.indexOf('\n---\n', 4);
  if (closingIndex === -1) {
    throw new Error(`${file}: frontmatter is missing its closing delimiter`);
  }
  const rawFrontmatter = normalized.slice(4, closingIndex);
  return {
    metadata: parseFrontmatterLines(rawFrontmatter.split('\n'), file),
    rawFrontmatter,
    body: normalized.slice(closingIndex + 5),
  };
}

function addRequiredStringErrors(metadata, keys, file, errors) {
  for (const key of keys) {
    if (typeof metadata[key] !== 'string' || metadata[key].trim() === '') {
      errors.push(`${file}: frontmatter "${key}" must be a non-empty string`);
    }
  }
}

function addStringArrayError(metadata, key, file, errors, allowEmpty = false) {
  const value = metadata[key];
  if (
    !Array.isArray(value) ||
    (!allowEmpty && value.length === 0) ||
    value.some((item) => typeof item !== 'string' || !item.trim())
  ) {
    errors.push(`${file}: frontmatter "${key}" must be ${allowEmpty ? 'a' : 'a non-empty'} string array`);
  }
}

function firstH1(body) {
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(?:```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) {
      const match = /^# (.+?)\s*$/.exec(line);
      if (match) return match[1];
    }
  }
  return undefined;
}

function validateTitle(metadata, body, file, errors) {
  const heading = firstH1(body);
  if (!heading) {
    errors.push(`${file}: content must contain an H1 heading`);
  } else if (typeof metadata.title === 'string' && heading !== metadata.title) {
    errors.push(`${file}: H1 "${heading}" must equal frontmatter title "${metadata.title}"`);
  }
}

function validateLab(lab, errors) {
  const { metadata, body, relativePath: file, slug } = lab;
  addRequiredStringErrors(metadata, ['title', 'summary', 'difficulty', 'status'], file, errors);
  if (!Number.isInteger(metadata.durationMinutes) || metadata.durationMinutes <= 0) {
    errors.push(`${file}: frontmatter "durationMinutes" must be a positive integer`);
  }
  if (!LAB_DIFFICULTIES.has(metadata.difficulty)) {
    errors.push(`${file}: frontmatter "difficulty" must be beginner, intermediate, or advanced`);
  }
  if (!LAB_STATUSES.has(metadata.status)) {
    errors.push(`${file}: frontmatter "status" must be draft, published, or archived`);
  }
  addStringArrayError(metadata, 'technologies', file, errors);
  if (!Array.isArray(metadata.relatedPresentations)) {
    errors.push(`${file}: frontmatter "relatedPresentations" must be an array`);
  } else {
    metadata.relatedPresentations.forEach((presentation, index) => {
      if (!presentation || typeof presentation !== 'object' || Array.isArray(presentation)) {
        errors.push(`${file}: relatedPresentations[${index}] must be an object`);
        return;
      }
      for (const key of ['deck', 'slides', 'note']) {
        if (typeof presentation[key] !== 'string' || !presentation[key].trim()) {
          errors.push(`${file}: relatedPresentations[${index}].${key} must be a non-empty string`);
        }
      }
    });
  }
  if (!SLUG_PATTERN.test(slug)) {
    errors.push(`${file}: lab directory "${slug}" must be a kebab-case slug`);
  }
  if (RESERVED_LAB_SLUGS.has(slug.toLowerCase())) {
    errors.push(`${file}: lab slug "${slug}" is reserved`);
  }
  validateTitle(metadata, body, file, errors);
}

function validateModule(module, lab, errors) {
  const { metadata, body, relativePath: file, directory, slug, number } = module;
  addRequiredStringErrors(
    metadata,
    ['title', 'description', 'lastUpdated', 'track', 'slug', 'difficulty', 'status', 'contentType'],
    file,
    errors,
  );
  for (const key of ['prerequisites', 'audience', 'technologies', 'tags']) {
    addStringArrayError(metadata, key, file, errors, key === 'prerequisites');
  }
  if (!Number.isInteger(metadata.module) || metadata.module < 0) {
    errors.push(`${file}: frontmatter "module" must be a non-negative integer`);
  }
  if (!Number.isInteger(metadata.estimatedTimeMinutes) || metadata.estimatedTimeMinutes <= 0) {
    errors.push(`${file}: frontmatter "estimatedTimeMinutes" must be a positive integer`);
  }
  if (!LAB_DIFFICULTIES.has(metadata.difficulty)) {
    errors.push(`${file}: frontmatter "difficulty" must be beginner, intermediate, or advanced`);
  }
  if (!LAB_STATUSES.has(metadata.status)) {
    errors.push(`${file}: frontmatter "status" must be draft, published, or archived`);
  }
  if (!MODULE_CONTENT_TYPES.has(metadata.contentType)) {
    errors.push(`${file}: frontmatter "contentType" must be "lab"`);
  }
  if (typeof metadata.lastUpdated !== 'string' || !DATE_PATTERN.test(metadata.lastUpdated)) {
    errors.push(`${file}: frontmatter "lastUpdated" must use YYYY-MM-DD`);
  } else if (
    Number.isNaN(Date.parse(`${metadata.lastUpdated}T00:00:00Z`)) ||
    new Date(`${metadata.lastUpdated}T00:00:00Z`).toISOString().slice(0, 10) !== metadata.lastUpdated
  ) {
    errors.push(`${file}: frontmatter "lastUpdated" is not a valid calendar date`);
  }
  if (metadata.track !== lab.slug) {
    errors.push(`${file}: frontmatter track "${metadata.track}" must match lab path "${lab.slug}"`);
  }
  if (metadata.module !== number) {
    errors.push(`${file}: frontmatter module "${metadata.module}" must match path number "${number}"`);
  }
  if (metadata.slug !== slug) {
    errors.push(`${file}: frontmatter slug "${metadata.slug}" must match path slug "${slug}"`);
  }
  if (typeof metadata.slug === 'string' && !SLUG_PATTERN.test(metadata.slug)) {
    errors.push(`${file}: frontmatter slug "${metadata.slug}" must be kebab-case`);
  }
  if (RESERVED_PAGE_SLUGS.has(String(metadata.slug).toLowerCase())) {
    errors.push(`${file}: module slug "${metadata.slug}" is reserved`);
  }
  if (directory !== `${String(number).padStart(2, '0')}-${slug}`) {
    errors.push(`${file}: module directory must match its number and slug`);
  }
  validateTitle(metadata, body, file, errors);
}

async function pathExists(target) {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
}

function toPosix(value) {
  return value.split(path.sep).join('/');
}

async function readMarkdownPage(root, absolutePath) {
  const relativePath = toPosix(path.relative(root, absolutePath));
  try {
    const source = await readFile(absolutePath, 'utf8');
    return { ...parseMarkdown(source, relativePath), source, absolutePath, relativePath };
  } catch (error) {
    if (error?.code === 'ENOENT') throw new Error(`${relativePath}: required source file is missing`);
    throw error;
  }
}

async function findMarkdownFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await findMarkdownFiles(target));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(target);
    }
  }
  return files;
}

async function validatePublicationReadiness(lab, root, errors) {
  if (lab.metadata.status !== 'published') return;

  for (const module of lab.modules) {
    if (module.metadata.status !== 'published') {
      errors.push(
        `${module.relativePath}: module status must be "published" when lab "${lab.slug}" is published`,
      );
    }
  }

  for (const file of await findMarkdownFiles(lab.root)) {
    const source = await readFile(file, 'utf8');
    if (PUBLICATION_BLOCKER_PATTERN.test(source)) {
      errors.push(
        `${toPosix(path.relative(root, file))}: published lab content contains an unresolved ` +
        'screenshot or verification publication blocker',
      );
    }
  }
}

export async function discoverWorkspace(root) {
  const labsRoot = path.join(root, 'labs');
  const presentationsRoot = path.join(root, 'presentations');
  const errors = [];
  const labs = [];
  let entries = [];

  if (await pathExists(labsRoot)) {
    entries = (await readdir(labsRoot, { withFileTypes: true }))
      .filter((entry) => entry.isDirectory())
      .sort((left, right) => left.name.localeCompare(right.name, 'en'));
  }

  const routeOwners = new Map();
  for (const entry of entries) {
    const slug = entry.name;
    const labRoot = path.join(labsRoot, slug);
    const readmePath = path.join(labRoot, 'README.md');
    if (!(await pathExists(readmePath))) {
      errors.push(`${toPosix(path.relative(root, readmePath))}: required lab README.md is missing`);
      continue;
    }

    let page;
    try {
      page = await readMarkdownPage(root, readmePath);
    } catch (error) {
      errors.push(error.message);
      continue;
    }
    const lab = { ...page, slug, root: labRoot, modules: [], supportingPages: [] };
    validateLab(lab, errors);

    const labRoute = `${PRODUCTION_BASE}${slug.toLowerCase()}/`;
    const priorLab = routeOwners.get(labRoute);
    if (priorLab) {
      errors.push(`${page.relativePath}: duplicate route "${labRoute}" also produced by ${priorLab}`);
    } else {
      routeOwners.set(labRoute, page.relativePath);
    }

    for (const supportingName of ['before-you-start.md', 'facilitator-notes.md']) {
      const supportingPath = path.join(labRoot, supportingName);
      if (await pathExists(supportingPath)) {
        try {
          const supporting = await readMarkdownPage(root, supportingPath);
          addRequiredStringErrors(supporting.metadata, ['title', 'description'], supporting.relativePath, errors);
          validateTitle(supporting.metadata, supporting.body, supporting.relativePath, errors);
          lab.supportingPages.push({
            ...supporting,
            slug: path.basename(supportingName, '.md'),
          });
        } catch (error) {
          errors.push(error.message);
        }
      } else if (supportingName === 'before-you-start.md') {
        errors.push(`${toPosix(path.relative(root, supportingPath))}: required source file is missing`);
      }
    }

    const labEntries = (await readdir(labRoot, { withFileTypes: true }))
      .filter((item) => item.isDirectory())
      .sort((left, right) => left.name.localeCompare(right.name, 'en'));
    for (const moduleEntry of labEntries) {
      if (moduleEntry.name === 'assets') continue;
      const directoryMatch = MODULE_DIRECTORY_PATTERN.exec(moduleEntry.name);
      if (!directoryMatch) {
        if (MODULE_LIKE_DIRECTORY_PATTERN.test(moduleEntry.name)) {
          errors.push(
            `${toPosix(path.relative(root, path.join(labRoot, moduleEntry.name)))}: ` +
            'module-like directory must use a zero-padded number such as "01-module-name"',
          );
        }
        continue;
      }
      const moduleReadme = path.join(labRoot, moduleEntry.name, 'README.md');
      if (!(await pathExists(moduleReadme))) {
        errors.push(`${toPosix(path.relative(root, moduleReadme))}: required module README.md is missing`);
        continue;
      }
      try {
        const modulePage = await readMarkdownPage(root, moduleReadme);
        const module = {
          ...modulePage,
          directory: moduleEntry.name,
          number: Number(directoryMatch[1]),
          slug: directoryMatch[2],
          root: path.join(labRoot, moduleEntry.name),
        };
        validateModule(module, lab, errors);
        const moduleRoute = `${PRODUCTION_BASE}${slug.toLowerCase()}/${String(module.metadata.slug).toLowerCase()}`;
        const priorRoute = routeOwners.get(moduleRoute);
        if (priorRoute) {
          errors.push(`${module.relativePath}: duplicate route "${moduleRoute}" also produced by ${priorRoute}`);
        } else {
          routeOwners.set(moduleRoute, module.relativePath);
        }
        lab.modules.push(module);
      } catch (error) {
        errors.push(error.message);
      }
    }
    if (lab.modules.length === 0) {
      errors.push(`${page.relativePath}: lab must contain at least one numbered module directory`);
    }
    lab.modules.sort((left, right) => left.number - right.number || left.slug.localeCompare(right.slug, 'en'));

    if (Array.isArray(lab.metadata.relatedPresentations)) {
      for (const presentation of lab.metadata.relatedPresentations) {
        if (!presentation || typeof presentation.deck !== 'string') continue;
        const deckPath = path.join(presentationsRoot, presentation.deck, 'slides.md');
        if (!(await pathExists(deckPath))) {
          errors.push(
            `${page.relativePath}: related presentation "${presentation.deck}" is missing ` +
            `${toPosix(path.relative(root, deckPath))}`,
          );
        }
      }
    }
    await validatePublicationReadiness(lab, root, errors);
    labs.push(lab);
  }

  labs.sort((left, right) => left.slug.localeCompare(right.slug, 'en'));
  return { root, labsRoot, presentationsRoot, labs, errors };
}

export function buildPageMap(workspace) {
  const pageMap = new Map();
  for (const lab of workspace.labs) {
    pageMap.set(path.normalize(lab.absolutePath), {
      outputRelative: path.join(lab.slug, 'index.md'),
      publicRoute: `${PRODUCTION_BASE}${lab.slug}/`,
    });
    for (const page of lab.supportingPages) {
      pageMap.set(path.normalize(page.absolutePath), {
        outputRelative: path.join(lab.slug, `${page.slug}.md`),
        publicRoute: `${PRODUCTION_BASE}${lab.slug}/${page.slug}`,
      });
    }
    for (const module of lab.modules) {
      pageMap.set(path.normalize(module.absolutePath), {
        outputRelative: path.join(lab.slug, `${module.metadata.slug}.md`),
        publicRoute: `${PRODUCTION_BASE}${lab.slug}/${module.metadata.slug}`,
      });
    }
  }
  return pageMap;
}

function splitLinkTarget(target) {
  const suffixIndex = target.search(/[?#]/);
  return suffixIndex === -1
    ? { pathname: target, suffix: '' }
    : { pathname: target.slice(0, suffixIndex), suffix: target.slice(suffixIndex) };
}

function isWithin(parent, child) {
  const relative = path.relative(parent, child);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

async function resolveLinkedSource(sourceFile, pathname) {
  let decoded;
  try {
    decoded = decodeURIComponent(pathname);
  } catch {
    decoded = pathname;
  }
  const target = path.resolve(path.dirname(sourceFile), decoded);
  if (await pathExists(target)) {
    const targetStats = await stat(target);
    if (targetStats.isDirectory()) {
      const readme = path.join(target, 'README.md');
      return (await pathExists(readme)) ? readme : target;
    }
    return target;
  }
  return target;
}

function outputPathForCopiedSource(lab, linkedSource) {
  const assetsRoot = path.join(lab.root, 'assets');
  if (isWithin(assetsRoot, linkedSource)) {
    return path.join(lab.slug, 'assets', path.relative(assetsRoot, linkedSource));
  }
  for (const module of lab.modules) {
    const solutionRoot = path.join(module.root, 'solution');
    if (isWithin(solutionRoot, linkedSource)) {
      return path.join(
        lab.slug,
        String(module.metadata.slug),
        'solution',
        path.relative(solutionRoot, linkedSource),
      );
    }
  }
  return undefined;
}

async function rewriteTarget(target, context) {
  if (!target || EXTERNAL_LINK_PATTERN.test(target)) return target;
  const { pathname, suffix } = splitLinkTarget(target);
  if (!pathname) return target;
  const linkedSource = path.normalize(await resolveLinkedSource(context.sourceFile, pathname));

  if (!isWithin(context.lab.root, linkedSource)) {
    context.errors.push(
      `${context.sourceRelative}: unsupported relative link "${target}" points outside its lab`,
    );
    return target;
  }

  const page = context.pageMap.get(linkedSource);
  let outputRelative = page?.outputRelative;
  if (!outputRelative) outputRelative = outputPathForCopiedSource(context.lab, linkedSource);
  if (!outputRelative) {
    const exists = await pathExists(linkedSource);
    context.errors.push(
      `${context.sourceRelative}: ${exists ? 'unsupported source path' : 'cannot map missing link'} "${target}"`,
    );
    return target;
  }

  let relative = toPosix(path.relative(path.dirname(context.outputRelative), outputRelative));
  if (!relative.startsWith('.')) relative = `./${relative}`;
  if (page && relative.endsWith('/index.md')) relative = `${relative.slice(0, -8)}`;
  if (page) relative = relative.replace(/\.md$/, '');
  return `${relative}${suffix}`;
}

export async function rewriteMarkdownLinks(body, context) {
  const output = [];
  let inFence = false;
  for (const line of body.split('\n')) {
    if (/^\s*(?:```|~~~)/.test(line)) {
      inFence = !inFence;
      output.push(line);
      continue;
    }
    if (inFence) {
      output.push(line);
      continue;
    }

    let rewritten = '';
    let cursor = 0;
    const inlinePattern = /(!?\[[^\]]*]\()(<[^>]+>|[^)\s]+)([^)]*\))/g;
    for (const match of line.matchAll(inlinePattern)) {
      rewritten += line.slice(cursor, match.index);
      const wrapped = match[2].startsWith('<') && match[2].endsWith('>');
      const rawTarget = wrapped ? match[2].slice(1, -1) : match[2];
      const nextTarget = await rewriteTarget(rawTarget, context);
      rewritten += `${match[1]}${wrapped ? `<${nextTarget}>` : nextTarget}${match[3]}`;
      cursor = match.index + match[0].length;
    }
    rewritten += line.slice(cursor);

    const reference = /^(\s*\[[^\]]+]:\s*)(\S+)(.*)$/.exec(rewritten);
    if (reference) {
      const nextTarget = await rewriteTarget(reference[2].replace(/^<|>$/g, ''), context);
      rewritten = `${reference[1]}${nextTarget}${reference[3]}`;
    }

    let html = '';
    cursor = 0;
    const htmlPattern = /\b(src|href)=(["'])([^"']+)\2/g;
    for (const match of rewritten.matchAll(htmlPattern)) {
      html += rewritten.slice(cursor, match.index);
      const nextTarget = await rewriteTarget(match[3], context);
      html += `${match[1]}=${match[2]}${nextTarget}${match[2]}`;
      cursor = match.index + match[0].length;
    }
    output.push(html + rewritten.slice(cursor));
  }
  return output.join('\n');
}

export function renderGeneratedPage(page, body) {
  const sourcePath = page.relativePath.replace(/'/g, "''");
  return `---\n${page.rawFrontmatter}\ngenerated: true\nsourcePath: '${sourcePath}'\n---\n${body}`;
}

export function formatErrors(errors, heading) {
  return `${heading} failed with ${errors.length} error${errors.length === 1 ? '' : 's'}:\n` +
    errors.map((error) => `- ${error}`).join('\n');
}

export function parseRootArgument(argumentsList) {
  let root = process.cwd();
  for (let index = 0; index < argumentsList.length; index += 1) {
    if (argumentsList[index] === '--root') {
      const value = argumentsList[index + 1];
      if (!value) throw new Error('--root requires a directory path');
      root = path.resolve(value);
      index += 1;
    } else {
      throw new Error(`unsupported argument "${argumentsList[index]}"`);
    }
  }
  return root;
}

export { pathExists, toPosix };
