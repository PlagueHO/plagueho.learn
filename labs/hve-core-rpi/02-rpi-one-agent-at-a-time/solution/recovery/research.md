# Representative issue 01 research

## Scope

Issue 01 adds case-insensitive role-title search without changing how the application loads jobs.

## Evidence to confirm in the attendee repository

- Locate the component that owns the search input and rendered role list.
- Locate the existing job data type and loading function.
- Locate Vitest conventions for pure helpers and UI behavior.
- Confirm the required empty-query, matching, nonmatching, and case-insensitive outcomes from issue 01.

## Constraints

- Preserve the current job data flow and role ordering.
- Normalize the query without mutating source role objects.
- Keep Playwright optional. Vitest remains required.
- Treat the four known baseline TS2307 errors as pre-existing evidence, not feature work.

## Recommendation

Extract a pure title-filtering helper, cover it with Vitest, then call it from the existing role-list component. Verify both matching and nonmatching states in the browser.
