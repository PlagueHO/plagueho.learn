---
post_title: Foundry Hosted Agents overview and deployment architecture
author1: GitHub Copilot
post_slug: foundry-hosted-agents-overview-deployment
microsoft_alias: copilot
featured_image: none
categories:
  - AI
  - Azure
  - Architecture
tags:
  - hosted agents
  - deployment
  - architecture
ai_note: AI-assisted synthesis
summary: Core architecture and deployment model for Microsoft Foundry Hosted Agents.
post_date: 2026-05-11
section_status: complete
---

## Executive summary

Microsoft Foundry Hosted Agents provide managed hosting for containerized agent code while preserving framework choice. You deploy your own container image, and Foundry manages identity provisioning, endpoint exposure, lifecycle operations, scale behavior, and observability. This model is well suited for teams that need custom agent runtime behavior but do not want to operate their own control plane.

GA status: At Build 2026, Microsoft announced that hosted agents in Foundry Agent Service are reaching general availability within ~30 days of the announcement, graduating from preview as the managed runtime for production agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)). Treat hosted-agent hosting itself as GA-bound; genuinely preview capabilities (see *Build 2026 updates* below) retain preview caveats.

Preview caveat: For features still in preview, runtime limits, region availability, and some behaviors can change. Reconfirm current constraints before production freeze. Source: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents

> Cross-reference: For publishing channels (Teams and Microsoft 365 Copilot), autopilot AI teammates, and Agent 365 governance, see [output/05-build2026-and-publishing-updates.md](05-build2026-and-publishing-updates.md).

## Build 2026 updates

Build 2026 confirmed several capabilities relevant to the hosting and deployment model ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)):

- Framework-agnostic hosting: agents built with Microsoft Agent Framework, the GitHub Copilot SDK, LangGraph, or other SDKs deploy without rewrites ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Two supported protocols are reaffirmed — the Responses API for OpenAI-compatible, stateful interactions, and the Invocations protocol for schema-free, pass-through scenarios where the developer controls request and response format ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- A new autopilot agent mode (public preview) joins hosted agents and prompt agents as a third agent mode ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Routines (public preview) operationalize any agent on a timer or schedule and support long-running autonomous agents with durable state and filesystem access ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Incoming A2A (public preview) lets you expose a Foundry agent as an A2A endpoint discoverable by other agents via its agent card; outbound A2A (calling remote agents as a tool) was already supported ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).

## Hosting model in practice

Hosted agents combine customer-owned code with Microsoft-managed runtime operations:

| Responsibility area | Customer responsibility | Foundry responsibility |
|---|---|---|
| Agent logic | Build and package agent code in container image | N/A |
| Runtime platform | Choose protocol(s), CPU/memory sizing, env configuration | Provision and run agent runtime |
| Identity | Assign downstream RBAC to agent identity | Create dedicated Entra agent identity per deployed agent |
| Endpoint and routing | Call endpoint from client apps | Expose dedicated protocol endpoints |
| Lifecycle | Trigger version creation and rollout intent | Handle provisioning, scaling, health, and runtime lifecycle |
| Observability | Instrument app-level semantics if needed | Inject Application Insights connection and protocol-level telemetry |

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents, https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent

## Protocol strategy

Start with Responses for most conversational and assistant-style workloads, then add Invocations when you need custom payload contracts or non-OpenAI interaction models.

| Protocol | Best fit | Key tradeoff |
|---|---|---|
| Responses | Conversational, threaded, OpenAI-compatible clients | Less control over low-level payload semantics |
| Invocations | Custom payloads, webhook processing, custom streaming | You own more lifecycle and contract logic |
| A2A | Agent-to-agent delegation paths | Additional authentication and orchestration design required |
| Activity | Teams and M365 channel integration | Channel semantics and policy integration complexity |

Source: https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents

## Deployment lifecycle

The deployment path is stable and production-friendly when treated like standard CI/CD:

1. Build amd64 image and push to ACR.
1. Create agent version with image, protocol declaration, CPU/memory, and env vars.
1. Wait for active status.
1. Route traffic to the version and monitor telemetry.
1. Roll forward through immutable versions and weighted traffic shifts.

Sources: https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent, https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents

## Production design guidance

The following recommendations are synthesized architecture guidance derived from the source set:

- Use immutable image tags and immutable agent versions for reproducibility.
- Keep configuration in version env vars, not baked into image.
- Use canary/weighted rollout, then promote after SLO verification.
- Prefer managed identity and secret stores over static credentials.
- Treat third-party tool integrations as explicit data-boundary crossings.

## Source links

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent
- https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent
- https://learn.microsoft.com/en-us/agent-framework/hosting/foundry-hosted-agent?pivots=programming-language-csharp
