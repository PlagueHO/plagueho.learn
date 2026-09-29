# Representative issue 05 changes

## Implemented

- Added a pure `summarizeCareers` helper.
- Counted open roles and unique trimmed, nonblank departments.
- Connected the result to the existing careers page data flow.
- Added Vitest coverage for empty data, duplicates, blanks, and immutability.

## Validation

- `npm run test:unit`: expected to pass after integration into the attendee repository.
- Browser: verify the summary with the starter data and the established zero-role state.
- Playwright: optional and not required for recovery.

## Deviations

No data-loading, database, or unrelated presentation changes belong to issue 05.
