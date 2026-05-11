---
source_url: https://github.github.com/gh-aw/reference/triggers/
source_title: Triggers
source_date: 2026-05-12
area: github-integration
dimensions:
  - github-workflow-triggers-and-events
  - github-native-workflow-syntax
  - orchestration-events
  - github-actions-integration
extracted: 2026-05-12
quality: draft
---

## Summary

This source defines how `on:` trigger syntax works for agentic workflows, including GitHub Actions-native event syntax plus gh-aw extensions such as fuzzy schedules, command triggers, label-command workflows, and pre-activation skip/approval controls.

## Key facts

1. Trigger configuration uses standard GitHub Actions `on:` syntax and supports event families including `issues`, `pull_request`, `workflow_run`, `workflow_dispatch`, `deployment_status`, comments, and shorthands. Source: <https://github.github.com/gh-aw/reference/triggers/>
1. `workflow_dispatch` supports typed inputs (`string`, `boolean`, `choice`, `environment`) and these inputs can be referenced in Markdown via `${{ github.event.inputs.* }}`. Source: <https://github.github.com/gh-aw/reference/triggers/>
1. `workflow_run` includes branch filtering and `conclusion` filtering (`success`, `failure`, `cancelled`, etc.) for downstream monitoring workflows. Source: <https://github.github.com/gh-aw/reference/triggers/>
1. Orchestration-related trigger patterns include natural-language shorthand for API dispatch (`on: api dispatch custom-event`) and event-driven chaining with `workflow_run`. Source: <https://github.github.com/gh-aw/reference/triggers/>
1. Trigger-level controls include `manual-approval`, `skip-if-match`, `skip-if-no-match`, `stop-after`, `on.steps`, and custom activation auth (`on.github-token` / `on.github-app`). Source: <https://github.github.com/gh-aw/reference/triggers/>
1. Label-command and slash-command triggers provide GitHub-native command UX over labels/comments and can auto-enable status comments/reactions. Source: <https://github.github.com/gh-aw/reference/triggers/>

## Quotable passages

- "The `on:` section uses standard GitHub Actions syntax to define workflow triggers." Context: opening section of Triggers reference. Source: <https://github.github.com/gh-aw/reference/triggers/>
- "GitHub Agentic Workflows supports all standard GitHub Actions triggers plus additional enhancements for reactions, cost control, and advanced filtering." Context: Trigger Types section. Source: <https://github.github.com/gh-aw/reference/triggers/>
- "All shorthand formats compile to standard GitHub Actions syntax and automatically include the `workflow_dispatch` trigger." Context: Label filtering and shorthand behavior. Source: <https://github.github.com/gh-aw/reference/triggers/>

## Code snippets

```yaml
on:
  workflow_dispatch:
    inputs:
      topic:
        description: "Research topic"
        required: true
        type: string
      deploy_env:
        description: "Target environment"
        required: false
        type: environment
```

Source: <https://github.github.com/gh-aw/reference/triggers/>

```yaml
on:
  workflow_run:
    workflows: ["CI"]
    types: [completed]
    branches: [main, develop]
    conclusion: [failure, cancelled]
```

Source: <https://github.github.com/gh-aw/reference/triggers/>

```yaml
on:
  label_command:
    name: deploy
    events: [pull_request]
    remove_label: false
```

Source: <https://github.github.com/gh-aw/reference/triggers/>

## Relationships to other dimensions

- Trigger choices shape safe output behavior, especially for issue/PR automation and workflow orchestration patterns. Source: <https://github.github.com/gh-aw/reference/triggers/>
- `workflow_run` and dispatch-oriented triggers map directly to monitoring/orchestration patterns in GitHub Actions ecosystems. Source: <https://github.github.com/gh-aw/reference/triggers/>
- Pre-activation filters (`skip-if-*`) reduce unnecessary AI execution and constrain runs before tool usage or safe outputs. Source: <https://github.github.com/gh-aw/reference/triggers/>

## Limitations and constraints

- Some trigger options include strict compile-time validation (for example, glob validation and configuration sanity checks). Source: <https://github.github.com/gh-aw/reference/triggers/>
- `github-token` and `github-app` in `on:` are mutually exclusive for activation/skip-if operations. Source: <https://github.github.com/gh-aw/reference/triggers/>
- Default fork behavior is restrictive for PR workflows unless `forks:` explicitly permits patterns. Source: <https://github.github.com/gh-aw/reference/triggers/>

## Questions raised

- For enterprise usage, which trigger shorthand patterns should be allowed vs. disallowed to optimize readability and governance?
- For orchestration at scale, how should teams standardize between `workflow_run` chaining and repository-dispatch style patterns?
