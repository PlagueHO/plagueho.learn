---
title: "Orchestration Patterns Overview - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/"
source_title: "Workflow Orchestrations | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "overview"
dimensions:
  - "patterns:overview"
  - "patterns:sequential"
  - "patterns:concurrent"
  - "patterns:handoff"
  - "patterns:group-chat"
  - "patterns:magentic"
  - "human-in-the-loop:approval"
extracted: "2026-06-18"
quality: "draft"
---

## Overview

Microsoft Agent Framework provides **five built-in multi-agent orchestration patterns** for coordinating collaborative AI agent workflows:

1. **Sequential** — Agents execute one after another in a defined order
2. **Concurrent** — Agents execute in parallel
3. **Handoff** — Agents transfer control to one another based on context
4. **Group Chat** — Agents collaborate in a shared conversation
5. **Magentic** — A manager agent dynamically coordinates specialized agents

## Key Facts

### Fact 1: Universal Human-in-the-Loop Support
> "Orchestrations support **human-in-the-loop** interactions through tool approval and request info. Agents can use approval-required tools that pause the workflow for human review before execution."

All five orchestration patterns support human-in-the-loop (HITL) interactions through:
- **Tool Approval**: Approval-required tools pause the workflow for human review
- **Request Info**: Agents can request external information/feedback before proceeding

See [Human-in-the-Loop](../human-in-the-loop) and the [sequential orchestration HITL tutorial](sequential#sequential-orchestration-with-human-in-the-loop) for implementation details.

### Fact 2: Pattern Selection Matrix

| Pattern | Best For | Execution Model | Direct Agent-to-Agent |
|---------|----------|-----------------|----------------------|
| Sequential | Pipelines, multi-stage reasoning, document review | Ordered pipeline | No (linear) |
| Concurrent | Diverse perspectives, ensemble reasoning, voting | All parallel | No (independent) |
| Handoff | Dynamic routing, specialist selection, customer support | Mesh topology | Yes (direct transfer) |
| Group Chat | Collaborative refinement, iterative improvement | Star with orchestrator | No (orchestrator-mediated) |
| Magentic | Complex planning, dynamic coordination, open-ended tasks | Manager-based | No (manager controls) |

### Fact 3: Context and Conversation History

- **Sequential**: Each agent consumes the previous agent's full conversation by default; configurable via `chain_only_agent_responses`
- **Concurrent**: Each agent processes input independently (no context sharing)
- **Group Chat**: All agents see full conversation history; orchestrator synchronizes context
- **Handoff**: All agents in mesh see full conversation history; context propagates through handoffs
- **Magentic**: Manager sees all context; specialized agents receive context via manager

### Fact 4: Orchestration Topologies

```
Sequential:  Agent1 -> Agent2 -> Agent3
             (linear pipeline)

Concurrent:  Agent1
             Agent2 (all parallel)
             Agent3

Group Chat:      Agent1
              /    |    \
          Manager (star with orchestrator)
              \    |    /
             Agent2 Agent3

Handoff:     Agent1 <-> Agent2 <-> Agent3
             (mesh topology)

Magentic:         Manager
              /    |    \
           Agent1 Agent2 Agent3 (manager coordinates)
```

## When to Use Each Pattern

### Sequential Orchestration
**Use when**: Tasks have strict ordering, each step builds on previous output
- Document review pipelines
- Multi-stage reasoning workflows  
- Data processing pipelines
- Translation chains (e.g., topic -> French -> Spanish -> English)

### Concurrent Orchestration
**Use when**: Tasks are independent and can run simultaneously
- Ensemble reasoning (get diverse perspectives)
- Parallel expert analysis
- Voting systems
- Multi-language translation (all at once)

### Group Chat Orchestration
**Use when**: Agents need to collaborate iteratively and refine outputs
- Writer-reviewer workflows
- Iterative content improvement
- Collaborative problem-solving
- Multi-perspective analysis with refinement

### Handoff Orchestration
**Use when**: Specialist agents handle different workflow phases; direct agent-to-agent routing
- Customer support triage
- Expert systems with dynamic routing
- Multi-specialty workflows
- Autonomous agent networks

### Magentic Orchestration
**Use when**: Complex planning required; manager agent decides task decomposition
- Open-ended problem solving
- Dynamic task planning
- Balancing specialist agents
- Complex enterprise workflows

## Code Examples

### Sequential Pattern
```csharp
// C# - Simple translation pipeline
var translationAgents = (from lang in (string[])["French", "Spanish", "English"]
                         select GetTranslationAgent(lang, client));
var workflow = AgentWorkflowBuilder.BuildSequential(translationAgents);
```

```python
# Python - Writer -> Reviewer pipeline
workflow = SequentialBuilder(participants=[writer, reviewer]).build()
```

### Concurrent Pattern
```csharp
// C# - Parallel translation
var translationAgents = (from lang in (string[])["French", "Spanish", "English"]
                         select GetTranslationAgent(lang, client));
var workflow = AgentWorkflowBuilder.BuildConcurrent(translationAgents);
```

```python
# Python - Parallel expert analysis
workflow = ConcurrentBuilder(
    participants=[researcher, marketer, legal]
).build()
```

### Group Chat Pattern
```csharp
// C# - Round-robin group chat
var workflow = AgentWorkflowBuilder
    .CreateGroupChatBuilderWith(agents =>
        new RoundRobinGroupChatManager(agents) { MaximumIterationCount = 5 })
    .AddParticipants(writer, reviewer)
    .Build();
```

```python
# Python - Agent-based orchestrator for intelligent selection
workflow = GroupChatBuilder(
    participants=[researcher, writer],
    orchestrator_agent=orchestrator_agent,
).build()
```

### Handoff Pattern
```csharp
// C# - Dynamic routing
var workflow = AgentWorkflowBuilder.CreateHandoffBuilderWith(triageAgent)
    .WithHandoffs(triageAgent, [mathTutor, historyTutor])
    .WithHandoffs([mathTutor, historyTutor], triageAgent)
    .Build();
```

```python
# Python - Customer support handoff
workflow = (
    HandoffBuilder(
        name="customer_support",
        participants=[triage_agent, refund_agent, order_agent, return_agent],
    )
    .with_start_agent(triage_agent)
    .build()
)
```

## Human-in-the-Loop Integration

### Tool Approval Pattern
```csharp
// Wrap sensitive tools with ApprovalRequiredAIFunction
var deployAgent = new ChatClientAgent(
    client,
    "You are a DevOps engineer.",
    tools: [
        AIFunctionFactory.Create(CheckStagingStatus),
        new ApprovalRequiredAIFunction(AIFunctionFactory.Create(DeployToProduction))
    ]);

// Handle approval events in stream
if (evt is RequestInfoEvent e && 
    e.Request.TryGetDataAs(out ToolApprovalRequestContent? approvalRequest))
{
    await run.SendResponseAsync(
        e.Request.CreateResponse(approvalRequest.CreateResponse(approved: true)));
}
```

```python
# Python - Tool approval
@tool(approval_mode="always_require")
def execute_database_query(query: str) -> str:
    return f"Query executed: {query}"

# Handle approval in event stream
if event.type == "request_info" and event.data.type == "function_approval_request":
    responses[event.request_id] = event.data.to_function_approval_response(approved=True)
```

## Error Handling and Recovery

### Sequential Pattern
- Tool approval supports sensitive operations requiring human review
- Request Info allows feedback between agents

### Handoff Pattern  
- **Autonomous Mode**: Agents can continue without waiting for human input (experimental)
- **Turn Limits**: Control how many autonomous turns before requiring human input
- **Custom Prompts**: Define default responses for autonomous mode

```python
# Autonomous mode with turn limits
workflow = (
    HandoffBuilder(participants=[...])
    .with_start_agent(triage_agent)
    .with_autonomous_mode(
        agents=[triage_agent],
        turn_limits={triage_agent.name: 3}  # Max 3 autonomous turns
    )
    .build()
)
```

## Key Concepts

- **Topology**: How agents are connected (linear, parallel, mesh, star, manager-based)
- **Context Sharing**: How conversation history flows between agents
- **Speaker Selection**: How next agent/speaker is determined (order, orchestrator, rules, handoff tool)
- **Termination Conditions**: When the orchestration ends (max iterations, condition, completion)
- **Intermediate Outputs**: Surfacing participant outputs as `"intermediate"` events, not just final output
- **Event Streaming**: Real-time monitoring of agent progress via `AgentResponseUpdate`, `RequestInfoEvent`
- **Tool Approval**: Pausing execution for human review of sensitive operations
- **Request Info**: Agents requesting external input/feedback

## Links

- [Sequential Orchestration](sequential)
- [Concurrent Orchestration](concurrent)
- [Group Chat Orchestration](group-chat)
- [Handoff Orchestration](handoff)
- [Magentic Orchestration](magentic)
- [Human-in-the-Loop Guide](../human-in-the-loop)
- [GitHub Workflow Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Orchestration)
