/**
 * Presentation tools for the HVE Reveal deck: laser pointer, coloured boxes, arrows, freehand, undo, and clear.
 * Parameters: `setupAnnotations(deck, toolbar)` takes the initialized Reveal instance and shared toolbar.
 * Usage: L laser, R box, A arrow, D freehand, Ctrl+Z undo, X clear, Esc leaves the tools.
 * Marks clear on slide change.
 */

const SLIDE_WIDTH = 1280;
const SLIDE_HEIGHT = 720;
const SVG_NS = 'http://www.w3.org/2000/svg';
const MIN_MARK_SIZE = 4;

export const ANNOTATION_TOOLS = [
  { id: 'laser', label: 'Laser pointer', key: 'L', keyCode: 76 },
  { id: 'rectangle', label: 'Draw box', key: 'R', keyCode: 82 },
  { id: 'arrow', label: 'Draw arrow', key: 'A', keyCode: 65 },
  { id: 'draw', label: 'Draw freehand', key: 'D', keyCode: 68 },
];

export const ANNOTATION_COLOURS = [
  { label: 'Red', value: '#e00000' },
  { label: 'Orange', value: '#f97316' },
  { label: 'Yellow', value: '#facc15' },
  { label: 'Green', value: '#16a34a' },
  { label: 'Cyan', value: '#06b6d4' },
  { label: 'Blue', value: '#2563eb' },
  { label: 'Purple', value: '#9333ea' },
  { label: 'Pink', value: '#ec4899' },
  { label: 'Brown', value: '#92400e' },
  { label: 'Black', value: '#111111' },
  { label: 'Grey', value: '#6b7280' },
  { label: 'White', value: '#ffffff' },
];

export const ANNOTATION_WIDTHS = [
  { label: 'Thin', value: 3 },
  { label: 'Medium', value: 6 },
  { label: 'Thick', value: 10 },
];
export const DEFAULT_ANNOTATION_WIDTH = 6;

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

/** Draw a shaft and open arrowhead pointing from the drag origin to its endpoint. */
export function arrowPath(start, end) {
  const angle = Math.atan2(end.y - start.y, end.x - start.x);
  const head = Math.min(24, Math.hypot(end.x - start.x, end.y - start.y) * .4);
  const point = value => `${round(value.x)} ${round(value.y)}`;
  const wing = offset => ({
    x: end.x - head * Math.cos(angle + offset),
    y: end.y - head * Math.sin(angle + offset),
  });
  return `M ${point(start)} L ${point(end)} M ${point(wing(-Math.PI / 6))}`
    + ` L ${point(end)} L ${point(wing(Math.PI / 6))}`;
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

export function setupAnnotations(deck, toolbar) {
  if (deck.isPrintView()) return null;

  const reveal = deck.getRevealElement();
  const layer = createLayer();
  const status = document.createElement('p');
  status.className = 'annotation-status';
  status.setAttribute('role', 'status');
  const marks = layer.querySelector('.annotation-marks');
  const laser = layer.querySelector('.laser-point');
  const toolButtons = [...toolbar.querySelectorAll('[data-annotation-tool]')];
  const commandButtons = [...toolbar.querySelectorAll('[data-annotation-command]')];
  const colourButtons = [...toolbar.querySelectorAll('[data-annotation-colour]')];
  const colourTrigger = toolbar.querySelector('[data-player="colours"]');
  const widthButtons = [...toolbar.querySelectorAll('[data-annotation-width]')];
  const widthTrigger = toolbar.querySelector('[data-player="widths"]');

  let tool = null;
  let colour = ANNOTATION_COLOURS[0].value;
  let width = DEFAULT_ANNOTATION_WIDTH;
  let activeMark = null;
  let origin = null;
  let endpoint = null;

  deck.getSlidesElement().append(layer);
  document.body.append(status);

  const drawingPoint = event => {
    const point = toSlidePoint(event.clientX, event.clientY, layer.getBoundingClientRect());
    return { x: clamp(point.x, SLIDE_WIDTH), y: clamp(point.y, SLIDE_HEIGHT) };
  };

  function syncCommands() {
    const empty = marks.childElementCount === 0;
    for (const button of commandButtons) {
      button.setAttribute('aria-disabled', String(empty));
      button.disabled = empty;
    }
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
    status.textContent = tool ? `${ANNOTATION_TOOLS.find(item => item.id === tool).label} on` : 'Presentation tools off';
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
    if (!event.isPrimary || event.button !== 0 || !['rectangle', 'arrow', 'draw'].includes(tool)) return;
    event.preventDefault();
    event.stopPropagation();
    origin = drawingPoint(event);
    endpoint = origin;
    if (tool === 'rectangle') {
      activeMark = document.createElementNS(SVG_NS, 'rect');
      Object.entries({ x: origin.x, y: origin.y, width: 0, height: 0 }).forEach(([name, value]) => activeMark.setAttribute(name, value));
    } else {
      activeMark = document.createElementNS(SVG_NS, 'path');
      activeMark.setAttribute('d', `M ${round(origin.x)} ${round(origin.y)}`);
    }
    activeMark.setAttribute('class', `annotation-mark annotation-${tool}`);
    activeMark.style.stroke = colour;
    activeMark.style.strokeWidth = String(width);
    marks.append(activeMark);
    layer.setPointerCapture(event.pointerId);
  }

  function extendMark(event) {
    if (!activeMark) return;
    const point = drawingPoint(event);
    endpoint = point;
    if (activeMark.localName === 'rect') {
      const rect = normalizeRect(origin, point);
      Object.entries(rect).forEach(([name, value]) => activeMark.setAttribute(name, round(value)));
    } else if (activeMark.classList.contains('annotation-arrow')) {
      activeMark.setAttribute('d', arrowPath(origin, point));
    } else {
      activeMark.setAttribute('d', `${activeMark.getAttribute('d')} L ${round(point.x)} ${round(point.y)}`);
    }
  }

  function finishMark(event) {
    if (!activeMark) return;
    if (layer.hasPointerCapture(event.pointerId)) layer.releasePointerCapture(event.pointerId);
    const tooSmall = activeMark.classList.contains('annotation-arrow')
      ? Math.hypot(endpoint.x - origin.x, endpoint.y - origin.y) < MIN_MARK_SIZE
      : activeMark.localName === 'rect'
        ? activeMark.getAttribute('width') < MIN_MARK_SIZE && activeMark.getAttribute('height') < MIN_MARK_SIZE
        : !activeMark.getAttribute('d').includes('L');
    if (tooSmall) activeMark.remove();
    activeMark = null;
    origin = null;
    endpoint = null;
    syncCommands();
  }

  layer.addEventListener('pointerdown', startMark);
  layer.addEventListener('pointermove', extendMark);
  layer.addEventListener('pointerup', finishMark);
  layer.addEventListener('pointercancel', finishMark);
  // Drawing must not trigger Reveal's touch swipe navigation.
  for (const type of ['touchstart', 'touchmove', 'touchend']) layer.addEventListener(type, event => event.stopPropagation(), { passive: true });

  document.addEventListener('pointermove', event => {
    if (tool === 'laser') moveLaser(event);
  });
  document.documentElement.addEventListener('pointerleave', hideLaser);

  function selectColour(value) {
    const next = ANNOTATION_COLOURS.find(item => item.value === value);
    if (!next) {
      status.textContent = 'Unknown drawing colour. Select one of the listed colours.';
      console.error(status.textContent);
      return;
    }
    colour = next.value;
    colourTrigger.style.setProperty('--drawing-colour', colour);
    const label = `Drawing colour: ${next.label}`;
    colourTrigger.setAttribute('aria-label', label);
    colourTrigger.title = label;
    for (const button of colourButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.annotationColour === colour));
    }
    status.textContent = `${next.label} drawing colour selected`;
  }

  function selectWidth(value) {
    const next = ANNOTATION_WIDTHS.find(item => String(item.value) === value);
    if (!next) {
      status.textContent = 'Unknown line thickness. Select Thin, Medium, or Thick.';
      console.error(status.textContent);
      return;
    }
    width = next.value;
    const label = `Line thickness: ${next.label}`;
    widthTrigger.setAttribute('aria-label', label);
    widthTrigger.title = label;
    for (const button of widthButtons) {
      button.setAttribute('aria-pressed', String(button.dataset.annotationWidth === value));
    }
    status.textContent = `${next.label} line thickness selected`;
  }

  toolbar.addEventListener('click', event => {
    const button = event.target.closest('button');
    if (!button || !button.matches(
      '[data-annotation-tool], [data-annotation-command], [data-annotation-colour], [data-annotation-width]',
    )) return;
    const { annotationTool, annotationCommand, annotationColour, annotationWidth } = button.dataset;
    if (button.hasAttribute('data-annotation-colour')) selectColour(annotationColour);
    else if (button.hasAttribute('data-annotation-width')) selectWidth(annotationWidth);
    else if (annotationTool) setTool(annotationTool);
    else if (button.getAttribute('aria-disabled') !== 'true') (annotationCommand === 'undo' ? undo : clear)();
    // A mouse click must not keep the toolbar open. Keyboard use (detail 0) keeps focus.
    if (event.detail > 0) button.blur();
  });

  // Capture undo before Reveal. The player owns Escape ordering.
  document.addEventListener('keydown', event => {
    const editable = event.target.closest?.('input, textarea, select, button, a, summary, [contenteditable]') || event.target.isContentEditable;
    if (editable || deck.isOverlayOpen() || deck.isPaused() || deck.isOverview()) return;
    const isUndo = (event.ctrlKey || event.metaKey) && !event.shiftKey && !event.altKey && event.key.toLowerCase() === 'z';
    if (isUndo && !activeMark && marks.childElementCount > 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
      undo();
    }
  }, true);

  const keyboardReady = () => !deck.isOverview() && !deck.isPaused();
  for (const { id, label, key, keyCode } of ANNOTATION_TOOLS) {
    deck.addKeyBinding({ keyCode, key, description: label }, () => {
      if (!keyboardReady()) return;
      setTool(id);
      toolbar.dispatchEvent(new Event('presenter-reveal'));
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

  syncCommands();
  return { reset, hasActive: () => Boolean(tool || marks.childElementCount > 0) };
}
