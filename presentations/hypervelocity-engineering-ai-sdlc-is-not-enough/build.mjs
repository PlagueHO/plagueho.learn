/**
 * Build the standalone HVE Reveal.js presentation with local assets.
 * Parameters: none. Output is the deck-local dist directory.
 * Usage: npm run build
 */
import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { renderSlides, slides } from './deck.mjs';

const root = dirname(fileURLToPath(import.meta.url));
const output = join(root, 'dist');
const revealRoot = dirname(dirname(fileURLToPath(import.meta.resolve('reveal.js'))));

await mkdir(join(output, 'vendor'), { recursive: true });
const template = await readFile(join(root, 'index.html'), 'utf8');
const marker = '<!-- SLIDES -->';
if (template.split(marker).length !== 2) throw new Error('Expected exactly one slide insertion marker.');
await writeFile(join(output, 'index.html'), template.replace(marker, renderSlides()), 'utf8');
await Promise.all([
  ...[
    'theme.css',
    'presenter-controls.css',
    'flowing-dark.css',
    'presenter-controls.mjs',
    'presentation.mjs',
    'annotations.mjs',
    'speaker-window.mjs',
    'speaker-timing.css',
    'cadence.mjs',
    'amplification.mjs',
    'finite-motion.mjs',
    'readiness.mjs',
    'operating-model.mjs',
  ].map(file => cp(join(root, file), join(output, file))),
  cp(join(revealRoot, 'dist'), join(output, 'vendor'), { recursive: true }),
  cp(join(revealRoot, 'LICENSE'), join(output, 'vendor', 'LICENSE')),
  cp(join(root, 'images'), join(output, 'images'), { recursive: true }),
]);
console.log(`Built ${slides.length} HVE slides with local Reveal.js assets in dist.`);
