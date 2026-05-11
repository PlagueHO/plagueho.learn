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
