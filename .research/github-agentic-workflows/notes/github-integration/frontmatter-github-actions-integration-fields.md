---
source_url: https://github.github.com/gh-aw/reference/frontmatter/
source_title: Frontmatter
source_date: 2026-05-12
area: github-integration
dimensions:
  - github-native-workflow-syntax
  - github-actions-integration
  - trigger-and-permission-design
  - github-integration-configuration
extracted: 2026-05-12
quality: draft
---

## Summary

This source is the canonical field-level reference for agentic workflow frontmatter, mapping Markdown workflow authoring into GitHub Actions-compatible configuration with gh-aw-specific extensions.

## Key facts

1. Frontmatter is the YAML block between `---` markers and carries triggers, permissions, engine selection, tool configuration, and workflow runtime settings. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
1. The `on:` section supports GitHub Actions trigger syntax plus gh-aw controls such as `reaction`, `status-comment`, `manual-approval`, `stop-after`, `skip-if-match`, and activation auth fields. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
1. `permissions:` are defined with GitHub Actions-like syntax for the agentic read path, while writes are expected through `safe-outputs`. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
1. Strict mode (`strict: true`) enforces production guardrails: no direct write permissions, explicit network config, pinned actions, and deprecation checks. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
1. Run configuration fields (`runs-on`, `runs-on-slim`, `timeout-minutes`) map directly to GitHub Actions execution characteristics; Linux runners are required for AWF workflows. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
1. Workflow-level `env:` must not include secret expressions because those values flow to the agent container; strict mode treats this as an error. Source: <https://github.github.com/gh-aw/reference/frontmatter/>

## Quotable passages

- "The frontmatter (YAML configuration section between `---` markers) ... includes the triggers, permissions, AI engines, and workflow settings." Context: Frontmatter overview. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- "The `on:` section uses standard GitHub Actions syntax to define workflow triggers, with additional fields for security and approval controls." Context: Trigger Events element. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- "Refuses write permissions ... use safe-outputs instead." Context: strict mode enforcement area. Source: <https://github.github.com/gh-aw/reference/frontmatter/>

## Code snippets

```yaml
on:
  issues:
    types: [opened]
  workflow_dispatch:
permissions:
  contents: read
  issues: read
safe-outputs:
  add-comment:
strict: true
engine: copilot
```

Source: <https://github.github.com/gh-aw/reference/frontmatter/>

```yaml
run-name: "Custom workflow run name"
runs-on: ubuntu-latest
runs-on-slim: ubuntu-slim
timeout-minutes: 30
```

Source: <https://github.github.com/gh-aw/reference/frontmatter/>

```yaml
env:
  CUSTOM_VAR: value
# Do not put ${{ secrets.* }} at workflow-level env in agentic workflows.
```

Source: <https://github.github.com/gh-aw/reference/frontmatter/>

## Relationships to other dimensions

- Frontmatter is the contract surface that binds trigger syntax, tool access, and safe-output permissions into a compiled GitHub Actions workflow. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- It connects to GitHub integration by exposing token/app settings in `on:` and by linking to `tools` and `safe-outputs` references. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- It provides native compatibility with additional GitHub Actions features (`jobs`, `steps`, `if`, `concurrency`, reusable workflow fields). Source: <https://github.github.com/gh-aw/reference/frontmatter/>

## Limitations and constraints

- AWF workflows require Linux-compatible runner constraints; `macos-*` and `windows-*` are not supported for the main AWF execution path. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- Strict mode disabled workflows cannot run on public repositories. Source: <https://github.github.com/gh-aw/reference/frontmatter/>
- Secret handling constraints apply strongly to top-level `env:`. Source: <https://github.github.com/gh-aw/reference/frontmatter/>

## Questions raised

- Which subset of advanced frontmatter fields should be included in team templates to keep governance simple while preserving flexibility?
- What policy should enforce strict-mode compliance and secret-safe `env` usage across repositories?
