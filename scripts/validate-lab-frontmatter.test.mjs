/**
 * Purpose: Verify aggregate schema validation, future-lab discovery, and actionable failures.
 * Parameters: Executed by Node's built-in test runner; each test creates an isolated temporary workspace.
 * Usage: node --test scripts/validate-lab-frontmatter.test.mjs
 */

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const script = path.resolve('scripts/validate-lab-frontmatter.mjs');

async function write(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

function lab(title, deck = 'deck') {
  return `---
title: '${title}'
summary: 'Summary.'
durationMinutes: 30
difficulty: beginner
technologies:
  - Node.js
relatedPresentations:
  - deck: '${deck}'
    slides: '1-2'
    note: 'Read first.'
status: published
---
# ${title}
`;
}

function modulePage(track, module = 1, slug = 'step') {
  return `---
title: 'Step'
description: 'Description.'
lastUpdated: '2026-09-29'
track: ${track}
module: ${module}
slug: ${slug}
estimatedTimeMinutes: 15
difficulty: beginner
prerequisites: []
audience:
  - developers
technologies:
  - Node.js
tags:
  - test
status: published
contentType: lab
---
# Step
`;
}

async function addLab(root, slug, title = 'Lab') {
  await write(path.join(root, 'labs', slug, 'README.md'), lab(title));
  await write(
    path.join(root, 'labs', slug, 'before-you-start.md'),
    "---\ntitle: 'Before you start'\ndescription: 'Prepare.'\n---\n# Before you start\n",
  );
  await write(path.join(root, 'labs', slug, '01-step', 'README.md'), modulePage(slug));
}

async function createWorkspace() {
  const root = await mkdtemp(path.join(tmpdir(), 'plagueho-labs-validator-'));
  await write(
    path.join(root, 'presentations', 'deck', 'slides.md'),
    "---\ntitle: 'Deck'\n---\n# Deck\n",
  );
  return root;
}

async function runValidator(root) {
  return execFileAsync(process.execPath, [script, '--root', root], { windowsHide: true });
}

test('discovers and validates future labs without code changes', async (t) => {
  const root = await createWorkspace();
  t.after(() => rm(root, { recursive: true, force: true }));
  await addLab(root, 'first-lab', 'First Lab');
  await addLab(root, 'future-lab', 'Future Lab');
  const result = await runValidator(root);
  assert.match(result.stdout, /Validated 2 labs successfully/);
});

test('aggregates schema, path, date, H1, and missing-deck failures', async (t) => {
  const root = await createWorkspace();
  t.after(() => rm(root, { recursive: true, force: true }));
  await addLab(root, 'example-lab', 'Example Lab');
  await write(
    path.join(root, 'labs', 'example-lab', 'README.md'),
    lab('Wrong Heading', 'missing-deck').replace('# Wrong Heading', '# Different Heading'),
  );
  const invalidModule = modulePage('wrong-track', 9, 'wrong-slug')
    .replace("lastUpdated: '2026-09-29'", "lastUpdated: '2026-99-99'")
    .replace('# Step', '# Wrong');
  await write(path.join(root, 'labs', 'example-lab', '01-step', 'README.md'), invalidModule);

  await assert.rejects(runValidator(root), (error) => {
    const output = `${error.stderr}${error.stdout}`;
    assert.match(output, /failed with [5-9] errors|failed with \d{2,} errors/);
    assert.match(output, /related presentation "missing-deck" is missing/);
    assert.match(output, /track "wrong-track" must match lab path "example-lab"/);
    assert.match(output, /module "9" must match path number "1"/);
    assert.match(output, /slug "wrong-slug" must match path slug "step"/);
    assert.match(output, /lastUpdated.*valid calendar date/);
    assert.match(output, /H1 "Wrong" must equal frontmatter title "Step"/);
    return true;
  });
});

test('reports duplicate module routes with both source files', async (t) => {
  const root = await createWorkspace();
  t.after(() => rm(root, { recursive: true, force: true }));
  await addLab(root, 'example-lab', 'Example Lab');
  await write(
    path.join(root, 'labs', 'example-lab', '02-other', 'README.md'),
    modulePage('example-lab', 2, 'step'),
  );
  await assert.rejects(runValidator(root), (error) => {
    const output = `${error.stderr}${error.stdout}`;
    assert.match(output, /02-other\/README\.md: duplicate route/);
    assert.match(output, /01-step\/README\.md/);
    return true;
  });
});
