---
source_url: https://copilot-academy.github.io/workshops/copilot-customization/agentic_workflows#5-walkthrough-2-issue-triage-workflow
source_title: Agentic Workflows Developer Guide — Issue Triage Workflow
source_date: 2026-05-12
area: examples
dimensions:
  - issueops-pattern
  - event-driven-workflows
  - issue-management
  - safe-outputs-add-comment
  - safe-outputs-add-labels
extracted: 2026-05-12
quality: draft
---

# Issue Triage Workflow

## Overview

An event-driven workflow that automatically triages new GitHub issues by analyzing content, applying appropriate type and priority labels, and adding helpful clarifying comments. Demonstrates reactive automation triggered by issue creation events.

## Key Facts

1. **Workflow Purpose**: Automatically categorizes and responds to newly opened issues without maintainer intervention, reducing triage overhead while maintaining consistent quality.

2. **Trigger Configuration**:
   ```yaml
   on:
     issues:
       types: [opened]
     roles: [admin, maintainer, write]
   ```
   - Fires when issues are created
   - Limited to specific repository roles (prevents unauthorized triggering)
   - Executes automatically without manual invocation

3. **Permissions Model**:
   - `contents: read` — Repository content access for context
   - `issues: read` — Issue and comment reading
   - No direct write permissions (safe-outputs handles all writes)

4. **Safe Output Configuration**:
   ```yaml
   safe-outputs:
     add-comment: {}
     add-labels:
       labels: [bug, feature, question, documentation, good-first-issue,
                priority-high, priority-medium, priority-low]
   ```
   - Predefined label allowlist restricts agent's label choices
   - Comments are added as helpful triage responses
   - Safe outputs prevent unintended label application

5. **Triage Process** (Agent Instructions):
   1. Analyze issue title and description
   2. Determine issue type: bug, feature, question, or documentation
   3. Assess priority level: high, medium, or low
   4. Apply one type label and one priority label
   5. Add comment that:
      - Acknowledges the reporter
      - Confirms the categorization
      - Asks clarifying questions if description is unclear
      - Suggests relevant documentation or similar issues if applicable

6. **Guidelines for Agent**:
   - Be friendly and welcoming in responses
   - Ask specific clarifying questions rather than guessing
   - Never close or assign issues — only label and comment
   - Keep comments concise and actionable

## Implementation Workflow

### Step 1: Create Workflow File

Create `.github/workflows/issue-triage.md` with:
- Trigger configuration for issue creation
- Minimal read-only permissions
- Safe outputs for labeling and commenting
- Natural language triage instructions

### Step 2: Compile and Push

```bash
gh aw compile
git add .github/workflows/issue-triage.md .github/workflows/issue-triage.lock.yml
git commit -m "feat: add issue triage workflow"
git push
```

### Step 3: Testing

Open a new issue in the repository with:
- Title: "App crashes when uploading files larger than 10MB"
- Body: "When I try to upload a file over 10MB, the app shows a white screen and the console has a memory error."

### Step 4: Observe Execution

- Monitor the Actions tab for workflow execution
- Upon completion, observe that the issue has:
  - Applied labels (e.g., `bug`, `priority-high`)
  - Received a triage comment from the agent

## New Concepts Introduced

1. **Event Triggers**: Issues created automatically trigger the workflow
2. **Role-Based Access Control**: On.roles field restricts which repository roles can trigger
3. **Label Safe Outputs**: Label allowlist prevents application of undefined labels
4. **Content Sanitization**: User-generated issue content is automatically sanitized before reaching the agent

## Business Value

### Consistency
- Standardized triage process across all incoming issues
- Consistent labeling reduces manual review overhead

### Speed
- Issues categorized within seconds of creation
- Team members immediately see type and priority without waiting for maintainer review

### Accessibility
- Clear categorization helps contributors understand how to improve submissions
- Comments provide guidance without being dismissive

### Reduced Burden
- Maintainers spend less time on initial categorization
- Can focus on substantive issue resolution instead of triage

## Real-World Variations

### Security-Focused Repo
- Adds security-related labels (security-vulnerability, security-review-needed)
- Escalates critical security issues to maintainers
- Provides security context in comments

### Multi-Component Project
- Adds component labels (frontend, backend, infrastructure, documentation)
- Routes comments to appropriate component owners
- Asks for component specification if unclear

### Open Source Community
- Adds good-first-issue labels for newcomer-friendly issues
- Provides mentorship tone in comments
- Suggests contribution guidelines

## Design Patterns

1. **Permission Minimization**: Read-only access with safe-outputs for writes demonstrates security best practice
2. **Content Safety**: User input sanitization prevents injection attacks
3. **Role-Based Filtering**: Prevents automated triage of admin-only issue types
4. **Predefined Options**: Label whitelist ensures only expected labels are applied

## Common Customizations

1. **Label Set**: Customize to project's label taxonomy
2. **Priority Logic**: Adjust priority determination based on keywords or patterns
3. **Comment Template**: Vary comment structure based on issue type
4. **Escalation**: Add special handling for security issues or high-priority types
5. **Assignment**: Can extend to suggest assignees (via comment, not actual assignment)

## Related Dimensions

- issueops-pattern-reference
- event-driven-workflow-triggers
- safe-outputs-add-labels
- safe-outputs-add-comment
- content-sanitization-security
- role-based-access-control
- label-management
