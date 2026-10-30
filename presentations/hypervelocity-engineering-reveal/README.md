## Hypervelocity Engineering — Reveal.js edition

An independent presentation for technical leaders, engineering managers, and senior engineers. This deck sits beside the unchanged [original Slidev presentation](../hypervelocity-engineering/slides.md). It is not a Slidev conversion.

The deck has 24 leadership slides for 30 minutes, 10 optional HVE-Core slides for 30 minutes, and five separate demo support slides. Demo and Q&A time are not assigned. See [OUTLINE.md](./OUTLINE.md) and [RESEARCH-NOTES.md](./RESEARCH-NOTES.md).

The approved outline uses the subtitle *Why adding AI to the SDLC is not enough*. It centers on ownership, value validation, specialist participation, and customer capability. Each pillar has a practice slide and a worked example. The selected Quantum Wave 8-S2 visual style uses 50% lighter, content-aligned soft-serve swirls. Both sections remain 30 minutes.

HVE is an engineering operating model, not simply faster coding with AI. A small expert crew and the customer work through a continuous idea, validation, engineering, and feedback loop. The four pillars support that loop: multidisciplinary teams, Design Thinking, production-ready accelerators, and AI throughout the lifecycle.

The recurring loop puts the customer inside the crew. Expert validation and built-in security, observability, testing, and CI/CD remain essential. The aim is shorter time toward production value, not a fixed delivery promise or a claim that a prototype is production-ready.

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

## Build and check

```shell
npm run build
npm test
```

Run `npm run lint:md` from the repository root to check Markdown.

The build copies the pinned Reveal.js runtime, notes plugin, and license into `dist/vendor/`. It does not load a CDN, remote font, or remote script. The package source comes from the developer's npm configuration. The lockfile records the version and integrity without a registry URL.

This deck has its own package and lockfile. It does not change the root pnpm package or the Slidev toolchain.

## Present

| Action | Control |
|---|---|
| Next or previous slide | Arrow keys, Space, or Page Up and Page Down |
| Slide overview | Escape or the Overview link in the slide footer |
| Speaker view with notes and timer | S or the Notes link in the slide footer |
| Pause for questions | B, or the Pause for questions and Questions buttons on slides 24 and 39 |
| Resume | B, Escape, or the resume button |
| Full screen | F |
| Jump between sections | Part links in the slide footer |
| Browser print layout | Append `?print-pdf` before the URL hash |

Speaker view needs HTTP and permission to open a popup. If the browser blocks the popup, the deck shows the notes in an inline panel at the bottom of the slide. Press S or select Close to hide the panel. The notes contain public sources and presenter guidance. They ship with the public deck; do not put private information in them.

For PDF export, open `http://127.0.0.1:3043/?print-pdf`, wait for the slides to load, then use the browser's Print command. Enable background graphics. See the [Reveal.js PDF guide](https://revealjs.com/pdf-export/).

The leadership close includes public resources and routes to questions, the optional deep dive, or demos. The demo recap does not claim that a system reached production.

## Edit

| File | Purpose |
|---|---|
| `deck.mjs` | Slide renderer: in-slide header and footer, wave background, title, body, and notes |
| `slides.mjs` | Merges slide metadata with slide bodies and keeps the order |
| `slide-meta.mjs` | Slide IDs, parts, timing, titles, speaker notes, and wave presets |
| `bodies-leadership.mjs` | Body markup for the 24 leadership slides |
| `bodies-core.mjs` | Body markup for the optional HVE-Core and demo slides |
| `diagrams.mjs` | Shared diagram parts: nodes, chains, loops, lanes, bands, return paths, and icons |
| `sources.mjs` | Public sources for each slide |
| `DEMO-SCRIPT.md` | Live demo runbook for slides 35-39: time plan, commands, prompts, and fallbacks |
| `waves.mjs` | Soft-serve ribbon backgrounds |
| `index.html` | Accessible presentation shell and build insertion marker |
| `theme.css` | Light theme, 1280 by 720 layout grid, diagram styles, and print rules |
| `presentation.mjs` | Reveal.js settings and footer button actions |
| `build.mjs` | Static build with local runtime assets |
| `serve.mjs` | Local preview server |
| `deck.test.mjs` | Structure, timing, content, asset, route, and server checks |

Every slide uses the same grid: header at the top, title at a fixed position, a content area for one diagram, one takeaway line, and a footer with the part links and the slide number. Diagrams are built from the shared parts in `diagrams.mjs`, so spacing, arrows, and return paths stay consistent. Conceptual flows carry the label "Illustrative, not to scale". The deck uses no automatic motion.

The light canvas, large headings, purple and tangerine accents, subtle content-aligned swirls, horizontal pillars, and recurring customer-and-crew loop follow the selected visual direction. All text and diagrams are original. Private photos, transcripts, and the supplied internal-source guide are not included. The deck avoids unsupported productivity claims and private customer results.

## Publish

Build the deck and copy the *contents* of `dist/` to a static host. All runtime paths are relative, so a repository subpath is supported.

The current repository publishing workflows discover Slidev `slides.md` files. They do not publish this standalone deck. CI and GitHub Pages integration is a separate change; do not add a dummy `slides.md` file to trigger the Slidev builder.

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
