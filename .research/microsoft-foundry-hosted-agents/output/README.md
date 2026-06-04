---
post_title: Research output index for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-research-output-index
microsoft_alias: copilot
featured_image: none
categories:
  - Research
  - Azure
tags:
  - foundry
  - hosted agents
  - architecture
ai_note: AI-assisted synthesis
summary: Indexed output for deep research on Microsoft Foundry Hosted Agents.
post_date: 2026-05-11
status: complete
---

## Output index

- [01-overview-and-deployment.md](01-overview-and-deployment.md)
- [02-persistence-isolation-identity.md](02-persistence-isolation-identity.md)
- [03-scalability-and-operations.md](03-scalability-and-operations.md)
- [04-multiagent-multitenant-patterns.md](04-multiagent-multitenant-patterns.md)
- [05-build2026-and-publishing-updates.md](05-build2026-and-publishing-updates.md)
- [06-build-2026-change-log.md](06-build-2026-change-log.md)

Section cross-references:

- The multitenant decisions in [04-multiagent-multitenant-patterns.md](04-multiagent-multitenant-patterns.md) depend on identity and isolation constraints documented in [02-persistence-isolation-identity.md](02-persistence-isolation-identity.md).
- Operational runbooks in [03-scalability-and-operations.md](03-scalability-and-operations.md) should be applied with deployment lifecycle controls in [01-overview-and-deployment.md](01-overview-and-deployment.md).
- Publishing and Microsoft Agent 365 guidance in [05-build2026-and-publishing-updates.md](05-build2026-and-publishing-updates.md) builds on the identity and RBAC posture in [02-persistence-isolation-identity.md](02-persistence-isolation-identity.md) and the distribution patterns in [04-multiagent-multitenant-patterns.md](04-multiagent-multitenant-patterns.md).
- The precise Build 2026 changelog in [06-build-2026-change-log.md](06-build-2026-change-log.md) records exactly what changed and feeds the updates summarized across sections 01, 03, and 05.

## Coverage confirmation

This research package covers:

- Deployment model and architecture of Foundry Hosted Agents
- Persistence model, including sessions and memory stores
- Data isolation and identity/RBAC posture
- Scalability, limits, and operational runbook priorities
- Multi-agent orchestration patterns and selection guidance
- Single-tenant versus multi-tenant implementation patterns
- Microsoft Build 2026 changes for Foundry Agent Service (hosted-agent GA, protocols, Routines, autopilots, A2A, memory)
- Publishing hosted agents to Microsoft 365 Copilot and Microsoft Teams
- Microsoft Agent 365 governance and autopilots (AI teammates)

## Primary required sources included

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/agent-framework/hosting/foundry-hosted-agent?pivots=programming-language-csharp
- https://devblogs.microsoft.com/foundry/agent-service-build2026/
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry
