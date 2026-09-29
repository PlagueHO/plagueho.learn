---
title: 'Hypervelocity Engineering with HVE-Core'
summary: 'Practice Research, Plan, Implement, and Review with HVE-Core 3.2.2 in a realistic TypeScript application.'
durationMinutes: 100
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
status: published
---
<!-- markdownlint-disable-next-line MD025 -->
# Hypervelocity Engineering with HVE-Core

Turn a feature request into tested code by applying the Hypervelocity Engineering (HVE) methodology with HVE-Core 3.2.2. You will first control each Research, Plan, Implement, and Review (RPI) handoff, then compare that experience with the autonomous RPI Agent.

## Required knowledge

This lab assumes you have an intermediate understanding of VS Code, GitHub
Copilot, and agentic development. You should be comfortable working in VS Code
workspaces, using GitHub Copilot directing agents as they inspect a repository,
use tools, and make changes.

## Learning outcomes

By the end of the lab, you can:

- Explain the relationship between HVE and HVE-Core.
- Distinguish instructions, prompts, agents, skills, plugins, and extensions.
- Use the four HVE-Core 3.2.2 Task agents to implement issue 01.
- Use the HVE-Core 3.2.2 RPI Agent to implement issue 05.
- Inspect the exact `.copilot-tracking/` evidence produced by each phase.
- Choose whether to add organization-specific instructions and an agent to an HVE-Core fork.
- Choose a practical HVE-Core adoption path for your team.

## Core agenda

The five core modules total exactly 100 minutes. Extra-credit modules are not included in that total.

| Module | Topic | Time |
|--------|-------|-----:|
| 00 | [HVE principles](./00-hve-principles/README.md) | 15 minutes |
| 01 | [Install HVE-Core and inspect its components](./01-install-and-components/README.md) | 10 minutes |
| 02 | [Run RPI one agent at a time](./02-rpi-one-agent-at-a-time/README.md) | 40 minutes |
| 03 | [Run the autonomous RPI Agent](./03-rpi-agent/README.md) | 25 minutes |
| 04 | [Wrap up and choose an adoption path](./04-wrap-up/README.md) | 10 minutes |
|  | **Core total** | **100 minutes** |

## Extra-credit modules

- [Security and Design Thinking plugins](./05-extra-credit-security-and-design-thinking/README.md)
- [Fork and customize HVE-Core](./06-extra-credit-fork-and-customize/README.md)
- [Copilot CLI and Copilot app appendix](./07-appendix-copilot-cli-and-app/README.md)

## Start the lab

Complete [Before you start](./before-you-start.md), then begin with [HVE principles](./00-hve-principles/README.md).

## Pinned learning environment

This lab deliberately uses:

- HVE-Core **3.2.2**.
- The [`github-samples/caldova-careers`](https://github.com/github-samples/caldova-careers) template at commit `51f8bd21ca4b5b272bc004781d3ca87fb7a8a79a`.
- Starter GitHub issue 01 for the manual RPI exercise.
- Starter GitHub issue 05 for the autonomous RPI exercise.

These starter labels identify the template's issue definitions. In your attendee repository, find **Search roles by title** and **Add a careers summary** by title in the GitHub **Issues** tab; their assigned issue numbers may differ.

The pin makes the agent names, prompts, handoffs, and generated artifact paths reproducible. HVE-Core evolves rapidly, so do not substitute current `main` documentation for the 3.2.2 workflow during this lab.

## Related presentation

Review rendered slides [1 through 12 of Hypervelocity Engineering](https://plagueho.github.io/plagueho.learn/hypervelocity-engineering/#/1). These slides introduce the methodology, its four pillars, and the RPI cycle used throughout the lab.
