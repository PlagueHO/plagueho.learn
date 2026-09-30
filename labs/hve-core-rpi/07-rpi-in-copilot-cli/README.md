---
title: 'Run the RPI process in Copilot CLI'
description: 'Implement the Sort roles backlog issue with the HVE Core rpi-* skills in Copilot CLI.'
lastUpdated: '2026-09-30'
track: hve-core-rpi
module: 7
slug: rpi-in-copilot-cli
estimatedTimeMinutes: 30
difficulty: advanced
prerequisites:
  - Core 100-minute lab complete
  - Copilot CLI available
audience:
  - software developers
technologies:
  - Copilot CLI
  - HVE-Core
  - TypeScript
  - Vitest
tags:
  - optional
  - cli
  - rpi-skills
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Run the RPI process in Copilot CLI

This extra-credit module is excluded from the 100-minute core total. Run a complete Research, Plan, Implement, and Review cycle in Copilot CLI against a backlog issue you have not yet implemented, driving each phase with an `rpi-*` skill.

Each phase is a separate skill that you invoke from the terminal. You will inspect the durable artifact produced at every handoff before moving to the next phase.

> [!CAUTION]
> Copilot CLI plugin commands and behavior are date-sensitive. A facilitator must test these steps in a disposable workspace on the delivery date before presenting them as operational.

## Install Copilot CLI and the HVE Core plugin

- [ ] Install Copilot CLI through an approved current channel, such as npm, WinGet, or Homebrew. Use the current official installation guidance for the exact command.
- [ ] Add the latest HVE-Core marketplace content:

  ```text
  copilot plugin marketplace add microsoft/hve-core
  ```

- [ ] Install the HVE Core plugin:

  ```text
  copilot plugin install hve-core@hve-core
  ```

- [ ] When the marketplace has already been registered, refresh it before updating the plugin:

  ```text
  copilot plugin marketplace update hve-core
  copilot plugin update hve-core@hve-core
  ```

- [ ] Confirm that the plugin exposes the `/hve-core:rpi-research`, `/hve-core:rpi-plan`, `/hve-core:rpi-implement`, and `/hve-core:rpi-review` skills.

## Choose the backlog issue and branch

- [ ] In the **Issues** tab of your attendee `caldova-careers` repository on GitHub, open the issue titled **Sort roles**. Read its description and acceptance criteria, note the issue number assigned in your repository, and keep the issue open while you work.

  This issue is not used by any earlier module, so the RPI cycle starts from real, unimplemented work.

- [ ] Confirm that `.copilot-tracking/` is in `.gitignore`.
- [ ] Commit or stash any pending work, then create a branch from `main` for the sort feature:

  ```powershell
  git switch main
  git switch -c feature/sort-roles
  ```

- [ ] Start Copilot CLI from the root of your attendee `caldova-careers` repository:

  ```powershell
  copilot
  ```

## Research the feature

- [ ] Run the research skill, replacing `{issue-number}` with the number you recorded:

  ```text
  /hve-core:rpi-research topic="GitHub issue {issue-number}, sort roles in the caldova-careers site: the existing roles list, the helpers in src/lib/, and the Vitest test patterns"
  ```

> [!NOTE]
> If the GitHub MCP server is not configured in Copilot CLI, the skill should fall back to retrieving the issue with the authenticated `gh` command.

- [ ] Inspect the research artifact:

  ```text
  .copilot-tracking/research/{date}/{task-slug}-research.md
  ```

- [ ] Confirm that the research cites actual repository files rather than assumed ones.
- [ ] Record the task slug the skill used in the artifact filename. Later phases reuse it.

> [!TIP]
> Research is read-only and runs only when evidence is inadequate. If the skill reports that existing evidence is already sufficient, read its reasoning rather than forcing a second research pass. Research defaults to a `balanced` posture; add `posture=focused` to stay inside the named targets, or `posture=expansive` for a broad decision space.

## Plan the feature

- [ ] Run `/clear` to reset context between phases.
- [ ] Run the plan skill against the research artifact:

  ```text
  /hve-core:rpi-plan task=sort-roles research=.copilot-tracking/research/{date}/{task-slug}-research.md
  ```

- [ ] Inspect the plan and its critique:

  ```text
  .copilot-tracking/plans/{date}/sort-roles-plan.md
  .copilot-tracking/reviews/plans/{date}/sort-roles-plan-critique.md
  ```

- [ ] Confirm that the plan uses `Pxx` phase IDs and `Pxx-Txx` task IDs, and that each task carries `Goals:`, `Requirements:`, `Details:`, `References:`, and `Dependencies:` blocks.
- [ ] Confirm that the plan opens with an executive summary and a Phase Checklist containing **Before** and **After** diagrams.
- [ ] Read the critique findings, which carry severity-graded `PC-xxx` identifiers, and check the recorded Critique Disposition. Resolve material findings rather than implementing over them.

> [!TIP]
> The critique runs by default. Add `critique=skip` only when you deliberately want to record the critique as skipped.

## Implement the feature

- [ ] Run `/clear` to reset context between phases.
- [ ] Run the implement skill against the approved plan:

  ```text
  /hve-core:rpi-implement plan=.copilot-tracking/plans/{date}/sort-roles-plan.md
  ```

> [!TIP]
> Add `task=P01-T01` to bound execution to a single task, or a `Pxx` phase to bound it to one phase. Omit `task` to work through the rest of the plan.

- [ ] Inspect the changes record:

  ```text
  .copilot-tracking/changes/{date}/sort-roles-changes.md
  ```

- [ ] Confirm that the record describes the behavior each completed item changed rather than listing raw edits.
- [ ] Confirm that completion checkboxes changed only where the record shows supporting evidence.
- [ ] Confirm that the implementation stays within the **Sort roles** acceptance criteria.
- [ ] Run the required unit tests:

  ```powershell
  npm run test:unit
  ```

- [ ] Start the application, then sort by title and by posted date at `http://localhost:4321`:

  ```powershell
  npm run dev
  ```

## Review the feature

- [ ] Run `/clear` to reset context between phases.
- [ ] Run the review skill for the task:

  ```text
  /hve-core:rpi-review task=sort-roles
  ```

- [ ] Inspect the review record:

  ```text
  .copilot-tracking/reviews/logs/{date}/sort-roles-review.md
  ```

- [ ] Confirm that substantive findings carry severity-graded `RV-xxx` identifiers and an explicit destination.
- [ ] Confirm that the record keeps execution status (`Complete`, `Partial`, or `Blocked`) separate from outcome (`Conformant`, `Conformant with justified divergence`, `Defects found`, `Residual work`, or `Not accepted`).
- [ ] Confirm that the review distinguishes the four known baseline typecheck errors from regressions introduced by your branch.
- [ ] Route open work through follow-up: defects to a later `rpi-implement`, decision gaps to `rpi-plan`, evidence gaps to `rpi-research`, and residual work to a distinct follow-up.
- [ ] Resolve material findings, then rerun `npm run test:unit` and the browser check.

> [!TIP]
> Implementing an accepted `RV-xxx` finding is ordinary work. A later fix does not require a second review.

## Understand the CLI phase handoffs

| Phase | Skill | Evidence to inspect |
|-------|-------|---------------------|
| Research | `/hve-core:rpi-research` | Repository-grounded research artifact |
| Plan | `/hve-core:rpi-plan` | Phased plan and resolved critique |
| Implement | `/hve-core:rpi-implement` | Source changes, tests, and changes record |
| Review | `/hve-core:rpi-review` | Findings, acceptance outcome, and routed follow-up |

Do not treat a successful skill invocation as proof that the phase is complete. Inspect its artifact, verify the source changes, and run the required tests and browser checks.

## CLI instruction limitation

Plugin instructions may not apply automatically through `applyTo` in Copilot CLI. Reference a required instruction explicitly with `#file:` or copy an approved instruction into `.github/instructions/` in the target repository.

## Optional Playwright check

If Chromium is installed, run the issue's Playwright criteria as extra credit. A Playwright result does not replace the required Vitest suite.

## Completion check

- [ ] The **Sort roles** feature works in the browser for title and posted-date ordering.
- [ ] All required Vitest unit tests pass.
- [ ] Research, plan, critique, changes, and review artifacts are present at their documented paths.
- [ ] The plan critique disposition was resolved before implementation.
- [ ] You can explain the evidence passed between each `rpi-*` phase.
- [ ] You recorded any Copilot CLI discrepancy for publication review.

Compare your observations with [the expected artifacts](./solution/expected-artifacts.md).
