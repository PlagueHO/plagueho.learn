---
title: 'Fork and customize HVE-Core'
description: 'Add organization-specific coding standards and a Standards Coach agent in an isolated lab namespace.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 4
slug: fork-and-customize
estimatedTimeMinutes: 20
difficulty: intermediate
prerequisites:
  - HVE-Core 3.2.2 workflow experience
audience:
  - software developers
  - platform engineers
technologies:
  - HVE-Core
  - VS Code
  - Git
tags:
  - customization
  - governance
status: published
contentType: lab
---
<!-- markdownlint-disable-next-line MD025 -->
# Fork and customize HVE-Core

Fork HVE-Core when your organization must version its own packaged components, enforce governance, use a private distribution channel, or integrate internal systems. Stay with upstream and keep local additions in your own repository when you do not need to alter the package. A fork carries an ongoing obligation to merge and test upstream releases.

In this exercise, the Marketplace extension remains enabled. You load only a new `lab` namespace from a sibling HVE-Core fork, avoiding duplicate core agents and instructions.

## Create the pinned fork workspace

- [ ] Fork [`microsoft/hve-core`](https://github.com/microsoft/hve-core) into your GitHub account or training organization.
- [ ] From the parent directory of caldova-careers, clone your fork as `hve-core`.
- [ ] Create a lab branch from the exact `hve-core-v3.2.2` tag.

```powershell
git clone https://github.com/<your-account>/hve-core.git
Set-Location hve-core
git switch -c lab/custom-standards hve-core-v3.2.2
```

The expected sibling layout is:

```text
workspace/
├── caldova-careers/
└── hve-core/
```

## Add the coding standards instruction

- [ ] Create `.github/instructions/lab/coding-standards.instructions.md` in the HVE-Core fork.
- [ ] Require TSDoc for exported functions.
- [ ] Require documented Props for components.
- [ ] Keep the scope appropriate for TypeScript and Astro source files.

Use the [supplied instruction](https://github.com/PlagueHO/plagueho.learn/blob/main/labs/hve-core-rpi/04-fork-and-customize/solution/.github/instructions/lab/coding-standards.instructions.md) for recovery or comparison.

## Add the Standards Coach

- [ ] Create `.github/agents/lab/standards-coach.agent.md` in the HVE-Core fork.
- [ ] Make the agent review a selected file against the lab coding standards.
- [ ] Require actionable findings with file locations and avoid unrelated edits.

Use the [supplied agent](https://github.com/PlagueHO/plagueho.learn/blob/main/labs/hve-core-rpi/04-fork-and-customize/solution/.github/agents/lab/standards-coach.agent.md) for recovery or comparison.

## Load only the lab namespace

- [ ] Add these exact settings to `caldova-careers/.vscode/settings.json`:

```json
{
  "chat.instructionsFilesLocations": {
    "../hve-core/.github/instructions/lab": true
  },
  "chat.agentFilesLocations": {
    "../hve-core/.github/agents/lab": true
  }
}
```

The [solution settings file](https://github.com/PlagueHO/plagueho.learn/blob/main/labs/hve-core-rpi/04-fork-and-customize/solution/.vscode/settings.json) contains the same values.

- [ ] Reload the VS Code window.
- [ ] Confirm that **Standards Coach** appears in the agent picker.
- [ ] Confirm that the existing HVE-Core 3.2.2 Marketplace agents remain available.
- [ ] If duplicate core agents appear, check that the settings point only to the `lab` directories, not the fork's core directories.

<details class="screenshot-expander">
<summary>📸 Screenshot: Standards Coach in the picker</summary>

`TODO-SCREENSHOT: standards-coach-picker.png`

Capture guidance is recorded in the [screenshot inventory](../assets/screenshots/CAPTURE-LIST.md).

</details>

## Exercise the customization

- [ ] Ask Standards Coach to review `src/lib/jobs.ts`.
- [ ] Confirm that findings apply the TSDoc and component Props standards without inventing unrelated rules.
- [ ] Ask Copilot to make a small, reversible edit to an exported function.
- [ ] Confirm that the instruction shapes the edit.
- [ ] Revert the demonstration edit if it is unrelated to issue 01 or issue 05.

## Plan for upstream updates

- [ ] Add the Microsoft repository as `upstream`.
- [ ] Fetch tags and discuss how your team would merge and validate a future release.

```powershell
git remote add upstream https://github.com/microsoft/hve-core.git
git fetch upstream --tags
```

Do not move this lab branch to an unverified release during the exercise.

## Completion check

- [ ] Both custom files use the exact `.github/.../lab` namespace.
- [ ] Both settings point to `../hve-core/.github/.../lab`.
- [ ] Standards Coach can review `src/lib/jobs.ts`.
- [ ] You can explain the maintenance cost of a fork.
