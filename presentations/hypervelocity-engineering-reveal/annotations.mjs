/**
 * Presentation tools for the HVE Reveal deck: laser pointer, red box, red freehand, undo, and clear.
 * Parameters: `setupAnnotations(deck)` takes the initialized Reveal instance.
 * Usage: L laser, R box, D freehand, Ctrl+Z undo, X clear, Esc leaves the tools. Marks clear on slide change.
 */

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;
const SVG_NS = 'http://www.w3.org/2000/svg';
const EDGE_ZONE = 96;
const HIDE_DELAY = 1800;
const MIN_MARK_SIZE = 4;

const ICONS = {
  laser: '<circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3m-17-7 2 2m12 12 2 2m0-16-2 2M7 17l-2 2"/>',
  rectangle: '<rect x="4" y="5" width="16" height="14" rx="1"/>',
  draw: '<path d="m4 17 4-1 9-9-3-3-9 9-1 4Zm8-11 3 3"/>',
  undo: '<path d="M9 14 4 9l5-5"/><path d="M4 9h9a7 7 0 0 1 0 14h-2"/>',
  clear: '<path d="M4 7h16m-10 4v7m4-7v7M6 7l1 14h10l1-14M9 7V4h6v3"/>',
};

const TOOLS = [
  { id: 'laser', label: 'Laser pointer', key: 'L', keyCode: 76 },
  { id: 'rectangle', label: 'Draw red box', key: 'R', keyCode: 82 },
  { id: 'draw', label: 'Draw red freehand', key: 'D', keyCode: 68 },
];

/** Map a pointer position to 1280 by 720 slide units, whatever the display scale. */
export function toSlidePoint(clientX, clientY, bounds) {
  return {
    x: ((clientX - bounds.left) / bounds.width) * SLIDE_WIDTH,
    y: ((clientY - bounds.top) / bounds.height) * SLIDE_HEIGHT,
  };
}

/** Build a rectangle from two opposite corners, in any drag direction. */
export function normalizeRect(a, b) {
  return { x: Math.min(a.x, b.x), y: Math.min(a.y, b.y), width: Math.abs(a.x - b.x), height: Math.abs(a.y - b.y) };
}

const clamp = (value, max) => Math.min(Math.max(value, 0), max);
const round = value => Math.round(value * 10) / 10;

function toolbarButton({ attributes, label, shortcut, ariaShortcut, icon }) {
  return `<button type="button" ${attributes} title="${label} (${shortcut})" aria-label="${label} (${shortcut})" aria-keyshortcuts="${ariaShortcut}">
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${icon}</svg></button>`;
}

function createToolbar() {
  const toolButtons = TOOLS.map(({ id, label, key }) => toolbarButton({
    attributes: `data-annotation-tool="${id}" aria-pressed="false"`, label, shortcut: key, ariaShortcut: key, icon: ICONS[id],
  }));
  const commandButtons = [
    { attributes: 'data-annotation-command="undo" aria-disabled="true"', label: 'Undo last drawing', shortcut: 'Ctrl+Z', ariaShortcut: 'Control+Z', icon: ICONS.undo },
    { attributes: 'data-annotation-command="clear" aria-disabled="true"', label: 'Clear all drawings', shortcut: 'X', ariaShortcut: 'X', icon: ICONS.clear },
  ].map(toolbarButton);
  const toolbar = document.createElement('div');
  toolbar.className = 'annotation-toolbar';
  toolbar.setAttribute('role', 'toolbar');
  toolbar.setAttribute('aria-label', 'Presentation tools');
  toolbar.innerHTML = `${toolButtons.join('')}<span class="annotation-divider" aria-hidden="true"></span>${commandButtons.join('')}`;
  return toolbar;
}

function createLayer() {
  const layer = document.createElementNS(SVG_NS, 'svg');
  layer.setAttribute('class', 'annotation-layer');
  layer.setAttribute('viewBox', `0 0 ${SLIDE_WIDTH} ${SLIDE_HEIGHT}`);
  layer.setAttribute('preserveAspectRatio', 'none');
  layer.setAttribute('aria-hidden', 'true');
  layer.dataset.tool = 'none';
  layer.innerHTML = '<g class="annotation-marks"></g><circle class="laser-point" r="13" visibility="hidden"></circle>';
  return layer;
}

export function setupAnnotations(deck) {
  if (deck.isPrintView()) return null;

  const reveal = deck.getRevealElement();
  const layer = createLayer();
  const toolbar = createToolbar();
  const status = document.createElement('p');
  status.className = 'annotation-status';
  status.setAttribute('role', 'status');
  const marks = layer.querySelector('.annotation-marks');
  const laser = layer.querySelector('.laser-point');
  const toolButtons = [...toolbar.querySelectorAll('[data-annotation-tool]')];
  const commandButtons = [...toolbar.querySelectorAll('[data-annotation-command]')];

  let tool = null;
  let activeMark = null;
  let origin = null;
  let hideTimer = 0;

  deck.getSlidesElement().append(layer);
  document.body.append(toolbar, status);

  const drawingPoint = event => {
    const point = toSlidePoint(event.clientX, event.clientY, layer.getBoundingClientRect());
    return { x: clamp(point.x, SLIDE_WIDTH), y: clamp(point.y, SLIDE_HEIGHT) };
  };

  function syncCommands() {
    const empty = marks.childElementCount === 0;
    for (const button of commandButtons) button.setAttribute('aria-disabled', String(empty));
  }

  function showToolbar(duration = HIDE_DELAY) {
    clearTimeout(hideTimer);
    toolbar.classList.add('is-visible');
    hideTimer = setTimeout(() => toolbar.classList.remove('is-visible'), duration);
  }

  function hideLaser() {
    laser.setAttribute('visibility', 'hidden');
  }

  function setTool(next) {
    tool = tool === next ? null : next;
    layer.dataset.tool = tool ?? 'none';
    reveal.dataset.annotationTool = tool ?? 'none';
    for (const button of toolButtons) button.setAttribute('aria-pressed', String(button.dataset.annotationTool === tool));
    hideLaser();
    status.textContent = tool ? `${TOOLS.find(item => item.id === tool).label} on` : 'Presentation tools off';
  }

  function undo() {
    if (activeMark || !marks.lastElementChild) return false;
    marks.lastElementChild.remove();
    syncCommands();
    return true;
  }

  function clear() {
    activeMark = null;
    marks.replaceChildren();
    syncCommands();
  }

  function reset() {
    if (tool) setTool(tool);
    clear();
  }

  function moveLaser(event) {
    const bounds = layer.getBoundingClientRect();
    const inside = event.clientX >= bounds.left && event.clientX <= bounds.right
      && event.clientY >= bounds.top && event.clientY <= bounds.bottom;
    if (!inside) {
      hideLaser();
      return;
    }
    const point = toSlidePoint(event.clientX, event.clientY, bounds);
    laser.setAttribute('cx', round(point.x));
    laser.setAttribute('cy', round(point.y));
    laser.setAttribute('visibility', 'visible');
  }

  function startMark(event) {
    if (!event.isPrimary || event.button !== 0 || (tool !== 'rectangle' && tool !== 'draw')) return;
    event.preventDefault();
    event.stopPropagation();
    origin = drawingPoint(event);
    if (tool === 'rectangle') {
      activeMark = document.createElementNS(SVG_NS, 'rect');
      Object.entries({ x: origin.x, y: origin.y, width: 0, height: 0 }).forEach(([name, value]) => activeMark.setAttribute(name, value));
    } else {
      activeMark = document.createElementNS(SVG_NS, 'path');
      activeMark.setAttribute('d', `M ${round(origin.x)} ${round(origin.y)}`);
    }
    activeMark.setAttribute('class', `annotation-mark annotation-${tool}`);
    marks.append(activeMark);
    layer.setPointerCapture(event.pointerId);
  }

  function extendMark(event) {
    if (!activeMark) return;
    const point = drawingPoint(event);
    if (activeMark.localName === 'rect') {
      const rect = normalizeRect(origin, point);
      Object.entries(rect).forEach(([name, value]) => activeMark.setAttribute(name, round(value)));
    } else {
      activeMark.setAttribute('d', `${activeMark.getAttribute('d')} L ${round(point.x)} ${round(point.y)}`);
    }
  }

  function finishMark(event) {
    if (!activeMark) return;
    if (layer.hasPointerCapture(event.pointerId)) layer.releasePointerCapture(event.pointerId);
    const tooSmall = activeMark.localName === 'rect'
      ? activeMark.getAttribute('width') < MIN_MARK_SIZE && activeMark.getAttribute('height') < MIN_MARK_SIZE
      : !activeMark.getAttribute('d').includes('L');
    if (tooSmall) activeMark.remove();
    activeMark = null;
    origin = null;
    syncCommands();
  }

  layer.addEventListener('pointerdown', startMark);
  layer.addEventListener('pointermove', extendMark);
  layer.addEventListener('pointerup', finishMark);
  layer.addEventListener('pointercancel', finishMark);
  // Drawing must not trigger Reveal's touch swipe navigation.
  for (const type of ['touchstart', 'touchmove', 'touchend']) layer.addEventListener(type, event => event.stopPropagation(), { passive: true });

  document.addEventListener('pointermove', event => {
    if (event.clientY <= EDGE_ZONE) showToolbar();
    if (tool === 'laser') moveLaser(event);
  });
  document.documentElement.addEventListener('pointerleave', hideLaser);
  toolbar.addEventListener('pointerenter', () => {
    clearTimeout(hideTimer);
    toolbar.classList.add('is-visible');
  });
  toolbar.addEventListener('pointerleave', () => showToolbar(HIDE_DELAY / 2));

  toolbar.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button) return;
    const { annotationTool, annotationCommand } = button.dataset;
    if (annotationTool) setTool(annotationTool);
    else if (button.getAttribute('aria-disabled') !== 'true') (annotationCommand === 'undo' ? undo : clear)();
    // A mouse click must not keep the toolbar open. Keyboard use (detail 0) keeps focus.
    if (event.detail > 0) button.blur();
  });

  // Capture phase, so Reveal never sees these keys: Ctrl+Z is undo and Esc leaves the tools before it opens the overview.
  document.addEventListener('keydown', event => {
    const editable = event.target.closest?.('input, textarea, select, [contenteditable]') || event.target.isContentEditable;
    if (editable || deck.isOverlayOpen() || deck.isPaused() || deck.isOverview()) return;
    const isUndo = (event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'z';
    if (isUndo && !activeMark && marks.childElementCount > 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      undo();
    } else if (event.key === 'Escape' && (tool || marks.childElementCount > 0)) {
      event.preventDefault();
      event.stopImmediatePropagation();
      reset();
    }
  }, true);

  const keyboardReady = () => !deck.isOverview() && !deck.isPaused();
  for (const { id, label, key, keyCode } of TOOLS) {
    deck.addKeyBinding({ keyCode, key, description: label }, () => {
      if (!keyboardReady()) return;
      setTool(id);
      showToolbar();
    });
  }
  deck.addKeyBinding({ keyCode: 88, key: 'X', description: 'Clear all drawings' }, () => keyboardReady() && clear());
  deck.registerKeyboardShortcut('Ctrl + Z', 'Undo last drawing');

  // L now picks the laser, so the help table must not list it as a navigation key.
  deck.on('showhelp', () => {
    for (const cell of document.querySelectorAll('.r-overlay-help-content td:first-child')) {
      if (cell.textContent.replace(/\s+/g, '') === '\u2192,L') cell.textContent = '\u2192';
    }
  });

  deck.on('slidechanged', clear);
  deck.on('overviewshown', reset);

  return { setTool, undo, clear, reset };
}
