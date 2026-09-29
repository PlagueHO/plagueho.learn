# Representative issue 01 changes

## Implemented

- Added a pure, case-insensitive `filterRolesByTitle` helper.
- Preserved source ordering and returned all roles for a blank query.
- Connected the existing search input and role-list rendering through the helper.
- Added Vitest coverage for blank, partial, case-insensitive, and nonmatching queries.

## Validation

- `npm run test:unit`: expected to pass after integration into the attendee repository.
- Browser: verify that a partial title returns matching roles and an unknown title displays the established empty state.
- Playwright: optional and not required for recovery.

## Deviations

No changes to job loading, database code, or the four baseline TS2307 failures are part of this feature.
