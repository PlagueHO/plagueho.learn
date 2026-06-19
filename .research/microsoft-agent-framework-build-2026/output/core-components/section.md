---
title: Core Components Breakdown (Skills, Tools, Permissions, Safety)
date: 2026-06-18
status: complete
purpose: "12-minute technical presentation"
target_audience: "Senior architects, solution engineers"
---

# Core Components Breakdown (Skills, Tools, Permissions, Safety)

Agent Framework core components are easiest to reason about as two capability layers plus one control layer: skills and tools provide capability, while approval and permission boundaries provide control. The framework docs separate these concerns explicitly, and that separation is the key production design principle for this section. [Skills](https://learn.microsoft.com/agent-framework/agents/skills) [Tools](https://learn.microsoft.com/agent-framework/agents/tools) [Iteration-1 boundary sources](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)

## 1. Skills and tools: what they are, how they work, and what they are used for

Tools are executable actions an agent can call at runtime, including function tools and MCP-backed tools, and are selected by the model through normal function-calling flow. [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools)

Skills are reusable instruction/resource/script packages that extend domain expertise and are loaded progressively instead of always being in prompt context. [Skills overview](https://learn.microsoft.com/agent-framework/agents/skills)

Use tools when you need a concrete side effect or query (send, read, execute, fetch). Use skills when you need structured domain behavior and reusable procedural guidance across many requests. [Adding tools journey](https://learn.microsoft.com/agent-framework/journey/adding-tools) [Adding skills journey](https://learn.microsoft.com/agent-framework/journey/adding-skills)

### Conceptual snippet (not runnable): skill vs tool dispatch

```text
User asks for "submit expense claim"
  -> model chooses skill "expense-report" for domain procedure
  -> skill guidance requests tool "create_expense_entry"
  -> tool executes side effect in external system
```

This is the practical composition model used in framework guidance: skills steer behavior, tools perform actions. [Skills overview](https://learn.microsoft.com/agent-framework/agents/skills) [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools)

### Runnable snippet: minimal tool registration (Python)

```python
from typing import Annotated
from agent_framework import Agent, tool

@tool
def get_weather(location: Annotated[str, "Location"]) -> str:
    return f"Weather for {location}: cloudy, 15C"

agent = Agent(
    client=...,  # provider client
    instructions="You are a concise assistant.",
    tools=[get_weather],
)
```

This demonstrates the baseline function-tool path used throughout framework examples: define function signature, register in `tools`, let runtime invoke when selected. [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools)

## 2. Approval boundary matrix (mandatory distinction)

Iteration-1 review identified recurring confusion between three separate control mechanisms. The matrix below is the authoritative boundary for this presentation section. [Iteration-1 gap refresh in sources](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential#sequential-orchestration-with-human-in-the-loop)

| Boundary | Scope | Trigger | Pause/Resume behavior | Typical use | Primary source |
|---|---|---|---|---|---|
| Tool Approval | Individual tool invocation in Agent Framework | Agent attempts to call a tool configured for approval | Tool call is gated until approval decision is returned | Sensitive side effects (send email, delete, purchase) | [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) |
| Runtime permission handlers (for example, Copilot runtime) | Provider/runtime capability surface (shell, file, URL) | Runtime asks for permission before capability execution | Runtime permission decision controls capability execution | Local environment safety and capability governance | [GitHub Copilot provider](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) |
| Workflow HITL request/response | Workflow orchestration step or executor needing external input | Workflow emits request event (for example `RequestInfoEvent`) | Workflow pauses and resumes when response is sent back | Human review, missing data collection, policy checkpoints | [Workflow HITL](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations) |

### Boundary clarification notes

Tool Approval is a framework-level per-tool gate, not a runtime shell/file permission system. [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools)

Copilot runtime permissions are provider capability permissions, not the same semantic layer as Tool Approval policies. [GitHub Copilot provider](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

In orchestrations, Tool Approval requests are surfaced through the workflow request/response mechanism, which is why they can appear similar while still being distinct boundaries. [Workflow HITL](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations) [Sequential orchestration HITL](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential#sequential-orchestration-with-human-in-the-loop)

## 3. How each boundary works in execution

### 3.1 Tool Approval flow

Tool Approval marks a tool for explicit decisioning and pauses the tool path until approved or rejected, then resumes agent execution with the decision outcome. [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)

### Conceptual snippet (not runnable): tool approval sequence

```text
Agent selects tool -> approval request emitted -> human/app decision ->
approve: execute tool and continue
reject: skip tool and continue with rejection context
```

### Runnable snippet: approval-tagged tool (Python)

```python
from typing import Annotated
from agent_framework import tool

@tool(approval_mode="always_require")
def send_email(
    recipient: Annotated[str, "Email recipient"],
    subject: Annotated[str, "Subject"],
    body: Annotated[str, "Body"],
) -> str:
    return f"Sent to {recipient}"
```

The approval mode declaration is the explicit contract that this tool cannot auto-execute. [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval)

### 3.2 Runtime permission handlers (Copilot runtime example)

Copilot provider capabilities such as shell, filesystem, and URL access use permission handlers at runtime to approve/reject capability requests. This is scoped to runtime capabilities, not to generic Agent Framework tool metadata. [GitHub Copilot provider](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### Runnable snippet: permission callback shape (.NET)

```csharp
static Task<PermissionDecision> PromptPermission(
    PermissionRequest request,
    PermissionInvocation invocation)
{
    // Decide per runtime capability request.
    return Task.FromResult(PermissionDecision.ApproveOnce());
}
```

This pattern controls runtime capability exposure for Copilot sessions. [GitHub Copilot provider](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot)

### 3.3 Workflow HITL request/response

Workflow HITL uses request/response ports/events to pause orchestration and resume when external response is provided, including human approvals or data responses. [Workflow HITL](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)

### Conceptual snippet (not runnable): workflow HITL sequence

```text
Executor requests info/approval -> workflow emits request event ->
external human/system responds -> workflow routes response -> execution resumes
```

### Runnable snippet: request event handling shape (.NET)

```csharp
await foreach (WorkflowEvent evt in handle.WatchStreamAsync())
{
    if (evt is RequestInfoEvent req)
    {
        await handle.SendResponseAsync(req.Request.CreateResponse(true));
    }
}
```

This is the workflow-level pause/resume model used by orchestration HITL guidance. [Workflow HITL](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)

## 4. Safety usage guidance for talk-time decisions

For a 12-minute talk, keep the guidance operational: apply Tool Approval to high-impact side effects, use runtime permission handlers for provider capability control, and use workflow HITL for broader orchestration checkpoints and human decision moments. [Tool approval](https://learn.microsoft.com/agent-framework/agents/tools/tool-approval) [GitHub Copilot provider](https://learn.microsoft.com/agent-framework/agents/providers/github-copilot) [Sequential orchestration HITL](https://learn.microsoft.com/agent-framework/workflows/orchestrations/sequential#sequential-orchestration-with-human-in-the-loop)

## 5. Quick takeaway

Skills and tools answer "what can the agent do?" while boundary controls answer "who must approve which action, at which layer?" Keeping those three boundaries separate avoids over-granting permissions and prevents incorrect governance assumptions in production architecture. [Tools overview](https://learn.microsoft.com/agent-framework/agents/tools) [Workflow HITL](https://learn.microsoft.com/agent-framework/workflows/human-in-the-loop#human-in-the-loop-with-agent-orchestrations)

Related sections: [Advanced capabilities](../advanced-capabilities/section.md) and [Orchestration patterns](../orchestration-patterns/section.md).
