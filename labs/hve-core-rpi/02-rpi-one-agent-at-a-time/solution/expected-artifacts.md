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
