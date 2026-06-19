---
title: Agent Framework Build 2026 Use Cases
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers"
source_notes:
  - "notes/advanced-features/sub-agents-orchestration.md"
  - "notes/advanced-features/session-persistence-memory.md"
  - "notes/advanced-features/human-in-the-loop-approval.md"
  - "notes/advanced-features/planning-capabilities.md"
  - "notes/sdk-integrations/github-copilot-sdk-integration.md"
  - "notes/sdk-integrations/microsoft-foundry-agent-service.md"
  - "notes/sdk-integrations/durable-agents-foundry.md"
  - "notes/sdk-integrations/m365-agents-copilot-integration.md"
  - "notes/sdk-integrations/python-2026-sdk-changes.md"
  - "notes/agent-harness-core-loop/microsoft-learn-agent-loop-architecture.md"
  - "notes/agent-capabilities/tools-function-registration.md"
  - "notes/orchestration-patterns/orchestration-overview.md"
---

## Where Build 2026 Becomes Practical

Build 2026 makes Microsoft Agent Framework practical because it unifies autonomous agents and deterministic workflows in one runtime model, then lets teams surface that runtime in GitHub Copilot, Foundry, Durable Task, and Microsoft 365 Copilot. [https://learn.microsoft.com/agent-framework/overview/](https://learn.microsoft.com/agent-framework/overview/) [https://learn.microsoft.com/agent-framework/agents/agent-pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline) [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

For architecture decisions, the key is to map each announcement cluster to a concrete control surface: planning for uncertainty, orchestration for process control, persistence and approval for operational safety, and provider integrations for deployment context. [https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern](https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop)

## Announcement cluster mapping (what, how, used for)

### Cluster 1: Autonomous planning and tool use

**What changed:** Agent Framework supports model-directed planning with tools in the runtime loop, including function tools and provider-connected tool patterns. [https://github.com/microsoft/agent-framework](https://github.com/microsoft/agent-framework) [https://learn.microsoft.com/agent-framework/agents/tools/](https://learn.microsoft.com/agent-framework/agents/tools/) [https://learn.microsoft.com/agent-framework/agents/agent-pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline)

**How it works:** The agent pipeline composes middleware, context providers, model calls, and tool invocation in iterative turns, which lets the model decompose goals and adapt after each result. [https://learn.microsoft.com/agent-framework/agents/agent-pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline) [https://learn.microsoft.com/agent-framework/journey/adding-tools](https://learn.microsoft.com/agent-framework/journey/adding-tools)

**Used for:** Open-ended tasks such as incident triage, exploratory analysis, and ambiguous support requests where the next step depends on intermediate evidence. [https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern](https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern)

### Cluster 2: Multi-agent workflow orchestration

**What changed:** Agent Framework ships built-in orchestration patterns: sequential, concurrent, handoff, group chat, and magentic. [https://learn.microsoft.com/agent-framework/workflows/orchestrations/](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic](https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic)

**How it works:** Workflows are graph-based and execute via executors, edges, and events, with superstep-style progression and explicit synchronization boundaries. [https://learn.microsoft.com/agent-framework/workflows/#core-concepts](https://learn.microsoft.com/agent-framework/workflows/#core-concepts) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent](https://learn.microsoft.com/agent-framework/workflows/orchestrations/concurrent)

**Used for:** Governed business processes with known stage boundaries, specialist routing, and collaborative review where deterministic control is required. [https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff](https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat](https://learn.microsoft.com/agent-framework/workflows/orchestrations/group-chat)

### Cluster 3: Durability, session continuity, and human approval

**What changed:** Session persistence, workflow checkpointing, and human-in-the-loop request/response controls are first-class capabilities across conversations and workflows. [https://learn.microsoft.com/agent-framework/agents/conversations/](https://learn.microsoft.com/agent-framework/agents/conversations/) [https://learn.microsoft.com/agent-framework/workflows/checkpoints](https://learn.microsoft.com/agent-framework/workflows/checkpoints) [https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop)

**How it works:** `AgentSession` maintains and restores conversation context, checkpoints persist workflow state, and approval flows pause execution until a human response arrives. [https://learn.microsoft.com/agent-framework/agents/conversations/session](https://learn.microsoft.com/agent-framework/agents/conversations/session) [https://learn.microsoft.com/agent-framework/workflows/checkpoints](https://learn.microsoft.com/agent-framework/workflows/checkpoints) [https://learn.microsoft.com/agent-framework/agents/tools/tool-approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)

**Used for:** Long-running interactions, restart-prone operations, and sensitive actions such as payment release, change approval, or privileged tool use. [https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations) [https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework)

### Cluster 4: Deployment targets and enterprise surface area

**What changed:** Provider integrations now map the same agent and workflow runtime to developer, platform, durability, and productivity endpoints. [https://learn.microsoft.com/agent-framework/agents/](https://learn.microsoft.com/agent-framework/agents/) [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

**How it works:** GitHub Copilot exposes code-centric capabilities with permissions, Foundry provides managed agent hosting, Durable Task adds distributed checkpoint/recovery execution, and Microsoft 365 Copilot exposes agents via toolkit and channel integration. [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [https://learn.microsoft.com/azure/durable-task/sdks/durable-task-for-ai-agents](https://learn.microsoft.com/azure/durable-task/sdks/durable-task-for-ai-agents) [https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

**Used for:** Placing the same agentic design in the environment where work already occurs, without re-architecting the core behavior model. [https://learn.microsoft.com/agent-framework/overview/](https://learn.microsoft.com/agent-framework/overview/) [https://learn.microsoft.com/agent-framework/workflows/as-agents](https://learn.microsoft.com/agent-framework/workflows/as-agents)

## Canonical decision table

| Decision need | Choose | Why this is the right control surface |
|---|---|---|
| Task path is uncertain and evidence-driven | Autonomous planning + tools | Model-directed decomposition and tool iteration adapt at runtime. [https://learn.microsoft.com/agent-framework/journey/adding-tools](https://learn.microsoft.com/agent-framework/journey/adding-tools) [https://learn.microsoft.com/agent-framework/agents/agent-pipeline](https://learn.microsoft.com/agent-framework/agents/agent-pipeline) |
| Process path is known and auditable | Workflow orchestration (sequential/concurrent/handoff/group chat/magentic) | Graph execution provides explicit stages, routing, and synchronization points. [https://learn.microsoft.com/agent-framework/workflows/orchestrations/](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [https://learn.microsoft.com/agent-framework/workflows/#core-concepts](https://learn.microsoft.com/agent-framework/workflows/#core-concepts) |
| Workflow must survive restarts and long waits | Durable Task + checkpoints | Durable execution and persisted checkpoints support resume semantics for long-running flows. [https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [https://learn.microsoft.com/agent-framework/workflows/checkpoints](https://learn.microsoft.com/agent-framework/workflows/checkpoints) |
| Sensitive action requires authorization | Human-in-the-loop and tool approval | Execution pauses on request/approval events until approved or rejected. [https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop) [https://learn.microsoft.com/agent-framework/agents/tools/tool-approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) |
| Agent must run where users already work | Target-specific provider integration | Copilot, Foundry, Durable Task, and M365 each provide a deployment surface for the same core model. [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry) [https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot) |

## Concise deployment-target examples

### GitHub Copilot target

Use a repository triage agent that can inspect files, run shell commands under permission policies, and call MCP-backed tools to produce a remediation PR summary for engineers. [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### Microsoft Foundry target

Use a centrally managed support agent where platform teams define model, instructions, and tool contracts once in Foundry and application teams consume it through `AsAIAgent` bindings. [https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry](https://learn.microsoft.com/agent-framework/agents/providers/microsoft-foundry)

### Durable Task target

Use a claim-resolution workflow that pauses for external approvals, persists checkpointed state, and resumes after restarts without replaying completed work. [https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework](https://learn.microsoft.com/azure/durable-task/sdks/durable-agents-microsoft-agent-framework) [https://learn.microsoft.com/azure/durable-task/common/what-is-durable-task](https://learn.microsoft.com/azure/durable-task/common/what-is-durable-task)

### Microsoft 365 Copilot target

Use a policy assistant surfaced in Microsoft 365 Copilot so business users can ask operational questions in Copilot Chat while the same backend agent logic enforces enterprise channel and deployment controls. [https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot](https://learn.microsoft.com/microsoft-365/copilot/extensibility/bring-agents-to-copilot)

## Final guidance for a 12-minute briefing

For this audience, the practical sequence is: choose planning when intent is ambiguous, add orchestration when process boundaries matter, add durability and approval when risk and uptime requirements increase, and then select the deployment target that matches user context. [https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern](https://learn.microsoft.com/agent-framework/journey/workflows#choosing-the-right-pattern) [https://learn.microsoft.com/agent-framework/workflows/orchestrations/](https://learn.microsoft.com/agent-framework/workflows/orchestrations/) [https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop) [https://learn.microsoft.com/agent-framework/agents/providers/github-copilot](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

That framing keeps the message short enough for support material while still mapping every Build 2026 announcement cluster to an architectural choice and a deployment outcome. [https://learn.microsoft.com/agent-framework/overview/](https://learn.microsoft.com/agent-framework/overview/)
