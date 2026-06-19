---
title: Agent Harness Architecture Overview
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers"
---

## Agent harness architecture

The agent harness is a layered request/response pipeline that separates cross-cutting behavior from model calls and tool execution, instead of using a single imperative loop ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

For this presentation, we use a simplified taxonomy of three layers: the **agent middleware layer**, the **context layer/providers**, and the **chat client layer**. This is a presentation taxonomy for explanation, not a canonical component count ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

## What it is

The architecture provides composable extension points where middleware wraps execution, context providers add and store context around each run, and the chat client layer handles model interaction and function-calling turns ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

This design is used to add policy, observability, personalization, and memory without subclassing the agent runtime, by registering middleware and providers instead of rewriting the agent loop ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

## How it works in request/response flow

### Core architecture diagram (conceptual)

```text
CONCEPTUAL FLOW (presentation diagram)

Request -> Agent middleware layer (pre)
        -> Context layer/providers (before hook: load history, inject instructions/messages/tools)
        -> Chat client layer (middleware + model call)
        -> Function-calling turn(s) if tool calls are returned
        -> Context layer/providers (after hook: store new state)
        -> Agent middleware layer (post)
        -> Response
```

This flow matches the documented lifecycle: context providers run before and after invocation, middleware composes around execution, and function calling can iterate until the model returns a final response ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

### Layer responsibilities

1. Agent middleware layer:
   Validates inputs, enforces policy, and records telemetry before and after a run ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).
1. Context layer/providers:
   Adds context in before hooks (chat history, dynamic instructions, tools) and persists updates in after hooks ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).
1. Chat client layer:
   Sends assembled messages to the model provider and processes tool call directives in the function-calling loop ([microsoft/agent-framework GitHub Repository](https://github.com/microsoft/agent-framework), [Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

## What it is used for

Use this architecture when you need governed, production-ready agents that can:

- Enforce tool approval and human-in-the-loop decisions before side effects ([Tool Approval - Agent Framework](https://learn.microsoft.com/agent-framework/agents/tool-approval), [Human-in-the-Loop (HIL) and Approval Workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)).
- Preserve session context across turns for multi-step conversations ([Conversations & Memory Overview](https://learn.microsoft.com/en-us/agent-framework/agents/conversations)).
- Keep the same core agent patterns across hosting targets such as Foundry and other integrations ([Microsoft Foundry | Microsoft Agent Framework](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)).

## Short code sample (conceptual)

```python
# Conceptual sample: context provider hooks around one run.
# For runnable end-to-end examples, see sample-code-patterns.
class UserContextProvider:
    async def get_context(self, session, **kwargs):
        return {
            "instructions": "Prefer concise responses.",
            "messages": [],
        }

    async def after_run(self, response, session, **kwargs):
        session.state["last_response"] = response.text
```

This snippet is conceptual and highlights the context layer/provider contract (`get_context` before run, `after_run` after run) described in the pipeline documentation ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).

Full runnable code patterns are in [sample-code-patterns section](../sample-code-patterns/section.md), including minimal tool calls, approvals, sessions, and orchestration examples ([microsoft/agent-framework GitHub Repository](https://github.com/microsoft/agent-framework), [Tools Overview - Agent Framework](https://learn.microsoft.com/agent-framework/agents/tools)).

## Key takeaway for the talk

Present the agent harness as a layered pipeline where the agent middleware layer governs execution, the context layer/providers shape memory and instructions, and the chat client layer performs model and tool-call turns. This framing stays aligned to official terminology while remaining concise for a 12-minute architecture segment ([Agent pipeline architecture](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)).
