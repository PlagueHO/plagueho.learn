/**
 * Render the selected Flowing blend background: diffuse haze, pale bands, and fine ribbons.
 * Parameters: existing preset key and an optional unique slide id for SVG definitions.
 * Usage: waveBackground(slide.wave, slide.id). Preset keys preserve existing slide metadata.
 */
const wavePresets = new Set([
  'cover-cradle', 'split-diagonal', 'stream-progression',
  'center-halo', 'dual-column-contrast', 'rising-twist',
]);

export function waveBackground(preset, instanceId = preset) {
  if (!wavePresets.has(preset)) throw new Error(`Unknown wave preset: ${preset}`);
  if (typeof instanceId !== 'string' || !/^[a-z][a-z0-9-]*$/.test(instanceId)) {
    throw new Error('Wave instance id must use lowercase letters, digits, and hyphens, starting with a letter.');
  }
  const prefix = `wave-${instanceId}`;
  const defs = `<defs>
    <linearGradient id="${prefix}-cool" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#faf8ff" stop-opacity=".2"/>
      <stop offset=".45" stop-color="#c9b3ed" stop-opacity=".36"/>
      <stop offset=".72" stop-color="#e6d9fc" stop-opacity=".5"/>
      <stop offset="1" stop-color="#fbf8ff" stop-opacity=".1"/>
    </linearGradient>
    <linearGradient id="${prefix}-warm" x1="0" y1="0" x2="1" y2="1">
      <stop stop-color="#fff5ec" stop-opacity=".1"/>
      <stop offset=".5" stop-color="#f8c49c" stop-opacity=".36"/>
      <stop offset="1" stop-color="#f9ddd5" stop-opacity=".1"/>
    </linearGradient>
    <linearGradient id="${prefix}-rose">
      <stop stop-color="#f7e1ed" stop-opacity=".1"/>
      <stop offset=".55" stop-color="#ecc5d8" stop-opacity=".36"/>
      <stop offset="1" stop-color="#e9ddfa" stop-opacity=".15"/>
    </linearGradient>
    <linearGradient id="${prefix}-line">
      <stop stop-color="#d9b7d4" stop-opacity=".12"/>
      <stop offset=".5" stop-color="#a98ac8" stop-opacity=".28"/>
      <stop offset="1" stop-color="#efc1a8" stop-opacity=".2"/>
    </linearGradient>
    <filter id="${prefix}-soft" x="-35%" y="-35%" width="170%" height="170%">
      <feGaussianBlur stdDeviation="30"/>
    </filter>
  </defs>`;
  const haze = `<g filter="url(#${prefix}-soft)">
    <path d="M880 -120C1380 -120 1580 250 1210 390C1040 440 1180 80 810 180"
      fill="none" stroke="url(#${prefix}-cool)" stroke-width="150"/>
    <path d="M-170 480C170 320 60 850 590 730" fill="none" stroke="url(#${prefix}-warm)" stroke-width="180"/>
    <path d="M1050 740C1450 520 1560 850 1040 880" fill="none" stroke="url(#${prefix}-rose)" stroke-width="115"/>
  </g>`;
  const bands = `<g opacity=".4">
    <path d="M-200 580C140 250 90 900 620 710S1080 450 1430 630"
      fill="none" stroke="url(#${prefix}-warm)" stroke-width="130"/>
    <path d="M820 -120C580 80 1330 -30 1140 260S1500 220 1410 470"
      fill="none" stroke="url(#${prefix}-cool)" stroke-width="110"/>
  </g>`;
  const lines = `<g fill="none" stroke="url(#${prefix}-line)" stroke-width="1.5" opacity=".95">
    ${Array.from({ length: 10 }, (_, i) =>
      `<path d="M-120 ${485 + i * 12}C210 ${280 + i * 12} 60 ${845 + i * 8} 670 ${676 + i * 8}S1170 ${440 + i * 9} 1410 ${580 + i * 11}"/>`
      + `<path d="M${750 + i * 14} -80C${580 + i * 12} 120 1350 ${-80 + i * 12} 1190 ${210 + i * 10}"/>`).join('')}
  </g>`;
  return `<svg class="slide-wave" data-wave="${preset}" data-style="flowing-blend" viewBox="0 0 1280 720"
    preserveAspectRatio="none" aria-hidden="true">${defs}${haze}${bands}${lines}</svg>`;
}
