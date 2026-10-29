/**
 * Reveal.js initialization and section navigation.
 * Parameters: browser URL; append ?print-pdf before the hash for PDF layout.
 * Usage: load the built index.html from a local or static HTTP server.
 */
import Reveal from './vendor/reveal.mjs';
import Notes from './vendor/plugin/notes.mjs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const deck = new Reveal(document.querySelector('.reveal'), {
  width: 1280,
  height: 720,
  margin: 0.06,
  center: false,
  hash: true,
  history: true,
  controls: true,
  controlsTutorial: false,
  progress: true,
  slideNumber: 'c/t',
  transition: reducedMotion ? 'none' : 'fade',
  transitionSpeed: 'fast',
  backgroundTransition: 'none',
  autoAnimate: false,
  pdfSeparateFragments: false,
  pdfMaxPagesPerSlide: 1,
  plugins: [Notes],
});

await deck.initialize();
document.body.classList.add('deck-ready');

const sectionLabels = {
  leadership: 'Leadership · 30 minutes',
  'deep-dive': 'Optional HVE-Core · 30 minutes',
  demos: 'Demo support · Public teaching scenario',
};

function updateSection() {
  const part = deck.getCurrentSlide().dataset.part;
  document.querySelector('#part-label').textContent = sectionLabels[part];
  for (const link of document.querySelectorAll('[data-part-link]')) {
    if (link.dataset.partLink === part) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
}

deck.on('slidechanged', updateSection);
updateSection();

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  switch (button.dataset.action) {
    case 'overview': deck.toggleOverview(); break;
    case 'notes': deck.getPlugin('notes').open(); break;
    case 'pause': deck.togglePause(); break;
    default: throw new Error(`Unknown presentation action: ${button.dataset.action}`);
  }
});

window.hveDeck = deck;
