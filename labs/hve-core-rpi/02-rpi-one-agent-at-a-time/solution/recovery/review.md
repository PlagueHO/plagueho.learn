# Representative issue 01 review

## Acceptance criteria

- Pass: blank queries preserve all roles and their order.
- Pass: title matching is trimmed, partial, and case-insensitive.
- Pass: nonmatching queries return an empty collection for the existing empty-state path.
- Pass: the helper does not mutate role objects or replace job loading.
- Required check: run the integrated Vitest suite and browser verification in the attendee repository.

## Risk

The pure helper is low risk. Integration can regress input state or the established empty state, so both browser outcomes remain required.

## Follow-on

Do not add description, location, or skill search to issue 01. Record broader search as separate backlog work.
