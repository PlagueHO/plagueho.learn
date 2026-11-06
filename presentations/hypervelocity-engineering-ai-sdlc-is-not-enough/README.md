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

The shared header links to the title slide. The footer names the first section "Introduction to HVE". Each slide in that section shows its chapter. The deeper section and demos keep their own links. Microsoft cover branding and hidden section-separator headers remain unchanged.

| Action | Control |
|---|---|
| Next or previous slide or phase | Arrow keys, Space, or Page Up and Page Down |
| Replay or pause slide 5 motion | Replay motion and Pause motion in its footer; replay keeps the current phase |
| Slide overview | Escape or the Overview link in the slide footer |
| Speaker view with notes and timer | S or the Notes link in the slide footer |
| Pause for questions | B, or the Pause for questions and Questions buttons on slides 23, 35, and 41 |
| Resume | B, Escape, or the resume button |
| Full screen | F |
| Laser pointer | L |
| Draw a red box | R |
| Draw red freehand | D |
| Undo the last drawing | Ctrl+Z |
| Clear all drawings | X |
| Leave the drawing tools | Escape |
| Jump between sections | Part links in the slide footer |
| Browser print layout | Append `?print-pdf` before the URL hash |

Move the pointer to the top edge of the window to show the presentation tools bar. It also shows when you press L, R, or D, or when you tab to it. It hides itself after a short pause. L, R, and D switch a tool on or off.

Drawings and the laser use slide coordinates, so they stay aligned in any window size. Drawings clear when you change slide, when you press X or Escape, and when the overview opens. The first Escape press leaves the tools; the next one opens the overview. L no longer moves to the next slide; use the arrow keys or Space.

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
| `presentation.mjs` | Reveal.js settings and footer button actions |
| `cadence.mjs` | Slide 5 phases, bounded motion, static views, and merged-slide link aliases |
| `annotations.mjs` | Presentation tools: laser pointer, red box, red freehand, undo, and clear |
| `build.mjs` | Static build with local runtime assets |
| `serve.mjs` | Local preview server |
| `deck.test.mjs` | Structure, timing, content, asset, route, and server checks |

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
