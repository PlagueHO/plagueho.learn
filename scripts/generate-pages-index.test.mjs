/**
 * Purpose: Check Pages index discovery, metadata, links, and format compatibility.
 * Parameters: none. Tests create and remove isolated temporary workspaces.
 * Usage: node --test scripts/generate-pages-index.test.mjs
 */
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { promisify } from 'node:util';
import test from 'node:test';

const execFileAsync = promisify(execFile);
const script = path.resolve('scripts/generate-pages-index.mjs');
const renamedDeck = 'hypervelocity-engineering-ai-sdlc-is-not-enough';
const deckPackage = JSON.parse(await readFile(
  path.resolve('presentations', renamedDeck, 'package.json'), 'utf8',
));

async function workspace(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'plagueho-pages-index-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(path.join(root, '_site'));
  return root;
}

async function write(root, relative, content) {
  const file = path.join(root, relative);
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, 'utf8');
}

async function build(root, name) {
  await write(root, path.join('_site', name, 'index.html'), '<!doctype html><title>Deck</title>');
}

async function standalone(root, name, pkg) {
  await write(root, path.join('presentations', name, 'package.json'), JSON.stringify(pkg));
}

async function generate(root) {
  await execFileAsync(process.execPath, [script, '_site'], { cwd: root });
  return readFile(path.join(root, '_site', 'index.html'), 'utf8');
}

test('index lists the renamed Reveal.js deck beside Slidev and retains the labs card', async t => {
  const root = await workspace(t);
  await standalone(root, renamedDeck, deckPackage);
  await build(root, renamedDeck);
  await write(root, path.join('presentations', 'original', 'slides.md'), `---
title: "Original Hypervelocity Engineering"
info: |
  ## Original deck
  A 45-minute presentation.
tags:
  - Engineering
duration: 45
---
`);
  await build(root, 'original');
  await build(root, 'labs');
  const html = await generate(root);
  assert.equal((html.match(new RegExp(`href="\\./${renamedDeck}/"`, 'g')) ?? []).length, 1);
  assert.ok(html.includes(deckPackage.presentation.title));
  assert.ok(html.includes(deckPackage.presentation.info.replaceAll('&', '&amp;')));
  assert.match(html, /60 min/);
  assert.match(html, /href="\.\/original\/"/);
  assert.match(html, /A 45-minute presentation\./);
  assert.match(html, />Engineering<\/span>/);
  assert.match(html, /45 min/);
  assert.equal((html.match(/href="\.\/labs\/"/g) ?? []).length, 1);
  assert.ok(html.indexOf(`href="./${renamedDeck}/"`) < html.indexOf('href="./original/"'));
});

test('index excludes source-only decks, incomplete output, and unrelated built folders', async t => {
  const root = await workspace(t);
  await standalone(root, 'published', { presentation: { title: 'Published' } });
  await build(root, 'published');
  await standalone(root, 'source-only', { presentation: { title: 'Source only' } });
  await standalone(root, 'incomplete', { presentation: { title: 'Incomplete' } });
  await mkdir(path.join(root, '_site', 'incomplete'));
  await write(root, path.join('presentations', 'slidev-incomplete', 'slides.md'), '---\ntitle: Incomplete\n---\n');
  await mkdir(path.join(root, '_site', 'slidev-incomplete'));
  await standalone(root, 'ordinary-package', { name: 'not-a-presentation' });
  await build(root, 'ordinary-package');
  await build(root, 'unrelated');
  const html = await generate(root);
  assert.match(html, /href="\.\/published\/"/);
  for (const name of ['source-only', 'incomplete', 'slidev-incomplete', 'ordinary-package', 'unrelated']) {
    assert.ok(!html.includes(`href="./${name}/"`), name);
  }
});

test('standalone metadata is escaped and optional fields can be omitted', async t => {
  const root = await workspace(t);
  await standalone(root, 'escaped', {
    presentation: {
      title: 'A <deck> & "title"',
      info: '<script>alert("unsafe")</script> <SCRIPT>alert("unsafe")</SCRIPT>',
      tags: ['<AI> & "tools"'],
      duration: 30,
    },
  });
  await build(root, 'escaped');
  await standalone(root, 'minimal', { presentation: { title: 'Z minimal' } });
  await build(root, 'minimal');
  const html = await generate(root);
  assert.match(html, /A &lt;deck&gt; &amp; &quot;title&quot;/);
  assert.match(html, /&lt;script&gt;alert\(&quot;unsafe&quot;\)&lt;\/script&gt;/);
  assert.match(html, /&lt;SCRIPT&gt;alert\(&quot;unsafe&quot;\)&lt;\/SCRIPT&gt;/);
  assert.match(html, /&lt;AI&gt; &amp; &quot;tools&quot;/);
  assert.doesNotMatch(html, /<script>/i);
  assert.match(html, /href="\.\/minimal\/"/);
  assert.ok(html.indexOf('href="./escaped/"') < html.indexOf('href="./minimal/"'));
});

test('Slidev metadata takes precedence when a deck also has a package', async t => {
  const root = await workspace(t);
  await standalone(root, 'slidev', { presentation: { title: 'Wrong format' } });
  await write(root, path.join('presentations', 'slidev', 'slides.md'), '---\ntitle: Slidev title\n---\n');
  await build(root, 'slidev');
  const html = await generate(root);
  assert.match(html, /Slidev title/);
  assert.doesNotMatch(html, /Wrong format/);
});

test('invalid explicit standalone metadata fails with a useful error', async t => {
  const invalid = [
    null, [], 'title', {}, { title: '' }, { title: ' ' }, { title: 7 },
    { title: 'Deck', info: [] },
    { title: 'Deck', tags: 'AI' }, { title: 'Deck', tags: [1] }, { title: 'Deck', tags: [' '] },
    { title: 'Deck', duration: '60' }, { title: 'Deck', duration: 0 }, { title: 'Deck', duration: -1 },
  ];
  for (const metadata of invalid) {
    await t.test(JSON.stringify(metadata), async t => {
      const root = await workspace(t);
      await standalone(root, 'invalid', { presentation: metadata });
      await build(root, 'invalid');
      await assert.rejects(() => generate(root), error => {
        assert.match(error.stderr, /Invalid presentation metadata in .*package\.json/);
        return true;
      });
    });
  }
});

test('malformed package JSON and a site without presentations fail explicitly', async t => {
  const root = await workspace(t);
  await build(root, 'broken');
  await write(root, path.join('presentations', 'broken', 'package.json'), '{invalid');
  await assert.rejects(() => generate(root), error => {
    assert.match(error.stderr, /SyntaxError/);
    return true;
  });
  const empty = await workspace(t);
  await build(empty, 'labs');
  await assert.rejects(() => generate(empty), error => {
    assert.match(error.stderr, /No presentation directories found/);
    return true;
  });
});
