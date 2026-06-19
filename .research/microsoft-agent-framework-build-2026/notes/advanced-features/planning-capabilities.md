---
title: "Agent Planning and Autonomous Reasoning"
source_url: "https://github.com/microsoft/agent-framework"
source_title: "Microsoft Agent Framework - Planning Capabilities"
source_date: "2026-06-18"
area: "advanced-features"
type: "agent-capabilities"
dimensions:
  - "planning"
  - "autonomous-reasoning"
  - "goal-decomposition"
  - "adaptive-execution"
extracted: "2026-06-18"
quality: "draft"
---

# Agent Planning and Autonomous Reasoning

## Overview

Microsoft Agent Framework enables agents to perform **autonomous planning and reasoning** through tool calling and step-by-step problem decomposition. The framework provides infrastructure for agents to generate multi-step plans, execute them with tools, and adapt based on results.

## Core Concepts

### Single-Agent Planning

Agents with tools can perform autonomous planning:
- LLM analyzes task and available tools
- Agent generates sequence of tool calls to accomplish goal
- Executes tools and receives results
- Adapts plan based on feedback from tool results
- Continues until goal is achieved

**When planning is best:**
- Open-ended problems without predetermined steps
- Agent needs autonomous tool use to solve problems
- Reasoning across multiple steps and tool combinations
- Adaptive problem-solving with feedback loops

### Explicit Orchestration vs. Autonomous Planning

The framework provides both approaches with different tradeoffs:

| Aspect | Autonomous Agent | Workflow Orchestration |
|--------|-----------------|----------------------|
| **Structure** | LLM decides sequence | Developer defines graph |
| **Control** | Agent-driven | Explicit routing |
| **Adaptability** | High (agent decides) | Moderate (fixed paths) |
| **Predictability** | Lower (depends on LLM) | High (deterministic) |
| **Use case** | Open-ended reasoning | Well-defined processes |

### Tool Calling and Iteration

Agents with tools follow this loop:
1. **Analyze**: Understand problem and available tools
2. **Plan**: Decide which tool(s) to call
3. **Execute**: Call tools in parallel or sequence
4. **Evaluate**: Assess results against goal
5. **Adapt**: Revise plan if needed
6. **Repeat**: Continue until goal achieved

## Python Implementation

### Basic Agent with Planning Capability

```python
from agent_framework import Agent
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

# Define tools that agent can use
async def search_database(query: str) -> str:
    """Search for information in knowledge base"""
    return f"Found results for: {query}"

async def calculate(expression: str) -> float:
    """Evaluate mathematical expression"""
    return eval(expression)

# Create agent with tools
client = FoundryChatClient(
    project_endpoint="https://...",
    model="gpt-5.4-mini",
    credential=AzureCliCredential(),
)

agent = client.as_agent(
    name="PlanningAgent",
    instructions="You are a helpful assistant. Use available tools to solve problems.",
)

# Add tools to agent
agent.add_tool(search_database)
agent.add_tool(calculate)

# Run multi-step reasoning task
result = await agent.run(
    "Find information about revenue and calculate 20% of it"
)
print(result)
```

### Multi-Turn Planning Session

```python
# Create session for multi-turn planning
session = agent.create_session()

# First turn: agent analyzes problem
task = "Build a data analysis pipeline for Q1 sales data"
step1 = await agent.run(task, session=session)

# Agent may request additional information
feedback = "Include regional breakdown and year-over-year comparison"
step2 = await agent.run(feedback, session=session)

# Agent continues planning with context
continuation = "Implement the pipeline"
final = await agent.run(continuation, session=session)

print(final)
```

### Monitoring Agent Planning Steps

```python
# Use middleware to observe agent's reasoning
class PlanningLogger:
    async def handle_tool_call(self, tool_name: str, args: dict):
        print(f"Agent calling: {tool_name} with {args}")
        
    async def handle_tool_result(self, tool_name: str, result: str):
        print(f"Tool result: {result}")

# Register middleware
agent.add_middleware(PlanningLogger())

# Run task with observability
await agent.run("Complex multi-step task", session=session)
```

## .NET Implementation

### Basic Agent with Planning Capability

```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI;

// Create agent with Foundry
AIProjectClient client = new(
    new Uri("https://your-foundry-project.services.ai.azure.com/api/projects/your-project"),
    new DefaultAzureCredential());

AIAgent agent = client.AsAIAgent(
    model: "gpt-5.4-mini",
    instructions: "You are a helpful assistant. Use available tools to solve problems.",
    name: "PlanningAgent");

// Tools are defined via tool definitions and integrated into agent

// Run planning task
string result = await agent.RunAsync(
    "Analyze sales data and identify top performing regions");

Console.WriteLine(result);
```

### Multi-Step Planning with Sessions

```csharp
// Create session for planning conversation
AgentSession session = await agent.CreateSessionAsync();

// Initial planning request
string plan = await agent.RunAsync(
    "Create a project timeline for our new product launch",
    session);
Console.WriteLine($"Initial plan: {plan}");

// Refine plan based on constraints
string refined = await agent.RunAsync(
    "We need to complete it in 6 months instead of 12",
    session);
Console.WriteLine($"Refined plan: {refined}");

// Get detailed breakdown
string details = await agent.RunAsync(
    "Give me a week-by-week breakdown for the first month",
    session);
Console.WriteLine($"Detailed timeline: {details}");
```

## Planning Patterns

### Sequential Planning

Agent breaks down complex task into steps:
```
Task: "Analyze Q1 performance"
├─ Retrieve Q1 data
├─ Calculate metrics
├─ Compare to Q4 previous year
├─ Identify trends
└─ Generate report
```

### Parallel Planning

Agent identifies independent steps that can execute concurrently:
```
Task: "Prepare presentation"
├─ (parallel)
│  ├─ Gather data
│  ├─ Create slides
│  └─ Design graphics
└─ Assemble final presentation
```

### Adaptive Planning

Agent revises plan based on tool results:
```
Attempt: Call API for data
Result: API rate limit exceeded
Adaptation: Retry with backoff strategy
Continue: Use cached data while waiting
```

### Hierarchical Planning

Agent delegates sub-tasks to specialized tools/agents:
```
Main goal: "Process customer orders"
├─ Sub-agent 1: Validate orders
├─ Sub-agent 2: Process payments
├─ Sub-agent 3: Arrange shipping
└─ Sub-agent 4: Send confirmations
```

## Limitations and Constraints

**Single-agent planning limitations:**
- **LLM consistency**: Same prompt may produce different plans
- **Reasoning bounds**: Complex problems may exceed token limits
- **Tool dependencies**: Agent must understand tool capabilities
- **Error recovery**: Agent may struggle with tool failures
- **Determinism**: Non-deterministic execution order

**Solutions:**
- Use explicit workflow orchestration for critical processes
- Combine agents and workflows (agents for reasoning, workflows for control)
- Implement monitoring and human-in-the-loop gates for high-impact decisions
- Cache tool results to reduce token overhead

## When to Use Planning vs. Workflows

### Use Agent Planning When:
- Problem structure is unknown or highly variable
- Agent needs autonomous decision-making
- Solutions require reasoning across multiple steps
- Tool combinations are not predetermined
- Adaptability to unexpected situations is valuable

### Use Workflow Orchestration When:
- Process has well-defined steps
- Explicit control is required (governance, compliance)
- Deterministic execution is essential
- Step order is always the same
- Integration with human-in-the-loop is needed

### Use Both When:
- Part of process requires autonomous reasoning (agents)
- Part requires explicit control (workflows)
- Agents are executors in a workflow
- Workflows contain planning agents as decision nodes

## Advanced Patterns

### Planning with Constraints

```python
# Agent planning with safety constraints
constraint_instructions = """
You are a helpful assistant that follows these constraints:
1. Always get approval before deleting data
2. Never exceed $10,000 per transaction
3. Escalate to human for decisions affecting >100 users
4. Log all access to sensitive data
"""

agent = client.as_agent(
    instructions=constraint_instructions,
    name="SafeAgent"
)
```

### Monitoring and Observability

```python
# Track planning steps for audit and learning
class AuditingMiddleware:
    async def on_tool_call(self, tool_name: str, args: dict, agent_id: str):
        # Log to audit trail
        await audit_service.log_tool_call(agent_id, tool_name, args)
    
    async def on_tool_result(self, tool_name: str, result: str, agent_id: str):
        # Store tool results for learning
        await learning_service.record_outcome(agent_id, tool_name, result)
```

## Questions for Further Research

1. How do agents handle planning in domains with incomplete information?
2. What techniques minimize token usage while maintaining plan quality?
3. How can plans be made reproducible/deterministic?
4. What's the best way to combine planning agents with orchestration workflows?
5. How are planning failures (impossible goals) detected and handled?

## Related Concepts

- **Workflows**: Explicit orchestration vs. agent planning tradeoffs
- **Multi-Agent Orchestration**: Agents as planning components
- **Tool Calling**: Foundation for autonomous agent reasoning
- **Session Persistence**: Maintaining planning context across turns

## References

- GitHub: [Agent Concepts samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/02-agents)
- GitHub: [End-to-End examples](https://github.com/microsoft/agent-framework/blob/main/python/samples/05-end-to-end)
- Learn: [When to use agents vs workflows](https://learn.microsoft.com/en-us/agent-framework/overview/agent-framework-overview)
- Learn: [Tools and MCP Servers](https://learn.microsoft.com/en-us/agent-framework/agents/tools/)
