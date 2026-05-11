---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#4-walkthrough-1-daily-repository-status-report
source_title: Agentic Workflows Developer Guide — Daily Repository Status Report
source_date: 2026-05-12
area: examples
dimensions:
  - dailyops-pattern
  - scheduled-workflows
  - reporting-automation
  - safe-outputs-create-issue
extracted: 2026-05-12
quality: draft
---

# Daily Repository Status Report Workflow

## Overview

A practical walkthrough demonstrating a DailyOps scheduled workflow that runs daily and on-demand, analyzes repository activity, and creates an upbeat status report issue. This is the foundational example for understanding the compile → commit → run cycle.

## Key Facts

1. **Workflow Purpose**: Creates an automated daily status report as a GitHub issue, analyzing recent repository activity and providing a summary with highlights, progress tracking, and recommendations.

2. **Trigger Configuration**:
   ```yaml
   on:
     schedule: daily
     workflow_dispatch:
   ```
   - Runs automatically on a daily schedule
   - Can be manually triggered with `gh aw run daily-repo-status`
   - Demonstrates both scheduled and on-demand execution

3. **Permissions Model**:
   - `contents: read` — Access to repository content for analysis
   - `issues: read` — Access to existing issues
   - `pull-requests: read` — Access to PR data
   - No direct write permissions (uses safe-outputs instead)

4. **Safe Output Configuration**:
   ```yaml
   safe-outputs:
     create-issue:
       title-prefix: "[daily-status] "
       labels: [report, daily-status]
       close-older-issues: true
   ```
   - Creates new issues with automatic prefix for consistency
   - Tags issues with `report` and `daily-status` labels
   - Automatically closes older daily-status issues to prevent clutter

5. **Report Content Categories** (What to Include):
   - Recent repository activity (issues, PRs, discussions, releases, code changes)
   - Progress tracking, goal reminders, and project highlights
   - Project status and recommendations
   - Actionable next steps for maintainers

6. **Style Guidelines for Agent Prompts**:
   - Use friendly, professional tone
   - Include relevant statistics and metrics
   - Use markdown formatting with headers, bullet points, and tables
   - Keep the report concise but informative

## Implementation Workflow

### Step 1: Create Workflow File

Create `.github/workflows/daily-repo-status.md` with YAML frontmatter and markdown body:

- Frontmatter specifies triggers, permissions, safe-outputs, engine, and timeout
- Body contains natural language instructions for the agent

### Step 2: Compilation

Run `gh aw compile` to generate `.github/workflows/daily-repo-status.lock.yml`:
- Validates YAML schema
- Checks expression safety
- Pins action SHAs for security
- Performs security scanning

### Step 3: Version Control

Commit both files:
- `.md` file is the human-editable source of truth
- `.lock.yml` is the security-hardened GitHub Actions workflow
- Both files are required

### Step 4: Manual Triggering

Test immediately with `gh aw run daily-repo-status`:
- Workflow executes within 2-3 minutes
- Review the generated issue in the Issues tab
- Issue appears with `[daily-status]` prefix

### Step 5: Customization

Edit the "What to include" section to focus on team priorities:
- Add CI/CD health monitoring and recent failures
- Include open PRs needing review attention
- Flag issues stale for more than 7 days
- Only markdown body editing required; no recompilation needed
- Commit, push, and re-run to see changes

## Business Value Examples

1. **Team Awareness**: Automated daily summaries keep team members informed without manual compilation
2. **Progress Visibility**: Systematic tracking of goals, highlights, and project status
3. **Maintenance Efficiency**: Actionable next steps reduce manual planning overhead
4. **Consistency**: Standardized daily reporting format across teams

## Use Case Variations

Teams commonly customize daily-repo-status for different contexts:
- **QA Teams**: Focus on test coverage, recent failures, release readiness
- **Maintenance Teams**: Emphasize open issues, PR queue, dependency updates
- **Developer Teams**: Highlight feature progress, blockers, CI health
- **Project Managers**: Track milestone progress, deliverables, risks

## Configuration Insights

1. **Timeout Management**: Default is 20 minutes; suitable for daily analysis of most repositories
2. **Cost Efficiency**: Daily execution uses moderate tokens; specific instructions keep token usage predictable
3. **Close-older-issues Pattern**: Prevents issue spam by automatically closing previous daily reports

## Common Customizations

1. **Metric Focus**: Teams adjust what statistics to include based on priorities
2. **Time Range**: Can focus on last 24 hours, 7 days, or custom ranges
3. **Issue Format**: Customize title prefix, labels, and report structure
4. **Scheduling**: Can adjust from daily to weekly or different times

## Related Dimensions

- scheduled-workflow-patterns
- safe-outputs-create-issue-reference
- frontmatter-configuration
- compilation-and-deployment
- permissions-minimal-read
- cost-management
