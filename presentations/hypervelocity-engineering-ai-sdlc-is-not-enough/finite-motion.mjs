/**
 * Run a bounded slide sequence with shared pause, replay, and static viewing states.
 * Parameters: Reveal deck, browser window, and slide/figure/controls/duration/paint settings.
 * Usage: setupFiniteMotion(deck, view, settings) after deck.initialize().
 */
export function moveMotionToken(token, path, length, progress) {
  token.style.opacity = progress === null ? '0' : '1';
  if (progress === null) return;
  const point = path.getPointAtLength(length * progress);
  token.style.transform = `translate(${point.x}px, ${point.y}px)`;
}

export function setupFiniteMotion(deck, view, { slide, figure, controls, duration, paint }) {
  const document = view.document;
  const replay = slide.querySelector(`[data-${controls}-action="replay"]`);
  const pause = slide.querySelector(`[data-${controls}-action="pause"]`);
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)');
  let entered = false;
  let running = false;
  let paused = false;
  let printing = false;
  let elapsed = 0;
  let lastTick = null;
  let frame = null;

  const staticView = () => reduced.matches || printing ||
    document.documentElement.classList.contains('print-pdf') || deck.isOverview();
  const active = () => entered && running && !paused && !document.hidden && !deck.isPaused() && !staticView();

  function cancelFrame() {
    if (frame !== null) view.cancelAnimationFrame(frame);
    frame = null;
    lastTick = null;
  }

  function syncMotion() {
    const playing = active();
    figure.classList.toggle('is-running', playing);
    pause.disabled = !running;
    pause.textContent = paused ? 'Resume motion' : 'Pause motion';
    pause.setAttribute('aria-pressed', String(paused));
    if (!playing) cancelFrame();
    else if (frame === null) frame = view.requestAnimationFrame(tick);
  }

  function tick(now) {
    frame = null;
    if (!active()) {
      syncMotion();
      return;
    }
    if (lastTick !== null) elapsed = Math.min(duration, elapsed + now - lastTick);
    lastTick = now;
    paint(elapsed);
    if (elapsed >= duration) {
      running = false;
      syncMotion();
    } else {
      frame = view.requestAnimationFrame(tick);
    }
  }

  function begin() {
    cancelFrame();
    elapsed = 0;
    paused = false;
    running = true;
    paint(0);
    syncMotion();
  }

  function render() {
    const current = deck.getCurrentSlide() === slide;
    const complete = staticView();
    figure.classList.toggle('is-static', complete || !current);
    replay.hidden = pause.hidden = complete || !current;
    if (!current) {
      entered = false;
      running = false;
      paint(duration);
      syncMotion();
    } else if (complete) {
      paint(duration);
      syncMotion();
    } else if (!entered) {
      entered = true;
      begin();
    } else {
      paint(elapsed);
      syncMotion();
    }
  }

  replay.addEventListener('click', () => {
    if (!staticView() && deck.getCurrentSlide() === slide) begin();
  });
  pause.addEventListener('click', () => {
    if (!running || staticView() || deck.getCurrentSlide() !== slide) return;
    paused = !paused;
    syncMotion();
  });
  for (const event of ['slidechanged', 'overviewshown', 'overviewhidden']) deck.on(event, render);
  for (const event of ['paused', 'resumed']) deck.on(event, syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  reduced.addEventListener('change', render);
  view.addEventListener('beforeprint', () => { printing = true; render(); });
  view.addEventListener('afterprint', () => { printing = false; render(); });
  view.addEventListener('pagehide', () => {
    entered = false;
    running = false;
    paint(duration);
    syncMotion();
  });
  view.addEventListener('pageshow', event => { if (event.persisted) render(); });
  render();
}
