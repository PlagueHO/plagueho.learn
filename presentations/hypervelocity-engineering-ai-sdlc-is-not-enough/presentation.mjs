/**
 * Reveal.js initialization, in-slide action buttons, and presentation tools.
 * Parameters: browser URL; append ?print-pdf before the hash for PDF layout.
 * Usage: load the built index.html from a local or static HTTP server.
 */
import Reveal from './vendor/reveal.mjs';
import Notes from './vendor/plugin/notes.mjs';
import { setupAnnotations } from './annotations.mjs';
import { trackRelativeWindowPosition } from './speaker-window.mjs';

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const deck = new Reveal(document.querySelector('.reveal'), {
  width: 1280,
  height: 720,
  margin: 0,
  center: false,
  hash: true,
  history: true,
  controls: false,
  controlsTutorial: false,
  progress: true,
  slideNumber: false,
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
setupAnnotations(deck);

let speakerWindow = null;
let stopSpeakerWindowTracking = null;
let notesPanel = null;

function renderNotesPanel() {
  if (!notesPanel) return;
  const slide = deck.getCurrentSlide();
  const number = deck.getSlides().indexOf(slide) + 1;
  const title = slide.querySelector('h2')?.innerText.replace(/\s+/g, ' ').trim() ?? '';
  notesPanel.querySelector('.notes-title').textContent = `Speaker notes · ${number} / ${deck.getTotalSlides()} · ${title}`;
  notesPanel.querySelector('.notes-body').innerHTML = [...slide.querySelectorAll('aside.notes')].map(note => note.innerHTML).join('');
}

function toggleNotesPanel(show) {
  if (!notesPanel) {
    notesPanel = document.createElement('section');
    notesPanel.className = 'notes-panel';
    notesPanel.setAttribute('role', 'region');
    notesPanel.setAttribute('aria-label', 'Speaker notes');
    notesPanel.innerHTML = '<header><strong class="notes-title"></strong><button type="button" data-action="notes-close">Close</button></header><div class="notes-body"></div>';
    document.body.append(notesPanel);
    deck.on('slidechanged', renderNotesPanel);
  }
  notesPanel.hidden = !show;
  if (show) renderNotesPanel();
}

// The speaker view needs a popup. When the browser blocks it, show the notes in the page instead.
function openSpeakerNotes() {
  if (speakerWindow && !speakerWindow.closed) {
    speakerWindow.focus();
    return;
  }
  if (notesPanel && !notesPanel.hidden) {
    toggleNotesPanel(false);
    return;
  }
  stopSpeakerWindowTracking?.();
  stopSpeakerWindowTracking = null;
  const nativeOpen = window.open;
  window.open = (...args) => (speakerWindow = nativeOpen.apply(window, args));
  try {
    deck.getPlugin('notes').open();
  } catch {
    speakerWindow = null;
  } finally {
    window.open = nativeOpen;
  }
  if (!speakerWindow) {
    toggleNotesPanel(true);
  } else {
    stopSpeakerWindowTracking = trackRelativeWindowPosition(window, speakerWindow);
  }
}

deck.addKeyBinding({ keyCode: 83, key: 'S', description: 'Speaker notes' }, openSpeakerNotes);

document.addEventListener('click', event => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  switch (button.dataset.action) {
    case 'overview': deck.toggleOverview(); break;
    case 'notes': openSpeakerNotes(); break;
    case 'notes-close': toggleNotesPanel(false); break;
    case 'pause': deck.togglePause(); break;
    default: throw new Error(`Unknown presentation action: ${button.dataset.action}`);
  }
});

window.hveDeck = deck;
