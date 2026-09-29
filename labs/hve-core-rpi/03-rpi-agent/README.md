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

Implement the GitHub issue **Add a careers summary** in your attendee repository with the HVE-Core 3.2.2 RPI Agent. Use the issue's acceptance criteria as the source of truth, require Vitest unit tests, and keep Playwright optional.

## Start from a clean branch

- [ ] Switch to your IDE (VS Code or VS Code Insiders).
- [ ] Confirm that `.copilot-tracking/` is in `.gitignore`.
- [ ] From the attendee `caldova-careers` repository, commit or stash the completed issue 01 work, then check that `git status --short` shows no pending changes.
- [ ] Return to `main` and create a branch for issue 05. Issue 01 remains on its own feature branch; do not expect its unmerged changes on this branch.

  ```powershell
  git switch main
  git switch -c feature/careers-summary
  ```

- [ ] In the **Issues** tab of your attendee `caldova-careers` repository on GitHub, open the issue titled **Add a careers summary** (starter issue 05). Read its description and acceptance criteria, note its assigned issue number, and keep the issue open while you work.

  The issue number can differ in your attendee repository, so find the issue by title.

> [!NOTE]
> If the GitHub MCP server is not enabled in VS Code, the RPI Agent should retrieve the issue using the authenticated `gh` command.

## Start autonomous RPI

- [ ] Open GitHub Copilot Chat.
- [ ] Recommend setting the model to `Auto`, `Balance`.
- [ ] Select **RPI Agent**.
- [ ] Run the command in the RPI Agent.

  ```text
  Implement GitHub issue #5, Add a careers summary."
  ```

The 3.2.2 agent moves through five phases: Research, Plan, Implement, Review, and Discover.

| Phase | Inspect this exact path | Handoff |
|-------|-------------------------|---------|
| Research | `.copilot-tracking/research/{date}/{issue-05-research-file}.md` | Review the evidence, then choose the numbered Plan action. |
| Plan | `.copilot-tracking/plans/{date}/{issue-05-plan}-plan.instructions.md` and `.copilot-tracking/details/{date}/{issue-05-details}.md` | Confirm scope and validation, then choose the numbered Implement action. |
| Implement | `.copilot-tracking/changes/{date}/{issue-05-changes}.md` | Compare source and test results with the plan, then choose the numbered Review action. |
| Review | `.copilot-tracking/reviews/{date}/{issue-05-review}.md` | Resolve material findings, then choose the numbered Discover action. |
| Discover | The follow-on section in `.copilot-tracking/reviews/{date}/{issue-05-review}.md` | Keep useful next work separate from issue 05, then stop or save a checkpoint. |

> [!TIP]
> If you are unsure what to do at a handoff, ask the RPI Agent, "What is the next step?" Review its recommendation before choosing a numbered action.

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

## Optional PR Review

- [ ] If issue 05 changes are still uncommitted, review `git status --short`, stage only the intended source and test files, and commit them on `feature/careers-summary`. An uncommitted feature cannot appear in a pull request.
- [ ] Push the feature branch:

  ```powershell
  git push -u origin feature/careers-summary
  ```

- [ ] In your attendee repository on GitHub, open **Pull requests** > **New pull request**. Set the base to `main` and the compare branch to `feature/careers-summary`, then create the pull request.
- [ ] Fetch `origin/main` while keeping the feature branch checked out:

  ```powershell
  git fetch origin main
  git branch --show-current
  ```

  The branch name printed by the last command should be `feature/careers-summary`.

- [ ] Select **PR Review** from the agent picker. It needs no prompt in HVE-Core 3.2.2.
- [ ] Inspect `.copilot-tracking/pr/review/{branch}/`.
- [ ] Compare its diff findings with the RPI Agent's Review output. This local exercise does not need to post review comments.

## Completion check

- [ ] Issue 05 careers summary works in the browser.
- [ ] All required Vitest unit tests pass.
- [ ] The five autonomous phases produced inspectable evidence.
- [ ] You can explain why autonomous orchestration does not remove human accountability.

Use [the expected evidence checklist](./solution/expected-evidence.md) for recovery.
