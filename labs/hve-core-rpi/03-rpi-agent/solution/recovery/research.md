# Representative issue 05 research

## Scope

Issue 05 adds a careers summary derived from the roles already loaded by the application.

## Evidence to confirm in the attendee repository

- Locate the canonical role collection and its department or team field.
- Locate the page or component that should present the summary.
- Locate existing count, pluralization, and Vitest conventions.
- Confirm the summary labels and empty-state acceptance criteria from issue 05.

## Constraints

- Derive summary values from the existing role collection.
- Count unique nonblank departments without mutating source data.
- Keep the result deterministic and independently testable.
- Keep Playwright optional and Vitest required.

## Recommendation

Add a pure summary helper, test zero and populated role collections, and render the result with the application's existing visual language.
