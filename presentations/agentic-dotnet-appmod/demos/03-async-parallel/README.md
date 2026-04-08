# Demo 3: Async Parallel Execution

## Overview

Fire off multiple parallel AppMod tasks using Agent Panel and demonstrate the async workflow.

## Pre-requisites

- VS Code Insiders with latest updates
- Sample .NET app with multiple leaf projects (from `../sample-app/`)
- AppMod MCP NuGet installed
- Phase 1 leaf projects identified (Utilities, Logging, Auth.Common)

## Demo Script (~3 minutes)

### Step 1: Parallel Launch (1 min)

Open 3 Agent Panel conversations (Ctrl+Shift+I, click "+" for new panels):

**Panel 1:** "Modernize ContosoLegacy.Utilities to .NET 8 following the Phase 1 upgrade plan"

**Panel 2:** "Modernize ContosoLegacy.Logging to .NET 8 following the Phase 1 upgrade plan"

**Panel 3:** "Modernize ContosoLegacy.Auth.Common to .NET 8 following the Phase 1 upgrade plan"

**Say:** "Three leaf projects, three parallel agents. Each has its own context. Each will produce a separate, reviewable change."

### Step 2: Switch Away (30 sec)

Switch to another task or show the audience something else:

- "While these run, I could be reviewing PRs, writing docs, or working on something else entirely"
- "This is what day 4 of the workshop looked like — fire and forget"

### Step 3: Review Results (1 min)

Switch back to the Agent Panel conversations:

- Show each has completed independently
- Briefly show the changes in each — small, focused, reviewable
- Point out they didn't interfere with each other

**Say:** "Three leaf projects modernized in parallel. Three small PRs ready for review. This is where the 10× comes from."

## Wrap-up

"Day 1-2: engineers watched every agent step. Day 4: they fired off parallel tasks and went to lunch. The confidence to go async came from having skills (deterministic behavior), dependency layers (bounded scope), and /troubleshoot (diagnosis when things go wrong)."
