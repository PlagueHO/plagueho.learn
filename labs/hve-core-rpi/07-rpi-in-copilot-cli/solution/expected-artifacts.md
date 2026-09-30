# Sort roles expected artifacts

A complete Copilot CLI run of the `rpi-*` skills should leave one durable artifact per phase. Use this checklist when comparing your own run.

| Phase | Expected path |
|-------|----------------|
| Research | `.copilot-tracking/research/{date}/{task-slug}-research.md` |
| Plan | `.copilot-tracking/plans/{date}/sort-roles-plan.md` |
| Plan critique | `.copilot-tracking/reviews/plans/{date}/sort-roles-plan-critique.md` |
| Changes | `.copilot-tracking/changes/{date}/sort-roles-changes.md` |
| Review | `.copilot-tracking/reviews/logs/{date}/sort-roles-review.md` |

Useful output should:

- Cite the existing roles list, the `src/lib/` helpers, and the Vitest patterns already in the repository.
- Express the plan as `Pxx` phases and `Pxx-Txx` tasks with `Goals:`, `Requirements:`, `Details:`, `References:`, and `Dependencies:` blocks.
- Record the critique findings as severity-graded `PC-xxx` identifiers and a Critique Disposition before implementation begins.
- Limit changes to the **Sort roles** acceptance criteria, covering title A–Z, title Z–A, newest, and oldest ordering.
- Keep the accessible sort label and stable `data-testid` attributes required by the issue.
- Separate execution status from acceptance outcome in the review record.

The final branch must pass `npm run test:unit` and show working sort controls in the running application. Playwright is optional.

Record any difference between the observed CLI behavior and this module before the next delivery.

| Field | Recorded value |
|-------|----------------|
| Verification date | |
| Copilot CLI version | |
| HVE Core plugin version | |
| Operating system | |
| Skills exposed by the plugin | |
| Differences from lab text | |
| Publication decision | |

Do not mark this module verified until a human has reproduced the run and reviewed the recorded evidence.
