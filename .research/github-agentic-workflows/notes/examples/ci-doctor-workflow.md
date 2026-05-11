---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#6-walkthrough-3-ci-doctor
source_title: Agentic Workflows Developer Guide — CI Doctor
source_date: 2026-05-12
area: examples
dimensions:
  - fault-analysis-pattern
  - ci-cd-automation
  - diagnostic-workflows
  - workflow-run-triggers
  - multi-source-analysis
extracted: 2026-05-12
quality: draft
---

# CI Doctor — Automated Failure Diagnosis

## Overview

A fault analysis workflow that monitors CI/CD pipeline failures, analyzes failure logs, identifies root causes, and creates diagnostic issues with actionable fix suggestions. Demonstrates sophisticated multi-source analysis and conditional behavior patterns.

## Key Facts

1. **Workflow Purpose**: Automatically diagnoses CI failures, eliminating manual investigation overhead and reducing mean time to resolution (MTTR) for broken builds.

2. **Trigger Configuration**:
   ```yaml
   on:
     workflow_run:
       workflows: ["*"]
       types: [completed]
       branches: [main]
     workflow_dispatch:
   ```
   - Reacts to completion of any workflow on main branch
   - Monitors all workflows with wildcard (`"*"`) for comprehensive coverage
   - Supports manual triggering for on-demand diagnosis

3. **Permissions Model**:
   - `contents: read` — Access to code for root cause analysis
   - `actions: read` — Access to workflow run logs and details
   - `issues: read` — Access to issue history for pattern matching
   - No direct write permissions (safe-outputs handles issue creation)

4. **Safe Output Configuration**:
   ```yaml
   safe-outputs:
     create-issue:
       title-prefix: "[ci-doctor] "
       labels: [ci-failure, needs-attention]
       close-older-issues: true
   ```
   - Creates diagnostic issues with consistent prefix
   - Tags for easy filtering and tracking
   - Closes previous diagnostic issues to maintain clean workflow

5. **Tool Configuration**:
   ```yaml
   tools:
     github:
       toolsets: [issues, pull_requests, code_search, workflow_runs]
   ```
   - Enables GitHub MCP toolsets for comprehensive data gathering
   - Workflow runs: Access to logs and failure details
   - Code search: Identify recent changes causing failures
   - Issues/PRs: Historical context and related problems

6. **Diagnostic Process** (Agent Instructions):
   1. Verify the triggering workflow actually failed (skip if succeeded)
   2. Retrieve failed workflow run details and logs
   3. Analyze failure:
      - Identify the specific step that failed
      - Examine error messages and stack traces
      - Determine failure type: flaky test, dependency issue, configuration problem, or code bug
   4. Research root cause:
      - Look at recent commits that might have caused failure
      - Check if similar failures have occurred before
      - Identify the most likely root cause
   5. Create diagnostic issue with:
      - **Summary**: One-line description of the failure
      - **Failed Workflow**: Name, run ID, and link
      - **Root Cause Analysis**: What went wrong and why
      - **Suggested Fix**: Specific steps to resolve the issue
      - **Related Changes**: Recent commits or PRs that may be relevant

7. **Quality Standards**:
   - Be specific and actionable in diagnosis
   - Include relevant log snippets in code blocks
   - If cause is ambiguous, list top 2-3 most likely causes
   - Link to relevant documentation when applicable
   - Do NOT create an issue if the workflow succeeded

## Implementation Workflow

### Step 1: Create Workflow File

Create `.github/workflows/ci-doctor.md` with:
- Workflow_run trigger configuration
- Read-only permissions for analysis
- Safe output for diagnostic issue creation
- Comprehensive tool configuration
- Multi-step diagnostic instructions

### Step 2: Compile and Push

```bash
gh aw compile
git add .github/workflows/ci-doctor.md .github/workflows/ci-doctor.lock.yml
git commit -m "feat: add CI doctor fault analysis workflow"
git push
```

### Step 3: Testing

Option 1: Intentionally introduce a build error to trigger failure
Option 2: Manually trigger with `gh aw run ci-doctor`

### Step 4: Review Output

- Observe diagnostic issue created in Issues tab
- Review root cause analysis
- Verify suggested fix is actionable

## New Concepts Introduced

1. **Workflow Run Triggers**: Reacting to completion of other workflows
2. **Tool Configuration**: Tools: github: toolsets specifies which MCP capabilities available
3. **Conditional Behavior**: Instructions tell agent to skip output if workflow succeeded
4. **Multi-Source Analysis**: Agent correlates workflow logs, recent commits, and issue history

## Business Value

### Development Velocity
- Reduced time developers spend investigating CI failures
- Actionable diagnostics speed up fix implementation
- Prevents duplicate investigations of same issues

### Problem Prevention
- Identifies flaky tests for targeted fixes
- Catches environmental configuration issues
- Reveals problematic dependency versions

### Knowledge Retention
- Diagnostic issues serve as searchable failure history
- Patterns become visible over time
- Team learns about recurring issues

### Proactive Monitoring
- Shifts from reactive firefighting to proactive management
- Enables trending analysis of failure types
- Identifies systemic issues before they compound

## Real-World Variations

### JavaScript/Node.js Project
- Diagnoses dependency resolution failures
- Identifies module version conflicts
- Detects memory/timeout issues in tests

### Compiled Language Project
- Analyzes compiler errors and warnings
- Diagnoses linking failures
- Identifies build configuration problems

### Container-Based Project
- Checks image availability and build layer failures
- Diagnoses runtime environment issues
- Identifies resource constraint problems

### Multi-Service Architecture
- Tracks cross-service integration failures
- Identifies service communication issues
- Diagnoses deployment orchestration problems

## Advanced Patterns

### Flakiness Detection
Can be extended to:
- Detect patterns in flaky tests
- Suggest test stabilization strategies
- Track flakiness trends over time

### Automatic Remediation
Can be extended to:
- Auto-retry flaky tests
- Automatically update dependencies if safe
- Revert problematic commits with approval

### ML-Powered Analysis
Can evolve to:
- Learn patterns from historical failures
- Predict root cause based on error signatures
- Suggest likely fixes based on past resolutions

## Integration with Development Workflow

1. **On-Demand Diagnosis**: Developers can manually trigger for quick analysis
2. **Automatic Detection**: Every CI failure automatically analyzed
3. **Issue Tracking**: Diagnostic issues feed into bug tracking workflows
4. **Escalation**: Can integrate with on-call alerting for critical failures

## Related Dimensions

- ci-cd-automation
- workflow-run-trigger-reference
- multi-source-data-correlation
- diagnostic-issue-patterns
- conditional-workflow-behavior
- tool-configuration-mcp
- root-cause-analysis-patterns
