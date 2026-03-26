---
name: create-slidev-presentation

description: >-
  **WORKFLOW SKILL** — Scaffold a new Slidev presentation with folder
  structure, slides.md, images/, optional style.css, and a living OUTLINE.md
  that tracks content evolution. WHEN: "create presentation", "new
  presentation", "scaffold presentation", "new Slidev deck", "new talk",
  "create slides", "start a presentation", "presentation about". INVOKES:
  file-system tools for scaffolding. FOR SINGLE OPERATIONS: copy template
  folder manually.

metadata:
  author: Daniel Scott-Raynsford
  version: "1.0"
---

# Create Slidev Presentation

Scaffold a new Slidev presentation with folder structure, slides.md,
OUTLINE.md (living outline), and images/.

## Prerequisites

- **pnpm** and **Node.js 18+** (for running Slidev)
- **@slidev/cli** installed as a project devDependency (already in this repo)

## Process

### Step 1 — Gather Inputs

Collect from the user (derive from context when available):

1. **Title**: The presentation title (e.g., "Azure AI Deep Dive")
2. **Folder name**: kebab-case subfolder name under `presentations/`
   (e.g., `azure-ai-deep-dive`). Derive from title if not given.
3. **Outline**: Topics, sections, or talking points (rough bullet list is fine).
4. **Target duration**: Length in minutes (default: 45)
5. **Target audience**: Who is this presentation for?
6. **Event / context**: Where will this be presented? (optional)
7. **Template choice**: Use `presentations/template/slides.md` or create
   a minimal fresh deck. Default: use template.
8. **Theme**: Slidev theme (default: `seriph`). Available: `seriph`, `default`.

Confirm the folder name with the user before proceeding.

### Step 2 — Create the Folder Structure

Create the presentation subfolder under `presentations/`:

```text
presentations/<folder-name>/
├── slides.md       # Main slide content
├── OUTLINE.md      # Living presentation outline document
└── images/         # Images referenced in slides
```

Create `images/` with a `.gitkeep`:

```text
presentations/<folder-name>/images/.gitkeep
```

### Step 3 — Generate slides.md

#### Option A — From Template (default)

Read `presentations/template/slides.md` and customize:

1. Replace the `title` frontmatter field with the presentation title.
2. Replace the `info` block with the presentation title and description.
3. Replace the title slide heading and subtitle.
4. Replace the "About Me" slide content if bio details are provided.
5. Create slide stubs for each major section from the outline:
   - Use appropriate layouts (`default`, `two-cols`, `image-right`,
     `center`, `section`) based on the content type.
   - Add placeholder content with the section title and key points.
   - Include `<!-- Speaker notes go here -->` comments.
6. Keep the Table of Contents, Key Takeaways, and Thank You slides.

#### Option B — Fresh Deck

Create a minimal `slides.md` with:

```yaml
---
theme: <theme>
title: "<title>"
info: |
  ## <title>
  A presentation by Daniel Scott-Raynsford
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
---
```

Then generate slide content from the outline:

1. Title slide with the presentation title and subtitle.
2. One slide per major section from the outline.
3. A Key Takeaways slide summarizing the main points.
4. A Thank You / Q&A slide.

#### Slide Conventions

- Separate slides with `---` (with optional YAML frontmatter between them).
- Use `<v-click>` and `<v-clicks>` for progressive reveal animations.
- Use fenced code blocks with language tags for syntax highlighting.
- Use `{lines}` after the language tag to highlight specific lines.
- Use Mermaid fenced blocks for diagrams.
- Reference images with relative paths: `./images/<filename>`.
- Use built-in layouts: `center`, `cover`, `two-cols`, `image-right`,
  `image-left`, `fact`, `quote`, `section`.
- Add `transition:` frontmatter to individual slides for variety
  (`fade-out`, `slide-up`, `slide-left`).
- Use `level: 2` frontmatter for sub-sections (affects Table of Contents).

### Step 4 — Generate OUTLINE.md

Use the template at `<skill-root>/assets/outline-template.md`.

1. Read the template file from this skill's `assets/` directory.
2. Replace all `{PLACEHOLDER}` tokens with actual values:

   | Placeholder | Source |
   |-------------|--------|
   | `{PRESENTATION_TITLE}` | User-provided title |
   | `{DURATION}` | Target duration |
   | `{AUDIENCE}` | Target audience |
   | `{EVENT}` | Event / context |
   | `{DATE}` | Current date (YYYY-MM-DD) |
   | `{OBJECTIVE_N}` | Derive from outline topics |
   | `{SECTION_TITLE}` | Each section from the outline |
   | `{CONTENT_SUMMARY}` | Key points for each section |

3. Populate the **Slide Outline** section with one entry per slide,
   matching the slides generated in Step 3.
4. Fill in the **Demos** table if the user mentioned any live demos.
5. Add any shared resources or links to the **Resources & Links** section.
6. Add the initial entry to the **Evolution Log**.

Update OUTLINE.md as the presentation evolves to reflect:

- Added or removed slides
- Changed flow or ordering
- Updated speaker notes
- New demos or resources
- Timing adjustments

### Step 5 — Optional: Create style.css

If custom theming is requested:

1. Create `presentations/<folder-name>/style.css`.
2. Use CSS custom properties for theme colors (e.g., `--theme-dk1`,
   `--theme-accent1`) matching existing presentations.
3. Set `--slidev-theme-primary` and `--slidev-theme-accent`.
4. Style headings, links, code blocks, and list markers with theme variables.

Skip if no custom styling is requested — the Slidev theme handles defaults.

### Step 6 — Verify and Present

1. Confirm all files were created:
   - `presentations/<folder-name>/slides.md`
   - `presentations/<folder-name>/OUTLINE.md`
   - `presentations/<folder-name>/images/.gitkeep`
   - `presentations/<folder-name>/style.css` (if created)

2. Show the user how to preview:

   ```bash
   pnpm slidev presentations/<folder-name>/slides.md
   ```

3. Present a summary:
   - Generated folder tree
   - Slide count and section breakdown
   - Decisions or assumptions made
   - Next steps: "Review OUTLINE.md, flesh out slide content,
     add images, and run the dev server to preview."

## Outline Document Purpose

`OUTLINE.md` is the single source of truth for structure and evolution:

- **Planning**: Define objectives, audience, and flow before writing slides.
- **Collaboration**: Agents and users update the outline independently to
  drive slide content changes.
- **Tracking**: The evolution log captures what changed and why.
- **Completeness**: Verify all outlined sections have corresponding slides
  and timing totals the target duration.
