---
title: "Advanced Capabilities (Sub-Agents, Persistence, HIL, Planning)"
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers"
source_notes:
  - "notes/advanced-features/sub-agents-orchestration.md"
  - "notes/advanced-features/session-persistence-memory.md"
  - "notes/advanced-features/human-in-the-loop-approval.md"
  - "notes/advanced-features/planning-capabilities.md"
word_count_target: "5500-6500 words"
code_examples: 8
diagrams_described: 4
---

# Advanced Capabilities: Sub-Agents, Persistence, Human-in-the-Loop, and Planning

For a 12-minute talk, this section focuses on four capabilities you can apply immediately, with concrete boundaries and tradeoffs from the current documentation and samples.

Related sections: [Orchestration Patterns](../orchestration-patterns/section.md), [Core Components Breakdown](../core-components/section.md), and [SDK Integrations](../sdk-integrations/section.md).

## 1) Sub-agents orchestration

What it is: The framework provides workflow orchestration for coordinating multiple executors/agents as a graph, with built-in orchestration patterns such as sequential, concurrent, handoff, group chat, and Magentic orchestrations ([workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/), [workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/workflows)).

How it works: Workflows are defined with `WorkflowBuilder` and executed in supersteps (collect, route, execute, synchronize, queue), which is the basis for deterministic workflow progression and checkpoint-friendly execution boundaries ([workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/workflows), [Python workflow samples](https://github.com/microsoft/agent-framework/tree/main/python/samples/03-workflows), [.NET workflow samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows)).

What it is used for: Use orchestration when you need explicit control over routing and stage boundaries for multi-step pipelines, specialist delegation, or parallel branches that must converge predictably ([orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/), [multiple-agent architecture guidance](https://learn.microsoft.com/azure/architecture/ai-ml/idea/multiple-agent-workflow-automation)).

Example (conceptual): Route intake to a researcher agent, then to a writer agent, then to a reviewer agent in a sequential orchestration, with a concurrent branch for policy checks before final merge ([sequential](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential), [concurrent](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent)).

## 2) Session persistence/checkpointing

What it is: Conversation/session state is held in `AgentSession`, while workflow execution state is persisted via checkpoints; these are related but distinct durability layers ([conversations/session](https://learn.microsoft.com/en-us/agent-framework/agents/conversations/session), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints)).

How it works: Sessions can be created, reused, serialized, and restored for multi-turn context continuity, and workflow checkpoints persist executor/cross-executor state plus queued messages for resume after interruption ([conversations](https://learn.microsoft.com/en-us/agent-framework/agents/conversations), [storage](https://learn.microsoft.com/en-us/agent-framework/agents/storage), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints)).

What it is used for: Use sessions for conversational continuity and use checkpoints for long-running orchestration recovery, especially where runs can pause, fail, or span restarts ([conversations/session](https://learn.microsoft.com/en-us/agent-framework/agents/conversations/session), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints), [durable agents integration](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)).

Example (conceptual): A user revisits a planning thread tomorrow (session restore), while the background workflow resumes from a persisted checkpoint after an infrastructure restart ([conversations/session](https://learn.microsoft.com/en-us/agent-framework/agents/conversations/session), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints)).

## 3) HITL controls

What it is: HITL is a pause-and-resume control model where workflows emit request events for external decisioning (human or service) before continuing ([human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)).

How it works: `RequestPort` and request/response events let an executor request approval or input; the workflow pauses, awaits response, and then resumes with automatic routing back to the requester. Tool approval in orchestrations follows the same control path ([human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop), [tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)).

What it is used for: Use HITL where operations need governed authorization or explicit operator confirmation, including sensitive tool calls and high-impact transitions ([human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop), [tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)).

Example (conceptual): A payment-release tool call triggers an approval request event; execution continues only after an approve/reject response is returned ([human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop), [tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)).

## 4) Planning + caveats

What it is: Planning is agent-led task decomposition and iterative tool use inside the runtime loop, while orchestrations are developer-defined coordination structures; they are complementary, not interchangeable ([agent pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline), [orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/)).

How it works: A planning-capable agent evaluates goal + available tools, executes tool calls, and adapts from results; orchestration patterns (including Magentic) coordinate multi-agent execution at a higher control layer ([agent pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline), [magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)).

What it is used for: Use planning for open-ended problem solving, and use explicit workflows when execution order, approvals, and recovery points must be predictable and auditable ([overview](https://learn.microsoft.com/agent-framework/overview/), [workflows](https://learn.microsoft.com/en-us/agent-framework/workflows/workflows), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints)).

Magentic caveat and guardrails: Magentic is intentionally dynamic and manager-driven, which increases flexibility but also increases run-to-run variability and review complexity versus fixed orchestration graphs ([magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic), [orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/)). For production guardrails, bound Magentic with explicit tool approval/HITL gates, checkpoint-backed recovery, and clear escalation paths to deterministic sequential/concurrent flows for critical operations ([human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop), [tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval), [workflow checkpoints](https://learn.microsoft.com/en-us/agent-framework/workflows/checkpoints), [sequential orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential), [concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent)).

Example (conceptual): Let Magentic coordinate open-ended investigation, but require approval before external side effects and hand off final execution to a deterministic workflow branch ([magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic), [human-in-the-loop](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)).
