---
source_url: https://github.github.com/gh-aw/patterns/central-repo-ops/
source_title: CentralRepoOps
source_date: 2026-05-12
area: architecture
dimensions:
  - design-patterns
  - pattern-library
  - multi-agent-coordination
  - execution-flow
  - safe-outputs-and-security
extracted: 2026-05-12
quality: draft
---

## Central repo ops orchestrator worker pattern

### Overview

This source documents a control-plane architecture pattern for organization-scale operations, using orchestrator and worker workflows, controlled dispatch fan-out, and cross-repository invocation models. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)

### Key facts

1. CentralRepoOps uses one private central repository as a control plane for large-scale operations across many repositories. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
2. The orchestrator decides where and when to act, while worker workflows execute per-target operations, creating a split between planning and execution stages. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
3. Safe output dispatch-workflow supports bounded fan-out via max limits and explicit workflow allowlists. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
4. Worker flow can use checkout against target repositories plus scoped safe outputs for create-pull-request and create-issue targeting those repositories. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
5. Trigger-file architecture decouples trigger evolution from recompilation by using stable .yml workflows that call compiled .lock.yml files via workflow_call. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
6. Cross-repository and cross-organization invocation are supported with constraints; cross-organization calls may require inlined-imports true to avoid runtime checkout failures. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
7. The design recommends narrow orchestrator permissions with delegated writes in workers and correlation IDs for dispatch tracking. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)

### Quotable passages

- "CentralRepoOps uses a single private repository as a control plane for large-scale operations across many repositories." (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- "The trigger file references the compiled lock file (*.lock.yml), not the markdown source." (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- "Keep orchestrator permissions narrow; delegate repo-specific writes to workers." (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)

### Code snippets

```yaml
# Status: unverified
on:
  schedule: weekly on monday
tools:
  github:
    github-token: ${{ secrets.GH_AW_READ_ORG_TOKEN }}
    toolsets: [repos]
safe-outputs:
  dispatch-workflow:
    workflows: [dependabot-rollout]
    max: 5
```

Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>

```yaml
# Status: unverified
jobs:
  trigger:
    uses: ./.github/workflows/dependabot-rollout-orchestrator.lock.yml
    with:
      reason: ${{ github.event_name }}
    secrets: inherit
```

Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>

### Relationships to other dimensions

- Connects pattern library and multi-agent coordination through explicit orchestrator-worker decomposition. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- Connects execution flow and security with dispatch limits, workflow allowlists, and scoped cross-repo safe outputs. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- Connects compilation model with runtime flexibility using trigger-file indirection and workflow_call interfaces. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)

### Limitations and constraints

- Schedule-only orchestrators are simpler but cannot pass event context unless workflow_call trigger file pattern is added. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- Cross-organization invocation can fail with repository access errors without self-contained lock files. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)
- Token design is split across read-org, checkout, and safe-output write scopes, increasing secret management complexity. (Source: <https://github.github.com/gh-aw/patterns/central-repo-ops/>)

### Questions raised

- What practical default max value should be used for safe-output dispatch in large enterprises?
- Which telemetry fields are recommended as correlation IDs for orchestrator-worker tracing?
- What rollback pattern is preferred when a worker partially succeeds across target repositories?
