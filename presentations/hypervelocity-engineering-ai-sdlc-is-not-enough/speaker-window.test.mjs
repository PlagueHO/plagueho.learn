/**
 * Check speaker timing, countdowns, note fonts, elapsed-clock behavior, and popup integration.
 * Parameters: none. Build before checking shipped assets.
 * Usage: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { slides, renderSlides } from './deck.mjs';
import {
  createElapsedTimer, createSchedule, formatSlideDuration, formatTiming, isUpcomingSpeakerPreview,
  setupSpeakerPreviewResize, setupSpeakerTiming, slideCountdown, speakerNotesMarkup, speakerTimingMarkup, timingStatus,
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
  const [serialNotes, learningNotes] = slides[9].notes.split('<click>');
  assert.match(serialNotes, /work from one group to the next[\s\S]*before the feedback comes back/);
  assert.match(learningNotes, /^\nEnd users and the expert crew join a short learning loop/);
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

function popupFixture(setup = setupSpeakerTiming) {
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
    const createElement = tag => {
      let text = '';
      const children = new Map();
      const classes = new Set();
      return {
        tag, dataset: {}, style: { setProperty(name, value) { this[name] = value; } }, textWrites: 0,
        events: {}, children: [], markup: '',
        classList: {
          add: name => classes.add(name),
          remove: name => classes.delete(name),
          contains: name => classes.has(name),
        },
        setAttribute(name, value) { this[name] = value; },
        getAttribute(name) { return this[name] ?? null; },
        get textContent() { return text; },
        set textContent(value) { text = value; this.textWrites += 1; },
        set innerHTML(markup) {
          this.markup = markup;
          for (const [, childTag, attributes] of markup.matchAll(/<([a-z]+)\b([^>]*)>/g)) {
            const child = createElement(childTag);
            for (const [, attribute, value] of attributes.matchAll(/([\w-]+)="([^"]*)"/g)) {
              child.setAttribute(attribute, value);
            }
            const selectors = [];
            for (const attribute of ['data-time', 'data-slide', 'data-notes', 'data-timer']) {
              if (child[attribute]) selectors.push(`[${attribute}="${child[attribute]}"]`);
            }
            if (attributes.includes('data-notes-size')) selectors.push('[data-notes-size]');
            if (childTag === 'select') selectors.push('select');
            for (const name of (child.class ?? '').split(' ').filter(Boolean)) selectors.push(`.${name}`);
            for (const selector of selectors) {
              children.set(selector, child);
              nodes.set(selector, child);
            }
          }
        },
        append(node) { this.children.push(node); },
        replaceChildren() { children.clear(); this.children = []; },
        querySelector: selector => children.get(selector) ?? null,
        addEventListener(name, callback) { this.events[name] = callback; },
      };
    };
    const notes = createElement('div');
    let heading = createElement('h4');
    const noteValue = createElement('div');
    noteValue.markup = '<p>Keep the original notes.</p>';
    function replaceHeading(replacement) {
      heading = replacement;
      heading.replaceWith = replaceHeading;
    }
    heading.replaceWith = replaceHeading;
    notes.querySelector = selector => ({
      '.label': heading.className === 'hve-notes-header' ? null : heading, '.value': noteValue,
      '.hve-notes-header': heading.className === 'hve-notes-header' ? heading : null,
    })[selector] ?? null;
    function replacePanel(replacement) {
      native = replacement;
      native.replaceWith = replacePanel;
    }
    let native = { replaceWith: replacePanel };
    let divider = null;
    const head = [];
    const document = {
      createElement: tag => { const node = createElement(tag); node.ownerDocument = document; return node; },
      querySelector: selector => ({
        '.speaker-controls-time': native, '.speaker-controls-notes': notes, '.hve-preview-divider': divider,
      })[selector] ?? null,
      head: { append: node => head.push(node) },
      body: { style: { setProperty() {} }, append: node => { divider = node; } },
    };
    return {
      closed: false, opener: view, innerWidth: 1100, document, nodes, head, notes, noteValue,
      get events() { return native.events; },
      get header() { return heading; },
      get panel() { return native; },
    };
  }
  const controller = setup(deck, view);
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
  const readouts = ['elapsed', 'part-percent', 'total-duration', 'clock'];
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
  assert.equal(node('total-duration').textContent, '1:30:00');
  assert.equal(node('part-percent').textWrites, 3);
  assert.equal(node('total-duration').textWrites, 1);
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
  assert.equal(value('total-duration'), '1:30:00');
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

test('slide duration text handles whole minutes, fractional estimates, and singular units', () => {
  assert.equal(formatSlideDuration(180), '3 minutes');
  assert.equal(formatSlideDuration(165), '2 minutes 45 seconds');
  assert.equal(formatSlideDuration(60), '1 minute');
  assert.equal(formatSlideDuration(61), '1 minute 1 second');
  assert.equal(formatSlideDuration(30), '30 seconds');
  assert.equal(formatSlideDuration(1), '1 second');
});

test('countdown boundaries use unrounded time and clamp at zero', () => {
  const beforeWarning = slideCountdown(60, 49.999, 0);
  assert.ok(Math.abs(beforeWarning.remaining - 10.001) < 0.000001);
  assert.equal(beforeWarning.urgent, false);
  assert.deepEqual(slideCountdown(60, 50, 0), { remaining: 10, urgent: true });
  assert.deepEqual(slideCountdown(60, 59, 0), { remaining: 1, urgent: true });
  assert.deepEqual(slideCountdown(60, 60, 0), { remaining: 0, urgent: false });
  assert.deepEqual(slideCountdown(60, 100, 0), { remaining: 0, urgent: false });
  assert.deepEqual(slideCountdown(60, 100, 90), { remaining: 50, urgent: false });
});

test('notes fonts are bounded, scoped to native note text, and retained across popup reopening', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  assert.deepEqual(fixture.errors, []);
  const original = popup.noteValue.markup;
  const size = () => popup.nodes.get('[data-notes-size]').textContent;
  const adjust = action => popup.header.events.click({
    target: { closest: () => ({ dataset: { notes: action } }) },
  });
  assert.equal(size(), '20 px');
  assert.equal(popup.noteValue.style.fontSize, '20px');
  assert.equal(popup.noteValue.style.fontFamily, 'Arial, Helvetica, sans-serif');
  assert.equal(popup.panel.style.fontSize, undefined);
  assert.equal(popup.header.style.fontSize, undefined);
  for (let index = 0; index < 4; index += 1) adjust('decrease');
  assert.equal(size(), '16 px');
  assert.equal(popup.nodes.get('[data-notes="decrease"]').disabled, true);
  for (let index = 0; index < 15; index += 1) adjust('increase');
  assert.equal(size(), '40 px');
  assert.equal(popup.nodes.get('[data-notes="increase"]').disabled, true);
  assert.equal(popup.nodes.get('[data-notes="decrease"]').disabled, false);
  adjust('decrease');
  assert.equal(size(), '38 px');
  assert.equal(popup.nodes.get('[data-notes="increase"]').disabled, false);
  const select = popup.nodes.get('select');
  for (const [font, family] of [
    ['verdana', 'Verdana, Geneva, sans-serif'], ['georgia', 'Georgia, "Times New Roman", serif'],
    ['monospace', 'Consolas, "Liberation Mono", monospace'],
  ]) {
    select.value = font;
    select.events.change();
    assert.equal(popup.noteValue.style.fontFamily, family);
  }
  fixture.change(4);
  assert.equal(popup.noteValue.markup, original);
  assert.equal(popup.noteValue.style.fontSize, '38px');
  fixture.connect(popup, 'heartbeat');
  assert.equal(popup.head.length, 1);
  assert.equal(popup.header.events.click instanceof Function, true);
  popup.closed = true;
  const next = fixture.popup();
  fixture.connect(next);
  assert.equal(next.noteValue.style.fontSize, '38px');
  assert.equal(next.nodes.get('select').value, 'monospace');
  assert.equal(next.noteValue.markup, original);
  assert.match(speakerNotesMarkup(), /aria-label="Note font"/);
  assert.match(speakerNotesMarkup(), /aria-label="Increase font size"/);
  assert.match(speakerNotesMarkup(), /aria-label="Decrease font size"/);
  assert.deepEqual(fixture.errors, []);
});

test('note controls own keyboard input without blocking keys in note text', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  let stopped = 0;
  const key = interactive => ({
    target: { closest: () => interactive ? {} : null },
    stopPropagation() { stopped += 1; },
  });
  popup.header.events.keydown(key(true));
  assert.equal(stopped, 1);
  popup.header.events.keydown(key(false));
  assert.equal(stopped, 1);
  popup.header.events.keydown({ target: popup.header, stopPropagation() { stopped += 1; } });
  assert.equal(stopped, 2);
  assert.equal(popup.header.tabIndex, 0);
  assert.equal(popup.header.getAttribute('role'), 'region');
  assert.equal(popup.header.getAttribute('aria-label'), 'Speaker notes controls');
  assert.deepEqual(fixture.errors, []);
});

test('a new main-deck controller starts with default fonts and no elapsed time before first connection', () => {
  const first = popupFixture();
  const popup = first.popup();
  first.connect(popup);
  popup.header.events.click({ target: { closest: () => ({ dataset: { notes: 'increase' } }) } });
  const select = popup.nodes.get('select');
  select.value = 'verdana';
  select.events.change();
  first.advance(10000);
  const reload = popupFixture();
  reload.advance(60000);
  reload.change(4);
  const next = reload.popup();
  reload.connect(next);
  assert.equal(next.noteValue.style.fontSize, '20px');
  assert.equal(next.nodes.get('select').value, 'arial');
  assert.equal(next.nodes.get('[data-time="elapsed"]').textContent, '0:00');
  assert.equal(next.nodes.get('[data-slide="countdown"]').textContent, '2:45');
  assert.deepEqual(reload.errors, []);
});

test('notes header follows slide position and allocation without replacing native content', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  const read = name => popup.nodes.get(`[data-slide="${name}"]`).textContent;
  const header = popup.header;
  assert.equal(read('position'), 'Slide 1 / 41');
  assert.equal(read('duration'), formatSlideDuration(slides[0].minutes * 60));
  fixture.change(4);
  assert.equal(read('position'), 'Slide 5 / 41');
  assert.equal(read('duration'), '2 minutes 45 seconds');
  popup.noteValue.innerHTML = '<p>New native note content.</p>';
  popup.notes.classList.add('hidden');
  fixture.change(40);
  assert.equal(read('position'), 'Slide 41 / 41');
  assert.equal(popup.header, header);
  assert.equal(popup.noteValue.markup, '<p>New native note content.</p>');
  assert.equal(popup.notes.classList.contains('hve-speaker-notes'), true);
  assert.equal(popup.notes.classList.contains('hidden'), true);
  assert.deepEqual(fixture.errors, []);
});

test('main-deck reload reconnects an open speaker window with fresh timing and font defaults', () => {
  const first = popupFixture();
  const popup = first.popup();
  first.connect(popup);
  first.advance(12000);
  popup.header.events.click({ target: { closest: () => ({ dataset: { notes: 'increase' } }) } });
  popup.nodes.get('select').value = 'georgia';
  popup.nodes.get('select').events.change();
  const oldHeader = popup.header;
  const originalNotes = popup.noteValue;
  const reloaded = popupFixture();
  popup.opener = reloaded.view;
  reloaded.connect(popup, 'heartbeat');
  assert.deepEqual(reloaded.errors, []);
  assert.notEqual(popup.header, oldHeader);
  assert.equal(popup.noteValue, originalNotes);
  assert.equal(popup.noteValue.style.fontSize, '20px');
  assert.equal(popup.nodes.get('select').value, 'arial');
  assert.equal(popup.nodes.get('[data-time="elapsed"]').textContent, '0:00');
  reloaded.advance(1000);
  assert.equal(popup.nodes.get('[data-time="elapsed"]').textContent, '0:01');
  assert.equal(popup.nodes.get('[data-slide="countdown"]').textContent, formatTiming(slides[0].minutes * 60 - 1));
  popup.header.events.click({ target: { closest: () => ({ dataset: { notes: 'increase' } }) } });
  assert.equal(popup.noteValue.style.fontSize, '22px');
});

test('countdown final-10-second cue, pause, expiration, and resets share the elapsed timer', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  const read = name => popup.nodes.get(`[data-slide="${name}"]`).textContent;
  const duration = slides[0].minutes * 60;
  assert.equal(read('countdown'), formatTiming(duration));
  fixture.advance(duration * 1000 - 10001);
  assert.equal(read('countdown'), '0:11');
  assert.equal(popup.header.dataset.urgent, 'false');
  fixture.advance(1);
  assert.equal(read('countdown'), '0:10');
  assert.equal(popup.header.dataset.urgent, 'true');
  assert.equal(read('cue'), '10 seconds or less remaining');
  const cue = popup.nodes.get('[data-slide="cue"]');
  const writes = cue.textWrites;
  fixture.advance(1);
  assert.equal(read('countdown'), '0:10');
  assert.equal(cue.textWrites, writes);
  fixture.click(popup, 'toggle');
  fixture.advance(60000);
  assert.equal(read('countdown'), '0:10');
  assert.equal(popup.header.dataset.paused, 'true');
  assert.equal(read('cue'), 'Timer paused');
  fixture.click(popup, 'toggle');
  fixture.advance(9999);
  assert.equal(read('countdown'), '0:00');
  assert.equal(popup.header.dataset.urgent, 'false');
  assert.equal(read('cue'), '');
  fixture.advance(60000);
  assert.equal(read('countdown'), '0:00');
  assert.equal(read('cue'), '');
  fixture.click(popup, 'reset');
  assert.equal(read('countdown'), formatTiming(duration));
  assert.equal(popup.nodes.get('[data-time="elapsed"]').textContent, '0:00');
  assert.equal(popup.header.dataset.paused, 'false');
  fixture.advance(1000);
  fixture.click(popup, 'toggle');
  fixture.click(popup, 'reset');
  fixture.advance(60000);
  assert.equal(read('countdown'), formatTiming(duration));
  assert.equal(popup.nodes.get('[data-time="elapsed"]').textContent, '0:00');
  assert.equal(popup.header.dataset.paused, 'true');
  assert.deepEqual(fixture.errors, []);
});

test('slide visits restart only the countdown and preserve it across closure and slide jumps', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  const read = name => popup.nodes.get(`[data-slide="${name}"]`).textContent;
  fixture.advance(5000);
  const countdown = read('countdown');
  fixture.change(0);
  assert.equal(read('countdown'), countdown, 'Same-slide events do not restart a countdown');
  fixture.change(4);
  assert.equal(read('countdown'), '2:45');
  assert.equal(popup.nodes.get('[data-time="elapsed"]').textContent, '0:05');
  fixture.advance(1000);
  fixture.change(0);
  assert.equal(read('countdown'), formatTiming(slides[0].minutes * 60));
  fixture.click(popup, 'toggle');
  fixture.change(4);
  fixture.advance(60000);
  assert.equal(read('countdown'), '2:45', 'Changing slide while paused starts a frozen allocation');
  fixture.click(popup, 'toggle');
  popup.closed = true;
  fixture.advance(1000);
  fixture.change(23);
  fixture.advance(3000);
  const next = fixture.popup();
  fixture.connect(next);
  const remaining = () => next.nodes.get('[data-slide="countdown"]').textContent;
  assert.equal(remaining(), formatTiming(slides[23].minutes * 60 - 3));
  assert.equal(next.nodes.get('[data-time="elapsed"]').textContent, '0:10');
  assert.equal(next.nodes.get('[data-time="total-duration"]').textContent, '1:30:00');
  assert.equal(next.nodes.get('[data-time="pace"]').textContent, 'Ahead');
  fixture.connect(next, 'heartbeat');
  fixture.advance(1000);
  assert.equal(remaining(), formatTiming(slides[23].minutes * 60 - 4));
  assert.equal(next.head.length, 1);
  assert.deepEqual(fixture.errors, []);
});

test('popup integration rejects foreign openers, incomplete notes, and invalid font values explicitly', () => {
  const fixture = popupFixture();
  const foreign = fixture.popup();
  foreign.opener = {};
  fixture.connect(foreign);
  assert.equal(foreign.head.length, 0);
  const popup = fixture.popup();
  fixture.connect(popup);
  const second = fixture.popup();
  fixture.connect(second);
  assert.equal(second.head.length, 0, 'A second open window cannot replace the active speaker view');
  const select = popup.nodes.get('select');
  select.value = 'unlisted-font';
  select.events.change();
  assert.match(fixture.errors.at(-1)[1].message, /Unknown note font/);
  assert.equal(popup.panel.children[0].getAttribute('role'), 'alert');
  assert.equal(popup.nodes.get('[data-slide="countdown"]').textContent, 'Unavailable');

  const missing = popupFixture();
  const incomplete = missing.popup();
  incomplete.notes.querySelector = () => null;
  missing.connect(incomplete);
  assert.match(missing.errors[0][1].message, /notes heading and content container/);
  assert.equal(incomplete.panel.children[0].getAttribute('role'), 'alert');
  const print = popupFixture();
  print.deck.isPrintView = () => true;
  assert.equal(setupSpeakerTiming(print.deck, print.view), null);
});

test('invalid timing metadata reports an error while note font controls remain usable', () => {
  const fixture = popupFixture();
  fixture.deck.getSlides = () => [{
    id: 'invalid', getAttribute: name => ({ 'data-timing': '0', 'data-part': 'leadership' })[name],
  }];
  const popup = fixture.popup();
  fixture.connect(popup);
  assert.match(fixture.errors[0][1].message, /positive data-timing value/);
  assert.equal(popup.nodes.get('[data-slide="countdown"]').textContent, 'Unavailable');
  popup.header.events.click({ target: { closest: () => ({ dataset: { notes: 'increase' } }) } });
  assert.equal(popup.noteValue.style.fontSize, '22px');
  assert.equal(popup.panel.children[0].getAttribute('role'), 'alert');
});

test('a missing countdown node reports an error without throwing again in the error display', () => {
  const fixture = popupFixture();
  const popup = fixture.popup();
  fixture.connect(popup);
  const query = popup.header.querySelector;
  popup.header.querySelector = selector => selector === '[data-slide="countdown"]' ? null : query(selector);
  assert.doesNotThrow(() => fixture.advance(1000));
  assert.match(fixture.errors[0][1].message, /Missing speaker display control/);
  assert.equal(popup.panel.children[0].getAttribute('role'), 'alert');
  assert.equal(popup.nodes.get('[data-slide="cue"]').textContent, 'Timing unavailable');
});

test('countdown pulse keeps readable contrast throughout the animation', async () => {
  const css = await readFile(new URL('./speaker-timing.css', import.meta.url), 'utf8');
  const pulse = css.match(/@keyframes hve-countdown-pulse\s*\{([\s\S]*?)\n\}/)[1];
  assert.doesNotMatch(pulse, /opacity/);
  const warning = css.match(/\[data-urgent="true"\] \.hve-slide-remaining\s*\{([^}]*)\}/)[1];
  for (const rule of [warning, pulse]) {
    const color = rule.match(/color:\s*#([0-9a-f]{6})/i)?.[1];
    assert.ok(color, 'Warning and pulse must specify an opaque text color');
    const channels = color.match(/../g).map(hex => parseInt(hex, 16) / 255)
      .map(value => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
    const luminance = channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
    assert.ok(1.05 / (luminance + 0.05) >= 4.5, `Warning color #${color} must meet 4.5:1 on white`);
  }
});

test('built speaker popups use a content-bound CSS URL instead of the previous cached URL', async () => {
  const css = await readFile(new URL('./dist/speaker-timing.css', import.meta.url));
  const version = createHash('sha256').update(css).digest('hex');
  const { setupSpeakerTiming: setupBuilt } = await import('./dist/speaker-window.mjs');
  for (const href of [
    'https://example.test/',
    'https://example.test/decks/hve/',
    'https://example.test/decks/hve/index.html?theme=flowing-dark#/handoffs',
  ]) {
    const fixture = popupFixture(setupBuilt);
    fixture.view.location.href = href;
    const popup = fixture.popup();
    fixture.connect(popup);
    const expected = new URL('./speaker-timing.css', href);
    expected.searchParams.set('v', version);
    assert.equal(popup.head[0].href, expected.href);
    assert.equal(popup.head.length, 1);
    fixture.connect(popup, 'heartbeat');
    assert.equal(popup.head.length, 1);
    assert.equal(popup.noteValue.markup, '<p>Keep the original notes.</p>');
    assert.equal(popup.noteValue.style.fontSize, '20px');
    assert.deepEqual(fixture.errors, []);
  }
});

test('the built deck ships timing code and CSS without changing vendor assets', async () => {
  const source = await readFile(new URL('./dist/presentation.mjs', import.meta.url), 'utf8');
  assert.match(source, /setupSpeakerTiming\(deck\);[\s\S]*await deck.initialize/);
  const css = await readFile(new URL('./dist/speaker-timing.css', import.meta.url), 'utf8');
  assert.match(css, /:focus-visible/);
  assert.match(css, /flex: 0 0 76px/);
  assert.match(css, /writing-mode: vertical-lr/);
  assert.match(css, /\.hve-speaker-notes\.hidden\s*\{[^}]*display: flex/);
  assert.match(css, /\.hve-speaker-notes\.hidden \.value\s*\{[^}]*display: none/);
  assert.match(css, /hve-countdown-pulse 1s/);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)[\s\S]*animation: none/);
  assert.match(css, /\.hve-notes-header\s*\{[^}]*display: flex;[^}]*overflow-x: auto;[^}]*white-space: nowrap;/);
  assert.match(css, /\.hve-notes-header\s*\{[^}]*padding: 4px 8px;[^}]*scrollbar-width: none;[^}]*font: 12px\/1\.3/);
  assert.match(css, /\.hve-notes-header::-webkit-scrollbar\s*\{[^}]*display: none/);
  assert.match(css, /\.hve-notes-header select\s*\{[^}]*min-height: 0;[^}]*border: 0;[^}]*background: transparent/);
  assert.match(css, /\.hve-notes-heading h4\s*\{[^}]*font: inherit/);
  assert.match(css, /\.hve-slide-remaining strong\s*\{[^}]*font-size: inherit/);
  assert.doesNotMatch(css.match(/\.hve-slide-remaining\s*\{[^}]*\}/)[0], /border|background|padding/);
  assert.doesNotMatch(css, /flex-wrap: wrap|@container/);
  assert.doesNotMatch(speakerTimingMarkup(), /data-time="total-percent"/);
  assert.match(speakerTimingMarkup(), /Planned total/);
  assert.equal(css, await readFile(new URL('./speaker-timing.css', import.meta.url), 'utf8'));
  assert.deepEqual(await readFile(new URL('./dist/vendor/plugin/notes.mjs', import.meta.url)),
    await readFile(new URL('./node_modules/reveal.js/dist/plugin/notes.mjs', import.meta.url)));
  const version = createHash('sha256').update(css).digest('hex');
  assert.equal(await readFile(new URL('./dist/speaker-window.mjs', import.meta.url), 'utf8'),
    (await readFile(new URL('./speaker-window.mjs', import.meta.url), 'utf8'))
      .replace('./speaker-timing.css', `./speaker-timing.css?v=${version}`));
});
