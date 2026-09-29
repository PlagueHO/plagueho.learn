# Issue 05 expected evidence

The RPI Agent run should preserve issue 05, careers summary, through all five phases.

- Research identifies existing job data and summary display patterns.
- Plan names the source, UI, and Vitest test files needed by the issue.
- Implement changes only the scoped feature and records validation.
- Review checks acceptance criteria and distinguishes baseline failures from regressions.
- Discover records useful follow-on work without expanding the current issue.

The final branch must pass `npm run test:unit` and show the careers summary in the running application. Playwright is optional.

Use the representative recovery set when the autonomous run stops before producing usable evidence:

- [Research artifact](./recovery/research.md)
- [Plan artifact](./recovery/plan.md)
- [Changes artifact](./recovery/changes.md)
- [Review artifact](./recovery/review.md)
- [`careers-summary.ts`](./recovery/careers-summary.ts)
- [`careers-summary.test.ts`](./recovery/careers-summary.test.ts)

The TypeScript files provide a deterministic summary calculation. Connect the result to the starter application's existing careers data and presentation patterns.
