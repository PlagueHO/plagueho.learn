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
import { trackRelativeWindowPosition } from './speaker-window.mjs';
import { waveBackground } from './waves.mjs';
import { mergedSlideHash, setupCadence } from './cadence.mjs';

const text = html => html.replace(/<[^>]+>/g, ' ').replace(/&\w+;/g, ' ').trim();
const byId = Object.fromEntries(slides.map(slide => [slide.id, slide]));

test('40 slides preserve the 30 + 30 minute structure', () => {
  assert.equal(slides.length, 40);
  assert.equal(new Set(slides.map(slide => slide.id)).size, 40);
  for (const [part, count] of [['leadership', 25], ['deep-dive', 10], ['demos', 5]]) {
    const section = slides.filter(slide => slide.part === part);
    assert.equal(section.length, count);
    if (part !== 'demos') assert.equal(section.reduce((sum, item) => sum + item.minutes, 0), 30);
    else assert.ok(section.every(item => item.minutes === undefined));
  }
  assert.equal(slides[24].id, 'leadership-close');
  assert.equal(slides[25].id, 'deep-dive');
  assert.equal(slides[35].id, 'demo-install');
  assert.equal(slides[39].id, 'recap');
});

test('slide order follows the approved narrative and pillar examples', () => {
  assert.deepEqual(slides.map(item => item.id), [
    'hve', 'delivery-eras', 'outcomes-question', 'agentic-cracks', 'handoffs', 'dashboard-request',
    'feedback-window', 'production-early', 'outcomes-response', 'hve-model', 'constraints-pillars', 'teams', 'team-example',
    'design-thinking', 'design-example', 'accelerators', 'accelerator-example', 'lifecycle-ai',
    'lifecycle-example', 'evidence-judgment', 'supported-loop', 'organization-boundary', 'experiment',
    'capability-transfer', 'leadership-close', 'deep-dive', 'toolkit', 'context', 'dt-coach',
    'handoff-contract', 'rpi', 'review', 'cost', 'plugin-model', 'demo-route', 'demo-install',
    'demo-discovery', 'demo-handoff', 'demo-rpi', 'recap',
  ]);
  assert.equal(byId.hve.title, 'Hypervelocity Engineering<em>Why adding AI to the SDLC is not enough</em>');
  assert.equal((byId.hve.title.match(/<em>/g) ?? []).length, 1);
  assert.match(text(byId.hve.body), /Daniel Scott-Raynsford/);
  assert.match(byId.hve.body, /<span>Sr\. Partner Solution Architect • AI &amp; Apps • Microsoft EPS<\/span>/);
  assert.doesNotMatch(byId.hve.body, /cover-sub|cover-scope/);
  assert.match(byId.hve.notes, /when building becomes faster than deciding/);
  assert.match(text(byId['dashboard-request'].body), /quality dashboard/);
  assert.match(text(byId['team-example'].body), /shift handover/);
  assert.match(text(byId['design-example'].body), /Compare options/);
  assert.match(text(byId['accelerator-example'].body), /Still verify/);
  assert.match(text(byId['lifecycle-ai'].body), /AI-powered product/);
});

test('section breaks preserve the approved output-to-outcome titles and selected C treatment', async () => {
  const expected = [
    ['outcomes-question', 2, 'We’re delivering code faster. Are we delivering better outcomes?'],
    ['outcomes-response', 8, 'From faster code delivery to better business outcomes.'],
  ];
  for (const [id, index, title] of expected) {
    const slide = byId[id];
    assert.equal(slides[index].id, id);
    assert.equal(slide.title.replace(/<[^>]+>/g, ''), title);
    assert.equal(slide.className, 'section-divider');
    assert.equal(slide.body, '');
    assert.equal(slide.minutes, 0.25);
    assert.match(slide.title, /<strong>better (?:business )?outcomes[?.]<\/strong>/);
    assert.doesNotMatch(slide.title, /<br|fragment/);
  }
  assert.equal(slides[1].id, 'delivery-eras');
  assert.equal(slides[3].id, 'agentic-cracks');
  assert.equal(slides[7].id, 'production-early');
  assert.equal(slides[9].id, 'hve-model');
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.reveal \.section-divider h2\s*\{[^}]*top: 50%;[^}]*text-align: center;[^}]*white-space: nowrap;/);
  assert.match(theme, /\.section-divider h2 strong\s*\{ color: var\(--warm-ink\); font-weight: inherit; \}/);
  assert.match(theme, /\.section-divider :is\(\.chrome-top, \.chrome-bottom, \.slide-content\) \{ display: none; \}/);
});

test('delivery shifts connect technology changes to responsibility and outcome ownership', () => {
  const slide = byId['delivery-eras'];
  assert.equal(slide.title, 'Software delivery changed.<br><em>So did responsibility.</em>');
  const content = text(slide.body);
  assert.match(content, /Packaged software\s+Coordinate releases/);
  assert.match(content, /Cloud services\s+Own the running service/);
  assert.match(content, /Agile\s+Own delivery \+ feedback/);
  assert.match(content, /Co-engineering\s+Own the outcome with customers/);
  assert.match(content, /Quality · security · customer learning/);
  assert.match(content, /AI is not just the next tool rollout\. Revisit who owns the outcome\./);
  assert.match(content, /AI SDLC emerges\s+Assist across delivery/);
  assert.doesNotMatch(content, /Approximate milestones|Overlapping eras|not to scale/);
  assert.match(slide.notes, /Responsible coding-tool use and token value matter/);
  assert.match(slide.notes, /Reference milestones, not invention or adoption dates/);
  assert.match(slide.notes, /not measured evidence of organizational change/);
  for (const key of ['cics', 'agile', 'devops', 'cloud', 'coengineering', 'copilotx']) {
    assert.ok(slide.sources.includes(key), key);
  }
});

test('Agile and DevOps have distinct dated milestones', () => {
  const slide = byId['delivery-eras'];
  const milestones = new Map([...slide.body.matchAll(/<li[^>]+data-year="(\d+)"[^>]*>([\s\S]*?)<\/li>/g)]
    .map(([, year, html]) => [year, text(html)]));
  assert.match(milestones.get('2001'), /^2001\s+Agile\s+Own delivery \+ feedback$/);
  assert.doesNotMatch(milestones.get('2001'), /DevOps/);
  assert.equal(milestones.get('2009'), 'DevOps 2009');
  assert.match(slide.notes, /2001 milestone is Agile only/);
  assert.match(slide.notes, /2009 marker for the first DevOpsDays in Ghent/);
});

test('timeline positions and arrival delays use the same linear year scale', () => {
  const body = byId['delivery-eras'].body;
  const [, start, end, duration] = body.match(/data-start="(\d+)" data-end="(\d+)" style="--duration:(\d+)ms"/);
  assert.equal(Number(start), 1970);
  assert.equal(Number(end), 2026);
  assert.equal(Number(duration), 3600);
  const stops = [...body.matchAll(/<li class="(milestone-item[^"]*|milestone-secondary)"\s+data-year="(\d+)" style="left:([\d.]+)%;--delay:([\d.]+)ms/g)];
  assert.deepEqual(stops.map(([, , year]) => Number(year)), [1970, 2001, 2006, 2009, 2015, 2023]);
  assert.equal(stops.filter(([, cls]) => cls.startsWith('milestone-item')).length, 5);
  for (const [, cls, year, position, delay] of stops) {
    const fraction = (Number(year) - Number(start)) / (Number(end) - Number(start));
    assert.ok(Math.abs(Number(position) / 100 - fraction) < 1e-10, `${year}: position`);
    assert.ok(Math.abs(Number(delay) / Number(duration) - fraction) < 1e-10, `${year}: arrival`);
    if ([1970, 2001, 2015].includes(Number(year))) assert.match(cls, /above/);
    if ([2006, 2023].includes(Number(year))) assert.match(cls, /below/);
  }
  const completion = Math.max(...stops.map(([, , , , delay]) => Number(delay))) + 500;
  assert.ok(completion > 3500 && completion < 4500);
  assert.match(body, /<svg class="milestone-arrow" viewBox="0 0 1088 28"/);
  assert.doesNotMatch(body, /class="gantt"|class="bar|time-guides|time-caveat/);
});

test('the AI milestone caption is centered on its timeline marker', async () => {
  const body = byId['delivery-eras'].body;
  const caption = body.match(/class="milestone-item below ai"[\s\S]*?--label-offset:([-\d.]+)px;--label-width:([\d.]+)px/);
  assert.ok(caption);
  assert.equal(Number(caption[1]) + Number(caption[2]) / 2, 0);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.ai \.milestone-copy\s*\{\s*text-align: center;\s*\}/);
});

test('timeline motion is active-slide-only with complete static alternatives', async () => {
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  const rules = [...theme.matchAll(/([^{}]+)\{\s*animation:\s*hve-[^}]+\}/g)];
  assert.equal(rules.length, 4);
  for (const [, selector] of rules) {
    assert.match(selector, /html:not\(\.print-pdf\) body\.deck-ready/);
    assert.match(selector, /\.reveal:not\(\.overview\) #delivery-eras\.present/);
  }
  assert.match(theme, /hve-timeline-shaft var\(--duration\) linear both/);
  assert.match(theme, /hve-timeline-tip var\(--duration\) linear both/);
  assert.match(theme, /hve-milestone-arrive 500ms cubic-bezier\(0\.16, 1, 0\.3, 1\) var\(--delay\) both/);
  assert.match(theme, /\.milestone-item\s*\{[^}]*--arrival-y: -28px;/);
  assert.match(theme, /\.milestone-item\.below\s*\{[^}]*--arrival-y: 28px;/);
  for (const cls of ['milestone-copy', 'milestone-point', 'milestone-shaft', 'milestone-tip']) {
    const baseRule = theme.match(new RegExp(`\\.${cls}[^{}]*\\{([^}]+)\\}`))?.[1] ?? '';
    assert.doesNotMatch(baseRule, /opacity:\s*0|visibility:\s*hidden|display:\s*none/);
  }
  assert.match(theme, /@media \(prefers-reduced-motion: reduce\)\s*\{[^}]*animation: none !important;/);
  assert.match(theme, /@media print\s*\{\s*\.milestone-timeline \* \{ animation: none !important; \}/);
});

test('slide 4 uses the selected fault line without statistics or boxes', () => {
  const slide = byId['agentic-cracks'];
  assert.equal(slide.title, 'More code does not mean<br><em>better outcomes.</em>');
  const content = text(slide.body);
  for (const phrase of ['More code', 'More prototypes', 'Same delivery model', 'Handoffs',
    'Decision waits', 'Wrong problem', 'Late feedback', 'Late assurance']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.match(content, /More code and prototypes do not guarantee better outcomes\. Evidence and clear decision ownership are required\./);
  assert.match(slide.body, /better outcomes\.<br>Evidence and clear decision ownership/);
  assert.equal((slide.body.match(/class="fracture"/g) ?? []).length, 5);
  assert.equal((slide.body.match(/class="crack"/g) ?? []).length, 5);
  assert.match(slide.body, /<svg class="fault-beam"/);
  assert.doesNotMatch(slide.body, /bigword|class="slab"|class="mark|code-evidence|clone-stat/);
  assert.doesNotMatch(content, /\d|%|GitClear|DORA/);
  assert.doesNotMatch(content, /Big words|New names|Forward Deployed Engineering/);
  assert.match(slide.notes, /planning scenario, not a forecast/);
  assert.match(slide.notes, /not slower engineering or a new central approval queue/);
  assert.match(slide.notes, /AI does not cause them/);
});

test('slide 5 combines the approved sweeping loops and retains assurance', () => {
  const slide = byId.handoffs;
  assert.equal(slide.title, 'Development got faster.<br><em>The operating model did not.</em>');
  assert.equal(slide.minutes, 2.5);
  const content = text(slide.body);
  for (const phrase of ['Planning + decisions', 'Implementation + testing', 'Review + learning',
    'Human handoff', 'Decision wait', 'Review queue', 'Security, quality, and operations checks stay.',
    'Illustrative rhythms, not measured durations.',
    'Faster implementation needs faster learning and decisions, not fewer checks.']) {
    assert.ok(content.includes(phrase), phrase);
  }
  assert.equal((slide.body.match(/class="cycle-runner"/g) ?? []).length, 3);
  assert.equal((slide.body.match(/class="increment"/g) ?? []).length, 3);
  assert.match(slide.body, /data-cadence data-phase="2"/);
  assert.match(slide.body, /class="former-disc"/);
  assert.deepEqual([...slide.body.matchAll(/data-fragment-index="(\d)" data-cadence-phase="(\d)"/g)]
    .map(([, index, phase]) => [Number(index), Number(phase)]), [[0, 1], [1, 2]]);
  assert.equal(byId['ai-implementation'], undefined);
  assert.equal(byId['outcome-waiting'], undefined);
  assert.match(slide.notes, /Retain independent review and separation of duties where required/);
  assert.match(slide.notes, /customer and team jointly responsible for the outcome/);
  assert.match(slide.notes, /not accepted customer outcomes/);
  assert.match(slide.notes, /not measured durations or workload shares/);
  assert.doesNotMatch(slide.body, /class="lane|Time saved|\d+%/);
});

function cadenceHarness({ reducedMotion = false, pdf = false } = {}) {
  function target() {
    const listeners = new Map();
    const classes = new Set();
    return {
      dataset: {},
      attributes: {},
      classList: {
        add: value => classes.add(value),
        remove: value => classes.delete(value),
        contains: value => classes.has(value),
        toggle(value, enabled) { enabled ? classes.add(value) : classes.delete(value); },
      },
      setAttribute(name, value) { this.attributes[name] = value; },
      addEventListener(name, callback) {
        const callbacks = listeners.get(name) ?? [];
        callbacks.push(callback);
        listeners.set(name, callbacks);
      },
      emit(name, event = {}) { listeners.get(name)?.forEach(callback => callback(event)); },
    };
  }
  const animations = [];
  const captionCues = [];
  const runners = Array.from({ length: 3 }, () => ({
    animate(keyframes, options) {
      assert.equal(options.duration, 6000);
      assert.equal(options.iterations, Infinity);
      assert.deepEqual(keyframes, [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }]);
      const animation = {
        playbackRate: 1,
        playState: 'running',
        play() { this.playState = 'running'; },
        pause() { this.playState = 'paused'; },
        cancel() { this.playState = 'idle'; },
        updatePlaybackRate(rate) { this.playbackRate = rate; },
      };
      animations.push(animation);
      return animation;
    },
  }));
  const figure = target();
  const caption = target();
  caption.replaceChildren = (...children) => {
    caption.children = children;
    caption.textContent = children.map(child => child.textContent).join('');
  };
  caption.animate = (keyframes, options) => {
    const animation = {
      keyframes,
      options,
      playState: 'running',
      play() { this.playState = 'running'; },
      pause() { this.playState = 'paused'; },
      cancel() { this.playState = 'idle'; },
    };
    captionCues.push(animation);
    return animation;
  };
  const replay = target();
  const pause = target();
  const steps = [1, 2].map(phase => Object.assign(target(), { dataset: { cadencePhase: String(phase) } }));
  figure.querySelector = selector => selector === '.phase-caption' ? caption : null;
  figure.querySelectorAll = selector => ({ '.cadence-step': steps, '.cycle-runner': runners })[selector] ?? [];
  const slide = {
    querySelector: selector => ({
      '[data-cadence]': figure,
      '[data-cadence-action="replay"]': replay,
      '[data-cadence-action="pause"]': pause,
    })[selector] ?? null,
  };
  const document = Object.assign(target(), {
    hidden: false,
    documentElement: target(),
    querySelector: selector => selector === '#handoffs' ? slide : null,
    createElement: name => Object.assign(target(), { tagName: name.toUpperCase() }),
    createTextNode: textContent => ({ textContent }),
  });
  if (pdf) document.documentElement.classList.add('print-pdf');
  const reduced = Object.assign(target(), { matches: reducedMotion });
  const frames = new Map();
  let nextFrame = 0;
  let now = 0;
  const view = Object.assign(target(), {
    document,
    matchMedia: () => reduced,
    requestAnimationFrame(callback) { frames.set(++nextFrame, callback); return nextFrame; },
    cancelAnimationFrame(id) { frames.delete(id); },
  });
  const deck = Object.assign(target(), {
    current: slide,
    overview: false,
    paused: false,
    getCurrentSlide() { return this.current; },
    isOverview() { return this.overview; },
    isPaused() { return this.paused; },
  });
  deck.on = deck.addEventListener;
  setupCadence(deck, view);
  return {
    deck, view, document, reduced, figure, caption, steps, replay, pause, animations, captionCues, slide, frames,
    advance(milliseconds) {
      now += milliseconds;
      const pending = [...frames.values()];
      frames.clear();
      pending.forEach(callback => callback(now));
    },
    phase(value) {
      steps.forEach((step, index) => step.classList.toggle('visible', index < value));
      deck.emit(value ? 'fragmentshown' : 'fragmenthidden');
    },
  };
}

test('phase captions keep their words and emphasize the selected phrases without a counter', () => {
  const h = cadenceHarness();
  const phrases = ['Long build cycles', 'Implementation accelerates.',
    'Decision waits, review queues, and handoff overhead'];
  assert.equal(h.captionCues.length, 0);
  for (let phase = 0; phase < 3; phase++) {
    h.phase(phase);
    assert.equal(h.caption.children[0].tagName, 'STRONG');
    assert.equal(h.caption.children[0].textContent, phrases[phase]);
    assert.doesNotMatch(h.caption.textContent, /\d/);
  }
  assert.equal(h.captionCues.length, 2);
  for (const cue of h.captionCues) {
    assert.deepEqual(cue.keyframes, [{ opacity: .7 }, { opacity: 1 }]);
    assert.deepEqual(cue.options, { duration: 260, easing: 'ease-out' });
  }
  h.deck.emit('fragmentshown');
  h.replay.emit('click');
  assert.equal(h.captionCues.length, 2);
  assert.match(byId.handoffs.body, /<strong>Decision waits, review queues, and handoff overhead<\/strong> now set the pace/);
  assert.doesNotMatch(byId.handoffs.body, /phase-count|caption-row|1\s*\/\s*3/);
});

test('caption cues pause with the deck and remain absent in complete static views', () => {
  const h = cadenceHarness();
  h.phase(1);
  const cue = h.captionCues.at(-1);
  h.pause.emit('click');
  assert.equal(cue.playState, 'paused');
  h.pause.emit('click');
  assert.equal(cue.playState, 'running');
  cue.playState = 'finished';
  h.document.emit('visibilitychange');
  assert.equal(cue.playState, 'finished');
  h.view.emit('beforeprint');
  assert.equal(cue.playState, 'idle');
  assert.equal(h.captionCues.length, 1);
  assert.match(h.caption.textContent, /^Decision waits/);
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    assert.equal(cadenceHarness(options).captionCues.length, 0);
  }
});

test('native fragment changes preserve rotation position and only accelerate implementation', () => {
  const h = cadenceHarness();
  assert.equal(h.figure.dataset.phase, '0');
  assert.match(h.caption.textContent, /^Long build cycles/);
  const original = [...h.animations];
  assert.deepEqual(h.animations.map(animation => animation.playbackRate), [1, 1, 1]);
  for (const phase of [1, 2, 1, 0]) {
    h.phase(phase);
    assert.equal(h.figure.dataset.phase, String(phase));
    assert.deepEqual(h.animations, original);
    assert.deepEqual(h.animations.map(animation => animation.playbackRate), [1, phase ? 5 : 1, 1]);
  }
  h.phase(2);
  assert.match(h.caption.textContent, /^Decision waits, review queues/);
});

test('each loop phase settles after six active seconds and replay preserves its phase', () => {
  const h = cadenceHarness();
  h.phase(2);
  h.advance(0);
  h.advance(5999);
  assert.equal(h.pause.disabled, false);
  h.advance(1);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
  assert.equal(h.pause.disabled, true);
  assert.equal(h.frames.size, 0);
  h.replay.emit('click');
  assert.equal(h.figure.dataset.phase, '2');
  assert.ok(h.animations.every(animation => animation.currentTime === 0 && animation.playState === 'running'));
  assert.equal(h.pause.disabled, false);
});

test('manual pause, hidden pages, and deck pause freeze motion and its time budget', () => {
  const h = cadenceHarness();
  h.advance(0);
  h.advance(1000);
  h.pause.emit('click');
  assert.equal(h.pause.textContent, 'Resume motion');
  assert.equal(h.pause.attributes['aria-pressed'], 'true');
  assert.equal(h.frames.size, 0);
  h.advance(10000);
  h.pause.emit('click');
  h.advance(0);
  h.advance(1000);
  h.document.hidden = true;
  h.document.emit('visibilitychange');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
  h.advance(10000);
  h.document.hidden = false;
  h.document.emit('visibilitychange');
  h.advance(0);
  h.deck.paused = true;
  h.deck.emit('paused');
  assert.equal(h.frames.size, 0);
  h.advance(10000);
  h.deck.paused = false;
  h.deck.emit('resumed');
  h.advance(0);
  h.advance(3999);
  assert.equal(h.pause.disabled, false);
  h.advance(1);
  assert.equal(h.pause.disabled, true);
});

test('overview and print show the full comparison and restore the presenter phase', () => {
  const h = cadenceHarness();
  h.phase(1);
  h.deck.overview = true;
  h.deck.emit('overviewshown');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.replay.hidden, true);
  assert.equal(h.frames.size, 0);
  h.deck.overview = false;
  h.deck.emit('overviewhidden');
  assert.equal(h.figure.dataset.phase, '1');
  assert.equal(h.replay.hidden, false);
  h.pause.emit('click');
  h.view.emit('beforeprint');
  assert.equal(h.figure.dataset.phase, '2');
  assert.ok(h.steps.every(step => step.classList.contains('disabled')));
  h.view.emit('afterprint');
  assert.equal(h.figure.dataset.phase, '1');
  assert.equal(h.pause.textContent, 'Resume motion');
  assert.equal(h.frames.size, 0);
  assert.ok(h.steps.every(step => !step.classList.contains('disabled')));
});

test('reduced motion and PDF layout have a complete static view without extra phase steps', () => {
  for (const options of [{ reducedMotion: true }, { pdf: true }]) {
    const h = cadenceHarness(options);
    assert.equal(h.figure.dataset.phase, '2');
    assert.equal(h.animations.length, 0);
    assert.equal(h.frames.size, 0);
    assert.equal(h.pause.hidden, true);
    assert.ok(h.steps.every(step => step.classList.contains('disabled')));
  }
  const h = cadenceHarness({ reducedMotion: true });
  h.reduced.matches = false;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.phase, '0');
  assert.equal(h.animations.length, 3);
  h.reduced.matches = true;
  h.reduced.emit('change');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'paused'));
});

test('leaving the slide or page cancels motion and re-entry restores native fragment state', () => {
  const h = cadenceHarness();
  h.phase(2);
  h.deck.current = {};
  h.deck.emit('slidechanged');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'idle'));
  h.deck.current = h.slide;
  h.deck.emit('slidechanged');
  assert.equal(h.figure.dataset.phase, '2');
  assert.equal(h.animations.length, 6);
  h.view.emit('pagehide');
  assert.equal(h.frames.size, 0);
  assert.ok(h.animations.every(animation => animation.playState === 'idle'));
  h.view.emit('pageshow', { persisted: true });
  assert.equal(h.animations.length, 9);
  assert.equal(h.figure.dataset.phase, '2');
});

test('merged slide hashes preserve the corresponding phase without adding sections', async () => {
  assert.equal(mergedSlideHash('#/ai-implementation'), '#/handoffs/0');
  assert.equal(mergedSlideHash('#/outcome-waiting'), '#/handoffs/1');
  for (const hash of ['', '#/handoffs', '#/handoffs/0', '#/teams', '#/unknown']) {
    assert.equal(mergedSlideHash(hash), hash);
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.ok(presentation.indexOf("window.addEventListener('hashchange', canonicalizeHash)") <
    presentation.indexOf('const deck = new Reveal'));
  assert.match(presentation, /setupCadence\(deck\)/);
});

test('presentation title and single-subtitle cover match source and build', async () => {
  const title = 'Hypervelocity Engineering - Why adding AI to the SDLC is not enough';
  const pkg = JSON.parse(await readFile(new URL('./package.json', import.meta.url), 'utf8'));
  assert.equal(pkg.presentation.title, title);
  assert.equal(text(byId.hve.title).replace(/\s+/g, ' '), 'Hypervelocity Engineering Why adding AI to the SDLC is not enough');
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /\.opening h2 em\s*\{[^}]*font-style:\s*normal;/);
  const heading = `<h2>${byId.hve.title}</h2>`;
  assert.ok(renderSlides().includes(heading));
  for (const file of ['./index.html', './dist/index.html']) {
    const html = await readFile(new URL(file, import.meta.url), 'utf8');
    assert.equal(html.match(/<title>([^<]+)<\/title>/)?.[1], title, file);
    if (file === './dist/index.html') assert.ok(html.includes(heading));
  }
});

test('the cover includes the Microsoft mark and a locally built presenter photo', async () => {
  const opening = renderSlides().match(/<section id="hve"[\s\S]*?<\/section>/)?.[0];
  assert.match(opening, /class="cover-brand" role="img" aria-label="Microsoft"/);
  for (const color of ['#F25022', '#7FBA00', '#00A4EF', '#FFB900']) assert.ok(opening.includes(color));
  assert.match(opening, /src="\.\/images\/daniel-scott-raynsford\.jpg" alt="Daniel Scott-Raynsford"/);
  assert.doesNotMatch(opening, /https:\/\/avatars\.githubusercontent\.com/);
  const original = await readFile(new URL('./images/daniel-scott-raynsford.jpg', import.meta.url));
  const built = await readFile(new URL('./dist/images/daniel-scott-raynsford.jpg', import.meta.url));
  assert.deepEqual(built, original);
  assert.deepEqual([...built.subarray(0, 3)], [0xff, 0xd8, 0xff]);
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

test('the selected Flowing blend uses haze and fine ribbons across all 40 slides', async () => {
  const rendered = renderSlides();
  for (const preset of ['cover-cradle', 'split-diagonal', 'stream-progression', 'center-halo', 'dual-column-contrast', 'rising-twist']) {
    assert.match(rendered, new RegExp(`slide-wave-${preset}|data-wave="${preset}"`));
  }
  assert.equal((rendered.match(/data-style="flowing-blend"/g) ?? []).length, 40);
  assert.match(rendered, /stop-color="#f8c49c" stop-opacity="\.36"/);
  assert.match(rendered, /stop-color="#c9b3ed" stop-opacity="\.36"/);
  assert.match(rendered, /<feGaussianBlur stdDeviation="30"\/>/);
  assert.match(rendered, /stroke-width="1\.5" opacity="\.95"/);
  assert.doesNotMatch(rendered, /<animate|<set\b/);
  const theme = await readFile(new URL('./theme.css', import.meta.url), 'utf8');
  assert.match(theme, /prefers-reduced-motion/);
});

test('background SVG definitions are unique and resolve inside each slide', () => {
  const rendered = renderSlides();
  const ids = [...rendered.matchAll(/id="(wave-[^"]+)"/g)].map(([, id]) => id);
  assert.equal(ids.length, slides.length * 5);
  assert.equal(new Set(ids).size, ids.length);
  const backgrounds = [...rendered.matchAll(/<svg class="slide-wave"[\s\S]*?<\/svg>/g)];
  assert.equal(backgrounds.length, slides.length);
  for (const [html] of backgrounds) {
    const definitions = new Set([...html.matchAll(/id="([^"]+)"/g)].map(([, id]) => id));
    for (const [, reference] of html.matchAll(/url\(#([^)]+)\)/g)) assert.ok(definitions.has(reference), reference);
    assert.match(html, /aria-hidden="true"/);
  }
  assert.throws(() => waveBackground('unknown'), /Unknown wave preset/);
  assert.throws(() => waveBackground('__proto__'), /Unknown wave preset/);
  assert.throws(() => waveBackground('cover-cradle', 'bad" id'), /Wave instance id/);
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
  assert.equal((renderSlides().match(/<aside class="notes">/g) ?? []).length, 40);
});

function renderedContent() {
  return renderSlides();
}

test('slide timings match the approved outline allocations', async () => {
  const outline = await readFile(new URL('./OUTLINE.md', import.meta.url), 'utf8');
  const currentOutline = outline.split('## Evolution log')[0];
  const numberedRows = [...currentOutline.matchAll(/^\| (\d+) \|/gm)].map(([, number]) => Number(number));
  const slideNumbers = slides.map((_, index) => index + 1);
  assert.deepEqual(numberedRows, [...slideNumbers, ...slideNumbers]);
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
  assert.equal((html.match(/<section id=/g) ?? []).length, 40);
  assert.doesNotMatch(html, /<!-- SLIDES -->|<script[^>]+src="https?:|<link[^>]+href="https?:/);
  const assets = [
    'vendor/reveal.mjs',
    'vendor/reveal.css',
    'vendor/plugin/notes.mjs',
    'vendor/LICENSE',
    'theme.css',
    'presentation.mjs',
    'annotations.mjs',
    'speaker-window.mjs',
    'cadence.mjs',
  ];
  for (const asset of assets) {
    assert.ok((await readFile(new URL(`./dist/${asset}`, import.meta.url))).length > 0, asset);
  }
  const presentation = await readFile(new URL('./presentation.mjs', import.meta.url), 'utf8');
  assert.match(presentation, /trackRelativeWindowPosition\(window, speakerWindow\)/);
  assert.match(presentation, /if \(!speakerWindow\) \{\s+toggleNotesPanel\(true\)/);
  const lock = JSON.parse(await readFile(new URL('./package-lock.json', import.meta.url), 'utf8'));
  assert.equal(lock.packages['node_modules/reveal.js'].version, '6.0.2');
  assert.ok(Object.values(lock.packages).every(pkg => !('resolved' in pkg)));
});

test('speaker popup follows deck movement and preserves its initial offset', () => {
  const sourceWindow = { screenX: 100, screenY: 70, closed: false };
  const moves = [];
  const speakerWindow = {
    screenX: 420,
    screenY: 90,
    closed: false,
    moveTo: (x, y) => moves.push([x, y]),
  };
  let tick;
  let timerId;
  let cancelledTimerId;
  const stop = trackRelativeWindowPosition(sourceWindow, speakerWindow, (callback, delay) => {
    assert.equal(delay, 100);
    tick = callback;
    timerId = 7;
    return timerId;
  }, id => {
    cancelledTimerId = id;
  });

  tick();
  assert.deepEqual(moves, []);
  sourceWindow.screenX = 160;
  sourceWindow.screenY = 95;
  tick();
  assert.deepEqual(moves, [[480, 115]]);
  tick();
  assert.deepEqual(moves, [[480, 115]]);
  stop();
  assert.equal(cancelledTimerId, timerId);
});

test('speaker popup tracking stops when either window closes', () => {
  for (const closedWindow of ['sourceWindow', 'speakerWindow']) {
    const sourceWindow = { screenX: 0, screenY: 0, closed: false };
    const speakerWindow = {
      screenX: 10,
      screenY: 10,
      closed: false,
      moveTo() { assert.fail('closed window must not move'); },
    };
    let tick;
    let cancelled = false;
    const windows = { sourceWindow, speakerWindow };
    const stop = trackRelativeWindowPosition(sourceWindow, speakerWindow, callback => {
      tick = callback;
      return 1;
    }, () => {
      cancelled = true;
    });

    windows[closedWindow].closed = true;
    tick();
    assert.equal(cancelled, true);
    stop();
  }
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
  const photo = await fetch(`${base}/images/daniel-scott-raynsford.jpg`);
  assert.equal(photo.status, 200);
  assert.match(photo.headers.get('content-type'), /image\/jpeg/);
  assert.deepEqual(Buffer.from(await photo.arrayBuffer()),
    await readFile(new URL('./dist/images/daniel-scott-raynsford.jpg', import.meta.url)));
  for (const path of ['/vendor%2freveal.mjs', '/vendor%5creveal.mjs']) {
    const asset = await fetch(`${base}${path}`);
    assert.equal(asset.status, 200, path);
    assert.match(asset.headers.get('content-type'), /javascript/);
    assert.equal(await asset.text(), await readFile(new URL('./dist/vendor/reveal.mjs', import.meta.url), 'utf8'));
    const head = await fetch(`${base}${path}`, { method: 'HEAD' });
    assert.equal(head.status, 200, path);
    assert.match(head.headers.get('content-type'), /javascript/);
    assert.equal(await head.text(), '');
  }
  assert.equal((await fetch(`${base}/missing-file`)).status, 404);
  assert.equal((await fetch(`${base}/`, { method: 'POST' })).status, 405);
  assert.equal((await fetch(`${base}/%zz`)).status, 400);
  for (const path of [
    '/..%5cpackage.json',
    '/..%2fpackage.json',
    '/vendor%5c..%2f..%5cpackage.json',
    '/..%2fdist-sibling%2findex.html',
  ]) {
    for (const method of ['GET', 'HEAD']) {
      const response = await fetch(`${base}${path}`, { method });
      assert.equal(response.status, 403, `${method} ${path}`);
      assert.equal(await response.text(), method === 'HEAD' ? '' : 'Path is outside the presentation');
    }
  }
});
