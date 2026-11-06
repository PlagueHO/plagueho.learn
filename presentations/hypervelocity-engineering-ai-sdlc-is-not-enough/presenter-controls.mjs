/**
 * Shared bottom player for the standalone HVE deck.
 * Parameters: initialized Reveal instance and speaker-note open/close callbacks.
 * Usage: setupPresenterControls(deck, notes) after the motion modules are initialized.
 */
import {
  ANNOTATION_COLOURS, ANNOTATION_TOOLS, ANNOTATION_WIDTHS, DEFAULT_ANNOTATION_WIDTH, setupAnnotations,
} from './annotations.mjs';

const THEMES = ['flowing-blend', 'flowing-dark'];
const HIDE_DELAY = 1800;
const ICONS = {
  sections: '<path d="M4 5h16M4 12h16M4 19h16"/>',
  previous: '<path d="m15 5-7 7 7 7"/>',
  next: '<path d="m9 5 7 7-7 7"/>',
  overview: '<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  notes: '<path d="M5 3h14v18H5zM8 7h8M8 11h8M8 15h5"/>',
  pause: '<path d="M8 5v14M16 5v14"/>',
  zoom: '<circle cx="10" cy="10" r="6"/><path d="m15 15 6 6M7 10h6M10 7v6"/>',
  laser: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-17-7 2 2m12 12 2 2m0-16-2 2M7 17l-2 2"/>',
  rectangle: '<rect x="4" y="5" width="16" height="14" rx="1"/>',
  arrow: '<path d="M5 19 19 5M7 5h12v12"/>',
  draw: '<path d="m4 17 4-1 9-9-3-3-9 9-1 4Zm8-11 3 3"/>',
  colours: '<circle class="presenter-current-colour" cx="12" cy="12" r="9"/>',
  widths: '<path d="M4 5h16" style="stroke-width:1"/><path d="M4 12h16" style="stroke-width:3"/><path d="M4 19h16" style="stroke-width:5"/>',
  undo: '<path d="M9 14 4 9l5-5M4 9h9a7 7 0 0 1 0 14h-2"/>',
  clear: '<path d="M4 7h16m-10 4v7m4-7v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
  keys: '<rect x="2" y="5" width="20" height="14" rx="3"/><path d="M6 9h1m4 0h1m4 0h1M6 13h1m4 0h1m4 0h1M7 16h10"/>',
  present: '<path d="M3 4h18v13H3zM12 17v4m-5 0h10"/><path d="m10 7 5 3-5 3z"/>',
  fullscreen: '<path d="M3 9V3h6m6 0h6v6m0 6v6h-6m-6 0H3v-6"/>',
};

function button(action, label, attributes = '') {
  return `<button type="button" data-player="${action}" aria-label="${label}" title="${label}" ${attributes}>
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${ICONS[action]}</svg></button>`;
}

export function presenterMarkup() {
  const drawing = ANNOTATION_TOOLS.map(({ id, label, key }) =>
    button(id, `${label} (${key})`,
      `data-annotation-tool="${id}" aria-pressed="false" aria-keyshortcuts="${key}"`)).join('');
  const colours = ANNOTATION_COLOURS.map(({ label, value }) =>
    `<button type="button" class="presenter-swatch" data-annotation-colour="${value}"
      aria-label="${label}" title="${label}" aria-pressed="${value === ANNOTATION_COLOURS[0].value}"
      style="--drawing-colour: ${value}; --swatch-ink: ${['Orange', 'Yellow', 'Cyan', 'White'].includes(label) ? '#111111' : '#ffffff'}">
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 12 4 4 8-8"/></svg>
    </button>`).join('');
  const widths = ANNOTATION_WIDTHS.map(({ label, value }) =>
    `<button type="button" class="presenter-width-option" data-annotation-width="${value}"
      aria-label="${label} line thickness" title="${label} line thickness"
      aria-pressed="${value === DEFAULT_ANNOTATION_WIDTH}">
      <svg viewBox="0 0 48 24" aria-hidden="true" focusable="false">
        <path d="M5 12h38" style="stroke-width:${value}"/></svg>
      <span>${label}</span>
      <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m6 12 4 4 8-8"/></svg>
    </button>`).join('');
  return `<div class="presenter-group" role="group" aria-label="Navigation">
      ${button('sections', 'Presentation sections', 'aria-expanded="false" aria-controls="presenter-sections"')}
      ${button('previous', 'Previous slide or phase')}
      <output class="presenter-position" aria-label="Slide position"></output>
      ${button('next', 'Next slide or phase')}
      ${button('overview', 'Slide overview (Escape)', 'aria-pressed="false"')}
    </div>
    <div class="presenter-group" role="group" aria-label="Presenting">
      ${button('notes', 'Speaker notes (S)')}
      ${button('pause', 'Pause for questions (B)', 'aria-pressed="false"')}
      ${button('zoom', 'Zoom 2x (Z)', 'aria-pressed="false"')}
    </div>
    <div class="presenter-group" role="group" aria-label="Drawing">
      ${drawing}
      <div class="presenter-drawing-picker">
        ${button('colours', 'Drawing colour: Red',
          `class="presenter-colour" aria-expanded="false" aria-controls="presenter-colours"
          style="--drawing-colour: ${ANNOTATION_COLOURS[0].value}"`)}
        <div id="presenter-colours" class="presenter-popover presenter-palette" role="group"
          aria-label="Drawing colour" hidden>${colours}</div>
      </div>
      <div class="presenter-drawing-picker">
        ${button('widths', 'Line thickness: Medium',
          'aria-expanded="false" aria-controls="presenter-widths"')}
        <div id="presenter-widths" class="presenter-popover presenter-widths" role="group"
          aria-label="Line thickness" hidden>${widths}</div>
      </div>
      ${button('undo', 'Undo last drawing (Ctrl+Z)', 'data-annotation-command="undo" aria-disabled="true" disabled')}
      ${button('clear', 'Clear drawings (X)', 'data-annotation-command="clear" aria-disabled="true" disabled')}
    </div>
    <div class="presenter-group presenter-motion" role="group" aria-label="Slide motion"></div>
    <div class="presenter-group" role="group" aria-label="Settings">
      <label class="presenter-theme"><span>Theme</span><select aria-label="Presentation theme">
        <option value="flowing-blend">Flowing blend</option><option value="flowing-dark">Flowing dark</option>
      </select></label>
      ${button('keys', 'Keyboard shortcuts', 'aria-expanded="false" aria-controls="presenter-keys"')}
      ${button('present', 'Present mode (P)', 'aria-pressed="false"')}
      ${button('fullscreen', 'Fullscreen (F)', 'aria-pressed="false"')}
    </div>
    <nav id="presenter-sections" class="presenter-popover" aria-label="Presentation sections" hidden>
      <a href="#/hve">Introduction to HVE</a>
      <a href="#/deep-dive">Diving deeper into HVE-Core</a>
      <a href="#/demo-install">Demos</a>
    </nav>
    <section id="presenter-keys" class="presenter-popover" aria-label="Keyboard shortcuts" hidden>
      <strong>Keyboard shortcuts</strong>
      <p>Arrows / Space / Page Up / Page Down: slide or phase<br>Home / End: first / last slide<br>
      S: notes · B: pause / resume · P: Present mode · F: fullscreen<br>
      Z: zoom 2x · L: laser · R: box · A: arrow · D: draw<br>Ctrl+Z / Cmd+Z: undo · X: clear<br>
      Escape: close panel, tools, zoom, Present mode, then overview<br>Tab: reset zoom and move focus</p>
    </section>`;
}

export function isInteractive(target) {
  return Boolean(target?.closest?.('input, textarea, select, button, a, summary, [contenteditable], [role="button"]')
    || target?.isContentEditable);
}

export function keyboardAllowed(event) {
  const playerEscape = event.key === 'Escape'
    && Boolean(event.target?.closest?.('.presenter-toolbar button, .presenter-toolbar a'));
  return !event.ctrlKey && !event.metaKey && !event.altKey && (playerEscape || !isInteractive(event.target));
}

export function themeFromUrl(href) {
  const value = new URL(href).searchParams.get('theme');
  if (value === null) return 'flowing-blend';
  return THEMES.includes(value) ? value : null;
}

export function themeUrl(href, theme) {
  if (!THEMES.includes(theme)) throw new Error(`Unknown presentation theme: ${theme}`);
  const url = new URL(href);
  url.searchParams.set('theme', theme);
  return `${url.pathname}${url.search}${url.hash}`;
}

export function zoomOffset(x, y, width, height) {
  return {
    x: -Math.max(0, Math.min(width, x)),
    y: -Math.max(0, Math.min(height, y)),
  };
}

export function navigationState(deck) {
  const routes = deck.availableRoutes();
  const fragments = deck.availableFragments();
  return {
    previous: Boolean(routes.left || routes.up || fragments.prev),
    next: Boolean(routes.right || routes.down || fragments.next),
  };
}

export function dismissPresenterState({ closePopover, closeNotes, annotations, zoomed, resetZoom, presenting, exitPresent }) {
  if (closePopover() || closeNotes()) return true;
  if (annotations.hasActive()) annotations.reset();
  else if (zoomed) resetZoom();
  else if (presenting) exitPresent();
  else return false;
  return true;
}

export function observeToolbarLayout(deck, toolbar) {
  let height = -1;
  let frame = null;
  function scheduleLayout() {
    if (frame !== null) return;
    frame = requestAnimationFrame(() => {
      frame = null;
      deck.layout();
    });
  }
  function measure() {
    const nextHeight = Math.ceil(toolbar.getBoundingClientRect().height);
    if (nextHeight === height) return;
    height = nextHeight;
    toolbar.ownerDocument.body.style.setProperty('--presenter-toolbar-height', `${height}px`);
    // Defer Reveal's writes until after observer delivery, and ignore unchanged heights.
    scheduleLayout();
  }
  new ResizeObserver(measure).observe(toolbar);
  measure();
  return scheduleLayout;
}

export function setupPresenterControls(deck, { openNotes, closeNotes }) {
  if (deck.isPrintView()) return null;
  const toolbar = document.createElement('div');
  toolbar.className = 'presenter-toolbar';
  toolbar.setAttribute('role', 'toolbar');
  toolbar.setAttribute('aria-label', 'Presentation controls');
  toolbar.innerHTML = presenterMarkup();
  document.body.append(toolbar);
  const notice = document.createElement('p');
  notice.className = 'presenter-notice';
  notice.setAttribute('role', 'status');
  notice.hidden = true;
  document.body.append(notice);
  const surface = document.createElement('div');
  surface.className = 'presenter-zoom-surface';
  const reveal = deck.getRevealElement();
  reveal.before(surface);
  surface.append(reveal);
  const annotations = setupAnnotations(deck, toolbar);
  const control = id => toolbar.querySelector(`[data-player="${id}"]`);
  const select = toolbar.querySelector('.presenter-theme select');
  const position = toolbar.querySelector('output');
  const motion = toolbar.querySelector('.presenter-motion');
  let presenting = false;
  let zoomed = false;
  let hideTimer;
  let pointerInside = false;
  let popover = null;
  let popoverTrigger = null;

  // Reparent the actual buttons after initialization; motion modules keep their state and listeners.
  for (const source of document.querySelectorAll('.chrome-bottom button')) {
    source.className = source.matches('[data-cadence-action="replay"], [data-amplification-action="replay"], [data-readiness-action="replay"]')
      ? 'presenter-motion-replay' : 'presenter-motion-pause';
    motion.append(source);
  }
  function syncMotionLabels() {
    for (const source of motion.querySelectorAll('button')) {
      source.setAttribute('aria-label', source.textContent);
      source.title = source.textContent;
    }
  }
  new MutationObserver(syncMotionLabels).observe(motion, { childList: true, subtree: true });
  syncMotionLabels();
  const scheduleLayout = observeToolbarLayout(deck, toolbar);

  function showNotice(message, error) {
    notice.hidden = false;
    notice.textContent = message;
    if (error) console.error(message, error);
  }

  function applyTheme() {
    const theme = themeFromUrl(window.location.href);
    if (!theme) {
      showNotice('Unknown theme. Select Flowing blend or Flowing dark to recover.');
      select.selectedIndex = -1;
      return;
    }
    document.documentElement.dataset.theme = theme;
    select.value = theme;
    notice.hidden = true;
    const startupNotice = document.querySelector('#startup-error');
    if (startupNotice.textContent.startsWith('Unknown theme.')) startupNotice.hidden = true;
  }
  applyTheme();
  select.addEventListener('change', () => {
    const current = new URL(window.location.href);
    current.hash = deck.getSlidePath();
    window.history.replaceState(window.history.state, '', current);
    window.history.pushState(window.history.state, '', themeUrl(current.href, select.value));
    applyTheme();
  });
  window.addEventListener('popstate', applyTheme);

  function revealToolbar() {
    clearTimeout(hideTimer);
    toolbar.classList.add('is-visible');
    hideTimer = setTimeout(() => {
      if (!pointerInside && !toolbar.contains(document.activeElement) && !popover) {
        toolbar.classList.remove('is-visible');
      }
    }, HIDE_DELAY);
  }
  function closePopover(restoreFocus = false) {
    if (!popover) return false;
    popover.hidden = true;
    popoverTrigger.setAttribute('aria-expanded', 'false');
    if (restoreFocus) popoverTrigger.focus();
    else if (popover.contains(document.activeElement)) document.activeElement.blur();
    popover = null;
    popoverTrigger = null;
    revealToolbar();
    return true;
  }
  function togglePopover(id) {
    const next = toolbar.querySelector(`#presenter-${id}`);
    const wasOpen = popover === next;
    closePopover();
    if (!wasOpen) {
      popover = next;
      popoverTrigger = control(id);
      next.hidden = false;
      popoverTrigger.setAttribute('aria-expanded', 'true');
      (next.querySelector('[aria-pressed="true"]') ?? next.querySelector('a'))?.focus();
    }
    revealToolbar();
  }
  function setZoom(value) {
    zoomed = value && !deck.isOverview() && !deck.isPaused();
    control('zoom').setAttribute('aria-pressed', String(zoomed));
    surface.style.transform = zoomed
      ? `translate(${-surface.clientWidth / 2}px, ${-surface.clientHeight / 2}px) scale(2)` : '';
  }
  function setPresent(value) {
    presenting = value;
    document.body.classList.toggle('is-presenting', value);
    control('present').setAttribute('aria-pressed', String(value));
    if (!value) setZoom(false);
    scheduleLayout();
    revealToolbar();
  }
  async function toggleFullscreen() {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else throw new Error('Fullscreen is not supported by this browser.');
    } catch (error) {
      showNotice('Fullscreen could not start or stop. Use the browser fullscreen control.', error);
    }
  }
  function sync() {
    const state = navigationState(deck);
    control('previous').disabled = !state.previous;
    control('next').disabled = !state.next;
    control('overview').setAttribute('aria-pressed', String(deck.isOverview()));
    control('pause').setAttribute('aria-pressed', String(deck.isPaused()));
    position.textContent = `${String(deck.getSlides().indexOf(deck.getCurrentSlide()) + 1).padStart(2, '0')} / ${deck.getTotalSlides()}`;
    for (const link of toolbar.querySelectorAll('#presenter-sections a')) {
      const current = deck.getCurrentSlide().dataset.part;
      const matches = link.hash === ({ leadership: '#/hve', 'deep-dive': '#/deep-dive', demos: '#/demo-install' })[current];
      if (matches) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
    const inactive = deck.isPaused() || deck.isOverview();
    for (const { id } of ANNOTATION_TOOLS) control(id).disabled = inactive;
    control('zoom').disabled = inactive;
    if (inactive) setZoom(false);
  }
  const actions = {
    previous: () => deck.prev(),
    next: () => deck.next(),
    overview: () => deck.toggleOverview(),
    notes: openNotes,
    pause: () => deck.togglePause(),
    zoom: () => setZoom(!zoomed),
    present: () => setPresent(!presenting),
    fullscreen: toggleFullscreen,
    sections: () => togglePopover('sections'),
    keys: () => togglePopover('keys'),
    colours: () => togglePopover('colours'),
    widths: () => togglePopover('widths'),
  };
  toolbar.addEventListener('click', event => {
    const target = event.target.closest('button');
    if (target && actions[target.dataset.player]) {
      actions[target.dataset.player]();
    }
    if (target && event.detail > 0) target.blur();
    if (event.target.closest('a')) closePopover();
    if (event.target.closest('[data-annotation-colour], [data-annotation-width]')) closePopover(event.detail === 0);
    revealToolbar();
  });
  toolbar.addEventListener('presenter-reveal', revealToolbar);
  toolbar.addEventListener('pointerenter', () => { pointerInside = true; revealToolbar(); });
  toolbar.addEventListener('pointerleave', () => { pointerInside = false; revealToolbar(); });
  toolbar.addEventListener('focusin', revealToolbar);
  toolbar.addEventListener('focusout', revealToolbar);
  toolbar.addEventListener('keydown', event => {
    if (!event.target.matches('button')) return;
    const picker = event.target.closest('.presenter-palette, .presenter-widths');
    const keys = picker ? ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Home', 'End']
      : ['ArrowLeft', 'ArrowRight', 'Home', 'End'];
    if (!keys.includes(event.key)) return;
    const buttons = picker ? [...picker.querySelectorAll('button:not(:disabled)')]
      : [...toolbar.querySelectorAll('button:not(:disabled)')]
        .filter(item => !item.closest('.presenter-popover') && item.getClientRects().length);
    const index = buttons.indexOf(event.target);
    const columns = picker?.classList.contains('presenter-palette') ? 4 : 1;
    const step = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -columns, ArrowDown: columns }[event.key];
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1
      : (index + step + buttons.length) % buttons.length;
    buttons[next]?.focus();
    event.preventDefault();
  });
  document.addEventListener('pointerdown', event => {
    if (event.clientY >= window.innerHeight - 96) revealToolbar();
    if (!toolbar.contains(event.target)) closePopover();
  }, true);
  document.addEventListener('pointermove', event => {
    if (event.clientY >= window.innerHeight - 96) revealToolbar();
    if (!zoomed || annotations.hasActive() || toolbar.contains(event.target)) return;
    const offset = zoomOffset(event.clientX, event.clientY, surface.clientWidth, surface.clientHeight);
    surface.style.transform = `translate(${offset.x}px, ${offset.y}px) scale(2)`;
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Tab') setZoom(false);
    if (event.key !== 'Escape') return;
    // Let native fields keep Escape, but allow it from the player's own controls.
    const playerControl = (toolbar.contains(event.target) && event.target.closest('button, a'))
      || event.target.closest?.('.notes-panel button');
    if (isInteractive(event.target) && !playerControl) return;
    const handled = dismissPresenterState({
      closePopover: () => closePopover(true), closeNotes, annotations, zoomed,
      resetZoom: () => setZoom(false), presenting, exitPresent: () => setPresent(false),
    });
    if (handled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  for (const [keyCode, key, description, handler] of [
    [80, 'P', 'Present mode', actions.present],
    [90, 'Z', 'Zoom 2x', actions.zoom],
    [70, 'F', 'Fullscreen', actions.fullscreen],
    [36, 'Home', 'First slide', () => deck.slide(0, 0, -1)],
    [35, 'End', 'Last slide', () => deck.slide(deck.getTotalSlides() - 1)],
  ]) deck.addKeyBinding({ keyCode, key, description }, handler);
  for (const event of ['slidechanged', 'fragmentshown', 'fragmenthidden', 'overviewshown', 'overviewhidden', 'paused', 'resumed']) {
    deck.on(event, sync);
  }
  deck.on('slidechanged', () => { setZoom(false); closePopover(); });
  window.addEventListener('resize', () => { setZoom(false); scheduleLayout(); });
  window.addEventListener('beforeprint', () => setZoom(false));
  document.addEventListener('fullscreenchange', () => {
    control('fullscreen').setAttribute('aria-pressed', String(Boolean(document.fullscreenElement)));
    setZoom(false);
  });
  sync();
}
