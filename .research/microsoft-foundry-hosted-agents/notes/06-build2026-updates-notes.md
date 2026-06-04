---
post_title: Microsoft Foundry Agent Service — Build 2026 updates
author1: GitHub Copilot
post_slug: build2026-updates-notes
microsoft_alias: copilot
featured_image: none
categories:
  - microsoft-foundry
  - foundry-agent-service
tags:
  - hosted-agents
  - build-2026
  - foundry-agent-service
  - agent-365
  - multi-agent
ai_note: AI-assisted extraction
summary: >-
  Build 2026 announcements for Microsoft Foundry Agent Service, focused on
  hosted agents — runtime/isolation model, long-running agents and routines,
  memory types, publishing to Teams and Microsoft 365 Copilot, autopilot AI
  teammates with Agent 365, A2A interoperability, tracing/evaluation, and GA
  versus preview status changes.
post_date: 2026-06-04
status: extracted
---

## Platform framing facts

- Microsoft announced the **Microsoft Agent Platform** positioned as "build in GitHub,
  run in Foundry, and reach users where they already are."
- At Build 2026 Foundry ships across three layers: **Build** (framework, tools, memory),
  **Deploy** (runtime, distribution, interoperability), and **Operate** (observability,
  optimization).
- The post is authored by Tina Schuchman, Corporate Vice President on Microsoft Foundry
  in CoreAI; published June 2, 2026.

## Hosted agents runtime and deployment facts

- **Hosted agents in Foundry Agent Service** is the managed runtime for production agents
  and is **reaching general availability in the next 30 days** (was preview prior).
- Every session runs in **its own sandbox**, isolating every agent execution with
  **dedicated compute, memory, and filesystem**.
- The runtime is **framework-agnostic**: agents built with Microsoft Agent Framework,
  GitHub Copilot SDK, LangGraph, or other SDKs can be deployed **without rewrites**.
- Two protocols are supported:
  - **Responses API** for OpenAI-compatible stateful interactions.
  - **Invocations protocol** for schema-free, pass-through scenarios where the developer
    controls request and response format.
- Hosted agents now support **long-running autonomous agents** (examples cited: OpenClaw
  and Hermes) with **durable state and file system access**.
- **Routines (public preview)** operationalize any agent on a **timer or a schedule**
  (example: monitor a GitHub repo overnight, triage issues, post a summary to Teams).
- Partner testimonials note **fast startup** for latency-sensitive real-time voice and
  **zero idle cost** for messaging conversations (Twilio Agent Connect deployed inside the
  serverless runtime).
- A **Quickstart** walks through setting up, testing, and deploying a production-ready
  hosted agent end to end (azd pivot).

## Distribution and publishing channel facts

- **Publishing to Microsoft Teams and Microsoft 365 Copilot** is **generally available
  next month** — any Foundry agent deploys directly into employee tools with identity,
  permissions, and policy flowing through automatically.
- Foundry already supported two agent modes in Microsoft 365:
  - **Assistive agents** — act on the user's behalf inside Copilot or chat.
  - **Autonomous agents** — act on their own behalf in the background, triggered by events
    or schedules, with no collaborative surface.
- Build introduces a **third mode: autopilot agents (public preview)**.

## Autopilot agents, AI teammates, and Agent 365 facts

- **Autopilot agents (public preview)** act independently with **Entra Agent ID**, an
  **email address**, **Microsoft Teams presence**, and a **place in the org chart**.
- They can initiate conversations, work on shared files, follow up on action items, and
  collaborate with humans over time.
- Every action is **attributable, auditable, and governed via Agent 365 in Microsoft
  Admin Center**.
- Getting started uses sample code plus the **Azure Developer CLI**, which handles
  **provisioning, identity, and admin approval in a single workflow**.
- These are referred to as **AI teammates** (per the agent-365 docs anchor `create-ai-teammates`).

## Interoperability and multi-agent facts

- **Outbound A2A (Agent2Agent)** — calling remote agents as a tool — has been supported
  since the A2A tool launched.
- Build adds **incoming A2A (public preview)**: developers can expose any Foundry agent as
  an **A2A endpoint**, discoverable by other agents via its **agent card** and invokable via
  the open **A2A protocol**, regardless of framework or cloud.
- **Multi-agent orchestration patterns including Magentic-One** reach **stable release** in
  Microsoft Agent Framework.

## Memory and persistence facts

- **Memory in Foundry Agent Service (public preview)** now includes **three types**:
  - **Procedural memory (new at Build, public preview)** — agents learn how to do the work
    across runs. Early **Tau-bench results show +7–14% absolute success-rate gains** at
    near-baseline cost.
  - **User memory** — remembers preferences and facts across sessions.
  - **Session memory** — maintains context within a conversation thread.

## Framework, tools, and knowledge facts

- **Microsoft Agent Framework** updates at Build:
  - Agent harness with skills, memory, and middleware — **stable release**.
  - Integrations with **GitHub Copilot SDK and Claude Agent SDK** — **stable release**.
  - Multi-agent orchestration patterns including Magentic-One — **stable release**.
  - File system tools, memory tools, and the **deep research agent** — **public preview**.
- **Foundry Toolkit for VS Code** is **GA** (create, test/debug locally with trace
  visualization, connect to Toolboxes, deploy to Foundry Agent Service from VS Code).
- **Toolboxes in Foundry (public preview)** — single managed endpoint for every tool type;
  point any MCP client at one URL; Foundry handles auth, lifecycle, governance.
- **Skills (preview)** are first-class — versioned in a project-scoped catalog and
  discoverable as **MCP resources** by any agent in the project.
- **Tool search (preview)** in Toolboxes intelligently selects the right tools per task.
- Toolbox connects to **Microsoft IQ** — **Web IQ**, **Work IQ (preview)**,
  **Fabric IQ (preview)** with Fabric data agent, Ontology, semantic models — and **Foundry IQ**.
- **Foundry IQ** is now **generally available** as the knowledge layer, unifying Work IQ,
  Fabric IQ, Azure SQL, File Search, and MCP sources behind one **SLA-backed retrieval
  endpoint**, with a **Serverless tier in public preview** and **Web IQ for sub-200ms live
  web grounding**.

## Multimodal and voice facts

- **Voice Live** unifies speech recognition, text-to-speech, turn detection, interruption
  handling, avatars, and other real-time features into a single API.
  - For prompt agents, **Voice Live is now generally available**.
  - **Hosted agents with Voice Live is available in public preview** (full control over agent
    runtime and orchestration framework).
- **Azure Content Understanding (ACU)** adds prebuilt analyzers in Microsoft Foundry;
  **agentic mode in preview** coming next month, plus synchronous read and layout APIs and
  expanded prebuilt analyzers designed to **reduce token costs by over 80 percent**.

## Observability and optimization facts

- **Tracing and evaluation for hosted agents** will be **generally available later in June
  2026**. Every model call, tool invocation, sub-agent hop, and handoff flows through one
  **OpenTelemetry pipeline**, with evaluations linked back to the trace in the **Foundry
  Control Plane**.
- **Agent optimizer in Foundry Agent Service** is **coming to public preview in the next 30
  days** (private preview sign-up available). It consumes production traces and evaluations
  from hosted agents and generates ranked candidate improvements across prompts and skills
  with lineage, diffs, audit, and rollback.
- Connected evaluation pipeline components:
  - **ASSERT** — generates adversarial tests from policies.
  - **Agent Control Specification** — turns risks into enforceable runtime guardrails across
    input, model, state, tool execution, and output.
  - **Rubric (public preview)** — defines weighted evaluation criteria (task success, tone,
    safety, cost, latency) and scores every run.
- Agent optimizer runs a reflective **observe → evaluate → optimize → deploy** cycle.

## Status summary facts (GA vs preview)

- **GA / reaching GA:** Hosted agents in Foundry Agent Service (GA within 30 days);
  publishing to Teams and Microsoft 365 Copilot (GA next month); Foundry IQ (GA now);
  Foundry Toolkit for VS Code (GA); Voice Live for prompt agents (GA now); Microsoft Agent
  Framework agent harness, Copilot/Claude SDK integrations, and Magentic-One orchestration
  (stable release); tracing and evaluation for hosted agents (GA later June 2026).
- **Public preview / new:** Routines; autopilot agents (AI teammates); incoming A2A;
  procedural / user / session memory in Foundry Agent Service; Toolboxes in Foundry; Skills;
  Tool search; Work IQ; Fabric IQ; Foundry IQ Serverless tier; hosted agents with Voice
  Live; ACU agentic mode; Rubric; Agent optimizer (public preview within 30 days).

## Questions raised

- Exact regional availability and quota/limit numbers for hosted agents at GA are not
  stated in this post (refer to Foundry agents docs/limits pages).
- Pricing/billing details for hosted agents, routines, and memory are not enumerated here
  beyond "zero idle cost" and "near-baseline cost" qualitative claims.

## Source URLs

- https://devblogs.microsoft.com/foundry/agent-service-build2026/
