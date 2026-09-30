---
title: 'Facilitator notes'
description: 'Public delivery guidance, timing checkpoints, recovery options, and cost-aware model advice.'
lastUpdated: '2026-09-29'
---
<!-- markdownlint-disable-next-line MD025 -->
# Facilitator notes

Use these notes to keep the core experience within 100 minutes while preserving participant control over agent decisions.

## Timing checkpoints

| Elapsed | Expected position | Recovery choice |
|--------:|-------------------|-----------------|
| 15 minutes | HVE principles complete | Use the module 00 solution recap. |
| 25 minutes | HVE-Core 3.2.2 verified | Pair attendees and use the component checklist. |
| 65 minutes | Manual RPI complete | Use representative artifacts, then verify the implementation. |
| 90 minutes | Autonomous RPI complete | Stop after unit tests and compare the workflows verbally. |
| 100 minutes | Adoption plan recorded | Move extra-credit modules to follow-up work. |

Offer the extra-credit modules after the 100-minute core when time allows.

## Protect the learning decisions

- Keep issue 01 as the manual RPI feature and issue 05 as the autonomous RPI feature.
- Require Vitest unit tests for both feature implementations.
- Treat Playwright and PR Review as optional.
- Ask participants to inspect each `.copilot-tracking/` artifact before accepting a handoff.
- Do not use the solution artifacts as a substitute for Research and Plan. Use them only for recovery or comparison.

## Common failures

### Template issues are missing

The bootstrap workflow runs on the first push in a repository created from the template. Confirm that the attendee used **Use this template**, push the initial branch if necessary, and inspect Actions. If organizational policy blocks the workflow, provide the issue 01 and issue 05 acceptance criteria without changing the feature choices.

### The baseline typecheck fails

The pinned repository has four known TS2307 errors. Confirm that the errors match the baseline described in [Before you start](./before-you-start.md). Do not spend lab time repairing unrelated imports.

### Agent output is too broad

Use `/clear`, restate only the current issue and acceptance criteria, identify the expected artifact path, and ask the agent to stop after its assigned phase. Keep the Auto model selected.

### Unit tests fail after implementation

Return to the generated plan and changes log. Ask the responsible agent to address only the failing feature and rerun `npm run test:unit`. If time is short, compare against the module's representative solution artifacts.

### The fork components do not appear

Confirm the sibling layout, exact `.vscode/settings.json` keys, and the `lab` namespace paths. Reload the VS Code window. The settings should load only the new `lab` namespace beside the Marketplace extension, not all core components from the fork.

## Models, billing, and pacing

Copilot usage may consume AI Credits. Do not quote fixed credit amounts. Recommend Auto, small tasks, `/clear` between manual phases, and one autonomous RPI attempt per feature. Participants should stop or switch to representative artifacts if their plan limits further agent work.

## Publication checks

Before delivering this lab after 2026-09-29:

- Recheck that 3.2.2 remains the intended stable teaching version.
- Verify current Copilot CLI plugin commands in a disposable environment.
- Verify the `rpi-*` skill names and artifact paths used in module 07.
- Capture and review every item in [the screenshot inventory](./assets/screenshots/CAPTURE-LIST.md).
