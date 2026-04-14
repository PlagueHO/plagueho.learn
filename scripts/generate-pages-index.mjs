/**
 * generate-pages-index.mjs
 *
 * Scans the built _site directory for presentation subdirectories and generates
 * an index.html page that links to each one. Presentation metadata (title, info,
 * tags, duration) is extracted from the original slides.md frontmatter.
 *
 * Usage: node scripts/generate-pages-index.mjs <siteDir>
 */

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const siteDir = resolve(process.argv[2] || '_site');
const presentationsDir = resolve('presentations');

/**
 * Extract YAML frontmatter values from a slides.md file.
 * Returns scalar values and a `tags` array.
 */
function extractFrontmatter(slidesPath) {
  const content = readFileSync(slidesPath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fm = {};
  const lines = match[1].split(/\r?\n/);
  let currentKey = null;
  let multiline = false;
  let collectingList = false;

  for (const line of lines) {
    // Collecting YAML list items (e.g. tags)
    if (collectingList) {
      const liMatch = line.match(/^\s+-\s+(.+)/);
      if (liMatch) {
        fm[currentKey].push(liMatch[1].trim().replace(/^["']|["']$/g, ''));
        continue;
      } else {
        collectingList = false;
      }
    }

    if (multiline) {
      if (/^\S/.test(line) && !line.startsWith('  ')) {
        multiline = false;
      } else {
        fm[currentKey] += ' ' + line.trim();
        continue;
      }
    }

    const kvMatch = line.match(/^(\w[\w-]*):\s*(.*)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      let value = kvMatch[2].trim();

      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }

      if (value === '|' || value === '>') {
        fm[currentKey] = '';
        multiline = true;
      } else if (value === '') {
        // Could be start of a list or map — peek ahead
        fm[currentKey] = [];
        collectingList = true;
      } else {
        fm[currentKey] = value;
      }
    }
  }
  return fm;
}

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

// Gradient pairs for card top-borders — cycles through entries
const gradients = [
  ['#6366f1', '#8b5cf6'], // indigo → violet
  ['#3b82f6', '#06b6d4'], // blue → cyan
  ['#10b981', '#34d399'], // emerald → green
  ['#f59e0b', '#f97316'], // amber → orange
  ['#ec4899', '#f43f5e'], // pink → rose
  ['#8b5cf6', '#ec4899'], // violet → pink
];

// Discover built presentations by scanning _site subdirectories
const entries = readdirSync(siteDir)
  .filter(name => {
    const full = join(siteDir, name);
    return statSync(full).isDirectory();
  })
  .map(name => {
    const slidesPath = join(presentationsDir, name, 'slides.md');
    const fm = existsSync(slidesPath) ? extractFrontmatter(slidesPath) : {};

    // Clean description: strip leading "## Heading" from info block.
    // Multiline YAML joins with spaces, so it looks like "## Title A 45-minute..."
    let description = (fm.info || '').trim();
    description = description
      .replace(/^##\s+[\s\S]*?(?=A\s+\d|A\s+presentation\b)/i, '')
      .trim();
    // Remove if only "A presentation by …" remains
    if (!description || /^A\s+presentation\s+by\b/i.test(description)) {
      description = '';
    }

    return {
      name,
      title: fm.title || name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description,
      tags: Array.isArray(fm.tags) ? fm.tags : [],
      duration: fm.duration || null,
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

if (entries.length === 0) {
  console.error('No presentation directories found in', siteDir);
  process.exit(1);
}

const slidesIcon = `<svg class="card-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;

const clockIcon = `<svg class="clock-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;

const cardsHtml = entries.map((e, i) => {
  const [g1, g2] = gradients[i % gradients.length];
  const tagsHtml = e.tags.map(t =>
    `<span class="tag">${escapeHtml(t)}</span>`
  ).join('');
  const durationHtml = e.duration
    ? `<span class="duration">${clockIcon} ${escapeHtml(String(e.duration))} min</span>`
    : '';
  return `
      <a class="card" href="./${e.name}/" style="--g1:${g1};--g2:${g2}">
        <div class="card-header">
          ${slidesIcon}
          <h2>${escapeHtml(e.title)}</h2>
        </div>
        ${e.description ? `<p class="card-desc">${escapeHtml(e.description)}</p>` : ''}
        <div class="card-footer">
          <div class="tags">${tagsHtml}</div>
          ${durationHtml}
        </div>
      </a>`;
}).join('\n');

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentations – Daniel Scott-Raynsford</title>
  <style>
    :root {
      --bg: #0a0e17;
      --surface: #121a2b;
      --surface-hover: #162035;
      --border: #1e2d45;
      --text: #e6edf3;
      --text-secondary: #8b949e;
      --accent: #58a6ff;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, sans-serif;
      background: var(--bg);
      color: var(--text);
      min-height: 100vh;
    }

    /* ---- Header with gradient mesh ---- */
    header {
      position: relative;
      text-align: center;
      padding: 4rem 2rem 3rem;
      overflow: hidden;
    }
    header::before {
      content: '';
      position: absolute;
      inset: 0;
      background:
        radial-gradient(ellipse 80% 60% at 20% 40%, rgba(99,102,241,.25), transparent),
        radial-gradient(ellipse 60% 70% at 80% 30%, rgba(236,72,153,.20), transparent),
        radial-gradient(ellipse 50% 50% at 50% 80%, rgba(6,182,212,.15), transparent);
      pointer-events: none;
    }
    header h1 {
      position: relative;
      font-size: 2.6rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      background: linear-gradient(135deg, #c084fc, #60a5fa, #34d399);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.5rem;
    }
    header p {
      position: relative;
      color: var(--text-secondary);
      font-size: 1.1rem;
    }
    header .author-role {
      font-size: 0.9rem;
      margin-top: 0.25rem;
    }
    header a {
      color: var(--accent);
      text-decoration: none;
    }
    header a:hover {
      text-decoration: underline;
    }

    /* ---- Grid ---- */
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 2rem 2rem;
    }

    /* ---- Card ---- */
    .card {
      position: relative;
      display: flex;
      flex-direction: column;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 1.5rem;
      text-decoration: none;
      color: var(--text);
      transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
      overflow: hidden;
    }
    /* Gradient top accent bar */
    .card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--g1), var(--g2));
      border-radius: 12px 12px 0 0;
    }
    .card:hover {
      border-color: color-mix(in srgb, var(--g1) 50%, transparent);
      box-shadow: 0 4px 24px rgba(0,0,0,.3), 0 0 0 1px color-mix(in srgb, var(--g1) 30%, transparent);
      transform: translateY(-2px);
      background: var(--surface-hover);
    }

    /* Card header with icon */
    .card-header {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
    }
    .card-icon {
      flex-shrink: 0;
      width: 28px;
      height: 28px;
      color: var(--g1);
      margin-top: 2px;
    }
    .card-header h2 {
      font-size: 1.1rem;
      font-weight: 600;
      line-height: 1.35;
      background: linear-gradient(135deg, var(--g1), var(--g2));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    /* Description */
    .card-desc {
      color: var(--text-secondary);
      font-size: 0.88rem;
      line-height: 1.55;
      flex: 1;
      margin-bottom: 1rem;
    }

    /* Footer: tags + duration */
    .card-footer {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: auto;
    }
    .tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.35rem;
      flex: 1;
    }
    .tag {
      display: inline-block;
      font-size: 0.7rem;
      font-weight: 500;
      padding: 0.2em 0.6em;
      border-radius: 9999px;
      background: color-mix(in srgb, var(--g1) 15%, transparent);
      color: color-mix(in srgb, var(--g2) 70%, #fff);
      border: 1px solid color-mix(in srgb, var(--g1) 25%, transparent);
      white-space: nowrap;
    }
    .duration {
      display: inline-flex;
      align-items: center;
      gap: 0.3em;
      font-size: 0.75rem;
      color: var(--text-secondary);
      white-space: nowrap;
    }
    .clock-icon {
      width: 14px;
      height: 14px;
    }

    /* ---- Footer ---- */
    footer {
      text-align: center;
      padding: 2rem;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }

    /* ---- Responsive ---- */
    @media (max-width: 480px) {
      header h1 { font-size: 1.8rem; }
      .grid { grid-template-columns: 1fr; padding: 0 1rem 1rem; }
    }
  </style>
</head>
<body>
  <header>
    <h1>Presentations</h1>
    <p><a href="https://danielscottraynsford.com/">Daniel Scott-Raynsford</a> (DSR)</p>
    <p class="author-role">Sr Partner Solution Architect | Azure, AI & Apps | Enterprise Partner Solutions | Microsoft</p>
  </header>
  <div class="grid">
${cardsHtml}
  </div>
  <footer>
    <p>Source on <a href="https://github.com/PlagueHO/plagueho.learn">GitHub</a></p>
  </footer>
</body>
</html>
`;

writeFileSync(join(siteDir, 'index.html'), html, 'utf-8');
console.log(`Generated index.html with ${entries.length} presentation(s).`);
