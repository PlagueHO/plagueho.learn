/**
 * Slide rendering for the HVE Reveal deck.
 * Parameters: none. Exports `slides`, `sources`, `chapters`, `escapeHtml`, and `renderSlides()`.
 * Usage: build.mjs injects renderSlides() into index.html at the <!-- SLIDES --> marker.
 */
import { sources } from './sources.mjs';
import { slides } from './slides.mjs';
import { waveBackground } from './waves.mjs';

export { sources, slides };

export function escapeHtml(value) {
  return value.replace(/[&<>"']/g, character => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  })[character]);
}

function links(keys) {
  const items = keys.map(key => {
    if (!sources[key]) throw new Error(`Unknown source key: ${key}`);
    const [label, url] = sources[key];
    return `<a href="${url}">${escapeHtml(label)}</a>`;
  });
  return `<nav class="resources" aria-label="Public resources">${items.join('')}</nav>`;
}

export const chapters = ['The outcome gap', 'How HVE changes the work', 'Making it real'];

const partLabels = {
  'deep-dive': '<b>Diving deeper into HVE-Core</b>',
  demos: '<b>Demos</b> · Public teaching scenario',
};

const partLinks = [
  ['leadership', '#/hve', 'Introduction to HVE'],
  ['deep-dive', '#/deep-dive', 'Diving deeper into HVE-Core'],
  ['demos', '#/demo-install', 'Demos'],
];

const pillarNumbers = {
  teams: 1, 'team-example': 1,
  'design-thinking': 2, 'design-example': 2,
  accelerators: 3, 'accelerator-example': 3,
  'lifecycle-ai': 4, 'lifecycle-example': 4,
};

function steps(className, isOn) {
  const marks = chapters.map((name, index) => `<u${isOn(index + 1) ? ' class="on"' : ''}></u>`);
  return `<i class="${className}" aria-hidden="true">${marks.join('')}</i>`;
}

function topChrome({ id, part, chapter }) {
  if (id === 'hve') return `<header class="cover-brand" role="img" aria-label="Microsoft">
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path fill="#F25022" d="M0 0h15v15H0z"/><path fill="#7FBA00" d="M17 0h15v15H17z"/>
        <path fill="#00A4EF" d="M0 17h15v15H0z"/><path fill="#FFB900" d="M17 17h15v15H17z"/>
      </svg><span aria-hidden="true">Microsoft</span>
    </header>`;
  const inLeadership = part === 'leadership';
  const label = inLeadership
    ? `<b>Chapter ${chapter} of ${chapters.length}</b> · ${chapters[chapter - 1]}`
    : partLabels[part];
  return `<header class="chrome-top">
      <a class="wordmark" href="#/hve">
        Hypervelocity Engineering<span> • </span>Why adding AI to the SDLC is not enough
      </a>
      <span class="part-label">${label}</span>
      ${inLeadership ? steps('hdr-bar', step => step <= chapter) : ''}
    </header>`;
}

function chapterKicker(chapter) {
  return `<p class="kicker"><b>Chapter ${chapter} of ${chapters.length}</b>${steps('kicker-bar', step => step === chapter)}</p>`;
}

function withChapters(list) {
  let current = 1;
  return list.map(slide => {
    if (slide.chapter) current = slide.chapter;
    return { ...slide, chapter: slide.part === 'leadership' ? current : undefined, divider: Boolean(slide.chapter) };
  });
}

function bottomChrome(part, number, total, id) {
  const items = partLinks.map(([key, href, label]) => `<a href="${href}"${key === part ? ' aria-current="location"' : ''}>${label}</a>`);
  const motion = {
    handoffs: 'cadence',
    'feedback-window': 'amplification',
    'production-early': 'readiness',
  }[id];
  return `<footer class="chrome-bottom">
      <nav aria-label="Presentation sections">${items.join('')}</nav>
      ${motion ? `<button type="button" data-${motion}-action="replay" hidden>Replay motion</button>
      <button type="button" data-${motion}-action="pause" aria-pressed="false" disabled hidden>Pause motion</button>` : ''}
      <button type="button" data-action="overview" aria-label="Show slide overview">Overview</button>
      <button type="button" data-action="notes" aria-label="Open speaker notes">Notes</button>
      <span class="slide-count" aria-label="Slide ${number} of ${total}">${String(number).padStart(2, '0')} / ${total}</span>
    </footer>`;
}

export function renderSlides() {
  return withChapters(slides).map((slide, index) => `<section id="${slide.id}" data-part="${slide.part}"
    ${slide.minutes ? `data-timing="${slide.minutes * 60}"` : ''}
    class="${slide.className ?? ''}" aria-label="${escapeHtml(slide.title.replace(/<[^>]+>/g, ' '))}">
    ${waveBackground(slide.wave || 'cover-cradle', slide.id)}
    ${pillarNumbers[slide.id] ? `<svg class="pillar-backdrop" viewBox="0 0 1280 720" aria-hidden="true" focusable="false"><text x="64" y="700" text-anchor="start" font-size="585" font-weight="650">${pillarNumbers[slide.id]}</text></svg>` : ''}
    ${topChrome(slide)}
    ${slide.divider ? chapterKicker(slide.chapter) : ''}
    <h2>${slide.title}</h2><div class="slide-content">${slide.body}</div>
    ${bottomChrome(slide.part, index + 1, slides.length, slide.id)}
    <aside class="notes">${slide.notes.split('\n').map(line => `<p>${escapeHtml(line.trim())}</p>`).join('')}${links(slide.sources)}</aside>
    </section>`).join('\n');
}
