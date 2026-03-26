# Presentations

This folder contains technical presentations built with [Slidev](https://sli.dev/) —
a Markdown-based presentation framework for developers.

## Quick Start

```bash
# Preview a presentation with hot reload
pnpm slidev presentations/<talk-name>/slides.md

# Build a static SPA for hosting
pnpm slidev build presentations/<talk-name>/slides.md

# Export to PDF (requires Chrome/Edge/Firefox)
pnpm slidev export presentations/<talk-name>/slides.md
```

## Creating a New Presentation

1. Copy the `template/` folder and rename it to your talk name (kebab-case)
2. Edit `slides.md` with your content
3. Run `pnpm slidev presentations/<your-talk>/slides.md` to preview

Or ask GitHub Copilot:

> "Create a new Slidev presentation about [topic] in the presentations folder"

## Folder Structure

Each presentation is a self-contained subfolder:

```text
presentations/
  my-talk/
    slides.md         # Main slide content
    components/       # Custom Vue components (optional)
    images/           # Images referenced in slides
```

## Available Themes

- `seriph` — Clean, professional (default in template)
- `default` — Minimal Slidev default

Install more themes from [sli.dev/resources/theme-gallery](https://sli.dev/resources/theme-gallery):

```bash
pnpm add -D @slidev/theme-<name>
```

## VS Code Integration

- Install the recommended **Slidev** extension (`antfu.slidev`) for in-editor
  slide preview and navigation
- Use the **slidev: dev** task from the Command Palette to launch presentations
- The Slidev VS Code extension provides Copilot language model tools for
  slide-aware AI assistance

## Key Slidev Features

| Feature | Syntax |
|---|---|
| Slide separator | `---` |
| Click animation | `<v-click>` / `<v-clicks>` |
| Code highlighting | `` ```ts {2,3\|5\|all} `` |
| Code animation | `` ```md magic-move `` |
| Mermaid diagrams | `` ```mermaid `` |
| LaTeX math | `$E = mc^2$` |
| Two columns | `layout: two-cols` + `::right::` |
| Speaker notes | HTML comments `<!-- notes -->` |
| Presenter mode | Press `P` in the browser |

## Template

See [template/slides.md](template/slides.md) for a starter deck demonstrating
common Slidev features including animations, code blocks, diagrams, and layouts.
