---
title: "Magentic Orchestration - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/magentic"
source_title: "Magentic Orchestration | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "pattern-implementation"
dimensions:
  - "patterns:magentic"
  - "dynamic-coordination"
  - "planning"
  - "stall-detection"
  - "human-in-the-loop:plan-review"
extracted: "2026-06-18"
quality: "draft"
---

## What Magentic Orchestration Is

Magentic orchestration is **a flexible, general-purpose multi-agent pattern designed for complex, open-ended tasks requiring dynamic collaboration**.

> "A dedicated Magentic manager coordinates a team of specialized agents, selecting which agent should act next based on the evolving context, task progress, and agent capabilities."

Based on the **Magentic-One system** invented by AutoGen. The manager maintains shared context, tracks progress, and adapts the workflow in real-time to break down complex problems, delegate subtasks, and iteratively refine solutions.

## Key Facts

### Fact 1: Dynamic Manager-Based Coordination
> "Dynamic Coordination: The Magentic manager dynamically selects which agent should act next based on the evolving context."

Unlike Group Chat (orchestrator round-robin) or Handoff (agent-initiated), the Magentic manager:
- Analyzes task and creates an initial plan
- Dynamically selects most appropriate agent for each subtask
- Evaluates progress and updates plan
- Detects stalls and triggers replanning

```
Manager Agent
   ↓ (analyzes task, creates plan)
   ├→ Agent 1 (selected for subtask)
   │   (performs task)
   │   (yields result)
   ├→ Agent 2 (dynamically selected next)
   │   (performs task)
   │   (yields result)
   └→ Manager synthesizes final answer
```

### Fact 2: Progress Tracking and Stall Detection
> "Progress Tracking & Stall Detection: The progress ledger tracks whether the request is satisfied, whether the team is in a loop, and whether progress is being made. Consecutive non-progressing rounds increment a stall counter, and exceeding the configured maximum triggers an automatic reset and replan."

**Configuration Parameters**:
- `MaxRounds`: Maximum coordination rounds before termination
- `MaxStalls`: Maximum consecutive non-progressing rounds before auto-replan
- `MaxResets`: Maximum replan attempts before termination

```python
# Python - Configure stall detection
workflow = MagenticBuilder(
    participants=[researcher_agent, coder_agent],
    manager_agent=manager_agent,
    max_round_count=10,      # Max 10 coordination rounds
    max_stall_count=3,       # Auto-replan after 3 stalls
    max_reset_count=2,       # Max 2 replans
).build()
```

### Fact 3: Three Orchestrator Events
Magentic surfaces planning and progress milestones through orchestrator events:

1. **Plan Created** — Manager produced initial task plan
2. **Replanned** — New plan created (stall detection or human revision)
3. **Progress Ledger Updated** — Emitted once per coordination round

```csharp
// C# - Handle orchestrator events
switch (workflowEvent)
{
    case MagenticPlanCreatedEvent planCreated:
        Console.WriteLine($"[Magentic Initial Plan]\n{planCreated.FullTaskLedger.Text}");
        break;

    case MagenticReplannedEvent replanned:
        Console.WriteLine($"[Magentic Replanned]\n{replanned.FullTaskLedger.Text}");
        break;

    case MagenticProgressLedgerUpdatedEvent progressUpdated:
        MagenticProgressLedger ledger = progressUpdated.ProgressLedger;
        Console.WriteLine(
            $"[Progress] satisfied={ledger.IsRequestSatisfied}, " +
            $"inLoop={ledger.IsInLoop}, progressing={ledger.IsProgressBeingMade}, " +
            $"nextSpeaker={ledger.NextSpeaker}");
        break;
}
```

## Use Cases

- **Complex Open-Ended Problem-Solving**: Tasks where solution path unknown in advance
- **Multi-Round Research & Analysis**: Iterative research, computation, and refinement
- **Report Generation**: Research + coding + analysis + documentation
- **Complex Data Analysis**: Multiple agents doing research, computation, synthesis
- **Dynamic Task Planning**: Adaptive planning based on progress and discoveries

## C# Implementation

### Setup
```csharp
#pragma warning disable MAAIW001  // Magentic types are experimental

using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Workflows;
using Microsoft.Agents.AI.Workflows.Specialized.Magentic;
using Microsoft.Extensions.AI;

string endpoint = Environment.GetEnvironmentVariable("AZURE_AI_PROJECT_ENDPOINT")
    ?? throw new InvalidOperationException("AZURE_AI_PROJECT_ENDPOINT is not set.");
string deploymentName = Environment.GetEnvironmentVariable("AZURE_AI_MODEL_DEPLOYMENT_NAME") 
    ?? "gpt-5.4-mini";

AIProjectClient projectClient = new(new Uri(endpoint), new DefaultAzureCredential());
```

### Define Specialized Agents
```csharp
// Researcher agent
AIAgent researcherAgent = projectClient.AsAIAgent(
    deploymentName,
    name: "ResearcherAgent",
    description: "Specialist in research and information gathering.",
    instructions: "You are a researcher. Find relevant information without doing additional " +
                  "computation or quantitative analysis.");

// Coder agent with code execution capability
AIAgent coderAgent = projectClient.AsAIAgent(
    deploymentName,
    name: "CoderAgent",
    description: "A helpful assistant that writes and executes code to analyze data.",
    instructions: "You solve quantitative questions by writing and running code. " +
                  "Show the analysis and computation process clearly.",
    tools: [new HostedCodeInterpreterTool()]);

// Manager agent
AIAgent managerAgent = projectClient.AsAIAgent(
    deploymentName,
    name: "MagenticManager",
    description: "Orchestrator that coordinates the research and coding workflow.",
    instructions: "You coordinate the team to complete complex tasks efficiently.");
```

### Build Magentic Workflow
```csharp
Workflow workflow = new MagenticWorkflowBuilder(managerAgent)
    .AddParticipants([researcherAgent, coderAgent])
    .WithName("Magentic Orchestration Workflow")
    .WithDescription("Coordinates a researcher and coder to solve complex analytical tasks.")
    .RequirePlanSignoff(false)  // Disable plan review for end-to-end execution
    .WithMaxRounds(10)
    .WithMaxStalls(3)
    .WithMaxResets(2)
    .Build();
```

### Execute with Event Streaming
```csharp
const string TaskPrompt =
    "I am preparing a report on the energy efficiency of different machine learning model " +
    "architectures. Compare the estimated training and inference energy consumption of " +
    "ResNet-50, BERT-base, and GPT-2 on standard datasets. Then, estimate the CO2 emissions " +
    "associated with each, assuming training on an Azure Standard_NC6s_v3 VM for 24 hours. " +
    "Provide tables for clarity.";

await using StreamingRun run = await InProcessExecution.RunStreamingAsync(
    workflow,
    new List<ChatMessage> { new(ChatRole.User, TaskPrompt) });

await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

string? lastResponseId = null;
WorkflowOutputEvent? finalOutput = null;

await foreach (WorkflowEvent workflowEvent in run.WatchStreamAsync())
{
    switch (workflowEvent)
    {
        case AgentResponseUpdateEvent updateEvent:
            // Stream per-participant deltas
            string responseId = updateEvent.Update.ResponseId 
                ?? updateEvent.Update.MessageId 
                ?? updateEvent.ExecutorId;
            if (!string.Equals(responseId, lastResponseId, StringComparison.Ordinal))
            {
                if (lastResponseId is not null) Console.WriteLine();
                Console.Write($"- {updateEvent.ExecutorId}: ");
                lastResponseId = responseId;
            }
            Console.Write(updateEvent.Update.Text);
            break;

        case MagenticPlanCreatedEvent planCreated:
            Console.WriteLine($"\n[Magentic Initial Plan]\n{planCreated.FullTaskLedger.Text}");
            break;

        case MagenticReplannedEvent replanned:
            Console.WriteLine($"\n[Magentic Replanned]\n{replanned.FullTaskLedger.Text}");
            break;

        case MagenticProgressLedgerUpdatedEvent progressUpdated:
            MagenticProgressLedger ledger = progressUpdated.ProgressLedger;
            Console.WriteLine(
                $"\n[Progress] satisfied={ledger.IsRequestSatisfied}, " +
                $"inLoop={ledger.IsInLoop}, progressing={ledger.IsProgressBeingMade}, " +
                $"nextSpeaker={ledger.NextSpeaker}");
            break;

        case WorkflowOutputEvent outputEvent when outputEvent.Is<List<ChatMessage>>():
            finalOutput = outputEvent;
            break;

        case WorkflowErrorEvent workflowError:
            Console.Error.WriteLine(workflowError.Exception?.ToString() ?? "Unknown error.");
            break;
    }
}

if (finalOutput?.As<List<ChatMessage>>() is { } transcript)
{
    Console.WriteLine("\n\n=== Final Conversation Transcript ===\n");
    foreach (ChatMessage message in transcript)
    {
        Console.WriteLine($"{message.AuthorName ?? message.Role}: {message.Text}");
    }
}
```

## Python Implementation

### Setup and Agents
```python
import os
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ["FOUNDRY_MODEL"],
    credential=AzureCliCredential(),
)

# Research agent
researcher_agent = Agent(
    name="ResearcherAgent",
    description="Specialist in research and information gathering",
    instructions=(
        "You are a Researcher. You find information without additional computation "
        "or quantitative analysis."
    ),
    client=client,
)

# Coder agent with code interpreter
coder_agent = Agent(
    name="CoderAgent",
    description="A helpful assistant that writes and executes code to analyze data.",
    instructions="You solve questions using code. Provide detailed analysis and computation.",
    client=client,
    tools=client.get_code_interpreter_tool(),
)

# Manager agent
manager_agent = Agent(
    name="MagenticManager",
    description="Orchestrator that coordinates the research and coding workflow",
    instructions="You coordinate a team to complete complex tasks efficiently.",
    client=client,
)
```

### Build Magentic Workflow
```python
from agent_framework.orchestrations import MagenticBuilder

workflow = MagenticBuilder(
    participants=[researcher_agent, coder_agent],
    intermediate_output_from=[researcher_agent, coder_agent],  # Surface individual outputs
    manager_agent=manager_agent,
    max_round_count=10,
    max_stall_count=3,
    max_reset_count=2,
).build()
```

### Execute with Streaming
```python
import asyncio
import json
from agent_framework import AgentResponse, AgentResponseUpdate

task = (
    "I am preparing a report on the energy efficiency of different machine learning model "
    "architectures. Compare ResNet-50, BERT-base, and GPT-2. Estimate CO2 emissions for "
    "training on an Azure Standard_NC6s_v3 VM for 24 hours. Provide tables."
)

last_message_id: str | None = None
final_response: AgentResponse | None = None

async for event in workflow.run(task, stream=True):
    if event.type == "output" and isinstance(event.data, AgentResponseUpdate):
        message_id = event.data.message_id
        if message_id != last_message_id:
            if last_message_id is not None:
                print("\n")
            print(f"- {event.executor_id}:", end=" ", flush=True)
            last_message_id = message_id
        print(event.data, end="", flush=True)

    elif event.type == "magentic_orchestrator":
        print(f"\n[Magentic Orchestrator Event] Type: {event.data.event_type.name}")
        if isinstance(event.data.content, Message):
            print(f"Plan/Update:\n{event.data.content.text}")
        elif isinstance(event.data.content, MagenticProgressLedger):
            print(f"Progress:\n{json.dumps(event.data.content.to_dict(), indent=2)}")

    elif event.type == "output" and isinstance(event.data, AgentResponse):
        final_response = event.data

if final_response:
    print("\n\n=== Manager's Final Answer ===")
    if final_response.messages:
        print(final_response.messages[-1].text)
```

## Advanced: Human-in-the-Loop Plan Review

Enable humans to review and approve/revise the manager's proposed plan before execution.

### C# — Enable Plan Signoff
```csharp
Workflow workflow = new MagenticWorkflowBuilder(managerAgent)
    .AddParticipants([researcherAgent, coderAgent])
    .RequirePlanSignoff(true)  // Enable plan review
    .WithMaxRounds(10)
    .WithMaxStalls(1)
    .WithMaxResets(2)
    .Build();

// In event stream, handle RequestInfoEvent with MagenticPlanReviewRequest
if (evt is RequestInfoEvent requestInfo &&
    requestInfo.Request.Data.As<MagenticPlanReviewRequest>() is { } reviewRequest)
{
    Console.WriteLine($"Proposed plan:\n{reviewRequest.Plan.Text}");
    string reply = Console.ReadLine() ?? string.Empty;

    MagenticPlanReviewResponse response = string.IsNullOrWhiteSpace(reply)
        ? reviewRequest.Approve()
        : reviewRequest.Revise(reply);

    await run.SendResponseAsync(requestInfo.Request.CreateResponse(response));
}
```

### Python — Enable Plan Review
```python
from agent_framework.orchestrations import (
    MagenticPlanReviewRequest,
    MagenticPlanReviewResponse,
)

workflow = MagenticBuilder(
    participants=[researcher_agent, coder_agent],
    enable_plan_review=True,  # Enable plan review
    manager_agent=manager_agent,
    max_round_count=10,
    max_stall_count=1,
    max_reset_count=2,
).build()

# In event stream
elif event.type == "request_info" and event.request_type is MagenticPlanReviewRequest:
    event_data = event.data
    print(f"Proposed Plan:\n{event_data.plan.text}")
    reply = input("Feedback (press Enter to approve): ").strip()

    if reply == "":
        response = {event.request_id: event_data.approve()}
    else:
        response = {event.request_id: event_data.revise(reply)}

    stream = workflow.run(stream=True, responses=response)
```

## Workflow Execution Flow

1. **Planning Phase**: Manager analyzes task and creates initial plan
2. **Optional Plan Review**: Humans can review and approve/modify plan
3. **Agent Selection**: Manager selects appropriate agent for each subtask
4. **Execution**: Selected agent executes their portion
5. **Progress Assessment**: Manager evaluates progress and updates plan
6. **Stall Detection**: If stalled, auto-replan with optional human review
7. **Iteration**: Steps 3-6 repeat until complete or limits reached
8. **Final Synthesis**: Manager synthesizes all outputs into final result

## Key Concepts

- **Manager Agent**: Dedicated agent for planning and coordination
- **Dynamic Selection**: Manager selects which agent acts next based on context
- **Progress Ledger**: Tracks satisfaction, loops, and progress being made
- **Stall Detection**: Auto-replan when consecutive rounds show no progress
- **Planning Events**: `PlanCreated`, `Replanned`, `ProgressLedgerUpdated` events
- **Intermediate Outputs**: Designate participants whose outputs surface as events
- **Plan Review**: Optional human-in-the-loop approval/revision of plans
- **Iterative Refinement**: Multiple rounds of agent selection and execution

## Comparison with Similar Patterns

| Pattern | Manager | Selection | Planning | Stall Detection |
|---------|---------|-----------|----------|-----------------|
| Magentic | Yes (dedicated) | Dynamic | Yes | Yes (auto-replan) |
| Group Chat | Yes (orchestrator) | Round-robin/Custom | No | No |
| Handoff | No (mesh) | Agent-initiated | No | No |
| Sequential | No (linear) | Order-based | No | No |

## When to Use vs. Alternatives

**Use Magentic when:**
- Solution path unknown in advance
- Need adaptive planning and coordination
- Iterative refinement required
- Complex open-ended problems
- Multiple rounds of research/computation

**Use Group Chat when:**
- Simpler coordination without planning
- Known collaboration pattern
- Iterative refinement without complex planning

**Use Handoff when:**
- Agents decide who handles next phase
- Specialist routing needed

## Links

- [Magentic-One Paper](https://microsoft.github.io/autogen/stable/user-guide/agentchat-user-guide/magentic-one.html)
- [GitHub Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Orchestration/Magentic)
- [Python Samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/orchestrations)
- [Orchestration Patterns Overview](orchestrations/)
