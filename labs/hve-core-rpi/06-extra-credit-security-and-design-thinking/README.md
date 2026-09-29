---
title: 'Optional Security and Design Thinking plugins'
description: 'Explore pinned HVE-Core 3.2.2 CLI plugins for security review and problem framing.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 6
slug: extra-credit-security-and-design-thinking
estimatedTimeMinutes: 20
difficulty: advanced
prerequisites:
  - Core 120-minute lab complete
  - Copilot CLI available
audience:
  - software developers
  - security champions
technologies:
  - Copilot CLI
  - HVE-Core
tags:
  - optional
  - security
  - design-thinking
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Optional Security and Design Thinking plugins

This optional module is excluded from the 120-minute core total. The HVE-Core 3.2.2 VS Code extension does not include the Security or Design Thinking components. They are separate Copilot CLI plugins at the pinned source.

> [!WARNING]
> CLI plugin commands and behavior are date-sensitive. As of 2026-09-29, the source and package names below are pinned from HVE-Core 3.2.2, but this lab has not independently confirmed the commands against every current CLI build. Verify them in a disposable environment before delivery.

## Add the pinned marketplace

- [ ] Confirm with the facilitator that current CLI behavior has been verified.
- [ ] Add the exact pinned source:

```text
copilot plugin marketplace add microsoft/hve-core#hve-core-v3.2.2
```

- [ ] Install the Security and Design Thinking plugins:

```text
copilot plugin install security@hve-core
copilot plugin install design-thinking@hve-core
```

Do not replace `microsoft/hve-core#hve-core-v3.2.2` with `main` or an unpinned tag.

## Optional Security exercise

- [ ] Review `src/pages/api/apply.ts` before invoking any agent.
- [ ] Run `/security-review` against that small, known scope.
- [ ] Check each finding against the source and discard unsupported claims.
- [ ] Compare the security-focused result with PR Review.
- [ ] Do not paste secrets, applicant data, credentials, or production values into a prompt.

<details class="screenshot-expander">
<summary>📸 Screenshot: Security review result</summary>

`TODO-SCREENSHOT: security-review-result.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Optional Design Thinking exercise

- [ ] Select DT Coach from the Design Thinking plugin.
- [ ] Start with the vague request: `Build a careers dashboard`.
- [ ] Ask the coach to reframe the request through user needs, desired outcomes, assumptions, and evidence.
- [ ] Record a focused problem statement.
- [ ] Hand the refined problem to Research rather than asking Design Thinking to implement it.

## Instruction limitation

Copilot CLI plugin instructions may not apply automatically through `applyTo`. Reference a required instruction with `#file:` or copy an approved instruction into the target repository's `.github/instructions/` directory.

## Completion check

- [ ] Both plugins came from `microsoft/hve-core#hve-core-v3.2.2`.
- [ ] Security findings were checked against source evidence.
- [ ] The Design Thinking result reframed the problem before RPI.
- [ ] You recorded any CLI discrepancy for publication review.

Compare your observations with [the optional exercise notes](./solution/exercise-notes.md).
