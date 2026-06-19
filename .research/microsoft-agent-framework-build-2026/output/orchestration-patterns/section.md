---
title: "Orchestration Patterns"
date: "2026-06-18"
status: "complete"
purpose: "12-minute technical presentation for senior architects and solution engineers"
target_audience:
  - "Senior architects"
  - "Solution engineers"
source_notes:
  - "../../notes/advanced-features/sub-agents-orchestration.md"
  - "../../notes/advanced-features/human-in-the-loop-approval.md"
  - "../../notes/advanced-features/planning-capabilities.md"
  - "../../notes/sdk-integrations/durable-agents-foundry.md"
  - "../../notes/sdk-integrations/microsoft-foundry-agent-service.md"
  - "../../notes/agent-harness-core-loop/microsoft-learn-agent-loop-architecture.md"
  - "../../notes/agent-harness-core-loop/github-repository-patterns.md"
---

## Decision-first summary

Use orchestration when you need explicit control over execution order, routing, and human gates, and use autonomous planning when the task shape is unknown up front. [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [Agent Planning and Autonomous Reasoning](https://github.com/microsoft/agent-framework)

Agent Framework workflow execution is graph-based and runs in synchronized supersteps, which gives predictable step boundaries and clear points for checkpointing and resume. [Sub-Agents & Multi-Agent Orchestration](https://github.com/microsoft/agent-framework) [Durable agents with Foundry & Durable Task](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

## Compact decision matrix

| Pattern | What it is | How it works | Used for |
|---|---|---|---|
| Sequential | Ordered pipeline | A -> B -> C edges, each step consumes prior output | Stable business flows, approvals, deterministic processing [Sequential orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential) |
| Concurrent | Parallel fan-out/fan-in | Independent branches execute in parallel, then synchronize at barrier | Latency reduction for independent subtasks [Concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent) [Sub-Agents & Multi-Agent Orchestration](https://github.com/microsoft/agent-framework) |
| Handoff | Delegation routing | Current agent transfers ownership to a specialist | Triage, escalation, domain routing [Handoff orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff) |
| Group chat | Collaborative reasoning | Multiple agents collaborate in one shared conversation with speaker selection | Brainstorming, critique, synthesis [Group chat orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat) |
| Magentic | Manager-led adaptive coordination | Manager plans, coordinates specialists, and replans as needed | Open-ended tasks with evolving plans [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic) |

## Conceptual diagram (single slide)

Draw one left-to-right diagram with five lanes sharing a common start and output node: lane 1 is a straight chain (Sequential), lane 2 is fan-out then join (Concurrent), lane 3 is ownership transfer between specialists (Handoff), lane 4 is a shared conversation loop with orchestrator-selected speaker (Group chat), and lane 5 is a manager node that dynamically selects specialists and can replan (Magentic). This one visual makes the control-model differences explicit without showing framework internals. [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [Handoff orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff) [Group chat orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat) [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)

## Pattern details

### Sequential

- What it is: A deterministic ordered pipeline where each step depends on the previous step output. [Sequential orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential)
- How it works: Explicit edges define execution order; optional HITL gates can pause between steps or before sensitive tool use. [Sequential orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential) [Human-in-the-loop (HITL)](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)
- Used for: Approval-heavy or compliance-heavy workflows that must be explainable end to end. [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/)

### Concurrent

- What it is: A parallel orchestration for independent work streams. [Concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent)
- How it works: Fan-out executes multiple branches in the same step and fan-in waits at a synchronization barrier before advancing. [Concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent) [Sub-Agents & Multi-Agent Orchestration](https://github.com/microsoft/agent-framework)
- Used for: Independent enrichment, parallel expert review, and aggregate-then-decide workloads. [Concurrent orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent)

### Handoff

- What it is: A delegation pattern where ownership of the task shifts to the best specialist. [Handoff orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff)
- How it works: A routing agent evaluates context and hands control to a specialist agent that continues execution. [Handoff orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff)
- Used for: Routing-heavy service flows, support escalation, and specialist-first handling. [Handoff orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff)

### Group chat

- What it is: A collaborative multi-agent discussion pattern in a shared conversation space. [Group chat orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat)
- How it works: The orchestrator selects speakers and agents iteratively contribute to a single joint answer. [Group chat orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat)
- Used for: Co-authoring, challenge-and-refine loops, and multi-perspective synthesis. [Group chat orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat)

### Magentic

- What it is: A manager-driven orchestration for open-ended tasks that need adaptive planning plus specialist execution. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- How it works: The manager creates and updates plans, chooses specialists, and iterates until completion or guardrail stop conditions. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- Used for: Complex, evolving tasks that cannot be reliably encoded as a fixed path. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)

## Magentic caveat and production guardrails

The official Magentic guidance includes an applicability caveat: it is intended for open-ended multi-agent planning scenarios and recommends considering simpler orchestrations (for example, Group chat or fixed workflows) when adaptive planning is not required. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic) [AI agent orchestration patterns](https://learn.microsoft.com/azure/architecture/ai-ml/guide/ai-agent-design-patterns#magentic-orchestration)

For production, set explicit stop and recovery limits and require plan signoff for high-impact runs:

- Set `max rounds` to bound total manager-agent iterations. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- Set `max stalls` to stop repeated no-progress loops. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- Set `max resets` to cap retries and prevent endless restart behavior. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)
- Enable human plan signoff before execution of consequential plans. [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic) [Human-in-the-loop (HITL)](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)
- Pair long-running orchestrations with durable checkpoints so pause/resume and recovery are deterministic. [Durable agents with Foundry & Durable Task](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

```csharp
// Conceptual only: illustrate Magentic guardrails, not verified runnable as-is.
var workflow = BuildMagentic(manager, specialists)
    .WithMaxRounds(12)
    .WithMaxStalls(3)
    .WithMaxResets(1)
    .WithPlanSignoffRequired(true)
    .Build();
```

## Selection rule

Choose the least complex pattern that satisfies control needs: Sequential for fixed pipelines, Concurrent for independent parallel work, Handoff for ownership routing, Group chat for collaborative reasoning, and Magentic only when adaptive manager-led planning is necessary. [Workflow orchestrations overview](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [Magentic orchestration](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)

## Related sections

- [Advanced capabilities](../advanced-capabilities/section.md)
- [SDK integrations](../sdk-integrations/section.md)
- [Agent harness architecture](../agent-harness-architecture/section.md)
