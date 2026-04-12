---
name: create-slidev-presentation

description: >-
  **WORKFLOW SKILL** — Research, outline, and scaffold a Slidev presentation.
  Phase 1 researches the topic and generates a detailed OUTLINE.md via
  runSubagent research and user guidance. Phase 2 generates slides.md,
  style.css, and images/ from the approved outline. WHEN: "create
  presentation", "new presentation", "scaffold presentation", "new Slidev
  deck", "new talk", "create slides", "start a presentation", "presentation
  about". INVOKES: runSubagent (web search, Microsoft Learn, WorkIQ),
  vscode_askQuestions, file-system tools. FOR SINGLE OPERATIONS: copy template
  folder manually.

metadata:
  author: Daniel Scott-Raynsford
  version: "2.0"
---

# Create Slidev Presentation

Research a topic, build a detailed OUTLINE.md, then generate slides.md and
supporting files from the approved outline. Never assume — research first,
ask the user for guidance, and iterate.

## Prerequisites

- **pnpm** and **Node.js 18+** (for running Slidev)
- **@slidev/cli** installed as a project devDependency (already in this repo)

## Process Overview

The skill has two major phases:

1. **Phase 1 — Research & Outline**: Gather inputs, research the topic,
   assemble the slide flow, determine demos, and produce OUTLINE.md.
   The user must approve the outline before moving to Phase 2.
2. **Phase 2 — Slide Generation**: Generate slides.md, optional style.css,
   and images/ from the approved OUTLINE.md.

---

## Phase 1 — Research & Outline

### Step 1 — Gather Initial Inputs

Use `vscode_askQuestions` to collect these from the user (do not assume):

1. **Title**: The presentation title (e.g., "Azure AI Deep Dive")
2. **Folder name**: kebab-case subfolder name under `presentations/`
   (e.g., `azure-ai-deep-dive`). Derive from title if not given.
3. **Topic description**: What the presentation should cover — themes,
   technologies, scenarios, or problems to address.
4. **Target duration**: Length in minutes (default: 45)
5. **Target audience**: Who is this presentation for? (role, level, context)
6. **Event / context**: Where will this be presented? (optional)
7. **Narrative style**: Does the user want a running story/scenario, a
   technical deep-dive, a breadth overview, or something else?
8. **Demos**: Does the user want live demos? If so, any specific demo ideas?
9. **Template choice**: Use `presentations/template/slides.md` or create
   a minimal fresh deck. Default: use template.
10. **Theme**: Slidev theme (default: `seriph`). Available: `seriph`,
    `default`.

Do not proceed until all critical inputs (title, topic, duration, audience)
are confirmed.

### Step 2 — Research the Topic

Use `runSubagent` to perform parallel research. The goal is to gather
current, accurate, and relevant material to build a compelling outline.
Do NOT make up content — every claim should be grounded in research.

#### 2a — Web & Documentation Research

Launch a `runSubagent` with the Explore agent or a research-focused prompt
to perform these searches:

- **Microsoft Learn**: Use `mcp_microsoft-lea_microsoft_docs_search` and
  `mcp_microsoft-lea_microsoft_docs_fetch` to find official documentation,
  announcements, and architecture guidance related to the topic.
- **Microsoft Code Samples**: Use
  `mcp_microsoft-lea_microsoft_code_sample_search` if the topic involves
  code patterns or SDK usage.
- **Web search**: Use `fetch_webpage` to retrieve recent blog posts,
  release notes, or announcements relevant to the topic.

Collect and organize:

- Key concepts and definitions
- Recent announcements or changes (within last 6 months)
- Architecture patterns and best practices
- Code samples or demo ideas
- Relevant Microsoft Learn URLs for the Resources section

#### 2b — WorkIQ Context (if relevant)

If the presentation relates to the user's work context (customer meetings,
internal discussions, team priorities), use `runSubagent` with the WorkIQ
skill to query for:

- Recent conversations or meetings about the topic
- Documents or emails that provide context
- People or teams involved

This step is optional — skip if the topic is purely technical or public.

#### 2c — Existing Presentations Scan

Search the `presentations/` directory for existing talks on related topics.
Read their OUTLINE.md files to:

- Avoid duplicating content already covered elsewhere
- Identify reusable narrative patterns or slide structures
- Find cross-references or complementary material

### Step 3 — Assemble the Slide Flow

Based on research results, design the presentation flow:

1. **Define 3–5 learning objectives** derived from research findings and
   the user's topic description.
2. **Design the narrative arc**: Determine the story structure — opening
   hook, problem statement, progressive build, key insights, call to action.
3. **Map sections to slides**: For each major concept, determine:
   - Section title and content summary
   - Best layout (cover, default, two-cols, image-right, center, section)
   - Animations needed (v-click, v-clicks, none)
   - Estimated duration
   - Speaker notes themes
4. **Identify demos**: For each potential demo, define:
   - What it demonstrates
   - Where in the flow it belongs
   - Preparation required
   - Fallback if live demo fails
5. **Validate timing**: Sum all section durations and ensure they fit
   within the target duration. Adjust by trimming or expanding sections.

### Step 4 — Ask the User for Guidance

Before generating the outline, present the proposed flow to the user via
`vscode_askQuestions` and get feedback on:

1. **Objectives**: Do the proposed objectives match their intent?
2. **Flow**: Is the section ordering and narrative arc correct?
3. **Depth vs. breadth**: Are any sections too deep or too shallow?
4. **Demos**: Are the proposed demos appropriate and feasible?
5. **Missing topics**: Is anything important missing from the research?
6. **Tone**: Is the style (technical depth, storytelling, humor) right?

Iterate on the flow based on feedback. Do not proceed to outline
generation until the user approves the direction.

### Step 5 — Generate OUTLINE.md

1. Create the folder structure:

   ```text
   presentations/<folder-name>/
   ├── OUTLINE.md      # Detailed presentation outline
   └── images/         # Images referenced in slides
   ```

   Create `images/` with a `.gitkeep`.

2. Read the outline template from `<skill-root>/assets/outline-template.md`.

3. Generate OUTLINE.md by populating the template with researched content:

   | Placeholder | Source |
   |-------------|--------|
   | `{PRESENTATION_TITLE}` | User-provided title |
   | `{DURATION}` | Target duration |
   | `{AUDIENCE}` | Target audience |
   | `{EVENT}` | Event / context |
   | `{DATE}` | Current date (YYYY-MM-DD) |
   | `{OBJECTIVE_N}` | Derived from research and user input |
   | `{SECTION_TITLE}` | Each section from the assembled flow |
   | `{CONTENT_SUMMARY}` | Detailed content from research |

4. For each slide entry in the **Slide Outline** section, include:
   - **Layout**: The Slidev layout to use
   - **Content**: Detailed bullet points from research (not placeholders)
   - **Narrative**: How this slide connects to the story arc
   - **Speaker Notes**: Talking points grounded in research
   - **Duration**: Estimated time
   - **Animations**: Specific animation plan
   - **Discussion / Thoughts**: Design rationale and alternatives considered

5. Populate the **Demos** table with researched demo proposals including
   preparation steps and slide references.

6. Populate **Resources & Links** with URLs discovered during research.

7. Add the initial entry to the **Evolution Log**.

8. If the topic warrants a **Narrative Thread** section (running story or
   scenario), add it between Objectives and Slide Outline, following the
   pattern in existing outlines. This section describes the running
   story that ties slides together.

### Step 6 — User Review of OUTLINE.md

Present the completed OUTLINE.md to the user. Use `vscode_askQuestions`
to confirm:

1. Is the outline approved to proceed to slide generation?
2. Are there any sections to add, remove, or reorder?
3. Are demo proposals acceptable?
4. Any other changes before generating slides?

If the user requests changes, update OUTLINE.md and re-present.
Do NOT proceed to Phase 2 until the user explicitly approves.

---

## Phase 2 — Slide Generation

Only begin Phase 2 after the user approves the OUTLINE.md from Phase 1.

### Step 7 — Generate slides.md

#### Option A — From Template (default)

Read `presentations/template/slides.md` and customize:

1. Replace the `title` frontmatter field with the presentation title.
2. Replace the `info` block with the presentation title and description.
3. Replace the title slide heading and subtitle.
4. Replace the "About Me" slide content if bio details are provided.
5. Generate full slide content for each section from OUTLINE.md:
   - Use the layout specified in the outline.
   - Write actual content (not placeholders) based on the outline's
     content bullets, narrative, and speaker notes.
   - Include `<v-click>` / `<v-clicks>` where the outline specifies
     animations.
   - Add speaker notes in HTML comments matching the outline.
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

Then generate slide content from OUTLINE.md following the same approach
as Option A for content generation.

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

### Step 8 — Optional: Create style.css

If custom theming is requested or the outline specifies custom styling:

1. Create `presentations/<folder-name>/style.css`.
2. Use CSS custom properties for theme colors (e.g., `--theme-dk1`,
   `--theme-accent1`) matching existing presentations.
3. Set `--slidev-theme-primary` and `--slidev-theme-accent`.
4. Style headings, links, code blocks, and list markers with theme variables.

Skip if no custom styling is requested — the Slidev theme handles defaults.

### Step 9 — Verify and Present

1. Confirm all files were created:
   - `presentations/<folder-name>/OUTLINE.md`
   - `presentations/<folder-name>/slides.md`
   - `presentations/<folder-name>/images/.gitkeep`
   - `presentations/<folder-name>/style.css` (if created)

2. Show the user how to preview:

   ```bash
   pnpm slidev presentations/<folder-name>/slides.md
   ```

3. Present a summary:
   - Generated folder tree
   - Slide count and section breakdown
   - Research sources used
   - Demo preparation needed
   - Next steps: "Review slides in the dev server, refine content,
     add images, and update OUTLINE.md as the presentation evolves."

---

## Outline Document Purpose

`OUTLINE.md` is the single source of truth for structure and evolution:

- **Research grounding**: All content is backed by research, not assumptions.
- **Planning**: Define objectives, audience, and flow before writing slides.
- **Collaboration**: Agents and users update the outline independently to
  drive slide content changes.
- **Tracking**: The evolution log captures what changed and why.
- **Completeness**: Verify all outlined sections have corresponding slides
  and timing totals the target duration.

## Key Principles

- **Never assume**: Research the topic and ask the user when uncertain.
- **Outline first**: OUTLINE.md must be approved before generating slides.
- **Research-backed**: Every section should reference real documentation,
  announcements, or patterns discovered during research.
- **Iterate with the user**: Use `vscode_askQuestions` at every decision
  point rather than guessing what the user wants.
- **Living document**: Update OUTLINE.md as the presentation evolves to
  reflect added/removed slides, changed flow, new demos, or timing changes.
