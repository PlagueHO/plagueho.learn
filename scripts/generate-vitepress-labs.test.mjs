/**
 * Purpose: Verify deterministic lab generation, canonical routing, rewriting, and failure diagnostics.
 * Parameters: Executed by Node's built-in test runner; each test creates an isolated temporary workspace.
 * Usage: node --test scripts/generate-vitepress-labs.test.mjs
 */

import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const script = path.resolve('scripts/generate-vitepress-labs.mjs');

function labFrontmatter(overrides = '') {
  return `---
title: 'Example Lab'
summary: 'A generated lab fixture.'
durationMinutes: 60
difficulty: beginner
technologies:
  - Node.js
relatedPresentations:
  - deck: 'example-deck'
    slides: '1-4'
    note: 'Review this deck first.'
status: published
${overrides}---
# Example Lab

[Start](./before-you-start.md)
[Module](./01-first-step/README.md)
[Facilitator](./facilitator-notes.md)
`;
}

function moduleSource({ module = 1, slug = 'first-step', extra = '' } = {}) {
  return `---
title: 'First Step'
description: 'Complete the first step.'
lastUpdated: '2026-09-29'
track: example-lab
module: ${module}
slug: ${slug}
estimatedTimeMinutes: 20
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
# First Step

![Diagram](../assets/diagram.png)
[Prerequisites](../before-you-start.md)
[Facilitator](../facilitator-notes.md)
[Solution](./solution/answer.txt)
${extra}`;
}

async function writeFileEnsuringDirectory(file, content) {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

async function createWorkspace() {
  const root = await mkdtemp(path.join(tmpdir(), 'plagueho-labs-generator-'));
  await writeFileEnsuringDirectory(
    path.join(root, 'presentations', 'example-deck', 'slides.md'),
    `---
title: 'Example Deck'
info: |
  Deck details.
  Second line.
drawings:
  persist: false
---
# Slide
`,
  );
  await writeFileEnsuringDirectory(path.join(root, 'labs', 'example-lab', 'README.md'), labFrontmatter());
  await writeFileEnsuringDirectory(
    path.join(root, 'labs', 'example-lab', 'before-you-start.md'),
    "---\ntitle: 'Before you start'\ndescription: 'Prepare.'\n---\n# Before you start\n",
  );
  await writeFileEnsuringDirectory(
    path.join(root, 'labs', 'example-lab', 'facilitator-notes.md'),
    "---\ntitle: 'Facilitator notes'\ndescription: 'Delivery notes.'\n---\n# Facilitator notes\n",
  );
  await writeFileEnsuringDirectory(
    path.join(root, 'labs', 'example-lab', '01-first-step', 'README.md'),
    moduleSource(),
  );
  await writeFileEnsuringDirectory(
    path.join(root, 'labs', 'example-lab', 'assets', 'diagram.png'),
    'image',
  );
  await writeFileEnsuringDirectory(
    path.join(root, 'labs', 'example-lab', '01-first-step', 'solution', 'answer.txt'),
    'answer',
  );
  return root;
}

async function runGenerator(root) {
  return execFileAsync(process.execPath, [script, '--root', root], { windowsHide: true });
}

async function expectFailure(root, pattern) {
  await assert.rejects(runGenerator(root), (error) => {
    assert.match(`${error.stderr}${error.stdout}`, pattern);
    assert.notEqual(error.code, 0);
    return true;
  });
}

test('generates deterministic canonical pages and rewrites every supported link class', async (t) => {
  const root = await createWorkspace();
  t.after(() => rm(root, { recursive: true, force: true }));

  await runGenerator(root);
  const landingPath = path.join(root, 'labs-site', 'example-lab', 'index.md');
  const modulePath = path.join(root, 'labs-site', 'example-lab', 'first-step.md');
  const sidebarPath = path.join(root, 'labs-site', '.vitepress', 'labs-sidebar.ts');
  const first = {
    catalogue: await readFile(path.join(root, 'labs-site', 'index.md'), 'utf8'),
    landing: await readFile(landingPath, 'utf8'),
    module: await readFile(modulePath, 'utf8'),
    sidebar: await readFile(sidebarPath, 'utf8'),
  };

  assert.match(first.catalogue, /\]\(\/example-lab\/\)/);
  assert.match(first.landing, /sourcePath: 'labs\/example-lab\/README\.md'/);
  assert.match(first.landing, /\[Start\]\(\.\/before-you-start\)/);
  assert.match(first.landing, /\[Module\]\(\.\/first-step\)/);
  assert.match(first.landing, /\[Facilitator\]\(\.\/facilitator-notes\)/);
  assert.match(first.landing, /\]\(https:\/\/plagueho\.github\.io\/plagueho\.learn\/example-deck\/\)/);
  assert.match(first.module, /sourcePath: 'labs\/example-lab\/01-first-step\/README\.md'/);
  assert.match(first.module, /!\[Diagram\]\(\.\/assets\/diagram\.png\)/);
  assert.match(first.module, /\[Prerequisites\]\(\.\/before-you-start\)/);
  assert.match(first.module, /\[Facilitator\]\(\.\/facilitator-notes\)/);
  assert.match(first.module, /\[Solution\]\(\.\/first-step\/solution\/answer\.txt\)/);
  assert.ok(await readFile(path.join(root, 'labs-site', 'example-lab', 'assets', 'diagram.png')));
  assert.ok(await readFile(
    path.join(root, 'labs-site', 'example-lab', 'first-step', 'solution', 'answer.txt'),
  ));
  const beforeIndex = first.sidebar.indexOf('before-you-start');
  const moduleIndex = first.sidebar.indexOf('first-step');
  const facilitatorIndex = first.sidebar.indexOf('facilitator-notes');
  assert.ok(beforeIndex < moduleIndex && moduleIndex < facilitatorIndex);

  await runGenerator(root);
  assert.deepEqual(
    {
      catalogue: await readFile(path.join(root, 'labs-site', 'index.md'), 'utf8'),
      landing: await readFile(landingPath, 'utf8'),
      module: await readFile(modulePath, 'utf8'),
      sidebar: await readFile(sidebarPath, 'utf8'),
    },
    first,
  );
});

test('fails for malformed metadata and reserved lab slugs', async (t) => {
  const malformedRoot = await createWorkspace();
  const reservedRoot = await createWorkspace();
  t.after(() => Promise.all([
    rm(malformedRoot, { recursive: true, force: true }),
    rm(reservedRoot, { recursive: true, force: true }),
  ]));
  await writeFile(
    path.join(malformedRoot, 'labs', 'example-lab', 'README.md'),
    labFrontmatter('broken: [\n'),
  );
  await expectFailure(malformedRoot, /malformed|unsupported/i);
  await mkdir(path.join(reservedRoot, 'labs', 'index'), { recursive: true });
  await writeFile(path.join(reservedRoot, 'labs', 'index', 'README.md'), labFrontmatter(), 'utf8');
  await expectFailure(reservedRoot, /lab slug "index" is reserved/i);
});

test('fails for duplicate routes and missing required source files', async (t) => {
  const duplicateRoot = await createWorkspace();
  const missingRoot = await createWorkspace();
  t.after(() => Promise.all([
    rm(duplicateRoot, { recursive: true, force: true }),
    rm(missingRoot, { recursive: true, force: true }),
  ]));
  await writeFileEnsuringDirectory(
    path.join(duplicateRoot, 'labs', 'example-lab', '02-second-step', 'README.md'),
    moduleSource({ module: 2, slug: 'first-step' }).replace(
      "title: 'First Step'",
      "title: 'Second Step'",
    ).replace('# First Step', '# Second Step'),
  );
  await expectFailure(duplicateRoot, /duplicate route.*first-step/i);
  await mkdir(path.join(missingRoot, 'labs', 'example-lab', '02-missing'), { recursive: true });
  await expectFailure(missingRoot, /02-missing\/README\.md: required module README\.md is missing/i);
});

test('fails for unsupported and unmappable relative links', async (t) => {
  const unsupportedRoot = await createWorkspace();
  const missingRoot = await createWorkspace();
  t.after(() => Promise.all([
    rm(unsupportedRoot, { recursive: true, force: true }),
    rm(missingRoot, { recursive: true, force: true }),
  ]));
  await writeFileEnsuringDirectory(path.join(unsupportedRoot, 'outside.txt'), 'outside');
  await writeFile(
    path.join(unsupportedRoot, 'labs', 'example-lab', '01-first-step', 'README.md'),
    moduleSource({ extra: '[Outside](../../../outside.txt)\n' }),
  );
  await expectFailure(unsupportedRoot, /unsupported relative link.*outside\.txt/i);
  await writeFile(
    path.join(missingRoot, 'labs', 'example-lab', '01-first-step', 'README.md'),
    moduleSource({ extra: '[Missing](./missing.txt)\n' }),
  );
  await expectFailure(missingRoot, /cannot map missing link.*missing\.txt/i);
});
