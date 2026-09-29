---
title: 'Extra credit: Fork and customize HVE-Core'
description: 'Add organization-specific coding standards and a Standards Coach agent in an isolated lab namespace.'
lastUpdated: '2026-09-29'
track: hve-core-rpi
module: 6
slug: extra-credit-fork-and-customize
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
# Extra credit: Fork and customize HVE-Core

Use in-place customization for repo-specific instructions and agents. Fork only when that is insufficient: to replace core components, change packaging or plugin membership, enforce structural governance, integrate internal systems, or maintain a private distribution. For `caldova-careers`-only changes, add files there instead. See [the customization guide](https://microsoft.github.io/hve-core/docs/customization/).

This exercise uses the [peer-directory clone workflow](https://microsoft.github.io/hve-core/docs/getting-started/methods/peer-clone/) to load team-owned components from a sibling fork. Keep the Marketplace extension enabled and load only the `lab` namespace; do not change or repackage its core components. Review, merge, and test upstream releases regularly.

## Create the pinned fork workspace

- [ ] Fork [`microsoft/hve-core`](https://github.com/microsoft/hve-core) into your GitHub account or training organization, following the [fork setup guide](https://microsoft.github.io/hve-core/docs/customization/forking/).
- [ ] In a terminal at the attendee `caldova-careers` repository root, move to its parent directory and clone your fork as `hve-core`. Replace `YOUR-ACCOUNT` with your GitHub username or organization.
- [ ] Add Microsoft's repository as `upstream`, fetch its tags, and create a lab branch from the exact `hve-core-v3.2.2` tag.

  ```powershell
  Set-Location ..
  git clone https://github.com/YOUR-ACCOUNT/hve-core.git
  Set-Location hve-core
  git remote add upstream https://github.com/microsoft/hve-core.git
  git fetch upstream --tags
  git switch -c lab/custom-standards hve-core-v3.2.2
  git remote -v
  ```

  Confirm that `origin` points to your fork and `upstream` points to `microsoft/hve-core`.

  The expected sibling layout is:

  ```text
  workspace/
  ├── caldova-careers/
  └── hve-core/
  ```

- [ ] Open the sibling `hve-core` folder in VS Code before creating the custom files.

## Add the coding standards instruction

- [ ] Use HVE Builder in create mode to create `.github/instructions/lab/coding-standards.instructions.md` in the HVE-Core fork. The `lab` directory is the package namespace for this organization's additions; do not edit upstream instruction files.

  ```text
  Use hve-builder with mode=create, targets=.github/instructions/lab/coding-standards.instructions.md, and requirements="Require TSDoc for exported functions, document component Props, preserve repository patterns, and apply only to TypeScript and Astro files."
  ```

Use the [supplied instruction](https://github.com/PlagueHO/plagueho.learn/blob/main/labs/hve-core-rpi/06-extra-credit-fork-and-customize/solution/.github/instructions/lab/coding-standards.instructions.md) for recovery or comparison.

## Add the Standards Coach

- [ ] Use HVE Builder in create mode to create `.github/agents/lab/standards-coach.agent.md` in the HVE-Core fork. Keep the agent in the same `lab` namespace as its instruction.

  ```text
  Use hve-builder with mode=create, targets=.github/agents/lab/standards-coach.agent.md, and requirements="Review a selected file against the lab coding standards. Report actionable, evidence-based findings with file locations. Do not edit files or report unrelated findings."
  ```

Use the [supplied agent](https://github.com/PlagueHO/plagueho.learn/blob/main/labs/hve-core-rpi/06-extra-credit-fork-and-customize/solution/.github/agents/lab/standards-coach.agent.md) for recovery or comparison.

## Review the custom files

- [ ] Use HVE Builder in review mode to assess both custom files. Inspect its verdict and validation results, then address actionable findings before continuing.

  ```text
  Use hve-builder with mode=review and targets=.github/instructions/lab/coding-standards.instructions.md.
  Use hve-builder with mode=review and targets=.github/agents/lab/standards-coach.agent.md.
  ```

## Load only the lab namespace

- [ ] Open the sibling `caldova-careers` folder as your VS Code workspace and add these exact settings to its `.vscode/settings.json`, following the [peer-directory clone settings](https://microsoft.github.io/hve-core/docs/getting-started/methods/peer-clone/). If that file already has settings, merge these keys into the existing JSON object rather than replacing it:

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

  The [solution settings file](./solution/.vscode/settings.json) contains the same values.

- [ ] Reload the VS Code window.
- [ ] Confirm that **Standards Coach** appears in the agent picker.
- [ ] Confirm that the existing HVE-Core 3.2.2 Marketplace agents remain available.
- [ ] If duplicate core agents appear, check that the settings point only to the `lab` directories, not the fork's core directories.

## Exercise the customization

- [ ] Ask Standards Coach to review `src/lib/jobs.ts`.
- [ ] Confirm that findings apply the TSDoc and component Props standards without inventing unrelated rules.
- [ ] Ask Copilot to make a small, reversible edit to an exported function.
- [ ] Confirm that the instruction shapes the edit.
- [ ] Revert the demonstration edit if it is unrelated to issue 01 or issue 05.

## Review upstream updates

- [ ] In a terminal at the sibling `hve-core` fork root, fetch upstream and review commits added since the pinned release.

  ```powershell
  git fetch upstream --tags
  git log --oneline hve-core-v3.2.2..upstream/main
  ```

  Discuss how your team would review, merge, and validate a future release. Do not move this lab branch to an unverified release during the exercise.

## Completion check

- [ ] Both custom files use the exact `.github/.../lab` namespace.
- [ ] Both settings point to `../hve-core/.github/.../lab`.
- [ ] `origin` points to your fork and `upstream` points to `microsoft/hve-core`.
- [ ] HVE Builder's review and validation results have no unresolved actionable findings.
- [ ] Standards Coach can review `src/lib/jobs.ts`.
- [ ] You can explain the maintenance cost of a fork.
