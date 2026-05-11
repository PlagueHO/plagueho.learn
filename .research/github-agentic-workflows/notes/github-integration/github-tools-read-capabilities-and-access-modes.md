---
source_url: https://github.github.com/gh-aw/reference/github-tools/
source_title: GitHub Tools (for reading from GitHub)
source_date: 2026-05-12
area: github-integration
dimensions:
  - github-api-tools-and-capabilities
  - github-toolsets-and-authentication
  - repository-access-controls
  - github-actions-integration
extracted: 2026-05-12
quality: draft
---

## Summary

This source defines how GitHub Agentic Workflows read GitHub data through `tools.github`, including toolsets, repository restrictions, integrity filtering, and access modes.

## Key facts

1. Default GitHub toolsets are `context`, `repos`, `issues`, `pull_requests`, and `users`; these are available without extra configuration in most workflows. Source: <https://github.github.com/gh-aw/reference/github-tools/>
1. Toolset selection supports shorthand values: `default` (core set) and `all` (all available toolsets except `dependabot`, which must be added explicitly). Source: <https://github.github.com/gh-aw/reference/github-tools/>
1. Access modes are `local` (default, Docker-based MCP server), `remote` (hosted MCP server, requires token), and `gh-proxy` (pre-authenticated gh CLI path). Source: <https://github.github.com/gh-aw/reference/github-tools/>
1. Repository access can be constrained with `tools.github.allowed-repos` using exact repos, owner wildcards, or repo-prefix wildcards; legacy `repos` was renamed to `allowed-repos`. Source: <https://github.github.com/gh-aw/reference/github-tools/>
1. `tools.github.min-integrity` enforces minimum integrity filtering, and `approved` is auto-applied for public repositories. Source: <https://github.github.com/gh-aw/reference/github-tools/>
1. Additional authentication is required for some read scenarios (org/user info, private cross-repo reads, projects, and remote mode), using PAT, GitHub App, or a known magic secret. Source: <https://github.github.com/gh-aw/reference/github-tools/>

## Quotable passages

- "The GitHub Tools (`tools.github`) allow the agentic step of your workflow to read information such as issues and pull requests from GitHub." Context: section introducing `tools.github`. Source: <https://github.github.com/gh-aw/reference/github-tools/>
- "The `tools.github.mode` field controls how the agent accesses GitHub. Three values are supported: local (default), remote, gh-proxy." Context: GitHub Tools Access Modes. Source: <https://github.github.com/gh-aw/reference/github-tools/>
- "`toolsets: [all]` does not include the `dependabot` toolset. The `dependabot` toolset must be opted into explicitly." Context: GitHub Toolsets section. Source: <https://github.github.com/gh-aw/reference/github-tools/>

## Code snippets

```yaml
tools:
  github:
    mode: remote
    github-token: ${{ secrets.CUSTOM_PAT }}
    toolsets: [repos, issues, pull_requests, actions]
    allowed-repos:
      - myorg/*
      - partner/shared-repo
    min-integrity: approved
```

Source: <https://github.github.com/gh-aw/reference/github-tools/>

```yaml
tools:
  github:
    toolsets: [all, dependabot]
```

Source: <https://github.github.com/gh-aw/reference/github-tools/>

## Relationships to other dimensions

- Connects to safe output write controls in `safe-outputs` by separating read tooling from write execution paths. Source: <https://github.github.com/gh-aw/reference/github-tools/>
- Connects to trigger design because toolset scope should align with event context (for example, issue or workflow-run analysis). Source: <https://github.github.com/gh-aw/reference/github-tools/>
- Connects to cross-repository orchestration via `allowed-repos` and additional auth requirements. Source: <https://github.github.com/gh-aw/reference/github-tools/>

## Limitations and constraints

- `dependabot` is not included by `toolsets: [all]` and requires explicit opt-in. Source: <https://github.github.com/gh-aw/reference/github-tools/>
- `remote` mode requires additional token configuration. Source: <https://github.github.com/gh-aw/reference/github-tools/>
- Patterns for `allowed-repos` must be lowercase and wildcard placement is constrained to suffix usage. Source: <https://github.github.com/gh-aw/reference/github-tools/>

## Questions raised

- For repositories using both `gh-proxy` and integrity reactions, what is the recommended baseline permission set by organization policy?
- For large organizations, what governance pattern is preferred for centrally managing `allowed-repos` patterns across many workflows?
