/**
 * Diagram helpers for the HVE Reveal deck.
 * Each helper returns an HTML string. All styling lives in theme.css.
 * Usage: import { node, chain, lane } from './diagrams.mjs' and compose slide bodies.
 */

const ICONS = {
  team: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.4"/><path d="M3.5 19c.4-3.3 2.7-5 5.5-5s5.1 1.7 5.5 5M15.5 14.3c2.6-.4 4.6.9 5 3.7"/>',
  target: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/><path d="M12 12h.01"/>',
  layers: '<path d="M12 3.5l9 4.8-9 4.8-9-4.8z"/><path d="M3 12.6l9 4.8 9-4.8"/><path d="M3 16.8l9 4.2 9-4.2"/>',
  spark: '<path d="M11 3l1.9 5.6L18.5 10.5l-5.6 1.9L11 18l-1.9-5.6L3.5 10.5l5.6-1.9z"/><path d="M19 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z"/>',
  loop: '<path d="M20 12a8 8 0 0 1-13.7 5.6M4 12a8 8 0 0 1 13.7-5.6"/><path d="M18 3v4h-4M6 21v-4h4"/>',
  shield: '<path d="M12 3l8 3v6c0 4.5-3.2 7.8-8 9-4.8-1.2-8-4.5-8-9V6z"/><path d="M8.5 12l2.5 2.5 4.5-5"/>',
  code: '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
  document: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
  person: '<circle cx="12" cy="8" r="3.5"/><path d="M5 20c.5-4 3.3-6 7-6s6.5 2 7 6"/>',
  dashboard: '<rect x="3.5" y="4" width="17" height="16" rx="2"/><path d="M7.5 16v-4M12 16V8M16.5 16v-6"/>',
  question: '<circle cx="12" cy="12" r="9"/><path d="M9.5 9.6a2.6 2.6 0 1 1 3.6 2.4c-.8.4-1.1.9-1.1 1.8M12 17h.01"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3.5 2"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.8 2.8L16.5 9.5"/>',
  search: '<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
  flag: '<path d="M6 21V4M6 5h11l-2 4 2 4H6"/>',
};

export function icon(name, cls = '') {
  const paths = ICONS[name];
  if (!paths) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="ico${cls ? ` ${cls}` : ''}" viewBox="0 0 24 24" aria-hidden="true">${paths}</svg>`;
}

export function arrow(dir = 'r', cls = '') {
  const extra = cls ? ` ${cls}` : '';
  if (dir === 'd') {
    return `<svg class="arr arr-d${extra}" viewBox="0 0 24 48" aria-hidden="true"><path d="M12 4V40M5 32L12 40L19 32"/></svg>`;
  }
  return `<svg class="arr${extra}" viewBox="0 0 48 24" aria-hidden="true"><path d="M4 12H40M32 5L40 12L32 19"/></svg>`;
}

export function node(title, detail = '', cls = '') {
  return `<div class="node${cls ? ` ${cls}` : ''}"><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ''}</div>`;
}

export function inode(iconName, title, detail = '', cls = '') {
  return `<div class="node row${cls ? ` ${cls}` : ''}">${icon(iconName)}<div><strong>${title}</strong>${detail ? `<span>${detail}</span>` : ''}</div></div>`;
}

export function chip(text, cls = '') {
  return `<span class="chip${cls ? ` ${cls}` : ''}">${text}</span>`;
}

export function band(text, cls = '', iconName = '') {
  return `<div class="band${cls ? ` ${cls}` : ''}">${iconName ? icon(iconName) : ''}<span>${text}</span></div>`;
}

export function fig(label, inner, cls = '') {
  return `<div class="fig${cls ? ` ${cls}` : ''}" role="group" aria-label="${label}">${inner}</div>`;
}

export function takeaway(text) {
  return `<p class="takeaway">${text}</p>`;
}

export function grid(columns, items, cls = '') {
  return `<div class="grid${cls ? ` ${cls}` : ''}" style="grid-template-columns:${columns}">${items.join('')}</div>`;
}

export function chain(items, cls = '') {
  return `<div class="chain${cls ? ` ${cls}` : ''}">${items.join(arrow())}</div>`;
}

/** Return path under a chain of `count` equal nodes. */
export function ret(label, count = 4) {
  return `<div class="ret" style="--n:${count}"><span>${label}</span></div>`;
}

/* Delivery lanes. Each segment is [text, fraction, kind, sub?]. A hop is a fixed 36px column. */
export const HOP = ['', 0, 'hop'];

function laneColumns(segments) {
  return segments.map(([, fr, kind]) => (kind === 'hop' ? '36px' : `minmax(0,${fr}fr)`)).join(' ');
}

export function lane(segments, { tall = false } = {}) {
  const cells = segments.map(([text, , kind, sub]) => {
    if (kind === 'hop') return '<div class="cell hop" aria-hidden="true"></div>';
    const inner = sub ? `<b>${text}</b><small>${sub}</small>` : text;
    return `<div class="cell ${kind}">${inner}</div>`;
  });
  return `<div class="lane${tall ? ' tall' : ''}" style="grid-template-columns:${laneColumns(segments)}">${cells.join('')}</div>`;
}

/** Marks sit under a lane. Each mark is [startColumn, span, kind, text]. */
export function under(segments, marks) {
  const cells = marks.map(([start, span, kind, text]) => `<div class="mark ${kind}" style="grid-column:${start} / span ${span}">${text}</div>`);
  return `<div class="lane under" style="grid-template-columns:${laneColumns(segments)}">${cells.join('')}</div>`;
}

export function laneGroup(label, ...rows) {
  return `<div class="lane-row"><div class="lane-label">${label}</div>${rows.join('')}</div>`;
}

const LEGEND = {
  work: 'Work step',
  hop: 'Handoff',
  wait: 'Waiting',
  check: 'Required check',
};

export function legend(kinds, note = 'Illustrative, not to scale') {
  const items = kinds.map(kind => `<span><i class="sw sw-${kind}" aria-hidden="true"></i>${LEGEND[kind]}</span>`);
  return `<div class="legend">${items.join('')}${note ? `<em>${note}</em>` : ''}</div>`;
}

/* Customer-and-crew delivery loop. The base box is 720 by 380 and scales with zoom. */
export function loop({ scale = 1, fragile = false } = {}) {
  return `<div class="loop${fragile ? ' fragile' : ''}" data-hve-loop style="--s:${scale}" role="group" aria-label="Delivery loop: idea, validation, engineering, feedback, with the customer and expert crew at the center">
    <svg class="arrows" viewBox="0 0 720 380" aria-hidden="true">
      <path d="M274 66H446M436 57L446 66L436 75"/>
      <path d="M576 122V256M567 246L576 256L585 246"/>
      <path d="M446 314H274M284 305L274 314L284 323"/>
      <path d="M144 258V124M135 134L144 124L153 134"/>
    </svg>
    <div class="step s1"><strong>Idea</strong><span>Business need</span></div>
    <div class="step s2"><strong>Validation</strong><span>Customer evidence</span></div>
    <div class="step s3"><strong>Engineering</strong><span>Working increment</span></div>
    <div class="step s4"><strong>Feedback</strong><span>Learn + decide</span></div>
    <div class="crew"><strong>Customer + expert crew</strong><span>AI throughout</span></div>
  </div>`;
}

/* Research, plan, implement, review chain used by slides 30 and 38. */
export function rpiChain(items) {
  const columns = items.map(([title, artifact, decision, mark = 'check']) => `<div class="node rpi"><strong>${title}</strong><span>${artifact}</span><em>${icon(mark)}${decision}</em></div>`);
  return chain(columns, 'rpi-chain');
}

/* Evidence table with dashed "Not measured" cells. */
export function evidenceTable(measures) {
  const head = '<div class="th">Measure</div><div class="th">Baseline</div><div class="th">Experiment</div>';
  const rows = measures.map(measure => `<div class="td measure">${measure}</div><div class="td missing">Not measured</div><div class="td missing">Not measured</div>`);
  return `<div class="etable" role="group" aria-label="Evidence table">${head}${rows.join('')}</div>`;
}

/* Confidence markers pair a distinct shape with a text label. */
export function confidence() {
  const marks = [['solid', 'Validated'], ['ring', 'Assumed'], ['dash', 'Unknown'], ['diamond', 'Conflicting']];
  return `<div class="confidence" role="group" aria-label="Confidence markers">${marks.map(([shape, text]) => `<span><i class="dot dot-${shape}" aria-hidden="true"></i>${text}</span>`).join('')}</div>`;
}
