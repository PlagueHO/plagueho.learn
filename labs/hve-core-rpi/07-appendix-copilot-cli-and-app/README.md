---
title: 'Optional Copilot CLI and Copilot app appendix'
description: 'Review date-sensitive alternative client paths for the pinned HVE-Core 3.2.2 marketplace.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 7
slug: appendix-copilot-cli-and-app
estimatedTimeMinutes: 15
difficulty: intermediate
prerequisites:
  - Core 100-minute lab complete
audience:
  - software developers
technologies:
  - Copilot CLI
  - Copilot app
  - HVE-Core
tags:
  - optional
  - cli
  - copilot-app
status: draft
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Optional Copilot CLI and Copilot app appendix

This appendix is excluded from the 100-minute core total. Alternative clients change rapidly, so treat this page as a verification checklist rather than a guaranteed current procedure.

> [!CAUTION]
> Technical preview status on 2026-09-29: the pinned source layout and package names are documented, but the current Copilot CLI commands and Copilot app custom marketplace flow have not been independently confirmed for publication. A facilitator must test them before presenting these steps as operational.

## Copilot CLI path

- [ ] Install Copilot CLI through an approved current channel, such as npm, WinGet, or Homebrew. Use the current official installation guidance for the exact command.
- [ ] In a disposable workspace, add the pinned marketplace:

  ```text
  copilot plugin marketplace add microsoft/hve-core#hve-core-v3.2.2
  ```

- [ ] Install the core plugin:

  ```text
  copilot plugin install hve-core@hve-core
  ```

- [ ] Use `/agent` to inspect the agents exposed by the installed plugin.
- [ ] Record the CLI version, operating system, command result, and any difference from this page.

<details class="screenshot-expander">
<summary>📸 Screenshot: pinned plugin agents in Copilot CLI</summary>

`TODO-SCREENSHOT: copilot-plugin-list.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

### CLI instruction limitation

Plugin instructions may not apply automatically through `applyTo` in Copilot CLI. Reference a required instruction explicitly with `#file:` or copy an approved instruction into `.github/instructions/` in the target repository.

## Copilot app technical preview path

Do not perform this flow during the timed lab unless it has been verified on the delivery date.

- [ ] Record the Copilot app version and verification date.
- [ ] Open **Customize**.
- [ ] Open **Plugins**.
- [ ] Locate the action for adding a custom marketplace.
- [ ] Add the exact pinned source `microsoft/hve-core#hve-core-v3.2.2` only if the app accepts that format.
- [ ] Confirm the displayed marketplace name, plugin names, and version before installation.
- [ ] Stop and record the discrepancy if the 3.2.2 pre-Plugin-1.0 layout is rejected.

The Copilot app flow is a technical preview. Do not claim support based only on the repository layout.

## Completion check

- [ ] The pinned ref remained `microsoft/hve-core#hve-core-v3.2.2`.
- [ ] Every observed command or UI step has a dated verification note.
- [ ] Unverified behavior is labelled as unverified.
- [ ] No secrets or private repository content were used in the disposable test.

Use [the verification record](./solution/verification-record.md) when testing these paths.
