/**
 * Check speaker timing calculations, elapsed-clock behavior, and popup integration.
 * Parameters: none. Build before checking shipped assets.
 * Usage: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { slides, renderSlides } from './deck.mjs';
import {
  createElapsedTimer, createSchedule, formatTiming, isUpcomingSpeakerPreview, setupSpeakerPreviewResize,
  setupSpeakerTiming, speakerTimingMarkup, timingStatus,
} from './speaker-window.mjs';

const elements = slides.map(slide => ({
  id: slide.id,
  getAttribute: name => ({ 'data-timing': String(slide.minutes * 60), 'data-part': slide.part })[name],
}));

test('only the native Upcoming receiver hides presentation controls', () => {
  const preview = (search, role) => ({
    location: { search },
    frameElement: role ? { parentElement: { id: role } } : null,
  });
  for (const inherited of [
    '', '?controls=false', '?controls=true', '?controls=true&controls=false', '?controls=false&controls=true',
    '?theme=flowing-dark&controls=true',
  ]) {
    const receiver = `${inherited}${inherited ? '&' : '?'}receiver`;
    const current = `${receiver}&postMessageEvents=true`;
    const upcoming = `${receiver}&controls=false`;
    assert.equal(isUpcomingSpeakerPreview(preview(inherited)), false, `Main: ${inherited}`);
    assert.equal(isUpcomingSpeakerPreview(preview(current, 'current-slide')), false, `Current: ${current}`);
    assert.equal(isUpcomingSpeakerPreview(preview(upcoming, 'upcoming-slide')), true, `Upcoming: ${upcoming}`);
    assert.equal(isUpcomingSpeakerPreview(preview(upcoming)), false, `Unframed receiver: ${upcoming}`);
    assert.equal(isUpcomingSpeakerPreview(preview(upcoming, 'other-frame')), false, `Other iframe: ${upcoming}`);
  }
  for (const search of ['', '?controls=false', '?controls=true&controls=false']) {
    assert.equal(isUpcomingSpeakerPreview(preview(search, 'upcoming-slide')), false);
  }
  for (const search of ['?receiver', '?receiver&controls=true']) {
    assert.equal(isUpcomingSpeakerPreview(preview(search, 'upcoming-slide')), true);
  }
  assert.equal(isUpcomingSpeakerPreview({
    location: { search: '?receiver&controls=false' },
    get frameElement() { throw new DOMException('Cross-origin frame', 'SecurityError'); },
  }), false);
  assert.throws(() => isUpcomingSpeakerPreview({
    location: { search: '?receiver' },
    get frameElement() { throw new Error('Unexpected frame lookup failure'); },
  }), /Unexpected frame lookup failure/);
});

test('the Default preview divider supports dragging, keyboard limits, and one instance', () => {
  const events = {};
  const attributes = new Map();
  const properties = new Map();
  const captured = new Set();
  let attached = null;
  const divider = {
    setAttribute: (name, value) => attributes.set(name, value),
    addEventListener: (name, listener) => { events[name] = listener; },
    focus() {},
    setPointerCapture: id => captured.add(id),
    hasPointerCapture: id => captured.has(id),
    releasePointerCapture: id => captured.delete(id),
  };
  const view = {
    innerWidth: 1100,
    document: {
      querySelector: () => attached,
      createElement: () => divider,
      body: {
        style: { setProperty: (name, value) => properties.set(name, value) },
        append: node => { attached = node; },
      },
    },
  };
  setupSpeakerPreviewResize(view);
  assert.equal(properties.get('--hve-current-width'), '60%');
  assert.equal(attributes.get('role'), 'separator');
  let prevented = false;
  let stopped = false;
  const key = name => events.keydown({
    key: name, preventDefault: () => { prevented = true; }, stopPropagation: () => { stopped = true; },
  });
  key('ArrowRight');
  assert.equal(properties.get('--hve-current-width'), '62%');
  assert.ok(prevented && stopped);
  key('ArrowLeft');
  assert.equal(properties.get('--hve-current-width'), '60%');
  key('Home');
  key('ArrowLeft');
  assert.equal(attributes.get('aria-valuenow'), '25');
  key('End');
  key('ArrowRight');
  assert.equal(attributes.get('aria-valuenow'), '75');
  events.pointerdown({ button: 0, pointerId: 1, preventDefault() {} });
  events.pointermove({ pointerId: 1, clientX: 550 });
  assert.equal(properties.get('--hve-current-width'), '50%');
  events.pointerup({ pointerId: 1 });
  events.pointermove({ pointerId: 1, clientX: 800 });
  assert.equal(properties.get('--hve-current-width'), '50%');
  setupSpeakerPreviewResize(view);
  assert.equal(properties.get('--hve-current-width'), '50%');
});

test('the single metadata source yields a 90-minute schedule and three 30-minute parts', () => {
  const schedule = createSchedule(elements);
  assert.equal(schedule.total, 5400);
  assert.deepEqual(schedule.parts.map(({ start, duration }) => [start, duration]), [[0, 1800], [1800, 1800], [3600, 1800]]);
  let start = 0;
  for (const [index, entry] of schedule.entries.entries()) {
    assert.equal(entry.start, start);
    assert.equal(entry.duration, slides[index].minutes * 60);
    assert.equal(entry.end, start += entry.duration);
  }
  assert.equal(schedule.entries[23].start, 1800);
  assert.equal(schedule.entries[36].start, 3600);
  assert.equal(schedule.entries.at(-1).end, 5400);
  assert.equal((renderSlides().match(/data-timing="/g) ?? []).length, 41);
});

test('invalid timing values fail explicitly instead of using a default', () => {
  assert.throws(() => createSchedule([]), /No slides/);
  for (const duration of [null, '', ' ', 'invalid', 'Infinity', '0', '-2']) {
    assert.throws(() => createSchedule([{
      id: 'invalid', getAttribute: name => name === 'data-timing' ? duration : 'leadership',
    }]), /positive data-timing/);
  }
  assert.throws(() => createSchedule([{ id: 'invalid', getAttribute: () => '60' }]), /unknown timing part/);
  assert.throws(() => createSchedule([elements[0], elements[23], elements[1]]), /consecutive slides/);
});

test('the monotonic timer pauses and resumes without counting paused intervals', () => {
  let now = 0;
  const timer = createElapsedTimer(() => now);
  now = 5000;
  assert.equal(timer.elapsed(), 0);
  timer.start();
  now += 1250;
  assert.equal(timer.elapsed(), 1.25);
  timer.pause();
  now += 60000;
  timer.pause();
  timer.start();
  assert.equal(timer.elapsed(), 1.25);
  assert.equal(timer.paused, true);
  timer.resume();
  now += 2500;
  timer.resume();
  assert.equal(timer.elapsed(), 3.75);
  timer.reset();
  assert.equal(timer.elapsed(), 0);
  now += 1500;
  assert.equal(timer.elapsed(), 1.5);
  timer.pause();
  timer.reset();
  now += 60000;
  assert.equal(timer.elapsed(), 0);
  assert.equal(timer.paused, true);
  timer.resume();
  now += 1000;
  assert.equal(timer.elapsed(), 1);
});

test('progress uses time, clamps at the boundaries, and reports total overrun', () => {
  const schedule = createSchedule(elements);
  assert.equal(timingStatus(schedule, 0, 0).totalProgress, 0);
  assert.equal(timingStatus(schedule, 23, 1800).partProgress, 0);
  assert.equal(timingStatus(schedule, 0, 1800).partProgress, 100);
  assert.equal(timingStatus(schedule, 23, 2700).totalProgress, 50);
  assert.equal(timingStatus(schedule, 23, 2700).partProgress, 50);
  assert.equal(timingStatus(schedule, 36, 3600).partProgress, 0);
  assert.equal(timingStatus(schedule, 36, 0).partProgress, 0);
  assert.equal(timingStatus(schedule, 40, 5400).totalProgress, 100);
  assert.equal(timingStatus(schedule, 40, 5465).totalProgress, 100);
  assert.equal(timingStatus(schedule, 40, 5465).overrun, 65);
  assert.throws(() => timingStatus(schedule, 41, 0), /outside the timing plan/);
  assert.throws(() => timingStatus(schedule, 0, -1), /non-negative/);
});

test('pace uses the slide window with inclusive 30-second allowance boundaries', () => {
  const schedule = createSchedule(elements);
  const { start, end } = schedule.entries[4];
  assert.equal(timingStatus(schedule, 4, start - 30.01).pace, 'Ahead / Slow down');
  assert.equal(timingStatus(schedule, 4, start - 30).pace, 'On time');
  assert.equal(timingStatus(schedule, 4, start).pace, 'On time');
  assert.equal(timingStatus(schedule, 4, end).pace, 'On time');
  assert.equal(timingStatus(schedule, 4, end + 30).pace, 'On time');
  assert.equal(timingStatus(schedule, 4, end + 30.01).pace, 'Behind / Speed up');
  assert.equal(timingStatus(schedule, 0, 1800).pace, 'Behind / Speed up');
  assert.equal(timingStatus(schedule, 36, 1800).pace, 'Ahead / Slow down');
});

test('click cues are escaped text at exactly the seven required advance points', () => {
  const markup = renderSlides();
  assert.equal((markup.match(/&lt;click&gt;/g) ?? []).length, 7);
  assert.doesNotMatch(markup, /<click>/);
  assert.match(slides[4].notes, /<click>\nNow implementation gets smaller and faster/);
  assert.match(slides[4].notes, /<click>\nThat's what the final picture exposes/);
  assert.match(slides[9].notes, /^<click>\nInstead of serial handoffs/);
  const pillars = slides[10];
  const reveals = [...pillars.body.matchAll(/class="pillar-column fragment" data-fragment-index="(\d)"/g)];
  assert.deepEqual(reveals.map(match => Number(match[1])), [0, 1, 2, 3]);
  assert.deepEqual(
    [...pillars.notes.matchAll(/<click>\n([^\n]+)/g)].map(match => match[1]),
    [
      'multidisciplinary teams,',
      'Design Thinking,',
      'reusable accelerators,',
      "and AI throughout delivery. They aren't inventions that replace good engineering.",
    ],
  );
});

function popupFixture() {
  const listeners = {};
  let current = elements[0];
  let now = 0;
  let tick;
  const errors = [];
  const view = {
    location: { href: 'https://example.test/decks/hve/?theme=flowing-dark#/handoffs', origin: 'https://example.test', search: '' },
    performance: { now: () => now },
    console: { error: (...args) => errors.push(args) },
    addEventListener: (name, callback) => { listeners[name] = callback; },
    setInterval: callback => { tick = callback; return 1; },
    clearInterval() {},
  };
  const deck = {
    isPrintView: () => false,
    getSlides: () => elements,
    getCurrentSlide: () => current,
    on: (name, callback) => { listeners[name] = callback; },
  };
  function popup() {
    const nodes = new Map();
    const events = {};
    const createElement = tag => {
      let text = '';
      return {
        tag, dataset: {}, style: {}, textWrites: 0,
        setAttribute(name, value) { this[name] = value; },
        getAttribute(name) { return this[name] ?? null; },
        get textContent() { return text; },
        set textContent(value) { text = value; this.textWrites += 1; },
        set innerHTML(markup) {
          for (const [, childTag, attributes, name] of markup.matchAll(
            /<([a-z]+)\b([^>]*\bdata-time="([^"]+)"[^>]*)>/g,
          )) {
            const child = createElement(childTag);
            for (const [, attribute, value] of attributes.matchAll(/([\w-]+)="([^"]*)"/g)) {
              child.setAttribute(attribute, value);
            }
            nodes.set(`[data-time="${name}"]`, child);
          }
        },
        append() {}, replaceChildren() { nodes.clear(); },
        querySelector(selector) {
          if (!nodes.has(selector)) nodes.set(selector, createElement('span'));
          return nodes.get(selector);
        },
        addEventListener(name, callback) { events[name] = callback; },
      };
    };
    let native = { replaceWith: replacement => { native = replacement; } };
    const head = [];
    const document = {
      createElement: tag => { const node = createElement(tag); node.ownerDocument = document; return node; },
      querySelector: () => native,
      head: { append: node => head.push(node) },
    };
    return { closed: false, opener: view, document, nodes, events, head };
  }
  const controller = setupSpeakerTiming(deck, view);
  function connect(candidate, type = 'connected', origin = view.location.origin) {
    listeners.message({ origin, source: candidate, data: JSON.stringify({ namespace: 'reveal-notes', type }) });
  }
  function click(candidate, action) {
    candidate.events.click({ target: { closest: () => ({ dataset: { timer: action } }) } });
  }
  return {
    controller, popup, connect, click, errors, view, deck, listeners,
    advance: ms => { now += ms; tick(); },
    change: index => { current = elements[index]; listeners.slidechanged(); },
  };
}

test('periodic timing values stay readable without live announcements or unchanged text writes', t => {
  t.mock.timers.enable({ apis: ['Date'], now: new Date(2026, 10, 9, 12, 0).getTime() });
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  const node = name => popup.nodes.get(`[data-time="${name}"]`);
  const readouts = ['elapsed', 'part-percent', 'total-percent', 'clock'];
  for (const name of readouts) {
    assert.equal(node(name).tag, 'span');
    assert.equal(node(name).getAttribute('aria-live'), 'off');
    assert.equal(node(name).getAttribute('role'), null);
    assert.notEqual(node(name).textContent, '');
  }
  assert.equal(node('status').getAttribute('role'), 'status');
  assert.equal(node('status').getAttribute('aria-live'), 'polite');
  assert.equal(node('status').getAttribute('aria-atomic'), 'true');

  const names = [...readouts, 'part', 'part-number', 'duration', 'start', 'end', 'pace', 'status', 'overrun'];
  const writes = () => names.map(name => node(name).textWrites);
  const initial = writes();
  fixture.advance(250);
  fixture.advance(250);
  fixture.advance(250);
  assert.deepEqual(writes(), initial);
  fixture.advance(250);
  assert.equal(node('elapsed').textContent, '0:01');
  assert.equal(node('elapsed').textWrites, 2);
  assert.equal(node('status').textWrites, 1);
  assert.equal(node('clock').textWrites, 1);

  const clock = node('clock').textContent;
  t.mock.timers.tick(60000);
  fixture.advance(59000);
  assert.equal(node('elapsed').textContent, '1:00');
  assert.equal(node('part-percent').textContent, '3.3%');
  assert.equal(node('total-percent').textContent, '1.1%');
  assert.equal(node('part-percent').textWrites, 3);
  assert.equal(node('total-percent').textWrites, 2);
  assert.notEqual(node('clock').textContent, clock);
  assert.equal(node('clock').textWrites, 2);
  fixture.advance(250);
  assert.equal(node('clock').textWrites, 2);

  fixture.click(popup, 'toggle');
  assert.equal(node('status').textContent, 'Paused · On time');
  assert.equal(node('status').textWrites, 2);
  const paused = writes();
  fixture.advance(60000);
  assert.deepEqual(writes(), paused);
  fixture.change(23);
  assert.equal(node('status').textContent, 'Paused · Ahead / Slow down');
  assert.equal(node('status').textWrites, 3);
  fixture.controller.render();
  assert.equal(node('status').textWrites, 3);
  assert.deepEqual(fixture.errors, []);
});

test('speaker popup controls share one timer across jumps, pause, closure, and reopening', () => {
  const fixture = popupFixture();
  const first = fixture.popup();
  fixture.connect(first, 'connected', 'https://untrusted.test');
  assert.equal(first.head.length, 0);
  fixture.connect(first);
  const value = name => first.nodes.get(`[data-time="${name}"]`).textContent;
  assert.equal(first.head[0].href, 'https://example.test/decks/hve/speaker-timing.css');
  fixture.advance(60000);
  assert.equal(value('elapsed'), '1:00');
  fixture.click(first, 'toggle');
  fixture.advance(60000);
  assert.equal(value('elapsed'), '1:00');
  assert.match(value('status'), /Paused/);
  fixture.change(23);
  assert.equal(value('start'), '30:00');
  assert.equal(value('part'), 'Diving deeper into HVE-Core (30:00)');
  assert.equal(value('total-percent'), '1.1%');
  fixture.change(0);
  assert.equal(value('start'), '0:00');
  fixture.click(first, 'toggle');
  fixture.advance(1000);
  assert.equal(value('elapsed'), '1:01');
  fixture.connect(first, 'heartbeat');
  assert.equal(first.head.length, 1);
  first.closed = true;
  fixture.advance(1000);
  const next = fixture.popup();
  fixture.connect(next);
  assert.equal(next.nodes.get('[data-time="elapsed"]').textContent, '1:02');
  fixture.click(next, 'toggle');
  fixture.click(next, 'reset');
  fixture.advance(10000);
  assert.equal(next.nodes.get('[data-time="elapsed"]').textContent, '0:00');
  assert.match(next.nodes.get('[data-time="status"]').textContent, /Paused/);
  assert.deepEqual(fixture.errors, []);
});

test('receiver previews do not create timers; timing buttons own keyboard events', () => {
  const fixture = popupFixture();
  fixture.view.location.search = '?receiver';
  assert.equal(setupSpeakerTiming(fixture.deck, fixture.view), null);
  const popup = fixture.popup();
  fixture.connect(popup);
  let stopped = false;
  popup.events.keydown({ target: { closest: () => ({}) }, stopPropagation: () => { stopped = true; } });
  assert.equal(stopped, true);
  assert.match(speakerTimingMarkup(), /role="status" aria-live="polite"/);
  assert.match(speakerTimingMarkup(), /aria-label="Pause timer"/);
  assert.match(speakerTimingMarkup(), /aria-label="Reset timer"/);
  assert.match(speakerTimingMarkup(), /class="hve-total-track" tabindex="0"/);
  assert.equal(formatTiming(5400), '1:30:00');
  assert.equal(formatTiming(65.9), '1:05');
});

test('the built deck ships timing code and CSS without changing vendor assets', async () => {
  const source = await readFile(new URL('./dist/presentation.mjs', import.meta.url), 'utf8');
  assert.match(source, /setupSpeakerTiming\(deck\);[\s\S]*await deck.initialize/);
  const css = await readFile(new URL('./dist/speaker-timing.css', import.meta.url), 'utf8');
  assert.match(css, /:focus-visible/);
  assert.match(css, /flex: 0 0 76px/);
  assert.match(css, /writing-mode: vertical-lr/);
  assert.equal(await readFile(new URL('./dist/speaker-window.mjs', import.meta.url), 'utf8'),
    await readFile(new URL('./speaker-window.mjs', import.meta.url), 'utf8'));
});
