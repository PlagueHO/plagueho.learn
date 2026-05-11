---
post_title: Core deployment notes for Foundry Hosted Agents
author1: GitHub Copilot
post_slug: foundry-hosted-agents-core-deployment-notes
microsoft_alias: copilot
featured_image: none
categories:
  - AI
  - Azure
  - Architecture
tags:
  - hosted agents
  - deployment
  - protocols
ai_note: AI-assisted extraction
summary: Extracted facts about architecture, lifecycle, and deployment for Foundry Hosted Agents.
post_date: 2026-05-11
status: extracted
---

## Core facts

- Hosted agents are containerized applications deployed to Foundry Agent Service and run with platform-managed lifecycle, scaling, observability, and versioning.
- Each deployed hosted agent gets a dedicated endpoint and dedicated Microsoft Entra agent identity at deployment time.
- Session model includes stateful `$HOME` and `/files` persistence with scale-to-zero behavior; compute idles out and resumes with restored state.
- Protocol choices:
  - Responses: OpenAI-compatible and platform-managed conversation lifecycle.
  - Invocations: arbitrary JSON and custom flow control.
  - Activity and A2A can be combined when needed.
- Versioning is immutable per created agent version and supports weighted rollout patterns.

## Deployment highlights

- Build and push linux/amd64 image to ACR.
- Create hosted agent version referencing image, protocols, CPU, memory, and env vars.
- Poll status until active, then invoke dedicated endpoint.
- Agent Service currently requires ACR to remain reachable on public endpoint.

## Source URLs

- https://learn.microsoft.com/en-us/azure/foundry/agents/concepts/hosted-agents
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/deploy-hosted-agent
- https://learn.microsoft.com/en-us/agent-framework/hosting/foundry-hosted-agent?pivots=programming-language-csharp
- https://learn.microsoft.com/en-us/azure/foundry/agents/quickstarts/quickstart-hosted-agent
