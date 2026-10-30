/**
 * Check the presentation structure, content, visual direction, build, and server.
 * Parameters: none. Build the deck first.
 * Usage: npm run build && npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { once } from 'node:events';
import { slides, sources, renderSlides, escapeHtml } from './deck.mjs';
import { createPreviewServer } from './serve.mjs';
import { normalizeRect, toSlidePoint } from './annotations.mjs';

const text = html => html.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').trim();
const byId = Object.fromEntries(slides.map(slide => [slide.id, slide]));

test('39 slides preserve the 30 + 30 minute structure', () => {
  assert.equal(slides.length, 39);
  assert.equal(new Set(slides.map(slide => slide.id)).size, 39);
  for (const [part, count] of [['leadership', 24], ['deep-dive', 10], ['demos', 5]]) {
    const section = slides.filter(slide => slide.part === part);
    assert.equal(section.length, count);
    if (part !== 'demos') assert.equal(section.reduce((sum, item) => sum + item.minutes, 0), 30);
    else assert.ok(section.every(item => item.minutes === undefined));
  }
  assert.equal(slides[23].id, 'leadership-close');
  assert.equal(slides[24].id, 'deep-dive');
  assert.equal(slides[34].id, 'demo-install');
  assert.equal(slides[38].id, 'recap');
});

test('slide order follows the approved narrative and pillar examples', () => {
  assert.deepEqual(slides.map(item => item.id), [
    'hve', 'delivery-eras', 'handoffs', 'ai-implementation', 'outcome-waiting', 'dashboard-request',
    'feedback-window', 'production-early', 'hve-model', 'constraints-pillars', 'teams', 'team-example',
    'design-thinking', 'design-example', 'accelerators', 'accelerator-example', 'lifecycle-ai',
    'lifecycle-example', 'evidence-judgment', 'supported-loop', 'organization-boundary', 'experiment',
    'capability-transfer', 'leadership-close', 'deep-dive', 'toolkit', 'context', 'dt-coach',
    'handoff-contract', 'rpi', 'review', 'cost', 'plugin-model', 'demo-route', 'demo-install',
    'demo-discovery', 'demo-handoff', 'demo-rpi', 'recap',
  ]);
  assert.match(text(byId.hve.title), /what must change/);
  assert.match(text(byId['dashboard-request'].body), /quality dashboard/);
  assert.match(text(byId['team-example'].body), /shift handover/);
  assert.match(text(byId['design-example'].body), /Compare options/);
  assert.match(text(byId['accelerator-example'].body), /Still verify/);
  assert.match(text(byId['lifecycle-ai'].body), /AI-powered product/);
});

test('the customer stays inside the loop and the leadership close works alone', () => {
  assert.match(text(byId['supported-loop'].body), /Customer \+ expert crew/);
  assert.match(byId['supported-loop'].body, /data-hve-loop/);
  for (const id of ['supported-loop', 'recap']) {
    assert.match(byId[id].body, /data-hve-loop/);
    assert.match(byId[id].body, /Idea/);
    assert.match(byId[id].body, /Validation/);
    assert.match(byId[id].body, /Engineering/);
    assert.match(byId[id].body, /Feedback/);
  }
  assert.match(text(byId['leadership-close'].body), /HVE-Core/);
  assert.match(byId['leadership-close'].body, /Tools do not supply organizational commitments/);
  assert.match(text(byId['leadership-close'].body), /Customer time/);
  assert.match(text(byId['leadership-close'].body), /Decision ownership/);
  assert.match(byId['organization-boundary'].notes, /not an observed customer result/);
  assert.match(byId.experiment.notes, /AI usage are not success measures/);
});

test('the selected visual direction is subtle and aligned to slide composition', async () => {
  const rendered = renderSlides();
  for (const preset of ['cover-cradle', 'split-diagonal', 'stream-progression', 'center-halo', 'dual-column-contrast', 'rising-twist']) {
    assert.match(rendered, new RegExp(`slide-wave-${preset}|data-wave="${preset}"`));
  }
  assert.match(rendered, /stop-color="#FDE5D2" stop-opacity="\.33"/);
  assert.match(rendered, /stop-color="#E7DBFC" stop-opacity="\.33"/);
  assert.match(rendered, /flood-opacity="\.045"/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /prefers-reduced-motion/);
});

test('visible content is concise and every slide has notes and public sources', () => {
  for (const item of slides) {
    const words = text(`${item.title} ${item.body}`).split(/\s+/);
    assert.ok(words.length <= 85, `${item.id}: ${words.length} visible words`);
    assert.ok(item.notes.length >= 100, `${item.id}: presenter guidance is missing`);
    assert.ok(item.sources.length > 0);
    for (const key of item.sources) assert.ok(sources[key]?.[1].startsWith('https://'));
  }
  assert.doesNotMatch(renderedContent(), /youtube|simpsons|vibe.?cod|OneDrive|20261006_|pasted-text/i);
  assert.equal((renderSlides().match(/<aside class="notes">/g) ?? []).length, 39);
});

function renderedContent() {
  return renderSlides();
}

test('slide timings match the approved outline allocations', async () => {
  const outline = await readFile(new URL('./OUTLINE.md', import.meta.url), 'utf8');
  for (const [letter, part] of [['A', 'leadership'], ['B', 'deep-dive']]) {
    const section = outline.split(`## Part ${letter}:`)[1].split('\n## ')[0];
    const timings = section.split('\n').filter(row => /^\| \d+ \|/.test(row))
      .map(row => Number(row.split('|').at(-2).trim()));
    assert.deepEqual(slides.filter(item => item.part === part).map(item => item.minutes), timings);
  }
});

test('internal routes resolve to actual slides', () => {
  const ids = new Set(slides.map(item => item.id));
  for (const [, id] of renderSlides().matchAll(/href="#\/([^"]+)"/g)) assert.ok(ids.has(id), id);
});

test('speaker notes escape text and the build uses local runtime assets', async () => {
  assert.equal(escapeHtml('<&"\'>'), '&lt;&amp;&quot;&#39;&gt;');
  const html = await readFile(new URL('./dist/index.html', import.meta.url), 'utf8');
  assert.equal((html.match(/<section id=/g) ?? []).length, 39);
  assert.doesNotMatch(html, /<!-- SLIDES -->|<script[^>]+src="https?:|<link[^>]+href="https?:/);
  for (const asset of ['vendor/reveal.mjs', 'vendor/reveal.css', 'vendor/plugin/notes.mjs', 'vendor/LICENSE', 'theme.css', 'presentation.mjs', 'annotations.mjs']) {
    assert.ok((await readFile(new URL(`./dist/${asset}`, import.meta.url))).length > 0, asset);
  }
  const lock = JSON.parse(await readFile(new URL('./package-lock.json', import.meta.url), 'utf8'));
  assert.equal(lock.packages['node_modules/reveal.js'].version, '6.0.2');
  assert.ok(Object.values(lock.packages).every(pkg => !('resolved' in pkg)));
});

test('presentation tools map pointer positions to slide units at any scale', () => {
  assert.deepEqual(toSlidePoint(960, 540, { left: 0, top: 0, width: 1920, height: 1080 }), { x: 640, y: 360 });
  assert.deepEqual(toSlidePoint(420, 230, { left: 100, top: 50, width: 640, height: 360 }), { x: 640, y: 360 });
  assert.deepEqual(normalizeRect({ x: 50, y: 90 }, { x: 10, y: 20 }), { x: 10, y: 20, width: 40, height: 70 });
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
