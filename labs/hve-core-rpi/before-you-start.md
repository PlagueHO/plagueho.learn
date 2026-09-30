---
title: 'Before you start'
description: 'Prepare the pinned editor, repository, runtime, and test environment for the HVE-Core lab.'
lastUpdated: '2026-09-29'
---
<!-- markdownlint-disable-next-line MD025 -->
# Before you start

Complete this preparation before the timed lab begins.

## Prerequisites

You need:

- A paid GitHub Copilot plan. Agent work may consume AI Credits.
- Git and a GitHub account that can create a public repository from a template.
- GitHub CLI (`gh`). Follow the [official installation instructions](https://github.com/cli/cli#installation) and [authentication guide](https://docs.github.com/en/github-cli/github-cli-authentication).
- VS Code Insiders or VS Code Stable version 1.106.1 or later. Stable can be preferable in regulated environments.
- Node.js 24.16 or later, or Node.js 22.22.3 or later.
- npm, which is included with Node.js.
- HVE-Core 3.2.2. Module 01 installs and verifies the extension.

Use the **Auto** model unless your facilitator directs otherwise. Keep tasks focused, use `/clear` between manual RPI phases, and do not rerun the autonomous exercise repeatedly against the same feature.

## Create the attendee repository

- [ ] Confirm that the GitHub CLI is installed and authenticated to GitHub.com:

  ```powershell
  gh --version
  gh auth status --hostname github.com
  ```

  If you are not authenticated, run `gh auth login --hostname github.com` and follow the prompts. Then repeat `gh auth status --hostname github.com`.

- [ ] Open the [`github-samples/caldova-careers`](https://github.com/github-samples/caldova-careers) template.
- [ ] Select **Use this template** and create your own public repository. Use `caldova-careers` as the repository name so the paths in this lab match your workspace.
- [ ] Replace `YOUR-ACCOUNT` with your GitHub username or organization, clone your new repository, and change into its directory:

  ```powershell
  git clone https://github.com/YOUR-ACCOUNT/caldova-careers.git
  Set-Location caldova-careers
  git rev-parse --show-toplevel
  ```

  Check that the last command prints the path to your *attendee* `caldova-careers` repository. Run the remaining Git and npm commands from this directory unless a module tells you to switch to the HVE-Core fork.

- [ ] Push `main` from the cloned repository to trigger the issue bootstrap workflow:

  ```powershell
  git push -u origin main
  ```

  If Git reports `Everything up-to-date`, no push event was created. In your new repository's **Actions** tab, check whether **Bootstrap issues** has already run or is running. If it has not, enable Actions if prompted, then select **Run workflow** on `main` and wait for it to succeed. Do not rerun a successful workflow.

- [ ] In your new `YOUR-ACCOUNT/caldova-careers` repository on GitHub, open **Actions** and wait for **Bootstrap issues** to show a green success check.

> [!NOTE]
> The Actions run will be automatically deleted once it is completed, so you can just check that the **Issues** have been created.

- [ ] In the same repository, open **Issues** and find **Search roles by title** (starter issue 01) and **Add a careers summary** (starter issue 05). If either issue is missing after the workflow succeeds, ask the facilitator before continuing.

  GitHub assigns issue numbers in your repository, so find these issues by title rather than assuming they are numbered 1 and 5.

- [ ] Back in the terminal in your cloned `caldova-careers` directory, bring down the workflow's cleanup commit:

  ```powershell
  git pull --ff-only origin main
  ```

## Prepare and verify the application

- [ ] Install dependencies.

  ```powershell
  npm ci
  ```

- [ ] Run the required Vitest unit test suite.

  ```powershell
  npm run test:unit
  ```

- [ ] Start the development server and open `http://localhost:4321`. Leave this terminal running; use a second terminal for the remaining commands.

  ```powershell
  npm run dev
  ```

- [ ] Add `.copilot-tracking/` to the attendee repository's `.gitignore` and commit the change on `main` so both feature branches inherit it:

  ```powershell
  Add-Content .gitignore '.copilot-tracking/'
  git add .gitignore
  git commit -m "chore: ignore local RPI artifacts"
  ```

The lab treats Vitest unit tests as required for both features. Playwright is optional. To prepare Chromium for the optional browser tests, run:

```powershell
npm run test:e2e:install
```

## Known typecheck baseline

> [!NOTE]
> At the pinned commit, `npm run typecheck` reports four existing TS2307 errors involving `../../db/schema` and `../../db/test-helpers`. These errors are part of the starting repository and are not attendee failures. The Task Reviewer may report them. Record that they predate your branch rather than changing unrelated database code.

## Optional Codespaces path

If local installation is restricted, create a Codespace from your attendee repository. Wait for the dev container setup to finish, run the unit tests, and confirm the application at the forwarded port. Editor extension availability and organizational policy can differ in Codespaces, so verify that HVE-Core 3.2.2 is available before the timed session.

## Version transition

> [!IMPORTANT]
> This lab is pinned to HVE-Core 3.2.2, whose agent picker includes Memory, PR Review, Prompt Builder, RPI Agent, Task Implementor, Task Planner, Task Researcher, and Task Reviewer. Newer HVE-Core source has moved the separate Task agents to `/rpi-*` skills. Each legacy Task agent exercise includes a collapsed future equivalent. As of 2026-09-29, follow the 3.2.2 instructions for the timed lab.

## Ready check

- [ ] The application starts at `http://localhost:4321`.
- [ ] All baseline Vitest unit tests pass.
- [ ] The **Issues** tab of your attendee repository has **Search roles by title** and **Add a careers summary**.
- [ ] `.copilot-tracking/` is ignored.
- [ ] The GitHub CLI is installed; `gh --version` prints a version in the terminal.
- [ ] `gh auth status --hostname github.com` confirms that you are authenticated.
- [ ] Your editor meets the HVE-Core extension requirement.
