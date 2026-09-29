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
├── presentations/              # Slidev presentations (one folder per talk)
│   └── <talk-name>/
│       ├── OUTLINE.md          # Talk outline — create first
│       ├── slides.md           # Slidev Markdown slides
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

# Dev-preview a presentation (hot reload)
pnpm slidev presentations/<talk-name>/slides.md

# Build a single presentation to static SPA
pnpm exec slidev build presentations/<talk-name>/slides.md

# Export a presentation to PDF
pnpm exec slidev export presentations/<talk-name>/slides.md
```

## Adding a Presentation — Checklist

1. Create `presentations/<talk-name>/` (kebab-case folder name)
1. Add `OUTLINE.md` with talk structure
1. Add `slides.md` with required YAML frontmatter (`theme`, `title`, `info`, `transition`, `mdc`)
1. Place images in `presentations/<talk-name>/images/`
1. Add optional `style.css` or `components/` as needed
1. Run `pnpm lint:md` — must pass
1. Run `pnpm exec slidev build presentations/<talk-name>/slides.md` — must build

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

On push to `main`, **Deploy GitHub Pages** builds all presentations and the labs site into one Pages artifact. On tag push, **Publish Presentations** creates a GitHub release with zipped presentation bundles.

## Conventions

| Concern | Rule |
|---------|------|
| Folder naming | kebab-case (`azure-ai-deep-dive`, not `AzureAI`) |
| Lab source | `labs/<lab-name>/`; never author generated pages in `labs-site/<lab-name>/` |
| Lab modules | `<nn-module>/README.md` with a zero-padded number and matching frontmatter |
| Lab solutions | Optional files under `<nn-module>/solution/` |
| Presentation entry | Always `slides.md` inside the talk folder |
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
