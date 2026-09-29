---
title: 'Run RPI one agent at a time'
description: 'Implement issue 01 by controlling each HVE-Core 3.2.2 Research, Plan, Implement, and Review handoff.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 2
slug: rpi-one-agent-at-a-time
estimatedTimeMinutes: 40
difficulty: intermediate
prerequisites:
  - HVE-Core 3.2.2 installed
  - caldova-careers attendee repository
audience:
  - software developers
technologies:
  - GitHub Copilot
  - HVE-Core
  - TypeScript
  - Vitest
tags:
  - manual-rpi
  - issue-01
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Run RPI one agent at a time

Implement starter issue 01, **search roles by title**, while retaining control of every RPI decision. Paste the issue text or its acceptance criteria into each prompt. Keep Vitest unit tests required and treat Playwright as optional.

## Create a feature branch

- [ ] Confirm that `.copilot-tracking/` is in `.gitignore`.
- [ ] Create and check out a branch for issue 01.

```powershell
git switch -c feature/search-roles-by-title
```

- [ ] Read issue 01 and identify its unit test and browser acceptance criteria.

## Research the feature

- [ ] Select **Task Researcher** and invoke:

```text
/task-research topic="Research issue 01, search roles by title, in this caldova-careers repository at the pinned baseline. Identify existing job-loading and filtering patterns, required Vitest coverage, optional Playwright coverage, constraints, and open questions. Do not implement."
```

- [ ] Inspect the date-scoped research file under `.copilot-tracking/research/{date}/`.
- [ ] Check the sources and confirm that the research refers to actual repository files.
- [ ] Observe the **📋 Create Plan** and **🔬 Deeper Research** handoffs.

<details>
<summary>🔮 Coming soon: the /rpi-research skills equivalent</summary>

Newer HVE-Core source replaces Task Researcher with a skill. The equivalent shape is:

```text
/rpi-research topic="Research issue 01, search roles by title, including required Vitest coverage and optional Playwright coverage." posture=balanced
```

Use the Task Researcher flow for HVE-Core 3.2.2.

</details>

## Plan the feature

- [ ] Run `/clear`.
- [ ] Select **Task Planner** and invoke the command with the exact research path:

```text
/task-plan research=".copilot-tracking/research/{date}/{issue-01-research-file}.md" task="Plan issue 01, search roles by title. Require Vitest unit tests, keep Playwright optional, preserve existing repository patterns, and stop after planning."
```

- [ ] Inspect `.copilot-tracking/plans/{date}/*-plan.instructions.md`.
- [ ] Inspect the corresponding `.copilot-tracking/details/{date}/` file.
- [ ] Confirm that the plan names source files, test files, acceptance criteria, and validation commands.
- [ ] Observe the **⚡ Implement** handoff.

<details>
<summary>🔮 Coming soon: the /rpi-plan skills equivalent</summary>

Newer HVE-Core source uses:

```text
/rpi-plan task="Implement issue 01, search roles by title, with required Vitest tests and optional Playwright tests." research=".copilot-tracking/research/{date}/{issue-01-research-file}.md" critique=standard
```

The newer skill writes `*-plan.md`; HVE-Core 3.2.2 writes `*-plan.instructions.md`.

</details>

## Implement the feature

- [ ] Select **Task Implementor** and invoke the command with the exact plan path:

```text
/task-implement plan=".copilot-tracking/plans/{date}/{issue-01-plan}-plan.instructions.md" phaseStop=false stepStop=false
```

- [ ] Keep the issue 01 search behavior unchanged if the agent asks to substitute a different feature.
- [ ] Require Vitest tests for the search behavior.
- [ ] Inspect `.copilot-tracking/changes/{date}/` and compare the changes log with the plan.
- [ ] Run the required unit tests:

```powershell
npm run test:unit
```

- [ ] Start the application, search for a role title at `http://localhost:4321`, and verify matching and nonmatching states.
- [ ] Observe the **✅ Review** handoff.

<details>
<summary>🔮 Coming soon: the /rpi-implement skills equivalent</summary>

Newer HVE-Core source uses:

```text
/rpi-implement plan=".copilot-tracking/plans/{date}/{issue-01-plan}-plan.md"
```

Use the Task Implementor and its 3.2.2 plan format during this lab.

</details>

## Review the feature

- [ ] Run `/clear`.
- [ ] Select **Task Reviewer** and invoke it with the exact evidence paths:

```text
/task-review plan=".copilot-tracking/plans/{date}/{issue-01-plan}-plan.instructions.md" changes=".copilot-tracking/changes/{date}/{issue-01-changes}.md" research=".copilot-tracking/research/{date}/{issue-01-research-file}.md"
```

- [ ] Inspect the date-scoped result under `.copilot-tracking/reviews/{date}/`.
- [ ] Confirm that review findings distinguish the four known baseline typecheck errors from regressions introduced by your branch.
- [ ] Resolve material findings, then rerun `npm run test:unit` and the browser check.
- [ ] Observe the **🔬 Research More**, **📋 Revise Plan**, and **⚡ Implement Immediately** handoffs.

<details>
<summary>🔮 Coming soon: the /rpi-review skills equivalent</summary>

Newer HVE-Core source uses:

```text
/rpi-review task="Review issue 01, search roles by title." plan=".copilot-tracking/plans/{date}/{issue-01-plan}-plan.md" changes=".copilot-tracking/changes/{date}/{issue-01-changes}.md" depth=standard
```

The newer workflow writes review logs to a different location. Use `.copilot-tracking/reviews/{date}/` for 3.2.2.

</details>

<details class="screenshot-expander">
<summary>📸 Screenshot: manual RPI evidence</summary>

`TODO-SCREENSHOT: manual-rpi-artifacts.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Optional PR Review

- [ ] Push the feature branch and open a pull request against your attendee repository's `main` branch.
- [ ] Fetch `origin/main` and keep the feature branch checked out.
- [ ] Select **PR Review** from the agent picker. It needs no prompt in HVE-Core 3.2.2.
- [ ] Inspect `.copilot-tracking/pr/review/{branch}/`.
- [ ] Compare its diff findings with the Task Reviewer output. This local exercise does not need to post review comments.

## Optional Playwright check

If Chromium is installed, run the issue's Playwright criteria as extra credit. A Playwright result does not replace the required Vitest suite.

## Completion check

- [ ] Issue 01 search works in the browser.
- [ ] All required Vitest unit tests pass.
- [ ] Research, plan, details, changes, and review artifacts are present.
- [ ] You inspected every handoff rather than accepting it automatically.

Representative recovery artifacts are in [the solution folder](./solution/expected-artifacts.md).
