# Representative issue 05 plan

## Phase 1: Calculate the summary

1. Add a pure helper that returns total open roles and unique departments.
1. Ignore blank department values and trim department names.
1. Avoid mutating the loaded roles.

## Phase 2: Present the summary

1. Call the helper after the existing careers data is loaded.
1. Render values through the page's established semantic and responsive patterns.
1. Preserve the existing zero-role state.

## Phase 3: Verify

1. Add Vitest cases for empty data, duplicate departments, blank departments, and source immutability.
1. Run `npm run test:unit`.
1. Verify the populated and zero-role summaries in the browser.
1. Record validation and deviations under `.copilot-tracking/changes/{date}/`.

Stop before unrelated styling, data-loading, or baseline typecheck work.
