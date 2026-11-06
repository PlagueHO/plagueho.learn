## Hypervelocity Engineering - *Why adding AI to the SDLC is not enough*

An independent Reveal.js presentation for technical leaders, engineering managers, and senior engineers. It sits beside the unchanged [original Slidev presentation](../hypervelocity-engineering/slides.md).

The deck has 41 slides: 23 leadership slides (27 minutes), 13 deeper HVE-Core slides (34.5 minutes), and five demo support slides. The live demo has a separate 30-minute budget. See [OUTLINE.md](./OUTLINE.md) for the approved narrative, slide order, and visual plan.

Use [RESEARCH-NOTES.md](./RESEARCH-NOTES.md) for public evidence, claim boundaries, and version-sensitive HVE-Core behavior. Use [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) as the live demo runbook. Slide-specific speaker notes stay in `slide-meta.mjs`.

## Run locally

Use Node.js 22.12 or later. Run these commands from this folder:

```shell
npm ci
npm start
```

Open `http://127.0.0.1:3043`. To use another port:

```shell
npm run preview -- 3044
```

`npm start` builds once and starts a loopback-only server. It does not watch files. After an edit, run `npm run build` in another terminal and reload the page.

The preview server treats decoded forward slashes and backslashes as path separators on both Windows and Linux. Requests that resolve outside `dist/` return HTTP `403`. Missing files inside `dist/` return HTTP `404`.

## Build and check

```shell
npm run build
npm test
```

Run `npm run lint:md` from the repository root to check Markdown.

The build copies the pinned Reveal.js runtime, notes plugin, and license into `dist/vendor/`. It does not load a CDN, remote font, or remote script. The package source comes from the developer's npm configuration. The lockfile records the version and integrity without a registry URL.

This deck has its own package and lockfile. It does not change the root pnpm package or the Slidev toolchain.

The Continuous Integration workflow builds and tests this deck on Ubuntu for pull requests and pushes to `main`. It uses the same `npm ci`, `npm run build`, and `npm test` commands as the Deploy GitHub Pages workflow.

## Present

One floating icon toolbar sits at the bottom of the window. It contains section navigation, slide controls, notes, drawing tools, slide motion, themes, and presentation settings. Each slide keeps its chapter header, branding, and slide count. Microsoft cover branding and hidden section-separator headers remain unchanged.

| Action | Control |
|---|---|
| Next or previous slide or phase | Arrow keys, Space, or Page Up and Page Down |
| First or last slide | Home or End |
| Replay or pause motion on slides 5, 7, and 8 | Contextual Replay motion and Pause motion toolbar buttons; replay keeps the current phase |
| Slide overview | Escape or the Overview toolbar button |
| Speaker view with notes and timer | S or the Notes toolbar button |
| Pause for questions | B, the Pause toolbar button, or the existing question buttons on slides 23, 35, and 41 |
| Resume | B, Escape, or the resume button |
| Present mode | P or the Present toolbar button |
| Fullscreen | F or the Fullscreen toolbar button |
| Zoom 2x | Z or the Zoom toolbar button; move the pointer to pan |
| Laser pointer | L |
| Draw a box | R |
| Draw an arrow | A; drag from the tail to the arrowhead |
| Draw freehand | D |
| Select the colour for new boxes, arrows, and freehand marks | Swatch button in the Drawing group opens a 12-colour palette |
| Set the line thickness for new boxes, arrows, and freehand marks | Line thickness button opens Thin, Medium, and Thick presets with line previews |
| Undo the last drawing | Ctrl+Z |
| Clear all drawings | X |
| Leave the drawing tools | Escape |
| Jump between sections | Section menu in the toolbar |
| Select a theme | Theme selector in the toolbar |
| Show keyboard help | Keys toolbar button |
| Browser print layout | Append `?print-pdf` before the URL hash |

The toolbar stays visible in normal mode. Present mode hides the slide headers and footers and hides the toolbar after a short pause. Move the pointer to the bottom edge to show it. Keyboard focus, an open toolbar panel, or the pointer over the toolbar keeps it visible. The groups wrap in narrow windows. Hover or focus shows each icon's label.

Present mode does not start browser fullscreen. Fullscreen needs browser permission. If the browser rejects it, a visible notice gives a recovery action. Browser Escape can exit fullscreen before the deck receives the key.

Zoom applies one transform to the slides and drawings. Pointer panning stops while a drawing tool or existing marks are active, so the canvas does not move under the pen. Clear the marks and leave the tool to pan again. Zoom resets on Tab, slide changes, resize, fullscreen changes, overview, pause, print, and exit from Present mode.

L, R, A, and D switch a tool on or off. Drawings and the laser use slide coordinates, so they stay aligned in any window size and at 2x zoom. Drawings clear when you change slide, when you press X or Escape, and when the overview opens. L no longer moves to the next slide; use the arrow keys or Space.

Red is the default drawing colour. The swatch palette also offers Orange, Yellow, Green, Cyan, Blue, Purple, Pink, Brown, Black, Grey, and White. A check mark identifies the selected swatch. Names appear on hover and are available to screen readers.

Line thickness has three presets: Thin (3), Medium (6), and Thick (10), measured on the 1280 by 720 slide canvas. Medium keeps the previous line thickness. A line preview and check mark identify each preset and the selected one.

Colour and thickness settings affect new boxes, arrows, and freehand marks without changing existing marks. Both settings stay active across slides until you reload the page. The laser pointer stays red and keeps its fixed size.

Escape closes one active state at a time: an open toolbar panel, inline notes, drawing tools and marks, zoom, then Present mode. After those states close, Reveal handles Escape for pause or overview.

Arrow keys move focus between toolbar buttons. In the swatch palette, Left and Right move one swatch; Up and Down move one row. In the thickness panel, arrow keys move one preset. Home and End reach the first and last choices. Enter or Space selects a choice and closes the panel. Escape closes it without changing the selection.

Tab also reaches the swatches, thickness presets, theme selector, and section links. Native controls keep their normal keyboard behavior. Shortcuts do not advance the deck while a button, link, input, or selector has focus.

Flowing blend is the default light theme. Select Flowing dark for a dark canvas. Theme URLs use `?theme=flowing-blend` or `?theme=flowing-dark` before the slide hash. For example, `?theme=flowing-dark#/handoffs/1` opens the dark theme at slide 5's final phase.

Theme changes apply without reloading and preserve the current slide and phase. Reload, Back, and Forward keep the selected theme. Other query parameters, including `print-pdf`, stay in the URL.

Speaker view needs HTTP and permission to open a popup. The notes window keeps its initial position relative to the deck as the deck moves. Browser or desktop restrictions can prevent scripts from moving a popup; if that happens, the popup may not follow the deck.

If the browser blocks the popup, the deck shows the notes in an inline panel at the bottom of the slide. Press S or select Close to hide the panel. The notes contain public sources and presenter guidance. They ship with the public deck; do not put private information in them. See [MDN's `Window.moveTo()` reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/moveTo) for browser limits.

For PDF export, open `http://127.0.0.1:3043/?print-pdf`, wait for the slides to load, then use the browser's Print command. Enable background graphics. See the [Reveal.js PDF guide](https://revealjs.com/pdf-export/).

Slide-specific content and visual intent are in [OUTLINE.md](./OUTLINE.md). Keep speaker notes in `slide-meta.mjs`. The deck provides complete static views for motion slides in overview, reduced-motion, print, and script-failure states.

## Edit

| File | Purpose |
|---|---|
| `deck.mjs` | Slide renderer: in-slide header and footer, wave background, title, body, and notes |
| `slides.mjs` | Merges slide metadata with slide bodies and keeps the order |
| `amplification.mjs` | Slide-7 wheel motion, rule propagation, reuse, and static viewing states |
| `readiness.mjs` | Slide-8 feature arrivals, readiness backlog, and rework motion |
| `finite-motion.mjs` | Shared bounded-motion lifecycle and SVG token positioning for slides 7 and 8 |
| `operating-model.mjs` | Slide-10 single-advance model replacement and complete static viewing states |
| `slide-meta.mjs` | Slide IDs, parts, timing, titles, speaker notes, and wave presets |
| `bodies-leadership.mjs` | Body markup for the 23 leadership slides and for slides 33-35 of the deeper section; section separators have empty bodies |
| `bodies-core.mjs` | Body markup for the deeper HVE-Core and demo slides |
| `diagrams.mjs` | Shared diagram parts: nodes, chains, loops, lanes, bands, return paths, and icons |
| `sources.mjs` | Public sources for each slide |
| `qr.mjs` | Self-contained QR code encoder for the slide 23 links; tests pin its output |
| `DEMO-SCRIPT.md` | Live demo runbook for slides 37-41: time plan, commands, prompts, and fallbacks |
| `waves.mjs` | Static Flowing blend background with slide-scoped SVG definitions |
| `images/` | Local presenter photo, presenter-supplied team and Design Thinking PNGs, and earlier original illustrations, copied into the build |
| `index.html` | Accessible presentation shell and build insertion marker |
| `theme.css` | Light theme, 1280 by 720 layout grid, diagram styles, and print rules |
| `presentation.mjs` | Reveal.js settings, speaker notes, and in-slide question actions |
| `presenter-controls.mjs` | Shared toolbar, keyboard safety, navigation, zoom, themes, Present mode, and fullscreen |
| `presenter-controls.css` | Bottom toolbar, responsive groups, focus, panels, and Present-mode visibility |
| `flowing-dark.css` | Dark palette and diagram overrides; original images and brand marks stay unchanged |
| `cadence.mjs` | Slide 5 phases, bounded motion, static views, and merged-slide link aliases |
| `annotations.mjs` | Presentation tools: red laser pointer, boxes, arrows, freehand, 12 drawing colours, undo, and clear |
| `build.mjs` | Static build with local runtime assets |
| `serve.mjs` | Local preview server |
| `deck.test.mjs` | Structure, timing, content, asset, route, and server checks |
| `presenter-controls.test.mjs` | Toolbar, drawing palette, arrow geometry, keyboard ownership, navigation boundaries, theme URLs, Escape order, and zoom geometry |

Content slides use a shared grid: header, title, diagram, takeaway, and footer. Section separators show only the centered title and background. Diagrams use shared parts in `diagrams.mjs`, with slide-specific layouts where needed. Conceptual flows are labelled as illustrative.

Slide 2 has a scaled timeline entry animation. Slides 5, 7, and 8 use bounded motion or native Reveal.js fragments. Slide 10 has a single model-replacement transition. Complete static views remain available.

The light canvas, large headings, purple and tangerine accents, static Flowing blend background, horizontal pillars, and recurring customer-and-crew loop follow the selected visual direction. All text and diagrams are original. Private photos, transcripts, and the supplied internal-source guide are not included. The deck avoids unsupported productivity claims and private customer results.

The cover uses Daniel Scott-Raynsford's public [GitHub profile photo](https://github.com/PlagueHO), saved in `images/` at his request. It loads from the built site, not GitHub. The Microsoft mark follows the four-colour treatment already used in the repository's Spec Kit presentation.

## Publish

Build the deck and copy the *contents* of `dist/` to a static host. All runtime paths are relative, so a repository subpath is supported.

The Deploy GitHub Pages workflow builds and tests this deck, then publishes it at [hypervelocity-engineering-ai-sdlc-is-not-enough](https://plagueho.github.io/plagueho.learn/hypervelocity-engineering-ai-sdlc-is-not-enough/). The [Presentations index](https://plagueho.github.io/plagueho.learn/) reads the deck's `presentation` metadata from `package.json`.

The tag-based release workflow still packages only Slidev presentations. Do not add a dummy `slides.md` file to trigger the Slidev builder.

## Demo preparation

The live demo runs on the public [Apex Dynamics Response Systems](https://github.com/PlagueHO/Apex-Dynamics-Response-Systems) repository. [DEMO-SCRIPT.md](./DEMO-SCRIPT.md) holds the time plan, commands, prompts, and prepared fallbacks. It is presenter support, not a slide.

Still required before live delivery:

- Assign separate Q&A time. The demo has a 30 minute budget.
- Rehearse the whole flow twice and save the prepared fallback artifacts.
- Verify the CLI plugin syntax and the cross-tool install claim on the demo machine.
- Confirm the phase ID in the generated plan before running `rpi-implement`.
- Fill the recap callouts from the rehearsal or the actual run.

Support slides do not establish that the live demo is ready. The original deck's Marginalia script is not this demo route.

## Framework references

- [Reveal.js installation](https://revealjs.com/installation/)
- [Reveal.js configuration](https://revealjs.com/config/)
- [Reveal.js speaker view](https://revealjs.com/speaker-view/)
- [Reveal.js 6.0.2 release](https://github.com/hakimel/reveal.js/releases/tag/6.0.2)
