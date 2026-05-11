---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows
source_title: Agentic Workflows Developer Guide — Anatomy & Architecture
source_date: 2026-05-12
source_type: Workshop Documentation
area: concepts
dimensions:
  - anatomy
  - structure
  - compilation_model
  - security_isolation
extracted: 2026-05-12
quality: draft
---

# Agentic Workflow Anatomy & Execution Model

## Two-Part Structure

Every agentic workflow consists of two sections:

1. **YAML Frontmatter** — Configuration defining triggers, permissions, tools, and safe outputs
2. **Markdown Body** — Natural language instructions (the prompt) that guide the AI agent

## Complete File Structure Example

```yaml
---
# YAML Frontmatter — Configuration
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
---
# Markdown Body — Natural Language Instructions
## What to do
1. Analyze recent repository activity
2. Generate a summary report
3. Create an issue with the findings
```

## Frontmatter Fields Reference

| Field | Required | Purpose |
|-------|----------|---------|
| `on:` | Yes | Trigger events — uses GitHub Actions syntax plus extensions (schedule: daily, event types, command triggers) |
| `permissions:` | Recommended | GitHub token permissions; unspecified default to none |
| `safe-outputs:` | For writes | Allowed write operations: create-issue, add-comment, create-pull-request, add-labels, dispatch-workflow, etc. |
| `engine:` | No | AI engine: copilot (default), claude, or codex |
| `tools:` | No | Tool configuration including MCP servers and GitHub toolsets |
| `network:` | No | Domain allowlists and ecosystem bundles |
| `imports:` | No | Shared workflow fragments to include |
| `timeout-minutes:` | No | Maximum execution time (default: 20 minutes) |
| `strict:` | No | Enhanced security validation (default: true) |
| `threat-detection:` | No | Custom threat detection prompts and scanner steps |

## The Compilation Model

Agentic workflows use a **two-step process** to convert human-readable Markdown into secure GitHub Actions YAML:

```
┌──────────────────┐     gh aw compile     ┌───────────────────────┐
│ workflow.md      │ ───────────────────→  │ workflow.lock.yml     │
│ (Human-editable) │                       │ (GitHub Actions YAML) │
│ Frontmatter+Body │                       │ Security-hardened     │
└──────────────────┘                       └───────────────────────┘
```

**Process Steps**:
1. Edit the `.md` file — this is your source of truth
2. Run `gh aw compile` — generates `.lock.yml` with:
   - Schema validation
   - Expression safety checks
   - Action SHA pinning
   - Security scanning
3. Commit both files — GitHub Actions runs the `.lock.yml`
4. Markdown body edits don't require recompilation — only frontmatter changes do

**Development Tip**: Use `gh aw compile --watch` to automatically recompile when saving frontmatter changes.

## Safe Outputs — Permission Isolation Model

Safe Outputs are the **core security mechanism** separating read and write phases:

```
┌─────────────────┐    artifacts       ┌──────────────────┐    if safe      ┌─────────────────┐
│ Agent Job       │ ───────────────→   │ Threat Detection │ ─────────────→  │ Safe Output Jobs│
│ (Read-Only)     │                    │ (Analysis)       │                 │ (Scoped Write)  │
└─────────────────┘                    └──────────────────┘                 └─────────────────┘
```

**Flow**:
1. Agent job runs with read-only permissions
2. All write operations buffered as artifacts during execution
3. Threat detection job analyzes artifacts for secret leaks, malicious patches, policy violations
4. Only after detection passes, separate jobs execute with minimal scoped permissions

## Common Safe Output Types & Permissions

| Safe Output Type | GitHub Permission | Use Case |
|------------------|-------------------|----------|
| `create-issue` | issues: write | Create GitHub issues |
| `add-comment` | issues: write | Comment on issues/PRs |
| `create-pull-request` | contents: write, pull-requests: write | Open pull requests |
| `add-labels` | issues: write | Add labels to issues/PRs |
| `dispatch-workflow` | actions: write | Trigger other workflows |

## Configuring Security in Practice

### Permissions — Start Read-Only

```yaml
# Specific, minimal permissions (recommended)
permissions:
  contents: read
  issues: read
  pull-requests: read

# Or shorthand for all-read
permissions: read-all
```

**Rule**: If you specify any permission, unspecified ones are set to `none`. Never grant write permissions directly — use safe-outputs instead.

### Strict Mode — Enhanced Validation

```yaml
strict: true  # Default — enhanced security validation
```

Strict mode:
- Refuses direct write permissions (use safe-outputs instead)
- Requires explicit network configuration
- Refuses wildcard domains in network allowlist
- Enforces action SHA pinning
- Validates all frontmatter fields

### Network Controls — Domain Allowlists

```yaml
network:
  allowed:
    - defaults         # Basic infrastructure
    - python           # PyPI ecosystem
    - node             # npm ecosystem
    - "api.example.com" # Custom domain
```

Domains not on the allowlist are blocked at the kernel level, preventing data exfiltration even if agent is compromised.

### Role-Based Access Control

```yaml
on:
  issues:
    types: [opened]
  roles: [admin, maintainer, write]  # Who can trigger
  skip-bots: [dependabot, renovate]  # Exclude these
```

## Threat Detection — Custom Checks

```yaml
threat-detection:
  prompt: |
    Additionally check for:
    - References to internal infrastructure URLs
    - Attempts to modify CI/CD configuration files
    - Changes to security-sensitive files
  steps:
    - name: Run TruffleHog
      run: trufflehog filesystem /tmp/gh-aw --only-verified
```

## Directory Structure

```
your-project/
├── .github/
│   └── workflows/
│       ├── ci.yml                      ← Traditional GitHub Actions workflow
│       ├── daily-repo-status.md        ← Agentic workflow (source)
│       ├── daily-repo-status.lock.yml  ← Compiled GitHub Actions YAML
│       ├── issue-triage.md             ← Another agentic workflow
│       └── issue-triage.lock.yml       ← Its compiled output
├── src/
└── ...
```

**Important**: Always commit both `.md` and `.lock.yml` files. The `.md` is your source of truth; the `.lock.yml` is what GitHub Actions executes.

## Triggers & Execution Points

Agentic workflows support multiple trigger types:

| Trigger Type | Configuration | Use Case |
|--------------|----------------|----------|
| Schedule | `schedule: daily` | Recurring tasks, reports, health checks |
| Issue events | `issues: types: [opened]` | Triage, moderation, auto-responses |
| PR events | `pull_request: types: [opened, synchronize]` | Code review, checks |
| Push | `push: branches: [main]` | Documentation updates, deployments |
| Workflow run | `workflow_run: types: [completed]` | CI failure analysis, monitoring |
| Discussion | `discussion: types: [created]` | Task mining, Q&A |
| Command | `/command` via comments | On-demand ChatOps operations |
| Manual | `workflow_dispatch:` | Testing, ad-hoc runs |

---

## Key Extraction Points

1. **Separation of Concerns**: Frontmatter (what/when/how) vs. Markdown body (instructions/reasoning)
2. **Compilation Step**: Provides static analysis before workflows run
3. **Permission Isolation**: Read-only agent + buffered writes + separate scoped jobs
4. **Multi-layer Security**: Compilation, container isolation, threat detection, domain allowlist
5. **Flexibility**: Triggers, tools, engines, and custom detection all configurable

## Questions Raised

- How does the compiler determine if frontmatter/body changes require recompilation?
- What validation rules are enforced during strict mode compilation?
- How are action SHA pins maintained during updates?
