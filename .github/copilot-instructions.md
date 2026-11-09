# GitHub Copilot Instructions

See `AGENTS.md` for directory layout, build/lint commands, and CI pipeline.

## Purpose

External-facing learning content repository for Daniel Scott-Raynsford
(PlagueHO) — Slidev and Reveal.js presentations, demos, learning pathways, and reusable
patterns. Primary content is Markdown; tooling is Node.js (pnpm) with Slidev
and markdownlint-cli2. Agentic workflow assets live in
[PlagueHO/plagueho.os](https://github.com/PlagueHO/plagueho.os); plugins and
skills in [PlagueHO/skills](https://github.com/PlagueHO/skills).

## Security

- Never commit secrets, passwords, API keys, or other sensitive information
- Use environment variables or secret management tools for sensitive values
- Validate all inputs when processing external data
- TruffleHog runs in CI — verified secrets will block merge

## Code Style

- 2 spaces for YAML, JSON, and Markdown; 4 spaces for PowerShell and Python
- Newline at end of every file; no trailing whitespace
- Lines under 120 characters (Markdown lint allows up to 400 for prose)
- Use `-` for unordered lists; `1.` for ordered lists (markdownlint MD004)
- Use `*` for emphasis and strong emphasis (markdownlint MD049/MD050)
- Fenced code blocks with backticks; always specify language tag (MD040)

## Naming Conventions

| Element | Convention | Example |
|---------|-----------|---------|
| Presentation folders | kebab-case | `agentic-development-evolution` |
| Image files | kebab-case | `architecture-overview.png` |
| Scripts | kebab-case or PascalCase (PowerShell) | `generate-pages-index.mjs`, `Build-LayerPlan.ps1` |
| Learning pathways | kebab-case | `microsoft-foundry-agentic-ai.md` |
| Markdown headings | Sentence case | `## Adding a presentation` |

## Markdown Patterns

- Follow GitHub Flavored Markdown (GFM) — pipe tables, task lists, fenced code
- Do not wrap lines manually — let the editor handle wrapping
- Use `##` for top-level sections; do not use `#` (reserved for the title)
- Tables must have leading and trailing pipes (MD055)
- Separate sections with a single blank line

## Slidev Patterns

- Required frontmatter: `theme`, `title`, `info`, `transition`, `mdc: true`
- Separate slides with `---`; use per-slide YAML for layout/transition
- Use `<v-click>` / `<v-clicks>` for progressive reveal
- Code blocks: specify language + line highlights (`ts {2,3|5|all}`)
- Store images in the talk's `images/` subfolder with relative paths
- `presentations/**/slides.md` is excluded from markdownlint

## Reveal.js patterns

- Use Node.js 22.12 or later. Keep each deck's npm package and lockfile separate from the root Slidev toolchain.
- Identify Reveal.js decks through `reveal.js` in `package.json` dependencies or devDependencies. Do not add dummy `slides.md` files.
- Provide `build` and `test` scripts. Build `dist/index.html` and copy all runtime assets, notes plugins, and licenses locally.
- Reuse `scripts/serve-presentation.mjs` for hosting. Use only Node.js built-in modules; do not require Python or an extra server package.
- Source preview uses a deck-local `serve.mjs` wrapper that serves `dist/`. Keep the shared script available in the repository.
- Release ZIP files include a standalone copy as `serve.mjs`. Run `node serve.mjs` after extraction; it serves its own folder on loopback port 3043. An optional port argument selects another port.
- Keep built assets and `serve.mjs` at the ZIP root. Release one ZIP per presentation and skip the Slidev starter template. Use `<presentation>-<tag>.zip` for Slidev and `<repository>-<presentation>-<tag>.zip` for Reveal.js.
- Keep `.github/github-app.yml` tasks aligned with the shared Node server. Use `scripts/presentation-task.mjs` for build, run, and HVE test tasks. Build before testing the deck and presenter controls. Keep manual tests for the shared server and task runner.
- Check app server detection against `Presentation preview: http://127.0.0.1:3043`. Keep tasks manual and require app configuration review.

## Documentation

- Every script includes a header comment with purpose, parameters, and usage
- Every pattern and demo folder includes a `README.md`
- Every presentation includes an `OUTLINE.md` created before slides
