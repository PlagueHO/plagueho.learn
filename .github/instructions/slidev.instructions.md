---
description: 'Slidev presentation authoring standards'
applyTo: 'presentations/**/slides.md'
---

## Slidev Presentation Standards

Presentation slides in this repository use [Slidev](https://sli.dev/) —
a Markdown-based slide framework for developers.

### File Structure

Each presentation lives in its own folder under `presentations/`:

```text
presentations/
  my-talk/
    slides.md       # Main slide content (Slidev Markdown)
    components/     # Custom Vue components (optional)
    images/         # Images used in slides
    theme/          # Custom theme overrides (optional)
```

### Slide Syntax

- Separate slides with `---` (horizontal rule with optional YAML frontmatter)
- Use YAML frontmatter at the top of `slides.md` for deck-level config
- Use per-slide frontmatter between `---` separators for layout/transition
- Use `<v-click>` and `<v-clicks>` for click-to-reveal animations
- Use fenced code blocks with language tags for syntax highlighting
- Use `{lines}` after the language tag to highlight specific lines
- Use `magic-move` code blocks for animated code transitions
- Use Mermaid fenced blocks for diagrams
- Use built-in layouts: `center`, `cover`, `two-cols`, `image-right`, `image-left`, `fact`, `quote`, `section`

### Frontmatter Fields

Required frontmatter at the top of every `slides.md`:

```yaml
---
theme: seriph        # or default, or a custom theme name
title: Talk Title
info: |
  ## Talk Title
  Description of the presentation
class: text-center
transition: slide-left
mdc: true
---
```

### Animations and Transitions

- `<v-click>` wraps content that appears on next click
- `<v-clicks>` makes each child element appear on successive clicks
- Per-slide transitions: `transition: fade-out`, `slide-up`, `slide-left`
- Code line highlighting: `ts {2,3|5|all}` (show lines 2-3, then 5, then all)

### Code Blocks

- Always specify the language for syntax highlighting
- Use line highlighting with `{lineNumbers}` syntax
- Use Shiki Magic Move for animated code evolution between steps
- Use Monaco editor blocks for live-editable code during presentation

### Images

- Store images in the presentation's `images/` subfolder
- Reference with relative paths: `![alt](./images/diagram.png)`
- For background images, use the `background` frontmatter field

### Running Presentations

```bash
# Dev server with hot reload (from repo root)
pnpm slidev presentations/my-talk/slides.md

# Build static SPA
pnpm slidev build presentations/my-talk/slides.md

# Export to PDF
pnpm slidev export presentations/my-talk/slides.md
```

### Theme Customization

To match a corporate or PowerPoint theme, create a `theme/style.css` in the
presentation folder and reference it via the `slides.md` frontmatter or
by placing a `style.css` alongside `slides.md`.

### Naming Conventions

- Folder name: kebab-case matching the talk title (e.g. `azure-ai-deep-dive`)
- Main file: always `slides.md`
- Images: descriptive kebab-case names (e.g. `architecture-overview.png`)
