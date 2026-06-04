---
post_title: Foundry Hosted Agents multi-agent and multitenant patterns
author1: GitHub Copilot
post_slug: foundry-hosted-agents-multiagent-multitenant-patterns
microsoft_alias: copilot
featured_image: none
categories:
  - Architecture
  - SaaS
tags:
  - multi-agent
  - multitenancy
  - tenancy model
  - isolation
ai_note: AI-assisted synthesis
summary: Implementation patterns for combining Hosted Agents with multi-agent and multitenant SaaS architectures.
post_date: 2026-05-11
section_status: complete
---

## Decision baseline: single agent first, then specialize

Adopt single-agent design by default and move to multi-agent architecture only when one or more of these become non-negotiable:

- Security/compliance boundary separation
- Distinct team/domain ownership boundaries
- Clear throughput or specialization limits in validated testing

Sources: https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents#when-to-start-with-a-multi-agent-system, https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview

## Multi-agent orchestration fit for hosted agents

| Pattern | Where it fits with hosted agents | Risks to mitigate |
|---|---|---|
| Sequential | Deterministic multi-step business workflows | Latency accumulation and upstream error propagation |
| Concurrent | Independent analyses for scoring, voting, or synthesis | Cost explosion and conflict-resolution complexity |
| Handoff | Dynamic specialist routing | Handoff loops and inconsistent context transfer |
| Group chat | Human-in-loop collaborative review and maker-checker | Control complexity and long-thread drift |
| Magentic | Open-ended planning and execution workflows | Stall risk and unpredictable token/runtime cost |

Source: https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview

### Cross-agent interoperability with incoming A2A

Beyond in-process orchestration, incoming A2A (public preview) lets any Foundry agent be exposed as an A2A endpoint, discoverable by other agents via its agent card and invokable through the open A2A protocol regardless of framework or cloud ([Build 2026 announcement](https://devblogs.microsoft.com/foundry/agent-service-build2026/)). This extends the orchestration patterns above across agent, framework, and cloud boundaries rather than confining them to a single deployment.

## Tenant isolation implementation patterns

Patterns A/B/C are synthesized implementation patterns derived from Microsoft multitenant guidance and should be adapted to workload, compliance, and tenant mix.

### Pattern A: single-tenant hosted agent stack per tenant

Use when tenants require strongest isolation or dedicated compliance controls.

- Dedicated Foundry project and hosted agent deployment per tenant.
- Dedicated memory scopes and dedicated retrieval stores.
- Dedicated model deployment or dedicated Azure OpenAI instance when required.

Pros:

- Strong isolation and clear blast-radius boundaries.
- Easier tenant-specific policy and audit control.

Cons:

- Higher operational overhead.
- More deployment objects and lifecycle complexity.

### Pattern B: shared hosted agent runtime, tenant-aware routing and storage

Use when tenant count is high and workloads are similar.

- Shared hosted agent deployment across tenants.
- Strict tenant ID propagation in all downstream calls.
- Per-tenant data partitioning in memory stores, search indexes, and task stores.

Pros:

- Better operational efficiency and resource pooling.
- Faster rollout across tenant population.

Cons:

- Requires robust app-layer authorization and tenancy controls.
- Higher noisy-neighbor sensitivity.

Shared-deployment caveat: app-layer tenant authorization and tenant-to-deployment mapping are mandatory in shared model/resource scenarios. Source: https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/service/openai#isolation-models

### Pattern C: hybrid tiered tenancy

Use when enterprise and SMB tenants have different expectations.

- Premium tenants on dedicated stamp (Pattern A).
- Standard tenants on shared stamp (Pattern B).
- Common codebase with policy-driven deployment mode.

Pros:

- Business-aligned cost and isolation tiers.
- Better enterprise sales fit while keeping shared efficiency.

Cons:

- Increased platform governance and routing complexity.

## Identity model in multitenant hosted-agent designs

- Assign RBAC to actual runtime identity used by each lifecycle stage.
- Re-evaluate permissions at publish boundaries.
- Use tenant-scoped authorization checks in app layer even when platform identity is valid.
- Keep separation between provider operational identity and tenant data-access permissions.

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity, https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry

## Governance with Microsoft Agent 365

Microsoft Agent 365 acts as the IT admin control plane for AI agents, with five core capabilities relevant to multi-agent governance and multitenant operating models: Registry, Access control, Visualization, Interoperability, and Security ([Microsoft Agent 365 for Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)).

- All Foundry agents automatically register in the Agent 365 registry on creation, giving a unified inventory across the agent population with no extra configuration.
- Access control brings agents under Microsoft Entra-based controls and risk-based Conditional Access, limiting each agent to only the resources it needs.
- Visualization, Interoperability, and Security extend monitoring, organizational-data access, and threat protection across the fleet.

For multitenant providers, this registry-and-control-plane model complements the tenant isolation patterns above: it governs *which* agents exist and *what* they can reach, while the isolation patterns govern *how* tenant data is partitioned. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry

## Autopilots as AI teammates

Foundry Hosted agents can be pushed as autopilots (AI teammates) into Microsoft Agent 365. Once admin-approved in the Microsoft admin center, an autopilot can be "hired" by others in the organization ([Build 2026 announcement](https://devblogs.microsoft.com/foundry/agent-service-build2026/), [Microsoft Agent 365 for Foundry agents](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)).

Each autopilot receives:

- An Entra Agent ID for governed, attributable identity.
- An email address and Microsoft Teams presence.
- A place in the org chart, so it collaborates with humans over time.

Every autopilot action is attributable, auditable, and governed via Agent 365 in the Microsoft Admin Center, making this a first-class distribution model for agents that operate as persistent organizational participants rather than per-request tools ([Build 2026 announcement](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).

## Distribution across organizations

Publishing a Foundry agent to Microsoft Teams and Microsoft 365 Copilot is the primary surface for distributing an agent to end users, and its scope options map directly onto multitenant and organization-distribution decisions ([Publish to Microsoft 365 Copilot and Teams](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)):

- "Just you" — available immediately with no admin approval; appears under *Your agents* and is shareable by link. Suited to personal testing, small teams, and pilots.
- "People in your organization" — requires Microsoft 365 admin approval; once approved it appears under *Built by your org* for all tenant users, governed by the tenant's app policies. Suited to organization-wide and production distribution.

Org-scoped distribution is therefore gated by tenant admin approval and app policy, which is the control point a multitenant provider relies on when rolling an agent out to a customer organization. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry

For the full Build 2026, publishing, and Agent 365 detail, see [Build 2026 and publishing updates](./05-build2026-and-publishing-updates.md).

## Recommended reference architecture (SaaS)
This reference architecture is synthesized from the cited Microsoft patterns and service guidance:

1. API gateway with tenant resolution and policy enforcement.
1. Hosted agent orchestrator (shared or dedicated per tier).
1. Tenant-aware memory store and retrieval layer.
1. Tenant-aware tool adapter layer with strict audience and RBAC enforcement.
1. Model routing layer with quota shaping and fallback policy.
1. Observability pipeline with tenant-safe telemetry dimensions.

## Build checklist

Checklist items are synthesized controls aligned to Microsoft guidance for multitenancy, isolation, and orchestration.

- Tenant context propagation is explicit and validated end-to-end.
- No shared storage path without tenant partition key.
- No downstream call without tenant authorization check.
- Model quota plan exists per tier and per region.
- Publish pipeline includes identity RBAC reassignment checks.
- Private networking deployments have subnet headroom planning.

## Source links

- https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview
- https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents#when-to-start-with-a-multi-agent-system
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/ai-machine-learning#key-considerations-and-requirements
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/service/openai#isolation-models
