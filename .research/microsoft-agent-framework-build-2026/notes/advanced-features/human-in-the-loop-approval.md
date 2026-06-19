---
title: "Human-in-the-Loop (HIL) and Approval Workflows"
source_url: "https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop"
source_title: "Microsoft Learn - Human-in-the-Loop (HITL)"
source_date: "2026-06-18"
area: "advanced-features"
type: "human-interaction"
dimensions:
  - "human-in-the-loop"
  - "approval-workflows"
  - "interactive-control"
  - "request-response-patterns"
extracted: "2026-06-18"
quality: "draft"
---

# Human-in-the-Loop (HIL) and Approval Workflows

## Overview

**Human-in-the-Loop (HITL)** allows workflows to pause execution and request external input (typically from human operators) before proceeding. This is achieved through the **request/response mechanism** using `RequestPort` for custom executors and tool approval for agent orchestrations.

## Core Concepts

### RequestPort Pattern

A `RequestPort` is a bidirectional communication channel that enables:
- Executors to send requests to external systems
- External systems to send responses back to the workflow
- Automatic routing of responses to the requesting executor
- Event-driven handling of requests

**Key characteristics:**
- Type-safe (request and response types specified at creation)
- Asynchronous (non-blocking)
- Integrated with workflow checkpointing
- Emits `RequestInfoEvent` for external listeners

### Workflow Pausing and Resumption

When an executor sends a request:
1. Workflow emits `RequestInfoEvent` with request details
2. Workflow execution pauses, waiting for response
3. External system processes the request (human review, approval, etc.)
4. Response is sent back to the workflow
5. Framework routes response to appropriate executor
6. Workflow resumes with the response

## Python Implementation

### Basic RequestPort Pattern

```python
from dataclasses import dataclass
from agent_framework import (
    Executor,
    WorkflowBuilder,
    WorkflowContext,
    handler,
    response_handler,
)

@dataclass
class NumberSignal:
    hint: str  # "init", "above", or "below"

class JudgeExecutor(Executor):
    def __init__(self, target_number: int):
        super().__init__(id="judge")
        self._target_number = target_number
        self._tries = 0

    @handler
    async def handle_guess(self, guess: int, ctx: WorkflowContext[int, str]) -> None:
        self._tries += 1
        if guess == self._target_number:
            await ctx.yield_output(f"{self._target_number} found in {self._tries} tries!")
        elif guess < self._target_number:
            # Request human input (pause execution)
            await ctx.request_info(
                request_data=NumberSignal(hint="below"),
                response_type=int
            )
        else:
            await ctx.request_info(
                request_data=NumberSignal(hint="above"),
                response_type=int
            )

    @response_handler
    async def on_human_response(
        self,
        original_request: NumberSignal,
        response: int,
        ctx: WorkflowContext[int, str],
    ) -> None:
        # Automatically called when human provides response
        await self.handle_guess(response, ctx)

judge = JudgeExecutor(target_number=42)
workflow = WorkflowBuilder(start_executor=judge).build()
```

### Processing RequestInfoEvents

```python
from collections.abc import AsyncIterable
from agent_framework import WorkflowEvent

async def process_event_stream(stream: AsyncIterable[WorkflowEvent]) -> dict[str, int] | None:
    """Process events to handle human feedback requests."""
    requests: list[tuple[str, NumberSignal]] = []
    
    async for event in stream:
        if event.type == "request_info":
            # Capture pending requests
            requests.append((event.request_id, event.data))

    # Handle all pending human feedback requests
    if requests:
        responses: dict[str, int] = {}
        for request_id, request in requests:
            # Get guess from human operator
            guess = ...  # Prompt UI, call approval service, etc.
            responses[request_id] = guess
        return responses

    return None

# Initial workflow run
stream = workflow.run(25, stream=True)
pending_responses = await process_event_stream(stream)

# Continue until no more requests
while pending_responses is not None:
    stream = workflow.run(stream=True, responses=pending_responses)
    pending_responses = await process_event_stream(stream)
```

## .NET Implementation

### Basic RequestPort Pattern

```csharp
using Microsoft.Agents.AI.Workflows;

internal enum NumberSignal
{
    Init,
    Above,
    Below,
}

internal sealed class JudgeExecutor() : Executor<int>("Judge")
{
    private readonly int _targetNumber;
    private int _tries;

    public JudgeExecutor(int targetNumber) : this()
    {
        this._targetNumber = targetNumber;
    }

    public override async ValueTask HandleAsync(
        int message,
        IWorkflowContext context,
        CancellationToken cancellationToken = default)
    {
        this._tries++;
        if (message == this._targetNumber)
        {
            await context.YieldOutputAsync(
                $"{this._targetNumber} found in {this._tries} tries!",
                cancellationToken);
        }
        else if (message < this._targetNumber)
        {
            // Request human input (pause execution)
            await context.SendMessageAsync(
                NumberSignal.Below,
                cancellationToken: cancellationToken);
        }
        else
        {
            await context.SendMessageAsync(
                NumberSignal.Above,
                cancellationToken: cancellationToken);
        }
    }
}

// Build workflow with RequestPort
var numberRequestPort = RequestPort.Create<NumberSignal, int>("GuessNumber");
var judgeExecutor = new JudgeExecutor(42);

var workflow = new WorkflowBuilder(numberRequestPort)
    .AddEdge(numberRequestPort, judgeExecutor)
    .AddEdge(judgeExecutor, numberRequestPort)
    .WithOutputFrom(judgeExecutor)
    .Build();
```

### Processing RequestInfoEvents

```csharp
await using StreamingRun handle = 
    await InProcessExecution.RunStreamingAsync(workflow, NumberSignal.Init);

await foreach (WorkflowEvent evt in handle.WatchStreamAsync())
{
    switch (evt)
    {
        case RequestInfoEvent requestInputEvt:
            // External system handles the request
            int guess = ...; // Get guess from human operator
            
            // Send response back to workflow
            await handle.SendResponseAsync(
                requestInputEvt.Request.CreateResponse(guess));
            break;

        case WorkflowOutputEvent outputEvt:
            // Workflow completed
            Console.WriteLine($"Workflow result: {outputEvt.Data}");
            return;
    }
}
```

## Tool Approval Pattern (Agent Orchestrations)

When using **agent orchestrations** (sequential, concurrent, group chat), tool approval is achieved through the HITL mechanism:

```python
# In agent definition
agent = Agent(
    client=...,
    tools=[
        dangerous_tool  # Requires approval
    ]
)

# Workflow handles tool approval requests automatically
# Pauses execution when agent attempts to call approval-required tool
# Emits request_info event with type "function_approval_request"
```

Response event contains:
- Tool name and parameters to be executed
- Request ID for routing response
- Context about why approval is needed

## Checkpoints and Recovery

When a workflow checkpoint is created:
- **Pending requests are saved** as part of checkpoint state
- **On restore**: Pending requests are re-emitted as `RequestInfoEvent`
- **Response mechanism**: Use standard response mechanism to provide answers
- **No direct response during resume**: Must listen for re-emitted events

```python
# After checkpoint restoration
restored_workflow = await load_checkpoint(checkpoint_id)
stream = restored_workflow.run(stream=True)

# Process re-emitted request events
pending_responses = await process_event_stream(stream)
while pending_responses is not None:
    stream = restored_workflow.run(stream=True, responses=pending_responses)
    pending_responses = await process_event_stream(stream)
```

## Use Cases

**Human-in-the-Loop is essential for:**
- **Approval workflows**: Execute sensitive operations only after human review
- **Interactive problem-solving**: Agents request user feedback to resolve ambiguity
- **Governance and control**: Enforce organizational policies requiring manual gates
- **Compliance**: Document human decisions and approvals
- **Quality assurance**: Human review before irreversible actions
- **Information gathering**: Agent requests missing information from users
- **Conflict resolution**: Human arbiter for disagreements between agents

## Patterns and Best Practices

### Multi-Stage Approval

```python
# Sequential approvals
await ctx.request_info(ApprovalRequest(level="manager"))
await ctx.request_info(ApprovalRequest(level="director"))
```

### Timeout Handling

```python
try:
    response = await asyncio.wait_for(
        ctx.request_info(...),
        timeout=timedelta(hours=24)
    )
except asyncio.TimeoutError:
    await ctx.yield_output("Approval timeout - executing default action")
```

### Conditional Approval

```python
if workflow_needs_approval(decision):
    await ctx.request_info(ApprovalRequest(decision=decision))
else:
    await ctx.yield_output(f"Approved: {decision}")
```

## Limitations and Constraints

- **Synchronous blocking**: Workflow pauses and consumes resources while waiting
- **Timeout risks**: Long approval delays can exceed agent/workflow timeouts
- **State persistence**: Pending requests require durable storage for recovery
- **User fatigue**: Too many approval gates can create bottlenecks
- **Authorization**: Must verify human approver has sufficient permissions

## Questions for Further Research

1. What are scalability patterns for high-volume approval workflows?
2. How can approval timeouts be configured per-request-type?
3. What audit logging is available for approval decisions?
4. Can approval workflows be delegated to sub-agents programmatically?

## Related Concepts

- **Workflows**: Execution model and superstep-based processing
- **Session Persistence**: Checkpoint mechanism for workflow recovery
- **Tool Calling**: Integration with agent tool invocation
- **Observability**: Tracing and monitoring approval workflows

## References

- Learn: [Human-in-the-Loop (HITL)](https://learn.microsoft.com/en-us/agent-framework/workflows/human-in-the-loop)
- GitHub: [Sequential tool approval sample (C#)](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Agents/GroupChatToolApproval)
- GitHub: [Sequential tool approval sample (Python)](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/tool-approval/sequential_builder_tool_approval.py)
- GitHub: [Human-in-the-loop guessing game (Python)](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows/human-in-the-loop/guessing_game_with_human_input.py)
