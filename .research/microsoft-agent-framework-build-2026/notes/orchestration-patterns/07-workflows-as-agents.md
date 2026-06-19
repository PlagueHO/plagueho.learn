---
title: "Workflows as Agents - Microsoft Agent Framework"
source_url: "https://learn.microsoft.com/agent-framework/workflows/as-agents"
source_title: "Workflows as Agents | Microsoft Learn"
source_date: "2026-06-18"
area: "orchestration-patterns"
type: "composition-pattern"
dimensions:
  - "composition"
  - "workflow-agents"
  - "session-management"
  - "streaming"
extracted: "2026-06-18"
quality: "draft"
---

## What Workflows as Agents Are

**Workflows as Agents** allow you to **wrap a sophisticated workflow with multiple agents as a single agent** that can be used just like any other agent.

> "Sometimes you've built a sophisticated workflow with multiple agents, custom executors, and complex logic - but you want to use it just like any other agent. That's exactly what workflow agents let you do. By wrapping your workflow as an `Agent`, you can interact with it through the same familiar API you'd use for a simple chat agent."

### Key Benefits

- **Unified Interface**: Interact with complex workflows using same API as simple agents
- **API Compatibility**: Integrate workflows with existing systems supporting Agent interface
- **Composability**: Use workflow agents as building blocks in larger agent systems
- **Session Management**: Leverage agent sessions for conversation state and resumption
- **Streaming Support**: Real-time updates as workflow executes

## How It Works

When a workflow is converted to an agent:

1. **Validation**: Workflow's start executor validated to accept required input types
2. **Session Creation**: Session created to manage conversation state
3. **Message Routing**: Input messages routed to workflow's start executor
4. **Event Conversion**: Workflow events converted to agent response updates
5. **External Input**: RequestInfoExecutor requests surfaced as function calls

## C# Implementation

### Requirements

Workflow's start executor must handle `IEnumerable<ChatMessage>` as input (automatically satisfied with agent-based executors created via `AsAIAgent`).

### Create a Workflow Agent

```csharp
using Microsoft.Agents.AI;
using Microsoft.Agents.AI.Workflows;
using Microsoft.Extensions.AI;

// Create agents
AIAgent researchAgent = chatClient.AsAIAgent(
    "You are a researcher. Research and gather information on the given topic.");
AIAgent writerAgent = chatClient.AsAIAgent(
    "You are a writer. Write clear, engaging content based on research.");
AIAgent reviewerAgent = chatClient.AsAIAgent(
    "You are a reviewer. Review the content and provide a final polished version.");

// Build a sequential workflow
var workflow = new WorkflowBuilder(researchAgent)
    .AddEdge(researchAgent, writerAgent)
    .AddEdge(writerAgent, reviewerAgent)
    .Build();

// Convert the workflow to an agent
AIAgent workflowAgent = workflow.AsAIAgent(
    id: "content-pipeline",
    name: "Content Pipeline Agent",
    description: "A multi-agent workflow that researches, writes, and reviews content"
);
```

### AsAIAgent Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `id` | `string?` | Optional unique identifier; auto-generated if not provided |
| `name` | `string?` | Optional display name |
| `description` | `string?` | Optional purpose description |
| `executionEnvironment` | `IWorkflowExecutionEnvironment?` | Optional execution environment |
| `includeExceptionDetails` | `bool` | If true, includes exception messages in error content |
| `includeWorkflowOutputsInResponse` | `bool` | If true, transforms workflow outputs to agent response content |

### Using Workflow Agents

#### Create a Session
```csharp
// Create a new session for the conversation
AgentSession session = await workflowAgent.CreateSessionAsync();
```

#### Non-Streaming Execution
```csharp
var messages = new List<ChatMessage>
{
    new(ChatRole.User, "Write an article about renewable energy trends in 2025")
};

AgentResponse response = await workflowAgent.RunAsync(messages, session);

foreach (ChatMessage message in response.Messages)
{
    Console.WriteLine($"{message.AuthorName}: {message.Text}");
}
```

#### Streaming Execution
```csharp
var messages = new List<ChatMessage>
{
    new(ChatRole.User, "Write an article about renewable energy trends in 2025")
};

await foreach (AgentResponseUpdate update in workflowAgent.RunStreamingAsync(messages, session))
{
    // Process streaming updates from each agent in the workflow
    if (!string.IsNullOrEmpty(update.Text))
    {
        Console.Write(update.Text);
    }
}
```

#### Handle External Input Requests
```csharp
await foreach (AgentResponseUpdate update in workflowAgent.RunStreamingAsync(messages, session))
{
    // Check for function call requests
    foreach (AIContent content in update.Contents)
    {
        if (content is FunctionCallContent functionCall)
        {
            // Handle the external input request
            Console.WriteLine($"Workflow requests input: {functionCall.Name}");
            Console.WriteLine($"Request data: {functionCall.Arguments}");
        }
    }
}
```

#### Session Serialization and Resumption
```csharp
// Serialize the session state
JsonElement serializedSession = await workflowAgent.SerializeSessionAsync(session);

// Store serializedSession to persistence layer...

// Later, resume the session
AgentSession resumedSession = await workflowAgent.DeserializeSessionAsync(serializedSession);

// Continue the conversation
await foreach (var update in workflowAgent.RunStreamingAsync(newMessages, resumedSession))
{
    Console.Write(update.Text);
}
```

## Python Implementation

### Requirements

Workflow's start executor must handle message input (automatically satisfied with `Agent` or agent-based executors).

### Create a Workflow Agent

```python
from agent_framework.foundry import FoundryChatClient
from agent_framework.orchestrations import SequentialBuilder
from azure.identity import AzureCliCredential

# Create chat client and agents
client = FoundryChatClient(
    project_endpoint="<your-endpoint>",
    model="<your-deployment>",
    credential=AzureCliCredential(),
)

researcher = client.as_agent(
    name="Researcher",
    instructions="Research and gather information on the given topic.",
)

writer = client.as_agent(
    name="Writer",
    instructions="Write clear, engaging content based on research.",
)

# Build a sequential workflow
workflow = SequentialBuilder(participants=[researcher, writer]).build()

# Convert the workflow to an agent
workflow_agent = workflow.as_agent(name="Content Pipeline Agent")
```

### as_agent Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | `str \| None` | Optional display name; auto-generated if not provided |

### Using Workflow Agents

#### Create a Session (Optional)
```python
# Optional session for conversation state across multiple turns
session = await workflow_agent.create_session()
```

Note: Sessions are optional. If not provided, agent handles state internally.

#### Non-Streaming Execution
```python
# Pass a plain string as input
response = await workflow_agent.run("Write an article about AI trends")

for message in response.messages:
    print(f"{message.author_name}: {message.text}")
```

#### Streaming Execution
```python
async for update in workflow_agent.run(
    "Write an article about AI trends",
    stream=True,
):
    if update.text:
        print(update.text, end="", flush=True)
```

#### Handle External Input Requests
```python
from agent_framework import Content, Message, WorkflowAgent

response = await workflow_agent.run("Process my request")

# Look for function calls in the response
human_review_function_call = None
for message in response.messages:
    for content in message.contents:
        if content.name == WorkflowAgent.REQUEST_INFO_FUNCTION_NAME:
            human_review_function_call = content
```

#### Provide Responses to Pending Requests
```python
if human_review_function_call:
    # Parse the request arguments
    request = WorkflowAgent.RequestInfoFunctionArgs.from_json(
        human_review_function_call.arguments
    )

    # Create a response
    result_data = MyResponseType(approved=True, feedback="Looks good")

    # Create the function call result
    function_result = Content.from_function_result(
        call_id=human_review_function_call.call_id,
        result=result_data,
    )

    # Send the response back
    response = await workflow_agent.run(Message("tool", [function_result]))
```

### Complete Python Example

```python
import asyncio
import os

from agent_framework.foundry import FoundryChatClient
from agent_framework.orchestrations import SequentialBuilder
from azure.identity import AzureCliCredential

async def main():
    # Set up the chat client
    client = FoundryChatClient(
        project_endpoint=os.environ["FOUNDRY_PROJECT_ENDPOINT"],
        model=os.environ["FOUNDRY_MODEL"],
        credential=AzureCliCredential(),
    )

    # Create specialized agents
    researcher = client.as_agent(
        name="Researcher",
        instructions="Research the given topic and provide key facts.",
    )

    writer = client.as_agent(
        name="Writer",
        instructions="Write engaging content based on the research provided.",
    )

    reviewer = client.as_agent(
        name="Reviewer",
        instructions="Review the content and provide a final polished version.",
    )

    # Build a sequential workflow
    workflow = SequentialBuilder(participants=[researcher, writer, reviewer]).build()

    # Convert to a workflow agent
    workflow_agent = workflow.as_agent(name="Content Creation Pipeline")

    # Run the workflow
    print("Starting workflow...")
    print("=" * 60)

    current_author = None
    async for update in workflow_agent.run(
        "Write about quantum computing",
        stream=True,
    ):
        # Show when different agents are responding
        if update.author_name and update.author_name != current_author:
            if current_author:
                print("\n" + "-" * 40)
            print(f"\n[{update.author_name}]:")
            current_author = update.author_name

        if update.text:
            print(update.text, end="", flush=True)

    print("\n" + "=" * 60)
    print("Workflow completed!")

if __name__ == "__main__":
    asyncio.run(main())
```

## Understanding Event Conversion

When a workflow runs as an agent, workflow events are converted to agent responses.

**Return Type Depends on Execution Mode**:
- `run()`: Returns `AgentResponse` with complete result after workflow finishes
- `run(..., stream=True)`: Returns async iterable of `AgentResponseUpdate` for real-time updates

**Event Mapping**:
| Workflow Event | Agent Response |
|---|---|
| `event.type == "output"` | Terminal answer; passed as `AgentResponseUpdate` (streaming) or aggregated into `AgentResponse` (non-streaming); included in `response.text` |
| `event.type == "intermediate"` | Observational progress; rendered as `text_reasoning` content; NOT included in `response.text` |
| `event.type == "request_info"` | Converted to function call using `WorkflowAgent.REQUEST_INFO_FUNCTION_NAME` |
| Other events | Ignored (workflow-internal only) |

The `as_agent()` method forwards both `"output"` and `"intermediate"` events.

## Use Cases

### 1. Complex Agent Pipelines
Wrap multi-agent workflow as single agent for applications:
```
User Request → [Workflow Agent] → Final Response
                    |
                    +-- Researcher Agent
                    +-- Writer Agent
                    +-- Reviewer Agent
```

### 2. Agent Composition
Use workflow agents as components in larger systems:
- Workflow agent used as tool by another agent
- Multiple workflow agents orchestrated together
- Workflow agents nested within other workflows

### 3. API Integration
Expose complex workflows through APIs expecting standard Agent interface:
- Chat interfaces with sophisticated backend workflows
- Integration with existing agent-based systems
- Gradual migration from simple agents to complex workflows

## Key Concepts

- **Wrapper Pattern**: Transform workflow into agent-compatible interface
- **Unified API**: Same interface for simple and complex agents
- **Session Management**: Persist conversation state across turns
- **Streaming**: Real-time progress updates
- **Event Conversion**: Workflow events mapped to agent response format
- **Composability**: Nest workflow agents in larger systems
- **Serialization**: Persist and resume workflow state

## Links

- [Agent Framework Documentation](https://learn.microsoft.com/agent-framework/)
- [Workflow Builder Guide](../workflows/)
- [GitHub Workflow Samples](https://github.com/microsoft/agent-framework/tree/main/dotnet/samples/03-workflows)
- [Python Samples](https://github.com/microsoft/agent-framework/blob/main/python/samples/03-workflows)
