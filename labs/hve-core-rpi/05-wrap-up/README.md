---
title: 'Wrap up and choose an adoption path'
description: 'Review the lab evidence, connect outcomes to HVE principles, and select a responsible next step.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 5
slug: wrap-up
estimatedTimeMinutes: 10
difficulty: beginner
prerequisites:
  - Manual and autonomous RPI exercises complete
audience:
  - software developers
  - technical leads
technologies:
  - Hypervelocity Engineering
  - HVE-Core
  - Vitest
tags:
  - adoption
  - retrospective
status: draft
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Wrap up and choose an adoption path

Use the final ten minutes to verify the evidence and decide what to try next. Adoption starts with a bounded workflow and measurable outcomes, not a repository-wide rollout.

## Tour the evidence

- [ ] Return to the attendee `caldova-careers` repository if your terminal is still in the sibling `hve-core` fork:

  ```powershell
  Set-Location ../caldova-careers
  git rev-parse --show-toplevel
  ```

  The last command must print your attendee repository, not the HVE-Core fork. If you are already in `caldova-careers`, do not run `Set-Location` again.

- [ ] Locate the manual issue 01 research under `.copilot-tracking/research/{date}/`.
- [ ] Locate its plan under `.copilot-tracking/plans/{date}/*-plan.instructions.md`.
- [ ] Locate its details under `.copilot-tracking/details/{date}/`.
- [ ] Locate its changes log under `.copilot-tracking/changes/{date}/`.
- [ ] Locate its review under `.copilot-tracking/reviews/{date}/`.
- [ ] Locate the issue 05 evidence produced by the RPI Agent.
- [ ] Confirm that `.copilot-tracking/` remains ignored in the attendee repository.

## Run final verification

- [ ] Confirm that the current branch is the completed feature you intend to check, then run the required Vitest suite:

  ```powershell
  git branch --show-current
  npm run test:unit
  ```

- [ ] Verify the implemented feature in the browser.
- [ ] Record any optional Playwright or PR Review work separately from the required result.

<details class="screenshot-expander">
<summary>📸 Screenshot: final Vitest result</summary>

`TODO-SCREENSHOT: vitest-final-pass.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Map the work to HVE

| Lab behavior | HVE principle |
|--------------|---------------|
| Repository-grounded research | Start with evidence. |
| Date-scoped plans and details | Make intent explicit and traceable. |
| Separate feature branches and phases | Work in bounded increments. |
| Required tests and browser checks | Validate outcomes. |
| Review and Discover findings | Learn and improve the next cycle. |
| Human approval at handoffs | Preserve accountable engineering judgment. |

## Choose an adoption path

- [ ] Select one low-risk, representative issue for a team pilot.
- [ ] Decide whether manual RPI or the RPI Agent fits that issue.
- [ ] Define required tests and a human approval boundary.
- [ ] Decide whether upstream HVE-Core plus local customizations is sufficient.
- [ ] Define one measure, such as review defects, lead time, or plan deviations.

Use the [adoption worksheet](./solution/adoption-worksheet.md) to record the decision.

## Continue learning

- Try the optional [Security and Design Thinking plugins](../06-extra-credit-security-and-design-thinking/README.md).
- Review the date-sensitive [Copilot CLI and Copilot app appendix](../07-appendix-copilot-cli-and-app/README.md).
- Revisit [Hypervelocity Engineering slides 1 through 12](https://plagueho.github.io/plagueho.learn/hypervelocity-engineering/#/1).

## Completion check

- [ ] Both feature decisions remain traceable to issue 01 and issue 05.
- [ ] Required Vitest tests pass.
- [ ] You selected a bounded adoption experiment.
- [ ] You can explain where human judgment remains essential.
