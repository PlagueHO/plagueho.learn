---
title: 'HVE principles'
description: 'Connect the Hypervelocity Engineering methodology to the Research, Plan, Implement, and Review workflow.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 0
slug: hve-principles
estimatedTimeMinutes: 15
difficulty: beginner
prerequisites:
  - Before you start
audience:
  - software developers
  - technical leads
technologies:
  - Hypervelocity Engineering
  - HVE-Core
tags:
  - methodology
  - rpi
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# HVE principles

HVE is the methodology. HVE-Core is tooling that provides one proven, opinionated starting point for applying it. HVE-Core evolves rapidly, but the engineering principles remain the anchor.

## Connect the presentation to the lab

- [ ] Open rendered slides [1 through 12](https://plagueho.github.io/plagueho.learn/hypervelocity-engineering/#/1).
- [ ] Identify the four HVE pillars described in the presentation.
- [ ] On slide 12, name the four phases in order: Research, Plan, Implement, Review.
- [ ] Discuss where human intent, evidence, and validation appear in the cycle.

<details class="screenshot-expander">
<summary>📸 Screenshot: the RPI cycle</summary>

`TODO-SCREENSHOT: hve-rpi-slide.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Apply the principles

Use this working interpretation throughout the exercises:

| Principle | Lab behavior |
|-----------|--------------|
| Start with evidence | Research the repository and issue before proposing a change. |
| Make intent explicit | Record acceptance criteria, scope, and decisions in the plan. |
| Work in bounded increments | Give each agent one phase and an explicit stop condition. |
| Preserve traceability | Inspect date-scoped artifacts under `.copilot-tracking/`. |
| Validate outcomes | Require Vitest unit tests and browser verification after implementation. |
| Learn from review | Compare the result with the plan and feed findings into the next cycle. |

- [ ] Explain to a partner why a generated answer is not evidence until it has been checked against the repository.
- [ ] Name one decision that should remain human-owned during the manual RPI exercise.
- [ ] Record the principle you most want to introduce to your team.

## Prepare for the tooling

In module 01 you will inspect the HVE-Core components that operationalize this cycle. The tooling is not the methodology itself. You can adapt the delivery mechanism while preserving the evidence, intent, bounded work, traceability, validation, and learning loop.

If you need a concise recap, compare your notes with [the principles map](./solution/principles-map.md).

## Completion check

- [ ] You can distinguish HVE from HVE-Core.
- [ ] You can describe all four RPI phases.
- [ ] You have identified a human decision point and a validation point.
