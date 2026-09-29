# Representative issue 01 plan

## Phase 1: Add title filtering

1. Add a pure helper beside the existing job-domain utilities.
1. Return the original sequence for an empty or whitespace-only query.
1. Match role titles case-insensitively with trimmed query text.

## Phase 2: Connect the interface

1. Bind the existing search input to local query state.
1. Render the filtered collection through the existing role-list path.
1. Preserve the application's established empty-state component.

## Phase 3: Verify

1. Add Vitest cases for empty, matching, nonmatching, partial, and case-insensitive queries.
1. Run `npm run test:unit`.
1. Verify matching and nonmatching searches at `http://localhost:4321`.
1. Record source files, tests, command output, and any deviations in the changes artifact.

Stop if implementing the feature would require replacing the existing job-loading path or repairing unrelated baseline type errors.
