---
post_title: Multi-agent and multitenant notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-multiagent-multitenant-notes
microsoft_alias: copilot
featured_image: none
categories:
  - Architecture
  - SaaS
tags:
  - multi-agent
  - multitenancy
  - isolation
ai_note: AI-assisted extraction
summary: Extracted patterns and tradeoffs for multi-agent and multitenant design decisions.
post_date: 2026-05-11
status: extracted
---

## Multi-agent pattern facts

- Recommended orchestration patterns include sequential, concurrent, group chat, handoff, and magentic.
- Guidance emphasizes starting with least complexity and escalating to multi-agent only when required by boundaries, specialization, or scale.
- Cloud Adoption Framework guidance defines explicit criteria for single-agent versus multi-agent adoption.

## Multitenant pattern facts

- AI multitenancy typically uses tenant-specific models, shared models, or tuned shared models.
- For model serving resources, options include dedicated instance per tenant, shared instance with dedicated deployment per tenant, and shared deployment.
- Shared resources require strict tenant-aware routing, usage metering, and authorization checks in the application layer.

## Source URLs

- https://learn.microsoft.com/en-us/azure/architecture/ai-ml/guide/ai-agent-design-patterns#overview
- https://learn.microsoft.com/en-us/azure/cloud-adoption-framework/ai-agents/single-agent-multiple-agents#when-to-start-with-a-multi-agent-system
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/approaches/ai-machine-learning#key-considerations-and-requirements
- https://learn.microsoft.com/en-us/azure/architecture/guide/multitenant/service/openai#isolation-models
