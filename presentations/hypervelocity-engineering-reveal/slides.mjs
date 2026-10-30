/**
 * Slide data for the HVE Reveal deck.
 * Parameters: none. Exports `slides`, one object per slide in presentation order.
 * Usage: import { slides } from './slides.mjs'. Copy lives in slide-meta.mjs; bodies live in bodies-*.mjs.
 */
import { slideMeta } from './slide-meta.mjs';
import { leadershipBodies } from './bodies-leadership.mjs';
import { coreBodies } from './bodies-core.mjs';

const bodies = { ...leadershipBodies, ...coreBodies };

export const slides = slideMeta.map(meta => {
  const body = bodies[meta.id];
  if (!body) throw new Error(`Missing body for slide: ${meta.id}`);
  return { ...meta, body };
});

for (const id of Object.keys(bodies)) {
  if (!slideMeta.some(meta => meta.id === id)) throw new Error(`Body has no slide: ${id}`);
}
