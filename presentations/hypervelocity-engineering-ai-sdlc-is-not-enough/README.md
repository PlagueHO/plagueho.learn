## Hypervelocity Engineering - *Why adding AI to the SDLC is not enough*

An independent Reveal.js presentation for technical leaders, engineering managers, and senior engineers. It sits beside the unchanged [original Slidev presentation](../hypervelocity-engineering/slides.md).

The deck has 41 slides in three 30-minute parts: Introduction to HVE (slides 1-23), Diving deeper into HVE-Core (slides 24-36), and Demos (slides 37-41). The full plan totals 90 minutes, including live demo time. Unplanned Q&A is separate. See [OUTLINE.md](./OUTLINE.md) for the approved narrative, slide order, and visual plan.

The practitioner section starts with Copilot CLI plugin installation and a first bounded RPI task. It continues the illustrative order-update case through DT Coach, UX UI Designer, requirements, reviewed handoffs, Security and Responsible AI support, saved artifacts, customization, and maintenance. Slide 36 switches to the unchanged Apex Dynamics demo.

The current [CLI plugin guide](https://microsoft.github.io/hve-core/docs/getting-started/methods/cli-plugins/) documents VS Code discovery of CLI-installed plugins and instruction loading through `applyTo`. The deck does not extend that claim to every Copilot client or the desktop app. Examples are illustrative, not customer findings or measured results.

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

Source preview uses the shared server in `scripts/serve-presentation.mjs` at the repository root. Keep this deck inside the repository when you use `npm start`. Release ZIP files include a standalone copy of the server.

The preview server treats decoded forward slashes and backslashes as path separators on both Windows and Linux. Requests that resolve outside `dist/` return HTTP `403`. Missing files inside `dist/` return HTTP `404`.

## Build and check

```shell
npm run build
npm test
```

Run `pnpm lint:md` from the repository root to check Markdown.

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

The toolbar stays visible in normal mode. The slide viewport reserves its measured height, including wrapped rows and contextual motion controls. Present mode uses the full viewport, hides the slide headers and footers, and hides the toolbar after a short pause. Move the pointer to the bottom edge to show it.

Keyboard focus, an open toolbar panel, or the pointer over the toolbar keeps it visible. The groups wrap in narrow windows. Hover or focus shows each icon's label. A pointer click releases button focus, including on motion controls. Keyboard activation keeps focus. Select the slide to close an open toolbar panel, including while a drawing tool is active.

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

Old links remain valid: `#/cost` and `#/outcome-measures` open `#/practitioner-workflow`; `#/adoption-commitments` opens `#/customize`. Existing `#/ai-implementation` and `#/outcome-waiting` links still open the corresponding phases of `#/handoffs`.

Speaker view needs HTTP and permission to open a popup. The notes window keeps its initial position relative to the deck as the deck moves. Browser or desktop restrictions can prevent scripts from moving a popup; if that happens, the popup may not follow the deck.

If the browser blocks the popup, the deck shows the notes in an inline panel at the bottom of the slide. Press S or select Close to hide the panel. Notes ship with the public deck; do not put private information in them. See [MDN's `Window.moveTo()` reference](https://developer.mozilla.org/en-US/docs/Web/API/Window/moveTo) for browser limits.

Slides 1-23 contain exact spoken text, with public sources linked separately. Seven stage cues are permitted: two literal `<click>` lines on slide 5, one on slide 10, and four on slide 11. Each marks an animation advance. They appear as text in popup and inline notes.

Slide 11 has one cue before each pillar, in reveal order. Tests exclude the cues from the 3,000-word ceiling and 120 spoken words per allocated minute. Rehearse to confirm delivery within 30 minutes.

Practitioner notes contain starter requests, artifact paths, human decisions, and claim limits. Demo notes retain the live route, with current installation guidance. Each part has a 30-minute allocation. The shorter deeper section needs rehearsal; the timing estimates do not measure personal speaking pace.

### Speaker timing

In *Default* speaker layout, drag the vertical divider to change the Current preview width. Focus the divider and use Left/Right arrow keys for 2% steps. Home sets 25% and End sets 75%. The Upcoming preview and notes use the remaining width. In narrow windows, notes keep the full width below both previews. Other layouts keep their standard arrangement.

The Upcoming preview hides player controls and slide action buttons. The Current preview keeps its controls. These changes do not affect the main presentation.

The narrow timing strip beside the notes shows elapsed time, pause/reset icons, pace, total progress, planned total (`1:30:00`), and part percentage. Hover over the strip for details. Focus the progress line to read the details with a screen reader. Buttons have *Pause timer*, *Resume timer*, and *Reset timer* labels.

The notes header shows *Slide n / 41*, the slide allocation, and its remaining time. Use *Decrease font size* and *Increase font size* for 2 px steps from 16 to 40 px. The default is Arial at 20 px. The selector also offers Verdana, Georgia, and Monospace. All fonts are local. Settings affect only note text. Long notes scroll below the header.

The full notes header stays on one compact row. It uses text-only controls at 12 px, matching the *Elapsed* label, with no control boxes or visible horizontal scrollbar. Tab reaches each control. In narrow panels, focus brings off-screen controls into view. With the header focused, Left/Right moves along the row without changing slides.

Elapsed time and the first slide countdown start when speaker view connects. Each different slide visit starts its full allocation, including backward visits and jumps. Animation advances and same-slide events do not restart it. At 10 seconds or less, a static cue appears and the remaining time pulses once per second. At zero, the countdown stops at *0:00* without an instruction.

Pause freezes elapsed time, the countdown, progress, and pace. Resume excludes paused time. A slide change while paused sets the new allocation but keeps it paused. The pulse stops while paused. Reduced-motion mode keeps the static warning without animation. Countdown digits stay visible. The wall clock stays in the timing details.

The timer and font settings survive popup close/reopen. The timer counts during closure unless paused. Slide visits still start a fresh allocation. Reloading the main deck starts a new timer and restores Arial at 20 px. Reset clears elapsed time and restarts the current countdown. It keeps the slide, pause state, fonts, and fixed schedule.

Timer pause is separate from B (*Pause for questions*) and the slide-motion pause buttons. Those controls do not pause the timing plan. Pause the timer manually for unplanned Q&A. Keep it running during the live demo, including time spent in another application. The inline notes fallback does not provide the timing panel.

The timing details include the active part, its allocation, the current slide's estimated duration, and its planned start and end. Start and end are elapsed times from slide 1, not wall-clock times. Each slide starts after the sum of the preceding slide durations. The two marks on the progress line identify the part boundaries.

| Indicator | Calculation or meaning |
|---|---|
| Total progress | Elapsed time divided by total planned time |
| Part progress | Elapsed time minus the part's planned start, divided by its duration |
| Ahead / Slow down | More than 30 seconds before the current slide's planned start |
| On time | Within the slide's planned window, including the 30-second allowance on each side |
| Behind / Speed up | More than 30 seconds after the current slide's planned end |

Progress is limited to 0-100%. Elapsed time continues past the planned total. The strip shows overrun as `+minutes:seconds`. All elapsed-based indicators use the same timer. Pace guidance uses *Ahead*, *On time*, or *Behind* text, not colour alone. The full details include the *Slow down* or *Speed up* instruction.

Section jumps and backward navigation keep the fixed 90-minute schedule. They change the current planned slide window but do not reset elapsed time or remove skipped slides from the total. The per-visit countdown can therefore differ from pace guidance. For example, an early jump to a later part starts a full slide countdown but can show *Ahead / Slow down*. Animation advances do not change timing.

### Edit timing estimates

Edit each slide's `minutes` field in `slide-meta.mjs`. This is the only source for runtime duration values. `deck.mjs` converts the values to seconds in `data-timing` attributes. For example, `minutes: 2.75` on slide 5 becomes `data-timing="165"`. The speaker panel calculates slide starts, part totals, and the total duration from those attributes.

Keep each part at 30 minutes and the full deck at 90 minutes. The tests check those totals and require positive durations on all 41 slides. Keep the allocation tables in `OUTLINE.md` and the demo substep cut-offs in `DEMO-SCRIPT.md` consistent. After an edit, run `npm run build` and reload the deck and speaker popup.

For PDF export, open `http://127.0.0.1:3043/?print-pdf`, wait for the slides to load, then use the browser's Print command. Enable background graphics. See the [Reveal.js PDF guide](https://revealjs.com/pdf-export/).

Print layout keeps the full 1280 by 720 slide canvas inside each PDF page. Chapter titles and slide numbers use that canvas for their positions.

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
| `bodies-leadership.mjs` | Body markup for the 23 leadership slides and the retained practitioner team pass on slide 35; section separators have empty bodies |
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
| `speaker-window.mjs` | Popup positioning, note font settings, per-visit countdown, shared elapsed timer, and fixed schedule |
| `speaker-timing.css` | Responsive notes header and timing strip, countdown warning, reduced motion, and keyboard focus |
| `speaker-window.test.mjs` | Timing source, click cues, font controls, countdown boundaries, timer lifecycle, pace, and popup integration |
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

The tag-based release workflow builds and tests each Reveal.js deck, then attaches its offline ZIP file to the [GitHub release](https://github.com/PlagueHO/plagueho.learn/releases). It detects Reveal.js through the deck's `package.json` dependencies or devDependencies.

Keep a deck-local lockfile and `build` and `test` scripts. The build must produce `dist/index.html` and local runtime assets. Do not add a dummy `slides.md` file to trigger the Slidev builder.

Slidev release assets use `<presentation>-<tag>.zip`; Reveal.js assets use `<repository>-<presentation>-<tag>.zip`. Both formats contain the built files and `serve.mjs` at the ZIP root. The Slidev starter template is not released. For example, tag `v1.0.0` produces `plagueho.learn-hypervelocity-engineering-ai-sdlc-is-not-enough-v1.0.0.zip`.

## Run a release offline

Download this deck's ZIP file from a GitHub release before you go offline. Extract it into a separate folder. The ZIP contains the built files at its root: `index.html`, CSS, JavaScript modules, images, and `vendor/` with the Reveal.js runtime, notes plugin, and license. It also includes `serve.mjs`, a local Node.js server. You do not need the repository or npm packages to use the extracted deck.

Install Node.js 22.12 or later before you go offline. Open a terminal in the extracted folder that contains `index.html` and `serve.mjs`. Start the loopback-only HTTP server:

```shell
node serve.mjs
```

Open `http://127.0.0.1:3043` in your browser. Keep the terminal open while you present. Press Ctrl+C in that terminal to stop the server.

If port 3043 is in use, select another port:

```shell
node serve.mjs 3044
```

Then open `http://127.0.0.1:3044`. The server uses only Node.js built-in modules and serves the folder that contains `serve.mjs`. It binds only to `127.0.0.1` and is for local use, not production hosting. No `npm install` or Python installation is needed.

Do not open `index.html` directly with a `file://` URL. Presentation controls use JavaScript modules and need HTTP. Speaker view also needs HTTP and permission to open a popup. See the [Reveal.js speaker view documentation](https://revealjs.com/speaker-view/).

All presentation runtime assets load locally. Slides, controls, images, and speaker notes work without an internet connection. Source links, linked websites, and external demo services still need an internet connection.

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
