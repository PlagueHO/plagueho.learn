---
title: 'Run the autonomous RPI Agent'
description: 'Implement issue 05 with the HVE-Core 3.2.2 RPI Agent and compare autonomous orchestration with manual handoffs.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 3
slug: rpi-agent
estimatedTimeMinutes: 25
difficulty: intermediate
prerequisites:
  - Manual issue 01 RPI exercise complete
audience:
  - software developers
technologies:
  - GitHub Copilot
  - HVE-Core
  - TypeScript
  - Vitest
tags:
  - autonomous-rpi
  - issue-05
status: draft
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Run the autonomous RPI Agent

Implement starter issue 05, **careers summary**, with the HVE-Core 3.2.2 RPI Agent. Preserve the issue's decisions and require Vitest unit tests. Playwright remains optional.

## Start from a clean branch

- [ ] Commit or stash the completed issue 01 work.
- [ ] Return to your attendee repository's `main` branch and create a branch for issue 05.

```powershell
git switch main
git switch -c feature/careers-summary
```

- [ ] Read issue 05 and copy its acceptance criteria.

## Start autonomous RPI

- [ ] Select **RPI Agent**.
- [ ] Invoke:

```text
/rpi task="Implement starter issue 05, careers summary, using its acceptance criteria. Preserve current repository patterns, require Vitest unit tests, keep Playwright optional, verify the result in the browser, and record all .copilot-tracking artifacts."
```

The 3.2.2 agent moves through five phases: Research, Plan, Implement, Review, and Discover.

| Phase | Inspect this exact path | Handoff |
|-------|-------------------------|---------|
| Research | `.copilot-tracking/research/{date}/{issue-05-research-file}.md` | Review the evidence, then choose the numbered Plan action. |
| Plan | `.copilot-tracking/plans/{date}/{issue-05-plan}-plan.instructions.md` and `.copilot-tracking/details/{date}/{issue-05-details}.md` | Confirm scope and validation, then choose the numbered Implement action. |
| Implement | `.copilot-tracking/changes/{date}/{issue-05-changes}.md` | Compare source and test results with the plan, then choose the numbered Review action. |
| Review | `.copilot-tracking/reviews/{date}/{issue-05-review}.md` | Resolve material findings, then choose the numbered Discover action. |
| Discover | The follow-on section in `.copilot-tracking/reviews/{date}/{issue-05-review}.md` | Keep useful next work separate from issue 05, then stop or save a checkpoint. |

- [ ] At each boundary, inspect the proposed work and artifact before continuing.
- [ ] Use the numbered **1️⃣**, **2️⃣**, or **3️⃣** handoff to choose a bounded next action.
- [ ] Use **▶️ All** only when the proposed sequence and scope are correct.
- [ ] Use **🔄 Suggest** if the available choices do not fit the issue.
- [ ] Use **💾 Save** (`/checkpoint`) before a risky or lengthy transition.
- [ ] Use **Compact** when context needs to be reduced without losing the recorded state.

<details>
<summary>🔮 Coming soon: newer autonomous RPI handoff</summary>

HVE-Core 3.2.2 does not have a Full Auto input. Newer releases expose Research, Plan, Implement, Review, and Full Auto handoffs around the same `/rpi task=...` entry point. Do not describe Full Auto as a confirmed 3.2.2 capability.

</details>

<details class="screenshot-expander">
<summary>📸 Screenshot: RPI Agent handoffs</summary>

`TODO-SCREENSHOT: rpi-agent-handoffs.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Verify the result

- [ ] Inspect each exact Research, Plan, Details, Changes, and Review path from the phase table.
- [ ] Confirm that Discover recorded follow-on work in the review artifact without expanding issue 05.
- [ ] Confirm that the implementation remains issue 05, careers summary.
- [ ] Run the required unit tests:

```powershell
npm run test:unit
```

- [ ] Start the application and verify the careers summary in the browser at `http://localhost:4321`.
- [ ] If the issue's optional Playwright coverage was implemented, run it after the required unit tests.

## Compare manual and autonomous RPI

| Question | Manual Task agents | RPI Agent |
|----------|--------------------|-----------|
| Who starts each phase? | You select and invoke each specialist. | The orchestrator presents phase handoffs. |
| How is context transferred? | You pass exact artifact paths. | The orchestrator maintains the workflow context. |
| Where can you intervene? | Before every agent invocation. | At every handoff and proposed action. |
| What must still be verified? | Artifacts, source changes, tests, and browser behavior. | The same artifacts, source changes, tests, and browser behavior. |

- [ ] Record one situation where manual control is preferable.
- [ ] Record one situation where orchestrated flow is preferable.

## Completion check

- [ ] Issue 05 careers summary works in the browser.
- [ ] All required Vitest unit tests pass.
- [ ] The five autonomous phases produced inspectable evidence.
- [ ] You can explain why autonomous orchestration does not remove human accountability.

Use [the expected evidence checklist](./solution/expected-evidence.md) for recovery.
