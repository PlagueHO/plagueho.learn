---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#9-workflow-examples-and-patterns
source_title: Agentic Workflows Developer Guide — Workflow Examples and Patterns
source_date: 2026-05-12
area: examples
dimensions:
  - workflow-examples
  - use-case-patterns
  - operational-patterns
  - agentics-collection
extracted: 2026-05-12
quality: draft
---

# Agentic Workflows Examples and Patterns

## Overview

The Agentics collection provides 30+ reusable automated agentic workflows maintained by GitHub Next and Microsoft Research. These represent real-world use cases and operational patterns that can be installed directly or customized for specific repositories.

## Key Facts

1. **Collection Scope**: The Agentics collection at `github.com/githubnext/agentics` contains pre-built workflows organized by category, ready for installation and customization.

2. **Workflow Categories** (organized use cases):
   - **Maintainer**: Issue Triage, Repo Assist, AI Moderator
   - **Fault Analysis**: CI Doctor, CI Coach
   - **Code Review**: Grumpy Reviewer, PR Nitpick, Contribution Check
   - **Research & Planning**: Weekly Research, Daily Plan, Discussion Task Miner
   - **Code Improvement**: Code Simplifier, Test Improver, Documentation Updater
   - **Security**: Daily Malicious Code Scan

3. **Operational Patterns** (patterns to choose based on use case):
   - **DailyOps**: `schedule: daily` — Reports, documentation updates, code improvements
   - **IssueOps**: `issues: [opened, edited]` — Triage, moderation, auto-responses
   - **ChatOps**: `/command comments` — On-demand operations triggered by maintainers
   - **LabelOps**: `issues: [labeled]` — React to label changes (e.g., label triggers investigation)
   - **Orchestration**: `workflow_dispatch + dispatch-workflow` — Multi-phase workflows where one workflow triggers another
   - **Monitoring**: `schedule + workflow_run` — Health checks, CI monitoring, metrics collection

4. **Installation Method**: Interactive wizard simplifies installation with `gh aw add-wizard githubnext/agentics/workflow-name`:
   - Prerequisites check (verifies repository permissions)
   - Engine selection (Copilot, Claude, or Codex)
   - Secret setup (configures API key as repository secret)
   - Workflow installation (adds `.md` and `.lock.yml` files)
   - Initial run (optional immediate execution)

5. **Customization**: Installed workflows can be customized by editing the markdown body (instructions don't require recompilation); frontmatter changes require recompilation with `gh aw compile`.

## Use Case Examples

### Maintainer Automation
- **Issue Triage**: Automatically labels incoming issues by type and priority, adds helpful comments
- **Repo Assist**: Assists with repository operations like creating issues or updating documentation
- **AI Moderator**: Manages community interactions and enforces contribution guidelines

### Continuous Code Quality
- **Code Simplifier**: Suggests code simplifications and automated refactoring
- **Test Improver**: Analyzes test suites and suggests improvements
- **Documentation Updater**: Keeps documentation in sync with code changes

### CI/CD & Fault Analysis
- **CI Doctor**: Diagnoses CI failures, analyzes logs, identifies root causes
- **CI Coach**: Provides guidance on CI/CD improvements

### Research & Planning
- **Weekly Research**: Summarizes recent research or documentation
- **Daily Plan**: Creates daily task summaries or project plans
- **Discussion Task Miner**: Extracts actionable tasks from discussions

### Security
- **Daily Malicious Code Scan**: Regular security scanning for malicious patterns

## Pattern Selection Guidance

Choosing the right pattern depends on trigger type and desired outcome:

| Pattern | Trigger | Best For |
|---------|---------|----------|
| DailyOps | schedule: daily | Reports, automated code improvements, maintenance tasks |
| IssueOps | issues: [opened, edited] | Issue triage, moderation, auto-responses to user submissions |
| ChatOps | /command comments | On-demand operations, team-initiated workflows |
| LabelOps | issues: [labeled] | Reactive workflows based on labeling decisions |
| Orchestration | workflow_dispatch + dispatch-workflow | Multi-step processes, workflows triggering other workflows |
| Monitoring | schedule + workflow_run | Health checks, metrics collection, CI monitoring |

## Implementation Insights

1. **Shared Fragments**: The Agentics collection includes reusable workflow fragments for common tasks:
   - Formatting and reporting guidelines
   - MCP server integrations (arXiv, MarkItDown, Microsoft Docs)
   - Tool libraries (FFmpeg, sq)

2. **Workflow Reuse**: Developers can install pre-built workflows without starting from scratch, significantly accelerating adoption.

3. **Community Maintenance**: Workflows are maintained by GitHub Next and Microsoft Research, ensuring quality and updates.

## Questions for Follow-up

- How are workflows tested before being added to the Agentics collection?
- What versioning strategy exists for installed workflows to handle breaking changes?
- Are there metrics on which workflows are most commonly used and why?

## Related Dimensions

- workflow-design-patterns
- safe-outputs-reference
- trigger-types-and-events
- github-integration
- mcp-tool-integration
