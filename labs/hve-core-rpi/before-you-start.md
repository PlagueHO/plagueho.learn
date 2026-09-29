---
title: 'Before you start'
description: 'Prepare the pinned editor, repository, runtime, and test environment for the HVE-Core lab.'
lastUpdated: '2026-09-29'
---
<!-- markdownlint-disable-next-line MD025 -->
# Before you start

Complete this preparation before the timed lab begins.

## Prerequisites

You need:

- A paid GitHub Copilot plan. Agent work may consume premium requests or AI credits, depending on your plan.
- Git and a GitHub account that can create a public repository from a template.
- VS Code Insiders or VS Code Stable version 1.106.1 or later. Stable can be preferable in regulated environments.
- Node.js 24.16 or later, or Node.js 22.22.3 or later.
- npm, which is included with Node.js.
- HVE-Core 3.2.2. Module 01 installs and verifies the extension.

Use the **Auto** model unless your facilitator directs otherwise. Keep tasks focused, use `/clear` between manual RPI phases, and do not rerun the autonomous exercise repeatedly against the same feature.

## Create the attendee repository

- [ ] Open the [`github-samples/caldova-careers`](https://github.com/github-samples/caldova-careers) template.
- [ ] Select **Use this template**, create your own public repository, and clone it.
- [ ] Verify that the template issues have been created. You will use issue 01 and issue 05.
- [ ] Confirm that your starting commit is `51f8bd21ca4b5b272bc004781d3ca87fb7a8a79a`.

Run:

```powershell
git rev-parse HEAD
```

If the value differs, stop and ask the facilitator whether the template has changed. Do not silently continue with a different baseline.

## Prepare and verify the application

- [ ] Install dependencies.

```powershell
npm ci
```

- [ ] Run the required Vitest unit test suite.

```powershell
npm run test:unit
```

- [ ] Start the development server and open `http://localhost:4321`.

```powershell
npm run dev
```

- [ ] Add `.copilot-tracking/` to the attendee repository's `.gitignore`.

The lab treats Vitest unit tests as required for both features. Playwright is optional. To prepare Chromium for the optional browser tests, run:

```powershell
npm run test:e2e:install
```

## Known typecheck baseline

> [!NOTE]
> At the pinned commit, `npm run typecheck` reports four existing TS2307 errors involving `../../db/schema` and `../../db/test-helpers`. These errors are part of the starting repository and are not attendee failures. The Task Reviewer may report them. Record that they predate your branch rather than changing unrelated database code.

## Optional Codespaces path

If local installation is restricted, create a Codespace from your attendee repository. Wait for the dev container setup to finish, verify the pinned commit, run the unit tests, and confirm the application at the forwarded port. Editor extension availability and organizational policy can differ in Codespaces, so verify that HVE-Core 3.2.2 is available before the timed session.

## Version transition

> [!IMPORTANT]
> This lab is pinned to HVE-Core 3.2.2, whose stable extension provides the Task Researcher, Task Planner, Task Implementor, Task Reviewer, PR Review, and RPI Agent. Newer HVE-Core source has moved the separate Task agents to `/rpi-*` skills. Each legacy Task agent exercise includes a collapsed future equivalent. As of 2026-09-29, follow the 3.2.2 instructions for the timed lab.

## Ready check

- [ ] The application starts at `http://localhost:4321`.
- [ ] All baseline Vitest unit tests pass.
- [ ] The attendee repository has issues 01 and 05.
- [ ] `.copilot-tracking/` is ignored.
- [ ] Your editor meets the HVE-Core extension requirement.
