# plagueho.learn — Agent Instructions

Operational guide for AI agents. For code style and patterns see
`.github/copilot-instructions.md`.

## Layout

```text
plagueho.learn/
├── demos/                      # Self-contained demos by technology area
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

## CI Pipeline

PR merges to `main` require the **Continuous Integration** workflow to pass:

- **TruffleHog secret scan**: fails if verified secrets are found in any file
- **YAML validation**: fails if any `.yml`/`.yaml` file has invalid syntax
- **JSON validation**: fails if any `.json` file has invalid syntax
- **Markdown lint** (`pnpm lint:md`): fails on any markdownlint rule violation
- **Slidev build**: builds all `presentations/*/slides.md`; fails on build errors

On push to `main`, **Deploy GitHub Pages** builds all presentations and deploys
to GitHub Pages. On tag push, **Publish Presentations** creates a GitHub release
with zipped presentation bundles.

## Conventions

| Concern | Rule |
|---------|------|
| Folder naming | kebab-case (`azure-ai-deep-dive`, not `AzureAI`) |
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
