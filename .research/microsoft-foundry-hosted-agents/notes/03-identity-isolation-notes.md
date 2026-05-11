---
post_title: Identity and isolation notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-identity-isolation-notes
microsoft_alias: copilot
featured_image: none
categories:
  - Security
  - Azure
tags:
  - agent identity
  - rbac
  - network isolation
ai_note: AI-assisted extraction
summary: Extracted identity, RBAC, and isolation mechanisms relevant to hosted agent deployments.
post_date: 2026-05-11
status: extracted
---

## Identity facts

- Foundry uses dedicated agent identity constructs in Entra for runtime tool and downstream service access.
- Shared project identity is used for unpublished/in-development flows; published agents receive distinct identities and need reassigned roles.
- Least-privilege RBAC assignment to the actual `agentIdentityId` is critical.
- Incorrect downstream audience values break authentication even if RBAC is correct.

## Isolation facts

- Bring-your-own VNet architecture uses delegated subnet and project-scoped single-tenant data proxy.
- Tool traffic routes through the data proxy; hosted agents also have direct outbound through dedicated Micro VM NIC.
- Subnet IP exhaustion is a primary scaling risk in private networking configurations.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agent-identity
- https://learn.microsoft.com/en-us/azure/foundry/concepts/rbac-foundry
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/agents-networking-deep-dive#key-concepts
