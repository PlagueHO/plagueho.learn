# plagueho.learn — Agent Instructions

Operational guide for AI agents. For code style and patterns see
`.github/copilot-instructions.md`.

## Layout

```text
plagueho.learn/
├── demos/                      # Self-contained demos by technology area
├── labs/                       # Authored hands-on lab source
│   └── <lab-name>/
│       ├── README.md           # Lab metadata, overview, and module catalogue
│       ├── before-you-start.md # Required preparation
│       ├── facilitator-notes.md
│       ├── assets/             # Screenshots and other lab-owned assets
│       └── <nn-module>/
│           ├── README.md       # Module source
│           └── solution/       # Optional recovery and comparison material
├── labs-site/                  # VitePress shell and generated lab pages
│   └── .vitepress/             # Site configuration, theme, and generated sidebar
├── learning-pathways/          # Curated learning pathway Markdown docs
├── patterns/                   # Reusable development patterns
├── presentations/              # Slidev and Reveal.js presentations
│   └── <talk-name>/
│       ├── OUTLINE.md          # Talk outline — create first
│       ├── slides.md           # Slidev entry only
│       ├── package.json        # Reveal.js deck-local dependencies and scripts
│       ├── index.html          # Reveal.js shell
│       ├── build.mjs           # Reveal.js static build
│       ├── serve.mjs           # Reveal.js wrapper for the shared Node.js server
│       ├── style.css           # Optional custom styles
│       ├── components/         # Optional Vue components
│       └── images/             # Slide images
├── scripts/                    # Utility scripts (Node.js, PowerShell)
├── images/icons/               # Shared icon libraries (Azure, Fabric)
├── .github/
│   ├── instructions/           # Path-specific Copilot instructions
│   ├── workflows/              # CI/CD pipelines
│   └── copilot-instructions.md
├── package.json                # pnpm manifest (Slidev + markdownlint)
└── AGENTS.md
```

## Commands

```bash
# Bootstrap
pnpm install

# Initialize pinned external skills and restore the Impeccable link
git submodule update --init --recursive
node scripts/link-impeccable.mjs

# Test external skill setup and shell-free Slidev execution
node --test scripts/link-impeccable.test.mjs scripts/slidev-process.test.mjs

# Test app tasks and the shared offline presentation server
node --test scripts/presentation-task.test.mjs scripts/serve-presentation.test.mjs

# Lint all Markdown
pnpm lint:md

# Lint and auto-fix Markdown
pnpm lint:md:fix

# Validate authored lab frontmatter and related presentation references
pnpm validate:lab-frontmatter

# Test the lab generator and validator
pnpm test:lab-scripts

# Generate VitePress pages from authored lab source
pnpm labs:generate

# Generate and build the labs site
pnpm labs:build

# Build the production labs site with published labs only
pnpm labs:build:production

# Generate and run the labs development server
pnpm labs:dev

# Generate and preview a production labs build
pnpm labs:preview

# Dev-preview a Slidev presentation (hot reload)
pnpm slidev presentations/<talk-name>/slides.md

# Build a single presentation to static SPA
pnpm exec slidev build presentations/<talk-name>/slides.md

# Export a presentation to PDF
pnpm exec slidev export presentations/<talk-name>/slides.md

# List presentations supported by the GitHub Copilot app tasks
node scripts/presentation-task.mjs list

# Build, run, or test the Reveal.js deck from the repository root
node scripts/presentation-task.mjs build hypervelocity-engineering-ai-sdlc-is-not-enough
node scripts/presentation-task.mjs run hypervelocity-engineering-ai-sdlc-is-not-enough
node scripts/presentation-task.mjs test hypervelocity-engineering-ai-sdlc-is-not-enough

# Serve an extracted Reveal.js release (run from the extracted ZIP folder)
node serve.mjs
```

## Adding a Slidev presentation checklist

1. Create `presentations/<talk-name>/` (kebab-case folder name)
1. Add `OUTLINE.md` with talk structure
1. Add `slides.md` with required YAML frontmatter (`theme`, `title`, `info`, `transition`, `mdc`)
1. Place images in `presentations/<talk-name>/images/`
1. Add optional `style.css` or `components/` as needed
1. Run `pnpm lint:md` — must pass
1. Run `pnpm exec slidev build presentations/<talk-name>/slides.md` — must build

## Reveal.js presentations and app tasks

Use Node.js 22.12 or later for Reveal.js builds and local hosting. Keep deck-local npm dependencies and lockfiles separate from the root pnpm package.

A Reveal.js deck has `package.json`, `index.html`, and `build.mjs`; do not add a dummy `slides.md`. Create `OUTLINE.md` before authoring the deck. Provide `build` and `test` scripts, and build all runtime assets into `dist/` with `dist/index.html` as the entry.

Use `scripts/serve-presentation.mjs` for local hosting. It uses only Node.js built-in modules; do not require Python or an extra server package. The deck-local `serve.mjs` wrapper serves `dist/` and imports the shared script. Keep source preview inside the repository.

The release workflow copies the shared script into each ZIP as `serve.mjs`; this standalone copy serves its own folder on `127.0.0.1:3043`. Use `node serve.mjs 3044` to select another port.

Manual GitHub Copilot app tasks are declared in `.github/github-app.yml`. Build and run tasks use `scripts/presentation-task.mjs` without a shell. Reveal.js run tasks build before starting the shared Node server. Keep the app's server-ready pattern compatible with `Presentation preview: http://127.0.0.1:3043`.

The HVE test task builds the deck before it tests the deck and presenter controls. Other test tasks cover the shared offline server and the task runner. Users must review and accept the app configuration; no task starts automatically.

New Reveal.js decks must provide the HVE speaker-display controls: note fonts, slide position and allocation, a per-visit countdown, and elapsed/planned total time.

For custom Reveal.js speaker controls, preserve the native note-content node and updates. Scope font settings to note text. Use one monotonic elapsed timer for pause, resume, reset, and per-visit countdowns. Keep fixed-schedule pace separate from the current visit's countdown. Retain settings across popup reopen, not main-deck reload. Keep warnings readable without motion and ship all assets locally.

See the [Reveal.js deck guide](presentations/hypervelocity-engineering-ai-sdlc-is-not-enough/README.md) for build, test, and offline presentation commands.

## Adding a lab checklist

1. Create `labs/<lab-name>/` with a kebab-case folder name.
1. Add `README.md` with the lab schema documented in `.github/instructions/labs.instructions.md`.
1. Add the required `before-you-start.md` page and optional `facilitator-notes.md`.
1. Create at least one `<nn-module>/README.md` with a zero-padded number and matching module metadata.
1. Put reusable screenshots and other lab assets in `assets/`.
1. Put optional recovery or comparison content in each module's `solution/` folder.
1. Use Markdown task boxes for attendee actions and screenshot expanders for visual checkpoints.
1. Run `pnpm validate:lab-frontmatter`.
1. Run `pnpm test:lab-scripts`.
1. Run `pnpm lint:md`.
1. Run `pnpm labs:build`.

Authored content under `labs/` is the source of truth. Do not edit generated pages under `labs-site/<lab-name>/`, `labs-site/index.md`, or `labs-site/.vitepress/labs-sidebar.ts`. Run `pnpm labs:generate` to refresh them.

## CI Pipeline

PR merges to `main` require the **Continuous Integration** workflow to pass:

- **TruffleHog secret scan**: fails if verified secrets are found in any file
- **YAML validation**: fails if any `.yml`/`.yaml` file has invalid syntax
- **JSON validation**: fails if any `.json` file has invalid syntax
- **Lab metadata validation** (`pnpm validate:lab-frontmatter`): fails for schema, route, or related-deck errors
- **Hands-on labs build** (`pnpm labs:build`): fails for generation, dead-link, or VitePress build errors
- **Pages labs build** (`pnpm labs:build:production`): publishes only labs with `status: published`
- **Markdown lint** (`pnpm lint:md`): fails on any markdownlint rule violation
- **Slidev build**: builds all `presentations/*/slides.md`; fails on build errors

On push to `main`, **Deploy GitHub Pages** builds all presentations and the labs site into one Pages artifact. On tag push, **Publish Presentations** builds each actual presentation, skips the Slidev starter template, and attaches one offline-ready ZIP per presentation. Each ZIP includes the built files, a README with run and runtime requirements, and the standalone server.

Tag releases detect Reveal.js decks through `reveal.js` in deck-local dependencies or devDependencies. They run `npm ci`, `npm run build`, `npm test`, and the shared server tests.

Slidev ZIP names are `<presentation>-<tag>.zip`; Reveal.js ZIP names are `<repository>-<presentation>-<tag>.zip`. Both formats contain the built files and standalone `serve.mjs` at the ZIP root. Do not release the Slidev starter template.

## Conventions

| Concern | Rule |
|---------|------|
| Folder naming | kebab-case (`azure-ai-deep-dive`, not `AzureAI`) |
| Lab source | `labs/<lab-name>/`; never author generated pages in `labs-site/<lab-name>/` |
| Lab modules | `<nn-module>/README.md` with a zero-padded number and matching frontmatter |
| Lab solutions | Optional files under `<nn-module>/solution/` |
| Presentation entry | Slidev: `slides.md`; Reveal.js: `package.json`, `index.html`, and `build.mjs` |
| Local presentation hosting | Shared Node.js server; no Python or extra server package |
| Outline file | `OUTLINE.md` — create before writing slides |
| Images | Store in talk's `images/` subfolder; kebab-case filenames |
| Indentation | 2 spaces for YAML/JSON/Markdown; 4 spaces for PowerShell/Python |
| Line endings | LF preferred; newline at end of file; no trailing whitespace |
| Markdown lists | Use `-` for bullet points; `1.` for ordered lists |
| Markdown lint config | `.markdownlint.json` — do not override per-file |
| Slidev slides excluded | `presentations/**/slides.md` excluded from markdownlint |

## Permission Boundaries

- **Do without asking**: create/edit Markdown, add images, run lint, run Slidev build
- **Ask first**: install new npm dependencies, modify CI workflows, delete files
