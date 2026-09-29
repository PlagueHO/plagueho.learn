---
title: 'Hypervelocity Engineering with HVE-Core'
summary: 'Practice Research, Plan, Implement, and Review with HVE-Core 3.2.2 in a realistic TypeScript application.'
durationMinutes: 120
difficulty: intermediate
technologies:
  - GitHub Copilot
  - HVE-Core
  - TypeScript
  - Astro
  - Vitest
relatedPresentations:
  - deck: 'hypervelocity-engineering'
    slides: '1-12'
    note: 'Review the methodology and the four RPI phases before beginning the exercises.'
status: draft
---
<!-- markdownlint-disable-next-line MD025 -->
# Hypervelocity Engineering with HVE-Core

Turn a feature request into tested code by applying the Hypervelocity Engineering (HVE) methodology with HVE-Core 3.2.2. You will first control each Research, Plan, Implement, and Review (RPI) handoff, then compare that experience with the autonomous RPI Agent.

> [!WARNING]
> This lab remains a draft. Publication is blocked until all eight product screenshots are supplied and approved, and the pinned Copilot CLI, Copilot app, HVE-Core release currency, and optional Playwright paths are verified in suitable live environments.

<!-- PUBLICATION-BLOCKER: screenshots and live product checks remain unresolved. -->

## Learning outcomes

By the end of the lab, you can:

- Explain the relationship between HVE and HVE-Core.
- Distinguish instructions, prompts, agents, skills, plugins, and extensions.
- Use the four HVE-Core 3.2.2 Task agents to implement issue 01.
- Use the HVE-Core 3.2.2 RPI Agent to implement issue 05.
- Inspect the exact `.copilot-tracking/` evidence produced by each phase.
- Add organization-specific instructions and an agent to an HVE-Core fork.
- Choose a practical HVE-Core adoption path for your team.

## Core agenda

The six core modules total exactly 120 minutes. Optional modules are not included in that total.

| Module | Topic | Time |
|--------|-------|-----:|
| 00 | [HVE principles](./00-hve-principles/README.md) | 15 minutes |
| 01 | [Install HVE-Core and inspect its components](./01-install-and-components/README.md) | 10 minutes |
| 02 | [Run RPI one agent at a time](./02-rpi-one-agent-at-a-time/README.md) | 40 minutes |
| 03 | [Run the autonomous RPI Agent](./03-rpi-agent/README.md) | 25 minutes |
| 04 | [Fork and customize HVE-Core](./04-fork-and-customize/README.md) | 20 minutes |
| 05 | [Wrap up and choose an adoption path](./05-wrap-up/README.md) | 10 minutes |
|  | **Core total** | **120 minutes** |

## Optional modules

- [Security and Design Thinking plugins](./06-extra-credit-security-and-design-thinking/README.md)
- [Copilot CLI and Copilot app appendix](./07-appendix-copilot-cli-and-app/README.md)

## Start the lab

Complete [Before you start](./before-you-start.md), then begin with [HVE principles](./00-hve-principles/README.md).

## Pinned learning environment

This lab deliberately uses:

- HVE-Core **3.2.2**.
- The [`github-samples/caldova-careers`](https://github.com/github-samples/caldova-careers) template at commit `51f8bd21ca4b5b272bc004781d3ca87fb7a8a79a`.
- Starter issue 01 for the manual RPI exercise.
- Starter issue 05 for the autonomous RPI exercise.

The pin makes the agent names, prompts, handoffs, and generated artifact paths reproducible. HVE-Core evolves rapidly, so do not substitute current `main` documentation for the 3.2.2 workflow during this lab.

## Related presentation

Review rendered slides [1 through 12 of Hypervelocity Engineering](https://plagueho.github.io/plagueho.learn/hypervelocity-engineering/#/1). These slides introduce the methodology, its four pillars, and the RPI cycle used throughout the lab.
