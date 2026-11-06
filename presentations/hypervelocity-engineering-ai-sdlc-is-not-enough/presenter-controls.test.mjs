/**
 * Check player navigation, drawing tools, keyboard ownership, theme URLs, Escape order, and zoom geometry.
 * Parameters: none. Build the deck before checking shipped assets.
 * Usage: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import {
  dismissPresenterState, isInteractive, keyboardAllowed, navigationState,
  presenterMarkup, themeFromUrl, themeUrl, zoomOffset,
} from './presenter-controls.mjs';
import {
  ANNOTATION_COLOURS, ANNOTATION_TOOLS, ANNOTATION_WIDTHS, DEFAULT_ANNOTATION_WIDTH, arrowPath, toSlidePoint,
} from './annotations.mjs';
import { mergedSlideHash } from './cadence.mjs';
import { slides, renderSlides } from './deck.mjs';

test('one shared toolbar contains all tools, two themes, and valid section routes', () => {
  const markup = presenterMarkup();
  for (const id of [
    'sections', 'previous', 'next', 'overview', 'notes', 'pause', 'zoom',
    'laser', 'rectangle', 'arrow', 'draw', 'colours', 'widths', 'undo', 'clear', 'keys', 'present', 'fullscreen',
  ]) {
    assert.equal((markup.match(new RegExp(`data-player="${id}"`, 'g')) ?? []).length, 1, id);
    assert.match(markup, new RegExp(`data-player="${id}" aria-label="[^"]+" title="[^"]+"`));
  }
  const themes = markup.match(/<select aria-label="Presentation theme">([\s\S]*?)<\/select>/)[1];
  assert.equal((themes.match(/<option /g) ?? []).length, 2);
  assert.equal((markup.match(/role="group"/g) ?? []).length, 7);
  for (const [, id] of markup.matchAll(/href="#\/([^"]+)"/g)) assert.ok(slides.some(slide => slide.id === id));
  const rendered = renderSlides();
  assert.doesNotMatch(rendered, /data-action="overview"|data-action="notes"|Presentation sections/);
  for (const name of ['cadence', 'amplification', 'readiness']) {
    assert.match(rendered, new RegExp(`data-${name}-action="replay"`));
    assert.match(rendered, new RegExp(`data-${name}-action="pause"`));
  }
});

test('all drawing tools share 12 named colours with red as the default', () => {
  assert.equal(ANNOTATION_COLOURS.length, 12);
  assert.equal(new Set(ANNOTATION_COLOURS.map(item => item.label)).size, 12);
  assert.equal(new Set(ANNOTATION_COLOURS.map(item => item.value)).size, 12);
  assert.deepEqual(ANNOTATION_COLOURS[0], { label: 'Red', value: '#e00000' });
  const markup = presenterMarkup();
  const palette = markup.match(/<div id="presenter-colours"[\s\S]*?hidden>([\s\S]*?)<\/div>/)[1];
  const swatches = [...palette.matchAll(/<button\b[\s\S]*?<\/button>/g)].map(match => match[0]);
  assert.equal(swatches.length, 12);
  assert.equal(swatches.filter(swatch => swatch.includes('aria-pressed="true"')).length, 1);
  for (const { label, value } of ANNOTATION_COLOURS) {
    assert.match(value, /^#[\da-f]{6}$/);
    const swatch = swatches.find(item => item.includes(`data-annotation-colour="${value}"`));
    assert.ok(swatch, label);
    assert.ok(swatch.includes(`aria-label="${label}" title="${label}"`));
    assert.ok(swatch.includes(`aria-pressed="${value === '#e00000'}"`));
    assert.ok(swatch.includes(`--drawing-colour: ${value}`));
    assert.match(swatch, /<svg [^>]*aria-hidden="true"[^>]*><path d="m6 12 4 4 8-8"\/><\/svg>/);
  }
  assert.equal(new Set(ANNOTATION_TOOLS.map(item => item.keyCode)).size, ANNOTATION_TOOLS.length);
  assert.ok(markup.includes('data-annotation-tool="arrow" aria-pressed="false" aria-keyshortcuts="A"'));
  assert.ok(markup.includes('A: arrow'));
});

test('the compact palette has a swatch trigger and no permanent colour label or native dropdown', () => {
  const markup = presenterMarkup();
  assert.match(markup, /data-player="colours" aria-label="Drawing colour: Red"/);
  assert.match(markup, /class="presenter-colour" aria-expanded="false" aria-controls="presenter-colours"/);
  assert.match(markup, /class="presenter-current-colour"/);
  assert.match(markup, /id="presenter-colours"[^>]*role="group"[^>]*aria-label="Drawing colour" hidden>/);
  assert.doesNotMatch(markup, /<span>Colour<\/span>|<select[^>]*data-annotation-colour/);
});

test('line thickness has three named previews and keeps the previous medium width by default', async () => {
  assert.deepEqual(ANNOTATION_WIDTHS, [
    { label: 'Thin', value: 3 },
    { label: 'Medium', value: 6 },
    { label: 'Thick', value: 10 },
  ]);
  assert.equal(DEFAULT_ANNOTATION_WIDTH, 6);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, new RegExp(`\\.annotation-mark\\s*\\{[^}]*stroke-width:\\s*${DEFAULT_ANNOTATION_WIDTH};`));
  const markup = presenterMarkup();
  assert.match(markup, /data-player="widths" aria-label="Line thickness: Medium"/);
  assert.match(markup, /aria-expanded="false" aria-controls="presenter-widths"/);
  const panel = markup.match(/<div id="presenter-widths"[\s\S]*?hidden>([\s\S]*?)<\/div>/)[1];
  const options = [...panel.matchAll(/<button\b[\s\S]*?<\/button>/g)].map(match => match[0]);
  assert.equal(options.length, 3);
  assert.equal(options.filter(option => option.includes('aria-pressed="true"')).length, 1);
  for (const { label, value } of ANNOTATION_WIDTHS) {
    const option = options.find(item => item.includes(`data-annotation-width="${value}"`));
    assert.ok(option, label);
    assert.ok(option.includes(`aria-label="${label} line thickness" title="${label} line thickness"`));
    assert.ok(option.includes(`aria-pressed="${value === DEFAULT_ANNOTATION_WIDTH}"`));
    assert.ok(option.includes(`<span>${label}</span>`));
    assert.ok(option.includes(`style="stroke-width:${value}"`));
    assert.match(option, /<path d="m6 12 4 4 8-8"\/>/);
  }
});

test('arrowheads follow the drag direction and shrink with short arrows', () => {
  assert.equal(arrowPath({ x: 10, y: 20 }, { x: 110, y: 20 }),
    'M 10 20 L 110 20 M 89.2 32 L 110 20 L 89.2 8');
  assert.equal(arrowPath({ x: 110, y: 20 }, { x: 10, y: 20 }),
    'M 110 20 L 10 20 M 30.8 8 L 10 20 L 30.8 32');
  for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [-1, 1], [1, -1], [-1, -1]]) {
    for (const scale of [6, 20, 200]) {
      const start = { x: 500, y: 300 };
      const end = { x: start.x + dx * scale, y: start.y + dy * scale };
      const coordinates = arrowPath(start, end).match(/-?\d+(?:\.\d+)?/g).map(Number);
      assert.equal(coordinates.length, 10);
      assert.ok(coordinates.every(Number.isFinite));
      assert.deepEqual(coordinates.slice(0, 4), [start.x, start.y, end.x, end.y]);
      assert.deepEqual(coordinates.slice(6, 8), [end.x, end.y]);
      for (const [x, y] of [coordinates.slice(4, 6), coordinates.slice(8, 10)]) {
        assert.ok((end.x - x) * dx + (end.y - y) * dy > 0);
        assert.ok(Math.hypot(end.x - x, end.y - y) <= Math.min(24, Math.hypot(dx, dy) * scale * .4) + .1);
      }
    }
  }
  assert.equal(arrowPath({ x: 10, y: 20 }, { x: 10, y: 20 }),
    'M 10 20 L 10 20 M 10 20 L 10 20 L 10 20');
});

test('hidden toolbar controls do not override Reveal slide visibility in overview', async () => {
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  const controls = await readFile(new URL('./presenter-controls.css', import.meta.url), 'utf8');
  for (const css of [theme, controls]) {
    assert.doesNotMatch(css, /(?:^|})\s*\[hidden\]\s*\{/);
  }
  assert.match(controls, /\.presenter-toolbar \[hidden\]\s*\{\s*display:\s*none\s*!important;\s*\}/);
});

test('focused native controls and modifier chords do not reach Reveal shortcuts', () => {
  assert.equal(keyboardAllowed({ target: {} }), true);
  for (const name of ['input', 'textarea', 'select', 'button', 'a', 'summary', '[contenteditable]', '[role="button"]']) {
    const target = { closest: selector => selector.split(', ').includes(name) ? {} : null };
    assert.equal(isInteractive(target), true, name);
    for (const key of [' ', 'ArrowRight', 'PageDown', 'Home', 'End', 'Escape', 'S', 'P', 'F', 'Z', 'L', 'R', 'A', 'D', 'X']) {
      assert.equal(keyboardAllowed({ key, target }), false, `${name}: ${key}`);
    }
  }
  assert.equal(keyboardAllowed({ target: { isContentEditable: true } }), false);
  for (const modifier of ['altKey', 'ctrlKey', 'metaKey']) {
    assert.equal(keyboardAllowed({ [modifier]: true, target: {} }), false);
  }
  for (const name of ['button', 'a']) {
    const target = { closest: selector => selector.split(', ').some(item =>
      item === name || item === `.presenter-toolbar ${name}`) ? {} : null };
    assert.equal(keyboardAllowed({ key: 'Escape', target }), true);
    assert.equal(keyboardAllowed({ key: 'ArrowRight', target }), false);
    assert.equal(keyboardAllowed({ key: 'Escape', ctrlKey: true, target }), false);
  }
});

test('navigation boundaries include phases on the first and last slide', () => {
  const deck = (routes, fragments) => ({ availableRoutes: () => routes, availableFragments: () => fragments });
  assert.deepEqual(navigationState(deck({}, {})), { previous: false, next: false });
  assert.deepEqual(navigationState(deck({}, { prev: true, next: true })), { previous: true, next: true });
  assert.deepEqual(navigationState(deck({ right: true }, {})), { previous: false, next: true });
  assert.deepEqual(navigationState(deck({ left: true }, {})), { previous: true, next: false });
  assert.deepEqual(navigationState(deck({ up: true, down: true }, {})), { previous: true, next: true });
  assert.deepEqual(navigationState(deck({ left: true }, { next: true })), { previous: true, next: true });
});

test('theme URLs keep subpaths, query parameters, legacy links, and native phase hashes', () => {
  const href = 'https://example.test/talks/hve/?print-pdf&other=value#/handoffs/1';
  assert.equal(themeFromUrl(href), 'flowing-blend');
  for (const theme of ['flowing-blend', 'flowing-dark']) {
    const route = themeUrl(href, theme);
    const url = new URL(route, 'https://example.test');
    assert.equal(url.pathname, '/talks/hve/');
    assert.equal(url.hash, '#/handoffs/1');
    assert.equal(url.searchParams.get('other'), 'value');
    assert.ok(url.searchParams.has('print-pdf'));
    assert.equal(themeFromUrl(url.href), theme);
    assert.equal(url.searchParams.getAll('theme').length, 1);
    assert.equal(themeFromUrl(new URL(themeUrl(url.href, theme), url).href), theme);
  }
  for (const invalid of ['', 'unknown', '__proto__', '<script>']) {
    assert.equal(themeFromUrl(`https://example.test/?theme=${encodeURIComponent(invalid)}`), null);
    assert.throws(() => themeUrl(href, invalid), /Unknown presentation theme/);
  }
  const legacy = new URL(themeUrl('https://example.test/?theme=flowing-blend#/outcome-waiting', 'flowing-dark'),
    'https://example.test');
  assert.equal(mergedSlideHash(legacy.hash), '#/handoffs/1');
});

test('Escape dismisses exactly one state, in priority order, before native deck behavior', () => {
  for (const expected of ['popover', 'notes', 'annotations', 'zoom', 'present', null]) {
    const order = ['popover', 'notes', 'annotations', 'zoom', 'present'];
    const active = name => expected !== null && order.indexOf(name) >= order.indexOf(expected);
    const actions = [];
    const handled = dismissPresenterState({
      closePopover: () => { if (!active('popover')) return false; actions.push('popover'); return true; },
      closeNotes: () => { if (!active('notes')) return false; actions.push('notes'); return true; },
      annotations: { hasActive: () => active('annotations'), reset: () => actions.push('annotations') },
      zoomed: active('zoom'), resetZoom: () => actions.push('zoom'),
      presenting: active('present'), exitPresent: () => actions.push('present'),
    });
    assert.equal(handled, expected !== null);
    assert.deepEqual(actions, expected ? [expected] : []);
  }
});

test('2x pointer panning stays bounded and annotations use the transformed slide bounds', () => {
  assert.deepEqual(zoomOffset(-100, -30, 1280, 720), { x: -0, y: -0 });
  assert.deepEqual(zoomOffset(2000, 900, 1280, 720), { x: -1280, y: -720 });
  assert.deepEqual(zoomOffset(640, 360, 1280, 720), { x: -640, y: -360 });
  for (const [width, height] of [[1280, 720], [640, 360], [320, 180]]) {
    for (const [panX, panY] of [[0, 0], [width / 2, height / 2], [width, height]]) {
      const bounds = { left: -panX, top: -panY, width: width * 2, height: height * 2 };
      const client = { x: bounds.left + bounds.width * .4, y: bounds.top + bounds.height * .6 };
      assert.deepEqual(toSlidePoint(client.x, client.y, bounds), { x: 512, y: 432 });
    }
  }
});

test('dark theme text and control pairs have readable contrast', async () => {
  const css = await readFile(new URL('./flowing-dark.css', import.meta.url), 'utf8');
  const palette = Object.fromEntries([...css.matchAll(/--([\w-]+): (#[\da-f]{6});/g)]
    .map(([, name, value]) => [name, value]));
  const luminance = hex => hex.slice(1).match(/../g).map(value => {
    const channel = parseInt(value, 16) / 255;
    return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
  }).reduce((sum, channel, index) => sum + channel * [.2126, .7152, .0722][index], 0);
  for (const [foreground, background] of [
    ['ink', 'paper'], ['muted', 'paper'], ['purple', 'paper'], ['warm-ink', 'warm-tint'],
    ['ink', 'control-surface'], ['muted', 'control-surface'], ['purple', 'control-surface'],
    ['pressed-ink', 'purple'], ['purple', 'purple-tint'],
  ]) {
    const light = luminance(palette[foreground]);
    const dark = luminance(palette[background]);
    assert.ok((Math.max(light, dark) + .05) / (Math.min(light, dark) + .05) >= 4.5,
      `${foreground} on ${background}`);
  }
  // Reveal's .reveal-viewport sets a black foreground and white background.
  assert.match(css, /:root\[data-theme="flowing-dark"\] body \{ background: var\(--paper\); color: var\(--ink\); \}/);
  assert.ok(css.includes('#team-support .team-badge:not(.team-solid)'));
});

test('the built shell ships player assets and both themes without remote dependencies', async () => {
  const shell = await readFile(new URL('./dist/index.html', import.meta.url), 'utf8');
  for (const asset of ['presenter-controls.css', 'flowing-dark.css']) assert.ok(shell.includes(`href="./${asset}"`));
  const runtime = await readFile(new URL('./dist/presentation.mjs', import.meta.url), 'utf8');
  assert.match(runtime, /keyboardCondition: keyboardAllowed/);
  for (const asset of ['presenter-controls.mjs', 'presenter-controls.css', 'flowing-dark.css']) {
    const source = await readFile(new URL(`./${asset}`, import.meta.url), 'utf8');
    assert.equal(await readFile(new URL(`./dist/${asset}`, import.meta.url), 'utf8'), source);
    assert.doesNotMatch(source, /(?:import .*from|@import|url\()['"]?https?:/);
  }
});
