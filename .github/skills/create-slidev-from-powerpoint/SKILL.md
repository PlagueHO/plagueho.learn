---
name: create-slidev-from-powerpoint

description: >-
  **WORKFLOW SKILL** — Convert PowerPoint (.pptx) to Slidev Markdown with
  maximum visual fidelity. Extracts theme colors, fonts, layouts, images,
  tables, and formatting via python-pptx; generates slides.md, style.css,
  and images/. WHEN: "convert PowerPoint to Slidev", "pptx to slides",
  "convert pptx to markdown presentation", "import PowerPoint", "migrate
  PowerPoint to Slidev". INVOKES: run_in_terminal for extraction,
  file-system tools. FOR SINGLE OPERATIONS: extract_pptx.py directly.

metadata:
  author: Daniel Scott-Raynsford
  version: "1.0"
---

# Create Slidev from PowerPoint

Convert a `.pptx` file into a Slidev presentation (`slides.md`, `style.css`,
`images/`) that visually replicates the original.

## Prerequisites

- **Python 3.9+** with packages from `scripts/requirements.txt`
- **Node.js 18+** and **pnpm** (for running Slidev)
- **Slidev CLI** installed as a project devDependency (`@slidev/cli`)

Install Python dependencies if needed:

```bash
pip install -r <skill-path>/scripts/requirements.txt
```

## Process

### Step 1 — Confirm Inputs

Gather from the user:

1. **Source PPTX path** — absolute path to the `.pptx` file
2. **Output folder name** — kebab-case name under `presentations/` (e.g., `my-talk`)
3. **Target fidelity** — whether slides can be simplified or pixel-perfect
   replication is required

Derived paths:

- Extraction output: `presentations/<name>/_extracted/`
- Final presentation: `presentations/<name>/`

### Step 2 — Extract PPTX Content

Run the extraction script:

```powershell
python <skill-path>/scripts/extract_pptx.py "<source.pptx>" "presentations/<name>/_extracted"
```

Output:

| File | Contents |
|------|----------|
| `theme.json` | Color scheme, font names, slide dimensions |
| `slides.json` | Slide content: shapes, text, formatting, positions |
| `layouts.json` | Slide layout definitions and placeholders |
| `images/` | Extracted media files (JPG, PNG, SVG) |

Read all output files to understand the presentation structure.

### Step 3 — Build the CSS Theme

Create `presentations/<name>/style.css` from `theme.json`:

1. **Read `theme.json`** — extract color values for `dk1`, `dk2`, `lt1`,
   `lt2`, `accent1`–`accent6`, `hlink`, `folHlink`, `major_font`,
   `minor_font`, and slide dimensions.

2. **Create CSS variables** — map each PowerPoint theme color to a CSS
   custom property:

   ```css
   :root {
     --theme-dk1: <dk1>;      /* Text dark */
     --theme-lt1: <lt1>;      /* Background light */
     --theme-dk2: <dk2>;      /* Dark accent (headings) */
     --theme-lt2: <lt2>;      /* Light accent (warm bg) */
     --theme-accent1: <accent1>; /* Primary brand */
     --theme-accent2: <accent2>; /* Secondary brand */
     --theme-accent3: <accent3>; /* Tertiary / call-to-action */
     --theme-accent4: <accent4>;
     --theme-accent5: <accent5>;
     --theme-accent6: <accent6>;
     --theme-hlink: <hlink>;
     --slidev-theme-primary: <accent1>;
     --slidev-theme-accent: <accent2>;
   }
   ```

3. **Map fonts** — use `major_font` for headings and `minor_font` for body
   text. Include web-safe fallbacks and import a Google Fonts alternative
   if the font is not web-available:

   ```css
   @import url('https://fonts.googleapis.com/css2?family=<web-font>:wght@400;600;700&display=swap');

   .slidev-layout {
     font-family: '<minor_font>', '<web-fallback>', system-ui, sans-serif;
   }

   .slidev-layout h1, .slidev-layout h2, .slidev-layout h3, .slidev-layout h4 {
     font-family: '<major_font>', '<web-fallback>', system-ui, sans-serif;
     font-weight: 600;
   }
   ```

4. **Style base elements** — apply theme colors to headings, links, code
   blocks, tables, lists, and blockquotes. Refer to
   `references/css-mapping.md` for the complete property map.

5. **Create custom layout classes** — analyze `slides.json` for recurring
   visual patterns and create CSS classes for each. Common patterns:

   | PPTX Pattern | CSS Class | Description |
   |-------------|-----------|-------------|
   | Gradient background fill | `.warm-gradient` | `linear-gradient` matching theme colors |
   | Dark solid background | `.dark-bg` | `dk2` background with light text |
   | Light tinted background | `.warm-bg` | `lt2` background |
   | 2×2 or 2×N card layout | `.card-grid` + `.card` | CSS Grid with styled cards |
   | Circular icon shapes | `.icon-circle` | Rounded badge with accent color |
   | Section divider slides | `.section-title` | Large centered heading |
   | Numbered bullet list | `.takeaway-list` + `.takeaway-bullet` | Styled numbered items |
   | Accent separator bar | `.accent-bar` | Gradient horizontal line |
   | Call-to-action box | `.cta-box` | Bordered box for links/CTAs |

### Step 4 — Generate slides.md

Create `presentations/<name>/slides.md` by converting each slide from
`slides.json` into Slidev Markdown.

#### 4.1 — Frontmatter

```yaml
---
theme: default
title: "<presentation title from slide 1>"
info: |
  ## <title>
  <subtitle or description>
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
canvasWidth: <slide_width_px from theme.json>
canvasHeight: <slide_height_px from theme.json>
---
```

#### 4.2 — Per-Slide Conversion Rules

For each slide, generate a block separated by `---`:

**Text content:**

- Convert placeholder text to Markdown headings (`#`, `##`, `###`) based on
  placeholder type and font size
- Title placeholders → `# Heading`
- Subtitle placeholders → `## Subheading` or paragraph text
- Body text → paragraphs, with `**bold**` and `*italic*` from run formatting
- Bulleted lists → Markdown `-` lists with proper indentation for levels
- Numbered lists → Markdown `1.` lists

**Images:**

- Copy images from `_extracted/images/` to `presentations/<name>/images/`
- Reference as `./images/<filename>`
- Position using UnoCSS classes or inline HTML `<img>` tags
- For background images, use the `background` frontmatter field

**Tables:**

- Convert `table_rows` arrays to Markdown tables with `|` syntax
- Apply heading row styling via the CSS theme

**Layout reconstruction:**

- For slides with complex positioning, use `<div>` elements with UnoCSS
  utility classes:
  - Flexbox: `flex`, `flex-col`, `items-center`, `justify-center`, `gap-4`
  - Grid: `grid grid-cols-2 gap-4`
  - Sizing: `w-full`, `h-full`, `w-1/2`, `max-h-96`
  - Spacing: `px-16`, `mt-8`, `mb-4`
  - Text: `text-4xl`, `text-lg`, `text-sm`, `text-center`
  - Colors: inline `style` attributes referencing CSS variables

**Slide transitions:**

- Content slides: `transition: fade-out`
- Default: `transition: slide-left`
- Section dividers: `transition: slide-up`

**Speaker notes:**

- Add notes from `slides.json` as HTML comments:

  ```markdown
  <!--
  Speaker notes text here.
  -->
  ```

#### 4.3 — Slide Type Patterns

| PPTX Layout | Slidev Pattern |
|-------------|---------------|
| Title Slide | Full-bleed `<div>` with gradient bg class, flex layout for title + image |
| Section Header | Centered `<div>` with section title class, large heading |
| Two Content | `<div class="grid grid-cols-2 gap-8">` with two columns |
| Content with Caption | `<div class="flex">` with main content + sidebar |
| Blank | Custom `<div>` with absolute positioning for floating shapes |
| Title Only | `# Heading` followed by custom content |
| Comparison | Two-column grid with headers |

### Step 5 — Copy Images

Move images from `_extracted/images/` to `presentations/<name>/images/`.
Verify file references in `slides.md` match.

### Step 6 — Clean Up Extraction Artifacts

Remove the `_extracted/` temporary directory:

```powershell
Remove-Item -Recurse -Force "presentations/<name>/_extracted"
```

### Step 7 — Verify the Output

1. **Start the Slidev dev server:**

   ```bash
   pnpm slidev presentations/<name>/slides.md
   ```

2. **Compare visually** — open the original PPTX side-by-side. Check:

   - [ ] Color scheme matches (headings, backgrounds, accents)
   - [ ] Font family and weights are correct
   - [ ] Images appear in correct positions and sizes
   - [ ] Tables render with proper styling
   - [ ] Slide layouts match the original arrangement
   - [ ] Speaker notes present in presenter mode (`p` key)
   - [ ] Code blocks have proper syntax highlighting

3. **Fix discrepancies** — iterate on `slides.md` and `style.css` until
   output matches the PPTX. Common fixes:
   - Adjust `font-size` values in CSS for heading hierarchy
   - Tweak gradient angles and color stops
   - Adjust grid/flex proportions for card layouts
   - Add/remove padding and margins for spacing

## Edge Cases

- **Embedded charts/SmartArt** — python-pptx cannot extract these. Export as
  images from PowerPoint first, or screenshot and add as static images.
- **Custom fonts unavailable on web** — import the closest Google Fonts match
  and document the substitution in a CSS comment.
- **Animations/builds** — map to `<v-click>` and `<v-clicks>` where animation
  order is clear. Simplify complex animation sequences.
- **Video/audio embeds** — Slidev lacks native video/audio support. Link to
  external sources or use iframes.
- **Text-heavy slides** — reduce font size or split into two slides to avoid
  overflow. Slidev canvas is fixed at the specified dimensions.
- **Grouped shapes** — python-pptx extracts group members individually.
  Reconstruct grouping using CSS flex/grid containers.
- **SVG icons/shapes** — embed inline or as `<img>` tags. For simple shapes,
  recreate with CSS.
- **Slide masters with multiple variants** — check `layouts.json` for the
  full list. Map each used layout to the closest Slidev equivalent.

## Validation

1. Slide count in `slides.md` matches PPTX slide count
2. All images from `_extracted/images/` are present in `images/`
3. `style.css` contains CSS variables for all theme colors
4. Slidev dev server starts without errors
5. Each slide visually approximates the PPTX original
6. Speaker notes appear in presenter mode for all slides that had notes
