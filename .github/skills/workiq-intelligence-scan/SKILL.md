---
name: workiq-intelligence-scan

description: >-
  **WORKFLOW SKILL** — Query WorkIQ for recent activity signals, identify
  patterns in conversations and meetings, cross-reference with latest tech
  announcements, and propose aligned demos as GitHub issues. WHEN: "intelligence
  scan", "what demos to build", "scan recent activity", "WorkIQ scan", "demo
  proposals from conversations", "identify demo opportunities", "what should I
  demo next". INVOKES: WorkIQ MCP, web search, GitHub issue tools. FOR SINGLE
  OPERATIONS: Query WorkIQ MCP directly.

metadata:
  author: Daniel Scott-Raynsford
  version: "1.0"
---

# WorkIQ Intelligence Scan

Query WorkIQ for active topics in meetings, emails, and chats.
Cross-reference with tech announcements and propose demos as GitHub issues.

## Prerequisites

- **WorkIQ MCP server** — configured and accessible.
- **Web search** — to cross-reference tech announcements.
- **GitHub access** — to create demo proposal issues.

## Process

### Step 1 — Query Recent Activity

Use WorkIQ MCP to query each area. Adapt queries to the repo owner's
name (from repo context or ask the user):

1. "What topics has {user} been discussing in meetings this week?"
2. "What are the most common themes in {user}'s recent emails with partners?"
3. "What Azure or AI topics have come up in {user}'s Teams chats?"
4. "Are there any upcoming meetings about demos, presentations, or events?"
5. "What documents has {user} been working on related to architecture or SaaS?"

Record results for each query.

### Step 2 — Identify Patterns

Analyze signals for these pattern types. Refer to
[references/SIGNAL-CATEGORIES.md](references/SIGNAL-CATEGORIES.md) for
detailed criteria and examples.

- **Repeated topics** — 3+ conversations mentioning the same technology
  or theme.
- **Urgent requests** — partner or customer asks with deadlines or
  executive visibility.
- **Upcoming events** — Build, Ignite, partner summits, internal reviews,
  or customer engagements.
- **New tech mentions** — recently announced or preview technology
  generating discussion.
- **SaaS/ISV topics** — multitenancy questions, architecture reviews, or
  ISV partner engagements.

Classify each signal with a strength rating:

| Strength | Criteria |
|----------|----------|
| 🔴 Hot | 3+ mentions, deadline within 2 weeks, or exec visibility |
| 🟡 Warm | 2 mentions, or upcoming event within 1 month |
| 🟢 Emerging | 1 mention of new/preview technology, or general interest |

### Step 3 — Cross-Reference with Announcements

Search the web for recent announcements on identified topics. Check:

- Azure blog (azure.microsoft.com/blog)
- GitHub blog (github.blog)
- .NET blog (devblogs.microsoft.com/dotnet)
- Microsoft AI blog
- What's new in Azure AI Foundry, GitHub Copilot, .NET Aspire

For each signal from Step 2, note whether a matching recent announcement
amplifies its relevance.

### Step 4 — Create Demo Proposals

For each 🔴 Hot or 🟡 Warm signal, create a GitHub issue using the
template in
[assets/intelligence-brief-template.md](assets/intelligence-brief-template.md).

Determine the demo category from existing demo folders. Read `demos/` to
identify valid categories (e.g., `azure-ai`, `github-copilot`,
`dotnet-aspire`, `saas-multitenancy`, `bleeding-edge`).

Each issue must include:

1. **Intelligence brief** — source, signal strength, relevance, timeliness.
2. **Proposed demo** — title, category, description, wow moment, audience.
3. **Acceptance criteria** — specific, testable criteria for the demo.

### Step 5 — Summarize and Update Focus

1. Present a summary table of all signals with strength ratings and
   proposed actions.
2. If `.squad/identity/now.md` exists, update it with the latest
   intelligence summary. If it does not exist, skip this step.

## Output Format

1. **Signal summary table** — all signals with strength and status.
2. **GitHub issues** — one per Hot or Warm signal, using the intelligence
   brief template.
3. **Focus update** — updated `.squad/identity/now.md` (if it exists).

## Edge Cases

- **WorkIQ returns no results** — report no recent activity found.
  Suggest checking WorkIQ configuration or broadening queries.
- **No Hot or Warm signals** — report Emerging signals only and recommend
  revisiting in 1–2 weeks. Do not create issues for Emerging signals
  unless the user requests it.
- **Duplicate proposals** — search existing repo issues for similar titles
  or topics before creating an issue.
- **No matching announcements** — note the signal as "conversation-driven"
  rather than "announcement-driven" in the brief.
