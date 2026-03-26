# Work Routing

How to decide who handles what.

## Routing Table

| Work Type | Route To | Examples |
|-----------|----------|----------|
| Content strategy, topic selection, learning pathway design | Neo | "Plan a new presentation on multi-tenant SaaS", "What topics should we cover for AI Foundry?", "Design a learning pathway for Azure architecture" |
| Demo code, sample apps, lab code, Slidev components | Trinity | "Build a .NET demo for Azure OpenAI", "Create starter code for the hands-on lab", "Add a magic-move code block to the presentation" |
| Slide authoring, lab instructions, documentation, pathway content | Morpheus | "Write slides for the Azure Container Apps talk", "Create lab instructions for the AI demo", "Document this pattern" |
| Azure infra, Bicep/Terraform, CI/CD, repo tooling, DevOps content | Tank | "Create Bicep templates for the demo environment", "Set up GitHub Actions for Slidev builds", "Write an Agentic DevOps pattern" |
| AI patterns, Copilot content, Foundry, bleeding-edge research | Oracle | "Research the latest Azure AI Agent Service capabilities", "Create content on GitHub Copilot agent mode", "Evaluate if this preview feature is ready to teach" |
| Content review | Neo | Review presentations, labs, and demos for technical accuracy and audience fit |
| Code review | Trinity | Review demo code, lab solutions, and Slidev components for quality |
| Scope & priorities | Neo | What to build next, trade-offs, content calendar decisions |
| Session logging | Scribe | Automatic — never needs routing |

## Issue Routing

| Label | Action | Who |
|-------|--------|-----|
| `squad` | Triage: analyze issue, assign `squad:{member}` label | Neo |
| `squad:{name}` | Pick up issue and complete the work | Named member |

### How Issue Assignment Works

1. When a GitHub issue gets the `squad` label, **Neo** triages it — analyzing content, assigning the right `squad:{member}` label, and commenting with triage notes.
2. When a `squad:{member}` label is applied, that member picks up the issue in their next session.
3. Members can reassign by removing their label and adding another member's label.
4. The `squad` label is the "inbox" — untriaged issues waiting for Neo's review.

## Rules

1. **Eager by default** — spawn all agents who could usefully start work, including anticipatory downstream work.
2. **Scribe always runs** after substantial work, always as `mode: "background"`. Never blocks.
3. **Quick facts → coordinator answers directly.** Don't spawn an agent for "what port does the server run on?"
4. **When two agents could handle it**, pick the one whose domain is the primary concern.
5. **"Team, ..." → fan-out.** Spawn all relevant agents in parallel as `mode: "background"`.
6. **Anticipate downstream work.** If a presentation is being planned (Neo), spawn Morpheus to start drafting slides and Trinity to scaffold demo code simultaneously.
7. **Issue-labeled work** — when a `squad:{member}` label is applied to an issue, route to that member. Neo handles all `squad` (base label) triage.
8. **Full content pipeline** — a new talk typically flows: Neo (plan) → Trinity + Morpheus + Tank in parallel (code + slides + infra) → Neo (review).

## Work Type → Agent

| Work Type | Primary | Secondary |
|-----------|---------|----------|
| Content strategy, Azure architecture patterns, learning pathways | Neo | Morpheus |
| .NET, React, Next.js, TypeScript demo code and lab code | Trinity | Tank |
| Slidev presentations, lab instructions, documentation | Morpheus | Neo |
| Azure infra (Bicep/Terraform), CI/CD, DevOps patterns | Tank | Trinity |
| AI/Copilot/Foundry content, bleeding-edge research | Oracle | Neo |
| Presentation review and technical accuracy | Neo | Oracle |
