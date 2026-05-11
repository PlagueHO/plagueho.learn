---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls
source_title: Agentic Workflows Developer Guide - Best Practices and Common Pitfalls
source_date: 2026-05-12
area: best-practices
dimensions:
  - production-readiness-patterns
  - security-best-practices-and-guardrails
  - performance-and-optimization
  - error-handling-and-reliability
  - cost-management
  - troubleshooting-and-debugging
  - testing-strategies
  - dos-and-donts
extracted: 2026-05-12
quality: draft
---

## Best practices and common pitfalls for production workflows

### Overview

This source provides operational guidance for moving GitHub Agentic Workflows from development to production, including explicit Do and Don't practices, a production security checklist, debugging workflows, and cost-control tactics. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)

### Key facts

1. The guide recommends starting with read-only permissions and using safe outputs for writes, stating that direct write permissions bypass security layers. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
2. During development, the guide recommends including `workflow_dispatch` so workflows can be triggered manually without waiting for schedules or events. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
3. Production guidance includes enabling `strict: true`, using minimal read-only permissions, configuring only required `safe-outputs`, setting `network: allowed:`, applying `on.roles:`, and excluding bots with `on.skip-bots:`. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
4. The source states that secrets must be configured via engine-specific settings and not in `env:`, because environment variables in `env:` are visible to the AI model. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
5. Cost controls include tracking token usage with `gh aw logs`, reducing `timeout-minutes` (default 20), writing specific instructions, and avoiding overly frequent schedules for low-value automation. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
6. Debugging recommendations map common failure symptoms to specific fixes, for example stale `.lock.yml`, trigger misconfiguration, missing secrets, missing safe outputs, or missing network allowlist domains. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
7. Iteration guidance distinguishes body vs. frontmatter changes: markdown body edits do not require recompilation, while frontmatter edits require `gh aw compile`. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
8. Testing guidance recommends real scenarios (real issues/PRs) over synthetic-only tests because agent behavior adapts to realistic content. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
9. The Don't list explicitly warns against granting direct write permissions, vague instructions, skipping threat detection, hardcoding secrets, ignoring cost management, and operating too many workflows at once. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
10. The source recommends starting with 2-3 high-value workflows and expanding based on results to control operational and token costs. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)

### Quotable passages

- "Enable strict mode for production | strict: true enforces enhanced security validation. Only disable for rapid prototyping." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- "Hardcoding secrets in env: | Environment variables in env: are visible to the AI model. Use engine-specific secret configuration instead." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- "Cost is too high | Long-running agent sessions | Reduce timeout-minutes, write more specific instructions." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)

### Code snippets

```yaml
# Status: unverified
strict: true
permissions:
  contents: read
  issues: read
safe-outputs:
  create-issue:
network:
  allowed:
    - defaults
on:
  roles: [admin, maintainer, write]
  skip-bots: [dependabot, renovate]
```

Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>

```bash
# Status: unverified
gh aw compile --strict
gh aw logs
gh aw run <name>
```

Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>

### Relationships to other dimensions

- Connects to architecture and security dimensions through strict validation, threat detection gates, network allowlists, and safe output permission isolation. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- Connects to GitHub integration dimensions through trigger design (`workflow_dispatch`, event triggers), role scoping (`on.roles:`), and lock-file compilation flow. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- Connects to operations dimensions through cost controls (`timeout-minutes`, schedule frequency), observability (`gh aw logs`), and iterative testing. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)

### Limitations and constraints

- The guidance is workshop documentation and does not provide quantitative SLO or throughput benchmarks for workflow performance. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- Engine-token cost details are described operationally (how to reduce usage) but without fixed price values in this section. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)
- Security checklist items are configuration-focused and assume supporting organizational controls (repo policy, secret governance) are managed elsewhere. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#11-best-practices-and-common-pitfalls>)

### Questions raised

- Which checklist items are enforced automatically by compilation versus requiring manual repo governance checks?
- What threshold should be used to classify a workflow as high-value before adding it to the initial 2-3 production set?
- Which debug artifacts from `gh aw logs` should be retained for incident response and for how long?
