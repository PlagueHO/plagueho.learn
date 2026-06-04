---
post_title: Foundry Hosted Agents scalability and operations
author1: GitHub Copilot
post_slug: foundry-hosted-agents-scalability-operations
microsoft_alias: copilot
featured_image: none
categories:
  - Operations
  - Azure
tags:
  - scalability
  - quotas
  - reliability
ai_note: AI-assisted synthesis
summary: Scalability constraints, reliability controls, and operational guardrails for Hosted Agents.
post_date: 2026-05-11
section_status: complete
---

## Build 2026 operations updates

Build 2026 reaffirmed and extended several operational characteristics for hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)):

- Tracing and evaluation for hosted agents is reaching general availability later in June 2026, routing every model call, tool invocation, sub-agent hop, and handoff through one OpenTelemetry pipeline, with evaluations linked back to the trace in the Foundry Control Plane ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- An agent optimizer (public preview) arrives within ~30 days of Build 2026; it consumes production traces and evaluations and generates ranked candidate improvements with lineage, diffs, audit, and rollback ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Voice Live is generally available for prompt agents; hosted agents with Voice Live are in public preview ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Scale-to-zero ("zero idle cost") was reaffirmed as an operational characteristic of the serverless runtime — partner workloads incur no idle cost between conversations ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).

> Note: The Build 2026 blog gives only qualitative cost and availability guidance. Concrete regional availability, quota, and limit numbers are not in the Build 2026 post and must be validated against the [limits, quotas, and regions doc](https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions).

## Scalability dimensions

Capacity planning for hosted agents should account for four independent constraints:

| Dimension | Constraint | Failure signal |
|---|---|---|
| Agent runtime | Session concurrency and sandbox resources | New sessions fail or long cold starts under pressure |
| Network substrate | Delegated subnet/IP availability in private mode | Data proxy 5xx and session allocation failures |
| Model serving | Token and request throughput limits | 429 rate limit bursts and degraded latency |
| Agent service artifacts | File/message/tool count limits | Artifact-specific 400 errors (for example, file_size_exceeded, message_limit_exceeded, tool_limit_exceeded) |

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions, https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts, https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits

## Limits-aware architecture practices

The following are synthesized best practices that operationalize documented constraints:

- Keep tool inventory minimal and reusable.
- Treat long conversations as rotating sessions/threads with compaction strategies.
- Move large context into external retrieval stores rather than oversized messages.
- Implement adaptive retry with jitter for model-side 429 patterns.
- Use quota-aware traffic management between premium and standard tenant plans.

Source basis: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions

## Reliability and rollback

Hosted versions are immutable, which enables safe progressive delivery:

- Canary with weighted traffic.
- Observe error, latency, and token-cost guardrails.
- Promote or rollback by traffic shift instead of in-place mutation.

Source: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents

In reliability design, separate concerns:

- Runtime availability and health.
- Model endpoint availability and quota headroom.
- External tool dependency availability.
- Tenant-level SLO management and graceful degradation plans.

## Telemetry model

The telemetry dimensions below are synthesized operational guidance for multitenant hosted-agent estates:

Minimum recommended telemetry dimensions:

- Tenant identifier (non-PII key)
- Agent name and version
- Protocol type
- Session/conversation IDs
- Model deployment and region
- Tool invocation success/failure counters
- Rate-limit and retry metrics

## Practical runbook priorities

The runbook priorities below are synthesized and should be adapted to service-level objectives and tenant tiers:

1. Detect and triage 429s by model deployment and tenant class.
1. Detect subnet/IP pressure in private networking deployments.
1. Detect identity/RBAC drift after publish/version transitions.
1. Monitor tool dependency error rates and apply circuit breaking.
1. Enforce cost envelopes per tenant and auto-throttle non-critical workloads.

## Source links

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts
- https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits
