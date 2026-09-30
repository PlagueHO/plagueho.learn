---
title: 'Demonstrate HVE in Copilot CLI'
description: 'Install the HVE Core plugin to demonstrate HVE workflows in Copilot CLI.'
lastUpdated: '2026-09-30'
track: hve-core-rpi
module: 5
slug: extra-credit-security-and-design-thinking
estimatedTimeMinutes: 20
difficulty: advanced
prerequisites:
  - Core 100-minute lab complete
  - Copilot CLI available
audience:
  - software developers
  - security champions
technologies:
  - Copilot CLI
  - HVE-Core
tags:
  - optional
  - security
  - design-thinking
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Demonstrate HVE in Copilot CLI

This extra-credit module is excluded from the 100-minute core total. It demonstrates how the HVE Core plugin exposes Core, Security, and Design Thinking workflows in another GitHub Copilot tool.

> [!CAUTION]
> Copilot CLI plugin commands and behavior are date-sensitive. A facilitator must test these steps in a disposable workspace on the delivery date before presenting them as operational.

## Add the latest marketplace

- [ ] Confirm with the facilitator that the current Copilot CLI behavior has been verified.
- [ ] From a disposable workspace, add the latest HVE-Core marketplace content:

  ```text
  copilot plugin marketplace add microsoft/hve-core
  ```

- [ ] Install the HVE Core plugin. Its bundled agents include the Security and Design Thinking workflows:

  ```text
  copilot plugin install hve-core@hve-core
  ```

- [ ] When the marketplace has already been registered, refresh it before updating the plugins:

  ```text
  copilot plugin marketplace update hve-core
  copilot plugin update hve-core@hve-core
  ```

## Explore the HVE plugins

- [ ] Start Copilot CLI from the attendee `caldova-careers` repository root.
- [ ] Confirm that the HVE Core plugin exposes the `/hve-core:security-review` skill.
- [ ] Use `/agent` to confirm that the HVE Core plugin exposes the **hve-core:dt-coach** agent.
- [ ] Note how the same HVE workflow assets can be delivered through VS Code or Copilot CLI.

## Optional Security exercise

- [ ] Review `src/pages/api/apply.ts` before invoking the skill.
- [ ] Run the HVE Core Security Review skill against that file:

  ```text
  /hve-core:security-review @src/pages/api/apply.ts
  ```

- [ ] Check each finding against the source and discard unsupported claims.
- [ ] Compare the security-focused result with PR Review.
- [ ] Do not paste secrets, applicant data, credentials, or production values into a prompt.

## Optional Design Thinking exercise

- [ ] Activate the Design Thinking coach:

  ```text
  /agent hve-core:dt-coach
  ```

- [ ] Prompt the active agent with this intentionally vague request:

  ```text
  Build a careers dashboard
  ```

- [ ] Follow the Design Thinking coach's instructions as it guides the conversation and recommends the next steps.

## CLI instruction limitation

Plugin instructions may not apply automatically through `applyTo` in Copilot CLI. Reference a required instruction explicitly with `#file:` or copy an approved instruction into the target repository's `.github/instructions/` directory.

## Completion check

- [ ] The HVE Core plugin came from the latest `microsoft/hve-core` marketplace content.
- [ ] HVE Core exposes the `/hve-core:security-review` skill and **hve-core:dt-coach** agent in Copilot CLI.
- [ ] Security findings were checked against source evidence.
- [ ] You followed the Design Thinking coach's guidance through the exercise.
- [ ] You recorded any Copilot CLI discrepancy for publication review.

Compare your observations with [the optional exercise notes](./solution/exercise-notes.md).
