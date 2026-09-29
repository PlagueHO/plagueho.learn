# Issue 01 expected artifacts

Use these checks to recover from an incomplete agent run. Filenames vary with the date and task slug.

| Phase | Expected location | Minimum useful content |
|-------|-------------------|------------------------|
| Research | `.copilot-tracking/research/{date}/` | Existing job-loading and filtering paths, test conventions, issue constraints, and open questions |
| Plan | `.copilot-tracking/plans/{date}/*-plan.instructions.md` | Ordered implementation phases, target files, required Vitest tests, browser verification, and stop conditions |
| Details | `.copilot-tracking/details/{date}/` | File-level implementation guidance grounded in current repository patterns |
| Implement | `.copilot-tracking/changes/{date}/` | Source and test changes, deviations, and validation output |
| Review | `.copilot-tracking/reviews/{date}/` | Plan conformance, defects, regression risk, and follow-on actions |

The completed feature should search role titles, preserve the existing job data flow, include required Vitest coverage for matching and nonmatching searches, and pass browser verification. Playwright remains optional.

Use the representative recovery set when an attendee run is incomplete:

- [Research artifact](./recovery/research.md)
- [Plan artifact](./recovery/plan.md)
- [Changes artifact](./recovery/changes.md)
- [Review artifact](./recovery/review.md)
- [`search-roles.ts`](./recovery/search-roles.ts)
- [`search-roles.test.ts`](./recovery/search-roles.test.ts)

The TypeScript files form a working, framework-independent reference for title filtering. Integrate the function through the starter application's existing job-loading path rather than replacing that path.
