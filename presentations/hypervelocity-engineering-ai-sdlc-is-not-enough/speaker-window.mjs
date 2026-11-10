/**
 * Speaker popup positioning, note preferences, shared elapsed clock, and slide countdown.
 * Parameters: Reveal deck and browser window; clock and scheduler can be injected in tests.
 * Usage: setupSpeakerTiming(deck) before deck.initialize(); attach popups opened by the Notes plugin.
 */
export const PART_NAMES = {
  leadership: 'Introduction to HVE',
  'deep-dive': 'Diving deeper into HVE-Core',
  demos: 'Demos',
};

const NOTE_FONTS = {
  arial: { label: 'Arial', family: 'Arial, Helvetica, sans-serif' },
  verdana: { label: 'Verdana', family: 'Verdana, Geneva, sans-serif' },
  georgia: { label: 'Georgia', family: 'Georgia, "Times New Roman", serif' },
  monospace: { label: 'Monospace', family: 'Consolas, "Liberation Mono", monospace' },
};
const MIN_NOTE_SIZE = 16;
const MAX_NOTE_SIZE = 40;
const NOTE_SIZE_STEP = 2;

export function createElapsedTimer(now = () => performance.now()) {
  let saved = 0;
  let started = null;
  let paused = false;
  const elapsed = () => (saved + (started === null ? 0 : now() - started)) / 1000;
  return {
    elapsed,
    get paused() { return paused; },
    start() {
      if (started === null && !paused) started = now();
    },
    pause() {
      if (paused) return;
      saved = elapsed() * 1000;
      started = null;
      paused = true;
    },
    resume() {
      if (!paused) return;
      started = now();
      paused = false;
    },
    reset() {
      saved = 0;
      if (started !== null) started = now();
    },
  };
}

export function createSchedule(slides) {
  if (!slides.length) throw new Error('No slides are available for the timing plan.');
  let total = 0;
  const parts = [];
  const entries = slides.map(slide => {
    const duration = Number(slide.getAttribute('data-timing'));
    const part = slide.getAttribute('data-part');
    if (!Number.isFinite(duration) || duration <= 0) {
      throw new Error(`Slide ${slide.id} needs a positive data-timing value. Edit slide-meta.mjs and rebuild.`);
    }
    if (!Object.hasOwn(PART_NAMES, part)) throw new Error(`Slide ${slide.id} has an unknown timing part: ${part}`);
    let range = parts.at(-1);
    if (range?.id !== part) {
      if (parts.some(item => item.id === part)) throw new Error(`Timing part ${part} must contain consecutive slides.`);
      range = { id: part, name: PART_NAMES[part], start: total, duration: 0 };
      parts.push(range);
    }
    const entry = { slide, start: total, end: total + duration, duration, part: range };
    range.duration += duration;
    total = entry.end;
    return entry;
  });
  return { entries, parts, total };
}

export function timingStatus(schedule, index, elapsed) {
  const entry = schedule.entries[index];
  if (!entry) throw new Error(`Slide index ${index} is outside the timing plan.`);
  if (!Number.isFinite(elapsed) || elapsed < 0) throw new Error('Elapsed time must be a non-negative number.');
  const percentage = (time, total) => Math.max(0, Math.min(100, time / total * 100));
  const pace = elapsed < entry.start - 30 ? 'Ahead / Slow down'
    : elapsed > entry.end + 30 ? 'Behind / Speed up' : 'On time';
  return {
    ...entry,
    elapsed,
    pace,
    totalProgress: percentage(elapsed, schedule.total),
    partProgress: percentage(elapsed - entry.part.start, entry.part.duration),
    overrun: Math.max(0, elapsed - schedule.total),
  };
}

export function formatTiming(seconds) {
  const whole = Math.floor(seconds);
  const hours = Math.floor(whole / 3600);
  const minutes = Math.floor(whole % 3600 / 60);
  const remainder = String(whole % 60).padStart(2, '0');
  return hours ? `${hours}:${String(minutes).padStart(2, '0')}:${remainder}` : `${minutes}:${remainder}`;
}

export function formatSlideDuration(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainder = seconds % 60;
  return [
    minutes ? `${minutes} minute${minutes === 1 ? '' : 's'}` : '',
    remainder ? `${remainder} second${remainder === 1 ? '' : 's'}` : '',
  ].filter(Boolean).join(' ');
}

export function slideCountdown(duration, elapsed, entered) {
  const remaining = Math.max(0, duration - (elapsed - entered));
  return { remaining, urgent: remaining > 0 && remaining <= 10 };
}

export function isUpcomingSpeakerPreview(view) {
  if (!new URLSearchParams(view.location.search).has('receiver')) return false;
  try {
    return view.frameElement?.parentElement?.id === 'upcoming-slide';
  } catch (error) {
    if (error.name !== 'SecurityError') throw error;
    return false;
  }
}

export function setupSpeakerPreviewResize(view) {
  const document = view.document;
  if (document.querySelector('.hve-preview-divider')) return;
  const divider = document.createElement('div');
  divider.className = 'hve-preview-divider';
  divider.tabIndex = 0;
  divider.setAttribute('role', 'separator');
  divider.setAttribute('aria-label', 'Resize current slide preview');
  divider.setAttribute('aria-orientation', 'vertical');
  divider.setAttribute('aria-valuemin', '25');
  divider.setAttribute('aria-valuemax', '75');
  divider.title = 'Drag to resize. Arrow keys adjust width. Home and End set the limits.';
  let width = view.innerWidth <= 900 ? 50 : 60;
  function resize(value) {
    width = Math.max(25, Math.min(75, value));
    document.body.style.setProperty('--hve-current-width', `${width}%`);
    divider.setAttribute('aria-valuenow', String(Math.round(width)));
    divider.setAttribute('aria-valuetext', `Current slide preview: ${Math.round(width)}%`);
  }
  resize(width);
  divider.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    divider.focus();
    divider.setPointerCapture(event.pointerId);
  });
  divider.addEventListener('pointermove', event => {
    if (divider.hasPointerCapture(event.pointerId)) resize(event.clientX / view.innerWidth * 100);
  });
  divider.addEventListener('pointerup', event => {
    if (divider.hasPointerCapture(event.pointerId)) divider.releasePointerCapture(event.pointerId);
  });
  divider.addEventListener('keydown', event => {
    event.stopPropagation();
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    resize(event.key === 'Home' ? 25 : event.key === 'End' ? 75 : width + (event.key === 'ArrowLeft' ? -2 : 2));
  });
  document.body.append(divider);
}

export function speakerTimingMarkup() {
  return `<h4 class="hve-timing-hidden">Presentation timing</h4>
    <span class="hve-timing-label">Elapsed</span><span class="hve-elapsed" aria-live="off" data-time="elapsed"></span>
    <div class="hve-timer-actions">
      <button type="button" data-timer="toggle" aria-label="Pause timer" title="Pause timer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path class="hve-pause-icon" d="M8 5v14M16 5v14"/>
          <path class="hve-resume-icon" d="m8 5 11 7-11 7Z"/></svg>
      </button>
      <button type="button" data-timer="reset" aria-label="Reset timer" title="Reset timer">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 11a8 8 0 1 1 2 7M4 4v7h7"/></svg>
      </button>
    </div>
    <span class="hve-pace" data-time="pace"></span>
    <p class="hve-timing-hidden" role="status" aria-live="polite" aria-atomic="true" data-time="status"></p>
    <div class="hve-total-track" tabindex="0" aria-label="Timing plan" aria-describedby="hve-timing-details">
      <progress data-time="total-progress" aria-label="Total progress" max="100" value="0"></progress>
      <span class="hve-part-marker" data-time="part-marker-one"></span>
      <span class="hve-part-marker" data-time="part-marker-two"></span>
    </div>
    <span class="hve-timing-label">Planned total</span>
    <span class="hve-total-duration" aria-live="off" data-time="total-duration"></span>
    <span class="hve-part-number" data-time="part-number"></span>
    <span class="hve-part-percent" aria-live="off" data-time="part-percent"></span>
    <div class="hve-timing-hidden" id="hve-timing-details">
    <span>Clock <span aria-live="off" data-time="clock"></span></span>
    <dl>
      <div><dt>Part</dt><dd data-time="part"></dd></div>
      <div><dt>Slide duration</dt><dd data-time="duration"></dd></div>
      <div><dt>Planned start</dt><dd data-time="start"></dd></div>
      <div><dt>Planned end</dt><dd data-time="end"></dd></div>
    </dl>
    <progress data-time="part-progress" aria-label="Part progress" max="100" value="0"></progress>
    </div>
    <p data-time="overrun" hidden></p>`;
}

export function speakerNotesMarkup() {
  const fonts = Object.entries(NOTE_FONTS).map(([id, font]) =>
    `<option value="${id}">${font.label}</option>`).join('');
  return `<div class="hve-notes-heading">
      <h4>Speaker notes</h4>
      <span class="hve-slide-position" data-slide="position"></span>
    </div>
    <div class="hve-note-tools" role="group" aria-label="Note text settings">
      <label>Font <select aria-label="Note font">${fonts}</select></label>
      <div class="hve-note-size">
        <button type="button" data-notes="decrease" aria-label="Decrease font size" title="Decrease font size">A−</button>
        <span data-notes-size aria-live="off"></span>
        <button type="button" data-notes="increase" aria-label="Increase font size" title="Increase font size">A+</button>
      </div>
    </div>
    <div class="hve-slide-timing">
      <span class="hve-slide-allocation">Slide allocation <strong data-slide="duration"></strong></span>
      <span class="hve-slide-remaining">Remaining <strong data-slide="countdown" aria-live="off"></strong></span>
    </div>
    <p class="hve-slide-cue" data-slide="cue" role="status" aria-live="polite" aria-atomic="true"></p>`;
}

export function setupSpeakerTiming(deck, view = window) {
  if (new URLSearchParams(view.location.search).has('receiver') || deck.isPrintView()) return null;
  const timer = createElapsedTimer(() => view.performance.now());
  let popup = null;
  let panel = null;
  let schedule = null;
  let failed = false;
  let notesHeader = null;
  let currentSlide = null;
  let entered = 0;
  let noteSize = 20;
  let noteFont = 'arial';

  function output(root, selector, value) {
    const node = root.querySelector(selector);
    if (!node) throw new Error(`Missing speaker display control: ${selector}`);
    if (node.textContent !== value) node.textContent = value;
  }

  function showError(error) {
    failed = true;
    view.console.error('Speaker timing is unavailable.', error);
    if (panel) {
      panel.replaceChildren();
      const notice = panel.ownerDocument.createElement('p');
      notice.setAttribute('role', 'alert');
      notice.textContent = `Speaker timing is unavailable. ${error.message}`;
      panel.append(notice);
    }
    if (notesHeader) {
      notesHeader.dataset.urgent = 'false';
      for (const [name, value] of [['countdown', 'Unavailable'], ['cue', 'Timing unavailable']]) {
        const node = notesHeader.querySelector(`[data-slide="${name}"]`);
        if (node) node.textContent = value;
      }
    }
  }

  function render() {
    const slide = deck.getCurrentSlide();
    if (slide !== currentSlide) {
      currentSlide = slide;
      entered = timer.elapsed();
    }
    if (!panel || popup.closed || failed) return;
    try {
      const index = deck.getSlides().indexOf(currentSlide);
      const state = timingStatus(schedule, index, timer.elapsed());
      const write = (name, value) => output(panel, `[data-time="${name}"]`, value);
      write('elapsed', formatTiming(state.elapsed));
      const clock = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      write('clock', clock);
      write('part', `${state.part.name} (${formatTiming(state.part.duration)})`);
      write('part-number', `Part ${schedule.parts.indexOf(state.part) + 1}/${schedule.parts.length}`);
      for (const name of ['duration', 'start', 'end']) write(name, formatTiming(state[name]));
      for (const name of ['part', 'total']) {
        const value = state[`${name}Progress`];
        panel.querySelector(`[data-time="${name}-progress"]`).value = value;
      }
      write('part-percent', `${state.partProgress.toFixed(1)}%`);
      write('total-duration', formatTiming(schedule.total));
      const countdown = slideCountdown(state.duration, state.elapsed, entered);
      output(notesHeader, '[data-slide="position"]', `Slide ${index + 1} / ${schedule.entries.length}`);
      output(notesHeader, '[data-slide="duration"]', formatSlideDuration(state.duration));
      output(notesHeader, '[data-slide="countdown"]', formatTiming(Math.ceil(countdown.remaining)));
      output(notesHeader, '[data-slide="cue"]', timer.paused ? 'Timer paused'
        : countdown.urgent ? '10 seconds or less remaining' : '');
      notesHeader.dataset.urgent = String(countdown.urgent);
      notesHeader.dataset.paused = String(timer.paused);
      const status = `${timer.paused ? 'Paused' : 'Running'} · ${state.pace}`;
      write('pace', state.pace.split(' / ')[0]);
      write('status', status);
      const toggle = panel.querySelector('[data-timer="toggle"]');
      const action = timer.paused ? 'Resume timer' : 'Pause timer';
      toggle.setAttribute('aria-label', action);
      toggle.title = action;
      toggle.setAttribute('aria-pressed', String(timer.paused));
      panel.dataset.paused = String(timer.paused);
      const details = `${status}. Elapsed ${formatTiming(state.elapsed)}. Clock ${clock}. ${state.part.name}: `
        + `${state.partProgress.toFixed(1)}% of ${formatTiming(state.part.duration)}. `
        + `Total ${state.totalProgress.toFixed(1)}% of ${formatTiming(schedule.total)}. `
        + `Slide duration ${formatTiming(state.duration)}. Planned ${formatTiming(state.start)} to ${formatTiming(state.end)}.`;
      panel.title = details;
      const track = panel.querySelector('.hve-total-track');
      track.setAttribute('aria-label', details);
      track.title = details;
      for (const [index, name] of ['one', 'two'].entries()) {
        const marker = panel.querySelector(`[data-time="part-marker-${name}"]`);
        const part = schedule.parts[index + 1];
        marker.hidden = !part;
        if (part) marker.style.top = `${part.start / schedule.total * 100}%`;
      }
      const overrun = panel.querySelector('[data-time="overrun"]');
      overrun.hidden = state.overrun === 0;
      write('overrun', `+${formatTiming(state.overrun)}`);
      overrun.title = `Over planned total by ${formatTiming(state.overrun)}`;
      panel.dataset.pace = state.pace.split(' / ')[0].toLowerCase().replace(' ', '-');
    } catch (error) {
      showError(error);
    }
  }

  function setupNotes(candidate) {
    const notes = candidate.document.querySelector('.speaker-controls-notes');
    const label = notes?.querySelector('.label') ?? notes?.querySelector('.hve-notes-header');
    const value = notes?.querySelector('.value');
    if (!label || !value) throw new Error('The speaker view needs a notes heading and content container.');
    const header = candidate.document.createElement('header');
    header.className = 'hve-notes-header';
    header.tabIndex = 0;
    header.setAttribute('role', 'region');
    header.setAttribute('aria-label', 'Speaker notes controls');
    header.innerHTML = speakerNotesMarkup();
    label.replaceWith(header);
    notes.classList.add('hve-speaker-notes');
    notesHeader = header;
    const select = header.querySelector('select');
    function applyFont() {
      value.style.fontSize = `${noteSize}px`;
      value.style.fontFamily = NOTE_FONTS[noteFont].family;
      select.value = noteFont;
      output(header, '[data-notes-size]', `${noteSize} px`);
      header.querySelector('[data-notes="decrease"]').disabled = noteSize === MIN_NOTE_SIZE;
      header.querySelector('[data-notes="increase"]').disabled = noteSize === MAX_NOTE_SIZE;
    }
    header.addEventListener('click', event => {
      const action = event.target.closest('button[data-notes]')?.dataset.notes;
      if (!action) return;
      noteSize = Math.max(MIN_NOTE_SIZE, Math.min(MAX_NOTE_SIZE,
        noteSize + (action === 'increase' ? NOTE_SIZE_STEP : -NOTE_SIZE_STEP)));
      applyFont();
    });
    select.addEventListener('change', () => {
      if (!Object.hasOwn(NOTE_FONTS, select.value)) {
        showError(new Error(`Unknown note font: ${select.value}`));
        return;
      }
      noteFont = select.value;
      applyFont();
    });
    header.addEventListener('keydown', event => {
      if (event.target === header || event.target.closest('button, select')) event.stopPropagation();
    });
    applyFont();
  }

  function attach(candidate) {
    if (!candidate || candidate.closed || candidate.opener !== view) return;
    if (popup && !popup.closed && popup !== candidate) return;
    const native = candidate.document.querySelector('.speaker-controls-time');
    if (!native || native === panel) return;
    popup = candidate;
    notesHeader = null;
    panel = candidate.document.createElement('section');
    panel.className = 'speaker-controls-time hve-speaker-timing';
    panel.setAttribute('aria-label', 'Presentation timing');
    panel.innerHTML = speakerTimingMarkup();
    native.replaceWith(panel);
    const stylesheet = candidate.document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.href = new URL('./speaker-timing.css', view.location.href).href;
    candidate.document.head.append(stylesheet);
    panel.addEventListener('click', event => {
      const action = event.target.closest('button[data-timer]')?.dataset.timer;
      if (!action) return;
      if (action === 'reset') {
        timer.reset();
        entered = 0;
      }
      else if (timer.paused) timer.resume();
      else timer.pause();
      render();
    });
    panel.addEventListener('keydown', event => {
      if (event.target.closest('button, .hve-total-track')) event.stopPropagation();
    });
    failed = false;
    try {
      setupNotes(candidate);
      setupSpeakerPreviewResize(candidate);
      schedule = createSchedule(deck.getSlides());
      timer.start();
      render();
    } catch (error) {
      showError(error);
    }
  }

  function onMessage(event) {
    if (event.origin !== view.location.origin || typeof event.data !== 'string') return;
    let data;
    try { data = JSON.parse(event.data); } catch { return; } // Other same-origin applications may send plain text.
    if (data?.namespace !== 'reveal-notes' || !['connected', 'heartbeat'].includes(data.type)) return;
    attach(event.source);
  }
  view.addEventListener('message', onMessage);
  deck.on('slidechanged', render);
  const interval = view.setInterval(render, 250);
  view.addEventListener('pagehide', event => {
    if (!event.persisted) view.clearInterval(interval);
  });
  return { timer, attach, render };
}

export function trackRelativeWindowPosition(
  sourceWindow,
  speakerWindow,
  schedule = setInterval,
  cancel = clearInterval,
) {
  const offsetX = speakerWindow.screenX - sourceWindow.screenX;
  const offsetY = speakerWindow.screenY - sourceWindow.screenY;
  let lastX = sourceWindow.screenX;
  let lastY = sourceWindow.screenY;

  // Window movement has no broadly supported event, so check the position at a low rate.
  const timer = schedule(() => {
    if (sourceWindow.closed || speakerWindow.closed) {
      cancel(timer);
      return;
    }

    const currentX = sourceWindow.screenX;
    const currentY = sourceWindow.screenY;
    if (currentX === lastX && currentY === lastY) return;

    speakerWindow.moveTo(currentX + offsetX, currentY + offsetY);
    lastX = currentX;
    lastY = currentY;
  }, 100);

  return () => cancel(timer);
}
