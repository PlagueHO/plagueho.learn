---
title: "Sub-Agents & Multi-Agent Orchestration"
source_url: "https://github.com/microsoft/agent-framework"
source_title: "Microsoft Agent Framework Repository"
source_date: "2026-06-18"
area: "advanced-features"
type: "orchestration"
dimensions:
  - "sub-agents"
  - "multi-agent-systems"
  - "agent-delegation"
  - "communication-patterns"
extracted: "2026-06-18"
quality: "draft"
---

# Sub-Agents & Multi-Agent Orchestration

## Overview

Microsoft Agent Framework provides **graph-based workflow orchestration** for building multi-agent systems with explicit control over execution paths. The framework supports sequential, concurrent, handoff, and group collaboration patterns for coordinating multiple agents and functions.

## Key Concepts

### Workflow Builder Pattern

Workflows are constructed using the `WorkflowBuilder` class with a fluent API for defining graph structure:

- **Start executor**: The entry point to the workflow
- **Edges**: Directed connections between executors
- **Type safety**: Message type compatibility validation between connected executors
- **Validation**: Graph connectivity and executor binding verification

### Execution Model: Supersteps

The framework uses a **Bulk Synchronous Parallel (BSP) execution model** with superstep-based processing:

1. **Collect**: All pending messages from previous superstep
2. **Route**: Messages to target executors based on edge definitions
3. **Execute**: All target executors concurrently within the superstep
4. **Synchronize**: Wait for all executors to complete (synchronization barrier)
5. **Queue**: New messages emitted by executors for the next superstep

**Synchronization barrier guarantees:**
- Deterministic execution (same input = same order)
- Reliable checkpointing at superstep boundaries
- Consistent message visibility (no race conditions between supersteps)

### Multi-Agent Communication Patterns

**Sequential**: Linear workflow A → B → C
**Concurrent**: Multiple independent paths executing in parallel
**Handoff**: Agents transfer context to each other
**Group collaboration**: Multiple agents working together (GroupChat)

## Python Implementation

### Basic Workflow Definition

```python
from agent_framework import WorkflowBuilder, Executor

processor = DataProcessor()
validator = Validator()
formatter = Formatter()

builder = WorkflowBuilder(start_executor=processor)
builder.add_edge(processor, validator)
builder.add_edge(validator, formatter)
workflow = builder.build()
```

### Streaming Execution

```python
# Streaming: get events as they happen
async for event in workflow.run(input_message, stream=True):
    if event.type == "output":
        print(f"Workflow completed: {event.data}")

# Non-streaming: wait for completion
events = await workflow.run(input_message)
print(f"Final result: {events.get_outputs()}")
```

## .NET Implementation

### Basic Workflow Definition

```csharp
using Microsoft.Agents.AI.Workflows;

var processor = new DataProcessor();
var validator = new Validator();
var formatter = new Formatter();

WorkflowBuilder builder = new(processor);
builder.AddEdge(processor, validator);
builder.AddEdge(validator, formatter);
var workflow = builder.Build();
```

### Streaming Execution

```csharp
// Streaming execution
StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, inputMessage);
await foreach (WorkflowEvent evt in run.WatchStreamAsync())
{
    if (evt is ExecutorCompletedEvent executorComplete)
    {
        Console.WriteLine($"{executorComplete.ExecutorId}: {executorComplete.Data}");
    }
    if (evt is WorkflowOutputEvent outputEvt)
    {
        Console.WriteLine($"Workflow completed: {outputEvt.Data}");
    }
}

// Non-streaming execution
Run result = await InProcessExecution.RunAsync(workflow, inputMessage);
foreach (WorkflowEvent evt in result.NewEvents)
{
    if (evt is WorkflowOutputEvent outputEvt)
    {
        Console.WriteLine($"Final result: {outputEvt.Data}");
    }
}
```

## Agent Orchestration Patterns

### Sequential Orchestration

Linear processing where one agent's output becomes the next agent's input. Useful for pipelines and data transformation chains.

### Concurrent Patterns

Multiple execution paths operating in parallel within the same superstep. Use when paths are independent and don't need to block each other.

**Important**: Due to the superstep synchronization barrier, all paths must complete before advancing. To prevent one long-running path from blocking independent chains, consolidate sequential steps into single executors.

### Group Chat

Multiple agents collaborating on the same problem, exchanging messages within the group communication protocol.

## Use Cases

**Sub-agents are best for:**
- Multi-step pipelines with data transformation
- Specialized agent delegation (e.g., research agent → writing agent → review agent)
- Parallel processing of independent tasks
- Explicit control over execution order and message routing
- Checkpointing and long-running workflows

**Don't use workflows when:**
- A single agent with tools can handle the task autonomously
- The process doesn't have well-defined steps
- You need open-ended reasoning without explicit orchestration

## Framework Capabilities

- **Python and .NET support** with consistent APIs
- **Type compatibility validation** between connected executors
- **Graph validation**: reachability, binding, edge integrity
- **Streaming and non-streaming** execution modes
- **Event-driven** architecture with structured event types
- **Foundry integration** for hosted agent infrastructure
- **Checkpointing** for fault tolerance and resume capability

## Questions for Further Research

1. How does the BSP superstep model affect fan-out patterns with mixed executor complexities?
2. What are the performance characteristics of large graphs with many supersteps?
3. How are circular dependencies and cycles handled?
4. What observability and tracing is available for multi-agent execution?

## Related Concepts

- **Human-in-the-Loop**: Request/response mechanism for pausing workflows
- **Session Persistence**: State management across agent invocations
- **Context Providers**: Memory and history management for multi-agent systems
- **Checkpoints**: Saving and restoring workflow state

## References

- GitHub: [python/samples/03-workflows](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows)
- GitHub: [dotnet/samples/03-workflows](https://github.com/microsoft/agent-framework/blob/main/dotnet/samples/03-workflows)
- Learn: [Workflow Builder & Execution](https://learn.microsoft.com/en-us/agent-framework/workflows/workflows)
