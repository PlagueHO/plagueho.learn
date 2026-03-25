# CSS Mapping Reference — PowerPoint to Slidev

Maps PowerPoint theme properties extracted by `extract_pptx.py` to their CSS
equivalents in Slidev presentations.

## Color Scheme Mapping

| PowerPoint Color | JSON Key | CSS Variable | Typical Use |
|-----------------|----------|-------------|-------------|
| Dark 1 | `dk1` | `--theme-dk1` | Primary text color |
| Light 1 | `lt1` | `--theme-lt1` | Primary background |
| Dark 2 | `dk2` | `--theme-dk2` | Heading text, dark accents |
| Light 2 | `lt2` | `--theme-lt2` | Secondary background, tinted areas |
| Accent 1 | `accent1` | `--theme-accent1` | Primary brand color, table headers |
| Accent 2 | `accent2` | `--theme-accent2` | Secondary brand, list markers, badges |
| Accent 3 | `accent3` | `--theme-accent3` | Call-to-action, blockquote borders |
| Accent 4 | `accent4` | `--theme-accent4` | Supplementary accent |
| Accent 5 | `accent5` | `--theme-accent5` | Supplementary accent |
| Accent 6 | `accent6` | `--theme-accent6` | Borders, dividers, muted elements |
| Hyperlink | `hlink` | `--theme-hlink` | Link text color |
| Followed Hyperlink | `folHlink` | `--theme-folhlink` | Visited link color |

## Font Mapping

| PowerPoint Font | JSON Key | CSS Property | Notes |
|----------------|----------|-------------|-------|
| Major (headings) | `major_font` | `font-family` on `h1`–`h4` | Use Semibold weight (600) |
| Minor (body) | `minor_font` | `font-family` on `.slidev-layout` | Regular weight (400) |

### Web Font Substitutions

Common PowerPoint fonts and their Google Fonts equivalents:

| PowerPoint Font | Google Fonts Match | Import URL |
|----------------|-------------------|------------|
| Segoe UI | Noto Sans | `Noto+Sans:wght@400;600;700` |
| Calibri | Open Sans | `Open+Sans:wght@400;600;700` |
| Arial | Inter | `Inter:wght@400;600;700` |
| Century Gothic | Poppins | `Poppins:wght@400;600;700` |
| Cambria | Merriweather | `Merriweather:wght@400;700` |
| Consolas | Fira Code | `Fira+Code:wght@400;600` |
| Aptos | Inter | `Inter:wght@400;600;700` |
| Corbel | Assistant | `Assistant:wght@400;600;700` |

## Element-Level CSS Mapping

### Headings

```css
.slidev-layout h1 {
  color: var(--theme-dk2);        /* Dark 2 for primary headings */
  font-size: 2em;
  line-height: 1.2;
}

.slidev-layout h2 {
  color: var(--theme-accent1);    /* Accent 1 for subheadings */
  font-size: 1.4em;
}

.slidev-layout h3 {
  color: var(--theme-dk2);
  font-size: 1.15em;
}
```

### Links

```css
.slidev-layout a {
  color: var(--theme-hlink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}

.slidev-layout a:hover {
  border-bottom-color: var(--theme-hlink);
}
```

### Code Blocks

```css
.slidev-layout pre {
  background-color: #1a1a2e !important;    /* Dark code background */
  border-radius: 8px;
  border-left: 4px solid var(--theme-accent2);
}

.slidev-layout code:not(pre code) {
  background-color: #e8f4fd;               /* Light blue inline code bg */
  color: var(--theme-accent1);
  padding: 0.15em 0.4em;
  border-radius: 4px;
  font-size: 0.9em;
}
```

### Lists

```css
.slidev-layout ul > li::marker,
.slidev-layout ol > li::marker {
  color: var(--theme-accent2);
}

.slidev-layout li {
  line-height: 1.8;
}
```

### Tables

```css
.slidev-layout th {
  background-color: var(--theme-accent1);
  color: var(--theme-lt1);
  font-weight: 600;
  padding: 0.6em 1em;
}

.slidev-layout td {
  padding: 0.5em 1em;
  border-bottom: 1px solid var(--theme-accent6);
}

.slidev-layout tr:nth-child(even) {
  background-color: #f8f9fa;
}
```

### Blockquotes

```css
.slidev-layout blockquote {
  border-left: 4px solid var(--theme-accent3);
  background-color: /* lighten accent3 */;
  padding: 0.8em 1.2em;
  border-radius: 0 8px 8px 0;
  color: var(--theme-dk2);
}
```

## Layout Pattern CSS

### Gradient Background

```css
.warm-gradient {
  background: linear-gradient(
    135deg,
    var(--theme-accent6) 0%,     /* Muted neutral */
    var(--theme-lt2) 60%,        /* Light accent */
    var(--theme-lt1) 100%        /* White */
  );
}
```

### Dark Background

```css
.dark-bg {
  background-color: var(--theme-dk2);
  color: var(--theme-lt1);
}

.dark-bg h1, .dark-bg h2, .dark-bg h3 {
  color: var(--theme-lt1);
}
```

### Card Grid (2×2 or 2×N)

```css
.card-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.card {
  background: var(--theme-lt1);
  border-radius: 12px;
  padding: 1.2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border-top: 3px solid var(--theme-accent2);
}
```

### Icon Circle

```css
.icon-circle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: var(--theme-accent2);
  color: white;
  font-weight: bold;
}
```

### Accent Separator Bar

```css
.accent-bar {
  height: 4px;
  background: linear-gradient(
    90deg,
    var(--theme-accent1),
    var(--theme-accent2),
    var(--theme-accent3)
  );
  border-radius: 2px;
  margin: 1rem 0;
}
```

### Section Title

```css
.section-title {
  font-size: 2.5em;
  color: var(--theme-dk2);
  font-weight: 600;
}
```

### Takeaway / Numbered List

```css
.takeaway-list {
  list-style: none;
  padding: 0;
}

.takeaway-list li {
  padding: 0.6em 0;
  border-bottom: 1px solid var(--theme-accent6);
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
}

.takeaway-bullet {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 28px;
  height: 28px;
  border-radius: 50%;
  background: var(--theme-accent2);
  color: white;
  font-size: 0.8em;
  font-weight: 600;
}
```

### Call-to-Action Box

```css
.cta-box {
  background: var(--theme-lt2);
  border: 2px solid var(--theme-accent6);
  border-radius: 12px;
  padding: 1.2rem;
  display: flex;
  align-items: center;
  gap: 1rem;
}
```

## Shape Position to CSS

When shapes have explicit positions in `slides.json` (left, top, width,
height in pixels), convert to CSS positioning:

| JSON Property | CSS Equivalent | Notes |
|--------------|---------------|-------|
| `left` | `left: <px>px` or UnoCSS `ml-<n>` | Relative to slide canvas |
| `top` | `top: <px>px` or UnoCSS `mt-<n>` | Relative to slide canvas |
| `width` | `width: <px>px` or `w-<fraction>` | Use UnoCSS fractions for responsive |
| `height` | `height: <px>px` or `h-<n>` | Use `max-h-<n>` to prevent overflow |

Prefer UnoCSS utility classes over absolute positioning. Use flex/grid
layouts to approximate the original arrangement rather than exact pixel
coordinates when possible — this produces better results across screen sizes.

## Text Formatting to Markdown

| PPTX Run Property | Markdown | Notes |
|------------------|----------|-------|
| `bold: true` | `**text**` | |
| `italic: true` | `*text*` | |
| `bold + italic` | `***text***` | |
| `underline: true` | `<u>text</u>` | HTML tag in Markdown |
| `font: "Consolas"` | `` `text` `` | Monospace → inline code |
| `color` (non-default) | `<span style="color:...">` | Only when color is semantically important |
| `size_pt` ≥ 28 | `# Heading` | Map to heading level by size |
| `size_pt` 20–27 | `## Heading` | |
| `size_pt` 14–19 | `### Heading` | |
| `level` (indent) | Nested list `-  - item` | Each level adds 2 spaces |

## Paragraph Alignment to CSS/UnoCSS

| PPTX Alignment | UnoCSS Class | CSS |
|---------------|-------------|-----|
| `left` | `text-left` | `text-align: left` |
| `center` | `text-center` | `text-align: center` |
| `right` | `text-right` | `text-align: right` |
| `justify` | `text-justify` | `text-align: justify` |
