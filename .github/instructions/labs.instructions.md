---
description: 'Hands-on lab authoring and maintenance standards'
applyTo: 'labs/**/*.md'
---

## Source and generated content

Author lab content only under `labs/<lab-name>/`. Treat these files as the source of truth.

The `pnpm labs:generate` command recreates these generated surfaces:

- `labs-site/index.md`
- `labs-site/<lab-name>/`
- `labs-site/.vitepress/labs-sidebar.ts`

Do not edit generated files to change lab content. Update the matching source under `labs/`, then run the generator. Site configuration and theme files under `labs-site/.vitepress/` remain authored files.

## Lab layout

Use this structure:

```text
labs/<lab-name>/
├── README.md
├── before-you-start.md
├── facilitator-notes.md
├── assets/
│   └── screenshots/
│       └── CAPTURE-LIST.md
├── 00-first-module/
│   ├── README.md
│   └── solution/
└── 01-next-module/
    ├── README.md
    └── solution/
```

The lab and module folder names must use kebab-case. Module folders must start with a zero-padded number followed by the module slug, such as `02-run-the-agent`.

## Lab frontmatter schema

Every `labs/<lab-name>/README.md` requires:

```yaml
---
title: 'Lab title'
summary: 'One-sentence catalogue summary.'
durationMinutes: 120
difficulty: intermediate
technologies:
  - GitHub Copilot
relatedPresentations:
  - deck: 'presentation-folder'
    slides: '1-12'
    note: 'Explain how the presentation prepares the attendee.'
status: published
---
```

Use a positive integer for `durationMinutes`. Use `beginner`, `intermediate`, or `advanced` for `difficulty`. Use `draft`, `published`, or `archived` for `status`. `technologies` must contain at least one value. `relatedPresentations` must be an array, and each referenced deck must have `presentations/<deck>/slides.md`.

The first H1 in the page body must exactly match `title`. The lab folder supplies the public slug and must not use a reserved name such as `index`, `assets`, `public`, or `.vitepress`.

## Module frontmatter schema

Every numbered module `README.md` requires:

```yaml
---
title: 'Module title'
description: 'One-sentence module outcome.'
lastUpdated: '2026-09-29'
track: lab-folder-name
module: 0
slug: first-module
estimatedTimeMinutes: 15
difficulty: beginner
prerequisites:
  - Before you start
audience:
  - software developers
technologies:
  - GitHub Copilot
tags:
  - rpi
status: published
contentType: lab
---
```

Use `YYYY-MM-DD` for `lastUpdated`. The `track` value must match the lab folder. The integer `module`, the folder number, and the folder's zero-padding must match. The `slug` must match the folder text after the number. Use a positive integer for `estimatedTimeMinutes`, an allowed difficulty and status, and `lab` for `contentType`.

`audience`, `technologies`, and `tags` must be non-empty string arrays. `prerequisites` may be empty. The first H1 must exactly match `title`.

## Supporting page schema

`before-you-start.md` is required. `facilitator-notes.md` is optional. Both use:

```yaml
---
title: 'Before you start'
description: 'Preparation required before the timed lab.'
lastUpdated: '2026-09-29'
---
```

The validator requires non-empty `title` and `description` values and an H1 that exactly matches `title`. Use `lastUpdated` so generated pages display useful maintenance metadata.

## Tasks, screenshots, and future content

- Write attendee actions as unchecked Markdown task boxes: `- [ ] Complete the action`.
- Keep each task self-contained and stable. Task text contributes to the persistent browser-storage identifier.
- Put screenshots in `assets/screenshots/` with descriptive kebab-case names.
- Record every planned capture in `assets/screenshots/CAPTURE-LIST.md`.
- Use an accessible screenshot expander:

```html
<details class="screenshot-expander">
<summary>📸 Screenshot: concise checkpoint name</summary>

`TODO-SCREENSHOT: descriptive-file-name.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>
```

- Replace each `TODO-SCREENSHOT` placeholder with an image that has meaningful alt text before publication.
- Mark unavailable future steps with a collapsed `<details>` expander whose summary starts with `🔮 Coming soon`. State the dependency or release condition inside it.

## Solutions

Place optional recovery, comparison, and answer material under the corresponding module's `solution/` folder. Link to it from the module only after the attendee has attempted the task. Do not use solutions as the primary exercise path.

Solution folders may contain Markdown, source files, or nested repository-shaped examples. Keep all links relative so the generator can copy and rewrite them for the published site.

## Commands and validation

Run commands from the repository root:

```powershell
pnpm validate:lab-frontmatter
pnpm test:lab-scripts
pnpm lint:md
pnpm labs:build
```

Use these commands during authoring:

```powershell
pnpm labs:generate
pnpm labs:dev
pnpm labs:preview
```

The validator checks schemas, route uniqueness, folder-to-frontmatter consistency, required files, and related presentation sources. The generator fails for unresolved internal links. The VitePress build fails for dead links and site build errors. Markdown lint covers authored lab Markdown and excludes generated lab pages.

## Add-a-lab checklist

1. Create the kebab-case `labs/<lab-name>/` folder.
1. Add the lab `README.md` with valid lab frontmatter and a matching H1.
1. Add `before-you-start.md`; add `facilitator-notes.md` when the lab supports guided delivery.
1. Add one or more numbered module folders with valid metadata and matching slugs.
1. Add attendee actions as task boxes.
1. Add screenshot assets and maintain the capture inventory.
1. Add optional module-level `solution/` folders.
1. Add valid `relatedPresentations` entries when the lab supports a deck.
1. Run `pnpm validate:lab-frontmatter`.
1. Run `pnpm test:lab-scripts`.
1. Run `pnpm lint:md`.
1. Run `pnpm labs:build`.
1. Review the generated navigation and lab routes with `pnpm labs:preview`.
