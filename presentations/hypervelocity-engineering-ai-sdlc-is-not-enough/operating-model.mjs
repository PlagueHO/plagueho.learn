/**
 * Replace serial handoffs with a static circular learning loop through one native Reveal.js fragment.
 * Parameters: Reveal deck and optional browser window for lifecycle tests.
 * Usage: setupOperatingModel(deck) after deck.initialize(); static modes show both models.
 */
export function setupOperatingModel(deck, view = window) {
  const slide = view.document.querySelector('#hve-model');
  const figure = slide.querySelector('[data-operating-model]');
  const step = figure.querySelector('.model-step');
  const serial = figure.querySelector('.serial');
  const learning = figure.querySelector('.model-learning');
  const reduced = view.matchMedia('(prefers-reduced-motion: reduce)');
  let printing = false;
  let pageHidden = false;

  function render() {
    const staticMode = reduced.matches || printing || pageHidden ||
      view.document.documentElement.classList.contains('print-pdf');
    const complete = staticMode || deck.isOverview() || deck.getCurrentSlide() !== slide;
    const stage = complete ? 'complete' : step.classList.contains('visible') ? 'learning' : 'serial';
    step.classList.toggle('disabled', staticMode);
    figure.dataset.stage = stage;
    serial.setAttribute('aria-hidden', String(stage === 'learning'));
    learning.setAttribute('aria-hidden', String(stage === 'serial'));
  }

  for (const event of ['slidechanged', 'fragmentshown', 'fragmenthidden', 'overviewshown', 'overviewhidden']) {
    deck.on(event, render);
  }
  reduced.addEventListener('change', render);
  view.addEventListener('beforeprint', () => { printing = true; render(); });
  view.addEventListener('afterprint', () => { printing = false; render(); });
  view.addEventListener('pagehide', () => { pageHidden = true; render(); });
  view.addEventListener('pageshow', () => { pageHidden = false; render(); });
  render();
}
