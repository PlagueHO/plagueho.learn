---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow
source_title: Agentic Workflows Developer Guide - Anatomy of an Agentic Workflow
source_date: 2026-05-12
area: architecture
dimensions:
  - technical-architecture
  - compilation-model
  - safe-outputs-and-security
  - execution-flow
  - tool-integration
extracted: 2026-05-12
quality: draft
---

## Anatomy compilation and safe outputs

### Overview

This source describes the core architecture unit of an agentic workflow: YAML frontmatter for machine configuration plus markdown body for natural-language execution guidance, then a compile-to-lock model with security hardening. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)

### Key facts

1. Each workflow is split into two parts: frontmatter (trigger/permissions/tools/security config) and markdown body (agent instructions). (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
2. The source of truth is the markdown workflow file, while GitHub Actions executes the compiled .lock.yml output. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
3. Compilation adds schema validation, expression safety checks, action SHA pinning, and security scanning. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
4. Markdown body edits do not require recompilation, but frontmatter changes do. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
5. Safe outputs implement write isolation by buffering requested writes, running threat detection, then executing scoped write jobs only if analysis passes. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
6. Strict mode enforces stronger policy: refuses direct write permissions, requires explicit network config, rejects wildcard domains, and validates frontmatter fields. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
7. Default timeout is 20 minutes unless overridden by timeout-minutes. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)

### Quotable passages

- "Every agentic workflow has two parts: YAML frontmatter (configuration) and a Markdown body (natural language instructions)." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- "Run gh aw compile - generates the .lock.yml with schema validation, expression safety checks, action SHA pinning, and security scanning." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- "Never grant write permissions directly - use safe-outputs instead." (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)

### Code snippets

```yaml
# Status: unverified
on:
  schedule: daily
permissions:
  contents: read
  issues: read
safe-outputs:
  create-issue:
    title-prefix: "[report] "
    labels: [report]
    close-older-issues: true
engine: copilot
timeout-minutes: 20
```

Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>

```bash
# Status: unverified
gh aw compile --watch
```

Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>

### Relationships to other dimensions

- Bridges architecture and security by mapping safe outputs to GitHub permission scopes per output type. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- Bridges architecture and tools with explicit tools and imports fields in frontmatter. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- Bridges architecture and execution with trigger diversity including schedule, issue, PR, workflow_run, and command patterns. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)

### Limitations and constraints

- If any explicit permission is set, unspecified permissions default to none, which can create under-provisioned runs if not modeled carefully. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- Production security assumes strict mode and explicit allowlists; omission weakens guarantees. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)
- Authoring model requires committing both source and compiled lock file to keep runtime configuration synchronized. (Source: <https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#3-anatomy-of-an-agentic-workflow>)

### Questions raised

- Which frontmatter fields can be safely auto-migrated without changing execution semantics?
- Are there deterministic checksums for frontmatter-only changes to validate compile cache behavior?
- What are recommended limits for safe output max values in high-volume repositories?
