# Demo 2: Dependency Analysis & Upgrade Planning

## Overview

Use AppMod MCP to analyze a project's dependency tree and generate a multi-layer upgrade plan.

## Pre-requisites

- VS Code Insiders with latest updates
- Sample .NET Framework solution open (from `../sample-app/`)
- `Microsoft.GitHubCopilot.AppModernization.Mcp` NuGet package installed
- All competing AppMod extensions removed

## Demo Script (~5 minutes)

### Step 1: Analyze Dependencies (2 min)

Chat: "Analyze the dependency tree of this solution and create a multi-layer upgrade plan. Start from leaf projects and work up."

Walk through the generated plan:

```
Phase 1 (Leaves — no dependencies on other projects):
  ├── ContosoLegacy.Utilities
  ├── ContosoLegacy.Logging
  └── ContosoLegacy.Auth.Common

Phase 2 (Depends only on Phase 1 projects):
  ├── ContosoLegacy.DataAccess
  └── ContosoLegacy.Auth

Phase 3 (Depends on Phase 1 + 2):
  └── ContosoLegacy.BusinessLogic

Phase 4 (Top-level — depends on everything):
  └── ContosoLegacy.WebApp
```

**Say:** "Notice the leaf-first approach. Each phase depends only on already-modernized projects. Each phase produces a working application."

### Step 2: Scope a Phase (1.5 min)

Chat: "What would the PR look like for Phase 1 — modernizing ContosoLegacy.Utilities?"

Show the estimated scope:

- ~500 LOC changed
- Package references updated
- API surface maintained
- Tests still pass

**Say:** "This is a reviewable PR. A team lead can actually review 500 lines. Compare that to trying to modernize the entire 10M LOC app at once."

### Step 3: Start Modernizing a Leaf (1 min)

Chat: "Modernize ContosoLegacy.Utilities to .NET 8 as Phase 1 of the upgrade plan"

Watch AppMod MCP:

1. Update the project file (SDK-style)
2. Update package references
3. Fix any API compatibility issues
4. Run tests to validate

**Say:** "The AI handles the repetitive conversion. You handle the review. Small PRs, always shippable."

## Wrap-up

"A 10K LOC PR will never get merged. AppMod stalls. This approach keeps every PR small, every phase shippable, and the entire process manageable."
