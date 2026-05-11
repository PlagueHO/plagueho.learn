---
post_title: Scalability and limits notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-scalability-notes
microsoft_alias: copilot
featured_image: none
categories:
  - Azure
  - Architecture
tags:
  - scalability
  - quotas
  - operations
ai_note: AI-assisted extraction
summary: Extracted service limits, performance constraints, and operational scaling considerations.
post_date: 2026-05-11
status: extracted
---

## Scalability facts

- Hosted agents support configurable sandbox sizes and scale-to-zero runtime behavior.
- Service-level constraints include region support, file/message/tool limits, and model-level rate limits.
- In private networking mode, subnet sizing directly constrains concurrent hosted sessions and project growth.
- Preview docs call out default hosted concurrent session constraints and adjustable quota process.

## Operational implications

- Capacity planning must include both model throughput limits and subnet/IP capacity.
- Use backoff and resilience patterns for rate-limited calls.
- Track revision growth and rollout strategies to avoid operational drift.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/limits-quotas-regions
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts
- https://learn.microsoft.com/en-us/azure/ai-foundry/openai/quotas-limits
