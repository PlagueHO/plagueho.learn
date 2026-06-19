---
title: Introduction to Microsoft Agent Framework Build 2026 Updates
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers, code-first practitioners"
---

## Build 2026 introduction: what changed and why it matters

Build 2026 positions Microsoft Agent Framework as a single framework for both agent execution and workflow orchestration, with first-party provider integrations for GitHub Copilot and Microsoft Foundry, and runtime integration for durable execution patterns. This combines the core agent pipeline with explicit multi-agent orchestration choices in one programming model. [Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline) [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [GitHub Copilot Agents](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [Microsoft Foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [Durable Task extension for Microsoft Agent Framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

For this presentation, we use a teaching taxonomy (presentation framing, not official product taxonomy): **runtime loop**, **capabilities**, **orchestration**, and **integrations**.

## What it is, how it works, what it is used for

### 1) Runtime loop

What it is: The runtime loop is a layered pipeline where requests flow through middleware, history/context providers, chat client processing, and the function invocation loop before responses propagate back through post-processing stages. [Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)

How it works: The framework composes middleware and providers around a chat client, then iterates tool calls until the model returns a final response. Session state is carried through `AgentSession` and can be rehydrated for multi-turn continuity. [Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline) [Conversations](https://learn.microsoft.com/agent-framework/agents/conversations/)

What it is used for: Building agents that need controlled extension points (logging, policy checks, context injection, and memory) without rewriting core loop mechanics. [Runtime context](https://learn.microsoft.com/agent-framework/agents/middleware/runtime-context) [Adding context providers](https://learn.microsoft.com/agent-framework/journey/adding-context-providers)

### 2) Capabilities

What it is: Capabilities are the mechanisms that let agents act safely and stay domain-relevant, including tools, tool approval workflows, and skills. [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools) [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) [Skills](https://learn.microsoft.com/agent-framework/agents/skills)

How it works: Tools are registered as callable actions (function tools, MCP tools, or provider-hosted tools), and approval can pause execution for user confirmation on sensitive operations. Skills package reusable domain instructions and references with progressive disclosure patterns. [Adding tools](https://learn.microsoft.com/agent-framework/journey/adding-tools) [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) [Adding skills](https://learn.microsoft.com/agent-framework/journey/adding-skills)

What it is used for: Enterprise-safe automation where agents can execute actions, but only within explicit permission and review boundaries. [Agent safety](https://learn.microsoft.com/agent-framework/agents/safety) [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)

### 3) Orchestration

What it is: Workflow orchestrations are first-class patterns for coordinating multiple agents or executors: sequential, concurrent, handoff, group chat, and magentic. [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/)

How it works: You define routing and execution topology explicitly, and the runtime coordinates message passing and progression between workflow nodes; checkpointing and human-in-the-loop can be layered in for long-running or high-governance flows. [Sequential orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential) [Concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent) [Human-in-the-loop](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop) [Checkpoints](https://learn.microsoft.com/agent-framework/workflows/checkpoints)

What it is used for: Multi-step business workflows that need determinism, delegation across specialists, or parallel decomposition. [Multiple-agent workflow automation](https://learn.microsoft.com/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation)

### 4) Integrations

What it is: Build 2026-era integrations connect the same framework abstractions to ecosystem runtimes: GitHub Copilot agents, Microsoft Foundry agents, Durable Task workflows, and Microsoft 365 Copilot channels. [GitHub Copilot Agents](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [Microsoft Foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [Durable Task extension for Microsoft Agent Framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [Bring your agents into Microsoft 365 Copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

How it works: Provider adapters and integration packages map Agent Framework concepts (agent, session, tools, workflow) onto each target runtime's execution model and deployment surface. [GitHub Copilot Agents](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [Microsoft Foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)

What it is used for: Reusing a consistent agent architecture across local dev, managed AI services, durable workflow hosting, and Microsoft 365 surfaces. [Microsoft Agent Framework repository](https://github.com/microsoft/agent-framework) [Durable Task extension for Microsoft Agent Framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

## Bridge to code sections

This introduction is conceptual by design. The concrete implementation appears in the code-focused sections:

- [Sample code patterns](../sample-code-patterns/section.md): end-to-end snippets for runtime loop, tools, approvals, sessions, and integration setup.
- [Agent harness architecture](../agent-harness-architecture/section.md): pipeline-level view with extension points and execution flow details.
- [Orchestration patterns](../orchestration-patterns/section.md): side-by-side implementation choices for sequential, concurrent, handoff, group chat, and magentic.

## Scope for this 12-minute talk

Focus on the architectural delta: a unified framework that combines the agent pipeline, safety controls, workflow orchestration patterns, and provider/runtime integrations needed for production agent systems. The next sections move from this model to concrete code and selection guidance.
