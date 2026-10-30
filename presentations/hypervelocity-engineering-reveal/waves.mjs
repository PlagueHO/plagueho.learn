// Slide background waves. Six presets share one gradient and filter set.

export function waveBackground(preset) {
  const defs = `<defs>
    <linearGradient id="wave-warm" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF7F0" stop-opacity=".38"/>
      <stop offset=".52" stop-color="#FDE5D2" stop-opacity=".33"/>
      <stop offset="1" stop-color="#F9CFB0" stop-opacity=".24"/>
    </linearGradient>
    <linearGradient id="wave-rose" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#FFF2EB" stop-opacity=".34"/>
      <stop offset=".56" stop-color="#FCDAD0" stop-opacity=".28"/>
      <stop offset="1" stop-color="#F5C2B8" stop-opacity=".22"/>
    </linearGradient>
    <linearGradient id="wave-cool" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F6F1FF" stop-opacity=".38"/>
      <stop offset=".52" stop-color="#E7DBFC" stop-opacity=".33"/>
      <stop offset="1" stop-color="#D7C4F8" stop-opacity=".24"/>
    </linearGradient>
    <linearGradient id="wave-orchid" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#F3F0FF" stop-opacity=".34"/>
      <stop offset=".56" stop-color="#E1DCFE" stop-opacity=".28"/>
      <stop offset="1" stop-color="#CCC5FA" stop-opacity=".22"/>
    </linearGradient>
    <filter id="wave-shadow" x="-15%" y="-15%" width="130%" height="130%">
      <feDropShadow dx="0" dy="4" stdDeviation="7" flood-color="#5C2D91" flood-opacity=".045"/>
    </filter>
  </defs>`;
  const contents = {
    'cover-cradle': `<g filter="url(#wave-shadow)"><path d="M730 -20 C900 70 1110 135 1320 285 L1320 -20Z" fill="url(#wave-warm)"/><path d="M835 -20 C980 48 1150 92 1320 205 L1320 -20Z" fill="url(#wave-rose)"/></g><g filter="url(#wave-shadow)"><path d="M-40 500 C180 470 405 590 680 740 L-40 740Z" fill="url(#wave-cool)"/><path d="M-40 590 C145 568 320 650 500 740 L-40 740Z" fill="url(#wave-orchid)"/></g>`,
    'split-diagonal': `<g filter="url(#wave-shadow)"><path d="M770 -20 C940 70 1095 118 1320 275 L1320 -20Z" fill="url(#wave-warm)"/><path d="M-40 445 C140 465 310 565 520 740 L-40 740Z" fill="url(#wave-cool)"/><path d="M-40 555 C110 570 245 635 390 740 L-40 740Z" fill="url(#wave-orchid)"/></g>`,
    'stream-progression': `<g filter="url(#wave-shadow)"><path d="M-40 305 C300 220 650 450 1320 305 L1320 405 C650 550 300 320 -40 405Z" fill="url(#wave-cool)"/><path d="M-40 390 C300 305 650 535 1320 390 L1320 480 C650 625 300 395 -40 480Z" fill="url(#wave-warm)"/></g>`,
    'center-halo': `<g filter="url(#wave-shadow)"><path d="M-40 -20 H480 C350 80 165 150 -40 235Z" fill="url(#wave-cool)"/><path d="M1320 495 C1090 555 900 640 735 740 H1320Z" fill="url(#wave-warm)"/><path d="M1320 600 C1155 640 1045 685 940 740 H1320Z" fill="url(#wave-rose)"/></g>`,
    'dual-column-contrast': `<g filter="url(#wave-shadow)"><path d="M-40 440 C145 410 360 505 580 740 H-40Z" fill="url(#wave-cool)"/><path d="M680 740 C890 505 1100 410 1320 440 V740Z" fill="url(#wave-warm)"/></g>`,
    'rising-twist': `<g filter="url(#wave-shadow)"><path d="M635 740 C820 485 990 225 1165 -20 H1320 V740Z" fill="url(#wave-cool)"/><path d="M810 740 C980 515 1130 270 1320 25 V740Z" fill="url(#wave-warm)"/><path d="M965 740 C1090 545 1215 365 1320 220 V740Z" fill="url(#wave-rose)"/></g>`,
  };
  const highlights = {
    'cover-cradle': `<path d="M730 -20 C900 70 1110 135 1320 285 M835 -20 C980 48 1150 92 1320 205 M-40 500 C180 470 405 590 680 740 M-40 590 C145 568 320 650 500 740"/>`,
    'split-diagonal': `<path d="M770 -20 C940 70 1095 118 1320 275 M-40 445 C140 465 310 565 520 740 M-40 555 C110 570 245 635 390 740"/>`,
    'stream-progression': `<path d="M-40 305 C300 220 650 450 1320 305 M-40 390 C300 305 650 535 1320 390"/>`,
    'center-halo': `<path d="M-40 -20 H480 C350 80 165 150 -40 235 M1320 495 C1090 555 900 640 735 740 M1320 600 C1155 640 1045 685 940 740"/>`,
    'dual-column-contrast': `<path d="M-40 440 C145 410 360 505 580 740 M680 740 C890 505 1100 410 1320 440"/>`,
    'rising-twist': `<path d="M635 740 C820 485 990 225 1165 -20 M810 740 C980 515 1130 270 1320 25 M965 740 C1090 545 1215 365 1320 220"/>`,
  };
  if (!contents[preset]) throw new Error(`Unknown wave preset: ${preset}`);
  return `<svg class="slide-wave" data-wave="${preset}" viewBox="0 0 1280 720" preserveAspectRatio="none" aria-hidden="true">${defs}${contents[preset]}<g class="wave-highlights">${highlights[preset]}</g></svg>`;
}
