---
title: "Handoff Orchestration - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/orchestrations/handoff"
source_title: "Handoff Orchestration | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "pattern-implementation"
dimensions:
  - "patterns:handoff"
  - "autonomous-mode"
  - "human-in-the-loop:tool-approval"
  - "mesh-topology"
extracted: "2026-06-18"
quality: "draft"
---

## What Handoff Orchestration Is

Handoff orchestration allows **agents to transfer control to one another based on context or user request**. Each agent can "handoff" the conversation to another agent with appropriate expertise, ensuring the right agent handles each part.

> "Handoff orchestration allows agents to transfer control to one another based on the context or user request. Each agent can 'handoff' the conversation to another agent with the appropriate expertise, ensuring that the right agent handles each part of the task."

Implemented using a **mesh topology** where agents are **directly connected without an orchestrator**. Agents decide when to handoff through special tool calls.

## Key Facts

### Fact 1: Control Flow vs. Agent-as-Tools
> "In handoff orchestration, control is explicitly passed between agents based on defined rules. Each agent can decide to hand off the entire task to another agent. There is no central authority managing the workflow."

| Aspect | Handoff | Agent-as-Tools |
|--------|---------|----------------|
| Control | Explicit handoff between agents | Primary agent delegates subtasks |
| Task Ownership | Receiving agent takes full ownership | Primary agent retains overall responsibility |
| Context | Full conversation handed off | Only relevant info to tool agent |
| Central Authority | None (mesh) | Primary agent (orchestrator) |

### Fact 2: Interactive vs. Autonomous Modes
By default, handoff is **interactive** — agents may not always handoff, requiring human input.

```
Interactive Mode (Default):
Agent Response → No Handoff → request_info event → User Input Required

Autonomous Mode (Experimental):
Agent Response → No Handoff → Auto-responds with default message → Agent Continues
```

**Enable Autonomous Mode**:
```python
# All agents run autonomously
workflow = (
    HandoffBuilder(
        name="autonomous_support",
        participants=[triage_agent, refund_agent, order_agent, return_agent],
    )
    .with_start_agent(triage_agent)
    .with_autonomous_mode()
    .build()
)

# Specific agents with turn limits
workflow = (
    HandoffBuilder(participants=[...])
    .with_start_agent(triage_agent)
    .with_autonomous_mode(
        agents=[triage_agent],
        turn_limits={triage_agent.name: 3}  # Max 3 autonomous turns
    )
    .build()
)

# Custom default responses
workflow = (
    HandoffBuilder(participants=[...])
    .with_start_agent(triage_agent)
    .with_autonomous_mode(
        agents=[triage_agent],
        prompts={triage_agent.name: "Continue with your best judgment."},
    )
    .build()
)
```

### Fact 3: Handoff Rules and Mesh Topology
> "Even with custom handoff rules, all agents are still connected in a mesh topology. The handoff rules only govern which agents can take over next."

**Agents need mesh topology for context sharing** — all agents maintain knowledge of conversation.

```python
# Configure handoff rules
workflow = (
    HandoffBuilder(
        name="customer_support",
        participants=[triage_agent, refund_agent, order_agent, return_agent],
    )
    .with_start_agent(triage_agent)
    .add_handoff(triage_agent, [order_agent, return_agent])  # Triage routes to these
    .add_handoff(return_agent, [refund_agent])  # Return can hand to refund
    .add_handoff(order_agent, [triage_agent])  # Order can hand back to triage
    .add_handoff(return_agent, [triage_agent])
    .add_handoff(refund_agent, [triage_agent])
    .build()
)
```

## Use Cases

- **Customer Support Triage**: Route to refund, order, return specialists
- **Expert System**: Dynamically route to domain-specific agents
- **Multi-Specialty Workflows**: Each specialist handles their domain
- **Autonomous Agent Networks**: Agents coordinate without central control
- **Specialist Routing**: Support agent → billing specialist → technical specialist

## C# Implementation

### Setup and Agent Definition
```csharp
using Azure.AI.Projects;
using Azure.Identity;
using Microsoft.Agents.AI.Workflows;
using Microsoft.Extensions.AI;
using Microsoft.Agents.AI;

var endpoint = Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT") 
    ?? throw new InvalidOperationException("AZURE_OPENAI_ENDPOINT is not set.");
var deploymentName = Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME") 
    ?? "gpt-4o-mini";
var client = new AIProjectClient(new Uri(endpoint), new DefaultAzureCredential())
    .GetProjectOpenAIClient()
    .GetProjectResponsesClient()
    .AsIChatClient(deploymentName);

// Create specialized agents
ChatClientAgent historyTutor = new(client,
    "You provide assistance with historical queries. Explain important events clearly. Only respond about history.",
    "history_tutor",
    "Specialist for historical questions");

ChatClientAgent mathTutor = new(client,
    "You provide help with math problems. Explain reasoning at each step. Only respond about math.",
    "math_tutor",
    "Specialist for math questions");

ChatClientAgent triageAgent = new(client,
    "You determine which agent to use based on the user's homework question. ALWAYS handoff to another agent.",
    "triage_agent",
    "Routes messages to appropriate specialist");
```

### Build Handoff Workflow with Rules
```csharp
// Define handoff rules
var workflow = AgentWorkflowBuilder.CreateHandoffBuilderWith(triageAgent)
    .WithHandoffs(triageAgent, [mathTutor, historyTutor])           // Triage routes to specialists
    .WithHandoffs([mathTutor, historyTutor], triageAgent)           // Specialists return to triage
    .Build();
```

### Execute with Interactive Loop
```csharp
List<ChatMessage> messages = new();

while (true)
{
    Console.Write("Q: ");
    string userInput = Console.ReadLine()!;
    messages.Add(new(ChatRole.User, userInput));

    await using StreamingRun run = await InProcessExecution.RunStreamingAsync(workflow, messages);
    await run.TrySendMessageAsync(new TurnToken(emitEvents: true));

    string? lastExecutorId = null;
    List<ChatMessage> newMessages = new();
    await foreach (WorkflowEvent evt in run.WatchStreamAsync())
    {
        if (evt is AgentResponseUpdateEvent e)
        {
            if (e.ExecutorId != lastExecutorId)
            {
                lastExecutorId = e.ExecutorId;
                Console.WriteLine();
                Console.WriteLine(e.ExecutorId);
            }
            Console.Write(e.Update.Text);
        }
        else if (evt is WorkflowOutputEvent outputEvt)
        {
            newMessages = outputEvt.As<List<ChatMessage>>()!;
            break;
        }
    }

    // Add new messages to conversation
    messages.AddRange(newMessages.Skip(messages.Count));
}
```

### Sample Interaction
```plaintext
Q: What is the derivative of x^2?
triage_agent: This is a math question. I'll hand this off to the math tutor.
math_tutor: The derivative of x^2 is 2x. Using the power rule, we bring down the exponent (2)...

Q: Tell me about World War 2
triage_agent: This is a history question. I'll hand this off to the history tutor.
history_tutor: World War 2 was a global conflict from 1939 to 1945...

Q: Can you help me with calculus integration?
triage_agent: This is another math question. I'll route this to the math tutor.
math_tutor: I'd be happy to help with calculus integration!...
```

## Python Implementation

### Tool Definitions
```python
from agent_framework import tool
from typing import Annotated

@tool
def process_refund(order_number: Annotated[str, "Order number to process refund for"]) -> str:
    """Simulated function to process a refund for a given order number."""
    return f"Refund processed successfully for order {order_number}."

@tool
def check_order_status(order_number: Annotated[str, "Order number to check status for"]) -> str:
    """Simulated function to check the status of a given order number."""
    return f"Order {order_number} is currently being processed and will ship in 2 business days."

@tool
def process_return(order_number: Annotated[str, "Order number to process return for"]) -> str:
    """Simulated function to process a return for a given order number."""
    return f"Return initiated successfully for order {order_number}."
```

### Agent Setup
```python
import os
from agent_framework.foundry import FoundryChatClient
from azure.identity import AzureCliCredential

chat_client = FoundryChatClient(
    project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
    model=os.environ["FOUNDRY_MODEL"],
    credential=AzureCliCredential(),
)

# Create specialist agents
triage_agent = chat_client.as_agent(
    instructions=(
        "You are frontline support triage. Route customer issues to appropriate specialist agents "
        "based on the problem described."
    ),
    description="Triage agent that handles general inquiries.",
    name="triage_agent",
)

refund_agent = chat_client.as_agent(
    instructions="You process refund requests.",
    description="Agent that handles refund requests.",
    name="refund_agent",
    tools=[process_refund],
)

order_agent = chat_client.as_agent(
    instructions="You handle order and shipping inquiries.",
    description="Agent that handles order tracking and shipping issues.",
    name="order_agent",
    tools=[check_order_status],
)

return_agent = chat_client.as_agent(
    instructions="You manage product return requests.",
    description="Agent that handles return processing.",
    name="return_agent",
    tools=[process_return],
)
```

### Build Handoff Workflow
```python
from agent_framework.orchestrations import HandoffBuilder

workflow = (
    HandoffBuilder(
        name="customer_support_handoff",
        participants=[triage_agent, refund_agent, order_agent, return_agent],
        termination_condition=lambda conversation: len(conversation) > 0 and 
                                                    "welcome" in conversation[-1].text.lower(),
    )
    .with_start_agent(triage_agent)
    .build()
)
```

### Interactive Execution
```python
from agent_framework import WorkflowEvent
from agent_framework.orchestrations import HandoffBuilder, HandoffAgentUserRequest

# Start workflow
events = [event async for event in workflow.run_stream("I need help with my order")]

# Process events and collect pending requests
pending_requests = []
for event in events:
    if event.type == "request_info" and isinstance(event.data, HandoffAgentUserRequest):
        pending_requests.append(event)
        request_data = event.data
        print(f"Agent {event.executor_id} is awaiting your input")
        for msg in request_data.agent_response.messages[-3:]:
            print(f"{msg.author_name}: {msg.text}")

# Interactive loop
while pending_requests:
    user_input = input("You: ")

    responses = {
        req.request_id: HandoffAgentUserRequest.create_response(user_input) 
        for req in pending_requests
    }
    # You can also send HandoffAgentUserRequest.terminate() to end workflow early

    events = [event async for event in workflow.run(responses=responses)]

    pending_requests = []
    for event in events:
        if event.type == "request_info":
            pending_requests.append(event)
```

## Advanced: Tool Approval in Handoff Workflows

### Define Approval-Required Tools
```python
@tool(approval_mode="always_require")
def process_refund(order_number: Annotated[str, "Order number"]) -> str:
    """Process a refund for a given order number."""
    return f"Refund processed: {order_number}"
```

### Handle Both User Input and Tool Approval
```python
from agent_framework import Content, WorkflowEvent
from agent_framework.orchestrations import HandoffBuilder, HandoffAgentUserRequest

workflow = (
    HandoffBuilder(
        name="support_with_approvals",
        participants=[triage_agent, refund_agent, order_agent],
    )
    .with_start_agent(triage_agent)
    .build()
)

pending_requests: list[WorkflowEvent] = []

# Start workflow
async for event in workflow.run_stream("My order arrived damaged. I need a refund."):
    if event.type == "request_info":
        pending_requests.append(event)

# Process pending requests
while pending_requests:
    responses: dict[str, object] = {}

    for request in pending_requests:
        if isinstance(request.data, HandoffAgentUserRequest):
            # Agent needs user input
            print(f"Agent {request.executor_id} asks:")
            for msg in request.data.agent_response.messages[-2:]:
                print(f"  {msg.author_name}: {msg.text}")

            user_input = input("You: ")
            responses[request.request_id] = HandoffAgentUserRequest.create_response(user_input)

        elif isinstance(request.data, Content) and request.data.type == "function_approval_request":
            # Agent wants to call tool requiring approval
            func_call = request.data.function_call
            args = func_call.parse_arguments() or {}

            print(f"\nTool approval requested: {func_call.name}")
            print(f"Arguments: {args}")

            approval = input("Approve? (y/n): ").strip().lower() == "y"
            responses[request.request_id] = request.data.to_function_approval_response(approved=approval)

    # Send responses and collect new requests
    pending_requests = []
    async for event in workflow.run(responses=responses):
        if event.type == "request_info":
            pending_requests.append(event)
```

## Key Concepts

- **Mesh Topology**: Agents directly connected; no central orchestrator
- **Handoff Tool**: Agents call special handoff tool to transfer control
- **Interactive Mode**: Default; agents may not handoff, requiring human input
- **Autonomous Mode**: Agents continue without human input (experimental)
- **Turn Limits**: Control max autonomous turns before requiring human input
- **Tool Approval**: Sensitive operations require human review
- **Request Info**: Agents request external feedback/input
- **Context Sharing**: All agents see full conversation history

## When to Use vs. Alternatives

**Use Handoff when:**
- Specialist agents handle different workflow phases
- Direct agent-to-agent control needed
- Autonomous agent networks desired

**Use Group Chat when:**
- Collaborative refinement and iteration
- Single problem solved collaboratively

**Use Sequential when:**
- Strict linear ordering required
- No agent decision on next phase

## Links

- [Orchestration Patterns Overview](orchestrations/)
- [GitHub Handoff Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows/Agents)
- [Python Samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows)
