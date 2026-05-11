---
post_title: Persistence and memory notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-persistence-notes
microsoft_alias: copilot
featured_image: none
categories:
  - AI
  - Azure
tags:
  - memory
  - persistence
  - session state
ai_note: AI-assisted extraction
summary: Extracted persistence behavior across sessions, conversations, and memory stores.
post_date: 2026-05-11
status: extracted
---

## Core facts

- Session state persists for hosted agents with up to 30-day session retention and ~15-minute idle compute deprovisioning.
- Conversation history persists separately in Foundry for Responses protocol.
- Memory (preview) adds long-term managed memory through memory stores and scope-based isolation.
- Memory supports user-profile and chat-summary types with extraction, consolidation, and retrieval lifecycle.
- Scope is required for low-level memory APIs and should be explicitly tenant/user mapped for isolation.

## Design implications

- Treat session filesystem persistence and long-term memory as separate concerns.
- Use memory scope keys to enforce strict tenant-user partitioning.
- Avoid identity-derived implicit assumptions for low-level API calls; set explicit scopes.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/what-is-memory
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/memory-usage#create-a-memory-store
