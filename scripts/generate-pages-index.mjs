/**
 * generate-pages-index.mjs
 *
 * Scans the built _site directory for presentation subdirectories and generates
 * an index.html page that links to each one. Presentation metadata (title, info)
 * is extracted from the original slides.md frontmatter.
 *
 * Usage: node scripts/generate-pages-index.mjs <siteDir>
 */

import { readdirSync, readFileSync, writeFileSync, statSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';

const siteDir = resolve(process.argv[2] || '_site');
const presentationsDir = resolve('presentations');

/**
 * Extract YAML frontmatter values from a slides.md file.
 */
function extractFrontmatter(slidesPath) {
  const content = readFileSync(slidesPath, 'utf-8');
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return {};

  const fm = {};
  const lines = match[1].split(/\r?\n/);
  let currentKey = null;
  let multiline = false;

  for (const line of lines) {
    if (multiline) {
      if (/^\S/.test(line) && !line.startsWith('  ')) {
        multiline = false;
      } else {
        fm[currentKey] += ' ' + line.trim();
        continue;
      }
    }
    const kvMatch = line.match(/^(\w[\w-]*):\s*(.+)/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      let value = kvMatch[2].trim();
      // Strip surrounding quotes
      if ((value.startsWith('"') && value.endsWith('"')) ||
          (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      // Check for multiline indicator
      if (value === '|' || value === '>') {
        fm[currentKey] = '';
        multiline = true;
      } else {
        fm[currentKey] = value;
      }
    }
  }
  return fm;
}

// Discover built presentations by scanning _site subdirectories
const entries = readdirSync(siteDir)
  .filter(name => {
    const full = join(siteDir, name);
    return statSync(full).isDirectory();
  })
  .map(name => {
    const slidesPath = join(presentationsDir, name, 'slides.md');
    const fm = existsSync(slidesPath) ? extractFrontmatter(slidesPath) : {};
    return {
      name,
      title: fm.title || name.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      description: (fm.info || '').replace(/^##\s*.*?\n/, '').trim(),
    };
  })
  .sort((a, b) => a.title.localeCompare(b.title));

if (entries.length === 0) {
  console.error('No presentation directories found in', siteDir);
  process.exit(1);
}

const cardsHtml = entries.map(e => `
      <a class="card" href="./${e.name}/">
        <h2>${escapeHtml(e.title)}</h2>
        ${e.description ? `<p>${escapeHtml(e.description)}</p>` : ''}
      </a>`).join('\n');

function escapeHtml(str) {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Presentations – Daniel Scott-Raynsford</title>
  <style>
    :root {
      --bg: #0d1117;
      --surface: #161b22;
      --border: #30363d;
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
      padding: 2rem;
    }
    header {
      text-align: center;
      margin-bottom: 3rem;
    }
    header h1 {
      font-size: 2.2rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
    }
    header p {
      color: var(--text-secondary);
      font-size: 1.1rem;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
      gap: 1.5rem;
      max-width: 1200px;
      margin: 0 auto;
    }
    .card {
      display: block;
      background: var(--surface);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 1.5rem;
      text-decoration: none;
      color: var(--text);
      transition: border-color 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      border-color: var(--accent);
      box-shadow: 0 0 0 1px var(--accent);
    }
    .card h2 {
      font-size: 1.15rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--accent);
    }
    .card p {
      color: var(--text-secondary);
      font-size: 0.9rem;
      line-height: 1.5;
    }
    footer {
      text-align: center;
      margin-top: 3rem;
      color: var(--text-secondary);
      font-size: 0.85rem;
    }
    footer a { color: var(--accent); text-decoration: none; }
    footer a:hover { text-decoration: underline; }
  </style>
</head>
<body>
  <header>
    <h1>Presentations</h1>
    <p>Daniel Scott-Raynsford (PlagueHO)</p>
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
