/**
 * Slide rendering for the HVE Reveal deck.
 * Parameters: none. Exports `slides`, `sources`, `escapeHtml`, and `renderSlides()`.
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

const partLabels = {
  leadership: 'Leadership · 30 minutes',
  'deep-dive': 'Optional HVE-Core · 30 minutes',
  demos: 'Demo support · Public teaching scenario',
};

const partLinks = [
  ['leadership', '#/hve', 'Leadership'],
  ['deep-dive', '#/deep-dive', 'Optional HVE-Core'],
  ['demos', '#/demo-install', 'Demos'],
];

function topChrome(part) {
  return `<header class="chrome-top">
      <a class="wordmark" href="#/hve" aria-label="Hypervelocity Engineering title">HVE<span> · </span>Expert teams. Shared outcomes.</a>
      <span class="part-label">${partLabels[part]}</span>
    </header>`;
}

function bottomChrome(part, number, total) {
  const items = partLinks.map(([key, href, label]) => `<a href="${href}"${key === part ? ' aria-current="location"' : ''}>${label}</a>`);
  return `<footer class="chrome-bottom">
      <nav aria-label="Presentation sections">${items.join('')}</nav>
      <button type="button" data-action="overview" aria-label="Show slide overview">Overview</button>
      <button type="button" data-action="notes" aria-label="Open speaker notes">Notes</button>
      <span class="slide-count" aria-label="Slide ${number} of ${total}">${String(number).padStart(2, '0')} / ${total}</span>
    </footer>`;
}

export function renderSlides() {
  return slides.map((slide, index) => `<section id="${slide.id}" data-part="${slide.part}"
    ${slide.minutes ? `data-timing="${slide.minutes * 60}"` : ''}
    class="${slide.className ?? ''}" aria-label="${escapeHtml(slide.title.replace(/<[^>]+>/g, ' '))}">
    ${slide.wave ? waveBackground(slide.wave) : ''}
    ${topChrome(slide.part)}
    <h2>${slide.title}</h2><div class="slide-content">${slide.body}</div>
    ${bottomChrome(slide.part, index + 1, slides.length)}
    <aside class="notes">${slide.notes.split('\n').map(line => `<p>${escapeHtml(line.trim())}</p>`).join('')}${links(slide.sources)}</aside>
    </section>`).join('\n');
}
