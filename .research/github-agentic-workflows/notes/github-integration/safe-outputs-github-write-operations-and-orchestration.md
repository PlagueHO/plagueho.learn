---
source_url: https://github.github.com/gh-aw/reference/safe-outputs/
source_title: Safe Outputs
source_date: 2026-05-12
area: github-integration
dimensions:
  - safe-outputs-for-github
  - github-write-operations-guardrails
  - orchestration-patterns
  - github-actions-integration
extracted: 2026-05-12
quality: draft
---

## Summary

This source documents validated write operations (`safe-outputs`) that let workflows create issues, PR content, comments, labels, workflow dispatches, and other GitHub-side actions without granting direct write access to the agent step.

## Key facts

1. `safe-outputs` are explicit, validated write operations executed in separate permission-scoped jobs after agent output is produced. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
1. Safe output types cover issues/discussions, PR operations, labels/assignments, projects/assets, workflow orchestration (`dispatch-workflow`, `call-workflow`, `dispatch_repository`), and security outputs. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
1. If no explicit `safe-outputs` are configured (or only system types are configured), `create-issue` is auto-enabled with conservative defaults. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
1. `dispatch-workflow` is same-repo orchestration with compile-time validation that targets exist and support `workflow_dispatch`. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
1. `call-workflow` performs compile-time fan-out for `workflow_call` workers, preserving actor/billing context and avoiding runtime dispatch API calls. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
1. `dispatch_repository` is marked experimental for cross-repo `repository_dispatch` events and enforces allowlist checks at runtime. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

## Quotable passages

- "Safe outputs enforce security through separation: agents run read-only and request actions via structured output, while separate permission-controlled jobs execute those requests." Context: Safe Outputs overview. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- "When no `safe-outputs:` section is present (or when only system types are configured), `create-issue` is automatically enabled with conservative defaults." Context: default behavior description. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- "Workflow Dispatch (`dispatch-workflow:`) ... enables orchestration patterns, such as orchestrator workflows that coordinate multiple worker workflows." Context: workflow dispatch section. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

## Code snippets

```yaml
safe-outputs:
  create-issue:
    title-prefix: "[ai] "
    labels: [automation, report]
    max: 1
  add-comment:
    target: "*"
    max: 3
```

Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

```yaml
safe-outputs:
  dispatch-workflow:
    workflows: [worker-workflow, scanner-workflow]
    max: 3
```

Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

```yaml
safe-outputs:
  call-workflow: [spring-boot-bugfix, frontend-dep-upgrade]
```

Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

## Relationships to other dimensions

- Ties directly to trigger/event design because dispatch/call outputs enable multi-phase orchestration after event-driven analysis. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- Complements `tools.github` by keeping reads in tool execution and writes in guarded safe-output jobs. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- Integrates with GitHub Actions workflow composition through `workflow_call` output injection and reusable workflow patterns. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

## Limitations and constraints

- Many safe output operations are same-repo only unless explicitly supporting cross-repo with allowlists/tokens. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- `dispatch_repository` is experimental and may change. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>
- If no action is needed, workflows should call `noop`; missing this is a documented runtime failure pattern. Source: <https://github.github.com/gh-aw/reference/safe-outputs/>

## Questions raised

- Which orchestration style is operationally preferred for large-scale fleets: `call-workflow` (deterministic fan-out) or `dispatch-workflow` (async decoupling)?
- For cross-repo patterns, what enterprise baseline should be used for `allowed-repos` and token scoping?
