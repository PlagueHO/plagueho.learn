---
post_title: Microsoft Foundry Agent Service Build 2026 change log
author1: GitHub Copilot
post_slug: foundry-hosted-agents-build-2026-change-log
microsoft_alias: copilot
featured_image: none
categories:
  - AI
  - Azure
  - Governance
tags:
  - hosted agents
  - build 2026
  - foundry agent service
  - microsoft 365 copilot
  - microsoft teams
  - agent 365
ai_note: AI-assisted synthesis
summary: A precise, scannable change log of exactly what changed for Microsoft Foundry Agent Service at Microsoft Build 2026, focused on hosted agents and the related publishing and Microsoft Agent 365 capabilities.
post_date: 2026-06-04
section_status: complete
---

## Overview

This document is a change log of what changed for Microsoft Foundry Agent Service at
Microsoft Build 2026, with a focus on hosted agents and the related publishing and
Microsoft Agent 365 capabilities. The changes were announced in 2026 and this log was
captured on 2026-06-04. Every status below is time-relative — phrases such as "within
~30 days", "next month", and "later in June 2026" are reproduced from the source
material and must be re-validated against current official documentation before use, as
preview and general-availability states change over time.

## New and changed capabilities

| Capability | Prior state | Change at Build 2026 | New status | Hosted-agent impact |
| --- | --- | --- | --- | --- |
| Hosted agents in Foundry Agent Service | Preview | Reaching general availability in the next 30 days | GA within ~30 days | Managed production runtime for hosted agents; each session runs in its own sandbox with dedicated compute, memory, and filesystem ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Framework-agnostic hosting | Not framework-agnostic | Runtime hosts agents built with Microsoft Agent Framework, GitHub Copilot SDK, LangGraph, or other SDKs without rewrites | Available | Lets existing agents deploy to hosted runtime with no rewrites ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Responses API protocol | — | Supported protocol for OpenAI-compatible stateful interactions | Available | Stateful interaction option for hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Invocations protocol | — | Supported protocol for schema-free, pass-through scenarios where the developer controls request and response format | Available | Developer-controlled request/response format for hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Routines (scheduled/timer) | — | Operationalize any agent on a timer or schedule (for example, monitor a repo overnight, triage issues, post to Teams) | Public preview | Schedules hosted agents to run unattended on a timer ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Long-running autonomous agents | — | Hosted agents now support long-running autonomous agents (examples: OpenClaw, Hermes) with durable state and file system access | Available | Durable state and filesystem access for long-running hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Autopilot agent mode | Two modes existed (assistive, autonomous) in Microsoft 365 | Build introduces a third mode: autopilot agents | Public preview | Hosted agents can be pushed as autopilots into Microsoft 365 ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Incoming A2A endpoint exposure | Only outbound A2A (calling remote agents as a tool) supported | Expose any Foundry agent as an A2A endpoint, discoverable via its agent card and invokable via the open A2A protocol regardless of framework or cloud | Public preview | Hosted agents become discoverable, callable A2A endpoints ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Memory types (procedural / user / session) | — | Memory in Foundry Agent Service now includes three types: procedural (new, learns how to do work across runs; Tau-bench +7–14% absolute success-rate gains at near-baseline cost), user, and session | Public preview | Hosted agents gain procedural, user, and session memory ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Tracing and evaluation for hosted agents | — | Every model call, tool invocation, sub-agent hop, and handoff flows through one OpenTelemetry pipeline, with evaluations linked back to the trace in the Foundry Control Plane | GA later in June 2026 | End-to-end observability and evaluation for hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Agent optimizer | — | Consumes production traces and evaluations from hosted agents and generates ranked candidate improvements across prompts and skills with lineage, diffs, audit, and rollback | Public preview within ~30 days (private preview sign-up available) | Optimizes hosted-agent prompts and skills from production traces ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Voice Live | — | Unifies speech recognition, text-to-speech, turn detection, interruption handling, avatars, and other real-time features into a single API | GA for prompt agents; public preview for hosted agents | Hosted agents with Voice Live available in public preview, with full control over runtime and orchestration ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Publishing to Microsoft Teams and Microsoft 365 Copilot | — | Any Foundry agent deploys directly into employee tools with identity, permissions, and policy flowing through automatically | GA next month | Hosted agents distribute into Teams and M365 Copilot ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/); [publish-copilot](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry)) |
| Microsoft Agent 365 autopilots | — | Foundry hosted agents can be pushed as autopilots to Agent 365; once approved in the Microsoft admin center they can be hired by others in the organization | Public preview (no UI; code sample only) | Hosted agents become governed autopilots in Agent 365 ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/); [agent-365](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)) |
| Entra Agent ID and risk-based Conditional Access | — | Autopilots act independently with Entra Agent ID, an email address, Teams presence, and a place in the org chart; Microsoft Entra network controls and Conditional Access are GA in Agent 365 and apply to both Foundry-hosted and endpoint-hosted agents | GA (Entra network controls and Conditional Access in Agent 365) | Governs hosted-agent identity and access via Entra and Conditional Access ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/); [agent-365](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)) |
| Foundry IQ | — | Now the unified knowledge layer behind one SLA-backed retrieval endpoint, unifying Work IQ, Fabric IQ, Azure SQL, File Search, and MCP sources (Serverless tier in public preview; Web IQ for sub-200ms live web grounding) | GA now | Single retrieval endpoint for hosted-agent grounding ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |
| Foundry Toolkit for VS Code | — | Create, test/debug locally with trace visualization, connect to Toolboxes, and deploy to Foundry Agent Service from VS Code | GA | Local-to-hosted developer loop for hosted agents ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)) |

## RBAC role renames

Foundry RBAC roles were recently renamed. Role IDs and core permissions are unchanged by
the rename; previous names may still appear during rollout
([publish-copilot](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry);
[agent-365](https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry)).

| Old role name | New role name | Role IDs and permissions |
| --- | --- | --- |
| Azure AI User | Foundry User | Unchanged |
| Azure AI Owner | Foundry Owner | Unchanged |
| Azure AI Account Owner | Foundry Account Owner | Unchanged |
| Azure AI Project Manager | Foundry Project Manager | Unchanged |

## Not specified in Build 2026 sources

The following details are NOT given in the Build 2026 blog and must be sourced elsewhere:

- Concrete regional availability for hosted agents at GA is not stated
  ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Quota and limit numbers for hosted agents, routines, and memory are not stated
  ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).
- Itemized hosted-agent pricing is not provided; the blog gives only qualitative claims
  such as "zero idle cost" and "near-baseline cost"
  ([Build 2026 blog](https://devblogs.microsoft.com/foundry/agent-service-build2026/)).

For concrete regional availability, quota and limit numbers, refer to the
limits-quotas-regions section of this research project rather than the Build 2026 blog.

## Sources

- https://devblogs.microsoft.com/foundry/agent-service-build2026/
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/publish-copilot?view=foundry
- https://learn.microsoft.com/en-us/azure/foundry/agents/how-to/agent-365?view=foundry
