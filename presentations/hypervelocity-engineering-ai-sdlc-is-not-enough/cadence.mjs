/**
 * Run the approved three-phase loop comparison through native Reveal.js fragments.
 * Parameters: Reveal deck and optional browser window for lifecycle tests.
 * Usage: setupCadence(deck) after deck.initialize(); mergedSlideHash() preserves old slide links.
 */
const captions = [
  'Long build cycles shape planning, decisions, and handoffs.',
  'Implementation accelerates. The surrounding process keeps its old pace.',
  'Decision waits, review queues, and handoff overhead now set the pace.',
];
const keyPhrases = [
  'Long build cycles',
  'Implementation accelerates.',
  'Decision waits, review queues, and handoff overhead',
];
const mergedRoutes = new Map([
  ['#/ai-implementation', '#/handoffs/0'],
  ['#/outcome-waiting', '#/handoffs/1'],
]);

export function mergedSlideHash(hash) {
  return mergedRoutes.get(hash) ?? hash;
}

export function setupCadence(deck, view = window) {
  const document = view.document;
  const slide = document.querySelector('#handoffs');
  const figure = slide.querySelector('[data-cadence]');
  const caption = figure.querySelector('.phase-caption');
  const steps = [...figure.querySelectorAll('.cadence-step')];
  const replay = slide.querySelector('[data-cadence-action="replay"]');
  const pause = slide.querySelector('[data-cadence-action="pause"]');
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)');
  let phase = null;
  let entered = false;
  let printing = false;
  let running = false;
  let paused = false;
  let elapsed = 0;
  let lastTick = null;
  let frame = null;
  let rotations = [];
  let captionPhase = null;
  let captionCue = null;

  const staticView = () => reduced.matches || printing ||
    document.documentElement.classList.contains('print-pdf') || deck.isOverview();
  const active = () => running && entered && !paused && !document.hidden && !deck.isPaused() && !staticView();
  const fragmentPhase = () => Math.max(0, ...steps.filter(step => step.classList.contains('visible'))
    .map(step => Number(step.dataset.cadencePhase)));

  function showPhase(value) {
    figure.dataset.phase = String(value);
    const staticCaption = staticView() || deck.getCurrentSlide() !== slide;
    if (staticCaption) {
      captionCue?.cancel();
      captionCue = null;
    }
    if (captionPhase === value) return;
    const previous = captionPhase;
    captionPhase = value;
    const keyPhrase = document.createElement('strong');
    keyPhrase.textContent = keyPhrases[value];
    caption.replaceChildren(keyPhrase, document.createTextNode(captions[value].slice(keyPhrases[value].length)));
    captionCue?.cancel();
    captionCue = null;
    if (previous !== null && entered && !staticCaption && !document.hidden) {
      captionCue = caption.animate([{ opacity: .7 }, { opacity: 1 }], { duration: 260, easing: 'ease-out' });
    }
  }

  function syncMotion() {
    const playing = active();
    for (const animation of rotations) playing ? animation.play() : animation.pause();
    if (captionCue && !['finished', 'idle'].includes(captionCue.playState)) {
      playing ? captionCue.play() : captionCue.pause();
    }
    figure.classList.toggle('is-running', running && !staticView());
    figure.classList.toggle('is-paused', !playing);
    pause.disabled = !running;
    pause.textContent = paused ? 'Resume motion' : 'Pause motion';
    pause.setAttribute('aria-pressed', String(paused));
    if (!playing) {
      if (frame !== null) view.cancelAnimationFrame(frame);
      frame = null;
      lastTick = null;
    } else if (frame === null) {
      frame = view.requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    frame = null;
    if (!active()) {
      syncMotion();
      return;
    }
    if (lastTick !== null) elapsed += now - lastTick;
    lastTick = now;
    if (elapsed >= 6000) {
      running = false;
      syncMotion();
    } else {
      frame = view.requestAnimationFrame(tick);
    }
  }

  function begin() {
    if (frame !== null) view.cancelAnimationFrame(frame);
    frame = null;
    lastTick = null;
    elapsed = 0;
    paused = false;
    running = true;
    if (!rotations.length) {
      rotations = [...figure.querySelectorAll('.cycle-runner')].map(element => {
        const animation = element.animate(
          [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
          { duration: 6000, iterations: Infinity, easing: 'linear' },
        );
        animation.pause();
        return animation;
      });
    }
    rotations[1].updatePlaybackRate(phase === 0 ? 1 : 5);
    syncMotion();
  }

  function stop() {
    running = false;
    syncMotion();
    rotations.forEach(animation => animation.cancel());
    rotations = [];
    captionCue?.cancel();
    captionCue = null;
  }

  function render() {
    const current = deck.getCurrentSlide() === slide;
    const complete = staticView();
    // Disabled fragments avoid invisible extra navigation steps in static viewing modes.
    steps.forEach(step => step.classList.toggle('disabled', reduced.matches || printing ||
      document.documentElement.classList.contains('print-pdf')));
    figure.classList.toggle('is-static', complete || !current);
    replay.hidden = pause.hidden = complete || !current;
    if (!current) {
      entered = false;
      phase = null;
      stop();
      showPhase(2);
      return;
    }
    if (complete) {
      showPhase(2);
      syncMotion();
      return;
    }
    const nextPhase = fragmentPhase();
    const entering = !entered;
    const changed = phase !== nextPhase;
    entered = true;
    phase = nextPhase;
    if (entering) {
      // Establish the opening size before enabling the shrink transition.
      figure.classList.add('is-static');
      showPhase(phase);
      void figure.offsetWidth;
      figure.classList.remove('is-static');
    } else {
      showPhase(phase);
    }
    if (entering || changed) begin();
    else syncMotion();
  }

  replay.addEventListener('click', () => {
    if (staticView() || deck.getCurrentSlide() !== slide) return;
    rotations.forEach(animation => { animation.currentTime = 0; });
    begin();
  });
  pause.addEventListener('click', () => {
    paused = !paused;
    syncMotion();
  });
  for (const event of ['slidechanged', 'fragmentshown', 'fragmenthidden', 'overviewshown', 'overviewhidden']) {
    deck.on(event, render);
  }
  for (const event of ['paused', 'resumed']) deck.on(event, syncMotion);
  document.addEventListener('visibilitychange', syncMotion);
  reduced.addEventListener('change', render);
  view.addEventListener('beforeprint', () => { printing = true; render(); });
  view.addEventListener('afterprint', () => { printing = false; render(); });
  view.addEventListener('pagehide', stop);
  view.addEventListener('pageshow', event => { if (event.persisted) { entered = false; render(); } });
  render();
}
