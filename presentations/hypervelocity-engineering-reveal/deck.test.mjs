/**
 * Check the presentation structure, content limits, build, and preview server.
 * Parameters: none. Build the deck first.
 * Usage: npm run build && npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { slides, sources, renderSlides, escapeHtml } from './deck.mjs';
import { createPreviewServer } from './serve.mjs';

const text = html => html.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').trim();
const byId = Object.fromEntries(slides.map(slide => [slide.id, slide]));

test('35 unique slides preserve the 30 + 30 minute structure', () => {
  assert.equal(slides.length, 35);
  assert.equal(new Set(slides.map(slide => slide.id)).size, 35);
  for (const [part, count] of [['leadership', 20], ['deep-dive', 10], ['demos', 5]]) {
    const section = slides.filter(slide => slide.part === part);
    assert.equal(section.length, count);
    if (part !== 'demos') assert.equal(section.reduce((sum, slide) => sum + slide.minutes, 0), 30);
    else assert.ok(section.every(slide => slide.minutes === undefined));
  }
  assert.equal(slides[19].id, 'leadership-close');
  assert.equal(slides[20].id, 'deep-dive');
  assert.equal(slides[30].id, 'demo-install');
});

test('the operating model leads and the customer stays inside the recurring loop', () => {
  assert.deepEqual(slides.filter(slide => slide.part === 'leadership').map(slide => slide.id), [
    'hve', 'customer-loop', 'evolution', 'fde', 'two-changes', 'cracks', 'whole-flow', 'experiments',
    'four-pillars', 'teams', 'design-thinking', 'accelerators', 'lifecycle', 'legibility',
    'task-context', 'quality', 'learning', 'measurement', 'method-and-tools', 'leadership-close',
  ]);
  assert.match(text(byId.hve.body), /engineering operating model/);
  assert.match(text(byId.hve.body), /Not simply faster coding with AI/);
  for (const id of ['customer-loop', 'four-pillars', 'learning', 'method-and-tools', 'leadership-close', 'recap']) {
    const body = byId[id].body;
    assert.match(body, /data-hve-loop/, id);
    for (const stage of ['Idea', 'Validation', 'Engineering', 'Feedback']) assert.ok(body.includes(stage), `${id}: ${stage}`);
    assert.match(body, /class="loop-crew"><strong>Customer \+<br>expert crew/, id);
    assert.match(body, /AI throughout/, id);
  }
  assert.match(text(byId.teams.body), /does not replace expertise/);
  assert.match(byId.quality.notes, /expertise to review and validate AI-generated outputs/);
  for (const control of ['Security', 'Observability', 'Tests', 'CI/CD']) assert.ok(byId.accelerators.body.includes(control));
  assert.match(byId.learning.notes, /not a promise of a fixed number of days/);
  assert.match(byId['demo-route'].notes, /one pass through the continuous HVE loop/);
  assert.match(byId['demo-rpi'].notes, /labelled scenario response/);
});

test('slide order and timing match the approved outline allocations', async () => {
  const outline = await readFile(new URL('./OUTLINE.md', import.meta.url), 'utf8');
  for (const [letter, part] of [['A', 'leadership'], ['B', 'deep-dive']]) {
    const section = outline.split(`## Part ${letter}:`)[1].split('\n## ')[0];
    const timings = section.split('\n').filter(row => /^\| \d+ \|/.test(row))
      .map(row => Number(row.split('|').at(-2).trim()));
    assert.deepEqual(slides.filter(slide => slide.part === part).map(slide => slide.minutes), timings);
  }
});

test('visible content is sparse and every slide carries notes and public sources', () => {
  for (const slide of slides) {
    const words = text(`${slide.title} ${slide.body}`).split(/\s+/);
    assert.ok(words.length <= 85, `${slide.id}: ${words.length} visible words`);
    assert.ok(slide.notes.length >= 100, `${slide.id}: presenter guidance is missing`);
    assert.ok(slide.sources.length > 0);
    for (const key of slide.sources) assert.ok(sources[key]?.[1].startsWith('https://'));
  }
  const rendered = renderSlides();
  assert.doesNotMatch(rendered, /youtube|simpsons|vibe.?cod|OneDrive|20261006_|pasted-text/i);
  assert.equal((rendered.match(/<aside class="notes">/g) ?? []).length, 35);
});

test('toolkit detail begins after the leadership close and demo limits are explicit', () => {
  for (const slide of slides.slice(1, 19)) assert.doesNotMatch(text(slide.body), /HVE-Core|rpi-research|\/plugin/);
  assert.match(byId['leadership-close'].body, /Engineering Fundamentals Playbook/);
  assert.match(byId['leadership-close'].body, /#\/deep-dive/);
  assert.match(byId['leadership-close'].body, /#\/demo-install/);
  assert.match(byId['handoff-contract'].notes, /All three DT exits enter rpi-research/);
  assert.match(byId['demo-handoff'].notes, /Methods 1-3/);
  assert.match(byId['demo-rpi'].notes, /remains to be selected/);
});

test('all internal route links resolve to real slides', () => {
  const ids = new Set(slides.map(slide => slide.id));
  for (const [, id] of renderSlides().matchAll(/href="#\/([^"]+)"/g)) assert.ok(ids.has(id), id);
});

test('speaker notes escape text and the build uses local runtime assets', async () => {
  assert.equal(escapeHtml('<&"\'>'), '&lt;&amp;&quot;&#39;&gt;');
  const html = await readFile(new URL('./dist/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/<section id=/g) ?? []).length, 35);
  assert.doesNotMatch(html, /<!-- SLIDES -->|<script[^>]+src="https?:|<link[^>]+href="https?:/);
  for (const asset of ['vendor/reveal.mjs', 'vendor/reveal.css', 'vendor/plugin/notes.mjs', 'vendor/LICENSE', 'theme.css', 'presentation.mjs']) {
    assert.ok((await readFile(new URL(`./dist/${asset}`, import.meta.url))).length > 0, asset);
  }
  const lock = JSON.parse(await readFile(new URL('./package-lock.json', import.meta.url), 'utf8'));
  assert.equal(lock.packages['node_modules/reveal.js'].version, '6.0.2');
  assert.ok(Object.values(lock.packages).every(pkg => !('resolved' in pkg)));
});

test('preview serves HTML and modules, rejects missing files, bad URLs, and writes', async t => {
  const server = createPreviewServer();
  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  t.after(() => new Promise(resolve => {
    server.close(resolve);
    server.closeAllConnections();
  }));
  const base = `http://127.0.0.1:${server.address().port}`;
  const home = await fetch(`${base}/?print-pdf`);
  assert.equal(home.status, 200);
  assert.match(await home.text(), /Hypervelocity/);
  const module = await fetch(`${base}/vendor/reveal.mjs`);
  assert.equal(module.status, 200);
  assert.match(module.headers.get('content-type'), /javascript/);
  assert.equal((await fetch(`${base}/missing-file`)).status, 404);
  assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${base}/%zz`)).status, 400);
  assert.equal((await fetch(`${base}/..%5cpackage.json`)).status, 403);
});
