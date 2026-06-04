---
post_title: Foundry Hosted Agents persistence, isolation, and identity
author1: GitHub Copilot
post_slug: foundry-hosted-agents-persistence-isolation-identity
microsoft_alias: copilot
featured_image: none
categories:
  - Security
  - Azure
  - Architecture
tags:
  - persistence
  - identity
  - isolation
  - memory
ai_note: AI-assisted synthesis
summary: State model, data isolation boundaries, and identity design for Foundry Hosted Agents.
post_date: 2026-05-11
section_status: complete
---

## Persistence model

Hosted agents have two distinct persistence planes that should be designed separately:

1. Session compute state: stateful filesystem (`$HOME` and `/files`) bound to session lifecycle.
1. Conversation memory/history: protocol-managed and/or memory-store-managed persisted knowledge.

Treat these as different durability and compliance surfaces:

- Session filesystem persistence is runtime-coupled and suitable for short-to-medium lived state.
- Memory stores are long-term semantic memory and require explicit scope controls.

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents, https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory

## Memory strategy

Memory in Foundry Agent Service (preview) provides long-term memory extraction, consolidation, and retrieval. Scope assignment is the most important control surface for tenancy and user isolation.

As of Build 2026, memory in Foundry Agent Service (public preview) spans three types, each a distinct persistence and isolation surface ([Build 2026 announcement](https://devblogs.microsoft.com/foundry/agent-service-build2026/)):

- Procedural memory (new at Build, public preview) — agents learn how to do the work across runs. Early Tau-bench results show +7-14% absolute success-rate gains at near-baseline cost ([Build 2026 announcement](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- User memory — remembers preferences and facts across sessions.
- Session memory — maintains context within a conversation thread.

Procedural memory crosses run boundaries, so treat it as a long-lived learning surface and apply the same scope partitioning and data-minimization controls used for user memory.

Preview caveat: memory features are preview and consolidation behavior can change during preview. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory

Recommended approach:

- Use one memory store per major agent domain.
- Use explicit scope partitioning by tenant and user.
- For tool-driven memory access, use deterministic scope construction and avoid implicit identity assumptions.
- Define data minimization policy in `user_profile_details` to prevent accidental retention of sensitive or irrelevant attributes.

Source: https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/memory-usage#create-a-memory-store

## Identity model and least privilege

Foundry introduces a dedicated agent identity model in Entra:

- Unpublished/in-development agents use shared project identity.
- Published agents get distinct identities and require role reassignment.

Design implications:

- Role assignments must target current active `agentIdentityId`.
- Publishing transitions are security events, not only release events.
- Audience values for downstream services must match resource identifiers exactly.

Publishing prerequisites reinforce this model. An agent can only be published when it has a unique identity (`agent.identity` is not null), and that identity must hold RBAC roles on any Azure resources it accesses — otherwise the agent works in Foundry but fails after publishing ([Publish to Microsoft 365 Copilot and Teams](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)).

Foundry RBAC roles were recently renamed: the role formerly named *Azure AI User* is now *Foundry User* (role IDs and core permissions are unchanged by the rename). The *Foundry User* role on the Foundry project scope is required to publish an agent ([Publish to Microsoft 365 Copilot and Teams](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry), [Microsoft Agent 365 for Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)).

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity, https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry

## Isolation boundaries

Isolation is layered:

1. Session isolation: per-session compute and state isolation.
1. Project isolation: project-scoped data proxy and resource boundaries.
1. Identity isolation: per-agent or per-project identity depending on lifecycle state.
1. Network isolation: delegated subnet and private endpoint routing in BYO VNet mode.

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents, https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts

## Identity governance through Microsoft Agent 365

Microsoft Agent 365 governs agent identity via the Entra Agent ID and the agent blueprint, surfacing metadata such as name, description, tools, agent identity, and agent blueprint for every registered agent ([Microsoft Agent 365 for Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)).

- Risk-based Conditional Access is now generally available in Agent 365, bringing agents under Microsoft Entra-based access controls.
- Microsoft Entra network controls apply to both Foundry-hosted agents managed through Agent 365 and endpoint-hosted agents.

These controls extend the per-agent identity isolation boundary into the tenant identity and network governance plane. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry

For publishing, distribution, and Agent 365 context in depth, see [Build 2026 and publishing updates](./05-build2026-and-publishing-updates.md).

In private networking mode, subnet IP planning is a hard dependency for reliability. Under-sizing delegated subnets can cause session creation failures, data proxy 5xx errors, and project provisioning failures.

Recommended baseline:

- Use /24 delegated subnet target for production unless validated otherwise.
- Plan <80% utilization for upgrade and scaling headroom.
- Track session creation success and data proxy failure signals as capacity leading indicators.

The subnet recommendations above are source-derived operational guidance synthesized from networking deep-dive capacity guidance. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts

## Source links

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/memory-usage#create-a-memory-store
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
- https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts
