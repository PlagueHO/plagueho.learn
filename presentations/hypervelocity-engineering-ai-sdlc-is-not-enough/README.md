## Hypervelocity Engineering - *Why adding AI to the SDLC is not enough*

An independent presentation for technical leaders, engineering managers, and senior engineers. This deck sits beside the unchanged [original Slidev presentation](../hypervelocity-engineering/slides.md). It is not a Slidev conversion.

The deck has 25 leadership slides for 30 minutes, 10 optional HVE-Core slides for 30 minutes, and five separate demo support slides. The live demo has a separate 30-minute budget. Q&A time is not assigned. See [OUTLINE.md](./OUTLINE.md) and [RESEARCH-NOTES.md](./RESEARCH-NOTES.md).

The executive revision is being reviewed one slide at a time. The opening uses a wide title, one plain executive subtitle, and presenter details. Speaker notes ask how the business must change when building becomes faster than deciding. Each pillar keeps its practice/example pair. Both timed sections remain 30 minutes.

The selected *Flowing blend* background adds lavender, peach, and rose haze, pale bands, and fine lines across all 40 slides. The approved cover, timeline, and fault line are now slides 1, 2, and 4. Slides 3 and 9 use approved titles and selected C: Warm key phrase. Slide 5 uses selected A: Sweeping arcs. Later copy, the order-status thread, and numbered pillars remain under revision.

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

The shared header reads "Hypervelocity Engineering • Why adding AI to the SDLC is not enough" and links to the title slide. The Microsoft cover branding and hidden headers on section separators remain unchanged.

| Action | Control |
|---|---|
| Next or previous slide or phase | Arrow keys, Space, or Page Up and Page Down |
| Replay or pause slide 5 motion | Replay motion and Pause motion in its footer; replay keeps the current phase |
| Slide overview | Escape or the Overview link in the slide footer |
| Speaker view with notes and timer | S or the Notes link in the slide footer |
| Pause for questions | B, or the Pause for questions and Questions buttons on slides 25 and 40 |
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

Slide 2 animates the selected timeline arrow over 3.6 seconds. Milestones slide in from above or below as the tip reaches their year. The sequence completes in about four seconds and repeats on re-entry. Overview, reduced-motion, print, and script-failure views show the complete static timeline. Date sources and limits remain in speaker notes.

The `~2023` date and its caption are centered under the orange timeline marker.

Slides 3 and 9 are matching section separators. They show one centered line on the current background, with warm emphasis on outcomes. The first asks, "We’re delivering code faster. Are we delivering better outcomes?" The second introduces the response: "From faster code delivery to better business outcomes."

Headers and footers are hidden on these slides. Keyboard navigation, Escape for overview, and S for notes remain available.

Slide 4 uses the selected box-free fault-line diagram. It shows delivery gaps without statistics.

Slide 5 combines the former slides 4-6. Use two presenter advances to show long cycles, faster implementation, then unchanged process constraints. Only implementation shrinks and rotates faster. Labels stay fixed. Its dashed former outline and human handoffs stay visible. The final phase adds decision and review waits. Each phase settles within six seconds. Sizes and speeds are illustrative.

The changing caption uses selected B: warm key phrases, muted supporting text, and a short fade on phase changes. It matches the takeaway's 26px semibold type. There is no phase counter. Extra space separates the caption from the cycles without changing their size.

Motion pauses when the page is hidden or the deck is paused. It stops when the slide is left. Overview, reduced-motion, print, and script-failure views show the complete static comparison. Reduced-motion navigation skips the two animation steps.

Old `#/ai-implementation` and `#/outcome-waiting` links open the corresponding phases of `#/handoffs`. Security, quality, operations, and required independent review remain.

Slide 6 uses selected A under the broader title "Delivering software faster. But not delivering the outcome." The business requests a chatbot to reduce order calls. The carrier moves delivery from Friday to Monday, but the order record and chatbot still say Friday. No team owns the update. The customer needs a trustworthy revised date and clear next action.

The two-panel comparison stays. Speaker notes explain the whole scenario and distinguish a shipped feature from a solved customer problem. This Friday-to-Monday case is the baseline for later leadership examples. The teaching boundary stays in notes; there is no visible scenario label.

The failure predates AI. Faster implementation can let more unvalidated requests reach delivery while the customer problem remains unsolved. The response is to use that speed for learning and to own the customer outcome, not slow development.

Slides 17 and 19 still use this Friday-to-Monday case pending individual review. They show a proposed carrier-update increment on reused controls and AI-assisted drafts checked by support, product, engineering, and operations. No customer research, completed integration, review result, or measured gain is claimed. The optional manufacturing tutorial stays separate.

Slide 7 uses two wheels from slide 5's visual language. The PM/SME/customer stays in the slower design/planning loop while the agent makes an assumption. Each fast turn copies the same unvalidated rule into behaviour, tests, and later increments. A curved return arc shows that rule becoming the starting point for more work.

"More decisions. Validation lags." explains the pressure. When decision demand exceeds business validation capacity, more gaps can be filled with assumptions. Reuse then spreads each assumption's consequences. The animation follows one assumption; the copies are dependent uses, not a count of distinct new assumptions.

The six-second sequence accumulates three copies in each output, then freezes. Implementation makes three turns while planning makes a quarter turn. These are conceptual cues, not measured speeds or completed outcomes. Replay and pause controls use the slide footer. Hidden pages and deck pause freeze the active time budget; slide exit stops it.

Overview, reduced motion, print, and script failure show the complete static meaning. Passing tests does not remove the unvalidated-rule tag. The slide stays general and does not revisit the order-status case.

The takeaway is "The question is still open. The product already contains an answer." Notes explain the impact of a decision made by default, distinguish it from legitimate technical choices, and leave the response for the next section. There is no scale label.

Slide 8 uses a fast implementation wheel, a growing feature backlog, and a slower production-readiness wheel. The last wheel names acceptance tests, assurance checks, and release readiness, not teams. One marker enters readiness while more arrive. A straight return line with equal rounded corners shows late rework.

The three headings share one row. Three short captions share another. The return line joins the bottom centre of each wheel and runs behind the lower labels. "Late rework" is centred on the horizontal section.

The title is "Features arrive faster. Production readiness falls behind." The takeaway is "More finished code. More unfinished readiness work." The slide explains the problem; it does not show a solution lane or recommend removing assurance.

The six-second sequence ends with seven waiting markers. Counts and speeds are conceptual, not measured throughput or released features. Replay, pause, hidden-page, overview, reduced-motion, print, and script-failure behavior match slide 7. Both sequences share their bounded-motion lifecycle.

Notes include a roughly 75-second talk track. The later response shifts suitable work left and runs it continuously, including security-agent support during design, planning, and coding. Prepared foundations do not replace expert judgment, operational ownership, or required independent review.

Slide 10 introduces "Hypervelocity Engineering" with the subtitle "How we change the delivery operating model". Advance once to replace serial handoffs with a circular idea, validation, engineering, and feedback loop. The larger centre keeps the customer and expert crew readable. Product, design, engineering, testing, security, operations, release, and service work support the short feedback cycle.

The circle is static. Four purple arrowheads at its top, right, bottom, and left show the clockwise sequence. Overview, reduced motion, print, and script failure show both models. Static modes do not add an invisible fragment step. The visual has no assurance caption. Required independent review and continuous assurance remain in the notes.

Its roughly 30-second talk track connects customer needs, decisions, and readiness work to shared ownership and learning. The wider production model is a proposal to test, not a fixed formula or a production-readiness guarantee. A POC or MVP still needs suitable operational and assurance work. Detailed pillars and toolkit features remain on later slides.

Slide 11 uses selected B: four structural pillars without numbers. Advance four times with Right Arrow or Space to reveal one complete challenge, arrow, and practice column per step. Left Arrow reverses the sequence. The lower labels use 27px type with space inside the dashed edges.

The title and ISE/FDE credit stay visible. Overview, print, and script failure show all four pillars. Reduced motion keeps the click sequence without a fade. The brief notes credit delivery experience rather than explain each pillar. The associations are not exclusive one-to-one solutions.

Slides 12-19 carry a faint bottom-left pillar number above the swirl and below all content. Each pair uses the same number: 1, 1, 2, 2, 3, 3, 4, 4. The numeral is 585px at 7% opacity and is hidden from accessibility reading. Slides 12, 16, and 18 use "Pillar n: Title." with a subtitle on the next line. Slide 14 uses a compact one-line title. Example-slide headings stay separate.

Slide 14 keeps the complete presenter-supplied Design Thinking image, with smaller embedded labels. The message below it explains why the practice matters when coding gets faster: use AI speed to test assumptions, not build the wrong thing faster. Lower coding barriers do not replace customer and domain expertise.

Its 90-second notes connect the three spaces to the chatbot's stale date and the customer's intended outcome. Leaders must provide customer access, expert time, and decision authority. Forward arrows are a reading path, not fixed gates. The 10x-50x range is a hypothetical illustration, not a measured result.

Slide 15 uses the selected paper-and-pencil treatment. Its body introduces one principle: test the requested chatbot against the customer's task. The bottom line gives the action and why it matters with faster AI coding: test value early, then change or stop options that do not help. Wrong assumptions can mean more rework.

The 90-second notes retain the decision owner, customer evidence, and required assurance. The test is proposed, not completed. Stopping an option does not remove responsibility for the customer outcome. The full date-change recap is not repeated. Visible text and notes do not use em dashes.

Slide 16 uses the selected A2 capability library. AI agents, Agent Skills, tools, and organizational knowledge feed "Agentic capabilities." Matching icons form an arc above the supplied team image. There is no oval behind it. The message is to give every team access to reusable expertise, not add a person for every role.

The capability examples draw on the [HVE-Core role index](https://github.com/microsoft/hve-core/blob/main/docs/hve-guide/roles/README.md) and TPM guide. They do not claim ready-made coverage for every capability. Notes retain access, maintenance, adaptation, and required assurance.

The leadership close includes public resources and routes to questions, the optional deep dive, or demos. The demo recap does not claim that a system reached production.

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
| `bodies-leadership.mjs` | Body markup for the 25 leadership slides; section separators have empty bodies |
| `bodies-core.mjs` | Body markup for the optional HVE-Core and demo slides |
| `diagrams.mjs` | Shared diagram parts: nodes, chains, loops, lanes, bands, return paths, and icons |
| `sources.mjs` | Public sources for each slide |
| `DEMO-SCRIPT.md` | Live demo runbook for slides 36-40: time plan, commands, prompts, and fallbacks |
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

Slide 2 has a scaled timeline entry animation. Slide 5 has bounded sweeping arcs and native Reveal.js fragment phases. Other planned animated diagrams retain their static versions.

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
